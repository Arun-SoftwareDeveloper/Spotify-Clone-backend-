// routes/api.js
const express = require("express");
const router = express.Router();
const songController = require("../Controllers/SongsController");

router.get("/songs", songController.getAllSongs);
router.post("/songs", songController.createSong);
router.get("/songs/artist/:artistName", songController.getSongsByArtist);

// Add other routes as needed

module.exports = router;
