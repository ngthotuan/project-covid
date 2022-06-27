const axios = require('axios');
const util = require('../../util');
const moment = require('moment');
const md5 = require('md5');
const Op = require('sequelize').Op;
const fs = require('fs');
const { Builder, By, Key, until } = require('selenium-webdriver');

const { selenium: seleniumConfig } = require('../../config');
const { selenium: seleniumUtil } = require('../../utils');
const {
    partnerAccountService,
    productMappingService,
} = require('../../services');

module.exports = {
    async get(req, res, next) {
        try {
            const product_mappings =
                await productMappingService.findAllByPartnerCode('gash');
            res.render('export_logs/gash', {
                title: 'Export Gash',
                defaultMonth: util.getLastMonth('YYYYMM'),
                product_mappings,
            });
        } catch (error) {
            next(error);
        }
    },
    async post(req, res, next) {
        try {
            let { products, month } = req.body;

            if (typeof products === 'string') {
                products = [products];
            }

            if (!month || !month.length === 6) {
                month = util.getLastMonth('YYYYMM');
            }

            console.log('Gash month', month);

            const condition = {
                partner_code: 'gash',
                merchant_code: { [Op.in]: products },
            };
            console.log('Gash condition', condition);
            const product_mappings =
                await productMappingService.findAllByCondition(condition);

            const successfulProduct = [];
            for (const pm of product_mappings) {
                try {
                    console.log('Call export: ', JSON.stringify({ pm, month }));
                    const account =
                        await partnerAccountService.findOneByCondition({
                            partner_code: 'gash',
                            product_code: pm.product_code,
                        });
                    if (!account) {
                        console.error(
                            'Account not found: ',
                            JSON.stringify({ pm, startDate, endDate }),
                        );
                        continue;
                    }
                    const currentProduct = `GASH - ${pm.merchant_code} - ${pm.merchant_name}`;
                    console.log(currentProduct);
                    // login to get session and export
                    const url = 'https://msc.gashplus.com/anydoor/default.aspx';
                    const txtUsername = By.id('txtUserID');
                    const txtPassword = By.id('txtUserPWD');
                    const btnLogin = By.id('btnLogin');
                    const inputMonth = By.id(
                        'ctl00_MainContentPlaceHolder_TB_TRANS_MONTH',
                    );
                    const cbReverseOrder = By.id(
                        'ctl00_MainContentPlaceHolder_RB_TRANS_TYPE_1',
                    );
                    const btnExport = By.id(
                        'ctl00_MainContentPlaceHolder_BTN_EXPORT_REPORT',
                    );

                    let driver = await new Builder()
                        .forBrowser(seleniumConfig.driver)
                        .build();
                    try {
                        await driver.get(url);
                        await driver.manage().window().maximize();
                        await driver.manage().setTimeouts({
                            implicit: seleniumConfig.timeout,
                            pageLoad: seleniumConfig.timeout,
                            script: seleniumConfig.timeout,
                        });
                        console.log(await driver.manage().getTimeouts());

                        await seleniumUtil.setText(
                            driver,
                            txtUsername,
                            account.username,
                        );
                        await seleniumUtil.setText(
                            driver,
                            txtPassword,
                            account.password,
                        );
                        await seleniumUtil.click(driver, btnLogin);
                        const cookies = await driver.manage().getCookies();

                        // await util.sleep(1000);
                        // console.log('get cookie success, quit driver');
                        // await driver.quit();

                        const cookiesValue = cookies
                            .map((cookie) => `${cookie.name}=${cookie.value}`)
                            .join('; ');

                        console.log(cookiesValue);
                        const cookieKey = 'AnydoorOTP';
                        const cookieValue = cookies.filter(
                            (c) => (c.name = cookieKey),
                        )[0].value;

                        const gpsLink = `https://msc.gashplus.com/anydoor/Sysmenu.aspx?System=GPS&Des=TW&OTP=${cookieValue}`;
                        await driver.navigate().to(gpsLink);

                        const exportLink = `https://msc.gashplus.com/anydoor/SysMain.aspx?OTP=${cookieValue}&url=https://eg.gashplus.com/Backend/app/ContentProviderBackEnd/MerchantBillReport_V2.aspx?IDType=1`;
                        await driver.navigate().to(exportLink);

                        await seleniumUtil.setText(driver, inputMonth, month);
                        await seleniumUtil.click(driver, cbReverseOrder);
                        await seleniumUtil.click(driver, btnExport);

                        successfulProduct.push(currentProduct);

                        // quit driver
                        await util.sleep(50000);
                        await driver.quit();
                    } catch (err) {
                        console.error(
                            `Export data failed for ${currentProduct}`,
                        );
                        console.log(err);
                        await driver.quit();
                    }
                } catch (error) {
                    console.log('loop product mapping export error', error);
                }
            }
            console.log('Successful product: ', successfulProduct.length);
            console.log('Successful product: ', successfulProduct);

            res.render('export_logs/result', {
                title: 'Export Gash',
                // url: '',
                message: `Export data success for ${successfulProduct.length} products`,
                data: successfulProduct,
            });
        } catch (error) {
            next(error);
        }
    },
};
