const db = require('./db');
const { Album, Artist, Review, User } = require('./models/index');

const createUsers = async (arr) => {
  for (let i = 0; i < arr.length; ++i) {
    await User.create(arr[i]);
  }

  console.log('Created Users');
};

const createArtists = async (arr) => {
  for (let i = 0; i < arr.length; ++i) {
    await Artist.create(arr[i]);
  }

  console.log('Created Artists');
};

const createAlbums = async (arr) => {
  for (let i = 0; i < arr.length; ++i) {
    let album = arr[i];
    const { spreadsheetArtist } = album;
    const artist = await Artist.findOne({
      where: { spreadsheetName: spreadsheetArtist },
    });

    const artistUid = artist.dataValues.uid;

    album = { ...album, artistUid };
    await Album.create(album);
  }
  console.log('Created Albums');
};

const createReviews = async (arr) => {
  for (let i = 0; i < arr.length; ++i) {
    let review = arr[i];
    const { spreadsheetArtist, spreadsheetAlbum, user, rating, favoriteSong } =
      review;

    const artist = await Artist.findOne({
      where: { spreadsheetName: spreadsheetArtist },
    });
    const artistUid = artist.dataValues.uid;

    const album = await Album.findOne({
      where: { spreadsheetName: spreadsheetAlbum },
    });
    const albumUid = album.dataValues.uid;

    const userObj = await User.findOne({
      where: { name: user },
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

const syncAndSeed = async (reviews) => {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    await createReviews(reviews);
    console.log('Seeded database');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  syncAndSeed,
};
