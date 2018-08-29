<template>
	<div class="myEquipment">
		<div class="myEquipment-top">
			<div v-for="(i,index) in arr">
				<div class="myEquipment-body">
					<div class="myEquipment-body-line"></div>
					<div style="font-weight: bold;margin:0 0.2rem;">
						<img src="../../../static/img/home/my_Fuselage_black.png" v-if="index==0">
						<img src="../../../static/img/home/my_Cameralens_black.png" v-if="index>0">
						<span>{{i}}</span>
					</div>
					<div class="myEquipment-body-line"></div>
				</div>
				<div class="myEquipment-bodylist" v-for="(value, key, index) in list[i]">
					<div class="myEquipment-bodylist-left">
						{{key}}:
					</div>
					<div class="myEquipment-bodylist-right">
						<div class="myEquipment-bodylist-right-list" v-for="item in value">
							{{item[1]}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="myEquipment-bottom">
			<div class="myEquipment-btn" @click="updateEq()">
				更新我的装备
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				list:[],
				arr:[],
			}
		},
		created(){
			document.title = '我的装备';
			this.getData('post','/shop-v2-shoot_get_my_device.html').then(res => {
				this.list = res.data.data;
				for(var key in res.data.data){
					this.arr.push(key)
				}
			});
		},
		methods:{
			updateEq(){
				this.$router.push({path:'/updateEq'});
			}
		}
	}
</script>
<style lang="less">
	.myEquipment{
		background-color: #fff;
		width: 100%;
		height: 100vh;
		&-body{
			display: flex;
			-webkit-display:flex;
			justify-content:center;
			font-size: 0.34rem;
			color: #222;
			margin-top: 0.4rem;
			margin-bottom: 0.4rem;
			&-line{
				width:0.82rem;height:0.02rem;background-color:#222;margin-top:0.18rem
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
					color: #666;
					margin-bottom: 0.2rem;
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
			}
		}
		&-top{
			height: calc(~"100vh - 1.76rem");
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
		}
		&-bottom{
			height: 1.76rem;
			width: 100%;
			position: fixed;
			bottom: 0;
		}
		&-btn{
			font-size: 0.3rem;
			color: #fff;
			background-color: #222;
			width: calc(~"100% - 0.6rem");
			margin: 0 auto;
			text-align: center;
			line-height: 0.96rem;
			height: 0.96rem;
			border-radius: 0.06rem;
			margin-top: 0.4rem;
		}
	}
</style>