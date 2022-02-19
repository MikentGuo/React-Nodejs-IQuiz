const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { QuizCategory } = require("../models");
const { Questions } = require("../models");
const { Event } = require("../models");
const { Testimonial } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const bcrypt = require("bcrypt");
const e = require("express");


const validateFileUpload = (data, id) => {
    if (data == null) {
        return 0
    }
    let image = data.image
    if (image.size > 524880) {
        return -1
    }
    const fileType = ["image/jpeg", "image/jpg", "image/gif", "image/png"]
    if (!fileType.includes(image.mimetype)) {
        return -1
    }
    image.name = "image" + id
    return image
}

router.get("/users", validateToken, async (req, res) => {
    const userList = await Users.findAll({
        attributes: ['id', 'email', 'username', 'imageFilePath', 'total_score', 'isAdmin']
    })
    res.json({ userList })
})

router.put("/users/byId", validateToken, async (req, res) => {
    let { id, username, email, password, imageFilePath } = req.body
    const image = validateFileUpload(req.files, id)
    if (image === -1) {
        res.json("ERROR")
        return
    }
    if (image !== 0) {
        image.mv("./public/uploads/user/" + image.name)
        imageFilePath = "uploads/user/" + image.name
    }
    if (password.length < 4) {
        await Users.update(
            {
                username: username,
                email: email,
                imageFilePath: imageFilePath
            },
            {
                where: { id: id }
            }
        )
    } else {
        bcrypt.hash(password, 10).then((hash) => {
            Users.update(
                {
                    username: username,
                    email: email,
                    imageFilePath: imageFilePath,
                    password: hash
                },
                {
                    where: { id: id }
                }
            )
        })
    }
    res.json("SUCCESS")
})

router.delete("/users/byId/:id", validateToken, async (req, res) => {
    const id = req.params.id
    await Users.destroy(
        { where: { id: id } }
    )
    res.json("SUCCESS")
})

router.get("/quiz", validateToken, async (req, res) => {
    const quizList = await QuizCategory.findAll()
    res.json({ quizList })
})

router.post("/quiz", validateToken, async (req, res) => {
    const { category, brief, detail, quizSize, timeLimit } = req.body
    await QuizCategory.create({
        category: category,
        brief: brief,
        detail: detail,
        timeLimit: timeLimit,
        quizSize: quizSize
    })
    res.json("SUCCESS")
})

router.put("/quiz/byId", validateToken, async (req, res) => {
    let { id, category, brief, detail, quizSize, timeLimit, imageFilePath } = req.body
    const image = validateFileUpload(req.files, id)
    if (image === -1) {
        res.json("ERROR")
        return
    }
    if (image !== 0) {
        image.mv("./public/uploads/quiz/" + image.name)
        imageFilePath = "uploads/quiz/" + image.name
    }
    await QuizCategory.update(
        {
            category: category,
            brief: brief,
            detail: detail,
            timeLimit: timeLimit,
            quizSize: quizSize,
            imageFilePath: imageFilePath
        },
        {
            where: { id: id }
        }
    )
    res.json("SUCCESS")
})

router.delete("/quiz/byId/:id", validateToken, async (req, res) => {
    const id = req.params.id
    await QuizCategory.destroy(
        { where: { id: id } }
    )
    res.json("SUCCESS")
})

router.get("/question", validateToken, async (req, res) => {
    const questionList = await Questions.findAll({
        include: { model: QuizCategory },
        order: ["QuizCategoryId"]
    })
    res.json({ questionList })
})

router.post("/question", validateToken, async (req, res) => {
    const { QuizCategoryId, body, codeDemo, answer1, answer2, answer3, answer4, correctAnswer } = req.body
    await Questions.create({
        QuizCategoryId: QuizCategoryId,
        body: body,
        codeDemo: codeDemo,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
        correctAnswer: correctAnswer
    })
    res.json("SUCCESS")
})

router.put("/question/byId", validateToken, async (req, res) => {
    const { id, QuizCategoryId, body, codeDemo, answer1, answer2, answer3, answer4, correctAnswer } = req.body
    await Questions.update(
        {
            QuizCategoryId: QuizCategoryId,
            body: body,
            codeDemo: codeDemo,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            correctAnswer: correctAnswer
        },
        { where: { id: id } }
    )
    res.json("SUCCESS")
})

router.delete("/question/byId/:id", validateToken, async (req, res) => {
    const id = req.params.id
    await Questions.destroy({
        where: { id: id }
    })
    res.json("SUCCESS")
})

router.post("/questionFile", validateToken, async (req, res) => {
    const questionStr = req.files.file.data.toString()
    const questionList = JSON.parse(questionStr)
    console.log("question file", questionList)

    await Questions.bulkCreate(questionList)

    res.json("SUCCESS")
})


router.get("/event", validateToken, async (req, res) => {
    const eventList = await Event.findAll()
    res.json({ eventList })
})

router.post("/event", validateToken, async (req, res) => {
    const { title, body, startTime } = req.body
    await Event.create({
        title: title,
        body: body,
        startTime: startTime
    })
    res.json("SUCCESS")
})

router.put("/event/byId", validateToken, async (req, res) => {
    let { id, title, body, startTime, imageFilePath } = req.body
    console.log(req.body)
    const image = validateFileUpload(req.files, id)
    if (image === -1) {
        res.json("ERROR")
        return
    }
    if (image !== 0) {
        image.mv("./public/uploads/event/" + image.name)
        imageFilePath = "uploads/event/" + image.name
    }
    await Event.update(
        {
            title: title,
            body: body,
            startTime: startTime,
            imageFilePath: imageFilePath
        },
        {
            where: { id: id }
        }
    )
    res.json("SUCCESS")
})

router.delete("/event/byId/:id", validateToken, async (req, res) => {
    const id = req.params.id
    await Event.destroy({
        where: { id: id }
    })
    res.json("SUCCESS")
})

router.get("/testimonial", validateToken, async (req, res) => {
    const testimonialList = await Testimonial.findAll({
        include: { model: Users }
    })
    res.json({ testimonialList })
})

router.post("/testimonial", validateToken, async (req, res) => {
    const { UserId, body } = req.body
    await Testimonial.create({
        UserId: UserId,
        body: body
    })
    res.json("SUCCESS")
})

router.put("/testimonial/byId", validateToken, async (req, res) => {
    const { id, UserId, body } = req.body
    await Testimonial.update(
        {
            UserId: UserId,
            body: body
        },
        {
            where: { id: id }
        }
    )
    res.json("SUCCESS")
})

router.delete("/testimonial/byId/:id", validateToken, async (req, res) => {
    const id = req.params.id
    await Testimonial.destroy({
        where: { id: id }
    })
    res.json("SUCCESS")
})

module.exports = router;