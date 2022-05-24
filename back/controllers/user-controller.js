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
            const user = await dbConnector.User.create(newUser)
            dbConnector.Cart.create({totalPrice : 0, status : "pending", UserId : user.id})
            res.status(201).json({
                message : `User ${user.email} created`,
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
        let user = await dbConnector.User.findOne({
            where : {id : req.params.id},
            attributes : {exclude : ["password"]},
            include: [{
                model: dbConnector.Role,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            },
            {
                model : dbConnector.Order,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            },
            {
                model : dbConnector.Address,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            },
            {
                model : dbConnector.Cart
            }
        ],
        })
        res.status(200).json(user)
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
                message : `User ${req.params.id} updated`
            })
        } else {
            res.status(200).json({
                message : `User ${req.params.id} not found`
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