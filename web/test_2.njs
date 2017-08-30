//測試 另外執行 nodeJS 程式
//const url = require('url'); // url
const query = require("querystring"); // GET 與 POST
const minimist = require('minimist');
const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
//var argv=minimist(process.argv.slice(2));
//_URL=url.parse((argv.url), true);
init_request_gamer();
function init_request_gamer(){
	console.log('<head><meta charset="utf-8"/></head>');
	console.log('你執行了論壇文章爬蟲 node.JS程式');
	var url ="https://forum.gamer.com.tw/";
	//抓取 網頁用的設定物件 以哈哈姆特 為例
	var gamer_opt={
		url: url+"B.php?bsn=60076",
		method: "GET",
		encoding: null,
		headers: { 
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
		}
	};
	//抓取 網頁資料物件 以哈哈姆特 為例
	var get_gamer_data = function(error,response,body) {
		var html='';
		var JSON_result={};
		var $={};
		var result = [];
		var titles = {};
		//把html 轉換為utf-8
		var decode_html =function(){
			html= iconv.decode(body,'utf-8')
		}
		//用 cheerio 讀取html 來實現jq 選擇器的功能
		var cheerio_load_html =function(){
			$ = cheerio.load(html,{decodeEntities: false});
		}
		//利用jq 選擇器 取出選擇元素的文字內容 存入陣列
		/*
			jq 選擇器 取出選擇元素的文字內容
			因為元素 內有可以能有數個內容 所以跑迴圈 把內容塞進陣列
		*/
		var get_data_obj =function(){
			titles = $(".b-list-wrap .b-list .b-list__row .b-list__main .b-list__main__title");
			//console.log('<pre>');
			for(var i=0;i<titles.length;i++) {
				str = $(titles[i]).text() + ' ' + url + titles[i]['attribs']['href'];
				text = str.replace(/\r\n|\n/g," ");
				result.push(text);
			}
		}
		//寫檔
		var wFile = function (err) {
			if (err){
					console.log(err);
			}else {
					console.log("檔案寫入成功 </br>");
			}
		}
		//讀檔
		var rFile = function (err,data) {
			if (err){
				console.log(err);
			}else {
				console.log(data.toString());
			}
		}
		//啟動器
		/*
			*把html 轉換為utf-8
			*用 cheerio 讀取html 來實現jq 選擇器的功能
			*利用jq 選擇器 取出選擇元素的文字內容 存入陣列
		*/
		function init(){
			if(error || !body) { return; }
			decode_html();
			cheerio_load_html();
			get_data_obj();
			JSON_result = JSON.stringify(result);
			fs.writeFile('test.txt', JSON_result, wFile);
			console.log('<pre>');
			fs.readFile('test.txt',rFile);
			console.log('</pre>');
		}
		init();
	}
	request(gamer_opt,get_gamer_data);
}
/*
function run(){
	console.log('<head><meta charset="utf-8"/></head>');
	console.log('你執行了論壇文章爬蟲 node.JS程式');
}
setInterval("run()",10000);
*/