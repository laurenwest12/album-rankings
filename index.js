const express = require('express');
const app = express();

const { sheetAuth } = require('./sheet/auth');
const { getRows, getLastRow, addToDatabase } = require('./sheet/rows');
const { searchSpotify } = require('./spotify/search');

app.listen(3000, async () => {
  console.log('Listening...');
  try {
    const album = await searchSpotify({
      q: 'Midnights,Taylor Swift',
      type: 'album',
    });
    console.log(album);
  } catch (err) {
    console.log(err);
  }
});
