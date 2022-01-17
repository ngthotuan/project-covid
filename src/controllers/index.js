module.exports = {
    siteController: require('./site.controller'),
    accountController: require('./account.controller'),
    productController: require('./product.controller'),
    patientController: require('./patient.controller'),
    categoryController: require('./category.controller'),
    hospitalController: require('./hospital.controller'),
    managerController: require('./manager.controller'),
    userController: require('./user.controller'),
    aptController: require('./apt.controller'),
    ...require('./api'),
};
