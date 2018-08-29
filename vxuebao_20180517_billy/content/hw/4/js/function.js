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
	return "<video width='"+thx+"' height='"+thy+"' controls='controls' onended = '"+funObj+"' id='videoMP4' poster='_000002.jpg' autobuffer='true'><source src='"+objOGV+"' type='web/ogg'><source src='"+objMP4+"' type='web/mp4'>Your browser does not support the video tag.</video>"
	
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
		case "c":
		TempObj.className = objC;break;
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
		if(TempObj.src.slice(-9) == objC.slice(-9)){return true; }//特别处理
	}
	return false;
}
//创建视频 
function CreatVid(id,url){
	//getID('VIDEO').innerHTML="<video id="+id+" style='position:absolute; top:0%; left:0%; width:100%; height:100%;object-fit: fill;' preload='auto' playsInline webkit-playsinline x5-video-player-type='h5' x5-video-player-fullscreen='true' loop autoplay><source src="+url+".mp4 type='video/mp4'></video>"
	getID('VIDEO1').innerHTML="<video id="+id+" style='position:absolute; top:0%; left:0%; width:100%; height:100%;object-fit: fill;'"+"poster='images/20170809153734.png' playsInline webkit-playsinline  loop  autoplay><source src="+url+".mp4 type='video/mp4'></video>"//width height
	//width height
	getID('VIDEO1').style.display= "block";
}
function CreatVid3(id,url){
	getID('VIDEO2').innerHTML="<video id="+id+" style='position:absolute; top:0%; left:0%; width:100%; height:100%;object-fit: fill;'"+"poster='images/20170809153805.png' playsInline webkit-playsinline  loop  autoplay><source src="+url+".mp4 type='video/mp4'></video>"//width height
	//width height
	getID('VIDEO2').style.display= "block";
}
//get element
function getID(id){	
	return document.getElementById(id);
}
function CreatVid2(id,url){
	//getID('p8_video').innerHTML="<video id="+id+" style='position:absolute; top:0%; left:0%; width:100%; height:100%;object-fit: fill;' preload='auto' poster='images/_000002.jpg' x5-video-player-type='h5' x5-video-player-fullscreen='true'  playsInline webkit-playsinline controls  autoplay><source src="+url+".mp4 type='video/mp4'></video>"
	getID('p8_video').innerHTML="<video id="+id+" width='100%' height='100%'"+" poster='images/_000002.jpg' playsInline webkit-playsinline controls autoplay><source src="+url+".mp4 type='video/mp4'></video>"//width height
	//width height
	getID('p8_video').style.display= "block";
}
function clearVideo2(){
	getID('p8_video').innerHTML = "";
	$('#p8_video').hide();
}
//清除视频
function clearVideo(){
	getID('VIDEO1').innerHTML = "";
	$('#VIDEO1').hide();
}
function clearVideo3(){
	getID('VIDEO2').innerHTML = "";
	$('#VIDEO2').hide();
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
		myAudio.play();
		bgSoundOpenState = 1;
		acnfc("bgSound", "div", 0, "d", "none");
		acnfc("bgSound", "div", 1, "d", "block");
		//acnfc("bgSound", "img", 0, "s", "img/music_on.png");
		//class="imgrsp Rotation"
		//acnfc("bgSound", "img", 0, "c", "imgrsp Rotation");
	}else{
		//afc("myAudio","s","");
		myAudio.pause();
		bgSoundOpenState = 0;
		acnfc("bgSound", "div", 0, "d", "block");
		acnfc("bgSound", "div", 1, "d", "none");
		//acnfc("bgSound", "img", 0, "s", "img/music_off.png");
		//acnfc("bgSound", "img", 0, "c", "imgrsp");
	}
}
/*
//=========================================框架使用程序====================================
function setMyCompleted(obj){window.parent.postMessage("setCompleted#"+obj,"*");
}
function totalLoPage(num){window.parent.postMessage("totalPage#"+num,"*");
}
function nowLoPage(num){window.parent.postMessage("nowPage#"+num,"*");
}
*/
//===========================================视频使用程序==================================
function VideoShow(ObjV,objFun){
afc("myVideo","i",v("web/"+ObjV+".ogv","web/"+ObjV+".mp4",objFun,"",""));
afc("myVideo","d","block");
}
function VideoHide(){
afc("myVideo","d","none");
afc("myVideo","i","");
}
//==================================================================================================
var p12_Num=0;
var P12_staus=true;
function initPage()
{
	//document.addEventListener('touchstart',function(ev){if (ev.cancelable) {if (!ev.defaultPrevented) {ev.preventDefault();}}},false);
	//document.addEventListener('touchend',function(ev){if (ev.cancelable) {if (!ev.defaultPrevented) {ev.preventDefault();}}},false);
	//scaleWidth=document.documentElement.clientWidth;
    //scaleHeight=document.documentElement.clientHeight;
	//afc("PN1","o",0);
	//afc("PN2","d","none");
	afc("bgSound","d","none");
    Canvasinit();
	//alert(a("iframeLo1").style.width+"||"+a("iframeLo1").style.height)
	//width:640px;height:1136px;
	addTouchEvent("PN","PN");
	//CreatVid('videoMP4',"video/p1");getID('videoMP4').play();
	s("p1").addEventListener("touchstart", function() {getID('videoMP4').play();}, false);
	s("p6").addEventListener("touchstart", function() {getID('videoMP4').play();}, false);

    
	//setTimeout(function(){
	//	afc("PN1","o",1);
	//},1000);
	s("p1_1btn").addEventListener("touchstart", function() {
		clearVideo();
		PN_pageNum++;
		nextpage2("PN",-100,1800,"Y");
		moveContentState();
		}, false);
	
	 s("p3_1btn").addEventListener("touchstart", function() {exportRoot.frame_195(1)}, false);
	 s("p3_2btn").addEventListener("touchstart", function() {exportRoot.frame_195(2)}, false);
	 s("p3_3btn").addEventListener("touchstart", function() {exportRoot.frame_195(3)}, false);
	 s("p3_4btn").addEventListener("touchstart", function() {exportRoot.frame_195(4)}, false);
		
   // p4_1btn
   	 s("p4_1btn").addEventListener("touchstart", function() {exportRoot.frame_228(1)}, false);
	 s("p4_2btn").addEventListener("touchstart", function() {exportRoot.frame_228(2)}, false);
	 s("p4_3btn").addEventListener("touchstart", function() {exportRoot.frame_228(3)}, false);
	 s("p4_4btn").addEventListener("touchstart", function() {exportRoot.frame_228(4)}, false);
	 s("p4_5btn").addEventListener("touchstart", function() {exportRoot.frame_228(5)}, false);
	 
	 // p5_1btn
   	 /*s("p5_1btn").addEventListener("touchstart", function() {if(p5_1btnArr[0]==0){exportRoot.frame_298(1);p5_1btnArr[0]=1}alert(p5_1btnArr)}, false);
	 s("p5_2btn").addEventListener("touchstart", function() {if(p5_1btnArr[1]==0){exportRoot.frame_298(2);p5_1btnArr[1]=1}alert(p5_1btnArr)}, false);
	 s("p5_3btn").addEventListener("touchstart", function() {if(p5_1btnArr[2]==0){exportRoot.frame_298(3);p5_1btnArr[2]=1}alert(p5_1btnArr)}, false);*/
	//p6_1btn
	s("p6_1btn").addEventListener("touchstart", function() {touch_rot=1; PN();}, false);
	
	// p7_1btn
   	 s("p7_1btn").addEventListener("touchstart", function() {exportRoot.frame_387(1)}, false);
	 s("p7_2btn").addEventListener("touchstart", function() {exportRoot.frame_387(2)}, false);
	 s("p7_3btn").addEventListener("touchstart", function() {exportRoot.frame_387(3)}, false);
	 s("p7_4btn").addEventListener("touchstart", function() {exportRoot.frame_387(4)}, false);
	 s("p7_5btn").addEventListener("touchstart", function() {exportRoot.frame_387(5)}, false);
	 s("p7_6btn").addEventListener("touchstart", function() {exportRoot.frame_387(6)}, false);
	
	//s("p8_1btn").addEventListener("touchstart", function() {CreatVid2('videoMP4',"video/p9");getID('videoMP4').play();}, false);
	s("p8_2btn").addEventListener("touchstart", function() {exportRoot.frame_456(1)}, false);
	//p9
	/*
   	 s("p9_1btn").addEventListener("touchstart", function() {exportRoot.frame_529(1)}, false);
	 s("p9_2btn").addEventListener("touchstart", function() {exportRoot.frame_529(2)}, false);
	 s("p9_3btn").addEventListener("touchstart", function() {exportRoot.frame_529(3)}, false);
	*/
	
	s("p10_1btn").addEventListener("touchstart", function() {if(P12_staus){gotoContentCanvas("10_2");p12_Num=0;P12_staus=false;playsound("media/wrong.mp3");};}, false);
	s("p10_2btn").addEventListener("touchstart", function() {if(P12_staus){gotoContentCanvas("10_1");p12_Num++;P12_staus=false;playsound("media/true.mp3");};}, false);
	s("p10_3btn").addEventListener("touchstart", function() {if(P12_staus){gotoContentCanvas("10_3");p12_Num=0;P12_staus=false;playsound("media/wrong.mp3");};}, false);
	
	//p11
   	 s("p11_1btn").addEventListener("touchstart", function() {exportRoot.frame_755(1)}, false);
	 s("p11_2btn").addEventListener("touchstart", function() {exportRoot.frame_755(2)}, false);
	 s("p11_3btn").addEventListener("touchstart", function() {exportRoot.frame_755(3)}, false);
	 
	 //p12
	 /*
   	 s("p12_1btn").addEventListener("touchstart", function() {exportRoot.frame_816(1)}, false);
	 s("p12_2btn").addEventListener("touchstart", function() {exportRoot.frame_816(2)}, false);
	 s("p12_3btn").addEventListener("touchstart", function() {exportRoot.frame_816(3)}, false);*/
	 
	 //p13
   	 s("p13_1btn").addEventListener("touchstart", function() {exportRoot.frame_867(1)}, false);
	 s("p13_2btn").addEventListener("touchstart", function() {exportRoot.frame_867(2)}, false);
	 s("p13_3btn").addEventListener("touchstart", function() {exportRoot.frame_867(3)}, false);

	 //p14
	  /*
   	 s("p14_1btn").addEventListener("touchstart", function() {exportRoot.frame_913(1)}, false);
	 s("p14_2btn").addEventListener("touchstart", function() {exportRoot.frame_913(2)}, false);
	 s("p14_3btn").addEventListener("touchstart", function() {exportRoot.frame_913(3)}, false);	
	 */
	//p17_1btn
	s("p17_1btn").addEventListener("touchstart", function() {exportRoot.frame_1045(1,1);p17_1btn_arr[0]=1;p17_1btn_show();}, false);
	s("p17_2btn").addEventListener("touchstart", function() {exportRoot.frame_1045(1,2);p17_1btn_arr[0]=2;p17_1btn_show();}, false);
	s("p17_3btn").addEventListener("touchstart", function() {exportRoot.frame_1045(1,3);p17_1btn_arr[0]=3;p17_1btn_show();}, false);
	s("p17_4btn").addEventListener("touchstart", function() {exportRoot.frame_1045(2,1);p17_1btn_arr[1]=1;p17_1btn_show();}, false);
	s("p17_5btn").addEventListener("touchstart", function() {exportRoot.frame_1045(2,2);p17_1btn_arr[1]=2;p17_1btn_show();}, false);
	s("p17_6btn").addEventListener("touchstart", function() {exportRoot.frame_1045(2,3);p17_1btn_arr[1]=3;p17_1btn_show();}, false);
	s("p17_7btn").addEventListener("touchstart", function() {exportRoot.frame_1045(3,1);p17_1btn_arr[2]=1;p17_1btn_show();}, false);
	s("p17_8btn").addEventListener("touchstart", function() {exportRoot.frame_1045(3,2);p17_1btn_arr[2]=2;p17_1btn_show();}, false);
	s("p17_9btn").addEventListener("touchstart", function() {exportRoot.frame_1045(3,3);p17_1btn_arr[2]=3;p17_1btn_show();}, false);
	
	//p15_1btn
	s("p15_1btn").addEventListener("touchstart", function() {touch_rot=1; PN();}, false);
	s("p15_2btn").addEventListener("touchstart", function() {m15_btn(1)}, false);
	s("p15_3btn").addEventListener("touchstart", function() {m15_btn(2)}, false);
	s("p15_4btn").addEventListener("touchstart", function() {m15_btn(3)}, false);
	s("p15_5btn").addEventListener("touchstart", function() {m15_btn(4)}, false);
	s("p15_6btn").addEventListener("touchstart", function() {m15_btn(5)}, false);
	s("p15_7btn").addEventListener("touchstart", function() {m15_btn(6)}, false);
	s("p15_8btn").addEventListener("touchstart", function() {m15_btn(7)}, false);
	s("p15_9btn").addEventListener("touchstart", function() {m15_btn(8)}, false);
	//s("p1_1_1btn").addEventListener("touchstart", function() {gotoContentCanvas("2");PNgoto(2);afc("PN_btn","d","none"); }, false);
	
	/*
	setTimeout(function(){
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
	},3000);
	
	s("CHECKbtn").addEventListener("touchstart", function() {
            window.location.reload(false);
    }, false);*/
	//moveContentState();
}
var p17_1btn_arr=[0,0,0];
function p17_1btn_show(){
	if(p17_1btn_arr[0]!=0&&p17_1btn_arr[1]!=0&&p17_1btn_arr[2]!=0)
	{
		if(p17_1btn_arr.toString()=="3,2,1"){
			afc("p17_fk1","d","block");
		}else{
			afc("p17_fk2","d","block");
			setTimeout(function(){afc("p17_fk2","d","none");p17_1btn_arr=[0,0,0];exportRoot.frame_1045(10,0);},3000); 
		}
	}
}
var p18_mcdz1_staus = false;
var p18_mcdz1_staus_num=0;
var m18_Staus
var m18_Staus_Num=0;
function m15_fun(){
	m18_Staus = window.setInterval(function(){	
	var TempNum = Math.floor(Math.random()*8+1);
	if(TempNum==m18_Staus_Num){
		TempNum = TempNum+1;
		if(TempNum>8){
			TempNum=1;
		}
	}
	m18_Staus_Num = TempNum;
	exportRoot.frame_978(m18_Staus_Num);
	}, 1000);
}
function m15_btn(obj){
	if(obj==m18_Staus_Num){
		playsound("media/true.mp3");
		if(p18_mcdz1_staus_num==0){p18_mcdz1_staus = true;p18_mcdz1_staus_num=1}
	}else{
		playsound("media/wrong.mp3");
	}
}
var PN_pageNum=1;
var nextpageState=true;
function PNgoto(obj){
	PN_pageNum=obj;
	var TempNum1=(obj-1)*-100;
	console.log("Num="+TempNum1);
	var TempNum=Number(pageTotal-1+"00");
	s("PN").style.top=TempNum1+"%";
}
function PN()
{
    afc("loadbar","d","none");
	var TempNum=Number(pageTotal-1+"00");
	
	switch(touch_rot)
	{
		case 1:
		    //if(PN_pageNum==1){clearVideo();}
			if(PN_pageNum==6){clearVideo3();}
			if(PN_pageNum==8){clearVideo2();}
			if(PN_pageNum<17&&PN_pageNum!=1){			    
				    window.clearInterval(m18_Staus); 
                    PN_pageNum++;
					if(PN_pageNum==6){CreatVid3('videoMP4',"video/p7");getID('videoMP4').play();}
					if(PN_pageNum==10){PN_pageNum++;nextpage2("PN",-100,TempNum,"Y");}
					if(PN_pageNum==15){PN_pageNum++;nextpage2("PN",-100,TempNum,"Y");}
		             // touch_rot=1; PN();
					//if(PN_pageNum==8){}
					nextpage2("PN",-100,TempNum,"Y");
					console.log(PN_pageNum)
					moveContentState();
			}			
	        
			break;
		case 2:
		    if(PN_pageNum==6){clearVideo3();}
			if(PN_pageNum==8){clearVideo2();}
			if(PN_pageNum>2){
				window.clearInterval(m18_Staus); 
				PN_pageNum--;
				if(PN_pageNum==1){}
				if(PN_pageNum==6){CreatVid3('videoMP4',"video/p7");getID('videoMP4').play();}
				if(PN_pageNum==8){}
				if(PN_pageNum==10){PN_pageNum--;nextpage2("PN",100,TempNum,"Y");}
				if(PN_pageNum==15){PN_pageNum--;nextpage2("PN",100,TempNum,"Y");}
				nextpage2("PN",100,TempNum,"Y"); 
				moveContentState();
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
function PN_Show(){
	//afc("PN","d","block");
}
function PN_Hide(){
	//afc("PN","d","none");
}
function moveContentState(){
gotoContentCanvas(PN_pageNum);
}
//==================================================================================================================
//定义声音
var oAudio=new Audio();

//滑屏相关变量
var touch_rot=0;//滑屏幕方向
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
	//alert("touchstart");
	ev.preventDefault();  //阻止出现滚动条
	theoneX=ev.touches[0].clientX;
	theoneY=ev.touches[0].clientY;
	touch_rot=0;
}
function touchend(ev)
{
	ev.preventDefault();  //阻止出现滚动条
	theotherX=ev.changedTouches[0].clientX;
	theotherY=ev.changedTouches[0].clientY;
	if(Math.abs(theotherY-theoneY)>Math.abs(theotherX-theoneX))
	{
		if(theotherY-theoneY>50)
		{
			//nextpage("P2r",100,900,"Y");
			touch_rot=2;
		}else if(theotherY-theoneY<-50)
		{
			//nextpage("P2r",-100,900,"Y");
			touch_rot=1;
		}
	}else
	{
		if(theotherX-theoneX>50)
		{
			//nextpage("P2r",100,900,"Y");
			touch_rot=4;
		}else if(theotherX-theoneX<-50)
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
//等比例拉伸适应屏幕
function matchWH(w,h)
{
	//alert(document.documentElement.clientWidth+"||"+document.documentElement.clientHeight);
	var bw=document.documentElement.clientWidth;
	var bh=document.documentElement.clientHeight;
	if(bw*h>bh*w)
	{
		//alert("pk");
		//浏览器宽度太宽，高度100%显示
		s("window").style.height=bh+"px";
		s("window").style.width=bh*w/h+"px";
		s("window").style.left=(bw*h-bh*w)/(2*h)+"px";
		//alert(bh+"px");
	}else
	{
		//alert("pg");
		//浏览器高度太高，宽度100%显示
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
//目标 初始值0~100 结束值 速度
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
//目标  初始值  结束值  速度
function moveObj(id,Opacity1,Opacity2,speed){
	
}
//目标 距离 速度 方向
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
//目标 距离 速度
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
//目标 距离 速度
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

//替换图片
function changeimg(i,src)
{
	s(i).src=src;
}

//显示和隐藏
function show(elem)
{
	s(elem).style.display="block";
}
function hide(elem)
{
	s(elem).style.display="none";
}

//预加载
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