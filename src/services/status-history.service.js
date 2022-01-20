const { sequelize } = require('../db');
const { StatusHistoryModel } = require('../models')(sequelize);
const { Op } = require('sequelize');

const countByCondition = (condition) => {
    return StatusHistoryModel.count({ where: condition });
};

const countRotation = () => {
    return countByCondition({
        destination: {
            [Op.ne]: '-1',
        },
    });
};

const countCured = () => {
    return countByCondition({
        destination: '-1',
    });
};

const statistics = async () => {
    return {
        rotation: await countRotation(),
        cured: await countCured(),
    };
};

module.exports = {
    countByCondition,
    countRotation,
    countCured,
    statistics,
};
