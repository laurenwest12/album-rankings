const db = require('./db');
const { Album, Artist, Review, User } = require('./models/index');

const createUsers = async (arr) => {
  for (let i = 0; i < arr.length; ++i) {
    await User.create(arr[i]);
  }

  console.log('Successfully created Users');
};

const createArtists = async (arr) => {
  for (let i = 0; i < arr.length; ++i) {
    await Artist.create(arr[i]);
  }
};

const syncAndSeed = async (artists) => {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    // await createUsers([
    //   { name: 'Doug' },
    //   { name: 'Lauren' },
    //   { name: 'Travis' },
    // ]);
    // await createArtists(artists);
    console.log('Successfully seeded');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  syncAndSeed,
};
