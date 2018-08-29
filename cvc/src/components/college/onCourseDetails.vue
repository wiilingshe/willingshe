<template>
	<div class="oncourseDet" :class="returnData?'':'oncourseDet-no'">
		<div class="oncourseDet-content" :style="{'height':(acType!=2 && type==1) || (acType!=2 && type==2)?'100vh':'calc(100vh - 0.9rem)'}">
			<div class="oncourseDet-content-cover">
				<!-- <img src="../../../static/img/college/oncoursedetails/my_bg.png" alt=""> -->
				<img v-if="result.lst.length != 0" class="oncourseDet-content-cover-play" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABlCAYAAAC/S5bMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI5RkMzRkM5MzNCODExRThCQTJFODgzNTkzMkE3MkFEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI5RkMzRkNBMzNCODExRThCQTJFODgzNTkzMkE3MkFEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjlGQzNGQzczM0I4MTFFOEJBMkU4ODM1OTMyQTcyQUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjlGQzNGQzgzM0I4MTFFOEJBMkU4ODM1OTMyQTcyQUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Atxe0AAALhUlEQVR42uxd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" @click="play()">
				<img  class="oncourseDet-content-cover-fen" :src="result.pic">
				<span class="courseTitle">{{result.title}}</span>
			</div>
			<div class="oncourseDet-navigator">
				<div class="oncourseDet-navigator-lists" @click="jianjie()" v-show="result.content!=null" :style="{'color':type==1?'#222':'#888'}">课程简介
					<span class="line" v-if="type==1"></span>
				</div>
				<div class="oncourseDet-navigator-lists" @click="mulu()" v-show="result.lst.length!=0" :style="{'color':type==2?'#222':'#888'}">课程目录
					<span class="line" v-if="type==2"></span>
				</div>
			</div>
			<div class="oncourseDet-box" v-show="type==1 && result.content!=null">
				<div class="intro" v-html="result.content"></div>
			</div>
			<div class="oncourseDet-box" v-show="type==2 && result.lst.length!=0">
				<div class="directory">
					<div v-if="result.lst.length>0?result.lst[0].is_foreshow==1?true:false:true">
						<div v-for="(val,index) in result.lst" @click="selectlst(val.lst_id,val.title,val)">
							<div class="directoryLists" v-if="val.is_foreshow==1 || result.is_buy_term == 1" :data-id="val.lst_id" :style="{color:nowid==val.lst_id?'#999':'#333'}">
								<img v-if="val.is_foreshow==1" class="noticeImg left" src="../../../static/img/college/oncoursedetails/home_Trailer.png" alt="">
								<span v-if="val.is_foreshow==0" class="listNum left">{{index>9?index:'0'+index}}</span>
								<span class="directoryTitle left">{{val.title}}</span>
								<img class="playImg right" :src="val.is_foreshow==1?'../../../static/img/college/oncoursedetails/home_lock.png':nowid==val.lst_id?'../../../static/img/college/oncoursedetails/home_play_mini_hover.png':'../../../static/img/college/oncoursedetails/home_play_mini.png'" alt="">
							</div>
							<div class="directoryLists borderTop" v-if="val.is_foreshow==0 && result.is_buy_term != 1" :data-id="val.lst_id" :style="{color:nowid==val.lst_id?'#999':'#333'}">
								<img v-if="val.is_foreshow==1" class="noticeImg left" src="../../../static/img/college/oncoursedetails/home_Trailer.png" alt="">
								<span v-if="val.is_foreshow==0" class="listNum left">{{index>9?index:'0'+index}}</span>
								<span class="directoryTitle left">{{val.title}}</span>
								<img class="playImg right" src="../../../static/img/college/oncoursedetails/home_lock.png" alt="">
							</div>
						</div>
					</div>
					<div v-if="result.lst.length>0?result.lst[0].is_foreshow==0?true:false:false">
						<div v-for="(val,index) in result.lst" @click="selectlst(val.lst_id,val.title,val)">
							<div class="directoryLists" v-if="val.is_foreshow==1 || result.is_buy_term == 1" :data-id="val.lst_id" :style="{color:nowid==val.lst_id?'#999':'#333'}">
								<img v-if="val.is_foreshow==1" class="noticeImg left" src="../../../static/img/college/oncoursedetails/home_Trailer.png" alt="">
								<span v-if="val.is_foreshow==0" class="listNum left">{{index>9?index+1:'0'+Number(index+1)}}</span>
								<span class="directoryTitle left">{{val.title}}</span>
								<img class="playImg right" :src="nowid==val.lst_id?'../../../static/img/college/oncoursedetails/home_play_mini_hover.png':'../../../static/img/college/oncoursedetails/home_play_mini.png'" alt="">
							</div>
							<div class="directoryLists borderTop" v-if="val.is_foreshow==0 && result.is_buy_term != 1" :data-id="val.lst_id" :style="{color:nowid==val.lst_id?'#999':'#333'}">
								<img v-if="val.is_foreshow==1" class="noticeImg left" src="../../../static/img/college/oncoursedetails/home_Trailer.png" alt="">
								<span v-if="val.is_foreshow==0" class="listNum left">{{index>9?index:'0'+index}}</span>
								<span class="directoryTitle left">{{val.title}}</span>
								<img class="playImg right" src="../../../static/img/college/oncoursedetails/home_lock.png" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
			<footer1></footer1>
		</div>
		<div class="shade" v-show="cancelPop==true" @click="closePop()"></div>
		<div class="cancelBox" v-show="cancelPop==true">
			<div class="cancelBox-mask">
				<div class="cancelBox-content">
					<img class="close" src="../../../static/img/college/offcoursedetails/my_close.png" @click="closePop()">
					<div class="cancelTitle">
						CVC摄影
					</div>
					<div class="qrCode">
						<img src="" alt="before">
					</div>
					<div class="btn">
						关注后可收到课程提醒
					</div>
				</div>
			</div>
		</div>
		<div class="signupOnSite" v-show="acType==2" @click="acType==2?toOffdet():''">
			现场报名
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import nodata from '@/components/common/nodata'
	import footer1 from '@/components/common/footer1'
	export default{
		data(){
			return{
				type:1,
				result:[],
				cancelPop:false,
				nowid:'',
				playurl:'',
				acType:'',
				returnData:false,
			}
		},
		created(){
			this.global.shouquan();
			var self = this;
			document.title='活动课程详情';
			Indicator.open({
			  spinnerType: 'snake'
			});
		},
		mounted(){
			var self = this;
			this.getData('post','/shop-v2-college-get_sdetail.html',
				{
					ca_id:this.$route.query.ca_id,
					ser_id:this.$route.query.id
				}).then(res=>{
					if(res.data.status==1){
						this.result=res.data.data;
						if(res.data.data.intro==null || res.data.data.intro==undefined){
							self.share(res.data.data.title,res.data.data.title,res.data.data.share_pic);
						}else{
							self.share(res.data.data.title,res.data.data.intro,res.data.data.share_pic);
						};
						this.acType=res.data.data.activity_data.ac_type;
						this.returnData=true;
						console.log(res.data.data.share_pic);
						Indicator.close();
					}else{
						Indicator.close();
						this.returnData=true;
					}
				})
		},
		methods:{
			jianjie(){
				this.type=1;
			},
			mulu(){
				this.type=2;
			},
			closePop(){
				this.cancelPop=false;
			},
			toOffdet(){
				this.$router.push({path:'/offCourseDetails',
					query:{
						ca_id:this.result.activity_data.ca_id,
						active_id:this.result.activity_data.activity_id,
						car_id:this.result.activity_data.car_id
					}
				})
			},
			selectlst(id,title,item){
				if(item.is_foreshow == 1){
					Toast({
						message:'预告片，暂不能观看',
						duration:2000
					})
					return false;
				}
				this.nowid = id;
				this.result.title = title;
			},
			play(){
				if(this.nowid == ''){
					Toast({
					  message: '请选择课程播放',
					  duration: 2000
					});
					return false;
				}
				this.getData('post','/shop-play-index.html',{type:2,id:this.nowid}).then(res => {
					if(res.data.status == 0){
						Toast({
						  message: res.data.msg,
						  duration: 2000
						});
					}else{
						window.location.href = res.data.url;
					}
				})
			}
		},
		/*watch:{
			type(val,oldval){
				if(val==1){
					this.type=1;
				}
				else if(val==2){
					this.type=2;
				}
			}
		},*/
		components: {footer1},
	}
</script>
<style lang="less">
	.oncourseDet{
		height:100vh;
		font-size: 0.28rem;
		position: relative;
		&-no{
			opacity: 0;
		}
		&-content{
			width:100%;
			height: calc(~"100vh - 0.9rem");
			overflow-y: auto;
			overflow-x: hidden;
			-webkit-overflow-scrolling:touch;
			&-cover{
				width:100%;
				height:4.5rem;
				position: relative;
				background-color: #000;
				box-shadow: 1px 1px 1px #eee;
				&-fen{
					width:100%;
					height:100%;
				}
				&-play{
					height: 1rem;
				    width: 1rem;
				    left: calc(~"50% - 0.5rem");
				    top: calc(~"50% - 0.5rem");
				    position: absolute;
				}
				.courseTitle{
					font-size: 0.36rem;
					color:#fff;
					position: absolute;
					left:0.3rem;
					bottom:0.3rem;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					width:80%;
				}
			}
		}
		&-navigator{
			width:100%;
			height:0.9rem;
			background-color: #fff;
			overflow: hidden;
			white-space: nowrap;
			&-lists{
				display: inline-block;
				width:100%/2;
				height:0.9rem;
				text-align: center;
				line-height: 0.9rem;
				position: relative;
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
		&-box{
			overflow: auto;/*
			height:calc(~"100% - 5.5rem");*/
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			.intro{
				background-color: #fff;
				width: 100%;
				img{
					width: 100%;
				}
			}
			.directory{
				background-color: #fff;
				padding:0 0.3rem 0 0.28rem;
				.directoryLists{
					position: relative;
					width:100%;
					height:0.64rem;
					padding:0.38rem 0 0 0;
					.noticeImg,.listNum{
						width:0.5rem;
						text-align: center;
					}
					.directoryTitle{
						font-size: 0.26rem;
						margin-left:0.2rem;
						width: 5.8rem;
					    overflow: hidden;
					    white-space: nowrap;
					    text-overflow: ellipsis;
					}
					.playImg{
						width:0.32rem;
					}
				}
			}
		}
		.shade{
			position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
			background-color: #000;
			opacity: 0.7;
			z-index: 8;
		}
		.cancelBox{
			display: table;
			width:100%;
			height:100%;
			position: fixed;
			left:0;
			top:0;
			z-index: 9;
			&-mask{
				display: table-cell;
				vertical-align: middle;
				text-align: center;
				z-index: 9;
			}
			&-content{
				position: relative;
				display: inline-block;
				width:4.22rem;
				height:5.52rem;
				background-color: #fff;
				z-index: 999;
				border-radius: 0.06rem;
				padding: 0 0.4rem;
				.close{
					width: 0.3rem;
			    display: block;
			    position: absolute;
			    right: 0.1rem;
			    top: 0.1rem;
				}
			}
			.cancelTitle{
				font-size: 0.36rem;
				color:#333;
				font-weight: 600;
				margin-top: 0.4rem;
				margin-bottom: 0.3rem;
			}
			p{
				text-align: left;
				font-size: 0.3rem;
			}
			.qrCode{
				width: 3.16rem;
		    height: 3.16rem;
		    margin: 0 auto;
				img{
					width:100%;
					height:100%;
				}
			}
			.btn{
				width:100%;
				margin-top: 0.4rem;
			}
		}
		.signupOnSite{
			width:100%;
			height:0.9rem;
			line-height: 0.9rem;
			position: absolute;
			left:0;
			bottom:0;
			text-align: center;
			color:#fff;
			background-color: #222;
			font-size: 0.28rem;
		}
		.left{
			float: left;
		}
		.right{
			float: right;
		}
		.roundButton{
			border-radius: 0.34rem;
			border:0.02rem solid #fff;
			position: absolute;
			color:#fff;
			font-size: 0.28rem;
			text-align: center;
		}
		.borderTop{
			border-top:0.02rem solid #EEEEEE;
		}
	}
</style>