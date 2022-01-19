const { patientService } = require('../../services');

const getCreditRemain = async (req, res, next) => {
    try {
        const patient = await patientService.findByIdWithInclude(
            req.user.patient_id,
            {},
        );
        res.status(200).json({
            success: true,
            data: patient.credit - patient.debt,
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
};

module.exports = {
    getCreditRemain,
};
