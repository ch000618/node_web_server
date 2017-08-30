//測試 另外執行 nodeJS 程式
const url = require('url');   // url
const query = require("querystring"); // GET 與 POST
const minimist = require('minimist');
const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
console.log('<head><meta charset="utf-8"/></head>');
console.log('<pre>');
//console.log('你執行了另外一支 node.JS程式');
var argv=minimist(process.argv.slice(2));
_URL=url.parse((argv.url), true);
/*console.log(_URL);
console.log('</pre>');
*/
var headers = {  
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
var opt={
  url: "https://forum.gamer.com.tw/B.php?bsn=60076",
  method: "GET",
	encoding: null,
	headers: headers
};
request(opt, function(error,response,body) {
		if(error || !body) { return; }
		//var dataBuffer = new BufferHelper();
		var html = iconv.decode(body,'utf-8')
		//var html = body;
		var $ = cheerio.load(html,{decodeEntities: false});
		var result = [];
		var titles = $(".b-list-wrap .b-list tr");
		for(var i=0;i<titles.length;i++) {
			str =$(titles[i]).text();
			text=str.replace(/\r\n|\n/g," ");
			result.push(text);
		}
		console.log(result);
		console.log('</pre>')
});