<template>
	<div class="facePromotion">
		<div class="box1">
			<img id="shareTu1" class="margin1">
			<img id="shareTu2" class="margin2">
			<img id="shareTu3" class="margin3">
		</div>
		<div class="tip">
			<img src="../../../../static/img/tuiguang/this.png">长按保存图片，分享给朋友
		</div>
		<div class="leftBg" v-show="left"></div>
		<div class="rightBg" v-show="right"></div>
		<canvas width="1080" height="1920" style="display: none;" id="canvas1"></canvas>
		<canvas width="1080" height="1920" style="display: none;" id="canvas2"></canvas>
		<canvas width="1080" height="1920" style="display: none;" id="canvas3"></canvas>
	</div>
</template>
<script>
	import { Toast,Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				x1:0,
				y1:0,
				x3:0,
				y3:0,
				marginLeft:0,
				url:'',
				left:false,
				right:false,
				arr: ['../../../../static/img/face/share_bg.png','../../../../static/img/zhanwei.png','../../../../static/img/zhanwei.png','willingshe作品','','../../../../static/img/zhanwei.png'],
				arr2: ['../../../../static/img/face/share1.png','../../../../static/img/zhanwei.png','../../../../static/img/zhanwei.png','willingshe作品','','../../../../static/img/zhanwei.png'],
				arr3: ['../../../../static/img/face/share2.png','../../../../static/img/zhanwei.png','../../../../static/img/zhanwei.png','willingshe作品','','../../../../static/img/zhanwei.png'],
			}
		},
		created(){
			var self = this;
			document.addEventListener('touchstart',function(e){
				this.x1 = e.touches[0].pageX;
				this.y1 = e.touches[0].pageY;
				this.x3 = e.touches[0].screenX;
				this.y3 = e.touches[0].screenX;
				this.marginLeft = $('#shareTu1').css('margin-left').replace(/px/g, '');
			})
			document.addEventListener('touchmove',function(e){
				// e.preventDefault();
				var x2 = e.touches[0].pageX;
				var y2 = e.touches[0].pageY;
				if(x2 - this.x1 > 0){
					if($(e.target).attr('id') == 'shareTu3'){
						$('.margin1 ').eq(0).stop().animate({'margin-left':'-4.2rem'},300,function(){
							self.left = true;
							self.right = true;
						});
					}else if($(e.target).attr('id') == 'shareTu2'){
						self.left = false;
						self.right = true;
						$('.margin1 ').eq(0).stop().animate({'margin-left':'0.896rem'},300);
					}else if($(e.target).attr('id') == 'shareTu1'){
						// Toast({
						//   message: '没有啦',
						//   iconClass: 'icon iconfont icon-2',
						//   duration: 1000
						// });
					}
				}else if(x2 - this.x1 < 0){
					if(this.marginLeft>0){
						$('.margin1 ').eq(0).stop().animate({'margin-left':'-4.2rem'},300,function(){
							self.left = true;
							self.right = true;
						});
					}else if(this.marginLeft<0&&this.marginLeft>-300){
						self.left = true;
						self.right = false;
						$('.margin1 ').stop().eq(0).animate({'margin-left':'-9.3rem'},300);
					}else{
						// Toast({
						//   message: '没有啦',
						//   iconClass: 'icon iconfont icon-2',
						//   duration: 1000
						// });
					}
				}

			})
			this.global.shouquan();
			this.url = window.location.origin+'/faceDetail'+'?masks_id='+this.$route.query.masks_id+'&id='+this.$route.query.id+'&root_id='+this.$route.query.rid+'&rid='+this.$route.query.rid;
	        Indicator.open('加载中...');
	        this.postData('post','/shop-v1-masks_join_detail.html',{masks_user_id:this.$route.query.id}).then(res => {
	        	self.arr[3] = res.data.nickname+'作品';
				self.arr[4] = res.data.content.replace(/_@/g, '').replace(/_#/g, '').replace(/&nbsp;/g, '').replace(/<br\/>/g, "");
				self.arr2[3] = 'by ：'+res.data.nickname;
				self.arr2[4] = res.data.content.replace(/_@/g, '').replace(/_#/g, '').replace(/&nbsp;/g, '').replace(/<br\/>/g, "");
				self.arr3[3] = 'by ：'+res.data.nickname;
				self.arr3[4] = res.data.content.replace(/_@/g, '').replace(/_#/g, '').replace(/&nbsp;/g, '').replace(/<br\/>/g, "");
				this.postData('post','/shop-v1-masks_join_pic_info.html',{masks_user_id:this.$route.query.id,url:this.url}).then(res => {
					Indicator.close();
					this.arr[1] = res.data.pic;
					this.arr[2] = res.data.face;
					this.arr[5] = res.data.urlCode;
					this.arr2[1] = res.data.pic;
					this.arr2[2] = res.data.face;
					this.arr2[5] = res.data.urlCode;
					this.arr3[1] = res.data.pic;
					this.arr3[2] = res.data.face;
					this.arr3[5] = res.data.urlCode;
					// 第二、三张图
					var mycanvas2 = document.getElementById('canvas2');
					var context2 = mycanvas2.getContext('2d');
					context2.fillStyle = '#fff';
			        context2.fill();
			        context2.fillRect(0, 0, mycanvas2.width, mycanvas2.height);
			        context2.beginPath();
			        context2.stroke();
			        var img2 = new Image;
	        		img2.src = this.arr2[0];
	        		var mycanvas3 = document.getElementById('canvas3');
					var context3 = mycanvas3.getContext('2d');
					context3.fillStyle = '#fff';
			        context3.fill();
			        context3.fillRect(0, 0, mycanvas3.width, mycanvas3.height);
			        context3.beginPath();
			        context3.stroke();
			        var img3 = new Image;
			        img2.onload = function(){
			        	context2.drawImage(img2, 0, 0, mycanvas2.width, mycanvas2.height);
			        	img3.src = self.arr3[0];
			        	img3.onload = function(){
				        	context3.drawImage(img3, 0, 0, mycanvas3.width, mycanvas3.height);
				        	img2.src = self.arr2[1];
				        	img2.onload = function(){
				        		if(img2.height>img2.width){
				        			var width = img2.width;
				        			var height = img2.width;
				        		}else{
				        			var width = img2.height;
				        			var height = img2.height;
				        		}
				        		context2.drawImage(img2, 0, 0,width,height,50,50, mycanvas2.width-100, 1036);
				        		context3.drawImage(img2, 0, 0,width,height,50,mycanvas3.height-1086, mycanvas3.width-100, 1036);
				        		img2.src = self.arr2[5];
				        		img2.onload = function(){
				        			context2.drawImage(img2, 440, 1500, 200, 200);
				        			context3.drawImage(img2, 820, 440, 200, 200);
				        			context2.font = '52px Microsoft YaHei';
					                context2.fillStyle = '#333';
					                context2.textAlign = 'center';
					                context2.fillText(self.arr2[3], mycanvas2.width / 2, 1170);
					                context3.font = '52px Microsoft YaHei';
					                context3.fillStyle = '#333';
					                context3.textAlign = 'center';
					                context3.fillText(self.arr2[3],1080-context3.measureText(self.arr2[3]).width+120, 150);
				        			$('#shareTu2').attr('src',mycanvas2.toDataURL("image/jpeg"));
				        			$('#shareTu3').attr('src',mycanvas3.toDataURL("image/jpeg"));
				        			self.right = true;
				        		}
				        	}
			        	}
			        }
			        // 第一张图片
					var arr = this.arr;
			        var mycanvas = document.getElementById('canvas1');
			        var len = arr.length;
			        if (mycanvas.getContext) {
			          var context = mycanvas.getContext('2d');
			          // 设置背景色
			          context.fillStyle = '#fff';
			          context.fill();
			          context.fillRect(0, 0, mycanvas.width, mycanvas.height);
			          context.beginPath();
			          context.stroke();
			          var h = 0;
			          function drawing(num) {
			            if (num < len) {
			              var img = new Image;
			              img.crossOrigin = "*";
			              img.src = arr[num];
			              if (num == 0) {
			                img.onerror = function () {
			                  drawing(num + 1);
			                }
			                img.onload = function () {
			                  context.drawImage(img, 0, 0, mycanvas.width, mycanvas.height);
			                  drawing(num + 1);
			                }
			              } else if (num == 1) {
			                img.onerror = function () {
			                  drawing(num + 1);
			                }
			                img.onload = function () {
			                  var width = img.width;
			                  var height = width*0.67222222;
			                  context.drawImage(img, 0, 0,width,height,0,0, mycanvas.width, 726);
			                  drawing(num + 1);
			                }
			              } else if (num == 2) {
			                context.drawImage(img, mycanvas.width / 2 - 80, 640, 160, 160);
			                drawing(num + 1);
			              } else if (num == 3) {
			                context.font = '52px Microsoft YaHei';
			                context.fillStyle = '#333';
			                context.textAlign = 'center';
			                context.fillText(arr[num], mycanvas.width / 2, 880);
			                drawing(num + 1);
			              } else if (num == 4) {
			              	var length = arr[num].length;
			              	for(let i=0;i<4;i++){
			              		var ji = Number(i)+Number(1);
			              		var text = arr[num].substring(i*18,18*ji);
			              		context.font = '48px Microsoft YaHei';
				                context.fillStyle = '#999';
				                context.textAlign = 'center';
				                var jvli = Number(930) + Number(65) * Number(ji)
				                context.fillText(text, mycanvas.width / 2, jvli);
			              	}
			                drawing(num + 1);
			              } else if (num == 5) {
			                img.onerror = function () {
			                  drawing(num + 1);
			                }
			                img.onload = function () {
			                  context.drawImage(img, 730, 1475, 220, 220);
			                  drawing(num + 1);
			                }
			              }
			            } else {
			              // self.imgPath = mycanvas.toDataURL("image/jpeg");
			              $('#shareTu1').attr('src',mycanvas.toDataURL("image/jpeg"));
			              // $('#shareTu2').attr('src',self.imgPath);
			              // $('#shareTu3').attr('src',self.imgPath);
			            }
			          }
			          drawing(0);
			        }
				})
	        })
		},
		mounted(){

		},
		methods:{
		}
	}
</script>
<style lang="less">
	.facePromotion{
		font-size: 0.205rem;
		color: #333;
		height: 100%;
		overflow: hidden;
		background-color: #333;
		.box1{
			overflow-x: hidden;
			white-space: nowrap;
			position: relative;
			top: calc(~"50% - 4.3rem");
			#shareTu1,#shareTu2,#shareTu3{
				width: 4.608rem;
			}
			.margin1{
				margin-left: 0.896rem;
				margin-right: 0.4267rem;
			}
			.margin2{
				margin-right: 0.4267rem;
			}
			.margin3{
				margin-right: 0.896rem;
			}
		}
		.tip{
			position: relative;
			top: calc(~"50% - 4.1rem");
			color: #fff;
			text-align: center;
			img{
				width: 0.2rem;
				margin-right: 0.1rem;
			}
		}
		.leftBg{
			width: 0.41rem;
			height: 8.2rem;
			background-color: rgba(0,0,0,0.6);
			position: absolute;
			top: calc(~"50% - 4.3rem");
			left: 0;
		}
		.rightBg{
			width: 0.42rem;
			height: 8.2rem;
			background-color: rgba(0,0,0,0.6);
			position: absolute;
			top: calc(~"50% - 4.3rem");
			right: 0;
		}
	}
</style>