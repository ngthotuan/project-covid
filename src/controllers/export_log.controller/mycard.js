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

module.exports = {
    async get(req, res, next) {
        try {
            const product_mappings =
                await productMappingService.findAllByPartnerCode('mycard');
            res.render('export_logs/mycard', {
                title: 'Export Mycard',
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

            console.log('Mycard startDate', startDate);
            console.log('Mycard endDate', endDate);

            const condition = {
                partner_code: 'mycard',
                merchant_code: { [Op.in]: products },
            };
            console.log('Mycard condition', condition);
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
                            partner_code: 'mycard',
                            product_code: pm.product_code,
                        });

                    if (!account) {
                        console.error(
                            'Account not found: ',
                            JSON.stringify({ pm, startDate, endDate }),
                        );
                        continue;
                    }

                    const currentProduct = `MYCARD - ${pm.merchant_code} - ${pm.merchant_name}`;
                    console.log(currentProduct);
                    // login to get session and export
                    const url = 'http://bargain.mycard520.com.tw/SWWebMVC/';
                    const txtUsername = By.id('Account');
                    const txtPassword = By.id('Password');
                    const btnLogin = By.id('btnLogin');
                    const navReport = By.css(
                        `a[href="javascript:GoToRedirectPage('http://bargain.mycard520.com.tw/MyCardWebBack/QueryTransactionAndReplenishment/Default/Index');"]`,
                    );
                    const detailRad = By.xpath(
                        "//label[normalize-space()='Details']",
                    );
                    const startDateInput = By.id('StartDate_D');
                    const endDateInput = By.id('EndDate_D');
                    const btnQuery = By.id('QueryBTN');
                    const txtUserID = By.id('UserID_D');

                    let driver = await new Builder()
                        .forBrowser(selenium.driver)
                        .build();
                    try {
                        await driver.manage().window().maximize();
                        await driver.get(url);
                        await driver
                            .findElement(txtUsername)
                            .sendKeys(account.username);
                        await driver
                            .findElement(txtPassword)
                            .sendKeys(account.password);
                        await driver.findElement(btnLogin).click();
                        const cookies = await driver.manage().getCookies();

                        // await util.sleep(1000);
                        // console.log('get cookie success, quit driver');
                        // await driver.quit();

                        const cookiesValue = cookies
                            .map((cookie) => `${cookie.name}=${cookie.value}`)
                            .join('; ');

                        console.log(cookiesValue);

                        await driver.findElement(navReport).click();

                        await driver.switchTo().frame(0);
                        await driver.findElement(detailRad).click();

                        await driver.executeAsyncScript(
                            `document.querySelector("#StartDate_D").readOnly = false;
                            document.querySelector("#StartDate_D").value = '${startDate}';
                            document.querySelector("#EndDate_D").readOnly = false;
                            document.querySelector("#EndDate_D").value = '${endDate}';`,
                        );

                        await driver.executeAsyncScript(
                            'window.scrollTo(0, 1000);',
                        );

                        // await driver
                        //     .findElement(startDateInput)
                        //     .sendKeys(startDate);
                        // await driver
                        //     .findElement(endDateInput)
                        //     .sendKeys(endDate);

                        await util.sleep(5000);
                        await driver.quit();

                        // TODO
                        // export mycard
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
                title: 'Export Gudang',
                // url: '',
                message: `Export data success for ${successfulProduct.length} products`,
                data: successfulProduct,
            });
        } catch (error) {
            next(error);
        }
    },
};
