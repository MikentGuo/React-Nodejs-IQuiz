module.exports = (sequelize, DataTypes) => {
    const QuizQuestion = sequelize.define("QuizQuestion", {
        userAnswer: {
            type: DataTypes.ENUM('answer1', 'answer2', 'answer3', 'answer4'),
            allowNull: false
        }
    })
    QuizQuestion.associate = (models) => {
        QuizQuestion.belongsTo(models.Questions),
        QuizQuestion.belongsTo(models.UserQuiz)
    }

    return QuizQuestion;
}