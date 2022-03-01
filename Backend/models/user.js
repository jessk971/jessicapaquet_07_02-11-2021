'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(

        'User', {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN
        }, { tableName: 'users', }
    );

    User.associate = function(models) {
        User.hasMany(models.Publication, {
            foreignKey: "user_id",

        });
        User.hasMany(models.Comment, {

            foreignKey: "user_id",
        });
    };
    return User;
};