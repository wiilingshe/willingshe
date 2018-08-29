<template>
  <div class="box">
    <div class="main">
      <div class="main-box" @click="login()" v-show="isShow">
        <div>绑定导师账号</div>
        <div>&gt;</div>
      </div>
      <div class="main-box" @click="register(url)">
        <div>申请导师<span v-if="show" style="color:#666">（{{status}}）</span></div>
        <div>&gt;</div>
      </div>
    </div>
    <div style="color:#999;font-size:0.26rem;text-align: center;position: absolute;width: 100%;bottom: 0.2rem;">
      <footer1></footer1>
    </div>
  </div>
</template>

<script>
  import Navigator from '../common/Navigator'
  import footer1 from '@/components/publicPage/footer1'
  export default {
    data(){
      return {
        show: true,
        status: '--',
        url: '',
        isShow: true
      }
    },
    created(){
      document.title = '申请导师';
      this.global.shouquan();
      this.getData('get', '/shop-v1-shop_get_shop_status.html', {shop_type: '1'}).then(res => {
        if (res.data.status == null) {
          this.status = '未申请'
          this.url = '/mine-anchor-register';
        } else if (res.data.status == '1') {
          this.status = '审核通过'
          this.url = '/mine-tutor';
        } else if (res.data.status == '2') {
          this.status = '审核失败'
          this.url = '/mine-anchor-register';
        } else if (res.data.status == '3') {
          this.status = '审核中'
          this.url = '';
          this.isShow = false;
        } else if (res.data.status == '4') {
          this.status = '账号冻结'
          this.url = '';
        }
      })
    },
    components: {footer1},
    methods: {
      login: function () {
        this.$router.push('/mine-anchor-login');
      },
      register: function (url) {
        this.$router.push(url);
      }
    },
    mounted(){
      this.share('申请导师', '我的个人中心', this.sharePic);
    }
  }

</script>

<style scoped>
  .main-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.26rem;
    line-height: 0.8rem;
    border-bottom: 0.01rem solid #eee;
    margin: 0 0.2rem;
  }

  .main-box div:nth-child(2) {
    color: #eaeaea;
  }

  .main {
    background: #fff;
  }

</style>
