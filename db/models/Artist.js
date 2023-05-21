const { Sequelize } = require('sequelize');
const db = require('../db');

const Artist = db.define('artist', {
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
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  popularity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  followers: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  genres: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: [],
  },
});

module.exports = Artist;
