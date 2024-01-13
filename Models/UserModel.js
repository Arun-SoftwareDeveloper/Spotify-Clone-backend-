const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 20,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "transgender", "not prefer to say"],
  },
  resetToken: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
