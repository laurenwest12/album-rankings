const getRows = async (doc) => {
  await doc.loadInfo();
  const sheet = await doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  return rows;
};

const getLastRow = async (doc) => {
  const rows = await getRows(doc);
  const albumEntries = rows.filter((row) => row.Artist);
  const lastRowNumber = albumEntries[albumEntries.length - 1]._rowNumber;
  return lastRowNumber;
};

const addToDatabase = async (doc) => {
  const lastRowNumber = await getLastRow(doc);
  const rows = await getRows(doc);
  rows[lastRowNumber - 1].Artist = 'Test Artist';
  rows[lastRowNumber - 1].Album = 'Test Album';
  await rows[lastRowNumber - 1].save();
};

module.exports = {
  getRows,
  getLastRow,
  addToDatabase,
};
