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
  console.log('Creaded Albums');
};

const syncAndSeed = async (albums) => {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    console.log('Seeded database');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  syncAndSeed,
};
