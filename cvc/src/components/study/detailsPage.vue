<template>
  <div id="box" class="detailsPage" v-show="ifloadend">
    <audio id="audio"></audio>
    <mt-popup v-model="popupVisible" position="middle">请选择播放视频</mt-popup>
    <!-- <img :src="inviteData.qr_code" class="inviteCodeOut" v-show="codeOut">
		<img :src="inviteData.qr_code" class="inviteCodeOut1" v-show="codeOut"> -->
    <div class="bg1" v-if="ifpay" @click="hide()">
    </div>
    <payBox :ifpay="ifpay" :title="titlebubian" :ifsale="ifSale" :salePrice="lists.sales_fee" :price="lists.total_fee"
            :ifgetinfo="ifgetinfo"></payBox>
    <giftBox :liwuPrice="liwuPrice" :total_fee="liwuPrice" :titlebubian="titlebubian" v-if="liwu"></giftBox>
    <div class="kuaijie" v-if="false">
      <div class="service" @click="upDown()">
        <i class="iconfont icon-shangla"></i>
      </div>
      <div id="bianjie">
        <div class="give">
          <router-link to="/mine">
            <i class="iconfont icon-wode1" style="color:#fff"></i>
          </router-link>
        </div>
        <div class="give" @click="tip()">
          <i class="iconfont icon-kefu1"></i>
        </div>
        <div class="give">
          <router-link to="/">
            <i class="iconfont icon-shouye1" style="color:#fff"></i>
          </router-link>
        </div>
        <div class="give" @click="biji()" v-show="isBuy == 2 || ifFree == 1">
          <i class="iconfont icon-pinglun2" style="color:#fff"></i>
        </div>
      </div>
      <div class="give" @click="son()">
        <i class="iconfont icon-jiangpinzhongxin"></i>
      </div>
    </div>
    <div class="bg" v-show="kefu1" @click="touch()" style="text-align:center;">
      <!-- <p style="color:#fff;margin-top:50%;">加载中...</p> -->
    </div>
    <div class="bg1" v-show="liwu1" @click="hide()">
    </div>
    <!-- <div class="liwu_box" v-show="liwu">
     <span style="position: absolute;right: 0.2rem;top: 0.2rem;color: #999" @click="hide()"><i
       class="icon iconfont icon-guanbi"></i></span>
     <div class="liwu_describe" style="margin-top:0.2rem;">赠礼将于90天后过期</div>
     <div class="liwu_describe" style="padding-bottom: 0.2rem">过期未领取的课程将不退回</div>
     <div class="liwu_number">
       <div>赠送数量</div>
       <div class="liwu_add">
         <span class="jian" @click="toReduce()">-</span><span class="jia" @click="toAdd()">+</span>&nbsp份
       </div>

     </div>
     <div class="liwu_total">
       <span>合计</span>
       <span style="color:#666">&yen{{liwuPrice}}</span>
     </div>
     <div class="liwu_btn" @click="topayGive()">
       <div>打包赠送</div>
     </div>
   </div> -->
    <div class="kefuCode" v-show="kefu">
      <!-- <img :src="kefuPic"> -->
      <img class="kefuCode-close" src="../../../static/img/home/my_close.png" @click="touch()">
      <div class="kefuCode-title">{{arr2.title}}</div>
      <img class="kefuCode-code" :src="kefuPic">
      <div class="kefuCode-tip">长按识别二维码，联系我们</div>
    </div>
    <!-- <div class="kefuCode" v-show="invite">
      <img id="invite" src="">
    </div> -->
    <div class="sharetop" v-show="!ifGet" style="padding-bottom:0.9rem;"
         :style="{'padding-bottom':isBuy==2?'0':'0.9rem'}">
      <div class="share" @click="inviteclick()">
        <span>
          <i class="iconfont icon-qiapianx" style="color:#fff"></i>
          {{dist_money}}
        </span>
      </div>
      <div v-if="audiopic" style="width:100%;height:3.41rem;overflow:hidden;position:relative;">
        <div style="position:absolute;left:2.5rem;line-height:3.41rem;color:#999">封面图片加载中...</div>
        <img :src="fenmian" style="width:100%;position:absolute">
      </div>
      <!-- <div> -->
      <div class="headers" v-show="headers" :class="{height1:height1}">
        <!-- <div v-if="img1" style="width:6rem;height:1.228rem;background-color:#fcfcfc;border:1px solid #eee;margin:0 auto;margin-top:0.2rem;position:relative">
					<i class="icon iconfont icon-audio-left" style="position:absolute;left:0.3rem;top:0.28rem;color:#09bb07;font-size:0.6rem;"></i>
					<div style="line-height:1.228rem;">付费内容，请购买后收听</div>
				</div> -->
        <div v-if="img1">
          <div id="player1" class="aplayer"
               style="font-family: Arial,Helvetica,sans-serif;margin: 0.2rem;-webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);-webkit-border-radius: 2px;border-radius: 2px;overflow: hidden;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;">
            <div class="aplayer-pic" style="position: relative;float: left;height: 66px;width: 66px;"><img
              :src="logo1" style="    height: 100%;width: 100%;">
              <div class="aplayer-button aplayer-play"
                   style="width: 26px;height: 26px;border: 2px solid #fff;top: 50%;left: 50%;margin: -15px 0 0 -15px;position: absolute;color: #fff;border-radius: 50%;opacity: .8;cursor: pointer;text-shadow: 0 1px 1px rgba(0,0,0,.2);box-shadow: 0 1px 1px rgba(0,0,0,.2);background: rgba(0,0,0,.2);">
                <i class="iconfont icon-play"
                   style="position: absolute;top: -12px;left: -6px;font-size: 38px;line-height: 23px;"></i></div>
            </div>
            <div class="aplayer-info"
                 style="margin-left: 66px;padding: 14px 7px 0 10px;height: 66px;box-sizing: border-box;">
              <div class="aplayer-music"
                   style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-bottom: 17px;"><span
                class="aplayer-title" style="float:left">付费内容，请购买后收听</span></div>
              <div class="aplayer-controller" style="    position: relative;">
                <div class="aplayer-bar-wrap" style="margin: 0 120px 0 5px;">
                  <div class="aplayer-bar"
                       style="osition: relative;height: 2px;width: 100%;background: #cdcdcd;cursor: pointer!important;">
                    <div class="aplayer-loaded"
                         style="width: 100%;position: absolute;left: 0;top: 0;bottom: 0;height: 2px;transition: all .5s ease;"></div>
                    <div class="aplayer-played"
                         style="width: 0;position: absolute;left: 0;top: 0;bottom: 0;background: #b7daff;height: 2px;">
                      <span class="aplayer-thumb"
                            style="position: absolute;top: 0;right: 5px;margin-top: -4px;margin-right: -10px;height: 8px;width: 8px;border: 1px solid #b7daff;border-radius: 50%;background: #fff;cursor: pointer!important;"></span>
                    </div>
                  </div>
                </div>
                <div class="aplayer-time"
                     style="position: absolute;right: 20px;bottom: -8px;height: 17px;color: #999;font-size: 11px;">
                  <!-- - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">03:33</span> -->
                  <div class="aplayer-volume-wrap"><i class="demo-icon aplayer-icon-volume-down"></i>
                    <div class="aplayer-volume-bar-wrap"
                         style="display: inline-block;margin-left: 7px; cursor: pointer!important;">
                      <div class="aplayer-volume-bar">
                        <div class="aplayer-volume" style="height: 80%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <iframe :src="videoUrl" allowfullscreen="true" allowtransparency="true" :class="{height1:height1}">
        </iframe>
        <div class="picDan" v-if="picDan">
          <img :src="fenmian" v-show="fenmian != null">
          <div class="bg06"></div>
          <div @click="paly()" style="margin-top:1.06rem;" v-show="ifstudydao">
            <div style="color:#fff;font-size:0.221rem;position:relative;margin-bottom:0.17rem;">上次学习到：{{studydao}}</div>
            <div
              style="width:1.365rem;height:0.426rem;background-color:#5e96d0;position:relative;line-height:0.426rem;color:#fff;border-radius:0.05rem;margin:0 auto;font-size:0.221rem;">
              继续学习
            </div>
          </div>
          <!-- <i class="iconfont icon-play" @click="paly()" v-show="playIcon && !ifstudydao"></i> -->
          <img v-if="ifplayicon" src="../../../static/img/home/home_play.png"
               style="height:1rem;width:1rem;left:calc(50% - 0.5rem);top:calc(50% - 0.5rem);" @click="paly()"
               v-show="playIcon && !ifstudydao">
          <div class="relation" @click="relation()" v-show="is_relation">
            <i class="iconfont icon-gouwu"></i>
            <span>{{numData}}</span>
          </div>
          <div class="share" @click="inviteclick()">
						<span>
							<i class="iconfont icon-qiapianx" style="color:#fff"></i>
							{{dist_money}}
						</span>
          </div>
          <div class="tipNoFree" v-show="noFree">{{tiptip}}</div>
          <div class="titleList">
            <p>{{titlebubian}}</p>
          </div>
        </div>
      </div>
      <groupBuying @fantherHide="hideBtn" v-if="ifGroup"></groupBuying>
      <mt-navbar v-model="selected" v-show="nav">
        <mt-tab-item id="2">
          课程简介
          <div class="xialine" v-if="selected==2"></div>
        </mt-tab-item>
        <mt-tab-item id="1" v-if="courseList">
          课程列表
          <div class="xialine" v-if="selected==1"></div>
        </mt-tab-item>
        <mt-tab-item id="3" v-if="false">
          问答收听
          <div class="xialine" v-if="selected==3"></div>
        </mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1" v-if="courseList">
          <div class="curBox">
            <ul class="listBox_inner">
              <li v-for="(item,index) in innerBox" class="listBox_li"
                  @click="activeTil($event,item.lst_id,item.is_free,index,item.is_foreshow)" :data-id="item.lst_id"
                  :data-free="item.is_free" :style="{'border-bottom':innerBox.length-1==index?'none':'1px solid #eee'}">
                <span
                  :class="{yanse:index == watchIndex ? watchIndex === '' ? false :true :false,noBuy:item.is_foreshow==1?true:ifFree==1?false:isBuy==2?false:item.is_free==1?false:true}">

                  <div v-if="innerBox.length>0?innerBox[0].is_foreshow==1?true:false:true"
                       style="display:inline-block;vertical-align:top;width:0.7rem;"
                       :style="{color:index==0?item.is_foreshow==1?'red':'#888':'#888','font-size':index=='0'?'0.18rem':''}">{{index > 9 ? index : index == 0 ? item.is_foreshow == 1 ? '[预告]' : '00' : '0' + index}}</div>
                  <div v-if="innerBox.length>0?innerBox[0].is_foreshow==0?true:false:false"
                       style="display:inline-block;vertical-align:top;width:0.7rem;"
                       :style="{color:index==0?item.is_foreshow==1?'red':'#888':'#888'}">{{index > 8 ? index + 1 : '0' + Number(index + 1)}}</div>
                  <div style="display:inline-block;vertical-align:top;">{{item.title}}</div>

                </span>
                <!--  <i class="iconfont icon-play"
                    :class="{yanse:index == watchIndex ? watchIndex === '' ? false :true :false,noBuy:item.is_foreshow==1?true:ifFree==1?false:isBuy==2?false:item.is_free==1?false:true}"
                    v-if="item.is_foreshow==1?false:ifFree==1?true:isBuy==2?true:item.is_free==1?true:false"></i> -->
                <img src="../../../static/img/home/home_play_mini.png"
                     style="width:0.28rem;vertical-align:top;margin-top:0.36rem;float: right;"
                     :class="{yanse:index == watchIndex ? watchIndex === '' ? false :true :false,noBuy:item.is_foreshow==1?true:ifFree==1?false:isBuy==2?false:item.is_free==1?false:true}"
                     v-if="item.is_foreshow==1?false:ifFree==1?true:isBuy==2?true:item.is_free==1?true:false">
                <!-- <i class="iconfont icon-suo"
                   :class="{noBuy:item.is_foreshow==1?true:ifFree==1?false:isBuy==2?false:item.is_free==1?false:true}"
                   v-if="item.is_foreshow==1?true:ifFree==1?false:isBuy==2?false:item.is_free==1?false:true"></i> -->
                <img src="../../../static/img/home/home_lock.png"
                     style="width:0.28rem;vertical-align:top;margin-top:0.36rem;float: right;"
                     :class="{noBuy:item.is_foreshow==1?true:ifFree==1?false:isBuy==2?false:item.is_free==1?false:true}"
                     v-if="item.is_foreshow==1?true:ifFree==1?false:isBuy==2?false:item.is_free==1?false:true">
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!-- <div class="descUp">
			  		<div>
				  		<p>{{titlebubian}}</p>
				  		<div>
				  			<i class="iconfont icon-guankanliang"></i>
					  		<span>{{guangkan}}</span>
					  	</div>
			  		</div>
			  	</div> -->
          <div class="brief" v-html="content">
            {{content}}
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div v-show="!ifAsk">
            <!-- <div class="askStatus">
			  			<span @click="askChoose(0)" :class="{clickthis:clickthis1}">全部</span>
			  			<span @click="askChoose(1)" :class="{clickthis:clickthis2}">未回答</span>
			  			<span @click="askChoose(2)" :class="{clickthis:clickthis3}">已回答</span>
			  		</div> -->
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-distance="1"
                infinite-scroll-immediate-check="false">
              <div v-show="load5" class="load">加载中...</div>
              <li v-for="item in arr">
                <detailquestions :item="item" :overheard="overheard"></detailquestions>
              </li>
              <div v-show="load3" class="load">加载中...</div>
              <div v-show="load6" class="loadnew">
                <nodata></nodata>
              </div>
              <div v-show="load4" class="load" style="margin-bottom:0.1rem;color:#999">
                <loadNo></loadNo>
              </div>
            </ul>
          </div>
          <div v-show="ifAsk">
            <textarea class="askText" placeholder="字数限制在5-50字之间" v-model="textBox"></textarea>
            <div class="uploadPic">
              <i class="iconfont icon-shangchuantupian" v-show="uploadicon" @click="ifall()"></i>
              <img :src="uploadPic0">
              <img :src="uploadPic1">
              <input type="file" accept="image/*" name="upload" id="file" @change="uploadPicto()">
              <input type="file" accept="image/*" name="upload" id="file2" @change="uploadPicto2()">
            </div>
            <ul class="tiwen">
              <!-- <li>
			  				<span style="background-color: #5e96d0;">+关注</span>
			  			</li> -->
              <li>
                <span style="background-color: #fe5875;" @click="payAsk()">&yen;{{tiwenqian | zhengshu}}提问</span>
              </li>
            </ul>
            <div class="questatus">
              <span>{{questatus}}</span>
              <input type="checkbox" name="public" v-model="picked">
              <span class="gou">
			  				<span class="xuan" v-show="ifxuan"><i class="iconfont icon-gou"></i></span>
			  			</span>
            </div>
            <div class="questatus" style="border-bottom:0" @click="shouluo()">
              <span>提问须知</span>
              <i class="iconfont icon-shangla"></i>
            </div>
            <div class="queTip" id="queTip">
              <div>1、提问后导师超过48小时未回答，将按支付路径全额退款。</div>
              <div>2、所有免费听的问答都不产生偷偷听收入。</div>
              <div>3、所有收入扣除10%为收益，自动进入账号钱包。</div>
              <div>4、提问成功后在个人中心-我的提问可查看提问问题。</div>
            </div>
            <!-- <div class="publicStatus">
			  			<ul>
			  				<li><span class="yuan" :class="{red:ifred}"></span><input type="radio" name="public" v-model="picked" value="open">公开</li>
			  				<li><span class="yuan" :class="{red:!ifred}"></span><input type="radio" name="public" v-model="picked" value="private">私密</li>
			  			</ul>
			  		</div> -->
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <footer1></footer1>
    </div>
    <div v-if="ifFree == 1 ? false :true && isOn == 1">
      <div id="navBox" v-if="isOn && ifBuy">
        <div class="needbuy">
          <div class="needbuy-info" @click="tip()">
            <img src="../../../static/img/home/home_Consultation.png">
            <div>咨询</div>
          </div>
          <div class="needbuy-info" style="margin-left:0.6rem;" @click="son()">
            <img src="../../../static/img/home/home_gift.png" style="margin-left:-0.02rem;">
            <div>送礼</div>
          </div>
          <div class="needbuy-price" v-if="ifSale == false" @click="toPayDemo()">购买：{{Number(lists.total_fee)}}{{moneyName}}</div>
          <div class="needbuy-price" v-if="ifSale == true" @click="toPayDemo()">购买：{{Number(lists.sales_fee)}}{{moneyName}}</div>
          <span style="float:right;" class="needbuy-sale"
                v-if="ifSale == true">{{Number(lists.total_fee)}}{{moneyName}}</span>
        </div>
      </div>
    </div>
    <div class="buyed" v-if="!isOn && ifBuy">
      未上架无法购买
    </div>
    <!-- <div class="buyed" @click="tip()" v-show="isBuy == 2">
      此系列{{this.$route.query.ser_id ? '课程' : '视频'}}你已经购买
    </div> -->
    <!-- <div id="navBox" v-show="isBuy == 2">
      <div class="needbuy">
        <div class="needbuy-info" @click="tip()">
          <img src="../../../static/img/home/home_Consultation.png">
          <div>咨询</div>
        </div>
        <div class="needbuy-info" style="margin-left:0.6rem;" @click="son()">
          <img src="../../../static/img/home/home_gift.png" style="margin-left:-0.02rem;">
          <div>送礼</div>
        </div>
        <div class="needbuy-price">已购买</div>
      </div>
    </div> -->
    <div class="ask ask1" v-show="selected == 3 && askshow" @click="quiz()">
      我要提问
    </div>
    <div class="ask" v-show="selected == 3 && !askshow">
      <i class="iconfont icon-zuola" @click="goBack()"></i>
    </div>
    <transition name="move">
      <div class="relation_box" v-if="relation_show">
        <div class="relation_title">
          关联推荐
        </div>
        <div class="relation_content">
          <div class="relation_item" v-for="(item,index) in relationData">
            <div class="relation_item_pic">
              <img :src="item.pic" alt="" :onerror="errorImg02"/>
            </div>
            <div class="relation_item_right">
              <div class="relation_item_title">{{item.goods_name}}</div>
              <div class="relation_item_price">
                <div>￥{{item.shop_price}}</div>
                <div @click=purchase(item.goods_id) :goods_id="item.goods_id">立即购买</div>
              </div>
            </div>
          </div>

          <div class="relation_more">
            <span>没有更多了~</span>
          </div>

        </div>
        <div class="relation_btn" @click="relationBtn()">
          <i class="iconfont icon-next-page"></i>
        </div>

      </div>
    </transition>
    <div class="relation_bg" v-show="relationBg"></div>
  </div>
</template>

<script>
  import detailquestions from '@/components/study/detailquestions'
  import nodata from '@/components/common/nodata'
  import loadNo from '@/components/common/loadNo';
  import footer1 from '@/components/common/footer1';
  import groupBuying from '@/components/expand/groupBuying/groupBuying';
  import payBox from '@/components/study/payBox';
  import giftBox from '@/components/study/giftBox'
  import {Tabbar, TabItem, Toast, Navbar, InfiniteScroll, Popup, Indicator, MessageBox} from 'mint-ui';
  export default {
    data: function () {
      return {
        ifloadend: false,
        list: true,
        brief: false,
        innerBox: [],
        lists: '',
        ifBuy: true,
        ifFree: true,
        ifGet: true,
        ifSale: false,
        title: '暂无数据',
        intro: '暂无数据',
        content: '暂无数据',
        // noData:false,
        fenmian: null,
        noFree: false,
        ifPlay: false,
        playIcon: true,
        lstId: '',
        listBox: true,
        videoUrl: '',
        picDan: true,
        endtime: '',
        starttime: '',
        ifshow: true,
        showThis: '',
        watchIndex: '',
        bgColor: false,
        kefu: false,
        kefu1: false,
        liwu1: false,
        liwu: false,
        kefuPic: '',
        invite: false,
        inviteData: [],
        type_id: '',
        videoDemo: '',
        isOn: '',
        isBuy: '',
        codeOut: false,
        selected: '2',
        ifAsk: false,
        askshow: true,
        arr: [],
        arr2: [],
        pageNo: '1',
        picked: 'true',
        ifred: true,
        textBox: '',
        courseList: 'true',
        askStatus: '0',
        load3: false,
        load4: false,
        load5: true,
        load6: false,
        clickthis1: true,
        clickthis2: false,
        clickthis3: false,
        is_foreshow: '',
        popupVisible: false,
        playing2: true,
        playing: true,
        titlebubian: '',
        guangkan: '',
        share1: false,
        noBuy1: true,
        headers: true,
        nav: true,
        questatus: '公开提问',
        ifxuan: true,
        uploadPic0: '',
        uploadPic1: '',
        uploadicon: true,
        file1: {},
        file2: {},
        studydao: '加载中...',
        ifstudydao: false,
        audiopic: false,
        tiptip: '付费内容，请购买后观看',
        height1: false,
        img1: false,
        biji1: '',
        note: false,
        arr3: ['../../../static/img/invite/invitebg.png', '', '', '', '给你一张学习明信片', '../../../static/img/invite/inviteyin.png', '', '', '', '长按识别二维码参加课程'],
        ifGroup: false,
        overheard: '',
        tiwenqian: '',
        yinsiqian: '',
        gongkaiqian: '',
        relationBg: false,
        relation_show: false,
        relationData: '',
        errorImg02: 'this.src="' + require('../../../static/img/pic_addfengmian.png') + '"',
        shopId: '',
        is_relation: false,
        numData: '',
        dist_money: '',
        liwuNum: 1,
        liwuPrice: 0,
        ifpay: false,
        ifgetinfo: false,
        logo1: '',
        ifplayicon: true,
      }
    },
    created(){
      var docm = document;
      this.global.shouquan();
      var href = window.location.href;
      var self = this;
      Indicator.open();
      if (href.indexOf('vid') != -1) {
        this.courseList = false;
        this.selected = '2';
        var idd = this.$route.query.vid;
        this.postData('post', '/shop-v1-video_detail.html', {vid: this.$route.query.vid}).then(res => {
          this.ifloadend = true;
          if (res.status == 200) {
            var dist_money = parseFloat(res.data.dist_money);
            if (dist_money > 10) {
              self.dist_money = '赚￥' + dist_money;
            } else {
              self.dist_money = '分享赚学费';
            }
            self.titlebubian = res.data.title;
            self.guangkan = res.data.click;
            Indicator.close();
            if (res.data != null) {
              docm.title = res.data.title;
              this.listBox = false;
              this.type_id = res.data.type_id;
              this.list = false;
              this.brief = true;
              this.title = res.data.title;
              this.intro = res.data.intro;
              this.content = res.data.content;
              this.lists = res.data;
              if (res.data.sales_on == 1) {
                this.liwuPrice = this.lists.sales_fee;
              } else {
                this.liwuPrice = this.lists.total_fee;
              }
              this.ifFree = res.data.is_free;
              this.isBuy = res.data.is_buy;
              this.fenmian = res.data.pic;
              this.isOn = res.data.is_on;
              if (res.data.is_buy == 1) {
                this.ifBuy = true;
                this.img1 = true;
                //	判断是否已购买,进行拼团加载
                this.ifGroup = true;
              } else if (res.data.is_buy == 2) {
                this.ifBuy = false;
              }
              if (res.data.is_free == 1) {
                this.img1 = false;
              }
              this.ifGet = false;
              if (res.data.sales_starttime) {
                var starttime = res.data.sales_starttime.replace(/-/g, "/")
                var endtime = res.data.sales_endtime.replace(/-/g, "/")
                var nowtime = this.global.format().replace(/-/g, "/");
                if (starttime <= nowtime && nowtime <= endtime) {
                  this.ifSale = true;
                } else {
                  this.ifSale = false;
                }
              }
              self.share(this.title, this.intro, this.fenmian)
              // 判断是不是MP3
              if (res.data.type_id == 3) {
                this.tiptip = '付费内容，请购买后收听';
                this.audiopic = true;
                console.log($('.headers'))
                this.height1 = true;
                this.picDan = false;
                this.postData('post', '/shop-play-index.html', {type: '1', id: this.$route.query.vid}).then(res => {
                  if (res.data.status == 1) {
                    self.videoUrl = res.data.url;
                    self.picDan = false;
                    $('.headers').css('height', '1.7rem');
                    $('iframe').css('height', '1.7rem');
                  } else if (res.data.status == 0) {

                  }
                })
              }
            } else {
              // this.noData = true;
            }
          }
        });
        this.postData('post', '/shop-v2-history_record.html', {type: 1, id: this.$route.query.vid}).then(res => {

        })
      } else if (href.indexOf('ser_id') != -1) {
        var idd = this.$route.query.ser_id;
        this.postData('post', '/shop-v1-series_show.html', {ser_id: this.$route.query.ser_id}).then(res => {
          this.ifloadend = true;
          if (res.status == 200) {
            var dist_money = parseFloat(res.data.dist_money);
            if (dist_money > 10) {
              self.dist_money = '赚￥' + dist_money;
            } else {
              self.dist_money = '分享赚学费';
            }
            Indicator.close();
            if (res.data != null) {
              docm.title = res.data.ser_title;
              self.titlebubian = res.data.ser_title;
              self.guangkan = res.data.click;
              if (res.data.is_free == 1 || res.data.is_buy == 2) {
                // 记录看到第几个
                if (localStorage.getItem(this.$route.query.ser_id) != null) {
                  this.watchIndex = JSON.parse(localStorage.getItem(this.$route.query.ser_id)).index;
                  this.postData('post', '/shop-play-index.html', {
                    type: '2',
                    id: JSON.parse(localStorage.getItem(this.$route.query.ser_id)).id
                  }).then(res => {
                    this.videoDemo = res.data.url;
                    // this.ifstudydao = true;
                    if (JSON.parse(localStorage.getItem(this.$route.query.ser_id)).index) {
                      this.picDan = true
                    }
                  })
                  this.postData('post', '/shop-v1-series_detail.html', {lst_id: JSON.parse(localStorage.getItem(this.$route.query.ser_id)).id}).then(res => {
                    if (res.data != null) {
                      this.fenmian = res.data.pic;
                      this.type_id = res.data.type_id;
                    }
                  });
                }
              } else {
                this.list = false;
                this.brief = true;
                this.ifshow = false;

              }
              this.title = res.data.ser_title;
              this.intro = res.data.intro;
              this.content = res.data.content;
              this.lists = res.data;
              console.log(res.data)
              if (res.data.sales_on == 1) {
                this.liwuPrice = this.lists.sales_fee;
              } else {
                this.liwuPrice = this.lists.total_fee;
              }
              // this.liwuPrice = this.lists.total_fee;
              this.fenmian = res.data.pic;
              this.ifFree = res.data.is_free;
              this.isOn = res.data.is_on;
              this.isBuy = res.data.is_buy;
              this.is_foreshow = res.data.is_foreshow;
              if (res.data.is_buy == 1) {
                this.ifBuy = true
                //	判断是否已购买,进行拼团加载
                this.ifGroup = true;
              } else if (res.data.is_buy == 2) {
                this.ifBuy = false;
                this.selected = '1';
              }
              this.ifGet = false;
              if (res.data.sales_starttime) {
                var starttime = res.data.sales_starttime.replace(/-/g, "/")
                var endtime = res.data.sales_endtime.replace(/-/g, "/")
                var nowtime = this.global.format().replace(/-/g, "/");
                if (starttime <= nowtime && nowtime <= endtime) {
                  this.ifSale = true;
                } else {
                  this.ifSale = false;
                }
              }
              self.share(this.title, this.intro, this.fenmian)
            } else {
              // this.noData = true;
            }
          }
        });
        this.postData('post', '/shop-v1-series_show_lst.html', {ser_id: this.$route.query.ser_id}).then(res => {
          if (res.data != null) {
            this.innerBox = res.data;
          }
          if (res.data.length == 0) {
            this.ifplayicon = false;
          }
        });
        this.postData('post', '/shop-v2-history_record.html', {type: 2, id: this.$route.query.ser_id}).then(res => {

        })
      }
      ;

      //判断是否显示关联商品入口
      if (window.location.href.indexOf('ser_id') != -1) {
        var source_type = 2
      } else {
        var source_type = 1
      }
      if (window.location.href.indexOf('ser_id') != -1) {
        var idd = this.$route.query.ser_id
      } else {
        var idd = this.$route.query.vid
      }
      this.postData('post', '/shop-v1-video_relation_num.html', {'r_id': idd, 'type': source_type}).then(res => {
        if (res.status == 200) {
          this.numData = res.data.num;
          if (res.data.is_relation == 1) {
            this.is_relation = true;
          } else {
            this.is_relation = false;

          }
        }
      })
      if (sessionStorage.getItem('res') != null) {
        var res = JSON.parse(sessionStorage.getItem('res'));
        res.data = res;
        this.logo1 = res.data.logo
      } else {
        self.getData('get', '/shop-v1-index_basemsg.html').then(res => {
          this.logo1 = res.data.logo;
          sessionStorage.setItem('res', JSON.stringify(res.data))
        })
      }

    },
    mounted(){
      // console.log(11111)
      // $(document).ready(function () {
      // 　　$('body').height($('body')[0].clientHeight);
      // });
    },
    updated(){
      for (let i = 0; i < $('.listBox_inner').eq(0).find('i').length; i++) {
        if ($('.listBox_inner').eq(0).find('i').eq(i).attr('class').indexOf('yanse') != -1) {
          var title = $('.listBox_inner').eq(0).find('.listBox_li').eq(i).find('span').text();
          this.studydao = title;
        }
      }
    },
    methods: {
      hecheng(face, fenmian, code, name, author){
        console.log(this.inviteData)
        this.arr3[1] = fenmian;
        this.arr3[2] = face;
        this.arr3[3] = name;
        this.arr3[6] = this.titlebubian;
        this.arr3[7] = '主讲人：' + author;
        this.arr3[8] = code;
        var self = this;
        var h = 0;
        var mycanvas = document.createElement('canvas');
        var len = this.arr3.length;
        document.body.appendChild(mycanvas);
        $('canvas').css('display', 'none');
        mycanvas.width = 520;
        mycanvas.height = 866;
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
            img.src = self.arr3[num];
            if (num == 0) {
              img.onerror = function () {
                drawing(num + 1);
              }
              img.onload = function () {
                context.drawImage(img, 0, 0, mycanvas.width, mycanvas.height);
                drawing(num + 1);
              }
            } else if (num == 1) {
              img.onerror = function () {
                drawing(num + 1);
              }
              img.onload = function () {
                context.drawImage(img, 25, 18, 470, 300);
                drawing(num + 1);
              }
            } else if (num == 2) {
              img.onerror = function () {
                drawing(num + 1);
              }
              img.onload = function () {
                context.drawImage(img, 50, 342, 78, 78);
                drawing(num + 1);
              }
            } else if (num == 3) {
              context.font = '24px Microsoft YaHei';
              context.fillStyle = '#333';
              context.fillText(self.arr3[num], 135, 370);
              drawing(num + 1);
            } else if (num == 4) {
              context.font = '24px Microsoft YaHei';
              context.fillStyle = '#666';
              context.fillText(self.arr3[num], 135, 404);
              drawing(num + 1);
            } else if (num == 5) {
              img.onerror = function () {
                drawing(num + 1);
              }
              img.onload = function () {
                context.drawImage(img, mycanvas.width - 200, 312, 198, 110);
                drawing(num + 1);
              }
            } else if (num == 6) {
              context.font = 'bold 24px Microsoft YaHei';
              context.fillStyle = '#333';
              context.textAlign = 'center';
              context.fillText(self.arr3[num], mycanvas.width / 2, 510);
              drawing(num + 1);
            } else if (num == 7) {
              context.font = '24px Microsoft YaHei';
              context.fillStyle = '#333';
              context.textAlign = 'center';
              context.fillText(self.arr3[num], mycanvas.width / 2, 550);
              drawing(num + 1);
            } else if (num == 8) {
              img.onerror = function () {
                drawing(num + 1);
              }
              img.onload = function () {
                context.drawImage(img, mycanvas.width / 2 - 68, mycanvas.height - 230, 140, 140);
                drawing(num + 1);
              }
            } else if (num == 9) {
              context.font = '24px Microsoft YaHei';
              context.fillStyle = '#333';
              context.textAlign = 'center';
              context.fillText(self.arr3[num], mycanvas.width / 2, mycanvas.height - 60);
              drawing(num + 1);
            }
          } else {
            self.imgPath = mycanvas.toDataURL("image/jpeg");
            $('#invite').attr('src', self.imgPath);
          }
        }

        drawing(0)
      },
      tiptitp(){
        Toast({
          message: '付费内容，请购买后收听',
          duraction: 500
        })
      },
      loadMore(){
        if (this.load4 == false) {
          this.load3 = true;
          this.pageNo = Number(this.pageNo) + Number(1);
          if (window.location.href.indexOf('ser_id') != -1) {
            var source_type = 2
          } else {
            var source_type = 1
          }
          this.postData('post', '/shop-v2-ask_lst.html', {
            source_type: source_type,
            source_id: this.$route.query.ser_id,
            page: this.pageNo,
            status: '2'
          }).then(res => {
            if (res.data.length != 0) {
              this.arr = this.arr.concat(res.data);
              this.load3 = false;
            } else if (res.data.length == 0) {
              this.pageNo = Number(this.pageNo) - Number(1);
              this.load3 = false;
              this.load4 = true;
            }
          })
        }
      },
      ifall(){
        if (this.uploadPic0 != '' && this.uploadPic1 != '') {
          Toast({
            message: '最多只能上传两张图片',
            duraction: 500
          })
          return false;
        } else {
          if (this.uploadPic0 == '') {
            return $('#file').click();
          } else {
            return $('#file2').click();
          }
        }
      },
      uploadPicto(){
        var self = this;
        var reader = new FileReader();
        reader.readAsDataURL($('#file')[0].files[0]);
        reader.onload = function () {
          self.uploadPic0 = reader.result;
        }
      },
      uploadPicto2(){
        var self = this;
        var reader = new FileReader();
        reader.readAsDataURL($('#file2')[0].files[0]);
        reader.onload = function () {
          self.uploadPic1 = reader.result;
        }
      },
      shareget(){
        this.share1 = true;
      },
      askChoose(status){
        if (status != this.askStatus) {
          this.load5 = true;
          this.load6 = false;
          this.arr = [];
          this.load4 = false;
          this.pageNo = '1';
          this.askStatus = status;
          if (window.location.href.indexOf('vid') != -1) {
            this.postData('post', '/shop-v2-ask_lst.html', {
              source_type: 1,
              source_id: this.$route.query.vid,
              page: this.pageNo,
              status: status
            }).then(res => {
              this.arr = res.data;
              if (res.data.length == 0) {
                this.load6 = true;
              }
              this.load5 = false;
            });
          } else if (window.location.href.indexOf('ser_id') != -1) {
            this.postData('post', '/shop-v2-ask_lst.html', {
              source_type: 2,
              source_id: this.$route.query.ser_id,
              page: this.pageNo,
              status: status
            }).then(res => {
              this.arr = res.data;
              if (res.data.length == 0) {
                this.load6 = true;
              }
              this.load5 = false;
            });
          }
          if (status == 0) {
            this.clickthis1 = true;
            this.clickthis2 = false;
            this.clickthis3 = false;
          } else if (status == 1) {
            this.clickthis1 = false;
            this.clickthis2 = true;
            this.clickthis3 = false;
          } else if (status == 2) {
            this.clickthis1 = false;
            this.clickthis2 = false;
            this.clickthis3 = true;
          }
        }
      },
      tip(){
        this.kefu = true;
        this.kefu1 = true;
        if (this.kefuPic == undefined || this.kefuPic == '') {
          this.getData('get', '/shop-v1-index_basemsg.html').then(res => {
            this.kefuPic = res.data.kefu_qrcode;
            this.arr2 = res.data;
          })
        }
      },
      upDown(){
        if (this.ifFree == 1 || this.isBuy == 2) {
          if ($('#bianjie').height() == 0) {
            $('#bianjie').animate({height: '3.2rem'})
            $('.service').eq(0).find('i').removeClass('icon-shangla').attr('class', 'iconfont icon-xiala')
          } else {
            $('#bianjie').animate({height: '0px'});
            $('.service').eq(0).find('i').removeClass('icon-xiala').attr('class', 'iconfont icon-shangla')
          }
        } else {
          if ($('#bianjie').height() == 0) {
            $('#bianjie').animate({height: '2.4rem'})
            $('.service').eq(0).find('i').removeClass('icon-shangla').attr('class', 'iconfont icon-xiala')
          } else {
            $('#bianjie').animate({height: '0px'});
            $('.service').eq(0).find('i').removeClass('icon-xiala').attr('class', 'iconfont icon-shangla')
          }
        }
      },
      shouluo(){
        if ($('#queTip').height() == 0) {
          $('#queTip').animate({height: '1.7rem'})
          $('.questatus').eq(1).find('i').removeClass('icon-xiala').attr('class', 'iconfont icon-shangla')
        } else {
          $('#queTip').animate({height: '0rem'});
          $('.questatus').eq(1).find('i').removeClass('icon-shangla').attr('class', 'iconfont icon-xiala')
        }
      },
      touch(){
        this.kefu = false;
        this.kefu1 = false;
        this.invite = false;
        // this.codeOut = false;
      },
      activeTil($event, index, ifFree, number, foreshow){
        this.height1 = false;
        $('iframe').css('height', '4.52rem');
        $('.headers').css('height', '4.52rem');
        if (foreshow == 1) {
          Toast({
            message: '预告片，还未上线',
            duraction: 500
          });
          return false;
        }
        if (this.ifFree == 1 || this.ifBuy == false) {
          var data = {
            'index': number,
            'id': index,
            'typeId': this.$route.query.ser_id,
          }
          data = JSON.stringify(data)
          localStorage.setItem(this.$route.query.ser_id, data)

        }
        this.picDan = true;
        this.videoUrl = '';
        $('iframe').css('height', '4.52rem;');
        $('.headers').css('height', '4.52rem;');
        var listLen = document.getElementsByClassName('listBox_li').length;
        for (let i = 0; i < $('.listBox_li').length; i++) {
          if ($('.listBox_li').eq(i).find('i').css('color') != 'rgb(153, 153, 153)') {
            $('.listBox_li').eq(i).find('span').css('color', '#222');
            if ($('.listBox_li').eq(i).find('img').attr('class').indexOf('noBuy') != -1) {
              // $('.listBox_li').eq(i).find('i').css('color', '#888');
              $('.listBox_li').eq(i).find('img').attr('src', '../../../static/img/home/home_lock.png');
            } else {
              // $('.listBox_li').eq(i).find('i').css('color', '#222');
              $('.listBox_li').eq(i).find('img').attr('src', '../../../static/img/home/home_play_mini.png');
            }
          }
        }
        console.log($($event.currentTarget))
        $($event.currentTarget).find('img').attr('src', '../../../static/img/home/home_play_mini_hover.png')
        $($event.currentTarget).find('i').css('color', '#888');
        $($event.currentTarget).find('span').css('color', '#888');
        this.postData('post', '/shop-v1-series_detail.html', {lst_id: index}).then(res => {
          if (res.data != null) {
            this.title = res.data.title;
            if (this.intro != '') {
              this.intro = res.data.intro;
            }
            this.fenmian = res.data.pic;
            this.type_id = res.data.type_id;
            $('html,body').animate({scrollTop: 0});
            if (res.data.type_id == 3) {
              this.tiptip = '付费内容，请购买后收听';
            } else {
              this.tiptip = '付费内容，请购买后观看';
            }
          }
        });
        this.playIcon = true;
        this.noFree = false;
        this.lstId = index;
        if (this.ifFree == 1) {
          this.ifPlay = true;
        } else {
          if (ifFree == 1) {
            this.ifPlay = true;
          } else {
            if (this.ifBuy == 1) {
              this.ifPlay = false;
            } else {
              this.ifPlay = true;
            }
          }
        }
      },
      paly(){
        // iftrue=true就是不能播反之可以播
        this.img1 = false;
        var self = this;
        if (window.location.href.indexOf('ser_id') != -1) {
          if (this.lstId != '') {
            if (this.ifPlay == true) {
              this.postData('post', '/shop-play-index.html', {type: '2', id: this.lstId}).then(res => {
                if (this.type_id == 2) {
                  window.location.href = res.data.url;
                } else if (this.type_id == 3) {
                  this.videoUrl = res.data.url;
                  this.picDan = false;
                  $('iframe').css('height', '1.7rem');
                  $('.headers').css('height', '1.7rem');
                } else {
                  window.location.href = res.data.url;
                  // this.videoUrl = res.data.url;
                  // this.picDan = false;
                }
              })
            } else {
              this.fenmian = null;
              this.noFree = true;
              this.playIcon = false;
            }
          } else if (this.videoDemo != '') {
            if (this.type_id == 2) {
              window.location.href = this.videoDemo;
            } else if (this.type_id == 3) {
              this.videoUrl = this.videoDemo;
              this.picDan = false;
              $('iframe').css('height', '1.7rem');
              $('.headers').css('height', '1.7rem');
            } else {
              window.location.href = this.videoDemo;
            }
          } else {
            // this.popupVisible = true;
            // setTimeout(function(){
            // 	self.popupVisible = false;
            // },1000);
            var id = $('.listBox_inner').eq(0).find('li').eq(0).attr('data-id');
            var free = $('.listBox_inner').eq(0).find('li').eq(0).attr('data-free');
            if (this.isBuy == 2 || this.ifFree == 1 || free == 1) {
              this.postData('post', '/shop-play-index.html', {type: '2', id: id}).then(res => {
                if (this.type_id == 2) {
                  window.location.href = res.data.url;
                } else if (this.type_id == 3) {
                  this.videoUrl = res.data.url;
                  this.picDan = false;
                  $('iframe').css('height', '1.7rem');
                  $('.headers').css('height', '1.7rem');
                } else {
                  window.location.href = res.data.url;
                  // this.videoUrl = res.data.url;
                  // this.picDan = false;
                }
              })
            } else {
              this.fenmian = null;
              this.noFree = true;
              this.playIcon = false;
            }

          }
        } else if (window.location.href.indexOf('vid') != -1) {
          if (this.ifFree == 1) {
            // 费免
            this.postData('post', '/shop-play-index.html', {type: '1', id: this.$route.query.vid}).then(res => {
              if (res.data != null) {
                if (this.type_id == 2) {
                  window.location.href = res.data.url;
                } else {
                  this.videoUrl = res.data.url;
                  this.picDan = false;
                }
              }
            })
          } else {
            // 不免费
            if (this.ifBuy == true) {
              // 未购买
              this.fenmian = null;
              this.noFree = true;
              this.playIcon = false;
            } else if (this.ifBuy == false) {
              // 已购买
              this.postData('post', '/shop-play-index.html', {type: '1', id: this.$route.query.vid}).then(res => {
                if (res.data != null) {
                  if (this.type_id == 2) {
                    window.location.href = res.data.url;
                  } else {
                    this.videoUrl = res.data.url;
                    this.picDan = false;
                  }
                }
              })
            }
          }
        }
      },
      toPayDemo(){
        // if (window.location.href.indexOf('vid') != -1) {
        //   this.$router.push({path: '/toPay', query: {'vid': this.$route.query.vid, 'type': '1', 'order_type': '1'}})
        // } else if (window.location.href.indexOf('ser_id') != -1) {
        //   this.$router.push({
        //     path: '/toPay',
        //     query: {'ser_id': this.$route.query.ser_id, 'type': '2', 'order_type': '1'}
        //   })
        // }
        this.ifgetinfo = true;
        this.ifpay = true;
      },
      inviteclick(){
        this.invite = true;
        this.kefu1 = true;

        //新的分享
        if (window.location.href.indexOf('vid') != -1) {
          var new_id = this.$route.query.vid;
          this.$router.push({
            path: '/commission',
            query: {'vid': new_id}
          })
        } else if (window.location.href.indexOf('ser_id') != -1) {
          var new_id = this.$route.query.ser_id;
          this.$router.push({
            path: '/commission',
            query: {'ser_id': new_id}
          })
        }


      },
      son(){
        this.liwu1 = true;
        this.liwu = true;

      },
      hide(){
        this.liwu1 = false;
        this.liwu = false;
        this.ifpay = false;

      },
      topayGive(){

//          传递赠送课程数量
//          this.liwuNum

        if (window.location.href.indexOf('vid') != -1) {
          this.$router.push({
            path: '/toPay',
            query: {'vid': this.$route.query.vid, 'type': '1', 'order_type': '2', 'number': this.liwuNum}
          })
        } else if (window.location.href.indexOf('ser_id') != -1) {
          this.$router.push({
            path: '/toPay',
            query: {'ser_id': this.$route.query.ser_id, 'type': '2', 'order_type': '2', 'number': this.liwuNum}
          })
        }
      },
      quiz(){
        this.ifAsk = true;
        this.askshow = false;
        this.headers = false;
        this.nav = false;
        $('.kuaijie').css('display', 'none');
        this.postData('post', '/shop-v2-ask_get_fee.html', {fee_type: 1, is_public: 1}).then(res => {
          this.gongkaiqian = res.data.total_fee;
          this.tiwenqian = res.data.total_fee;
        })
      },
      goBack(){
        this.ifAsk = false;
        this.askshow = true;
        this.headers = true;
        this.nav = true;
        $('.kuaijie').css('display', 'block')
      },
      payAsk(){
        if (this.textBox.length < 5) {
          Toast({
            message: '提问内容最少要5字以上',
            duraction: 500
          })
          return false;
        }
        Indicator.open('正在提交，请稍后...');
        var self = this;
        if (this.picked == false) {
          var picked = 0;
        } else {
          var picked = 1;
        }
        if (window.location.href.indexOf('ser_id') != -1) {
          var formdata = new FormData();
          formdata.append('pic1', $('#file')[0].files[0]);
          formdata.append('pic2', $('#file2')[0].files[0]);
          formdata.append('source_type', '2');
          formdata.append('question', this.textBox);
          formdata.append('is_public', picked);
          formdata.append('source_id', this.$route.query.ser_id);
          this.uploadPic('post', '/shop-v2-ask_question.html', formdata).then(res => {
            if (res.status == 200) {
              if (res.data.status == 1) {
                Indicator.close();
                self.$router.push({
                  path: 'toPay',
                  query: {
                    type: 2,
                    askId: res.data.id,
                    order_type: 1,
                    ser_id: self.$route.query.ser_id,
                    is_public: picked
                  }
                })
              } else if (res.data.status == 0) {
                Indicator.close();
                Toast({
                  message: res.data.msg,
                  duraction: 500
                })
              }
            }
          })
        } else if (window.location.href.indexOf('vid') != -1) {
          var formdata = new FormData();
          formdata.append('pic1', $('#file')[0].files[0]);
          formdata.append('pic2', $('#file2')[0].files[0]);
          formdata.append('source_type', '1');
          formdata.append('question', this.textBox);
          formdata.append('is_public', picked);
          formdata.append('source_id', this.$route.query.vid);
          this.uploadPic('post', '/shop-v2-ask_question.html', formdata).then(res => {
            if (res.status == 200) {
              if (res.data.status == 1) {
                Indicator.close();
                self.$router.push({
                  path: 'toPay',
                  query: {type: 1, askId: res.data.id, order_type: 1, vid: self.$route.query.vid, is_public: picked}
                })
              } else if (res.data.status == 0) {
                Indicator.close();
                Toast({
                  message: res.data.msg,
                  duraction: 500
                })
              }
            }
          })
        }
      },
      tap(id){
        var self = this;
        var IntervalName;
        if ($('#audio').attr('src') == undefined || $('#audio').attr('src') == '') {
          play()
          return false;
        } else {
          $('#audio').attr('src', '')
          return false
        }
        function play() {
          if (window.location.href.indexOf('ser_id') != -1) {
            $.ajax({
              type: 'post',
              async: false,
              url: self.global.globalBaseUrl + '/shop-v1-ask_cat_answer.html',
              data: {type: '2', id: id},
              xhrFields: {
                withCredentials: true
              },
              crossDomain: true,
              success: function (res) {
                res = eval('(' + res + ')');
                if (res.status == 1) {
                  $('#audio').attr('src', res.voice);
                  IntervalName = setInterval(function () {
                    if (self.playing == true && self.playing2 == true) {
                      self.playing = false;
                      self.playing2 = false;
                    } else if (self.playing == false && self.playing2 == false) {
                      self.playing = true;
                      self.playing2 = false;
                    } else if (self.playing == true && self.playing2 == false) {
                      self.playing = true;
                      self.playing2 = true;
                    }
                    if ($('#audio').attr('src') == undefined || $('#audio').attr('src') == '') {
                      window.clearInterval(IntervalName);
                      self.playing = true;
                      self.playing2 = true;
                    }
                  }, 400)
                  audio.addEventListener('ended', function () {
                    window.clearInterval(IntervalName);
                    self.playing = true;
                    self.playing2 = true;
                    $('#audio').attr('src', '')
                  }, false);
                } else if (res.status == 0) {
                  // MessageBox.confirm('需付费收听，是否跳转到支付页面?').then(action => {
                  // 	self.$router.push({path:'/toPay',query:{type:'2',askId:id,order_type:'2',ser_id:self.$route.query.ser_id}})
                  // });
                }
                $("audio")[0].play();
              }
            })
          } else if (window.location.href.indexOf('vid') != -1) {
            $.ajax({
              type: 'post',
              async: false,
              url: self.global.globalBaseUrl + '/shop-v1-ask_cat_answer.html',
              data: {type: '1', id: id},
              xhrFields: {
                withCredentials: true
              },
              crossDomain: true,
              success: function (res) {
                res = eval('(' + res + ')');
                if (res.status == 1) {
                  $('#audio').attr('src', res.voice)
                } else if (res.status == 0) {
                  // MessageBox.confirm('是否跳到支付页面?').then(action => {
                  // 	self.$router.push({path:'/toPay',query:{type:'1',askId:id,order_type:'2',vid:self.$route.query.vid}})
                  // });
                }
                $("audio")[0].play();
              }
            })
          }
        }
      },
//      隐藏按键函数
      hideBtn(){
        $('#navBox').hide();
      },
      relation(){//关联
        this.relation_show = true;
        this.relationBg = true;
        if (window.location.href.indexOf('ser_id') != -1) {
          var source_type = 2
        } else {
          var source_type = 1
        }
        if (window.location.href.indexOf('ser_id') != -1) {
          var idd = this.$route.query.ser_id
        } else {
          var idd = this.$route.query.vid
        }
        this.postData('post', '/shop-v1-video_relation_goods.html', {'r_id': idd, 'type': source_type}).then(res => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              //判断没有数据
            }
            if (res.data.status == 1) {
              this.relationData = res.data.list;
              this.shop_id = res.data.shop_id;
            }
          }
        })

      },
      relationBtn(){//收起关联
        this.relation_show = false;
        this.relationBg = false;
      },
      purchase(goods_id){//立即购买跳转详情页
        if (window.location.href.indexOf('vid') != -1) {
          this.$router.push({
            path: '/goodDetails',
            query: {'vid': this.$route.query.vid, 'type': '1', 'shop_id': this.shop_id, 'goods_id': goods_id}
          })
        } else if (window.location.href.indexOf('ser_id') != -1) {
          this.$router.push({
            path: '/goodDetails',
            query: {'ser_id': this.$route.query.ser_id, 'type': '2', 'shop_id': this.shop_id, 'goods_id': goods_id}
          })
        }

      },
      toAdd(){
        this.liwuNum++;
        this.liwuPrice = (this.lists.total_fee * this.liwuNum).toFixed(2);
      },
      toReduce(){
        let num = this.liwuNum;
        if (num > 1) {
          this.liwuNum--;
          this.liwuPrice = (this.lists.total_fee * this.liwuNum).toFixed(2);
        } else {
          Toast({
            message: '赠送课程数量不能小于1',
            duraction: 500
          });
        }
      }
    },
    components: {
      detailquestions, nodata, loadNo, groupBuying, footer1, payBox, giftBox
    },
    destroyed(){
    },
    watch: {
      selected(val){
        if (val == '3') {
          this.ifAsk = false;
          this.askshow = true;
          Indicator.open()
          if (window.location.href.indexOf('ser_id') != -1) {
            var idd = this.$route.query.ser_id
          } else {
            var idd = this.$route.query.vid
          }
          this.pageNo = 1;
          this.load4 = false;
          this.postData('post', '/shop-v2-ask_get_fee.html', {fee_type: 2, is_public: 1}).then(res => {
            this.overheard = res.data.total_fee;
          })
          if (window.location.href.indexOf('vid') != -1) {
            this.postData('post', '/shop-v2-ask_lst.html', {
              source_id: this.$route.query.vid,
              page: this.pageNo,
              status: '2',
              source_type: 1
            }).then(res => {
              Indicator.close()
              this.load5 = false;
              this.arr = res.data;
              if (res.data.length == 0) {
                this.load6 = true;
              }
            })
          } else if (window.location.href.indexOf('ser_id') != -1) {
            this.postData('post', '/shop-v2-ask_lst.html', {
              source_id: this.$route.query.ser_id,
              page: this.pageNo,
              status: '2',
              source_type: 2
            }).then(res => {
              Indicator.close()
              this.load5 = false;
              this.arr = res.data;
              if (res.data.length == 0) {
                this.load6 = true;
              }
            })
          }
        }
      },
      picked(val, oldval){
        if (val == true) {
          this.ifxuan = true;
          this.questatus = '公开提问';
          this.tiwenqian = this.gongkaiqian;
        } else {
          this.ifxuan = false;
          this.questatus = '私密提问'
          if (this.yinsiqian == '') {
            this.postData('post', '/shop-v2-ask_get_fee.html', {fee_type: 1, is_public: 0}).then(res => {
              this.yinsiqian = res.data.total_fee;
              this.tiwenqian = res.data.total_fee;
            })
          } else {
            this.tiwenqian = this.yinsiqian;
          }
        }
      },
      textBox(val, oldval){
        if (val.length > 50) {
          Toast({
            message: '字数不能超过50个',
            duraction: 500
          });
          this.textBox = oldval;
        }
      },
    },
    filters: {
      zhengshu(val){
        val = Math.round(val);
        return val;
      }
    }
  }
</script>

<style lang="less">
  @height: 4.52rem;
  .detailsPage {
    height: 100vh;
    .sharetop {
      .share {
        width: 1.6rem;
        height: 0.45rem;
        background-color: #EF4949;
        position: absolute;
        top: 0.4rem;
        right: 0;
        color: #fff;
        border-radius: 0.45rem 0rem 0rem 0.45rem;
        z-index: 11;
        i {
          position: relative;
          top: 0.02rem;
        }
        span {
          position: relative;
          top: -0.07rem;
        }
      }
    }
    .note {
      height: 6.1rem;
      width: calc(100% - 0.34rem);
      background: #fff;
      border: 0px;
      outline-style: none;
      padding: 0.17rem;
      font-size: 0.28rem;
    }
    .height1 {
      height: 1.7rem;
    }
    .uploadPic {
      height: 0.6rem;
      width: 100%;
      background-color: #fff;
      position: relative;
      top: -0.2rem;
      i {
        font-size: 0.4rem;
        color: #666;
        margin-right: 0.2rem;
        float: right;
      }
      img {
        height: 0.4rem;
        float: right;
        margin-right: 0.2rem;
      }
      input {
        display: none;
        opacity: 0;
      }
    }
    .descUp {
      height: 1.2rem;
      background-color: #fff;
      width: 100%;
      display: table;
      margin-bottom: 0.1rem;
    }
    .descUp > div {
      display: table-cell;
      vertical-align: middle;
      padding: 0 0.17rem;
    }
    .descUp p {
      font-weight: 500;
      font-size: 0.24rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 0.05rem;
      color: #333;
    }
    .descUp span {
      position: relative;
      top: -0.04rem;
      margin-left: 0.05rem;
      color: #999;
    }
    .descUp i {
      font-size: 0.3rem;
      color: #999;
    }
    .tiwen {
      height: 0.88rem;
      padding-top: 0.15rem;
      font-size: 0.26rem;
    }
    .tiwen li {
      float: left;
      text-align: center;
      width: 100%;
      span {
        // width: 2.94rem;
        width: 6rem;
        height: 0.69rem;
        display: inline-block;
        line-height: 0.69rem;
        color: #fff;
        border-radius: 0.1rem;
      }
    }
    .queTip {
      background-color: #fff;
      height: 1.7rem;
      overflow: hidden;
      font-size: 0.22rem;
      padding: 0rem 0.15rem;
      div {
        line-height: 0.4rem;
        color: #666;
      }
    }
    .questatus {
      height: 0.8rem;
      background-color: #fff;
      line-height: 0.8rem;
      font-size: 0.26rem;
      color: #333;
      padding-left: 0.15rem;
      position: relative;
      border-bottom: 1px solid #f1f2f6;
      .gou {
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 100%;
        border: 1px solid #ddd;
        display: inline-block;
        float: right;
        position: absolute;
        top: 0.2rem;
        right: 0.15rem;
      }
      .xuan {
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 100%;
        background-color: rgb(94, 150, 208);
        display: inline-block;
        position: absolute;
        i {
          position: relative;
          top: -0.2rem;
          color: #fff;
          font-size: 0.33rem;
        }
      }
      input {
        float: right;
        display: inline-block;
        position: absolute;
        top: 0.28rem;
        right: 0.2rem;
        z-index: 1;
        opacity: 0;
      }
      i.icon-shangla,
      i.icon-xiala {
        float: right;
        margin-right: 0.12rem;
        color: #ddd;
      }
    }
  }

  .detailsPage .load {
    text-align: center;
  }

  .detailsPage .clickthis {
    background-color: #fcab53;
  }

  .detailsPage .askStatus {
    height: 0.8rem;
    width: 100%;
    background-color: rgb(28, 36, 44);
  }

  .detailsPage .askStatus span {
    color: #fff;
    line-height: 0.8rem;
    padding: 0.05rem 0.1rem;
    margin-left: 0.2rem;
  }

  .detailsPage .askStatus span:nth-child(1) {
    margin-left: 0.4rem;
  }

  .detailsPage .red {
    background-color: red;
  }

  .detailsPage .ask2 {
    position: fixed;
    bottom: 0;
    height: 0.8rem;
    line-height: 0.8rem;
    width: 100%;
    font-size: 0.3rem;
  }

  .detailsPage .ask2 ul {
    width: 100%;
    color: #fff;
  }

  .detailsPage .ask2 ul li {
    float: left;
    width: 50%;
    text-align: center;
  }

  .detailsPage .ask2 ul li:nth-child(1) {
    background-color: #f3942e;
  }

  .detailsPage .ask2 ul li:nth-child(2) {
    background-color: #1b242b;
  }

  .detailsPage .yuan {
    width: 0.22rem;
    height: 0.22rem;
    border-radius: 0.22rem;
    border: 1px solid #cccccc;
    display: inline-block;
    position: relative;
    top: 0.03rem;
    margin-right: 0.1rem;
  }

  .detailsPage .askText {
    width: calc(100% - 5.4rem);
    height: 1.96rem;
    border: 0;
    font-size: 0.26rem;
    color: #333;
    padding: 0.3rem 0.2rem;
    outline-style: none;
    letter-spacing: 1px;
  }

  .detailsPage .publicStatus {
    height: 0.6rem;
    width: 100%;
    background-color: #fff;
  }

  .detailsPage .publicStatus input {
    position: absolute;
    left: 1.13rem;
    top: 0.2rem;
    opacity: 0;
  }

  .detailsPage .publicStatus ul li {
    float: left;
    width: 50%;
    text-align: center;
    line-height: 0.6rem;
    color: #666;
    position: relative;
    font-size: 0.28rem;
  }

  .detailsPage .ask {
    height: 0.8rem;
    width: 100%;
    background-color: #fff;
    color: #fff;
    position: fixed;
    bottom: 0;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.26rem;
    // border-top: 1px solid #ddd;
  }

  .detailsPage .ask1 {
    background-color: rgb(254, 88, 117);
  }

  .detailsPage .ask .icon-zuola {
    position: absolute;
    left: 0.1rem;
    color: #666;
  }

  .detailsPage .ask .icon-pinglun2 {
    position: absolute;
    right: 0.2rem;
    color: #666;
  }

  .detailsPage .answer .name {
    font-size: 0.24rem;
  }

  .detailsPage .answer .voice {
    // height: 0.8rem;
    // width: 4rem;
    // background-color: #fe5875;
    // display: inline-block;
    //   	border-radius: 0.8rem;
    //   	margin-top: 0.2rem;
    //   	text-align: center;
    //   	position: relative;
  }

  .detailsPage .answer .voice i {
    position: absolute;
    color: #fff;
    line-height: 0.8rem;
    left: 0.2rem;
  }

  .detailsPage .answer .voice span {
    line-height: 0.8rem;
    color: #fff;
    font-size: 0.26rem;
    display: inline-block;
  }

  .detailsPage .mint-navbar {
    height: 0.92rem;
    background: #fff;
    margin-bottom: 0.2rem;
    // border-bottom: 1px solid #ddd;
  }

  .detailsPage .mint-tab-item-label {
    font-size: 0.3rem;
    line-height: 0.88rem;
    /*color: #666;*/
  }

  .detailsPage .mint-tab-item-label .xialine {
    height: 0.04rem;
    width: 0.62rem;
    background-color: #222;
    margin-left: calc(~"50% - 0.31rem");
    position: relative;
    top: -0.02rem;
  }

  @media screen and (min-width: 414px) {
    #app .detailsPage .mint-tab-item-label {
      line-height: 0.8rem;
    }

    .detailsPage .mint-tab-item-label .xialine {
      height: 0.04rem;
      width: 0.62rem;
      background-color: #222;
      margin-left: calc(~"50% - 0.31rem");
      position: relative;
      top: 0.02rem;
      border-radius: 0.02rem;
    }
  }

  .detailsPage .mint-tab-item {
    color: #fff;
  }

  .detailsPage .mint-navbar .mint-tab-item {
    padding: 0;
    color: #999
  }

  .detailsPage .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 1px solid #fff;
    color: #222;
    margin-bottom: -1px;
  }

  .detailsPage .inviteCodeOut {
    width: 100%;
    position: fixed;
    top: 1rem;
    z-index: 3;
    opacity: 0;
    width: 5rem;
    margin-left: 0.7rem;
  }

  .detailsPage .mint-popup {
    padding: 0.2rem 0.2rem;
    font-size: 0.27rem;
  }

  .detailsPage .inviteCodeOut1 {
    width: 100%;
    position: fixed;
    top: 6rem;
    z-index: 3;
    opacity: 0;
    width: 5rem;
    margin-left: 0.7rem;
  }

  .invite {
    background: url(../../../static/img/invite/invitebg.png);
    background-size: 100% 100%;
    width: 5.12rem;
    height: 8.33rem;
    &_pic {
      height: 2.9868rem;
      width: 4.6082rem;
      margin: 0 auto;
      position: relative;
      top: 0.17rem;
      overflow: hidden;
      .img222 {
        width: 4.6082rem;
      }
    }
    &_one {
      width: 4.1rem;
      margin: 0 auto;
      margin-top: 0.426rem;
      display: table;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.256rem;
      position: relative;
      .invite_tou {
        width: 0.77rem;
        height: 0.77rem;
        border-radius: 50%;
        display: inline-block;
        img {
          width: 0.77rem;
          height: 0.77rem;
          border-radius: 50%;
        }
      }
      .invite_table {
        display: table-cell;
        vertical-align: middle;
        position: relative;
        left: -0.25rem;
        div:nth-child(1) {
          font-size: 0.238rem;
          color: #333;
          font-weight: 500rem;
        }
        div:nth-child(2) {
          font-size: 0.222rem;
          color: #666;
        }
      }
      .img111 {
        position: absolute;
        width: 1.8rem;
        right: -0.4rem;
        top: -0.2rem;
      }
    }
    &_title {
      text-align: center;
      font-size: 0.25rem;
      font-weight: bold;
      width: 4.5rem;
      margin: 0 auto;
      margin-top: 0.256rem;
    }
    &_name {
      font-size: 0.221rem;
      text-align: center;
    }
  }

  .detailsPage .bg, .bg1 {
    background: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
  }

  .kefuCode {
    position: fixed;
    z-index: 2;
    width: 5rem;
    height: 5.5rem;
    background-color: #fff;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 0.06rem;
    background-image: url(/static/img/college/my_QRcode_bg.png);
    background-size: 100%;
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

  #box .bgColor {
    background: rgb(71, 118, 230);
    color: #fff;
  }

  #box .yanse {
    color: #888;
  }

  #box .showThis {
    color: #fcab53;
    border-bottom: 0.03rem solid #fcab53;
  }

  #box {
    height: 100%;
  }

  .brief img {
    width: 100%;
  }

  .picDan {
    height: @height;
    width: 100%;
    background-color: #000;
    position: absolute;
    top: 0;
    .qiapianx:before {
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
      background-color: #5e96d0;
      border-radius: 100%;
      height: 0.43rem;
      width: 0.43rem;
      font-size: 0.3rem;
      line-height: 0.43rem;
      position: absolute;
      right: 0.15rem;
    }
  }

  .picDan .icon-play:before {
    color: #fff;
    line-height: 4rem;
    font-size: 1.15rem;
  }

  .picDan .icon-qiapianx:before {
    font-size: 0.3rem;
  }

  .picDan img {
    position: absolute;
    top: 0;
    left: 0;
    // height: 4rem;
    width: 100%;
  }

  .tipNoFree {
    position: absolute;
    color: #fff;
    top: 0;
    line-height: 4.92rem;
    font-size: 0.5rem;
    left: 1rem;
  }

  .buyed {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    background-color: #000;
    text-align: center;
    line-height: 1rem;
    color: #fff;
    font-size: 0.26rem;
  }

  iframe {
    height: @height;
    width: 100%;
    border: 0px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .video-js {
    width: 100%;
    height: 240px;
  }

  #box {
    font-size: 0.2rem;
  }

  .headerNav {
    display: flex;
    border-bottom: 0.02rem solid #808080;
    height: 0.6rem;
    padding: 0.1rem;
    background: #1b242b;
  }

  .headerNav > a, .headerNav > div {
    display: block;
    flex: 1;
    text-align: center;
    font-size: 0.26rem;
    color: #cecece;
    padding-top: 0.13rem;
  }

  .headerNav span {
    position: relative;
    top: -0.03rem;
  }

  .headerNav > a:nth-child(2) {
    border-left: 0.01rem solid #666;
    border-right: 0.01rem solid #666;
  }

  .headerNav i {
    font-size: 0.3rem;
    line-height: 0.35rem;
  }

  .headers {
    text-align: center;
    height: @height;
    background: #fff;
    position: relative;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    border-bottom: 1px solid #eee;
    .share {
      width: 1.6rem;
      height: 0.45rem;
      background-color: #EF4949;
      position: absolute;
      top: 0.4rem;
      right: 0;
      color: #fff;
      border-radius: 0.45rem 0rem 0rem 0.45rem;
      i {
        position: relative;
        top: 0.02rem;
      }
      span {
        position: relative;
        top: -0.07rem;
      }
    }
  }

  .headers .titleList {
    height: 0.6rem;
    width: 100%;
    position: absolute;
    bottom: 0.1rem;
    background: rgba(0, 0, 0, 0);
    // line-height: 0.6rem;
    color: #fff;
    font-size: 0.38rem;
    font-weight: 500;
  }

  .headers .bg06 {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
  }

  .headers .titleList p {
    width: calc(100% - 20px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
    text-align: left;
    font-weight: bold;
  }

  .detailsPage .title {
    color: #ceceec;
    height: 0.65rem;
    line-height: 0.65rem;
    font-size: 0.23rem;
    text-align: center;
    background: #1b242b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .detailsPage .middle {
    height: 0.65rem;
    display: flex;
    background: #0f171e;
    line-height: 0.45rem;
    font-size: 0.23rem;
  }

  .detailsPage .middle > div {
    flex: 1;
    text-align: center;
    border-bottom: 0.03rem solid #0f171e;
    padding: 0.1rem 0;
  }

  .detailsPage .mint-tab-container-wrap {
    display: block;
  }

  .listBox {
    border-bottom: 0.03rem solid #fcab53;
    color: #cecece;
  }

  .listBox_li {
    height: 1rem;
    overflow: hidden;
  }

  .listBox_li span {
    display: inline-block;
    position: relative;
    width: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1rem;
    color: #222;
    font-size: 0.26rem;
    // font-size: 12px;
  }

  .icon-play:before, .icon-suo:before {
    position: relative;
    top: 0.2rem;
  }

  .listBox_inner {
    background-color: #fff;
    .noBuy {
      color: #888;
      div {
        color: #222;
      }
    }
  }

  .listBox_inner li {
    font-size: 0.23rem;
    border-bottom: 1px solid #eee;
    width: calc(~"100% - 0.6rem");
    margin: 0 auto;
  }

  .listBox_inner i {
    font-size: 0.4rem;
    font-weight: bolder;
    float: right;
    margin-right: 0.3rem;
    color: #222;
  }

  .briefBox {
    color: #cecece;
  }

  /*.detailsPage p:nth-child(3) {*/
  // .detailsPage .  p{
  //   padding: 0.2rem 0.5rem 0.1rem;
  //   font-size: 0.26rem;
  //   color: black;
  //   font-weight: bolder;
  // }

  .detailsPage .recommend {
    /*display: flex;*/
    padding: 0 0.5rem 0.2rem;
    /*float: left;*/
  }

  .recommend li {
    float: left;
    width: 50%;
    /*max-width: 4.5rem;*/
    flex: 1;
    padding: 0.05rem;
    display: inline-block;
    box-sizing: border-box;
  }

  .recommend img, .recommend span {
    display: block;
    width: 100%;
    text-align: center;
    color: #6b6b6b;
    font-size: 0.2rem;
  }

  .recommend span {
    margin-top: 0.05rem;
  }

  .detailsPage .recommend img {
    height: 1.9rem;
  }

  #navBox {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    height: 1rem;
    background-color: #fff;
    color: #fff;
    font-size: 0.26rem;
    color: #222;
    border-top: 1px solid #eee;
    .needbuy {
      width: 100%;
      display: table;
      height: 1rem;
      &-info {
        display: inline-block;
        vertical-align: top;
        margin-left: 0.32rem;
        width: 0.6rem;
        text-align: center;
        img {
          height: 0.46rem;
          margin-top: 0.15rem;
        }
        div {
          color: #222;
          font-size: 0.22rem;
          position: relative;
          top: -0.03rem;
        }
      }
      &-sale {
        line-height: 1rem;
        text-decoration: line-through;
        color: #999;
        margin-right: 0.3rem;
        font-size: 0.28rem;
      }
      &-price {
        display: inline-block;
        vertical-align: top;
        border-radius: 3px;
        font-size: 0.28rem;
        padding-left: 0.38rem;
        padding-right: 0.38rem;
        background-color: #222;
        color: #fff;
        height: 0.76rem;
        overflow: hidden;
        line-height: 0.76rem;
        float: right;
        margin-right: 0.32rem;
        font-size: 0.28rem;
        margin-top: 0.14rem;
      }
    }
  }

  #navBox .kefu {
    background-color: #fff;
  }

  #navBox i {
    font-size: 0.35rem;
    display: block;
    text-align: center;
    margin-top: 0.02rem;
  }

  .share {
    width: 100%;
  }

  /*关联开始*/
  .relation {
    width: 0.8rem;
    /*height: 0.9rem;*/
    background-color: #fe5875;
    color: white;
    position: fixed;
    right: 0;
    top: 1rem;
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    padding: 0.06rem 0;
  }

  .relation > .iconfont {
    font-size: 0.3rem;
  }

  .relation > span {
    font-size: 0.22rem;
    margin-top: -0.5rem;
  }

  .relation_bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .relation_box {
    position: fixed;
    right: 0;
    top: 0;
    width: 80%;
    height: 100%;
    background-color: white;
    z-index: 2;
  }

  .relation_title {
    height: 0.8rem;
    line-height: 0.8rem;
    padding-left: 0.2rem;
    font-size: 0.3rem;
    color: #333333;
  }

  .relation_content {
    padding: 0 0.15rem;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .relation_item {
    background-color: #f2f2f2;
    margin: 0.15rem 0;
  }

  .relation_item:after {
    display: block;
    content: '';
    clear: both;
  }

  .relation_item_pic {
    float: left;
    width: 30%;
    padding: 0.15rem;
  }

  .relation_item_right {
    float: right;
    width: 63%;
    padding: 0.15rem 0;
    height: 1.5rem;
    position: relative;
  }

  .relation_item_title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #333333;
    font-size: 0.26rem;
    /*height: 0.75rem;*/
  }

  .relation_item_price {
    height: 0.75rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    line-height: 0.75rem;
    /*position: relative;*/
  }

  .relation_item_price:after {
    display: block;
    content: "";
    clear: both;
  }

  .relation_item_price > div:first-child {
    font-size: 0.26rem;
    color: #fe5875;
    float: left;
  }

  .relation_item_price > div:last-child {
    width: 1.4rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background-color: #fe5875;
    font-size: 0.25rem;
    color: white;
    border-radius: 0.3rem;
    float: right;
    margin-right: 0.2rem;

  }

  .relation_item_pic > img {
    width: 1.5rem;
    height: 1.5rem;
  }

  .relation_more {
    width: 100%;
    text-align: center;
    font-size: 0.24rem;
    color: #cccccc;
    height: 1.4rem;
  }

  .relation_btn {
    position: absolute;
    width: 10%;
    height: 1.2rem;
    left: -10%;
    top: 50%;
    line-height: 1.2rem;
    border-top-left-radius: 0.15rem;
    border-bottom-left-radius: 0.15rem;
    background-color: white;
  }

  .relation_btn > .iconfont {
    font-size: 0.5rem;
    color: #cccccc;
  }

  .move-enter-active, .move-leave-active {
    transition: all 0.6s cubic-bezier(0, 0, 1, 1);
    transform: translateX(-1%);
  }

  .move-enter, .move-leave-to {
    transition: all 0.6s cubic-bezier(0, 0, 1, 1);
    transform: translateX(100%);
    -moz-transform: translateX(100%);
    -ms-transform: translateX(100%);
    -o-transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }

  /*关联结束*/

  .share > div {
    /*height: 0.8rem;*/
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

  }

  .share > div {
    /*height: 0.8rem;*/
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

  }

  .kuaijie {
    position: fixed;
    bottom: 0.9rem;
    right: -0.15rem;
    z-index: 1;
    .service, .give {
      margin-right: 0.3rem;
      text-align: center;
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }
    .service {
      height: 0.46rem;
      width: 0.8rem;
    }
    .give {
      height: 0.8rem;
      width: 0.8rem;
    }
    i {
      font-size: 0.55rem;
    }
    .give i {
      position: relative;
      top: 0.1rem;
    }
    #bianjie {
      height: 0rem;
      overflow: hidden;
    }
  }

  .icon-kefu {
    color: #26A2FF;
  }

  .icon-liwu {
    color: #04BE02;
  }

  /*弹出礼物的盒子*/
  .liwu {
    &_box {
      background: white;
      width: 80%;
      height: auto;
      margin: 2.8rem 10%;
      border: 1px solid #f1f2f6;
      position: fixed;
      z-index: 999;
      border-radius: 0.1rem;
    }
    &_describe {
      text-align: center;
      color: #666;
      font-size: 0.27rem;
    }
    &_number {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid #f1f2f6;
      margin: 0 0.2rem;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.26rem;
    }
    &_input {
      width: 0.4rem;
      margin-left: 0;
    }
    &_total {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 0.8rem;
      line-height: 0.8rem;
      margin: 0 0.2rem;
      border-top: 1px solid #f1f2f6;
      font-size: 0.24rem;
    }
    &_btn {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      div {
        width: 4.5rem;
        height: 0.8rem;
        background: #fe5875;
        color: white;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 0.15rem;
        font-size: 0.26rem;
        margin-bottom: 0.3rem;

      }
    }
    &_add {
      width: auto;
      margin: auto 0;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.24rem;
      color: #333;
      span {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        text-align: center;
      }
      .jia {
        color: #666;
        border: 1px solid #ccc;
        border-radius: 0 0.1rem 0.1rem 0;
      }
      .jian {
        color: #666;
        border: 1px solid #ccc;
        border-radius: 0.1rem 0 0 0.1rem;
      }
      .num {
        border: 1px solid #ccc;
        border-width: 1px 0;
      }
    }
  }


</style>
