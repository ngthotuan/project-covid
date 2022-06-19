const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'account',
        {
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            role: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'account',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'username' }],
                },
            ],
        },
    );
};
