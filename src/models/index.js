const DataTypes = require('sequelize').DataTypes;
const _account = require('./account.model');
const _account_histories = require('./account_histories.model');
const _category = require('./category.model');
const _district = require('./district.model');
const _hospital = require('./hospital.model');
const _hospital_histories = require('./hospital_histories.model');
const _image = require('./image.model');
const _order_product = require('./order_product.model');
const _orders = require('./orders.model');
const _patient = require('./patient.model');
const _product = require('./product.model');
const _product_categories = require('./product_categories.model');
const _province = require('./province.model');
const _status_histories = require('./status_histories.model');
const _transaction_histories = require('./transaction_histories.model');
const _ward = require('./ward.model');
const _cart_item = require('./cart_item.model');

function initModels(sequelize) {
    const account = _account(sequelize, DataTypes);
    const account_histories = _account_histories(sequelize, DataTypes);
    const category = _category(sequelize, DataTypes);
    const district = _district(sequelize, DataTypes);
    const hospital = _hospital(sequelize, DataTypes);
    const hospital_histories = _hospital_histories(sequelize, DataTypes);
    const image = _image(sequelize, DataTypes);
    const order_product = _order_product(sequelize, DataTypes);
    const orders = _orders(sequelize, DataTypes);
    const patient = _patient(sequelize, DataTypes);
    const product = _product(sequelize, DataTypes);
    const product_categories = _product_categories(sequelize, DataTypes);
    const province = _province(sequelize, DataTypes);
    const status_histories = _status_histories(sequelize, DataTypes);
    const transaction_histories = _transaction_histories(sequelize, DataTypes);
    const ward = _ward(sequelize, DataTypes);
    const cart_item = _cart_item(sequelize, DataTypes);

    account_histories.belongsTo(account, {
        as: 'account',
        foreignKey: 'account_id',
    });
    account.hasMany(account_histories, {
        as: 'account_histories',
        foreignKey: 'account_id',
    });
    product_categories.belongsTo(product, {
        as: 'product',
        foreignKey: 'product_id',
    });
    product.hasMany(product_categories, {
        as: 'product_categories',
        foreignKey: 'product_id',
    });
    product_categories.belongsTo(category, {
        as: 'category',
        foreignKey: 'category_id',
    });
    category.hasMany(product_categories, {
        as: 'product_categories',
        foreignKey: 'category_id',
    });
    hospital.belongsTo(district, { as: 'district', foreignKey: 'district_id' });
    district.hasMany(hospital, { as: 'hospitals', foreignKey: 'district_id' });
    patient.belongsTo(district, { as: 'district', foreignKey: 'district_id' });
    district.hasMany(patient, { as: 'patients', foreignKey: 'district_id' });
    ward.belongsTo(district, { as: 'district', foreignKey: 'district_id' });
    district.hasMany(ward, { as: 'wards', foreignKey: 'district_id' });
    patient.belongsTo(hospital, { as: 'hospital', foreignKey: 'hospital_id' });
    hospital.hasMany(patient, { as: 'patients', foreignKey: 'hospital_id' });
    order_product.belongsTo(orders, { as: 'order', foreignKey: 'order_id' });
    orders.hasMany(order_product, {
        as: 'order_products',
        foreignKey: 'order_id',
    });
    account.belongsTo(patient, { as: 'patient', foreignKey: 'patient_id' });
    patient.hasMany(account, { as: 'accounts', foreignKey: 'patient_id' });
    hospital_histories.belongsTo(patient, {
        as: 'patient',
        foreignKey: 'patient_id',
    });
    patient.hasMany(hospital_histories, {
        as: 'hospital_histories',
        foreignKey: 'patient_id',
    });
    orders.belongsTo(patient, { as: 'patient', foreignKey: 'patient_id' });
    patient.hasMany(orders, { as: 'orders', foreignKey: 'patient_id' });
    patient.belongsTo(patient, { as: 'parent', foreignKey: 'parent_id' });
    patient.hasMany(patient, { as: 'patients', foreignKey: 'parent_id' });
    status_histories.belongsTo(patient, {
        as: 'patient',
        foreignKey: 'patient_id',
    });
    patient.hasMany(status_histories, {
        as: 'status_histories',
        foreignKey: 'patient_id',
    });
    transaction_histories.belongsTo(patient, {
        as: 'patient',
        foreignKey: 'patient_id',
    });
    patient.hasMany(transaction_histories, {
        as: 'transaction_histories',
        foreignKey: 'patient_id',
    });
    image.belongsTo(product, { as: 'product', foreignKey: 'product_id' });
    product.hasMany(image, {
        as: 'images',
        foreignKey: 'product_id',
        onDelete: 'cascade',
        hooks: true,
    });
    order_product.belongsTo(product, {
        as: 'product',
        foreignKey: 'product_id',
    });
    product.hasMany(order_product, {
        as: 'order_products',
        foreignKey: 'product_id',
    });
    order_product.belongsTo(category, {
        as: 'category',
        foreignKey: 'category_id',
    });
    category.hasMany(order_product, {
        as: 'order_products',
        foreignKey: 'category_id',
    });
    district.belongsTo(province, { as: 'province', foreignKey: 'province_id' });
    province.hasMany(district, { as: 'districts', foreignKey: 'province_id' });
    hospital.belongsTo(province, { as: 'province', foreignKey: 'province_id' });
    province.hasMany(hospital, { as: 'hospitals', foreignKey: 'province_id' });
    patient.belongsTo(province, { as: 'province', foreignKey: 'province_id' });
    province.hasMany(patient, { as: 'patients', foreignKey: 'province_id' });
    hospital.belongsTo(ward, { as: 'ward', foreignKey: 'ward_id' });
    ward.hasMany(hospital, { as: 'hospitals', foreignKey: 'ward_id' });
    patient.belongsTo(ward, { as: 'ward', foreignKey: 'ward_id' });
    ward.hasMany(patient, { as: 'patients', foreignKey: 'ward_id' });

    cart_item.belongsTo(patient, { as: 'patient', foreignKey: 'patient_id' });
    patient.hasMany(cart_item, { as: 'cart_items', foreignKey: 'patient_id' });
    cart_item.belongsTo(category, {
        as: 'category',
        foreignKey: 'category_id',
    });
    category.hasMany(cart_item, {
        as: 'cart_items',
        foreignKey: 'category_id',
    });

    return {
        AccountModel: account,
        AccountHistoryModel: account_histories,
        CategoryModel: category,
        DistrictModel: district,
        HospitalModel: hospital,
        HospitalHistoryModel: hospital_histories,
        ImageModel: image,
        OrderProductModel: order_product,
        OrdersModel: orders,
        PatientModel: patient,
        ProductModel: product,
        ProductCategoryModel: product_categories,
        ProvinceModel: province,
        StatusHistoryModel: status_histories,
        TransactionHistoryModel: transaction_histories,
        WardModel: ward,
        CartItemModel: cart_item,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
