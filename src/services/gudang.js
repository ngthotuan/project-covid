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
                await productMappingService.findAllByPartnerCode('gudang');
            res.render('export_logs/gudang', {
                title: 'Export Gudang',
                product_mappings,
            });
        } catch (error) {
            next(error);
        }
    },
    async post(req, res, next) {
        try {
            let { products, startDate, endDate, includeVoucher } = req.body;

            if (typeof products === 'string') {
                products = [products];
            }

            if (!startDate || !endDate) {
                [startDate, endDate] = util.getDateRange();
                startDate = util.formatDate(startDate, 'DD/MM/YYYY');
                endDate = util.formatDate(endDate, 'DD/MM/YYYY');
            }

            console.log('Gudang startDate', startDate);
            console.log('Gudang endDate', endDate);

            const condition = {
                partner_code: 'gudang',
                merchant_code: { [Op.in]: products },
            };
            console.log('Gudang condition', condition);
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
                            partner_code: 'gudang',
                            product_code: pm.product_code,
                        });

                    const currentProduct = `GUDANG - ${pm.product_code_product.code} - ${pm.product_code_product.name} (${pm.merchant_code} - ${pm.merchant_name})`;
                    // login to get session and export
                    const url = 'https://www.gudangvoucher.com/admmc/';
                    const txtUsername = By.xpath("//input[@name='c_username']");
                    const txtPassword = By.xpath("//input[@name='c_password']");
                    const btnLogin = By.xpath("//input[@name='tombol']");
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

                        await util.sleep(1000);
                        console.log('get cookie success, quit driver');
                        await driver.quit();

                        const cookiesValue = cookies
                            .map((cookie) => `${cookie.name}=${cookie.value}`)
                            .join('; ');

                        // non voucher
                        const nonVoucherURL = `https://www.gudangvoucher.com/admmc/index.php?ADMPGreportXls=1&fromDate=${startDate}&toDate=${endDate}&status=paid&MID=${pm.merchant_code}&customid=&ver=2007`;
                        const response = await axios.get(nonVoucherURL, {
                            headers: {
                                ...selenium.headers,
                                Cookie: cookiesValue,
                            },
                            responseType: 'arraybuffer',
                        });
                        fs.writeFileSync(
                            currentProduct + '-NON-VOUCHER' + '.xlsx',
                            response.data,
                        );
                        successfulProduct.push(currentProduct + '-NON-VOUCHER');

                        // voucher
                        if (includeVoucher) {
                            const voucherURL = `https://www.gudangvoucher.com/admmc/index.php?MSalesReportXLS=1&fromDate=${startDate}&toDate=${endDate}&MID=MID=${pm.merchant_code}`;
                            const response1 = await axios.get(voucherURL, {
                                headers: {
                                    ...selenium.headers,
                                    Cookie: cookiesValue,
                                },
                                responseType: 'arraybuffer',
                            });
                            fs.writeFileSync(
                                currentProduct + '-VOUCHER' + '.xlsx',
                                response1.data,
                            );
                            successfulProduct.push(currentProduct + '-VOUCHER');
                        }
                    } catch (err) {
                        console.error(
                            `Export data failed for ${currentProduct}`,
                            exportRes,
                        );
                        console.log(err);
                        await driver.quit();
                        next(err);
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
