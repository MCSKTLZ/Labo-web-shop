const dbConnector = require("../models/dbc").get()

exports.createBrand = async(req, res, next) => {
    const newBrand = dbConnector.Brand.create(req.body.name)
    res.status(201).json({
        message : `${newBrand.name} created`
    })
}