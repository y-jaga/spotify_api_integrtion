require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  getTracks,
  pauseCurrentSong,
  playTopTenTrack,
} = require("./controllers/tracksController");
const { loginUser, getAccessToken } = require("./controllers/authUser");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/login", loginUser);

app.get("/callback", getAccessToken);

app.get("/spotify", getTracks);

app.put("/spotify/pause", pauseCurrentSong);

app.put("/spotify/play", playTopTenTrack);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
