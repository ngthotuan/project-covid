const moment = require('moment-timezone');
const { menu } = require('../config');

module.exports = (app) => {
    app.use(async (req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.menu = menu;
        res.locals.moment = moment;
        res.locals.user = req.user;
        next();
    });
};
