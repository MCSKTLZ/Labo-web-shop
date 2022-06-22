const dbConnector = require("../models/dbc").get();

exports.changeRole = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No content",
      });
    }
    const user = await dbConnector.User.findByPk(req.params.id);
    user.update({ RoleId: req.body.newRole });
    res.status(200).send({
      message: `Role for ${user.email} updated`,
    });
  } catch (err) {
    res.json(err);
  }
};
