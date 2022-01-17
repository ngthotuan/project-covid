const { USER, ADMIN, MANAGER } = require('../constants/role.constant');

// const checkUsername = (req, res, next) => {
//     const checkHasUsername = req.flash('username').length <= 0;
//     console.log(
//         'check has username...',
//         req.flash('username')[0],
//         checkHasUsername,
//     );
//     // if (checkHasUsername) {
//     //     return res.redirect('/accounts/login');
//     // }
//     next();
// };

const checkAuthenAndAuthor = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/accounts/login');
    }
    const role = req.user.role;
    const baseUrl = req.baseUrl;
    // const checkRoleUser = (baseUrl === '/user' || baseUrl === '/') && role === USER
    // console.log("base url...", req)
    // if (!checkRoleUser) {
    //     req.flash("err_msg", "Không được quyền")
    //     return res.redirect('/');
    // }
    next();
};

module.exports = {
    checkAuthenAndAuthor,
};
