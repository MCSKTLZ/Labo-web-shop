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
            unique: true
        },
        price: {
            type: DataTypes.DECIMAL,
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