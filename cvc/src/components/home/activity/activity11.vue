<template>
  <div class="activity11">

    <div class="header">
      <img  class="activity11-bg" src="../../../../static/img/tinified/bigbg.png" alt="" ref="logo">
      <div class="top">
          <div class="hrefimg" @click="scrHead()">
            <img src="../../../../static/img/tinified/href1.png" alt="">
          </div>
          <div class="hrefimg" @click="scrCourse()">
            <img src="../../../../static/img/tinified/href2.png" alt="">
          </div>
            <div class="hrefimg" @click="scrFooter()">
              <img src="../../../../static/img/tinified/href3.png" alt="">
            </div>

      </div>
        <div class="title-com"　ref="head">
          <img class="titlebg" src="../../../../static/img/tinified/titlebg.png" alt="">
          <div class="text">大咖疯狂直播夜</div>
        </div>
      <div class="content">
          <div class="left" >
            <img class="quotes1" src="../../../../static/img/tinified/quotes1.png" alt="">

            <div style="font-size: 0.24rem">
              CVC携手行业大咖红人，给你一个属于摄影人的双11狂欢！<br>
              <img class="header-date" src="../../../../static/img/tinified/time.png"><br>
              不间断大咖坐镇，各种风格任你挑，各式话题随你聊！<br>
              <span class="bold">锁定CVC，上帝视角学摄影。</span>
            </div>

            <img class="quotes2" src="../../../../static/img/tinified/quotes2.png" alt="">
          </div>
          <div class="right">
            <div class="right-border">
              <img src="../../../../static/img/tinified/code.jpg" alt="" class="code">
            </div>
            <span class="text" style="font-size: 0.24rem" >扫码回复"1111"报名</span>
          </div>
        </div>

      <div class="foot" >
        <img src="../../../../static/img/tinified/footbg.png" alt="" class="footbg">
      </div>
    </div>

    <div class="main">

      <div class="assemblage" ref="assemblage">
        <div class="title-com">
          <img class="titlebg" src="../../../../static/img/tinified/titlebg.png" alt="">
          <div class="text">精选课程钜惠</div>
        </div>
        <div class="title">
          <img src="../../../../static/img/tinified/titlebg2.png" alt="" class="titlebg">
          <div class="title-wrap">
            全套组合课程 <br>
            <span class="prompting">心动不如行动</span>
            <i class="icon iconfont icon-down-trangle"></i>
          </div>
        </div>
        <div class="content">
          <ul class="list">
            <li class="item">
              <img src="../../../../static/img/tinified/assemblage-bg.png" alt="" class="assemblage-bg">
              <div class="top">
                <img src="../../../../static/img/tinified/discount-bg.png" alt="" class="top_img">
                <span class="top_name">|&nbsp套餐一</span>
              </div>
              <div class="item-radius">
                <img  class="portrait" src="../../../../static/img/tinified/assemblage3.jpg" alt="">
                <p class="author">ALEX PAN</p>
                <p class="date" style="font-size: 0.16rem">婚纱旅拍</p>
              </div>
              <div class="item-count">+</div>
              <div class="item-radius">
                <img  class="portrait" src="../../../../static/img/tinified/assemblage1.jpg" alt="">
                <p class="author">曾宽</p>
                <p class="date" style="font-size: 0.16rem">人像摄影后期进阶课</p>
              </div>
              <div class="item-count">=</div>
              <div class="item-num">
                <a href="http://t.cn/RWFx04G">
                  <div class="portrait">
                    <img src="../../../../static/img/tinified/price1.png" alt="" class="item-num-img">
                    <!--<p>套餐价<span class="price-num">￥699</span></p>-->
                    <!--<span class="price-old">原价：1098</span>-->
                  </div>
                  <span class="btn">立即购买</span>
                </a>
              </div>
            </li>
            <li class="item">
              <img src="../../../../static/img/tinified/assemblage-bg.png" alt="" class="assemblage-bg">
              <div class="top">
                <img src="../../../../static/img/tinified/discount-bg.png" alt="" class="top_img">
                <span class="top_name">|&nbsp套餐二</span>
              </div>
              <div class="item-radius">
                <img  class="portrait" src="../../../../static/img/tinified/assemblage2.jpg" alt="">
                <p class="author">歪猫</p>
                <p class="date" style="font-size: 0.16rem">婚纱人像创新思维实战28课</p>
              </div>
              <div class="item-count">+</div>
              <div class="item-radius">
                <img  class="portrait" src="../../../../static/img/tinified/assemblage1.jpg" alt="">
                <p class="author">曾宽</p>
                <p class="date" style="font-size: 0.16rem">人像摄影后期进阶课</p>
              </div>
              <div class="item-count">=</div>
              <div class="item-num" >
                <a href="http://t.cn/RWFxTqo">
                  <div class="portrait">
                    <img src="../../../../static/img/tinified/price2.png" alt="" class="item-num-img">
                    <!--<p>套餐价<span class="price-num">￥1599</span></p>-->
                    <!--<span class="price-old">原价：1998</span>-->
                  </div>
                  <span class="btn">立即购买</span>
                </a>
              </div>
            </li>
            <li class="item3">
              <img src="../../../../static/img/tinified/assemblage-bg.png" alt="" class="assemblage-bg">
              <div class="top">
                <img src="../../../../static/img/tinified/discount-bg.png" alt="" class="top_img">
                <span class="top_name">|&nbsp套餐三</span>
              </div>
              <div class="item-radius">
                <img  class="portrait" src="../../../../static/img/tinified/assemblage3.jpg" alt="">
                <p class="author">ALEX PAN</p>
                <p class="date" style="font-size: 0.16rem">婚纱旅拍</p>
              </div>
              <div class="item-count">+</div>
              <div class="item-radius">
                <img  class="portrait" src="../../../../static/img/tinified/assemblage1.jpg" alt="">
                <p class="author">曾宽</p>
                <p class="date" style="font-size: 0.16rem">人像摄影后期进阶课</p>
              </div>
              <div class="item-count">+</div>
              <div class="item-radius">
                <img  class="portrait" src="../../../../static/img/tinified/assemblage2.jpg" alt="">
                <p class="author">歪猫</p>
                <p class="date" style="font-size: 0.16rem">婚纱人像创新思维实战28课</p>
              </div>
              <div class="item-count">=</div>
              <div class="item-num">
                <a href="http://t.cn/RWFxQ1Z">
                  <div class="portrait3">
                    <img src="../../../../static/img/tinified/price3.png" alt="" class="item-num-img">
                    <!--<p>套餐价<span class="price-num">￥1999</span></p>-->
                    <!--<span class="price-old">原价：2697</span>-->
                  </div>
                  <span class="btn">立即购买</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="discount">
        <div class="title">
          <img src="../../../../static/img/tinified/titlebg2.png" alt="" class="titlebg">
          <div class="title-wrap">
            <span style="font-size: 0.3rem">爆款限量折扣</span> <br>
            <span class="prompting">(限购1000名)</span>
            <i class="icon iconfont icon-down-trangle"></i>
          </div>
        </div>
        <div class="content">
          <a href="  http://t.cn/RWtcB4B">
            <div class="discount-item">
              <img src="../../../../static/img/tinified/discount3.png" alt="" class="discount-img">
            </div>
          </a>
          <a href="http://t.cn/RON9uaU">
            <div class="discount-item">
              <img src="../../../../static/img/tinified/discount4.png" alt="" class="discount-img">
            </div>
          </a>
        </div>
      </div>

      <div class="course" >

        <div class="title">
          <img src="../../../../static/img/tinified/titlebg2.png" alt="" class="titlebg">
          <div class="title-wrap">
            <span style="font-size: 0.3rem">11.11元特惠秒杀体验课</span> <br>
            <span class="prompting">(限购一次)</span>
            <i class="icon iconfont icon-down-trangle"></i>
          </div>
        </div>
        <div class="content">
            <div class="course-item">
              <a href=" http://t.cn/RWFehzv" class="course-flex">
                <img src="../../../../static/img/tinified/course-top.png" alt="" class="course-top">
                <img class="course-img" src="../../../../static/img/tinified/course1.jpg" alt="">
                <p class="name"><span class="name-bold" style="font-size: 0.24rem">后期&nbsp—&nbsp</span>油画质感风格人像塑造</p>
                <div class="btn">
                  立即抢购
                </div>
              </a>

            </div>
            <div class="course-item">
              <a href="http://t.cn/RWFgqTZ" class="course-flex">
                <img src="../../../../static/img/tinified/course-top.png" alt="" class="course-top">
                <img class="course-img" src="../../../../static/img/tinified/course2.jpg" alt="">
                <p class="name">
                  <span class="name-bold" style="font-size: 0.24rem">摄影&nbsp—&nbsp</span>
                  自然光的使用<br>
                  &nbsp
                </p>
                <div class="btn">
                  立即抢购
                </div>
              </a>
            </div>
            <div class="course-item" >
              <a href="http://t.cn/Rlh2lWi" class="course-flex">
                <img src="../../../../static/img/tinified/course-top.png" alt="" class="course-top">
                <img class="course-img" src="../../../../static/img/tinified/course4.jpg" alt="">
                <p class="name"><span class="name-bold" style="font-size: 0.24rem">创意&nbsp—&nbsp</span>框架构图</p>
                <div class="btn">
                  立即抢购
                </div>
              </a>
            </div>
            <div class="course-item" >
              <a href="http://t.cn/RWFg1Pq" class="course-flex" >
                <img src="../../../../static/img/tinified/course-top.png" alt="" class="course-top">
                <img class="course-img" src="../../../../static/img/tinified/course3.jpg" alt="">
                <p class="name" >
                  <span class="name-bold" style="font-size: 0.24rem">
                    后期&nbsp—&nbsp
                  </span>画面通透
                </p>
                <div class="btn">
                  立即抢购
                </div>
              </a>
            </div>
        </div>
      </div>

    </div>

    <lottery></lottery>
    <div class="footer" ref="footer">
      <div class="title-com">
        <img class="titlebg" src="../../../../static/img/tinified/titlebg.png" alt="">
        <div class="text">购买须知</div>
      </div>
      <ul class="list">
        <li class="list-head">
          所有课程均在11月12日恢复原价，在活动期间购买课程并完成付款才能享受活动优惠!
        </li>
        <li class="item">
          <p class="title">1、视频可以提供下载及反复观看吗？</p>
          <p class="text" style="font-size: 0.24rem">由于版权原因，视频暂不支持下载，但是可以反复永久在线观看。</p>
        </li>
        <li class="item">
          <p class="title">2、视频可以在手机端和电脑上播放吗？</p>
          <p class="text" style="font-size: 0.24rem">视频可以完美支持安卓手机，苹果手机及WIN系统电脑播放。</p>
        </li>
        <li class="item">
          <p class="title">3、课程购买后可以退款吗？</p>
          <p class="text" style="font-size: 0.24rem">线上课程属于虚拟内容付费，一经购买不予退款，敬请理解。</p>
        </li>
        <li class="item">
          <p class="title">4、VR视频一定要买VR眼镜才可以观看么？</p>
          <p class="text" style="font-size: 0.24rem">不购买眼镜也可以观看VR视频，在使用过程中，你可以使用手指或者鼠标移动画面观看，就可以看到VR效果。</p>
        </li>
        <li class="item">
          <p class="title">5、点击购买按钮没有反应怎么办？</p>
          <p class="text" style="font-size: 0.24rem">可能是手机操作系统没有升级到最新版本，请升级到最新版本或者换一台手机登陆自己的微信号购买，如果还是不能购买，请立即联系客服寻求帮助~</p>
        </li>
        <li class="item">
          <p class="title">6、购买后的课程在哪里可以观看？</p>
          <p class="text" style="font-size: 0.24rem">关注CVC摄影微信公众号，点击菜单栏“CVC摄影”进入页面点击“我的课程表”即可查看你已经购买的课程。</p>
        </li>
      </ul>
      <div class="footer-code">
        <div class="left">
          <img src="../../../../static/img/tinified/code.jpg" alt="" class="code">
        </div>
        <div class="right">
          <div class="fingerprint">
            <img src="../../../../static/img/tinified/fingerprint.png" alt="" class="fingerprint-img">
            <p class="fingerprint-text">
              长按识别二维码<br>
              关注CVC摄影
            </p>
          </div>
          <div class="text" style="font-size: 0.24rem">
            即可在菜单栏中【个人中心】中随时观看您已经购买的课程以及获取更多关于课程直播、免费微课等信息
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import lottery from '@/components/expand/lottery'
  export default{
    data(){
        return {
            title:'CVC直播嘉年华-上帝视角学摄影',
            desc:'导师直播门票天天免费抽',
            imgUrl:'http://vrjishu1.oss-cn-shenzhen.aliyuncs.com/logo.jpg'
        }
    },
    created(){
      this.global.shouquan();
      document.title = this.title;
      // this.share(this.title,this.desc,this.imgUrl);

    },
    components:{lottery},
    methods:{
      scrHead(){
        this.Toscroll(this.$refs.head.offsetTop);
      },
      scrCourse(){
        this.Toscroll(this.$refs.assemblage.offsetTop);
      },
      scrFooter(){
        this.Toscroll(this.$refs.footer.offsetTop);
      },
      Toscroll(offset){
        clearInterval(timer);
        var footTop = offset;
        var timer = setInterval(function(){
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let speed = Math.ceil( (footTop-osTop) / 4);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
          if(osTop >= footTop){
            clearInterval(timer);
          }
        },30);
      }
    }
  }
</script>

<style scoped>
  .activity11{
    max-width: 760px;
    background-color: #E13658;
  }

  .activity11  .title-com{
    margin: 0.2rem 0;
  }
  .activity11  .title-com .titlebg{
    display: block;
    width: 70%;
    margin: 0 auto;
  }
  .activity11  .title-com .text{
    margin-top: -0.52rem;
    text-align: center;
    font-size: 0.3rem;
    font-weight: 900;
    color: #440095;
  }

  /*header*/

  .activity11 .header .activity11-bg{
    width: 100%;
  }
  .activity11 .header .top{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    margin-top: -1.4rem;
  }
  .activity11 .header .hrefimg{

    -webkit-box-flex: 1.0;
    -moz-flex-grow: 1;
    -webkit-flex-grow: 1;
    -webkit-box-flex: 1.0;
    -moz-flex-shrink: 1;
    -webkit-flex-shrink: 1;
    flex: 1;

    text-align: center;
  }
  .activity11 .header .hrefimg img{
    width: 2rem;
    height: 1.5rem;
  }

  .activity11 .header .content {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    margin: 0.3rem 0.1rem;
    font-size: 0.18rem !important;
    color:#FEFB00;
   }
  .activity11 .header .left{
    position: relative;
    color: #FEFFFF;
    padding: 0.1rem 0.4rem;
  }
  .activity11 .header .left .quotes1{
    position: absolute;
    left: 0;
    top:0;
    width: 0.26rem;

  }
  .activity11 .header .left .quotes2{
    position: absolute;
    right: 0.2rem;
    bottom: 0.3rem;
    width: 0.26rem;
  }
  .activity11 .header .header-date{
    width: 1.2rem;
  }
  .activity11 .header .left .bold{
    font-size: 0.25rem;
    font-weight: 900;
    color:#FEFB00;
  }
  .activity11 .header .right{
    -webkit-box-flex: 0;
    -moz-flex-grow: 0;
    -webkit-flex-grow: 0;
    -webkit-box-flex: 0;
    -moz-flex-shrink:0;
    -webkit-flex-shrink:0;
    flex:0 0 2rem;
    text-align: center;
  }
  .activity11 .header .right-border{
    width: 1.4rem;
    height: 1.4rem;
    margin: 0.12rem auto 0;
    border: 0.03rem solid #FEFB00;
  }
  .activity11 .header .code{
    width: 100%;
    height: 100%;
    -webkit-transform: translate(-0.1rem, -0.1rem);
    -moz-transform: translate(-0.1rem, -0.1rem);
    -ms-transform: translate(-0.1rem, -0.1rem);
    -o-transform: translate(-0.1rem, -0.1rem);
    transform: translate(-0.1rem, -0.1rem);
  }
  .activity11 .header .foot{
    padding: 0 0.1rem;
  }
  .activity11 .header .footbg{
    width: 100%;
  }


/*content*/
  .activity11 .main .title{
    margin: 0.2rem auto 0;
    line-height: 1.4;
    font-size: 0.33rem;
    font-weight: 600;
    text-align: center;
    color: #ffffff;
  }
  .activity11 .main .title .titlebg{
    width: 100%;
    height: 100%;
    transform:scale(0.7) translatey(-0.7rem);
  }
  .activity11 .main .title .title-wrap{
    position: relative;
    margin-top: -2.3rem;
  }
  .activity11 .main .icon-down-trangle{
    display: block;
    margin: -0.2rem 0;
    font-size: 0.7rem;
    font-weight: 100;
    color:#FEFB00;
  }
  .activity11 .main .prompting{
    padding: 0.05rem;
    font-size: 0.2rem;
    font-weight: 900;
    color: #320C49;
    background-color:#FEFB00;
  }

  /*course*/
  .activity11 .course .content{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: start;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 0.1rem;
  }
  .activity11 .course .course-item{
    -webkit-box-flex: 0;
    -moz-flex-grow: 0;
    -webkit-flex-grow: 0;
    -webkit-box-flex: 0;
    -moz-flex-shrink: 0;
    -webkit-flex-shrink: 0;
    flex: 0 0 2.7rem;
    position: relative;
    padding: 0.1rem;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
    background-color: #440095;
  }
  .activity11 .course .course-flex{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;

    -webkit-box-pack: start;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content:space-between ;
  }
  .activity11 .course .course-img{
    width: 2.8rem;
    height:2.3rem;
    border-radius:0.15rem;
  }
  .activity11 .course .course-top{
    position: absolute;
    top:0.05rem;
    left: 0.34rem;
    width: 0.6rem;
    height:0.8rem;
  }
  .activity11 .course .name{
    line-height: 1;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    text-align: left;
    font-size:0.24rem;
    color: #FEFB00;
  }
  .activity11 .course .name-bold{
    font-weight: bold;
  }
  .activity11 .course .btn{

    padding: 0.05rem 0;
    text-align: center;
    font-size: 0.22rem;
    /*font-weight: 500;*/
    color: #FE0000;
    border-radius: 0.1rem;
    background-color:#FEFB00;
  }
  .activity11 .course a{
    width: 100%;
    height:100%;
  }


  /*discount*/
  .activity11 .discount{
    padding:0 0.1rem;
    margin-top: 0.2rem;
  }
  .activity11 .discount .discount-item{
    border-radius: 0.1rem;
  }
  .activity11 .discount .discount-img{
    width:100%;
    margin-bottom: 0.1rem;
  }

/*assemblage*/
  .activity11 .assemblage{

  }

  .activity11 .assemblage .content{
    padding: 0.1rem 0.1rem 0.3rem;
    color:#FEFB00;
  }
  .activity11 .assemblage .item,.activity11 .assemblage .item3 {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    position: relative;
    padding: 0.65rem 0.15rem 0.2rem;
    font-size: 0.18rem;
    text-align: center;
    border-radius: 0.1rem;
    background-color: #440095;
  }
  .activity11 .assemblage .item{
    margin-bottom: 0.2rem;
  }
  .activity11 .assemblage .top{
    position: absolute;
    left: -0.07rem;
    top:0.12rem;
  }
  .activity11 .assemblage .assemblage-bg{
    position: absolute;
    top: 0;
    right: 0.08rem;
    width: 55%;
    height: 0.8rem;
  }
  .activity11 .assemblage .top_img{
    width: 1.3rem;
  }
  .activity11 .assemblage .top_name{
    display: block;
    position: absolute;
    left: 0.2rem;
    top:0;
    font-size: 0.23rem;
    font-weight:900;
    color: #FE0100;
  }

  .activity11 .assemblage .item-radius {
  }
  .activity11 .assemblage .portrait {
    width: 1.5rem;
    height:1.5rem;
    border: 0.05rem solid #FEFB00;
    box-sizing: border-box;
    border-radius: 50%;
  }
  .activity11 .assemblage .item-num-img{
    position: relative;

    width: 1.6rem;
    margin-top: -0.1rem;
    margin-left:-0.1rem;

  }


  .activity11 .assemblage .item .author,.activity11 .assemblage .item3 .author{
    font-size: 0.24rem;
  }
  .activity11 .assemblage .item-count{
    margin: auto;
    padding:0 0.1rem 0.6rem;
    font-size: 0.35rem;
  }
  .activity11 .assemblage .item-num .btn{
    display: block;
    width:80%;
    margin: 0.25rem auto 0;
    padding: 0.05rem 0.05rem;
    font-size: 0.23rem;
    font-weight: 900;
    color: #ffffff;
    border-radius: 0.07rem;
    background-color: #FE0000;
  }

  .activity11 .assemblage .item3{
    letter-spacing: -0.02rem;
  }
  .activity11 .assemblage .item3 .portrait{
    width: 1.27rem;
    height:1.27rem;
  }

  .activity11 .assemblage .item3 .item-num-img{
    /*display: block;*/
    width:1.3rem;
    margin-top: 0.06rem;
    margin-left: 0.06rem;

  }
  .activity11 .assemblage .item3 .item-count{
    padding:0 0.05rem 0.7rem;
    font-size: 0.18rem;
  }
  .activity11 .assemblage .item3 .item-num .btn{
    display: block;
    /*margin: 0.1rem auto 0;*/
    /*padding: 0.02rem 0.05rem;*/
    white-space:nowrap;
    font-size: 0.18rem;
    font-weight: 700;
    color: #ffffff;
    border-radius: 0.07rem;
    background-color: #FE0000;
  }
  .activity11 .assemblage .item3 .item-radius{
    width: 1.2rem;
  }


  /*foot*/
  .activity11 .footer{
    padding: 0.15rem 0.1rem;
    font-size: 0.24rem;
    color: #ffecec;
  }
  .activity11 .footer .list{
    margin-top: 0.5rem;
    padding: 0.2rem;
    border-radius: 0.1rem;
    background-color: #440095;
  }
  .activity11 .footer .list-head{
    margin-bottom: 0.25rem;
    font-size: 0.28rem;
    color:#FEFB00;
  }
  .activity11 .footer .item{
    padding-bottom: 0.15rem;
  }
  .activity11 .footer .list .title{
    color: #FEFB00;
    padding-bottom: 0.04rem;
  }
  .activity11 .footer .list .text{
    line-height: 1.4;
    letter-spacing: -0.02rem;
  }
  .activity11 .footer .footer-code{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    margin: 0.3rem 0;
  }
  .activity11 .footer .code{
    width:1.75rem;
    height:1.8rem;
    padding: 0 0.1rem;
    margin-bottom: -0.1rem;
  }
  .activity11 .footer .right{
    padding-left:0.2rem;
  }
  .activity11 .footer .left{
    border-right: 0.01rem solid #FEFB00;
  }
  .activity11 .footer .fingerprint{
    position: relative;
    margin-bottom: 0.2rem;
  }
  .activity11 .footer .fingerprint-img{
    position: absolute;
    left:0;
    top:0;
    width: 0.8rem;
    height:0.8rem;
  }
  .activity11 .footer .fingerprint-text{
    padding: 0.05rem 0.8rem 0 0.95rem;
    font-weight: 900;
  }


  @media screen and (max-width: 330px) {
    .activity11 .course .course-item{
      letter-spacing: -0.01rem;
    }
    .activity11 .course .course-item a{
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      -webkit-box-direction: normal;
      -webkit-box-orient: vertical;
      -moz-flex-direction: column;
      -webkit-flex-direction: column;
      flex-direction: column;

      -webkit-box-pack: start;
      -webkit-justify-content: space-between;
      -moz-justify-content: space-between;
      -ms-justify-content: space-between;
      -o-justify-content: space-between;
      justify-content: space-between;



    }
    .activity11 .course .course-img{
      width: 2.65rem;
      height:2.2rem
    }

    .activity11 .discount .discount-img{
      height: 2.8rem;
    }

    .activity11 .header .left .quotes1{
      /*left: -0.4rem;*/
      /*top:-0.04rem;*/
    }
    .activity11 .header .left .quotes2{
      /*right: -0.1rem;*/
      /*bottom: -0.4rem;*/
    }


  }

  @media screen and (min-width: 600px) {

    .activity11  .title-com .text{
      margin-top: -0.6rem;
    }
    .activity11 .main .title .titlebg{
      width: 65%;
    }

    .activity11 .header .right{
      -webkit-box-flex: 0;
      -moz-flex-grow: 0;
      -webkit-flex-grow: 0;
      -webkit-box-flex: 0;
      -moz-flex-shrink:0;
      -webkit-flex-shrink:0;
      flex:0 0 2.8rem;
      width: 2.8rem;

    }
  }
</style>
