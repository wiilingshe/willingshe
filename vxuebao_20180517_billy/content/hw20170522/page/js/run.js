// JavaScript Document
var scaleW=1;//宽度缩放比
var scaleH=1;//高度缩放比
var level="";//触摸层级
var stagewidth;//浏览器宽度
var stageheight;//浏览器高度
var oBody=document.getElementsByTagName('body');
for(var i=0;i<oBody.length;i++){
	oBody[i].index=i;
}
/*************************************************适应屏幕*******************************************************/
var sW,sH;
function matchWH(w,h)
{
	stagewidth=w;
	stageheight=h;
	var bw=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
	var bh=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
	var scalew=bw/w;
	var scaleh=bh/h;
	//scaleXY=Math.min(scalew,scaleh);
	scaleW=Math.min(scalew,scaleh);
	scaleH=Math.min(scalew,scaleh);
	oBody[0].style.transform="scale("+scaleW+","+scaleH+")";
	oBody[0].style.msTransform="scale("+scaleW+","+scaleH+")";/* IE 9 */
	oBody[0].style.MozTransform="scale("+scaleW+","+scaleH+")";/* Firefox */
	oBody[0].style.webkitTransform="scale("+scaleW+","+scaleH+")";/* Safari 和 Chrome */
	oBody[0].style.oTransform="scale("+scaleW+","+scaleH+")";/* Opera */
	oBody[0].style.left=(bw-scaleW*w)/2+"px";
	oBody[0].style.top=(bh-scaleH*h)/2+"px";
	sW=w;
	sH=h;
}

/*************************************************铺满屏幕*******************************************************/
function fullWH(w,h)
{
	stagewidth=w;
	stageheight=h;
	var bw=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
	var bh=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
	scaleW=bw/w;
	scaleH=bh/h;
	oBody[0].style.transform="scale("+scaleW+","+scaleH+")";
	oBody[0].style.msTransform="scale("+scaleW+","+scaleH+")";/* IE 9 */
	oBody[0].style.MozTransform="scale("+scaleW+","+scaleH+")";/* Firefox */
	oBody[0].style.webkitTransform="scale("+scaleW+","+scaleH+")";/* Safari 和 Chrome */
	oBody[0].style.oTransform="scale("+scaleW+","+scaleH+")";/* Opera */
	sW=w;
	sH=h;
}


function draglist(obj){
	var index,startPos,startH,startW,disX,disY;
	var topA=0;
	var leftA=0;
	var start = IsPC() ? "mousedown" : "touchstart";
	var move=IsPC()?"mousemove":"touchmove";
	var end=IsPC()?"mouseup":"touchend";
	var wL0=(-117)/scaleW,
		wL1=105/scaleW,
		wT0=(-80)/scaleH,
		wT1=86/scaleH;
	obj.on(start,myStart=function(e){
		var ev = e.type == 'touchstart' ? e.originalEvent.touches[0] : e;
		index=obj.index($(this));
		$('#mobile_downbtn').addClass('sf');
		startH=obj.eq(index).outerHeight();
		startW=obj.eq(index).outerWidth();
		startPos=$(this).position();
		disX=ev.pageX-startPos.left;
		disY=ev.pageY - startPos.top;
		e.preventDefault();
		$(document).on(end, myEnd);
		$(document).on(move,myMove);
	});
	$(document).on(move,myMove=function(e){
		var ev = e.type == 'touchmove' ? e.originalEvent.touches[0] : e;
		leftA=(ev.pageX-disX)/scaleW;
		topA=(ev.pageY-disY)/scaleH;
		obj.eq(index).css('z-index',1);
		$('#mobile_downbtn').css('z-index',1);
		if(leftA<-117)
		{
			leftA=-117;
		}
		if(topA<-80)
		{
			topA=-80;
		}
		dixW=sW-startW;
		dixH=sH-startH;
		if(topA>86)
		{
			topA=86;
		}
		if(leftA>105)
		{
			leftA=105;
		}
		$('#mobile_downbtn').css('left',leftA+485);
		$('#mobile_downbtn').css('top',topA+1017);
		obj.eq(index).css('left',leftA);
		obj.eq(index).css('top',topA);
		e.preventDefault();	
	});
	$(document).on(end,myEnd=function(e){
		var ev = e.type == 'touchmove' ? e.originalEvent.touches[0] : e;
		obj.eq(index).css('left',leftA);
		obj.eq(index).css('top',topA);
		e.preventDefault();	
		$(document).off(end, myEnd);
		$(document).off(move,myMove);
	});
}
/*************************************************基于jq拖拽题********************************************************/
//判断是pc端或者是移动端
function IsPC()  
{  
   var userAgentInfo = navigator.userAgent;  
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
   var flag = true;  
   for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return flag;  
}


//
var cL,cT,cls,tL=3;
var alpha,beta,gamma;
function DeviceOrientationHandler(event){
	if(!alpha){
		alpha = event.alpha;
		beta = event.beta;
		gamma = event.gamma;
	}
	if(alpha != null || beta != null || gamma != null){
		//if( gamma > 0 ){
		if( (gamma - event.gamma)<1 ){
			cL=parseInt($('#picP').css('left'));
			if(cL>58){
				$('#picP').css('left',cL);
			}else{
				$('#picP').css('left',parseInt($('#picP').css('left'))+tL);
			}
		}else if((gamma-event.gamma)>-1){
			cL=parseInt($('#picP').css('left'));
			if(cL<-58){
				$('#picP').css('left',cL);
			}else{
				$('#picP').css('left',parseInt($('#picP').css('left'))-tL);
			}
		} 
		if((beta-event.beta)<1){
			cT=parseInt($('#picP').css('top'));
			if(cT>55){
				$('#picP').css('top',cT);
			}else{
				$('#picP').css('top',parseInt($('#picP').css('top'))+tL);
			}
		}
		else if((beta-event.beta)>-1){
			cT=parseInt($('#picP').css('top'));
			if(cT<-54){
				$('#picP').css('top',cT);
			}else{
				$('#picP').css('top',parseInt($('#picP').css('top'))-tL);
			}
		}
	}else{
		//alert("当前浏览器不支持DeviceOrientation");
	}
}
function runApp(){
	if (!window.DeviceOrientationEvent) { 
		//alert("您的浏览器不支持DeviceOrientation");
	}else{
		window.addEventListener('deviceorientation',DeviceOrientationHandler,false);	
	}	
}
function run() {
	runApp();
	$('#homeCli').click(function(){
		document.getElementById('photosound').play();
		$('#pages1').addClass('animated zoomIn').show();
		$(this).hide();
		window.setTimeout(function(){
			$('#scan').animate({top:'1158px'},1500);
			$('#newPic').animate({height:'1158px'},1500,function(){
				setMyContent()
			});
		},2000);
	});
};
function setMyContent(obj){window.parent.postMessage("Content#"+obj,"*");
}
window.onresize=centerFun;
window.onorientationchange=centerFun;
function centerFun(){
	fullWH(720,1158);
}