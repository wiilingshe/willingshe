<template>
  <div class="promotion">
    <div class="tu">
      <img :src="selected">
    </div>
    <div class="tip">
      <img src="../../../static/img/tuiguang/this.png">
      长按上图保存图片，或者发送给朋友
    </div>
    <div class="bottom">
      <div class="one" v-for="(i,index) in arr1" @click="selectPic(index,$event)">
        <img :src="i">
        <img src="../../../static/img/tuiguang/selected.png" :class="{block1:index==0}">
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        face: '',
        nickname: '',
        promotion: '',
        imgPath: '',
        arr1: ['../../../static/img/tuiguang/pic1.png', '../../../static/img/tuiguang/pic2.png', '../../../static/img/tuiguang/pic3.png'],
        arr2: [['../../static/img/tuiguang/bg1.png', '', '', '向你推荐一个很棒的课程', '', '长按识别二维码参加课程'], ['../../static/img/tuiguang/bg2.png', '', '', '向你推荐一个很棒的课程', '', '长按识别二维码参加课程'], ['../../static/img/tuiguang/bg3.png', '', '', '向你推荐一个很棒的课程', '', '长按识别二维码参加课程']],
        arr3: [],
        selected: '',
      }
    },
    created(){
      var self = this;
      this.global.shouquan();
      this.getData('get', '/shop-v1-user_base_info.html').then(res => {
        if (res.data.status == 1) {
          this.face = res.data.data.face;
          this.nickname = res.data.data.nickname;
          this.getData('get', '/shop-v1-user_get_my_qr_code.html').then(res => {
            if (res.data.status == 1) {
              self.promotion = res.data.data;
              for (let i = 0; i < self.arr2.length; i++) {
                self.arr2[i][1] = self.face;
                self.arr2[i][2] = self.nickname;
                self.arr2[i][4] = self.promotion;
                self.draw2(self.arr2[i], i);
              }
              ;
            }
          })
        }
      });
    },
    methods: {
      draw2(arr, i){
        var self = this;
        var mycanvas = document.createElement('canvas');
        document.body.appendChild(mycanvas);
        $('canvas').css('display', 'none');
        var len = arr.length;
        mycanvas.width = 750;
        mycanvas.height = 1127;
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
                img.onerror = function () {
                  drawing(num + 1);
                }
                img.onload = function () {
                  // context.arc(120,75,50,0,2*Math.PI);
                  // context.clip();
                  context.drawImage(img, 0, 0, mycanvas.width, mycanvas.height);
                  drawing(num + 1);
                }
              } else if (num == 1) {
                img.onerror = function () {
                  drawing(num + 1);
                }
                img.onload = function () {
                  context.drawImage(img, mycanvas.width / 2 - 60, 150, 120, 120);
                  drawing(num + 1);
                }
              } else if (num == 2) {
                context.font = 'bold 35px Microsoft YaHei';
                context.fillStyle = '#fff';
                context.textAlign = 'center';
                if (i == 2) {
                  context.fillStyle = '#333';
                }
                context.fillText(arr[num], mycanvas.width / 2, 325);
                drawing(num + 1);
              } else if (num == 3) {
                context.font = '33px Microsoft YaHei';
                context.fillStyle = '#fff';
                context.textAlign = 'center';
                if (i == 2) {
                  context.fillStyle = '#333';
                }
                context.fillText(arr[num], mycanvas.width / 2, 380);
                drawing(num + 1);
              } else if (num == 4) {
                img.onerror = function () {
                  drawing(num + 1);
                }
                img.onload = function () {
                  context.drawImage(img, mycanvas.width / 2 - 100, 650, 200, 200);
                  drawing(num + 1);
                }
              } else if (num == 5) {
                context.font = '33px Microsoft YaHei';
                context.fillStyle = '#fff';
                context.textAlign = 'center';
                if (i == 2) {
                  context.fillStyle = '#333';
                }
                context.fillText(arr[num], mycanvas.width / 2, 910);
                drawing(num + 1);
              }
            } else {
              self.imgPath = mycanvas.toDataURL("image/jpeg");
//              console.log(self.imgPath);
              // document.getElementsByTagName('img')[0].src=self.imgPath;
              self.arr3.push(self.imgPath);
              self.selected = self.arr3[0];
            }
          }

          drawing(0);
        }
      },
      selectPic(index, e){
        this.selected = this.arr3[index];
        var length = $('.one').length;
        $('.one').eq(0).find('img').eq(1).removeClass('block1');
        for (let i = 0; i < length; i++) {
          $('.one').eq(i).find('img').eq(1).css('display', 'none')
        }
        ;
        $(e.target).closest('.one').find('img').eq(1).css('display', 'block');
      }
    }
  }
</script>
<style lang="less">
  .promotion {
    font-size: 0.205rem;
    color: #333;
    background-color: #333;
    width: 100%;
    height: calc(~"100vh - 0.34rem");
    padding-top: 0.34rem;
    .tu {
      width: calc(~"100% - 50% - 2.474rem");
      padding-left: calc(~"50% - 2.474rem");
      img {
        width: 4.949rem;
        height: 7.697rem;
      }
    }
    .tip {
      width: 100%;
      text-align: center;
      color: #fff;
      margin-top: 0.15rem;
      img {
        width: 0.2rem;
      }
    }
    .bottom {
      width: calc(~"100% - 0.34rem");
      padding: 0 0.17rem;
      overflow-x: scroll;
      position: fixed;
      bottom: 0;
      background-color: #fff;
      height: 1.536rem;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      .one {
        display: inline-block;
        margin-right: 0.17rem;
        margin-top: 0.235rem;
        position: relative;
        img:nth-child(1) {
          width: 1.066rem;
          height: 1.066rem;
        }
        img:nth-child(2) {
          position: absolute;
          right: 0.08rem;
          bottom: 0.13rem;
          color: #fe5875;
          width: 0.34rem;
          display: none;
        }
        .block1 {
          display: block !important;
        }
      }
    }
  }
</style>
