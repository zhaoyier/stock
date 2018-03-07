/**
 * Created by zhaojianwei on 2018/3/7.
 */
var mongoose = require('./mongo');
var tableConf = require("../config/server.json").table;
var Schema = mongoose.Schema;

var AmboSchema = new Schema({
    _id:        {type: Number},        //代码
    name:       {type: String},      //名称
    launch:     {type: String},   //日期
    status:     {type: Number,  default: 0},    //状态
    create:     {type: Date,    default: Date.now()},
    update:     {type: Date,    default: Date.now()}
}, {collection: tableConf.ambo.name});

module.exports = mongoose.model("Ambo", AmboSchema);