// const host = "47.93.232.133:8080/";
const host = "localhost:8084/";

var base = require('../base');
var bodyParser = require('body-parser'),							//解析params
	urlencodedParser = bodyParser.urlencoded({ extended: false });	//

var fs = require('fs');

var multer  = require('multer');
var upload = multer({dest: 'uploads/images'}).single('userIcon');
// var upload = multer({dest: '/tmp/images'}).single('userIcon');
exports.handler = function(connection, app){
	//获取登录者信息
	app.get('/userInfo', function(req, res){
		var userName = req.session.user;
		if(!userName) throw 'session expired';
		connection.query(base.judgeUser(userName), function(err, userInfo){
			var obj = {
				success:true
			};
			if(userInfo.length)
				obj['userInfo'] = userInfo[0];
			if(err) throw err;
			res.status(200);
			res.json(obj);
		});
	})
	//获取用户列表
	app.get('/chatList', function(req, res){
		connection.query(base.getUsers(), function(err, users){
			if(err) throw err;
			res.status(200);
			res.json({
				success: true,
				data: users
			});
		});
	});

	//上传/更改 头像
	app.post('/upload',upload, function(req, res){
		var file = req.file;
		console.log(req.file);
		fs.renameSync('./uploads/images/'+file.filename,'./uploads/images/'+file.originalname);
		var userName = req.session.user;
		if(!userName) throw 'session expired';

		var url = host + file.destination + '/' + file.originalname;
		connection.query(base.updateImgUrl(url, userName), function(err){
			if(err) throw err;
			res.status(200);
			res.end();
		});
	});
}
