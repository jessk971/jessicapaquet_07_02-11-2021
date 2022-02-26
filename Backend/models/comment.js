'use strict';

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'Comment', {

            user_id: DataTypes.INTEGER,
            post_id: DataTypes.INTEGER,
            content: DataTypes.STRING,
        }, { tableName: 'comment', }
    );


    Comment.associate = function(models) {
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Publication, {

            foreignKey: "post_id",

        });
    };
    return Comment;
}