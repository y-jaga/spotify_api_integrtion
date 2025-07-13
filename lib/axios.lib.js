require("dotenv").config();
const axios = require("axios");
const token = process.env.SPOTIFY_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

module.exports = axiosInstance;
