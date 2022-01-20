const { sequelize } = require('../db');
const { CategoryModel, ProductCategoryModel, ProductModel } =
    require('../models')(sequelize);

const createCategoryNull = () => {
    return CategoryModel.build();
};

const findAll = () => {
    return CategoryModel.findAll();
};

const createCategory = async (category) => {
    const categorySave = await CategoryModel.create(category, {
        include: 'product_categories',
    });
    return categorySave;
};

const findById = (id) => {
    return CategoryModel.findByPk(id, {
        include: 'product_categories',
    });
};

const findCategoryIncludeProduct = async (idCategory) => {
    try {
        const category = await CategoryModel.findByPk(idCategory, {
            include: {
                model: ProductCategoryModel,
                as: 'product_categories',
                include: {
                    model: ProductModel,
                    as: 'product',
                },
            },
        });
        return category;
    } catch (e) {
        console.log(e.message);
    }
};

const destroy = async (id) => {
    const category = await CategoryModel.findByPk(id, {
        include: 'product_categories',
    });
    if (category) {
        const productCategories = category.product_categories;
        for (let i = 0; i < productCategories.length; i++) {
            const productCategory = productCategories[i];
            await productCategory.destroy();
        }
        await category.destroy();
    }
    return category;
};

const update = async (category, productcategoriesUpdate) => {
    const oldCategory = await CategoryModel.findByPk(category.category_id, {
        include: 'product_categories',
    });
    const { name, limit_person, limit_time } = category;

    const categoryUpdated = await oldCategory.update({
        name,
        limit_person,
        limit_time,
    });

    const oldProductCategories = oldCategory.product_categories;
    for (let i = 0; i < productcategoriesUpdate.length; i++) {
        const productCategoryUpdate = productcategoriesUpdate[i];
        const checkFind = oldProductCategories.findIndex(
            ({ product_id }) => product_id === productCategoryUpdate.product_id,
        );

        if (checkFind < 0) {
            await ProductCategoryModel.create(productCategoryUpdate);
        }
    }

    for (let i = 0; i < oldProductCategories.length; i++) {
        const oldProCate = oldProductCategories[i];
        const checkFind = productcategoriesUpdate.findIndex(
            ({ product_id }) => product_id === oldProCate.product_id,
        );

        if (checkFind < 0) {
            await oldProCate.destroy();
        }
    }

    return categoryUpdated;
};

module.exports = {
    findAll,
    createCategory,
    destroy,
    findById,
    createCategoryNull,
    findCategoryIncludeProduct,
    update,
};
