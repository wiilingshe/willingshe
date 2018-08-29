<template>
  <div class="successPay">
    <!-- <div class="successTitle">
            交易详情
        </div> -->
    <img src="../../static/img/wechat.png">
    <div class="tip" style="color: #00c800;">支付成功</div>
    <div class="btn" @click="tozhaun()">完成</div>
  </div>
</template>
<script>
  export default{
    data(){
      return {}
    },
    created(){
      this.noShare();
      document.title = '交易详情'
    },
    methods: {
      tozhaun(){
//				if(window.location.href.indexOf('vid') != -1){
//					this.$router.push({path:'/details',query:{'vid':this.$route.query.vid}})
//				}else if(window.location.href.indexOf('ser_id') != -1){
//					this.$router.push({path:'/details',query:{'ser_id':this.$route.query.ser_id}})
//				}
        if (this.$route.query.order_type == 1) {
          if (window.location.href.indexOf('vid') != -1) {
            this.$router.push({path: '/details', query: {'vid': this.$route.query.vid}})
          } else if (window.location.href.indexOf('ser_id') != -1) {
            this.$router.push({path: '/details', query: {'ser_id': this.$route.query.ser_id}})
          } else if (window.location.href.indexOf('a_id') != -1) {
            this.$router.push({path: '/details2', query: {'id': this.$route.query.a_id}})
          }
        } else if (this.$route.query.order_type == 2) {
          if (window.location.href.indexOf('vid') != -1) {
            window.location.href = window.location.origin+'/mine-give?order_no='+this.$route.query.orderNo+'&member_id='+this.$route.query.member_id+'&type=video&vid='+this.$route.query.vid;
            // this.$router.push({
            //   path: '/mine-give',
            //   query: {
            //     'order_no': this.$route.query.orderNo,
            //     'member_id': this.$route.query.member_id,
            //     'type': 'video',
            //     'vid': this.$route.query.vid
            //   }
            // })
          } else if (window.location.href.indexOf('ser_id') != -1) {
            window.location.href = window.location.origin+'/mine-give?order_no='+this.$route.query.orderNo+'&member_id='+this.$route.query.member_id+'&type=series&ser_id='+this.$route.query.ser_id;
            // this.$router.push({
            //   path: '/mine-give',
            //   query: {
            //     'order_no': this.$route.query.orderNo,
            //     'member_id': this.$route.query.member_id,
            //     'type': 'series',
            //     'ser_id': this.$route.query.ser_id
            //   }
            // })
          } else if (window.location.href.indexOf('a_id') != -1) {
            this.$router.push({path: '/details2', query: {'id': this.$route.query.a_id}})
          }
        } else if (window.location.href.indexOf('p_id') != -1) {
          // this.$router.push({path:'/details',query:{'ser_id':this.$route.query.p_id}});
          if (window.location.href.indexOf('shipin') != -1) {
            this.$router.push({path: '/details', query: {p_id: this.groupId, 'vid': this.$route.query.shipin}});
          } else {
            this.$router.push({path: '/details', query: {p_id: this.groupId, 'ser_id': this.$route.query.course}});
          }
        } else if (window.location.href.indexOf('a_id') != -1) {
          this.$router.push({path: '/details2', query: {'id': this.$route.query.a_id}});
        } else if(window.location.href.indexOf('art_id') != -1){
          this.$router.push({path: '/mine-course-articles', query: {'artid': this.$route.query.art_id}});
        } else {
          if (window.location.href.indexOf('askId') != -1) {
            this.$router.push({path: '/problemDetails', query: {'id': this.$route.query.askId}})
          } else if (window.location.href.indexOf('vid') != -1) {
            this.$router.push({path: '/details', query: {'vid': this.$route.query.vid}})
          } else if (window.location.href.indexOf('ser_id') != -1) {
            this.$router.push({path: '/details', query: {'ser_id': this.$route.query.ser_id}})
          } else if (window.location.href.indexOf('a_id') != -1) {
            this.$router.push({path: '/details2', query: {'id': this.$route.query.a_id}})
          } else {
            this.$router.push({path: '/mine'})
          }
        }


      }
    }
  }
</script>
<style>
  .successPay {
    font-size: 0.27rem;
  }

  .successTitle {
    height: 0.8rem;
    width: 100%;
    background-color: #3d3c41;
    text-align: center;
    color: #fff;
    line-height: 0.8rem;
  }

  .successPay img {
    height: 1.8rem;
    margin-left: calc(50% - 0.9rem);
    margin-top: 1rem;
  }

  .successPay .tip {
    font-weight: 500;
    text-align: center;
    font-size: 0.55rem;
    margin-top: 0rem;
  }

  .successPay .btn {
    height: 0.8rem;
    width: 6rem;
    background: #00c800;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.4rem;
    color: #fff;
    margin: 0 auto;
    margin-top: 1.8rem;
  }
</style>
