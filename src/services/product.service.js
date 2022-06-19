const { sequelize } = require('../db');
const { product: Model } = require('../models')(sequelize);

const findAll = () => Model.findAll();

const create = (entity) => Model.create(entity);

const findById = (code) => Model.findByPk(code);

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
