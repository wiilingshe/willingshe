<template>
  <div class="personalcenter">
    <div class="personalcenter-bg" v-if="code" @click="close()"></div>
    <div class="personalcenter-code" v-if="code">
      <img class="personalcenter-code-close" src="../../../static/img/home/my_close.png" @click="close()">
      <div class="personalcenter-code-title">{{base.title}}</div>
      <img class="personalcenter-code-code" :src="base.kefu_qrcode">
      <div class="personalcenter-code-tip">长按识别二维码，联系我们</div>
    </div>
    <div class="personalcenter-neirong">
      <div class="personalcenter-info">
        <div class="personalcenter-info-info">
          <img :src="info.face">
          <div style="width:5rem;display:inline-block;vertical-align:top;" @click="editUser()">
            <div style="display:table;height:1.5rem;">
              <div style="display:table-cell;vertical-align:middle;">
                <div class="personalcenter-info-info-name">
                  {{info.nickname}}
                </div>
                <div class="personalcenter-info-info-edit">
                  完善个人资料
                </div>
              </div>
            </div>
          </div>
          <i class="icon iconfont icon-next-page" @click="editUser()"></i>
        </div>
      </div>
      <div class="personalcenter-list" @click="wallet()">
        <img src="../../../static/img/home/my_wallet.png">
        <div class="personalcenter-list-right">
          <div class="personalcenter-list-right-name">我的钱包</div>
          <div class="personalcenter-list-right-right">
            <span>{{Number(balance)}}</span><i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <div class="personalcenter-list" @click="scholarship1()">
        <img src="../../../static/img/home/my_Scholarship.png" style="position:relative;top:0.05rem;">
        <div class="personalcenter-list-right">
          <div class="personalcenter-list-right-name">我的奖学金</div>
          <div class="personalcenter-list-right-right">
            <span>{{scholarship}}</span><i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <div class="personalcenter-list mb20" @click="buyRecord()">
        <img src="../../../static/img/home/my_buyrecord.png" style="position:relative;top:0.08rem;">
        <div class="personalcenter-list-right" style="border-bottom:none;">
          <div class="personalcenter-list-right-name">购买记录</div>
          <div class="personalcenter-list-right-right">
            <i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <div class="personalcenter-list" @click="baoming()">
        <img src="../../../static/img/home/my_college.png">
        <div class="personalcenter-list-right">
          <div class="personalcenter-list-right-name">摄影学院-现场报名</div>
          <div class="personalcenter-list-right-right">
            <i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <div class="personalcenter-list" @click="goCoupon">
        <img src="../../../static/img/home/my_coupon@2x.png">
        <div class="personalcenter-list-right">
          <div class="personalcenter-list-right-name">我的优惠券</div>
          <div class="personalcenter-list-right-right">
            <i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <div class="personalcenter-list" @click="myEquipment()">
        <img src="../../../static/img/home/my_equipment.png">
        <div class="personalcenter-list-right">
          <div class="personalcenter-list-right-name">我的装备</div>
          <div class="personalcenter-list-right-right">
            <i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <div class="personalcenter-list" @click="mycollect()">
        <img src="../../../static/img/home/my_Collection.png" style="position:relative;top:0.02rem;">
        <div class="personalcenter-list-right">
          <div class="personalcenter-list-right-name">我的收藏</div>
          <div class="personalcenter-list-right-right">
            <i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <div class="personalcenter-list mb20" @click="mygift()">
        <img src="../../../static/img/home/home_gift.png" style="position:relative;top:0.02rem;">
        <div class="personalcenter-list-right">
          <div class="personalcenter-list-right-name">我的赠礼</div>
          <div class="personalcenter-list-right-right">
            <i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <!-- <div class="personalcenter-list mb20" @click="lookrecord()">
          <img src="../../../static/img/home/my_Browserecords.png" style="position:relative;top:0.05rem;">
          <div class="personalcenter-list-right" style="border-bottom:none;">
            <div class="personalcenter-list-right-name">浏览记录</div>
            <div class="personalcenter-list-right-right">
              <i class="icon iconfont icon-next-page"></i>
            </div>
          </div>
      </div> -->
      <div class="personalcenter-list" @click="commonProblem()">
        <img src="../../../static/img/home/my_FAQ.png">
        <div class="personalcenter-list-right">
          <div class="personalcenter-list-right-name">常见问题</div>
          <div class="personalcenter-list-right-right">
            <i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <div class="personalcenter-list" @click="fangkui()">
        <img src="../../../static/img/home/my_feedback.png">
        <div class="personalcenter-list-right" style="border-bottom:none;">
          <div class="personalcenter-list-right-name">意见反馈</div>
          <div class="personalcenter-list-right-right">
            <i class="icon iconfont icon-next-page"></i>
          </div>
        </div>
      </div>
      <footer1 :infos="base"></footer1>
    </div>
    <Navigator style="position: fixed;width: 100%;bottom: 0;" :ifopen="isOpenCollege"></Navigator>
  </div>
</template>
<script>
  import footer1 from '@/components/common/footer1'
  import Navigator from '@/components/common/Navigator'
  export default{
    data(){
      return {
        info: [],
        base: [],
        balance: 0,
        scholarship: 0,
        code: false,
        isOpenCollege: 0,
        ifshebei: false,
      }
    },
    created(){
      document.title = '个人中心';
      if (sessionStorage.getItem('res2') != null) {
        var res = JSON.parse(sessionStorage.getItem('res2'));
        res.data = res;
        res.data.data = res.data;
        this.info = res.data.data;
        this.balance = Number(res.data.data.largess_balance) + Number(res.data.data.recharge_balance);
        this.balance = this.balance.toFixed(2);
        this.scholarship = Number(res.data.data.balance).toFixed(2);
      } else {
        this.getData('get', '/shop-v1-user_base_info.html').then(res => {
          this.info = res.data.data;
          this.balance = Number(res.data.data.largess_balance) + Number(res.data.data.recharge_balance);
          this.balance = this.balance.toFixed(2);
          this.scholarship = Number(res.data.data.balance).toFixed(2);
          sessionStorage.setItem('res2', JSON.stringify(res.data.data))
        }, res => {

        })
      }
      if (sessionStorage.getItem('res') != null) {
        var res = JSON.parse(sessionStorage.getItem('res'));
        res.data = res;
        this.base = res.data;
        this.isOpenCollege = res.data.is_open_college;
        localStorage.setItem('ifopen', res.data.is_open_college)
      } else {
        this.getData('post', '/shop-v1-index_basemsg.html').then(res => {
          sessionStorage.setItem('res', JSON.stringify(res.data))
          this.base = res.data;
          this.isOpenCollege = res.data.is_open_college;
          console.log(res.data.is_open_college);
          localStorage.setItem('ifopen', res.data.is_open_college)
        })
      }
      this.getData('post', '/shop-v2-shoot_get_my_device.html').then(res => {
        if (Array.prototype.isPrototypeOf(res.data.data) == true) {
          // 没有添加任何装备
          this.ifshebei = false;
        } else {
          this.ifshebei = true;
        }
      })
    },
    mounted(){
      console.log(this.isOpenCollege);
    },
    methods: {
      wallet(){
        this.$router.push({path: '/mine-money'});
      },
      scholarship1(){
        this.$router.push({path: '/scholarship'});
      },
      editUser(){
        this.$router.push({path: '/mine-setup'});
      },
      buyRecord(){
        this.$router.push({path: '/buyRecord'});
      },
      myEquipment(){
        if (this.ifshebei == true) {
          this.$router.push({path: '/myEquipment'});
        } else {
          this.$router.push({path: '/updateEq'});
        }
      },
      lookrecord(){
        this.$router.push({path: '/lookrecord'});
      },
      mycollect(){
        this.$router.push({path: '/myCollection'});
      },
      mygift(){
        this.$router.push({path: '/myGift'});
      },
      fangkui(){
        this.code = true;
      },
      close(){
        this.code = false;
      },
      commonProblem(){
        this.$router.push({path: '/commonProblem'})
      },
      baoming(){
        this.$router.push({path: '/mySignup'})
      },
      /**
       * goCoupon:跳转优惠卷页面
       * by heqingqing 2018/08/21
       */
      goCoupon(){
        this.$router.push({path: '/coupon'})
      }
    },
    components: {footer1, Navigator}
  }
</script>
<style lang="less">
  .personalcenter {
    &-bg {
      width: 100%;
      height: 100vh;
      position: fixed;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.6);
      top: 0;
    }
    &-code {
      position: fixed;
      z-index: 2;
      width: 5rem;
      height: 5.5rem;
      // background-color: #fff;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 0.06rem;
      background-image: url(/static/img/college/my_QRcode_bg.png);
      background-size: 100%;
      background-position-y: -0.1rem;
      &-title {
        font-size: 0.38rem;
        margin-top: 0.55rem;
        text-align: center;
      }
      &-code {
        width: 3rem;
        height: 3rem;
        margin-top: 0.25rem;
        margin-left: 1rem;
      }
      &-tip {
        font-size: 0.3rem;
        margin-top: 0.25rem;
        text-align: center;
      }
      &-close {
        width: 0.3rem;
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
      }
    }
    .mb20 {
      margin-bottom: 0.2rem;
    }
    &-neirong {
      // height: calc(~"100vh - 0.95rem");
      // overflow: scroll;
      // -webkit-overflow-scrolling:touch;
      padding-bottom: 0.95rem;
    }
    &-info {
      height: 3rem;
      width: 100%;
      background-position: center;
      background-size: 100%;
      margin-bottom: 0.2rem;
      background-image: url(data:image/png;base64,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);
      position: relative;
      &-info {
        height: 1.26rem;
        position: absolute;
        bottom: 0.3rem;
        width: calc(~"100% - 0.6rem");
        left: 0.3rem;
        img {
          width: 1.26rem;
          height: 1.26rem;
          border-radius: 50%;
          border: 1px solid #fff;
          margin-right: 0.16rem;
        }
        &-name {
          width: 5rem;
          display: inline-block;
          font-size: 0.38rem;
          color: #fff;
          // vertical-align: top;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &-edit {
          width: 5rem;
          display: inline-block;
          font-size: 0.26rem;
          color: #fff;
          vertical-align: top;
        }
        i {
          color: #fff;
          font-size: 0.22rem;
          display: inline-block;
          vertical-align: top;
          line-height: 1.26rem;
          float: right;
        }
      }
    }
    &-list {
      height: 0.9rem;
      width: 100%;
      background-color: #fff;
      img {
        height: 0.38rem;
        margin-top: 0.26rem;
        margin-left: 0.3rem;
        float: left;
      }
      &-right {
        width: 6.58rem;
        display: inline-block;
        font-size: 0.28rem;
        overflow: hidden;
        border-bottom: 1px solid #eee;
        vertical-align: top;
        float: right;
        &-name {
          line-height: 0.9rem;
          display: inline-block;
          vertical-align: top;
        }
        &-right {
          display: inline-block;
          float: right;
          vertical-align: top;
          line-height: 0.9rem;
          span {
            margin-right: 0.15rem;
          }
          i {
            font-size: 0.22rem;
            margin-right: 0.3rem;
            color: #999;
          }
        }
      }
    }
  }
</style>
