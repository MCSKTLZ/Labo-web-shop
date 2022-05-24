const dbConnector = require("../models/dbc").get()

exports.addToCart = async (req, res, next) => {
    try {
        const cart = await dbConnector.Cart.findOne({where : { UserId : req.userID}})
        const product = await dbConnector.Product.findByPk(req.body.productId)
        const price =  product.price*((100 - product.promo) / 100)
        console.log(cart.totalPrice)
        const totalPrice = price + cart.totalPrice
        console.log(totalPrice);
        await cart.update({totalPrice : totalPrice})
        await product.addCart(cart, { through: { quantity: +1 } })
        res.status(200).json({
            message : `${product.name} added to the cart`
        })
    }   
    catch (err) {
        res.json({ message : err.errors})
    }

}