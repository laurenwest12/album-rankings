const Album = require('./Album');
const Artist = require('./Artist');
const Category = require('./Category');
const CategoryAlbum = require('./CategoryAlbum');
const CategoryUser = require('./CategoryUser');
const Invite = require('./Invite');
const Review = require('./Review');
const User = require('./User');
const View = require('./View');
const ViewAlbum = require('./ViewAlbum');
const ViewArtist = require('./ViewArtist');
const ViewCategory = require('./ViewCategory');

Album.belongsToMany(Category, { through: CategoryAlbum });
Album.hasMany(Review);
Album.belongsTo(Artist);

Artist.hasMany(Album);

Category.belongsToMany(Album, { through: CategoryAlbum });
Category.belongsToMany(User, { through: CategoryUser });
Category.hasMany(Invite);

Invite.belongsTo(Category);
Invite.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Invite.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

Review.belongsTo(Album);
Review.belongsTo(User);

User.hasMany(Review);
User.belongsToMany(Category, { through: CategoryUser });
User.hasMany(Invite);
User.hasMany(View);

View.hasMany(User);
View.belongsToMany(Album, { through: ViewAlbum });
View.belongsToMany(Artist, { through: ViewArtist });
View.belongsToMany(Category, { through: ViewCategory });

module.exports = {
  Album,
  Artist,
  Category,
  Invite,
  Review,
  User,
  View,
};
