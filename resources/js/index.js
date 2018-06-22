$(document).ready(function(){
	$('.headerNav > li').mouseenter(function(){
		$(this).find('ul').show();
	});
	$('.headerNav > li').mouseleave(function(){
		$(this).find('ul').hide();
	});
	$('.myHobby img').click(function(){
		var className = $(this).prop('class');
		$.modal(className,{},function(modal){
			console.log('modal');
		});
	});
	$('.logout').click(function(){
		$.post('/logout',function(json){
			location.reload();
		});
	});
	//查看/修改个人资料
	$('div.icon').click(function(){
		$.get('/userInfo', function(json){
			$.modal('userInfo', json.userInfo, function(modal){
				$('.btn-sure', modal).click(function(){
					var phone = $.trim($('.phone', modal).val()),
						email = $.trim($('.email', modal).val());

					var data = {
						phone: phone,
						email: email
					}
					$.ajax({
						url: '/editInfo',
						method: 'POST',
						data: data
					}).success(function(json){
						if(json.success)
							alert(json.message);
					});
				});
			});
		});
	});
});
