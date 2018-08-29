<template>
  <div class="giving">
    <div class="title">
      <div @click="info(1)" :class="style===1?'red':null">我的赠礼
      </div>
      <div @click="received(2)" :class="style===2?'red':null">收到的赠礼
      </div>
    </div>
    <info v-show="style==1" ref="child0"></info>
    <received v-show="style==2" ref="child1"></received>
  </div>
</template>

<script>
  import info from '@/components/gift/info';
  import received from '@/components/gift/received';
  export default{
    data(){
      return {
        style: 1
      }
    },
    created(){
      document.title = "赠礼"
    },
    methods: {
      received(e){
        this.style = e;
        if (this.$refs.child1.pageNo2 == 1) {
          this.$refs.child1.getData2();
        }
        this.$refs.child1.loading2 = false;
        this.$refs.child0.loading1 = true;
      },
      info(e){
        this.style = e;
        this.$refs.child0.loading1 = false;
      }
    },
    components: {info, received}
  }
</script>

<style scoped lang="less">
  .giving {
    .title {
      display: flex;
      flex-direction: row;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-flex-direction: row;
      -webkit-justify-content: space-between;
      top: 0;
      width: 100%;
      background-color: white;
      div {
        font-size: 0.26rem;
        flex: 1;
        text-align: center;
        height: 0.92rem;
        line-height: 0.92rem;
        background-color: white;
        color: #999;
      }
      .red {
        color: #5e96d0;
      }
    }

  }


</style>
