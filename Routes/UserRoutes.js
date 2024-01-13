const express = require("express");
const UserController = require("../Controllers/UserController");
const router = express.Router();

router.post("/register", UserController.RegisterUser);
router.post("/login", UserController.LoginUser);
router.post("/forgotpassword", UserController.ForgotPassword);
router.post("/resetpassword", UserController.ResetPassword);
module.exports = router;
