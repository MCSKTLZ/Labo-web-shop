const orderModel = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })

    return Order
}

module.exports = orderModel