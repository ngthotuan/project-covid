const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'partner_account',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            password2: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            partner_code: {
                type: DataTypes.STRING(255),
                allowNull: true,
                references: {
                    model: 'partner',
                    key: 'code',
                },
            },
        },
        {
            sequelize,
            tableName: 'partner_account',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'FKffh0e7j96sd5h9e2idhyosq5v',
                    using: 'BTREE',
                    fields: [{ name: 'partner_code' }],
                },
            ],
        },
    );
};
