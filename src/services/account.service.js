const { sequelize } = require('../db');
const { AccountModel, AccountHistoryModel } = require('../models')(sequelize);
const bcrypt = require('bcrypt');

const { RoleConstants } = require('../constants');

function findAll(condition) {
    return AccountModel.findAll(condition);
}

const findAccountByUsername = (username) => {
    return AccountModel.findOne({ where: { username: username } });
};

const createPasswordInLogin = async (username, password) => {
    const account = await AccountModel.findOne({
        where: { username: username },
    });
    if (account.password) {
        throw Error('Username đã có mật khẩu');
        return;
    }
    const passwordHashed = bcrypt.hashSync(password, 8);
    await account.update({ password: passwordHashed });
    return account;
};

const createAccount = async (username, password, role) => {
    const passwordHashed = bcrypt.hashSync(password, 8);
    const newAccount = await AccountModel.create({
        username: username,
        password: passwordHashed,
        role: role,
        blocked: false,
        balance: 0,
    });
    return newAccount;
};

const findById = async (id) => {
    return AccountModel.findByPk(id);
};

const update = async (id, data) => {
    const product = await AccountModel.findByPk(id);
    product.update(data);
};

const changePassword = async (id, password) => {
    const passwordHashed = bcrypt.hashSync(password, 8);
    const account = await AccountModel.findByPk(id);
    account.update({ password: passwordHashed });
    AccountHistoryModel.create({
        account_id: id,
        action: 'Đổi mật khẩu',
        created_date: new Date(),
    });
};

const count = async () => {
    return AccountModel.count();
};

const createAdminAccount = async (username, password) => {
    const hashedPassword = bcrypt.hashSync(password, 8);
    return await AccountModel.create({
        username,
        password: hashedPassword,
        role: RoleConstants.ADMIN,
        blocked: false,
    });
};

module.exports = {
    findAll,
    findAccountByUsername,
    findById,
    createPasswordInLogin,
    createAccount,
    update,
    changePassword,
    count,
    createAdminAccount,
};
