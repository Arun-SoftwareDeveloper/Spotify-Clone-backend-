const mongoose = require("mongoose");

const ArtsitSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
  },
});
