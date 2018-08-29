<template>
  <div class="customTitle">
      <span class="customTitle_title">{{titleObj.title}}</span>
      <span class="customTitle_jump" v-if="titleObj.showright" @click="goRoute(titleObj.jump)">
            <i class="icon iconfont icon-dayuhao1"></i>
      </span>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default{
    data(){
      return {}
    },
    props:{
      titleObj:Object
    },
    created(){
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
  .customTitle{
    display: table;
      width: 100%;
      overflow: hidden;
      padding: 0.16rem 0;
      border-top: 0.02rem solid #d3d3d3;
      border-bottom: 0.02rem solid #d3d3d3;

    &_title{
      display: table-cell;
      width: 70%;
      padding-left: 0.25rem;
      font-size: 0.3rem;
      color: #646464;
    }
    &_jump{
      display: table-cell;
      width: 30%;
      padding-right: 0.2rem;
      text-align: right;
      color: #000;
    }
    .icon-dayuhao1{
      font-size: 0.3rem;
    }
  }
</style>
