const { sequelize } = require('../db');
const { partner_account: Model } = require('../models')(sequelize);

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

const findByPartnerCode = (partnerCode) => {
    return Model.findOne({
        where: {
            partner_code: partnerCode,
        },
    });
};

const findByAllPartnerCode = (partnerCode) => {
    return Model.findAll({
        where: {
            partner_code: partnerCode,
        },
    });
};

const findOneByCondition = (condition) => {
    return Model.findOne({
        where: condition,
    });
};

const findAllByCondition = (condition) => {
    return Model.findAll({
        where: condition,
    });
};
module.exports = {
    findAll,
    create,
    findById,
    update,
    remove,
    findByPartnerCode,
    findByAllPartnerCode,
    findOneByCondition,
    findAllByCondition,
};
