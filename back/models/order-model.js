const orderModel = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        totalPrice: {
            type: DataTypes.FLOAT(10,2),
            allowNull: false
        }
    })

    return Order
}

module.exports = orderModel