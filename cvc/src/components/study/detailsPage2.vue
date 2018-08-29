<template>
	<div id="box" class="detailsPage detailsPage2">
		<div class="detailsPage2-bg" v-show="kefu1" @click="touch()"></div>
		<div class="detailsPage2-code" v-show="kefu1">
			<img class="detailsPage2-code-close" src="../../../static/img/home/my_close.png" @click="touch()">
			<div class="detailsPage2-code-title">{{list2.title}}</div>
			<img class="detailsPage2-code-code" :src="list2.kefu_qrcode">
			<div class="detailsPage2-code-tip">长按识别二维码，联系我们</div>
		</div>
		<div style="height:calc(100vh - 1rem);overflow-y:scroll;-webkit-overflow-scrolling:touch">
			<img :src="inviteData.qr_code" class="inviteCodeOut" v-show="codeOut">
			<img :src="inviteData.qr_code" class="inviteCodeOut1" v-show="codeOut">
			<!-- <div class="service" @click="tip()">
				<i class="iconfont icon-kefu"></i>
			</div> -->
			<!-- <div class="bg" v-show="kefu1" @click="touch()">
				<p style="color:#fff;margin-top:50%;text-align:center;">加载中...</p>
			</div> -->
			<div class="bg1" v-show="liwu1" @click="hide()">
			</div>
			<!-- <div class="kefuCode" v-show="kefu">
				<img :src="arr.is_buy==1?arr.after_img:arr.before_img">
			</div> -->
			<div class="kefuCode" v-show="invite" style="margin-top:1rem;">
				<img id="invite" src="">
			</div>
			<div>
				<div class="headers">
					<iframe :src="videoUrl"></iframe>
					<div class="picDan" v-show="picDan">
						<img :src="arr.video_img">
						<!-- <i class="iconfont icon-play" @click="play(arr.video_type)" v-if="arr.active_type == 2"></i> -->
						<img src="../../../static/img/home/home_play.png" style="height:1rem;width:1rem;left:calc(50% - 0.5rem);top:calc(50% - 0.5rem);" @click="play(arr.video_type)" v-if="arr.active_type == 2">
					</div>
				</div>
				<div class="title1">
					<div class="list" style="border-bottom:0;font-size:0.38rem;color:#333;font-weight:500;">{{arr.title}}</div>
					<div class="list">
						<img src="../../../static/img/home/home_Timeslot.png">
						{{arr.start_time}}——{{arr.end_time}}
					</div>
					<div class="list" style="height:0.64rem;">
						<img src="../../../static/img/home/home_Location.png" style="width:auto;height:0.34rem;float:left;top:0.1rem">
						<span style="float:left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 83%;">{{arr.address}}</span>
						<!-- <img src="../../../static/img/home/home_map.png" style="float: right;top:0.15rem;"> -->
					</div>
					<div class="list" style="border-bottom:none;">
						<img src="../../../static/img/home/home_person.png">
						限{{arr.num}}人
					</div>
				</div>
				<mt-navbar v-model="selected">
				  <mt-tab-item id="1">
				  	{{arr.left_text}}
				  	<div class="line" v-if="selected==1"></div>
				  </mt-tab-item>
				  <mt-tab-item id="2">{{arr.right_text}}<div class="line" v-if="selected==2"></div></mt-tab-item>
				</mt-navbar>
				<mt-tab-container v-model="selected">
				  <mt-tab-container-item id="1">
				  	<div v-html="arr.works_intro" class="brief">
				  		{{arr.works_intro}}
				  	</div>
				  	<div style="height:0.8rem;"></div>
				  </mt-tab-container-item>
				  <mt-tab-container-item id="2">
				  	<div v-html="arr.course_intro" class="brief">
				  		{{arr.course_intro}}
				  	</div>
				  	<div style="height:0.8rem;"></div>
				  </mt-tab-container-item>
				</mt-tab-container>
				<footer1></footer1>
			</div>
		</div>
		<div style="height:0.92rem">
			<div id="navBox" v-if="arr.is_buy == 0 && arr._status == 1">
				<div style="width:calc(100% - 0.6rem);margin:0 auto;position:relative;">
					<div style="display:table;height:1rem;">
						<div class="advisory" style="margin-left:0.3rem;" @click="tip()">
							<div class="advisory-next">
								<img src="../../../static/img/home/home_Consultation.png">
								<div>咨询</div>
							</div>
						</div>
						<div class="free" v-if="false">1999{{moneyName}}</div>
						<div class="sale" @click="toPayDemo()">购买：{{Number(arr.price)}}{{moneyName}}</div>
					</div>
				</div>
			</div>
			<div id="navBox" v-if="arr.is_buy == 1 && arr._status == 1">
				<div style="width:calc(100% - 0.6rem);margin:0 auto;position:relative;">
					<div style="display:table;height:1rem;">
						<div class="advisory" style="margin-left:0.3rem;" @click="tip()">
							<div class="advisory-next">
								<img src="../../../static/img/home/home_Consultation.png">
								<div>咨询</div>
							</div>
						</div>
						<div class="sale" style="padding-right: 2.38rem;padding-left: 2.38rem;">您已报名</div>
					</div>
				</div>
			</div>
			<!-- <div class="buyed" v-if="arr.is_buy == 1 && arr._status == 1">
				<div style="width:calc(100% - 0.6rem);margin:0 auto;position:relative;">
					<div style="display:table;height:1rem;">
						<div class="advisory" style="margin-left:0.3rem;" @click="tip()">
							<div class="advisory-next">
								<img src="../../../static/img/home/my_bar_icon4hover.png">
								<div>咨询</div>
							</div>
						</div>
						<div class="sale">您已报名</div>
					</div>
				</div>
			</div> -->
			<div class="buyed1" v-if="arr._status == 2">
				活动结束
			</div>
		</div>
	</div>
</template>

<script>
	import footer1 from '@/components/common/footer1'
	import {Tabbar,TabItem,Toast,Navbar,Indicator} from 'mint-ui';
	export default {
		data:function(){
			return{
				list:true,
				brief:false,
				innerBox:[],
				lists:'',
				ifBuy:true,
				ifFree:true,
				ifGet:true,
				ifSale:false,
				title:'暂无数据',
				intro:'暂无数据',
				content:'暂无数据',
				noData:false,
				fenmian:null,
				noFree:false,
				ifPlay:false,
				playIcon:true,
				lstId:'',
				listBox:true,
				videoUrl:'',
				picDan:true,
				endtime:'',
				starttime:'',
				ifshow:true,
				showThis:'',
				watchIndex:'',
				bgColor:false,
				kefu:false,
				kefu1:false,
				invite:false,
				liwu1:false,
				liwu:false,
				kefuPic:'',
				inviteData:[],
				type_id:'',
				videoDemo:'',
				arr:[],
				videoUrl2:'',
				codeOut:false,
				is_buy2:'',
				selected:'2',
				aaa:'<p><img src="https://www.saasxx.vip/uploads/ueditor/image/201710/24/1508841307319918.jpg" title="1508841307319918.jpg" alt="DAVID-WS（2018） 海报.jpg"></p>',
				arr3:['../../../static/img/invite/invitebg.png','','','','给你一张学习明信片','../../../static/img/invite/inviteyin.png','','','','长按识别二维码参加课程'],
				list2:[],
			}
		},
		components:{footer1},
		created(){
			this.global.shouquan();
			var self = this;
			Indicator.open();
			this.getData('post','/shop-v1-index_basemsg.html').then(res => {
				this.list2 = res.data
			})
			var url = '/shop-v1-line_active_get_active_info.html?id='+this.$route.query.id;
			this.getData('get',url).then(res => {
				this.arr = res.data.data;
				Indicator.close();
				self.share(res.data.data.title,res.data.data.subtitle,res.data.data.video_img);
				document.title = res.data.data.title;
			});
		},
		mounted(){
		},
		methods:{
			hecheng(face,fenmian,code,name,author){
				console.log(this.inviteData)
				this.arr3[1] = fenmian;
				this.arr3[2] = face;
				this.arr3[3] = name;
				this.arr3[6] = this.arr.title;
				this.arr3[7] = '主讲人：'+author;
				this.arr3[8] = code;
				var self = this;
			    var h=0;
				var mycanvas=document.createElement('canvas');
				var len = this.arr3.length;
				document.body.appendChild(mycanvas);
				$('canvas').css('display','none');
				mycanvas.width=520;
				mycanvas.height=866;
				var context=mycanvas.getContext('2d');
				context.fillStyle='#fff';
				context.fill();
			    context.fillRect(0,0,mycanvas.width,mycanvas.height);
			    context.beginPath();
			    context.stroke();
			    function drawing(num){
				    if(num<len){
				        var img=new Image;
				        img.crossOrigin = "*";
				        img.src=self.arr3[num];
				        if(num==0){
				          img.onerror=function(){
				            drawing(num+1);
				          }
				          img.onload=function(){
				            context.drawImage(img,0,0,mycanvas.width,mycanvas.height);
				            drawing(num+1);
				          }
				        }else if(num==1){
							img.onerror=function(){
								drawing(num+1);
							}
							img.onload=function(){
								context.drawImage(img,25,18,470,300);
								drawing(num+1);
							}
						}else if(num==2){
							img.onerror=function(){
								drawing(num+1);
							}
							img.onload=function(){
								context.drawImage(img,50,342,78,78);
								drawing(num+1);
							}
						}else if(num == 3){
							context.font='24px Microsoft YaHei';
				            context.fillStyle='#333';
				            context.fillText(self.arr3[num],135,370);
							drawing(num+1);
						}else if(num == 4){
							context.font='24px Microsoft YaHei';
				            context.fillStyle='#666';
				            context.fillText(self.arr3[num],135,404);
							drawing(num+1);
						}else if(num == 5){
							img.onerror=function(){
								drawing(num+1);
							}
							img.onload=function(){
								context.drawImage(img,mycanvas.width-200,312,198,110);
								drawing(num+1);
							}
						}else if(num == 6){
							context.font='bold 24px Microsoft YaHei';
				            context.fillStyle='#333';
				            context.textAlign='center';
				            context.fillText(self.arr3[num],mycanvas.width/2,510);
							drawing(num+1);
						}else if(num == 7){
							context.font='24px Microsoft YaHei';
				            context.fillStyle='#333';
				            context.textAlign='center';
				            context.fillText(self.arr3[num],mycanvas.width/2,550);
							drawing(num+1);
						}else if(num == 8){
							img.onerror=function(){
								drawing(num+1);
							}
							img.onload=function(){
								context.drawImage(img,mycanvas.width/2-68,mycanvas.height-230,140,140);
								drawing(num+1);
							}
						}else if(num == 9){
							context.font='24px Microsoft YaHei';
				            context.fillStyle='#333';
				            context.textAlign='center';
				            context.fillText(self.arr3[num],mycanvas.width/2,mycanvas.height-60);
							drawing(num+1);
						}
				      }else{
				        self.imgPath=mycanvas.toDataURL("image/jpeg");
				        $('#invite').attr('src',self.imgPath);
				      }
			    }
			    drawing(0)
			},
			tip(){
				this.kefu = true;
				this.kefu1 = true;
			},
			touch(){
				this.kefu = false;
				this.kefu1= false;
				this.invite = false;
			},
			activeTil($event,index,ifFree,number){
				if(this.ifFree == 1 || this.ifBuy == false){
					localStorage.setItem('index',number)
					localStorage.setItem('id',index)
				}
				this.picDan = true;
				this.videoUrl = '';
				var listLen = document.getElementsByClassName('listBox_li').length;
				for(let i=0;i<listLen;i++){
					document.getElementsByClassName('listBox_li')[i].style.background = "#fff";
					document.getElementsByClassName('listBox_li')[i].style.color = "#333";
				}
				$event.currentTarget.style.background="#4776e6";
				$event.currentTarget.style.color="#fff";
				this.postData('post','/shop-v1-series_detail.html',{lst_id:index}).then(res => {
					if(res.data != null){
						this.title = res.data.title;
						if(this.intro != ''){
							this.intro = res.data.intro;
						}
						this.content = res.data.content;
						this.fenmian = res.data.pic;
						this.type_id = res.data.type_id;
					}
				});
				this.playIcon = true;
				this.noFree = false;
				this.lstId = index;
				if(this.ifFree == 1){
					this.ifPlay = true;
				}else{
					if(ifFree == 1){
						this.ifPlay = true;
					}else{
						if(this.ifBuy == 1){
							this.ifPlay = false;
						}else{
							this.ifPlay = true;
						}
					}
				}
			},
			play(type){
				if(type == 1){
					this.postData('post','shop/play/active_index',{id:this.$route.query.id}).then(res => {
						this.videoUrl = res.data.url;
						this.picDan = false;
					})
				}else if(type == 2){
					this.postData('post','shop/play/active_index',{id:this.$route.query.id}).then(res => {
						window.location.href = res.data.url;
					})
				}
			},
			toPayDemo(){
				this.$router.push({path:'/toPay',query:{'a_id':this.$route.query.id,'type':'3','order_type':'1'}})
			},
			inviteclick(){
				this.invite = true;
				this.kefu1 = true;
				// this.codeOut = true;
				var inviteCode = '?type=3&v_id='+this.$route.query.id;
				this.postData('post','/shop-v1-user_invite_card.html',{'type':'3','v_id':this.$route.query.id,'fengmian':this.arr.video_img}).then(res => {
					this.inviteData = res.data.data;
					if(res.data.status == 1){
						this.hecheng(res.data.data.face,res.data.data.fengmian,res.data.data.qr_code,res.data.data.nickname,res.data.data.owner_name)
					}else{
						Toast({
							message:'获取出错',
							duraction:1000
						})
					}
				})
			},
			give(){
				this.$router.push('/mine-give');
			},
			son(){
				this.liwu1 = true;
				this.liwu = true;
				
			},
			hide(){
				this.liwu1 = false;
				this.liwu = false;
				
			}
		}

	}
</script>

<style lang="less">
.detailsPage2{
	font-size: 0.26rem;
	&-bg{
		color:#333;
		font-size:0.26rem;
		text-align: center;
		padding-bottom: 0.4rem;
		padding-top: 0.4rem;
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 8;
		background-color: rgba(0,0,0,0.6);
		top: 0;
	}
	&-code{
		color:#333;
		font-size:0.26rem;
		text-align: center;
		position: fixed;
		z-index: 9;
		width: 5rem;
		height: 5.5rem;
		background-color: #fff;
		margin:auto;
		left:0; 
		right:0; 
		top:0; 
		bottom:0;
		background-image: url(/static/img/college/my_QRcode_bg.png);
		background-size: 100%;
		border-radius: 0.06rem;
		&-title{
			font-size: 0.38rem;
			margin-top: 0.55rem;
		}
		&-code{
			width: 3rem;
			height: 3rem;
			margin:0 auto;
			margin-top: 0.25rem;
		}
		&-tip{
			font-size: 0.3rem;
			margin-top: 0.25rem;
		}
		&-close{
			width: 0.3rem;
			position: absolute;
			top: 0.3rem;
			right: 0.3rem;
		}
	}
	 .mint-navbar{
		height: 0.8rem;
		background: #fff;
		position: relative;
	}
	 .mint-navbar .mint-tab-item.is-selected{
		border-bottom: 1px solid #fff;
	    color: #222;
	    margin-bottom: 0px;
	}
	 .mint-navbar .mint-tab-item{
		color: #888;
		padding: 0.28rem 0;
	}
	//  .mint-tab-container{
	// 	margin-bottom: 0.8rem;
	// }
	 .mint-tab-item-label{
		font-size: 0.3rem;
		.line{
			width: 0.62rem;
		    height: 0.04rem;
		    background: #222;
		    bottom: 0;
		    text-align: center;
		    margin: 0 auto;
		    margin-top: 0.1rem;
		}
		@media screen and (max-width: 375px) {
		    .line{
		        width: 0.62rem;
		    height: 0.04rem;
		    background: #222;
		    bottom: 0;
		    text-align: center;
		    margin: 0 auto;
		    // margin-top: 0.1rem;
		    }
		}
	}
	.invite{
		background: url(../../../static/img/invit.jpg);
		background-size: 100% 100%;
		height: 8.9rem;
    	width: 5rem;
    	position: relative;
	}
	.invite .content{
		width: 100%;
		margin-left: 0.2rem;
	}
	.invite .content strong{
		font-size: 0.26rem;
		color: #666;
	}
	.invite .contentName{
		font-size: 0.3rem;
		color: #f1c44f;
		font-weight: 500;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
		overflow: hidden;
		width: 3.8rem;
		margin-top: 0.12rem;
    	line-height: 0.4rem;
	}
	.invite .invitePeople,.invite .invitePeople img{
		background-size: 100% 100%;
		height: 0.7rem;
	    width: 0.7rem;
	    border-radius: 0.35rem;
	}
	.borderStyle{
		height: 1.4rem;
	    width: 4.7rem;
	    border-style: double;
	    border-color: #f1c44f;
	    border-radius: 0.05rem;
	    margin-top: 0.2rem;
	    padding-top: 0.35rem;
	    margin-left: 0.1rem;
	}
	.borderStyle .kaike{
		color: #666
	}
	.borderStyle .kaitime{
		color: #e9c64e
	}
	.borderStyle .zhujiangren{
		color: #666
	}
	.borderStyle .peopleName{
		color: #e9c64e
	}
	.borderStyle ul li{
		float: left;
	}
	.borderStyle ul li:nth-child(1){
		font-weight: 500;
		font-size: 0.2rem;
		line-height: 0.32rem;
		margin-left: 0.2rem;
		position: relative;
		top: -0.1rem;
	}
	.borderStyle ul li:nth-child(2){
		float: right;
		position: relative;
    	top: -0.1rem;
	}
	.borderStyle ul li:nth-child(2) img{
		height: 1.1rem;
		width: 1.1rem;
		margin-right: 0.2rem;
	}
	.gerenInfo{
		height: 0.9rem;
		margin-left: 0.2rem;
	}
	.gerenInfo ul li{
		float: left;
	}
	.gerenInfo ul li:nth-child(2){
		margin-left: 0.1rem;
	}
	.gerenInfo .name{
		color: #666;
		font-size: 0.26rem;
	}
	.gerenInfo .tuijian{
		color: #999;
		margin-top: 0.05rem;
	}
	.bg,.bg1{
		background: rgba(0,0,0,0.6);
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 3;
	}
	.kefuCode{
		position: fixed;
		z-index: 2;
		left: 0.7rem;
		margin-top: 0.5rem;
	}
	.kefuCode img{
		width: 5rem;
		position: relative;
		z-index: 100;
		-webkit-user-select: none;
	}
	#box .bgColor{
		background: rgb(71, 118, 230);
		color: #fff;
	}
	#box .showThis{
		color: #fcab53;
		border-bottom: 0.03rem solid #fcab53;
	}
	#box{
		height: 100%;
	}
	.brief{
		/*padding: 0.1rem 0.15rem;
		font-size: 0.26rem;*/
	}
	 .curBox img{
		width: 100%;
	}
	.brief img{
		width: 100%;
	}
	.picDan{
		height: 4.52rem;
    	width: 100%;
    	background-color: #000;
    	position: absolute;
    	top: 0;
	}
	.picDan i:before{
		color: #fff;
		line-height: 4rem;
		font-size: 1.8rem;
	}
	.picDan img{
		position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 4.52rem;
	}
	.tipNoFree{
		position: absolute;
	    color: #fff;
	    top: 0;
	    line-height: 4rem;
	    font-size: 0.5rem;
	    left: 0.4rem;
	}
	.buyed1{
		position: fixed;
	    bottom: 0;
	    width: 100%;
	    height: 1rem;
	    background-color: #666;
	    text-align: center;
	    line-height: 1rem;
	    overflow: hidden;
	    color: #fff;
	    font-size: 0.34rem;
	}
	iframe{
		height: 4rem;
	    width: 100%;
	    border: 0px;
	}
	.video-js {
        width: 100%;
        height: 240px;
    }
	#box{
		font-size: 0.2rem;
	}
	.headerNav{
		display: flex;
		border-bottom: 0.02rem solid #808080;
		height: 0.6rem;
    	padding: 0.1rem;
    	background: #1b242b;
	}
	.headerNav>a,.headerNav>div{
		display: block;
		flex: 1;
		text-align: center;
		font-size: 0.26rem;	
		color: #cecece;
		padding-top: 0.13rem;
	}
	.headerNav span{
		position: relative;
    	top: -0.03rem;
	}
	.headerNav>a:nth-child(2){
		border-left:0.01rem solid #666;
		border-right: 0.01rem solid #666;
	}
	.headerNav i{
		font-size: 0.3rem;
		line-height: 0.35rem;
	}
	.headers{
		text-align: center;
		height: 4.52rem;
		background: #000000;
		position: relative;
	}
	 .title1{
		color:#666;
	    line-height: 0.65rem;
	    font-size: 0.26rem;
	    padding: 0 0.3rem;
	    background: #fff;
	}
	 .title1 .list{
		border-bottom: 1px solid #eee;
		padding: 0.1rem 0;
		font-size: 0.26rem;
		img{
			width: 0.36rem;
			position: relative;
			top: 0.07rem;
			margin-right: 0.1rem;
		}
	}
	 .title1 .list i{
		color: #333;
		margin-right: 0.1rem;
		font-size: 0.34rem;
	}
	 .middle{
		height: 0.8rem;
		display: flex;
		background: #0f171e;
		line-height: 0.6rem;
		font-size: 0.26rem;	
	}
	 .middle>div{
		flex: 1;
		text-align: center;
		border-bottom: 0.03rem solid #0f171e;
		padding: 0.1rem 0;
	}
	.listBox{
		border-bottom: 0.03rem solid #fcab53;
		color: #cecece;
	}
	 .curBox .Introduction{
		padding: 0.35rem 0;
		background: #1b242b;
		color: #fff;
		text-align: center;
	}
	.curBox .Introduction ul{
		display: inline-block;
	}
	.curBox .Introduction ul li{
		float: left;
	}
	.curBox .Introduction ul li:nth-child(1){
		/*width: 5.5rem;*/
		text-align: center;
    	padding: 0 0.05rem;
	}
	.curBox .Introduction span{
		display: block;
		margin-left: 0.5rem;
	}
	.curBox .Introduction span:nth-child(1){
		color: #cecece;
		font-size: 0.213rem;
	}
	.curBox .Introduction span:nth-child(2){
		color: #8f9497;
		font-size: 0.2rem;
	}
	.listBox_li{
		height: 0.83rem;
		padding-left: 0.4rem;
	}
	.listBox_li span{
		display: inline-block;
	    top: -0.03rem;
	    position: relative;
	    margin-left: 0.15rem;
	    width: 4.5rem;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.icon-play:before,.icon-suo:before{position: relative;top: 0.05rem;color: #080808}
	.listBox_inner{
		border-top: 0.02rem solid #333;
	}
	.listBox_inner li{
		font-size: 0.23rem;
		border-bottom: 0.02rem solid #a7a9ac;
		font-size: #283c4b;
	}
	.listBox_inner i{
		font-size: 0.6rem;
		font-weight: bolder;
	}
	.briefBox{
		color: #cecece;
	}
	 p:nth-child(3){
		padding: 0.2rem 0.5rem 0.1rem;
		font-size: 0.26rem;
		color: black;
		font-weight: bolder;
	}
	 .recommend{
		/*display: flex;*/
		padding: 0 0.5rem 0.2rem;
		/*float: left;*/
	}
	.recommend li{
		float: left;
		width: 50%;
		/*max-width: 4.5rem;*/
		flex:1;
		padding: 0.05rem;
		display: inline-block;
		box-sizing: border-box;
	}
	.recommend img,.recommend span{
		display: block;
		width: 100%;
		text-align: center;
		color: #6b6b6b;
		font-size: 0.2rem;
	}
	.recommend span{
		margin-top: 0.05rem;
	}
	 .recommend img{
		height: 1.9rem;
	}
	.buyed,
	 #navBox {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 1rem;
		background-color: #fff;
		color: #333;
		display: table;
		.advisory{
			font-size: 0.22rem;
			width: 1.1rem;
			display: table-cell;
			vertical-align: middle;
			&-next{
				margin-left: 0.2rem;
				img{
					height: 0.46rem;position: relative;
					top: 0.06rem;
					left: -0.02rem;
				}
				div{
					position: relative;top: 0.04rem;
				}
			}
		}
		.free{
			line-height: 1rem;
			position: relative;
    		left: 1rem;
    		color: #666;
    		text-decoration: line-through;
		}
		.sale{
			position: absolute;
			right: 0;
			top: 0.12rem;
			padding-right: 0.38rem;
			padding-left: 0.38rem;
			height: 0.76rem;
			background-color: #222;
			border-radius: 0.06rem;
			color: #fff;
			line-height: 0.76rem;
			overflow: hidden;
		}
	}
	.buyed .sale{
		padding-right: 2.38rem;
    	padding-left: 2.38rem;
	}
	.share{
		width: 100%;
	}
	 .inviteCodeOut{
		width:100%;
		position:fixed;
		top:1rem;
		z-index:3;
		opacity:0;
		width: 5rem;
    	margin-left: 0.7rem;
	}
	 .inviteCodeOut1{
		width:100%;
		position:fixed;
		top:6rem;
		z-index:3;
		opacity:0;
		width: 5rem;
    	margin-left: 0.7rem;
	}
	.share>div{
		/*height: 0.8rem;*/
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		
	}
	
	
	 .service{
		margin-right: 0.3rem;
		text-align: center;
		position: fixed;
		bottom: 1.65rem;
	    right: -0.3rem;
	    color: #333;
	    background: rgba(0,0,0,0.6);
    	padding: 0.1rem;
    	z-index: 11;
	}
	.icon-kefu{
		color: #26A2FF;
	}
	.icon-liwu{
		color: #04BE02;
	}
	
	/*弹出礼物的盒子*/
	.liwu_box{
		background: white;
		width: 80%;
		height: 6rem;
		margin: 2rem 10%;
		border: 1px solid #CCCCCC;
		position: fixed;
		z-index: 9999;
	}
	
	.liwu_title{
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: 0.3rem;
		text-align: center;
	}
	.liwu_describe{
		text-align: center;
		color: #666;
		font-size: 0.24rem;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	.liwu_number{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0 0.2rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.26rem;
	}
	
	.liwu_input{
		width: 0.4rem;
		margin-left: 0;
	}
	
	.liwu_total{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 0.8rem;
		line-height: 0.8rem;
		margin: 0 0.2rem;
		border-bottom: 1px solid #CCCCCC;
		border-top: 1px solid #CCCCCC;
		font-size: 0.24rem;
	}
	
	.liwu_btn{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 0.8rem;
	}
	
	.liwu_btn div{
		width: 2.2rem;
		height: 0.6rem;
		background: #26A2FF;
		color: white;
		line-height: 0.6rem;
		text-align: center;
		border-radius: 0.3rem;
		font-size: 0.24rem;
		
		
	}
}
</style>