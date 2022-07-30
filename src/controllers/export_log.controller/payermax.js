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

const exportDataPayerMax = async (token, merchantId, startDate, endDate) => {
    const response = await axios.post(
        'https://pay-mmc.payermax.com/pay-mmc-web/payOrder/list/down2',
        {
            startDate,
            endDate,
            merchantId,
            status: 1,
            globalTimeZone: 420,
            timeZone: 'Asia/Ho_Chi_Minh',
            mailLang: 1,
            orderId: '',
            countryCode: '',
            companyEntity: '',
            payType: '',
            payReqMaskSuffix: '',
        },
        {
            headers: {
                token,
                merchantid: merchantId,
            },
        },
    );
    return response.data;
};

module.exports = {
    async get(req, res, next) {
        try {
            const product_mappings =
                await productMappingService.findAllByPartnerCode('payermax');
            res.render('export_logs/payermax', {
                title: 'Export Payermax',
                product_mappings,
            });
        } catch (error) {
            next(error);
        }
    },

    async post(req, res, next) {
        try {
            const account = await partnerAccountService.findByPartnerCode(
                'payermax',
            );
            // login
            const dataLogin = await axios.post(
                'https://pay-mmc.payermax.com/pay-mmc-web/user/login',
                {
                    username: account.username,
                    password: md5(account.password),
                },
            );
            if (dataLogin.data.bizCode !== '200') {
                throw new Error('Login failed');
            }

            const token = dataLogin.data.token;
            console.log('PayerMax login success', token);

            let { products, startDate, endDate } = req.body;

            if (typeof products === 'string') {
                products = [products];
            }

            if (!startDate || !endDate) {
                [startDate, endDate] = util.getDateRange();
            } else {
                startDate = moment(startDate).startOf('day').valueOf();
                endDate = moment(endDate).endOf('day').valueOf();
            }

            console.log('PayerMax startDate', startDate);
            console.log('PayerMax endDate', endDate);

            const condition = {
                partner_code: 'payermax',
                merchant_code: { [Op.in]: products },
            };
            console.log('PayerMax condition', condition);
            const product_mappings =
                await productMappingService.findAllByCondition(condition);
            const successfulProduct = [];
            for (const pm of product_mappings) {
                console.log(
                    'Call export: ',
                    JSON.stringify({ token, pm, startDate, endDate }),
                );
                const exportRes = await exportDataPayerMax(
                    token,
                    pm.merchant_code,
                    startDate,
                    endDate,
                );
                const currentProduct =
                    `${pm.product_code_product.code} - ${pm.product_code_product.name} (${pm.merchant_code} - ${pm.merchant_name})`.replace(
                        /[/\\?%*:|"<>]/g,
                        '-',
                    );
                if (exportRes.code === '200') {
                    console.log(`Export data success for ${currentProduct}`);
                    successfulProduct.push(currentProduct);
                } else {
                    console.error(
                        `Export data failed for ${currentProduct}`,
                        exportRes,
                    );
                }
                await util.sleep(5000);
            }
            console.log('Successful product: ', successfulProduct.length);
            console.log('Successful product: ', successfulProduct);

            res.render('export_logs/result', {
                title: 'Export PayerMax',
                // url: '',
                message: `Export data success for ${successfulProduct.length} products`,
                data: successfulProduct,
            });
        } catch (error) {
            next(error);
        }
    },
};
