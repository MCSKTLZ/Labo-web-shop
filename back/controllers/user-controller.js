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
        res.status(200).json(data)
    })
    .catch((err) => {
        console.log(err);
        res.json(err)
    })
}

exports.getUserById = async (req, res, next) => {
    try {
        let user = await dbConnector.User.findOne({where : {id : req.params.id}})
        let role = await user.getRole()
        let order = await user.getOrders()
        let address = await user.getAddress()
        let newData = {firstname : user.firstname,
                        lastname : user.lastname,
                        email : user.email,
                        createdAt : user.createdAt,
                        updatedAt : user.updatedAt,
                        role : role.role,
                        orders : order.map(e => e.toJSON()),
                        address : address
                        }
        res.status(200).json(newData)
    } 
    catch(err) {
        res.json(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        if(Object.keys(req.body).length === 0 ) {
            return res.status(400).json({
                message : `Content cannot be empty`
            })
        }
        const user = await dbConnector.User.findOne({where : {id : req.params.id}})
        if(user) {
            if(req.body.password || req.body.address) {
                return res.status(403).send({
                    message : "Can't change password or address from this route"
                })
            } 
            user.update(req.body)
            res.status(200).json({
                message : `User ${req.params.name} updated`
            })
        } else {
            res.status(200).json({
                message : `User ${req.params.name} not found`
            })
        }
    } catch (err) {
        res.json(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const delUser = await dbConnector.User.destroy({where : {id : req.params.id}})
        if(delUser) {
            res.status(200).send({
                message : `User with id : ${req.params.id} deleted`
            })
        } else {
            res.status(404).send({
                message : `No user with id : ${req.params.id} found`
            })
        }
    }
    catch (err) {
        res.json(err)
    }
}