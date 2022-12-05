const { GoogleSpreadsheet } = require('google-spreadsheet');
const { sheetId } = require('../config/config');

const sheetAuth = async () => {
  const creds = require('../config/album-rankings.json');
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.useServiceAccountAuth(creds);
  return doc;
};

module.exports = {
  sheetAuth,
};
