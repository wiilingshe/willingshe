<template>
  <div id="commission">
    <div style="width: 100%;height: 9.6rem;overflow: scroll;-webkit-overflow-scrolling: touch;">
      <div class="tu" :style="{'padding-left':backtype==2?aaaa==0?'calc(50% - 2.6rem)':'calc(50% - 3rem)':'calc(50% - 3rem)'}">
        <img :src="selected">
      </div>
      <div class="tip">
        <img src="../../../static/img/tuiguang/this.png">
        长按上图保存图片，或者发送给朋友
      </div>
    </div>
    <div class="bottom">
      <div class="one" v-for="(i,index) in arr1" @click="selectPic(index,$event)" v-show="one">
        <img :src="i">
        <img src="../../../static/img/tuiguang/selected.png" :class="{block1:index==0}">
      </div>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  export default{
    data(){
      return {
        face: '',
        nickname: '',
        promotion: '',
        imgPath: '',
        arr1: [],
        arr2: [
          ['../../static/img/tuiguang/bg1.png', '', '', '向你推荐一个很棒的课程', '', '长按识别二维码参加课程', '', ''],
          ['../../static/img/tuiguang/bg2.png', '', '', '向你推荐一个很棒的课程', '', '长按识别二维码参加课程', '', ''],
          ['../../static/img/tuiguang/bg3.png', '', '', '向你推荐一个很棒的课程', '', '长按识别二维码参加课程', '', '']],
        arr3: [],
        arr4: ['../../../static/img/invite/invitebg.png', '', '', '', '给你一张学习明信片', '../../../static/img/invite/inviteyin.png', '', '', '', '长按识别二维码参加课程'],
        selected: '',
        fenmian: '',
        titlebubian: '',
        host: '',
        one: true,
        two: true,
        arr5: [
          ['', '', '', '向你推荐一个很棒的课程', '','长按识别二维码参加课程','','']
        ],
        qr_code: '',
        aaaa:0,
        backtype:1,
      }
    },
    created(){
      var self = this;
      this.global.shouquan();
      Indicator.open();
      //获取封面  新的画图
      if (window.location.href.indexOf('vid') != -1) {
        var data = {
          'type': '1',
          'v_id': this.$route.query.vid
        }
        this.postData('post', '/shop-v1-user_invite_card.html', data).then(res => {
          if (res.status == 200) {
            if(res.data.data.back_image != ''){
              if (res.data.data.pic3_type == 2) {
                self.backtype = 2;
                self.hecheng1(res.data.data.back_image, res.data.data.face, res.data.data.qr_code, res.data.data.owner_name,res.data.data.nickname);
              }else{
                self.backtype = 1;
                self.hecheng2(res.data.data.back_image, res.data.data.face, res.data.data.qr_code, res.data.data.owner_name,res.data.data.title,res.data.data.nickname);
              }
            }
            self.titlebubian = res.data.data.title;
            self.host = '主讲人:' + res.data.data.owner_name;
            self.hecheng(res.data.data.face, res.data.data.fengmian, res.data.data.qr_code, res.data.data.nickname, res.data.data.owner_name);
            self.getBaseInfo(res.data.data.face, res.data.data.nickname, res.data.data.qr_code, res.data.data.title, res.data.data.owner_name);

          }
        })
      } else if (window.location.href.indexOf('ser_id') != -1) {
        var data = {
          'type': '2',
          'v_id': this.$route.query.ser_id
        }
        this.postData('post', '/shop-v1-user_invite_card.html', data).then(res => {
          if (res.status == 200) {
            if(res.data.data.back_image != ''){
              if (res.data.data.pic3_type == 2) {
                self.backtype = 2;
                self.hecheng1(res.data.data.back_image, res.data.data.face, res.data.data.qr_code, res.data.data.owner_name,res.data.data.nickname);
              }else{
                self.backtype = 1;
                self.hecheng2(res.data.data.back_image, res.data.data.face, res.data.data.qr_code, res.data.data.owner_name,res.data.data.title,res.data.data.nickname);
              }
            }
            self.titlebubian = res.data.data.title;
            self.host = '主讲人:' + res.data.data.owner_name;
            self.qr_code = res.data.data.qr_code;
            self.hecheng(res.data.data.face, res.data.data.fengmian, res.data.data.qr_code, res.data.data.nickname, res.data.data.owner_name);
//            self.getBaseInfo();
            self.getBaseInfo(res.data.data.face, res.data.data.nickname, res.data.data.qr_code, res.data.data.title, res.data.data.owner_name);
          }
        })
      } else if (window.location.href.indexOf('artid') != -1) {
        var data = {
          'type': '4',
          'v_id': this.$route.query.artid
        };
        this.postData('post', '/shop-v1-user_invite_card.html', data).then(res => {
          if (res.status == 200) {
            self.arr2[0][3] = '向你推荐一个很棒的文章';
            self.arr2[0][5] = '长按识别二维码查看文章';
            self.arr2[1][3] = '向你推荐一个很棒的文章';
            self.arr2[1][5] = '长按识别二维码查看文章';
            self.arr2[2][3] = '向你推荐一个很棒的文章';
            self.arr2[2][5] = '长按识别二维码查看文章';
            self.arr4[9] = '长按识别二维码查看文章';
            self.titlebubian = res.data.data.title;
            self.host = res.data.data.owner_name;
            self.hecheng(res.data.data.face, res.data.data.fengmian, res.data.data.qr_code, res.data.data.nickname, res.data.data.owner_name);
            self.getBaseInfo(res.data.data.face, res.data.data.nickname, res.data.data.qr_code, res.data.data.title, res.data.data.owner_name);
          }
        })
      }
    },
    methods: {
      hecheng(face, fenmian, code, name, author){
        if (fenmian) {
          this.arr4[1] = fenmian;
        } else {
          this.arr4[1] = '../../../static/img/onerr3.jpg';
        }
        this.arr4[2] = face;
        this.arr4[3] = name;
        this.arr4[6] = this.titlebubian;
        if (window.location.href.indexOf('artid') != -1) {
          this.arr4[7] = author;
        } else {
          this.arr4[7] = '主讲人：' + author;
        }
        this.arr4[8] = code;
        var self = this;
        var h = 0;
        var mycanvas = document.createElement('canvas');
        var len = this.arr4.length;
        document.body.appendChild(mycanvas);
        $('canvas').css('display', 'none');
        mycanvas.width = 576;
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
            img.src = self.arr4[num];
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
                context.drawImage(img, 25, 18, 525, 300);
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
              context.fillText(self.arr4[num], 135, 370);
              drawing(num + 1);
            } else if (num == 4) {
              context.font = '24px Microsoft YaHei';
              context.fillStyle = '#666';
              context.fillText(self.arr4[num], 135, 404);
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
              context.fillText(self.arr4[num], mycanvas.width / 2, 510);
              drawing(num + 1);
            } else if (num == 7) {
              context.font = '24px Microsoft YaHei';
              context.fillStyle = '#333';
              context.textAlign = 'center';
              context.fillText(self.arr4[num], mycanvas.width / 2, 550);
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
              context.fillText(self.arr4[num], mycanvas.width / 2, mycanvas.height - 60);
              drawing(num + 1);
            }
          } else {
            self.pic1 = mycanvas.toDataURL("image/jpeg");
            self.arr3.push(self.pic1);
            self.arr1.push(self.pic1);

          }
        }

        drawing(0)
      },
      draw2(arr, i){
        if (i == 2) {
          Indicator.close();
        }
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
            // console.log(arr)
            if (num < len) {
              var img = new Image;
              img.crossOrigin = "*";
              img.src = arr[num];
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
              } else if (num == 6) {
                context.font = '33px Microsoft YaHei';
                context.fillStyle = '#fff';
                context.textAlign = 'center';
                if (i == 2) {
                  context.fillStyle = '#333';
                }
                context.fillText(arr[num], mycanvas.width / 2, 520);
                drawing(num + 1);
              } else if (num == 7) {
                context.font = '33px Microsoft YaHei';
                context.fillStyle = '#fff';
                context.textAlign = 'center';
                if (i == 2) {
                  context.fillStyle = '#333';
                }
                context.fillText(arr[num], mycanvas.width / 2, 570);
                drawing(num + 1);
              }
            } else {
              self.imgPath = mycanvas.toDataURL("image/jpeg");
              self.arr3.push(self.imgPath);
              self.selected = self.arr3[0]
              if (i == 0) {
                self.arr1.push('../../../static/img/tuiguang/pic1.png');
              } else if (i == 2) {
                self.arr1.push('../../../static/img/tuiguang/pic3.png');
              } else {
                self.arr1.push('../../../static/img/tuiguang/pic2.png');
              }
//              self.arr1.push('../../../static/img/tuiguang/pic1.png', '../../../static/img/tuiguang/pic2.png', '../../../static/img/tuiguang/pic3.png');
            }
          }

          drawing(0);
        }
      },
      selectPic(index, e){
        this.aaaa = index;
        this.selected = this.arr3[index];
        var length = $('.one').length;
        $('.one').eq(0).find('img').eq(1).removeClass('block1');
        for (let i = 0; i < length; i++) {
          $('.one').eq(i).find('img').eq(1).css('display', 'none')
        }
        ;
        $(e.target).closest('.one').find('img').eq(1).css('display', 'block');
      },
      getBaseInfo(face, nickname, qr_code, titlebubian, host){
        console.log(titlebubian)
        for (let i = 0; i < this.arr2.length; i++) {
          this.arr2[i][1] = face;
          this.arr2[i][2] = nickname;
          this.arr2[i][4] = qr_code;
          this.arr2[i][6] = titlebubian;
          this.arr2[i][7] = host;
          this.draw2(this.arr2[i], i);
        }


      },
      hecheng1(back_image, face, qr_code, owner_name,name){
        this.arr5[0] = back_image;
        this.arr5[1] = face;
        this.arr5[3] = qr_code;
        this.arr5[2] = '向你推荐了一个很棒的课程';
        this.arr5[4] = name;
        var self = this;
        var h = 0;
        var mycanvas = document.createElement('canvas');
        var len = this.arr5.length;
        document.body.appendChild(mycanvas);
        $('canvas').css('display', 'none');
        mycanvas.width = 576;
        mycanvas.height = 1023;
        var context = mycanvas.getContext('2d');
        context.fillStyle = '#fff';
        context.fill();
        context.fillRect(0, 0, mycanvas.width, mycanvas.height);
        context.beginPath();
        context.stroke();
        function drawing(num) {
          console.log(num);
          if (num < len) {
            var img = new Image;
            img.crossOrigin = "*";
            img.src = self.arr5[num];
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
                context.beginPath();
                // var pattern = context.createPattern(img, "repeat");
                context.save();
                context.arc(80, 80, 55, 0, 2 * Math.PI);
                context.clip();
                context.drawImage(img, 25, 25, 110, 110);
                // context.fillStyle = pattern;
                // context.fill();
                context.restore();
                drawing(num + 1);
              }
            } else if (num == 2) {
              context.font = '24px Microsoft YaHei';
              context.fillStyle = '#fff';
              context.fillText(self.arr5[num], 150, 102);
              drawing(num + 1);
            } else if (num == 3) {
              img.onerror = function () {
                drawing(num + 1);
              }
              img.onload = function () {
                context.drawImage(img, 35, 800, 180, 180);
                drawing(num + 1);
              }
            } else if (num == 4) {
              context.font = '26px Microsoft YaHei';
              context.fillStyle = '#fff';
              context.fillText(self.arr5[num], 150, 65);
              drawing(num + 1);
            }
          } else {
            self.pic1 = mycanvas.toDataURL("image/jpeg");
            self.arr3.unshift(self.pic1);
            self.arr1.unshift(self.pic1);
            self.selected = self.arr3[0];
          }
        }

        drawing(0)


      },
      hecheng2(back_image, face, qr_code, owner_name,title,name){
        this.arr5[0] = back_image;
        this.arr5[1] = face;
        this.arr5[3] = qr_code;
        this.arr5[2] = '向你推荐了一个很棒的课程';
        this.arr5[4] = owner_name;
        this.arr5[5] = '长按识别二维码参加课程';
        this.arr5[6] = title;
        this.arr5[7] = name;
        console.log(this.arr5)
        var self = this;
        var h = 0;
        var mycanvas = document.createElement('canvas');
        var len = this.arr5.length;
        document.body.appendChild(mycanvas);
        $('canvas').css('display', 'none');
        mycanvas.width = 750;
        mycanvas.height = 1127;
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
            img.src = self.arr5[num];
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
                context.drawImage(img, mycanvas.width / 2 - 65, 200, 130, 130);
                drawing(num + 1);
              }
            } else if (num == 2) {
              context.font = '33px Microsoft YaHei';
              context.fillStyle = '#fff';
              context.textAlign = 'center';
              context.fillText(self.arr5[num], mycanvas.width / 2, 435);
              drawing(num + 1);
            } else if (num == 3) {
              img.onerror = function () {
                  drawing(num + 1);
                }
                img.onload = function () {
                  context.drawImage(img, mycanvas.width / 2 - 100, 690, 200, 200);
                  drawing(num + 1);
                }
            } else if (num == 4) {
              context.font = '33px Microsoft YaHei';
                context.fillStyle = '#fff';
                context.textAlign = 'center';
                context.fillText(self.arr5[num], mycanvas.width / 2, 610);
                drawing(num + 1);
            }else if(num == 5){
              context.font = '33px Microsoft YaHei';
              context.fillStyle = '#fff';
              context.textAlign = 'center';
              context.fillText(self.arr5[num], mycanvas.width / 2, 950);
              drawing(num + 1);
            }else if(num == 6){
              context.font = '33px Microsoft YaHei';
              context.fillStyle = '#fff';
              context.textAlign = 'center';
              context.fillText(self.arr5[num], mycanvas.width / 2, 560);
              drawing(num + 1);
            }else if(num == 7){
              context.font = '33px Microsoft YaHei';
              context.fillStyle = '#fff';
              context.textAlign = 'center';
              context.fillText(self.arr5[num], mycanvas.width / 2, 390);
              drawing(num + 1);
            }
          } else {
            self.pic1 = mycanvas.toDataURL("image/jpeg");
            self.arr3.unshift(self.pic1);
            self.arr1.unshift(self.pic1);
            self.selected = self.arr3[0];
          }
        }

        drawing(0)


      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="less">
  #commission {
    font-size: 0.205rem;
    color: #333;
    background-color: #333;
    width: 100%;
    height: calc(~"100vh - 0.34rem");
    padding-top: 0.34rem;
    .tu {
      width: calc(~"100% - 50% - 2.474rem");
      // padding-left: calc(~"50% - 2.474rem");
      padding-left: calc(~"50% - 2.1rem");
      img {
        // width: 4.949rem;
        height: 9rem;
      }
    }
    .tip {
      width: 100%;
      text-align: center;
      color: #fff;
      margin-top: 0.15rem;
      font-size: 0.28rem;
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
