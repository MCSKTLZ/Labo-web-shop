const dbConnector = require("../models/dbc").get();

exports.createCategory = async (req, res, next) => {
  try {
    const category = await dbConnector.Category.findOne({
      where: { name: req.body.name.trim() },
    });
    if (category) {
      res.status(202).json({
        message: `Category ${category.name} already exist`,
      });
    } else {
      const newCategory = await dbConnector.Category.create({
        name: req.body.name.trim(),
      });
      res.status(201).json({
        message: `Category ${newCategory.name} created`,
      });
    }
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await dbConnector.Category.findByPk(req.params.id);
    category.destroy();
    res.status(200).json({
      message: `Category : ${category.name} deleted`,
    });
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await dbConnector.Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const category = await dbConnector.Category.findOne({
      where: { id: req.body.id },
    });
    if (!category) {
      return res.status(206).json({
        message: req.body.id + " doesn't exist",
      });
    } else {
      const product = await dbConnector.Product.findByPk(req.params.id);
      product.addCategory(category);
      res.status(200).json({
        message: req.body.id + " added to product" + req.params.id,
      });
    }
  } catch (err) {
    res.json({ message: err.errors });
  }
};
