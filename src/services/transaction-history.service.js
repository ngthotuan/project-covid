const { sequelize } = require('../db');
const { TransactionHistoryModel } = require('../models')(sequelize);

const findAll = async (condition) => {
    return await TransactionHistoryModel.findAll(condition);
};

const save = (data) => {
    return TransactionHistoryModel.create(data);
};

module.exports = {
    findAll,
    save,
};
