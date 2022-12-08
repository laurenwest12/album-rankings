const { Sequelize } = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  spreadsheetAlbum: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  spreadsheetArtist: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  favoriteSong: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  ranking: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: [],
  },
});

module.exports = Review;
