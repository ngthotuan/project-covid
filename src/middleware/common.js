const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

function common(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors());
    app.use(
        session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 24 * 60 * 60 * 1000 },
        }),
    );
    app.use(flash());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/product-images', express.static('uploads'));
    app.use(logger('dev'));
    app.use(expressLayouts);
}

module.exports = common;
