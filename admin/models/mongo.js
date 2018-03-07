/**
 * Created by zhaojianwei on 2017/12/28.
 */
var mongoose = require("mongoose");

const conf = require("../config/server.json");
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://mongosA:27501,mongosB:27501', { mongos: true }, cb);

mongoose.connection.openUri(conf.mongo.url+'/'+conf.mongo.dbname);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to '+conf.mongo.url+'/'+conf.mongo.dbname)
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

mongoose.connection.once('open', function (callback) {
});

module.exports = mongoose;