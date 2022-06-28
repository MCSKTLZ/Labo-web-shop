const dbConnector = require("../models/dbc").get();

exports.createBrand = async (req, res, next) => {
  try {
    const brand = await dbConnector.Brand.findOne({
      where: { name: req.body.name.trim() },
    });
    if (brand) {
      res.status(202).json({
        message: `${brand.name} already exist`,
      });
    } else {
      const newBrand = await dbConnector.Brand.create({
        name: req.body.name.trim(),
      });
      res.status(201).json({
        message: `${newBrand.name} created`,
      });
    }
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.getAllBrand = async (req, res, next) => {
  try {
    const brands = await dbConnector.Brand.findAll();
    res.status(200).json(brands);
  } catch (err) {
    res.json({ message: err.errors });
  }
};
