class Sheet {
  constructor(name) {
    this.name = name;
    this.headings = [];
    this.users = {};
    this.rows = [];
  }

  // Add all people that put their ratings on the spreadsheet to the users tab
  addUsers(firstRow) {
    // Loop through all the cells in the first row and get their value
    for (let i = 0; i < firstRow.length; ++i) {
      const cell = firstRow[i];
      const { userEnteredValue } = cell;
      const { stringValue } = userEnteredValue;

      // If the cell has the words rating and it isn't the average, add the user to the users object and what index the rating is for that user
      if (
        stringValue.indexOf('Rating') !== -1 &&
        stringValue.indexOf('Avg') === -1
      ) {
        const name = stringValue.substring(0, stringValue.indexOf('Rating'));
        this.users[name] = {
          rating: i,
        };
      }

      // If the cell has the words fav song and it isn't the average, add the name to the users array
      if (
        stringValue.indexOf('Song') !== -1 &&
        stringValue.indexOf('Avg') === -1
      ) {
        const name = stringValue.substring(0, stringValue.indexOf('Song'));
        this.users[name] = { ...this.users[name], ...{ song: i } };
      }
    }
  }

  addRows(data) {
    for (let i = 0; i < data.length; ++i) {}
  }
}

module.exports = Sheet;
