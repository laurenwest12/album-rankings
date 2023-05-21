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
    type: Sequelize.json,
    defaultValue: [],
  },
  genres: {
    type: Sequelize.json,
    defaultValue: [],
  },
  genres: {
    type: Sequelize.json,
    defaultValue: {
      start: '1900-01-01',
      end: '',
    },
  },
});

module.exports = View;
