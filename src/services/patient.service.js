const { sequelize } = require('../db');
const bcrypt = require('bcrypt');

const {
    PatientModel,
    AccountModel,
    TransactionHistoryModel,
    HospitalHistoryModel,
    AccountHistoryModel,
    StatusHistoryModel,
    HospitalModel,
    OrdersModel,
    CategoryModel,
} = require('../models')(sequelize);

const { RoleConstants } = require('../constants');
const { Op } = require('sequelize');

const findAll = async (condition) => {
    return await PatientModel.findAndCountAll(condition);
};

const save = async (patient) => {
    // clean data

    Object.keys(patient).forEach((key) => {
        if (patient[key] === '') {
            patient[key] = null;
        }
    });
    const account = {
        username: patient.identity,
        role: RoleConstants.USER,
    };
    // update hospital current size
    const hospital = await HospitalModel.findByPk(patient.hospital_id);
    if (hospital.current_size === hospital.size) {
        return next(new Error('Hospital is full'));
    }
    await hospital.update({
        current_size: hospital.current_size + 1,
    });

    // update hospital history
    const hospital_history = {
        // hospital_id: patient.hospital_id,
        hospital_name: hospital.name,
        patient_id: patient.id,
        import_time: new Date(),
    };

    return await PatientModel.create(
        {
            ...patient,
            dob: new Date(patient.dob),
            accounts: [account],
            hospital_histories: [hospital_history],
        },
        {
            include: ['accounts', 'hospital_histories'],
        },
    );
};
const findByIdWithInclude = async (patientId, include) => {
    try {
        const patient = await PatientModel.findByPk(patientId, include);
        return patient;
    } catch (e) {
        console.log(e.message);
    }
};

const findById = async (patientId) => {
    const include = {
        include: [
            {
                model: PatientModel,
                as: 'patients',
                include: [{ all: true }],
            },
            {
                model: PatientModel,
                as: 'parent',
                include: [{ all: true }],
            },
            {
                model: AccountModel,
                as: 'accounts',
                include: [
                    {
                        model: AccountHistoryModel,
                        as: 'account_histories',
                    },
                ],
            },
            {
                model: StatusHistoryModel,
                as: 'status_histories',
            },
            {
                model: HospitalHistoryModel,
                as: 'hospital_histories',
            },
            {
                model: TransactionHistoryModel,
                as: 'transaction_histories',
            },
        ],
    };
    const patient = await findByIdWithInclude(patientId, include);
    return patient;
};

const update = async (patient) => {
    const patientSaved = await PatientModel.findByPk(patient.id);
    // clean data
    Object.keys(patient).forEach((key) => {
        if (patient[key] === '') {
            patient[key] = null;
        }
    });
    const t = await sequelize.transaction();
    try {
        if (patient.status !== patientSaved.status) {
            // update current patient status
            // update all related patient status
            await updateStatus(patientSaved, t, patient.status);
        }
        if (patient.hospital_id !== patientSaved.hospital_id) {
            // update hospital history
            const ht = await patientSaved.getHospital_histories();
            const latestHospitalHistory = ht[ht.length - 1];
            await latestHospitalHistory.update(
                {
                    export_time: new Date(),
                },
                {
                    transaction: t,
                },
            );
            // new hospital history
            const hospital = await HospitalModel.findByPk(patient.hospital_id);
            const preHospital = await HospitalModel.findByPk(
                patientSaved.hospital_id,
            );
            //update current-size hospital destination
            await hospital.update({ current_size: hospital.current_size + 1 });
            hospital.save();
            //update current-size hospital source
            await preHospital.update({
                current_size: preHospital.current_size - 1,
            });
            preHospital.save();
            const hospital_history = {
                import_time: new Date(),
                hospital_name: hospital.name,
                patient_id: patient.id,
            };
            await HospitalHistoryModel.create(hospital_history, {
                transaction: t,
            });
        }
        delete patient.status;
        await patientSaved.update(patient, {
            transaction: t,
        });
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e.message);
    }
};

const updateStatus = async (patientSaved, transaction, newStatus) => {
    const statusHistory = {
        source: patientSaved.status,
        destination: newStatus,
        patient_id: patientSaved.id,
        created_date: new Date(),
    };
    await StatusHistoryModel.create(statusHistory, {
        transaction: transaction,
    });
    await PatientModel.update(
        {
            status: newStatus,
        },
        {
            where: {
                id: patientSaved.id,
            },
            transaction: transaction,
        },
    );

    const patients = await patientSaved.getPatients();
    if (parseInt(newStatus) !== -1) {
        for (let i = 0; i < patients.length; i++) {
            await updateStatus(
                patients[i],
                transaction,
                parseInt(newStatus) + 1,
            );
        }
    }
};
const getBuyHistory = async (patientId) => {
    const include = {
        include: [
            {
                model: OrdersModel,
                as: 'orders',
            },
        ],
    };
    return await findByIdWithInclude(patientId, include);
};
const payment = (patientId, amount, description) => {
    const linkPayment = `${process.env.HOST_PAYMENT}/payment?dataCallback=${patientId}&clientId=${process.env.CLIENT_ID}&amount=${amount}&description=${description}&redirect=${process.env.REDIRECT_LINK}`;
    return linkPayment;
};
module.exports = {
    findAll,
    save,
    findById,
    update,
    findByIdWithInclude,
    getBuyHistory,
    payment,
};
