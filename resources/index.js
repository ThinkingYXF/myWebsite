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


	var Socket = function(){
		this.socket = io.connect();
		this.msg = function(){
			this.socket.emit('login','hello');
		}
	}
	var socket = new Socket();
	socket.socket.on('connect',function(){
		socket.msg();
	});
});
