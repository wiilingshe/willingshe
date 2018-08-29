<template>
	<div class="myGift" :style="{'opacity':returnData?'1':'0'}">
		<div class="myGift-navigator">
			<div class="myGift-navigator-lists" @click="navLeft()" :style="{'color':navs==1?'#222222':'#888888'}">
				我赠送的
				<span class="line" v-if="navs==1"></span>
			</div>
			<div class="myGift-navigator-lists" @click="navRight()" :style="{'color':navs==2?'#222222':'#888888'}">
				我收到的
				<span class="line" v-if="navs==2"></span>
			</div>
		</div>
		<div class="myGift-content">
			<div class="myGift-content-box" v-show="navs==1" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-distance="0" infinite-scroll-immediate-check="false" :style="{'opacity':returnData1?'1':'0'}">
				<nodata v-if="nodata1"></nodata>
				<div class="myGift-content-box-lists" v-for="(res,index) in handselArr" :style="{'margin-bottom':handselArr.length==index+1?'0.4rem':''}">
					<div class="myGift-content-box-lists-cont" @click="toDetail1(res.compliment_type,res.lesson_id,res.order_no,res.member_id)"
					:style="{'border-bottom':handselArr.length==index+1?'none':'0.02rem solid #DDDDDD'}">
						<div class="myGift-content-box-lists-cont-imgBox">
							<img :src="res.pic" onerror="this.src=&quot;/static/img/zhanwei.png&quot;" :style="{'height':res.pic!=''?'':'1.5rem'}" />
						</div>
						<div class="myGift-content-box-lists-cont-contBox">
							<div class="myGift-content-box-lists-cont-contBox-title">{{res.title}}</div>
							<div class="myGift-content-box-lists-cont-contBox-amount">
								<span>数量：{{res.total_num}} </span>
								<span>已领取：{{res.receive_num}}</span>
							</div>
						</div>
					</div>
				</div>
				<loadNo v-if="!ifload1"></loadNo>
			</div>
			<div class="myGift-content-box" v-show="navs==2" v-infinite-scroll="loadMore2" infinite-scroll-disabled="false" infinite-scroll-distance="0" infinite-scroll-immediate-check="false" :style="{'opacity':returnData2?'1':'0'}">
				<nodata v-if="nodata2"></nodata>
				<div class="myGift-content-box-lists" v-for="(ress,index) in receiveArr" :style="{'margin-bottom':receiveArr.length==index+1?'0.4rem':''}">
					<div class="myGift-content-box-lists-cont" @click="toDetail2(ress.compliment_type,ress.lesson_id)"
					:style="{'border-bottom':receiveArr.length==index+1?'none':'0.02rem solid #DDDDDD'}">
						<div class="myGift-content-box-lists-cont-imgBox">
							<img :src="ress.pic" onerror="this.src=&quot;/static/img/zhanwei.png&quot;" :style="{'height':ress.pic!=''?'':'1.5rem'}" />
						</div>
						<div class="myGift-content-box-lists-cont-contBox">
							<div class="myGift-content-box-lists-cont-contBox-title">{{ress.title}}</div>
							<div class="myGift-content-box-lists-cont-contBox-amount">
								{{ress.receive_time}}
							</div>
						</div>
					</div>
				</div>
				<loadNo v-if="!ifload2"></loadNo>
			</div>
		</div>
	</div>
</template>
<script>
import { InfiniteScroll,Indicator } from 'mint-ui';
import loadNo from '@/components/common/loadNo';
import nodata from '@/components/common/nodata';
	export default{
		data(){
			return{
				navs:1,
				handselArr:[],
				receiveArr:[],
				ifload1:true,
				ifload2:true,
				nodata1:false,
				nodata2:false,
				page1:1,
				page2:1,
				returnData:false,
				returnData1:false,
				returnData2:false,
			}
		},
		created(){
			document.title = "我的赠礼";
			Indicator.open({
			  spinnerType: 'snake'
			});
		},
		mounted(){
			var self = this;
			this.getData('post','/shop-v1-user_get_compliment.html',{page:1}).then(res=>{
				this.returnData=true;
				this.returnData1=true;
				Indicator.close();
				if(res.data.length>0){
					this.handselArr=res.data;
					if(res.data.length<6){ //判断第二页是否有数据，如果有就拼接数据
						self.page1 = Number(self.page1)+Number(1);
						self.getData('post','/shop-v1-user_get_compliment.html',
							{
								page:this.page1
							}).then(result=>{
							if(res.data.length>0){
								self.handselArr = self.handselArr.concat(result.data);
							}
						})
					}
				}else{
					this.nodata1=true;
				}
			});
		},
		methods:{
			navLeft(){
				this.navs=1;
			},
			navRight(){
				Indicator.open({
					spinnerType: 'snake'
				});
				this.navs=2;
				this.getData('post','/shop-v1-user_get_receive.html',{page:1}).then(res=>{
					this.returnData2=true;
					if(res.status==200){
						Indicator.close();
						if(res.data.length>0){
							this.receiveArr=res.data;
						}else{
							this.nodata2=true;
						}
					}
				})
			},
			loadMore(){
				if(this.navs == 1){
					if(this.ifload1==true){
						this.page1=Number(this.page1)+Number(1);
						this.getData('post','/shop-v1-user_get_compliment.html',{page:this.page1}).then(res=>{
							if(res.data.length>0){
								this.handselArr = this.handselArr.concat(res.data);
							}else{
								this.ifload1 = false;
							}
						})
					}
				}
			},
			loadMore2(){
				if(this.navs == 2){
						if(this.ifload2==true){
							this.page2 = Number(this.page2)+Number(1);
							this.getData('post','/shop-v1-user_get_receive.html',{page:this.page2}).then(res=>{
								if(res.data.length>0){
									this.receiveArr = this.receiveArr.concat(res.data);
								}else{
									this.ifload2 = false;
								}
							})
						}
					}
				},
			toDetail1(type,id,order,mid){
				if(type=="video"){
					this.$router.push({path:'/mine-give',query:{order_no:order,member_id:mid,type:type,vid:id,}});
				}else if(type=='series'){
					this.$router.push({path:'/mine-give',query:{order_no:order,member_id:mid,type:type,ser_id:id,}});
				}
			},
			toDetail2(type,id){
				if(type=="video"){
					this.$router.push({path:'/details',query:{vid:id}});
				}else if(type=='series'){
					this.$router.push({path:'/details',query:{ser_id:id}});
				}
			}
		},
		watch:{
			navs(val,oldval){
				if(val==1){
					this.navs=1
				}else if(val==2){
					this.navs=2
				};
			}
		},
		components:{loadNo,nodata}
	}
</script>
<style lang="less">
	.myGift{
		height:100vh;
		font-size:0.28rem;
		position:relative;
		&-navigator{
			width:100%;
			height:0.92rem;
			overflow:hidden;
			white-space:nowrap;
			background-color:#fff;
			margin-bottom: 0.1rem;
			box-shadow: 1px 1px 1px #eee;
			&-lists{
				display:inline-block;
				width:100%/2;
				height:0.92rem;
				line-height:0.92rem;
				text-align:center;
				position:relative;
				font-family:PingFang-SC-Medium;
				span{
					width: 0.52rem;
					height: 0.04rem;
					background-color: #222;
					position: absolute;
					bottom: 0;
					left: calc(~"50% - 0.26rem");
				}
			}
		}
		&-content{
			width:100%;
			height:calc(~"100vh - 1.02rem");
			overflow-y: auto;
			/* overflow-x: hidden; */
			-webkit-overflow-scrolling:touch;
			&-box{
				width:100%;
				background-color: #fff;
				&-lists{
					width: calc(~"100% - 0.6rem");
					height:1.8rem;
					padding: 0.32rem 0.3rem 0 0.3rem;
					&-cont{
						width:100%;
						height:1.8rem;
						border-bottom:0.02rem solid #DDDDDD;
						&-imgBox{
							float:left;
							width:2.52rem;
							height:1.52rem;
							overflow:hidden;
							img{
								width:100%;
								border-radius: 0.06rem;
							}
						}
						&-contBox{
							float:left;
							width:4.08rem;
							height:1.52rem;
							position:relative;
							margin-left:0.25rem;
							&-title{
								font-family:'PingFang-SC-Medium';
								font-size:0.3rem;
								color:#333;
							}
							&-amount{
								position:absolute;
								bottom:0;
								color:#666;
								span{
									float:left;
									margin-right:0.35rem;
								}
							}
						}
					}
				}
			}
		}
	}
</style>