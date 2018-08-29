<template>
	<div class="liveHome">
		<div class="tip">
			<span>当前总人数：1000</span>
			<span style="float:right;margin-right:0.2rem;" @click="forum()">前往讨论区</span>
		</div>
		<div class="liveYu" style="display:table;display:none">
			<div style="display:table-cell;vertical-align:middle">
				<div class="title">即将直播</div>
				<div class="time">本次直播于1017-10-13 17：01开始</div>
			</div>
		</div>
		<div class="contentAll" :class="{pdb16:pdb16,pdb28:pdb28}">
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="audio" :class="{toDown:status,toUp:status2}" v-show="show">
			<div class="dingbu">
				<div class="title">{{recordStatus}}<span class="down" @click="down()">v</span></div>
			</div>
			<div class="con">
				<ul>
					<li @click="set()">
						<i class="iconfont icon-people"></i>
					</li>
					<li>
						<div class="luyin" @touchstart="startRecord()" @touchend="endRecord()">
							<div class="luDown">
								
							</div>
						</div>
					</li>
					<li @click="deleteRecord()">
						<i class="iconfont icon-people"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="controller">
			<ul>
				<li @click="up()">
					<i class="iconfont icon-qianbao2"></i>
				语音
				</li>
				<li @click="upBox()" >
					<i class="iconfont icon-qianbao2"></i>
					文字
				</li>
			</ul>
		</div>
		<div class="setZi" v-show="boxStatus">
			<input type="text" class="inp" placeholder="写下你想说的吧" @click="send()"><button>发送</button>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				status:true,
				status2:false,
				show:false,
				boxStatus:false,
				pdb16:false,
				pdb28:false,
				recordStatus:'点击蓝色按钮开始录音',
				title:'',

			}
		},
		beforeCreate(){

		},
		created(){
			var doc = document
			this.global.shouquan();
			this.postData('post','/shop-v1-voice_room_topic.html',{topic_id:this.$route.query.id}).then(res => {
				doc.title = res.data.topic_name;
			})
		},
		mounted(){
		},
		methods:{
			forum(){
				this.$router.push({path:'/forum'})
			},
			down(){
				this.status = true;
				this.status2 = false;
			},
			up(){
				var self = this
				if(this.status == true){
					this.status = false;
					this.status2 = true;
					self.show = true;
					this.pdb16 = false;
					this.pdb28 = true;
				}else{
					setTimeout(function(){
						self.show = false
					},500)
					this.status = true;
					this.status2 = false;
					this.pdb16 = false;
					this.pdb28 = false;
				}
			},
			upBox(){
				if(this.boxStatus == false){
					this.boxStatus = true;
					this.pdb16 = true;
					this.pdb28 = false;
				}else{
					this.boxStatus = false;
					this.pdb16 = false;
					this.pdb28 = false;
				}
			},
			startRecord(){
				// 录音开始
				this.recordStatus = '录音中...';

			},
			endRecord(){
				// 录音结束
				this.recordStatus = '录音结束';
			},
			send(){
				// 文字发送
			},
			deleteRecord(){
				// 删除录音
			},
			set(){
				// 发送录音
			}
		}
	}
</script>
<style>
	.liveHome{
		font-size: 0.26rem;
		background: #f1f2f6;
	}
	.liveHome .liveYu{
		text-align: center;
	    background: #fff;
	    height: 1.5rem;
	    margin-top: 0.5rem;
	    width: 100%;
	}
	.liveHome .liveYu .title{
		color: #3385ff;
		margin-bottom: 0.2rem;
	}
	.liveHome .tip{
		height: 0.8rem;
		background: #fff;
		line-height: 0.8rem;
		position: fixed;
		top: 0;
		width: 100%;
	}
	.liveHome .tip span:nth-child(1){
		margin-left: 0.2rem;
	}
	.liveHome .new{
		overflow:hidden
	}
	.liveHome .contentAll{
		padding-bottom: 0.8rem;
		padding-top: 0.8rem;
	}
	.liveHome .pdb16{
		padding-bottom: 1.6rem;
	}
	.liveHome .pdb28{
		padding-bottom: 2.8rem;
	}
	.liveHome .new ul li{
		float: left;
	}
	.liveHome .new .head img{
		height: 0.8rem;
		width: 0.8rem;
		border-radius: 0.8rem;
		margin-top: 0.2rem;
		margin-left: 0.15rem;
		margin-right: 0.1rem;
	}
	.liveHome .nameCt{
		display: table;
		height: 1.2rem;
	}
	.liveHome .nameCt .allCt{
		display: table-cell;
		vertical-align: middle;
	}
	.liveHome .nameCt .allCt .name{
		font-size: 0.24rem;
		color: #666;
		margin-bottom: 0.05rem;
	}
	.liveHome .nameCt .allCt .content{
		min-height: 0.4rem;
		max-width: 4.36rem;
		background-color: #fff;
		font-size: 0.27rem;
		border-radius: 0.1rem;
		padding: 0.1rem 0.1rem 0.1rem 0.1rem;
		display: inline-block;
		margin-bottom: 0.1rem;
	}
	.liveHome .con ul{
		display: table;
		width: 100%;
	}
	.liveHome .con ul li{
		display: table-cell;
		text-align: center;
		vertical-align: middle;
	}
	.liveHome .controller{
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 0.8rem;
		border-top: 1px solid #e1e2e6;
	}
	.liveHome .controller ul li{
		float: left;
		width: 50%;
		text-align: center;
		line-height: 0.75rem;
		color: #666;
	}
	.liveHome .controller ul li i{
		position: relative;
		top: 0.02rem;
	}
	.liveHome .audio{
		width: 100%;
		background: #fff;
		position: fixed;
		bottom: 0.8rem;
	}
	.liveHome .toDown{
		animation:mymove 0.3s ease-in-out 0s 1 alternate forwards;
	}
	@keyframes mymove{
		from {height:2rem;}
		to {height:0px;}
	}
	.liveHome .toUp{
		animation:toup 0.3s ease-in-out 0s 1 alternate forwards;
	}
	@keyframes toup{
		from {height:0px;}
		to {height:2rem;}
	}
	.liveHome .audio .con{
		margin-bottom: 0.3rem;
	}
	.liveHome .dingbu{
		margin-bottom: 0.3rem;
	}
	.liveHome .dingbu .title{
		text-align: center;
		margin-left: 0.3rem;
		padding-top: 0.1rem;
	}
	.liveHome .dingbu .down{
		float: right;
		margin-right: 0.2rem;
	}
	.liveHome .luyin{
		width: 1rem;
		height: 1rem;
		border-radius: 1rem;
		background: #3385ff;
		display: inline-block;
	}
	.liveHome .luDown{
		width: 0.3rem;
		height: 0.3rem;
		background: #fff;
		margin: 0 auto;
		margin-top: 0.35rem;
		border-radius: 2px;
	}
	.liveHome .setZi{
		height: 0.8rem;
		background: #fff;
		width: 100%;
		position: fixed;
		bottom: calc(0.8rem + 1px);
	}
	.liveHome .setZi input.inp{
		height: 0.6rem;
		border-radius: 0;
		outline-style: none;
		border:0;
		margin-top: 0.1rem;
		margin-left: 0.1rem;
		width: 4.84rem;
		border-color: #999;
		font-size: 0.28rem;
		padding-left: 0.08rem;
		padding-right: 0.08rem;
		background: #f1f1f1;
	}
	.liveHome .setZi button{
		float: right;
	    height: 0.6rem;
	    margin-top: 0.1rem;
	    margin-right: 0.1rem;
	    background: #3385ff;
	    border: 0;
	    color: #fff;
	    outline-style: none;
	    font-size: 0.28rem;
	}
</style>
