const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'notification',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            created_date: {
                type: DataTypes.DATE,
                defaultValue: Date.now(),
            },
            view: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            patient_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'patient',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'notification',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'notification_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};
