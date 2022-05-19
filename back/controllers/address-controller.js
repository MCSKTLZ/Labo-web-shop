const dbConnector = require("../models/dbc").get()

exports.createAddress = async (req, res, next) => {
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
            return res.status(400).json({
                message : "User Have already registered address"
            })
        }
        const address = await dbConnector.Address.create(data)
            user.update({AddressId : address.id})
            res.status(200).json({
            message : `Address added for ${user.email} `
            })
    }
    catch (err) {
        res.json(err)
    }
}