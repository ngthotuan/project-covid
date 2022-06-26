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

const url = 'https://www.paypal.com/sg/signin';
const txtUsername = By.xpath("//input[@id='email']");
const txtPassword = By.xpath("//input[@id='password']");
const btnNext = By.xpath("//button[@id='btnNext']");
const btnLogin = By.xpath("//button[@id='btnLogin']");
const btnReport = By.xpath("//a[normalize-space()='Reports']");
const btnActivityDownload = By.xpath("//button[@id='2']");
const ddAllTransaction = By.xpath(
    "//div[@class='ppvx_dropdown report_dropdown activityDropdown']//div[@class='dp_cover']",
);
const ddAllTransactionSelect = By.xpath("//li[@title='All transactions']");
const ddDateRange = By.xpath("//div[@class='ppvx_dropdown_label']");
const ddDateRangeSelect = By.xpath("//li[@title='Past month']");
const ddStartDate = By.xpath("//input[@id='start']");
const ddEndDate = By.xpath("//input[@id='end']");
const btnCreateReport = By.xpath(
    "//button[@class='ppvx_btn btn-btn-primary-csrSubmit']",
);

module.exports = {
    async get(req, res, next) {
        try {
            const product_mappings =
                await productMappingService.findAllByPartnerCode('paypal');
            res.render('export_logs/paypal', {
                title: 'Export Paypal',
                product_mappings,
            });
        } catch (error) {
            next(error);
        }
    },
    async post(req, res, next) {
        try {
            let { products, startDate, endDate } = req.body;

            if (typeof products === 'string') {
                products = [products];
            }

            const condition = {
                partner_code: 'paypal',
                merchant_code: { [Op.in]: products },
            };
            console.log('paypal condition', condition);
            const product_mappings =
                await productMappingService.findAllByCondition(condition);

            const successfulProduct = [];
            for (const pm of product_mappings) {
                try {
                    console.log(
                        'Call export: ',
                        JSON.stringify({ pm, startDate, endDate }),
                    );
                    const account =
                        await partnerAccountService.findOneByCondition({
                            partner_code: 'paypal',
                            product_code: pm.product_code,
                        });

                    if (!account) {
                        console.error(
                            'Account not found: ',
                            JSON.stringify({ pm, startDate, endDate }),
                        );
                        continue;
                    }

                    const currentProduct = `PAYPAL - ${pm.product_code_product.code} - ${pm.product_code_product.name} (${pm.merchant_code} - ${pm.merchant_name})`;
                    console.log(currentProduct);

                    // login and export
                    let driver = new Builder()
                        .forBrowser(selenium.driver)
                        .build();
                    try {
                        // login
                        await driver.manage().window().maximize();
                        await driver.get(url);

                        await util.setText(
                            driver,
                            txtUsername,
                            account.username,
                        );
                        await util.click(driver, btnNext);
                        await util.setText(
                            driver,
                            txtPassword,
                            account.password,
                        );
                        await util.click(driver, btnLogin);
                        await driver.sleep(4000);
                        await driver
                            .navigate()
                            .to('https://www.paypal.com/reports/dlog');
                        await driver.sleep(2000);
                        await util.click(driver, ddAllTransaction);
                        await util.click(driver, ddAllTransactionSelect);
                        await util.click(driver, ddDateRange);
                        if (startDate && endDate) {
                            await util.setText(driver, ddStartDate, startDate);
                            await util.setText(driver, ddEndDate, endDate);
                        } else {
                            await util.click(driver, ddDateRangeSelect);
                        }
                        // await util.click(driver, btnCreateReport);

                        // quit driver
                        await driver.sleep(5000);
                        await driver.quit();
                        successfulProduct.push(currentProduct);
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
                title: 'Export Paypal',
                // url: '',
                message: `Export data success for ${successfulProduct.length} products`,
                data: successfulProduct,
            });
        } catch (error) {
            next(error);
        }
    },
};
