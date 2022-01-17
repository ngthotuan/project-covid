const { patientService } = require('../services');
const bcrypt = require('bcrypt');

const callbackPayment = async (req, res, next) => {
    const { dataCallback, amount, code } = req.query;
    if (bcrypt.compareSync(process.env.CLIENT_SECRET, code)) {
        const patient = await patientService.findByIdWithInclude(
            dataCallback,
            {},
        );

        await patient.update({
            debt: Math.abs(patient.debt - amount),
        });
        patient.save();
    }
    res.redirect('/details');
};
module.exports = {
    callbackPayment,
};
