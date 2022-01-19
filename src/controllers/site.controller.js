function index(req, res, next) {
    res.render('index', { title: 'Express' });
}

const dashboard = (req, res, next) => {
    res.render('dashboard', { title: 'Dashboard' });
};

module.exports = {
    index,
    dashboard,
};
