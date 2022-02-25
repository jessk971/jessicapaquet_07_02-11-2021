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
        Comment.belongsTo(models.User, {
            foreignKey: "user_id",
        });
        Comment.belongsTo(models.Publication, {

            foreignKey: "post_id",
            onDelete: "CASCADE",
        });
    };
    return Comment;
}