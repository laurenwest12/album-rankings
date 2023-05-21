const { searchSpotify } = require('../../spotify/search');

const mapAlbum = async (album) => {
  const { Album, Artist, Month, Year, Genre } = album;

  const spotifyRes = await searchSpotify({
    q: `${Album},${Artist}`,
    type: 'album',
  });

  const { data } = spotifyRes;

  return spotifyRes.status === 200
    ? {
        spotifyId: data?.id,
        name: data?.name,
        spreadsheetName: Album.trim(),
        spreadsheetArtist: Artist.trim(),
        month: Month,
        year: Year,
        release_date: data.release_date,
        genre: Genre,
        tracks: data.total_tracks,
        imageUrl: data?.images[0].url,
      }
    : {
        spotifyId: '',
        name: '',
        spreadsheetName: Album.trim(),
        spreadsheetArtist: Artist.trim(),
        month: Month,
        year: Year,
        release_date: '',
        genre: Genre,
        imageUrl: '',
      };
};

const mapAlbums = async (albums) => {
  const mapped = [];

  for (let i = 0; i < albums.length; ++i) {
    const album = albums[i];

    const { name, artist, month, year, genre } = album;

    const spotifyRes = await searchSpotify({
      q: `${name},${artist}`,
      type: 'album',
    });

    const { data } = spotifyRes;

    spotifyRes.status === 200
      ? mapped.push({
          spotifyId: data?.id,
          name: data?.name,
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
          spotifyId: '',
          name: '',
          spreadsheetName: name.trim(),
          spreadsheetArtist: artist.trim(),
          month,
          year,
          release_date: '',
          genre,
          imageUrl: '',
        });
  }
  return mapped;
};

module.exports = {
  mapAlbum,
  mapAlbums,
};
