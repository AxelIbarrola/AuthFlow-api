const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const { RefreshTokens } = require('./RefreshTokens');

const User = sequelize.define(
    'User',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6, 100]
            } 
            
        }
    },
    {
        tableName: 'users',
        timestamps: true

    }
)

User.hasMany(RefreshTokens, { foreignKey: 'userId'})
RefreshTokens.belongsTo(User, { foreignKey: 'userId'})

module.exports =  { User }