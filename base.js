exports.getUsers = function (friend_id) {
	return 'select id,name,phone,email,userIcon,friend_id,createTime from user_user where id in(' + friend_id + ')';
}
//注册用户
exports.addUser = function(userInfo){
	var nowTime = parseInt(new Date().getTime()/1000);
	var key = 'name, password, createTime',
		value = "'" + userInfo.name + "','" + userInfo.password + "','" + nowTime + "'";
	if(userInfo.phone){
		key+= ',phone';
		value+= ",'" + userInfo.phone + "'";
	}
	if(userInfo.email){
		key+= ',email';
		value+= ",'" + userInfo.email + "'";
	}
	return "insert into user_user ("+ key +") values (" + value +");";
}
//登录记录
exports.loginInfo = function(userInfo){
	var time = parseInt(new Date().getTime()/1000);
	return "insert into user_login (user_name, user_id, login_time) values ('" + userInfo.name + "', '"+ userInfo.id +"','"+ time +"');";
}
//获取用户信息
exports.getUserInfo = function(name, id){
	if(!id)
		return "select id,name,phone,email,userIcon,friend_id,createTime from user_user  where name='"+ name +"'";
	else
		return "select id,name,phone,email,userIcon,friend_id,createTime from user_user  where id='"+ id +"'";
}
//登录判断
exports.judgeUser = function(name){
	return "select id,name,password from user_user  where name='"+ name +"'";
}
//更改头像
exports.updateImgUrl = function(url, name){
	return "update user_user set userIcon='"+ url +"' where name='" + name + "'";
}
//编辑资料
exports.editInfo = function(userInfo, name){
	return "update user_user set phone='"+ userInfo.phone +"', email='"+ userInfo.email +"' where name='"+ name +"'";
}
//添加好友
exports.addFriend = function(id, friend_id){
	return "update user_user set friend_id='"+ friend_id +"' where id='"+ id +"'";
}
