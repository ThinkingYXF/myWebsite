$(document).ready(function(){
	var height = window.innerHeight;
	$('.weui-tab > .weui-tab__bd').height(height-50);
	$('.chatContent').height(height-100);
})

var Socket = function(){
	this.socket = io.connect();
	this.enter = function(){
		this.socket.emit('login','enter success');
	},
	this.sendMsg = function(targetId,msg){
		this.socket.emit('sendMsg', targetId, msg);
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

//获取个人信息
$.get('/userInfo', function(json){
	if(json.success && json.userInfo){
		if(!json.userInfo.userIcon)
			json.userInfo.userIcon = '../resources/images/icon.jpeg';
		$('#uploaderFiles > li').css({
			backgroundImage: 'url( ' + json.userInfo.userIcon + ' )'
		});
		$('.previewIcon').css({
			backgroundImage: 'url( ' + json.userInfo.userIcon + ' )'
		});
		loginId = json.userInfo.id;
	}
});
let loginId = null;
//获取聊天列表
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

//添加好友
$('.addUser').click(function(){
	$('#addUser').popup();
	$('#addUser .weui-popup__modal .weui-cells').remove();
	$('#searchUserInput').val('');
})
//返回
$('#addUser .return').click(function(){
	$.closePopup();
});
$('.weui-search-bar__form').submit(function(){
	return false;
})
//搜索好友
$('#searchUserInput').on('keyup', function(keycode){
	var value = $.trim($(this).val());
	if(keycode.keyCode == 13){
		$.ajax({
			url: '/searchUser',
			method: 'GET',
			data: {
				name: value
			}
		}).success(function(json){
			if(json.data){
				var icon = json.data[0].userIcon ? json.data[0].userIcon : '../resources/images/icon.jpeg',
						name = json.data[0].name,
						targetId = json.data[0].id;
				$.get('/judgeFriend',{loginId: loginId, targetId: targetId}, function(result){
					$.ajax({
						url: '../../modal/searchUser.html',
						method: 'GET',
						cache: true,
						dataType: 'html'
					}).success(function(templateHtml){
						var html = Mustache.render(templateHtml, {
							icon: icon,
							name: name,
							isFriend: result.success
						});
						$('#addUser .weui-popup__modal .weui-cells').remove();
						$('#addUser .weui-popup__modal').append(html);

						$('#searchUserInput').blur();
					});
				});
				$('#addUser').unbind().on('click', '.btn-addFriend', function(){
					var friend = $(this).parent().parent().find('.weui-cell__bd p').text();
					$.confirm('确认添加'+ friend +'为好友?', function(){
						$.ajax({
							url: '/addUser',
							method: 'POST',
							data: {
								loginId: loginId,
								targetId: targetId
							}
						}).success(function(json){
							if(json.success)
								$.alert(json.message);
						});
					});
				});
			}
		})
	}
});

$('#chatList').on('click', '.chatItem', function(){
	var userId = $(this).attr('userid');
	$('.chatContainer').attr('userId', userId).popup();
});

$('.chatReturn').on('click', function(){
	$.closePopup();
});
//发送消息
$('.btn-sendMsg').click(function(){
	var userId = $('.chatContainer').attr('userId');
	var myMsg = $.trim($(this).prev('input').val());
	if(myMsg === '')
		return false;
	var myChatClone = $('.rightMyChat').eq(0).clone();
	myChatClone.find('span').html(myMsg);
	$('.chatContent').append(myChatClone);
	$(this).prev('input').val('').focus();
	var scrollTop = $('.chatContent').height(),
		scrollHeight = $('.chatContent').scrollHeight();
	$('.chatContent').scrollTop(scrollHeight - scrollTop);
	socket.sendMsg(userId, myMsg);
});
$( window ).resize(function() {
	resetChatModule();
});

function resetChatModule(){
	$('.chatContent').height(window.innerHeight-110);
	var scrollTop = $('.chatContent').height(),
		scrollHeight = $('.chatContent').scrollHeight();
	$('.chatContent').scrollTop(scrollHeight - scrollTop);
}
