<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Navigator></Navigator> -->
  </div>
</template>

<script>
  // import Navigator from '@/components/common/Navigator'
  export default {
    name: 'app',
    data(){
      return {
      }
    },
    // components:{Navigator},
    methods:{
    },
    watch:{
    }
  }
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  color: #333;
  height: 100%;
  background: #f1f2f6
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
.iconfont {
	font-size: 0.4rem;
}
</style>
