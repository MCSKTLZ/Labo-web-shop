const dbConnector = require("../models/dbc").get()

exports.createAndUpdateAddress = async (req, res, next) => {
    try {
        const user = await dbConnector.User.findByPk(req.params.id)
        let data = {
            country : req.body.country,
            city : req.body.city,
            zip : req.body.zip,
            street : req.body.street,
            number : req.body.number,
            box : req.body.box
        }
        if (user.AddressId != null) {
            const address = await dbConnector.Address.findByPk(user.AddressId)
            address.update(data)
            res.status(200).json({
                message : `Address updated for ${user.email} `
            })
        } else {
            const address = await dbConnector.Address.create(data)
            user.update({AddressId : address.id})
            res.status(200).json({
            message : `Address added for ${user.email} `
            })
        }
    }
    catch (err) {
        res.json({ message : err.errors})
    }
}
