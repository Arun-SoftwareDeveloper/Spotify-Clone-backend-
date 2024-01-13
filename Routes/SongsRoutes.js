// routes/api.js
const express = require("express");
const router = express.Router();
const songController = require("../Controllers/SongsController");

router.get("/songs", songController.getAllSongs);
router.post("/songs", songController.createSong);
// Add other routes as needed

module.exports = router;
