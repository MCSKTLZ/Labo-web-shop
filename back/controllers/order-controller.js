const dbConnector = require("../models/dbc").get();

exports.createOrder = async (req, res, next) => {
  const cart = await dbConnector.Cart.findOne({
    where: { UserId: req.userID },
    include: { all: true },
  });
  res.json(cart);
};
