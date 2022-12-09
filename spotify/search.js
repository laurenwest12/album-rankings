// Import the required libraries
const axios = require('axios');
const qs = require('qs');

//Import the Spotify authorization process
const { spotifyAuth } = require('./auth');

//Generates the headers needed to call Spotify API
const getHeaders = async () => {
  const { token } = await spotifyAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Accept-Encoding': 'application/json',
  };
  return headers;
};

/* Utilizes the Spotify search method
      - Takes in an object with format
        {
          type: '',
          q: ''
        }
        - Type will be either album or artist, determining the search type
        - q will be a string with search parameters separated by a comma
                ex: 'Midnights,Taylor Swift'
      - If successful returns an object with the status and data
      - If unsuccessful returns an object with a 404 status
}
*/

const searchSpotify = async (obj) => {
  // Get the headers needed to pass to Spotify
  const headers = await getHeaders();

  // Make the type plural
  let { type } = obj;
  type += 's';

  // Make the object a string that can be used in the query
  const string = qs.stringify(obj);
  const url = `https://api.spotify.com/v1/search?${string}`;

  try {
    let res = await axios.get(url, {
      headers: headers,
    });

    //If there is a result for the search, return the data
    if (res.data[type].items[0]) {
      return {
        status: res.status,
        data: res.data[type].items[0],
      };
    } else {
      //If there is not a result for the search, take only the first parameter and try a search for that
      //Ex: 'Midnights,Taylor Swift' would become 'Midnights'
      const qArr = obj.q.split(',');
      obj.q = qArr[0];
      const newStr = qs.stringify(obj);
      const newUrl = `https://api.spotify.com/v1/search?${newStr}`;

      const newRes = await axios.get(newUrl, {
        headers: headers,
      });

      //If there is now a result, return the data
      if (newRes.data[type].items[0]) {
        return {
          status: newRes.status,
          data: newRes.data[type].items[0],
        };
      } else {
        //If there is not a result, return an error status
        return {
          status: 404,
        };
      }
    }
  } catch (err) {
    return {
      status: err?.status,
      error: err?.message,
    };
  }
};

module.exports = {
  searchSpotify,
};
