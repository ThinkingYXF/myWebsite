// exports.handler = function(){
let http = require('http'),
    config = require('config'),
    express = require('express'),
    mysql = require('mysql'),
    app = express();
app.use('/', express.static(__dirname));

let server = http.createServer(app);
//socket.io
let io = require('socket.io').listen(server);
io.on('connection',function(socket){
    socket.on('login',function(param){

    })
});

//数据库连接
let dbconfig = config.get('dbconfig');
let connection = mysql.createConnection(dbconfig);
connection.connect();

server.listen(8084);

//登录模块
var loginModule = require('./interface/login.js');

//注入登录注册接口
loginModule.handler(connection, app);

