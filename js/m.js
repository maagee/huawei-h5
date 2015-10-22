function stopPropagation(e){
	var e=event?event:window.event;
	if(e.stopPropagation){
		e.stopPropagation();
	}
	else{
		e.cancelBubble=true;
	}
};

$(document).ready(function(){
	var handle = null,winHeight = $(window).height();
	function update() {
		clearInterval(handle);
		handle = setTimeout(function(){
			$('.loading').animate({'margin-top':-winHeight},1000);
			$('.swiper-container').css({'position':'relative'});
			$('.page-0').addClass('run');
		},100)
	};
	//初始化加载向上滑动
	$(".page-loading").click(function(){
		$('.fish').fadeOut(1000);
		setTimeout(function(){
			mySwiper.swipeTo(1);
			$('.swiper-slide').eq(1).addClass('run');
			$(".down_arrow").show();
		},1000)
	});
	/*设置容器高度*/
	$('.swiper-container,.swiper-slide').css('height',function(){
		return winHeight;
	});	
	//上下拖拽插件属性设置
    var mySwiper = new Swiper('.swiper-container',{
		paginationClickable: true,
		speed:600,
		mode: 'vertical',
		resistance: '100%',
		onTouchEnd: function(mySwiper,e){
			mySwiper.activeIndex == 0 ? (stopPropagation(e),$(".down_arrow").hide(),$('.fish').show()): (mySwiper.activeIndex == 4 ? $(".down_arrow").hide() : $(".down_arrow").show());
			$('.swiper-slide').eq(mySwiper.activeIndex).addClass('run').siblings().removeClass('run');
		}
	});
	//点击站点
	$('.pos_jd >a').each(function(){
		$(this).bind("mousedown",function(){
			var _index = $(this).index();
			var swipeChild = $("#swiperSlideWrap").children();
			swipeChild.eq(_index).fadeIn(200).addClass('swiper-hover').siblings().fadeOut(200).removeClass("swiper-hover");
			setTimeout(function(){$(".down_arrow").hide();},10)
			setTimeout(function(){swipeChild.eq(_index).find(".mask-box").show();},2000);
		});
	});
	//返回站点
	$(".mask-box").bind("mousedown",function(){
		mySwiper.swipeTo(2);
		$(this).hide();
		$(".down_arrow").show();
		$(this).parent().hide().removeClass("swiper-hover");
	});
	$(window).load(function(){
		$(".host_tit").animate({opacity:1,"top":"35px"},1000);
	})
});

