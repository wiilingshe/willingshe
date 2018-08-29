<template>
	<div class="lottery">
		<div data-v-3f2dc45e="" class="title-com"><img data-v-3f2dc45e="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgEAAABACAMAAAC0o1SzAAAAb1BMVEUAAAD/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/zwT/+wD/zwQXzlEbAAAAI3RSTlMA/Pn2VkvtdmpmYVxGQRJw88WpgHpQOTEgCAPl39jRuJmNKfLWxAAAAAIuSURBVHja7dyJbuIwFIXh6ywkLAEKlK17Oe//jDMdjUbTUkpiO9ExOt8z/FIS5/paP07SC0vGST6oAFEBogJEBYgKEOICKvThJL1AdJVZjQ8qIAmIrbbfJg6ACkgC4nIT+6PIVEAiEFVW2F9lrgLSgJjy0v5pliogCYho2dh/tiMVkALEM9raJ7uRCkhAxAB29sX7gwrgh1ge3u3M/lEF0EMkj3v7xv5JBbBDHE97+9b8WQWQQxTPc7tgfqcCuCGGu7nZ5QRUALXYAZw7vKgAZgj3crAfHVYqgBiCrQ52xXGlAniFB3C0q46vKoAWAr0erY03FcAKYd6spbUKIIUga2utUgGcEKKyDmoVQAkBautk6lQAIXhzU+uoyFQAn5CRwM7KXAXQCRgJ9NAsVQAb/5FAL9uRCiDjPRLoaTdSAVx8RwJ9NbkK4AIfeWOeZrmeAmTgJZ/5BqA3QTYYMoGZvgb5YMAESp0IEcJwBwJlplNhQvCWlV0D0J8hRhgqgftM/wYpIUB23yUAzQdwwjAJFJlmhEgF7wxppXCaE2SFMK5oF4BmhWlhgAQKp/sCvNB/AlOnO0PEEMxNrwWge4PM0HcCE6e7w9QQgZv8FID2B3BDvwmMtUWGHeIYXwhAm6Tooc8Extomxw89JlBro2QCEE19FoC2yqYA8SzskwWo2G0ClQVxACrAQ1ACFcjYbQKZijYAFeAhIIEN6NhtAp0NaQAqYDAbszUI2W0CofUvFnlRwBaEyiIAAAAASUVORK5CYII=" alt="" class="titlebg"> <div data-v-3f2dc45e="" class="text">{{arr3.activity_title}}</div></div>
		<!-- <div id="title">{{arr3.activity_title}}</div> -->
		<div class="time">活动时间：{{arr3.start_time | time}} - {{arr3.end_time | time}}</div>
		<div class="turnplate_box">
			<canvas id="myCanvas" width="300px" height="300px">抱歉！浏览器不支持。</canvas>
			<canvas id="myCanvas01" width="200px" height="200px">抱歉！浏览器不支持。</canvas>
			<canvas id="myCanvas03" width="200px" height="200px">抱歉！浏览器不支持。</canvas>
			<canvas id="myCanvas02" width="150px" height="150px">抱歉！浏览器不支持。</canvas>
			<button id="tupBtn" class="turnplatw_btn" @click="choujiang()"></button>
		</div>
		<div class="nums">剩余抽奖次数：{{arr4.nums}}</div>
		<div class="share">
			<p @click="shareDemo()">导师直播门票天天免费抽</p>
		</div>
    <div class="pricelist" style="width: 94%;margin: auto;padding: 0.12rem 0; margin-top: 0.24rem; font-size: 12px; border: 1px solid #ffffff;background-color: #ffffff;border-radius: 0.16rem">
      <div class="price" v-for="priceitem in price" style="display: inline-block;width:50%;padding-bottom:0.14rem; ;text-align: center">

        <img class="price-pic" style="width: 1rem;" :src="priceitem.pic" alt="">
        <div class="price-title" style="font-weight: bold;color: #FE633A" >奖品：{{priceitem.prize_title}}</div>
        <div class="price-count" style="color: #666666">奖品总数量：{{priceitem.count}}</div>
      </div>
    </div>
		<div style="background-color:#fff;width:calc(100% - 0.4rem);margin-left:0.2rem;text-align:center;margin-top:0.2rem;border-radius: 0.22rem 0.22rem 0 0">
			<p style="background-color:#fe633a;color:#fff;padding: 0.1rem 0rem;font-size: 0.3rem;border-radius: 0.22rem 0.22rem 0 0">最新获奖人信息</p>
		</div>
		<div class="xinxi" style="border-radius:0 0 0.2rem 0.2rem">
			<table width="calc(100% - 0.1rem)" style="margin-left: 0.1rem;margin-right: 0.1rem;">
				<tr v-for="item in arr5" :key="item.prize_id">
					<td width="10%"><img :src="item.face"></td>
					<td width="30%">{{item.nickname | name}}</td>
					<td width="35%" style="color:red">{{item.prize_title}}</td>
					<td width="25%">{{item.create_time}}</td>
				</tr>
			</table>
		</div>
		<div style="height:0.2rem;"></div>
		<ul style="width: 84%;position: fixed;top: 3rem;left:8%;z-index: 222;" v-show="tip">
		 <li style="background:#626262;text-align:left;padding-left:20px;font-size:14px;font-weight:bold;height:25px;line-height:25px;border:1px solid #F9CADE;color:white">[中奖提醒]</li>
		 <li style="height:auto;background-color:#787878;text-align:center;padding-top:0.3rem;color:#DCC722;padding-bottom:0.3rem;">
		 	<div>{{code==''?'':'中奖礼品：'}}{{notice}}</div>
		 	<div>{{code==''?'':'兑换码：'}}{{code}}</div>
		 	<div style="padding: 0rem 0.1rem;">{{code==''?'':'关注CVC摄影公众号，回复 “1111”，然后复制兑换码选择相应直播课程使用，即可免费观看。兑换码在奖品中心可以查看'}}</div>
		 </li>
		 <li id="doko" style="background:#626262;text-align:center;font-weight:bold;height:35px;line-height:25px; border:1px solid #F9CADE;"><input @click="close()" type="button" value="确 定" style="width:100px;height:25px;background:#626262;color:white;border:1px solid white;font-size:16px;line-height:20px;outline:none;margin-top: 4px"></li>
		</ul>
	</div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default{
	data(){
		return{
			info:[],
			info1:[],
			geshu:'',
			angles:'',
			rotNum:0,
			notice:null,
			getDemo:'',
			arr:[],
			arr1:[],
			arr3:[],
			arr4:[],
			arr5:[],
			tip:false,
			code:'',
			rootId:'',
			allTitle:'',
      price:[]
		}
	},
	created(){
		var self = this;
		//转盘初始化
		var color = ["#626262","#787878","rgba(0,0,0,0.5)","#DCC722","white","#FF4350"];
		this.global.shouquan();
		// 获取抽奖信息
		this.postData('post','/shop-v1-pay_jssign.html',{url:window.location.href}).then(res => {
			if(res.data.status == 1){
				self.postData('post','/shop-v1-index_get_root.html').then(resp => {
					if(resp.data.status == 1){
						wx.config({
		                  debug: false,
		                  appId: res.data.sign.appId,
		                  timestamp: res.data.sign.timestamp,
		                  nonceStr: res.data.sign.nonceStr,
		                  signature: res.data.sign.signature,
		                  jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
		              	});
		              	wx.ready(function(){
			                wx.onMenuShareAppMessage({
			                    title: 'CVC直播嘉年华-上帝视角学摄影',
			                    desc: '导师直播门票天天免费抽',
			                    link: res.data.sign.url+resp.data.rootId,
			                    imgUrl: 'http://vrjishu1.oss-cn-shenzhen.aliyuncs.com/logo.jpg',
			                    success:function(){
			                    	self.postData('post','/shop-v1-draw_share.html',{type:'1',activity_id:self.$route.query.activity_id}).then(res => {
			                    		if(res.data.status == 1){
			                    			self.arr4.nums = Number(self.arr4.nums) + Number(res.data.time);
			                    			alert(res.data.msg)
			                    		}
			                    	})
			                    }
			                });
			                wx.onMenuShareTimeline({
			                  title: 'CVC直播嘉年华-上帝视角学摄影',
			                  link: res.data.sign.url+resp.data.rootId,
			                  imgUrl: 'http://vrjishu1.oss-cn-shenzhen.aliyuncs.com/logo.jpg',
			                  success:function(){
			                    	self.postData('post','/shop-v1-draw_share.html',{type:'2',activity_id:self.$route.query.activity_id}).then(res => {
			                    		if(res.data.status == 1){
			                    			self.arr4.nums = Number(self.arr4.nums) + Number(res.data.time);
			                    			alert(res.data.msg)
			                    		}
			                    	})
			                    }
			                });
			            });
					}
				})
			}
		})
		this.postData('post','/shop-v1-draw_index.html',{activity_id:this.$route.query.activity_id}).then(res => {
			this.arr3 = res.data;
			this.allTitle = res.data.activity_title;
		})
		this.postData('post','/shop-v1-draw_get_user_counts.html',{activity_id:this.$route.query.activity_id}).then(res => {
			this.arr4 = res.data;
		})
		// 获取抽奖中奖名单
		this.postData('post','/shop-v1-draw_get_act_draw_lst.html',{activity_id:this.$route.query.activity_id,nums:20}).then(res => {
			this.arr5 = res.data;
		})
		this.postData('post','/shop-v1-draw_get_prize.html',{activity_id:this.$route.query.activity_id}).then(res => {
//		    奖品信息
      this.price = res.data;

      for(let i=0;i<res.data.length;i++){
				this.info.push(res.data[i].prize_title);
				this.info1.push(res.data[i].prize_id);
				this.arr.push(res.data[i].prize_title);
				this.arr1.push(res.data[i].prize_id);
			}
			if(this.info.length < 10){
				for(let p=this.info.length;p<12;p++){
					this.info.push('谢谢参与')
				}
			}
			if(this.info1.length < 10){
				for(let p=this.info1.length;p<12;p++){
					this.info1.push('谢谢参与')
				}
			}
			canvasRun(res.data.length);
		})
		//绘制转盘
		function canvasRun(length){
			var canvas=document.getElementById('myCanvas');
			var canvas01=document.getElementById('myCanvas01');
			var canvas03=document.getElementById('myCanvas03');
			var canvas02=document.getElementById('myCanvas02');
			var canvas04=document.getElementById('myCanvas04');
			var ctx=canvas.getContext('2d');
			var ctx1=canvas01.getContext('2d');
			var ctx3=canvas03.getContext('2d');
			var ctx2=canvas02.getContext('2d');
			var ctx4=canvas03.getContext('2d');
			createCircle();
			createCirText();
			initPoint();
			//外圆
			function createCircle(){
		        var startAngle = 0;//扇形的开始弧度
		        var endAngle = 0;//扇形的终止弧度
		        //画一个12等份扇形组成的圆形
		        for (var i = 0; i< 12; i++){ //要改
		        	// Math.PI=180度,定义初始位置
		            startAngle = Math.PI*(i/6-1/4); //要改
		            endAngle = startAngle+Math.PI*(1/6);
		            ctx.save();
		            ctx.beginPath();
		            ctx.arc(150,150,200, startAngle, endAngle, false);
		            ctx.lineWidth = 350; //背景色改大
		            if (i%2 == 0) {
		            	ctx.strokeStyle =  '#fffeff';
		            }else{
		            	ctx.strokeStyle =  '#fff9b3';
		            }
		            ctx.stroke();
		            ctx.restore();
		        }
		    }
		    //各奖项
		    function createCirText(){
			    ctx.textAlign='center';
			    ctx.textBaseline='middle';
			    // ctx.fillStyle = color[3];
			    var step = 2*Math.PI/12;
			    for ( var i = 0; i < 12; i++) {
			    	ctx.save();
			    	ctx.beginPath();
			        ctx.translate(150,150);
			        ctx.rotate(i*step);
			        ctx.font = " 14px Microsoft YaHei";
			        // ctx.fillStyle = color[3];
			        ctx.fillStyle = '#ff4350';
			        ctx.fillText(self.info[i],0,-130,60);
			        // ctx.font = " 14px Microsoft YaHei";
			        // ctx.fillText(info1[i],-30,-95,60);
			        ctx.closePath();
			        ctx.restore();
			    }
			}
			function initPoint(){
		        //箭头指针
		        ctx1.beginPath();
		        ctx1.moveTo(100,24);
		        ctx1.lineTo(90,62);
		        ctx1.lineTo(110,62);
		        ctx1.lineTo(100,24);
		        ctx1.fillStyle = color[5];
		        ctx1.fill();
		        ctx1.closePath();
		        //中间小圆
		        ctx3.beginPath();
		        ctx3.arc(100,100,40,0,Math.PI*2,false);
		        ctx3.fillStyle = color[5];
		        ctx3.fill();
		        ctx3.closePath();
		        //小圆文字
		        ctx3.font = "Bold 20px Microsoft YaHei";
			    ctx3.textAlign='start';
			    ctx3.textBaseline='middle';
			    ctx3.fillStyle = color[4];
		        ctx3.beginPath();
		        ctx3.fillText('开始',80,90,40);
		        ctx3.fillText('抽奖',80,110,40);
		        ctx3.fill();
		        ctx3.closePath();
		        //中间圆圈
		        ctx2.beginPath();
		        ctx2.arc(75,75,60,0,Math.PI*2,false);
		        ctx2.fillStyle = color[2];
		        ctx2.fill();
		        ctx2.closePath();
			}
		}
	},
	methods:{
		close(){
			this.tip = false;
		},
		choujiang(){
			var self = this;
			console.log(111);
			//转盘旋转过程“开始抽奖”按钮无法点击
			$('#tupBtn').attr("disabled", true);
			self.postData('post','/shop-v1-draw_lottery_draw.html',{activity_id:self.$route.query.activity_id}).then(res => {
					if(res.data.status == 1){
						self.getDemo = res.data.prize_id;
						self.code = res.data.code;
			    		self.runCup();
						//旋转次数加一
						self.rotNum = self.rotNum + 1;
						//“开始抽奖”按钮无法点击恢复点击
						setTimeout(function(){
						  // alert(self.notice);
						  self.tip = true;
			              self.postData('post','/shop-v1-draw_get_act_draw_lst.html',{activity_id:self.$route.query.activity_id,nums:20}).then(res => {
			                self.arr5 = res.data;
			              })
							$('#tupBtn').removeAttr("disabled", true);
						},6000);
			    	}else if(res.data.status == 0){
			    		self.getDemo = '0';
			    		self.code = '';
			    		if(res.data.msg == '无抽奖次数' || res.data.msg == '抽奖异常'){
			    			alert(res.data.msg)
			    			$('#tupBtn').removeAttr("disabled", true);
			    		}else{
			    			self.runCup();
							//转盘旋转过程“开始抽奖”按钮无法点击
							// $('#tupBtn').attr("disabled", true);
							//旋转次数加一
							self.rotNum = self.rotNum + 1;
							//“开始抽奖”按钮无法点击恢复点击
							setTimeout(function(){
								// self.tip(self.notice);
								self.tip = true
								$('#tupBtn').removeAttr("disabled", true);
							},6000);
			    		}
			    	}
			    	next();
				})
			function next(){
				self.postData('post','/shop-v1-draw_get_user_counts.html',{activity_id:self.$route.query.activity_id}).then(res => {
					self.arr4 = res.data;
				})
			}
		},
		//转盘旋转
		runCup(){
			this.probability();
			var degValue = 'rotate('+this.angles+'deg'+')';
			$('#myCanvas').css('-o-transform',degValue);           //Opera
			$('#myCanvas').css('-ms-transform',degValue);          //IE浏览器
			$('#myCanvas').css('-moz-transform',degValue);         //Firefox
			$('#myCanvas').css('-webkit-transform',degValue);      //Chrome和Safari
			$('#myCanvas').css('transform',degValue);
		},
		// //各奖项对应的旋转角度及中奖公告内容
		probability(){ //要改
			//获取随机数
			var no = Number(12) - Number(this.arr.length);
			if(this.getDemo == 0){
				var num = parseInt(Math.random()*no + this.arr.length);
				num = parseInt(12 - num)
				//概率
				if ( num == 0 ) {
					this.angles = 2160 * this.rotNum + 1800;
					this.notice = this.info[0];
				}else{
					this.angles = 2160 * this.rotNum + 1800 + 360/12*num;
					this.notice = this.info[12-num];
				}
			}else{
				for(let i=0;i<this.arr1.length;i++){
					if(this.arr1[i] == this.getDemo){
						//概率
						var num = i;
						if ( num == 0 ) {
							this.angles = 2160 * this.rotNum + 1800;
							this.notice = this.info[0];
						}else{
							this.angles = 2160 * this.rotNum + 1800 + 360/12*(12 -num);
							this.notice = this.info[num];
						}
						return false;
					}
				}
			}
		}
	},
	filters:{
		time(value){
			return value;
		},
		name(value){
			if(value.length > 5){
				value = value.slice(0,5);
				return value + '...';
			}else{
				return value;
			}
		}
	}
}
</script>
<style type="text/css">
	.lottery{
		width: 100%;
		overflow-x: hidden;
	}
	.lottery .xinxi img{
		width: 0.5rem;
		border-radius: 100%;
		position: relative;
		top: 0.05rem;
	}
	.lottery .xinxi{
		background-color: #fff;
		height: auto;
		width: calc(100% - 0.4rem);
		margin: 0rem 0.2rem 0rem 0.2rem;
		text-align: center;
		height: 6rem;
		overflow: scroll;
		-webkit-overflow-scrolling:touch;
	}
	.lottery .nums{
		text-align: center;
		color: #fff;
	}
	.lottery{
		font-size: 0.26rem;
		background-color: #E13658;
		width: 100%;
	}
	.lottery .time{
		font-size: 0.24rem;
		text-align: center;
		color: #fff;
		margin-top: 0.3rem;
		/*
		background-color: #fe633a;
		margin-top: 0.2rem;
		padding: 0.05rem 0.4rem;
		border-radius: 0.5rem;
		display: inline-block;
		margin-left: 0.15rem;*/
	}
	.lottery #title{
		text-align: center;
		background-color: #fa5023;
		color: #fff;
		font-weight: bold;
		padding: 0.2rem;
		font-size: 0.3rem;
	}
	.lottery .share{
		width: 100%;
		text-align: center;
		margin-top: 0.1rem;
	}
	.lottery .share p{
		text-align: center;
		color: #440095;
		font-weight: bold;
		background-color: #fffb00;
		display: inline-block;
		padding: 0.1rem 0.1rem;
	}
	.lottery .turnplate_box{
		width: 300px;
		height: 300px;
		margin: 10px auto;
		position: relative;
	}
	.lottery .turnplate_box canvas{
		position: absolute;
	}
	.lottery #myCanvas{
		background-color: white;
		border-radius: 100%;
	}
	.lottery #myCanvas01,#myCanvas03{
		left: 50px;
		top: 50px;
		z-index: 30;
	}
	.lottery #myCanvas02{
		left: 75px;
		top: 75px;
		z-index: 20;
	}
	.lottery #myCanvas{
	    -o-transform:  transform 6s;
		-ms-transform:  transform 6s;
		-moz-transform:  transform 6s;
		-webkit-transform:  transform 6s;
		transition: transform 6s;
		-o-transform-origin:  50% 50%;
		-ms-transform-origin:  50% 50%;
		-moz-transform-origin:  50% 50%;
		-webkit-transform-origin:  50% 50%;
		transform-origin: 50% 50%;
	}
	.lottery .turnplatw_btn{
		width: 60px;
		height: 60px;
		left: 120px;
		top: 120px;
		border-radius: 100%;
		position: absolute;
		cursor: pointer;
		border: none;
		background: transparent;
		outline: none;
		z-index: 40;
	}

</style>
