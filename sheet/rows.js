const { mapAlbum } = require('../functions/mappings/albumMapping');
const { mapArtist } = require('../functions/mappings/artistMapping');
const { googleSheetsAuth } = require('./auth');
const Sheet = require('./mapping');

const getRows = async () => {
  // Get the sheet and the row data
  const sheet = await getSheet();
  const { rowData } = sheet[0];

  let firstRow = rowData[0]?.values;
  const albumRanking = new Sheet();
  albumRanking.addUsers(firstRow);
  console.log(albumRanking.users);
  // // Get the last row where there is data
  // let lastRow = rows.length;

  // // Find the artist associated with the last row if there is one
  // let lastRowArtist = rows[lastRow]?.Artist;

  // // Keep looping through the last rows in the sheet until you find a row that has an artist, this is to find the last artist that was added
  // while (!lastRowArtist) {
  //   lastRow--;
  //   lastRowArtist = rows[lastRow]?.Artist;
  // }

  // return lastRow;
};

const getSheet = async () => {
  const data = await googleSheetsAuth();
  const firstSheet = data[0].data;
  return firstSheet;
  // await doc.loadInfo();
  // const sheet = await doc.sheetsByIndex[0];
  // const rows = await sheet.getRows();
  // return rows;
};

const addToDatabase = async () => {
  const lastRowNumber = await getLastRow();
  const rows = await getRows();
  rows[lastRowNumber - 1].Artist = 'Test Artist';
  rows[lastRowNumber - 1].Album = 'Test Album';
  await rows[lastRowNumber - 1].save();
};

const getData = async () => {
  const rows = await getRows();
  const artists = [];
  const albums = [];
  const reviews = [];

  const freqArtist = {};

  for (let i = 0; i < rows.length; ++i) {
    // ARTIST PROCESS
    // Get the artist name from the spreadsheet
    let { Artist, Album, Genre, Month, Year } = rows[i];

    // If it is the header row or the artist / album / genre are missing, skip this row
    if (!Artist || Artist === 'Artist' || !Album || !Genre) continue;

    Artist = Artist.trim();
    Album = Album.trim();
    Genre = Genre.trim();
    Month = Month.trim();

    if (!freqArtist[Artist]) {
      // Add the artist to a frequency counter so it won't be mapped again
      freqArtist[Artist] = 1;
      // Map the artist to format needed for db
      const mappedArtist = await mapArtist(Artist);
      // Add artist to arr
      artists.push(mappedArtist);
    }

    // ALBUM PROCESS
    if (Album && Album !== 'Album' && Genre) {
      const mappedAlbum = await mapAlbum({ Album, Artist, Month, Year, Genre });
      albums.push(mappedAlbum);
    }

    // REVIEWS PROCESS
    const {
      LaurenRating,
      TravisRating,
      DougRating,
      LaurenSong,
      TravisSong,
      DougSong,
    } = rows[i];

    if (DougRating && DougSong) {
      reviews.push({
        spreadsheetArtist: Artist,
        spreadsheetAlbum: Album,
        userName: 'Doug',
        rating: DougRating,
        favoriteSong: DougSong,
      });
    }

    if (LaurenRating && LaurenSong) {
      reviews.push({
        spreadsheetArtist: Artist,
        spreadsheetAlbum: Album,
        userName: 'Lauren',
        rating: LaurenRating,
        favoriteSong: LaurenSong,
      });
    }

    if (TravisRating && TravisSong) {
      reviews.push({
        spreadsheetArtist: Artist,
        spreadsheetAlbum: Album,
        userName: 'Travis',
        rating: TravisRating,
        favoriteSong: TravisSong,
      });
    }
  }

  return {
    artists,
    albums,
    reviews,
  };
};

const getArtists = async () => {
  const rows = await getRows();
  const artists = [];
  for (let i = 0; i < rows.length; ++i) {
    rows[i].Artist && artists.push(rows[i].Artist.trim());
  }

  const uniqueArtists = artists.filter(
    (artist, index) => artists.indexOf(artist) === index && artist !== 'Artist'
  );

  return uniqueArtists.sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
};

const getAlbums = async () => {
  let rows = await getRows();
  rows = rows.filter((row) => row.Album);
  const albums = [];

  for (let i = 0; i < rows.length; ++i) {
    const album = rows[i];
    albums.push({
      name: album.Album,
      artist: album.Artist,
      month: album.Month,
      year: album.Year,
      genre: album.Genre,
    });
  }

  return albums
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    .filter((album) => album.name !== 'Album');
};

const getReviews = async () => {
  let rows = await getRows();
  rows = rows.filter(
    ({ LaurenRating, TravisRating, DougRating, Artist }) =>
      (LaurenRating || TravisRating || DougRating) &&
      Artist !== 'Artist' &&
      Artist
  );
  const reviews = [];

  for (let i = 0; i < rows.length; ++i) {
    const review = rows[i];
    const {
      Artist,
      Album,
      LaurenRating,
      TravisRating,
      DougRating,
      LaurenSong,
      TravisSong,
      DougSong,
    } = review;

    if (DougRating && DougSong) {
      reviews.push({
        spreadsheetArtist: Artist,
        spreadsheetAlbum: Album,
        userName: 'Doug',
        rating: DougRating,
        favoriteSong: DougSong,
      });
    }

    if (LaurenRating && LaurenSong) {
      reviews.push({
        spreadsheetArtist: Artist,
        spreadsheetAlbum: Album,
        userName: 'Lauren',
        rating: LaurenRating,
        favoriteSong: LaurenSong,
      });
    }

    if (TravisRating && TravisSong) {
      reviews.push({
        spreadsheetArtist: Artist,
        spreadsheetAlbum: Album,
        userName: 'Travis',
        rating: TravisRating,
        favoriteSong: TravisSong,
      });
    }
  }

  return reviews;
};

module.exports = {
  getRows,
  addToDatabase,
  getData,
  getArtists,
  getAlbums,
  getReviews,
};
