const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth-jwt");
const permsController = require("../controllers/perms-controller");

router.get("/all", permsController.allAccess);
router.get("/user", auth.verifytoken, auth.isHim, permsController.userBoard);
router.get(
  "/admin",
  auth.verifytoken,
  auth.isAdmin,
  permsController.adminBoard
);

module.exports = router;
