const db = require('./db');
const { Album, Artist, Review, User } = require('./models/index');

const syncAndSeed = async () => {
  try {
    await db.authenticate();
    await db.sync({ force: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  syncAndSeed,
};
