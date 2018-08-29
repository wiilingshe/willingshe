<template>
	<div class="give_box" :class="returnData?'':'give_box-no'">
		<div class="give_one" v-if="surplus>0 && noExist==0">剩余<span>{{surplus}}</span>份赠礼</div>
    <div class="give_one" v-if="!surplus>0 && noExist==0">礼物已派发完毕</div>
		<div class="main" v-if="noExist==0">
			<div class="main_give">
				<p>
          <!-- <i class="icon iconfont icon-liwu1"></i> -->
        赠礼</p>
			</div>
			<div class="main_title" @click="goPage()">
        <div class="main_img_box">
          <img class="main_left" :src="info.pic" onerror="this.src=&quot;/static/img/1.jpg&quot;">
        </div>
        <div class="main_right" style="margin-left: 0.2rem;">
          <p class="main_title2">{{info.title}}</p>
          <div class="main_price">
            <!--<span style="padding-right: 0.1rem">￥{{info.total_fee_new}}</span>-->
            <span style="padding-right: 0.1rem">￥{{oldFee}}</span>
            <!--<span class="old_price">￥{{info.total_fee_old}}</span>-->
            <span class="num">x{{info.numbers}}</span>
          </div>
        </div>
			</div>
			<div class="main_time" style="font-size: 0.24rem;">
				<span>购买时间&nbsp:&nbsp{{info.create_time}}</span><span class="tprice">实付:￥{{info.total_fee}}</span>
			</div>
		</div>
    <div class="giftList">
      <div class="giftList1">
        <div class="instructions" v-if="noExist==0">
          <div class="subtitle"><i class="icon iconfont icon-sanjiaoxing-right"></i>礼物赠送说明</div>
          <div class="text">点击右上角 "..." ,选择发送给好友，好友点击即可领取</div>
        </div>
        <div class="instructions" style="margin: 0;" v-if="noExist==0">
          <div class="subtitle"><i class="icon iconfont icon-sanjiaoxing-right"></i>领取详情</div>
        </div>
    		<div class="give_details" v-if="noExist==0">
    			<!-- <div class="details">
    				<span class="line">&nbsp</span><span class="title">领取详情</span><span class="line">&nbsp</span>
    			</div> -->
          <div class="receive_null"  v-if="!receive.length">
            哇喔~ 暂无好友领取过
          </div>
    			<div class="receive" v-for="(i,index) in receive" v-if="receive.length" :style="{'border-bottom':index==receive.length-1?'none':'1px solid #eee'}">
            <img :src="i.face" onerror="this.src=&quot;/static/img/1.jpg&quot;">
            <span class="nick_name">{{ i.nickname }}</span>
            <span class="receive_time">{{ i.receive_time}}</span>
    			</div>
    		</div>
        <div v-if="noExist==1">
          <div style="width: 100%;text-align: center;box-sizing: border-box;padding-top: 1rem">
            <i class="icon iconfont icon-wushuju" style="font-size: 2rem;color: #cccccc"></i>
          </div>
          <div style="width: 100%;text-align: center;color: #cccccc;font-size: 0.3rem">
            {{tips}}
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import {Indicator } from 'mint-ui';
	export default {
		data(){
			return{
				receive:[],
				info:[],
				tipLoad:true,
				name:'',
				title:'',
        surplus:'',
        oldFee:'',
        returnData:false,
        pic:'',
        url:'',
        noExist:0,
        tips:'',
			}
		},
		beforeCreate(){
      var self = this;
      Indicator.open({
        spinnerType: 'snake'
      });
      this.global.shouquan();
			this.postData('post','/shop-v1-order_get_receive_lesson.html',
        {
          'order_no':this.$route.query.order_no,
          'member_id':this.$route.query.member_id,
          'type':this.$route.query.type
        }).then(res =>{
          if(res.data.status == 1 || res.data.status == 2){ //赠送人进入，1已有人领取，2没人领取
            Indicator.close();
            this.returnData = true;
            this.surplus = res.data.orderData.surplus;
            if(res.data.data){
              this.receive = res.data.data;
            }else{
              this.receive = '';
            }
            this.info = res.data.orderData;
            this.pic = res.data.orderData.pic;
            this.oldFee = Number(res.data.orderData.total_fee)/Number(res.data.orderData.numbers);
          }else if(res.data.status == 0){ //领取人进入，0还能领取，跳转到领取页
            if(this.$route.query.type=='video'){
              this.$router.push({path:'/mine-receive',
                query:{
                  'order_no':this.$route.query.order_no,
                  'member_id':this.$route.query.member_id,
                  'type':this.$route.query.type,
                  'vid':this.$route.query.vid
                }
              });
              Indicator.close();
              this.returnData = true;
            }else{
              this.$router.push({path:'/mine-receive',
                query:{
                  'order_no':this.$route.query.order_no,
                  'member_id':this.$route.query.member_id,
                  'type':this.$route.query.type,
                  'ser_id':this.$route.query.ser_id
                }
              });
              Indicator.close();
              this.returnData = true;
            }
          }else if(res.data.status == 3){ //领取人进入，3已领取完，显示领取人详情
            Indicator.close();
            this.returnData = true;
            if(res.data.data){
              this.receive = res.data.data;
            }else{
              this.receive = '';
            }
            this.info = res.data.orderData;
            this.oldFee = Number(res.data.orderData.total_fee)/Number(res.data.orderData.numbers);
          }else if(res.data.status == 4){ //4为课程不存在
            Indicator.close();
            this.noExist =1;
            this.tips = res.data.msg;
            
          }
			});
		},
		created(){
      Indicator.open({
        spinnerType: 'snake'
      });
			document.title = '赠送';
			this.global.shouquan();
			var self = this;
      this.url = window.location.href;
			 //获取标题
      this.getData('get','/shop-v1-index_basemsg.html').then(res => {
      	if(res.status == 200){
      		this.title = res.data.title;
      	}
      });
      //获取member_id
      this.getData('post','/shop-v1-pay_jssign.html',{url:this.url}).then(res=> { //返回赠送人member_id
        if(res.data.status== 1){
          if(self.$route.query.member_id == res.data.sign.member_id){ //判断当前url参数的memberid和赠送人是否一致
            this.getData('get','/shop-v1-user_base_info.html').then(result => { //获取昵称
              Indicator.close();
              if(result.status == 200){
                if(result.data.status==1){
                  this.names=result.data.data.nickname; 
                  self.share(this.names+'赠送了一个课程给你，快去看看吧','来自'+this.title+'的课程',this.pic);
                }
              }
            });
          }else{
            self.noShare();
          }
        }
      });
		},
		methods:{
			giveNext(){
//              this.gives=true;
			},
      goPage(){
        if(this.$route.query.type=='video'){
          this.$router.push({path:'/details',query:{'vid':this.$route.query.vid}});
        }else if(this.$route.query.type='series'){
          this.$router.push({path:'/details',query:{'ser_id':this.$route.query.ser_id}});
        }
      }
		},
		mounted(){

		}
	}

</script>

<style scoped lang="less">
	.give_box{
    height: 100vh;
    &-no{
      opacity: 0;
    }
    .giftList{
      z-index: 1;
      width: 100%;
      background-color: #fff;
      height: calc(~"100vh - 5.5rem");
      margin-top: 0.3rem;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .giftList1{
        width: calc(~"100% - 0.6rem");
        margin: 0 auto;
      }
    }
    .give_one{
      font-size: 0.38rem;
      color: #EF4949;
      text-align: center;
      line-height: 1.34rem;
      font-weight: bold;
      height: 1.34rem;
    }
    .main{
      width: calc(~"100% - 0.6rem");
      margin: 0 auto;
      font-size: 0.26rem;
      overflow: hidden;
      border: 1px solid #dddddd;
      border-radius: 0.1rem;
      &_give{
        height: 0.8rem;
        background: #ffb403;
        color: #ffffff;
        line-height: 0.8rem;
        background-image: url(/static/img/my_gift_title.png);
        background-size: 100%;
        p{
          width: 100%;
          font-size: 0.3rem;
          text-align: center;
          .icon-liwu1{
            font-size: 0.3rem;
            padding-right: 0.1rem;
          }
        }
      }
      &_title{
        display: flex;
        /*width: 100%;*/
        height: 1.68rem;
        padding: 0.3rem 0;
        border-bottom: 1px dotted #eee;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        background-color: #ffffff;
      }
      &_title2{
        white-space: pre-wrap;
        width: 3.8rem;
        font-size: 0.3rem;
      }
      &_img_box{
        height: 1.5rem;
        width: 2.5rem;
        background: #eee;
        overflow: hidden;
        margin-left: 0.2rem
        ;border-radius: 0.06rem;
      }
      &_left{
        flex: 0 0 1.68rem;
        width: 2.5rem;
      }
      &_right{
        display: flex;
        flex: 0 0 50vw;
        width: 50vw;
        height: 1.5rem;
        flex-direction: column;
        justify-content:space-between;
        /*flex: 1;*/
        padding-right: 0.2rem;
        color: #333333;
        span{
          font-size: 0.26rem;
        }
      }
      &_price{
        display: flex;
        span{
          line-height: 1;
        }
        .old_price{
          color: #cccccc;
          text-decoration: line-through;
        }
        .num{
          flex: 1;
          text-align: right;
          color: #999999;
          font-size: 0.24rem;
        }
      }
      &_time{
        display: flex;
        line-height: 0.7rem;
        padding: 0 0.2rem;
        background-color: #ffffff;
        .tprice{
          flex: 1;
          text-align: right;
          font-weight: bold;
        }
        span:first-of-type{
          color: #999999;
        }
      }

    }
    .instructions{
      padding: 0.3rem 0 0;
      i{
        font-size: 0.3rem;
      }
      .subtitle{
        font-size: 0.32rem;
        color: #333;
        font-weight: bold;
        padding-bottom: 0.1rem;
      }
      .text{
        font-size: 0.26rem;
        color: #999999;
      }
    }
    .give_details{
      height: auto;
      margin-top: 0.2rem;
      padding: 0 0.25rem;
      font-size: 0.28rem;
      .details{
        display: flex;
        align-items:center;
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;

        .line{
          flex: 1;
          height: 0;
          border-bottom: 0.02rem solid #cccccc;
        }
        .title{
          font-size: 0.26rem;
          color: #999999;
          padding: 0 0.2rem;
        }
      }
      .receive_null{
        text-align: center;
        font-size: 0.24rem;
        color: #cccccc;
      }

      .receive{
        display: table;
        width: 100%;
        margin-top: 0.3rem;
        font-size: 0.24rem;
        color: #999999;
        border-bottom: 1px solid #eee;
        padding-bottom: 0.3rem;
        img{
          /*display: table-cell;*/
          float: left;
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
        }
        .nick_name{
          color: #333;
          float: left;
          height: 0.9rem;
          line-height: 0.9rem;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width:3.1rem;
          margin-left: 0.2rem;
        }
        .receive_time{
          /*display: table-cell;*/
          float: right;
          height: 0.9rem;
          line-height: 0.9rem;
          vertical-align: middle;
          text-align: right;
          &:first-of-type{
            text-align: left;
          }
        }
      }
    }
	}

</style>
