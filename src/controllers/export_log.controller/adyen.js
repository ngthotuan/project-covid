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
            const account = await partnerAccountService.findByPartnerCode(
                'adyen',
            );
            const url = 'https://ca-live.adyen.com/';
            const first = await axios.get(url);
            const second = await axios.get(
                first.request.res.responseUrl.replace(
                    'authn/index.html',
                    'authn/api/creds/v1/unpackRequest',
                ),
            );
            const third = await axios.post(
                'https://authn-live.adyen.com/authn/api/password/v1/check',
                {
                    account: account.password2,
                    userName: account.username,
                    password: account.password,
                },
                {
                    headers: {
                        cookie: second.headers['set-cookie']?.[0]?.split(
                            ';',
                        )[0],
                        formHash: second.headers.formhash,
                    },
                },
            );
            console.log(
                'go to this link and copy cookie JSESSIONID: ',
                third.data.returnUrl,
            );
            // const third = {
            //     data: {
            //         returnUrl: 'http://google.com',
            //     },
            // };

            res.render('export_logs/adyen', {
                title: 'Export Adyen',
                url: third.data.returnUrl,
            });
        } catch (error) {
            next(error);
        }
    },

    async post(req, res, next) {
        try {
            const { JSESSIONID, startDate, endDate } = req.body;
            const cookie = `JSESSIONID=${JSESSIONID};`;
            const hashLink =
                'https://ca-live.adyen.com/ca/ca/ui-api/homepage/v1/S3B-VGcuLGo32XX1gVmZuKmdjJmFnLXYsaFBOd1wh/reports';
            const response = await axios.get(hashLink, {
                headers: { cookie },
            });
            const formHash = response.headers.formhash;

            const dateRange = util.getDateRange();
            const exportLink =
                'https://ca-live.adyen.com/ca/ca/ui-api/reporting/v1/S3B-VGcuLGo32XX1gVmZuKmdjJmFnLXYsaFBOd1wh/reports/S3B-UEx34QX5cMTpxQnVaOydtZnAoJUAmLElTJixlaXtNZSVNP1ks:queue';
            const exportData = await axios.post(
                exportLink,
                {
                    parameters: {
                        overrideReportingTimezone: false,
                        journaltypecodes: ['SentForSettle'],
                        reportstartdate: startDate
                            ? startDate + ' 00:00:00'
                            : moment(dateRange[0]).format(
                                  'YYYY-MM-DD HH:mm:ss',
                              ),
                        reportenddate: endDate
                            ? endDate + ' 00:00:00'
                            : moment(dateRange[1]).format(
                                  'YYYY-MM-DD HH:mm:ss',
                              ),
                    },
                    format: 'CSV',
                },
                {
                    headers: {
                        formHash,
                        cookie,
                    },
                },
            );

            if (exportData.status === 204) {
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

                        res.render('export_logs/result', {
                            title: 'Export Adyen',
                            url: 'https://ca-live.adyen.com/ca/ca/reports/details.shtml?reportCode=S3B-UEx34QX5cMTpxQnVaOydtZnAoJUAmLElTJixlaXtNZSVNP1ks',
                            message: 'Go to Adyen to download the file',
                            data: {},
                        });
                    }
                }, 2000);
            }
        } catch (error) {
            next(error);
        }
    },
};
