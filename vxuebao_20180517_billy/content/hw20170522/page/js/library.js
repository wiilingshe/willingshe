//@Jasper.Leung
//*******************************基础JS库*******************************
function setImgPer(l,t,w,h,id,flag){
	var ID = '#'+id;
	var height = $(window).height();
	var width = $(window).width();
	var nh = h/H*100;
	var nw = w/W*100;
	var nl = l/W*100;
	var nt = t/H*100;
	var seth =nh+'%';
	var setw =nw+'%';
	if(flag=='l'){
		nl = nl+100;
		var setl = nl+'%';
		var sett = nt+'%';
		//console.log(nl+"l")
	}
	else if(flag=='r'){
		nl = nl-100;
		var setl = nl+'%';
		var sett = nt+'%';
		//console.log(nl+"r")
	}
	else if(flag=='u'){
		nt = nt+70;
		var setl = nl+'%';
		var sett = nt+'%';
		//console.log(nt)
	}
	else if(flag=='d'){
		nt = nt-70;
		var setl = nl+'%';
		var sett = nt+'%';
	}
	else{
		var setl = nl+'%';
		var sett = nt+'%';
	}
	
	$(ID).css('height',seth);
	$(ID).css('width',setw);
	$(ID).css('left',setl);
	$(ID).css('top',sett);
	$(ID).css('position','absolute');
	$(ID).css('opacity','0');

}

function setLeftMove(wait,id,at1,at2,opacity){
	var ID = '#'+id;
	var duration1 = 400;
	var duration2 = 100;
	var next = wait+duration1;
	$(ID).delay(wait).animate({left:at1,opacity:'1'},duration1);
	$(ID).delay(0).animate({left:at2},duration2);
}

function setUpMove(wait,id,at1,at2,opacity){
	var ID = '#'+id;
	var duration1 = 400;
	var duration2 = 100;
	var next = wait+duration1;
	$(ID).delay(wait).animate({top:at1,opacity:'1'},duration1);
	$(ID).delay(0).animate({top:at2},duration2);
}

	
//===============================服务器================================


// 返回按钮
function subMyClickNav(num){
	window.parent.postMessage("subClickNav#"+num,"*");
}
// 继续按钮
function setMyCompleted(obj){
	window.parent.postMessage("setCompleted#"+obj,"*");
}
// 上传成绩
function updataMyScore(num1,num2){
	window.parent.postMessage("updataScore#"+num1+"#"+num2,"*");
}

function totalLoPage(num){
	window.parent.postMessage("totalPage#"+num,"*");
}
function nowLoPage(num){
	window.parent.postMessage("nowPage#"+num,"*");
}



// ===============================封装函数==============================


// 修正没有行间样式,同时用于叠加处理
function fixNullStyle(style)
{
	if(!style)
	{
		style=0;
	};
	return parseInt(style);
};

//===============================课件总体设置==============================

function IsPC(){  
		   var userAgentInfo = navigator.userAgent;  
		   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
		   var flag = true;  
		   for (var v = 0; v < Agents.length; v++) {  
			   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
		   }  
		   return flag;  
}
function setMusicLoop(id){
	var music = document.getElementById(id)
	music.onended = function(){
		music.currentTime = 0;
		music.play();
	}
}
///////////////////////
var theone = 0;
var theother = 0;
function nextPage(last,next){
	document.getElementById('window').addEventListener(start,touchstart,false);
	document.getElementById('window').addEventListener(move,touchmove,false);
	document.getElementById('window').addEventListener(end,touchend,false);
	function touchstart(event){
		event.preventDefault();  //阻止出现滚动条
		var event = event.type == 'touchstart' ? event.touches[0] : event;
		theone = event.clientY;
	}
	function touchmove(event){
		event.preventDefault();  //阻止出现滚动条
		var event = event.type == 'touchmove' ? event.changedTouches[0] : event;
		var they = event.clientY;
		theother=they;
		var distance = 0;
		if(theother>theone){
			distance = theother - theone;
			//var windowtop = $('#window').css('top');
			var movetop = distance+'px';
			$('#window').css('top',movetop);
			
		}else if(theother<theone){
			distance = theone-theother;
			var movetop = -distance+'px';
			$('#window').css('top',movetop);
		}
		else{}
	}
	function touchend(event){
		event.preventDefault(); 
		var event = event.type == 'touchend' ? event.changedTouches[0] : event;
		var they = event.clientY;
		theother=they;
		var distance = 0;
		if(theother>theone){
			distance = theother - theone;
			if(distance>50){
				nextpage(last);//shangyiye
				if(last==0){
					$('#window').css('top','0px');
				}
			}
			else{
				$('#window').css('top','0px');
			}
		}else if(theother<theone){
			distance = theone-theother;
			if(distance>50){
				nextpage(next);//xiayiye
				if(next==-1){
					$('#window').css('top','0px');
				}
			}
			else{
				$('#window').css('top','0px');
			}
		}
		else{}
	}
	function nextpage(n){
		if(n>0){
			var nexturl='page'+n+'.html';
			setTimeout(function(){
				window.location = nexturl;
			},100);	
		}
		else{}
		//console.log(n)
	}
}

//设置移动端上下滑动切换页面文件（设置最外层包裹DIV的id为"window"）
function touchSwitchSetting(lastpage,nextpage){
	var isHaveTouch=(IsPC())?false:true;
	if(isHaveTouch){
		getId("window").addEventListener('touchstart',diytouchstart);
		getId("window").addEventListener('touchend',diytouchend);
	}else{
		getId("window").onmousedown=cbgmouseDown;
	}
	function cbgmouseDown(e){
		//alert(e.currentTarget.id+":"+e.clientY);
		getId("window").curYMouse=e.clientY;
		getId("window").onmousemove=cbgmouseMove;
		getId("window").onmouseup=cbgmouseUp;
	}
	function cbgmouseMove(e){
		e.preventDefault();
	}
	function cbgmouseUp(e){
		var _ymouse=e.clientY;
		getId("window").onmousemove=null;
		getId("window").onmouseup=null;
		if (getId("window").curYMouse>_ymouse && getId("window").curYMouse-_ymouse>=50) {
			if (nextpage>0) {
				var nexturl='page'+nextpage+'.html';
		    	setTimeout(function(){
		    		window.location = nexturl;
		    	},100);				
			}
		} else if (getId("window").curYMouse<_ymouse  && _ymouse-getId("window").curYMouse>=50) {
			if (lastpage>=0) {
				if (lastpage==0) {
					var lasturl='index.html'
				}
				else{
					var lasturl='page'+lastpage+'.html';
				}
		    	setTimeout(function(){
		    		window.location = lasturl;
		    	},100);				
			}
		}
	}

	
	function diytouchstart(ev){
		//ev.preventDefault(); 
		theone=ev.touches[0].clientY;//触摸时高度
	}

	function diytouchend(ev){
		//ev.preventDefault();
		var touch = ev.changedTouches[0];
	    var y = touch.clientY;
		theother=y;//松手后高度
		//滑回上一页
		if (lastpage>=0) {
			if(theother>theone){
				if (lastpage==0){
					var lasturl='index.html'
				}
				else{
					var lasturl='page'+lastpage+'.html';
				}
				
		    	setTimeout(function(){
		    		window.location = lasturl;
		    	},100);
			}			
		}

		//滑到下一页
		if (nextpage>0) {
			if(theother<theone){     //上滑手势
				var nexturl='page'+nextpage+'.html';
		    	setTimeout(function(){
		    		window.location = nexturl;
		    	},100);
			}
		}
	}
}

//设置标签默认状态
function initStyle(){
	var imgList=document.getElementsByTagName("img");
	for (var i=0;i<imgList.length;i++) {
		if(!imgList[i].src){
			imgList[i].style.display="none";
		}
		if(!imgList[i].style.position){
			imgList[i].style.position="absolute";
		}		
	}
	var divList=document.getElementsByTagName("div");
	for (var j=0;j<divList.length;j++) {
		if(!divList[j].style.position){
			divList[j].style.position="absolute";
		}
	}
}


//===============================课件元素操作==============================


// tolF_arr=[getId('F1'),getId('F2'),getId('F3')]
function saveTolF()
{	
	var curArr=[];
	for(var i=0; i<arguments.length;i++)
	{	
		curArr[i]=arguments[i];
	};
	return saveTolF.arr=curArr;
};


// tolClick_arr=[getId('c1'),getId('c2'),getId('c3')]
function savaClickO()
{	
	var curArr=[];
	for(var i=0; i<arguments.length;i++)
	{	
		curArr[i]=arguments[i];
		// curArr[i].isActive='false';
	};
	return savaClickO.arr=curArr;
};


// RspImg_arr=[getId('i1'),getId('i2'),getId('i3')]
function savaRspImg()
{	
	var curArr=[];
	for(var i=0; i<arguments.length;i++)
	{	
		curArr[i]=arguments[i];
	};
	return savaRspImg.arr=curArr;
};

// 插入反馈图片和设置位置
function rspImg(obj,url,Json)
{
	obj.scr=url;
	if(Json)
	{
		for(p in Json)
		{
			obj.style.p=Json[p];
		};
	};
};

//更换图片
function switchImg(obj,imgUrl)
{
	obj.src=imgUrl;
};

// 进行图层高低控制
var bestTop=1;
function showCurF(bestTopObj)
{	
	bestTopObj.style.zIndex=bestTop;
	bestTop++;
};

// 显示和隐藏
function showId(id)
{
	
	getId(id).style.display='block';
}

function hideId(id)
{
	getId(id).style.display='none';
}

function showList(showlist)
{
	for (var i = 0; i < showlist.length; i++) {
		showId(showlist[i]);
	}
}

function hideList(hidelist)
{
	for (var i = 0; i < hidelist.length; i++) {
		hideId(hidelist[i]);
	}
}

// 播放视频
// className值：full||center
function playVid(className,url,fn)
{	
	showCurF(getId('F2'));
	getId('F2').innerHTML="<video id='videoMP4' class="+className+" autoplay"+" controls><source src="+url+".ogv type='video/ogg'><source src="+url+".mp4 type='video/mp4'></video>"
	getId('videoMP4').onended=function()
	{
		getId('F2').innerHTML='';
		fn();
	}

};

// 播放声音
var audio=new Audio;
function playAud(url,fn)
{	
	audio.src='../media/audio/'+url+'.mp3';
	audio.play();
	if(fn)
	{	
		audio.addEventListener('ended',fn);
	};
};


// ****************图片预加载**************
function loadImgInit()
{	
	var imgPreList=arguments;
	var imgAssetList=[];

	function startLoad()
	{	
		if(imgAssetList.length<imgPreList.length)
		{
			var tmpImage=new Image();
			// 便于检测
			tmpImage.imgName=imgPreList[imgAssetList.length];
			tmpImage.imgId=imgAssetList.length;
			// 存储
			imgAssetList[imgAssetList.length]=tmpImage;
			tmpImage.onload=curImageLoadComplete;
			tmpImage.src=imgPreList[imgAssetList.length-1];
		};
	};startLoad();

	function curImageLoadComplete()
	{	
		// 调用ui
		loadingbar();
		// 提前显示底部内容
		if(imgAssetList.length==1)
		{
			for(var i=1;i<saveTolF.arr.length;i++)
			{
				saveTolF.arr[i].style.display='block';
			};
		};
		// 所有图片预加载完
		if(imgAssetList.length<imgPreList.length)
		{
			startLoad();
		}
		else
		{
			//UI消失
			// alert(saveTolF.arr[0].id);
			saveTolF.arr[0].style.display='none';
			// 图片加载完毕api接口;
			loadImgInit.end();
		};

	
	};
		

	function loadingbar()
	{	
		// 公用变量
		var Com1=Math.round(1/imgPreList.length*100);
		// 对象**进度条
		var loadingbar=document.getElementById('loadingbar');
			loadingbar.style.width=fixNullStyle(loadingbar.style.width)+Com1+'%';

		// 对象**进度百分数
		var loadP=document.getElementById('loadP');
			//疑问？
			loadP.innerHTML=parseInt(loadP.innerHTML)+Com1+'%';
			if(parseInt(loadP.innerHTML)>100)
			{
				loadP.innerHTML='100%';
			};
	};
};


 //设置或取消点击事件的鼠标样式
function cursorSetting(obj,isOn)
{
    obj.onmouseover=function(){
  	  if(isOn===1){
		  this.style.cursor='pointer';      		  
	  }
	  else if(isOn===0){
		  this.style.cursor='auto';      		  
	  }        		
    };    	        	
}; 


//课件每个大章节的结束函数，最后注意调用
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

//===============================课件部件动态效果==============================
//持续闪烁（最终设置）
	function keepBlinking(xid,xspeed){
		//控制淡入速度:根据速度设置循环执行时间间隔
		if(xspeed>0 && xspeed<11){
			var xtime=(11-xspeed)*100;
		}
		else{
			var xtime=800;//默认设置中速
		}
		setTimeout("blink('"+xid+"',"+xtime+")", xtime);

	
	}
//持续闪烁底层
	function blink(xid,xtime){
		var xobj=getId(xid);
		xobj.style.visibility=(xobj.style.visibility=="hidden")? "visible" : "hidden";
		setTimeout("blink('"+xid+"',"+xtime+")", xtime);

	}


//处理CSS3新属性兼容性
function compatSetting(xnode,xatti,xvalue)
{
	var xnewList=compatibleList(xatti);
	for (var i = 0; i < xnewList.length; i++) {
		xnode.style[xnewList[i]]=xvalue;
	}

	function compatibleList(xatti)
	{
		var newList=[];
		//适配IE、Firefox、Chrome、Safari、Opera属性前缀
		var baseList=['','-ms-','-moz-','-webkit-','-o-'];
		for (var i = 0; i < baseList.length; i++) {
			newList[i]=baseList[i]+xatti;
		}
		return newList;
	}	
}

//定义某节点要配置过渡动画的属性
function trans_Setting(xnode,xatti,xsecond)
{
	compatSetting(xnode,'transition',xatti+' '+xsecond+'s ease-in-out');
}


//自动获取图片标签的宽高并百分比化赋予
function getImagePercentWH(imgNode,pageWidth,pageHeight){
	var ximg=new Image();
	ximg.src=imgNode.src;
	ximg.addEventListener('load',function(){
		var xwidth=parseFloat(ximg.width)/pageWidth;
		imgNode.style.width=xwidth.toFixed(4)*100+'%';        //toFixed四舍五入为指定小数位的
		var xheight=parseFloat(ximg.height)/pageHeight;
		imgNode.style.height=xheight.toFixed(4)*100+'%';
	});
}

//将标签宽高px百分比化
function initPercent(xnode,pageWidth,pageHeight)
{
	getImagePercentWH(xnode,pageWidth,pageHeight);

	if(xnode.style.left){
		var xleft=parseFloat(xnode.style.left)/pageWidth;
		xnode.style.left=xleft.toFixed(4)*100+'%';
	}

	if(xnode.style.top){
		var xtop=parseFloat(xnode.style.top)/pageHeight;
		xnode.style.top=xtop.toFixed(4)*100+'%';
	}	
}


//淡出过渡函数（最终设置）始
	function fadeOutMaker(xid,fromwhere,xspan,xspeed,fnEnd){
		//获取对象最终状态（字符类型）
		var leftString=getId(xid).style.left;
		var topString=getId(xid).style.top;
		// var widthString=getId(xid).style.width;
		// var heightString=getId(xid).style.height;
		var opacityString=getId(xid).style.opacity;
		
		//除去px转换为浮点数
		var leftNum=parseInt(leftString.slice(0,-2));            //.slice()可用于str和arr，抽取字符串倒数2个
		var topNum=parseInt(topString.slice(0,-2));
		//alert('现在的leftNum:'+leftNum)
		
		// var widthNum=parseInt(widthString.slice(0,-2));
		// var heightNum=parseInt(heightString.slice(0,-2));
		var opacityNum=parseFloat(opacityString);
		
		//调节自适应宽高
		getImagePercentWH(getId(xid),720,1280);
		// getId(xid).style.width=parseFloat(widthNum/720*100).toFixed(2)+'%';
		// getId(xid).style.height=parseFloat(heightNum/1280*100).toFixed(2)+'%';

		//控制淡入距离:设置始末位置差距
		if(xspan>0){
			xspan=xspan*100;
		}
		else{
			xspan=200;//默认设置中距离
		}		

		var endstatus=new Object();//对象的最终状态
		
		//控制淡入方向（从哪里进来）:根据方向设置始末状态
		switch(fromwhere)
		{
			case 'fromTop':
				getId(xid).style.top=parseInt((topNum-xspan)/1280*100)+'%';    //设置初始位置，以备fadeout获得obj此时的属性
				endstatus.top=topNum;                                          //将最终位置存储于endstatus对象中，以备fadeOut使用
				getId(xid).style.opacity=0;
				endstatus.opacity=opacityNum;
				break;
			case 'fromBottom':
				getId(xid).style.top=parseInt((topNum+xspan)/1280*100)+'%';
				endstatus.top=topNum;
				getId(xid).style.opacity=0;
				endstatus.opacity=opacityNum;
				break;
			case 'fromLeft':
				getId(xid).style.left=parseInt((leftNum-xspan)/720*100)+'%';
				endstatus.left=leftNum;
				getId(xid).style.opacity=0;
				endstatus.opacity=opacityNum;		
				break;
			case 'fromRight':
				getId(xid).style.left=parseInt((leftNum+xspan)/720*100)+'%';
				//alert('加了xspan的1:'+parseInt((leftNum+xspan)/720*100))
				//alert('加了xspan的2:'+getId(xid).style.left)
				endstatus.left=leftNum;
				getId(xid).style.opacity=0;
				endstatus.opacity=opacityNum;		
				break;
			default:
				break;
		}

		//控制淡入速度:根据速度设置循环执行时间间隔
		if(xspeed>0 && xspeed<6){
			var xtime=(6-xspeed)*10;
		}else{
			var xtime=30;//默认设置中速
		}
				
		if(getId(xid)!=null){ 
			showId(xid);
			fadeOut(xid,endstatus,xtime,leftNum,topNum,fnEnd);
		}

		//淡出过渡底层函数
		function fadeOut(xid, json, xtime, leftNum, topNum, fnEnd){
		    var obj=getId(xid);
		    clearInterval(obj.timer);
		    obj.timer=setInterval(function(){
		        var stopit=true;   
		   
		        for(var attr in json){
		            
		            if(attr=='opacity'){
		                statusNow=Math.round(parseFloat(getStyle(obj, attr))*100);
		            }else{
		                statusNow=parseInt(getStyle(obj, attr));
		            }
		            
		            var speed=(json[attr]-statusNow)/6;//变化速度
		            speed=speed>0?Math.ceil(speed):Math.floor(speed);
		            
		            if(statusNow!=json[attr]){
		            	stopit=false;
		            }
		                	            
		            if(attr=='opacity'){
		                obj.style.filter='alpha(opacity:'+(statusNow+speed)+')';//filter?
		                obj.style.opacity=(statusNow+speed)/100;//opacity?
		            }else{
		                obj.style[attr]=statusNow+speed+'px';
		            }
		        }
		        
		        if(stopit){
		            clearInterval(obj.timer);
		            obj.style.left=parseFloat(leftNum/720*100).toFixed(2)+'%';
		            obj.style.top=parseFloat(topNum/1280*100).toFixed(2)+'%';          
		            if(fnEnd){
		            	fnEnd();
		            }
		        }
		    }, xtime);
		}

	}
	
	
//淡出过渡函数（最终设置）末
//===============================DOM节点操作==============================

// 获取Id;
function getId(o)
{
	return document.getElementById(o);
};


//通过class获取对应元素，context指搜索开始的元素节点，className指需要选取的class值
function getClass(className,context) {
	var context = context || document;//如果context为空，则全文档遍历
    if (context.getElementsByClassName) {//判断浏览器是否支持getElementsByClassName，如果支持就直接的用  
        return context.getElementsByClassName(className);
    }
    else {    //当浏览器不支持getElementsByClassName的时候（IE不支持）
        var tagname = context.getElementsByTagName('*');  //在context下遍历元素
        var tagnameAll = [];     //这个数组用于存储所有符合条件的元素
        for (var i = 0; i < tagname.length; i++) {     //遍历获得的元素
            if (hasClass(tagname[i],className)) {     //如果获得的元素中的class的值等于指定的类名，就赋值给tagnameAll
                tagnameAll[tagnameAll.length] = tagname[i];
            }
        }
        return tagnameAll;
    }

    //判断元素class是否符合所需class
	function hasClass(node,className){
		var classNames = node.className.split(/\s+/);
		for(var i = 0; i < classNames.length; i++){
			if(classNames[i] == className){
				return true;
			}
		}
		return false;
	}

}


//根据特定属性值获取节点
function getAttr(tagname,attr,attrvalue,context){
	var context=context || document;
	var prenodes=context.getElementsByTagName(tagname);
	var finalnodes=[];
	for (var i = 0; i < prenodes.length; i++) {
		if(prenodes[i].getAttribute(attr)==attrvalue){
			finalnodes[finalnodes.length]=prenodes[i];
		}
	}
	return finalnodes;
}


//根据已知元素对数组成员进行删除

Array.prototype.indexOf = function(val) {              
    for (var i = 0; i < this.length; i++) {  //获取已知元素在数组中的索引
        if (this[i] == val) return i;  
    }  
    return -1;  
}; 

Array.prototype.remove = function(val) {  //根据索引在数组中删除元素
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
}; 

//判断数组中是否包含特定元素
Array.prototype.isMadeupOf=function(val){
	for (var i = 0; i < this.length; i++) {
		if(this[i]==val){
			return true;
		}
	}
	return false;

};


//判断页面对象是否已被点击
// function isClicked(obj){
	

// }



//为一个节点插入子节点（以字符串形式）
 function addNewChild(obj,string)
 {
   obj.innerHTML=obj.innerHTML+string;
 };

//通过id与属性名获取对象特定属性值
function getStyle(obj, porperty) {//currentStyle?
    if (obj.currentStyle) {
        return obj.currentStyle[porperty];
    } else {
        return getComputedStyle(obj, false)[porperty];//getComputedStyle?
    }
}



