let http = require('http'),
	express = require('express'),
	app = express(),
	config = require('config');

app.use('/', express.static(__dirname)); //指定静态HTML文件的位置
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(8084);

io.on('connection',function(socket){
	console.log('server connect success');
	socket.on('login',function(param){

	});
});
