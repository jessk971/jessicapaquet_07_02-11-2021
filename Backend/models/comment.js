const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/user');
const Publication = require('../models/publication')


const Comment = sequelize.define(
    'Comment', {

        comment: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,

    }, { tableName: 'comment', }
);


Comment.belongsTo(User, {
    foreignKey: 'user_id'


})
Comment.belongsTo(Publication, {
    foreignKey: 'post_id'


})

sequelize.sync()

module.exports = Comment