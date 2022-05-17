const dbConnector = require("../models/dbc").get()
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res, next) => {
    try {
        if(!req.body.firstname || !req.body.password || !req.body.lastname || !req.body.email) {
            return res.status(400).json({
                message : "Can't create user : Data missing"
            })
        }
        let newUser = {}
        const user = await dbConnector.User.findOne({where : {email : req.body.email}})
        if(user) {
            return res.status(400).json({
                message : "Can't create user : Email already exist"
            })
        } 
    }
    catch (err) {
        console.log(err);
        res.json(err)
    }
}