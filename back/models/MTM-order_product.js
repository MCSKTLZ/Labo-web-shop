const order_productModel = (sequelize, DataTypes) => {
    const order_product = sequelize.define("Order_Product", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return order_product
}

module.exports = order_productModel