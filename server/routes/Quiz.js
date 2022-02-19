const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sequelize, Users, UserQuiz, Questions, QuizCategory, QuizQuestion } = require("../models");

router.get("/list", async (req, res) => {    
    const quizList = await QuizCategory.findAll()
    res.json({ quizList })
})

router.get("/question/:id", validateToken, async (req, res) => {    
    const categoryId = req.params.id
    const questionList = await Questions.findAll({
        order: sequelize.random(),
        limit: 10,
        //include: { model: QuizCategory },
        attributes: {exclude: ['correctAnswer']},
        where: { QuizCategoryId: categoryId },
    })
    res.json({ questionList })
})


async function findTopUser(limit, categoryId) {
    const data = await UserQuiz.findAll({
        limit,
        include: { model: Users },
        where: { QuizCategoryId: categoryId },
        order: [['totalScore','DESC']]
    })
    
    const obj = new Map();
    let data1 = data.filter((item) => !obj.has(item.UserId) && obj.set(item.UserId, 1))

    const leaderboard = data1.map( (item, index) => {
        return {
            rank: index + 1,
            username: item.User.username,
            imageFilePath: item.User.imageFilePath,
            score: item.totalScore
        }
    })    

    return leaderboard
}

router.get("/leaderboard/:id", async (req, res) => { 
    const id = req.params.id   
    console.log("leaderboard",id)
    const leaderboard = await findTopUser(10, id)

    res.json({leaderboard})  
})

router.get("/leaderboard", async (req, res) => { 
    const data = await QuizCategory.findAll()
    const leaderboard = []
    for (item of data) {       
        let lb = await findTopUser(3, item.id)
        lb = lb.map(el => {
            el['title'] = item.category
            return el
        })
        leaderboard.push(...lb)
    }
    const dataList = leaderboard.map( (item, index) => {
        return {
            id: index,
            username: item.username,
            imageFilePath: item.imageFilePath,
            title: item.title,
            body: "Score: "+item.score*10+"%"
        }
    })

    res.json({leaderboard: dataList})  
})

router.post("/answer", validateToken, async (req, res) => { 
    console.log("answer",req.body)   
    const QuizCategoryId = req.body.quizCategory

    let totalScore = 0
    for (item of req.body.answerList) {       
        const question = await Questions.findOne({
            where: { id: item.questionId}
        })
        let userA = item.answer + 1
        //console.log("question", question.correctAnswer, userA)
        if(question.correctAnswer === 'answer'+userA)
            totalScore += 1 
    }

    await QuizCategory.increment(
        { totalPicked: +1 },
        { where: { id: QuizCategoryId } }
    )

    let newQuiz = await UserQuiz.create({
        QuizCategoryId,
        UserId: req.user.id,
        totalScore
    })
        
    const quizQuestions = req.body.answerList.map( (item) => {
        return {
            QuestionId: item.questionId,
            UserQuizId: newQuiz.id,
            userAnswer: item.answer + 1
        }
    })

    await QuizQuestion.bulkCreate(quizQuestions)

    res.json({score: totalScore})
})

module.exports = router;