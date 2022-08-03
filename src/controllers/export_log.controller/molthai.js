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

const url = 'https://merchant-th.gold.razer.com/index.php?r=site%2Flogin';
const txtUsername = By.xpath("//*[@id='loginform-username']");
const txtPassword = By.xpath("//*[@id='loginform-password']");
const btnLogin = By.xpath("//button[text()='Login']");
const reportLink = By.xpath("//a[text()=' Tools & Support ']");
const smsLink = By.xpath("//a[text()=' Export PSMS logs']");
const smsStartDateInput = By.xpath(
    "//*[@id='exportlogpsmsform-searchdatestart']",
);
const smsEndDateInput = By.xpath("//*[@id='exportlogpsmsform-searchdateend']");
// const txtExportLogPSMSUsage = By.xpath(
//     "//h1[normalize-space()='Export PSMS logs']"
// );
const txtExportLogPSMSUsage = By.xpath("//a[text()=' Export PSMS logs']");
const btnRunExport = By.xpath("//button[@id='btn-run-export']");
const cashCardEWalletLink = By.xpath(
    "//a[text()=' Export Cashcard/e-Wallet logs']",
);
const cashCardEWalletStartDate = By.id('exportlogform-searchdatestart');
const cashCardEWalletEndDate = By.id('exportlogform-searchdateend');
const cashCardEWalletLogType = By.xpath(
    "//span[contains(@aria-labelledby, 'searchlogtype')]",
);
const cashCardEWalletLogTypeInput = By.xpath("//input[@role='searchbox']");
const cashCardEWalletService = By.xpath(
    "//span[text()='Select a service ...']",
);
const cashCardEWalletServiceInput = By.xpath("//input[@role='searchbox']");

module.exports = {
    async get(req, res, next) {
        try {
            const product_mappings =
                await productMappingService.findAllByPartnerCode('molthai');
            res.render('export_logs/molthai', {
                title: 'Export Mol Thai',
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

            if (!startDate || !endDate) {
                [startDate, endDate] = util.getDateRange();
                startDate = util.formatDate(startDate, 'YYYY-MM-DD');
                endDate = util.formatDate(endDate, 'YYYY-MM-DD');
            }

            console.log('Molthai startDate', startDate);
            console.log('Molthai endDate', endDate);

            const condition = {
                partner_code: 'molthai',
                merchant_code: { [Op.in]: products },
            };
            console.log('Molthai condition', condition);
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
                            partner_code: 'molthai',
                            product_code: pm.product_code,
                        });

                    if (!account) {
                        console.error(
                            'Account not found: ',
                            JSON.stringify({ pm, startDate, endDate }),
                        );
                        continue;
                    }

                    const currentProduct = `MOLTHAI - ${pm.product_code_product.code} - ${pm.product_code_product.name} (${pm.merchant_code} - ${pm.merchant_name})`;
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
                        await util.setText(
                            driver,
                            txtPassword,
                            account.password,
                        );
                        await util.click(driver, btnLogin);
                        await driver.sleep(5000);

                        // export psms
                        await util.click(driver, reportLink);
                        await util.click(driver, smsLink);
                        await util.setText(
                            driver,
                            smsStartDateInput,
                            startDate,
                        );
                        await util.setText(driver, smsEndDateInput, endDate);
                        // await util.click(driver, txtExportLogPSMSUsage);
                        await util.click(driver, btnRunExport);
                        await driver.sleep(5000);

                        // export cashcard/e-wallet
                        await util.click(driver, reportLink);
                        await util.click(driver, cashCardEWalletLink);
                        await driver.sleep(5000);
                        await util.setText(
                            driver,
                            cashCardEWalletStartDate,
                            startDate,
                        );
                        await util.setText(
                            driver,
                            cashCardEWalletEndDate,
                            endDate,
                        );
                        // cash card
                        await util.click(driver, cashCardEWalletLogType);
                        await util.setText(
                            driver,
                            cashCardEWalletLogTypeInput,
                            'Cash card',
                        );
                        await util.sendKey(
                            driver,
                            cashCardEWalletLogTypeInput,
                            Key.ENTER,
                        );
                        await util.click(driver, cashCardEWalletService);
                        await util.setText(
                            driver,
                            cashCardEWalletServiceInput,
                            '--- All Service ---',
                        );
                        await util.sendKey(
                            driver,
                            cashCardEWalletServiceInput,
                            Key.ENTER,
                        );
                        await util.click(driver, btnRunExport);
                        await driver.sleep(7000);
                        // e-wallet
                        await util.click(driver, cashCardEWalletLogType);
                        await util.setText(
                            driver,
                            cashCardEWalletLogTypeInput,
                            'e-Wallet',
                        );
                        await util.sendKey(
                            driver,
                            cashCardEWalletLogTypeInput,
                            Key.ENTER,
                        );
                        await util.click(driver, btnRunExport);
                        await driver.sleep(5000);

                        // quit driver
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
                title: 'Export Molthai',
                // url: '',
                message: `Export data success for ${successfulProduct.length} products`,
                data: successfulProduct,
            });
        } catch (error) {
            next(error);
        }
    },
};
