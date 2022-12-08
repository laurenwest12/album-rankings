require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const app = express();

const { syncAndSeed } = require('./db/seed');
const { sheetAuth } = require('./sheet/auth');
const { getRows, getLastRow, addToDatabase } = require('./sheet/rows');
const { searchSpotify } = require('./spotify/search');

app.listen(3000, async () => {
  console.log('Listening...');
  try {
    await syncAndSeed();
  } catch (err) {
    console.log(err);
  }
});
