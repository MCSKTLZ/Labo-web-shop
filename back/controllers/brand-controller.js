const dbConnector = require("../models/dbc").get();

exports.createBrand = async (req, res, next) => {
  const newBrand = await dbConnector.Brand.create({ name: req.body.name });
  res.status(201).json({
    message: `${newBrand.name} created`,
  });
};

exports.getAllBrand = async (req, res, next) => {
  try {
    const brands = await dbConnector.Brand.findAll();
    res.status(200).json(brands);
  } catch (err) {
    res.json({ message: err.errors });
  }
};
