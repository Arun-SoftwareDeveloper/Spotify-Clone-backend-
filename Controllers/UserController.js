const User = require("../Models/UserModel");
const bcryt = require("bcrypt");
const { error } = require("console");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { encode } = require("punycode");

const RegisterUser = async (req, res) => {
  try {
    console.log("inside register");
    const { email, name, password, dateOfBirth, gender } = req.body;
    console.log("Request Body:", req.body); // Log the request body for debugging

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already registered");
      return res.status(400).send({ message: "User already registered" });
    }
    const hashedPassword = await bcryt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      dateOfBirth,
      gender,
    });
    await newUser.save();
    return res.status(200).send({ message: "User registered Successfull" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" + error });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).send({ message: "User not found" });
    }

    const comparePassword = await bcryt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(402).send({ message: "Incorrect password" });
    }
    return res.status(201).send({ message: "Login Successsful" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" + error });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).send({ message: "Email address not found" });
    }

    const resetToken = crypto.randomBytes(16).toString("hex"); // Generate a secure random token
    const encodedResetToken = resetToken.replace(
      /./g,
      (char) => `&#${char.charCodeAt(0)};`
    );

    existingUser.resetToken = encodedResetToken;
    await existingUser.save();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "arunramasamy46@gmail.com",
        pass: "pruxtxnekznczdpc",
      },
    });

    const mailOptions = {
      from: "arunramasamy46@gmail.com",
      to: existingUser.email,
      subject: "Reset Your Password",
      html: `<h1>Hello${existingUser.name}</h1>
      <p>Here is your token to reset your Password<p>
      <p>ResetToken:${encodedResetToken}</p>
      <p>Thanks for registering us</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(404)
          .send({ message: "Server is too busy, Please try after sometime" });
      }

      console.log(`Email sent ${info.response}`);
      return res
        .status(204)
        .send({ message: "Password reset link sent successfully" });
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" + error });
  }
};

const ResetPassword = async (req, res) => {
  try {
    // const { resetToken, password } = req.body;
    // const existingUser = await User.findOne({ resetToken: resetToken });

    // // if (!existingUser) {
    // //   console.log("Invalid ResetToken");
    // //   return res.status(405).send({ message: "Invalid ResetToken" });
    // // }

    // const hashedPassword = await bcryt.hash(password, 10);
    // existingUser.password = hashedPassword;
    // resetToken = null;
    // await existingUser.save();
    return res.status(205).send({ message: "Password Reset Successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" + error });
  }
};

module.exports = { RegisterUser, LoginUser, ForgotPassword, ResetPassword };
