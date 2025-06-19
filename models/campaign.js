const Sequelize = require('sequelize')
const sequelize = require('../util/db');


const Campaign = sequelize.define('Campaign', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,

  imageUrl: Sequelize.STRING,         // NEW: image URL
  tags: Sequelize.STRING,
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }

});



module.exports = Campaign;