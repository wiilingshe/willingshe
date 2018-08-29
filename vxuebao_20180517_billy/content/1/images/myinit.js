function getZoom1OffestImg(obj){
	return getZoomOffestImg(obj,{scaleX:2,scaleY:2,opacity:0});
}
function yoyoEffectLeftImg(obj){
	yoyoEffectImg(obj,{left:getNumValue(obj.pleft)+0.781},{left:getNumValue(obj.pleft)-0.781});
	//yoyoEffectImg(obj,{left:getNumValue(obj.style.left)+0.781},{left:getNumValue(obj.style.left)-0.781});
}
function yoyoEffectTopImg(obj){
	yoyoEffectImg(obj,{top:getNumValue(obj.ptop)+0.498},{top:getNumValue(obj.ptop)-0.498});
	//yoyoEffectImg(obj,{top:getNumValue(obj.style.top)+0.498},{top:getNumValue(obj.style.top)-0.498});
}
function yoyoEffectWHImg(obj){
	var numL=getNumValue(obj.pleft);
	var numT=getNumValue(obj.ptop);
	var numW=getNumValue(obj.pwidth);
	var numH=getNumValue(obj.pheight);
	//var numL=getNumValue(obj.style.left);
	//var numT=getNumValue(obj.style.top);
	//var numW=getNumValue(obj.style.width);
	//var numH=getNumValue(obj.style.height);
	var scaleX1=1.05;
	var scaleY1=1.05;
	var scaleX2=0.95;
	var scaleY2=0.95;
	yoyoEffectImg(obj,{left:numL+numW/2*(1-scaleX1),top:numT+numH/2*(1-scaleY1),width:numW*scaleX1,height:numH*scaleY1},{left:numL+numW/2*(1-scaleX2),top:numT+numH/2*(1-scaleY2),width:numW*scaleX2,height:numH*scaleY2});
}
function yoyoEffectOpacityImg(obj){
	yoyoEffectImg(obj,{opacity:0.5},{opacity:1});
}
var isplayaudio=true;
var cursoundid=1;
var audiobgm1;
var audiobgm2;
function initaudios(){
	show(getId("F20"));
	audiobgm1=new Audio();
	audiobgm1.src="images/bgm1.mp3";
	audiobgm1.loop="loop";
	audiobgm1.play();

	audiobgm2=new Audio();
	audiobgm2.src="images/bgm2.mp3";
	audiobgm2.loop="loop";
	audiobgm2.pause();

	addListenerObj(getId("f20_bgmbtn"),"",bgmbtnClick);
	function bgmbtnClick(){
		if(cursoundid==1){
			if(audiobgm1.currentTime>0){
				audiobgm1.currentTime=0;
				audiobgm1.pause();
				isplayaudio=false;
			}else{
				audiobgm1.play();
				isplayaudio=true;
			}
		}else{
			if(audiobgm2.currentTime>0){
				audiobgm2.currentTime=0;
				audiobgm2.pause();
				isplayaudio=false;
			}else{
				audiobgm2.play();
				isplayaudio=true;
			}
		}
		updatebgmeff();
	}
}
function bgm1Click(e){
	cursoundid=1;
	audiobgm2.pause();
	if(isplayaudio){
		audiobgm1.play();
	}
	updatebgmeff();
}
function bgm2Click(e){
	cursoundid=2;
	audiobgm1.pause();
	if(isplayaudio){
		audiobgm2.play();
	}
	updatebgmeff();
}
function updatebgmeff(){
	if(isplayaudio){
		show(getId("f20_bgmeff"));
	}else{
		hidden(getId("f20_bgmeff"));
	}
}
var pa="images/";
var curFpage=1;
var scaleNum=0;
var bw=0;
var bh=0;
window.onresize=stageCentreSetting;
window.onorientationchange = stageCentreSetting;
function stageCentreSetting(){
	var obj=getId("content");
	bw=document.documentElement.clientWidth;
	bh=document.documentElement.clientHeight;
	var scaleX=bw/640;
	var scaleY=bh/1005;
	scaleNum=Math.min(scaleX,scaleY);
	var objwper=(640*scaleNum)/bw*100;
	var objhper=(1005*scaleNum)/bh*100;
	obj.style.width=objwper+"%";
	obj.style.height=objhper+"%";
	obj.style.left=(100-objwper)/2+"%";
	obj.style.top=(100-objhper)/2+"%";
}
function init(){
	stageCentreSetting();
	saveTolF(
		getId("preloadUI"),getId("F1"),getId("F2"),getId("F3"),getId("F4")
	);
	//预加载
	loadImgInit(pa+"enum0007.png",pa+"enum0008.png",pa+"enum0009.png",pa+"enum0010.png",pa+"snum0007.png",pa+"snum0008.png",pa+"snum0009.png",pa+"snum0010.png");
	loadImgInit.end=function(){	
		//beginInit_f();
	}
	beginInit_f();
}
function beginInit_f(){
	recordObjsLTWH(getId("content"),true);
	initaudios();
	isTouchDevice(getId("content"),null,touchmove,null);
	function touchmove(evt,obj){
		evt.preventDefault();
	}
	fn1();
}