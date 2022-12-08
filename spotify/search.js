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
    let res = await axios.get(url, {
      headers: headers,
    });

    if (res.data[type].items[0]) {
      return {
        status: res.status,
        data: res.data[type].items[0],
      };
    } else {
      const qArr = obj.q.split(',');
      obj.q = qArr[0];
      const newStr = qs.stringify(obj);
      const newUrl = `https://api.spotify.com/v1/search?${newStr}`;

      const newRes = await axios.get(newUrl, {
        headers: headers,
      });

      if (newRes.data[type].items[0]) {
        return {
          status: newRes.status,
          data: newRes.data[type].items[0],
        };
      } else {
        return {
          status: 404,
        };
      }
    }
  } catch (err) {
    return err;
  }
};

module.exports = {
  searchSpotify,
};
