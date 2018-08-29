window.addEventListener("message",messageHandler,true);
function messageHandler(e){
	var dataStr=e.data;
	var list=dataStr.split("#");
	if(list[0]=="Content"){
		//clickQuit();
		alert("ok")
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
function v(objOGV,objMP4,funObj,thx,thy)
{
	if(thx==undefined||thx=="undefined"||thx==""||thx==NaN||thx=="NaN"||thx=="Null"||thx==null){thx=1256;}
	if(thy==undefined||thy=="undefined"||thy==""||thy==NaN||thy=="NaN"||thy=="Null"||thy==null){thy=647;}
	return "<video width='"+thx+"' height='"+thy+"' controls='controls' autoplay='autoplay' onended = '"+funObj+"' id='videoMP4' autobuffer='true'><source src='"+objOGV+"' type='video/ogg'><source src='"+objMP4+"' type='video/mp4'>Your browser does not support the video tag.</video>"
	
}
function v2(objOGV,objMP4,funObj,thx,thy)
{
	if(thx==undefined||thx=="undefined"||thx==""||thx==NaN||thx=="NaN"||thx=="Null"||thx==null){thx=1256;}
	if(thy==undefined||thy=="undefined"||thy==""||thy==NaN||thy=="NaN"||thy=="Null"||thy==null){thy=647;}
	return "<video width='"+thx+"' height='"+thy+"' controls='controls' onended = '"+funObj+"' id='videoMP4' autobuffer='true'><source src='"+objOGV+"' type='video/ogg'><source src='"+objMP4+"' type='video/mp4'>Your browser does not support the video tag.</video>"
	
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
		case "s":
		if(TempObj.src.slice(-9) == objC.slice(-9)){return true; }//�ر�����
	}
	return false;
}
var MingCorseSound=new Audio();
function s(objMP3,funObj)
{
if(objMP3){MingCorseSound.src=objMP3;}else{MingCorseSound.src="";}
if(MingCorseSound.currentTime>0){MingCorseSound.currentTime=0;};
MingCorseSound.play();
if(funObj){MingCorseSound.addEventListener("ended",function(){funObj})}
//tmpSound.addEventListener("play", sound.playFun);
//tmpSound.addEventListener("timeupdate", sound.timeupdateFun);
}
//=========================================����ʹ�ó���====================================
function setMyCompleted(obj){window.parent.postMessage("setCompleted#"+obj,"*");
}
function totalLoPage(num){window.parent.postMessage("totalPage#"+num,"*");
}
function nowLoPage(num){window.parent.postMessage("nowPage#"+num,"*");
}
//===========================================��Ƶʹ�ó���==================================
function VideoShow(ObjV,objFun){
afc("myVideo","i",v("video/"+ObjV+".ogv","video/"+ObjV+".mp4",objFun,"",""));
afc("myVideo","d","block");
}
function VideoHide(){
afc("myVideo","d","none");
afc("myVideo","i","");
}



//======================��ҳ=======================================================
function stageSetting(){
		
		var curW=720;
		var curH=1134;
		
		var scaleX=document.documentElement.clientWidth/curW;
		var scaleY=document.documentElement.clientHeight/curH;
					
		var scaleXY=Math.min(scaleX,scaleY);
		scaleX=scaleXY;
		scaleY=scaleXY;
		var widthNum=curW*scaleX;
		var heightNum=curH*scaleY;
		var _leftNum=(document.documentElement.clientWidth-widthNum)/2;
		var _topNum=(document.documentElement.clientHeight-heightNum)/2;
		if(_leftNum<0){
			_leftNum=0
		}
		if(_topNum<0){
			_topNum=0
		}
		var matrixStr="matrix("+scaleX+",0,0,"+scaleY+",0,0)";
		var ContentDiv=document.getElementById("window");
		ContentDiv.style.left=_leftNum+"px";
		ContentDiv.style.top=_topNum+"px";
		ContentDiv.style.transform=matrixStr;
		ContentDiv.style.msTransform=matrixStr;/* IE 9 */
		ContentDiv.style.MozTransform=matrixStr;/* Firefox */
		ContentDiv.style.webkitTransform=matrixStr;/* Safari Chrome */
		ContentDiv.style.oTransform=matrixStr;/* Opera */
	}



//media
function createVideo(boxId,videoId,src){
	getId(boxId).innerHTML = '<video controls="controls" id='+videoId+' preload="auto" style="width:100%; height:100%"><source src="'+src+'" type="video/mp4" /></video>' 
	getId(videoId).play();	
}
function videoEnd(boxId,videoId,fn){
	getId(videoId).addEventListener('ended',function(){
		getId(boxId).innerHTML = '';
		if(fn){
			fn();
		}
	},false);
}


//center
function centerObj(obj){
	var w = document.body.clientWidth || document.documentElement.clientWidth;
	var h = document.body.clientHeight || document.documentElement.clientHeight;
	//alert(typeof(w))
	var objw = obj.offsetWidth;
	var objh = obj.offsetHeight;
	obj.style.position ="absolute";
	obj.style.left = (w - objw)/2+'px';
	obj.style.top = (h - objh)/2+'px';
}


//��������
function sceneAction(actionList,ifInfinity){
	var timerList=[];//��ʱ���ռ�
	var scenePlayed=0;//��ִ�����ϵ�ѭ������
	var actOrder=0;//��������ִ�е�������
	
	singleAction(actionList);

	//�����ڵݹ���
	function singleAction(actionList){
		if (actOrder==actionList.length) {
			scenePlayed++;
			//��ѭ������ѭ�������Ѵﵽ������ѭ��
			if (ifInfinity===false || scenePlayed===ifInfinity) {
				//��ʱ��ȫ��
				for (var i = 0; i < timerList.length; i++) {
					clearTimeout(timerList[i]);	
				}
				return 1;
			}
			else {
				// ����ѭ����ѭ������δ�ﵽ�������ص����п�ͷ
				actOrder=0;
				singleAction(actionList);
			}
		}
		else{
			actionList[actOrder][0]();
			timerList[actOrder]=setTimeout(function(){
				singleAction(actionList);
			},actionList[actOrder++][1]*1000);
		}
	}
}









