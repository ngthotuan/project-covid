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
                    let driver = await new Builder()
                        .forBrowser(selenium.driver)
                        .build();
                    try {
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
                        const cookieKey = 'AnydoorOTP';
                        const cookieValue = cookies.filter(
                            (c) => (c.name = cookieKey),
                        )[0].value;

                        const gpsLink = `https://msc.gashplus.com/anydoor/Sysmenu.aspx?System=GPS&Des=TW&OTP=${cookieValue}`;
                        console.log('gpsLink', gpsLink);
                        await driver.navigate().to(gpsLink);

                        const exportLink = `https://msc.gashplus.com/anydoor/SysMain.aspx?OTP=${cookieValue}&url=https://eg.gashplus.com/Backend/app/ContentProviderBackEnd/MerchantBillReport_V2.aspx?IDType=1`;
                        console.log('exportLink', exportLink);
                        await driver.navigate().to(exportLink);

                        await util.sleep(5000);
                        await util.quit();

                        // TODO
                        // export gash

                        // non voucher
                        // const nonVoucherURL = `https://www.gudangvoucher.com/admmc/index.php?ADMPGreportXls=1&fromDate=${startDate}&toDate=${endDate}&status=paid&MID=${pm.merchant_code}&customid=&ver=2007`;
                        // const response = await axios.get(nonVoucherURL, {
                        //     headers: {
                        //         ...selenium.headers,
                        //         Cookie: cookiesValue,
                        //     },
                        //     responseType: 'arraybuffer',
                        // });
                        // fs.writeFileSync(
                        //     currentProduct + '-NON-VOUCHER' + '.xlsx',
                        //     response.data,
                        // );
                        // successfulProduct.push(currentProduct + '-NON-VOUCHER');
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
