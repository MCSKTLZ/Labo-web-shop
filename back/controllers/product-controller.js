const dbConnector = require("../models/dbc").get();
const Sequelize = require("sequelize");
const { ValidationError } = require("sequelize");
const Op = Sequelize.Op;

exports.createProduct = async (req, res, next) => {
  try {
    const product = await dbConnector.Product.findOne({
      where: { name: req.body.name },
    });
    if (product) {
      return res.status(403).json({
        message: "product already exist",
      });
    }
    if (req.body.brand) {
      const brand = await dbConnector.Brand.findOne({
        where: { name: req.body.brand },
      });
      if (brand) {
        const newProduct = await dbConnector.Product.create(req.body);
        newProduct.BrandId = brand.id;
        newProduct.save();
        return res.status(201).json({
          id: newProduct.id,
          message: req.body.name + " created",
        });
      } else {
        const brand = await dbConnector.Brand.create({ name: req.body.brand });
        const newProduct = await dbConnector.Product.create(req.body);
        newProduct.BrandId = brand.id;
        newProduct.save();
        return res.status(201).json({
          id: newProduct.id,
          message: req.body.name + " created",
        });
      }
    }
    const newProduct = await dbConnector.Product.create(req.body);
    res.status(201).json({
      id: newProduct.id,
      message: req.body.name + " created",
    });
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await dbConnector.Product.findByPk(req.params.id);
    if (product) {
      product.destroy();
      return res.status(200).json({
        message: `Product id : ${req.params.id} deleted`,
      });
    }
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await dbConnector.Product.findAll({
      include: [
        {
          model: dbConnector.Brand,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: dbConnector.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    for (i of products) {
      if (i.stock <= 0) {
        i.update({ status: "outOfStock" });
      }
    }
    res.status(200).json(products);
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await dbConnector.Product.findByPk(req.params.id);
    if (req.body.brandId) {
      await product.update({ BrandId: req.body.brandId });
    }
    product
      .update(req.body)
      .then(() => {
        res.status(200).json({
          message: `Product name ${product.name} updated`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: err,
        });
      });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await dbConnector.Product.findByPk(req.params.id, {
      include: [
        {
          model: dbConnector.Brand,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: dbConnector.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.status(200).json(product);
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const search = await req.body.name;
    const product = await dbConnector.Product.findAll({
      where: {
        name: { [Op.like]: "%" + search + "%" },
      },
      include: [
        {
          model: dbConnector.Brand,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: dbConnector.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.status(200).json(product);
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.getProductByCategory = async (req, res, next) => {
  try {
    const category = await dbConnector.Category.findByPk(req.params.id);
    const products = await category.getProducts();
    res.status(200).json(products);
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.getProductByBrand = async (req, res, next) => {
  try {
    const brand = await dbConnector.Brand.findByPk(req.params.id);
    const products = await brand.getProducts();
    res.status(200).json(products);
  } catch (err) {
    res.json({ message: err.errors });
  }
};
