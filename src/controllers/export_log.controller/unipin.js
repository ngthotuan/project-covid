const axios = require('axios');
const util = require('../../util');
const moment = require('moment');
const md5 = require('md5');
const Op = require('sequelize').Op;
const fs = require('fs');
const { Builder, By, Key, until } = require('selenium-webdriver');

const { selenium } = require('../../config');
const {
    partnerAccountService,
    productMappingService,
} = require('../../services');

const exportDataUnipin = async (
    unipin_backoffice_session,
    merchantId,
    exportFromDate,
    exportToDate,
) => {
    try {
        const response = await axios.get(
            'https://backoffice.unipin.com/merchant-transactions/export',
            {
                params: {
                    exportFromDate,
                    exportToDate,
                    exportStatus: 'SUCCESS',
                    exportType: 0,
                    exportMerchant: merchantId,
                    exportCountry: 1,
                    exportChannel: '',
                    exportSearch: '',
                    exportChannelName: true,
                    export: 'csv',
                },
                headers: {
                    Cookie: `unipin_backoffice_session=${unipin_backoffice_session}`,
                },
            },
        );
        return response.data;
    } catch (err) {
        console.error('error: ', err.msg);
        return null;
    }
};

module.exports = {
    async get(req, res, next) {
        try {
            const product_mappings =
                await productMappingService.findAllByPartnerCode('unipin');
            res.render('export_logs/unipin', {
                title: 'Export Unipin',
                url: 'https://backoffice.unipin.com',
                product_mappings,
            });
        } catch (error) {
            next(error);
        }
    },

    async post(req, res, next) {
        try {
            let { unipin_backoffice_session, products, startDate, endDate } =
                req.body;

            if (typeof products === 'string') {
                products = [products];
            }

            if (!startDate || !endDate) {
                [startDate, endDate] = util.getDateRange();
                startDate = util.formatDate(startDate, 'MM/DD/YYYY');
                endDate = util.formatDate(endDate, 'MM/DD/YYYY');
            }

            console.log('postExportUnipin startDate', startDate);
            console.log('postExportUnipin endDate', endDate);

            const condition = {
                partner_code: 'unipin',
                merchant_code: { [Op.in]: products },
            };
            console.log('postExportUnipin condition', condition);
            const product_mappings =
                await productMappingService.findAllByCondition(condition);
            const successfulProduct = [];
            for (const pm of product_mappings) {
                console.log(
                    'Call export: ',
                    JSON.stringify({
                        unipin_backoffice_session,
                        pm,
                        startDate,
                        endDate,
                    }),
                );
                const exportRes = await exportDataUnipin(
                    unipin_backoffice_session,
                    pm.merchant_code,
                    startDate,
                    endDate,
                );
                const currentProduct = `${pm.product_code_product.code} - ${pm.product_code_product.name} (${pm.merchant_code} - ${pm.merchant_name})`;
                if (exportRes) {
                    console.log(`Export data success for ${currentProduct}`);
                    successfulProduct.push(currentProduct);
                    fs.writeFileSync(currentProduct + '.csv', exportRes);
                } else {
                    console.error(
                        `Export data failed for ${currentProduct}`,
                        exportRes,
                    );
                }
            }
            console.log('Successful product: ', successfulProduct.length);
            console.log('Successful product: ', successfulProduct);

            res.render('export_logs/result', {
                title: 'Export Unipin',
                // url: '',
                message: `Export data success for ${successfulProduct.length} products`,
                data: successfulProduct,
            });
        } catch (error) {
            next(error);
        }
    },
};
