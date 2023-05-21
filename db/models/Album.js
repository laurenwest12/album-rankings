const { Sequelize } = require('sequelize');
const db = require('../db');

const Album = db.define('album', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // spreadsheetName: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  month: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tracks: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  releaseDate: {},
  dateAdded: {},
  spotifyGenres: {
    type: Sequelize.json,
    allowNull: false,
    defaultValue: [],
  },
  popularity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Album;
