const cart_productModel = (sequelize, DataTypes) => {
    const cart_product = sequelize.define("Cart_Product", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return cart_product
}

module.exports = cart_productModel