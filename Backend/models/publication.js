'use strict';

module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define(

        'Publication', {
            user_id: DataTypes.INTEGER,
            content: DataTypes.STRING,
            image: DataTypes.STRING,
        }, { tableName: 'publication', }
    );


    Publication.associate = function(models) {
        Publication.belongsTo(models.User, {
            foreignKey: "user_id",

        });


        Publication.hasMany(models.Comment, {
            foreignKey: "post_id",

        });
    };
    return Publication;

};