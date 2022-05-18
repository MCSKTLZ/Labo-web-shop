const dbConnector = require("../models/dbc").get()
const bcrypt = require("bcryptjs");

exports.changePassById = async (req, res, next) => {
    try {
        const user = await dbConnector.User.findOne({where : {id : req.params.id}})
        if(user) {
            const passwordIsValid = bcrypt.compareSync(
                req.body.password.trim(),
                user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            if(req.body.newPassword != req.body.newPasswordRepeat) {
                res.status(401).send({
                    message: `Passwords must be the same`
                })
            } else if (req.body.newPassword == "") {
                res.status(401).send({
                    message: "Password cannot be empty!"
                })
            } else {
                const newPassword = bcrypt.hashSync(req.body.newPassword.trim(), 10)
                await user.update({password : newPassword})
                res.status(201).send({
                    message: "Password changed!"
                })
            }
        }
        else {
            res.status(404).send({
                message : `User with id : ${req.params.id} not found`
            })
            res.write(JSON.stringify({Message :  `User ${req.params.name} not found` }))
            res.end()
        }
    }
    catch(err) {
        res.json(err)
    }
}