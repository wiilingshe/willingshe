<template>
  <div class="customSingle">
    <div class="single" v-for="i in singleObj.video_list">
      <div class="single_head" @click="goRoute(i.link)">
        <img class="single_img1" :src="i.pic1" onerror="this.src=&quot;/static/img/onerr1.png&quot;">
        <div class="single_back">
          <span class="single_icon">
            <i class="icon iconfont icon-8shipinicon"></i>
          </span>
        </div>
      </div>
      <div class="single_foot">
        <div class="single_title" @click="goRoute(i.link)">{{i.title}}</div>
        <div class="single_scroll">
          <ul class="single_list">
            <!--i.goods_list-->
            <li class="single_item"  v-for="j in i.goods_list" @click="goRoute(j.link)" :class="i.goods_list.length==1?'item_one':''">
              <div class="single_itemwrap">
                <img :src="j.pic" class="single_img2" onerror="this.src=&quot;/static/img/onerr1.png&quot;">
                <div class="single_con" :class="i.goods_list.length==1?'item_con':''">
                  <p class="single_name">{{j.goods_name}}</p>
                  <p class="single_price">￥{{j.shop_price}}</p>
                </div>
                <div class="single_btnwrap" v-if="i.goods_list.length==1">
                  <div class="single_btn">立即购买</div>
                </div>
              </div>
            </li>
            <li class="single_null" v-if="!i.goods_list.length">
              暂无关联商品~
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    data(){
      return {
//          arr:[{goods_id:"A1ME",goods_name:"全新OPPO-RS手机",link:"https://shop.oopca.com/goodDetails?goods_id=A1ME&root_id=Aw",pic:"https://file.oopca.com/images/shop/1/2018/01/16/a71e863b6cf5a09af6bc6589ba6cf831165746.jpg?auth_key=1518146570-0-0-fdda98445994cb61994daaddb1bf3823",shop_price:"1500.00"}]
      }
    },
    props:{
      singleObj:Object
    },
    created(){
    },
    methods: {
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
  .single{
    margin-bottom: 0.2rem;
    background-color:#f2f3f7;
    &:last-of-type {
      margin-bottom: 0;
    }

    &_head{
      width: 100%;
      height: 56vw;
      overflow: hidden;
      position: relative;
      background-color: #ffffff;
      /*&:after{*/
        /*position: absolute;*/
        /*bottom: 0;*/
        /*left: 47%;*/
        /*content: '';*/
        /*display: block;*/
        /*width: 0;*/
        /*border-width:0.15rem;*/
        /*border-style:solid;*/
        /*border-color: transparent transparent #ffffff transparent;*/
      /*}*/
    }
    &_img1{
      width: 100%;
    }
    &_back{
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
    &_icon{
      position: absolute;
      left: 42%;
      top: 35%;
    }
    .icon-8shipinicon{
      font-size: 1rem;
      color:#ffffff;
    }

    &_foot{
      /*width: 100%;*/
      padding: 0 0.1rem 0.2rem;
      background-color: #ffffff;
    }
    &_title{
      line-height: 0.7rem;
      text-align: center;
      font-size: 0.3rem;
      color: #333333;

      max-width: 100%;
      white-space:nowrap;
      text-overflow:ellipsis;
      -o-text-overflow:ellipsis;
      overflow:hidden;
    }
    &_scroll{
      overflow: scroll;
      height: 1.2rem;
    }
    &_list{
      display: flex;
      min-width: 100%;
      max-width: 600%;
    }

    &_item{
      flex: 0 0 2.8rem;
      height: 1rem;
      padding: 0.04rem;
      overflow: hidden;
      margin-right: 0.1rem;
      border: 0.02rem solid #cccccc;
      border-radius: 0.1rem;
    }
    &_itemwrap{
      display: table;
      width: 100%;

    }
    .item_one{
      flex: 1;
      margin: 0;
      border: 0;
      .single_name{
        max-width: 2.5rem;
      }
    }
    &_btnwrap{
      display: table-cell;
      width: 100%;
      vertical-align: middle;
      text-align: right;
    }
    &_btn{
      display: inline-block;
      padding: 0.1rem 0.2rem;
      color: #ffffff;
      font-size: 0.26rem;
      background-color: #fe5875;
      border-radius: 0.3rem;
    }
    &_img2{
      display: table-cell;
      width:1rem;
      height: 1rem;
      margin-right: 0.1rem;
    }
    &_con{
      display: table-cell;
      width: 100%;
      font-size: 0.21rem;
      vertical-align: middle;
    }
    .item_con{
      width: auto;
    }
    &_name{
      margin-bottom: 0.1rem;
      color: #666;
      font-size: 0.26rem;

      max-width: 1.5rem;
      white-space:nowrap;
      text-overflow:ellipsis;
      -o-text-overflow:ellipsis;
      overflow:hidden;
    }
    &_price{
      font-size: 0.22rem;
      color: #fe5875;
    }
    &_null{
      color: #999999;
    }
  }
</style>
