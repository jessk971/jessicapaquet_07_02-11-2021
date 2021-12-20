const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')


const Publication = sequelize.define(

    'Publication', {
        user_id: DataTypes.INTEGER,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
    }, { tableName: 'publication', }
);

Publication.associate = function(models) {

    models.Publication.belongTo(models.User);
};

module.exports = Publication