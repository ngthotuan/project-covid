const { sequelize } = require('../db');

const { NotificationModel } = require('../models')(sequelize);

const { Op } = require('sequelize');

const save = async (notification) => {
    return NotificationModel.create(notification);
};
const findByPatientId = async (patientId) => {
    const notifications = await NotificationModel.findAll({
        where: {
            patient_id: patientId,
        },
    });
    for (const notification of notifications) {
        await notification.update({ view: true });
    }
    return notifications;
};
const countByPatintId = async (patientId) => {
    if (!patientId) {
        return 0;
    }
    return NotificationModel.count({
        where: {
            view: false,
            patient_id: patientId,
        },
    });
};

module.exports = {
    save,
    findByPatientId,
    countByPatintId,
};
