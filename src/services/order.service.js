const { sequelize } = require('../db');
const { OrdersModel, OrderProductModel, ProductModel, CategoryModel } =
    require('../models')(sequelize);

const findById = (id) => {
    return OrdersModel.findOne({
        where: {
            id,
        },
    });
};

const save = (categories, totalAmount, patientId) => {
    const order = {
        created_time: Date.now(),
        patient_id: patientId,
        total_amount: totalAmount,
        total_category: categories.length,
        order_products: categories
            .map((category) => {
                return category.products.map((product) => {
                    return {
                        category_id: category.categoryId,
                        product_id: product.productId,
                        quantity: product.quantity,
                        amount: product.amount,
                    };
                });
            })
            .flat(),
    };
    return OrdersModel.create(order, {
        include: 'order_products',
    });
};

const findOrderDetailById = (id) => {
    return OrdersModel.findOne({
        where: {
            id,
        },
        include: [
            {
                model: OrderProductModel,
                as: 'order_products',
                include: [
                    {
                        model: ProductModel,
                        as: 'product',
                        attributes: ['name'],
                    },
                    {
                        model: CategoryModel,
                        as: 'category',
                        attributes: ['name'],
                    },
                ],
            },
        ],
    });
};

module.exports = {
    save,
    findOrderDetailById,
};
