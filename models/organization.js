const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Organization = sequelize.define('Organization', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: Sequelize.STRING,
  address: Sequelize.STRING,
  mission: Sequelize.TEXT,

});

module.exports = Organization;