require("dotenv").config();
const axios = require("axios");
const querystring = require("querystring");

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "http://127.0.0.1:3000/callback";

//https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fcallback&scope=user-top-read
const getAccessToken = async (req, res) => {
  const code = req.query.code;
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri,
        client_id,
        client_secret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { access_token } = response.data;

    res.send(`Access token: ${access_token}`);
  } catch (err) {
    res.send(`Error getting token: ${err}`);
  }
};

module.exports = { getAccessToken };
