const productModel = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        price: {
            type: DataTypes.FLOAT(10,2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('live', 'outOfStock', 'deleted'),
            allowNull: false
        },
        promo : {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    return Product
}

module.exports = productModel