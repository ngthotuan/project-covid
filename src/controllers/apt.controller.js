const jsonwebtoken = require('jsonwebtoken');

const { patientService, transactionHistoryService } = require('../services');

const callbackPayment = async (req, res, next) => {
    const { token, success } = req.query;
    if (success) {
        try {
            const { amount, dataCallback, code } = jsonwebtoken.verify(
                token,
                process.env.CLIENT_SECRET,
            );
            const patient = await patientService.findByIdWithInclude(
                dataCallback,
                {},
            );

            await patient.update({
                debt: Math.abs(patient.debt - amount),
            });
            patient.save();
            await transactionHistoryService.save({
                amount,
                created_date: Date.now(),
                description: `Thanh toán dư nợ`,
                patient_id: patient.id,
                code,
            });
            req.flash('success_msg', 'Thanh toán thành công');
        } catch (err) {
            req.flash('error_msg', 'Đã có lỗi xảy ra');
        }
    } else {
        req.flash('error_msg', 'Thanh toán thất bại');
    }
    res.redirect('/users/payment-history');
};

module.exports = {
    callbackPayment,
};
