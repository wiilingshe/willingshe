<template>
  <div class="customGoods">
    <!--样式1，3-->
    <div class="customGoods_wrap" v-if="goodsObj.css_type == 1||goodsObj.css_type == 3" :class="'goods_'+goodsObj.css_type">
      <div class="customGoods_item" v-for="i in goodsObj.goods_list" @click="goRoute(i.link)">
        <img :src="i.pic" alt="" class="customGoods_img" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" >
        <div class="customGoods_content">
          <p class="customGoods_name">{{i.goods_name}}</p>
          <p class="customGoods_price">￥{{i.shop_price}}</p>
        </div>
      </div>
    </div>
    <!--样式2-->
    <div class="customGoods_wrap" v-if="goodsObj.css_type == 2" :class="'goods_'+goodsObj.css_type">
      <div class="customGoods_item" v-for="i in goodsObj.goods_list" @click="goRoute(i.link)">
        <div class="customGoods_content">
          <p class="customGoods_name">{{i.goods_name}}</p>
          <p class="customGoods_price">￥{{i.shop_price}}</p>
        </div>
        <img :src="i.pic" alt="" class="customGoods_img" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" >
      </div>
    </div>
    <!--样式4-->
    <div class="customGoods_wrap" v-if="goodsObj.css_type == 4" :class="'goods_'+goodsObj.css_type">
      <div class="customGoods_fall">
        <div class="customGoods_left"></div>
        <div class="customGoods_right"></div>
      </div>
      <div class="customGoods_item" v-for="i in goodsObj.goods_list" @click="goRoute(i.link)">
        <img :src="i.pic" alt="" class="customGoods_img" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" @load="imgLoad()" >
        <div class="customGoods_content">
          <p class="customGoods_name">{{i.goods_name}}</p>
          <p class="customGoods_price">￥{{i.shop_price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        imgLen:0,
        customClass:''
      }
    },
    props:{
      goodsObj:Object
    },
    created(){
      this.imgLen = this.goodsObj.goods_list.length;
      this.customClass = '.custom'+this.goodsObj.sorting
    },
    methods: {
//        加载完成后，进行排序
      imgLoad(){
        this.imgLen--;
        if(this.imgLen == 0){
          this.appendFall();
        }
      },
//      瀑布流
      appendFall(){
        let that = this;
        let goodsLeft = $(this.customClass+' .customGoods_left');
        let goodsRight = $(this.customClass+' .customGoods_right');
        $(this.customClass+' .customGoods_item').each(function () {
          if(goodsLeft.height() <= goodsRight.height()){
            $(that.customClass+' .customGoods_left').append($(this));
          }else{
            $(that.customClass+' .customGoods_right').append($(this));
          }
        });
      },
      goRoute(herf){
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
    }
  }
</script>
<style scoped lang="less">
  .customGoods{
    background-color: #ffffff;

    &_content{
      font-size: 0.24rem;
    }
    &_name{
      color: #333333;
    }
    &_price{
      color: #ef4949;
    }

    .goods_1,.goods_2{
      padding: 0.1rem;
      .customGoods_item{
        display: table;
        width: 100%;
        margin-bottom: 0.2rem;
        /*&:last-of-type{*/
        /*margin-bottom: 0;*/
        /*}*/
      }
      .customGoods_content{
        display: table-cell;
        width: 100%;
        height:100%;
        vertical-align: middle;
      }
      .customGoods_img{
        display: table-cell;
        width: 2rem;
        height: 1.2rem;
      }
      .customGoods_price{
        margin-top: 0.2rem;
      }

    }
    .goods_3{
      position: relative;
      overflow: hidden;
      padding: 2vw;
      .customGoods_content{
        margin-top: 0.1rem;
      }
      .customGoods_price{
        margin-top: 0.1rem;
      }
      .customGoods_item{
        float: left;
        box-sizing: border-box;
        width: 47vw;
        margin-bottom: 2vw;
        padding: 2vw;
        border: 0.02rem solid #dddddd;
        &:nth-of-type(odd){
          margin-right: 2vw;
        }
      }
      .customGoods_img{
        width: 43vw;
        height: 43vw;
      }

    }
    .goods_4{
      padding: 2%;
      .customGoods_fall{
        width: 100%;
        font-size: 0;
      }
      .customGoods_left{
        display: inline-block;
        width: 49%;
        margin-right: 2%;
        overflow: hidden;
        vertical-align: top;
      }
      .customGoods_right{
        display: inline-block;
        width: 49%;
        vertical-align: top;

      }

      .customGoods_content{
        margin-top: 0.1rem;
        padding: 0 0.1rem;
      }
      .customGoods_price{
        margin-top: 0.1rem;
      }
      .customGoods_item{
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 5%;
        padding: 1%;
        border: 0.02rem solid #dddddd;
      }
      .customGoods_img{
        width: 100%;
      }
    }
  }
</style>
