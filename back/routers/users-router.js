const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user-controller");
const addressController = require("../controllers/address-controller");
const auth = require("../middlewares/auth-jwt");
const password = require("../middlewares/change-password");
const cartController = require("../controllers/cart-controller");
const orderController = require("../controllers/order-controller");

//Users routes
router.get(
  "/:userId",
  auth.verifytoken,
  auth.isHim,
  usersController.getUserById
);
router.post(
  "/address/:userId",
  auth.verifytoken,
  auth.isHim,
  addressController.createAndUpdateAddress
);
router.patch(
  "/update/:userId",
  auth.verifytoken,
  auth.isHim,
  usersController.updateUser
);
router.patch(
  "/password/:userId",
  auth.verifytoken,
  auth.isHim,
  password.changePassById
);
router.delete(
  "delete-user/:userId",
  auth.verifytoken,
  auth.isHim,
  usersController.deleteUser
);
//cart routes
router.get(
  "/cart/product/:id/:userId",
  auth.verifytoken,
  auth.isHim,
  cartController.addToCart
);
router.delete(
  "/cart/product/:id/:userId",
  auth.verifytoken,
  auth.isHim,
  cartController.removeFromCart
);
router.get(
  "/cart/all/:userId",
  auth.verifytoken,
  auth.isHim,
  cartController.getAllCart
);
//order routes
router.post(
  "/order/get/:userId",
  auth.verifytoken,
  auth.isHim,
  orderController.createOrder
);

module.exports = router;
