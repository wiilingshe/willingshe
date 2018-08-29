<template>
	<div class="faceList">
		<div style="position:relative;">
			<div class="list11" v-for="i in arr" @click="faceDatails1(i.masks_user_id)">
				<img class="img1" :src="i.pic">
				<div class="user1">
					<div class="img3">
						<img class="img2" :src="i.face">
					</div>
					<span>{{i.nickname}}</span>
				</div>
				<div class="detail1">
					{{i.content | content}}
				</div>
				<div class="zan1">
					<i class="icon iconfont icon-praise"></i>
					<span>{{i.thumbs}}</span>
				</div>
			</div>
		</div>
		<div class="loading1" v-show="loading1">加载中...</div>
		<loadNo class="nodata2" v-show="nodata2"></loadNo>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import loadNo from '@/components/common/loadNo';
	export default{
		props:['type','orderBy'],
		data(){
			return{
				arr:[],
				pageNo1:1,
				leftTop:0,
				rightTop:0,
				loading1:false,
				nodata2:false,
				diyi:false,
			}
		},
		created(){
			Indicator.open();
			var self = this;
			this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:1,pageSize:10,orderBy:1}).then(res => {
				this.arr = res.data.data
			})
			var $window = $(window);
	       	var $document = $(document);
			document.addEventListener('scroll',function(){
				if($document.scrollTop() + $window.height() == $document.height()){
					if(self.diyi == false){
			     		return false;
			     	}
			     	if(self.nodata2 == true){
			     		return false;
			     	}
			     	self.loading1 = true;
			     	self.pageNo1++;
			     	self.postData('post','/shop-v1-masks_join_lst.html',{masks_id:self.$route.query.masks_id,page:self.pageNo1,pageSize:10,orderBy:self.orderBy}).then(res => {
			     		if(res.data.data.length == 0){
			     			console.log(self.leftTop,self.rightTop)
			     			self.pageNo1--;
			     			setTimeout(function(){
			     				self.nodata2 = true;
				     			if(self.leftTop>self.rightTop){
				     				$('.nodata2').eq(0).css({'position':'absolute','top':self.leftTop-12})
				     			}else{
				     				$('.nodata2').eq(0).css({'position':'absolute','top':self.rightTop-12})
				     			}
			     			},800)
			     		}
			     		self.loading1 = false;
			     		var totalbefore = self.arr.length;
						self.arr  = self.arr.concat(res.data.data);
						var totalnow = self.arr.length;
						var i = totalbefore;
						function zhixing(){
							if(i < totalnow){
								var img = new Image();
								img.src = $('.list11').eq(i).find('.img1').eq(0).attr('src');
								img.onload = function(){
									if(i-1 == -1 || i-1 == 0){
										$('.list11').eq(i).css({top:0});
										if(i%2 == 0){
											// 偶数
											self.rightTop = self.rightTop + $('.list11').eq(i).height()+15;
										}else{
											// 奇数
											self.leftTop = self.leftTop + $('.list11').eq(i).height()+15;
										}
									}else{
										if(i%2 == 0){
											// 偶数
											$('.list11').eq(i).css({top:self.rightTop});
											self.rightTop = self.rightTop + $('.list11').eq(i).height()+15;
										}else{
											// 奇数
											$('.list11').eq(i).css({top:self.leftTop});
											self.leftTop = self.leftTop + $('.list11').eq(i).height()+15;
										}
									}
									i++;
									zhixing();
								}
								img.onerror = function(){
									if(i-1 == -1 || i-1 == 0){
										$('.list11').eq(i).css({top:0});
										if(i%2 == 0){
											// 偶数
											self.rightTop = self.rightTop + $('.list11').eq(i).height()+15;
										}else{
											// 奇数
											self.leftTop = self.leftTop + $('.list11').eq(i).height()+15;
										}
									}else{
										if(i%2 == 0){
											// 偶数
											$('.list11').eq(i).css({top:self.rightTop});
											self.rightTop = self.rightTop + $('.list11').eq(i).height()+15;
										}else{
											// 奇数
											$('.list11').eq(i).css({top:self.leftTop});
											self.leftTop = self.leftTop + $('.list11').eq(i).height()+15;
										}
									}
									i++;
									zhixing();
								}
							}else{
								var length1 = Number($('.list11').length) - Number(1);
								var length2 = Number($('.list11').length) - Number(2);
								if(self.rightTop>self.leftTop){
									var zong = Number(self.rightTop) + Number(50);
									$('.faceList').eq(0).css('height',zong);
								}else{
									var zong = Number(self.leftTop) + Number(50);
									$('.faceList').eq(0).css('height',zong);
								}
							}
						};
						setTimeout(function(){
							zhixing();
						},500)
					})
				}
			})
		},
		mounted(){
			var self = this;
			var total = 10;
			var i = 0;
			function zhixing(){
				if(i < 10){
					var img = new Image();
					img.src = $('.list11').eq(i).find('.img1').eq(0).attr('src');
					img.onload = function(){
						if(i-1 == -1 || i-1 == 0){
							$('.list11').eq(i).css({top:0});
							if(i%2 == 0){
								// 偶数
								self.rightTop = self.rightTop + $('.list11').eq(i).height() +15;
							}else{
								// 奇数
								self.leftTop = self.leftTop + $('.list11').eq(i).height() +15;
							}
						}else{
							if(i%2 == 0){
								// 偶数
								$('.list11').eq(i).css({top:self.rightTop});
								self.rightTop = self.rightTop + $('.list11').eq(i).height() +15;
							}else{
								// 奇数
								$('.list11').eq(i).css({top:self.leftTop});
								self.leftTop = self.leftTop + $('.list11').eq(i).height() +15;
							}
						}
						i++;
						zhixing();
					}
					img.onerror = function(){
						if(i-1 == -1 || i-1 == 0){
							$('.list11').eq(i).css({top:0});
							if(i%2 == 0){
								// 偶数
								self.rightTop = self.rightTop + $('.list11').eq(i).height()+15;
							}else{
								// 奇数
								self.leftTop = self.leftTop + $('.list11').eq(i).height()+15;
							}
						}else{
							if(i%2 == 0){
								// 偶数
								$('.list11').eq(i).css({top:self.rightTop});
								self.rightTop = self.rightTop + $('.list11').eq(i).height()+15;
							}else{
								// 奇数
								$('.list11').eq(i).css({top:self.leftTop});
								self.leftTop = self.leftTop + $('.list11').eq(i).height()+15;
							}
						}
						i++;
						zhixing();
					}
				}else{
					self.diyi = true;
					var length1 = Number($('.list11').length) - Number(1);
					var length2 = Number($('.list11').length) - Number(2);
					// $('.list11').eq(length).css('margin-bottom','1.9rem');
					console.log(self.rightTop,self.leftTop)
					if(self.rightTop>self.leftTop){
						var zong = Number(self.rightTop) + Number(50);
						$('.faceList').eq(0).css('height',zong)
						// console.log($('.list11').eq(length1).height())
					}else{
						var zong = Number(self.leftTop) + Number(50);
						$('.faceList').eq(0).css('height',zong)
						// console.log($('.list11').eq(length2).height())
					}
				}
			};
			setTimeout(function(){
				Indicator.close();
				zhixing();
			},1000)
		},
		components:{loadNo},
		methods:{
			faceDatails1(id){
				this.$router.push({path:'/faceDetail',query:{masks_id:this.$route.query.masks_id,id:id,rid:this.$route.query.root_id}})
			}
		},
		watch:{
			type(val,oldval){
				var self = this;
				if(val != oldval){
					self.rightTop = 0;
					self.leftTop = 0;
					self.nodata2 = false;
					self.pageNo1 = 1;
					$('.faceList').eq(0).css('height',0)
					this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:1,pageSize:10,orderBy:2}).then(res => {
						this.arr = res.data.data;
						var total = 10;
						var i = 0;
						function zhixing(){
							if(i < 10){
								var img = new Image();
								img.src = $('.list11').eq(i).find('.img1').eq(0).attr('src');
								img.onload = function(){
									if(i-1 == -1 || i-1 == 0){
										$('.list11').eq(i).css({top:0});
										if(i%2 == 0){
											// 偶数
											self.rightTop = self.rightTop + $('.list11').eq(i).height() +15;
										}else{
											// 奇数
											self.leftTop = self.leftTop + $('.list11').eq(i).height() +15;
										}
									}else{
										if(i%2 == 0){
											// 偶数
											$('.list11').eq(i).css({top:self.rightTop});
											self.rightTop = self.rightTop + $('.list11').eq(i).height() +15;
										}else{
											// 奇数
											$('.list11').eq(i).css({top:self.leftTop});
											self.leftTop = self.leftTop + $('.list11').eq(i).height() +15;
										}
									}
									i++;
									zhixing();
								}
								img.onerror = function(){
									if(i-1 == -1 || i-1 == 0){
										$('.list11').eq(i).css({top:0});
										if(i%2 == 0){
											// 偶数
											self.rightTop = self.rightTop + $('.list11').eq(i).height()+15;
										}else{
											// 奇数
											self.leftTop = self.leftTop + $('.list11').eq(i).height()+15;
										}
									}else{
										if(i%2 == 0){
											// 偶数
											$('.list11').eq(i).css({top:self.rightTop});
											self.rightTop = self.rightTop + $('.list11').eq(i).height()+15;
										}else{
											// 奇数
											$('.list11').eq(i).css({top:self.leftTop});
											self.leftTop = self.leftTop + $('.list11').eq(i).height()+15;
										}
									}
									i++;
									zhixing();
								}
							}else{
								self.diyi = true;
								var length1 = Number($('.list11').length) - Number(1);
								var length2 = Number($('.list11').length) - Number(2);
								// $('.list11').eq(length).css('margin-bottom','1.9rem');
								console.log(self.rightTop,self.leftTop)
								if(self.rightTop>self.leftTop){
									var zong = Number(self.rightTop) + Number(50);
									$('.faceList').eq(0).css('height',zong)
									// console.log($('.list11').eq(length1).height())
								}else{
									var zong = Number(self.leftTop) + Number(50);
									$('.faceList').eq(0).css('height',zong)
									// console.log($('.list11').eq(length2).height())
								}
							}
						};
						setTimeout(function(){
							Indicator.close();
							zhixing();
						},1000)
					})
				}
			}
		},
		filters:{
			content(val){
				val = val.replace(/_@/g, '').replace(/_#/g, '').replace(/&nbsp;/g, '').replace(/<br\/>/g, "");
				return val;
			}
		}
	}
</script>
<style lang="less">
	.faceList{
		font-size: 0.205rem;
		color: #333;
		width: calc(~"100% - 0.34rem");
		position: relative;
		margin: 0 auto;
		border: 1px solid #f2f2f2;
		.loading1{
			position: fixed;
			bottom: 0.9rem;
			color: #999;
			left: calc(~"50% - 0.3rem");
		}
		.nodata2{
			position: fixed;
			bottom: 0.8rem;
			color: #999;
			left: -0.1rem;
		}
		.list11{
			display:inline-block;
			width:2.944rem;
			background-color:#fff;
			// height:100%;
			// overflow: auto;
			position: absolute;
			.img1{
				width: 100%;
			}
		}
		.list11:nth-child(2n){
			right: 0;
		}
		.list11:nth-child(2n+1){
			left: 0;
		}
		.user1{
			height: 0.682rem;
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem;
			position: relative;
			.img3{
				width: 0.72rem;
				height: 0.72rem;
				border-radius: 50%;
				position: absolute;
				top: -0.15rem;
				background-color: #fff;
				.img2{
					width: 0.68rem;
					height: 0.68rem;
					border-radius: 50%;
					position: absolute;
					top: 0.02rem;
					left: 0.02rem;
				}
			}
			span{
				line-height: 0.682rem;
				margin-left: 0.85rem;
				width: 1.9rem;
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			    display: inline-block;
			    font-size: 0.222rem;
			}
		}
		.detail1{
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 5;
			overflow: hidden;
			color: #666;
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem;
		}
		.zan1{
			margin-right: 0.17rem;
			float: right;
			margin-top: 0.2rem;
			margin-bottom: 0.2rem;
			color: #ef4949;
			i{
				font-size: 0.3rem;
			}
		}
	}
</style>