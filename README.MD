### Generate DB
rm -r src/models && mkdir src/models && npx sequelize-auto -o "./src/models" -d sea_log  -h localhost -u root -p 3306 -x 'Nttuan@root123' -e mysql && cp src/models/init-models.js src/models/index.js

## - Gudang
> 2 account: 1 cs_id(MID=1049), 1 all game(MID=448)
> env: START_DATE, END_DATE, MID
> DATE_FORMAT: DD-MM-YYYY

### voucher - nodata
query(don't care): https://www.gudangvoucher.com/admmc/index.php?Sales=1&fromDate={{START_DATE}}&toDate={{END_DATE}}

export: https://www.gudangvoucher.com/admmc/index.php?MSalesReportXLS=1&fromDate={{START_DATE}}&toDate={{END_DATE}}&MID={{MID}}

### non-voucher
query(don't care): https://www.gudangvoucher.com/admmc/index.php?SalesPG=1&fromDate={{START_DATE}}&toDate={{END_DATE}}&Prm2=paid&customid=

export: https://www.gudangvoucher.com/admmc/index.php?ADMPGreportXls=1&fromDate={{START_DATE}}&toDate={{END_DATE}}&status=paid&MID={{MID}}&customid=&ver=2007


## - GocPay

### Payment gateway
https://merchant.goc.id/webtools/report/payment-gateway/export?type_date=9&start_date=2022-05-01=2022-05-31&partner_name=VNG%20CS%20ID