const { partnerService: Service } = require('../services');

const index = async (req, res, next) => {
    try {
        const list = await Service.findAll();
        res.render('partners/list', { title: 'partners', list });
    } catch (error) {
        next(error);
    }
};

const getCreate = (req, res) => {
    res.render('partners/form', { title: 'Add new partner' });
};

const postCreate = async (req, res, next) => {
    try {
        await Service.create(req.body);
        req.flash('success_msg', 'partner created successfully');
        res.redirect('/partners');
    } catch (error) {
        next(error);
    }
};

const getEdit = async (req, res, next) => {
    try {
        const entity = await Service.findById(req.params.id);
        if (!entity) {
            req.flash('error_msg', 'partner not found');
            return res.redirect('/partners');
        }
        res.render('partners/form', { title: 'Update partner', entity });
    } catch (error) {
        next(error);
    }
};

const postEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.update(id, req.body);
        req.flash('success_msg', 'partner updated successfully');
        res.redirect('/partners');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.remove(id);
        req.flash('success_msg', 'partner removed successfully');
        return res.redirect('/partners');
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            req.flash('error_msg', 'partner has been used');
            return res.redirect('/partners');
        } else {
            next(error);
        }
    }
};

module.exports = {
    index,
    getCreate,
    postCreate,
    getEdit,
    postEdit,
    remove,
};
