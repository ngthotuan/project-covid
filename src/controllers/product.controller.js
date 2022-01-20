const { productService, accountHistoryService } = require('../services');

const index = async (req, res, next) => {
    try {
        const products = await productService.findAll();
        res.render('products/list', { title: 'Danh sách sản phẩm', products });
    } catch (error) {
        next(error);
    }
};

const getCreate = (req, res) => {
    res.render('products/form', { title: 'Thêm sản phẩm' });
};

const postCreate = async (req, res, next) => {
    try {
        req.body.images = req.files.map((file) => {
            return {
                path: file.filename,
            };
        });
        await productService.create(req.body);
        req.flash('success_msg', 'Thêm sản phẩm thành công');
        accountHistoryService.log(
            req.user.id,
            'Tạo sản phẩm mới: ' + req.body.name,
        );
        res.redirect('/products');
    } catch (error) {
        next(error);
    }
};

const getEdit = async (req, res, next) => {
    try {
        const product = await productService.findById(req.params.id);
        if (!product) {
            req.flash('error_msg', 'Sản phẩm không tồn tại');
            return res.redirect('/products');
        }
        res.render('products/form', { title: 'Sửa sản phẩm', product });
    } catch (error) {
        next(error);
    }
};

const postEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        req.body.files = req.files.map((file) => {
            return {
                path: file.filename,
            };
        });
        await productService.update(id, req.body);
        req.flash('success_msg', 'Cập nhật sản phẩm thành công');
        accountHistoryService.log(
            req.user.id,
            'Cập nhật sản phẩm: ' + req.body.name,
        );
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getView = async (req, res, next) => {
    try {
        const product = await productService.findById(req.params.id);
        if (!product) {
            req.flash('error_msg', 'Sản phẩm không tồn tại');
            return res.redirect('/products');
        }
        res.render('products/view', {
            title: 'Chi tiết sản phẩm',
            product,
            layout: false,
        });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await productService.remove(id);
        req.flash('success_msg', 'Xóa sản phẩm thành công');
        accountHistoryService.log(req.user.id, 'Xóa sản phẩm id: ' + id);
        return res.redirect('/products');
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            req.flash('error_msg', 'Sản phẩm đang được sử dụng, không thể xóa');
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
    getView,
    remove,
};
