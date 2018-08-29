<template>
  <div class="daoshiProcess">
    <div class="daoshiProcess_icon">
      <i class="iconfont icon-2"></i>
    </div>
    <div class="daoshiProcess_title">
      <div style="margin-left: 0.4rem;">
        请先申请成为机构
      </div>
    </div>
    <div class="daoshiProcess_guide">
      <div style="margin-left: 0.4rem;">
        流程预览：
      </div>
    </div>
    <div class="daoshiProcess_guidePic">
      <img src="../../../../static/img/card/jglct.png"/>
    </div>
    <div class="daoshiProcess_welfare">
      <div style="margin-left: 0.4rem;">
        机构福利：
      </div>
    </div>
    <div class="daoshiProcess_content">
      <div style="margin-left: 0.4rem;">
        <p>1、课程可进行线上推广销售，获得分佣。</p>
        <p>2、可在所属平台下发表文章。</p>
        <p>3、可创建专属名片及专属网站，线上分享。</p>
      </div>
    </div>
    <div class="daoshiProcess_btn">
      <p @click="jigou()">立即成为机构</p>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    methods: {
      jigou()
      {
        this.$router.push('/mine-college-apply');
      }
    }
  }
</script>

<style lang="less">
  .daoshiProcess {
    .daoshiProcess_icon {
      width: 100%;
      margin-bottom: 0.2rem;
      text-align: center;
      i {
        font-size: 0.8rem;
        color: #f08080;
      }
    }
    .daoshiProcess_title {
      width: 100%;
      text-align: center;
      font-size: 0.3rem;
      margin-bottom: 0.4rem;
      color: #666666;
    }
    .daoshiProcess_guide {
      font-size: 0.3rem;
      color: #333;
      width: 100%;
      margin-bottom: 0.4rem;
    }
    .daoshiProcess_guidePic {
      width: 80%;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .daoshiProcess_welfare {
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
      margin-top: 0.6rem;
    }
    .daoshiProcess_content {
      font-size: 0.24rem;
      color: #999999;
    }
    .daoshiProcess_btn {
      height: 0.9rem;
      margin-left: 0.4rem;
      margin-right: 0.4rem;
      font-size: 0.3rem;
      color: white;
      background: #5E96D0;
      border-radius: 0.1rem;
      text-align: center;
      line-height: 0.9rem;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;

    }
  }
</style>
