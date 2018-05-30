var base = require('../base');
var bodyParser = require('body-parser'),							//解析params
	urlencodedParser = bodyParser.urlencoded({ extended: false });	//

var multer  = require('multer');
// var upload = multer({dest: 'uploads/images'}).single('userIcon');
var upload = multer({dest: '/tmp/images'}).single('userIcon');
exports.handler = function(connection, app){
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
		console.log(req.file);
		var userName = req.session.user;
		if(!userName) throw 'session expired';
		res.render('websocket');
		res.end();


		// connection.query(base.updateImgUrl(req.body.imgUrl, userName), function(err){
		// 	if(err) throw err;
		// 	res.status(200);
		// 	res.json({
		// 		success: true,
		// 		fileInfo: {
		// 			url: req.body.imgUrl
		// 		}
		// 	});
		// });
	});
}
