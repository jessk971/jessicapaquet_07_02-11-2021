'use strict';
module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define(
        'Publication', {
            userId: DataTypes.STRING,
            content: DataTypes.STRING,
            pictures: DataTypes.STRING,
            video: DataTypes.STRING,
            likes: DataTypes.STRING,
            comments: DataTypes.STRING
        }, {}
    );

    Publication.associate = function(models) {
        models.Publication.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Publication;
};