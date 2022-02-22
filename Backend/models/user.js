const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')


const User = sequelize.define(
    'User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, { tableName: 'users', }
);

User.associate = function(models) {

    models.User.hasMany(models.Publication);
    models.Publication.hasMany(models.Comment);
};
sequelize.sync()


module.exports = User