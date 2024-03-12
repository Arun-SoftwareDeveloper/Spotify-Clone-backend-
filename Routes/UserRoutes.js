const express = require("express");
const UserController = require("../Controllers/UserController");
const verifyToken = require("../Controllers/UserController").verifyToken; // Importing verifyToken specifically
const router = express.Router();

router.post("/register", UserController.RegisterUser);
router.post("/login", UserController.LoginUser);
router.post("/forgotpassword", UserController.ForgotPassword);
router.post("/resetpassword", UserController.ResetPassword);
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).send({ message: "Access granted to protected route" });
});
module.exports = router;
