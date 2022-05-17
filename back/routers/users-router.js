const express = require("express")
const router = express.Router()
const usersController = require("../controllers/user-controller")
// const auth = require("../middlewares/authJwt")
// const authController = require("../controllers/auth-controller")


// router.get("/",auth.verifytoken, usersController.getAll)
// router.get("/:name",auth.verifytoken, usersController.getUserByName)
router.post("/signup", usersController.createUser)
// router.post("/login", authController.signIn)
// router.patch("/:name",auth.verifytoken, usersController.updateUser)
// router.patch("/password/:name",auth.verifytoken, usersController.changePassword)
// router.delete("/:name", usersController.deleteUser)


module.exports = router
