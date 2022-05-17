const addressModel = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        box: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })

    return Address
}

module.exports = addressModel