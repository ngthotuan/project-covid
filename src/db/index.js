const { Sequelize } = require('sequelize');
require('dotenv').config();
const models = require('../models');

// Option 3: Passing parameters separately (other dialects)
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: false,
});

async function connect() {
    try {
        await sequelize.authenticate();
        const allModels = models(sequelize);
        await Promise.all(
            Object.values(allModels).map((model) =>
                model.sync({ alter: true }),
            ),
        );
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    connect,
    sequelize,
};
