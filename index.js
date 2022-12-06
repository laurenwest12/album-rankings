const express = require('express');
const app = express();

const { sheetAuth } = require('./sheet/auth');
const { getRows, getLastRow, addToDatabase } = require('./sheet/rows');
const { spotifyAuth } = require('./spotify/auth');

app.listen(3000, async () => {
  console.log('Listening...');
  try {
    const accessToken = await spotifyAuth();
  } catch (err) {
    console.log(err);
  }
});
