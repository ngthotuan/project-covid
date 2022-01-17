const { checkAuthenAndAuthor } = require('../middleware/authentication');
function route(app) {
    app.use('/apt', require('./apt.route'));
    app.use('/accounts', require('./account.route'));
    app.use('/api', require('./api'));
    app.use(checkAuthenAndAuthor);
    app.use('/patients', require('./patient.route'));
    app.use('/products', require('./product.route'));
    app.use('/categories', require('./category.route'));
    app.use('/hospitals', require('./hospital.route'));
    app.use('/users', require('./user.route'));
    app.use('/', require('./site.route'));
}

module.exports = route;
