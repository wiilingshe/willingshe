<!--视频详情页-->
<template>
	<div class="box" style="background:#f1f2f6;height:100%;">
		<mt-popup v-model="popupVisible" position="top" :modal=false>
		  {{tip}}
		</mt-popup>
		<div class="boxs" v-for="j in arr">
		<div class="heaer">
			<div>
				<div style="margin-bottom:0.06rem;"><span style="color:#666;margin-left: 0.17rem;">订单编号：</span><span style="color:#999">{{j.order_no}}</span></div>
				<div><span style="color:#666;margin-left: 0.17rem;">下单时间：</span><span style="color:#999">{{j.create_time}}</span></div>
			</div>
		</div>
		
		<div class="main">
			<div class="main_box" @click="todetail()">
				<div class="left">
					<img :src=j.pic alt="" :onerror="errorImg02"/>
				</div>
				<div class="right">
					<div>{{ j.title }}</div>
					<div>导师：<span>{{ j.username }}</span></div>
				</div>
			</div>
		</div>
		
		<div class="pic">
			<div class="money">
			    <div>商品金额</div>
				<div style="color:#666">￥{{ j.total_fee_old }}</div>
			</div>
			<div class="discount">
				<div>余额抵扣</div>
				<div style="color:#666">-￥{{Number(j.recharge_balance)+Number(j.balance)+Number(j.largess_balance)}}</div>
			</div>
			<div class="last">
				应付总额<span style="color:red">￥{{j.total_fee_new}}</span>
			</div>
		</div>
		<div class="footer1">
			<div @click="cancel()" v-if="j.status==1">取消订单</div>
			<div @click="pay()" v-if="j.status==1">支付订单</div>
			<div @click="deleteList()" v-if="j.status==3 || j.status==2">删除订单</div>
		</div>
		</div>
	</div>
</template>

<script>
	import {Toast,Popup} from 'mint-ui'
	export default {
		data(){
			return{
				arr:[],
				errorImg02: 'this.src="' + require('../../../../static/img/1111.png') + '"',
				quxiao:true,
				zhifu:true,
				shanchu:true,
				popupVisible:false,
				tip:'--',
				
			}
		},
		created(){
			this.global.shouquan();
			var This = this;
			this.postData('post','/shop-v1-order_detail.html',{'order_no':this.$route.query.details,type:'video'}).then(res => {
                this.arr.push(res.data)
                if(res.data.status==0){
                	this.tip = res.data.msg;
					this.popupVisible = true;
					setTimeout(function(){
						This.popupVisible = false;
					},1500)
                }
			});
		},
		methods:{
			cancel(){
				var self = this;
				this.postData('post','/shop-v1-order_video_cancel.html',{order_no:this.$route.query.details}).then(res => {
					if(res.data.status == 1){
						this.tip = '取消成功'
						this.popupVisible = true;
						setTimeout(function(){
							self.popupVisible = false;
						},1500)
						this.postData('post','/shop-v1-order_detail.html',{'order_no':this.$route.query.details,type:'video'}).then(res => {
		                	this.arr = []
			                this.arr.push(res.data)
						});
					}
				})
			},
			deleteList(){
				var self = this;
				this.postData('post','/shop-v1-order_video_del.html',{order_no:this.$route.query.details}).then(res => {
					if(res.data.status == 1){
						this.tip = '删除成功'
						this.popupVisible = true;
						setTimeout(function(){
							self.popupVisible = false;
						},1500)
						setTimeout(function(){
							self.$router.push({path:'/mine-order'})
						},500)
					}
				})
			},
			pay(){
				this.$router.push({path:'payWay',query:{'orderNo':this.$route.query.details,'type':'1',vid:this.$route.query.vid}});
			},
			todetail(){
				this.$router.push({path:'/details',query:{vid:this.$route.query.vid}})
			}
		},
		mounted(){
			this.share('视频详情页','我的个人中心',this.sharePic);
		}
	}
</script>

<style scoped>
	.ddTitle{
		height: 0.8rem;
		width: 100%;
		font-size: 0.4rem;
		text-align: center;
		line-height: 0.8rem;
		background: #fff;
	}
	.box{
		display: flex;
		flex-direction: column;
	}
	
	.heaer{
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
		background: #fff;
		font-size: 0.221rem;
		height: 0.938rem;
		display: table;
		width: 100%;
	}
	.heaer>div{
		display: table-cell;
		vertical-align: middle;
	}
	.reds{
		color: red;
	}
	.main{
		display: flex;
		flex-direction: column;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		background-color: #fff;
	}
	
	.main_box{
		display: flex;
		flex-direction: row;
		
	}
	
	.left{
		width: 3rem;
		height: 1.8rem;
		margin: 0 0.2rem;
	}
	
	.left img{
		width: 100%;
		height: 100%;
	}
	
	.right{
		flex: 1;
		font-size: 0.26rem;
		margin: 0rem 0.2rem 0rem 0;
		position: relative;
	}
	
	.right>div:nth-child(1){
		width: 3rem;
		font-size: 0.238rem;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		color:black;
	}
	
	.right>div:nth-child(2){
		font-size: 0.238rem;
		text-align: left;
		
	}
	
	.right>div:nth-child(3){
		font-size: 0.238rem;
		display: flex;
		flex-direction: row;
		color: #999;
	}
	.right>div:nth-child(4){
		font-size: 0.238rem;
		display: flex;
		flex-direction: row;
		color: #999;
		position: absolute;
		bottom: 0;
	}
	
	.pic{
		display: flex;
	    flex-direction: column;
	    background: #fff;
	    color: #666;
	}
	.money,.discount{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/*margin: 0 0.17rem;*/
		font-size: 0.221rem;
		padding:0.17rem 0.17rem;
	}
	
	.last{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.26rem;
		margin-right: 0.2rem;
	}
	
	.red{
		color: red;
	}
	
	.footer1{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		position: fixed;
		bottom: 0;
	   text-align: center;
	   background: #fff;
	    border-top: 1px solid #eee;
	    height: 0.8rem;
	}
	
	.footer1>div:nth-child(1){
		width: 1.22rem;
		height: 0.46rem;
		border: 1px solid #ccc;
		font-size: 0.221rem;
		line-height: 0.46rem;
		margin: 0.14rem;
		border-radius: 0.05rem;
		color: #999;
	}
	
	.footer1>div:nth-child(2),.footer1>div:nth-child(3){
		width: 1.22rem;
		height: 0.46rem;
		font-size: 0.221rem;
		line-height: 0.46rem;
		background: #fe5875;
		color: white;
		border: 1px solid #fe5875;
		margin: 0.14rem;
		border-radius: 0.05rem;
	}
	.red{
		color: white;
		font-size: 0.2rem;
	}
	
	.org{
		font-size: 0.2rem;
		color: deepskyblue;
	}
	
	.ccc{
		color: #CCCCCC;
		font-size: 0.26rem;
	}
	.del_order{
		width: 1.2rem;
		height: 0.6rem;
		font-size: 0.26rem;
		border: 0.01rem solid #3385FF;
		background: #3385FF;
		color: white;
		text-align: center;
		line-height: 0.6rem;
		
	}
	
	
</style>