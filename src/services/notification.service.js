const { sequelize } = require('../db');

const { NotificationModel } = require('../models')(sequelize);

const { Op } = require('sequelize');

const save = async (notification) => {
    return NotificationModel.create(notification);
};
const findByPatientId = async (patientId) => {
    return NotificationModel.findAll({
        where: {
            patient_id: patientId,
        },
    });
};
const countByPatintId = async (patientId) => {
    if (!patientId) {
        return 0;
    }
    return NotificationModel.count({
        where: {
            patient_id: patientId,
        },
    });
};

module.exports = {
    save,
    findByPatientId,
    countByPatintId,
};
