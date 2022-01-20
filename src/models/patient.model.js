const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'patient',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            credit: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            debt: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            dob: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            create_date: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: Date.now(),
            },
            modified_date: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: Date.now(),
            },
            identity: {
                type: DataTypes.STRING(255),
                allowNull: true,
                unique: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            payment_min: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            district_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'district',
                    key: 'id',
                },
            },
            hospital_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'hospital',
                    key: 'id',
                },
            },
            parent_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'patient',
                    key: 'id',
                },
            },
            province_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'province',
                    key: 'id',
                },
            },
            ward_id: {
                fetch: 'EAGER',
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'ward',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'patient',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'patient_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};
