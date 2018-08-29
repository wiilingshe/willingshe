<template>
  <div class="customPersonal">
    <div class="customPersonal_null" v-if="nullIs">
      <p>
        <i class="icon iconfont icon-empty"></i>
      </p>
      <span>暂无内容展示</span>
    </div>
    <div class="cPersonal_main">
    </div>
    <!--组件化部分-->
    <!--内容区-->
    <div class="cPersonal_content" style="" :class="'custom'+i.sorting" v-for="(i,index) in contentArr">
      <customCompany :companyArr="i"></customCompany>
    </div>
    <!--轮播-->
    <div :class=" 'custom'+i.sorting" v-for="i in roastArr">
      <customRoasting :roastingObj="i"></customRoasting>
    </div>
    <!--分类-->
    <div :class=" 'custom'+ i.sorting" v-for="i in classification">
      <customClass :classObj="i"></customClass>
    </div>
    <!--自定义头部-->
    <div :class=" 'custom'+i.sorting" v-for="i in titleArr">
      <customTitle :titleObj="i"></customTitle>
    </div>
    <!-- 自定义文章 -->
    <div :class=" 'custom'+i.sorting" v-for="i in articlesArr">
      <customArticle :articleObj="i"></customArticle>
    </div>
    <!--图文-->
    <div style="" :class=" 'custom'+i.sorting" v-for="i in advArr">
      <customAdv :advObj="i"></customAdv>
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

    <!--未组件化部分-->
    <!--优秀导师-->
    <div class="cPersonal_excellence" style="" :class=" 'custom'+i.sorting" v-for="i in recommendArr">
      <div class="cPersonal_excellence-wrap">
        <h2 class="cPersonal_excellence-title" v-if="i.showtitle == 1">{{i.title}}</h2>
        <div class="cPersonal_excellence-item" v-for="(j,index) in i.shop_list" @click="goRoute(j.link)"
             v-if="index<=3">
          <img :src="j.face" class="cPersonal_excellence-img"
               @error="j.face = j.face == ''? '/static/img/onerr3.jpg':'/static/img/onerr1.png';">
          <div class="cPersonal_excellence-text">
            <p>{{j.username}}</p>
            <p>{{j.describe}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--导师团队-->
    <div class="cPersonal_mentor" style="" :class=" 'custom'+i.sorting" v-for="i in staffArr">
      <div class="cPersonal_mentor-wrap">
        <h2 class="cPersonal_mentor-title" v-if="i.showtitle == 1">{{i.title}}</h2>
        <div class="cPersonal_mentor-list">
          <div class="cPersonal_mentor-item" v-for=" (j,index) in i.shop_list" @click="goRoute(j.link)" v-if="index<=5">
            <img :src="j.face" class="cPersonal_mentor-img"
                 @error="j.face = j.face == ''? '/static/img/onerr3.jpg':'/static/img/onerr1.png';">
            <p class="cPersonal_mentor-name">{{j.username}}</p>
          </div>
        </div>
        <p class="cPersonal_mentor-foot" v-if="i.shop_list.length > 6">
           <span class="cPersonal_mentor-more" @click="toMentor()" style="color: #ffffff">
            更多>>
           </span>
        </p>
      </div>
    </div>
    <!--预约-->
    <div class="cPersonal_make" style="" :class=" 'custom'+i.sorting" v-for="i in makeArr">
      <div class="cPersonal_make-wrap make1" v-if="i.css_type == 1">
        <h1 class="cPersonal_make-title">{{i.title}}</h1>
        <h3 class="cPersonal_make-text">{{i.content_subtitle}}</h3>
        <div class="cPersonal_make-btn" @click="showTable()">
          {{i.content[0].btn}}
        </div>
      </div>
      <div class="cPersonal_make-wrap make3" v-if="i.css_type == 3">
        <h2 class="cPersonal_make-title">{{i.title}}</h2>
        <h3 class="cPersonal_make-text">{{i.content_subtitle}}</h3>
        <div class="cPersonal_make-table">
          <div class="cPersonal_make-tr" v-if="isMake[0].is">
            <span class="cPersonal_make-name">姓名&nbsp:</span>
            <input type="text" class="cPersonal_make-input">
          </div>
          <div class="cPersonal_make-tr" v-if="isMake[1].is">
            <span class="cPersonal_make-phone">电话&nbsp:</span>
            <input type="text" class="cPersonal_make-input">
          </div>
          <div class="cPersonal_make-tr" v-if="isMake[2].is" @click="showTime()">
            <span class="cPersonal_make-make">预约时间&nbsp:</span>
            <input type="text" class="cPersonal_make-input" :value="timeValue" disabled>
          </div>
          <div class="cPersonal_make-tr" v-if="isMake[3].is" style="padding-top: 0.2rem">
            <span class="cPersonal_make-msg" style="vertical-align: top;">留言&nbsp:</span>
            <textarea type="text" class="cPersonal_make-input"></textarea>
          </div>
        </div>
        <div class="cPersonal_make-btn" @click="isSubmitting?'':postMake(i.css_type)"
             :style="{'background-color':isSubmitting?'#666':'#0086b3'}" v-html="isSubmitting?'等待提交中...':'提交'">
          提交
        </div>
      </div>
      <div class="cPersonal_make-wrap make2" v-if="i.css_type == 2">
        <h2 class="cPersonal_make-title">{{i.title}}</h2>
        <!--<div class="cPersonal_make-text" v-html="i.getEditor"></div>-->
        <div class="cPersonal_make-table">
          <div class="cPersonal_make-tr" v-if="isMake[0].is">
            <span class="cPersonal_make-name">姓名&nbsp:</span>
            <input type="text" class="cPersonal_make-input">
          </div>
          <div class="cPersonal_make-tr" v-if="isMake[1].is">
            <span class="cPersonal_make-phone">电话&nbsp:</span>
            <input type="text" class="cPersonal_make-input">
          </div>
          <div class="cPersonal_make-tr" v-if="isMake[2].is" @click="showTime()">
            <span class="cPersonal_make-make">预约时间&nbsp:</span>
            <input type="text" class="cPersonal_make-input" :value="timeValue" disabled>
          </div>
          <div class="cPersonal_make-tr" v-if="isMake[3].is" style="padding-top: 0.2rem">
            <span class="cPersonal_make-msg" style="vertical-align: top">留言&nbsp:</span>
            <textarea type="text" class="cPersonal_make-input"></textarea>
          </div>
        </div>
        <div class="cPersonal_make-btnwrap">
          <div class="cPersonal_make-btn" @click="isSubmitting?'':postMake(i.css_type)"
               :style="{'background-color':isSubmitting?'#666':'#0086b3'}" v-html="isSubmitting?'等待提交中...':'提交'">
            提交
          </div>
        </div>
        <div class="cPersonal_make-messwrap">
          <div class="cPersonal_make-message">
            <p><span><i class="icon iconfont icon-shouji1"></i></span>{{i.content_arr[0].tel}}</p>
            <p><span><i class="icon iconfont icon-icon3"></i></span>{{i.content_arr[0].email}}</p>
            <p><span><i class="icon iconfont icon-location1"></i></span>{{i.content_arr[0].address}}</p>
          </div>
          <div class="cPersonal_make-code">
            <img :src="i.content_arr[0].pic" onerror="this.src=&quot;/static/img/onerr1.png&quot;">
          </div>
        </div>
      </div>

      <transition name="keep">
        <div class="cPersonal_make-keep" v-if="tableShow">
          <div style="display: table;width: 100%;height:100%;">
            <div style="display: table-cell;width: 100%;height:100%;vertical-align: middle;">
              <div class="cPersonal_make-table">
           <span class="cPersonal_make-close" @click="closeTable()">
            <i class="icon iconfont icon-guanbi"></i>
          </span>
                <div class="cPersonal_make-tr" v-if="isMake[0].is">
                  <span class="cPersonal_make-name">姓名:</span>
                  <input type="text" class="cPersonal_make-input">
                </div>
                <div class="cPersonal_make-tr" v-if="isMake[1].is">
                  <span class="cPersonal_make-phone">电话:</span>
                  <input type="text" class="cPersonal_make-input">
                </div>
                <div class="cPersonal_make-tr" v-if="isMake[2].is" @click="showTime()">
                  <span class="cPersonal_make-make">预约时间:</span>
                  <input type="text" class="cPersonal_make-input" :value="timeValue" disabled>
                  <span class="cPersonal_make-time">
              <i class="icon iconfont icon-kechengbiao"></i>
            </span>
                </div>
                <div class="cPersonal_make-tr" v-if="isMake[3].is">
                  <span class="cPersonal_make-msg" style="vertical-align: top">留言:</span>
                  <textarea type="text" class="cPersonal_make-input"></textarea>
                </div>
                <div class="cPersonal_make-kbtn" @click="isSubmitting?'':postMake(i.css_type)"
                     :style="{'background-color':isSubmitting?'#666':''}" v-html="isSubmitting?'等待提交中...':'提交'">
                  提交
                </div>
              </div>
            </div>
          </div>
          <!--预约成功样式（暂不用）-->
          <div class="cPersonal_make-success" v-if="0">
            <span>
              <i class="icon iconfont icon-check"></i>
            </span>
            <p>恭喜 !</p>
            <p>提交成功 !</p>
            <span class="cPersonal_make-sbtn" @click="closeTable()">
              返回
            </span>
          </div>
        </div>

      </transition>
      <!-- <mt-datetime-picker
        ref="picker"
        type="datetime"
        v-model="pickerValue"
        :startDate="pickerStart"
        :endDate="pickerEnd"
        monthFormat="{value} 月"
        dateFormat="{value} 日"
        hourFormat="{value} 时"
        minuteFormat="{value} 分"
        @confirm="handleConfirm" style="width: 100%;box-sizing: border-box;padding: 0 0.01rem">
      </mt-datetime-picker> -->
      <mt-datetime-picker
        ref="picker"
        type="datetime"
        monthFormat="{value} 月"
        dateFormat="{value} 日"
        hourFormat="{value} 时"
        minuteFormat="{value} 分"
        v-model="pickerValue" @confirm="handleConfirm" style="width: 100%;box-sizing: border-box;padding: 0 0.01rem">
      </mt-datetime-picker>
    </div>
    <!--视频-->
    <div class="cPersonal_video" style="" :class=" 'custom'+i.sorting" v-for="i in videoArr">
      <div class="cPersonal_video-wrap">
        <div style="height: 100%;position: relative">
          <div class="cPersonal_video-cover" @click="postVideo()" v-if="videoIs">
            <img class="cPersonal_video-coverimg" :src="i.content[0].pic"
                 onerror="this.src=&quot;/static/img/pic_addfengmian.png &quot;">
            <div class="cPersonal_video-backColor">
              <span class="cPersonal_video-play">
                <i class="icon iconfont icon-8shipinicon"></i>
              </span>
            </div>
          </div>
          <iframe class="cPersonal_video-iframe" :src="videoUrl" allowfullscreen="true" allowtransparency="true">
          </iframe>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {DatetimePicker, Toast, Indicator} from 'mint-ui';
  import customCompany from '@/components/common/custom/customCompany';
  import customRoasting from '@/components/common/custom/customRoasting';
  import customClass from '@/components/common/custom/customClass';
  import customTitle from '@/components/common/custom/customTitle';
  import customArticle from '@/components/common/custom/customArticle';
  import customAdv from '@/components/common/custom/customAdv2';
  import customFall from '@/components/common/custom/customFall';
  import customSingle from '@/components/common/custom/customSingle';
  import customSeries from '@/components/common/custom/customSeries';


  export default{
    data(){
      return {
        nullIs: false,
        companyArr: {},
        Arr: [],
        shareObj: [],
        worksArr: [],
        staffArr: [],
        recommendArr: [],
        contentArr: [],
        makeArr: [],
        advArr: [],
        roastArr: [],
        titleArr: [],
        videoArr: [],
        classification: [],
        articlesArr: [],
        fallArr: [],
        singleArr: [],
        seriesArr: [],
        bigImg: [],
        isMake: [{is: false}, {is: false}, {is: false}, {is: false}],
        imgShow: false,
        tableShow: false,
        shopId: '',
        timeValue: '',
        timePost: 0,
        pickerValue: '',
        pickerStart: '',
        pickerEnd: '',
        videoUrl: '',
        videoIs: true,
        pageId: '',
        defaultIndex: 0,
        isSubmitting: false,
      }
    },
    created(){
      Indicator.open();
      let that = this;
//        预约时间
      this.pickerStart = new Date();
      let nowTime = (this.pickerStart.getFullYear()) + '-' + (this.pickerStart.getMonth() + 1) + '-' + (this.pickerStart.getDate() + 1);
      this.pickerValue = new Date(nowTime);
      let endTime = (this.pickerStart.getFullYear() + 4) + '-' + (this.pickerStart.getMonth() + 1) + '-' + (this.pickerStart.getDate());
      this.pickerEnd = new Date(endTime);

      let typeId = this.$route.query.type_id;
      let Id = this.$route.query.id;
      let pageId = this.$route.query.page_id ? this.$route.query.page_id : 0;

      this.postData('post', '/shop-v1-custom_personal_website.html', {
        id: Id,
        type_id: typeId,
        page_id: pageId
      }).then(res => {
        if (res.status == 200) {
          res.data
          if (res.data.status == 1) {
            this.pageId = res.data.data.page_id;
            this.Arr = res.data.data.item_info.content;
            if (this.Arr.length == 0) {
              this.nullIs = true;
            }
            this.shareObj = res.data.data.page_info;
            this.shopId = res.data.data.shop_id;
            //              循环数据，添加至对应模块数组
            this.Arr.forEach((i, index) => {
//                  为每个模块添加排序值
              i.sorting = index;
              switch (i.type) {
                case 'staff_list':
                  this.staffArr.push(i);
                  break;
                case 'recommend':
                  this.recommendArr.push(i);
                  break;
                case 'content':
                  this.contentArr.push(i);
                  break;
                case 'make':
                  this.makeArr.push(i);
                  break;
                case 'pic_adv':
                  this.roastArr.push(i);
                  break;
                case 'adv':
                  this.advArr.push(i);
                  break;
                case 'title':
                  this.titleArr.push(i);
                  break;
                case 'video':
                  this.videoArr.push(i);
                  break;
                case 'cate':
                  this.classification.push(i);
                  break;
                case 'article':
                  this.articlesArr.push(i);
                  break;
                case 'figure_upload':
                  this.fallArr.push(i);
                  break;
                case 'single_product':
                  this.singleArr.push(i);
                  break;
                case 'series_product':
                  this.seriesArr.push(i);
                  break;
              }
            });

            this.$nextTick(function () {
              this.sortDom();
//                放大图片
              $('.cPersonal_works-img').each((i) => {
                this.bigImg.push($('.cPersonal_works-img').eq(i).attr('src'));
              });
//                默认放大轮播初始图片
              $('.cPersonal_works-img').on('click', function () {
                that.defaultIndex = $('.cPersonal_works-img').index($(this));
                that.imgShow = true;
              });
//                  轮播动态获取高度
              this.roastArr.forEach((j) => {
                let index = j.sorting;
                $('.custom' + index + ' .mint-swipe-item').css('display', 'block');
                let imgNum = $('.custom' + index + ' .customRoasting_swipe1-img').length;
                $('.custom' + index + ' .customRoasting_swipe1-img').on('load', function () {
                  if (!--imgNum) {
                    let maxHeight = 0;
                    $('.custom' + index + ' .customRoasting_swipe1-img').each(function (i) {
                      let imgH = $('.custom' + index + ' .customRoasting_swipe1-img').eq(i).height();
                      maxHeight = maxHeight > imgH ? maxHeight : imgH;
                    });
                    $('.custom' + index + ' .mint-swipe-item').removeAttr("style");
                    $('.custom' + index + ' .customRoasting_swipe1').height(maxHeight);
                  }
                });
              });

              document.title = this.shareObj.title;
              this.share(this.shareObj.title, this.shareObj.describe, this.shareObj.img);
            });
            Indicator.close();
          } else {
            this.nullIs = true;
            Indicator.close();
          }
        } else {
          Indicator.close();
        }
      });
    },
    methods: {
      sortDom(){
        let customMain = $('.cPersonal_main');
//          循环模块
        for (let i = 0; i < this.Arr.length; i++) {
          let Oitem = this.Arr[i];
//            模块排序
          customMain.append($('.custom' + i));
//            公共padding
          if (Oitem.padding != 0) {
            $('.custom' + i).css({"padding-top": Oitem.padding, "padding-bottom": Oitem.padding});
          }
//            头部
          if (Oitem.type == 'title') {
            if (Oitem.title_color != '') {
              $('.custom' + i + ' .customTitle_title').css({'color': Oitem.title_color});
            }
            if (Oitem.arrow_color != '') {
              $('.custom' + i + ' .customTitle_jump').css({'color': Oitem.arrow_color});
            }
          }
//            轮播
          if (Oitem.type == 'pic_adv') {
            if (Oitem.css_type == 2 && Oitem.margin != 0) {
              $('.custom' + i + ' .customRoasting_swipe2-item:gt(0)').css({'margin-top': Oitem.margin});
            }
          }
//            作品，图文区
          if (Oitem.type == 'adv') {
            let titCenter = '';
            let titleSize = '';
            switch (Oitem.position_type) {
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
            switch (Oitem.title_size) {
              case '1':
                titleSize = '0.35rem';
                break;
              case '2':
                titleSize = '0.45rem';
                break;
              case '3':
                titleSize = '0.55rem';
                break;
            }
            $('.custom' + i + ' .customAdv_head').css({
              'text-align': titCenter,
              'color': Oitem.title_color,
              'font-size': titleSize
            });

            if (Oitem.bg_color != '') {
              $('.custom' + i + '>.customAdv').css({'background-color': Oitem.bg_color});
            }
          }
//            人员列表
          if (Oitem.type == 'staff_list') {
            let titCenter = '';
            //              转化为字符串
            Oitem.position_type += '';
            switch (Oitem.position_type) {
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
            let titleSize = '';
            switch (Oitem.title_size) {
              case '1':
                titleSize = '0.35rem';
                break;
              case '2':
                titleSize = '0.45rem';
                break;
              case '3':
                titleSize = '0.55rem';
                break;
            }
            $('.custom' + i + ' h2').css({'text-align': titCenter, 'color': Oitem.title_color, 'font-size': titleSize});
            if (Oitem.bg_color != '' && Oitem.background_type == 1) {
              $('.custom' + i + '>.cPersonal_mentor-wrap').css({'background-color': Oitem.bg_color});
            }
            if (Oitem.content_color != '') {
              $('.custom' + i + ' .cPersonal_mentor-list').css({'color': Oitem.content_color});
            }
            if (Oitem.background_type == 2) {
              $('.custom' + i + '>.cPersonal_mentor-wrap').css({
                'background': 'url(' + Oitem.content[0].bg_img + ') no-repeat 0 0',
                'background-size': 'cover'
              });
            }
          }
//            内容
          if (Oitem.type == 'content') {
            let titCenter = '';
            let titleSize = '';
            switch (Oitem.position_type) {
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
            switch (Oitem.title_size) {
              case '1':
                titleSize = '0.35rem';
                break;
              case '2':
                titleSize = '0.45rem';
                break;
              case '3':
                titleSize = '0.55rem';
                break;
            }
            $('.custom' + i + ' h2.customCompany_content-title').css({
              'text-align': titCenter,
              'color': Oitem.title_color,
              'font-size': titleSize
            });

            if (Oitem.subtitle_color != '') {
              $('.custom' + i + ' h3.customCompany_content-title').css({'color': Oitem.subtitle_color});
            }
            if (Oitem.bg_color != '' && Oitem.background_type == 1) {
              $('.custom' + i + '>.customCompany').css({'background-color': Oitem.bg_color});
            }
            if (Oitem.content_color != '' && Oitem.css_type < 4) {
              $('.custom' + i + ' .customCompany_content-text').css({'color': Oitem.content_color});
            }
            if (Oitem.background_type == 2) {
              $('.custom' + i + '>.customCompany').css({
                'background': 'url(' + Oitem.content[0].bg_img + ') no-repeat 0 0',
                'background-size': 'cover'
              });
            }

            if (Oitem.css_type == 4) {
              Oitem.content_arr.forEach(function (j, index) {
                if (j.content_postiton == "1") {
                  $('.custom' + i + ' .customCompany_content-content4').eq(index).css({'text-align': 'left'});
                } else {
                  $('.custom' + i + ' .customCompany_content-content4').eq(index).css({'text-align': 'right'});
                }
                if (j.title_color != '') {
                  $('.custom' + i + ' .customCompany_content-title4').eq(index).css({'color': j.title_color});
                }
                if (j.subtitle_color != '') {
                  $('.custom' + i + ' .customCompany_content-text4').eq(index).css({'color': j.subtitle_color});
                }
              })
            }
            if (Oitem.css_type == 5) {
              Oitem.content_arr.forEach(function (j, index) {
                if (j.content_postiton == "1") {
                  $('.custom' + i + ' .customCompany_content-graph').eq(index).css({'text-align': 'left'});
                } else {
                  $('.custom' + i + ' .customCompany_content-graph').eq(index).css({'text-align': 'right'});
                }
                if (j.title_color != '') {
                  $('.custom' + i + ' .customCompany_content-titlesmall').eq(index).css({'color': j.title_color});
                }
                if (j.subtitle_color != '') {
                  $('.custom' + i + ' .customCompany_content-text').eq(index).css({'color': j.subtitle_color});
                }
              })
            }
          }
//            预约
          if (Oitem.type == 'make') {
            let titCenter = '';
            let titleSize = '';
            switch (Oitem.position_type) {
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
            switch (Oitem.title_size) {
              case '1':
                titleSize = '0.35rem';
                break;
              case '2':
                titleSize = '0.45rem';
                break;
              case '3':
                titleSize = '0.55rem';
                break;
            }
            $('.custom' + i + ' .cPersonal_make-title').css({
              'text-align': titCenter,
              'color': Oitem.title_color,
              'font-size': titleSize
            });

            if (Oitem.subtitle_color != '') {
              $('.custom' + i + ' .cPersonal_make-text').css({'color': Oitem.subtitle_color});
            }
            if (Oitem.bg_color != '' && Oitem.background_type == 1) {
              $('.custom' + i + '>.cPersonal_make-wrap').css({'background-color': Oitem.bg_color});
            }
            if (Oitem.background_type == 2) {
              $('.custom' + i + '>.cPersonal_make-wrap').css({
                'background': 'url(' + Oitem.content[0].bg_img + ') no-repeat 0 0',
                'background-size': 'cover'
              });
            }
            if (Oitem.css_type == 2) {
              if (Oitem.content_arr[0].tel_color != '') {
                $('.custom' + i + ' .cPersonal_make-message>p:eq(0)').css({'color': Oitem.content_arr[0].tel_color});
              }
              if (Oitem.content_arr[0].email_color != '') {
                $('.custom' + i + ' .cPersonal_make-message>p:eq(1)').css({'color': Oitem.content_arr[0].email_color});
              }
              if (Oitem.content_arr[0].address_color != '') {
                $('.custom' + i + ' .cPersonal_make-message>p:eq(2)').css({'color': Oitem.content_arr[0].address_color});
              }
            }
            //             预约显示选项
            let checkArr = Oitem.content[0].check;
            if (checkArr != undefined) {
              checkArr.forEach((i) => {
                switch (i) {
                  case '1':
                    this.isMake[0].is = true;
                    break;
                  case '2':
                    this.isMake[1].is = true;
                    break;
                  case '3':
                    this.isMake[2].is = true;
                    break;
                  case '4':
                    this.isMake[3].is = true;
                    break;
                }
              });
//                console.log(this.isMake);
            }
          }
//            人员推荐
          if (Oitem.type == 'recommend') {
            let titCenter = '';
//              转化为字符串
            Oitem.position_type += '';
            switch (Oitem.position_type) {
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
            let titleSize = '';
            switch (Oitem.title_size) {
              case '1':
                titleSize = '0.35rem';
                break;
              case '2':
                titleSize = '0.45rem';
                break;
              case '3':
                titleSize = '0.55rem';
                break;
            }
            $('.custom' + i + ' .cPersonal_excellence-title').css({
              'text-align': titCenter,
              'color': Oitem.title_color,
              'font-size': titleSize
            });

            if (Oitem.content_color != '') {
              $('.custom' + i + ' .cPersonal_excellence-item').css({'color': Oitem.content_color});
            }
            if (Oitem.bg_color != '' && Oitem.background_type == 1) {
              $('.custom' + i + '>.cPersonal_excellence-wrap').css({'background-color': Oitem.bg_color});
            }
            if (Oitem.background_type == 2) {
              $('.custom' + i + '>.cPersonal_excellence-wrap').css({
                'background': 'url(' + Oitem.content[0].bg_img + ') no-repeat 0 0',
                'background-size': 'cover'
              });
            }
          }
        }
      },
      postVideo(){
        this.postData('post', '/shop/play/custom_index.html', {id: this.pageId}).then(res => {
          if (res.status == 200) {
            if (res.data.status == 1) {
              this.videoUrl = res.data.url;
              this.videoIs = false;
            } else {
              console.log(res.data.msg);
            }
          }
        });
      },
      closeImg(){
        this.imgShow = false;
      },
      closeTable(){
        this.tableShow = false;
        this.tableSues = false;
      },
      showTable(){
        this.tableShow = true;
        this.timeValue = '';
      },
      showTime(){
        this.$refs.picker[0].open();
      },
      handleConfirm(value){
        let time = Date.parse(new Date(value)) / 1000;
        this.timePost = time;
        let newDate = new Date();
        newDate.setTime(time * 1000);
        this.timeValue = newDate.toLocaleString('chinese', {hour12: false}).substr(0, 16);
      },
      postMake(type){
        var self = this;
        let name = $('.cPersonal_make-name+.cPersonal_make-input').val();
        let phone = $('.cPersonal_make-phone+.cPersonal_make-input').val();
        let time = $('.cPersonal_make-make+.cPersonal_make-input').val();
        let msg = $('.cPersonal_make-msg+.cPersonal_make-input').val();

        if (this.isMake[0].is && name == '') {
          Toast({
            message: '请填写姓名',
            position: 'middle',
            className: 'toastTip',
            duration: 2000
          });
        } else if (this.isMake[1].is && phone == '') {
          Toast({
            message: '请填写手机号码',
            position: 'middle',
            className: 'toastTip',
            duration: 2000
          });
        } else if (this.isMake[2].is && time == '') {
          Toast({
            message: '请填写时间',
            position: 'middle',
            className: 'toastTip',
            duration: 2000
          });
        } else if (this.isMake[3].is && msg == '') {
          Toast({
            message: '请填写留言',
            position: 'middle',
            className: 'toastTip',
            duration: 2000
          });
        } else {
          Indicator.open({
            spinnerType: 'snake'
          });
          this.isSubmitting = true;
          time = this.isMake[2].is ? $('.cPersonal_make-make+.cPersonal_make-input').val() : '';
          msg = this.isMake[3].is ? $('.cPersonal_make-msg+.cPersonal_make-input').val() : '';
          console.log('提交成功');
          this.postData('post', '/shop-v1-custom_do_meeting.html', {
            shop_id: this.shopId,
            name: name,
            phone: phone,
            msg: msg,
            meeting_time: this.timePost
          }).then(res => {
            if (res.status == 200) {
              Indicator.close();
              if (res.data.status == 1) {
                if (type == 1) {
                  this.tableShow = false;
                  setTimeout(function () {
                    self.isSubmitting = false;
                  }, 1000);
                }
                Toast({
                  message: '预约成功',
                  position: 'midddle',
                  iconClass: 'icon iconfont icon-check',
                  className: 'toastMake',
                  duration: 3000
                });
              } else {
                setTimeout(function () {
                  self.isSubmitting = false
                }, 2000)
                Toast({
                  message: res.data.msg,
                  position: 'midddle',
                  duration: 3000
                });
              }
            }
          });
        }
      },
      goRoute(herf){
        if (herf != "") {
          let reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
          if (reg.test(herf)) {
            window.location.href = herf;
          } else {
            Toast({
              message: herf,
              position: 'middle',
              duration: 1500
            });
          }
        }
      },
      toMentor(){
        this.$router.push({path: '/customTeam', query: {shop_id: this.shopId}});
      },
    },
    components: {
      customCompany,
      customRoasting,
      customClass,
      customTitle,
      customArticle,
      customAdv,
      customFall,
      customSingle,
      customSeries
    },
  }
</script>

<style lang="less">
  .toastMake {
    .mint-toast-text {
      font-size: 0.4rem;
    }
    .icon-check {
      font-size: 0.7rem;
    }
  }

  .toastTip {
    .mint-toast-text {
      font-size: 0.3rem;
    }
  }

  .customPersonal {
    font-size: 0.24rem;
    &_null {
      width: 100%;
      height: 100vh;
      text-align: center;
      font-size: 0.28rem;
      color: #999999;
      .icon-empty {
        font-size: 1.8rem;
        color: #999999;
      }
      p {
        padding-top: 50%;
      }
    }

    /*优秀导师*/
    .cPersonal_excellence {
      &-wrap {
        padding-bottom: 0.01rem;
      }
      &-title {
        /*padding:0 7%;*/
        font-size: 0.48rem;
        font-weight: bold;
        padding: 0.72rem 0.52rem 0.47rem;
      }
      &-item {
        display: table;
        width: 86%;
        padding: 0 7%;
        margin-bottom: 0.5rem;
      }
      &-img {
        display: table-cell;
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.35rem;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
      &-text {
        display: table-cell;
        width: 100%;
        vertical-align: middle;
        font-size: 0.28rem;
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          &:first-of-type {
            margin-bottom: 0.15rem;
            font-size: 0.34rem;
          }
        }
      }
    }
    /*导师团队*/
    .cPersonal_mentor {
      &-wrap {
        padding: 0 7%;
      }
      &-title {
        font-size: 0.48rem;
        font-weight: bold;
        padding: 0.5rem 0;
      }
      &-list {
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
      }
      &-item {
        -webkit-flex: 0 0 50%;
        flex: 0 0 50%;
        margin-bottom: 0.4rem;
      }
      &-img {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
      &-name {
        margin-top: 0.2rem;
        text-align: center;
        font-size: 0.3rem;
      }
      &-foot {
        text-align: right;
      }
    }
    /*作品展示*/
    .cPersonal_works {
      &-title {
        font-size: 0.48rem;
        padding: 0.2rem 0.1rem;
        font-weight: bold;
      }
      /*csstype1*/
      &-wrap1 {
        .cPersonal_works-content {
          height: 3.1rem;
        }
        .cPersonal_works-img {
          display: block;
          width: 100%;
        }
      }
      &-left {
        display: inline-block;
        width: 49%;
        height: 100%;
        margin-right: 2%;
      }
      &-right {
        display: inline-block;
        width: 49%;
        height: 100%;
      }
      .advertimgone {
        height: 100%;
      }
      .advertimgtwo {
        height: 48%;
      }

      /*csstype2*/
      &-wrap2 {
        .cPersonal_works-img {
          display: inline-block;
          height: 100%;
        }
      }
      &-top {
        width: 100%;
        margin-bottom: 2%;
      }
      .activitytopone {
        height: 2.5rem;
      }
      .activitytoptwo {
        height: 2rem;
      }
      &-bottom {
        width: 100%;
      }
      .activitybottomone {
        height: 2.5rem;
      }
      .activitybottomtwo {
        height: 2rem;
      }
      .activityimgone {
        width: 100%;
      }
      .activityimgtwo {
        width: 49%;
      }
      .activityimgtwo:first-child {
        margin-right: 2%;
      }

      /*放大图片*/
      &-big {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99;
        background-color: rgba(51, 51, 51, 0.94);
        .mint-swipe-indicator {
          box-sizing: border-box;
          background-color: #000000;
          opacity: 0.6;
        }
        .mint-swipe-indicator.is-active {
          background-color: #ffffff;
          border: 0.03rem solid #000;
          opacity: 1;
        }
      }
      &-close {
        position: absolute;
        top: 0.3rem;
        right: 0.2rem;
        z-index: 999;
        color: #ffffff;
      }
      &-bigimg {
        display: inline-block;
        width: 100%;
      }
      .icon-guanbi {
        color: #ffffff;
      }

      .works-enter-active, .works-leave-active {
        transition: all 0.5s;
      }
      .works-enter, .works-leave-active {
        opacity: 0;
      }

    }
    /*预约*/
    .cPersonal_make {
      display: table;
      width: 100%;
      text-align: center;
      color: #333333;
      &-title {
        font-weight: bold;
        font-size: 0.6rem;
      }
      &-text {
        margin-top: 0.2rem;
        font-size: 0.3rem;
      }
      &-btn {
        display: inline-block;
        width: 2.5rem;
        line-height: 0.75rem;
        margin-top: 0.3rem;
        font-size: 0.36rem;
        border: 0.02rem solid #ffffff;
        -webkit-border-radius: 1rem;
        -moz-border-radius: 1rem;
        border-radius: 1rem;
      }
      &-keep {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(102, 102, 102, 0.8);
        .cPersonal_make-table {
          position: relative;
          margin: 0 auto;
          /*margin-top: 35%;*/
          width: 6rem;
          padding: 0.8rem 0 0.2rem;
          -webkit-border-radius: 0.1rem;
          -moz-border-radius: 0.1rem;
          border-radius: 0.1rem;
          border: 0.02rem solid transparent;
          background-color: #ffffff;
        }
        .cPersonal_make-tr {
          position: relative;
          display: table;
          width: 90%;
          padding: 0 5%;
          margin-top: 0.3rem;
          text-align: right;
          &:first-of-type {
            margin-top: 0;
          }
          &:nth-of-type(4) span {
            vertical-align: top;
          }
        }
        .cPersonal_make-input {
          display: table-cell;
          width: 4.1rem;
          height: 0.7rem;
          font-size: 0.3rem;
          border: 0.02rem solid #ebebeb;
          -webkit-border-radius: 0.06rem;
          -moz-border-radius: 0.06rem;
          border-radius: 0.06rem;
          &:disabled {
            background-color: #ffffff;
          }
        }
      }
      &-table {

      }
      &-tr {

      }
      &-input {
        resize: none;
        &:focus {
          outline: none;
        }
        &:disabled {
          background-color: #ffffff;
        }
      }
      &-close {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        z-index: 999;
      }
      .icon-guanbi {
        color: #acacac;
      }
      &-name, &-phone, &-make, &-msg {
        display: table-cell;
        vertical-align: middle;
        font-size: 0.26rem;

      }
      &-time {
        position: absolute;
        right: 0.5rem;
        top: 0.15rem;
      }
      .icon-kechengbiao {
        color: #3ca1db;
      }
      &-kbtn {
        display: inline-block;
        width: 5.5rem;
        line-height: 0.7rem;
        margin-top: 0.5rem;
        color: #ffffff;
        font-size: 0.28rem;
        background-color: #3ca1db;
        -webkit-border-radius: 0.06rem;
        -moz-border-radius: 0.06rem;
        border-radius: 0.06rem;
      }
      &-success {
        position: relative;
        margin: 0 auto;
        margin-top: 35%;
        width: 5rem;
        padding: 0.8rem 0 0.2rem;
        text-align: center;
        -webkit-border-radius: 0.1rem;
        -moz-border-radius: 0.1rem;
        border-radius: 0.1rem;
        border: 0.02rem solid transparent;
        background-color: #ffffff;

        span {
          .icon-check {
            font-size: 1.6rem;
            color: #1a91d5;
          }
          &:nth-of-type(2) {
            display: inline-block;
            width: 4.5rem;
            line-height: 0.7rem;
            margin-top: 0.7rem;
            color: #ffffff;
            font-size: 0.28rem;
            background-color: #3ca1db;
            -webkit-border-radius: 0.06rem;
            -moz-border-radius: 0.06rem;
            border-radius: 0.06rem;
          }
        }
        p {
          &:nth-of-type(1) {
            margin-top: 0.2rem;
            color: #333333;
            font-weight: bold;
            font-size: 0.34rem;
          }
          &:nth-of-type(2) {
            margin-top: 0.2rem;
            color: #656565;
            font-size: 0.28rem;
          }
        }
      }
      &-messwrap {
        display: table;
        width: 90%;
        margin-top: 0.6rem;
        padding: 0 5%;
      }
      &-message {
        display: table-cell;
        vertical-align: middle;
        padding-right: 0.2rem;
        text-align: left;
        p {
          margin-bottom: 0.15rem;
          &:last-of-type {
            margin-bottom: 0;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.1rem;
          }
        }
      }
      &-code {
        display: table-cell;
        img {
          width: 2rem;
          height: 2rem;
        }
      }
      &-wrap {
        display: table-cell;
        vertical-align: middle;
        margin: 0 auto;
        padding: 0.7rem 0;
        color: #ffffff;
      }
      .make3 {
        .cPersonal_make-table {
          padding: 0.65rem 0 0.5rem;
          color: #cccccc;
        }
        .cPersonal_make-tr {
          position: relative;
          display: table;
          width: 87%;
          overflow: hidden;
          margin: 0 5%;
          margin-top: 0.3rem;
          padding-left: 3%;
          text-align: right;
          background-color: #ffffff;
          -webkit-border-radius: 0.06rem;
          -moz-border-radius: 0.06rem;
          border-radius: 0.1rem;
          &:first-of-type {
            margin-top: 0;
          }
          textarea {
            height: 2rem;
          }

        }
        .cPersonal_make-input {
          display: table-cell;
          width: 4.1rem;
          height: 0.7rem;
          font-size: 0.3rem;
          border: none;
        }
        .cPersonal_make-btn {
          margin-top: 0;
          border: none;
        }
      }
      .make2 {
        .cPersonal_make-table {
          padding: 0.65rem 0 0.5rem;
          color: #cccccc;
        }
        .cPersonal_make-tr {
          position: relative;
          display: table;
          width: 87%;
          overflow: hidden;
          margin: 0 5%;
          margin-top: 0.3rem;
          padding-left: 3%;
          text-align: right;
          background-color: #ffffff;
          -webkit-border-radius: 0.06rem;
          -moz-border-radius: 0.06rem;
          border-radius: 0.1rem;
          &:first-of-type {
            margin-top: 0;
          }
          textarea {
            height: 2rem;
          }
        }
        .cPersonal_make-input {
          display: table-cell;
          width: 4.1rem;
          height: 0.7rem;
          font-size: 0.3rem;
          border: none;
        }
        .cPersonal_make-btnwrap {
          padding: 0 5%;
        }
        .cPersonal_make-btn {
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          margin-top: 0;
          text-align: center;
          border: none;
          -webkit-border-radius: 0.1rem;
          -moz-border-radius: 0.1rem;
          border-radius: 0.1rem;
        }
      }
      .cPersonal_make-tr textarea {
        height: 2rem;
      }
      .keep-enter-active, .keep-leave-active {
        transition: all 0.5s;
      }
      .keep-enter, .keep-leave-active {
        opacity: 0;
      }
    }
    /*视频*/
    .cPersonal_video {
      &-wrap {
        padding: 0;
        background-color: transparent;
      }
      &-cover {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      &-coverimg {
        width: 100%;
        height: 100%;
      }
      &-backColor {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
      }
      &-play {
        position: absolute;
        left: 45%;
        top: 40%;

        .icon-8shipinicon {
          font-size: 1rem;
          color: #0086b3;
        }
      }
      &-iframe {
        width: 100%;
        height: 4.5rem;
        border: 0;
      }
    }

  }
</style>
