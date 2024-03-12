// controllers/songController.js
const Song = require("../Models/SongsModel");

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSong = async (req, res) => {
  const { title, artist, genre, filePath, imagePath } = req.body;

  try {
    const newSong = new Song({ title, artist, genre, filePath, imagePath });
    const savedSong = await newSong.save();
    console.log("Song Added");
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getSongsByArtist = async (req, res) => {
  const { artistName } = req.params;

  try {
    const songs = await Song.find({ artist: artistName });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
