const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const ConfigDB = require("./Database/ConfigDB");
const UserRoutes = require("./Routes/UserRoutes");
const SongsRoutes = require("./Routes/SongsRoutes");
const app = express();

app.use(bodyParser.json());
app.use(cors());

dotenv.config();
ConfigDB();

app.use("/user", UserRoutes);
app.use("/", SongsRoutes);
app.get("/", (req, res) => {
  res.send("We Developed the backend Successfully");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
