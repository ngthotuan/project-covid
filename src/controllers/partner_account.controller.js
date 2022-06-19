const {
    partnerAccountService: Service,
    partnerService,
} = require('../services');

const index = async (req, res, next) => {
    try {
        const list = await Service.findAll();
        res.render('partner_accounts/list', {
            title: 'partner_accounts',
            list,
        });
    } catch (error) {
        next(error);
    }
};

const getCreate = async (req, res, next) => {
    try {
        const partners = await partnerService.findAll();
        res.render('partner_accounts/form', {
            title: 'Add new partner_account',
            partners,
        });
    } catch (error) {
        next(error);
    }
};

const postCreate = async (req, res, next) => {
    try {
        await Service.create(req.body);
        req.flash('success_msg', 'partner_account created successfully');
        res.redirect('/partner_accounts');
    } catch (error) {
        next(error);
    }
};

const getEdit = async (req, res, next) => {
    try {
        const entity = await Service.findById(req.params.id);
        if (!entity) {
            req.flash('error_msg', 'partner_account not found');
            return res.redirect('/partner_accounts');
        }
        const partners = await partnerService.findAll();
        res.render('partner_accounts/form', {
            title: 'Update partner_account',
            entity,
            partners,
        });
    } catch (error) {
        next(error);
    }
};

const postEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.update(id, req.body);
        req.flash('success_msg', 'partner_account updated successfully');
        res.redirect('/partner_accounts');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.remove(id);
        req.flash('success_msg', 'partner_account removed successfully');
        return res.redirect('/partner_accounts');
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            req.flash('error_msg', 'partner_account has been used');
            return res.redirect('/partner_accounts');
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
