const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'partner',
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
            tableName: 'partner',
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
