const express = require("express")
const router = express.Router()
const productController = require("../controllers/product-controller")
const categoryController = require("../controllers/category-controller")

router.get("/", productController.getAllProduct)
router.get("/:id", productController.getProductById)
router.get("/category", categoryController.getAllCategory)


module.exports = router