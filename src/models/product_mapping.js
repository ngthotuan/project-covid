const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'product_mapping',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            merchant_code: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            merchant_name: {
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
            tableName: 'product_mapping',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'FKhlx9eoh1bwvcaku2loa77ht5d',
                    using: 'BTREE',
                    fields: [{ name: 'partner_code' }],
                },
                {
                    name: 'FKo8bj18rh2pkw1s64dmweb7295',
                    using: 'BTREE',
                    fields: [{ name: 'product_code' }],
                },
            ],
        },
    );
};
