<template>
  <div class="collegeHome" v-show="ifshow">
    <transition name="fade">
      <div class="box1-bg" v-if="iftip"></div>
    </transition>
    <transition name="fade">
      <div class="box1-tipbox" v-if="iftip" @click="totipurl(tipdata.college_url)">
        <img style="width: 6rem;height: 8rem;border-radius: 0.06rem;" :src="tipdata.college_img">
      </div>
    </transition>
    <transition name="fade">
      <div class="box1-tipclose" v-if="iftip" @click="closetip()">X</div>
    </transition>
    <div class="askbtn" v-if="!ifback && !tokefu && ifstudent && ifxia" @click='tozixun()'>咨询</div>
    <mt-popup v-model="popupVisible" position="top" :modal=false>{{info}}</mt-popup>
    <div class="collegeHome-content">
      <!-- <div class="jieshao" @click="jieshaotu()" v-if="ifstudent">
        学院介绍<img src="/static/img/more.png">
      </div> -->
      <div v-if="!ifstudent">
        <!--heqingqing注释-->
        <!--<div class="collegeHome-content-content" v-html="info4.introduce"-->
        <!--:style="{height:ifterm==true?ifback==false?'calc(100vh - 1.9rem)':'calc(100vh - 0.9rem)':'calc(100vh - 0.9rem)'}"></div>-->
        <!--heqingqing新加开始-->
        <div class="collegeHome-content-content"
             :style="{height:ifterm==true?ifback==false?'calc(100vh - 1.9rem)':'calc(100vh - 0.9rem)':'calc(100vh - 0.9rem)'}">
          <img class="btn" src="/static/img/college0810/play@2x.png" alt="" @click="video" v-if="playStatus==1">
          <div v-if="!ifstudent" class="collegeHome-share" @click="share1()">
            分享赚学费
          </div>
          <div class="videoFfenmian" v-if="playStatus==1"></div>
          <!--<iframe name="iframeVideo" id="iframeVideo" :src="videoUrl" allowfullscreen="true" allowtransparency="true"-->
          <!--autoPlay="true"-->
          <!--v-if="playStatus==0">-->
          <!--</iframe>-->
          <video :src="videoUrl" controls="controls" autoplay="autoplay" v-show="playStatus==0"></video>
          <p>
            <img src="/static/img/college0810/cvc.jpg" alt="">
          </p>
        </div>
        <!--heqingqing新加结束-->
        <!-- 无活动 -->
        <div v-if="info.marketing_type==0">
          <div class="collegeFooter" style="white-space: nowrap;overflow:hidden">
            <div class="left" style="width:5.2rem;display: inline-block;float:left;text-align:left;">
              <span
                style="margin-left:0.3rem;font-size:0.26rem;display:inline-block;width: 3rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{info.term_name}}</span>
              <span v-if="info.sales_on==1?true:false"
                    style="text-decoration: line-through;color:#999;float:right;margin-right:0.3rem;">{{info.term_fee}}元/年</span>
            </div>
            <div class="right" @click="pay()" style="width:2.3rem;display: inline-block;float:left;">
              {{info.sales_on == 1 ? info.sales_fee : info.term_fee}}元/年
            </div>
          </div>
        </div>
        <!-- 已拼图 -->
        <div v-if="info.is_join==1">
          <div class="collegeFooter">
            <div class="left" @click="pay()">
              {{info.term_fee}}元/年 单买
            </div>
            <div class="right" @click="details()">
              拼团中 邀请好友
            </div>
          </div>
        </div>
        <!-- 拼团 -->
        <div v-if="info.marketing_type==1 && info.is_join==0">
          <div class="collegeFooter">
            <div class="left" @click="pay()">
              <div v-if="info.sales_on==1?true:false"
                   style="text-decoration: line-through;color:#999;float:right;margin-right: 0.15rem;">{{info.term_fee}}元/年
              </div>
              <div>{{info.sales_on == 1 ? info.sales_fee : info.term_fee}}元/年 单买</div>

            </div>
            <div class="right" @click="goPuzzle()">
              三人拼团{{info.union_fee}}元/年
            </div>
          </div>
        </div>
        <!-- 抢购 -->
        <div v-if="info.marketing_type==2">
          <div class="collegeFooter">
            <div class="left" @click="pay()">
              <div v-if="info.sales_on==1?true:false"
                   style="text-decoration: line-through;color:#999;float:right;margin-right: 0.15rem;">{{info.term_fee}}元/年
              </div>
              <div>{{info.sales_on == 1 ? info.sales_fee : info.term_fee}}元/年 单买</div>
            </div>
            <div class="right" @click="qianggou()">
              {{info.scare_fee}}元购买
            </div>
          </div>
        </div>
      </div>
      <div class="collegeHome-content-home" v-if="ifstudent" v-infinite-scroll="loadMore"
           infinite-scroll-disabled="false" infinite-scroll-immediate-check="false"
           infinite-scroll-distance="0">
        <div class="collegeHome-content-home-head" style="position: relative;">
          <div class="collegeHome-share" @click="share1()">
            分享赚学费
          </div>
          <div class="jieshao" @click="jieshaotu()" v-if="ifstudent">
            学院介绍<img src="/static/img/more.png">
          </div>
          <div class="collegeHome-content-home-head-img">
            <img :src="info2.face">
            <!-- <img src="/static/img/college/college_pic.png"> -->
          </div>
          <div class="collegeHome-content-home-head-info">
            <div class="collegeHome-content-home-head-info-name">{{info2.nickname}}</div>
            <div class="collegeHome-content-home-head-info-num">学号：{{info2.student_id}}</div>
            <div class="collegeHome-content-home-head-info-time">入学：{{info2.college_admission_time}}</div>
          </div>
        </div>
        <nodata v-if="startlist.length==0&&publishedlist.length==0&&nostartlist.length==0"></nodata>
        <div class="collegeHome-content-home-course" v-if="startlist.length > 0">
          <div class="collegeHome-content-home-course-title">
            <div class="collegeHome-content-home-course-title-left"><i
              class="icon iconfont icon-sanjiaoxing-right"></i>即将开讲
            </div>
            <!-- <div class="collegeHome-content-home-course-title-right" @click="offonline(startlist[0].active_id,startlist[0].ca_id,startlist[0].car_id)" v-if="startlist[0].active_id">
              <img src="../../../static/img/college/college_signup.png">
              <span>现场活动报名</span>
            </div> -->
          </div>
          <div v-for="(i,index) in startlist">
            <div class="collegeHome-content-home-course-pic" @click="datails(i)">
              <img :src="i.active_img">
            </div>
            <div class="collegeHome-content-home-course-biaoti" v-if="i.active_id">
              <div @click="datails(i)">
                <div style="margin-bottom: 0.03rem;">{{i.title}}</div>
                <div style="color: #999;font-size: 0.26rem;">{{i.subtitle}}</div>
              </div>
              <div @click="offonline(i.active_id,i.ca_id,i.car_id)" v-if="i.active_id">现场报名</div>
            </div>
            <div class="collegeHome-content-home-course-biaoti" v-if="!i.active_id" style="width: 6.9rem;">
              <div @click="datails(i)">
                <div style="margin-bottom: 0.03rem;width: 6.9rem;">{{i.title}}</div>
                <div style="color: #999;font-size: 0.26rem;width: 6.9rem;">{{i.subtitle}}</div>
              </div>
              <!-- <div  @click="offonline(i.active_id,i.ca_id,i.car_id)">现场报名</div> -->
            </div>
            <div class="collegeHome-content-home-course-desc"></div>
          </div>
        </div>
        <div class="collegeHome-content-home-course" v-if="willShelfList.length > 0">
          <div class="collegeHome-content-home-course-title">
            <div class="collegeHome-content-home-course-title-left"><i
              class="icon iconfont icon-sanjiaoxing-right"></i>等待上架
            </div>
          </div>
          <div v-for="(i,index) in willShelfList" @click="datails(i)">
            <div class="collegeHome-content-home-course-pic">
              <img :src="i.active_img">
            </div>
            <div class="collegeHome-content-home-course-biaoti">{{i.title}}</div>
            <div class="collegeHome-content-home-course-desc">{{i.subtitle}}</div>
          </div>
        </div>
        <div class="collegeHome-content-home-course" v-if="publishedlist.length > 0">
          <div class="collegeHome-content-home-course-title">
            <div class="collegeHome-content-home-course-title-left"><i
              class="icon iconfont icon-sanjiaoxing-right"></i>最新回放
            </div>
          </div>
          <div v-for="(i,index) in publishedlist" @click="datails(i)">
            <div class="collegeHome-content-home-course-pic">
              <img :src="i.active_img">
            </div>
            <div class="collegeHome-content-home-course-biaoti">{{i.title}}</div>
            <div class="collegeHome-content-home-course-desc">{{i.subtitle}}</div>
          </div>
        </div>
        <div class="collegeHome-content-home-course" v-if="nostartlist.length > 0">
          <div class="collegeHome-content-home-course-title">
            <div class="collegeHome-content-home-course-title-left"><i
              class="icon iconfont icon-sanjiaoxing-right"></i>未开始
            </div>
          </div>
          <div v-for="(i,index) in nostartlist" @click="datails(i)">
            <div class="collegeHome-content-home-course-pic">
              <img :src="i.active_img">
            </div>
            <div class="collegeHome-content-home-course-biaoti">{{i.title}}</div>
            <div class="collegeHome-content-home-course-desc">{{i.subtitle}}</div>
          </div>
        </div>

        <footer1 :tokefu="tokefu" :kefu1="kefu1" v-on:childByValue="childByValue"
                 v-on:childByValue1="childByValue1"></footer1>
      </div>
    </div>
    <Navigator v-if="!ifback" :ifopen="ifopen" :hao1="hao1"></Navigator>
    <!-- 已购买 -->
    <div class="backbtn" v-if="ifback" @click="goback()">
      返回查看课程
    </div>
  </div>
</template>
<script>
  import nodata from '@/components/common/nodata'
  import footer1 from '@/components/common/footer1'
  import Navigator from '@/components/common/Navigator';
  import {Popup, Indicator} from 'mint-ui';
  export default{
    data: function () {
      return {
        info: [],
        list2: [],
        ifstudent: false,
        list: [],
        info2: [],
        term_id: '',
        info3: [],
        popupVisible: false,
        info4: '',
        ifopen: 0,
        ifterm: false,
        list3: [],
        ifshow: false,
        page: 1,
        startlist: [],
        publishedlist: [],
        nostartlist: [],
        willShelfList: [],
        dataType: 2,
        iftip: false,
        ifback: false,
        tokefu: false,
        tipdata: [],
        kefu1: false,
        hao1: false,
        ifxia: true,
        playStatus: 1,
        videoUrl: '',
      }
    },
    created(){
      document.title = 'CVC摄客学院';
      this.global.shouquan();
      var self = this;
      Indicator.open();
      var next = function (res) {
        // if (res.data.college_name == undefined) {
        //   document.title = 'CVC摄客学院';
        // } else {
        //   document.title = res.data.college_name;
        // }
        self.ifopen = res.data.is_open_college;
        localStorage.setItem('ifopen', self.ifopen)
        if (self.ifopen == 0) {
          self.$router.push({path: '/'})
        }
        self.getData('post', '/shop-v2-college-current_term.html').then(res => {
          self.list3 = res.data.data;
          self.term_id = res.data.data.term_id;
          //如果已拼团未成功，跳转到拼团页面
          // if(res.data.data.is_join == 1){
          //   self.$router.push({path:'/buyPage'})
          // }
          // Array.prototype.isPrototypeOf(res.data.data)==false时 有开启学期
          if (Array.prototype.isPrototypeOf(res.data.data) == false) {
            self.ifterm = true;
          }
          self.getData('get', '/shop-v1-user_base_info.html').then(res => {
            self.info2 = res.data.data;
            sessionStorage.setItem('res2', JSON.stringify(res.data.data))
            if (res.data.data.terms.length > 0) {
              self.ifstudent = true;
              self.getData('post', '/shop-v2-college-get_activity_lst', {
                dataType: 2,
                t_id: self.term_id,
                page: 1
              }).then(res => {
                self.startlist = res.data;
                if (res.data.length < 5) {
                  self.dataType = 3;
                  self.getData('post', '/shop-v2-college-get_activity_lst', {
                    dataType: 3,
                    t_id: self.term_id,
                    page: 1
                  }).then(res => {
                    self.willShelfList = res.data;
                    if (self.willShelfList.length < 5) {
                      self.dataType = 1;
                      self.getData('post', '/shop-v2-college-get_activity_lst', {
                        dataType: 1,
                        t_id: self.term_id,
                        page: 1
                      }).then(res => {
                        self.publishedlist = res.data;
                        if (res.data.length < 5) {
                          self.dataType = 0;
                          self.getData('post', '/shop-v2-college-get_activity_lst', {
                            dataType: 0,
                            t_id: self.term_id,
                            page: 1
                          }).then(res => {
                            self.nostartlist = res.data;
                          })
                        }
                      })
                    }
                  })
                }
              })
            } else {
              self.ifstudent = false;
              self.getData('post', '/shop-v2-college-current_term.html').then(res => {
                self.info = res.data.data;
                if (res.data.data.marketing_type == 2) {
                  if (Date.parse(new Date()) / 1000 >= res.data.data.scare_endtime) {
                    self.info.marketing_type = 0;
                  }
                }
              })
            }
            self.ifshow = true;
            Indicator.close();
          })
        });
      }

      if (sessionStorage.getItem('res') != null) {
        var res = JSON.parse(sessionStorage.getItem('res'));
        res.data = res;
        next(res);
      } else {
        this.getData('post', '/shop-v1-index_basemsg.html').then(res => {
          sessionStorage.setItem('res', JSON.stringify(res.data))
          next(res);
        })
      }

      self.getData('post', '/shop-v2-college-config.html').then(res1 => {
        if (res1.data.status == 0) {
          self.tip(res1.data.msg)
        }
        self.info4 = res1.data.data
        self.share(res1.data.data.name, res1.data.data.encourage_msg, 'https://www.saasxx.vip/base/img/college_pic.png')
      })
      setTimeout(function () {
        if (self.$route.query.ifone != undefined) {
          self.postData('post', '/shop-v2-college-show_popup.html', {type: 2}).then(res => {
            if (res.data.status == 1) {
              if (res.data.data.is_college_popup == 1) {
                self.iftip = true;
                window.localStorage.setItem('ifone', 'ifone')
                self.tipdata = res.data.data;
              }
            }
          })
        } else if (window.localStorage.getItem('ifone') == null) {
          self.postData('post', '/shop-v2-college-show_popup.html', {type: 2}).then(res => {
            if (res.data.status == 1) {
              if (res.data.data.is_college_popup == 1) {
                self.iftip = true;
                window.localStorage.setItem('ifone', 'ifone')
                self.tipdata = res.data.data;
              }
            }
          })
        }
      }, 300)
    },
    mounted(){
    },
    methods: {
      totipurl(url){
        console.log(url)
        this.$router.push({path: url})
      },
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.tokefu = false;
        this.kefu1 = false;
        this.ifxia = true;
      },
      childByValue1(){
        this.ifxia = false;
      },
      tozixun(){
        this.tokefu = true;
        this.kefu1 = true;
        this.hao1 = false;
      },
      jieshaotu(){
        this.ifstudent = false;
        this.ifback = true;
      },
      goback(){
        this.ifstudent = true;
        this.ifback = false;
      },
      closetip(){
        this.iftip = false;
      },
      loadMore(){
        var self = this;
        this.page++;
        self.getData('post', '/shop-v2-college-get_activity_lst', {
          dataType: self.dataType,
          t_id: self.term_id,
          page: self.page
        }).then(res => {
          if (res.data.length == 0) {
            if (self.dataType == 1) {
              self.dataType = 0;
              self.page = 1;
              self.getData('post', '/shop-v2-college-get_activity_lst', {
                dataType: self.dataType,
                t_id: self.term_id,
                page: self.page
              }).then(res => {
                self.nostartlist = self.nostartlist.concat(res.data);
              })
            } else if (self.dataType == 2) {
              self.dataType = 3;
              self.page = 1;
              self.getData('post', '/shop-v2-college-get_activity_lst', {
                dataType: self.dataType,
                t_id: self.term_id,
                page: self.page
              }).then(res => {
                self.willShelfList = self.willShelfList.concat(res.data);
              })
            } else if (self.dataType == 3) {
              self.dataType = 1;
              self.page = 1;
              self.getData('post', '/shop-v2-college-get_activity_lst', {
                dataType: self.dataType,
                t_id: self.term_id,
                page: self.page
              }).then(res => {
                self.publishedlist = self.publishedlist.concat(res.data);
              })
            }
          } else {
            if (self.dataType == 2) {
              self.startlist = self.startlist.concat(res.data);
            } else if (self.dataType == 1) {
              self.publishedlist = self.publishedlist.concat(res.data);
            } else if (self.dataType == 0) {
              self.nostartlist = self.nostartlist.concat(res.data);
            } else if (self.dataType == 3) {
              self.willShelfList = self.willShelfList.concat(res.data);
            }
          }
        })
      },
      details(){
        var self = this;
        self.getData('post', '/shop-v2-college-get_grp_lst_by_tid.html', {
          t_id: self.list3.term_id,
          page: 1,
          size: 20
        }).then(res2 => {
          self.list2 = res2.data;
          self.$router.push({
            path: '/teamworkDetails',
            query: {ctgr_id: this.list2.my_groups[0].ctgr_id, term: this.list3.term_id, share: 0}
          })
        });
      },
      share1(){
        this.$router.push({path: '/saleCard', query: {'root_id': this.globalid}})
      },
      // 跳转到抢购的页面
      qianggou: function () {
        this.$router.push({path: '/puzzleHome'});
      },
      // 跳转到拼团的页面
      goPuzzle(){
        this.$router.push({path: '/buyPage'});
      },
      pay(){
        console.log(1111111)
        this.getData('post', '/shop-v1-pay_order.html', {
          type: 11,
          term_id: this.term_id,
          marketing_type: 0
        }).then(res => {
          if (res.data.status == 0) {
            this.tip(res.data.msg)
          }
          this.pay1(res.data, 1)
        })
      },
      datails(i){
        if (i.ser_id) {
          this.$router.push({
            path: '/onCourseDetails',
            query: {id: i.ser_id, ca_id: i.ca_id, car_id: i.car_id, active_id: i.active_id}
          });
        } else {
        }
      },
      offonline(active_id, ca_id, car_id){
        this.$router.push({path: '/offCourseDetails', query: {active_id: active_id, ca_id: ca_id, car_id: car_id}});
      },
      tip(msg){
        var self = this;
        this.info3 = msg;
        this.popupVisible = true;
        setTimeout(function () {
          self.popupVisible = false;
        }, 2000);
        return false;
      },
      /**
       * video:点击视频播放
       * by heqingqing 2018/08/10
       */
      video: function () {
        this.playStatus = 0;
        this.videoUrl = 'https://cloud.saasxx.vip/cvcHome/cvc.mp4';
        $('video')[0].play();
      },

    },
    components: {Navigator, footer1, nodata},
  }
</script>
<style lang="less">
  .collegeHome {
    font-size: 0.24rem;
    .backbtn {
      width: 100%;
      height: 0.92rem;
      position: absolute;
      bottom: 0rem;
      background-color: #222;
      z-index: 11;
      text-align: center;
      line-height: 0.92rem;
      color: #fff;
      font-size: 0.3rem;
    }
    .jieshao {
      width: 1.4rem;
      height: 0.6rem;
      position: absolute;
      z-index: 1;
      right: 0;
      color: #fff;
      line-height: 0.6rem;
      top: 1.45rem;
      img {
        width: 0.3rem;
        // margin-left: 0.12rem;
        position: relative;
        top: 0.06rem;
      }
    }
    .box1-bg {
      width: 100%;
      height: 100vh;
      position: fixed;
      z-index: 11;
      top: 0;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .box1-tipbox {
      width: 6rem;
      height: 8rem;
      background-color: #fff;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 12;
      border-radius: 0.06rem;
    }
    .box1-tipclose {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      color: #fff;
      border: 1px solid #fff;
      position: fixed;
      bottom: 0.6rem;
      z-index: 12;
      left: calc(~"50% - 0.3rem");
      text-align: center;
      line-height: 0.6rem;
      font-size: 0.3rem;
    }
    .askbtn {
      width: 1rem;
      height: 1rem;
      background-color: #fff;
      border-radius: 50%;
      position: fixed;
      z-index: 1;
      bottom: 1.13rem;
      text-align: center;
      line-height: 1rem;
      font-size: 0.30rem;
      font-weight: bold;
      box-shadow: 0 0 0.1rem #ccc;
      right: 0.3rem;
    }
    &-share {
      width: 1.4rem;
      height: 0.46rem;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.46rem;
      color: #fff;
      overflow: hidden;
      background-color: #EF4949;
      border-top-left-radius: 0.23rem;
      border-bottom-left-radius: 0.23rem;
      position: absolute;
      top: 0.4rem;
      right: 0;
      z-index: 2;
    }
    &-content {
      height: calc(~"100vh - 0.92rem");
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      position: relative;
      &-content {
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
      &-home {
        height: calc(~"100vh - 0.9rem");
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        &-head {
          display: flex;
          -webkit-display: flex;
          justify-content: flex-start;
          height: 2.5rem;
          width: 100%;
          background-image: url('../../../static/img/college/college_bg.png');
          background-size: 100%;
          margin-bottom: 0.2rem;
          &-img {
            width: 1.24rem;
            height: 1.24rem;
            border-radius: 100%;
            background-color: #eee;
            border: 1px solid #fff;
            margin: 0.63rem 0.3rem 0;
            img {
              width: 1.24rem;
              height: 1.24rem;
              border-radius: 100%;
            }
          }
          &-info {
            color: #fff;
            margin-top: 0.63rem;
            &-name {
              font-size: 0.38rem;
              font-weight: bold;
            }
            &-num {
              margin: 0.08rem 0;
            }
            &-num, &-time {
              font-size: 0.26rem;
            }
          }
        }
        &-course {
          background-color: #fff;
          overflow: auto;
          margin-bottom: 0.2rem;
          &-title {
            width: calc(~"100% - 0.6rem");
            margin: 0 auto;
            display: flex;
            -webkit-display: flex;
            justify-content: space-between;
            padding: 0.35rem 0;
            &-left {
              font-size: 0.44rem;
              color: #222;
              font-weight: bold;
            }
            &-right {
              font-size: 0.26rem;
              margin-top: 0.15rem;
              img {
                width: 0.26rem;
              }
              span {
                display: inline-block;
                vertical-align: top;
              }
            }
          }
          &-pic {
            width: 6.9rem;
            height: 4rem;
            background-color: #eee;
            border-radius: 0.06rem;
            margin: 0 auto;
            margin-bottom: 0.25rem;
            overflow: hidden;
            img {
              width: 6.9rem;
            }
          }
          &-biaoti {
            display: flex;
            -webkit-display: flex;
            justify-content: space-between;
            font-size: 0.3rem;
            width: 6.9rem;
            margin: 0 auto;
          }
          &-biaoti > div:nth-child(1) {
            width: 5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &-biaoti > div:nth-child(1) div {
            width: 5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &-biaoti > div:nth-child(2) {
            background-color: #222;
            color: #fff;
            width: 1.62rem;
            height: 0.72rem;
            border-radius: 0.06rem;
            text-align: center;
            overflow: hidden;
            line-height: 0.72rem;
          }
          &-desc {
            font-size: 0.26rem;
            width: 6.9rem;
            margin: 0 auto;
            color: #999;
            margin-top: 0.08rem;
            padding-bottom: 0.3rem;
          }
        }
      }
      .collegeFooter {
        width: 100%;
        height: 0.92rem;
        position: absolute;
        bottom: 0.06rem;
        .left {
          width: 55%;
          height: 100%;
          background-color: white;
          float: left;
          text-align: center;
          color: #333333;
          font-size: 0.26rem;
          line-height: 0.92rem;
        }
        .right {
          width: 45%;
          height: 100%;
          float: right;
          background-color: #EF4949;
          text-align: center;
          color: white;
          font-size: 0.26rem;
          line-height: 0.92rem;

        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
    }
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }

  }
</style>
