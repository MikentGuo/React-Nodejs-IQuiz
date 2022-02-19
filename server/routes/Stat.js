const express = require("express");
const router = express.Router();
const { Users, UserQuiz, Questions, QuizCategory, Event, Testimonial } = require("../models");

router.get("/counts", async (req, res) => {    
    let countUser = await Users.count()
    console.log("stat users", countUser)

    let countUserQuiz = await UserQuiz.count()
    console.log("stat UserQuiz", countUserQuiz)

    let countQuestion = await Questions.count()
    console.log("stat countQuestion", countQuestion)

    let countEvent = await Event.count()
    console.log("stat countEvent", countEvent)

    res.json({countUser, countUserQuiz, countQuestion, countEvent})
})

router.get("/popular", async (req, res) => {    
    let popularQuizData = await QuizCategory.findAll({ 
        limit: 3 ,
        order: [['totalPicked','DESC']]
    })
    //console.log("stat popular", popularQuizData)
    res.json(popularQuizData)
})

router.get("/event", async (req, res) => {    
    let eventList = await Event.findAll()
    res.json({ eventList })
})

router.get("/testimonial", async (req, res) => {    
    let testimonialList = await Testimonial.findAll({
        include: { model: Users }     
    })

    const data = testimonialList.map( (item, index) => {
        return {
            id: item.index,
            username: item.User.username,
            imageFilePath: item.User.imageFilePath,
            body: item.body
        }
    })
    res.json({ testimonialList: data })
})

module.exports = router;