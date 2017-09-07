var https = require('https');
var fs = require("fs");
var url = require("url");
var cheerio = require("cheerio");
var iconv = require("iconv-lite");
var zlib  = require("zlib");
var timestamp = new Date().getTime();
var BufferHelper = require('bufferhelper');
var _regUrl='https://www.1399p.com/gdkl10/KaiJiang?date=2017-09-06&_='+timestamp;
var options = url.parse(_regUrl);
options.method='GET'
options.encoding=null;
options.headers ={ 
		 Accept:'text/plain, */*; q=0.01'
		,'Accept-Encoding':'gzip, deflate, br'
		,'Accept-Language':'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4'
		,'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
		,'Connection':'keep-alive'
		,'Host':'www.1399p.com'
		,Cookie :'ccsalt=d82a4991ba9dbdad8b2f23d2db2b2119;'
		,Referer:_regUrl
		,'X-Requested-With':'XMLHttpRequest'
};
var req = https.request(options,get_request_data);

function get_request_data(res) {
	var buffer = new BufferHelper();
	var get_page = function(body) {
		buffer.concat(body);
		var html = iconv.decode(buffer.toBuffer(),'utf8');
		$ = cheerio.load(html);
	}
	function init(){
		var gunzip = zlib.createGunzip(); 
		res.pipe(gunzip);
		gunzip.on('data',get_page);
	}
	init();
}
req.end();
req.on('error', function(e) {
  console.error(e);
});

