const axios = require('axios');
const { spotifyAuth } = require('./auth');

const getHeaders = async () => {
  const { token } = await spotifyAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Accept-Encoding': 'application/json',
  };
  return headers;
};

const getAlbum = async (id) => {
  const headers = await getHeaders();

  const res = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
    headers: headers,
  });
};

module.exports = {
  getAlbum,
};
