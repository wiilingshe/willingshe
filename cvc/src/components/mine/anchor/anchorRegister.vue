<!--主播注册页-->
<template>
  <div class="box an" style="margin-top:0.3rem;background-color:#fff">
    <div v-show="xieyi">
      <div v-show="!listshow">
        <div style="background-color:#fff">
          <!-- <div class="header_style">
                            <div></div>
                            <div></div>
                    </div> -->
          <div class="main">
            <div>
              <div class="left">账号名</div>
              <div class="right">
                <input ref="account" type="username" name="" id="" placeholder="输入账号名"/>
              </div>
            </div>
            <div>
              <div class="left">账号密码</div>
              <div class="right">
                <input ref="password" type="password" name="" id="" placeholder="输入密码"/>
              </div>
            </div>
            <div>
              <div class="left">确认密码</div>
              <div class="right">
                <input ref="confirm" type="password" name="" id="" placeholder="再次输入密码"/>
              </div>
            </div>
            <div>
              <div class="left">导师名称</div>
              <div class="right">
                <input ref="username" type="username" name="" id="" placeholder="输入导师\机构名称"/>
              </div>
            </div>
            <!--<div>-->
            <!--<div class="left">简介</div>-->
            <!--<div class="right">-->
            <!--<input ref="desc" type="username" name="" id="" placeholder="输入简介"/>-->
            <!--</div>-->
            <!--</div>-->
            <div>
              <div class="left">真实姓名</div>
              <div class="right">
                <input ref="trueName" type="username" name="" id="" placeholder="输入真实姓名"/>
              </div>
            </div>
            <!--<div>-->
            <!--<div class="left">邮箱</div>-->
            <!--<div class="right">-->
            <!--<input ref="email" type="username" name="" id="" placeholder="输入邮箱"/>-->
            <!--</div>-->
            <!--</div>-->
            <div>
              <div class="left">手机号码</div>
              <div class="right">
                <input ref="phone" type="username" name="" id="" placeholder="输入手机号码"/>
              </div>
            </div>
            <div>
              <div class="left">身份证号码</div>
              <div class="right">
                <input ref="idCard" type="username" name="" id="" placeholder="输入身份证号码"/>
              </div>
            </div>


            <!--<div>-->
            <!--<div class="left">地址详情</div>-->
            <!--<div class="right">-->
            <!--<input ref="adress" type="text" name="" id="" placeholder="输入地址详情"/>-->
            <!--</div>-->
            <!--</div>-->
            <div @click="showList()">
              <div class="left">选择机构</div>
              <div class="right">
                <input ref="adress" type="text" disabled="disabled" v-model="jigou" placeholder="点击进行选择"
                       style="background-color:#fff;"/>
                <input style="display:none" type="text" v-model="shopId">
              </div>
            </div>
            <div style="height:auto;position:relative;padding: 0.2rem 0;">
              <div class="left">身份证正面</div>
              <div class="right">
                <input type="file" @change="change($event)" class="picUpload">
                <img :src="pic1">
              </div>
            </div>
            <div style="height:auto;position:relative;padding: 0.2rem 0;">
              <div class="left">身份证反面</div>
              <div class="right">
                <input type="file" @change="change2($event)" class="picUpload">
                <img :src="pic2">
              </div>
            </div>
            <!--<div style="height:auto;position:relative;padding: 0.2rem 0;">-->
            <!--<div class="left">营业执照</div>-->
            <!--<div class="right">-->
            <!--<input type="file" @change="change3($event)" class="picUpload">-->
            <!--<img :src="pic3">-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
        <div id="centext" style="border:0">
          <p>本人持有身份证的正面清晰画面，保证证件文字清晰，本人影像清晰<span class="red">（查看示例）</span></p>
          <div>
            <label for="radio" v-show="input"><i class="iconfont icon-check"
                                                 style="font-size: 0.3rem;position: relative;left: 0.35rem;color:#1c252c"></i></label>
            <label for="radio" v-show="!input"><i class="iconfont icon-check"
                                                  style="color:#eaeaea;font-size:0.3rem;position:relative;left: 0.35rem;"></i></label>
            <input type="checkbox" id="radio" v-model="input" style="position:relative;z-index:1;opacity:0"/>
            <span class="ccc" style="color:#999;font-size:0.24rem;">我已阅读并同意</span>
            <u style="font-size:0.24rem;" @click="xieyi1()">
              <相关协议>
            </u>
          </div>
        </div>
        <div class="login">
          <!-- <button @click="go()">下一步</button> -->
          <button @click="set()">提交</button>
        </div>
      </div>
    </div>
    <div v-show="xieyi">
      <div v-show="listshow" class="listshow">
        <div class="list" v-for="item in arr" @click="selectShop(item.shop_id,item.username)">
          {{item.username}}
        </div>
      </div>
    </div>
    <div v-show="!xieyi" style="font-size: 0.26rem;padding: 0.1rem 0.2rem;">
      <p>为维护网上公共秩序和社会稳定，请您自觉遵守以下条款：</p>
      <p>一、不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站制作、复制和传播下列信息：</p>
      <p>1.煽动抗拒、破坏宪法和法律、行政法规实施的；</p>
      <p>2.煽动颠覆国家政权，推翻社会主义制度的；</p>
      <p>3.煽动分裂国家、破坏国家统一的；</p>
      <p>4.煽动民族仇恨、民族歧视，破坏民族团结的；</p>
      <p>5.捏造或者歪曲事实，散布谣言，扰乱社会秩序的；</p>
      <p>6.宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；</p>
      <p>7.公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；</p>
      <p>8.损害国家机关信誉的；</p>
      <p>9.其他违反宪法和法律行政法规的；</p>
      <p>10.进行商业广告行为的。</p>
      <p>二、互相尊重，对自己的言论和行为负责。</p>
      <p><br/></p>
      <div class="login">
        <button @click="xieyi1()">确认</button>
      </div>
    </div>
    <div style="color:#999;font-size:0.26rem;text-align: center;width:100%;margin-top:0.2rem;margin-bottom:0.2rem;">
      <div>小象SaaS提供技术支持</div>
      <div>www.saasxx.vip</div>
    </div>
  </div>

</template>

<script>
  import anchorNext from './anchorNext'
  import {Toast} from 'mint-ui'
  export default {
    data(){
      return {
        arr: [],
        listshow: false,
        jigou: '',
        shopId: '',
        pic1: '../../../../static/img/upload.jpg',
        pic2: '../../../../static/img/upload.jpg',
        pic3: '../../../../static/img/upload.jpg',
        input: false,
        xieyi: true,
      }
    },
    created(){
      document.title = '申请';
      this.global.shouquan();
      this.getData('get', '/shop-v1-shop_get_org.html').then(res => {
        this.arr = res.data;
      })
    },
    methods: {
      selectShop(id, name){
        this.listshow = false;
        this.jigou = name;
        this.shopId = id;
      },
      showList(){
        this.listshow = true;
      },
      change($event){
        var self = this;
        var formData = new FormData();
        formData.append('pic_positive', $event.target.files[0]);
        formData.append('name', 'pic_positive');
        console.log($event.target.files[0])
        this.uploadPic('post', '/shop-v1-shop_pic.html', formData).then(res => {
          if (res.status == 200) {
            if (res.data.status == 1) {
              var reader = new FileReader()
              reader.readAsDataURL($event.target.files[0]);
              reader.onload = function () {
                self.pic1 = reader.result;
              }
              Toast({
                message: '上传成功',
                duraction: 500
              })
            } else {
              Toast({
                message: res.data.msg,
                duraction: 500
              })
            }
          }
        })
      },
      change2($event){
        var self = this;
        var formData = new FormData();
        formData.append('pic_back', $event.target.files[0]);
        formData.append('name', 'pic_back');
        console.log($event.target.files[0])
        this.uploadPic('post', '/shop-v1-shop_pic.html', formData).then(res => {
          if (res.status == 200) {
            if (res.data.status == 1) {
              var reader = new FileReader()
              reader.readAsDataURL($event.target.files[0]);
              reader.onload = function () {
                self.pic2 = reader.result;
              }
              Toast({
                message: '上传成功',
                duraction: 500
              })
            } else {
              Toast({
                message: res.data.msg,
                duraction: 500
              })
            }
          }
        })
      },
//      change3($event){
//        var self = this;
//        var formData = new FormData();
//        formData.append('pic_business', $event.target.files[0]);
//        formData.append('name', 'pic_business');
//        console.log($event.target.files[0])
//        this.uploadPic('post', '/shop-v1-shop_pic.html', formData).then(res => {
//          if (res.status == 200) {
//            if (res.data.status == 1) {
//              var reader = new FileReader()
//              reader.readAsDataURL($event.target.files[0]);
//              reader.onload = function () {
//                self.pic3 = reader.result;
//              }
//              Toast({
//                message: '上传成功',
//                duraction: 500
//              })
//            } else {
//              Toast({
//                message: res.data.msg,
//                duraction: 500
//              })
//            }
//          }
//        })
//      },
      set(){
        var self = this;
        var reg_phone = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/,
            reg_fullname = /^[\u4e00-\u9fa5]+$/;
        if(reg_fullname.test(self.$refs.trueName.value) && self.$refs.trueName.value.length>0 && self.$refs.trueName.value.length<16){
          if(reg_phone.test(self.$refs.phone.value)){
            var data = {
              add_type: '1',
              user: this.$refs.account.value,
              username: this.$refs.username.value,
    //          desc: this.$refs.desc.value,
              true_name: this.$refs.trueName.value,
    //          email: this.$refs.email.value,
              id_card: this.$refs.idCard.value,
    //          address: this.$refs.adress.value,
              shop_id: this.shopId,
              pass: this.$refs.password.value,
              pass1: this.$refs.confirm.value,
              phone: this.$refs.phone.value,
            }
            this.postData('post', '/shop-v1-shop_add.html', data).then(res => {
              if (res.status == 200) {
                if (res.data.status == 1) {
                  Toast({
                    message: res.data.msg,
                    duraction: 500
                  })
                  this.$router.push('/mine')
                } else {
                  Toast({
                    message: res.data.msg,
                    duraction: 500
                  })
                }

              }
            });
          }else{
            Toast({
              message: '请正确填写手机号码',
              duraction: 4000
            });
          }
        }else{
          Toast({
            message: '真实姓名只能是汉字，长度必须在0~15字范围内',
            duraction: 4000
          });
        }
        
      },
      xieyi1(){
        this.xieyi = !this.xieyi
      }
    },
    mounted(){
      this.share('申请页', '我的个人中心', this.sharePic);
    }
  }
</script>

<style scoped>
  .box {
    display: flex;
    flex-direction: column;
  }

  /*头部*/
  .header {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    /*justify-content: space-around;*/

  }

  .header_left {
    width: 50%;
    text-align: center;

  }

  .header_right {
    width: 50%;
    text-align: center;

  }

  .header_left i:first-child, .header_right i:first-child {
    font-size: 0.8rem;
    color: #3385ff;
  }

  .header_left p, .header_right p {
    font-size: 0.24rem;
  }

  .iconfont {
    font-size: 0.8rem;
    color: #3385ff;
  }

  .header_style {
    position: relative
  }

  .header_style div:nth-child(1) {
    height: 0.06rem;
    width: 20%;
    background-color: #3385ff;
    position: absolute;
    top: -0.3rem;
  }

  .header_style div:nth-child(2) {
    height: 0.06rem;
    width: 70%;
    background-color: #3385ff;
    position: absolute;
    top: -0.3rem;
    right: 0;
  }

  .icon-yuandian {
    font-size: 0.5rem;
    margin-right: 0.25rem;

  }

  .header_text {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.24rem;
    color: #888;
    text-align: left;
    margin-left: 0.2rem;
    text-align: left;
  }

  /*main区块*/
  .main {
    display: flex;
    flex-direction: column;

  }

  .main > div {
    height: 1rem;
    border-bottom: 1px solid #e1e1e1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 0.26rem;
    margin: 0 0.2rem;
  }

  .main > div:last-child {
    border-bottom: 0;
  }

  .left {
    width: 2rem;
    text-align: left;
  }

  .right {
    flex: 1;
    text-align: right;
    display: flex;

  }

  .right img {
    width: 1.8rem;
    height: 1.8rem;
  }

  #centext {
    font-size: 0.26rem;
    line-height: 0.5rem;
    padding: 0.5rem 0.1rem;
    height: 1.6rem;
    text-align: center;
    padding: 0 0.5rem;
  }

  .an .right input {
    flex: 1;
    height: 0.8rem;
    font-size: 0.23rem;
    border: none;
    outline-style: none;
    text-align: right;
    color: #999;
  }

  .right input::-webkit-input-placeholder {
    color: #999;
  }

  .login {
    text-align: center;
  }

  .login button {
    width: 4rem;
    height: 0.8rem;
    font-size: 0.26rem;
    outline-style: none;
    border: none;
    border-radius: 0.4rem;
    background-color: #1c252c;
    color: white;
  }

  .icon-yuandian:before {
    position: relative;
    left: 0.13rem;
  }

  .box .listshow {
    font-size: 0.27rem;
  }

  .box .listshow .list {
    width: 100%;
    height: 0.8rem;
    background: #fff;
    text-align: center;
    line-height: 0.8rem;
    border-top: 1px solid #e1e2e6;
  }

  .right .picUpload {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.3rem;
    opacity: 0;
  }
</style>
