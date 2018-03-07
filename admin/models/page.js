/**
 * Created by zhaojianwei on 2018/3/7.
 */
var async = require("async");

var page = function (num, size, model, populate, condition, sort, callback) {
    size = !!size? +size: 20;
    var start = (+num - 1)>=0?(+num - 1) * size:0;
    var $page = {
        num: +num,
        size: size
    };
    async.parallel({
        count: function (done) {  // 查询数量
            model.count(condition).exec(function (err, count) {
                done(err, count);
            });
        },
        records: function (done) {   // 查询一页的记录
            model.find(condition).lean().skip(+start).limit(size).populate(populate).sort(sort).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        let count = results.count;
        $page.total = count;
        $page.count = parseInt((count - 1) / size) + 1;
        $page.records = !!results.records?results.records.length:0;
        $page.rows = results.records;
        callback(err, $page);
    });
};

module.exports = page;