const { productService: Service } = require('../services');

const index = async (req, res, next) => {
    try {
        const list = await Service.findAll();
        res.render('products/list', { title: 'products', list });
    } catch (error) {
        next(error);
    }
};

const getCreate = (req, res) => {
    res.render('products/form', { title: 'Add new product' });
};

const postCreate = async (req, res, next) => {
    try {
        await Service.create(req.body);
        req.flash('success_msg', 'product created successfully');
        res.redirect('/products');
    } catch (error) {
        next(error);
    }
};

const getEdit = async (req, res, next) => {
    try {
        const entity = await Service.findById(req.params.id);
        if (!entity) {
            req.flash('error_msg', 'product not found');
            return res.redirect('/products');
        }
        res.render('products/form', { title: 'Update product', entity });
    } catch (error) {
        next(error);
    }
};

const postEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.update(id, req.body);
        req.flash('success_msg', 'product updated successfully');
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.remove(id);
        req.flash('success_msg', 'product removed successfully');
        return res.redirect('/products');
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            req.flash('error_msg', 'product has been used');
            return res.redirect('/products');
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
