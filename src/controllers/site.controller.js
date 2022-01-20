const {
    statusHistoryService,
    patientService,
    orderService,
} = require('../services');

const index = (req, res) => {
    res.render('index', { title: 'Trang chủ' });
};

const dashboard = async (req, res, next) => {
    try {
        let countStatus;
        const { startDate, endDate } = req.query;
        if (req.query.startDate) {
            countStatus = await patientService.statisticStatusBetweenAll(
                Date.parse(startDate),
                Date.parse(endDate),
            );
        } else {
            countStatus = await patientService.statisticStatusAll();
        }
        const statusHistory = await statusHistoryService.statistics();
        const countProducts = await orderService.countOrderProduct();

        const countCategories = await orderService.countCategories();
        const sumDebt = await patientService.sumDebt();

        res.render('dashboard', {
            title: 'Dashboard',
            statusHistory,
            countStatus,
            countProducts,
            countCategories,
            sumDebt,
            startDate,
            endDate,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

module.exports = {
    index,
    dashboard,
};
