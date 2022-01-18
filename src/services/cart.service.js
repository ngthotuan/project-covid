const { sequelize } = require('../db');
const { CartItemModel, CategoryModel, ProductCategoryModel, ProductModel } =
    require('../models')(sequelize);

const save = async (categoryId, patientId) => {
    const cartItem = {
        category_id: categoryId,
        patient_id: patientId,
    };
    const cart = await CartItemModel.create(cartItem);
    return cart;
};

const countByCategoryAndPatient = async (categoryId, patientId) => {
    return await CartItemModel.count({
        where: {
            category_id: categoryId,
            patient_id: patientId,
        },
    });
};

const getByPatientId = async (patientId) => {
    const cart = await CartItemModel.findAll({
        where: {
            patient_id: patientId,
        },
    });
    return cart;
};

const deleteByPatientId = async (patientId) => {
    const cart = await CartItemModel.destroy({
        where: {
            patient_id: patientId,
        },
    });
    return cart;
};

const deleteById = async (id) => {
    const cart = await CartItemModel.destroy({
        where: {
            id: id,
        },
    });
    return cart;
};

const findAllByPatientId = async (patientId) => {
    const cart = await CartItemModel.findAll({
        where: {
            patient_id: patientId,
        },
        include: [
            {
                model: CategoryModel,
                as: 'category',
                attributes: ['id', 'name'],
                include: [
                    {
                        model: ProductCategoryModel,
                        as: 'product_categories',
                        include: {
                            model: ProductModel,
                            as: 'product',
                            attributes: ['id', 'name', 'amount'],
                        },
                    },
                ],
            },
        ],
    });
    return cart;
};

const countByPatientId = async (patientId) => {
    if (!patientId) {
        return 0;
    }
    const cart = await CartItemModel.count({
        where: {
            patient_id: patientId,
        },
    });
    return cart;
};

module.exports = {
    save,
    getByPatientId,
    deleteByPatientId,
    deleteById,
    findAllByPatientId,
    countByPatientId,
    countByCategoryAndPatient,
};
