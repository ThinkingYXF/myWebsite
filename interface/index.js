let base = require('../base'),										//引入base
	bodyParser = require('body-parser'),							//解析params
	urlencodedParser = bodyParser.urlencoded({ extended: false });	//
function returnResult(message){
	if(message)
		return {success: false, message: message};
	else
		return {success: true}
}

function removeNullKey(obj){
	for(var i in obj){
		if(obj[i] === null)
			delete obj[i];
	}
}
exports.handler = function(connection, app){
	//获取登录者信息
	app.get('/userInfo', function(req, res){
		var userName = req.session.user;
		if(!userName) throw 'session expired';
		connection.query(base.getUserInfo(userName), function(err, userInfo){
			removeNullKey(userInfo[0]);
			var obj = {
				success:true
			};
			if(userInfo.length)
				obj['userInfo'] = userInfo[0];
			if(err) throw err;
			res.status(200);
			res.json(obj);
		});
	});
	//编辑资料
	app.post('/editInfo', urlencodedParser, function(req, res){
		if(!req.session.user){
			res.redirect('/');
			return false;
		}else{
			var userName = req.session.user;
			// console.log(req.body, userName);
			connection.query(base.editInfo(req.body, userName),function(err, result){
				if(err) throw err;
				console.log(result);
				res.status(200);
				res.json({
					success: true,
					message: '修改资料成功'
				});
			});
		}
	});
	
	
	//收到提交的建议
	app.post('/feedback', urlencodedParser, function(req, res){
		connection.query("insert into feedBack(name, content) values (?, ?)",[req.body.name, req.body.content],function(err){
			if(err) throw err;
			res.status(200);
			res.json({success: true, message: "反馈成功"});
		})	
	});
}
