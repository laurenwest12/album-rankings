const { client_id, client_secret } = require('../config/config');
const axios = require('axios');

const spotifyAuth = async () => {
  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'client_credentials',
      },
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/json',
        },
      }
    );
    const { access_token } = res.data;
    return {
      status: res?.status,
      token: access_token,
    };
  } catch (err) {
    return {
      status: err?.response?.status,
      error: err?.response?.data,
    };
  }
};

module.exports = {
  spotifyAuth,
};
