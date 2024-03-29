const { searchSpotify } = require('../../spotify/search');

const mapArtist = async (artist) => {
  const spotifyRes = await searchSpotify({
    q: artist,
    type: 'artist',
  });

  return spotifyRes.status === 200
    ? {
        spotifyId: spotifyRes?.data?.id || '',
        name: spotifyRes?.data?.name || artist,
        spreadsheetName: artist.trim(),
        imageUrl: spotifyRes?.data?.images[0]?.url || '',
        popularity: spotifyRes?.data?.popularity || 0,
        followers: spotifyRes?.data?.followers?.total || 0,
        genres: spotifyRes?.data?.genres || [],
      }
    : {
        spotifyId: '',
        name: artist.trim(),
        spreadsheetName: artist.trim(),
        imageUrl: '',
        popularity: 0,
        followers: 0,
        genres: [],
      };
};

const mapArtists = async (artists) => {
  const mapped = [];

  for (let i = 0; i < artists.length; ++i) {
    const artist = artists[i];
    const spotifyRes = await searchSpotify({
      q: artist,
      type: 'artist',
    });

    spotifyRes.status === 200
      ? mapped.push({
          spotifyId: spotifyRes?.data?.id || '',
          name: spotifyRes?.data?.name || artist,
          spreadsheetName: artist.trim(),
          imageUrl: spotifyRes?.data?.images[0]?.url || '',
          popularity: spotifyRes?.data?.popularity || 0,
          followers: spotifyRes?.data?.followers?.total || 0,
          genres: spotifyRes?.data?.genres || [],
        })
      : mapped.push({
          spotifyId: '',
          name: artist.trim(),
          spreadsheetName: artist.trim(),
          imageUrl: '',
          popularity: 0,
          followers: 0,
          genres: [],
        });
  }

  return mapped.filter((artist, index) => mapped.indexOf(artist) === index);
};

module.exports = {
  mapArtist,
  mapArtists,
};
