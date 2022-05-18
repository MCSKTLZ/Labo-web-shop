const express = require("express")
const router = express.Router()
const usersController = require("../controllers/user-controller")
const auth = require("../middlewares/auth-jwt")
const authController = require("../middlewares/auth-controller")


router.get("/",auth.verifytoken,auth.isAdmin, usersController.getAllUser)
router.get("/:id",auth.verifytoken, auth.isHim, usersController.getUserById)
router.post("/signup", usersController.createUser)
router.post("/login", authController.signIn)
router.patch("/update/:id",auth.verifytoken,auth.isHim, usersController.updateUser)
router.patch("/admin/update/:id",auth.verifytoken,auth.isAdmin, usersController.updateUser)
// router.patch("/password/:name",auth.verifytoken, usersController.changePassword)
// router.delete("/:name", usersController.deleteUser)


module.exports = router
