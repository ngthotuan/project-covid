const { accountService, accountHistoryService } = require('../services');
const passport = require('passport');
const { RoleConstants } = require('../constants');
const roleConstant = require('../constants/role.constant');
const bcrypt = require('bcrypt');

function list(req, res, next) {
    accountService
        .findAll()
        .then((accounts) => res.json(accounts))
        .catch((err) => next(err));
}

const getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/accounts/login');
};

const getLoginUsername = async (req, res, next) => {
    const isInit = (await accountService.count()) === 0;
    if (isInit) {
        return res.redirect('/accounts/init');
    }
    const username = req.flash('username')[0] || '';
    res.render('accounts/form-username', {
        layout: 'layouts/layout',
        username,
    });
};

const postLoginUsername = async (req, res, next) => {
    const username = req.body.username;
    const account = await accountService.findAccountByUsername(username);
    if (!account) {
        req.flash('error_msg', 'User không tồn tại');
        req.flash('username', username);
        res.redirect('/accounts/login');
    } else if (account.blocked) {
        req.flash('error_msg', 'Tài khoản của bạn đã bị khóa');
        req.flash('username', username);
        res.redirect('/accounts/login');
    } else if (!account.password) {
        req.flash('username', username);
        res.redirect('/accounts/login/create');
    } else {
        req.flash('username', username);
        res.redirect('/accounts/login/password');
    }
};

const getLoginPassword = (req, res, next) => {
    const password = req.flash('password')[0] || '';
    const username = req.flash('username')[0] || '';
    if (!username || username === '') {
        return res.redirect('/accounts/login');
    }
    res.render('accounts/form-password', {
        username,
        password,
        layout: 'layouts/layout',
    });
};

const postLoginPassword = (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
            req.flash('error_msg', info.message);
            req.flash('username', info.username);
            req.flash('password', info.password);
            return res.redirect('/accounts/login/password');
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.redirect('/accounts/login');
            }
            switch (user.role) {
                case RoleConstants.MANAGER:
                    return res.redirect('/dashboard');
                case RoleConstants.USER:
                    return res.redirect('/users/details');
                default:
                    return res.redirect('/');
            }
        });
    })(req, res, next);
};

const getLoginCreate = async (req, res, next) => {
    const username = req.flash('username')[0] || '';
    const password = req.flash('password')[0] || '';
    if (!username || username === '') {
        return res.redirect('/accounts/login');
    }
    res.render('accounts/form-create-password', {
        username,
        password,
        layout: 'layouts/layout',
    });
};

const postLoginCreate = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        req.flash('username', username);
        req.flash('password', password);
        req.flash('error_msg', 'Thiếu trường username hoặc password');
        return res.redirect('/accounts/login/create');
    }

    try {
        const account = await accountService.createPasswordInLogin(
            username,
            password,
        );
        req.flash('success_msg', 'Tạo mật khẩu thành công');
        return res.redirect('/accounts/login');
    } catch (err) {
        req.flash('username', username);
        req.flash('password', password);
        req.flash('error_msg', 'Đã có lỗi xảy ra');
        return res.redirect('/accounts/login/create');
    }
};

const getInit = async (req, res, next) => {
    const isInit = (await accountService.count()) === 0;
    if (!isInit) {
        return res.redirect('/');
    }
    res.render('accounts/init', {
        layout: 'layouts/layout',
    });
};

const postInit = async (req, res) => {
    const { username, password } = req.body;
    await accountService.createAdminAccount(username, password);
    req.flash('success_msg', 'Tạo tài khoản thành công');
    return res.redirect('/login');
};

const getChangePassword = (req, res) => {
    res.render('accounts/change-password', {
        title: 'Thay đổi mật khẩu',
    });
};

const postChangePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!bcrypt.compareSync(oldPassword, req.user.password)) {
        req.flash('error_msg', 'Mật khẩu cũ không chính xác!');
    } else {
        try {
            await accountService.changePassword(req.user.username, newPassword);
            req.flash('success_msg', 'Thay đổi mật khẩu thành công!');
        } catch (error) {
            console.error('user.controller change password', error);
            req.flash('error_msg', 'Thay đổi mật khẩu thất bại!');
        }
    }
    res.redirect('/accounts/change-password');
};

const getCreateAccount = (req, res, next) => {
    let roles = RoleConstants;
    res.render('accounts/manager-form', { title: 'Tạo tài khoản', roles });
};

const postCreateAccount = async (req, res, next) => {
    const username = req.body.username;
    const role = req.body.role;

    try {
        const existedAccount = await accountService.findAccountByUsername(
            username,
        );
        if (existedAccount) {
            req.flash('error_msg', 'Username đã tồn tại');
            return res.redirect('/accounts/managers/create');
        }

        await accountService.createAccount(username, role);
        req.flash('success_msg', 'Tạo tài khoản thành công');
        return res.redirect('/accounts/managers');
    } catch (err) {
        req.flash('error_msg', 'Đã có lỗi xảy ra');
        console.log(err);
        return res.redirect('/accounts/managers');
    }
};

const getList = async (req, res, next) => {
    const accounts = await accountService.findAll({
        // where: { role: roleConstant.MANAGER },
        attributes: { exclude: ['password'] },
    });
    res.render('accounts/manager-list', {
        title: 'Danh sách tài khoản',
        accounts,
    });
};

const getBlockAccount = async (req, res, next) => {
    const id = req.params.id;
    const account = await accountService.findById(id);
    if (account && !account.blocked) {
        await accountService.update(id, { blocked: true });
    }
    res.redirect('/accounts/managers');
};

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let account = await accountService.findById(id);
        delete account.password;

        res.render('accounts/manager-detail', {
            title: 'Thông tin người quản lý',
            manager: account,
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
    res.redirect('/accounts/managers');
};

module.exports = {
    list,
    getLoginUsername,
    postLoginUsername,
    postLoginPassword,
    postLoginCreate,
    getLoginCreate,
    getLoginPassword,
    getLogout,
    getInit,
    postInit,
    getChangePassword,
    postChangePassword,
    getCreateAccount,
    postCreateAccount,
    getList,
    getBlockAccount,
    getById,
    getUnBlockAccount,
};
