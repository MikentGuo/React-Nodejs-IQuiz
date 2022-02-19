const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { UserQuiz } = require("../models");
const { QuizCategory } = require("../models");
const { QuizQuestion } = require("../models");
const { Questions } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

const validatorInput = (data) => {
    let errors = {};
    if (!data.username) {
        errors.username = "username cannot be empty"
    }
    if (!data.email) {
        errors.email = 'email cannot be empty'
    }
    return errors
}

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

router.post("/registration", async (req, res) => {
    const errors = validatorInput(req.body);
    
    if (errors.length === 0) {
        res.send(errors)
        console.log(errors)
    } else {
        let { email, username, password } = req.body;
        if(password.length < 4) {
            password = "Password123"
        }
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                email: email,
                username: username,
                password: hash,
            })
        });
        res.json("SUCCESS");
    }
});

//check if username taken
router.get("/username/:username", (req, res) => {
    var username = req.params.username
    Users.findOne({ where: { username: username } }).then(user => {
        res.send(user)
    })
})

//check if email taken
router.get("/email/:email", (req, res) => {
    var email = req.params.email
    Users.findOne({ where: { email: email } }).then(user => {
        res.send(user)
    })
})

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
  });
module.exports = router;

router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    const user = await Users.findOne({where: {email: email}})
    if(!user) {
        res.json({error: "Email Doesn't Exist"})
        return
    } 
    bcrypt.compare(password, user.password).then(async (match) => {
        if(!match) {
            res.json({error: "Incorrect password"})
            return
        }
        const token = sign(
            {username: user.username, id: user.id, isAdmin: user.isAdmin, imageFilePath: user.imageFilePath},
            "DONTTELLANYONE"
        )
        res.json({
            token: token,
            username: user.username,
            id: user.id,
            isAdmin: user.isAdmin,
            imageFilePath: user.imageFilePath
        })
    })
})

router.post("/change_image", validateToken, async(req, res) => {
    
    const image = validateFileUpload(req.files, req.user.id)
    let imageFilePath = "ERROR"
    if (image !== 0) {
        image.mv("./public/uploads/user/" + image.name)
        imageFilePath = "uploads/user/" + image.name
        await Users.update(
            {
                imageFilePath: imageFilePath
            },
            {
                where: { id: req.user.id }
            }
        )
    }
    res.json(imageFilePath)
})

router.post("/change_pass", validateToken, async(req, res) => {
    
    const id = req.user.id
    const { originalPass, newPass } = req.body
    const user = await Users.findOne({
        where: { id: id }
    })
    bcrypt.compare(originalPass, user.password).then((match) => {
        if(!match) {
            res.json("ERROR")
        } else {
            bcrypt.hash(newPass, 10).then((hash) => {
                Users.update(
                    {
                        password: hash
                    },
                    {
                        where: { id: id }
                    }
                )
            });
            res.json("SUCCESS")
        }
    })
})

router.get("/myquizlist", validateToken, async(req, res) => {
    const id = req.user.id
    const myQuizList = await UserQuiz.findAll({
        where: { userId: id },
        include: { model: QuizCategory } 
    })
    
    res.json({myQuizList})
})

router.get("/questionlist/:id", validateToken, async(req, res) => {
    const id = req.params.id
    const questionList = await QuizQuestion.findAll({
        where: { UserQuizId: id },
        include: { model: Questions}
    })
    console.log(questionList)
    res.json({questionList})
})

module.exports = router;