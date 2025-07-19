const axiosInstance = require("../lib/axios.lib");

const getTracks = async (req, res) => {
  try {
    const topTracks = await axiosInstance.get(
      "/v1/me/top/tracks?time_range=long_term&limit=10"
    );

    const currentlyPlaying = await axiosInstance.get(
      "/v1/me/player/currently-playing"
    );

    const topTenTracks = topTracks?.data?.items?.map(
      ({ name, artists }) =>
        `${name} by ${artists.map((artist) => artist.name).join(", ")}`
    );

    const currentlyPlayingSong = currentlyPlaying?.data?.item
      ? `${
          currentlyPlaying.data.item.name
        } by ${currentlyPlaying.data.item.artists
          .map((artist) => artist.name)
          .join(", ")}`
      : "No song is currently playing.";

    if (topTenTracks.length === 0) {
      return res.status(404).json({ error: "No tracks found." });
    }

    res.status(200).json([{ topTenTracks }, { currentlyPlayingSong }]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const pauseCurrentSong = async (req, res) => {
  try {
    await axiosInstance.put("/v1/me/player/pause");

    res.status(200).json({ message: "Playback paused successfully" });
  } catch (error) {
    if (error.status === 404) {
      return res
        .status(404)
        .json({ error: "No song is currently being played." });
    }

    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTracks, pauseCurrentSong };
