const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

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

module.exports =  { User }