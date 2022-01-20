const { patientService, notificationService } = require('../services');
const getlist = async (req, res, next) => {
    const patients = await patientService.getListPatientDebt();
    res.render('payments/list', { patients });
};
const createNotificationAll = async (req, res, next) => {
    if (req.params.id != null) return next();
    const patients = await patientService.getListPatientDebt();
    patients.forEach((patient) => {
        const notification = {
            description: `Vui lòng thanh toán khoản nợ của bạn: Nợ của bạn là ${patient.debt}`,
            patient_id: patient.id,
        };
        notificationService.save(notification);
    });
    req.flash('success_msg', 'Đã thông báo cho những bệnh nhân có khoản nợ');
    res.redirect('back');
};
const createNotification = async (req, res, next) => {
    const { id } = req.params;
    const patient = await patientService.findByIdWithInclude(id, {});
    const notification = {
        description: `Vui lòng thanh toán khoản nợ của bạn: Nợ của bạn là ${patient.debt}`,
        patient_id: patient.id,
    };
    await notificationService.save(notification);
    req.flash(
        'success_msg',
        `Đã thông báo cho bệnh nhân \"${patient.name}\" có khoản nợ`,
    );
    res.redirect('back');
};
module.exports = {
    getlist,
    createNotificationAll,
    createNotification,
};
