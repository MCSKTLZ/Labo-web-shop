const dbConnector = require("../models/dbc").get()

exports.createCategory = async (req, res, next) => {
   try {

   } 
   catch(err) {
    res.json({ message : err.errors})
   }
}
