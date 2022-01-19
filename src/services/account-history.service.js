const { sequelize } = require('../db');
const { AccountHistoryModel } = require('../models')(sequelize);

const findAll = async (condition) => {
    return await AccountHistoryModel.findAll(condition);
};

const save = (data) => {
    return AccountHistoryModel.create(data);
};

module.exports = {
    findAll,
    save,
};
