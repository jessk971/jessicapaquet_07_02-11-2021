const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')


const Publication = sequelize.define(

    'Publication', {
        user_id: DataTypes.INTEGER,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
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


module.exports = Publication