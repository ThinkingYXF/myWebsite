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
$.judgeEngine = function(){
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}
