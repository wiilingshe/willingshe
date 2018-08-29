<template>
  <div id="swiper_box">
    <div class="loding" v-show="loding"></div>
    <div class="swiper-container" v-show="three">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="box">
            <img :src="imgPath" alt="" style="width: 100%;height: 100%;">
          </div>
          <div class="bottom_text">Tips:长按图片保存，并可分享给好友哟。</div>
        </div>
        <div class="swiper-slide">
          <div class="box">
            <div class="product_two_title">
              <img :src="data.face"
                   @error="data.face = data.face == ''? '/static/img/onerr3.jpg':'/static/img/onerr3.jpg';" alt=""/>
            </div>
            <div class="product_two_user">
              <span>{{data.username}}</span>
              <span>{{data.true_name}}</span>
            </div>
            <div class="product_two_userDescribe">
              {{data.job_desc}}
            </div>
            <div class="product_two_box">
              <div class="product_two_tel" v-show="phone">
                <i class="iconfont icon-shouji1"></i>
                <p>{{data.phone}}</p>
              </div>
              <div class="product_two_email" v-show="email">
                <i class="iconfont icon-youxiang"></i>
                <p>{{data.email}}</p>
              </div>
              <div class="product_two_position" v-show="position">
                <i class="iconfont icon-weibiaoti5"></i>
                <p>{{data.address}}</p>
              </div>

            </div>
            <div class="product_two_btn">
              <div @click="jumpWebsite()">
                个人网站
              </div>
            </div>
          </div>
          <div class="bottom_text">Tips:点击上方"..."可分享给好友哟。</div>
        </div>
        <div class="swiper-slide">
          <div class="box2">
            <div class="product_daoshi_pic" @click="daoshiProcess()">
              <img src="../../../../static/img/card/pic.png" alt=""/>
              <p>创建导师名片</p>
            </div>
            <div class="product_line"></div>
            <div class="product_jigou_pic" @click="jigouProcess()">
              <img src="../../../../static/img/card/jgpic.png" alt=""/>
              <p>创建机构名片</p>
            </div>
          </div>
          <div class="bottom_text">Tips:创建导师、机构专属名片。</div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="swiper-container" v-show="two">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="box">
            <img :src="imgPath" alt="" style="width: 100%;height: 100%;">
          </div>
          <div class="bottom_text">Tips:长按图片保存，并可分享给好友哟。</div>
        </div>
        <div class="swiper-slide">
          <div class="box">
            <div class="product_two_title">
              <img :src="imgPath1" alt="">
              <!--<img :src="data.face"-->
              <!--@error="data.face = data.face == ''? '/static/img/onerr3.jpg':'/static/img/onerr3.jpg';" alt=""/>-->
            </div>
            <div class="product_two_user">
              {{data.username}}{{data.true_name}}
            </div>
            <div class="product_two_userDescribe">
              {{data.job_desc}}
            </div>
            <div class="product_two_box">
              <div class="product_two_tel" v-show="phone">
                <i class="iconfont icon-shouji1"></i>
                <p>{{data.phone}}</p>
              </div>
              <div class="product_two_email" v-show="email">
                <i class="iconfont icon-youxiang"></i>
                <p>{{data.email}}</p>
              </div>
              <div class="product_two_position" v-show="position">
                <i class="iconfont icon-weibiaoti5"></i>
                <p>{{data.address}}</p>
              </div>

            </div>
            <div class="product_two_btn">
              <div @click="jumpWebsite()">
                个人网站
              </div>
            </div>
          </div>
          <div class="bottom_text">Tips:点击上方"..."可分享给好友哟。</div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="swiper-container" v-show="one">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="box2">
            <div class="product_daoshi_pic" @click="daoshiProcess()">
              <img src="../../../../static/img/card/pic.png" alt=""/>
              <p>创建导师名片</p>
            </div>
            <div class="product_line"></div>
            <div class="product_jigou_pic" @click="jigouProcess()">
              <img src="../../../../static/img/card/jgpic.png" alt=""/>
              <p>创建机构名片</p>
            </div>
          </div>
          <div class="bottom_text">Tips:创建导师、机构专属名片。</div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import Swiper from '../../../../static/js/swiper.min.js';
  export default {
    data(){
      return {
        data: '',
        data1: '',
        one: true,
        two: true,
        three: true,
        phone: true,
        email: true,
        position: true,
        show_add: true,
        show_card: true,
        loding: true,
        imgPath: '',
        imgPath1: '',
        shop_id: '',
        arr: ['', '', '', '../../../static/img/card/phone.png', '', 'line', '../../../static/img/card/email.png', '', 'line', '../../../static/img/card/position.png', '']
      }
    },
    created: function () {
      Indicator.open('加载中...');
      document.title = "个人名片";
      this.global.shouquan();
      var self = this;
      this.shop_id = this.$route.query.shop_id;
      this.postData('post', '/shop-v1-custom_person_card.html', {
        shop_id: this.shop_id
      }).then(res => {
        if (res.status == 200) {
          if (res.data.status == 1) {
            self.data1 = res.data.data;
            if (res.data.data.show_add == 1 && res.data.data.show_card == 0) {
              this.one = true;
              this.two = false;
              this.three = false;
            } else if (res.data.data.show_add == 0 && res.data.data.show_card == 1) {
              this.two = true;
              this.one = false;
              this.three = false;
            } else if (res.data.data.show_card == 1 && res.data.data.show_add == 1) {
              this.three = true;
              this.one = false;
              this.two = false;
            }

            if (!res.data.data.card_info.phone) {
              this.phone = false;
            }
            if (!res.data.data.card_info.email) {
              this.email = false;
            }
            if (!res.data.data.card_info.address) {
              {
                this.position = false;
              }

            }
            self.data = res.data.data.card_info;
            self.arr[0] = res.data.data.card_info.face;
            self.arr[1] = res.data.data.card_info.username + ' ' + res.data.data.card_info.true_name;
            self.arr[2] = res.data.data.card_info.job_desc;
            self.arr[4] = res.data.data.card_info.phone;
            self.arr[7] = res.data.data.card_info.email;
            self.arr[10] = res.data.data.card_info.address;
            self.arr[11] = res.data.data.card_info.qr_code;
            self.draw(self.arr);
            self.qrCodeShare(self.data);
            Indicator.close();
            this.loding = false;
            self.swiper_fun();


          }
        }
      });
    },
    mounted(){

    },
    methods: {
      swiper_fun(){
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }
        });
      },
      qrCodeShare(data){
        this.share(data.true_name + data.username + data.job_desc, '个人名片,for you', data.share_face);
      },
      draw(arr, i){
        var self = this;
        var mycanvas = document.createElement('canvas');
        document.body.appendChild(mycanvas);
        $('canvas').css('display', 'none');
        $('canvas').attr('id', 'canvas');
        var len = arr.length;
        mycanvas.width = 550;
        mycanvas.height = 950;
        if (mycanvas.getContext) {
          var context = mycanvas.getContext('2d');
          // 设置背景色
          context.fillStyle = '#fff';
          context.fill();
          context.fillRect(0, 0, mycanvas.width, mycanvas.height);
          context.beginPath();
          context.stroke();
          var h = 0;

          function drawing(num) {
            if (num < len) {
              var img = new Image;
              img.crossOrigin = "*";
              img.src = arr[num];
              if (num == 0) {
                img.onload = function () {
                  let width = img.width,
                    height = img.height;
                  if (Math.round(width / height) <= 1 || Math.round(height / width) <= 1) {
                    context.drawImage(img, 0, 0, mycanvas.width, 360);
                  } else if (height > 500 && width > 500 && width < height) {
                    let _with = width > 550 ? ((width - 550) / 2) : 0,
                      _height = height > 360 ? ((height - 360) / 2) : 0;
                    context.drawImage(img, _with, _height, mycanvas.width, 360, 0, 0, 550, 360);
                  } else if (img.width < 500 || img.height < 500) {
                    context.drawImage(img, 0, 0, mycanvas.width, 360);
                  } else {
                    context.drawImage(img, 0, 0, mycanvas.width, 360);
                  }
                  self.imgPath1 = mycanvas.toDataURL("image/jpeg");
                  drawing(num + 1);
                }
                img.onerror = function () {
                  img.src = "../../../static/img/onerr3.jpg";
                  context.drawImage(img, 0, 0, mycanvas.width, 360);
                  drawing(num + 1);
                }

              } else if (num == 1) {
                context.font = 'normal 38px Microsoft YaHei';
                context.fillStyle = '#333';
                context.textAlign = 'center';
                context.fillText(arr[num], mycanvas.width / 2, 430, 420);
                drawing(num + 1);
              } else if (num == 2) {
                context.font = 'normal 26px Microsoft YaHei';
                context.fillStyle = '#808080';
                context.textAlign = 'center';
                context.fillText(arr[num], mycanvas.width / 2, 480, 460);
                drawing(num + 1);
              } else if (num == 3) {
                img.onload = function () {
                  context.drawImage(img, 100, 514, 30, 36);
                  drawing(num + 1);
                }
              } else if (num == 4) {
                if (arr[num]) {
                  context.font = 'normal 24px Microsoft YaHei';
                  context.fillStyle = '#808080';
                  context.textAlign = 'left';
                  context.fillText(arr[num], 160, 540, 290, 40);
                  drawing(num + 1);
                } else {
                  context.font = 'normal 24px Microsoft YaHei';
                  context.fillStyle = '#808080';
                  context.textAlign = 'left';
                  context.fillText('***', 160, 540, 290, 40
                  )
                  ;
                  drawing(num + 1);
                }
              } else if (num == 5) {
                context.lineWidth = "1";
                context.beginPath();
                context.strokeStyle = "#eee";
                context.moveTo(100, 570);
                context.lineTo(450, 570);
                context.closePath();
                context.stroke();
                drawing(num + 1);
              } else if (num == 6) {
                img.onload = function () {
                  context.drawImage(img, 100, 594, 30, 36);
                  drawing(num + 1);
                }
              } else if (num == 7) {
                if (arr[num]) {
                  context.font = 'normal 24px Microsoft YaHei';
                  context.fillStyle = '#808080';
                  context.textAlign = 'left';
                  context.fillText(arr[num], 160, 622, 290, 40);
                  drawing(num + 1);
                } else {
                  context.font = 'normal 24px Microsoft YaHei';
                  context.fillStyle = '#808080';
                  context.textAlign = 'left';
                  context.fillText('***', 160, 622, 290, 40);
                  drawing(num + 1);
                }

              } else if (num == 8) {
                context.lineWidth = "1";
                context.beginPath();
                context.strokeStyle = "#eee";
                context.moveTo(100, 664);
                context.lineTo(450, 664);
                context.closePath();
                context.stroke();
                drawing(num + 1);
              } else if (num == 9) {
                img.onload = function () {
                  context.drawImage(img, 100, 690, 30, 36);
                  drawing(num + 1);
                }
              } else if (num == 10) {
                if (arr[num]) {
                  context.font = 'normal 24px Microsoft YaHei';
                  context.fillStyle = '#808080';
                  context.textAlign = 'left';
                  var canvasWidth = 290;
                  var lineWidth = 0;
                  var initHeight = 720;
                  var lastSubStrIndex = 0;
                  var str = arr[num];
                  for (let i = 0; i < str.length; i++) {
                    lineWidth += context.measureText(str[i]).width;
                    if (lineWidth > canvasWidth) {
                      context.fillText(str.substring(lastSubStrIndex, i), 160, initHeight);//绘制截取部分
                      initHeight += 30;//20为字体的高度
                      lineWidth = 0;
                      lastSubStrIndex = i;
                    }
                    if (i == str.length - 1) {//绘制剩余部分
                      context.fillText(str.substring(lastSubStrIndex, i + 1), 160, initHeight);
                    }
                  }
                  drawing(num + 1);
                } else {
                  context.font = 'normal 24px Microsoft YaHei';
                  context.fillStyle = '#808080';
                  context.textAlign = 'left';
                  context.fillText('***', 160, 720, 290, 40);
                  drawing(num + 1);
                }
              } else if (num == 11) {
                img.onerror = function () {
                  drawing(num + 1);
                }
                img.onload = function () {
                  context.drawImage(img, 190, 774, 162, 162);
                  drawing(num + 1);
                }
              }
            } else {
              self.imgPath = mycanvas.toDataURL("image/jpeg");
            }
          }

          drawing(0);
        }
      },
      jumpWebsite: function () {
        if (this.data.url) {
          window.location.href = this.data.url;
        } else {

        }
      },
      daoshiProcess: function () {
        if (this.data1.type > 1) {
          Toast({
            message: this.data1.msg,
            duration: 1000
          });
        } else {
          this.$router.push('/daoshiProcess');
        }
      },
      jigouProcess: function () {
        if (this.data1.type > 1) {
          Toast({
            message: this.data1.msg,
            duration: 1000
          });
        } else {
          this.$router.push('/jigouProcess');
        }
      }
    },
    route: {
      canReuse: false,
    }


  }
</script>
<style lang="less">
  #swiper_box {
    width: 100%;
    height: 100%;
    background: #333333;
    .swiper-pagination {
      top: -0.5rem;
      z-index: -1;
    }
    .swiper-container {
      width: 100%;
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 300px;
        height: 8rem;
        border-radius: 0.2rem;
        background: white;
        position: relative;
        .box {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 0.2rem;
          background-color: white;
          .product_two_title {
            width: 100%;
            height: 3rem;
            overflow: hidden;
            z-index: -1000;
            img {
              width: 100%;
            }
          }
          .product_two_user {
            width: 100%;
            font-size: 0.36rem;
            text-align: center;
            margin-top: 0.35rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            display: flex;
            flex-direction: row;
            justify-content: center;
            display: -webkit-flex;
            -webkit-flex-direction: row;
            -webkit-justify-content: center;

          }
          .product_two_userDescribe {
            width: 100%;
            font-size: 0.24rem;
            color: #999999;
            text-align: center;
            margin-top: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            display: flex;
            flex-direction: row;
            justify-content: center;
            display: -webkit-flex;
            -webkit-flex-direction: row;
            -webkit-justify-content: center;
          }
          .product_two_box {
            width: 70%;
            margin: 0 auto;
            .product_two_tel:after, .product_two_email:after, .product_two_position:after {
              display: block;
              content: "";
              clear: both;
            }
            .product_two_tel, .product_two_email, .product_two_position {
              padding: 0.2rem 0;
              i {
                float: left;
                font-size: 0.3rem;
                color: #999999;
                width: 16%;
              }
              p {
                float: left;
                color: #999999;
                font-size: 0.24rem;
                width: 84%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
              }
            }
            .product_two_position {
              p {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
            }
            .product_two_tel {
              border-bottom: 1px solid #eeeeee;
            }
            .product_two_email {
              border-bottom: 1px solid #eeeeee;
            }
          }
          .product_one_code {
            img {
              width: 1.62rem;
              height: 1.62rem;
              margin: 0 auto;
              display: block;
            }
          }
          .product_two_btn {
            div {
              width: 88%;
              height: 0.8rem;
              background: #5e96d0;
              margin: 0 auto;
              border-radius: 0.16rem;
              color: white;
              font-size: 0.3rem;
              text-align: center;
              line-height: 0.8rem;
            }
          }

        }
        .box2 {
          width: 100%;
          height: 100%;
          background-color: white;
          .product_daoshi_pic, .product_jigou_pic {
            width: 100%;
            height: 50%;
            position: relative;
            img {
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-top: -1.4rem;
              margin-left: -1rem;

            }
            p {
              font-size: 0.3rem;
              color: #666666;
              text-align: center;
              width: 100%;
              position: absolute;
              top: 70%;
            }
          }
          .product_line {
            width: 90%;
            margin: 0 auto;
            border-top: 1px solid #CCCCCC;
          }

        }
        .bottom_text {
          font-size: 0.24rem;
          text-align: center;
          bottom: -20px;
          height: 0.4rem;
          line-height: 0.4rem;
          color: white;
        }

      }
    }
    .loding {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      position: fixed;
      z-index: 99999999999999999;
    }

  }

  .mint-indicator-wrapper {
    z-index: 9999999999999999;
  }
</style>
