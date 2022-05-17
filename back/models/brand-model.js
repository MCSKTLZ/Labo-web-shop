const brandModel = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brand", {
        name : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    return Brand
}

module.exports = brandModel