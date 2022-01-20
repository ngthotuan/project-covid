const { accountService, accountHistoryService } = require('../services');
const passport = require('passport');
const { RoleConstants } = require('../constants');
const roleConstant = require('../constants/role.constant');

const getCreateAccount = (req, res, next) => {
    let roles = RoleConstants;
    delete roles.USER;
    res.render('managers/form', { title: 'Tạo tài khoản', roles });
};

const postCreateAccount = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const role = req.body.role;

    if (!username || !password) {
        req.flash('username', username);
        req.flash('password', password);
        req.flash('error_msg', 'Thiếu trường username hoặc password');
        return res.redirect('/managers/create');
    }

    if (!confirmPassword || confirmPassword !== password) {
        req.flash('error_msg', 'Vui lòng xác nhận lại mật khẩu');
        return res.redirect('/managers/create');
    }

    try {
        const existedAccount = await accountService.findAccountByUsername(
            username,
        );
        if (existedAccount) {
            req.flash('error_msg', 'Username đã tồn tại');
            req.flash('username', username);
            res.redirect('/managers/create');
        }

        const newAccount = await accountService.createAccount(
            username,
            password,
            role,
        );
        req.flash('success_msg', 'Tạo tài khoản khẩu thành công');
        return res.redirect('/managers');
    } catch (err) {
        req.flash('username', username);
        req.flash('password', password);
        req.flash('error_msg', 'Đã có lỗi xảy ra');
        console.log(err);
        return res.redirect('/managers');
    }
};

const getList = async (req, res, next) => {
    const accounts = await accountService.findAll({
        where: { role: roleConstant.MANAGER },
        attributes: { exclude: ['password'] },
    });
    res.render('managers/list', { title: 'Danh sách tài khoản', accounts });
};

const getBlockAccount = async (req, res, next) => {
    const id = req.params.id;
    const account = await accountService.findById(id);
    if (account && !account.blocked) {
        await accountService.update(id, { blocked: true });
    }
    res.redirect('/managers');
};

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let account = await accountService.findById(id);
        delete account.password;

        const condition = {
            where: { account_id: id },
        };
        const accountHistory = await accountHistoryService.findAll(condition);
        res.render('managers/detail', {
            title: 'Thông tin người quản lý',
            manager: account,
            account_histories: accountHistory,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getUnBlockAccount = async (req, res, next) => {
    const id = req.params.id;
    const account = await accountService.findById(id);
    if (account && account.blocked) {
        await accountService.update(id, { blocked: false });
    }
    res.redirect('/managers');
};

module.exports = {
    getCreateAccount,
    postCreateAccount,
    getList,
    getBlockAccount,
    getById,
    getUnBlockAccount,
};
