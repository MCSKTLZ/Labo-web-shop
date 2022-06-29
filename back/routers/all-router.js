const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const categoryController = require("../controllers/category-controller");
const authController = require("../middlewares/auth-controller");
const usersController = require("../controllers/user-controller");
const brandController = require("../controllers/brand-controller");
const restPasswordController = require("../middlewares/reset-password");

//signin and signup routes
router.post("/signup", usersController.createUser);
router.post("/login", authController.signIn);

// get products and categories
router.get("/product", productController.getAllProduct);
router.get("/product/:id", productController.getProductById);
router.get("/category", categoryController.getAllCategory);
router.post("/products/search", productController.searchProduct);
router.get("/products/category/:id", productController.getProductByCategory);
router.get("/products/brand/:id", productController.getProductByBrand);

//reset password routes
router.post(
  "/user/reset-mail/:email",
  restPasswordController.sendPasswordResetEmail
);
router.post(
  "/user/new-password/:id/:token",
  restPasswordController.receiveNewPassword
);

//get all brands
router.get("/brands", brandController.getAllBrand);

module.exports = router;
