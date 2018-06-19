var Socket = function(){
	this.socket = io.connect();
	this.enter = function(){
		this.socket.emit('login','enter success');
	}
}
var socket = new Socket();
socket.socket.on('connect',function(){
	socket.enter();
});

//搜索筛选
$('#searchInput').on('input', function(){
	var key = $.trim($(this).val());
	if(key)
		$('.weui-media-box').hide();
	$('.weui-media-box').each(function(){
		if($(this).find('h4').text().indexOf(key)!=-1){
			$(this).show();
		}
	});
});
$('#searchClear, #searchCancel').click(function(){
	$('.weui-media-box').show();
});

$.get('/userInfo', function(json){
	if(json.success && json.userInfo){
		if(!json.userInfo.imgUrl)
			json.userInfo.imgUrl = '../resources/images/icon.jpeg';
		$('#uploaderFiles > li').css({
			backgroundImage: 'url( ' + json.userInfo.imgUrl + ' )'
		});
		$('.previewIcon').css({
			backgroundImage: 'url( ' + json.userInfo.imgUrl + ' )'
		});
	}
});
$.get('/chatList', function(json){
	if(json.success){
		$.each(json.data,function(){
			if(!this.imgUrl){
				this.imgUrl = '../resources/images/icon.jpeg';
			}
		});
		$.getDomModule('chatList' ,function(templateHtml){
			var html = Mustache.render(templateHtml, json);
			$('.myChatList').html(html);
		});

		$.getDomModule('friendList' ,function(templateHtml){
			var html = Mustache.render(templateHtml, json);
			$('#userList > div').append(html);
		});
	}
});
//头像上传
$('#uploaderInput').on('change', function(e){
	var file = e.target.files[0];
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(event){
		$('#headerUpload').submit();
		var base64 = event.target.result;
		$('#uploaderFiles > li').css({
			backgroundImage: 'url( ' + base64 + ' )'
		});
	}
});
//头像预览
$('#uploaderFiles > li').click(function(){
	$('.weui-gallery').show();
});
$('.weui-gallery').click(function(){
	$(this).hide();
});
