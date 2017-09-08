const https = require('https');
const fs = require("fs");
const url = require("url");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const BufferHelper = require('bufferhelper');
const zlib  = require("zlib");
const request = require("request");
init();
function init(){
	var timestamp = new Date().getTime();
	var _regUrl='https://www.1399p.com/gdkl10/KaiJiang?date=2017-09-06&_='+timestamp;
	var options = url.parse(_regUrl);
	var buffer = new BufferHelper();
	var opt={
		url:_regUrl,
		followRedirect: true,
		method: "GET",
		encoding: null,
		headers: { 
			Accept:'text/plain, */*; q=0.01'
			,'Accept-Encoding':'gzip, deflate, br'
			,'Accept-Language':'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4'
			,'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
			,'Connection':'keep-alive'
			,'Host':'www.1399p.com'
			,Cookie :'ccsalt=d82a4991ba9dbdad8b2f23d2db2b2119;'
			//,Referer:_regUrl
			,'X-Requested-With':'XMLHttpRequest'
		}
	};
	/*
	options.method='GET'
	options.encoding=null;
	options.headers ={ 
			/*Accept:'text/plain, *///*; q=0.01'
			//,'Accept-Encoding':'gzip, deflate, br'
			//,'Accept-Language':'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4'
			//,'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
			//,'Connection':'keep-alive'
			//,'Host':'www.1399p.com'
			//,Cookie :'ccsalt=d82a4991ba9dbdad8b2f23d2db2b2119;'
			//,Referer:_regUrl
			//,'X-Requested-With':'XMLHttpRequest'
	//};	
	/*
	var get_request_data = function(res) {
		res.on('data',function(body){
			buffer.concat(body);
			console.log('幹');
			var html = iconv.decode(buffer.toBuffer(),'utf8');
			$ = cheerio.load(html,
			{
				ignoreWhitespace: false,
				xmlMode: true
			});
			
		});
	}
	*/
	/*
	var req = https.request(options,get_request_data);
	req.end();
	req.on('error', function(e) {
		console.error(e);
	});
	*/
	var get_request_data = function(error,res,body){
		var result=[];
		zlib.gunzip(body,function(err,dezipped){
			buffer.concat(dezipped);
			var html = iconv.decode(buffer.toBuffer(),'utf8');
			//console.log(html);
			$ = cheerio.load(html,
			{
				ignoreWhitespace: false,
				xmlMode: true
			});
			titles = $("tr");
			for(var i=1;i<titles.length;i++) {
				str = $(titles[i]).text();
				text = str.replace(/\r\n|\n/g," ");
				result.push(text);
			}
			console.log('<head><meta charset="utf-8"/></head>');
			console.log(result);
		});
	}
	request(opt,get_request_data)
}

