const axios = require('axios');
const util = require('../util');
const moment = require('moment');
const md5 = require('md5');
const Op = require('sequelize').Op;

const { partnerAccountService, productMappingService } = require('../services');

const getExportAdyen = async (req, res, next) => {
    try {
        const account = await partnerAccountService.findByPartnerCode('adyen');
        const url = 'https://ca-live.adyen.com/';
        const first = await axios.get(url);
        const second = await axios.get(
            first.request.res.responseUrl.replace(
                'authn/index.html',
                'authn/api/creds/v1/unpackRequest',
            ),
        );
        const third = await axios.post(
            'https://authn-live.adyen.com/authn/api/password/v1/check',
            {
                account: account.password2,
                userName: account.username,
                password: account.password,
            },
            {
                headers: {
                    cookie: second.headers['set-cookie']?.[0]?.split(';')[0],
                    formHash: second.headers.formhash,
                },
            },
        );
        console.log(
            'go to this link and copy cookie JSESSIONID: ',
            third.data.returnUrl,
        );
        // const third = {
        //     data: {
        //         returnUrl: 'http://google.com',
        //     },
        // };

        res.render('export_logs/adyen', {
            title: 'Export Adyen',
            url: third.data.returnUrl,
        });
    } catch (error) {
        next(error);
    }
};

const postExportAdyen = async (req, res, next) => {
    try {
        const { JSESSIONID, startDate, endDate } = req.body;
        const cookie = `JSESSIONID=${JSESSIONID};`;
        const hashLink =
            'https://ca-live.adyen.com/ca/ca/ui-api/homepage/v1/S3B-VGcuLGo32XX1gVmZuKmdjJmFnLXYsaFBOd1wh/reports';
        const response = await axios.get(hashLink, {
            headers: { cookie },
        });
        const formHash = response.headers.formhash;

        const dateRange = util.getDateRange();
        const exportLink =
            'https://ca-live.adyen.com/ca/ca/ui-api/reporting/v1/S3B-VGcuLGo32XX1gVmZuKmdjJmFnLXYsaFBOd1wh/reports/S3B-UEx34QX5cMTpxQnVaOydtZnAoJUAmLElTJixlaXtNZSVNP1ks:queue';
        const exportData = await axios.post(
            exportLink,
            {
                parameters: {
                    overrideReportingTimezone: false,
                    journaltypecodes: ['SentForSettle'],
                    reportstartdate: startDate
                        ? startDate + ' 00:00:00'
                        : moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
                    reportenddate: endDate
                        ? endDate + ' 00:00:00'
                        : moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
                },
                format: 'CSV',
            },
            {
                headers: {
                    formHash,
                    cookie,
                },
            },
        );

        if (exportData.status === 204) {
            const id = setInterval(async () => {
                const resp = await axios.get(
                    'https://ca-live.adyen.com/ca/ca/ui-api/reporting/v1/S3B-VGcuLGo32XX1gVmZuKmdjJmFnLXYsaFBOd1wh/reports/S3B-UEx34QX5cMTpxQnVaOydtZnAoJUAmLElTJixlaXtNZSVNP1ks/report-requests?includefailed=true',
                    {
                        headers: {
                            cookie,
                        },
                    },
                );
                console.log(`[${Date.now()}] adyen waiting for export data...`);
                const data = resp.data;
                if (data.length === 0) {
                    console.log(
                        'Adyen done: https://ca-live.adyen.com/ca/ca/reports/details.shtml?reportCode=S3B-UEx34QX5cMTpxQnVaOydtZnAoJUAmLElTJixlaXtNZSVNP1ks',
                    );
                    clearInterval(id);

                    res.render('export_logs/adyen', {
                        title: 'Export Adyen',
                        url: '#',
                        url2: 'https://ca-live.adyen.com/ca/ca/reports/details.shtml?reportCode=S3B-UEx34QX5cMTpxQnVaOydtZnAoJUAmLElTJixlaXtNZSVNP1ks',
                    });
                }
            }, 2000);
        }
    } catch (error) {
        next(error);
    }
};

const getExportPayerMax = async (req, res, next) => {
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
};

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

const postExportPayerMax = async (req, res, next) => {
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
            product_code: { [Op.in]: products },
        };
        console.log('PayerMax condition', condition);
        const product_mappings = await productMappingService.findAllByCondition(
            condition,
        );
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
            const currentProduct = `${pm.product_code_product.code} - ${pm.product_code_product.name}`;
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
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getExportAdyen,
    postExportAdyen,
    getExportPayerMax,
    postExportPayerMax,
};
