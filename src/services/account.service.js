const { sequelize } = require('../db');
const { account: AccountModel } = require('../models')(sequelize);
const bcrypt = require('bcrypt');

const { RoleConstants } = require('../constants');

function findAll(condition) {
    return AccountModel.findAll(condition);
}

const findAccountByUsername = (username) => {
    return AccountModel.findOne({ where: { username } });
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

const createAccount = async (username, role) => {
    const newAccount = await AccountModel.create({
        username: username,
        role: role,
        is_active: true,
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

const changePassword = async (username, password) => {
    console.log({ username, password });
    const passwordHashed = bcrypt.hashSync(password, 8);
    const account = await AccountModel.findByPk(username);
    account.update({ password: passwordHashed });
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
        is_active: true,
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
