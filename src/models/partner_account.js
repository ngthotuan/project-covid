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
                allowNull: false,
                references: {
                    model: 'partner',
                    key: 'code',
                },
            },
            product_code: {
                type: DataTypes.STRING(255),
                allowNull: true,
                references: {
                    model: 'product',
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
                    name: 'fk_pa_partner',
                    using: 'BTREE',
                    fields: [{ name: 'partner_code' }],
                },
                {
                    name: 'fk_pa_product',
                    using: 'BTREE',
                    fields: [{ name: 'product_code' }],
                },
            ],
        },
    );
};
