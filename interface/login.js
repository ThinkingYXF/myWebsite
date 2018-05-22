var base = require('../base.js');

function returnResult(message){
	if(message)
		return {success: false, message: message};
	else
		return {success: true}
}
exports.handler = function(connection, app, urlencodedParser, cryptoPwd){
	//注册
	app.post('/register', urlencodedParser, function(req, res){
		req.body.password = cryptoPwd(req.body.password);
		connection.query(base.judgeUser(req.body.name),function(err, userArr){
			if(err) throw err;
			if(userArr.length == 0){
				connection.query(base.addUser(req.body),function(err, users){
					if(err) throw err;
					console.log('add an user success, name: ' + req.body.name);
				});
				res.status(200);
				res.json({
					success: true
				});
			}else{
				res.status(200);
				res.json(returnResult('用户名已存在'));
			}
		});
	});
	//登录
	app.post('/login', urlencodedParser, function(req, res){
		req.body.password = cryptoPwd(req.body.password);
		connection.query(base.judgeUser(req.body.name),function(err, userArr){
			if(err) throw err;
			res.status(200);
			if(userArr.length > 0){
				if(userArr[0].password != req.body.password){
					res.json(returnResult('用户名密码不匹配'));
				}else
					res.json(returnResult());
			}else{
				res.json(returnResult('用户名不存在'));
			}
		});
	});
}
