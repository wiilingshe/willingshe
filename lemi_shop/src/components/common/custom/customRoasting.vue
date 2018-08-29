<template>
    <div class="customRoasting" >
      <div class="customRoasting_swipe1" style="" v-if="roastingObj.css_type == 1">
        <mt-swipe :auto="5000">
          <mt-swipe-item  v-for="(item,index) in roastingObj.content" :key="index">
            <div style="display: table;width:100%;height: 100%;">
              <div style="display: table-cell;width:100%;vertical-align: middle;height: 100%;background-color: #ccc">
                <img  class="customRoasting_swipe1-img"  :src="item.pic"  onerror="this.src=&quot;/static/img/onerr1.png&quot;" @click="goRoute(item.link)">
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="customRoasting_swipe2" v-if="roastingObj.css_type == 2">
        <div class="customRoasting_swipe2-item" v-for="j in roastingObj.content" @click="goRoute(j.link)">
          <img  class="customRoasting_swipe2-img"  :src="j.pic" onerror="this.src=&quot;/static/img/onerr1.png&quot;" @click="goRoute(j.link)">
        </div>
      </div>
    </div>
</template>

<script>
  import { Swipe, SwipeItem,Toast } from 'mint-ui';
    export default{
        data(){
            return{}
        },
      created(){
      },
      props:{
        roastingObj:Object
      },
      methods:{
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

<style lang="less">
  .customRoasting{
    background-color: #ffffff;

    &_swipe1{
      height: 0rem;
    }
    .mint-swipe-indicator{
      box-sizing: border-box;
      background-color: #000000;
      opacity: 0.6;
    }
    .mint-swipe-indicator.is-active{
      background-color: #ffffff;
      border: 0.03rem solid #333;
      opacity: 1;
    }
    &_swipe1-img{
      display: block;
      width: 100%;
    }
    &_swipe2-img{
      display: block;
      width: 100%;
    }
  }
</style>
