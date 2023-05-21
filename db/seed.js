const db = require('./db');
const { Album, Artist, Review, User } = require('./models/index');

const createUsers = async (arr) => {
  const errors = [];
  for (let i = 0; i < arr.length; ++i) {
    try {
      await User.create(arr[i]);
    } catch (err) {
      errors.push({
        ...arr[i],
        err: err?.message,
      });
    }
  }

  console.log('Created Users');
};

const createArtists = async (arr) => {
  const errors = [];
  for (let i = 0; i < arr.length; ++i) {
    try {
      await Artist.create(arr[i]);
    } catch (err) {
      errors.push({
        ...arr[i],
        err: err?.message,
      });
    }
  }

  console.log('Created Artists');
};

const createAlbums = async (arr) => {
  const errors = [];
  for (let i = 0; i < arr.length; ++i) {
    let album = arr[i];
    const { spreadsheetArtist } = album;
    const artist = await Artist.findOne({
      where: { spreadsheetName: spreadsheetArtist },
    });

    const artistUid = artist.dataValues.uid;

    album = { ...album, artistUid };

    try {
      await Album.create(album);
    } catch (err) {
      errors.push({
        ...album,
        err: err?.message,
      });
    }
  }
  console.log('Created Albums');
};

const createReviews = async (arr) => {
  const errors = [];
  for (let i = 0; i < arr.length; ++i) {
    let review = arr[i];
    const {
      spreadsheetArtist,
      spreadsheetAlbum,
      userName,
      rating,
      favoriteSong,
    } = review;

    const artist = await Artist.findOne({
      where: { spreadsheetName: spreadsheetArtist },
    });
    const artistUid = artist.dataValues.uid;

    const album = await Album.findOne({
      where: { spreadsheetName: spreadsheetAlbum },
    });
    const albumUid = album.dataValues.uid;

    const userObj = await User.findOne({
      where: { name: userName },
    });
    const userUid = userObj.dataValues.uid;

    review = {
      spreadsheetAlbum,
      spreadsheetArtist,
      rating,
      favoriteSong,
      artistUid,
      albumUid,
      userUid,
    };

    await Review.create(review);
  }
  console.log('Created Reviews');
};

const syncAndSeed = async (users, artists, albums, reviews) => {
  try {
    await db.authenticate();
    await db.sync({ force: true });

    await createUsers(users);
    await createArtists(artists);
    await createAlbums(albums);
    await createReviews(reviews);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  syncAndSeed,
};
