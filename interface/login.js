let base = require('../base'),										//引入base
	crypto = require('crypto'),										//md5加密
	bodyParser = require('body-parser'),							//解析params
	urlencodedParser = bodyParser.urlencoded({ extended: false });	//
//md5加密
function cryptoPwd(password){
	var md5 = crypto.createHash('md5');
	return md5.update(password).digest('hex');
}
function returnResult(message){
	if(message)
		return {success: false, message: message};
	else
		return {success: true}
}
exports.handler = function(connection, app){
	//注册
	app.post('/register', urlencodedParser, function(req, res){
		req.body.password = cryptoPwd(req.body.password);
		connection.query(base.getUserInfo(req.body.name),function(err, userArr){
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
				}else{
					console.log('user:' + req.body.name + ' logined', new Date());
					//登录记录
					connection.query(base.loginInfo(userArr[0]),function(err, result){
					 	if(err) throw err;
					 });
					req.session.user = req.body.name;
					res.json(returnResult());
				}
			}else{
				res.json(returnResult('用户名不存在'));
			}
		});
	});
	//注销
	app.post('/logout',urlencodedParser, function(req, res){
		console.log('user:' + req.session.user + ' logouted', new Date());
		req.session.user = null;
		res.redirect('/');
	});
}
