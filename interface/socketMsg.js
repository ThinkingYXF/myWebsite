exports.handler = function(server){
	//socket.io
	let io = require('socket.io').listen(server);
	io.on('connection',function(socket){
		socket.on('login',function(param){
			console.log(param);
		})
	});
}
