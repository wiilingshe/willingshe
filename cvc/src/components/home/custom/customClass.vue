<template>
    <div class="customClass">
      <div class="customClass_item" :class="classObj.css_type == 2?'customClass_'+classObj.content.length:'customClass_4'" v-for="j in classObj.content" @click="goRoute(j.link)">
        <img class="customClass_img" :src="j.pic" onerror="this.src=&quot;/static/img/onerr2.png&quot;">
        <span style="display:block;margin-top: 0.1rem">
            {{j.title}}
          </span>
      </div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';

  export default{
      data(){
        return{}
      },
      props:{
        classObj:Object
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

<style scoped lang="less">
  .customClass{
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
    &_item{
      float: left;
      width: 25%;
      height: 1rem;
      padding:0.24rem 0;
      text-align: center;
    }
    &_1{
      width: 100%;
      .customClass_img{
        width: 10%;
      }
    }
    &_2{
      width: 50%;
      .customClass_img{
        max-width: 20%;
      }
    }
    &_3{
      width: 33.3%;
      .customClass_img{
        max-width: 30%;
      }
    }
    &_4{
      width: 25%;
      .customClass_img{
        max-width: 40%;
      }
    }
    &_img{
      display: block;
      height: 60%;
      margin: auto;
      /*border-radius: 50%;*/
      .icon-kecheng1{
        font-size: 0.9rem;
        color: #0086b3;
        width: 100%;
        height: 100%;
      }
    }

  }

</style>
