/**
 * Created by zhaojianwei on 2017/5/1.
 */

var handler = module.exports;
const util = require('util');
const http = require('http');
const url = require('url');
const moment = require("moment");
const async = require("async");
const iconv = require('iconv-lite');
const BufferHelper = require('bufferhelper');
var conf = require("../conf/database.json");
var mongo = require("../dao/mongo");

var codeMap = {};
var shCode = 600000;
var szCode = 000001;
var cyCode = 300000;


handler.UpdataStockData = function () {
    var hour = moment().hours();
    var date = parseInt(moment().format('YYYYMMDD'));
    GetUpdateTime(function (err, data) {
        if (err != null) {
            console.log("=====>>>failed");
        }

        if (hour > 10 && (!data[0] || (data[0].name == "code" && data[0].date < date))) {
            async.auto({
                sh: function (callback) {
                    CrawlerSH(callback)
                },
                sz: function (callback) {
                    CrawlerSZ(callback)
                },
                cy: function (callback) {
                    CrawlerCY(callback)
                }
            }, function (err, rslt) {
                mongo.db(function (err, conn) {
                    conn.collection("date").updateOne({name:"code"}, {$set: {date: date}}, {upsert: true}, function (err, rslt) {
                        conn.close()
                    })
                })
            })
        }
        if (hour > 15 && (!data[1] || (data[1].name == "data" && data[1].date < date))) {
            SaveStockTradingRecord(function (err, rslt) {
                mongo.db(function (err, conn) {
                    conn.collection("date").updateOne({name:"data"}, {$set: {date: date}}, {upsert: true}, function (err, rslt) {
                        conn.close()
                    })
                })
            })
        }

        shCode = 600000;
        szCode = 000001;
        cyCode = 300000;
    });
};

/**
 * 查询所有股票代码
 */
function CrawlerSH(callfunc) {
    async.whilst(
        function() { return shCode < 604000; },
        function(callback) {
            var code = "http://hq.sinajs.cn/list=sh"+pad(++shCode, 6);
            http.get(url.parse(code), function(res){
                var bufferHelper = new BufferHelper();
                res.on('data', function (chunk) {
                    bufferHelper.concat(chunk);
                });
                res.on('end',function(){
                    var comment = iconv.decode(bufferHelper.toBuffer(),'GBK');
                    if (comment.length < 200) return callback(null, code);
                    analyseAndSaveCode(shCode, comment, callback)
                });
            });
        },
        function (err, n) {
            console.log("=====>>>sh end.", err, n)
            return callfunc(null, n)
        }
    );
}

function CrawlerSZ(callfunc) {
    async.whilst(
        function() { return szCode < 100000; },
        function(callback) {
            var code = "http://hq.sinajs.cn/list=sh"+pad(++szCode, 6);
            http.get(url.parse(code), function(res){
                var bufferHelper = new BufferHelper();
                res.on('data', function (chunk) {
                    bufferHelper.concat(chunk);
                });
                res.on('end',function(){
                    var comment = iconv.decode(bufferHelper.toBuffer(),'GBK');
                    if (comment.length < 200) return callback(null, code);
                    analyseAndSaveCode(shCode, comment, callback)
                });
            });
        },
        function (err, n) {
            console.log("=====>>>sz end.", err, n)
            return callfunc(null, n)
        }
    );
}

function CrawlerCY(callfunc) {
    async.whilst(
        function() { return cyCode < 310000; },
        function(callback) {
            var code = "http://hq.sinajs.cn/list=sh"+pad(++cyCode, 6);
            http.get(url.parse(code), function(res){
                var bufferHelper = new BufferHelper();
                res.on('data', function (chunk) {
                    bufferHelper.concat(chunk);
                });
                res.on('end',function(){
                    var comment = iconv.decode(bufferHelper.toBuffer(),'GBK');
                    if (comment.length < 200) return callback(null, code);
                    analyseAndSaveCode(shCode, comment, callback)
                });
            });
        },
        function (err, n) {
            console.log("=====>>>cy end.", err, n)
            return callfunc(null, n)
        }
    );
}

function SaveStockTradingRecord(callfunc) {
    async.waterfall([
        function(callback) {
            mongo.db(function (error, connect) {
                connect.collection("code").find({}).toArray(function (err, rslt) {
                    connect.close();
                    callback(err, rslt);
                })
            })
        },
        function(data, callback) {
            var count = 0;
            async.whilst(
                function () {return count < data.length;},
                function (cb) {
                    var stock = data[count++];
                    //console.log("====>>300:\t", count, data.length);
                    http.get(url.parse("http://hq.sinajs.cn/list="+stock.exc+stock._id), function(res){
                        //console.log("====>>301:\t");
                        var bufferHelper = new BufferHelper();
                        res.on('data', function (chunk) {
                            bufferHelper.concat(chunk);
                        });
                        res.on('end',function(){
                            var comment = iconv.decode(bufferHelper.toBuffer(),'GBK');
                            //console.log("====>>302:\t", comment, comment.length);
                            if (comment.length < 200) return cb(null, stock);
                            analyseAndSaveData(stock._id, comment, function (err, rslt) {
                                //console.log("====>>303:\t", err, rslt);
                                return cb(null, count)
                            })
                        });
                    });
                },function (err, n) {
                    //console.log("=====>>3001:\t");
                    callback(null, n)
                }
            )
        }
    ], function (err, result) {
        // result now equals 'done'
        //console.log("=====>>3009:\t");
        return callfunc(null)
    });
}

function analyseAndSaveCode(code, exchange, data, callback) {
    var elems = [];
    if (data.length > 100 && data.indexOf("=") != -1) {
        elems = data.slice(data.indexOf("=\"")+2).split(",");
    }
    if (elems.length < 30) {
        return callback(null, null)
    } else {
        mongo.db(function (error, connect) {
            connect.collection("code").update({_id: code}, {name: elems[0], exc: exchange}, {upsert: true, safe:false}, callback);
        });
    }
}

function analyseAndSaveData(code, data, callback) {
    var elems = [];
    //console.log("======>>3010:\t", data.length, data.indexOf("="));
    if (data.length > 100 && data.indexOf("=") != -1) {
        elems = data.slice(data.indexOf("=\"")+2).split(",");
    }
    if (elems.length < 30) {
        //console.log("======>>3012:\t");
        return callback(null, null)
    } else {
        //console.log("======>>3013:\t")
        mongo.db(function (error, connect) {
            //console.log("======>>3014:\t")
            connect.collection("courser").insertOne({gid: code, name: elems[0], todayStartPri: elems[1],
                yestodEndPri: elems[2],nowPri: elems[3], todayMax: elems[4], todayMin: elems[5],
                traNumber: elems[8], traAmount: elems[9], date: elems[30], time: elems[31]}, function (err, rslt) {
                connect.close();
                callback(err, rslt)
            });
        });
    }
}

function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

function GetUpdateTime(callback) {
    mongo.db(function (error, connect) {
        connect.collection("date").find({}).toArray(callback)
    });
}

CrawlerSH()

