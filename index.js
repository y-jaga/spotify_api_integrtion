require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getTopTracks } = require("./controllers/tracksController");
const { getAccessToken } = require("./controllers/authenticateUser");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/callback", getAccessToken);

app.get("/spotify", getTopTracks);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
