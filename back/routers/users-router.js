const express = require("express")
const router = express.Router()
const usersController = require("../controllers/user-controller")
const auth = require("../middlewares/auth-jwt")
const authController = require("../middlewares/auth-controller")
const password = require("../middlewares/change-password")

//A mettre dans admin routes
router.patch("/admin/update/:id",auth.verifytoken,auth.isAdmin, usersController.updateUser)
router.delete("/admin/:id", auth.verifytoken, auth.isHim,  usersController.deleteUser)
router.get("/",auth.verifytoken,auth.isAdmin, usersController.getAllUser)

router.get("/:id",auth.verifytoken, auth.isHim, usersController.getUserById)
router.post("/signup", usersController.createUser)
router.post("/login", authController.signIn)
router.patch("/update/:id",auth.verifytoken,auth.isHim, usersController.updateUser)
router.patch("/password/:id",auth.verifytoken, auth.isHim, password.changePassById)
router.delete("/:id", auth.verifytoken, auth.isHim,  usersController.deleteUser)


module.exports = router
