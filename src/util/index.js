const moment = require('moment');

const getDateRange = (date = new Date()) => {
    // lay range thang truoc, muon chi dinh new Date(2022, 05) -> range thang 5/2022
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m - 1, 1);
    const lastDay = new Date(y, m);
    return [firstDay.getTime(), lastDay.getTime() - 1];
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getMonth = (format, date = new Date()) => {
    return moment(date).format(format);
};

const getLastMonth = (format) => {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    return moment(new Date(y, m - 1, 1)).format(format);
};

const formatDate = (timestamp, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(timestamp).format(format);
};

module.exports = {
    getDateRange,
    sleep,
    getMonth,
    getLastMonth,
    formatDate,
};
