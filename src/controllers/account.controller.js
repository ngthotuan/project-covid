const { accountService, accountHistoryService } = require('../services');
const passport = require('passport');
const { RoleConstants } = require('../constants');
const roleConstant = require('../constants/role.constant');

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

const getLoginUsername = (req, res, next) => {
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
            return res.redirect('/');
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

const getCreateAccount = (req, res, next) => {
    const roles = RoleConstants;
    res.render('accounts/form', { title: 'Tạo tài khoản', roles });
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
        return res.redirect('/accounts/create');
    }

    if (!confirmPassword || confirmPassword !== password) {
        req.flash('error_msg', 'Vui lòng xác nhận lại mật khẩu');
        return res.redirect('/accounts/create');
    }

    try {
        const existedAccount = await accountService.findAccountByUsername(
            username,
        );
        if (existedAccount) {
            req.flash('error_msg', 'Username đã tồn tại');
            req.flash('username', username);
            res.redirect('/accounts/create');
        }

        const newAccount = await accountService.createAccount(
            username,
            password,
            role,
        );
        req.flash('success_msg', 'Tạo tài khoản khẩu thành công');
        return res.redirect('/accounts');
    } catch (err) {
        req.flash('username', username);
        req.flash('password', password);
        req.flash('error_msg', 'Đã có lỗi xảy ra');
        console.log(err);
        return res.redirect('/accounts');
    }
};

const getList = async (req, res, next) => {
    const accounts = await accountService.findAll({
        where: { role: roleConstant.MANAGER },
        attributes: { exclude: ['password'] },
    });
    res.render('accounts/list', { title: 'Danh sách tài khoản', accounts });
};

const getBlockAccount = async (req, res, next) => {
    const id = req.params.id;
    const account = await accountService.findById(id);
    if (account && !account.blocked) {
        await accountService.update(id, { blocked: true });
    }
    res.redirect('/accounts');
};

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let account = await accountService.findById(id);
        delete account.password;
        let history = await accountHistoryService.findAll({
            where: {
                account_id: id,
            },
        });
        history;
        console.log(account);

        res.json(account);
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
    res.redirect('/accounts');
};

const getUpdate = async (req, res, next) => {};

module.exports = {
    list,
    getLoginUsername,
    postLoginUsername,
    postLoginPassword,
    postLoginCreate,
    getLoginCreate,
    getLoginPassword,
    getLogout,
    getCreateAccount,
    postCreateAccount,
    getList,
    getBlockAccount,
    getById,
    getUnBlockAccount,
    getUpdate,
};
