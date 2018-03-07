/**
 * Created by zhaojianwei on 2018/1/3.
 */
const path = require('path');
const logger = require('morgan');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const redisStore = require('connect-redis')(session);
const expressLayouts = require('express-ejs-layouts');

var routes = require('./routes/router');
var base = require("./config/base.json");
var config = require("./config/server.json");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: "sessionId",
    store: new redisStore({host: config.redis.host, port: config.redis.port}),
    secret: "config.secret", // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 6000 * 1000 }
}));

app.use(expressLayouts);
app.use(expressLayouts);
app.use(function (req, res, next) {
    res.locals = {
        title: base.title,
        message: base.describe,
    };
    next()
});

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

