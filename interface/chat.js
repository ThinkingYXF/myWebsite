var base = require('../base');
exports.handler = function(connection, app){
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
}
