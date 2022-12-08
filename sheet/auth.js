const { GoogleSpreadsheet } = require('google-spreadsheet');

const sheetAuth = async () => {
  const creds = require('../config/album-rankings.json');
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
  await doc.useServiceAccountAuth(creds);
  await doc.useServiceAccountAuth(creds);
  return doc;
};

module.exports = {
  sheetAuth,
};
