const { until, Key } = require('selenium-webdriver');

module.exports = {
    setText: async (driver, element, text, timeout = 10000) => {
        let el = await driver.findElement(element);
        await driver.wait(until.elementIsVisible(el), timeout);
        await driver.wait(until.elementIsEnabled(el), timeout);
        await sendKey(driver, element, Key.CONTROL + 'a', timeout);
        await el.sendKeys(text);
    },

    sendKey: (driver, element, key, timeout = 10000) => {
        let el = await driver.findElement(element);
        await driver.wait(until.elementIsVisible(el), timeout);
        await el.sendKeys(key);
    },
};