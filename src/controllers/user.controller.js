const {
    patientService,
    AccountHistoryService,
    accountService,
    categoryService,
    cartService,
} = require('../services');
const bcrypt = require('bcrypt');

const {} = require('../services');
const getList = async (req, res, next) => {
    const categories = await categoryService.findAll();
    res.render('categories/list', {
        title: 'Danh sách gói',
        role: 'USER',
        categories,
    });
};

const detail = async (req, res, next) => {
    const id = req.params.id;
    const category = await categoryService.findCategoryIncludeProduct(id);
    res.render('categories/view', {
        title: 'Chi tiết gói',
        role: 'USER',
        category,
    });
};

const getChangePassword = (req, res) => {
    res.render('users/change-password', {
        title: 'Thay đổi mật khẩu',
    });
};

const postChangePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!bcrypt.compareSync(oldPassword, req.user.password)) {
        req.flash('error_msg', 'Mật khẩu cũ không chính xác!');
    } else {
        try {
            await accountService.changePassword(req.user.id, newPassword);
            req.flash('success_msg', 'Thay đổi mật khẩu thành công!');
        } catch (error) {
            console.error('user.controller change password', error);
            req.flash('error_msg', 'Thay đổi mật khẩu thất bại!');
        }
    }
    res.redirect('/users/change-password');
};
const getProfile = async (req, res, next) => {
    const include = {
        include: ['hospital'],
    };
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        include,
    );
    res.render('users/user-profile', { patient });
};
const getUserHistories = async (req, res, next) => {
    const include = {
        include: ['status_histories', 'hospital_histories'],
    };
    const condition = {
        where: { account_id: req.user.id },
    };
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        include,
    );
    const accountHistory = await AccountHistoryService.findAll(condition);
    res.render('users/user-history', {
        patient,
        account_histories: accountHistory,
    });
};
const getTransactionHistory = async (req, res, next) => {
    const include = {
        include: ['transaction_histories'],
    };
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        include,
    );
    res.render('users/user-transaction-history', { patient });
};
const getBuyHistory = async (req, res, next) => {
    const patient = await patientService.getBuyHistory(req.user.patient_id);
    console.log(patient);
    res.render('users/user-buy-history', { patient });
};
const paymentDebt = async (req, res, next) => {
    const description = 'Thanh toán khoản nợ';
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        {},
    );
    const linkPayment = patientService.payment(
        patient.id,
        patient.debt,
        description,
    );
    res.redirect(linkPayment);
};
const payment = async (req, res, next) => {
    const { amount } = req.body;
    const description = 'Thanh toán số tiền';
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        {},
    );
    const linkPayment = patientService.payment(patient.id, amount, description);
    res.redirect(linkPayment);
};
const getPayment = async (req, res, next) => {
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        {},
    );
    res.render('users/user-payment', { patient });
};

const getProductInCart = async (req, res, next) => {
    try {
        const carts = await cartService.findAllByPatientId(req.user.patient_id);
        res.render('cart/product-in-cart', { carts });
    } catch (error) {
        console.error('user.controller getProductInCart', error);
        next(error);
    }
};

const addToCart = async (req, res) => {
    const { id: categoryId } = req.params;
    const patientId = req.user.patient_id;
    try {
        const isExist =
            (await cartService.countByCategoryAndPatient(
                categoryId,
                patientId,
            )) > 0;
        if (isExist) {
            req.flash(
                'error_msg',
                'Gói nhu yếu phẩm đã tồn tại trong giỏ hàng!',
            );
        } else {
            await cartService.save(categoryId, patientId);
            req.flash('success_msg', 'Thêm vào giỏ hàng thành công!');
        }
    } catch (error) {
        console.error('user.controller addToCart', error);
        req.flash('error_msg', 'Thêm vào giỏ hàng thất bại!');
    }
    res.redirect('back');
};

const deleteCartItem = async (req, res) => {
    const { id: categoryId } = req.params;
    try {
        await cartService.deleteById(categoryId);
        req.flash(
            'success_msg',
            'Xóa gói nhu yếu phẩm khỏi giỏ hàng thành công!',
        );
    } catch (error) {
        console.error('user.controller deleteCartItem', error);
        req.flash('error_msg', 'Xóa gói nhu yếu phẩm khỏi giỏ hàng thất bại!');
    }
    res.redirect('back');
};

module.exports = {
    getProfile,
    getTransactionHistory,
    getUserHistories,
    getBuyHistory,
    getList,
    detail,
    getChangePassword,
    postChangePassword,
    paymentDebt,
    payment,
    getPayment,
    getProductInCart,
    addToCart,
    deleteCartItem,
};
