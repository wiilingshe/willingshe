<template>
	<div id="box" class="detailsPage">
		<audio id="audio"></audio>
		<mt-popup v-model="popupVisible" position="middle">请选择播放视频</mt-popup>
		<img :src="inviteData.qr_code" class="inviteCodeOut" v-show="codeOut">
		<img :src="inviteData.qr_code" class="inviteCodeOut1" v-show="codeOut">
		<div class="service" @click="tip()">
			<i class="iconfont icon-kefu"></i>
		</div>
		<div class="give" @click="son()">
			<i class="iconfont icon-liwu"></i>
		</div>
		<div class="bg" v-show="kefu1" @click="touch()"></div>
		<div class="bg1" v-show="liwu1" @click="hide()">
		</div>
		<div class="liwu_box" v-show="liwu">
			<div class="liwu_title">{{inviteData.nickname}}</div>
			<div class="liwu_describe">赠礼将于90天后过期</div>
			<div class="liwu_describe">过期未领取的课程将不退回</div>
			<div class="liwu_number">
				<div>赠送数量</div>
				<div>1份</div>
			</div>
			<div class="liwu_total">
				<span>合计</span>
				<span>&yen{{lists.total_fee}}</span>
			</div>
			<div class="liwu_btn" @click="topayGive()">
				<div>打包1份赠礼</div>
			</div>
			</div>
		<div class="kefuCode" v-show="kefu">
			<img :src="kefuPic">
		</div>
		<div class="kefuCode" v-show="invite">
			<div class="invite">
				<div style="position:absolute;bottom:-0.2rem;">
					<div class="gerenInfo">
						<ul>
							<li>
								<div class="invitePeople">
									<img :src="inviteData.face">
								</div>
							</li>
							<li>
								<strong class="name">{{inviteData.nickname}}</strong>
								<div class="tuijian">向你推荐一个很棒的{{inviteData.msg}}</div>
							</li>
						</ul>
					</div>
					<div class="content">
						<strong>CVC摄客直播间</strong>
						<div class="contentName">{{inviteData.title}}</div>
					</div>
					<div class="borderStyle">
						<ul>
							<li>
								<div class="zhujiangren">主讲人</div>
								<div class="peopleName">{{inviteData.owner_name}}</div>
							</li>
							<li>
								<img :src="inviteData.qr_code">
							</li>
						</ul>
					</div>
					<div style="position: relative;top: -0.4rem;left: 2.5rem;">长按识别二维码参加课程</div>
				</div>
			</div>
		</div>
		<div class="headerNav">
			<router-link to="/mine">
				<i class="iconfont icon-yonghu"></i>
				<span>个人中心</span>
			</router-link>
			<router-link to="/course">
				<i class="iconfont icon-sousuo"></i>
				<span>更多课程</span>
			</router-link>
			<div @click="inviteclick()">
				<i class="iconfont icon-checkbox-xuanzhongbufen"></i>
				<span>邀请卡</span>
			</div>
		</div>
		<!-- <div v-show="ifGet" v-if="!noData" style="text-align:center">加载中...</div>
		<div v-if="noData" style="text-align:center">获取不到数据</div> -->
		<div v-show="!ifGet">
		<!-- <div> -->
			<div class="headers">
				<iframe :src="videoUrl"  allowfullscreen="true" allowtransparency="true"></iframe>
				<div class="picDan" v-if="picDan">
					<img :src="fenmian" v-show="fenmian != null">
					<i class="iconfont icon-play" @click="paly()" v-show="playIcon"></i>
					<div class="tipNoFree" v-show="noFree">付费内容，请购买后观看</div>
				</div>
			</div>
			<div class="title">{{title}}</div>
			<div style="height:calc(100% - 6.9rem)">
				<mt-navbar v-model="selected">
				  <mt-tab-item id="1" v-if="courseList">课程列表</mt-tab-item>
				  <mt-tab-item id="2">课程简介</mt-tab-item>
				  <!-- <mt-tab-item id="3">付费问答</mt-tab-item> -->
				</mt-navbar>
				<mt-tab-container v-model="selected">
				  <mt-tab-container-item id="1" v-if="courseList">
				  	<div class="curBox">
						<div class="Introduction">
							<ul>
								<li>{{intro}}</li>
								<li class="share">
									<div>
									</div>
								</li>
							</ul>
						</div>

						<ul class="listBox_inner">
							<li v-for="(item,index) in innerBox" class="listBox_li" @click="activeTil($event,item.lst_id,item.is_free,index,item.is_foreshow)" :class="{bgColor:index == watchIndex ? watchIndex === '' ? false :true :false}">
								<i class="iconfont icon-play" v-if="item.is_foreshow==1?false:ifFree==1?true:isBuy==2?true:item.is_free==1?true:false"></i>
								<i class="iconfont icon-suo" v-if="item.is_foreshow==1?true:ifFree==1?false:isBuy==2?false:item.is_free==1?false:true"></i>
								<span>{{item.title}}</span>
							</li>
						</ul>
					</div>
				  </mt-tab-container-item>
				  <mt-tab-container-item id="2">
				  	<div class="brief" v-html="content">
						{{content}}
					</div>
				  </mt-tab-container-item>
				  <mt-tab-container-item id="3">
				  	<div v-show="!ifAsk">
				  		<div class="askStatus">
				  			<span @click="askChoose(0)" :class="{clickthis:clickthis1}">全部</span>
				  			<span @click="askChoose(1)" :class="{clickthis:clickthis2}">未回答</span>
				  			<span @click="askChoose(2)" :class="{clickthis:clickthis3}">已回答</span>
				  		</div>
				  		<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-distance="1" infinite-scroll-immediate-check="false">
				  			<div v-show="load5" class="load">加载中...</div>
						  	<li v-for="item in arr">
							  	<div class="answerUp">
								  	<div style="margin:0 0.4rem;">
								  		<div class="answer">
								  			<div class="personal">
								  				<ul>
								  					<li>
								  						<img :src="item.face">
								  					</li>
								  					<li>
								  						<span class="name">{{item.nickname}}</span>
								  					</li>
								  				</ul>
								  			</div>
								  			<div class="problem">
								  				{{item.question}}
								  			</div>
								  			<div style="position:relative" v-if="item.status == 2">
								  				<div class="voice" @click="tap(item.id)">
								  					<svg t="1509953101934" class="icon" style="position: absolute;color: #fff;left: 0.2rem;top:0.2rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
								  						<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
								  						<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
								  						<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
								  					</svg>
								  					<!-- <i class="iconfont icon-audio-left"></i> -->
								  					<span>付费偷偷听</span>
								  				</div>
								  				<span class="listlenCount">听过{{item.eavesdrop_nums}}</span>
								  			</div>
								  		</div>
								  	</div>
							  	</div>
						  	</li>
						  	<div v-show="load3" class="load">加载中...</div>
						  	<div v-show="load6" class="load">无数据</div>
						  	<div v-show="load4" class="load">
                  <loadNo></loadNo>
                </div>
						</ul>
				  	</div>
				  	<div v-show="ifAsk">
				  		<textarea class="askText" placeholder="最少5字，最多50字" v-model="textBox"></textarea>
				  		<div class="publicStatus">
				  			<ul>
				  				<li><span class="yuan" :class="{red:ifred}"></span><input type="radio" name="public" v-model="picked" value="open">公开</li>
				  				<li><span class="yuan" :class="{red:!ifred}"></span><input type="radio" name="public" v-model="picked" value="private">私密</li>
				  			</ul>
				  		</div>
				  	</div>
				  </mt-tab-container-item>
				</mt-tab-container>
			</div>
			<div v-if="ifFree == 1 ? false :true && isOn == 1">
				<div id="navBox" v-if="isOn && ifBuy" @click="toPayDemo()">
					<div style="width:100%;display:table;height:0.8rem;" v-if="ifSale == true">
						<div style="display:table-cell;vertical-align: middle;">
							<span  style="text-decoration:line-through;margin-right:0.2rem">&yen{{lists.total_fee}}</span>
							<span>&yen{{lists.sales_fee}}</span>
							<div>立即购买</div>
						</div>
					</div>
					<div v-if="ifSale == false" style="width:100%;display:table;height:0.8rem;">
						<div style="display:table-cell;vertical-align: middle;">
							&yen{{lists.total_fee}}
							<div>立即购买</div>
						</div>
					</div>
				</div>
			</div>
			<div class="buyed" v-if="!isOn && ifBuy">
				未上架无法购买
			</div>
			<div class="buyed" @click="tip()" v-show="isBuy == 2">
				此系列课程你已经购买
			</div>
			<div class="ask" v-show="selected == 3 && askshow" @click="quiz()">向他提问</div>
			<div class="ask2" v-show="selected == 3 && !askshow">
				<ul>
					<li @click="payAsk()">提问</li>
					<li @click="goBack()">返回</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {Tabbar,TabItem,Toast,Navbar,InfiniteScroll,Popup,Indicator,MessageBox } from 'mint-ui';
  import loadNo from '@/components/common/loadNo';

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
				// noData:false,
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
				liwu1:false,
				liwu:false,
				kefuPic:'',
				invite:false,
				inviteData:[],
				type_id:'',
				videoDemo:'',
				isOn:'',
				isBuy:'',
				codeOut:false,
				selected:'2',
				ifAsk:false,
				askshow:true,
				arr:[],
				pageNo:'1',
				picked:'open',
				ifred:true,
				textBox:'',
				courseList:'true',
				askStatus:'0',
				load3:false,
				load4:false,
				load5:true,
				load6:false,
				clickthis1:true,
				clickthis2:false,
				clickthis3:false,
				is_foreshow:'',
				popupVisible:false,
				playing2:true,
				playing:true,
			}
		},
		created(){
			var docm = document;
			this.global.shouquan();
			var href = window.location.href;
			var self = this;
			Indicator.open();
			if(href.indexOf('vid') != -1){
				this.courseList = false;
				var idd = this.$route.query.vid;
				this.postData('post','/shop-v1-video_detail.html',{vid:this.$route.query.vid}).then(res => {
					if(res.status == 200){
						Indicator.close();
						if(res.data != null){
							docm.title = res.data.title;
							this.listBox = false;
							this.type_id = res.data.type_id;
							this.list = false;
							this.brief = true;
							this.title = res.data.title;
							this.intro = res.data.intro;
							this.content = res.data.content;
							this.lists = res.data
							this.ifFree = res.data.is_free;
							this.isBuy = res.data.is_buy;
							this.fenmian = res.data.pic;
							this.isOn = res.data.is_on;
							if(res.data.is_buy == 1){
								this.ifBuy = true;
							}else if(res.data.is_buy == 2){
								this.ifBuy = false;
							}
							this.ifGet = false;
							if(res.data.sales_starttime){
								var starttime = res.data.sales_starttime.replace(/-/g, "/")
								var endtime = res.data.sales_endtime.replace(/-/g, "/")
								var nowtime = this.global.format().replace(/-/g, "/");
								if(starttime <=  nowtime && nowtime <= endtime){
									this.ifSale = true;
								}else{
									this.ifSale = false;
								}
							}
							self.share(this.title,this.intro,this.fenmian)
						}else{
							// this.noData = true;
						}
					}
				});
				// var inviteCode = 'shop-v1-user_invite_card.html?type=1&v_id='+this.$route.query.vid;
				// this.getData('get',inviteCode).then(res => {
				// 	this.inviteData = res.data.data
				// })
				this.postData('post','/shop-v1-ask_get_video_detail_lst.html',{vid:idd,page:this.pageNo,status:'0'}).then(res => {
					this.load5 = false;
					this.arr = res.data;
					if(res.data.length == 0){
						this.load6 = true;
					}
				})
			}else if(href.indexOf('ser_id') != -1){
				var idd = this.$route.query.ser_id;
				this.postData('post','/shop-v1-series_show.html',{ser_id:this.$route.query.ser_id}).then(res => {
					if(res.status == 200){
						Indicator.close();
						if(res.data != null){
							docm.title = res.data.ser_title;
							if (res.data.is_free == 1 || res.data.is_buy == 2) {
								// 记录看到第几个
								if(localStorage.getItem(this.$route.query.ser_id) != null){
									this.watchIndex = JSON.parse(localStorage.getItem(this.$route.query.ser_id)).index;
									this.postData('post','/shop-play-index.html',{lst_id:JSON.parse(localStorage.getItem(this.$route.query.ser_id)).id}).then(res => {
										this.videoDemo = res.data.url;
										// this.videoUrl = res.data.url;
										if(JSON.parse(localStorage.getItem(this.$route.query.ser_id)).index){
											this.picDan = true
										}
									})
									this.postData('post','/shop-v1-series_detail.html',{lst_id:JSON.parse(localStorage.getItem(this.$route.query.ser_id)).id}).then(res => {
										if(res.data != null){
											console.log(res.data)
											this.fenmian = res.data.pic;
											this.type_id = res.data.type_id;
										}
									});
								}
							}else{
								this.list = false;
								this.brief = true;
								this.ifshow = false;

							}
							this.title = res.data.ser_title;
							this.intro = res.data.intro;
							this.content = res.data.content;
							this.lists = res.data;
							this.fenmian = res.data.pic;
							this.ifFree = res.data.is_free;
							this.isOn = res.data.is_on;
							this.isBuy = res.data.is_buy;
							this.is_foreshow = res.data.is_foreshow;
							if(res.data.is_buy == 1){
								this.ifBuy = true
							}else if(res.data.is_buy == 2){
								this.ifBuy = false;
								this.selected = '1';
							}
							this.ifGet = false;
							if(res.data.sales_starttime){
								var starttime = res.data.sales_starttime.replace(/-/g, "/")
								var endtime = res.data.sales_endtime.replace(/-/g, "/")
								var nowtime = this.global.format().replace(/-/g, "/");
								if(starttime <=  nowtime && nowtime <= endtime){
									this.ifSale = true;
								}else{
									this.ifSale = false;
								}
							}
							self.share(this.title,this.intro,this.fenmian)
						}else{
							// this.noData = true;
						}
					}
				});
				this.postData('post','/shop-v1-series_show_lst.html',{ser_id:this.$route.query.ser_id}).then(res => {
					if(res.data != null){
						this.innerBox = res.data;
					}
				});
				this.postData('post','/shop-v1-ask_get_series_detail_lst.html',{ser_id:idd,page:this.pageNo,status:'0'}).then(res => {
					this.load5 = false;
					this.arr = res.data;
					if(res.data.length == 0){
						this.load6 = true;
					}
				})
			}
		},
		mounted(){
		},
		methods:{
			loadMore(){
				if(this.load4 == false){
					this.load3 = true;
					this.pageNo = Number(this.pageNo)+Number(1);
					this.postData('post','/shop-v1-ask_get_series_detail_lst.html',{ser_id:this.$route.query.ser_id,page:this.pageNo,status:this.askStatus}).then(res => {
						if(res.data.length != 0){
							this.arr = this.arr.concat(res.data);
							this.load3 = false;
						}else if(res.data.length == 0){
							this.pageNo = Number(this.pageNo) - Number(1);
							this.load3 = false;
							this.load4 = true;
						}
					})
				}
			},
			askChoose(status){
				if(status != this.askStatus){
					this.load5 = true;
					this.load6 = false;
					this.arr=[];
					this.load4 = false;
					this.pageNo = '1';
					this.askStatus = status;
					if(window.location.href.indexOf('vid') != -1){
						this.postData('post','/shop-v1-ask_get_video_detail_lst.html',{vid:this.$route.query.vid,page:this.pageNo,status:status}).then(res => {
							this.arr = res.data;
							if(res.data.length == 0){
								this.load6 = true;
							}
							this.load5 = false;
						});
					}else if(window.location.href.indexOf('ser_id') != -1){
						this.postData('post','/shop-v1-ask_get_series_detail_lst.html',{ser_id:this.$route.query.ser_id,page:this.pageNo,status:status}).then(res => {
							this.arr = res.data;
							if(res.data.length == 0){
								this.load6 = true;
							}
							this.load5 = false;
						});
					}
					if(status==0){
						this.clickthis1=true;this.clickthis2=false;this.clickthis3=false;
					}else if(status==1){
						this.clickthis1=false;this.clickthis2=true;this.clickthis3=false;
					}else if(status==2){
						this.clickthis1=false;this.clickthis2=false;this.clickthis3=true;
					}
				}
			},
			tip(){
				this.kefu = true;
				this.kefu1 = true;
				if(this.kefuPic == undefined || this.kefuPic == ''){
					this.getData('get','/shop-v1-index_basemsg.html').then(res => {
						this.kefuPic = res.data.kefu_qrcode;
					})
				}
			},
			touch(){
				this.kefu = false;
				this.kefu1= false;
				this.invite = false;
				this.codeOut = false;
			},
			activeTil($event,index,ifFree,number,foreshow){
				if(foreshow == 1){
					Toast({
						message:'预告片，还未上线',
						duraction:500
					});
					return false;
				}
				if(this.ifFree == 1 || this.ifBuy == false){
					var data = {
						'index':number,
						'id':index,
						'typeId':this.$route.query.ser_id,
					}
					data = JSON.stringify(data)
					localStorage.setItem(this.$route.query.ser_id,data)

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
						document.body.scrollTop = 0;
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
			paly(){
				// iftrue=true就是不能播反之可以播
				var self = this;
				if(window.location.href.indexOf('ser_id') != -1){
					if(this.lstId != ''){
						if(this.ifPlay == true){
							this.postData('post','/shop-play-index.html',{lst_id:this.lstId}).then(res => {
								if(this.type_id == 2){
									window.location.href = res.data.url;
								}else if(this.type_id == 3){
									this.videoUrl = res.data.url;
									this.picDan = false;
								}else{
									window.location.href = res.data.url;
									// this.videoUrl = res.data.url;
									// this.picDan = false;
								}
							})
						}else{
							this.fenmian = null;
							this.noFree = true;
							this.playIcon = false;
						}
					}else if(this.videoDemo != ''){
						if(this.type_id == 2){
							window.location.href = this.videoDemo;
						}else if(this.type_id == 3){
							this.videoUrl = this.videoDemo;
							this.picDan = false;
						}else{
							window.location.href = this.videoDemo;
						}
					}else{
						this.popupVisible = true;
						setTimeout(function(){
							self.popupVisible = false;
						},1000)
					}
				}else if(window.location.href.indexOf('vid') != -1){
					if(this.ifFree == 1){
						// 费免
						this.postData('post','/shop-play-index.html',{vid:this.$route.query.vid}).then(res => {
							if(res.data != null){
								if(this.type_id == 2){
									window.location.href = res.data.url;
								}else{
									this.videoUrl = res.data.url;
									this.picDan = false;
								}
							}
						})
					}else{
						// 不免费
						if(this.ifBuy == true){
							// 未购买
							this.fenmian = null;
							this.noFree = true;
							this.playIcon = false;
						}else if(this.ifBuy == false){
							// 已购买
							this.postData('post','/shop-play-index.html',{vid:this.$route.query.vid}).then(res => {
								if(res.data != null){
									console.log(this.type_id)
									if(this.type_id == 2){
										window.location.href = res.data.url;
									}else{
										this.videoUrl = res.data.url;
										this.picDan = false;
									}
								}
							})
						}
					}
				}
			},
			toPayDemo(){
				if(window.location.href.indexOf('vid') != -1){
					this.$router.push({path:'/toPay',query:{'vid':this.$route.query.vid,'type':'1','order_type':'1'}})
				}else if(window.location.href.indexOf('ser_id') != -1){
					this.$router.push({path:'/toPay',query:{'ser_id':this.$route.query.ser_id,'type':'2','order_type':'1'}})
				}
			},
			inviteclick(){
				this.invite = true;
				this.kefu1 = true;
				this.codeOut = true;
				if(window.location.href.indexOf('vid') != -1){
					var inviteCode = 'shop-v1-user_invite_card.html?type=1&v_id='+this.$route.query.vid;
					this.getData('get',inviteCode).then(res => {
						this.inviteData = res.data.data
					})
				}else if(window.location.href.indexOf('ser_id') != -1){
					var inviteCode = 'shop-v1-user_invite_card.html?type=2&v_id='+this.$route.query.ser_id;
					this.getData('get',inviteCode).then(res => {
						this.inviteData = res.data.data;
					},res => {
						this.inviteData = {
						        "qr_code": "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGM8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyWjNPZlVRNndlRzQxVmFkb05wMXcAAgTKUs9ZAwSAOgkA",
						        "nickname": "`",
						        "face": "http://wx.qlogo.cn/mmopen/vi_32/E8sl0c7ogPKDxJDbqVwjianHR37ukq7Hfu1qN9fPq3g6nxKq5icMgCiag4J0O0fph7vZRksbuVmHs3bElakMGpfiaQ/0",
						        "msg": "视频",
						        "owner_name": "Mark",
						        "title": "我的单品我做主Oh! Yes"
						    }
					})
				}
			},
			son(){
				this.liwu1 = true;
				this.liwu = true;

			},
			hide(){
				this.liwu1 = false;
				this.liwu = false;

			},
			topayGive(){
				if(window.location.href.indexOf('vid') != -1){
					this.$router.push({path:'/toPay',query:{'vid':this.$route.query.vid,'type':'1','order_type':'2'}})
				}else if(window.location.href.indexOf('ser_id') != -1){
					this.$router.push({path:'/toPay',query:{'ser_id':this.$route.query.ser_id,'type':'2','order_type':'2'}})
				}
			},
			quiz(){
				this.ifAsk = true;
				this.askshow = false;
			},
			goBack(){
				this.ifAsk = false;
				this.askshow = true;
			},
			payAsk(){
				var self = this;
				if(this.picked == 'private'){
					var picked = 0;
				}else{
					var picked = 1;
				}
				if(window.location.href.indexOf('ser_id') != -1){
					this.postData('post','/shop-v1-ask_question.html',{type:'2',question:this.textBox,is_public:picked,ser_id:this.$route.query.ser_id}).then(res => {
						if(res.data.status == 1){
							this.$router.push({path:'toPay',query:{type:res.data.type,askId:res.data.id,order_type:1,ser_id:this.$route.query.ser_id}})
						}
					})
				}else if(window.location.href.indexOf('vid') != -1){
					this.postData('post','/shop-v1-ask_question.html',{type:'1',question:this.textBox,is_public:picked,vid:this.$route.query.vid}).then(res => {
						if(res.data.status == 1){
							this.$router.push({path:'toPay',query:{type:res.data.type,askId:res.data.id,order_type:1,vid:this.$route.query.vid}})
							console.log(res.data)
						}
					})
				}
			},
			tap(id){
				var self = this;
				var IntervalName;
				if($('#audio').attr('src') == undefined || $('#audio').attr('src') == ''){
					play()
					return false;
				}else{
					$('#audio').attr('src','')
					return false
				}
				function play(){
					if(window.location.href.indexOf('ser_id') != -1){
						$.ajax({
							type:'post',
							async:false,
							url:self.global.globalBaseUrl+'/shop-v1-ask_cat_answer.html',
							data:{type:'2',id:id},
							xhrFields: {
					          withCredentials: true
					       },
					       crossDomain: true,
							success:function(res){
								res = eval('('+res+')');
								if(res.status == 1){
									$('#audio').attr('src',res.voice);
									IntervalName = setInterval(function(){
										if(self.playing == true && self.playing2 == true){
											self.playing = false;
											self.playing2 = false;
										}else if(self.playing == false && self.playing2 == false){
											self.playing = true;
											self.playing2 = false;
										}else if(self.playing == true && self.playing2 == false){
											self.playing = true;
											self.playing2 = true;
										}
										if($('#audio').attr('src') == undefined || $('#audio').attr('src') == ''){
											window.clearInterval(IntervalName);
										    self.playing = true;
											self.playing2 = true;
										}
									},400)
									audio.addEventListener('ended', function () {
										window.clearInterval(IntervalName);
									    self.playing = true;
										self.playing2 = true;
										$('#audio').attr('src','')
									}, false);
								}else if(res.status == 0){
									MessageBox.confirm('是否跳到支付页面?').then(action => {
										self.$router.push({path:'/toPay',query:{type:'2',askId:id,order_type:'2',ser_id:self.$route.query.ser_id}})
									});
								}
								$("audio")[0].play();
							}
						})
					}else if(window.location.href.indexOf('vid') != -1){
						$.ajax({
							type:'post',
							async:false,
							url:self.global.globalBaseUrl+'/shop-v1-ask_cat_answer.html',
							data:{type:'1',id:id},
							xhrFields: {
					          withCredentials: true
					       },
					       crossDomain: true,
							success:function(res){
								res = eval('('+res+')');
								if(res.status == 1){
									$('#audio').attr('src',res.voice)
								}else if(res.status == 0){
									MessageBox.confirm('是否跳到支付页面?').then(action => {
										self.$router.push({path:'/toPay',query:{type:'1',askId:id,order_type:'2',vid:self.$route.query.vid}})
									});
								}
								$("audio")[0].play();
							}
						})
					}
				}
			}
		},
		destroyed(){
		},
		watch:{
			selected(val){
				if(val == '3'){
					this.ifAsk = false;
					this.askshow = true;
				}
			},
			picked(val,oldval){
				if(val == 'open'){
					this.ifred = true;
				}else{
					this.ifred = false;
				}
			},
			textBox(val,oldval){
				console.log(val.length)
				if(val.length > 50){
					Toast({
						message:'字数不能超过50个',
						duraction:500
					});
					this.textBox = oldval;
				}
			}
		},
    components:{loadNo}
	}
</script>

<style rel="stylesheet/scss">
	.detailsPage .load{
		text-align: center;
	}
	.detailsPage .clickthis{
		background-color: #fcab53;
	}
	.detailsPage .askStatus{
		height: 0.8rem;
	    width: 100%;
	    background-color: rgb(28, 36, 44);
	}
	.detailsPage .askStatus span{
		color: #fff;
		line-height: 0.8rem;
		padding: 0.05rem 0.1rem;
		margin-left: 0.2rem;
	}
	.detailsPage .askStatus span:nth-child(1){
		margin-left: 0.4rem;
	}
	.detailsPage .red{
		background-color: red;
	}
	.detailsPage .ask2{
		position: fixed;
		bottom: 0;
		height: 0.8rem;
		line-height: 0.8rem;
		width: 100%;
		font-size: 0.3rem;
	}
	.detailsPage .ask2 ul{
		width: 100%;
		color: #fff;
	}
	.detailsPage .ask2 ul li{
		float: left;
		width: 50%;
		text-align: center;
	}
	.detailsPage .ask2 ul li:nth-child(1){
		background-color: #f3942e;
	}
	.detailsPage .ask2 ul li:nth-child(2){
		background-color: #1b242b;
	}
	.detailsPage .yuan{
		width: 0.22rem;
		height: 0.22rem;
		border-radius: 0.22rem;
		border: 1px solid #cccccc;
		display: inline-block;
		position: relative;
		top: 0.03rem;
		margin-right: 0.1rem;
	}
	.detailsPage .askText{
		width: calc(100% - 0.4rem);
		height: 1.8rem;
		border: 0;
		font-size: 0.29rem;
		color: #333;
		padding: 0.3rem 0.2rem;
		outline-style: none;
		letter-spacing: 1px;
	}
	.detailsPage .publicStatus{
		height: 0.6rem;
		width: 100%;
		background-color: #fff;
	}
	.detailsPage .publicStatus input{
		position: absolute;
		left: 1.13rem;
		top: 0.2rem;
		opacity: 0;
	}
	.detailsPage .publicStatus ul li{
		float: left;
		width: 50%;
		text-align: center;
		line-height: 0.6rem;
		color: #666;
		position: relative;
		font-size: 0.28rem;
	}
	.detailsPage .ask{
		height: 0.8rem;
		width: 100%;
		background-color: #000;
		color: #fff;
		position: fixed;
		bottom: 0;
		text-align: center;
		line-height: 0.8rem;
		font-size: 0.26rem;
	}
	.detailsPage .answerUp{
		background-color: #fff;
		margin-bottom: 0.2rem;
	}
	.detailsPage .answer .listlenCount{
		position: absolute;
		right: 0;
		line-height: 1.2rem;
		color: #666;
	}
	.detailsPage .answer .personal ul li{
		float: left;
	}
	.detailsPage .answer .personal ul li:nth-child(2){
		line-height: 0.6rem;
		margin-left: 0.2rem;
		color: #666;
	}
	.detailsPage .answer .personal{
		display: block;
    	height: 0.66rem;
    	padding-top: 0.2rem;
	}
	.detailsPage .answer .name{
		font-size: 0.24rem;
	}
	.detailsPage .answer .problem{
		font-size: 0.28rem;
		color: #000;
		margin-top: 0.1rem;
	}
	.detailsPage .answer .voice{
		height: 0.8rem;
		width: 4rem;
		background-color: #f39d40;
		display: inline-block;
    	border-radius: 0.8rem;
    	margin-top: 0.2rem;
    	text-align: center;
    	position: relative;
	}
	.detailsPage .answer .voice i{
		position: absolute;
		color: #fff;
		line-height: 0.8rem;
		left: 0.2rem;
	}
	.detailsPage .answer .voice span{
		line-height: 0.8rem;
		color: #fff;
		font-size: 0.26rem;
		display: inline-block;
	}
	.detailsPage .answer .personal img{
		height: 0.6rem;
		width: 0.6rem;
		border-radius: 0.6rem;
	}
	.detailsPage .answer{
		width: 100%;
		height: 3rem;
	}
	.detailsPage .mint-navbar{
		height: 0.65rem;
		background: #0f171e;
	}
	.detailsPage .mint-tab-item-label{
		font-size: 0.23rem;
		line-height: 0.65rem;
	}
	.detailsPage .mint-navbar .mint-tab-item.is-selected{
		border-bottom: 1px solid #fcab53;
	    color: #fcab53;
	    margin-bottom: 0px;
	}
	.detailsPage .mint-tab-item{
		color: #fff;
	}
	.detailsPage .mint-navbar .mint-tab-item{
		padding: 0;
	}
	.detailsPage .inviteCodeOut{
		width:100%;
		position:fixed;
		top:1rem;
		z-index:3;
		opacity:0;
		width: 5rem;
    	margin-left: 0.7rem;
	}
	.detailsPage .mint-popup{
		padding: 0.2rem 0.2rem;
		font-size:0.27rem;
	}
	.detailsPage .inviteCodeOut1{
		width:100%;
		position:fixed;
		top:6rem;
		z-index:3;
		opacity:0;
		width: 5rem;
    	margin-left: 0.7rem;
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
	.detailsPage .bg,.bg1{
		background: rgba(0,0,0,0.6);
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 1;
	}
	.kefuCode{
		position: fixed;
		z-index: 2;
		margin-left: calc(50% - 2.5rem);
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
	.brief img{
		width: 100%;
	}
	.picDan{
		height: 4rem;
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
	    height: 4rem;
	    width: 100%;
	}
	.tipNoFree{
		position: absolute;
	    color: #fff;
	    top: 0;
	    line-height: 4rem;
	    font-size: 0.5rem;
	    left: 0.4rem;
	}
	.buyed{
		position: fixed;
	    bottom: 0;
	    width: 100%;
	    height: 0.8rem;
	    background-color: #000;
	    text-align: center;
	    line-height: 0.8rem;
	    color: #fff;
	    font-size: 0.26rem;
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
		height: 4rem;
		background: #000000;
		position: relative;
	}
	.detailsPage .title{
		color:#ceceec;
		height: 0.65rem;
	    line-height: 0.65rem;
	    font-size: 0.23rem;
	    text-align: center;
	    background: #1b242b;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.detailsPage .middle{
		height: 0.65rem;
		display: flex;
		background: #0f171e;
		line-height: 0.45rem;
		font-size: 0.23rem;
	}
	.detailsPage .middle>div{
		flex: 1;
		text-align: center;
		border-bottom: 0.03rem solid #0f171e;
		padding: 0.1rem 0;
	}
	.detailsPage .mint-tab-container-wrap{
		display: block;
	}
	/*.middle>div:nth-child(1){
		border-bottom: 0.03rem solid #fcab53;
	}*/
	.listBox{
		border-bottom: 0.03rem solid #fcab53;
		color: #cecece;
	}
	.curBox{
		background: #f1f2f6;
	}
	.mint-tab-container{
		margin-bottom: 0.8rem;
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
    	font-size: 0.24rem;
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
		background: #fff;
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
	.detailsPage p:nth-child(3){
		padding: 0.2rem 0.5rem 0.1rem;
		font-size: 0.26rem;
		color: black;
		font-weight: bolder;
	}
	.detailsPage .recommend{
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
	.detailsPage .recommend img{
		height: 1.9rem;
	}
	#navBox {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		height: 0.8rem;
		background-color: #d54545;
		color: #fff;
		text-align: center;
		font-size: 0.26rem;
	}
	#navBox .kefu{
		background-color: #fff;
	}
	#navBox i{
		font-size: 0.35rem;
		display: block;
		text-align: center;
		margin-top: 0.02rem;
	}
	.share{
		width: 100%;
	}
	.share>div{
		/*height: 0.8rem;*/
		display: flex;
		flex-direction: row;
		justify-content: flex-end;

	}


	.detailsPage .service{
		margin-right: 0.3rem;
		text-align: center;
		position: fixed;
		bottom: 1.85rem;
	    right: -0.3rem;
	    color: #333;
	    background: rgba(0,0,0,0.6);
    	padding: 0.2rem;
    	z-index: 1;
	}
	.detailsPage .give{
		margin-right: 0.3rem;
		text-align: center;
		position: fixed;
		bottom: 1rem;
	    right: -0.3rem;
	    color: #333;
	    background: rgba(0,0,0,0.6);
    	padding: 0.2rem;
    	z-index: 1;
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
</style>
