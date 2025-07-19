# 🎵 Spotify API Integration with Node.js

This project integrates the Spotify Web API using **Node.js**, **Express.js**, and **Axios**. It allows a logged-in Spotify user to:

- Authenticate via Spotify
- View their top 10 tracks
- See the currently playing song
- Play any of their top 10 tracks
- Pause the currently playing song

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **HTTP Client:** Axios
- **OAuth Flow:** Spotify Authorization Code Flow

---

## 🔧 Prerequisites

1. **Spotify Developer Account**: Create a Spotify App at  
   [https://developer.spotify.com/dashboard/applications](https://developer.spotify.com/dashboard/applications)

2. **Set Redirect URI in Spotify App Settings**  
   Example: `http://localhost:3000/callback/v1`

3. **Create `.env` file:**

   ```env
   CLIENT_ID = your_spotify_client_id
   CLIENT_SECRET = your_spotify_client_secret
   REDIRECT_URI = http://localhost:3000/callback/v1
   SPOTIFY_ACCESS_TOKEN = api_access_token
   ```
