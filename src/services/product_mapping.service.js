const { sequelize } = require('../db');
const { product_mapping: Model } = require('../models')(sequelize);

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
module.exports = {
    findAll,
    create,
    findById,
    update,
    remove,
};
