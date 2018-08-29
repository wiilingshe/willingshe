function setMyCompleted(obj){
	window.parent.postMessage("setCompleted#"+obj,"*");
}
function totalLoPage(num){
	window.parent.postMessage("totalPage#"+num,"*");
}
function nowLoPage(num){
	window.parent.postMessage("nowPage#"+num,"*");
}
function setMyVideoState(str){
	//window.parent.postMessage("setVideoState#"+str,"*");
}
function updateMyPercent(str){
	//window.parent.postMessage("updatePercent#"+str,"*");
}
/////////////////////////////////
function loadImgInit(){
	var imgTotal=loadImgInit.arguments.length;
	var totalWidth=getNumValue(getId('loadingbar').style.width);
	var suf=getSuffixStyle(getId('loadingbar'),"width");
	var imgLoaded=0;
	getId('loadingbar').style.width="0"+suf;
	show(getId('loadingbar'));
	var preloadList=new Array();
	for (var i = 0; i < imgTotal; i++) {
		preloadList[i] = new Image();
		preloadList[i].mysrc = loadImgInit.arguments[i];
		preloadList[i].src = loadImgInit.arguments[i];
		preloadList[i].onload=afterImageLoaded;
	}
	function afterImageLoaded(){
		imgLoaded++;
		var loadingWidth=totalWidth*imgLoaded/imgTotal;
		getId('loadingbar').style.width=loadingWidth+suf;
		if(imgLoaded==imgTotal){
			saveTolF.arr[0].style.display='none';
			if(suf=="%" && typeof(sw)!="undefined" && typeof(sh)!="undefined"){
				var imgObj=new Object();
				for (var i=0;i<imgTotal;i++){
					var mysrc=preloadList[i].mysrc;
					var w=preloadList[i].width;
					var h=preloadList[i].height;
					var wp=Math.round(w/sw*100*1000)/1000;
					var hp=Math.round(h/sh*100*1000)/1000;
					imgObj[mysrc]={width:wp+"%",height:hp+"%"};
				}
				loadImgInit.imgObj=imgObj;
			}
			loadImgInit.end();
		}
	}
}
function rspImg(obj,url,Json){
	obj.src=url;
	if(Json){
		for(var p in Json){	
			obj.style[p]=Json[p];
		}
	}
}
function attr(obj,Json){
	if(Json){
		for(var p in Json){	
			obj.style[p]=Json[p];
		}
	}
}
function savaRspImg(){	
	var curArr=[];
	for(var i=0; i<arguments.length;i++){	
		curArr[i]=arguments[i];
	}
	return savaRspImg.arr=curArr;
}
function savaClickO(){	
	var curArr=[];
	for(var i=0; i<arguments.length;i++){	
		curArr[i]=arguments[i];
		// curArr[i].isActive='false';
	}
	return savaClickO.arr=curArr;
}
function saveTolF(){	
	var curArr=[];
	for(var i=0; i<arguments.length;i++){	
		curArr[i]=arguments[i];
	}
	return saveTolF.arr=curArr;
}
function getStyle(obj, porperty) {
    if (obj.currentStyle) {
        return obj.currentStyle[porperty];
    } else {
        return getComputedStyle(obj, false)[porperty];
    }
}
// 播放视频
function playVid(className,url,fn){	
	showCurF(getId('myVideo'));
	getId('myVideo').innerHTML="<video id='videoMP4' class="+className+" controls='controls' autoplay='autoplay' onplay='setMyVideoState(true)' onpause='setMyVideoState(false)' onended='videoMP4onended("+fn+")'><source src="+url+".ogv type='video/ogg'><source src="+url+".mp4 type='video/mp4'></video>";
	getId('videoMP4').play();
}
function videoMP4onended(fn){
	getId('myVideo').innerHTML='';
	fn();
}
// 播放声音
var audio=new Audio();
function playAud(url){
	if(url){audio.src=url;}else{audio.src="";}
	if(audio.currentTime>0){audio.currentTime=0;}
	audio.play();
}
var audio1=new Audio();
function playAud1(url,fn){
	if(audio1.fn){
		audio1.removeEventListener('ended',audio1.fn);
	}
	if(url){
		audio1.src=url;
		audio1.play();
		if(audio1.currentTime>0){
			audio1.currentTime=0;
		}
		if(fn){
			audio1.fn=fn
			audio1.addEventListener('ended',fn,false);
		}
	}else{
		audio1.src="";
	}
}
function playAud2(obj,url,fn,pfn,tufn){
	if(obj.fn){
		obj.removeEventListener('ended',obj.fn);
	}
	if(obj.pfn){
		obj.removeEventListener('play',obj.pfn);
	}
	if(obj.tufn){
		obj.removeEventListener('timeupdate',obj.tufn);
	}
	if(url){
		obj.src=url;
		obj.play();
		if(obj.currentTime>0){
			obj.currentTime=0;
		}
		if(fn){
			obj.fn=fn;
			obj.addEventListener('ended',fn,false);
		}
		if(pfn){
			obj.pfn=pfn;
			obj.addEventListener('play',pfn,false);
		}
		if(tufn){
			obj.tufn=tufn;
			obj.addEventListener('timeupdate',tufn,false);
		}
	}else{
		obj.src="";
	}
}
function playAud3(obj,isplay,fn,pfn,tufn){
	if(obj.fn){
		obj.removeEventListener('ended',obj.fn);
	}
	if(obj.pfn){
		obj.removeEventListener('play',obj.pfn);
	}
	if(obj.tufn){
		obj.removeEventListener('timeupdate',obj.tufn);
	}
	if(isplay){
		obj.play();
		if(obj.currentTime>0){
			obj.currentTime=0;
		}
		if(fn){
			obj.fn=fn;
			obj.addEventListener('ended',fn,false);
		}
		if(pfn){
			obj.pfn=pfn;
			obj.addEventListener('play',pfn,false);
		}
		if(tufn){
			obj.tufn=tufn;
			obj.addEventListener('timeupdate',tufn,false);
		}
	}else{
		obj.pause();
	}
}
function showCurFId(id){
	showCurF(getId(id));
}
function showCurF(bestTopObj){
	for(var i=0;i<saveTolF.arr.length;i++){
		hidden(saveTolF.arr[i]);
	}
	show(bestTopObj);
}
//////////////////////////////////////////////////////////////////////////////////////////
function getId(o){
	return document.getElementById(o);
}
function show(objD){
	objD.style.display='block';
}
function hidden(objH){
	objH.style.display='none';
}
function showId(id){
	getId(id).style.display='block';
}
function hideId(id){
	getId(id).style.display='none';
}
function showList(showlist){
	for (var i = 0; i < showlist.length; i++) {
		showId(showlist[i]);
	}
}
function hideList(hidelist){
	for (var i = 0; i < hidelist.length; i++) {
		hideId(hidelist[i]);
	}
}
//更换图片
function switchImg(obj,imgUrl){
	if(loadImgInit.imgObj && loadImgInit.imgObj[imgUrl]){
		rspImg(obj,imgUrl,loadImgInit.imgObj[imgUrl]);
	}else{
		obj.src=imgUrl;
	}
}
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
function acafc(obj1,obj2,Num){//获得目录中的某个对象
	var TempObj = document.getElementById(obj1).getElementsByTagName(obj2)[Num];
	return TempObj;
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
function afc2(obj,objF,objC){
	var TempObj = document.getElementById(obj);
	return myswitch2(TempObj,objF,objC);
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
	}
	return false;
}
function myswitch2Id(id,objF,objC){
	return myswitch2(getId(id),objF,objC);
}
function getmyswitch(id,objF){
	switch(objF){
		case "d":
			return TempObj.style.display;
		case "o":
			return TempObj.style.opacity;
		case "w":
			return TempObj.style.width;
		case "h":
			return TempObj.style.height;
		case "l":
			return TempObj.style.left;
		case "t":
			return TempObj.style.top;
		case "i":
			return TempObj.innerHTML;
		case "s":
			return TempObj.src;
	}
	return "";
}
//===========================================声音==================================
var MingCorseSound=new Audio();
function s(objMP3,funObj)
{
if(objMP3){MingCorseSound.src=objMP3;}else{MingCorseSound.src="";}
if(MingCorseSound.currentTime>0){MingCorseSound.currentTime=0;};
MingCorseSound.play();
if(funObj){MingCorseSound.addEventListener("ended",function(){funObj})}
}
//===========================================视频使用程序==================================
function VideoShow(ObjV,objFun){
afc("myVideo","i",v("video/"+ObjV+".ogv","video/"+ObjV+".mp4",objFun,"",""));
afc("myVideo","d","block");
a("videoMP4").play();
}
function VideoHide(){
afc("myVideo","d","none");
afc("myVideo","i","");
}
function v(objOGV,objMP4,funObj,thx,thy){
	if(thx==undefined||thx=="undefined"||thx==""||thx==NaN||thx=="NaN"||thx=="Null"||thx==null){thx=1256;}
	if(thy==undefined||thy=="undefined"||thy==""||thy==NaN||thy=="NaN"||thy=="Null"||thy==null){thy=647;}
	return "<video width='"+thx+"' height='"+thy+"' controls='controls' autoplay='autoplay' onended = '"+funObj+"' onplay = 'setMyVideoState(true)' onpause = 'setMyVideoState(false)' id='videoMP4' autobuffer='true'><source src='"+objOGV+"' type='video/ogg'><source src='"+objMP4+"' type='video/mp4'>Your browser does not support the video tag.</video>"
}
function v2(objOGV,objMP4,funObj,thx,thy){
	if(thx==undefined||thx=="undefined"||thx==""||thx==NaN||thx=="NaN"||thx=="Null"||thx==null){thx=1256;}
	if(thy==undefined||thy=="undefined"||thy==""||thy==NaN||thy=="NaN"||thy=="Null"||thy==null){thy=647;}
	return "<video width='"+thx+"' height='"+thy+"' controls='controls' onended = '"+funObj+"' onplay = 'setMyVideoState(true)' onpause = 'setMyVideoState(false)' id='videoMP4' autobuffer='true'><source src='"+objOGV+"' type='video/ogg'><source src='"+objMP4+"' type='video/mp4'>Your browser does not support the video tag.</video>"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<img id="beginbtn" style="position:absolute;left:847px;top:250px;" src="m4/jenny0001.png" alt="">
//var obj=document.getElementById("beginbtn");
//alert(obj.offsetWidth)
//obj.style.width="144px";
//obj.style.height="144px";
//obj.src="m4/jenny0001.png";
//startObjMove(obj,{left:-50,top:-50,opacity:0.5,width:200,height:200},beginbtnmovecomplete);
//var animList=new Array(["m4/jenny0001.png",200],["m4/jenny0002.png",200],["m4/jenny0003.png",200],["m4/jenny0004.png",200]);
//addListenerObj(getId("beginbtn"),"toBig",clickbeginbtnfun);
//function clickbeginbtnfun(e){var mcName=e.currentTarget.id;var idx=parseInt(mcName.substring(7));}
/*
function addListenerObj(obj,className,clickFun,overFun,outFun,downFun,upFun,moveFun){
	obj.style.cursor="pointer";
	obj.className=className;
	if(overFun){
		obj.onmouseover=overFun;
	}
	if(outFun){
		obj.onmouseout=outFun;
	}
	if(clickFun){
		obj.onclick=clickFun;
	}
	if(downFun){
		obj.onmousedown=downFun;
	}
	if(upFun){
		obj.onmouseup=upFun;
	}
	if(moveFun){
		obj.onmousemove=moveFun;
	}
}
function removeListenerObj(obj) {
	obj.className=null;
	obj.style.cursor="";
	obj.onmouseover=null;
	obj.onmouseout=null;
	obj.onclick=null;
	obj.onmousedown=null;
	obj.onmouseup=null;
	obj.onmousemove=null;
}
*/
function addListenerObj(obj,className,clickFun){
	obj.style.cursor="pointer";
	obj.className=className;
	obj.isHaveListenerClick=true;
	isTouchDevice(obj,null,null,touchend);
	function touchend(evt,obj){
		if(Math.abs(obj.satrtXYList[0].x-obj.moveXYList[0].x)<=15 && Math.abs(obj.satrtXYList[0].y-obj.moveXYList[0].y)<=15){
			if(clickFun){
				clickFun(evt,obj);
			}
		}
	}
}
function removeListenerObj(obj) {
	obj.className=null;
	obj.style.cursor="";
	obj.isHaveListenerClick=false;
	if(obj.killListtener){
		obj.killListtener();
	}
}
function animationObjTab(obj,animList,completeFun,animCurIdx,updateFun){
	clearInterval(obj.animationtimer);
	obj.animCurIdx=fixLoToNumber(animCurIdx);
	animNextObj();
	function animIntervalHandler() {
		if(obj.animCurIdx<animList.length-1){
			obj.animCurIdx++;
			animNextObj();
		}else{
			if(completeFun){
				obj.animCurIdx=animList.length-1;
				obj.src=animList[obj.animCurIdx][0];
				clearInterval(obj.animationtimer);
				completeFun(obj);
			}else{
				obj.animCurIdx=0;
				animNextObj();
			}
		}
	}
	function animNextObj(){
		clearInterval(obj.animationtimer);
		obj.src=animList[obj.animCurIdx][0];
		obj.animationtimer = setInterval(animIntervalHandler, animList[obj.animCurIdx][1]);
		if(updateFun){
			updateFun(obj);
		}
	}
}
//var obj=document.getElementById("beginbtn");
//obj.style.width="251px";
//obj.style.height="62px";
//startObjMove(obj,{left:-50,top:-50,opacity:0.5,width:20,height:10},allcompletebegins);
//startObjMove(getId("p1btn"),{left:"58px",top:"60px",opacity:"0.5",width:"20px",height:"10px"},allcompletebegins);
//startObjMove(getId("p1btn"),{left:"58%",top:"60%",opacity:"0.5",width:"20%",height:"10%"},allcompletebegins);
function startObjMove(obj,json,fnEnd,effframes,updateFuns,completeFuns){
	clearInterval(obj.timer);
	effframes=effframes || {};
	json=getCopyJson();
	for(var attr in json){
		json[attr]=getNumValue(json[attr]);
		obj["eff"+attr+"suffix"]=getSuffixStyle(obj,attr);
		obj["eff"+attr+"Count"]=fixLoToNumber(effframes[attr],25);
		obj["eff"+attr+"addValue"]=(json[attr]-getnfs(attr))/obj["eff"+attr+"Count"];
		obj["eff"+attr+"CurInt"]=0;
	}
	var tmpJson=getCopyJson();
	obj.timer=setInterval(timeInterval,40);
	/////////////////////
	function timeInterval(){
		for(var attr in tmpJson){
			if(obj["eff"+attr+"CurInt"]<obj["eff"+attr+"Count"]-1){
				obj["eff"+attr+"CurInt"]++;
				obj.style[attr]=getnfs(attr)+obj["eff"+attr+"addValue"]+obj["eff"+attr+"suffix"];
				if(updateFuns){
					updateFuns(obj,attr);
				}
			}else{
				obj["eff"+attr+"CurInt"]=obj["eff"+attr+"Count"];
				obj.style[attr]=json[attr]+obj["eff"+attr+"suffix"];
				delete tmpJson[attr];
				if(completeFuns){
					completeFuns(obj,attr);
				}else{
					if(updateFuns){
						updateFuns(obj,attr);
					}
				}
				if(getAllJsonObjComplete()){
					clearInterval(obj.timer);
					if(fnEnd){
						fnEnd(obj);
					}
				}
			}
		}
	}
	function getCopyJson(){
		var returnobj={}
		for(var attr in json){
			returnobj[attr]=json[attr];
		}
		return returnobj;
	}
	function getAllJsonObjComplete(){
		for(var attr in tmpJson){
			return false;
		}
		return true;
	}
	function getnfs(attr){
		var str=obj.style[attr];
		if(attr=="opacity"){
			return fixLoToNumber(str || 1);
		}else{
			return getNumValue(str);
		}
	}
}
function randomize_lo_arr(n, m) {
	//randomize_arr n：共多少个进行随机,m:取多个随机数,//randomize_arr(10,10)  return: 1-10
	var temp_arr = new Array();
	var return_arr = new Array();
	var i;
	for (i=1; i<=n; i++) {
		var tmp=parseInt(Math.random()*(temp_arr.length+1));
		temp_arr.splice(tmp,0,i);
	}
	for (i=0; i<m; i++) {
		return_arr.push(temp_arr[i]);//-1
	}
	return return_arr;
}
function randomize_lozero_arr(n, m) {
	//randomize_arr n：共多少个进行随机,m:取多个随机数,//randomize_arr(10,10)  return: 0-9
	var temp_arr = new Array();
	var return_arr = new Array();
	var i;
	for (i=1; i<=n; i++) {
		var tmp=parseInt(Math.random()*(temp_arr.length+1));
		temp_arr.splice(tmp,0,i);
	}
	for (i=0; i<m; i++) {
		return_arr.push(temp_arr[i]-1);
	}
	return return_arr;
}
function fixLoStrZeroLen(str, len) {
	var preStr="";
	for(var i=0;i<len;i++) {
		preStr+="0";
	}
	preStr+=str;
	return preStr.substring(preStr.length-len);
}
function fixLoNumberBound(num0, num1, num2) {
	num0 = parseInt(fixLoToNumber(num0));
	num1 = parseInt(fixLoToNumber(num1));
	num2 = parseInt(fixLoToNumber(num2));
	if (num0 < num1) {
		return num1;
	} else if (num0 > num2) {
		return num2;
	} else {
		return num0;
	}
}
function fixLoNumberForScoreBound(num0, num1, num2, num3) {
	num0 = fixLoToNumber(num0);
	num1 = fixLoToNumber(num1);
	num2 = fixLoToNumber(num2);
	if(num3){
		num0 = Number(   parseFloat(num0).toFixed(  fixLoToNumber(num3)  )   ); //四舍五入,并保留 num3 位小数位
	}else{
		num0 = Math.round(num0 * 10) / 10; //四舍五入,并保留一位小数位
	}
	if (num0 < num1) {
		return num1;
	} else if (num0 > num2) {
		return num2;
	} else {
		return num0;
	}
}
function fixLoToNumber(num,defaultNum) {
	num = Number(num);
	if (isNaN(num)) {
		defaultNum=Number(defaultNum);
		if(isNaN(defaultNum)){
			return 0;
		}else{
			return defaultNum;
		}
	} else {
		return num;
	}
}
function getNumValue(num){
	return fixLoToNumber(parseFloat(num));//.toFixed(2)
}
function getNumValue1(num,num1){
	return Number(parseFloat(num).toFixed(num1));//转成num并保留num1位小数位
}
function getScopeN(m0, m1, m, n0, n1){
	return (m-m0)/(m1-m0)*(n1-n0)+n0;
}
function getPx(pernum,max){
	pernum=getNumValue(pernum);
	max=getNumValue(max);
	return Number(parseFloat(pernum*max/100).toFixed(3));//四舍五入,并保留三位小数位
}
function getPer(pxnum,max){
	pxnum=getNumValue(pxnum);
	max=getNumValue(max);
	return Number(parseFloat(pxnum/max*100).toFixed(3));//四舍五入,并保留三位小数位
}
function getAttrStyle(obj,attr){
	return obj.style[attr];
}
function getSuffixStyle(obj,attr){
	var str=obj.style[attr];
	if(attr=="opacity"){
		return "";
	}else if((str.substring(str.length-1).toLowerCase()=="%")){
		return "%";
	}else{
		return "px";
	}
}
function clickQuit(){
	var browserName=navigator.appName;
	if (browserName=="Netscape") {
		if (window.top != window && window.top != null) {
			window.top.opener = null;
			window.top.open('','_self','');
			window.top.close();
		}
		else{
			window.opener = null;
			window.open('','_self','');
			window.close();
		}
	} 
	else if(browserName=="Microsoft Internet Explorer"){
		if (window.top != window && window.top != null){
			window.top.opener = null;
			window.top.close();
		}
		else{
			window.opener = null;
			window.close();
		}
	}
}
//是否电脑
function IsPC()  {  
   var userAgentInfo = navigator.userAgent;  
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
   var flag = true;  
   for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return flag;  
}
function isSupportHTML5Video(){//是否支持h5
	var isMp4Supp=supportType('video/mp4','avc1.42E01E, mp4a.40.2');
	var isOgvSupp=supportType('video/ogg','theora, vorbis');
	//isMp4Supp="";
	//isOgvSupp="";
	if(isMp4Supp!="" || isOgvSupp!=""){
		return true;
	}else{
		return false;
	}
	///////////////////////function
	function supportType(vidType,codType){ 
		var myVid=document.createElement('video');
		var isSupp="";
		try {
			isSupp=myVid.canPlayType(vidType+';codecs="'+codType+'"');
		} catch (myError) {
			isSupp="";
		} finally {
			//无论是否出现错误，都会执行 finally 代码块
		}
		return isSupp;
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
function stageScreenSetting(contentobj,curW,curH,isfull){
	//<div id="content" style="position:absolute;overflow:hidden; width:1280px; height:720px;">
	var htmlw=document.documentElement.clientWidth;//document.getElementById("htmlfulls").offsetWidth;
	var htmlh=document.documentElement.clientHeight;//document.getElementById("htmlfulls").offsetHeight;
	var scaleX=htmlw/curW;
	var scaleY=htmlh/curH;
	if(isfull==false){
		var scaleXY=Math.min(scaleX,scaleY);
		scaleX=scaleXY;
		scaleY=scaleXY;
	}
	var matrixStr="scale3d("+scaleX+","+scaleY+",1)";//var matrixStr="matrix("+scaleX+",0,0,"+scaleY+",0,0)";
	//最外层包裹id="window"
	contentobj.style.transform=matrixStr;
	contentobj.style.msTransform=matrixStr;//IE 9 
	contentobj.style.MozTransform=matrixStr;//Firefox
	contentobj.style.webkitTransform=matrixStr;// Safari 和 Chrome 
	contentobj.style.oTransform=matrixStr;// Opera
	
	var tmpw=htmlw*scaleX;
	var tmph=htmlh*scaleY;
	var tmp2w=curW*scaleX;
	var tmp2h=curH*scaleY;
	var tmpL=(tmpw-tmp2w)/2;
	var tmpT=(tmph-tmp2h)/2;
	contentobj.style.left=tmpL/scaleX+"px";
	contentobj.style.top=tmpT/scaleY+"px";
	contentobj.tmpw=tmpw;
	contentobj.tmph=tmph;
	contentobj.tmp2w=tmp2w;
	contentobj.tmp2h=tmp2h;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setTouchObjXYList(arr){
	var returnList = new Array();
	for(var i=0;i<arr.length;i++){
		var obj=new Object();
		obj.x=arr[i].pageX;
		obj.y=arr[i].pageY;
		returnList[i]=obj;
	}
	return returnList;
}
function copyTouchObjXYList(arr) {
	var returnList = new Array();
	for(var i=0;i<arr.length;i++){
		var obj=new Object();
		obj.x=arr[i].x;
		obj.y=arr[i].y;
		returnList[i]=obj;
	}
	return returnList;
}
function myTriangleLen(a,b){
	return Math.pow(Math.pow(a,2)+Math.pow(b,2),0.5);
}
function myCenterPoint(a,b){
	var c=new Object();
	c.x=a.x+(b.x-a.x)/2;
	c.y=a.y+(b.y-a.y)/2;
	return c;
}
function isTouchDevice(obj,startfun,movefun,endfun){
	if(obj.killListtener){
		obj.killListtener();
	}
	var isHaveTouch=(IsPC())?false:true;
	if(isHaveTouch){
		obj.addEventListener('touchstart',touchstart,false);
	}else{
		obj.onmousedown=touchstart;
	}
	//var satrtXYList=copyTouchObjXYList(obj.satrtXYList);//obj.satrtXYList=copyTouchObjXYList(obj.moveXYList);function myTriangleLen(a,b){return Math.pow(Math.pow(a,2)+Math.pow(b,2),0.5);}
	function touchstart(evt){
		if(evt.touches){
			obj.satrtXYList=setTouchObjXYList(evt.touches);
			obj.moveXYList=copyTouchObjXYList(obj.satrtXYList);
			obj.removeEventListener('touchmove',touchmove);
			obj.removeEventListener('touchend',touchend);
			obj.addEventListener('touchmove',touchmove,false);
			obj.addEventListener('touchend',touchend,false);
		}else{
			obj.satrtXYList=setTouchObjXYList([evt]);
			obj.moveXYList=copyTouchObjXYList(obj.satrtXYList);
			obj.onmousemove=null;
			obj.onmouseup=null;
			obj.onmousemove=touchmove;
			obj.onmouseup=touchend;
		}
		if(startfun){
			startfun(evt,obj);
		}
	}
	function touchmove(evt){
		if(evt.touches){
			obj.moveXYList=setTouchObjXYList(evt.touches);
		}else{
			obj.moveXYList=setTouchObjXYList([evt]);
		}
		if(movefun){
			movefun(evt,obj);
		}
	}
	function touchend(evt){
		if(evt.touches){
			obj.removeEventListener('touchmove',touchmove);
			obj.removeEventListener('touchend',touchend);
		}else{
			obj.onmousemove=null;
			obj.onmouseup=null;
		}
		if(endfun){
			endfun(evt,obj);
		}
	}
	obj.killListtener=function(){
		obj.removeEventListener('touchstart',touchstart);
		obj.removeEventListener('touchmove',touchmove);
		obj.removeEventListener('touchend',touchend);
		obj.onmousedown=null;
		obj.onmousemove=null;
		obj.onmouseup=null;
	}
}
function getFirstLabelDiv(objf){
	var divarr=objf.getElementsByTagName("div");
	var returnList=new Array();
	for(var n=0;n<divarr.length;n++){
		var obj=divarr[n];
		if(obj.parentNode.id==objf.id){
			returnList.push(obj);
		}
	}
	return returnList;
}
function getIdClass(obj,className){
	if(!obj.myObjClass){obj.myObjClass=new Object();}
	if(obj.myObjClass[className]){return obj.myObjClass[className];}
	var divarr=obj.getElementsByTagName("div");
	for(var i=0;i<divarr.length;i++){
		var iobj=divarr[i];
		if(myfun(iobj.className,className)){
			obj.myObjClass[className]=iobj;
			return iobj;
		}
	}
	var imgarr=obj.getElementsByTagName("img");
	for(var j=0;j<imgarr.length;j++){
		var jobj=imgarr[j];
		if(myfun(jobj.className,className)){
			obj.myObjClass[className]=jobj;
			return jobj;
		}
	}
	return null;
	function myfun(objstr,str1){
		if(objstr.indexOf(" ")>=0){
			return (objstr.indexOf(str1)>=0)?true:false;
		}else{
			return (objstr==str1)?true:false;
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Has been deleted
function killObjsEnterFrame(objf,isHaveSelf,isDivSH,isImgSH){
	if(isHaveSelf){
		killEnterFrame(objf);
		if(isDivSH==true){
			show(objf);
		}else if(isDivSH==false){
			hidden(objf);
		}
	}
	var imgarr=objf.getElementsByTagName("img");
	for(var m=0;m<imgarr.length;m++){
		killEnterFrame(imgarr[m]);
		if(isImgSH==true){
			show(imgarr[m]);
		}else if(isImgSH==false){
			hidden(imgarr[m]);
		}
	}
	var divarr=objf.getElementsByTagName("div");
	for(var n=0;n<divarr.length;n++){
		killEnterFrame(divarr[n]);
		if(isDivSH==true){
			show(divarr[n]);
		}else if(isDivSH==false){
			hidden(divarr[n]);
		}
	}
}
//Has been deleted
function saveObjsLTWH(objf,isHaveSelf,iskill,isDivSH,isImgSH){
	if(isHaveSelf){
		myfn(objf,iskill,isDivSH);
	}
	var divarr=objf.getElementsByTagName("div");
	for(var n=0;n<divarr.length;n++){
		myfn(divarr[n],iskill,isDivSH);
	}
	var imgarr=objf.getElementsByTagName("img");
	for(var m=0;m<imgarr.length;m++){
		myfn(imgarr[m],iskill,isImgSH);
	}
	function myfn(obj,iskill,isSH){
		if(obj){
			if(!obj.pleft){
				obj.pleft=obj.style.left;
			}
			if(!obj.ptop){
				obj.ptop=obj.style.top;
			}
			if(!obj.pwidth){
				obj.pwidth=obj.style.width;
			}
			if(!obj.pheight){
				obj.pheight=obj.style.height;
			}
			if(!obj.popacity){
				obj.popacity=obj.style.opacity;
			}
			if(iskill){
				killEnterFrame(obj);
			}
			if(isSH==true){
				show(obj);
			}else if(isSH==false){
				hidden(obj);
			}
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function stopObjMoveEffect(){
	for(var i=0;i<saveTolF.arr.length;i++){
		killObjs(saveTolF.arr[i],true,true,true);
	}
}
function killAndHiddenObj(obj){
	killEnterFrame(obj);
	hidden(obj);
}
function killEnterFrame(obj){
	clearInterval(obj.timer);
	clearTimeout(obj.timerout);
	clearInterval(obj.animationtimer);
	for(var m=0;m<20;m++){
		clearTimeout(obj["timer"+m]);
		clearTimeout(obj["timerout"+m]);
		clearTimeout(obj["animationtimer"+m]);
	}
	if(obj.killListtener){
		obj.killListtener();
	}
	for(var i=0;i<5;i++){
		if(obj["killListtener"+i]){
			obj["killListtener"+i]();
		}
	}
	if(obj.isHaveListenerClick || obj.onclick){
		removeListenerObj(obj);
	}
}
function recordObjsLTWH(objf,isHaveSelf){
	if(isHaveSelf){
		recordObjLTWH(objf);
	}
	var divarr=objf.getElementsByTagName("div");
	for(var n=0;n<divarr.length;n++){
		recordObjLTWH(divarr[n]);
	}
	var imgarr=objf.getElementsByTagName("img");
	for(var m=0;m<imgarr.length;m++){
		recordObjLTWH(imgarr[m]);
	}
}
function recordObjLTWH(obj){
	if(obj){
		if(!obj.pleft){
			obj.pleft=obj.style.left;
		}
		if(!obj.ptop){
			obj.ptop=obj.style.top;
		}
		if(!obj.pwidth){
			obj.pwidth=obj.style.width;
		}
		if(!obj.pheight){
			obj.pheight=obj.style.height;
		}
		if(!obj.popacity){
			obj.popacity=obj.style.opacity;
		}
	}
}
/////////////////////
function killObjs(objf,isHaveSelf,iskillDiv,iskillImg){
	if(isHaveSelf){
		myfn(objf,iskillDiv);
	}
	var divarr=objf.getElementsByTagName("div");
	for(var n=0;n<divarr.length;n++){
		myfn(divarr[n],iskillDiv);
	}
	var imgarr=objf.getElementsByTagName("img");
	for(var m=0;m<imgarr.length;m++){
		myfn(imgarr[m],iskillImg);
	}
	function myfn(obj,iskill){
		if(iskill){
			killEnterFrame(obj);
		}
	}
}
function shObjs(objf,isHaveSelf,isDivSH,isImgSH){
	if(isHaveSelf){
		myfn(objf,isDivSH);
	}
	var divarr=objf.getElementsByTagName("div");
	for(var n=0;n<divarr.length;n++){
		myfn(divarr[n],isDivSH);
	}
	var imgarr=objf.getElementsByTagName("img");
	for(var m=0;m<imgarr.length;m++){
		myfn(imgarr[m],isImgSH);
	}
	function myfn(obj,isSH){
		if(isSH==true){
			show(obj);
		}else if(isSH==false){
			hidden(obj);
		}
	}
}
function recordObjsStateLTWH(objf,isHaveSelf,sw,sh){
	if(isHaveSelf){
		recordObjStateLTWH(objf,sw,sh);
	}
	var divarr=objf.getElementsByTagName("div");
	for(var n=0;n<divarr.length;n++){
		recordObjStateLTWH(divarr[n],divarr[n].parentNode.px_width,divarr[n].parentNode.px_height);
	}
	var imgarr=objf.getElementsByTagName("img");
	for(var m=0;m<imgarr.length;m++){
		recordObjStateLTWH(imgarr[m],imgarr[m].parentNode.px_width,imgarr[m].parentNode.px_height);
	}
}
function recordObjStateLTWH(obj,sw,sh){
	if(obj){
		myrecord(obj,[{att:"left",max:sw},{att:"top",max:sh},{att:"width",max:sw},{att:"height",max:sh}]);
	}
	function getPx(pernum,max){
		pernum=getNumValue(pernum);
		max=getNumValue(max);
		return Number(parseFloat(pernum*max/100).toFixed(3));//四舍五入,并保留0位小数位
	}
	function getPer(pxnum,max){
		pxnum=getNumValue(pxnum);
		max=getNumValue(max);
		return Number(parseFloat(pxnum/max*100).toFixed(3));//四舍五入,并保留三位小数位
	}
	function myrecord(obj,json){
		for(var i=0;i<json.length;i++){
			var att=json[i].att;
			var max=json[i].max;
			if(obj["p"+att]){
				var suf=getSuffixStyle(obj,att);
				if(suf=="%"){
					obj["per_"+att]=obj["p"+att];
					obj["px_"+att]=getPx(obj["p"+att],max)+"px";
				}else if(suf=="px"){
					obj["px_"+att]=obj["p"+att];
					obj["per_"+att]=getPer(obj["p"+att],max)+"%";
				}
				//if(obj.id=="xxxxx"){alert(obj["p"+att]+":"+att+"===="+obj.id+"::"+max+"===="+obj["per_"+att]+":"+obj["px_"+att]);}
				//obj.style[att]=obj["per_"+att];//obj.style[att]=obj["px_"+att];
			}
		}
	}
}
/*
recordObjsStateLTWH(getId("content"),true,w,h);
recordObjsBrowserLTWH(getId("content"),true,document.documentElement.clientWidth,document.documentElement.clientHeight);
*/
function recordObjsBrowserLTWH(objf,isHaveSelf,bw,bh){
	if(isHaveSelf){
		recordObjBrowserLTWH(objf,bw,bh);
	}
	var divarr=objf.getElementsByTagName("div");
	for(var n=0;n<divarr.length;n++){
		recordObjBrowserLTWH(divarr[n],divarr[n].parentNode.px_b_width,divarr[n].parentNode.px_b_height);
	}
	var imgarr=objf.getElementsByTagName("img");
	for(var m=0;m<imgarr.length;m++){
		recordObjBrowserLTWH(imgarr[m],imgarr[m].parentNode.px_b_width,imgarr[m].parentNode.px_b_height);
	}
}
function recordObjBrowserLTWH(obj,bw,bh){
	if(obj){
		myrecord(obj,[{att:"left",max:bw},{att:"top",max:bh},{att:"width",max:bw},{att:"height",max:bh}]);
	}
	function getPx(pernum,max){
		pernum=getNumValue(pernum);
		max=getNumValue(max);
		return Number(parseFloat(pernum*max/100).toFixed(3));//四舍五入,并保留0位小数位
	}
	function getPer(pxnum,max){
		pxnum=getNumValue(pxnum);
		max=getNumValue(max);
		return Number(parseFloat(pxnum/max*100).toFixed(3));//四舍五入,并保留三位小数位
	}
	function myrecord(obj,json){
		for(var i=0;i<json.length;i++){
			var att=json[i].att;
			var max=json[i].max;
			if(obj["per_"+att]){
				obj["px_b_"+att]=getPx(obj["per_"+att],max)+"px";
				//if(obj.id=="xxxxx"){alert(obj["per_"+att]+":"+att+"===="+obj.id+"::"+max+"===="+obj["px_b_"+att]);}
			}
		}
	}
}
function runEffectImg(obj,offest,endfun,speed){
	var suf=getSuffixStyle(obj,"left");
	obj.style.left=getNumValue(obj.pleft)+getNumValue(offest.left)+suf;
	obj.style.top=getNumValue(obj.ptop)+getNumValue(offest.top)+suf;
	obj.style.width=getNumValue(obj.pwidth)+getNumValue(offest.width)+suf;
	obj.style.height=getNumValue(obj.pheight)+getNumValue(offest.height)+suf;
	if(offest.opacity || offest.opacity==0){
		obj.style.opacity=getNumValue(offest.opacity);
	}else{
		obj.style.opacity=1;
	}
	if(!speed){
		speed={left:10,top:10,width:10,height:10,opacity:10};
	}
	startObjMove(obj,{left:obj.pleft,top:obj.ptop,width:obj.pwidth,height:obj.pheight,opacity:fixLoToNumber(obj.popacity || 1)},endfun,speed);
}
function getZoomOffestImg(obj,json){
	if(!json){
		json={scaleX:0,scaleY:0,opacity:0};
	}
	var numW=getNumValue(obj.pwidth);
	var numH=getNumValue(obj.pheight); 
	var scaleX=json.scaleX;
	var scaleY=json.scaleY;
	var offest={left:numW/2*(1-scaleX),top:numH/2*(1-scaleY),width:numW*scaleX-numW,height:numH*scaleY-numH,opacity:json.opacity};
	return offest;
}
function yoyoEffectImg(obj,json1,json2,speed1,speed2){
	if(!json1){
		json1={left:obj.pleft,top:obj.ptop,width:obj.pwidth,height:obj.pheight,opacity:1};
	}
	if(!json2){
		json2={left:obj.pleft,top:obj.ptop,width:obj.pwidth,height:obj.pheight,opacity:1};
	}
	if(!speed1){
		speed1={left:10,top:10,width:10,height:10,opacity:10};
	}
	if(!speed2){
		speed2={left:10,top:10,width:10,height:10,opacity:10};
	}
	eff1();
	function eff1(){
		startObjMove(obj,json1,eff2,speed1);
	}
	function eff2(obj){
		startObjMove(obj,json2,eff1,speed2);
	}
}
function zoomEffectImg(obj,bejson,tojson,endfun,speed){
	var suf=getSuffixStyle(obj,"left");
	var beoffest=myfun(obj,bejson);
	obj.style.left=getNumValue(beoffest.left)+suf;
	obj.style.top=getNumValue(beoffest.top)+suf;
	obj.style.width=getNumValue(beoffest.width)+suf;
	obj.style.height=getNumValue(beoffest.height)+suf;
	obj.style.opacity=getNumValue(beoffest.opacity);
	var tooffest=myfun(obj,tojson);
	if(!speed){
		speed={left:10,top:10,width:10,height:10,opacity:10};
	}
	startObjMove(obj,tooffest,endfun,speed);
	function myfun(obj,json){
		var numW=getNumValue(obj.pwidth);
		var numH=getNumValue(obj.pheight); 
		var scaleX=json.scaleX;
		var scaleY=json.scaleY;
		return {left:getNumValue(obj.pleft)+numW/2*(1-scaleX),top:getNumValue(obj.ptop)+numH/2*(1-scaleY),width:getNumValue(obj.pwidth)+numW*scaleX-numW,height:getNumValue(obj.pheight)+numH*scaleY-numH,opacity:json.opacity};
	}
}
//例子：
//zoomEffectImg(obj,{scaleX:0.5,scaleY:0.5,opacity:0.5},{scaleX:1,scaleY:1,opacity:1},null,{left:20,top:20,width:20,height:20,opacity:20});
//return getZoomOffestImg(obj,{scaleX:2,scaleY:2,opacity:0});   是runEffectImg的配套方法
//yoyoEffectImg(obj,{left:getNumValue(obj.style.left)+0.781},{left:getNumValue(obj.style.left)-0.781});
//yoyoEffectImg(obj,{top:getNumValue(obj.style.top)+0.498},{top:getNumValue(obj.style.top)-0.498});
//yoyoEffectImg(obj,{opacity:0.5},{opacity:1});

//var numW=getNumValue(obj.style.width);var numH=getNumValue(obj.style.height);var scaleX1=1.05;var scaleY1=1.05;var scaleX2=0.95;var scaleY2=0.95;
//yoyoEffectImg(obj,{left:getNumValue(obj.style.left)+numW/2*(1-scaleX1),top:getNumValue(obj.style.top)+numH/2*(1-scaleY1),width:numW*scaleX1,height:numH*scaleY1},{left:getNumValue(obj.style.left)+numW/2*(1-scaleX2),top:getNumValue(obj.style.top)+numH/2*(1-scaleY2),width:numW*scaleX2,height:numH*scaleY2});

function gotoEffectJumpPage(curjson,gojson){
	if(curjson && gojson){
		var curobj=curjson[0].obj;
		var goobj=gojson[0].obj;
		if(!curjson[3]){
			curjson[3]={left:20,top:20,width:20,height:20,opacity:20};
		}
		if(!gojson[3]){
			gojson[3]={left:20,top:20,width:20,height:20,opacity:20};
		}
		stopObjMoveEffect();
		for(var i=0;i<saveTolF.arr.length;i++){
			var objf=saveTolF.arr[i];
			if(objf==curobj || objf.id==goobj){
			}else{
				hidden(objf);
			}
		}
		for(var attr in curjson[1]){
			curobj.style[attr]=curjson[1][attr];
		}
		for(var attr in gojson[1]){
			goobj.style[attr]=gojson[1][attr];
		}
		startObjMove(curobj,curjson[2],curjson[0].endfun,curjson[3]);
		startObjMove(goobj,gojson[2],gojson[0].endfun,gojson[3]);
		if(curjson[0].beginfun){
			curjson[0].beginfun(curobj);
		}
		if(gojson[0].beginfun){
			gojson[0].beginfun(goobj);
		}
	}
}
//gotoEffectJumpPage([{obj:curobj,endfun:hidden},{top:"0%"},{top:"-100%"}],[{obj:goobj,beginfun:gofn},{top:"100%"},{top:"0%"}]);
//gotoEffectJumpPage([{obj:curobj,endfun:hidden},{top:"0%"},{top:"100%"}],[{obj:goobj,beginfun:gofn},{top:"-100%"},{top:"0%"}]);
function gotoFastJumpPage(objdata,json){
	stopObjMoveEffect();
	var obj=objdata.obj;
	showCurF(obj);
	for(var attr in json){
		obj.style[attr]=json[attr];
	}
	if(objdata.beginfun){
		objdata.beginfun(obj);
	}
}
//gotoFastJumpPage({obj:myobj,beginfun:myfn},{top:myobj.ptop});
function addListenerFastObj(obj,className,clickFun){
	if(obj.killListtener){
		obj.killListtener();
	}
	obj.killListtener=function(){
		obj.removeEventListener('touchstart',touchstart);
		obj.onmousedown=null;
	}
	obj.isHaveListenerClick=true;
	var isHaveTouch=(IsPC())?false:true;
	if(isHaveTouch){
		obj.addEventListener('touchstart',touchstart,false);
	}else{
		obj.style.cursor="pointer";
		obj.onmousedown=touchstart;
	}
	function touchstart(evt){
		evt.preventDefault();
		if(evt.touches){
			obj.satrtXYList=setTouchObjXYList(evt.touches);
		}else{
			obj.satrtXYList=setTouchObjXYList([evt]);
		}
		clickFun(evt,obj);
	}
}
function udlrTouchDevice(obj,upfun,downfun,leftfun,rightfun){
	isTouchDevice(obj,null,touchmove,touchend);
	function touchmove(evt,obj){
		evt.preventDefault();
	}
	function touchend(evt,obj){
		checkudlrmovefun();
		function checkudlrmovefun(){
			var theoneX=obj.satrtXYList[0].x;
			var theoneY=obj.satrtXYList[0].y
			var theotherX=obj.moveXYList[0].x;
			var theotherY=obj.moveXYList[0].y;
			if(Math.abs(theotherY-theoneY)>Math.abs(theotherX-theoneX)){
				if(theotherY-theoneY>100){
					if(upfun){
						upfun(evt,obj);
					};
				}else if(theotherY-theoneY<-100){
					if(downfun){
						downfun(evt,obj);
					}
				}
			}else{
				if(theotherX-theoneX>100){
					if(leftfun){
						leftfun(evt,obj);
					}
				}else if(theotherX-theoneX<-100){
					if(rightfun){
						rightfun(evt,obj);
					}
				}
			}
		}
	}
}
function getParentUrlParam(name) {
     
	strParam = window.location.href;
	if (strParam != null && strParam != '') {
		strParam = '&' + strParam.substring(1,strParam.length);
	}
	
	idx1 = strParam.indexOf(name + "=")
	if (idx1 == -1)	return ""

	idx1 = idx1 + name.length + 1
	idx2 = strParam.indexOf("&", idx1)

	if (idx2 != -1)
		len = idx2 - idx1
	else
		len = strParam.length

	return unescape(strParam.substr(idx1, len));
}