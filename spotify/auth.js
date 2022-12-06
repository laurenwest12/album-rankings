const { client_id, client_secret } = require('../config/config');
const request = require('request');

const spotifyAuth = async () => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
    form: {
      grant_type: 'client_credentials',
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const token = body.access_token;
        resolve({
          statusCode: 200,
          token: token,
        });
      } else {
        reject({
          statusCode: response?.statusCode,
          error: response?.body?.error,
        });
      }
    });
  });
};

module.exports = {
  spotifyAuth,
};
