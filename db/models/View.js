const { Sequelize } = require('sequelize');
const db = require('../db');

const View = db.define('view', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  years: {
    type: Sequelize.JSON,
    defaultValue: [],
  },
  genres: {
    type: Sequelize.JSON,
    defaultValue: [],
  },
  dateAdded: {
    type: Sequelize.JSON,
    defaultValue: {
      start: '1900-01-01',
      end: '',
    },
  },
  ratedBy: {
    type: Sequelize.JSON,
    defaultValue: [],
  },
  ratingMin: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  ratingMax: {
    type: Sequelize.FLOAT,
    defaultValue: 10,
  },
});

module.exports = View;
