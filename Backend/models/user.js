'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN
        }, {}
    );

    User.associate = function(models) {
        // associations can be defined here
        models.User.hasMany(models.Publication);
    };

    return User;
};