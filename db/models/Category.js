const { Sequelize } = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncremenet: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Category;
