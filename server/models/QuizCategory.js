module.exports = (sequelize, DataTypes) => {
    const QuizCategory = sequelize.define("QuizCategory", {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brief: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detail: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageFilePath: {
            type: DataTypes.STRING,
            defaultValue: "uploads/quiz/defaultImage.png"
          },
        quizSize: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        },
        timeLimit: {
            type: DataTypes.INTEGER,
            defaultValue: 300
        },
        totalPicked: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

    QuizCategory.associate = (models) => {
        QuizCategory.hasMany(models.UserQuiz, {
          onDelete: "cascade"
        }),
        QuizCategory.hasMany(models.Questions, {
            onDelete: 'cascade'
        })
      }

    return QuizCategory;
}