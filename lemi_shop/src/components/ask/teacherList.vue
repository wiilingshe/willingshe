<template>
	<div class="teacherList">
		<div v-if="ifdaoshi == 1">
			<!-- <div class="askEd2" @click="askDemo(info.id,choosed)" v-if="info.status==1">
		  		<div class="xinxi">
		  			<ul>
		  				<li>
		  					<img :src="info.face">
		  				</li>
		  				<li>
		  					<div class="name">{{info.nickname}}</div>
		  				</li>
		  			</ul>
		  		</div>
		  		<div class="wenti2">
		  			{{info.question}}
		  		</div>
		  		<div class="pic">
		  			<img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)">
		  		</div>
		  	</div> -->
		  	<!-- <div class="askEd" v-if="info.status==2" @click="askDemo1(info.id,choosed)">
		  		<div class="xinxi">
		  			<ul>
		  				<li>
		  					<img :src="info.face">
		  				</li>
		  				<li>
		  					<div class="name">{{info.nickname}}</div>
		  				</li>
		  			</ul>
		  		</div>
		  		<div class="wenti">
		  			{{info.question}}
		  		</div>
		  		<div style="position:relative">
		  			<div class="voice">
		  				<img src="../../../static/img/audioBg.png">
		  				<svg v-show="svg" t="1509953101934" class="icon" style="position: absolute;left:0.2rem;top: 0.15rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
		  					<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
		  					<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
		  					<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
		  				</svg>
		  				<span>点击播放</span>
		  			</div>
		  			<span class="listlenCount">听过{{info.eavesdrop_nums}}</span>
		  		</div>
		  	</div> -->
		  	<div class="pList" v-if="info.status==1"  @click="askDemo(info.id,choosed)">
			  	<div class="name1">
			  		<img class="img1" :src="info.face">
			  		<span style="margin-left: 0.11rem;">{{name}}</span>
			  		<span style="margin-left: 0.2rem;width: 4.4rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">问题来自：{{info.source_name}}</span>
			  	</div>
			  	<div class="problem1">
			  		{{info.question}}
			  	</div>
		  	</div>
		  	<div class="pList" v-if="info.status==2"  @click="askDemo1(info.id,choosed)">
			  	<div class="name1">
			  		<img class="img1" :src="info.face">
			  		<span style="margin-left: 0.11rem;">{{name}}</span>
			  		<span style="margin-left: 0.2rem;width: 4.4rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">问题来自：{{info.source_name}}</span>
			  	</div>
			  	<div class="problem1">
			  		{{info.question}}
			  	</div>
			  	<div class="yuyin1">
			  		<img src="../../../static/img/audioBg.png">
			  		<svg t="1509953101934" class="icon" style="position: absolute;color: #fff;left: 0.2rem;top:0.15rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
						<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
						<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
						<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
					</svg>
			  		<span style="left: 1.3rem;">点击播放</span>
			  	</div>
			  	<div class="amount1">听过：{{info.eavesdrop_nums}}</div>
		  	</div>
		</div>
		<div v-if="ifdaoshi == 0">
			<!-- <div class="askEd2" v-if="info.status==1">
		  		<div class="xinxi">
		  			<ul>
		  				<li>
		  					<img :src="tou">
		  				</li>
		  				<li>
		  					<div class="name">{{name}}</div>
		  				</li>
		  			</ul>
		  		</div>
		  		<div class="wenti2">
		  			{{info.question}}
		  		</div>
		  	</div> -->
		  	<div class="pList" v-if="info.status==1">
			  	<div class="name1">
			  		<img class="img1" :src="tou">
			  		<span style="margin-left: 0.11rem;">{{name}}</span>
			  		<span style="margin-left: 0.2rem;width: 4.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">问题来自：{{info.source_name}}</span>
			  	</div>
			  	<div class="problem1">
			  		{{info.question}}
			  	</div>
		  	</div>
		  	<!-- <div class="askEd" v-if="info.status==2">
		  		<div class="xinxi">
		  			<ul>
		  				<li>
		  					<img :src="tou">
		  				</li>
		  				<li>
		  					<div class="name">{{name}}</div>
		  				</li>
		  			</ul>
		  		</div>
		  		<div class="wenti">
		  			{{info.question}}
		  		</div>
		  		<div style="position:relative">
		  			<div class="voice" @click="play(info.id,choosed)">
		  				<img src="../../../static/img/audioBg.png">
		  				<svg v-show="svg" t="1509953101934" class="icon" style="position: absolute;left:0.2rem;top: 0.15rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
		  					<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
		  					<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
		  					<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
		  				</svg>
		  				<span>点击播放</span>
		  			</div>
		  			<span class="listlenCount">听过{{info.eavesdrop_nums}}</span>
		  		</div>
		  	</div> -->
		  	<div class="pList" v-if="info.status==2"  @click="play(info.id,choosed)">
			  	<div class="name1">
			  		<img class="img1" :src="tou">
			  		<span style="margin-left: 0.11rem;">{{name}}</span>
			  		<span style="margin-left: 0.2rem;width: 4.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">问题来自：{{info.source_name}}</span>
			  	</div>
			  	<div class="problem1">
			  		{{info.question}}
			  	</div>
			  	<div class="yuyin1">
			  		<img src="../../../static/img/audioBg.png">
			  		<svg t="1509953101934" class="icon" style="position: absolute;color: #fff;left: 0.2rem;top:0.15rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
						<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
						<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
						<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
					</svg>
			  		<span style="left: 1.3rem;">点击播放</span>
			  	</div>
			  	<div class="amount1">听过：{{info.eavesdrop_nums}}</div>
		  	</div>
		</div>
	</div>
</template>
<script>
	import {MessageBox} from 'mint-ui'
	export default{
		props:{  
            info: Object,
            ifdaoshi:String,
            tou:String,
            name:String,
        },
		data(){
			return{
				playing:true,
            	playing2:true,
            	svg:true,
            	list:[],
			}
		},
		created(){
			// this.global.shouquan();
		},
		methods:{
			askDemo(id,type){
				if(type == true){
					var type = 2
				}else{
					var type = 1
				}
				this.postData('post','/shop-v1-index_get_root.html').then(res => {
					if(res.data.status == 1){
						window.location.href = '/reply?id='+id+'&type='+type+'&root_id='+res.data.rootId
					}else{
						this.$router.push({path:'/failTip'})
					}
				})
			},
			askDemo1(id,type){
				if(type == true){
					var type = 2
				}else{
					var type = 1
				}
				this.$router.push({path:'/reply2',query:{id:id,status:'2',type:type}})
			},
			play(id,type){
				return false;
				var self = this;
				console.log($(this))
				var IntervalName;
				if($('#audio').attr('src') == undefined || $('#audio').attr('src') == ''){
					play()
					return false;
				}else{
					console.log(111)
					$('#audio').attr('src','')
					return false
				}
				function play(){
					if(type == true){
						// 课程
						type = '2';
					}else if(type == false){
						// 视频
						type = '1';
					}
					$.ajax({
						type:'post',
						async: false,
						url:self.global.globalBaseUrl+'/shop-v1-ask_cat_answer.html',
						data:{type:type,id:id},
						xhrFields: {
			                withCredentials: true
			            },
			            crossDomain: true,
						headers:{rootToken:localStorage.getItem('rootToken'),token:localStorage.getItem('token')},
						success:function(res){
							res = eval('('+res+')')
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
									console.log(1111)
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
							}else{
								$('#audio').attr('src','');
								// MessageBox.confirm('需付费偷听，是否跳转到支付页面？').then(action => {
								//  	self.$router.push({path:'/toPay',query:{type:type,order_type:'2',askId:id}})
								// });
							}
						}
					});
					$("audio")[0].play();
				}
			},
		}
	}
</script>
<style lang="less">
	.teacherList{
		font-size: 0.205rem;
		color: #333;
		.pList{
			background-color: #fff;
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem 0.25rem;
			position: relative;
			margin-bottom: 0.17rem;
			.name1{
				.img1{
					width: 0.409rem;
					height: 0.409rem;
					border-radius: 50%;
					background-color: #eee;
					margin:0.17rem 0;
				}
				span{
					display: inline-block;
				    height: 0.749rem;
				    vertical-align: top;
				    line-height: 0.749rem;
				    color: #999;
				}
			}
			.problem1{
				font-size: 0.222rem;
				margin-bottom: 0.17rem;
				color: #333;
			}
			.yuyin1{
				width: 3.41rem;
				height: 0.682rem;
				// background-color: #fe5875;
				border-radius: 0.341rem;
				position: relative;
				// text-align: center;
				span{
					color: #fff;
					font-size: 0.239rem;
					display: inline-block;
				    vertical-align: top;
				    line-height: 0.682rem;
				    position: absolute;
				    left: 1.1rem;
				}
				img{
					width:3.5rem;
					position: absolute;
				}
			}
			.amount1{
				position: absolute;
				bottom: 0.4rem;
				right: 0.17rem;
				color: #999;
			}
		}
	}
	.teacherList .choose{
		color: #26a2ff;
	}
	.teacherList .type{
		background-color: #fff;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
	}
	.teacherList .askEd{
		font-size: 0.26rem;
		min-height: auto;
		background-color: #fff;
		width: calc(~"100% - 0.8rem");
		padding: 0.3rem 0.4rem;
		margin-bottom: 0.2rem;
	}
	.teacherList .askEd2{
		font-size: 0.26rem;
		background-color: #fff;
		width: calc(~"100% - 0.8rem");
		padding: 0.3rem 0.4rem;
		margin-bottom: 0.2rem;
	}
	.teacherList .wenti{
		font-size: 0.28rem;
	    color: #333;
	    margin-top: 0.1rem;
	}
	.teacherList .wenti2{
		font-size: 0.28rem;
	    color: #333;
	    margin-top: 0.1rem;
	    overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
	}
	.teacherList .voice{
		height: 0.7rem;
	    width: 4rem;
	    /*background-color: #fe5875;*/
	    display: inline-block;
	    border-radius: 0.8rem;
	    margin-top: 0.2rem;
	    /*text-align: center;*/
	    position: relative;
	    img{
	    	width: 3.6rem;
	    	position: absolute;
	    }
	    span{
	    	position: absolute;
	    	left:1.2rem;
	    }
	}
	.teacherList .listlenCount{
		position: absolute;
	    right: 0;
	    line-height: 1.2rem;
	    color: #999;
	}
	.teacherList .voice i{
		position: absolute;
	    color: #fff;
	    line-height: 0.8rem;
	    left: 0.2rem;
	}
	.teacherList .voice span{
		line-height: 0.7rem;
	    color: #fff;
	    font-size: 0.26rem;
	    display: inline-block;
	}
	.teacherList .xinxi{
		height: 0.6rem;
		color: #666;
	}
	.teacherList .xinxi img{
		height: 0.6rem;
		width: 0.6rem;
		border-radius: 0.6rem;
		margin-right: 0.2rem;
	}
	.teacherList .xinxi ul li{
		float: left;
	}
	.teacherList .xinxi .name{
		line-height: 0.6rem;
	}
</style>