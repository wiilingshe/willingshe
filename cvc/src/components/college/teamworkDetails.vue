<template>
  <div class="teamworkDetails">
    <!-- <div class="teamworkDetails-no" v-if="list.length==0">此团人数已满，正在为您返回首页...</div> -->
    <mt-popup v-model="popupVisible" position="top" :modal=false>{{info1}}</mt-popup>
    <div v-if="list.length!=0">
      <!--heqingqing注释-->
      <!--<div class="teamworkDetails-desc" v-html="info.introduce"></div>-->
      <!--heqingqing新加开始-->
      <div class="teamworkDetails-desc">
        <img class="btn" src="/static/img/college0810/play@2x.png" alt="" @click="video" v-if="playStatus==1">
        <div class="videoFfenmian" v-if="playStatus==1"></div>
        <video :src="videoUrl" controls="controls" autoplay="autoplay" v-show="playStatus==0"></video>
        <p>
          <img src="/static/img/college0810/cvc.jpg" alt="">
        </p>

      </div>
      <!--heqingqing新加结束-->
      <!-- <div class="teamworkDetails-bg"></div> -->
      <div class="teamworkDetails-bg" style="z-index: 2;" v-show="ifshare1" @click="sharehiden()"></div>
      <img v-show="ifshare1" src="../../../static/img/college/share.png" class="teamworkDetails-share">
      <div class="teamworkDetails-content" v-show="!ifdown">
        <img class="teamworkDetails-content-down" src="../../../static/img/college/buypage/hide.png" @click="down()">
        <div class="teamworkDetails-content-title">{{list.member_lst[0].nickname}}发起的{{info.name}}团
        </div>
        <div class="teamworkDetails-content-box">
          <div class="teamworkDetails-content-box-list" v-for="(i,index) in list.full_num">
            <div class="teamworkDetails-content-box-list-img">
              <div class="teamworkDetails-content-box-list-img-zhang" v-if="index==0">团长</div>
              <img
                :src="list.member_lst.length>index?list.member_lst[index].face:'../../../static/img/college/buypage/none.png'">
            </div>
            <div class="teamworkDetails-content-box-list-name">
              {{list.member_lst.length > index ? list.member_lst[index].nickname : '用户名'}}
            </div>
          </div>
        </div>
        <div class="teamworkDetails-content-btn" v-if="list.is_join == 1 && list.status == 2">
          <div @click="share1()">邀请好友 组团学习</div>
          <div @click="goCanvas">生成海报</div>
        </div>
        <div class="teamworkDetails-content-btn3" v-if="list.is_join == 1 && list.status != 2">
          <div @click="share1()">邀请好友 组团学习</div>
        </div>
        <div class="teamworkDetails-content-btn" v-if="list.is_join == 0 && list.status == 1" @click="re()">
          已满员 重新开团
        </div>
        <div class="teamworkDetails-content-btn2" v-if="list.is_join == 0 && list.status == 2">
          <div class="teamworkDetails-content-btn2-btn" style="background-color:#222;margin-right:0.3rem;"
               @click="jion(list.full_num,list.member_lst.length)">{{list.price.union_fee}}参团
          </div>
          <div class="teamworkDetails-content-btn2-btn" style="background-color:#EF4949;" @click="laituan()">我要开团</div>
        </div>
      </div>
      <!-- 收起的样式 -->
      <div class="teamworkDetails-content2" v-show="ifdown">
        <div class="teamworkDetails-content2-box">
          <img src="../../../static/img/college/buypage/hide.png" style="transform: rotate(180deg);" @click="down()">
          <span class="teamworkDetails-content2-box-title">{{list.full_num}}人组团{{list.price.union_fee}}元</span>
          <span class="teamworkDetails-content2-box-right">
						<span class="teamworkDetails-content2-box-right-price">{{list.price.term_fee}}元</span>
						<span class="teamworkDetails-content2-box-right-btn" @click="share1()" v-if="btnText==0">邀请好友</span>
						<span class="teamworkDetails-content2-box-right-btn" v-if="btnText==1"
                  @click="jion(list.full_num,list.member_lst.length)">立即参团</span>
					</span>
        </div>
      </div>
      <!--heqingqing新加海报开始-->
      <div class="hechengBox" v-show="isHecheng == 0">
        <img :src="pic" alt="" class="hechengImg">
        <div class="bg" @click="close"></div>
        <div class="tishi" @click="close">
          <img src="/static/img/tuangou/jiantou@2x.png" alt="">
          长按保存图片 分享给好友
        </div>
      </div>
      <!--heqingqing新加海报结束-->


    </div>
  </div>
</template>
<script>
  import {Popup, Indicator} from 'mint-ui';
  export default{
    data(){
      return {
        list: [],
        info: [],
        ifdown: false,
        isHecheng: 1,
        ifshare1: false,
        info1: [],
        popupVisible: false,
        playStatus: 1,
        videoUrl: '',
        arr: ['/static/img/tuangou/bg@2x.png'],
        pic: '',
        btnText: 0,
        list2: [{
          "nickname": "brilliance",
          "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/E8sl0c7ogPKDxJDbqVwjianHR37ukq7Hfu1qN9fPq3g6nxKq5icMgCiag4J0O0fph7vZRksbuVmHs3bElakMGpfiaQ/132"
        },
          {
            "nickname": "贺成",
            "face": "https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTJMDso6t36OSEKWR8g7hYGmhEnqsolB9zicvqCqEbmTFEMo9arr67zUoVsF2KNrt6GcW5aiajk9CPvA\/132"
          },
          {
            "nickname": "玛崽",
            "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/M8WgcPkVQ9vCRL795uc6oHquQ0fYq1KPrK8Diakm0SQTLqv7yGibGL4LXSjzbnvicICQwc8MhvDunX2ia6H6TbRreQ/132"
          },
          {
            "nickname": "佘伟林",
            "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLGPMib5VAlZiabMdIRy3vzCcn3dwVK9adDBTI3gsib2E3KJa58YV8FqvCUpcFMGa2V6hdrNsIbkpK7Q/132"
          },
          {
            "nickname": "连明",
            "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/ibib6xictyJOE8qmH3ia6Y9wN2ROicKg1GicWtzYLLDeRtTxVqjoglmOtNcpcZyYkJLwfo5kp97fMPjxzX4SosLdxibnA/132"
          },
          {
            "nickname": "佐菲",
            "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/WPfbnNA7mxOUgiaN8TpRjs9YiazIYrKRuBNYPCBvdm3Cp7MA1OlCbP0IXWdWACib2yTlMlMNiaqicrFU7OrTTD3Ibbg/132"
          },
          {
            "nickname": "柱杰",
            "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/Pzia0ycicSeUmsiaSQ5TqXcy3PblELvA8ibaVfBVYZvWA1UZu7hvCfPSQUEuiaTFGHW61rQVicag5fv66FvSaJYCh33g/132"
          },
          {
            "nickname": "小林子",
            "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/S5JDISKZv7VGful72lUUVfRT9icfciatmUe51KoKvrQ3KicZOU8JTIjG3GJelAEYY3wWo5lcqlNX7icD8Fleyuqbyw/132"
          },
          {
            "nickname": "Amy。秋",
            "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLm5RNppfqE7E5ibo1nObLicmMZ8EYncv5KogSTaWibjRwlgtVFrbWWGOdQvbPia3A751lEjmpjwtmgmw/132"
          },
          {
            "nickname": "蛇尾林",
            "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/Zicj6tKnBIZoMH13n695B22hhzRxWTJicVIXt1pRIf0z5hTdN2PvOhDLGVQ6klIeeQ7hTj02wyRcKUXJ8aYGib6dA/132"
          },
          {
            "nickname": "曾程",
            "face": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKYqaSBaoxlXBficUqDkzaqAdVAwCLvPlZcjUvZcUvM8BqibxWxodyOY4uDxCs1CLLejhYgAWGLsJFw/132"
          }]
      }
    },
    created(){
      this.global.shouquan();
      Indicator.open();
      var self = this;
      var url = window.location.href;
      document.title = '拼团详情';
      this.getData('get', '/shop-v1-user_base_info.html').then(res => {
        if (res.data.status == 0) {
          self.tip(res.data.msg)
        }
        if (res.data.data.terms.length > 0) {
          this.$router.push({path: '/collegeHome'})
        }
        self.getData('post', '/shop-v2-college-config.html').then(res1 => {
          if (res.data.status == 0) {
            self.tip(res.data.msg)
          }
          self.info = res1.data.data
          self.getData('post', '/shop-v2-college-current_term.html').then(res2 => {
            if (res.data.status == 0) {
              self.tip(res.data.msg)
            }
            var name = res.data.data.nickname + '邀请你组团加入' + res1.data.data.name;
            var desc = '限时组团' + res2.data.data.union_fee + '元，每个摄影人都应该加入' + res1.data.data.name;
            self.share(name, desc, 'https://www.saasxx.vip/base/img/college_pic.png');
            Indicator.close();
          })
        })
      })
      this.getData('post', '/shop-v2-college-get_grp_detail.html', {
        grp_id: this.$route.query.ctgr_id,
        'url': url
      }).then(res => {
        var self = this;
        if (res.data.status == 2) { //进行中
          //判断是接受人还是发起人
          var arr = self.GetRequest();
          if (arr.share == '0') {//0为发起人
            self.btnText = 0;
            self.ifdown = false;
          } else {
            self.btnText = 1;
            self.ifdown = true;
          }
          self.arr[1] = res.data.logo.data;
          self.arr[2] = res.data.college_name;
          self.arr[3] = res.data.price.union_fee + '元';
          self.arr[4] = '原价' + res.data.price.term_fee + '元';
          self.arr[5] = res.data.member_lst[0].face;  //第1个人头像
          self.arr[6] = res.data.member_lst[0].nickname;//第1个人名字
          self.arr[9] = '/static/img/tuangou/Q@2x.png';  //第3个人头像
          self.arr[10] = '虚位以待';//第3个人名字
          self.arr[12] = res.data.qr_code;
          self.arr[13] = '';
          self.arr[14] = '/static/img/tuangou/tuanzhang@2x.png';
          if (res.data.member_lst.length == '1') {
            self.arr[7] = '/static/img/tuangou/Q@2x.png';  //第2个人头像
            self.arr[8] = '虚位以待';//第2个人名字
            self.arr[11] = '2'; //还差2人成团
          } else if (res.data.member_lst.length == '2') {
            self.arr[7] = res.data.member_lst[1].face;  //第1个人头像
            self.arr[8] = res.data.member_lst[1].nickname;//第1个人名字
            self.arr[11] = '1'; //还差1人成团
          }
          self.hecheng(self.arr);
        } else if (res.data.status == 1) {
          if (res.data.member_lst.length < res.data.full_num) {
            var length = res.data.full_num - res.data.member_lst.length;
            for (let i = 0; i < length; i++) {
              var data = this.list2[Math.floor(Math.random() * 10 + 1)];
              res.data.member_lst.push(data)
            }
          }
        }
        if (res.data.status == 0) {
          self.tip(res.data.msg)
        } else if (res.data.is_join != undefined) {
          this.list = res.data;
        } else {
          setTimeout(function () {
            self.$router.push({path: '/collegeHome', query: {root_id: self.globalid}})
          }, 2000)
        }
      });
    },
    mounted(){

    },
    methods: {
      re(){
        this.$router.push({path: '/buyPage'})
      },
      down(){
        this.ifdown = !this.ifdown;
      },
      jion(num1, num2){
//        console.log(num1 - num2)
        if (num1 - num2 == 1) {
          this.getData('post', '/shop-v1-pay_order.html', {
            type: 11,
            term_id: this.$route.query.term,
            marketing_type: 1,
            ctgr_id: this.$route.query.ctgr_id
          }).then(res => {
            if (res.data.status == 0) {
              this.tip(res.data.msg)
            }
            this.pay1(res.data, 1)
          })
        } else {
          this.getData('post', '/shop-v1-pay_order.html', {
            type: 11,
            term_id: this.$route.query.term,
            marketing_type: 1,
            ctgr_id: this.$route.query.ctgr_id
          }).then(res => {
            if (res.data.status == 0) {
              this.tip(res.data.msg)
            }
            this.pay1(res.data, 3)
          })
        }
      },
      laituan(){
        this.getData('post', '/shop-v1-pay_order.html', {
          type: 11,
          term_id: this.$route.query.term,
          marketing_type: 1
        }).then(res => {
          if (res.data.status == 0) {
            this.tip(res.data.msg)
          }
          this.pay1(res.data, 3)
        })
      },
      tip(msg){
        var self = this;
        this.info1 = msg;
        this.popupVisible = true;
        setTimeout(function () {
          self.popupVisible = false;
        }, 2000);
        Indicator.close();
        return false;
      },
      share1(){
        this.ifshare1 = true;
      },
      sharehiden(){
        this.ifshare1 = false;
      },
      /**
       * video:点击视频播放
       * by heqingqing 2018/08/14
       */
      video: function () {
        this.playStatus = 0;
        this.videoUrl = 'https://cloud.saasxx.vip/cvcHome/cvc.mp4';
        $('video')[0].play();
      },
      /**
       * goCanvas:调用canvas画图
       * by heqingqing 2018/08/16
       */
      goCanvas: function () {
        var self = this;
        self.isHecheng = 0;
        self.playStatus = 1;
        $('video')[0].pause();
      },
      /**
       * hecheng:合成海报图片
       * by heqingqing 2018/08/17
       */
      hecheng(arr){
        var self = this;
        var len = arr.length;
        var mycanvas = document.createElement('canvas');
        document.body.appendChild(mycanvas);
        $('canvas').css('display', 'none');
//        mycanvas.width = 692;
//        mycanvas.height = 1230;
        mycanvas.width = 614
        mycanvas.height = 880;
        var context = mycanvas.getContext('2d');
        context.fillStyle = '#fff';
        context.fill();
        context.fillRect(0, 0, mycanvas.width, mycanvas.height);
        context.beginPath();
        context.stroke();
        function drawing(num) {
          if (num < len) {
            var img = new Image;
            img.crossOrigin = "*";
            img.src = arr[num];
            if (num == 0) {
              img.onerror = function () {
                drawing(num + 1);
              }
              img.onload = function () {
                context.drawImage(img, 0, 0, mycanvas.width, mycanvas.height);
                drawing(num + 1);
              }
            } else if (num == 1) {
              img.onload = function () {
                context.drawImage(img, 70, 50, 60, 20);
                drawing(num + 1);
              }
              img.onerror = function () {
                drawing(num + 1);
              }
            } else if (num == 2) {
              context.font = '20px Microsoft YaHei normal';
              context.fillStyle = '#fff';
              context.textAlign = 'center';
              context.fillText(arr[num], 176, 68);
              drawing(num + 1);
            } else if (num == 3) {
              context.font = '28px Microsoft YaHei bold';
              context.fillStyle = '#E21414';
              context.textAlign = 'center';
              context.fillText(arr[num], 260, 325);
              drawing(num + 1);
            } else if (num == 4) {
              context.font = '18px PingFang SC lighter 12px arial';
              context.fillStyle = '#ccc';
              context.textAlign = 'center';
              context.fillText(arr[num], 135, 370);
              drawing(num + 1);
            } else if (num == 5) {
              img.onload = function () {
                context.save();
                context.arc(170, 475, 41, 0, 2 * Math.PI);
                context.clip();
                context.drawImage(img, 128, 434, 82, 82);
                context.restore();
                drawing(num + 1);
              };
              img.onerror = function () {
                drawing(num + 1);
              };
            } else if (num == 6) {
              context.font = '18px Microsoft YaHei bold';
              context.fillStyle = '#333333';
              context.textAlign = 'center';
              context.fillText(arr[num], mycanvas.width / 3.6, 550);
              drawing(num + 1);
            } else if (num == 7) {
              img.onload = function () {
                context.save();
                context.arc(300, 475, 41, 0, 2 * Math.PI);
                context.clip();
                context.drawImage(img, 259, 434, 82, 82);
                context.restore();
                drawing(num + 1);
              }
              img.onerror = function () {
                drawing(num + 1);
              };
            } else if (num == 8) {
              context.font = '18px Microsoft YaHei bold';
              context.fillStyle = '#333333';
              context.textAlign = 'center';
              context.fillText(arr[num], mycanvas.width / 2, 550);
              drawing(num + 1);
            } else if (num == 9) {
              img.onload = function () {
                context.drawImage(img, 400, 436, 82, 82);
                drawing(num + 1);
              }
              img.onerror = function () {
                drawing(num + 1);
              }
            } else if (num == 10) {
              context.font = '18px Microsoft YaHei bold';
              context.fillStyle = '#333333';
              context.textAlign = 'center';
              context.fillText(arr[num], 450, 550);
              drawing(num + 1);
            } else if (num == 11) {
              context.font = '44px Microsoft YaHei bold';
              context.fillStyle = '#E21414';
              context.textAlign = 'center';
              context.fillText(arr[num], 290, 632);
              drawing(num + 1);
            } else if (num == 12) {
              img.onload = function () {
                context.drawImage(img, 245, 650, 122, 122);
                drawing(num + 1);
              }
              img.onerror = function () {
                drawing(num + 1);
              }
            } else if (num == 13) {
              context.beginPath();
              context.lineWidth = 2;
              context.strokeStyle = '#ccc';
              context.moveTo(60, 362);
              context.lineTo(230, 362);
              context.stroke();
              context.closePath();
              drawing(num + 1);
            } else if (num == 14) {
              img.onload = function () {
                context.drawImage(img, 180, 428, 42, 24);
                drawing(num + 1);
              }
              img.onerror = function () {
                drawing(num + 1);
              }
            }
          } else {
            self.pic = mycanvas.toDataURL("image/jpeg");
          }


        }

        drawing(0)
      },
      /**
       * close:关闭海报弹出
       * by heqingqing 2018/08/17
       */
      close: function () {
        var self = this;
        self.isHecheng = 1;
      },
      /**
       * GetRequest：获取url问号参数
       * @returns {Object}
       * @constructor
       */
      GetRequest: function () {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
        }
        return theRequest;
      }
    }
  }
</script>
<style lang="less">
  .teamworkDetails {
    font-size: 0.24rem;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    &-no {
      text-align: center;
      margin-top: 0.60rem;
    }
    &-share {
      position: absolute;
      width: calc(~"100% - 3rem");
      left: 2.45rem;
      top: 0.6rem;
      z-index: 3;
    }
    &-desc {
      height: 100vh;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      position: relative;
      .btn {
        position: absolute;
        left: 50%;
        margin-left: -0.33rem;
        top: 4.6rem;
        z-index: 2;
        width: 0.66rem !important;
      }
      .videoFfenmian {
        width: 6rem;
        height: 3.5rem;
        position: absolute;
        left: 50%;
        margin-left: -3rem;
        background: url(/static/img/college0810/fengmiantu.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        top: 3.3rem;
        z-index: 1;
      }
      video, iframe {
        width: 6rem;
        height: 3.5rem;
        position: absolute;
        left: 50%;
        margin-left: -3rem;
        top: 3.3rem;
        border: none;
      }
      img {
        width: 100% !important;
        height: auto !important;
      }
    }
    &-bg {
      background-color: rgba(0, 0, 0, 0.6);
      position: fixed;
      top: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    &-content2 {
      width: 6.9rem;
      // height: 0.9rem;
      padding: 0.16rem 0;
      border-radius: 0.06rem;
      background-color: #fff;
      position: absolute;
      left: calc(~"50% - 3.45rem");
      box-shadow: 0px 0px 6px #999;
      bottom: 0rem;
      &-box {
        padding: 0 0.3rem;
        height: 0.6rem;
        line-height: 0.6rem;
        img {
          width: 0.3rem;
        }
        &-title {
          font-size: 0.28rem;
          color: #333;
          margin-left: 0.1rem;
        }
        &-right {
          float: right;
          &-price {
            font-size: 0.26rem;
            color: #999;
            text-decoration: line-through;
          }
          &-btn {
            font-size: 0.28rem;
            width: 1.8rem;
            height: 0.6rem;
            border-radius: 0.06rem;
            background-color: #EF4949;
            color: #fff;
            text-align: center;
            line-height: 0.6rem;
            display: inline-block;
          }
        }
      }
    }
    &-content {
      width: 6.9rem;
      height: 4rem;
      background-color: #fff;
      border-radius: 0.06rem;
      position: fixed;
      bottom: 0rem;
      left: calc(~"50% - 3.45rem");
      box-shadow: 0px 0px 6px #999;
      z-index: 10;
      &-down {
        position: absolute;
        top: 0.44rem;
        width: 0.3rem;
        left: 0.32rem;

      }
      &-title {
        text-align: center;
        font-size: 0.3rem;
        font-weight: bold;
        margin-top: 0.3rem;
      }
      &-box {
        display: flex;
        -webkit-display: flex;
        justify-content: center;
        width: 6.9rem;
        overflow-x: scroll;
        &-list {
          font-size: 0.26rem;
          position: relative;
          &-img {
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            &-zhang {
              width: 0.52rem;
              height: 0.32rem;
              background-color: #EF4949;
              border-radius: 0.06rem;
              color: #fff;
              text-align: center;
              line-height: 0.32rem;
              font-size: 0.22rem;
              position: absolute;
              right: -0.15rem;
              top: -0.05rem;
            }
            img {
              width: 1rem;
              height: 1rem;
              border-radius: 100%;
            }
          }
          &-name {
            margin-top: 1.45rem;
            width: 1.8rem;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            text-overflow: ellipsis;
            font-size: 0.26rem;
          }
        }
      }
      &-btn3 {
        width: 6.2rem;
        overflow: hidden;
        margin: 0 auto;
        margin-top: 0.35rem;
        background-color: #EF4949;
        font-size: 0.3rem;
        text-align: center;
        color: #fff;
        line-height: 0.9rem;
        border-radius: 0.06rem;
      }
      &-btn {
        div:first-child {
          width: 3.5rem;
          background-color: #EF4949;
          font-size: 0.3rem;
          text-align: center;
          color: #fff;
          line-height: 0.9rem;
          float: left;
          border-radius: 0.06rem;
        }
        div:last-child {
          width: 2.2rem;
          background: #222222;
          font-size: 0.3rem;
          text-align: center;
          color: #fff;
          line-height: 0.9rem;
          float: right;
          border-radius: 0.06rem;
        }
        width: 6.2rem;
        overflow: hidden;
        margin: 0 auto;
        margin-top: 0.35rem;
      }
      &-btn2 {
        display: flex;
        -webkit-display: flex;
        justify-content: center;
        margin-top: 0.35rem;
        &-btn {
          width: 3rem;
          height: 0.9rem;
          border-radius: 0.06rem;
          text-align: center;
          line-height: 0.9rem;
          overflow: hidden;
          color: #fff;
          font-size: 0.3rem;
        }
      }
    }
    .hechengBox {
      .bg {
        width: 100vh;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
      }
      .hechengImg {
        width: 6.14rem !important;
        height: 8.8rem !important;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -3.07rem;
        margin-top: -4.4rem;
        z-index: 100;
      }
      .tishi {
        position: fixed;
        /*top: 11.2rem;*/
        bottom: 0;
        width: 100%;
        text-align: center;
        color: #fff;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.28rem;
        z-index: 100;
        img {
          width: 0.18rem;
          height: 0.26rem;
        }
      }
    }

  }
</style>
