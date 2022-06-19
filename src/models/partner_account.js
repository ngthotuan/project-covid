const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'partner_account',
        {
            username: {
                type: DataTypes.STRING(255),
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
            partner_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'partner',
                    key: 'name',
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
                    fields: [{ name: 'partner_name' }, { name: 'username' }],
                },
            ],
        },
    );
};
