// models/Song.js
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String },
  filePath: { type: String, required: true },
  imagePath: { type: String }, // Add an image path field
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
