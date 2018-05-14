$(document).ready(function(){
	$('.headerNav > li').mouseenter(function(){
		$(this).find('ul').show();
	});
	$('.headerNav > li').mouseleave(function(){
		$(this).find('ul').hide();
	});
	var bannerIndex = 0;
	{
		setInterval(function(){
			bannerIndex++;
			if(bannerIndex > 2)
				bannerIndex = 0;
			$('.bannerNav li').removeClass('native');
			$('.bannerNav li').eq(bannerIndex).addClass('native');
			$('.banner img').removeClass('native');
			$('.banner img').eq(bannerIndex).addClass('native');
		},5000);
	}
	$('.bannerNav li').click(function(){
		$('.bannerNav li').removeClass('native');
		$(this).addClass('native');
		var index = $(this).index();
		bannerIndex = index;
		$('.banner img').removeClass('native');
		$('.banner img').eq(index).addClass('native');
	});

	$('.myHobby img').click(function(){
		var className = $(this).prop('class');
		$.modal(className,{},function(modal){
			console.log('modal');
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
		console.log('client connect success');
		socket.msg();
	});
});
