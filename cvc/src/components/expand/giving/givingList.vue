<template>
  <div class="giving">
    <div class="navhead">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">我的赠礼</mt-tab-item>
        <mt-tab-item id="2">收到的赠礼</mt-tab-item>
      </mt-navbar>
    </div>
    <div></div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="playtime">
          111
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div>
          222
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
    export default{
        data(){
            return {
              selected:'1',
            }
        },
        created(){
//          this.selected = '1';
        },
        methods: {}
    }
</script>

<style scoped lang="less">
  .giving{

    .is-selected{
      border: none;
      margin-bottom: 0;
      color: #ef4949;
    }




  }


</style>
