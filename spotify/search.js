const axios = require('axios');
const qs = require('qs');
const { spotifyAuth } = require('./auth');

const getHeaders = async () => {
  const { token } = await spotifyAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Accept-Encoding': 'application/json',
  };
  return headers;
};

const searchSpotify = async (obj) => {
  const headers = await getHeaders();
  let { type } = obj;
  type += 's';

  const string = qs.stringify(obj);
  const url = `https://api.spotify.com/v1/search?${string}`;

  try {
    const res = await axios.get(url, {
      headers: headers,
    });

    return {
      status: res.status,
      data: res.data[type].items[0],
    };
  } catch (err) {
    return err;
  }
};

module.exports = {
  searchSpotify,
};
