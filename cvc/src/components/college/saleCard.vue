<template>
  <div class="saleCard" v-show="ifload">
    <!--<img class="saleCard-img" :src="pic">-->
    <img class="saleCard-img" :src="pic">
    <div class="saleCard-tip1">长按上图保存图片，或发送给朋友</div>
    <div class="saleCard-tip2">成功邀请1位好友，至少可赚{{list.dist_fee}}元</div>
    <div class="bottom">
      <div v-for="(i,index) in arr1" @click="select(index)">
        <img :src="i" class="select1">
        <img src="/static/img/college/selected.png" class="select" v-show="selected==index">
      </div>
    </div>
  </div>
</template>
<script>
  import {Indicator, Toast} from 'mint-ui';
  export default{
    data(){
      return {
        list: [],
        ifload: false,
        pic: '',
//        arr5: ['/static/img/college/Distribution1.jpg', '每月仅需         元！', '一年系列课程 元', '9999', ''],
        arr1: ['/static/img/college/01.jpg', '/static/img/college/02.jpg', '/static/img/college/03.jpg', '/static/img/college/04.jpg'],
        arr5: [['/static/img/college/011.jpg', '每月仅需         元！', '一年系列课程 元', '9999', ''], ['/static/img/college/022.jpg', '每月仅需         元！', '一年系列课程 元', '9999', ''], ['/static/img/college/033.png', '每月仅需         元！', '一年系列课程 元', '9999', ''], ['/static/img/college/044.jpg', '每月仅需         元！', '一年系列课程 元', '9999', '']],
        pic1: [],
        selected: 0
      }
    },
    created(){
      document.title = "邀请卡";
      Indicator.open('努力加载中...');
      var self = this;
      this.global.shouquan();
      self.getData('post', '/shop-v2-college-current_term.html').then(res1 => {
        this.postData('post', '/shop-v2-college-get_term_card.html', {url: window.location.origin + '/collegeHome?root_id=' + this.globalid}).then(res => {
          if (res.data.status == 1) {
            if (Date.parse(new Date()) / 1000 >= res1.data.data.scare_endtime) {
              res1.data.data.marketing_type = 0;
            }
            for (var i = 0; i < self.arr5.length; i++) {
              if (res1.data.data.marketing_type == 0) {
                if (res1.data.data.sales_on == 1) {
                  self.arr5[i][3] = Number(res1.data.data.sales_fee);
                } else {
                  self.arr5[i][3] = Number(res1.data.data.term_fee);
                }
              } else if (res1.data.data.marketing_type == 1) {
                self.arr5[i][3] = Number(res1.data.data.union_fee);
              } else if (res1.data.data.marketing_type == 2) {
                self.arr5[i][3] = Number(res1.data.data.scare_fee);
              }
            }
//            if (res1.data.data.marketing_type == 0) {
//              if (res1.data.data.sales_on == 1) {
//                self.arr5[3] = Number(res1.data.data.sales_fee);
//              } else {
//                self.arr5[3] = Number(res1.data.data.term_fee);
//              }
//            } else if (res1.data.data.marketing_type == 1) {
//              self.arr5[3] = Number(res1.data.data.union_fee);
//            } else if (res1.data.data.marketing_type == 2) {
//              self.arr5[3] = Number(res1.data.data.scare_fee);
//            }
            for (let i = 0; i < this.arr5.length; i++) {
              this.arr5[i][4] = res.data.data.qr_code;
              this.arr5[i][2] = '一年系列课程' + this.arr5[i][3] + '元';
              this.arr5[i][3] = (this.arr5[i][3] / 12).toFixed(0);
            }
            self.hecheng2(this.arr5[0])
//            self.hecheng2(res.data.data.qr_code);
            self.list = res1.data.data;
          } else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 3000
            });
          }
        }, res => {
          Indicator.close();
          Toast({
            message: res.data.msg,
            duration: 3000
          });
        })
      }, res => {
        Indicator.close();
        Toast({
          message: res.data.msg,
          duration: 3000
        });
      })
    },
    mounted(){
    },
    methods: {
      /**
       * 合成图片
       * @param arr
       * @param i
       * by heqingqing 2018/06/15
       */
      hecheng2(arr){
        var self = this;
//        var h = 0;
        var len = arr.length;
        var mycanvas = document.createElement('canvas');
        document.body.appendChild(mycanvas);
        $('canvas').css('display', 'none');
        mycanvas.width = 692;
        mycanvas.height = 1230;
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
              context.font = '36px Microsoft YaHei';
              context.fillStyle = '#EFCB5D';
              context.textAlign = 'center';
              context.fillText(arr[num], 235, 1070);
              drawing(num + 1);
            } else if (num == 2) {
              context.font = '26px Microsoft YaHei bold';
              context.fillStyle = '#fff';
              context.textAlign = 'center';
              context.fillText(arr[num], 195, 1120);
              drawing(num + 1);
            } else if (num == 3) {
              context.font = '46px Microsoft YaHei bold';
              context.fillStyle = '#FF2946';
              context.textAlign = 'center';
              context.fillText(arr[num], 268, 1075);
              drawing(num + 1);
            } else if (num == 4) {
              img.onload = function () {
                context.drawImage(img, 450, 966, 150, 150);
                drawing(num + 1);
              }
              img.onerror = function () {
                drawing(num + 1);
              }
            }
          } else {
            self.ifload = true;
            Indicator.close();
//            self.pic1.push(mycanvas.toDataURL("image/jpeg"));
//            self.pic = self.pic1[0];
            self.pic = mycanvas.toDataURL("image/jpeg")
          }

        }

        drawing(0)
      },
      /**
       * select:底部图片选中
       * by heqingqing 2018/06/15
       */
      select(index){
        var self = this;
//        Indicator.open('努力加载中...');
        self.hecheng2(self.arr5[index]);
//        self.pic = self.pic1[index];
        self.selected = index;
      }
    }
  }
</script>
<style lang="less">
  .saleCard {
    font-size: 0.24rem;
    color: #333;
    text-align: center;
    background-color: #fff;
    height: 100vh;
    &-img {
      /*width: 5.8rem;*/
      /*margin-top: 0.30rem;*/
      /*height: 9rem;*/
      width: 5rem;
    }
    &-tip1 {
      font-size: 0.3rem;
      color: #333;
      /*margin-top: 0.16rem;*/
      margin-top: -0.05rem;
    }
    &-tip2 {
      font-size: 0.26rem;
      color: #666;
      /*margin-top: 0.06rem;*/
    }
    .bottom {
      width: calc(~"100% - 0.34rem");
      padding: 0 0.17rem;
      overflow-x: scroll;
      position: fixed;
      bottom: 0;
      background-color: #fff;
      /*height: 1.536rem;*/
      height: 1.2rem;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      div:first-child {
        margin-left: 0.2rem;
      }
      div {
        display: inline-block;
        margin-right: 0.2rem;
        /*margin-top: 0.235rem;*/
        width: 1.066rem;
        height: 1.066rem;
        position: relative;
        .select1 {
          width: 100%;
        }
        .select {
          position: absolute;
          width: 0.3rem;
          right: 0.1rem;
          bottom: 0.17rem;
          z-index: 1;
        }
      }
    }
  }
</style>
