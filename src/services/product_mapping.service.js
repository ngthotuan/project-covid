const { sequelize } = require('../db');
const { product_mapping: Model, product } = require('../models')(sequelize);

const findAll = () => Model.findAll();

const create = (entity) => Model.create(entity);

const findById = (id) => Model.findByPk(id);

const update = async (id, data) => {
    const entity = await Model.findByPk(id);
    entity.update(data);
    await entity.save();
};

const remove = async (id) => {
    const entity = await Model.findByPk(id);
    await entity.destroy();
};

const findAllByPartnerCode = (partnerCode) => {
    return Model.findAll({
        where: {
            partner_code: partnerCode,
        },
        include: 'product_code_product',
    });
};

const findAllByCondition = (condition) => {
    return Model.findAll({
        where: condition,
        include: 'product_code_product',
    });
};

module.exports = {
    findAll,
    create,
    findById,
    update,
    remove,
    findAllByPartnerCode,
    findAllByCondition,
};
