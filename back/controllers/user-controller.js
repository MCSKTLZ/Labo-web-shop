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
        } else {
            newUser = {
                firstname : req.body.firstname.trim(),
                lastname : req.body.lastname.trim(),
                email : req.body.email.trim(),
                password : bcrypt.hashSync(req.body.password.trim(), 10),
                RoleId : 2
            }
            dbConnector.User.create(newUser)
                .then((response) => {
                    res.status(201).json({
                        message : "User successfully created",
                        result : response,
                    })
                })
        } 
    }
    catch (err) {
        console.log(err);
        res.json(err)
    }
}

exports.getAllUser = (req, res, next) => {
    dbConnector.User.findAll()
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        console.log(err);
        res.json(err)
    })
}