/**
 * Created by zhaojianwei on 2018/3/7.
 */
var async = require("async");
var ObjectID = require('mongodb').ObjectID;

var pageSa = require("../models/page");
var amboSa = require("../models/ambo");

var handler = module.exports;


handler.AmboIndex = function (req, res) {
    res.render('ambo', {title: "ambo"})
};

handler.AmboPage = function (req, res) {
    console.log("=====>>>>002:");
    var body = req.body;
    pageSa(body.page||0, body.size||0, amboSa, '', {}, {}, function (err, doc) {
        console.log("=====>>>>003:", err, doc);
        return res.json({code: 200, ret: doc})
    })
};

handler.AmboEdit = function (req, res) {
    console.log("=====>>>3001:", req.body);
    if (!req.body || !req.body.act) {
        return res.json({code: 201, message: "请求参数错误"})
    } else {
        if (req.body.act === 'add') {
            addAmbo(req, res)
        } else if (req.body.act === 'edit') {
            editAmbo(req, res)
        } else if (req.body.act === 'del') {
            delAmbo(req, res)
        } else {
            return res.json({code: 201, message: "请求参数错误"})
        }
    }
};

//新增代码
function addAmbo(req, res) {
    console.log("=====>>>30011:", req.body);
    var body = req.body;
    if (!body._id || !body.name) {
        return res.json({code: 201, message: "请求参数错误"})
    }
    console.log("=====>>>30012:", req.body);
    async.waterfall([
        function (callback) {
            amboSa.findOne({_id: body._id}, function (err, doc) {
                console.log("=====>>>30013:", req.body);
                if (err || doc) {
                    return callback(null, false)
                } else{
                    return callback(null, true)
                }
            })
        },
        function (status, callback) {   //校验代码和名称是否正确和一致
            return callback(null, true)
        },
        function (status, callback) {
            if (!status || status === false) {
                return callback("该代码已存在")
            }

            var ambo = new amboSa({
                _id: parseInt(body._id),
                name: body.name,
                launch: body.launch||'',
                status: body.status,
            });
            ambo.save(callback)
        }
    ], function (err, doc) {
        if (err) {
            return res.json({code: 201, message: "新增代码失败"})
        } else {
            return res.json({code: 200, message: "新增代码成功"})
        }
    })
}

//编辑代码
function editAmbo(req, res) {
    console.log("=====>>>30011:", req.body);
    var body = req.body;
    if (!body._id || !body.name) {
        return res.json({code: 201, message: "请求参数错误"})
    }
    console.log("=====>>>30012:", req.body);
    async.waterfall([
        function (callback) {
            amboSa.findOne({_id: body._id}, function (err, doc) {
                console.log("=====>>>30013:", req.body);
                if (err || !doc) {
                    return callback(null, false)
                } else{
                    return callback(null, true)
                }
            })
        },
        function (status, callback) {
            if (!status || status === false) {
                return callback("该代码不存在")
            }

            var update = {$set: {
                name: body.name,
                launch: body.launch||'',
                status: body.status,
                update: Date.now()
            }};

            amboSa.update({_id: body._id}, update, callback)
        }
    ], function (err, doc) {
        if (err) {
            return res.json({code: 201, message: "编辑代码失败"})
        } else {
            return res.json({code: 200, message: "编辑代码成功"})
        }
    })



}
//删除代码
function delAmbo(req, res) {
    var body = req.body;
    console.log("======>>30031:", body);
    if (!body.id) {
        return res.json({code: 201, message: "请求参数错误"})
    }
    console.log("======>>30032:", body);
    amboSa.remove({_id: body.id}, function (err, doc) {
        console.log("======>>30022:", err, doc);
        if (err) {
            return res.json({code: 201, message: "删除代码失败"})
        } else {
            return res.json({code: 200, message: "删除代码成功"})
        }
    })
}