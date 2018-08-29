<template>
  <div id="customPage" class="customPage" >
    <!--空数据样式-->
    <div class="customPage_null" v-if="nullIs">
      <p>
        <i class="icon iconfont icon-empty"></i>
      </p>
      <span>暂无内容展示</span>
    </div>
    <!--放置区-->
    <div class="customPage_main">
    </div>
    <!--组件化部分-->
    <!--内容区-->
    <div class="customPage_content" style="" :class="'custom'+i.sorting" v-for="i in contentArr">
      <customCompany :companyArr="i" ></customCompany>
    </div>
    <!--轮播-->
    <div :class=" 'custom'+i.sorting" v-for="i in roasting">
      <customRoasting :roastingObj="i"></customRoasting>
    </div>
    <!--分类-->
    <div :class=" 'custom'+ i.sorting" v-for="i in classification">
      <customClass :classObj="i"></customClass>
    </div>
    <!--图文-->
    <div style="" :class=" 'custom'+i.sorting" v-for="i in advertising">
      <customAdv2 :advObj="i"></customAdv2>
    </div>
    <!--自定义头部-->
    <div :class=" 'custom'+i.sorting" v-for="i in titleArr">
      <customTitle :titleObj="i"></customTitle>
    </div>
    <!-- 自定义文章 -->
    <div :class=" 'custom'+i.sorting" v-for="i in articlesArr">
      <customArticle :articleObj="i"></customArticle>
    </div>
    <!--自定义商品-->
    <div :class=" 'custom'+i.sorting" v-for="i in goodsArr">
      <customGoods :goodsObj="i"></customGoods>
    </div>
    <!--多图-->
    <div style="" :class=" 'custom'+i.sorting" v-for="i in fallArr">
      <customFall :fullObj="i"></customFall>
    </div>
    <!--单品-->
    <div style="" :class=" 'custom'+i.sorting" v-for="i in singleArr">
      <customSingle :singleObj="i"></customSingle>
    </div>
    <!--课程-->
    <div style="" :class=" 'custom'+i.sorting" v-for="i in seriesArr">
      <customSeries :seriseObj="i"></customSeries>
    </div>

    <!--非组件video-->
    <div class="customPage_video" style="" :class=" 'custom'+i.sorting" v-for="i in videoArr">
      <div class="customPage_video-wrap">
        <div style="height: 100%;position: relative">
          <div class="customPage_video-cover" @click="postVideo(i.sorting)" v-if="videoIs">
            <img class="customPage_video-coverimg" :src="i.content[0].pic" onerror="this.src=&quot;/static/img/onerr2.png&quot;">
            <div class="customPage_video-backColor">
              <span class="customPage_video-play">
                <i class="icon iconfont icon-8shipinicon"></i>
              </span>
            </div>
          </div>
          <iframe class="customPage_video-iframe" :src="videoUrl"  allowfullscreen="true" allowtransparency="true">
          </iframe>
        </div>
      </div>
    </div>
    <!--导航-->
    <div class="customPage_nav" v-if="navIs">
      <customNav v-on:child-say="listenToMyBoy"></customNav>
    </div>
    <!--logo-->
    <div class="customPage_logo" v-if="navIs">
      <footer1></footer1>
    </div>
  </div>
</template>

<script>
  import { Swipe, SwipeItem,Indicator,Toast} from 'mint-ui';
  import footer1 from '@/components/common/footer1';
  import customNav from '@/components/home/custom/customNav';
  import customCompany from '@/components/home/custom/customCompany';
  import customRoasting from '@/components/home/custom/customRoasting';
  import customClass from '@/components/home/custom/customClass';
  import customAdv2 from '@/components/home/custom/customAdv2';
  import customTitle from '@/components/home/custom/customTitle';
  import customArticle from '@/components/home/custom/customArticle';
  import customGoods from '@/components/home/custom/customGoods';
  import customFall from '@/components/home/custom/customFall';
  import customSingle from '@/components/home/custom/customSingle';
  import customSeries from '@/components/home/custom/customSeries';
  export default{
      data(){
          return {
            nullIs:false,
            isCustomPage:false,
            contentArr:[],
            roasting:[],
            classification:[],
            advertising:[],
            activity:[],
            videoArr:[],
            articlesArr:[],
            titleArr:[],
            goodsArr:[],
            fallArr:[],
            singleArr:[],
            seriesArr:[],
            videoUrl:'',
            videoIs:true,
            mountedIs:false,
            arr:[],
            itemArr:[],
            picArr:[],
            shareObj:{},
            navIs:false,
          }
      },
    created(){
      this.global.shouquan();
      Indicator.open();
      let typeid = this.$route.query.type_id ? this.$route.query.type_id:1;
//      let typeid = this.$route.query.type_id;
      let pageId = this.$route.query.page_id ? this.$route.query.page_id:0;
//      判断导航显示
      this.navIs = typeid==4? false:true;
      this.postData('post','/shop-v1-custom_index.html',{type_id:typeid,page_id:pageId}).then(res => {
        if(res.status == 200){
          if(res.data.status == 1){
              this.arr = res.data.data;
//          页面详情样式
              this.itemArr = this.arr.item_info.content;
//              判断是否无数据
              if(this.itemArr.length == 0){
                this.nullIs = true;
              }
//              循环数据，添加至对应模块数组
            for(let i = 0;i < this.itemArr.length; i++){
//                  为每个模块添加排序值
                this.itemArr[i].sorting = i;
              switch (this.itemArr[i].type){
                case 'cate':
                  this.classification.push(this.itemArr[i]);
                  break;
                case 'pic_adv':
                  this.roasting.push(this.itemArr[i]);
                  break;
                case 'adv':
                  this.advertising.push(this.itemArr[i]);
                  break;
                case 'article':
                  this.articlesArr.push(this.itemArr[i]);
                  break;
                case 'video':
                  this.videoArr.push(this.itemArr[i]);
                  break;
                case 'title':
                  this.titleArr.push(this.itemArr[i]);
                  break;
                case 'content':
                  this.contentArr.push(this.itemArr[i]);
                  break;
                case 'goods':
                  this.goodsArr.push(this.itemArr[i]);
                  break;
                case 'figure_upload':
                  this.fallArr.push(this.itemArr[i]);
                  break;
                case 'single_product':
                  this.singleArr.push(this.itemArr[i]);
                  break;
                case 'series_product':
                  this.seriesArr.push(this.itemArr[i]);
                  break;
              }
              }

//              延迟加载
            this.$nextTick(function () {
                //      排列顺序及模块样式
              this.sortDom();

               //       计算轮播图最大高度
              this.roasting.forEach((j)=>{
                let index = j.sorting;
                $('.custom'+ index + ' .mint-swipe-item').css('display','block');
                let imgNum = $('.custom'+ index + ' .customRoasting_swipe1-img').length;
                $('.custom'+ index + ' .customRoasting_swipe1-img').on('load',function () {
                  if(!--imgNum){
                    let maxHeight = 0;
                    $('.custom'+ index + ' .customRoasting_swipe1-img').each(function (i) {
                      let imgH = $('.custom'+ index + ' .customRoasting_swipe1-img').eq(i).height();
                      maxHeight = maxHeight > imgH ? maxHeight:imgH;
                    });
                    $('.custom'+ index + ' .mint-swipe-item').removeAttr("style");
                    $('.custom'+ index + ' .customRoasting_swipe1').height(maxHeight);
                  }
                });
              });
            });
//          页面描述分享
              this.shareObj = this.arr.page_info;
              document.title = this.shareObj.title;
            this.share(this.shareObj.title,this.shareObj.describe,this.shareObj.img);
            }else{
            this.nullIs = true;
          }
        }
        Indicator.close();
        });
    },
    components:{footer1,customNav,customCompany,customRoasting,customClass,customAdv2,customTitle,customArticle,customGoods,customFall,customSingle,customSeries},
    methods:{
      sortDom(){
          let customMain = $('.customPage_main');
          for(let i = 0; i < this.itemArr.length ; i++){
            let Oitem = this.itemArr[i];
            customMain.append($('.custom'+ i));
//            公共padding
            if(Oitem.padding != 0){
              $('.custom' + i).css({"padding-top": Oitem.padding,"padding-bottom": Oitem.padding});
            }
//            头部
            if(Oitem.type == 'title'){
              if(Oitem.title_color != ''){
                $('.custom'+i+' .customTitle_title').css({'color':Oitem.title_color});
              }
              if(Oitem.arrow_color != ''){
                $('.custom'+i+' .customTitle_jump').css({'color':Oitem.arrow_color});
              }
            }
//            轮播
            if(Oitem.type == 'pic_adv'){
              if(Oitem.css_type == 2 && Oitem.margin != 0){
                $('.custom'+i+' .customRoasting_swipe2-item:gt(0)').css({'margin-top':Oitem.margin});
              }
            }
//            图文区
            if(Oitem.type == 'adv'){
              let titCenter = '';
              let titleSize = '';
              switch (Oitem.position_type){
                case '1':
                  titCenter = 'left';
                  break;
                case '2':
                  titCenter = 'center';
                  break;
                case '3':
                  titCenter = 'right';
                  break;
              }
              switch (Oitem.title_size){
                case '1':
                  titleSize = '0.35rem';
                  break;
                case '2':
                  titleSize ='0.45rem';
                  break;
                case '3':
                  titleSize = '0.55rem';
                  break;
              }
              $('.custom'+i+' .customAdv_head').css({'text-align':titCenter,'color':Oitem.title_color,'font-size':titleSize});

              if(Oitem.bg_color != ''){
                $('.custom'+i+'>.customAdv').css({'background-color':Oitem.bg_color});
              }
            }
//            内容
            if(Oitem.type == 'content'){
              let titCenter = '';
              let titleSize = '';
              switch (Oitem.position_type){
                case '1':
                  titCenter = 'left';
                  break;
                case '2':
                  titCenter = 'center';
                  break;
                case '3':
                  titCenter = 'right';
                  break;
              }
              switch (Oitem.title_size){
                case '1':
                  titleSize = '0.35rem';
                  break;
                case '2':
                  titleSize ='0.45rem';
                  break;
                case '3':
                  titleSize = '0.55rem';
                  break;
              }
              $('.custom'+i+' h2.customCompany_content-title').css({'text-align':titCenter,'color':Oitem.title_color,'font-size':titleSize});

              if(Oitem.subtitle_color != ''){
                $('.custom'+i+' h3.customCompany_content-title').css({'color':Oitem.subtitle_color});
              }
              if(Oitem.bg_color != ''&&Oitem.background_type == 1){
                $('.custom'+i+'>.customCompany').css({'background-color':Oitem.bg_color});
              }
              if(Oitem.content_color != ''&&Oitem.css_type<4){
                $('.custom'+i+' .customCompany_content-text').css({'color':Oitem.content_color});
              }
              if(Oitem.background_type == 2){
                $('.custom'+i+'>.customCompany').css({'background':'url('+Oitem.content[0].bg_img +') no-repeat 0 0','background-size':'cover'});
              }

              if(Oitem.css_type == 4){
                Oitem.content_arr.forEach(function (j) {
                  if(j.content_postiton == "1"){
                    $('.custom'+i+' .customCompany_content-content4').css({'text-align':'left'});
                  }else{
                    $('.custom'+i+' .customCompany_content-content4').css({'text-align':'right'});
                  }
                  if(j.title_color != ''){
                    $('.custom'+i+' .customCompany_content-title4').css({'color':j.title_color});
                  }
                  if(j.subtitle_color != ''){
                    $('.custom'+i+' .customCompany_content-text4').css({'color':j.subtitle_color});
                  }
                })
              }
              if(Oitem.css_type == 5){
                Oitem.content_arr.forEach(function (j) {
                  if(j.content_postiton == "1"){
                    $('.custom'+i+' .customCompany_content-graph').css({'text-align':'left'});
                  }else{
                    $('.custom'+i+' .customCompany_content-graph').css({'text-align':'right'});
                  }
                  if(j.title_color != ''){
                    $('.custom'+i+' .customCompany_content-titlesmall').css({'color':j.title_color});
                  }
                  if(j.subtitle_color != ''){
                    $('.custom'+i+' .customCompany_content-text').css({'color':j.subtitle_color});
                  }
                })
              }
            }

          }
      },
      postVideo(sort){
//          视频播放
        this.postData('post','/shop/play/custom_index.html',{id:this.arr.page_id}).then(res => {
          if(res.status == 200){
            if(res.data.status ==1){
              this.videoUrl = res.data.url;
              this.videoIs = false;
            }else{
              console.log(res.data.msg);
            }
          }
        });
      },
      goRoute(herf){
//          跳转链接
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
        }
      },
//      导航子组件事件获取
      listenToMyBoy(is){
      }
    },
  }
</script>
<style lang="less">
  #customPage{
    overflow: hidden;
    /*padding-bottom: 1.5rem;*/
    font-size: 0.24rem;
    .customPage_null{
      width: 100%;
      height: 100vh;
      text-align: center;
      font-size: 0.38rem;
      color: #999999;
      .icon-empty{
        font-size: 1.8rem;
        color: #999999;
      }
      p{
        padding-top: 50%;
      }
    }

    /*视频*/
    .customPage_video{
      &-wrap{
        padding: 0.1rem;
        background-color: transparent;
      }
      &-cover{
        position: absolute;
        width: 100%;
        height: 100%;
      }
      &-coverimg{
        width: 100%;
        height: 100%;
      }
      &-backColor{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
      }
      &-play{
        position: absolute;
        left: 45%;
        top:40%;

        .icon-8shipinicon{
          font-size: 1rem;
          color: #0086b3;
        }
      }
      &-iframe{
        width: 100%;
        height: 4.5rem;
        border: 0;
      }
    }
  }
</style>
