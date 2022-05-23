const dbConnector = require("../models/dbc").get()

exports.createCategory = async (req, res, next) => {
    try {
        const category = await dbConnector.Category.create({name : req.body.name})
        res.status(201).json({
            message : `Category ${category.name}`
        })
    } 
    catch(err) {
        res.json({ message : err.errors})
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await dbConnector.Category.findByPk(req.params.id)
        category.destroy()
        res.status(200).json({
            message : `Category : ${category.name} deleted`
        })
    }
    catch (err) {
        res.json({ message : err.errors})
    }
}

exports.getAllCategory = async (req, res, next) => {
    try {
        console.log("onpasse ma");
        const categories = await dbConnector.Category.findAll()
        console.log(categories);
        res.status(200).json(categories)
    }
    catch(err) {
        res.json({ message : err.errors})
    }
}