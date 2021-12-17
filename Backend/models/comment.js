const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/db')


const Comment = sequelize.define(
    'Comment', {

        comment: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,

    }, {}
);

Comment.associate = function(models) {
    models.Comment.belongsTo(models.User, {
        foreignKey: 'user_id'


    })
    models.Comment.belongsTo(models.Publication, {
        foreignKey: 'post_id'


    })
};


module.exports = Comment