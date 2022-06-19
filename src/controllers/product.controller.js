const { productService } = require('../services');

const index = async (req, res, next) => {
    try {
        const products = await productService.findAll();
        res.render('products/list', { title: 'Products', products });
    } catch (error) {
        next(error);
    }
};

const getCreate = (req, res) => {
    res.render('products/form', { title: 'Add new Product' });
};

const postCreate = async (req, res, next) => {
    try {
        await productService.create(req.body);
        req.flash('success_msg', 'Product created successfully');
        res.redirect('/products');
    } catch (error) {
        next(error);
    }
};

const getEdit = async (req, res, next) => {
    try {
        const product = await productService.findById(req.params.id);
        console.log(product);
        if (!product) {
            req.flash('error_msg', 'Product not found');
            return res.redirect('/products');
        }
        res.render('products/form', { title: 'Update Product', product });
    } catch (error) {
        next(error);
    }
};

const postEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(req.body);
        await productService.update(id, req.body);
        req.flash('success_msg', 'Product updated successfully');
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await productService.remove(id);
        req.flash('success_msg', 'Product removed successfully');
        return res.redirect('/products');
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            req.flash('error_msg', 'Product has been used');
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
