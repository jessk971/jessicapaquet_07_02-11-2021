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

    models.Publication.belongsTo(models.User, {

        foreignKey: { allowNull: false }
    });

    models.Publication.hasMany(models.Comment);
};
sequelize.sync()

module.exports = Publication