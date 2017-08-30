//測試 另外執行 nodeJS 程式
const url = require('url');   // url
// const util = require('util'); // utility
// const path = require("path"); // 路徑功能
const query = require("querystring"); // GET 與 POST
const minimist = require('minimist');
console.log('<head><meta charset="utf-8"/></head>');
console.log('<pre>');
console.log('你執行了另外一支 node.JS程式');
var argv=minimist(process.argv.slice(2));
_URL=url.parse((argv.url), true);
console.log(_URL);
console.log('</pre>');