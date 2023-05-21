const { Sequelize } = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // spreadsheetAlbum: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   defaultValue: '',
  // },
  // spreadsheetArtist: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   defaultValue: '',
  // },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      isGreaterThanOrEqualToZero(value) {
        if (value < 0) {
          throw new Error('Rating must be greater than or equal to 0.');
        }
      },
      isLessThanOrEqualToTen(value) {
        if (value > 10) {
          throw new Error('Rating must be less than or equal to 10.');
        }
      },
    },
  },
  favoriteSong: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  // ranking: {
  //   type: Sequelize.JSON,
  //   allowNull: false,
  //   defaultValue: [],
  // },
});

module.exports = Review;
