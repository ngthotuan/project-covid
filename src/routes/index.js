const { checkAuthenAndAuthor } = require('../middleware/authentication');
function route(app) {
    app.use('/accounts', require('./account.route'));
    app.use('/api', require('./api'));
    // app.use(checkAuthenAndAuthor);
    app.use(overrideBody);
    app.use('/products', require('./product.route'));
    app.use('/', require('./site.route'));
}

const overrideBody = (req, res, next) => {
    if (req.method === 'POST') {
        req.body.is_active = req.body.is_active ? 1 : 0;
    }
    next();
};

module.exports = route;
