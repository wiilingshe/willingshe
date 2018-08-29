<template>
	<div class="inviteSort">
		<dir class="bg" v-show="role" @click="close()"></dir>
		<div style="position: absolute;z-index: 11;width: 100%;top: 0.69rem;" v-show="role">
			<div class="roleList">
				<i @click="close()" class="icon iconfont icon-guanbi1" style="position: absolute;z-index: 12;right: 0.1rem;color: #ccc;top: -0.15rem;font-size: 0.5rem;"></i>
				<div class="role1" style="margin-top:0.34rem;padding-top: 0.3rem;">
					<img src="../../../static/img/sort/duan.png">
					<span style="top:0.32rem;">活动规则</span>
				</div>
				<div style="padding:0rem 0.34rem 0.25rem;color:#666;font-size:0.24rem;line-height:0.32rem;">
					<div>1、活动期间，好友通过你分享的推广码，关注CVC摄影并成功购买MayadStudios课程，你即可获得课程售价的5%作为学费奖励；</div>
					<div>2、活动期间，邀请好友成功购买Mayad Studios课程最多者，即可获赠价值9999元的大疆Phantom 4 Pro无人机一台；</div>
					<div>3、被分享的好友必须是首次关注CVC摄影，取关重新关注无效；</div>
					<div>4、攒到的学费可无门槛用于CVC摄影其他课程的购买；</div>
					<div>5、攒满100元学费即可申请提现，每月可提现一次；</div>
					<div>6、CVC摄影的合作伙伴不参与本次活动。</div>
				</div>
				<div class="role1">
					<img src="../../../static/img/sort/duan.png">
					<span>活动时间</span>
				</div>
				<div style="padding:0rem 0.34rem 0.25rem;color:#666;font-size:0.24rem;line-height:0.33rem;">
					12月15号活动上线后到12月27号中午12点
				</div>
				<div class="role1">
					<img src="../../../static/img/sort/chang.png" style="width:1.8rem;">
					<span>推广码在哪</span>
				</div>
				<div style="padding:0rem 0.34rem 0.25rem;color:#666;font-size:0.24rem;line-height:0.33rem;">
					点击Mayad Studios课程右上角的分享图标
				</div>
				<div style="text-align:center;position:relative;">
					<img class="bt" src="../../../static/img/sort/bt.png">
					<span style="position:absolute;top: 0.1rem;left: 1.9rem;color: #fff;font-size: 0.3rem;color:#fff;">
						<router-link :to="{path:'/details',query:{ser_id:'Cg'}}">
							<span style="color:#fff;">马上攒学费</span>
						</router-link>
					</span>
				</div>
			</div>
		</div>
		<div style="height: 4.5rem;overflow: hidden;position:relative;">
			<div class="role" @click="showRole()">
				活动规则
			</div>
			<img class="sortPic" src="../../../static/img/sort/sortPic.png">
		</div>
		<div class="sortLists">
			<div class="list">
				<div style="color:#fff;background-color:#000;text-align:center;font-size:0.26rem;margin-top:1rem;" v-if="nodata">
					暂无数据
				</div>
				<table border='0' style="border-collapse:collapse;" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
					<tr v-for="(item,index) in arr">
						<td class="td1">
							<img v-if="index == 0" src="../../../static/img/sort/1.png">
							<img v-if="index == 1" src="../../../static/img/sort/2.png">
							<img v-if="index == 2" src="../../../static/img/sort/3.png">
							<img v-if="index >= 3" src="../../../static/img/sort/4.png">
							<span :class="{down:index >= 3?index<9?true:false:false,down2:index>=9?true:false}">{{index+1}}</span>
						</td>
						<td class="td2">
							<img :src="item.face">
						</td>
						<td class="td3">
							<span class="name">{{item.nickname}}</span>
						</td>
						<td class="td4">
							<span class="num">已邀好友{{item.nums}}个</span>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div style="width:100%;height:0.15rem;background-color:#000;"></div>
	</div>
</template>
<script>
	import { InfiniteScroll,Toast } from 'mint-ui';
	export default{
		data(){
			return{
				role:false,
				page:'1',
				arr:[],
				load:true,
				id:'Cg',
				nodata:false,
				arr2:[{"nickname":"佘伟林","face":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLGPMib5VAlZiabMdIRy3vzCcn3dwVK9adDBTI3gsib2E3KJa58YV8FqvCUpcFMGa2V6hdrNsIbkpK7Q/0","nums":1},
				{"nickname":"娉婷","face":"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqIOLSWIOMPkvly5lGz0vCBuZibYfUCgwClpIPG0NoOYvzcPmnsZniaX2ibUNF8gGcpZABuHqz7RmUDg/0","nums":1},
				{"nickname":"Patrick","face":"http://wx.qlogo.cn/mmopen/vi_32/uD9h6z9v3tmIm2mp1wVA73dxudHvjJW2AgwiaAia4z8axicZFY8ibuvtytzicYSdrljGibtQckST2PXia2f9xvyGsR8Fw/0","nums":1},
				{"nickname":"焦さま","face":"http://wx.qlogo.cn/mmhead/Q3auHgzwzM531nLibZjMicnekNIrn3yciaWgOfAGYH5cuG8ks4k9dhNDg/0","nums":1},
				{"nickname":"HelloBye","face":"http://wx.qlogo.cn/mmopen/vi_32/vYhuLfx1Ws6yqWzhbw6S8upwW7Zf1GPvJyKDyj1Hho6naRUxfSdafSprPLaGCxTe6Oicyc03wjM8wDctozQkzibQ/0","nums":1},
				{"nickname":"willing","face":"http://wx.qlogo.cn/mmhead/Q3auHgzwzM784RJRyhd4lzm7LjjOv9wW6uq4LPYFRoSzPJX48tXRxw/0","nums":1},
				{"nickname":"Lilly","face":"http://wx.qlogo.cn/mmhead/PiajxSqBRaEKuWkicqypWLMgyHR5yyByTpgwICQwzSLKco4NemzeXkjA/0","nums":1},
				{"nickname":"西木柚子","face":"http://wx.qlogo.cn/mmopen/vi_32/NMfW79IAJyFIyV6kY32kuW05at2bdRZwuefAriaQ4zCVNRLSASAicw03FqGffiaSickla7icLz3wCT44qjGfiaHVdLNg/0","nums":1},
				{"nickname":"brilliance","face":"https://wx.qlogo.cn/mmopen/vi_32/E8sl0c7ogPKDxJDbqVwjianHR37ukq7Hfu1qN9fPq3g6nxKq5icMgCiag4J0O0fph7vZRksbuVmHs3bElakMGpfiaQ/0","nums":1},
				{"nickname":"陈森威","face":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKo180kgHkoyQbdvXeT4OxI0tCdtf3HF9MRtNxAcutk5IRjCzy5BtlFicznX43mv3mzxW2gA7MCDJg/0","nums":1}
				],
			}
		},
		created(){
			this.global.shouquan();
			this.postData('post','/shop-v1-index_basemsg.html').then(res => {
				this.share('邀好友攒学费排行榜','',res.data.logo)
     		})
		},
		mounted(){
			this.postData('post','/shop-v1-promoter_mayad_studios.html',{page:this.page}).then(res => {
				this.arr = res.data;
				if(res.data.length>0 && res.data.length<10){
					var lastNums = res.data[res.data.length - 1].nums;
					var length = Number(10) - Number(res.data.length);
					for(let i=0;i<length;i++){
						lastNums = Number(lastNums) - Number(1);
						if(lastNums <= 0){
							lastNums = 1;
							this.arr2[i].nums = lastNums;
						}else{
							this.arr2[i].nums = lastNums;
						}
						this.arr = this.arr.concat(this.arr2[i])
					}
				}
				if(res.data.length == 0){
					this.nodata = true;
				}
			})
		},
		methods:{
			showRole(){
				this.role = true;
			},
			close(){
				this.role = false;
			},
			loadMore(){
				if(this.load == true){
					this.page = Number(this.page) + Number(1);
					this.postData('post','/shop-v1-promoter_mayad_studios.html',{page:this.page}).then(res => {
						if(res.data.length != 0){
							this.arr = this.arr.concat(res.data);
						}else{
							this.load = false;
							this.page = Number(this.page) - Number(1);
							Toast({
							  message: '加载完毕',
							  duration: 1000
							});
						}
					});
				}
			}
		}
	}
</script>
<style lang="less">
	.inviteSort{
		font-size: 0.24rem;
		min-height: 100%;
		background-color: #000;
		.bg{
			height: 100%;
			width: 100%;
			position: fixed;
			background-color: rgba(0,0,0,0.6);
			top: 0;
			z-index: 2;
			top: -0.24rem;
		}
		.roleList{
			width: 5.3rem;
			height: 8.6rem;
			background-color: #fffff4;
			border-radius: 0.17rem;
			margin:0 auto;
			.role1{
				position: relative;
				img{
					width: 1.6rem;
					margin-left: -0.09rem;
				}
				span{
					position: absolute;
					top: 0.02rem;
					left: 0.2rem;
					color: #fff;
				}
			}
			.bt{
				width: 3.37rem;
				text-align: center;
			}
		}
		.role{
			width: 1.1rem;
			height: 0.34rem;
			background-color: #ff414b;
			position: absolute;
			right: 0;
			top: 0.5rem;
			border-radius: 0.34rem 0 0 0.34rem;
			color: #fff;
			text-align: center;
			font-size: 0.205rem;
			line-height: 0.34rem;
		}
		.sortPic{
			width: 100%;
		}
		.sortLists{
			width: 96%;
			margin-left: 2%;
			background-color: #fff;
			.list{
				table{
					width: 100%;
					color: #333;
					tr{
						border-bottom: 1px solid #eee;
						height: 1.3rem;
						.td1{
							width: 0.75rem;
							position: relative;
							border-bottom: 1px solid #fff;
							span{
								position: absolute;
								top: 0.35rem;
	    						left: 0.3rem;
	    						color: #fff;
							}
							img{
								margin-left: 0.17rem;
								width: 0.41rem;
							}
							.down{
								top: 0.45rem;
							}
							.down2{
								left: 0.23rem;
								top: 0.45rem;
							}
						}
						.td2{
							width: 1.05rem;
							img{
								width: 0.853rem;
								height: 0.853rem;
								border-radius: 0.1rem;
							}
						}
						.td3{

						}
						.td4{
							span{
								float: right;
								margin-right: 0.17rem;
							}
						}
					}
				}
			}
		}
	}
</style>