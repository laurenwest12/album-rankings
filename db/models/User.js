const { Sequelize } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;
