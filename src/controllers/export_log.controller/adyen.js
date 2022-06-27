const axios = require('axios');
const util = require('../../util');
const moment = require('moment');
const md5 = require('md5');
const Op = require('sequelize').Op;
const fs = require('fs');
const { Builder, Capabilities, By, Key, until } = require('selenium-webdriver');

const { selenium: seleniumConfig } = require('../../config');
const { selenium: seleniumUtil } = require('../../utils');
const {
    partnerAccountService,
    productMappingService,
} = require('../../services');

const url = 'https://ca-live.adyen.com/ca/ca/';
const txtUserName = By.xpath("//input[@name='userName']");
const btnNext = By.xpath('//button');
const txtAccount = By.xpath("//input[@name='account']");
const txtPassword = By.xpath("//input[@name='password']");
const btnLogin = By.xpath("//button[normalize-space(text()) = 'Log in']");
const navReport = By.xpath("//span[normalize-space(text()) = 'Reports']");
const linkReport = By.xpath("//span[text()='Interactive payment accounting']");
const btnGenerate = By.xpath("//button[text()='Generate report']");
const ddDateRange = By.xpath("//div[normalize-space(text()) = 'Select dates']");
const txtSelectDate = By.xpath("//h4[normalize-space()='Select dates']");
const fromDate = By.xpath("(//input[@placeholder='yyyy-mm-dd'])[1]");
const fromTime = By.xpath("(//input[@placeholder='hh:mm:ss'])[1]");
const toDate = By.xpath("(//input[@placeholder='yyyy-mm-dd'])[2]");
const toTime = By.xpath("(//input[@placeholder='hh:mm:ss'])[2]");
const btnSubmitTime = By.xpath("//button[normalize-space()='Submit']");
const rdConfigTimeZone = By.xpath("//span[text()='Configured timezone']");
const ddEventReport = By.xpath("//span[normalize-space(text()) = 'Select...']");
const cbSentForSettle = By.xpath("//span[normalize-space()='SentForSettle']");
const txtWhichEvent = By.xpath("//label[@title='Which events to report on']");
const btnGenerateReport = By.xpath(
    "//button[@class='adl-button loading-button loading-button--start']",
);
const iconDownload = By.xpath("(//i[@class='adl-icon-download'])[1]");

module.exports = {
    async get(req, res, next) {
        try {
            const product_mappings =
                await productMappingService.findAllByPartnerCode('adyen');
            res.render('export_logs/adyen', {
                title: 'Export Adyen',
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

            const condition = {
                partner_code: 'adyen',
                merchant_code: { [Op.in]: products },
            };
            console.log('adyen condition', condition);
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
                            partner_code: 'adyen',
                            product_code: pm.product_code,
                        });

                    if (!account) {
                        console.error(
                            'Account not found: ',
                            JSON.stringify({ pm, startDate, endDate }),
                        );
                        continue;
                    }

                    const currentProduct = `ADYEN - ${pm.product_code_product.code} - ${pm.product_code_product.name} (${pm.merchant_code} - ${pm.merchant_name})`;
                    console.log(currentProduct);

                    // login and export
                    const chromeCapabilities = Capabilities.chrome();
                    //setting chrome options to start the browser fully maximized
                    const chromeOptions = {
                        args: ['--test-type', '--start-maximized'],
                        prefs: {
                            'download.default_directory':
                                '/home/nttuan/Documents',
                        },
                    };
                    chromeCapabilities.set('chromeOptions', chromeOptions);
                    let driver = new Builder()
                        .forBrowser(seleniumConfig.driver)
                        .withCapabilities(chromeCapabilities)
                        .build();
                    try {
                        // login
                        await driver.manage().window().maximize();
                        await driver.get(url);
                        await driver
                            .manage()
                            .setTimeouts({
                                implicit: seleniumConfig.timeout,
                                pageLoad: seleniumConfig.timeout,
                                script: seleniumConfig.timeout,
                            });
                        console.log(await driver.manage().getTimeouts());
                        await seleniumUtil.setText(
                            driver,
                            txtUserName,
                            account.username,
                        );
                        await seleniumUtil.click(driver, btnNext);
                        await seleniumUtil.setText(
                            driver,
                            txtAccount,
                            account.password2,
                        );
                        await seleniumUtil.setText(
                            driver,
                            txtPassword,
                            account.password,
                        );
                        await seleniumUtil.click(driver, btnLogin);
                        await seleniumUtil.click(driver, navReport);
                        await seleniumUtil.click(driver, linkReport);
                        await seleniumUtil.click(driver, btnGenerate);
                        await seleniumUtil.click(driver, ddDateRange);
                        await seleniumUtil.setText(driver, fromDate, startDate);
                        await seleniumUtil.setText(
                            driver,
                            fromTime,
                            '00:00:00',
                        );
                        await seleniumUtil.setText(driver, toDate, endDate);
                        await seleniumUtil.setText(driver, toTime, '23:59:59');
                        await seleniumUtil.click(driver, txtSelectDate);
                        await seleniumUtil.click(driver, btnSubmitTime);
                        await seleniumUtil.click(driver, rdConfigTimeZone);
                        await seleniumUtil.click(driver, ddEventReport);
                        await seleniumUtil.click(driver, cbSentForSettle);
                        await seleniumUtil.click(driver, txtWhichEvent);
                        await seleniumUtil.click(driver, btnGenerateReport);
                        const cookies = await driver.manage().getCookies();
                        const cookie = cookies
                            .map((c) => c.name + '=' + c.value)
                            .join('; ');
                        const id = setInterval(async () => {
                            const resp = await axios.get(
                                'https://ca-live.adyen.com/ca/ca/ui-api/reporting/v1/S3B-VGcuLGo32XX1gVmZuKmdjJmFnLXYsaFBOd1wh/reports/S3B-UEx34QX5cMTpxQnVaOydtZnAoJUAmLElTJixlaXtNZSVNP1ks/report-requests?includefailed=true',
                                {
                                    headers: {
                                        cookie,
                                    },
                                },
                            );
                            console.log(
                                `[${Date.now()}] adyen waiting for export data...`,
                            );
                            const data = resp.data;
                            if (data.length === 0) {
                                console.log(
                                    'Adyen done: https://ca-live.adyen.com/ca/ca/reports/details.shtml?reportCode=S3B-UEx34QX5cMTpxQnVaOydtZnAoJUAmLElTJixlaXtNZSVNP1ks',
                                );
                                clearInterval(id);

                                successfulProduct.push(currentProduct);

                                console.log(
                                    'Successful product: ',
                                    successfulProduct.length,
                                );
                                console.log(
                                    'Successful product: ',
                                    successfulProduct,
                                );

                                // https://ca-live.adyen.com/ca/ca/ui-api/reporting/v1/S3B-VGcuLGo32XX1gVmZuKmdjJmFnLXYsaFBOd1wh/generated-reports/S3B-RXNQJVshaVJVU11sPG534LC434MjYvZ1g8LylHK1RQS1lRbGE7YkVmdw:download
                                res.render('export_logs/result', {
                                    title: 'Export Adyen',
                                    message: `Export data success for ${successfulProduct.length} products`,
                                    data: successfulProduct,
                                });

                                await seleniumUtil.click(driver, iconDownload);

                                // quit driver
                                await driver.sleep(5 * 60 * 1000);
                                await driver.quit();
                            }
                        }, 2000);
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
        } catch (error) {
            next(error);
        }
    },
};
