const { sheetAuth } = require('./auth');

const getRows = async () => {
  const doc = await sheetAuth();
  await doc.loadInfo();
  const sheet = await doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  return rows;
};

const getLastRow = async () => {
  const rows = await getRows();
  const albumEntries = rows.filter((row) => row.Artist);
  const lastRowNumber = albumEntries[albumEntries.length - 1]._rowNumber;
  return lastRowNumber;
};

const addToDatabase = async () => {
  const lastRowNumber = await getLastRow();
  const rows = await getRows();
  rows[lastRowNumber - 1].Artist = 'Test Artist';
  rows[lastRowNumber - 1].Album = 'Test Album';
  await rows[lastRowNumber - 1].save();
};

module.exports = {
  getRows,
  getLastRow,
  addToDatabase,
};
