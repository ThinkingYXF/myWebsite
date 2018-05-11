$(document).ready(function(){
	$('.headerNav > li').mouseenter(function(){
		$(this).find('ul').show();
	});
	$('.headerNav > li').mouseleave(function(){
		$(this).find('ul').hide();
	});
});
