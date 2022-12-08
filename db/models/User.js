const { Sequelize } = require('Sequelize');
const db = require('../db');

const User = db.define('user', {
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
});

module.exports = User;
