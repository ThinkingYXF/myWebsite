// exports.handler = function(){
let http = require('http'),
    config = require('config'),
    bodyParser = require('body-parser'),    //解析params
    express = require('express'),
    mysql = require('mysql'),
    crypto = require('crypto'),
    app = express();
app.use('/', express.static(__dirname));

//登录模块
var loginModule = require('./interface/login.js');

//加密
function cryptoPwd(password){
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}
let server = http.createServer(app);
let dbconfig = config.get('dbconfig');
let connection = mysql.createConnection(dbconfig);
connection.connect();

server.listen(8086);
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//注入登录注册接口
loginModule.handler(connection, app, urlencodedParser, cryptoPwd);

