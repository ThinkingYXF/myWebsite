$(document).ready(function () {
	//注册
	$('#register').submit(function () {
		var name = $.trim($('.registerUserName').val());
		var password = $.trim($('.registerPassword').val());
		var surePassword = $.trim($('.registerSurePassword').val());
		var phone = $.trim($('.registerPhone').val());
		var email = $.trim($('.registerEmail').val());
		if(name == ''){
			$.alert('姓名不能为空');
			return false;
		}
		if(password == ''){
			$.alert('密码不能为空');
			return false;
		}
		if(surePassword == ''){
			$.alert('密码不能为空');
			return false;
		}
		if (surePassword != password) {
			$.alert('两次输入密码不一致')
			return false;
		}
		var params = {
			name: name,
			password: password,
			phone: phone ? phone : null,
			email: email ? email : null
		}
		$.ajax({
			url: '/register',
			type: 'POST',
			data: params
		}).success(function (json) {
			if (!json.message)
				$.alert('注册成功');
			else {
				$.alert(json.message);
				return false;
			}
			$('.registerDiv input').val('');
			$('.registerDiv').hide();
			$('.loginDiv').show();
		});
		return false;
	});
	//切换
	$('.loginLink').click(function(){
		$('.registerDiv').hide();
		$('.loginDiv').show().find('input').val('');
	});
	$('.registerLink').click(function(){
		$('.loginDiv').hide();
		$('.registerDiv').show().find('input').val('');
	});
	//登录
	$('#login').submit(function(){
		var name = $.trim($('.loginUserName').val());
		var password = $.trim($('.loginPassword').val());
		if(name == ''){
			$.alert('请输入姓名');
			return false;
		}
		if(password == ''){
		   $.alert('请输入密码');
			return false;
		}
		$.ajax({
			url: '/login',
			method: 'POST',
			data: {
				name: name,
				password: password
			}
		}).success(function(json){
			if (!json.message){
				location.href = '/home';
			}
			else {
				$.alert(json.message);
				return false;
			}
			$('.loginDiv input').val('');
		});
		return false;
	});
});
