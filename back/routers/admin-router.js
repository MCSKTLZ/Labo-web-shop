const express = require("express")
const router = express.Router()
const usersController = require("../controllers/user-controller")
const rolesController = require("../controllers/role-controller")
const productController = require("../controllers/product-controller")
const brandContoller = require("../controllers/brand-controller")
const auth = require("../middlewares/auth-jwt")

//All admin permission routes

//Users routes
router.get("/",auth.verifytoken,auth.isAdmin, usersController.getAllUser)
router.patch("/update/:id",auth.verifytoken,auth.isAdmin, usersController.updateUser)
router.patch("/update-role/:id",auth.verifytoken,auth.isAdmin, rolesController.changeRole)
router.delete("/delete/:id", auth.verifytoken, auth.isAdmin,  usersController.deleteUser)

//product routes
router.post("/product/new", auth.verifytoken, auth.isAdmin, productController.createProduct)
router.delete("/product/delete/:id", auth.verifytoken, auth.isAdmin, productController.deleteProduct)
router.patch("/product/update/:id", auth.verifytoken, auth.isAdmin, productController.updateProduct )

// Brand routes
router.post("/brand/new", auth.verifytoken, auth.isAdmin, brandContoller.createBrand)


module.exports = router