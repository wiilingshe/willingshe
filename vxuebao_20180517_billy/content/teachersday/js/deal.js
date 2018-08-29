$(document).ready(function () {
	//rem布局
	
	//加载图片
	var loader = new resLoader({
	resources : [
			'images/001.jpg',
	        'images/002.png',
	        'images/003.png',
	        'images/10001.gif',
	        'images/10010.png',
	        'images/10011.png',
	        'images/10012.png',
	        'images/10013.png',
	        'images/10014.png',
	        'images/10015.png',
	        'images/10016.png',
	        'images/10017.gif',
	        'images/10026.png',
	        'images/10027.png',
	        'images/10033.png',
	        'images/10034.png',
	        'images/10035.png',
	        'images/10036.png',
	        'images/300.png',
	        'images/10037.gif',
	        'images/100461.png',
	        'images/10050.png',
	        'images/10051.png',
	        'images/100521.png',
	        'images/10058.jpg',
	        'images/10059.png',
	        'images/100601.png',
	        'images/10062.png',
	        'images/100641.png',
	        'images/10068.jpg',
	        'images/10081.png',
	        'images/10082.gif',
	        'images/10091.png',
	        'images/10092.png',
	        'images/10093.png',
	        'images/10094.gif',
	        'images/10102.png',
	        'images/10103.png',
	        'images/10104.png',
	        'images/10105.gif',
	        'images/10113.png',
	        'images/10114.png',
	        'images/10115.png',
	        'images/10116.png',
	        'images/10118.png',
	        'images/10119.png',
	        'images/101221.png',
	],
	 
	onStart :function(total) {
          },
	onProgress : function(current, total){
		console.log(current+'/'+total);
		var percent = parseInt(current/total*100);	
		var load_range = percent*0.73;
		$('.load_text').css('width', load_range+'%');
	},
	onComplete : function(total){
	  initgamecomplete();
      //判断横屏     
  }
	});
loader.start();
	//swiper
	var mySwiper = new Swiper('.swiper-container',{
			direction : 'vertical',
			speed:1000,
			
			observer:true,
			lazyLoading:true,
			lazyLoadingInPrevNext : true,
			lazyLoadingInPrevNextAmount : 3,
			onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
		    swiperAnimateCache(swiper); //隐藏动画元素 
		    	setTimeout(function(){
					swiperAnimate(swiper);
				},1000);//初始化完成开始动画
			},
			onSlideChangeEnd: function(swiper){ 
			  swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
			  
			},
			onTouchEnd: function (swiper) {                  
		        swiperAnimate(swiper);
		        
		  	}
		});

	//
	var youxiu = document.getElementById("youxiu");	
	function setAni(obj,type,duration,delay,cName){
		obj.addEventListener("webkitAnimationEnd",function(){	
			this.setAttribute("swiper-animate-effect",type);
			this.setAttribute("swiper-animate-duration",duration);
			this.setAttribute("swiper-animate-delay",delay);
			this.className = cName;
			swiperAnimate(mySwiper);
		},false);
	}
	setAni(youxiu,"pulses","2s","0.3s","full swiper-lazy ani");
	//
	//播放背景音乐
	$('#audio-btn').click(function () {
	    var audioEle = $("audio")[0];
	    if(audioEle.paused){
	        audioEle.play();// 播放
	        $("#soundctrl").css('opacity','1');
	        $('#soundctr').css('opacity','0');
	    }
	    else{
	        audioEle.pause();// 暂停
	        $("#soundctrl").css('opacity','0');
	        $('#soundctr').css('opacity','1');
	    }
	});
	var firstTouch = true;
	$('body').bind("touchstart",function(e){
	    if ( firstTouch ) {
	        firstTouch = false;
	        document.getElementById('media').play();
	    }else{
	        return;
	    }
	});
	
//	var youxiu = document.getElementById('youxiu');
//	youxiu.addEventListener("webkitAnimationEnd",function(){
//		$('#youxiu').addClass('youxiu');
//	},false)
	
//	function audioAutoPlay(id){
//	    var audio = document.getElementById(id),
//	        play = function(){
//	            audio.play();
//	            document.removeEventListener("touchstart",play, false);
//	        };
//	    audio.play();
//	    document.addEventListener("WeixinJSBridgeReady", function () {//微信
//	        play();
//	    }, false);
//	    document.addEventListener('YixinJSBridgeReady', function() {//易信
//	        play();
//	    }, false);
//	    document.addEventListener("touchstart",play, false);
//	}
//	

//加载微信
var myurl=location.href.split('#')[0];
var mydir=myurl.substring(0,myurl.lastIndexOf("/",myurl.substring(0,myurl.indexOf(".html")).length)+1);
var isgameok=false;
var iskeyok=(mydir.indexOf("vxuebao.com")>=0)?false:true;
function initgamecomplete(){
	if(!isgameok){
		isgameok=true;
		checkgamekeycomplete();
	}
}
function initkeycomplete(){
	if(!iskeyok){
		iskeyok=true;
		checkgamekeycomplete();
	}
}
function checkgamekeycomplete(){
	//alert(isgameok+":::"+iskeyok);
	if(isgameok && iskeyok){
		 var loader    = document.getElementById('loading');
		document.body.removeChild(loader);
	}
}
$.get("/index.php?c=view&a=huawei&url="+encodeURIComponent(myurl), function(ddd){
	loadjsoncomplete(ddd);
});
function loadjsoncomplete(myJsonObject){
	if(myJsonObject && myJsonObject.appId){
		
	}else{
		myJsonObject=escapemystr(myJsonObject);
		myJsonObject=eval('('+myJsonObject+')');
	}
	////////////////////////////////////////
	if(!isWeiXin()){
		initkeycomplete();
	}
	wx.config({
		debug: false,
		appId: myJsonObject.appId,
		timestamp: myJsonObject.timestamp,
		nonceStr: myJsonObject.nonceStr,
		signature: myJsonObject.signature,
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone'
		]
	});

	wx.ready(function () {
		var shareData64 = {
			title: '教师最光荣！',
			desc: '2016年华为大学兼职讲师趣味报告',
			link: myJsonObject.url,
			imgUrl:  mydir+'images/wx_pic.jpg'
		};
		wx.onMenuShareAppMessage(shareData64);
		wx.onMenuShareTimeline(shareData64);
		wx.onMenuShareQQ(shareData64);
		wx.onMenuShareWeibo(shareData64);
		wx.onMenuShareQZone(shareData64);
		initkeycomplete();

	});	  
	wx.error(function (res) {
		//alert(res.errMsg);
	});
	///////////////////////////////////////fun
	function escapemystr(estr) {
		//%5C%22
		estr = escape(estr);
		estr = shieldFixStr(estr, "%5C%22", "%22");
		estr = unescape(estr);
		estr = estr.substring(estr.indexOf("{"), estr.lastIndexOf("}")+1);
		return estr;
	}
	function shieldFixStr(contentStr, searchStr, replaceStr) {
		while (contentStr.indexOf(searchStr) != -1) {
			contentStr = shieldStr(contentStr, searchStr, replaceStr);
		}
		return contentStr;
		function shieldStr(contentStr, searchStr, replaceStr) {
			var tmpIdx = contentStr.indexOf(searchStr);
			if (tmpIdx != -1) {
				contentStr = contentStr.substring(0, tmpIdx)+replaceStr+contentStr.substring(tmpIdx+searchStr.length, contentStr.length);
			}
			return contentStr;
		}
	}
	function isWeiXin(){//是否是微信
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
	}
	///////////////////////////////////////funend
}


////////////////////////////加载微信 end

});