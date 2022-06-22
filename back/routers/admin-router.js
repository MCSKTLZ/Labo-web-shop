const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user-controller");
const rolesController = require("../controllers/role-controller");
const productController = require("../controllers/product-controller");
const brandContoller = require("../controllers/brand-controller");
const categoryController = require("../controllers/category-controller");
const auth = require("../middlewares/auth-jwt");
const dbConnector = require("../models/dbc").get();
const { upload } = require("../middlewares/multer");

//All admin permission routes

//Users routes
router.get("/", auth.verifytoken, auth.isAdmin, usersController.getAllUser);
router.patch(
  "/update/:id",
  auth.verifytoken,
  auth.isAdmin,
  usersController.updateUser
);
router.patch(
  "/update-role/:id",
  auth.verifytoken,
  auth.isAdmin,
  rolesController.changeRole
);
router.delete(
  "/delete/:id",
  auth.verifytoken,
  auth.isAdmin,
  usersController.deleteUser
);

//product routes
router.post(
  "/product/new",
  auth.verifytoken,
  auth.isAdmin,
  productController.createProduct
);
router.delete(
  "/product/delete/:id",
  auth.verifytoken,
  auth.isAdmin,
  productController.deleteProduct
);
router.patch(
  "/product/update/:id",
  auth.verifytoken,
  auth.isAdmin,
  productController.updateProduct
);

// Brand routes
router.post(
  "/brand/new",
  auth.verifytoken,
  auth.isAdmin,
  brandContoller.createBrand
);

//Category routes
router.post(
  "/category/new",
  auth.verifytoken,
  auth.isAdmin,
  categoryController.createCategory
);
router.delete(
  "/category/delete/:id",
  auth.verifytoken,
  auth.isAdmin,
  categoryController.deleteCategory
);
router.patch(
  "/category/product/:id",
  auth.verifytoken,
  auth.isAdmin,
  categoryController.addCategory
);

//upload image
router.post(
  "/product/image-upload/:id",
  auth.verifytoken,
  auth.isAdmin,
  upload.single("simple"),
  async (req, res, next) => {
    if (req.file) {
      const product = await dbConnector.Product.findByPk(req.params.id);
      product.imageId = req.file.filename;
      product.save();
      res.status(200).json({ message: "Product image added" });
    }
  }
);

module.exports = router;
