## This is source code of Project Covid-19

### Generate DB
rm -r src/models && mkdir src/models && npx sequelize-auto -o "./src/models" -d sea_log  -h localhost -u root -p 3306 -x 'Nttuan@root123' -e mysql && cp src/models/init-models.js src/models/index.js

### Payment Project
> https://github.com/ngthotuan/project-covid-payment/

### Deployment
1. covid: https://webprojectcovid.herokuapp.com/
2. payment: https://webprojectpayment.herokuapp.com/

### Requirements
![Requirements](./docs/img/Project_Covid-1.jpg)
![Requirements](./docs/img/Project_Covid-2.jpg)
![Requirements](./docs/img/Project_Covid-3.jpg)
![Requirements](./docs/img/Project_Covid-4.jpg)