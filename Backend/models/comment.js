const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/db')


const Comment = sequelize.define(
    'Comment', {

        comment: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,

    }, { tableName: 'comment', }
);

Comment.associate = function(models) {
    models.Comment.belongsTo(models.user, {
        foreignKey: 'user_id'


    })
    models.Comment.belongsTo(models.publication, {
        foreignKey: 'post_id'


    })
};
sequelize.sync()

module.exports = Comment