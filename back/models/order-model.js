const orderModel = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        totalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    })

    return Order
}

module.exports = orderModel