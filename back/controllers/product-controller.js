const dbConnector = require("../models/dbc").get()


exports.createProduct = async (req, res, next) => {
    try {
        const product = await dbConnector.Product.findOne({where : { name : req.body.name }})
        if(product) {
            return res.status(403).json({
            message : "product already exist"
            })
        }
        const newProduct = await dbConnector.Product.create(req.body)
        res.status(201).json({
            message : req.body.name + " created"
        })
    } catch (err) {
        res.json({ message : err.errors})
    }
}