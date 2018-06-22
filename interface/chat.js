// const host = "http://47.93.232.133:8080/";
const host = "http://localhost:8084/";

var base = require('../base');
var bodyParser = require('body-parser'),							//解析params
	urlencodedParser = bodyParser.urlencoded({ extended: false }),	//
	url = require('url');

var fs = require('fs');

var multer  = require('multer');
var upload = multer({dest: 'uploads/images'}).single('userIcon');
// var upload = multer({dest: '/tmp/images'}).single('userIcon');


function removeNullKey(obj){
	if(obj instanceof Array)
		obj = obj[0];
	for(var i in obj){
		if(obj[i] === null)
			delete obj[i];
	}
}

exports.handler = function(connection, app){
	//获取用户列表
	app.get('/chatList', function(req, res){
		connection.query(base.getUserInfo(req.session.user), function(err, user){
			if(err) throw err;
			if(user[0].friend_id){
				connection.query(base.getUsers(user[0].friend_id), function(err, users){
					removeNullKey(users[0]);
					if(err) throw err;
					res.status(200);
					res.json({
						success: true,
						data: users
					});
				});
			}else{
				res.status(200);
				res.json({
					success: true
				});
			}
		});
	});

	//上传/更改 头像
	app.post('/upload',upload, function(req, res){
		var file = req.file;
		console.log(req.file);
		fs.renameSync('./uploads/images/'+file.filename,'./uploads/images/'+file.originalname);
		var loginName = req.session.user;
		if(!loginName) throw 'session expired';

		res.status(200);
		res.end();

		// var url = host + file.destination + '/' + file.originalname;
		// connection.query(base.updateImgUrl(url, loginName), function(err){
		// 	if(err) throw err;
		// 	res.status(200);
		// 	res.end();
		// });
	});

	//搜索用户
	app.get('/searchUser', function(req, res){
		var name = url.parse(req.url, true).query.name;
		connection.query(base.getUserInfo(name), function(err, user){
			if(err) throw err;
			removeNullKey(user);
			res.status(200);
			var json = {
				success: true
			}
			if(user.length)
				json['data'] = user;
			res.json(json);
		});
	});

	//判断是否为好友
	app.get('/judgeFriend', function(req, res){
		var loginId = url.parse(req.url, true).query.loginId,
			targetId = url.parse(req.url, true).query.targetId;
		connection.query(base.getUserInfo(null, loginId), function(err, result){
			if(err) throw err;
			var friend_id = result[0].friend_id;
			if(!friend_id)
				toDo(false);
			else{
				friend_id = friend_id.split(',');
				if(friend_id.indexOf(targetId) == -1)
					toDo(false);
				else
					toDo(true);
			}
		})
		function toDo(bool){
			res.status(200);
			res.json({
				success: bool
			});
		}
	});

	//添加好友请求	friend_id
	app.post('/addUser', urlencodedParser, function(req, res){
		var targetId = req.body.targetId,
			loginId = req.body.loginId;
		add(loginId, targetId, function(targetId, loginId){
			connection.query(base.getUserInfo(null, loginId), function(err, user){
				if(err) throw err;
				var userId = user[0].id;
				var result = user[0].friend_id ? user[0].friend_id.split(',') : [];
				result.push(targetId);
				result = result.join(',');
				connection.query(base.addFriend(userId, result), function(err, user){
					if(err) throw err;
				});
			});
		});
		function add(loginId, targetId, callback){
			connection.query(base.getUserInfo(null, loginId), function(err, user){
				if(err) throw err;
				var userId = user[0].id;
				var result = user[0].friend_id ? user[0].friend_id.split(',') : [];
				if(result.indexOf(targetId) != -1){
					res.status(200);
					var json = {
						success: true,
						message: '已是好友关系'
					}
					res.json(json);
					return false;
				}else if(targetId == loginId){
					res.status(200);
					var json = {
						success: true,
						message: '不能添加自己为好友'
					}
					res.json(json);
					return false;
				}
				result.push(targetId);
				result = result.join(',');
				connection.query(base.addFriend(userId, result), function(err, user){
					if(err) throw err;
					res.status(200);
					var json = {
						success: true,
						message: '添加好友成功'
					}
					res.json(json);
					if(callback)
						callback(loginId, targetId);
				});
			});

		}
	});
}
