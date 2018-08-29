/*
updated on 20160204
15:00
*/
//********块操作方法********
//get element
function getID(id){	
	return document.getElementById(id);
}
//hide element
function Hide(id){
	getID(id).style.display = "none";
}
//hide element
function Show(id){
	getID(id).style.display = "block";
}
//hied all element
function Hidebyclassname(classname){
	var btn = document.getElementsByClassName(classname);
	for(i=0;i<btn.length;i++){
		btn[i].style.display = "none";
	}
}
//show all element
function Showbyclassname(classname){
	var btn = document.getElementsByClassName(classname);
	for(i=0;i<btn.length;i++){
		btn[i].style.display = "block";
	}
}
//set Listener(id)
function SetListener(id,name,event){
	getID(id).addEventListener(event,name,false);
}
//remove Listener
function RemoveListener(id,name,event){
	getID(id).removeEventListener(event,name,false);
}
//set Listener(classname)
function Setclickbtn(event,name,fun){
	var btn = document.getElementsByClassName(name);
	for(i=0;i<btn.length;i++){
		btn[i].addEventListener(event,fun,false);
	}
}
function Removeclickbtn(event,name,fun){
	var btn = document.getElementsByClassName(name);
	for(i=0;i<btn.length;i++){
		btn[i].removeEventListener(event,fun,false);
	}
}
//set div
function Setdiv(id,num,top,left,width,height){
	var div = getID(id);
	div.style.left = left+"px";
	div.style.top = top+"px";
	div.style.width = width+"px";
	div.style.height = height+"px";
	div.style.position = "absolute";
	div.style.zIndex = num;
}
//set zIndex
function setzindex(id,num){
	getID(id).style.position = "absolute";
	getID(id).style.zIndex = num;
}
//set pic by px(id)
function Setpic(id,name,top,left,width,height){
	var pic = getID(id);
	pic.src = "images/"+name;
	pic.style.top = top+"px";
	pic.style.left = left+"px";
	pic.style.width = width+"px";
	pic.style.height = height+"px";
}
//批量添加图片
function creatpic(left,top,id,src,num){
	for(i=0;i<num;i++){
		var pics = getID(id[i]);
		pics.src = "images/page7/"+src[i]+".png";
		pics.style.left = left[i]+"px";
		pics.style.top = top[i]+"px";
	}
}
function creatfb(left,top,id,src,num){
	for(i=0;i<num;i++){
		var pics = getID(id[i]);
		pics.src = "images/page7/"+src[i]+".png";
		pics.style.left = left[i]+"px";
		pics.style.top = top[i]+"px";
		pics.style.display = "none";
	}
}
var audio1 = new Audio,
audio2 = new Audio,
audio3 = new Audio;
function loadaud(){
	audio1.src = "images/abtnclick.mp3";
	audio2.src = "images/aright.mp3";
	audio3.src = "images/awrong.mp3";
}
function Setchoice(m,n,id,a1,a2,sel,ans,fn,strr1,strr2){
	loadaud();
	for(i=0;i<m;i++){
		var str = id+i;
		SetListener(str,clickn,"click");
	}
	function clickn(){
		if(audio1){
			audio1.currentTime = 0;
			audio1.play();
		}
		else{
			console.log("2");
		}
		var str = this.id;
		var num = parseInt(str.substring(1));
		var s1 = id+num;
		var s2 = "submit"+n;
		var num1 = num+a1;
		var num2 = num+a2;
		var ss1 = "single";
		var ss3 = "panduan";
		if(sel[num]==0){
			if(strr2==ss3){
				for(i=0;i<m;i++){
					var ss2 = id+i;
					getID(ss2).src = "images/page7/x"+i+".png";
				}
				getID(s1).src = "images/page7/x"+num2+".png";
				sel = [0,0];
				sel[num] = 1;
			}
			else{
				if(strr1==ss1){//danxuan
					for(i=0;i<m;i++){
						var ss2 = id+i;
						getID(ss2).src = "images/page7/"+id+i+".png";
					}
					getID(s1).src = "images/page7/"+id+num2+".png";
					sel = [0,0,0,0];
					sel[num] = 1;
				}
				else{//duoxuan
					getID(s1).src = "images/page7/"+id+num2+".png";
					sel[num] = 1;
				}	
			}
		}
		else{
			if(strr2==ss3){
				getID(s1).src = "images/page7/x"+num1+".png";
				sel[num] = 0;
			}
			else{
				getID(s1).src = "images/page7/"+id+num1+".png";
				sel[num] = 0;
			}
		}
		if(strr2==ss3){
			if(sel.toString()!==none2.toString()){
				getID(s2).style.display = "block";
				SetListener(s2,checkans,"click");
			}
			else{
				getID(s2).style.display = "none";
			}
		}
		else{
			if(sel.toString()!==none1.toString()){
				getID(s2).style.display = "block";
				SetListener(s2,checkans,"click");
			}
			else{
				getID(s2).style.display = "none";
			}
		}
		
	}
	function checkans(){
		var s5 = "jixu"+n;
		for(i=0;i<m;i++){
			var str = id+i;
			RemoveListener(str,clickn,"click");
		}
		var s2 = "submit"+n;
		Hide(s2);Show(s5);
		SetListener(s5,jixufun,"click");
		RemoveListener(s2,checkans,"click");
		var s3 = "fbr"+n;
		var s4 = "fbw"+n;
		if(sel.toString()==ans.toString()){
			getID(s3).style.display = "block";
			//right = right+1;
			audio2.play();
		}
		else{
			getID(s4).style.display = "block";
			audio3.play();
		}
	}
	function jixufun(){
		if(audio1){
			audio1.currentTime = 0;
			audio1.play();
		}
		else{
			console.log("2");
		}
		var s5 = "jixu"+n;
		RemoveListener(s5,jixufun,"click");
		fn();
	}
}
//
function IsPC(){  
   var userAgentInfo = navigator.userAgent;  
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
   var flag = true;  
   for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return flag;  
}  

