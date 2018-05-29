$.getDomModule = function(modal, callback){
	$.ajax({
		url: '../modal/' + modal + '.html',
		type: 'GET',
		cache: true,
		dataType: 'html'
	}).success(function(html){
		callback(html);
	}).fail(function(){
		callback('Get Template Err');
	});
}
