const { searchSpotify } = require('../../spotify/search');

const mapAlbums = async (albums) => {
  const mapped = [];

  for (let i = 0; i < 5; ++i) {
    const album = albums[i];

    const { name, artist, month, year, genre } = album;

    const spotifyRes = await searchSpotify({
      q: `${name},${artist}`,
      type: 'album',
    });

    const { data } = spotifyRes;

    spotifyRes.status === 200
      ? mapped.push({
          name: data.name,
          spreadsheetName: name.trim(),
          spreadsheetArtist: artist.trim(),
          month,
          year,
          release_date: data.release_date,
          genre,
          tracks: data.total_tracks,
          imageUrl: data?.images[0].url,
        })
      : mapped.push({
          name: '',
          spreadsheetName: name.trim(),
          spreadsheetArtist: artist.trim(),
          month,
          year,
          release_date: '',
          genre,
          tracks: 0,
          imageUrl: '',
        });
  }
  return mapped;

  //   spotifyRes.status === 200
  //     ? mapped.push({
  //         spotifyId: spotifyRes?.data?.id || '',
  //         name: spotifyRes?.data?.name || artist,
  //         spreadsheetName: artist,
  //         imageUrl: spotifyRes?.data?.images[0]?.url || '',
  //         popularity: spotifyRes?.data?.popularity || 0,
  //         followers: spotifyRes?.data?.followers?.total || 0,
  //         genres: spotifyRes?.data?.genres || [],
  //       })
  //     : mapped.push({
  //         spotifyId: '',
  //         name: artist,
  //         spreadsheetName: artist,
  //         imageUrl: '',
  //         popularity: 0,
  //         followers: 0,
  //         genres: [],
  //       });
  // }

  // return mapped.filter((artist, index) => mapped.indexOf(artist) === index);
};

module.exports = {
  mapAlbums,
};
