let http = require('http'),
	fs = require('fs'),
	globalUrl = '/home/yangxuefeng/Documents/work/myWebsite/myWebsite';

var server = http.createServer((req,res)=>{
	res.setHeader("Access-Control-Allow-Origin" , "*");
	let url = req.url;
	{
		var index = url.indexOf('?');
		if(index != -1)
			url = url.slice(0, index);
	}
	var file = globalUrl + url;
	fs.readFile(file, function(err, data){
		var fileTypes = {
			'.html': 'text/html;charset="utf-8"',
			'.css': 'text/css',
			'.less': 'text/css',
			'.js': 'application/javascript',
			'.json': 'application/json',
			'.txt': 'text/plain',
		};
		var fileType = 'text/html';
		for(var i in fileTypes){
			if(file.indexOf(i)!==-1){
				fileType = fileTypes[i];
			}
		}
		if(err){
			res.writeHeader(404,{
				'content-type': fileType
			});
			res.write('<h1>404 error,<p>Can\'t find your page!</p></h1>');
			res.end();
		}else{
			res.writeHeader(200,{
				'content-type': fileType
			});
			res.write(data);
			res.end();
		}
	});
}).listen(8084);
