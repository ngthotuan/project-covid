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
                await productMappingService.findAllByPartnerCode('gocpay');
            res.render('export_logs/gocpay', {
                title: 'Export GOCPay',
                product_mappings,
            });
        } catch (error) {
            next(error);
        }
    },
    async post(req, res, next) {
        try {
            next(new Error('Not implement yet!'));
        } catch (error) {
            next(error);
        }
    },
};
