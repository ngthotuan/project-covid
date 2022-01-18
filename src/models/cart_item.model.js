const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'cart_item',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            category_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'category',
                    key: 'id',
                },
            },
            patient_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'patient',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'cart_item',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'cart_item_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};
