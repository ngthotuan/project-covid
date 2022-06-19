const {
    productMappingService: Service,
    partnerService,
    productService,
} = require('../services');

const index = async (req, res, next) => {
    try {
        const list = await Service.findAll();
        res.render('product_mappings/list', {
            title: 'product_mappings',
            list,
        });
    } catch (error) {
        next(error);
    }
};

const getCreate = async (req, res, next) => {
    try {
        const partners = await partnerService.findAll();
        const products = await productService.findAll();
        res.render('product_mappings/form', {
            title: 'Add new product_mapping',
            partners,
            products,
        });
    } catch (error) {
        next(error);
    }
};

const postCreate = async (req, res, next) => {
    try {
        await Service.create(req.body);
        req.flash('success_msg', 'product_mapping created successfully');
        res.redirect('/product_mappings');
    } catch (error) {
        next(error);
    }
};

const getEdit = async (req, res, next) => {
    try {
        const entity = await Service.findById(req.params.id);
        if (!entity) {
            req.flash('error_msg', 'product_mapping not found');
            return res.redirect('/product_mappings');
        }
        const partners = await partnerService.findAll();
        const products = await productService.findAll();
        res.render('product_mappings/form', {
            title: 'Update product_mapping',
            entity,
            partners,
            products,
        });
    } catch (error) {
        next(error);
    }
};

const postEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.update(id, req.body);
        req.flash('success_msg', 'product_mapping updated successfully');
        res.redirect('/product_mappings');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.remove(id);
        req.flash('success_msg', 'product_mapping removed successfully');
        return res.redirect('/product_mappings');
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            req.flash('error_msg', 'product_mapping has been used');
            return res.redirect('/product_mappings');
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
