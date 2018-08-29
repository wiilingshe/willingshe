<template>
	<div class="successEnter">
		<div class="successEnter-content">
			<img class="successEnter-content-img" :src="pic">
			<div class="successEnter-content-tip">
				<img src="../../../static/img/college/Instructions.png">
				<span>长按保存图片，或发给朋友</span>
			</div>
		</div>
		<div class="successEnter-btn" @click="home()">
			开始学习
		</div>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				list:['../../../static/img/college/notice1.png','佘伟林','欢迎加入','CVC摄客学院','真知灼见，敦品励学学以致用，取道优术','../../../static/img/ceshi.png','','../../../static/img/college/cvc_logo.png','摄客学院'],
				pic:'',
			}
		},
		created(){
			this.global.shouquan();
			Indicator.open();
			document.title="入学通知书";
		},
		mounted(){
			var self = this;
			this.getData('post','/shop-v2-college-get_term_card.html',{url:'https://cvcsheke.saasxx.vip/collegeHome?root_id='+this.globalid}).then(res3 => {
				this.getData('GET','/shop-v1-index_basemsg.html').then(function(res2){
					self.list[5] = res2.data.wechat_qrcode;
					self.getData('GET','/shop-v1-user_base_info.html').then(function(res){
						if(res.data.status == 1){
							self.list[1] = res.data.data.nickname;
							self.getData('GET','/shop-v2-college-config.html').then(function(res1){
								if(res.data.status == 1){
									self.list[3] = res1.data.data.name;
									self.list[4] = res1.data.data.encourage_msg;
									self.list[5] = res3.data.data.qr_code;
									self.list[8] = res1.data.data.name;
									self.hecheng(self.list);
								}
							})
						}
					})
				})
			})
		},
		methods:{
			hecheng(list){
				var self = this;
				self.list = list;
				var mycanvas = document.createElement('canvas');
	        	var len = self.list.length;
	        	document.body.appendChild(mycanvas);
	        	$('canvas').css('display', 'none');
		        mycanvas.width = 690;
		        mycanvas.height = 1230;
		        var context = mycanvas.getContext('2d');
		        context.fillStyle = '#fff';
		        context.fill();
		        context.fillRect(0, 0, mycanvas.width, mycanvas.height);
		        context.beginPath();
		        context.stroke();
		        function drawing(num){
		        	if (num < len) {
		        		var img = new Image;
			            img.crossOrigin = "*";
			            img.src = self.list[num];
			            if(num == 0){
			            	img.onerror = function () {
				                drawing(num + 1);
				            }
				            img.onload = function () {
				                context.drawImage(img, 0, 0, mycanvas.width, mycanvas.height);
				                drawing(num + 1);
				            }
			            }else if(num == 1){
			            	if(self.list[num].length>12){
			            		self.list[num] = self.list[num].substring(0,12)+'...' +' 同学'
			            	}else{
			            		self.list[num] = self.list[num]+' 同学'
			            	}
							context.font = '28px PingFang-SC-Bold bold';
							context.fillStyle = '#CEA03D';
							context.fillText(self.list[num], 130, 525);
							drawing(num + 1);
			            }else if(num == 2){
							// context.font = '40px SimSun';
							// context.fillStyle = '#333';
							// context.textAlign="center";
							// context.fillText(self.list[num], 345, 560);
							drawing(num + 1);
			            }else if(num == 3){
							// context.font = '40px SimSun';
							// context.fillStyle = '#333';
							// context.textAlign="center";
							// context.fillText(self.list[num], 345, 616);
							drawing(num + 1);
			            }else if(num == 4){
							// context.font = '40px SimSun';
							// context.fillStyle = '#333';
							// context.textAlign="center";
			    //         	var chr = self.list[num].split("");
			    //         	var temp = "";              
	    		// 			var row = [];
	    		// 			for(var a = 0; a < chr.length; a++){
						 //        if( context.measureText(temp).width < 360 ){
						 //            ;
						 //        }
						 //        else{
						 //            row.push(temp);
						 //            temp = "";
						 //        }
						 //        temp += chr[a];
						 //    }
						 //    row.push(temp);
						 //    for(var b = 0; b < row.length; b++){
						 //        context.fillText(row[b],345,684+(b+1)*55);
						 //    }
							drawing(num + 1);
			            }else if(num == 5){
			            	img.onerror = function () {
				                drawing(num + 1);
				            }
				            img.onload = function () {
				                context.drawImage(img, 270, 860, 150, 150);
				                drawing(num + 1);
				            }
			            }else if(num == 6){
			    //         	context.beginPath();
							// context.lineWidth=2;
							// context.strokeStyle="#ccc";
							// context.moveTo(345,1106);
							// context.lineTo(345,1154);
							// context.stroke();
							drawing(num + 1);
			            }else if(num == 7){
			            	img.onerror = function () {
				                drawing(num + 1);
				            }
				            img.onload = function () {
				                // context.drawImage(img, 211, 1106, 106, 48);
				                drawing(num + 1);
				            }
			            }else if(num == 8){
							// context.font = '30px SimSun';
							// context.fillStyle = '#222';
							// context.fillText(self.list[num], 430, 1140);
							drawing(num + 1);
			            }else{
			            	drawing(num + 1);
			            }
		        	}else{
		        		Indicator.close();
		            	self.pic = mycanvas.toDataURL("image/jpeg");
		            }
		        }
		        drawing(0);
			},
			home(){
				this.$router.push({path:'/collegeHome',query:{ifone:1}})
			}
		}
	}
</script>
<style lang="less">
	.successEnter{
		&-content{
			height: calc(~"100vh - 0.9rem");
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
			text-align: center;
			&-img{
				width:6.9rem;
				margin:0.3rem auto 0;
			}
			&-tip{
				margin-bottom: 0.3rem;
				img{
					width: 0.22rem;
				}
				span{
					font-size: 0.26rem;
					color: #666;
				}
			}
		}
		&-btn{
			width: 100%;
			height: 0.9rem;
			background-color: #222222;
			text-align: center;
			color: #fff;
			font-size: 0.3rem;
			position: fixed;
			bottom: 0;
			line-height: 0.9rem;
		}
	}
</style>