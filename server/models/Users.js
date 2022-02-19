module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        imageFilePath: {
          type: DataTypes.STRING,
          defaultValue: "uploads/user/defaultIcon.png"
        },
        total_score: {
          type: DataTypes.BIGINT,
          defaultValue: 0
        }
      });

      Users.associate = (models) => {
        Users.hasMany(models.UserQuiz, {
          onDelete: "cascade"
        }),
        Users.hasMany(models.Testimonial, {
          onDelete: 'cascade'
        })
      }

      return Users;
}