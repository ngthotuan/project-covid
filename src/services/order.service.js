const { sequelize } = require('../db');
const { OrdersModel, CategoryModel, ProductCategoryModel, ProductModel } =
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

module.exports = {
    save,
};
