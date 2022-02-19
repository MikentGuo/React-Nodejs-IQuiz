module.exports = (sequelize, DataTypes) => {
    const UserQuiz = sequelize.define("UserQuiz", {
        totalScore: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

    UserQuiz.associate = (models) => {
        UserQuiz.hasMany(models.QuizQuestion, {
            onDelete: 'cascade'
        }),
        UserQuiz.belongsTo(models.QuizCategory),
        UserQuiz.belongsTo(models.Users)
    }
    return UserQuiz;
}