const index = (req, res) => {
    res.render('index', { title: 'Trang chủ' });
};

module.exports = {
    index,
};
