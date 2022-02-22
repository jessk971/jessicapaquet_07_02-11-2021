const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')
const User = require('../models/user')


const Publication = sequelize.define(

    'Publication', {
        user_id: DataTypes.INTEGER,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
    }, { tableName: 'publication', }
);



Publication.belongsTo(User, {

    foreignKey: "user_id"
});



sequelize.sync()

module.exports = Publication