const cartModel = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
        totalPrice: {
            type: DataTypes.FLOAT(10,2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("pending", "payed"),
            allowNull: false
        }
    })

    return Cart
}

module.exports = cartModel