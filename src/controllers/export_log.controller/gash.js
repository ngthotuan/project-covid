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
        const url = 'https://www.gudangvoucher.com/admmc/';
        const txtUsername = By.xpath("//input[@name='c_username']");
        const txtPassword = By.xpath("//input[@name='c_password']");
        const btnLogin = By.xpath("//input[@name='tombol']");

        const account = await partnerAccountService.findByPartnerCode('gudang');

        let driver = await new Builder().forBrowser(selenium.driver).build();
        try {
            await driver.get(url);
            await driver.findElement(txtUsername).sendKeys(account.username);
            await driver.findElement(txtPassword).sendKeys(account.password);
            await driver.findElement(btnLogin).click();
            const cookies = await driver.manage().getCookies();

            await util.sleep(1000);

            const cookiesValue = cookies
                .map((cookie) => `${cookie.name}=${cookie.value}`)
                .join('; ');
            console.log(cookiesValue);
            const urlNav =
                'https://www.gudangvoucher.com/admmc/index.php?ADMPGreportXls=1&fromDate=01-05-2022&toDate=02-05-2022&status=paid&MID=448&customid=&ver=2007';
            const response = await axios.get(urlNav, {
                headers: {
                    ...selenium.headers,
                    Cookie: cookiesValue,
                },
                responseType: 'arraybuffer',
            });

            fs.writeFileSync('data1.xlsx', response.data);
            res.json(cookies);
        } catch (err) {
            console.log(err);
            next(err);
        } finally {
            await driver.quit();
        }
    },
};
