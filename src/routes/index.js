const { checkAuthenAndAuthor } = require('../middleware/authentication');
function route(app) {
    app.use('/accounts', require('./account.route'));
    app.use('/api', require('./api'));
    app.use(checkAuthenAndAuthor);
    app.use('/products', require('./product.route'));
    app.use('/', require('./site.route'));
}

module.exports = route;
