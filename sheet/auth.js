// const { GoogleSpreadsheet } = require('google-spreadsheet');

// const sheetAuth = async () => {
//   const creds = require('../config/album-rankings.json');
//   const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
//   await doc.useServiceAccountAuth(creds);
//   await doc.useServiceAccountAuth(creds);
//   return doc;
// };

const { google } = require('googleapis');
const credentials = require('../credentials.json');

const googleSheetsAuth = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.SHEET_ID;

  try {
    const res = await sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: true,
    });
    return res.data.sheets;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  googleSheetsAuth,
};
