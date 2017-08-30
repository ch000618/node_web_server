var http = require('http'); // http
var fs = require('fs');     // file system
var url = require('url');   // url
var util = require('util'); // utility
var path = require("path"); // 路徑功能
var process = require('child_process'); // 子程序
//---
var bDebug=true;
var sHost='1.aj.me'; //網頁的 Host
var sPath_root='web';
//真正的網頁資料夾
setInterval (init_test_2,10000);
//網頁請求物件
function init_test_2 (){
	var sFileName='test_2.njs';
	var _RET_STATUS=400;//回傳的狀態
  var _RET_HEAD={};   //回傳的Header
  var _RET_HTML='';   //回傳的HTML  
  var sPathFile=sPath_root + '/' + sFileName;
	exec(sPathFile,sFileName);
}
//執行nodeJS程式
/*
	sFileName=檔名
*/
function exec (sPathFile,sFileName){
	var sCMD='node '+sPathFile+' --url '+ '/' + sFileName;
	process.exec( sCMD ,fexec);
	console.log(sCMD);	
	//抓取執行結果
	/*
		*執行程式的結果寫到內部變數
		*執行輸出
		
	*/
	var fexec = function (error, stdout, stderr){
		_RET_STATUS=200;  
		_RET_HEAD={'Content-Type': 'text/html'};
		if (error) {
			errstr ='<head>';
			errstr+='<title>Script error</title>';
			errstr+='</head>';
			errstr+='<body>';
			errstr+='<pre>';
			errstr+=error.stack+"\n";
			errstr+=error.stack+"\n";
			errstr+='Error code: ' + error.code;
			errstr+='</pre>';
			errstr+='</body>';
			_RET_HTML=errstr;
		}else{
			_RET_HTML=stdout;
			if(_DEBUG == true){
				_RET_HTML+='<pre>';
				_RET_HTML+=util.inspect(_URL);
				_RET_HTML+='</pre>';      
			}
		}
	}
}