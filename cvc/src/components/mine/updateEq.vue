<template>
	<div class="myEquipment1">
		<div class="myEquipment1-title">
			<img class="myEquipment1-title-img1" src="../../../static/img/home/my_kuang.png">
			<div>您的摄影装备是</div>
			<img class="myEquipment1-title-img2" src="../../../static/img/home/my_kuang.png">
		</div>
		<div v-for="(i,index) in arr">
			<div class="myEquipment1-body">
				<div class="myEquipment1-body-line"></div>
				<div style="font-weight: bold;margin:0 0.2rem;">
					<img src="../../../static/img/home/my_Fuselage.png" v-if="index==0">
					<img src="../../../static/img/home/my_Cameralens.png" v-if="index>0">
					<span>{{i}}</span>
				</div>
				<div class="myEquipment1-body-line"></div>
			</div>
			<div class="myEquipment1-bodylist" v-for="(value, key, index) in list[i]">
				<div class="myEquipment1-bodylist-left">
					{{key}}
				</div>
				<div class="myEquipment1-bodylist-right">
					<div class="myEquipment1-bodylist-right-list" v-for="item in value" :data-id="item.lsd_id" @click="selected($event)">
						{{item.d_model}}
					</div>
				</div>
			</div>
		</div>
		<div class="myEquipment1-btn" style="background-color: #fff;" @click="updateEq()">
			完成
		</div>
	</div>
</template>
<script>
	import { Indicator,Toast } from 'mint-ui';
	export default{
		data(){
			return{
				selected1:false,
				list:[],
				arr:[],
			}
		},
		created(){
			this.global.shouquan();
			document.title = '更新装备';
			Indicator.open();
			this.getData('post','/shop-v2-shoot_device_lst.html').then(res => {
				this.list = res.data;
				for(var key in res.data){
					this.arr.push(key)
				}
				this.getData('post','/shop-v2-shoot_get_my_device.html').then(res => {
					var arr = [];
					var list = [];
					for(var key in res.data.data){
						arr.push(key)
					}
					for(let i=0;i<arr.length;i++){
						for(var key in res.data.data[arr[i]]){
							list = list.concat(res.data.data[arr[i]][key])
						}
					}
					this.$nextTick(function(){
						for(let x=0;x<list.length;x++){
							for(let y=0;y<$('.myEquipment1-bodylist-right-list').length;y++){
								if($('.myEquipment1-bodylist-right-list').eq(y).attr('data-id') == list[x][0]){
									$('.myEquipment1-bodylist-right-list').eq(y).addClass('myEquipment1-bodylist-right-selected');
								}
							}
						}
						Indicator.close();
					})
				})
			})
		},
		methods:{
			updateEq(){
				var self = this;
				Indicator.open();
				var arr = '';
				for(let y=0;y<$('.myEquipment1-bodylist-right-list').length;y++){
					if($('.myEquipment1-bodylist-right-list').eq(y).attr('class').indexOf('myEquipment1-bodylist-right-selected') != -1){
						if(arr == ''){
							arr = arr + $('.myEquipment1-bodylist-right-list').eq(y).attr('data-id')
						}else{
							arr = arr + ',' + $('.myEquipment1-bodylist-right-list').eq(y).attr('data-id')
						}
					}
				}
				this.getData('post','/shop-v2-shoot_update_my_device.html',{ids:arr}).then(res => {
					if(res.data.status == 1){
						Indicator.close();
						Toast({
						  message: res.data.msg,
						  iconClass: 'icon iconfont icon-dui1',
						  duration: 2000
						});
						self.$router.push({path:'/myEquipment'});
					}else{
						Indicator.close();
						Toast({
						  message: res.data.msg,
						  iconClass: 'icon iconfont icon-2',
						  duration: 2000
						});
					}
				})
			},
			selected(e){
				if($(e.target).attr('class').indexOf('myEquipment1-bodylist-right-selected') != -1){
					$(e.target).removeClass('myEquipment1-bodylist-right-selected');
				}else{
					$(e.target).addClass('myEquipment1-bodylist-right-selected');
				}
			}
		}
	}
</script>
<style lang="less">
	.myEquipment1{
		background-color: #fff;
		width: 100%;
		background-image: url('../../../static/img/home/my_equipmentbg.png');
		background-size: 100%;
		height: 100vh;
		overflow: scroll;
		-webkit-overflow-scrolling:touch;
		color: #fff;
		&-title{
			width: 4.5rem;
			height: 1.2rem;
			position: relative;
			text-align: center;
			font-size: 0.56rem;
			line-height: 1.2rem;
			margin: 0 auto;
			margin-top: 0.72rem;
			margin-bottom: 0.68rem;
			&-img1{
				height: 0.6rem;
				position: absolute;
				top: 0;
				left: 0;
			}
			&-img2{
				height: 0.6rem;
				transform: rotate(180deg);
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
		&-body{
			display: flex;
			-webkit-display:flex;
			justify-content:center;
			font-size: 0.34rem;
			color: #fff;
			margin-top: 0.4rem;
			margin-bottom: 0.4rem;
			&-line{
				width:0.82rem;height:0.02rem;background-color:#fff;margin-top:0.18rem;
			}
			img{
				height: 0.34rem;
				position: relative;
				top: -0.05rem;
			}
			span{
				position: relative;
				top: -0.08rem;
			}
		}
		&-bodylist{
			width: calc(~"100% - 0.6rem");
			margin: 0 auto;
			margin-top: 0.2rem;
			&-left{
				font-size: 0.3rem;
				width: 0.8rem;
				display: inline-block;
				vertical-align: top;
				line-height: 1.1rem;
    			overflow: hidden;
			}
			&-right{
				width: calc(~"100% - 0.8rem");
			    display: inline-block;
			    vertical-align: top;
			    margin-left: -0.3rem;
				&-list,&-list1{
					font-size: 0.28rem;
					border:1px solid #999;
					display: inline-block;
					color: #fff;
					margin-bottom: 0.2rem;
				}
				&-selected{
					background-color: #fff;
					color: #333;
				}
				&-list{
					width: 1.8rem;
				    height: 0.9rem;
				    text-align: center;
				    line-height: 0.9rem;
				    overflow: hidden;
				    margin-left: 0.18rem;
				}
				&-list1{
					padding:0.34rem 0.15rem;
				}
				textarea{
					background-color: transparent;
					outline-style: none;
					border-radius: #999;
					width: calc(~"100% - 0.5rem");
					height: calc(~"2rem - 0.4rem");
					resize : none;
					padding:0.2rem;
					caret-color: #fff;
					font-size: 0.3rem;
					color: #fff;
				}
			}
		}
		&-btn{
			font-size: 0.3rem;
			color: #222;
			width: calc(~"100% - 0.6rem");
			margin: 0 auto;
			text-align: center;
			line-height: 0.96rem;
			height: 0.96rem;
			border-radius: 0.06rem;
			margin-top: 0.4rem;
			margin-bottom: 0.5rem;
			cursor: pointer;
		}
	}
</style>