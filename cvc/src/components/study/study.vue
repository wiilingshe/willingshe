<template>
   <div class="stduy">
    <nodata v-if="allnodata"></nodata>
      <div class="stduylist">
        <div class="totalTime">
          <div class="totalTime-all" @click="allclass()">全部课程<img src="../../../static/img/home/study_Allcourses.png"></div>
          <div class="totalTime-time">总学习时长 <span>{{info.study_time > 0?(info.study_time/3600).toFixed(2):0}}</span> 小时</div>
        </div>
        <div class="kecheng">
          <div class="options" v-show="optionLists">
            <div class="options-list" @click="allcousre()">
              全部课程
            </div>
            <div class="options-list" @click="allon()">
              大师课
            </div>
            <div class="options-list1" @click="alloff()">
              线下课程
            </div>
          </div>
          <div class="kecheng-height">
            <div class="online" v-show="onlinelists && !nodata">
              <div class="online-title"><i class="icon iconfont icon-sanjiaoxing-right"></i>大师课</div>
              <div class="online-list" v-for="(i,index) in arr" @click="kecheng(i.ser_id)">
                <div class="online-list-img">
                  <img :src="i.pic">
                </div>
                <div class="online-list-info">
                  <div class="online-list-info-title">{{i.ser_title}}</div>
                  <div class="online-list-info-studyed">已学{{i.catNum}}节/共{{i.sections}}节</div>
                  <div class="online-list-info-pre">
                    <div class="online-list-info-pre-preed" :style="{width:i.catNum/i.sections*100+'%'}"></div>
                  </div>
                </div>
              </div>
              <div class="online-list" v-for="(i,index) in arr2" @click="dangjie(i.vid)" :style="{'border-bottom':arr2.length==index+1?'none':'1px solid #eee'}">
                <div class="online-list-img">
                  <img :src="i.pic">
                </div>
                <div class="online-list-info">
                  <div class="online-list-info-title">{{i.title}}</div>
                  <div class="online-list-info-studyed">已学{{i.catNum}}节/共{{i.sections}}节</div>
                  <div class="online-list-info-pre">
                    <div class="online-list-info-pre-preed" :style="{width:i.catNum/i.sections*100+'%'}"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="online" v-show="offlinelists && !nodata1">
              <div class="online-title"><i class="icon iconfont icon-sanjiaoxing-right"></i>线下活动</div>
              <div class="online-list" v-for="(i,index) in arr3" @click="huodong(i.aid,i)" :style="{'border-bottom':arr3.length==index+1?'none':'1px solid #eee'}">
                <div class="online-list-img">
                  <img :src="i.pic">
                </div>
                <div class="online-list-info">
                  <div class="online-list-info-title">{{i.title}}</div>
                  <div class="online-list-info-status">
                    <i class="icon iconfont icon-time"><span>2018.01.01</span></i>
                    <i class="icon iconfont icon-location"><span class="online-list-info-status-adress">{{i.address}}</span></i>
                    <span class="online-list-info-status-status">{{i.msg}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer1  :class="{ifab:ifab1}"></footer1>
        </div>
      </div>
     <Navigator style="position: fixed;width: 100%;bottom: 0;" :ifopen="ifopen"></Navigator>
   </div>
 </template>
 <script>
   import Navigator from '@/components/common/Navigator'
    import customNav from '@/components/home/custom/customNav';
    import nodata from '@/components/common/nodata'
    import footer1 from '@/components/common/footer1'
    import loadNo from '@/components/common/loadNo';
    import { InfiniteScroll,Indicator } from 'mint-ui';
    export default{
      data(){
        return{
          arr:[],
          arr2:[],
          arr3:[],
          optionLists:false,
          onlinelists:true,
          offlinelists:true,
          info:[],
          nodata:false,
          nodata1:false,
          allnodata:false,
          ifab1:false,
          ifopen:0,
        }
      },
      created(){
        document.title = '学习';
      },
      mounted(){
        var self = this;
        Indicator.open();
        this.getData('post','/shop-v1-lesson_series_lesson.html',{page:1,pageSize:100}).then(res => {
          if(res.data.length == 0){

          }else{
            self.arr = res.data;
          }
          this.getData('post','/shop-v1-lesson_video_lesson.html',{page:1,pageSize:100}).then(res1 => {
            if(res1.data.length == 0){
              if(res.data.length == 0){
                self.nodata = true;
              }
            }else{
              self.arr2 = res1.data;
            }
            this.getData('post','/shop-v1-lesson_line_active.html',{page:1,pageSize:100}).then(res => {
              if(res.data.length == 0){
                self.nodata1 = true;
              }else{
                self.arr3 = res.data;
              }
              if(self.nodata1 == true && self.nodata == true){
                self.allnodata = true;
              }
              setTimeout(function(){
                Indicator.close();
                console.log($('.kecheng-height').eq(0).height())
                console.log($('.kecheng').eq(0).height())
                console.log(document.body.clientHeight-$('.totalTime').eq(0).height()-$('.mint-tabbar').eq(0).height())
                var height1 = $('.kecheng-height').eq(0).height();
                // var height2 = $('.kecheng').eq(0).height();
                var height2 = document.body.clientHeight-$('.totalTime').eq(0).height()-$('.mint-tabbar').eq(0).height();
                if(height2-88-height1>0){
                  self.ifab1 = true;
                }
              },500)
            });
          });
        });
        if(sessionStorage.getItem('res2') != null){
          var res = JSON.parse(sessionStorage.getItem('res2'));
          res.data = res;
          res.data.data = res.data;
          this.info = res.data.data;
        }else{
          this.getData('get','/shop-v1-user_base_info.html').then(res => {
            this.info = res.data.data;
            sessionStorage.setItem('res2',JSON.stringify(res.data.data))
          },res => {

          })
        }
        if(sessionStorage.getItem('res') != null){
          var res = JSON.parse(sessionStorage.getItem('res'));
          res.data = res;
          localStorage.setItem('ifopen',res.data.is_open_college)
          this.ifopen = res.data.is_open_college
        }else{
          this.getData('get','/shop-v1-index_basemsg.html').then(res => {
            sessionStorage.setItem('res',JSON.stringify(res.data))
            console.log(res.data.is_open_college)
            localStorage.setItem('ifopen',res.data.is_open_college)
            this.ifopen = res.data.is_open_college
          },res => {

          })
        }

      },
      methods:{
        allclass(){
          this.optionLists = !this.optionLists;
        },
        allcousre(){
          this.onlinelists = true;
          this.offlinelists = true;
          this.optionLists = !this.optionLists;
        },
        allon(){
          this.onlinelists = true;
          this.offlinelists = false;
          this.optionLists = !this.optionLists;
        },
        alloff(){
          this.onlinelists = false;
          this.offlinelists = true;
          this.optionLists = !this.optionLists;
        },
        kecheng(id){
          this.$router.push({path:'/details',query:{'ser_id':id}})
        },
        dangjie(id){
          this.$router.push({path:'/details',query:{'vid':id}})
        },
        huodong(id,info){
          // this.$router.push({path:'/details2',query:{'id':id}})
          if(info.ca_id!=''&&info.car_id!=''&&info.active_type>1){
            this.$router.push({path:'offCourseDetails',query:{active_id:id,ca_id:info.ca_id,car_id:info.car_id}})
          }else{
            this.$router.push({path:'details2',query:{id:id}})
          }
        },
      },
      components:{Navigator,nodata,footer1,loadNo,customNav,nodata},
    }
 </script>
 <style lang="less">
   .stduy{
    .ifab{
      position: absolute;
      bottom: 0.9rem;
      left: 50%;
      transform: translateX(-50%);
      width: 6rem;
    }
    .kecheng{
      width: 100%;
      // height: calc(~"100vh - 1.92rem");
      // overflow: scroll;
      // -webkit-overflow-scrolling:touch;
    }
    .stduylist{
      color: #333;
      // height: calc(~"100vh - 1rem");
      // overflow: scroll;
      // -webkit-overflow-scrolling:touch;
      padding-bottom: 0.9rem;
      padding-top: 0.92rem;
      .totalTime{
        height: 0.92rem;
        width: calc(~"100% - 0.32rem");
        background-color: #fff;
        font-size: 0.28rem;
        line-height: 0.92rem;
        padding-left: 0.32rem;
        position: fixed;
        top: 0;
        &-all{
          display: inline-block;
          img{
            height: 0.26rem;
            margin-left: 0.2rem;
            position: relative;
            top: 0.02rem;
          }
        }
        &-time{
          display: inline-block;
          float: right;
          padding-right: 0.32rem;
          span{
            font-weight: bold;
            font-size: 0.36rem;
          }
        }
      }
      .options{
        height: 2.7rem;
        width: 3.5rem;
        background-color: #fff;
        position: absolute;
        top: 0.92rem;
        font-size: 0.28rem;
        box-shadow: 1px 1px 5px #ccc;
        &-list{
          width: 3.2rem;
          border-bottom: 1px solid #eee;
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
          float: right;
        }
        &-list1{
          width: 3.2rem;
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
          float: right;
        }
      }
      .online{
        background-color: #fff;
        margin-top: 0.2rem;
        .icon-sanjiaoxing-right{
          font-size: 0.3rem;
          margin-right: 0.1rem;
          margin-left: 0.2rem;
        }
        &-title{
          font-size: 0.38rem;
          color: #222;
          padding-top: 0.42rem;
          font-weight: bold;
          span{
            display: inline-block;
            font-size: 0.26rem;
            color: #666;
            float: right;
            line-height: 0.7rem;
            margin-right: 0.3rem;
          }
        }
        &-list{
          padding-bottom: 0.3rem;
          padding-top: 0.3rem;
          border-bottom: 1px solid #eee;
          width: calc(~"100% - 0.6rem");
          margin: 0 auto;
          &-img{
            display: inline-block;
            vertical-align: top;
            width: 2.52rem;
            height: 1.52rem;
            overflow: hidden;
            margin-right: 0.05rem;
            border-radius: 0.06rem;
            background-color: #eee;
            img{
              width: 2.52rem;
            }
          }
          &-info{
            display: inline-block;
            vertical-align: top;
            &-title{
              width: 4.08rem;
              font-size: 0.3rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              height: 0.83rem;
            }
            &-studyed{
              font-size: 0.26rem;
              color: #666;
              margin-top: 0.12rem;
            }
            &-pre{
              width: 4.12rem;
              height: 0.06rem;
              border-radius: 0.03rem;
              background-color: #ccc;
              margin-top: 0.1rem;
              overflow: hidden;
              &-preed{
                height: 100%;
                background-color: #000;
                border-radius: 0.03rem;
              }
            }
            &-status{
              font-size: 0.26rem;
              color: #666;
              margin-top: 0.35rem;
              i{
                font-size: 0.26rem;
                span{
                  margin-left: 0.05rem;
                  margin-right: 0.1rem;
                }
              }
              &-adress{
                width: 1rem;
                overflow: hidden;
                display: inline-block;
                white-space: nowrap;
                text-overflow: ellipsis;
                vertical-align: middle;
              }
              &-status{
                float: right;
                color: #333;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
   }
 </style>