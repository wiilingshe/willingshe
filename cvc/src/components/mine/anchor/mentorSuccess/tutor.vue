<template>
  <div class="box tutor" style="overflow-x: hidden;">
    <div class="header">
      <ul>
        <li>
          <img :src="arr.face" alt="" :onerror="errorImg02"/>
        </li>
        <li style="display:table;height:2rem;">
          <div style="display: table-cell;vertical-align: middle;color:#fff">
            <p>{{ arr.username }}</p>
            <p>学院：{{ arr.orgname }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="nav">
      <ul>
        <li @click="works()">
          <i class="iconfont icon-shipin"></i>
          <div>{{ arr.video_count }}</div>
        </li>
        <li @click="serAsk()">
          <i class="iconfont icon-kecheng"></i>
          <div>{{ arr.series_count }}</div>
        </li>
        <li @click="assets()">
          <i class="iconfont icon-qian"></i>
          <div>{{ arr.balance }}</div>
        </li>
      </ul>
    </div>
    <div class="main" style="background:#fff;margin-top:0.1rem;">
      <div class="works" @click="works()" style="border-bottom: 1px solid #f1f2f6;">
        <span>我的作品</span>
        <span class="iconfont icon-dayuhao1" style="float:right"></span>
      </div>
      <div class="assets" @click="assets()" style="border-bottom: 1px solid #f1f2f6;">
        <span>我的资产</span>
        <span class="iconfont icon-dayuhao1" style="float:right"></span>
      </div>
      <div class="assets" @click="serAsk()" style="border-bottom: 1px solid #f1f2f6;">
        <span>我的问答</span>
        <span class="iconfont icon-dayuhao1" style="float:right"></span>
      </div>
      <div class="assets" @click="getCard()" style="border-bottom: 1px solid #f1f2f6;">
        <span>我的名片</span>
        <span class="iconfont icon-dayuhao1" style="float:right"></span>
      </div>
      <div class="assets" @click="setCard()" style="border-bottom: 1px solid #f1f2f6;">
        <span>名片设置</span>
        <span class="iconfont icon-dayuhao1" style="float:right"></span>
      </div>
    </div>
    <div style="color:#999;font-size:0.26rem;text-align: center;position: absolute;width: 100%;bottom: 0.2rem;">
      <div>小象SaaS提供技术支持</div>
      <div>www.saasxx.vip</div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        errorImg02: 'this.src="' + require('../../../../../static/img/logo.png') + '"',
        arr: []
      }
    },
    created(){
      this.global.shouquan();
      this.noShare();
      document.title = '我是导师';
      this.getData('get', '/shop-v1-shop_get_shop_info.html').then(res => {
        if (res.status == 200) {
          this.arr = res.data;
        }
      })
    },
    methods: {
      works(){
        this.$router.push('/mine-works');
      },
      assets(){
        this.$router.push('/mine-assets');
      },
      serAsk(){
        this.$router.push('/serAsk');
      },
      getCard(){
        this.$router.push({path: '/establishCard', query: {shop_id: this.arr.shop_id}});
      },
      setCard(){
        this.$router.push({path: '/setCard', query: {shop_id: this.arr.shop_id}});
      }
    }

  }
</script>

<style scoped>
  .tutor {
    font-size: 0.26rem;
  }

  .nav ul li {
    float: left;
    width: 33.333%;
    text-align: center;
    padding-top: 0.15rem;
  }

  .nav ul li div {
    color: #666;
  }

  .header {
    height: 2rem;
    background: #5e96d0;
  }

  .header img {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 1.2rem;
    margin-left: 0.4rem;
    margin-right: 0.2rem;
    margin-top: 0.4rem;
  }

  .header ul li {
    float: left;
  }

  .information {
    font-size: 0.26rem;
    color: white;
    margin-top: 0.5rem;
    display: inline-block;
  }

  .nav {
    height: 1.4rem;
    background-color: white;
  }

  .icon-shipin {
    color: orangered;
    font-size: 0.7rem;
  }

  .icon-kecheng {
    color: green;
    font-size: 0.7rem;
  }

  .icon-qian {
    color: orange;
    font-size: 0.7rem;
  }

  .works, .assets {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.221rem;
    margin: 0 0.2rem;
  }

  .icon-dayuhao1 {
    color: #f1f2f6;
  }
</style>
