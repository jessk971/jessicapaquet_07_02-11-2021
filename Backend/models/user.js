const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')


const User = sequelize.define(
    'User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {}
);

User.associate = function(models) {

    models.User.hasMany(models.publication);
    models.post.hasMany(models.comment);
};


module.exports = User