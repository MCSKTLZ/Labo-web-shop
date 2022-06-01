const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user-controller");
const addressController = require("../controllers/address-controller");
const auth = require("../middlewares/auth-jwt");
const password = require("../middlewares/change-password");
const cartController = require("../controllers/cart-controller");
const orderController = require("../controllers/order-controller");

//Users routes
router.get("/:id", auth.verifytoken, auth.isHim, usersController.getUserById);
router.post(
  "/address/:id",
  auth.verifytoken,
  auth.isHim,
  addressController.createAndUpdateAddress
);
router.patch(
  "/update/:id",
  auth.verifytoken,
  auth.isHim,
  usersController.updateUser
);
router.patch(
  "/password/:id",
  auth.verifytoken,
  auth.isHim,
  password.changePassById
);
router.delete("/:id", auth.verifytoken, auth.isHim, usersController.deleteUser);
//cart routes
router.post("/cart/product", auth.verifytoken, cartController.addToCart);
router.patch("/cart/product", auth.verifytoken, cartController.removeFromCart);
router.get("/cart/all", auth.verifytoken, cartController.getAllCart);
//order routes
router.post("/order/get", auth.verifytoken, orderController.createOrder);

module.exports = router;
