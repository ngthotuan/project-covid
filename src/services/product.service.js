const { sequelize } = require('../db');
const { product: ProductModel } = require('../models')(sequelize);

const findAll = () => ProductModel.findAll();

const create = (product) => ProductModel.create(product);

const findById = (code) => ProductModel.findByPk(code);

const update = async (id, data) => {
    const product = await ProductModel.findByPk(id);
    product.update(data);
    await product.save();
};

const remove = async (id) => {
    const product = await ProductModel.findByPk(id);
    await product.destroy();
};
module.exports = {
    findAll,
    create,
    findById,
    update,
    remove,
};
