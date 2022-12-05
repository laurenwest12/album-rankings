const express = require('express');
const app = express();

const { sheetAuth } = require('./sheet/auth');
const { getRows, getLastRow, addToDatabase } = require('./sheet/rows');

app.listen(3000, async () => {
  console.log('Listening...');
  try {
    const doc = await sheetAuth();
  } catch (err) {
    console.log(err);
  }
});
