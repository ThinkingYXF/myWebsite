// exports.handler = function(){
let http = require('http'),
    config = require('config'),
    express = require('express'),
    mysql = require('mysql'),
    app = express();
app.use('/', express.static(__dirname));
//设置模板引擎
app.set('views', './www');                        //页面放在www文件夹下
app.set('view engine', 'html');                     //使用ejs引擎
app.engine( '.html', require( 'ejs' ).__express );

//session
let session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*30          //过期时间设置(单位毫秒) 30min
    }
}));

let server = http.createServer(app);

//数据库连接
let dbconfig = config.get('dbconfig');
let connection = mysql.createConnection(dbconfig);
connection.connect();

server.listen(8080);

//页面设置
var getPageModule = require('./interface/getPage');
getPageModule.handler(app);

//主页模块
var indexModule = require('./interface/index');
indexModule.handler(connection, app);

//登录模块
var loginModule = require('./interface/login');
loginModule.handler(connection, app);

//聊天模块
var chatModule = require('./interface/chat');
chatModule.handler(connection, app);

//消息处理模块
var getScoketodule = require('./interface/socketMsg');
getScoketodule.handler(server, connection);
