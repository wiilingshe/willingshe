<template>
  <div id="app">
    <router-view></router-view>
    <!-- <lg-preview></lg-preview> -->
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {
      }
    },
    methods:{
    },
    watch:{
    }
  }
</script>

<style lang="less">
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  color: #333;
  height: 100vh;
  background: #f1f2f6;
  .mint-navbar{
    // position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
  }
  .detailsPage2 .mint-navbar{
    margin-top: 0.2rem;
  }
  .mint-tab-item-label{
    font-size: 0.22rem;
    position: relative;
    top: -0.02rem;
    // color: #999;
  }
  .detailsPage .mint-tab-item-label {
    font-size: 0.28rem;
    line-height: 0.88rem;
    /*color: #666;*/
  }
  .detailsPage2 .mint-tab-item-label {
    font-size: 0.28rem;
    line-height: 0.7rem;
  }
  .mint-tab-item-icon{
    width: 0.52rem;
  }
  .mint-tab-item-icon img{
    height: 0.48rem;
    width: auto;
    position: relative;
    // top: -0.05rem;
  }
  @media screen and (max-width: 375px) {
    .mint-tab-item-icon img{
      top: 0.01rem;
    }
    .mint-tab-item-label{
      top: -0.05rem;
    }
    .mint-tab-item-icon{
      width: 0.52rem;
    }
  }
 @media screen and (min-width: 414px){
  .detailsPage2 .mint-tab-item-label .line{
    position: relative;
    top: -0.1rem;
    border-radius: 0.02rem;
  }
 }
  .mint-tabbar{
    background-color: #fff;
    border-top:1px solid #eee;
    background-image: none;
  }
  .mint-tabbar > .mint-tab-item.is-selected{
    color: #222;
    background-color: #fff;
  }
  .mint-tabbar > .mint-tab-item.is-selected .mint-tab-item-label{
    color: #222;
  }
  .mint-tab-item{
    padding: 0.094rem 0 0.3rem;
  }
  .detailsPage2 .mint-tab-item{
    padding: 0.094rem 0;
  }
  .mint-swipe-indicator{
    border:1px solid #fff;
    opacity: 1;
    width: 0.08rem;
    height: 0.08rem;
    background-color: transparent;
  }
  .mint-swipe-indicator.is-active{
    background-color: #fff;
  }
  .hotactivity{
    .mint-swipe-indicator{
      border:1px solid #666;
      opacity: 1;
      width: 0.08rem;
      height: 0.08rem;
      background-color: transparent;
    }
    .mint-swipe-indicator.is-active{
      background-color: #333;
    }
  }
}
.iconfont {
	font-size: 0.4rem;
}
</style>
