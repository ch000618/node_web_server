const https = require('https');
const fs = require("fs");
const url = require("url");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const BufferHelper = require('bufferhelper');
const request = require("request");

init();
function init(){
	var timestamp = new Date().getTime();
	var _regUrl='https://www.1399p.com/gdkl10/KaiJiang?date=2017-09-06&_='+timestamp;
	var Referer='https://www.1399p.com/gdkl10/KaiJiang';
	var Host='https://www.1399p.com/';
	var options = url.parse(_regUrl);
	var buffer = new BufferHelper();
	//啟用cookie true / false
	var jar = request.jar();
	
	var get_request_data = function(error,res,body){
		var aResult=[];
		var oTitles = {};
		var $={};
		//buffer 轉html 並且轉換編碼
		var html_parse =function(){
			buffer.concat(body);
			var html = iconv.decode(buffer.toBuffer(),'utf8');
			$ = cheerio.load(html,
			{
				ignoreWhitespace: false,
				xmlMode: true
			});
		}
		var get_aResult=function(){
			oTitles = $("tr");
			var reg=/\r\n|\n|[^u3400-u9FFF]|U+00A0/g;
			for(var i=1;i<oTitles.length;i++) {
				str = $(oTitles[i]).text();
				str = str.replace(/&nbsp;/ig," ");
				text = str.replace(reg," ");
				aResult.push(text);
			}
		}
		function exec(){
			if(error || !body) { return ; }
			html_parse()
			get_aResult();
			console.log(aResult);
		}
		exec();
	}
	//爬蟲 設定 
	/*
		url:網址
		followRedirect: true, 啟動自動轉跳
		jar: jar, //啟用cookie 如果要自己塞 setCookies("key=val");
		method: 參數傳遞方式 POST GET
		encoding:編碼 預設UTF8
		//請求頭 User-Agent之類的
		headers:{
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
		}
	*/
	var opt={
		url:_regUrl,
		followRedirect: true,
		jar: jar,
		method: "GET",
		gzip: true,
		encoding: null,
		headers: { 
			Accept:'text/plain, */*; q=0.01'
			,'Accept-Encoding':'gzip, deflate, br'
			,'Accept-Language':'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4'
			,'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
			,'Connection':'keep-alive'
			,'Host':'www.1399p.com'
			,Referer:Referer
			,'X-Requested-With':'XMLHttpRequest'
		}
	};
	request(opt,get_request_data);
}

