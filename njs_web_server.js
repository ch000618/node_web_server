var http = require('http'); // http
var fs = require('fs');     // file system
var url = require('url');   // url
var util = require('util'); // utility
var path = require("path"); // 路徑功能
var process = require('child_process'); // 子程序
//---
var bDebug=true;
var iPort=8124; //網頁的 Port
var sHost='1.aj.me'; //網頁的 Host
//真正的網頁資料夾
var sPath_root='web';
//網頁請求物件
var cls_webRequst =function(req, res){
	var errstr='';
  //首頁檔案的優先順序
  var aIndex=new Array(
     'index.htm'
    ,'index.html'
    ,'index.njs'
  );
  //---
  var _RET_STATUS=400;//回傳的狀態
  var _RET_HEAD={};   //回傳的Header
  var _RET_HTML='';   //回傳的HTML  
  var _URL ={};       //URL解析完的物件
  var _DEBUG =false;  //測試
  //---
  //回傳結果
  /*
    *寫Header
    *顯示html
    *結束
  */
  var web_ret = function (){
    res.writeHead(_RET_STATUS, _RET_HEAD);
    res.write(_RET_HTML);
    res.end();
  }
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
    web_ret();
  }
  //執行nodeJS程式
  /*
    sFileName=檔名
  */
  var exec = function(sFileName){
    var sCMD='node '+sFileName +' --url '+req.url;
    process.exec( sCMD ,fexec);
  }
  //抓取檔案內容-純內容
  /*
    *找不到就404
    *找到就200
    *debug模式就顯示
    ---
    如果要弄出 server script, 可以弄在這邊
  */
  var fget = function (err,data){
    _RET_HEAD={'Content-Type': 'text/html'};    
    if (err) {
      _RET_STATUS=404;
      errstr ='<head>';
      errstr+='<title>404 Not Found</title>';
      errstr+='</head>';
      errstr+='<body>';
      errstr+='<h1>404 Not Found</h1>'
      errstr+='</body>';
      _RET_HTML=errstr;
    }else{
      _RET_STATUS=200;
      _RET_HTML=data.toString();
      if(_DEBUG ==true){
        _RET_HTML+='<pre>';
        // _RET_HTML+=util.inspect(_URL);
        _RET_HTML+='</pre>';      
      }
    }
    web_ret();
  }
  //檢查是否為首頁
  /*
    *首頁就要找替代檔案
    *都沒有就直接404了
  */
  var chk_index = function(){
    var res = (_URL.pathname).substr(-1);
    if(res != '/'){return;}
    var i=0;
    var iC=aIndex.length;
    var sFile='';
    var bExist=false;
    for(i=0;i<iC;i++){
      sFile=aIndex[i];
			//測試 路徑都要加./ 不然都會找不到檔案
      sFile_New=_URL.pathname+sFile;
      try{
				// 目前在vm上 測試只能用出這個 因該是版本問題
				//fs.statSync(sFile_New);
				// 但是vm上不能用這個 不知道會什麼 vm上的版本是這個v0.10.48
				/* 灌成 0.12.18 就可以使用了 */
        fs.accessSync(sFile_New,fs.F_OK);
        _URL.pathname=sFile_New;
        bExist=true;
        break;
      }catch(e){
				// 列出 哪個檔案找不到 就是不用顯示的格式
				console.log(" 目前首頁不是 "+sFile_New);
        continue;
      }
    }
    if(!bExist){_RET_STATUS=404;}
  }
  //抓出傳遞過來的資訊
  /*
    req, res
    回傳(物件):{
      protocol: 
      slashes: 
      auth: 
      host: 
      port: 
      hostname: 
      hash: 
      search: 檔案後面的東西
      query: Query 物件
      pathname: 路徑,只到檔名為止
      path: 網址後面開始的路徑,
      href: 同上 
    }
  */
  var parse_url = function (req, res){
    _URL=url.parse((req.url), true);
		console.log(_URL.pathname);
    _URL.pathname=sPath_root+_URL.pathname;
    if(_URL.query._debug == 1){
      _DEBUG=true;
    }
    // console.log(_URL);
  }
  //啟動器
  /*
    *分析 URL
    *判斷是否抓首頁
    *顯示檔案
  */
  function init(){
    // _DEBUG=bDebug;
    parse_url(req, res);
    chk_index();
    var sFileName = _URL.pathname;
    var sPathFile=sFileName;
    var sExtension = (path.extname(_URL.pathname)).toLowerCase();
    if(sExtension != '.njs'){
      //終端機顯示檔名
      console.log("Request for " + sPathFile + " received.");
      fs.readFile(sPathFile,fget);
    }else{
      //終端機顯示檔名
      // console.log(req);
      console.log("Request from " + sPathFile + " send.");
      exec(sPathFile);
    }
  }
  //---啟動---
  init();
}
//---
var web_server=http.createServer(cls_webRequst);
web_server.listen(iPort,sHost);
console.log('本機網站伺服器在 '+iPort+' 埠啟動了！');