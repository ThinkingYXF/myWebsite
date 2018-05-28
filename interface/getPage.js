exports.handler = function(app){
	//登录模块
	app.get('/',function(req, res){
		res.render('login');
	});
	//首页
	app.get('/home',function(req, res){
		if(!req.session.user){
			res.redirect('/');
			return false;
		}
		res.render('index');
	});
	//demo
	app.get('/demo',function(req, res){
		res.render('demo');
	});
}
