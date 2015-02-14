// JavaScript Document
	
$(function(){
	//下拉菜单
	$(".menu").click(function(){
		$(".page1").addClass("hide");
		$(".page2").removeClass("hide");
		$(".page3").addClass("hide");
		$(".page4").addClass("hide");
		$(".footer").addClass("hide");
		});
	$(".home").click(function(){
		$(".page1").removeClass("hide");
		$(".page2").addClass("hide");
		$(".page3").addClass("hide");
		$(".page4").addClass("hide");
		$(".footer").removeClass("hide");
		});
		
	$(".other").click(function(){
		$(".page1").addClass("hide");
		$(".page2").addClass("hide");
		$(".page3").removeClass("hide");
		$(".page4").addClass("hide");
		$(".footer").addClass("hide");
		});
	$(".routine").click(function(){
		$(".page1").addClass("hide");
		$(".page2").addClass("hide");
		$(".page3").addClass("hide");
		$(".page4").removeClass("hide");
		$(".footer").addClass("hide");
		
		});
	//二级菜单
	$(".sub_menu li").click(function(){
		$(this).children(".sub_menu_list").slideToggle();
		$(this).children("h2").toggleClass("cur");
	}); 
	//显示（关闭）二维码等店铺信息
	$(".code").click(function(){
		$(".shop_info").show().animate({left:0});
		})
	$(".shop_info .back").click(function(){
		$(".shop_info").animate({left:"100%"});
		})
	//加入收藏
	$(".fav").click(function(){
		$(".fav_msg").fadeIn(1000).delay(3000).fadeOut(1000);
		})
	})



<!--------取屏幕宽高--------------------->

	$(function(){
		public_search();
	});	
	
	$(window).resize(function(){
		public_search();
	});
	function public_search(){
		// var zw = $('.search_btn').css('width');
		// zw = zw.substring(0,zw.length-2);
		
		// var w = document.documentElement.clientWidth-zw;
		
		// $('.search_text').css({'width':w+'px'});
		// var h = document.body.clientHeight-40;
		// $('.sub_menu').css({'height':h});
	}
//返回顶部	
$(function(){
	$('.top').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});
	})
	