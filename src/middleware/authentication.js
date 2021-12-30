const { USER, ADMIN, MANAGER } = require('../constants/role.constant');

const checkUsername = (req, res, next) => {
    const checkHasUsername = req.flash('username').length <= 0;
    if (checkHasUsername) {
        return res.redirect('/accounts/login');
    }
    next();
};

const checkAuthenAndAuthor = (req, res, next) => {
    console.log('authen....', !req.isAuthenticated());
    if (!req.isAuthenticated()) {
        return res.redirect('/accounts/login');
    }
    // const role = req.user.role;
    // const baseUrl = req.baseUrl;
    // const checkRoleAmdin = baseUrl === '/admin' && role !== ADMIN
    // const checkRoleManager = baseUrl === '/manage' && role !== MANAGER
    // if (checkRoleAmdin || checkRoleManager) {
    //     res.flash("err_msg", "Không được quyền")
    //     return res.redirect('back');
    // }
    next();
};

module.exports = {
    checkUsername,
    checkAuthenAndAuthor,
};
