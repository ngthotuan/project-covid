module.exports = {
    siteController: require('./site.controller'),
    accountController: require('./account.controller'),
    productController: require('./product.controller'),
    partnerController: require('./partner.controller'),
    partnerAccountController: require('./partner_account.controller'),
    ...require('./api'),
};
