const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'orders',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            created_time: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            total_amount: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            total_category: {
                type: DataTypes.BIGINT,
                allowNull: true,
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
            tableName: 'orders',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'orders_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};
