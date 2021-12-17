const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/db')


const Comment = sequelize.define(
    'Comment', {
        user_id: DataTypes.INTEGER,
        comment: DataTypes.STRING,
    }, {}
);

Comment.associate = function(models) {
    models.Comment.belongsTo(models.User, {
        foreignKey: 'user_id'


    })
    models.Comment.belongsTo(models.Publication, {
        foreignKey: 'user_id'


    })
};


module.exports = Comment