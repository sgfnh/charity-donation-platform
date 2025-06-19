const Sequelize = require('sequelize')
const sequelize = require('../util/db')
const damount = sequelize.define('donation', {

  amount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  cause: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING
  }
})
module.exports = damount;