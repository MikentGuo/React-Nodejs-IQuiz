module.exports = (sequelize, DataTypes) => {
    const Testimonial = sequelize.define("Testimonial", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })

    Testimonial.associate = (models) => {

        Testimonial.belongsTo(models.Users)
    }

    return Testimonial;
}