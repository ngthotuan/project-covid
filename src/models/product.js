const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'product',
        {
            code: {
                type: DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'product',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'code' }],
                },
            ],
        },
    );
};
