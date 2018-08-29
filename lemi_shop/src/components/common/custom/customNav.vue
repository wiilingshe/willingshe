<template>
  <div class="customNav">
    <div class="customNav_bottomnav"
         :class="navArr.css_type == 1?'customNav_bottomfixed':'customNav_bottomstatic'"
         v-if="navArr.css_type == 0 || navArr.css_type == 1">
      <!--<div class="customNav_bottomnav-tip" style="" v-if="navArr.css_type == 1" @click="showNav()">-->
        <!--<i class="icon iconfont icon-shangla1" v-if="!navshow"></i>-->
        <!--<i class="icon iconfont icon-double-down" v-if="navshow"></i>-->
      <!--</div>-->
      <div class="customNav_bottomnav-wrap" ref="bottomwrap">
        <div class="customNav_bottomnav-item" :class=" 'customNav_bottomnav-'+navArr.content.length" style="padding: 0.05rem 0;" v-for="i in navArr.content" v-if="true" @click="goRoute(i.link)">
          <img class="customNav_bottomnav-img" :src="i.pic" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" style="margin-bottom: 0.06rem;" @load="imgLoad()">
          <span style="display:block;font-size: 0.205rem;font-weight: normal"  v-if="navArr.pro_title_show == 0">
            {{i.title}}
          </span>
        </div>
      </div>
    </div>
    <div class="customNav_sidenav" v-if="navArr.type == 3">
      <div class="customNav_sidenav-tip" style="" @click="showSidenav()">
        <i class="icon iconfont icon-double-left" v-if="!sidenavshow"></i>
        <i class="icon iconfont icon-double-right" v-if="sidenavshow"></i>
      </div>
      <div class="customNav_sidenav-wrap">
        <div class="customNav_sidenav-item" style="" v-for="i in navArr.content" v-if="true" @click="goRoute(i.link)">
          <img class="customNav_sidenav-img" :src="i.pic" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" style="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast, Tabbar, TabItem } from 'mint-ui';

  export default{
    data(){
        return{
          navshow:true,
          sidenavshow:false,
          mountedIs:false,
          navIs:false,
          navArr:[],
          bottomMenu:[],
          isNull:false,
        }
    },
  created(){
        let typeId = this.$route.query.type_id ? this.$route.query.type_id:1;
    let pageId = this.$route.query.page_id ? this.$route.query.page_id:0;
    this.postData('post','/shop-v1-custom_menu.html',{type_id:typeId,page_id:pageId}).then(res =>{
      if(res.status == 200){
        if(res.data.status == 1){
          if(res.data.data.content.length != 0){
            this.isNull = true;
            this.navArr = res.data.data.content[0];
//             延迟加载
            if(this.mountedIs){
              this.$nextTick(function () {
                let navIndex = 0;
                this.navArr.content.forEach((i,index)=>{
                  if(i.link!='' && window.location.href.indexOf(i.link) != -1){
                    navIndex = index;
                  }
                });
                this.addNavstyle(navIndex);
//                $('.customNav_bottomnav-wrap').addClass('customNav_bottomnav-zero');
              })
            }
          }
        }else{
          console.log(res.data.msg);
        }
      }
      this.$emit('child-say',this.isNull);
    });
  },
  mounted(){
//判断是否数据加载完成
    this.mountedIs = true;
    if(this.navArr.length != 0){
      this.$nextTick(function () {
        this.addNavstyle();
      })
    }
  },
  methods:{
//      导航隐藏显示
    showNav(){
//      $('.customNav_bottomnav-wrap').removeClass('customNav_bottomnav-zero');
      if(this.navshow){
        this.navshow = !this.navshow;
        $('.customNav_bottomnav').animate({'bottom':-$('.customNav_bottomnav-wrap').height()});
      }else{
        this.navshow = !this.navshow;
        $('.customNav_bottomnav').animate({'bottom':0})
      }
    },
//    导航侧边
    showSidenav(){

      if(this.sidenavshow){
        this.sidenavshow = !this.sidenavshow;
        $('.customNav_sidenav').animate({'right':-$('.customNav_sidenav-wrap').width()});
      }else{
        this.sidenavshow = !this.sidenavshow;
        $('.customNav_sidenav').animate({'right':0})
      }

    },
//    导航样式
    addNavstyle(index){
      if (this.navArr.type == "bottom_menu") {
        $('.customNav_bottomnav-wrap').css({'padding-top': this.navArr.padding}, {'padding-bottom': this.navArr.padding});
//        字体颜色
        let content = this.navArr.content;
        for (let i = 0; i < content.length; i++) {
          $('.customNav_bottomnav .customNav_bottomnav-item:eq(' + i + ') span').css({'color': content[i].color});
        }
//        选中导航颜色
        let selectCol = this.navArr.selected_color;
        $('.customNav_bottomnav-item:eq(' + index + ') span').css({'color':selectCol});
        if(this.navArr.content[index].pic_1 !=''){
          this.navArr.content[index].pic = this.navArr.content[index].pic_1;
//         $('.customNav_bottomnav-item:eq(' + index + ') img').attr('src',this.navArr.content[index].pic_1);
        }
//        $('.customNav_bottomnav-item:eq(' + index + ') img').css({'color':});

//          导航定位样式，是否隐藏
//        if(this.navArr.css_type == 1){
//          $('.customNav_bottomnav').css({'bottom': -$('.customNav_bottomnav-wrap').height()});
//        }
      }else{
//          侧边
//          $('.customNav_sidenav-wrap').css({'padding-top':this.navArr.padding},{'padding-bottom':this.navArr.padding});
//           侧边隐藏
//        $('.customNav_sidenav').css({'right':-$('.customNav_sidenav-wrap').width()});
      }
//      设置导航item高，字图间距
//        $('.customNav_bottomnav-img').css({'margin-bottom':0});
//        $('.customNav_sidenav-item').css({'margin-bottom':0});

    },
    goRoute(herf){
      console.log(herf)
      if(herf != ""){
        let reg= /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
        if(reg.test(herf)){
          window.location.href = herf;
        }else{
          Toast({
            message: herf,
            position: 'middle',
            duration: 1500
          });
        }
//      else if(herf.indexOf('/') == 0){
//          this.$router.push({path:herf});
//        }
      }
    },
    imgLoad(){
      this.$emit('child-say');
    }
  }
}
</script>

<style scoped lang="less">
  .customNav{
    z-index: 100;
    /*底部导航*/
    &_bottomfixed{
      position: fixed;
      bottom: 0;
      z-index: 100;
    }
    &_bottomstatic{
      position: static;
    }
    &_bottomnav{
      width: 100%;
      border-top:0.02rem solid #dddddd;
      background-color: #ffffff;

      &-tip{
        position: absolute;
        top:-0.6rem;
        left: 45%;
        /*margin: 0 auto;*/
        width:0.6rem;
        height: 0.6rem;
        z-index: 100;
        text-align: center;
        background-color: transparent;
        .icon-shangla1{
          color: #0086b3;
          font-size: 0.6rem;
        }
        .icon-double-down{
          color: #0086b3;
          font-size: 0.6rem;
        }
      }
      &-wrap{
        position: relative;
        bottom: 0;
        overflow: hidden;
      }
      &-zero{
        height: 0;
      }
      &-item{
        float: left;
        /*height: 0.8rem;*/
        text-align: center;
        color: #707070;
      }
      &-img{
        display: block;
        width: 30%;
        height: 40%;
        margin: auto;
      }
      &-1{
        width: 100%;
        .customNav_bottomnav-img{
          width: 10%;
          max-height: 10%;
        }
      }
      &-2{
         width: 50%;
        .customNav_bottomnav-img{
          width: 18%;
          max-height: 18%;
        }
      }
      &-3{
        width: 33%;
        .customNav_bottomnav-img{
          width: 25%;
          max-height: 25%;
        }
      }
      &-4{
        width: 25%;
        .customNav_bottomnav-img{
          width: 28%;
          max-height: 28%;
        }
      }
      &-5{
        width: 20%;
        .customNav_bottomnav-img{
          width: 36%;
          max-height: 36%;
        }
      }

    }
    /*侧边导航*/
    &_sidenav{
      position: fixed;
      bottom:0.5rem;
      right: 0;
      background-color: transparent;

      &-tip{
        position: absolute;
        top:45%;
        left:-0.6rem;
        /*margin: 0 auto;*/
        width:0.6rem;
        height: 0.6rem;
        z-index: 100;
        text-align: center;
        /*border: 0.04rem solid #fe0c2c;*/
        /*border-radius: 50%;*/
        background-color: transparent;
        .icon-double-left{
          color: #0086b3;
          font-size: 0.6rem;
        }
        .icon-double-right{
          color: #0086b3;
          font-size: 0.6rem;
        }
      }
      &-wrap{
        overflow: hidden;
        border: 0.02rem solid #dddddd;
        border-radius: 0.14rem;
        /*border-top: 0.02rem solid #dddddd;*/

      }
      &-item{
        width: 0.6rem;
        height: 0.6rem;
        padding: 0.1rem;
        border-bottom: 0.06rem solid #2eff18;
        /*margin-bottom: 0.2rem;*/
        background-color: #ffffff;
        &:last-of-type{
          /*border-bottom:none;*/
        }
      }

      &-img{
        display: block;
        width:100%;
        height: 100%;
        margin: auto;
      }
    }
  }

</style>
