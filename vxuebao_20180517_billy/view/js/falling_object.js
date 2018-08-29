/**
 * eqShow - v4.4.0 - 2015-07-30
 * 
 *
 * Copyright (c) 2015 
 * Licensed MIT <>
 */
function fallingObject(a,b,longpage){
	function c(a){
		a.clearRect(0,0,j,k);
		for(var b=0;b<n.length;b++)a.save(),a.translate(n[b].x,n[b].y),a.scale(n[b].scale,n[b].scale),a.rotate(n[b].rotate),a.fillRect(0,0,o,o),a.restore()
	}
	function d(){
		Math.random()<.02*h.density&&f(),e()
	}
	function e(){
		for(var a=0;a<n.length;a++)n[a].x+=n[a].vx,n[a].y+=n[a].vy,n[a].vy+=n[a].g;
			for(var b=0,a=0;a<n.length;a++)n[a].y<k-o&&n[a].x>-o&&n[a].x<j&&(n[b++]=n[a]);
				for(;n.length>b;)n.pop();n.length>p&&(n.length=p)
	}
	function f(){
		var a=.5*Math.random()+.3,b={x:Math.ceil(Math.random()*j),y:-o,g:.02*a*h.src.vy,vx:.05*Math.pow(-1,Math.ceil(1e3*Math.random())),vy:.01*a*h.src.vy,color:"yellow",scale:a,rotate:Math.pow(-1,Math.ceil(1e3*Math.random()))*Math.random()*(h.src.rotate||0)*Math.PI/180};n.push(b)
	}
	var g=a[b-1];
	if(g.properties){
		var h=g.properties.fallingObject||{};
		!longpage && renderPage(eqShow,b,a);
		for(var i=0;i<a[b-1].elements.length;i++)eqxCommon.bindTrigger($("#inside_"+a[b-1].elements[i].id),a[b-1].elements[i]);
			var j=$(".m-img").width(),k=$(".m-img").height(),l=document.createElement("canvas");
		l.width=j,l.height=k,$(l).prependTo("#page"+b+" .edit_wrapper").attr("class","cas page_effect").attr("id","can"+b).attr("style","z-index: 0");
		var m=l.getContext("2d"),n=[],o=60,p=20,q=new Image;q.src=h.src.path,
		q.onload=function(){
			m.beginPath(),pattern=m.createPattern(q,"repeat"),m.fillStyle=pattern,m.closePath(),setInterval(function(){
				c(m),d()
			},20)
		}
	}
}