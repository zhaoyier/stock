/**
 * Created by zhaojianwei on 2018/3/7.
 */
const handler = module.exports;

handler.Index = function (req, res) {
    console.log("======>>>00003:");
    res.render('index', {})
};

handler.T1 = function (req, res) {
    console.log("======>>>00003: t1");
    res.render('t1', {})
};