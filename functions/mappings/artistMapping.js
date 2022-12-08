const { searchSpotify } = require('../../spotify/search');

const mapArtists = async (artists) => {
  const mapped = [];

  for (let i = 0; i < artists.length; ++i) {
    const artist = artists[i];
    console.log(artist);
    const spotifyRes = await searchSpotify({
      q: artist,
      type: 'artist',
    });

    spotifyRes.status === 200
      ? mapped.push({
          spotifyId: spotifyRes?.data?.id || '',
          name: spotifyRes?.data?.name || artist,
          spreadsheetName: artist,
          imageUrl: spotifyRes?.data?.images[0]?.url || '',
          popularity: spotifyRes?.data?.popularity || 0,
          followers: spotifyRes?.data?.followers?.total || 0,
          genres: spotifyRes?.data?.genres || [],
        })
      : mapped.push({
          spotifyId: '',
          name: artist,
          spreadsheetName: artist,
          imageUrl: '',
          popularity: 0,
          followers: 0,
          genres: [],
        });
  }

  return mapped.filter((artist, index) => mapped.indexOf(artist) === index);
};

module.exports = {
  mapArtists,
};
