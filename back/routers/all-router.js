const express = require("express")
const router = express.Router()
const productController = require("../controllers/product-controller")

router.get("products", productController.getAllProduct)


module.exports = router