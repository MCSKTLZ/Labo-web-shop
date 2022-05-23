const express = require("express")
const router = express.Router()
const productController = require("../controllers/product-controller")

router.get("/", productController.getAllProduct)
router.get("/:id", productController.getProductById)


module.exports = router