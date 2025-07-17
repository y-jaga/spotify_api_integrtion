require("dotenv").config();
const querystring = require("querystring");
const { generateRandomString } = require("../utils/utility");
const { default: axios } = require("axios");
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

//The first step is to request authorization from the user so that our app can access to the Spotify resources on the user's behalf.
const loginUser = async (req, res) => {
  try {
    const state = generateRandomString(16);
    const scope = "user-read-private user-read-email";
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccessToken = async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    res.json({ access_token, refresh_token });
  }
};

module.exports = { loginUser, getAccessToken };
