<template>
  <div id="box2" style="min-height:100%;">
    <div id="trueHeight">
      <!-- <div style="height:0.2rem;"></div>
            <div calss="title1" style="font-size: 0.3rem;color: #fff;border-left: 0.1rem solid red;margin-left: 0.2rem;margin-bottom: 0.2rem;padding-left:0.1rem;font-weight:500">热门课程</div> -->
      <div v-show="!wancheng" style="font-size:0.26rem;text-align:center;">加载中...</div>
      <div v-for="(item,index) in list">
        <router-link :to="{path:'/details',query:{ser_id:item.ser_id}}">
          <div id="main">
            <div class="div1">
              <img :src="item.pic">
            </div>
            <div class="div2">
              <div class="middle">
                <div class="titles">{{item.ser_title}}</div>
                <div class="author">{{item.shop_name}}</div>
              </div>
            </div>
          </div>
        </router-link>
        <!-- <router-link :to="{path:'/details',query:{ser_id:item.ser_id}}">
                    <div id="main2" v-if="index%2 != 0">
                        <div class="div1">
                            <div class="middle">
                                <div class="titles">{{item.ser_title}}</div>
                                <div class="author">{{item.shop_name}}</div>
                            </div>
                        </div>
                        <div class="div2">
                            <img :src="item.pic">
                        </div>
                    </div>
                </router-link> -->
      </div>
    </div>
    <div v-show="wancheng" id="footer1">
      <footer1></footer1>
    </div>
    <Navigator></Navigator>
  </div>
</template>

<script>
  import Navigator from '@/components/common/Navigator'
  import footer1 from '@/components/publicPage/footer1'
  export default {
    data: function () {
      return {
        list: [],
        wancheng: false,
      }
    },
    created(){
      document.title = '热门课程';
      this.global.shouquan();
    },
    mounted(){
      this.share('热门课程', '', this.sharePic)
      this.postData('post', '/shop-v1-series_hot.html').then(res => {
        if (res.status == 200) {
          this.wancheng = true;
          this.list = res.data;
        }
      })
    },
    updated(){
      var trueHeight = $('#trueHeight').height();
      var allHeight = document.body.clientHeight - $('#nav').height() - $('#footer1').height();
      if (allHeight > trueHeight) {
        $('#footer1').css({'position': 'absolute', 'bottom': '0.83rem', 'width': '100%'})
      } else {
        $('#footer1').removeAttr('style')
        $('#footer1').css({'width': '100%'})
      }
    },
    methods: {},
    components: {Navigator, footer1}
  }
</script>

<style>
  #box2 {
    padding-bottom: 0.9rem;
    color: #fff;
  }

  #main, #main2 {
    /*width: 6rem;*/
    display: flex;
    display: -webkit-flex;
    height: 2rem;
    background-color: #fff;
    /*margin:0 auto;*/
    margin-bottom: 0.15rem;
  }

  #main div {
    /*flex-basis: 3.5rem*/
  }

  #main div:nth-of-type(2) {
    flex-basis: 2.5rem
  }

  #main2 div {
    flex-basis: 2.5rem
  }

  #main2 div:nth-of-type(2) {
    flex-basis: 3.5rem
  }

  #main img,
  #main2 img {
    height: 2rem;
    width: 3.2rem;
  }

  #main .titles, #main2 .titles {
    color: #333;
    font-size: 0.24rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 2.8rem;
  }

  #main .author, #main2 .author {
    font-size: 0.21rem;
    color: #999;
    text-align: center;
  }

  #main .div2, #main2 .div1 {
    /*padding-top: 0.6rem;*/
    padding-right: 0.2rem;
    padding-left: 0.2rem;
    height: 2rem;
    width: 2.3rem;
    display: table;
  }

  #main .author, #main2 .author {
    margin-top: 0.1rem;
  }

  .middle {
    display: table-cell;
    vertical-align: middle;
  }
</style>
