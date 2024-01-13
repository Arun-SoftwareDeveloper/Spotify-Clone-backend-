const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const DBURL = process.env.DBURL;
const DBConnection = async () => {
  try {
    const connection = await mongoose.connect(DBURL);
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.log("Error in connecting DB" + "" + error);
  }
};

module.exports = DBConnection;
