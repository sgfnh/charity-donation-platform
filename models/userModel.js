const Sequelize=require('sequelize')
const sequelize=require('../util/db')
const User=sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfBirth:Sequelize.DATEONLY,
        
    panNumber:Sequelize.STRING,
    passportNumber: Sequelize.STRING,
    charitydonation:Sequelize.BOOLEAN,
    isActive: {
       type: Sequelize.BOOLEAN,
       defaultValue: true}
})
module.exports=User;