const dbConnector = require("../models/dbc").get()


exports.createProduct = async (req, res, next) => {
    try {
        const product = await dbConnector.Product.findOne({where : { name : req.body.name }})
        if(product) {
            return res.status(403).json({
            message : "product already exist"
            })
        }
        if(req.body.brand) {
            const brand = await dbConnector.Brand.findOne({where : { name : req.body.brand}})
            if(brand) {
                const newProduct = await dbConnector.Product.create(req.body)
                newProduct.BrandId = brand.id
                newProduct.save()
                return res.status(201).json({
                    message : req.body.name + " created"
                    })
            } else {
                const brand = await dbConnector.Brand.create({name : req.body.brand})
                const newProduct = await dbConnector.Product.create(req.body)
                newProduct.BrandId = brand.id
                newProduct.save()
                return res.status(201).json({
                    message : req.body.name + " created"
                    })
            }
        }
        const newProduct = await dbConnector.Product.create(req.body)
        res.status(201).json({
            message : req.body.name + " created"
        })
    } catch (err) {
        res.json({ message : err.errors})
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await dbConnector.Product.findByPk(req.params.id)
        if(product) {
            product.destroy()
            return res.status(200).json({
                message : `Product id : ${req.params.id} deleted`
                })
        }
    }
    catch(err) {
        res.json({ message : err.errors})
    }
}

exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await dbConnector.Product.findAll({
            include: [{
                model : Brand
            }]
        })
        res.status(200).json(products)
    }
    catch(err) {
        res.json({ message : err.errors})
    }
}