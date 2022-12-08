require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const app = express();

const { syncAndSeed } = require('./db/seed');
const { mapArtists } = require('./functions/artistMapping');
const { sheetAuth } = require('./sheet/auth');
const {
  getRows,
  getLastRow,
  addToDatabase,
  getArtists,
} = require('./sheet/rows');
const { searchSpotify } = require('./spotify/search');

app.listen(3000, async () => {
  console.log('Listening...');
  try {
    const artists = await getArtists();
    const mappedArtists = await mapArtists(artists);
    await syncAndSeed(mappedArtists);

    // const album = await searchSpotify({
    //   q: 'Midnights,Taylor Swift',
    //   type: 'album',
    // });
  } catch (err) {
    console.log(err);
  }
});
