const Artist = require('./Artist');
const Album = require('./Album');
const Review = require('./Review');
const User = require('./User');

Artist.hasMany(Album);
Album.belongsTo(Artist);

Artist.hasMany(Review);
Review.belongsTo(Artist);

Album.hasMany(Review);
Review.belongsTo(Album);

User.hasMany(Review);
Review.belongsTo(User);

module.exports = {
  Artist,
  Album,
  Review,
  User,
};
