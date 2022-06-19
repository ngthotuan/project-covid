module.exports = {
    siteController: require('./site.controller'),
    accountController: require('./account.controller'),
    productController: require('./product.controller'),
    ...require('./api'),
};
