const { hospitalService, provinceService } = require('../services');

const index = async (req, res, next) => {
    try {
        const condition = { include: [{ all: true }] };
        const hospitals = await hospitalService.findAll(condition);
        res.render('hospitals/list', {
            title: 'Danh sách khu điều trị, cách ly',
            hospitals,
        });
    } catch (error) {
        next(error);
    }
};

const getCreate = async (req, res, next) => {
    try {
        const provinces = await provinceService.findAll();

        res.render('hospitals/form', {
            title: 'Thêm khu điều trị, cách ly',
            provinces,
        });
    } catch (error) {
        next(error);
    }
};

const postCreate = async (req, res, next) => {
    try {
        await hospitalService.create(req.body);
        req.flash('success_msg', 'Thêm khu điều trị, cách ly thành công');
        res.redirect('/hospitals');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getEdit = async (req, res, next) => {
    try {
        const hospital = await hospitalService.findById(req.params.id);
        if (!hospital) {
            req.flash('error_msg', 'Không tìm thấy khu điều trị, cách ly');
            return res.redirect('/hospitals');
        }
        const provinces = await provinceService.findAll();
        res.render('hospitals/form', {
            title: 'Sửa khu điều trị, cách ly',
            hospital,
            provinces,
        });
    } catch (error) {
        next(error);
    }
};

const postEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        await hospitalService.update(id, req.body);
        req.flash('success_msg', 'Cập nhật khu điều trị, cách ly thành công');
        res.redirect('/hospitals');
    } catch (error) {
        next(error);
    }
};

const getView = async (req, res, next) => {
    try {
        const hospital = await hospitalService.getById(req.params.id);
        if (!hospital) {
            req.flash('error_msg', 'Không tồn tại  khu điều trị, cách ly');
            return res.redirect('/hospital');
        }
        res.render('hospitals/view', {
            title: 'Chi tiết  khu điều trị, cách ly',
            hospital,
        });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await hospitalService.remove(id);
        req.flash('success_msg', 'Xóa khu điều trị, cách ly thành công');
        return res.redirect('/hospitals');
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            req.flash(
                'error_msg',
                'Khu điều trị, cách ly đang được sử dụng, không thể xóa',
            );
            return res.redirect('/hospitals');
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
