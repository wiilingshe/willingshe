<template>
  <div class="customTeam">
    <div class="customTeam_mentorlist">
      <div class="customTeam_mentorlist-wrap">
        <h1 class="customTeam_mentorlist-title">我们的导师团队</h1>
        <div class="customTeam_mentorlist-list">
          <div class="customTeam_mentorlist-item" v-for=" i in arr" @click="goRoute(i.link)">
            <img :src="i.face" class="customTeam_mentorlist-img" @error="i.face = i.face == ''? '/static/img/onerr3.jpg':'/static/img/onerr1.png';">
            <p class="customTeam_mentorlist-name">{{i.username}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';

  export default{
    data(){
            return{
              arr:[],
            }
        },
      created(){
        let shopId = this.$route.query.shop_id;
        this.postData('post','/shop-v1-custom_shop_list.html',{shop_id:shopId}).then(res => {
          if(res.status == 200){
              if(res.data.status == 1){
                this.arr = res.data.data.shop_list;
              }
          }
        });
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
          }else{
            Toast({
              message:'未开通网站',
              position: 'middle',
              duration: 2000
            });
          }
        },
      }
    }
</script>

<style scoped lang="less">
  .customTeam{
    &_mentorlist{
      background: url("../../../static/img/bg2.png") no-repeat 0 0;
      background-size:cover;
      color: #ffffff;
      &-wrap {
        padding: 0.5rem 7%;
      }
      &-title {
        margin-bottom: 0.5rem;
        text-align: center;
        font-size: 0.4rem;
        font-weight: bold;
      }
      &-list {
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
      }
      &-item {
        -webkit-flex: 0 0 50%;
        flex: 0 0 50%;
        margin-bottom: 0.4rem;
      }
      &-img {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
      &-name {
        margin-top: 0.2rem;
        font-size: 0.3rem;
        text-align: center;
      }
    }
  }
</style>
