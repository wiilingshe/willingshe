/**
 * eqShow - v4.4.0 - 2015-07-30
 * 
 *
 * Copyright (c) 2015 
 * Licensed MIT <>
 */
function test(a,b,c,d,e,longpage){
	audioObj=a,pageContents=b;
	for(var f=0;f<c.length;f++){
		var g=c[f].num;
		$('<div class = "finger_background page_effect lock"></div>').prependTo($("#page"+g)).attr("id","finger_background"+g).attr("style","background-image: url("+c[f].finger.bgImage.path+");width:100%; height: 100%;"),
		$('<div class = "finger_div"></div>').prependTo($("#finger_background"+g)).attr("id","finger_div"+g),
		$('<img class = "finger_zw"/>').appendTo($("#finger_background"+g)).attr("id","finger_zw"+g).attr("src",c[f].finger.zwImage.path),
		$('<img class = "finger_line" src = "'+CLIENT_CDN+'view/images/finger_line.png">').appendTo($("#finger_background"+c[f].num)).attr("id","finger_line"+c[f].num),
		$('<p class = "finger_info" style="top: 30%;font-size:16px;"></p>').appendTo($("#finger_background"+g)).attr("id","finger_info"+g),
		!longpage && renderPage(eqShow,g,b),
		longpage && mobilecheck() && $("#finger_background"+g).attr("style","position: fixed;background-image: url("+c[f].finger.bgImage.path+");width:100%; height: 100%;"),
		unlock(g, longpage)
	}
}
function unlock(a, longpage){
	$("#finger_div"+a).on(tapstart,function(){$("#page"+a).find(".u-arrow-bottom").attr("style","display: none;"),
		//$("#page"+a).find(".edit_wrapper").css("display","none;"),
		$("#finger_line"+a).show(),$("#finger_info"+a).html("扫描中..."),
		$("#finger_line"+a).stop(!0,!1).animate({top:"50%",marginTop:"-87px"},1e3,function(){
			$("#finger_div"+a).unbind(),
			$("#finger_info"+a).hide().html("扫描成功").fadeIn(300,function(){
				$("#finger_line"+a).fadeOut(),
				$("#finger_zw"+a).fadeOut(),
				$("#finger_div"+a).fadeOut(),
				$("#finger_info"+a).fadeOut(200,function(){setTimeout(function(){
					$("#finger_background"+a).removeClass("lock").addClass("unlock")
				},500),
				$("#finger_background"+a).addClass("noFinger").fadeOut(500,function(){
					!longpage && $("#page"+a).empty();
					!longpage && renderPage(eqShow,a,pageContents);
					for(var b=0;b<pageContents[a-1].elements.length;b++)eqxCommon.bindTrigger($("#inside_"+pageContents[a-1].elements[b].id),
						pageContents[a-1].elements[b])}),
						$("#audio_btn").css("opacity",1), playVideo(audioObj)
					})
			})
		})
	})
}
var pageContents,andioObj,hastouch=mobilecheck() ?!0:!1,tapstart=hastouch?"touchstart":"mousedown",tapend=hastouch?"touchend":"mouseup";$(".finger_div").on(tapend,function(){});