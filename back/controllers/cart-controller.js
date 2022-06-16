const dbConnector = require("../models/dbc").get();

exports.addToCart = async (req, res, next) => {
  try {
    const cart = await dbConnector.Cart.findOne({
      where: { UserId: req.userID },
    });
    const product = await dbConnector.Product.findByPk(req.params.id);
    let price = product.price;
    if (product.promo > 0) {
      price = price * ((100 - product.promo) / 100);
    }
    const totalPrice = price + cart.totalPrice;
    const cartProduct = await cart.getProducts({ joinTableAttributes: [] });
    const cart_product = await dbConnector.Cart_Product.findOne({
      where: { CartId: cart.id, ProductId: product.id },
    });
    if (cart_product) {
      if (product.stock === 0 || product.stock <= cart_product.quantity) {
        return res.status(200).json({
          message: "no product in stock",
        });
      }
    }
    if (!cart_product && product.stock <= 0) {
      return res.status(200).json({
        message: "no product in stock",
      });
    }
    for (i of cartProduct) {
      if (i.id == product.id) {
        await cart.update({ totalPrice: totalPrice });
        await cart_product.increment("quantity", { by: 1 });
        return res.status(200).json({
          message: `+ 1 ${product.name} added to the cart`,
        });
      }
    }
    await cart.update({ totalPrice: totalPrice });
    await product.addCart(cart, { through: { quantity: +1 } });
    res.status(200).json({
      message: `${product.name} added to the cart`,
    });
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const cart = await dbConnector.Cart.findOne({
      where: { UserId: req.userID },
    });
    const product = await dbConnector.Product.findByPk(req.params.id);
    const price = product.price * ((100 - product.promo) / 100);
    const totalPrice = cart.totalPrice - price;
    let cart_product = await dbConnector.Cart_Product.findOne({
      where: { CartId: cart.id, ProductId: product.id },
    });
    await cart.update({ totalPrice: totalPrice });
    await cart_product.decrement("quantity", { by: 1 });

    cart_product = await dbConnector.Cart_Product.findOne({
      where: { CartId: cart.id, ProductId: product.id },
    });

    if (cart_product.quantity <= 0) {
      cart_product.destroy();
      return res.status(202).json({
        message: `${product.name} deleted from the cart`,
      });
    }
    res.status(200).json({
      message: `- 1 ${product.name} to the cart`,
    });
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.getAllCart = async (req, res, next) => {
  try {
    const cart = await dbConnector.Cart.findOne({
      where: { UserId: req.userID },
      include: [
        {
          model: dbConnector.Product,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: dbConnector.Category,
            },
            {
              model: dbConnector.Brand,
            },
          ],
        },
      ],
    });

    res.status(200).json({ cart });
  } catch (err) {
    res.json({ message: err.errors });
  }
};
