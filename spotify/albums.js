const axios = require('axios');
const { spotifyAuth } = require('./auth');

const getAlbum = async () => {
  // const headers = {
  //   Authorization: `Bearer ${token}`,
  //   'Accept-Encoding': 'application/json',
  // };
  // // const res = await axios.get(
  // //   `https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy`,
  // //   {
  // //     headers: headers,
  // //   }
  // // );
  // // console.log(res);
};

module.exports = {
  getAlbum,
};
