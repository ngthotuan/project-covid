const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'transaction_histories',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            created_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            code: {
                type: DataTypes.STRING(255),
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
            tableName: 'transaction_histories',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'transaction_histories_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};
