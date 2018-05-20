let http = require('http'),
    express = require('express'),
    app = express();
app.use('/', express.static(__dirname));
var server = http.createServer(app);
server.listen(8086);
app.get('/me', function(req, res){
    var json = {
        success: true,
        data: [{
            name: 'yxf',
            sex: 0
        },{
            name: 'zs',
            sex: 1
        }]
    }
    res.status(200),
    res.json(json);
});