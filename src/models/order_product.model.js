const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'order_product',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            order_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'orders',
                    key: 'id',
                },
            },
            category_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'category',
                    key: 'id',
                },
            },
            product_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'product',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'order_product',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'order_product_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};
