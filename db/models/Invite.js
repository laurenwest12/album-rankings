const { Sequelize } = require('sequelize');
const db = require('../db');

const Invite = db.definte('invite', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accepted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Invite;
