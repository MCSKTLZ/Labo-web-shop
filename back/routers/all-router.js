const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const categoryController = require("../controllers/category-controller");

//signin and signup routes
router.post("/signup", usersController.createUser);
router.post("/login", authController.signIn);

// get products and categories
router.get("/product", productController.getAllProduct);
router.get("/product/:id", productController.getProductById);
router.get("/category", categoryController.getAllCategory);

module.exports = router;
