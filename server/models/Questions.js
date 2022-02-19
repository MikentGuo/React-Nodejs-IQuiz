module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define("Questions", {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codeDemo: {
            type: DataTypes.TEXT,
        },
        answer1: {
            type: DataTypes.TEXT,
        },
        answer2: {
            type: DataTypes.TEXT,
        },
        answer3: {
            type: DataTypes.TEXT,
        },
        answer4: {
            type: DataTypes.TEXT,
        },
        correctAnswer: {
            type: DataTypes.ENUM('answer1', 'answer2', 'answer3', 'answer4'),
            allowNull: false
        }
    })

    Questions.associate = (models) => {
        Questions.hasMany(models.QuizQuestion, {

        }),
        Questions.belongsTo(models.QuizCategory)
    }
    return Questions;
}