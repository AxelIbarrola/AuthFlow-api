const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const RefreshTokens = sequelize.define('RefreshTokens',{
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        tableName: 'refresh_tokens',
        timestamps:  true,
    }
)

module.exports = {RefreshTokens}