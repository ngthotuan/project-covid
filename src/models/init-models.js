var DataTypes = require('sequelize').DataTypes;
var _account = require('./account');
var _partner = require('./partner');
var _partner_account = require('./partner_account');
var _product = require('./product');
var _product_mapping = require('./product_mapping');

function initModels(sequelize) {
    var account = _account(sequelize, DataTypes);
    var partner = _partner(sequelize, DataTypes);
    var partner_account = _partner_account(sequelize, DataTypes);
    var product = _product(sequelize, DataTypes);
    var product_mapping = _product_mapping(sequelize, DataTypes);

    partner_account.belongsTo(partner, {
        as: 'partner_code_partner',
        foreignKey: 'partner_code',
    });
    partner.hasMany(partner_account, {
        as: 'partner_accounts',
        foreignKey: 'partner_code',
    });
    product_mapping.belongsTo(partner, {
        as: 'partner_code_partner',
        foreignKey: 'partner_code',
    });
    partner.hasMany(product_mapping, {
        as: 'product_mappings',
        foreignKey: 'partner_code',
    });
    partner_account.belongsTo(product, {
        as: 'product_code_product',
        foreignKey: 'product_code',
    });
    product.hasMany(partner_account, {
        as: 'partner_accounts',
        foreignKey: 'product_code',
    });
    product_mapping.belongsTo(product, {
        as: 'product_code_product',
        foreignKey: 'product_code',
    });
    product.hasMany(product_mapping, {
        as: 'product_mappings',
        foreignKey: 'product_code',
    });

    return {
        account,
        partner,
        partner_account,
        product,
        product_mapping,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
