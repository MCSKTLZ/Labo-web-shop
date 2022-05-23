const dbConnector = require("../models/dbc").get()

exports.createCategory = async (req, res, next) => {
   try {
    const category = await dbConnector.Category.create({name : req.body.name})
    res.status(200).json({
        message : `Category ${category.name}`
    })
   } 
   catch(err) {
    res.json({ message : err.errors})
   }
}
