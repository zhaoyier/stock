/**
 * Created by zhaojianwei on 2018/3/7.
 */
var main = require("../handler/main");
var stock = require("../handler/stock");

module.exports = function (app) {
    app.get(['/', '/index'], main.Index);
    app.get('/t1', main.T1);

    app.get('/ambo', stock.AmboIndex);
    app.post('/ambo/page', stock.AmboPage);
    app.post('/ambo/edit', stock.AmboEdit);

};