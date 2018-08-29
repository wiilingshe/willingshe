function a(obj){
	var Tempobj = document.getElementById(obj);
	return Tempobj;
}
function b(obj)
{	var Tempobj = document.getElementsByName(obj);
	return Tempobj;
}
function c(obj)
{    var Tempobj = document.getElementsByTagName(obj);
	return Tempobj;
}
function ab(obj1,obj2)
{var Tempobj = document.getElementById(obj1).getElementsByName(obj2);
return Tempobj;
}
function ac(obj1,obj2)
{var Tempobj = document.getElementById(obj1).getElementsByTagName(obj2);
return Tempobj;
}
function bc(obj1,obj2)
{var Tempobj = document.getElementsByName(obj1).getElementsByTagName(obj2);
return Tempobj;
}
function v(objOGV,objMP4,funObj,thx,thy)
{
	if(thx==undefined||thx=="undefined"||thx==""||thx==NaN||thx=="NaN"||thx=="Null"||thx==null){thx=1256;}
	if(thy==undefined||thy=="undefined"||thy==""||thy==NaN||thy=="NaN"||thy=="Null"||thy==null){thy=647;}
	return "<video width='"+thx+"' height='"+thy+"' controls='controls' autoplay='autoplay' onended = '"+funObj+"' id='videoMP4' autobuffer='true'><source src='"+objOGV+"' type='web/ogg'><source src='"+objMP4+"' type='web/mp4'>Your browser does not support the video tag.</video>"
	
}
function v2(objOGV,objMP4,funObj,thx,thy)
{
	if(thx==undefined||thx=="undefined"||thx==""||thx==NaN||thx=="NaN"||thx=="Null"||thx==null){thx=1256;}
	if(thy==undefined||thy=="undefined"||thy==""||thy==NaN||thy=="NaN"||thy=="Null"||thy==null){thy=647;}
	return "<video width='"+thx+"' height='"+thy+"' controls='controls' onended = '"+funObj+"' id='videoMP4' autobuffer='true'><source src='"+objOGV+"' type='web/ogg'><source src='"+objMP4+"' type='web/mp4'>Your browser does not support the video tag.</video>"
	
}
function acnfc(obj1,obj2,Num,objF,objC){
	var TempObj = document.getElementById(obj1).getElementsByTagName(obj2)[Num];
	myswitch(TempObj,objF,objC);
}
function acnfc2(obj1,obj2,Num,objF,objC){
	var TempObj = document.getElementById(obj1).getElementsByTagName(obj2)[Num];
	return myswitch2(TempObj,objF,objC);
}
function afc(obj,objF,objC){
	var TempObj = document.getElementById(obj);
	myswitch(TempObj,objF,objC);
}
function afc3(obj,objF,objC){
	var TempObj = document.getElementById(obj);
	myswitch3(TempObj,objF,objC);
}
function bfc(obj,objF,objC){
	var TempObj = document.getElementsByName(obj);
	myswitch(TempObj,objF,objC);
}
function cfc(obj,Num,objF,objC){
	var TempObj = document.getElementsByTagName(obj)[Num];
	myswitch(TempObj,objF,objC);
}
function myswitch(TempObj,objF,objC){
	switch(objF){
		case "d":
		TempObj.style.display = objC;break;
		case "o":
	    TempObj.style.opacity = objC;break;
		case "w":
		TempObj.style.width = objC+"px";break;
		case "h":
		TempObj.style.height = objC+"px";break;
		case "l":
		TempObj.style.left = objC+"px";break;
		case "t":
		TempObj.style.top = objC+"px";break;
		case "i":
		TempObj.innerHTML = objC;break;
		case "s":
		TempObj.src = objC;break;
	}
}
function myswitch3(TempObj,objF,objC){
	switch(objF){
		case "w":
		TempObj.style.width = objC+"%";break;
		case "h":
		TempObj.style.height = objC+"%";break;
		case "l":
		TempObj.style.left = objC+"%";break;
		case "t":
		TempObj.style.top = objC+"%";break;
	}
}
function myswitch2(TempObj,objF,objC){
	switch(objF){
		case "d":
		  if(TempObj.style.display == objC){return true; }
		case "o":
	    if(TempObj.style.opacity == objC){return true; }
		case "w":
		if(TempObj.style.width == objC+"px"){return true; }
		case "h":
		if(TempObj.style.height == objC+"px"){return true; }
		case "l":
		if(TempObj.style.left == objC+"px"){return true; }
		case "t":
		if(TempObj.style.top == objC+"px"){return true; }
		case "s":
		if(TempObj.src.slice(-9) == objC.slice(-9)){return true; }//�ر���
	}
	return false;
}
var MingCorseSound = new Audio();
function bgSound(d, e) {
    MingCorseSound.src = d ? d :"";
    0 < MingCorseSound.currentTime && (MingCorseSound.currentTime = 0);
   //MingCorseSound.stop();
    MingCorseSound.loop = "loop";
}

bgSoundOpenState = 1;

function bgSoundOpen() {
	/*
    0 == bgSoundOpenState ? (bgSoundOpenState = 1, MingCorseSound.play(), acnfc("bgSound", "img", 0, "d", "block"), acnfc("bgSound", "img", 1, "s", "img/music_on.png")) :(bgSoundOpenState = 0, 
    MingCorseSound.pause(), acnfc("bgSound", "img", 0, "d", "none"), acnfc("bgSound", "img", 1, "s", "img/music_off.png"));*/
	if(bgSoundOpenState==0){
		//afc("myAudio","s","media/bgm.mp3");
		if(myAudio.currentTime>=80){
			myAudio.currentTime = 0;
		}
		console.log('1')
		myAudio.play();
		bgSoundOpenState = 1;
		getID('musicon').style.display= "block";
		getID('musicoff').style.display= "none";
	}else{
		//afc("myAudio","s","");
		console.log('2')
		myAudio.pause();
		bgSoundOpenState = 0;
		getID('musicoff').style.display= "block";
		getID('musicon').style.display= "none";
		//acnfc("bgSound", "img", 1, "s", "img/music_off.png");
	}
}
/*
//=========================================���ʹ�ó���====================================
function setMyCompleted(obj){window.parent.postMessage("setCompleted#"+obj,"*");
}
function totalLoPage(num){window.parent.postMessage("totalPage#"+num,"*");
}
function nowLoPage(num){window.parent.postMessage("nowPage#"+num,"*");
}
*/
//===========================================��Ƶʹ�ó���==================================
function getID(id){	
	return document.getElementById(id);
}
function clearVideo7(){
	getID('myVideo').pause();
	getID('p7_video').style.display= "none";
}
var getIDCreatVid12Obj;
function CreatVid12(id,url,picurl){
	//getID('p8_video').innerHTML="<video id="+id+" style='position:absolute; top:0%; left:0%; width:100%; height:100%;object-fit: fill;' preload='auto' poster='images/_000002.jpg' x5-video-player-type='h5' x5-video-player-fullscreen='true'  playsInline webkit-playsinline controls  autoplay><source src="+url+".mp4 type='video/mp4'></video>"
	//getID('p12_video').innerHTML="<video id="+id+" width='100%' height='100%'"+" poster='"+picurl+"'  playsInline webkit-playsinline loop autoplay controls><source src="+url+".mp4 type='video/mp4'></video>"//width height
	//width height
	getIDCreatVid12Obj = window.setInterval(showalert, 1000); 
	function showalert() 
	{ 
		if(getID('myVideo').currentTime>=24){
			exportRoot.frame_1440(3);
		}else if(getID('myVideo').currentTime>=12){
			exportRoot.frame_1440(2);
		}else{
			exportRoot.frame_1440(1);
		}
	} 
	getID('p12_video').style.display= "block";
}
function CreatVid19(id,url){
	//getID('p8_video').innerHTML="<video id="+id+" style='position:absolute; top:0%; left:0%; width:100%; height:100%;object-fit: fill;' preload='auto' poster='images/_000002.jpg' x5-video-player-type='h5' x5-video-player-fullscreen='true'  playsInline webkit-playsinline controls  autoplay><source src="+url+".mp4 type='video/mp4'></video>"
	//getID('p19_video').innerHTML="<video id="+id+" width='100%' height='100%'"+" poster='images/p19video.jpg' playsInline webkit-playsinline loop autoplay controls><source src="+url+".mp4 type='video/mp4'></video>"//width height
	//width height
	getID('p19_video').style.display= "block";
}
function clearVideo12(){
	window.clearInterval(getIDCreatVid12Obj); 
	getID('myVideo').pause();
	getID('myVideo2').pause();
	//getID('p12_video').innerHTML = "";
	getID('p12_video').style.display= "none";
	//getID('p19_video').innerHTML = "";
	getID('p19_video').style.display= "none";
}

function VideoShow(ObjV,objFun){
afc("myVideo","i",v("web/"+ObjV+".ogv","web/"+ObjV+".mp4",objFun,"",""));
afc("myVideo","d","block");
}

function VideoHide(){
afc("myVideo","d","none");
afc("myVideo","i","");
}
//==================================================================================================
var CouseStatsArr=[1,1,1,1,1]
var p11_TempF="B";
function initPage()
{
	loadPage();
	document.addEventListener('touchstart',function(ev){ev.preventDefault();},false);
	document.addEventListener('touchend',function(ev){ev.preventDefault();},false);
	//scaleWidth=document.documentElement.clientWidth;
    //scaleHeight=document.documentElement.clientHeight;
	//afc("PN1","o",0);
	afc("window","d","block");
	afc("PN2","d","none");
    Canvasinit();
	//alert(a("iframeLo1").style.width+"||"+a("iframeLo1").style.height)
	//width:640px;height:1136px;

	addTouchEvent("PN","PN");

	//setTimeout(function(){
	//	afc("PN1","o",1);
	//},1000);
	//s("p3_1btn").addEventListener("touchstart", function() {gotoLoNum(4);CouseStatsArr[0]=1;}, false);
	//=======================================
	//p11_btn

	/*s("p10_btn").addEventListener("touchstart", function() {exportRoot.frame_704(1);afc("p10_btn","d","none");}, false);
	s("p11_btn").addEventListener("touchstart", function() {exportRoot.frame_815(1);afc("p11_btn","d","none");}, false);
	s("p16_btn").addEventListener("touchstart", function() {exportRoot.frame_1245(1);afc("p16_btn","d","none");afc("p16","d","block");}, false);
	s("p19_btn").addEventListener("touchstart", function() {exportRoot.frame_1471(1);afc("p19_btn","d","none");afc("p19","d","block");}, false);
	
	s("p24_1btn").addEventListener("touchstart", function() {exportRoot.frame_2005(1);}, false);
	s("p24_2btn").addEventListener("touchstart", function() {exportRoot.frame_2005(2);}, false);
	s("p24_3btn").addEventListener("touchstart", function() {exportRoot.frame_2005(3);}, false);*/
	
	//=====================================
	//setTimeout(function(){
	afc("bgSound","d","block");
	afc("myAudio","s","media/bgm.mp3");
	myAudio.play();
	var audio11 = a("myAudio");
    audio11.addEventListener("ended", function(){
             // audioStatus = "playing";
			  myAudio.currentTime = 0;
			  myAudio.play();
     });
    s("bgSound").addEventListener("touchstart", function() {
        bgSoundOpen();
    }, false);
	//},3000);
	//moveContentState();
}
var PN_pageNum=1;
var nextpageState=true;
function gotoLoNum(obj){
	if(obj==0){
		s("PN").style.top="0%";
		PN_pageNum=1;
		moveContentState();
	}else{
		PN_pageNum=obj;
	    s("PN").style.top="-"+Number(obj-1)+"00%";
		moveContentState();
	}
}
function pd1_mc(){
	//if(PN_pageNum==3||PN_pageNum==6||PN_pageNum==8||PN_pageNum==11||PN_pageNum==16||PN_pageNum==21||PN_pageNum==23){return true;}else{return false;}
	return false;
}
function pd2_mc(){
	//if(PN_pageNum==4||PN_pageNum==7||PN_pageNum==9||PN_pageNum==12||PN_pageNum==17||PN_pageNum==22||PN_pageNum==23){return true;}else{return false;}
	return false;
}
function PN()
{
    afc("loadbar","d","none");
	var TempNum=Number(pageTotal-1+"00");
	console.log(PN_pageNum);
	switch(touch_rot)
	{
		case 1:
            if(pd1_mc()){
                
			}else{
				if(PN_pageNum<pageTotal){
				PN_pageNum++;
				nextpage2("PN",-100,TempNum,"Y");
				moveContentState();
				//afc("PN3","d","block");
				}
			}
		    
			break;
		case 2:
		    if(pd2_mc()){
				
			}else{
				if(PN_pageNum>1){
				PN_pageNum--;
				nextpage2("PN",100,TempNum,"Y");
				moveContentState();
				//afc("PN3","d","block");
				}
			}
			break;
		case 3:
			break;
		case 4:
			break;
		default:
			break;
	}
	
}
function moveContentState(){
//var TempNum=PN_pageNum-1;
//afc3("HideContent","t",TempNum+"00");
gotoContentCanvas(PN_pageNum);
}
//==================================================================================================================
//��������
var oAudio=new Audio();

//������ر���
var touch_rot=0;//����Ļ����
var theoneY=false;
var theotherY=false;
var theoneX=false;
var theotherX=false;


function playvideo(url,fct)
{
	s("video").innerHTML="<video id='videoMP4' style='width:1256px; height:647px;' autoplay"+" onEnded="+"'"+fct+"'"+" controls><source src="+url+".ogv type='video/ogg'><source src="+url+".mp4 type='video/mp4'></video>";
}

function playsound(url)
{
	oAudio.src=url;
	oAudio.play();
}

function playsoundand(url,fct)
{
	oAudio.src=url;
	oAudio.play();
	oAudio.onended=window[fct]();
}



function touchstartEvent(id,fct)
{
	s(id).addEventListener('touchstart',window[fct],false);
}


function addTouchEvent(id,fct)
{
	s(id).addEventListener('touchstart',touchstart,false);
	s(id).addEventListener('touchend',touchend,false);
	s(id).addEventListener('touchend',window[fct],false);
}
function touchstart(ev)
{
	console.log('touchstart run')
	//alert("touchstart");
	ev.preventDefault();  //��ֹ���ֹ�����
	theoneX=ev.touches[0].clientX;
	theoneY=ev.touches[0].clientY;
	touch_rot=0;
}
function touchend(ev)
{
	console.log('touchend run')
	ev.preventDefault();  //��ֹ���ֹ�����
	theotherX=ev.changedTouches[0].clientX;
	theotherY=ev.changedTouches[0].clientY;
	if(Math.abs(theotherY-theoneY)>Math.abs(theotherX-theoneX))
	{
		if(theotherY-theoneY>20)
		{
			//nextpage("P2r",100,900,"Y");
			touch_rot=2;
		}else if(theotherY-theoneY<-20)
		{
			//nextpage("P2r",-100,900,"Y");
			touch_rot=1;
		}
	}else
	{
		if(theotherX-theoneX>20)
		{
			//nextpage("P2r",100,900,"Y");
			touch_rot=4;
		}else if(theotherX-theoneX<-20)
		{
			//nextpage("P2r",-100,900,"Y");
			touch_rot=3;
		}
	}
}
function nextpage2(id,n,p,r)
{
	switch(r)
	{
		case "X":
		case "Y":
			if(n<=-5&&parseInt(s(id).style.top)>-p)
			{

				s(id).style.top=parseInt(s(id).style.top)-100+"%";
			}
			else if(n>=5&&parseInt(s(id).style.top)<-0)
			{

				s(id).style.top=parseInt(s(id).style.top)+100+"%";
			};
			touch_rot=0;
			break;
		default:
			break;		
	}
}
function nextpage(id,n,p,r)
{
	switch(r)
	{
		case "X":
			if(n<=-5&&parseInt(s(id).style.left)>-p)
			{
				setTimeout(function(){nextpage(id,n+5,p,"X")},20);
				s(id).style.left=parseInt(s(id).style.left)-5+"%";
			}
			else if(n>=5&&parseInt(s(id).style.left)<-0)
			{
				setTimeout(function(){nextpage(id,n-5,p,"X")},20);
				s(id).style.left=parseInt(s(id).style.left)+5+"%";
			};
			break;
		case "Y":
			if(n<=-5&&parseInt(s(id).style.top)>-p)
			{
				setTimeout(function(){nextpage(id,n+5,p,"Y")},20);
				s(id).style.top=parseInt(s(id).style.top)-5+"%";
			}
			else if(n>=5&&parseInt(s(id).style.top)<-0)
			{
				setTimeout(function(){nextpage(id,n-5,p,"Y")},20);
				s(id).style.top=parseInt(s(id).style.top)+5+"%";
			};
			break;
		default:
			break;		
	}
	var ax=parseInt(s(id).style.left)+(parseInt(s(id).style.width)>>1);
	var ay=parseInt(s(id).style.top)+(parseInt(s(id).style.height)>>1);
	if(ay==0||ay==-100||ay==-200||ay==-300||ay==-400){
	}
	/*
		if(ax>a&&ax<b&&ay>c&&ay<d)
		{
			//eval(code1);
			alert("ok")
		}else
		{
			//eval(code2);
		}*/
}
//�ȱ���������Ӧ��Ļ
function matchWH(w,h)
{
	//alert(document.documentElement.clientWidth+"||"+document.documentElement.clientHeight);
	var bw=document.documentElement.clientWidth;
	var bh=document.documentElement.clientHeight;
	if(bw*h>bh*w)
	{
		//alert("pk");
		//��������̫���߶�100%��ʾ
		s("window").style.height=bh+"px";
		s("window").style.width=bh*w/h+"px";
		s("window").style.left=(bw*h-bh*w)/(2*h)+"px";
		//alert(bh+"px");
	}else
	{
		//alert("pg");
		//������߶�̫�ߣ����100%��ʾ
		s("window").style.width=bw+"px";
		s("window").style.height=bw*h/w+"px";
		s("window").style.top=(bh*w-bw*h)/(2*w)+"px";
	}
}

function torad(dig)
{
	return dig*Math.PI/180
}
function s(id)
{
	return document.getElementById(id);
}
function imgLoad(url)
{    
  var img = new Image();    
  img.src = url;    
  if (img.complete)
  {    
		
  }  
};
function show(elem)
{
	s(elem).style.display="block";
}

function hide(elem)
{
	s(elem).style.display="none";
}

function changeimg(i,src)
{
	s(i).src=src;
}
//Ŀ�� ��ʼֵ0~100 ����ֵ �ٶ�
function moveOpacity(id,Opacity1,opacity2,speed)
{
	if(parseInt(Opacity1)<parseInt(opacity2))
	{
		s(id).style.opacity=Opacity1/100;
		s(id).style.opacity=Number(s(id).style.opacity)+0.1;
		setTimeout(function(){moveOpacity(id,parseInt(Opacity1+10),opacity2,speed)},1000/speed);
	}
	if(parseInt(Opacity1)>parseInt(opacity2))
	{
		s(id).style.opacity=Opacity1/100;
		s(id).style.opacity=Number(s(id).style.opacity)-0.1;
		setTimeout(function(){moveOpacity(id,parseInt(Opacity1-10),opacity2,speed)},1000/speed);
	}
	if(Opacity1==opacity2){
		return;
	}
}
//Ŀ��  ��ʼֵ  ����ֵ  �ٶ�
function moveObj(id,Opacity1,Opacity2,speed){
	
}
//Ŀ�� ���� �ٶ� ����
function move_length(id,length,speed,rotation)
{
	//alert(parseInt(s(id).style.top));
	var lengthX=length*Math.sin(torad(rotation));
	var lengthY=-length*Math.cos(torad(rotation));
	var speedX=Math.abs(speed*Math.sin(torad(rotation)));
	var speedY=Math.abs(speed*Math.cos(torad(rotation)));
	

	moveX(id,lengthX,speedX);
	moveY(id,lengthY,speedY);
	//alert(lengthX+"||"+lengthY)
	
}
//Ŀ�� ���� �ٶ�
function moveX2(id,lengthX,speedX)
{
	if(lengthX>=1)
	{
		s(id).style.left=parseInt(s(id).style.left)+1+"%";
		setTimeout(function(){moveX(id,parseInt(lengthX-1),speedX)},1000/speedX);
	}
	if(lengthX<=-1)
	{
		s(id).style.left=parseInt(s(id).style.left)-1+"%";
		setTimeout(function(){moveX(id,parseInt(lengthX+1),speedX)},1000/speedX);
	}
}
//Ŀ�� ���� �ٶ�
function moveX(id,lengthX,speedX)
{
	if(lengthX>=1)
	{
		s(id).style.left=parseInt(s(id).style.left)+1+"px";
		setTimeout(function(){moveX(id,parseInt(lengthX-1),speedX)},1000/speedX);
	}
	if(lengthX<=-1)
	{
		s(id).style.left=parseInt(s(id).style.left)-1+"px";
		setTimeout(function(){moveX(id,parseInt(lengthX+1),speedX)},1000/speedX);
	}
}
function moveY(id,lengthY,speedY)
{
	if(lengthY>=1)
	{
		s(id).style.top=parseInt(s(id).style.top)+1+"px";
		setTimeout(function(){moveY(id,parseInt(lengthY-1),speedY)},1000/speedY);
	}
	if(lengthY<=-1)
	{
		s(id).style.top=parseInt(s(id).style.top)-1+"px";
		setTimeout(function(){moveY(id,parseInt(lengthY+1),speedY)},1000/speedY);
	}
}

//�滻ͼƬ
function changeimg(i,src)
{
	s(i).src=src;
}

//��ʾ������
function show(elem)
{
	s(elem).style.display="block";
}
function hide(elem)
{
	s(elem).style.display="none";
}

//Ԥ����
function preLoadImgs()
{	
	var aImg=[];
	for(var i=0; i<preLoadImgs.arguments.length; i++)
	{
		aImg[i]=new Image();
		aImg[i].src=preLoadImgs.arguments[i];
	};	
};
//============================================================================================================