<template>
  <div class="customSerise">
    <div class="serise" v-for="i in seriseObj.series_list">
      <div class="serise_head" @click="goRoute(i.link)">
        <img class="serise_img1" :src="i.pic1" onerror="this.src=&quot;/static/img/onerr1.png&quot;">
        <div class="serise_back">
          <span class="serise_icon">
            <i class="icon iconfont icon-8shipinicon"></i>
          </span>
        </div>
      </div>
      <div class="serise_foot">
        <div class="serise_title" @click="goRoute(i.link)">{{i.ser_title}}</div>
        <div class="serise_scroll">
          <ul class="serise_list">
            <!--i.goods_list-->
            <li class="serise_item"  v-for="j in i.goods_list" @click="goRoute(j.link)" :class="i.goods_list.length==1?'item_one':''">
              <div class="serise_itemwrap">
                <img :src="j.pic" class="serise_img2" onerror="this.src=&quot;/static/img/onerr1.png&quot;">

                <div class="serise_con" :class="i.goods_list.length==1?'item_con':''" >
                  <p class="serise_name">{{j.goods_name}}</p>
                  <p class="serise_price">￥{{j.shop_price}}</p>
                </div>
                <div class="serise_btnwrap" v-if="i.goods_list.length==1">
                  <div class="serise_btn">立即购买</div>
                </div>
              </div>
            </li>
            <li class="serise_null" v-if="!i.goods_list.length">
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
      return {}
    },
    props:{
      seriseObj:Object
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
  .serise{
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
      font-size: 0.26rem;
      color: #ffffff;
      background-color: #fe5875;
      border-radius: 0.3rem;
    }
    &_itemwrap{
      display: table;
      width: 100%;
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
