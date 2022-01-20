const { sequelize } = require('../db');
const { AccountHistoryModel } = require('../models')(sequelize);

const findAll = async (condition) => {
    return await AccountHistoryModel.findAll(condition);
};

const save = (data) => {
    return AccountHistoryModel.create(data);
};

const log = (id, action) => {
    return save({
        account_id: id,
        action,
        created_date: Date.now(),
    });
};

module.exports = {
    findAll,
    save,
    log,
};
