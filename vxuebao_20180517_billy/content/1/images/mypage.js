function fn1(){
	curFpage=1;
	var preflag="f1_";
	var fnobj=getId("F1");
	show(fnobj);
	killObjs(fnobj,false,true,true);
	shObjs(fnobj,false,false,false);
	showbg();
	function showbg(){
		var obj=getId(preflag+"renbg");
		showrenbg();
		obj.timerout1=setTimeout(showren,400*1);
		obj.timerout2=setTimeout(showt,400*2);
		obj.timerout3=setTimeout(showpopobg,400*3);
		obj.timerout4=setTimeout(showteacher,400*4);
		obj.timerout5=setTimeout(showpopot1,400*5);
		obj.timerout6=setTimeout(showgobtn,400*6);
	}
	function showrenbg(){
		var obj=getId(preflag+"renbg");
		show(obj);
		var offest={top:getNumValue(obj.pheight),height:-getNumValue(obj.pheight),opacity:0};
		runEffectImg(obj,offest);
	}
	function showren(){
		var obj=getId(preflag+"ren");
		show(obj);
		var offest={top:getNumValue(obj.pheight),opacity:0};
		runEffectImg(obj,offest);
		var obj=getId(preflag+"star1");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectStarWHImg);
	}
	function showt(){
		var obj=getId(preflag+"t");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectWHImg);
		var obj=getId(preflag+"star2");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectStarWHImg);
	}
	function showpopobg(){
		var obj=getId(preflag+"popobg");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),null);
		var obj=getId(preflag+"star3");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectStarWHImg);
	}
	function showteacher(){
		var obj=getId(preflag+"teacher");
		show(obj);
		var offest={left:getNumValue(obj.pwidth),opacity:0};
		runEffectImg(obj,offest);
		var obj=getId(preflag+"star4");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectStarWHImg);
	}
	function showpopot1(){
		var obj=getId(preflag+"popot1");
		show(obj);
		var offest={left:getNumValue(obj.pwidth),opacity:0};
		runEffectImg(obj,offest,null);
		var obj=getId(preflag+"star5");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectStarWHImg);
	}
	function showgobtn(){
		var obj=getId(preflag+"gobtn");
		show(obj);
		runEffectImg(obj,getZoom1OffestImg(obj),null);
		var obj=getId(preflag+"bgmbtn");
		show(obj);
		addListenerObj(obj,"",objClick);
		function objClick(e){
			removeListenerObj(obj);
			bgm1Click();
			gotoEffectJumpPage([{obj:getId("F1"),endfun:hidden},{top:"0%"},{top:"-100%"}],[{obj:getId("F2"),beginfun:fn2},{top:"100%"},{top:"0%"}]);
		}
	}
	function yoyoEffectStarWHImg(obj){
		var scaW=getNumValue(obj.pwidth);
		var scaH=getNumValue(obj.pheight);
		eff1();
		function eff1(){
			var scaX=1.2;
			var scaY=1.2;
			var endPoint={left:getNumValue(obj.pleft)+scaW/2*(1-scaX),top:getNumValue(obj.ptop)+scaH/2*(1-scaY),width:scaW*scaX,height:scaH*scaY};
			startObjMove(obj,endPoint,eff2,{left:10,top:10,width:10,height:10});
		}
		function eff2(obj){
			var scaX=0.8;
			var scaY=0.8;
			var endPoint={left:getNumValue(obj.pleft)+scaW/2*(1-scaX),top:getNumValue(obj.ptop)+scaH/2*(1-scaY),width:scaW*scaX,height:scaH*scaY};
			startObjMove(obj,endPoint,eff1,{left:10,top:10,width:10,height:10});
		}
	}
}
function fn2(){
	curFpage=2;
	var preflag="f2_";
	var fnobj=getId("F2");
	show(fnobj);
	killObjs(fnobj,false,true,true);
	shObjs(fnobj,false,false,false);
	showbg();
	function showbg(){
		var obj=getId(preflag+"tbg");
		showtbg();
		obj.timerout1=setTimeout(showt,400*1);
		obj.timerout2=setTimeout(showt1,400*2);
		obj.timerout3=setTimeout(showt2,400*3);
		obj.timerout4=setTimeout(t2r1,1300);
		obj.timerout5=setTimeout(t2r2,1360);
		obj.timerout6=setTimeout(t2r3,1420);
		obj.timerout7=setTimeout(showt3,400*4);
	}
	function showtbg(){
		var obj=getId(preflag+"tbg");
		show(obj);
		var offest={top:getNumValue(obj.pheight),opacity:0};
		runEffectImg(obj,offest);
	}
	function showt(){
		var obj=getId(preflag+"t");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectWHImg);
	}
	function showt1(){
		var obj=getId(preflag+"t1");
		show(obj);
		var offest={top:getNumValue(obj.pheight),opacity:0};
		runEffectImg(obj,offest,null);
	}
	function showt2(){
		var obj=getId(preflag+"t2");
		show(obj);
		var offest={left:getNumValue(obj.pwidth),opacity:0};
		runEffectImg(obj,offest,null);
	}
	function t2r1(){
		var obj=getId(preflag+"t2r1");
		show(obj);
		var offest={opacity:0};
		runEffectImg(obj,getZoomOffestImg(obj),null);
	}
	function t2r2(){
		var obj=getId(preflag+"t2r2");
		show(obj);
		var offest={opacity:0};
		runEffectImg(obj,getZoomOffestImg(obj),null);
	}
	function t2r3(){
		var obj=getId(preflag+"t2r3");
		show(obj);
		var offest={opacity:0};
		runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectTopImg);
	}
	function showt3(){
		var obj=getId(preflag+"t3");
		show(obj);
		runEffectImg(obj,getZoom1OffestImg(obj),yoyoEffectWHImg);
		showtgobtn();
	}
	function showtgobtn(){
		var obj=getId(preflag+"gobtn");
		show(obj);
		addListenerObj(obj,"",objClick);
		function objClick(e){
			removeListenerObj(obj);
			bgm2Click();
			gotoEffectJumpPage([{obj:getId("F2"),endfun:hidden},{top:"0%"},{top:"-100%"}],[{obj:getId("F3"),beginfun:fn3},{top:"100%"},{top:"0%"}]);
		}
	}
}
function fn3(){
	curFpage=3;
	var preflag="f3_";
	var fnobj=getId("F3");
	show(fnobj);
	killObjs(fnobj,false,true,true);
	shObjs(fnobj,false,false,false);
	var isMyAndroid=(navigator.userAgent.indexOf("Android") > 0) ?true:false;
	//var isMyPC=(IsPC())?true:false;
	var winscore=20;
	var winsec=0;
	show(getId(preflag+"uigamemc"));
	var myspeed=0;
	var suf=getSuffixStyle(getId(preflag+"timemc_bg"),"left");
	var leftNumList=["0%","25%","50%","75%"];
	var objSrcList=["images/p3_obj1.png","images/p3_obj2.png","images/p3_obj3.png","images/p3_obj4.png"];
	var snumlist=new Array();
	var enumlist=new Array();
	for(var i=1;i<=10;i++){
		snumlist[i-1]=pa+"snum"+fixLoStrZeroLen(i,4)+".png";
		enumlist[i-1]=pa+"enum"+fixLoStrZeroLen(i,4)+".png";
	}
	var beginspeed=2.8;
	if(isMyAndroid){
		beginspeed=2.3;
	}
	showtimemc();
	showscoremc();
	showgamemc();
	showclewarrow();
	function showgamemc(){
		var objmc=getId(preflag+"gamemc");
		objmc.style.top=objmc.ptop;
		objmc.topNum=getNumValue(objmc.ptop);
		shObjs(objmc,true,true,true);
		for(var i=0;i<5;i++){
			setoneobj(i);
		}
		//objmc.topNum+=5;
		//objmc.style.top=objmc.topNum+suf;
		addListenerFastObj(fnobj,"",begingobjClick);
	}
	function setoneobj(i){
		var curobj=getId(preflag+"gamemc_"+i);
		curobj.myi=i;
		curobj.randList=randomize_lozero_arr(4,4);
		curobj.rightid=curobj.randList[0];
		var bgobj=getId(preflag+"gamemc_"+i+"_bg");
		if(bgobj){
			bgobj.src=objSrcList[curobj.rightid];
		}
		var robj=getId(preflag+"gamemc_"+i+"_r");
		robj.style.left=leftNumList[curobj.rightid];
		robj.isHide=0;
		robj.style.display="block";
		for(var w=1;w<=3;w++){
			var wobj=getId(preflag+"gamemc_"+curobj.myi+"_w"+w);
			wobj.style.left=leftNumList[curobj.randList[w]];
		}
	}
	function showclewarrow(){
		var arrow=getId(preflag+"clewarrow");
		show(arrow);
		var curobj=getId(preflag+"gamemc_0");
		arrow.style.left=(getNumValue(leftNumList[curobj.rightid])+getNumValue("21.325%")/2-getNumValue(arrow.pwidth)/2)+suf;
		yoyoEffectTopImg(arrow);
	}
	function getmouseij(fnobj,isFixFps){
		var content=getId("content");
		var guimc=getId(preflag+"uigamemc");
		var objmc=getId(preflag+"gamemc");
		
		var w=scaleNum*640;
		var l=(bw-w)/2;
		var cl=fnobj.satrtXYList[0].x-l;
		var clper=Number(parseFloat(   cl/w*100   ).toFixed(3));
		var tmpmin=getNumValue(guimc.pleft);
		var tmpmax=tmpmin+getNumValue(guimc.pwidth);
		var perxnum=getScopeN(tmpmin,tmpmax,clper,0,100);//Number(parseFloat(   (fnobj.satrtXYList[0].x-guimc.offsetLeft)/guimc.offsetWidth*100   ).toFixed(3));

		var h=scaleNum*1005;
		var t=(bh-h)/2;
		var ct=fnobj.satrtXYList[0].y-t;
		var ctper=Number(parseFloat(   ct/h*100   ).toFixed(3));
		var tmpmin=getNumValue(guimc.ptop);
		var tmpmax=tmpmin+getNumValue(guimc.pheight);
		var perynum=getScopeN(tmpmin,tmpmax,ctper,0,100);//Number(parseFloat(   (fnobj.satrtXYList[0].y-guimc.offsetTop)/guimc.offsetHeight*100   ).toFixed(3));
		//alert(perxnum+":"+perynum);

		var fixaddh=myspeed;
		if(isFixFps){
			fixaddh+=10;
			/*
			if(myspeed>=2.1){
				fixaddh+=10;
			}else if(myspeed>=2){
				fixaddh+=7;
			}else if(myspeed>=1.9){
				fixaddh+=5;
			}else if(myspeed>=1.8){
				fixaddh+=3;
			}
			*/
		}
		preynum=perynum-objmc.topNum+fixaddh;

		var mousei=5;
		if(preynum>=100){
			mousei=-1;
		}else if(preynum>=75){
			mousei=0;
		}else if(preynum>=50){
			mousei=1;
		}else if(preynum>=25){
			mousei=2;
		}else if(preynum>=0){
			mousei=3;
		}else if(preynum>=-25){
			mousei=4;
		}
		var mousej=0;//-1
		if(perxnum>=100){
			mousej=3;//4
		}else if(perxnum>=75){
			mousej=3;
		}else if(perxnum>=50){
			mousej=2;
		}else if(perxnum>=25){
			mousej=1;
		}else if(perxnum>=0){
			mousej=0;
		}
		var obj=new Object();
		obj.i=mousei;
		obj.j=mousej;
		//document.title=obj.i+":"+obj.j+":"+myspeed;
		return obj;
	}
	function begingobjClick(e){
		var fnobj=e.currentTarget;
		var mouseObj=getmouseij(fnobj,false);
		var curobj=getId(preflag+"gamemc_0");
		if(mouseObj.i==0 && mouseObj.j==curobj.rightid){
			removeListenerObj(fnobj);
			myspeed=beginspeed;
			var robj=getId(preflag+"gamemc_"+mouseObj.i+"_r");
			scoreaddAndOpacityObj(robj);
			bgm2Click();
			killAndHiddenObj(getId(preflag+"clewarrow"));
			starttime();
			movegamemc();
			addListenerFastObj(fnobj,"",gobjClick);
		}
	}
	function gobjClick(e){
		var fnobj=e.currentTarget;
		////////////////////////////
		var fpslist=[true,false];
		//var fpslist=[true];
		var mouseObj=null;
		var myi=-1;
		var curobj=null;
		var robj=null;
		for(var i=0;i<fpslist.length;i++){
			mouseObj=getmouseij(fnobj,fpslist[i]);
			myi=mouseObj.i;
			curobj=getId(preflag+"gamemc_"+myi);
			robj=getId(preflag+"gamemc_"+myi+"_r");
			if(curobj && curobj.rightid==mouseObj.j){
				if(robj.isHide!=1){
					if(myi==0){
						scoreaddAndOpacityObj(robj);
						return;
					}else{
						var preobj0=getId(preflag+"gamemc_"+(myi-1)+"_r");
						if(preobj0.isHide==1){
							scoreaddAndOpacityObj(robj);
							return;
						}
					}
				}
			}
		}
		//////////////////////////wrong
		if(robj && robj.isHide!=1){
			if(myi==0){
				checkgameResult();
			}else{
				var preobj0=getId(preflag+"gamemc_"+(myi-1)+"_r");
				if(preobj0.isHide==1){
					checkgameResult();
				}
			}
		}
	}
	function movegamemc(){
		var obj=getId(preflag+"timemc_bg");
		clearInterval(obj.timer3);
		obj.timer3=setInterval(gameTimer3Enter,40);
		var objmc=getId(preflag+"gamemc");
		var minY=getNumValue(objmc.style.top);
		var h=getNumValue(objmc.style.height)/4;
		var maxY=minY + h;
		function gameTimer3Enter(){
			objmc.topNum+=myspeed;
			var ischange=false;
			if(objmc.topNum>maxY){
				objmc.topNum=minY+objmc.topNum-maxY;
				ischange=true;
			}
			objmc.style.top=objmc.topNum+suf;
			if(ischange){
				var curobj0=getId(preflag+"gamemc_0_r");
				var isendgame=(curobj0.isHide!=1)?true:false;
				for(var i=0;i<4;i++){
					var curobj=getId(preflag+"gamemc_"+i);
					var preobj=getId(preflag+"gamemc_"+(i+1));
					curobj.rightid=preobj.rightid;
					curobj.randList=preobj.randList;
					for(var w=1;w<=3;w++){
						var wobj=getId(preflag+"gamemc_"+curobj.myi+"_w"+w);
						wobj.style.left=leftNumList[curobj.randList[w]];
					}
					var curbgobj=getId(preflag+"gamemc_"+i+"_bg");
					if(curbgobj){
						curbgobj.src=objSrcList[curobj.rightid];
					}
					var currobj=getId(preflag+"gamemc_"+i+"_r");
					var prerobj=getId(preflag+"gamemc_"+(i+1)+"_r");
					currobj.style.left=leftNumList[curobj.rightid];
					currobj.isHide=prerobj.isHide;
					if(currobj.isHide){
						currobj.style.display="none";
					}else{
						currobj.style.display="block";
					}
				}
				setoneobj(4);
				if(isendgame){
					checkgameResult();
				}
			}
		}
	}
	function showtimemc(){
		var obj=getId(preflag+"timemc");
		shObjs(obj,true,true,true);
		var offest={left:getNumValue(obj.pwidth),opacity:0};
		runEffectImg(obj,offest);
		var winbg=getId(preflag+"timemc_winbg")
		hidden(winbg);
		winbg.curshow=false;
		mytime(0);
	}
	function mytime(num){
		var obj=getId(preflag+"timemc_bg");
		clearInterval(obj.timer1);
		obj.gameSec=num;
		showSecTimes();
	}
	function starttime(){
		var obj=getId(preflag+"timemc_bg");
		obj.timer1=setInterval(gameTimer1Enter,1000);
		function gameTimer1Enter(e){
			obj.gameSec++;
			if(isMyAndroid){
				myspeed=beginspeed+parseInt(obj.gameSec/3)/10;
			}else{
				myspeed=beginspeed+parseInt(obj.gameSec/2)/6;
			}
			showSecTimes();
		}
	}
	function showSecTimes(){
		var obj=getId(preflag+"timemc_bg");
		var numStr=fixLoStrZeroLen(obj.gameSec,3);
		for(var i=0;i<numStr.length;i++){
			var curn=parseInt(numStr.substring(i,i+1));
			getId(preflag+"timemc_tnum"+(i+1)).src=snumlist[curn];
		}
		winclewisshow();
	}
	function showscoremc(){
		var obj=getId(preflag+"scoremc");
		shObjs(obj,true,true,true);
		var offest={top:-getNumValue(obj.pheight),opacity:0};
		runEffectImg(obj,offest);
		myscore(0);
	}
	function myscore(num){
		var obj=getId(preflag+"timemc_bg");
		obj.gameScore=num;
		shownumscore();
		function shownumscore(){
			var numStr=fixLoStrZeroLen(obj.gameScore,3);
			for(var i=0;i<numStr.length;i++){
				var curn=parseInt(numStr.substring(i,i+1));
				getId(preflag+"scoremc_snum"+(i+1)).src=snumlist[curn];
			}
			winclewisshow();
		}
	}
	function winclewisshow(){
		var obj=getId(preflag+"timemc_bg");
		if(obj.gameScore>=winscore && obj.gameSec>=winsec){
			var winbg=getId(preflag+"timemc_winbg");
			if(!winbg.curshow){
				show(winbg);
			}
			winbg.curshow=true;
		}
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function scoreaddAndOpacityObj(obj){
		myscore(++getId(preflag+"timemc_bg").gameScore);
		obj.isHide=1;
		obj.style.display="none";
	}
	function checkgameResult(){
		var obj=getId(preflag+"timemc_bg");
		if(obj.gameScore>=winscore && obj.gameSec>=winsec){
			showresult(true);
		}else{
			showresult(false);
		}
	}
	function showresult(iswin){
		removeListenerObj(fnobj);
		var obj=getId(preflag+"timemc_bg");
		clearInterval(obj.timer1);
		clearInterval(obj.timer3);
		killObjs(getId(preflag+"gamemc"),true,true,true);
		var objmc=getId(preflag+"resultmc");
		show(objmc);
		shObjs(objmc,false,true,false);
		var numStr=fixLoStrZeroLen(obj.gameScore,3);
		for(var i=0;i<numStr.length;i++){
			var curn=parseInt(numStr.substring(i,i+1));
			getId(preflag+"resultmc_snum"+(i+1)).src=enumlist[curn];
		}
		var numStr=fixLoStrZeroLen(obj.gameSec,3);
		for(var i=0;i<numStr.length;i++){
			var curn=parseInt(numStr.substring(i,i+1));
			getId(preflag+"resultmc_tnum"+(i+1)).src=enumlist[curn];
		}
		if(iswin){
			mywin();
		}else{
			mylose();
		}
		function mywin(){
			var obj=getId(preflag+"resultmc_bg_win");
			show(getId(preflag+"resultmc_bg_win"));
			tbg();
			obj.timerout1=setTimeout(title1,400*1);
			obj.timerout2=setTimeout(t1,400*2);
			obj.timerout3=setTimeout(starbg,400*3);
			obj.timerout4=setTimeout(scoreshow,400*4);
			obj.timerout5=setTimeout(btnshow1,400*5);
			obj.timerout6=setTimeout(btnshow2,400*6);
			function title1(){
				var obj=getId(preflag+"resultmc_wintitle");
				show(obj);
				runEffectImg(obj,getZoomOffestImg(obj),null);
			}
			function t1(){
				var obj=getId(preflag+"resultmc_t1_win");
				show(obj);
				runEffectImg(obj,getZoomOffestImg(obj),null);
			}
			function btnshow1(){
				var obj=getId(preflag+"resultmc_winbtn1");
				show(obj);
				var offest={top:getNumValue(obj.pwidth),opacity:0};
				runEffectImg(obj,offest);
				addListenerObj(getId(preflag+"resultmc_winbtn1"),"",reClick);
			}
			function btnshow2(){
				var obj=getId(preflag+"resultmc_winbtn2");
				show(obj);
				var offest={top:getNumValue(obj.pwidth),opacity:0};
				runEffectImg(obj,offest);
				addListenerObj(getId(preflag+"resultmc_winbtn2"),"",takeClick);
			}
		}
		function tbg(){
			var obj=getId(preflag+"resultmc_tbg");
			show(obj);
			var offest={top:getNumValue(obj.pheight),opacity:0};
			runEffectImg(obj,offest);
		}
		function starbg(){
			var obj=getId(preflag+"resultmc_starbg");
			show(obj);
			var offest={left:getNumValue(obj.pwidth),opacity:0};
			runEffectImg(obj,offest);
		}
		function scoreshow(){
			for(var i=1;i<=3;i++){
				show(getId(preflag+"resultmc_snum"+i));
				show(getId(preflag+"resultmc_tnum"+i));
			}
			var obj=getId(preflag+"resultmc_star1");
			show(obj);
			runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectLeftImg);
			var obj=getId(preflag+"resultmc_star2");
			show(obj);
			runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectLeftImg);
			var obj=getId(preflag+"resultmc_star3");
			show(obj);
			runEffectImg(obj,getZoomOffestImg(obj),yoyoEffectLeftImg);
		}
		function reClick(e){
			bgm2Click();
			var obj=e.currentTarget;
			removeListenerObj(obj);
			gotoFastJumpPage({obj:getId("F3"),beginfun:fn3},{top:getId("F3").ptop});
		}
		function takeClick(e){
			bgm2Click();
			var obj=e.currentTarget;
			removeListenerObj(obj);
			gotoFastJumpPage({obj:getId("F4"),beginfun:fn4},{top:getId("F4").ptop});
		}
		function mylose(){
			var obj=getId(preflag+"resultmc_bg_lose");
			show(getId(preflag+"resultmc_bg_lose"));
			tbg();
			obj.timerout1=setTimeout(t1,400*1);
			obj.timerout2=setTimeout(starbg,400*2);
			obj.timerout3=setTimeout(scoreshow,400*3);
			obj.timerout4=setTimeout(btnshow,400*4);
			function t1(){
				var obj=getId(preflag+"resultmc_t1_lose");
				show(obj);
				runEffectImg(obj,getZoomOffestImg(obj),null);
			}
			function btnshow(){
				var obj=getId(preflag+"resultmc_losebtn");
				show(obj);
				var offest={top:getNumValue(obj.pwidth),opacity:0};
				runEffectImg(obj,offest);
				addListenerObj(getId(preflag+"resultmc_losebtn"),"",reClick);
			}
		}
	}
}
function fn4(){
	curFpage=4;
	var preflag="f4_";
	var fnobj=getId("F4");
	show(fnobj);
	killObjs(fnobj,false,true,true);
	shObjs(fnobj,false,false,false);
	showbg();
	function showbg(){
		var obj=getId(preflag+"1");
		show1();
		obj.timerout1=setTimeout(show2,400);
		obj.timerout2=setTimeout(show3,600);
		obj.timerout3=setTimeout(show4,800);
		obj.timerout4=setTimeout(show5,1000);
		obj.timerout5=setTimeout(showsharebtn,1200);
	}
	function show1(){
		var obj=getId(preflag+"1");
		show(obj);
		var offest={top:-getNumValue(obj.pheight),opacity:0};
		runEffectImg(obj,offest);
	}
	function show2(){
		var obj=getId(preflag+"2");
		show(obj);
		var offest={left:-getNumValue(obj.pwidth),opacity:0};
		runEffectImg(obj,offest);
	}
	function show3(){
		var obj=getId(preflag+"3");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),null);
	}
	function show4(){
		var obj=getId(preflag+"4");
		show(obj);
		runEffectImg(obj,getZoom1OffestImg(obj),yoyoEffectWHImg);
	}
	function show5(){
		var obj=getId(preflag+"5");
		show(obj);
		runEffectImg(obj,getZoom1OffestImg(obj),null);
	}
	function showsharebtn(){
		var obj=getId(preflag+"sharebtn");
		show(obj);
		runEffectImg(obj,getZoomOffestImg(obj),null);
		obj.timerout1=setTimeout(gotoshare,1000);
		function gotoshare(){
			if(typeof(shareurl)!="undefined"){
				window.location.href = shareurl;
			}else{
				window.location.href = "share.html";
			}
		}
	}
}
///////////////////////////////////////////////////////////initend
