<template>
  <div class="token">
    <div class="token_button" @click="getKen()">获取toKen</div>
  </div>
</template>

<script>
  export default {
      data(){
          return{

          }
      },
    created(){
      // this.global.shouquan();
      this.getData('get','/shop-v1-index_lemi_test.html').then(res => {
        if(res.status == 200){
          console.log(res);
          let that = this;
          $('.token_button').html('获取toKen成功')
          setTimeout(function () {
            that.$router.push({path: "/"});
          },2000);
        }
      })
    },
    methods:{
      getKen(){

        this.getData('get','/shop-v1-index_lemi_test.html').then(res => {
            if(res.status == 200){
              console.log(res);
              this.$router.push({path: "/"});
            }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .token{
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    &_button{
      position: fixed;
      left: 0;
      top:0;
      bottom: 0;
      right: 0;
      width: 3rem;
      height: 1.5rem;
      margin: auto;
      line-height: 1.5rem;
      text-align: center;
      color: #fe0c2c;
      font-size: 0.4rem;
      border-radius: 0.4rem;
      background-color: #cccccc;
    }

  }


</style>
