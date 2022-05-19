const express = require("express")
const router = express.Router()
const usersController = require("../controllers/user-controller")
const rolesController = require("../controllers/role-controller")
const auth = require("../middlewares/auth-jwt")

router.patch("/update/:id",auth.verifytoken,auth.isAdmin, usersController.updateUser)
router.patch("/update-role/:id",auth.verifytoken,auth.isAdmin, rolesController.changeRole)
router.delete("/delete/:id", auth.verifytoken, auth.isAdmin,  usersController.deleteUser)
router.get("/",auth.verifytoken,auth.isAdmin, usersController.getAllUser)


module.exports = router