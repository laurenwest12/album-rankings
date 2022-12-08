require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const app = express();

const { syncAndSeed } = require('./db/seed');
const { mapAlbums } = require('./functions/mappings/albumMapping');
const { mapArtists } = require('./functions/mappings/artistMapping');
const { sheetAuth } = require('./sheet/auth');
const {
  getRows,
  getLastRow,
  addToDatabase,
  getArtists,
  getAlbums,
} = require('./sheet/rows');
const { searchSpotify } = require('./spotify/search');

app.listen(3000, async () => {
  console.log('Listening...');
  try {
    // const artists = await getArtists();
    // const mappedArtists = await mapArtists(artists);

    const albums = await getAlbums();
    const mappedAlbums = await mapAlbums(albums);
    await syncAndSeed(mappedAlbums);

    // await syncAndSeed(mappedArtists);

    // const album = await searchSpotify({
    //   q: 'Midnights,Taylor Swift',
    //   type: 'album',
    // });
  } catch (err) {
    console.log(err);
  }
});
