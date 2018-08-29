<template>
  <div class="bindPhone">
    <div class="bindPhone_header">
      <div>
        <span class="bindPhone_header-icon">
          <i class="icon iconfont icon-shoujiyanzhengma"></i>
        </span>
        <div class="bindPhone_header-textwrap">
          <span class="bindPhone_header-text1">
            为了您的账户安全
          </span>
          <br>
          <span class="bindPhone_header-text1">
            请及时绑定手机
          </span>
        </div>
      </div>


    </div>
    <div class="bindPhone_content" v-if="phonetype == 1">
      <div class="bindPhone_content-item bindPhone_country">
        <div class="bindPhone_content-left">
          国家和地区
        </div>
        <div class="bindPhone_content-right">
          <span class="bindPhone_country-text">
            中国
          </span>
          <span class="bindPhone_country-icon">
            <i class="icon iconfont icon-next-page"></i>
          </span>

        </div>
      </div>
      <div class="bindPhone_content-item bindPhone_phone">
        <label>
          <div class="bindPhone_content-left">
            <span class="bindPhone_phone-headnum">+86</span>
            <input type="text" class="bindPhone_phone-input" placeholder="手机号" maxlength="11">
          </div>
        </label>
      </div>
      <div class="bindPhone_content-item bindPhone_code">
        <div class="bindPhone_content-left">
          <input type="text" class="bindPhone_code-input" placeholder="验证码" maxlength="4">
        </div>
        <div class="bindPhone_content-right">
          <img :src="codeimg" alt="captcha" class="bindPhone_code-img" v-if="codeimgis">
          <span class="bindPhone_code-repfresh" @click="doRepfresh()">
            <i class="icon iconfont icon-shuaxin"></i>
          </span>
        </div>
      </div>
      <div class="bindPhone_content-item bindPhone_sms">
        <label>
          <div class="bindPhone_content-left">
            <input type="text" class="bindPhone_sms-input" placeholder="短信验证码" maxlength="6">
          </div>
          <div class="bindPhone_content-right">
            <span class="bindPhone_sms-button" @click="toTiming()" :class="codeis ? '':'bindPhone_sms-no'">获取验证码</span>
          </div>
        </label>

      </div>
    </div>
    <div class="bindPhone_content" v-if="phonetype == 2">
      <div class="bindPhone_content-item bindPhone_country">
        <div class="bindPhone_content-left">
          国家和地区
        </div>
        <div class="bindPhone_content-right">
          <span class="bindPhone_country-text">
            中国
          </span>
          <span class="bindPhone_country-icon">
            <i class="icon iconfont icon-next-page"></i>
          </span>

        </div>
      </div>
      <div class="bindPhone_content-item bindPhone_phone">
        <label>
          <div class="bindPhone_content-left">
            <span class="bindPhone_phone-headnum">+86</span>
            <input type="text" class="bindPhone_phone-input" placeholder="原手机号" maxlength="11">
          </div>
        </label>
      </div>
      <div class="bindPhone_content-item bindPhone_code">
        <div class="bindPhone_content-left">
          <input type="text" class="bindPhone_code-input" placeholder="验证码" maxlength="4">
        </div>
        <div class="bindPhone_content-right">
          <img :src="codeimg" alt="captcha" class="bindPhone_code-img" v-if="codeimgis">
          <span class="bindPhone_code-repfresh" @click="doRepfresh()">
            <i class="icon iconfont icon-shuaxin"></i>
          </span>
        </div>
      </div>
      <div class="bindPhone_content-item bindPhone_sms">
        <label>
          <div class="bindPhone_content-left">
            <input type="text" class="bindPhone_sms-input" placeholder="短信验证码" maxlength="6">
          </div>
          <div class="bindPhone_content-right">
            <span class="bindPhone_sms-button" @click="toTiming()" :class="codeis ? '':'bindPhone_sms-no'">获取验证码</span>
          </div>
        </label>

      </div>
    </div>
    <div class="bindPhone_content" v-if="phonetype == 3">
      <div class="bindPhone_content-item bindPhone_country">
        <div class="bindPhone_content-left">
          国家和地区
        </div>
        <div class="bindPhone_content-right">
          <span class="bindPhone_country-text">
            中国
          </span>
          <span class="bindPhone_country-icon">
            <i class="icon iconfont icon-next-page"></i>
          </span>

        </div>
      </div>
      <div class="bindPhone_content-item bindPhone_phone">
        <label>
          <div class="bindPhone_content-left">
            <span class="bindPhone_phone-headnum">+86</span>
            <input type="text" class="bindPhone_phone-input" placeholder="新手机号" maxlength="11">
          </div>
        </label>
      </div>
      <div class="bindPhone_content-item bindPhone_code">
        <div class="bindPhone_content-left">
          <input type="text" class="bindPhone_code-input" placeholder="验证码" maxlength="4">
        </div>
        <div class="bindPhone_content-right">
          <img :src="codeimg" alt="captcha" class="bindPhone_code-img" v-if="codeimgis">
          <span class="bindPhone_code-repfresh" @click="doRepfresh()">
            <i class="icon iconfont icon-shuaxin"></i>
          </span>
        </div>
      </div>
      <div class="bindPhone_content-item bindPhone_sms">
        <label>
          <div class="bindPhone_content-left">
            <input type="text" class="bindPhone_sms-input" placeholder="短信验证码" maxlength="6">
          </div>
          <div class="bindPhone_content-right">
            <span class="bindPhone_sms-button" @click="toTiming()" :class="codeis ? '':'bindPhone_sms-no'">获取验证码</span>
          </div>
        </label>
      </div>
    </div>

    <div class="bindPhone_btn" @click="toBind()">
      {{btnText}}
    </div>

    <!--<div class="bindPhone_content-item bindPhone_phone">-->
    <!--<div class="bindPhone_content-left">-->
    <!--<span class="bindPhone_phone-headnum">+86</span>-->
    <!--<input type="text" class="bindPhone_phone-oldinput" placeholder="手机号" maxlength="11" disabled :value="oldphone" style="color: #333333">-->
    <!--</div>-->
    <!--</div>-->

    <transition name="reminding-move" @after-enter="afterEnter">
      <div class="bindPhone_reminding" v-show="remindis">
      </div>
    </transition>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        codeis: true,
        remindis: false,
        codeimg: '',
        verifynum: '',
        phonenum: 0,
        phonetype: 1,
        phonecode: 0,
        codeimgis: true,
        btnText: '',
        setIn: {}
      }
    },
    created(){
      this.global.shouquan();
      this.noShare();
      this.getData('get', '/shop-v1-index_code.html?codeType=2').then(res => {
        if (res.status == 200) {
          this.codeimg = res.data;
        }
      });
      this.phonetype = this.$route.query.phonetype;
      if (this.phonetype == 2) {
        this.btnText = '验证原手机';
      } else {
        this.btnText = '立即绑定';
      }

    },
    mounted(){
//        限制输入正则
      $('.bindPhone_phone-input , .bindPhone_sms-input').bind("keyup", function () {
        this.value = this.value.replace(/[^\d]/g, '');
      }).bind("afterpaste", function () {
        this.value = this.value.replace(/[^\d]/g, '');
      });

      $('.bindPhone_code-input').bind("keyup", function () {
        this.value = this.value.replace(/[^\w\.\/]/ig, '');
      }).bind("afterpaste", function () {
        this.value = this.value.replace(/[^\w\.\/]/ig, '');
      });
    },
    methods: {
      toTiming(){
        var phone_reg = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
        if (phone_reg.test($('.bindPhone_phone-input').val())) {
          if ($('.bindPhone_code-input').val().length) {
            this.verifynum = $('.bindPhone_code-input').val();
            this.phonenum = parseInt($('.bindPhone_phone-input').val());
//            console.log(this.phonetype);
            this.postData('post', '/shop-v1-user_sendmsg.html', {
              type: this.phonetype,
              verify: this.verifynum,
              phone: this.phonenum
            }).then(res => {
              if (res.status == 200) {
                if (res.data.status == 0) {
                  this.remindis = true;
                  $('.bindPhone_reminding').html(res.data.msg);
                } else {
                  let time = 60;
                  if (this.codeis) {
                    this.codeis = false;
                    let that = this;
                    this.setIn = setInterval(function () {
                      time--;
                      $('.bindPhone_sms-button').html(time + "秒");
                      if (time == 0) {
                        clearInterval(that.setIn);
                        $('.bindPhone_sms-button').html("重新获取");
                        that.codeis = true;
                      }
                    }, 1000)
                  }
                }
              } else {
                this.remindis = true;
                $('.bindPhone_reminding').html("提交失败，请再试一次");
              }
            });
          } else {
            this.remindis = true;
            $('.bindPhone_reminding').html("请输入正确的图形验证码");
          }
        } else {
          this.remindis = true;
          $('.bindPhone_reminding').html("请输入正确的手机号");
        }
      },
//      validPhone(){
//          let sMobile = $('.bindPhone_phone-input');
//          if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){
//          }
//      },
      afterEnter(){
        this.remindis = false;
      },
      toBind(){
        this.phonecode = parseInt($('.bindPhone_sms-input').val());
        var phone_reg = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
        if(phone_reg.test(this.phonenum)){
          if ($('.bindPhone_sms-input').val().length == 6) {
            this.postData('post', '/shop-v1-user_phone.html', {
              type: this.phonetype,
              code: this.phonecode,
              phone: this.phonenum
            }).then(res => {
              if (res.status == 200) {
                console.log(res.data);
                if (res.data.status == 0) {
                  this.remindis = true;
                  $('.bindPhone_reminding').html(res.data.msg);
                } else {
                  this.remindis = true;
                  if (this.phonetype == 1) {
                    $('.bindPhone_reminding').html("绑定成功");
                    clearInterval(this.setIn);
                    setTimeout(function () {
                      this.$router.push({path: "/mine"});
                    }, 2000);

                  } else {
                    if (this.phonetype == 2) {
                      $('.bindPhone_reminding').html("验证成功");
                      this.phonetype = 3;
                      this.verifynum = '';
                      this.phonenum = 0;
                      this.btnText = '更换绑定';
                      clearInterval(this.setIn);
                      $('.bindPhone_sms-button').html("获取验证码");
                      this.codeis = true;
                    } else {
                      $('.bindPhone_reminding').html("更换绑定成功");
                      clearInterval(this.setIn);
                      setTimeout(function () {
                        this.$router.push({path: "/mine"});
                      }, 2000);
                    }
                  }
                }
              } else {
                this.remindis = true;
                $('.bindPhone_reminding').html("提交失败，请再试一次");
              }
            });
          } else {
            this.remindis = true;
            $('.bindPhone_reminding').html("请输入6位短信验证码");
          }
        }else{
          if(this.phonenum==0 && $('.bindPhone_phone-input').val().length!=0){
            this.remindis = true;
            $('.bindPhone_reminding').html("请输入正确的短信验证码");
          }else{
            this.remindis = true;
            $('.bindPhone_reminding').html("请输入正确的手机号码");
          }
        }

      },
      doRepfresh(){
        this.codeimgis = false;
        this.getData('get', '/shop-v1-index_code.html?codeType=2').then(res => {
          if (res.status == 200) {
            console.log(res.data);
            this.codeimg = res.data;
            this.codeimgis = true;
          }
        });
      }

    }
  }

</script>

<style scoped lang="less">
  .bindPhone {
    font-size: 0.24rem;
    height: 100%;

    &_header {
      padding: 0.8rem 0;
      text-align: center;
      background-color: #ffffff;
      &-textwrap {
        display: inline-block;
        margin-left: 0.2rem;
        text-align: left;
        font-size: 0.3rem;
        color: #5e96d0;
      }

      .icon-shoujiyanzhengma {
        font-size: 1rem;
        color: #5e96d0;
      }

    }
    &_content {
      margin-bottom: 0.3rem;
      background-color: #ffffff;
      &-item {
        width: 92%;
        padding: 0 4%;
        overflow: hidden;
        border-top: 0.02rem solid #eeeeee;
      }
      &-left {
        float: left;
      }
      &-right {
        float: right;
      }

    }
    &_btn {
      width: 80%;
      height: 0.9rem;
      line-height: 0.9rem;
      margin: 0 auto;
      text-align: center;
      font-size: 0.3rem;
      color: #ffffff;
      -webkit-border-radius: 0.1rem;
      -moz-border-radius: 0.1rem;
      border-radius: 0.1rem;
      background-color: #5e96d0;
    }

    &_country {
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;

      &-text {
        font-size: 0.28rem;
        color: #333333;
        text-align: left;
      }

      &-icon {
        margin-left: 0.3rem;
        .icon-next-page {
          font-size: 0.28rem;
          color: #5e96d0;
        }
      }
    }
    &_phone {
      &-headnum {
        display: inline-block;
        margin-right: 1rem;
        padding: 0.3rem 0;
        font-size: 0.28rem;
      }
      &-input {
        display: inline-block;
        width: auto;
        height: 1rem;
        border: none;
        resize: none;
        font-size: 0.28rem;
        color: #cccccc;
        &:disabled {
          background-color: #ffffff;
        }
        &:focus {
          outline: none;
          color: #000000;
        }
      }
      &-oldinput {
        display: inline-block;
        width: auto;
        height: 1rem;
        border: none;
        resize: none;
        font-size: 0.28rem;
        color: #cccccc;
        &:disabled {
          background-color: #ffffff;
        }
        &:focus {
          outline: none;
          color: #000000;
        }
      }
    }
    &_code {
      &-input {
        width: 3rem;
        height: 1rem;
        border: none;
        resize: none;
        font-size: 0.28rem;
        color: #cccccc;
        &:focus {
          outline: none;
          color: #000000;
        }
      }
      &-img {
        vertical-align: middle;
        width: 1rem;
        height: 0.6rem;
        padding: 0.2rem 0;
        margin-right: 0.3rem;
      }
      &-repfresh {
        display: inline-block;
        height: 0.5rem;
        padding: 0.2rem 0;
      }

      &-icon {
        display: inline-block;
      }
      .icon-shuaxin {
        font-size: 0.32rem;
        color: #5e96d0;
      }
    }
    &_sms {
      padding-right: 0.2rem;
      &-input {
        height: 1rem;
        border: none;
        resize: none;
        font-size: 0.28rem;
        color: #cccccc;
        &:focus {
          outline: none;
          color: #000000;
        }
      }
      &-button {
        display: inline-block;
        width: 1.5rem;
        height: 0.4rem;
        margin-top: 0.25rem;
        padding: 0.06rem 0;
        font-size: 0.24rem;
        text-align: center;
        color: #333333;
        border: 0.02rem solid #cccccc;
        -webkit-border-radius: 0.08rem;
        -moz-border-radius: 0.08rem;
        border-radius: 0.08rem;
      }
      &-no {
        opacity: 0.5;
      }
      &-time {
        margin-right: 0.14rem;
      }
    }

    &_reminding {
      position: fixed;
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      top: 0;
      margin: auto;
      font-size: 0.24rem;
      text-align: center;
      color: #ffffff;
      background-color: #333333;
      border: 0.02rem solid #cccccc;
      /*-webkit-border-radius:0.1rem;*/
      /*-moz-border-radius:0.1rem;*/
      /*border-radius:0.1rem;*/
    }

    .reminding-move-enter-active {
      transition: all 0.5s ease-in;
    }
    .reminding-move-leave-active {
      transition: all 5s ease-in;
    }
    .reminding-move-enter, .reminding-move-leave-active {
      opacity: 0;
    }

  }
</style>
