exports.getUsers = function (name) {
	return 'select name from user;';
}
exports.addUser = function(userInfo){
	return "insert into user (name, password, phone, email) values ('" + userInfo.name + "', '"+ userInfo.password +"', '"+ userInfo.phone +"', '"+ userInfo.email +"');";
}
exports.judgeUser = function(name){
	return "select * from user where name='"+ name +"'";
}
