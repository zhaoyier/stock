var http = require('http');
var url = require('url').parse('http://www.biquge.com.tw/18_18128/8292897.html');
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');
 
http.get(url,function(res){
  var bufferHelper = new BufferHelper();
  res.on('data', function (chunk) {
    bufferHelper.concat(chunk);
  });
  res.on('end',function(){ 
    console.log(iconv.decode(bufferHelper.toBuffer(),'UTF-8'));
  });
});
