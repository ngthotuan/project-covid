module.exports = {
    file: require('./file'),
    datetime: require('./datetime'),
    selenium: require('./selenium'),
    sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
};
