/**
 * Created by zhaojianwei on 2017/5/1.
 */
var handler = module.exports
var client = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/stock';

handler.db = function(callback) {
    client.connect(url, function (err, db) {
        if (err != null) {
            return callback(err, null)
        } else {
            return callback(null, db);
        }
    });
};

// var mysql = require("mysql");
// var $conf = require("../conf/db");
//
// module.exports = mysql.createPool($conf.mysql);

// var assert = require("assert");
// var MongoClient = require('mongodb').MongoClient;
//
// var url = 'mongodb://localhost:27017/stock';
// // module.exports = MongoClient.connect(url, function(err, db) {
// //     assert.equal(null, err);
// //     console.log("Connected correctly to server.");
// //     db.close();
// //     return db;
// // });
//
// module.exports = function (callback) {
//     MongoClient.connect(url, function(err, db) {
//         assert.equal(null, err);
//         console.log("Connected correctly to server.");
//         callback(null, db);
//         //return db
//     })
// };


// var mongodb = require('mongodb'),
//     // 数据库连接缓存
//     cache = {};
//
// function connect (url, options) {
//     var fns = [], status = 0, _db = cache[url];
//     return function (f) {
//         var args = arguments;
//         if (_db !== null && typeof _db === 'object') {
//             f.call(null, _db);
//             return;
//         }
//         fns.push(f);
//         // 当有一个连接初始化请求时，挂起其他初始化请求
//         // 连接池建立完后，使用该连接处理挂起的请求
//         if (status === 0) {
//             status = 1;
//             mongodb.MongoClient.connect(url, options, function (err, db) {
//                 if (err) { throw err; }
//                 _db = cache[url] = db;
//                 for (var i = 0, len = fns.length; i < len; i++) {
//                     fns.shift().call(null, _db);
//                 }
//             });
//         }
//     };
// };
// module.connect = connect;