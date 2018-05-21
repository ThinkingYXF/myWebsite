// exports.handler = function(){
process.env.NODE_ENV = "home";

let http = require('http'),
    config = require('config'),
    bodyParser = require('body-parser'),
    express = require('express'),
    mysql = require('mysql'),
    app = express();
app.use('/', express.static(__dirname));
var server = http.createServer(app);
var dbconfig = config.get('dbconfig');
var connection = mysql.createConnection(dbconfig);
console.log(dbconfig);
connection.connect(function(err){
    console.log('mysql connect success');
});
connection.query('select user from user;',function(err, results){
    console.log(err,results);
});
connection.end();
server.listen(8086);
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.get('/userList', function(req, res){
//     connection.query('select * from ;',function(err, results){
       
//     });
//     res.status(200),
//     res.json(json);
// });
// app.post('/send', urlencodedParser, function(req, res){
//     console.log(req.body);
//     res.status(200);
//     res.json({
//         success: true,
//         data: req.body
//     });
// })

// }