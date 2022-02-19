const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const publicPath = path.join(__dirname, './public');
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(fileUpload({
    createParentPath: true
  }))
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

const db = require("./models")

const usersRouter = require("./routes/Users")
app.use("/users", usersRouter);

const adminRouter = require("./routes/Admin")
app.use("/admin", adminRouter);

const statRouter = require("./routes/Stat")
app.use("/stat", statRouter);

const quizRouter = require("./routes/Quiz")
app.use("/quiz", quizRouter);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("Server is running");
    });
});
