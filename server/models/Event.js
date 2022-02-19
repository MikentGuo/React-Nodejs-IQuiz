module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageFilePath: {
            type: DataTypes.STRING,
            defaultValue: "uploads/event/defaultImage.png"
          },
        startTime: {
            type: DataTypes.DATEONLY
        }
    })

    return Event;
}