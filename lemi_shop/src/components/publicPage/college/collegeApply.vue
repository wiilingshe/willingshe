<!--申请学院子页面-->
<template>
  <div class="collegeApply_box" style="background-color:#fff">
    <div v-show="xieyi" style="height:100%;">
      <div>
        <div class="left">账号名称</div>
        <div class="right">
          <input ref="user" type="text" placeholder="输入账号名称"/>
        </div>
      </div>
      <div>
        <div class="left">机构名称</div>
        <div class="right">
          <input ref="username" type="text" placeholder="输入学院名称"/>
        </div>
      </div>
      <div id="introduce">
        <div>机构简介</div>
        <div>
          <textarea ref="desc"></textarea>
        </div>
      </div>
      <div>
        <div class="left">真实姓名</div>
        <div class="right">
          <input type="text" ref="trueName" value="" placeholder="输入姓名"/>
        </div>
      </div>
      <div>
        <div class="left">手机号码</div>
        <div class="right">
          <input type="number" ref="phone" value="" placeholder="输入手机号码"/>
        </div>
      </div>
      <div>
        <div class="left">邮箱</div>
        <div class="right">
          <input type="email" ref="email" value="" placeholder="输入邮箱"/>
        </div>
      </div>

      <div>
        <div class="left">身份证号码</div>
        <div class="right">
          <input type="text" ref="idCard" value="" placeholder="输入身份证号码"/>
        </div>
      </div>
      <div id="address">
        <div>机构地址</div>
        <div>
          <textarea ref="address"></textarea>
        </div>
      </div>
      <div id="license">
        <div>营业执照</div>
        <div class="license_imgs">
          <form> 　　
            　　<input type="file" id="file1" @change="handle($event)">
            　　<label for="file1">　　
              　　　　　　<img :src="pic1" class="license_img" style="margin-left:1.62rem"> 　　
              　　</label>
            <span>上传营业执照</span>　　
          </form>
        </div>
      </div>
      <div id="card">
        <div>证件照</div>
        <div class="license_imgs">
          <form> 　　
            　　<input type="file" id="file2" @change="handle2($event)">
            　　<label for="file2">　　
              　　　　　　<img :src="pic2" class="license_img"/> 　　
              　　</label>
            <span>身份证正面</span>　　
          </form>
        </div>
      </div>
      <div id="card1">
        <div>证件照</div>
        <div class="license_imgs">
          <form> 　　
            　　<input type="file" id="file3" @change="handle3($event)">
            　　<label for="file3">　　
              　　　　　　<img :src="pic3" class="license_img"/> 　　
              　　</label>
            <span>身份证反面</span>　　
          </form>
        </div>
      </div>
      <div>
        <div class="left">账号密码</div>
        <div class="right">
          <input type="text" ref="pass" value="" placeholder="账号密码"/>
        </div>
      </div>
      <div style="border-bottom:0">
        <div class="left">确认密码</div>
        <div class="right">
          <input type="text" ref="pass1" value="" placeholder="确认密码"/>
        </div>
      </div>
      <div id="centext" style="border:0">
        <p>本人持有身份证的正面清晰画面，保证证件文字清晰，本人影像清晰</p>
        <div>
          <label for="radio" v-show="input"><i class="iconfont icon-check"
                                               style="color:#1c252c;position: relative;left: 0.3rem;"></i></label>
          <label for="radio" v-show="!input"><i class="iconfont icon-check"
                                                style="position: relative;left: 0.3rem;"></i></label>
          <input type="checkbox" id="radio" v-model="input" style="position:relative;z-index:1;opacity:0"/>
          <span class="ccc" style="color:#999;font-size:0.24rem;">我已阅读并同意</span>
          <u style="font-size:0.24rem;" @click="xieyi1()">
            <相关协议>
          </u>
        </div>
      </div>
      <div id="login" style="text-align:center">
        <button @click="setApply()">提交申请</button>
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
      <div id="login" style="text-align:center">
        <button @click="xieyi1()">确认</button>
      </div>
    </div>
    <span
      style="color:#999;font-size:0.26rem;text-align: center;width:100%;margin-top:0.2rem;padding-bottom:0.2rem;display:block">
			<footer1></footer1>
		</span>

  </div>


</template>

<script>
  import footer1 from '@/components/publicPage/footer1'
  import {Radio, Toast, Indicator} from 'mint-ui';
  export default {
    data(){
      return {
        a: true,
        b: false,
        pic_positive: '',
        pic_back: '',
        pic_business: '',
        input: false,
        xieyi: true,
        pic1: 'static/img/upload.jpg',
        pic2: 'static/img/upload.jpg',
        pic3: 'static/img/upload.jpg'
      }
    },
    created(){
      document.title = '申请'
      this.global.shouquan();
    },
    components: {footer1},
    methods: {
      xieyi1(){
        this.xieyi = !this.xieyi
      },
      setApply(){
        if (!this.input) {
          Toast({
            message: '未勾选相关协议',
            duration: 1000
          })

        } else {
          var reg_phone = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/,
              reg_fullname = /^[\u4e00-\u9fa5]+$/;
          var formData = new FormData();
          formData.append('add_type', '2');
          formData.append('user', this.$refs.user.value);
          formData.append('username', this.$refs.username.value);
          formData.append('pass', this.$refs.pass.value);
          formData.append('pass1', this.$refs.pass1.value);
          formData.append('desc', this.$refs.desc.value);
          formData.append('true_name', this.$refs.trueName.value);
          formData.append('phone', this.$refs.phone.value);
          formData.append('email', this.$refs.email.value);
          formData.append('id_card', this.$refs.idCard.value);
          formData.append('address', this.$refs.address.value);
          formData.append('pic_positive', this.pic_positive);
          formData.append('pic_back', this.pic_back);
          formData.append('pic_business', this.pic_business);

          /*var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;*/
          var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
          var idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{4,25}');
          if (this.$refs.user.value == '') {
            Toast({
              message: '账户名称不能为空',
              duration: 1000
            })
          } else if (this.$refs.user.value.length < 6 || this.$refs.user.value.length > 32) {
            Toast({
              message: '账号长度必须在6~32字范围内',
              duration: 1000
            })
          } else if (this.$refs.username.value == '') {
            Toast({
              message: '机构名称不能为空',
              duration: 1000
            })
          } else if (this.$refs.desc.value == '') {
            Toast({
              message: '机构简介不能为空',
              duration: 1000
            })
          } else if (this.$refs.trueName.value == '') {
            Toast({
              message: '真实姓名不能为空',
              duration: 1000
            })
          } else if(!reg_fullname.test(this.$refs.trueName.value) && this.$refs.trueName.value.length<=16){
            Toast({
              message: '真实姓名只能是汉字，长度必须在0~15字范围内',
              duration: 1000
            })
          }else if (!reg_phone.test(this.$refs.phone.value)) {
            Toast({
              message: '请输入正确的手机号码',
              duration: 1000
            })
          } else if (!reg.test(this.$refs.email.value)) {
            Toast({
              message: '请输入正确的邮箱',
              duration: 1000
            })
          } else if (!idReg.test(this.$refs.idCard.value)) {
            Toast({
              message: '请输入正确的身份证',
              duration: 1000
            })
          } else if (this.$refs.address.value == '') {
            Toast({
              message: '机构地址不能为空',
              duration: 1000
            })
          } else if (this.$refs.user.value == '') {
            Toast({
              message: '后台账号不能为空',
              duration: 1000
            })
          } else if (!regex.test(this.$refs.pass.value)) {
            Toast({
              message: '请输入4-25位的数字和英文组合的密码',
              duration: 1000
            });
          } else if (this.$refs.pass1.value == '' || this.$refs.pass1.value != this.$refs.pass.value) {
            Toast({
              message: '请输入确认密码',
              duration: 1000
            });
          } else {
            Indicator.open('提交中...');
            this.uploadPic('post', '/shop-v1-shop_add.html', formData).then(res => {
              Indicator.close();
              if (res.data.status == 0) {
                Toast({
                  message: res.data.msg,
                  duration: 1000
                });
              } else {
                Toast({
                  message: res.data.msg,
                  duration: 1000
                });
                this.$router.push('/mine');
              }

            })
          }
        }

      },
      label: function () {
        this.a = !this.a;
        this.b = !this.b;
      },
      handle($event){
        var This = this;
        var formData = new FormData();
        formData.append('pic_back', $event.target.files[0]);
        formData.append('name', 'pic_back');
        this.uploadPic('post', '/shop-v1-shop_pic.html', formData).then(res => {
          if (res.status == 200) {
            if (res.data.status == 1) {
              var reader = new FileReader()
              reader.readAsDataURL($event.target.files[0]);
              reader.onload = function () {
                This.pic1 = reader.result;
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
      handle2($event){
        var This = this;
        var formData = new FormData();
        formData.append('pic_back', $event.target.files[0]);
        formData.append('name', 'pic_back');
        this.uploadPic('post', '/shop-v1-shop_pic.html', formData).then(res => {
          if (res.status == 200) {
            if (res.data.status == 1) {
              var reader = new FileReader()
              reader.readAsDataURL($event.target.files[0]);
              reader.onload = function () {
                This.pic2 = reader.result;
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
      handle3($event){
        var This = this;
        var formData = new FormData();
        formData.append('pic_back', $event.target.files[0]);
        formData.append('name', 'pic_back');
        this.uploadPic('post', '/shop-v1-shop_pic.html', formData).then(res => {
          if (res.status == 200) {
            if (res.data.status == 1) {
              var reader = new FileReader()
              reader.readAsDataURL($event.target.files[0]);
              reader.onload = function () {
                This.pic3 = reader.result;
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
      }
    },
    mounted(){
      this.share('申请页', '我的个人中心', this.sharePic);
    }


  }
</script>

<style scoped>
  .collegeApply_box > div > div {
    align-items: center;
    margin: 0 0.2rem;
    font-size: 0.24rem;
    height: 0.8rem;
    border-bottom: 1px solid #e1e2e6;
  }

  .collegeApply_box > div > div:last-child {
    border-bottom: 0;
  }

  .left {
    width: 1.4rem;
    text-align: left;
    display: inline-block;
    line-height: 0.8rem;
  }

  .right {
    display: inline-block;
    float: right;
  }

  .right input {
    /*flex: 1;*/
    height: 0.6rem;
    text-align: right;
    font-size: 0.22rem;
    border: none;
    outline-style: none;
    margin-top: 0.1rem;
    color: #999;
  }

  .right input::-webkit-input-placeholder {
    color: #999;
  }

  #license {
    position: relative;
  }

  #address, #introduce, #license, #card1,
  #address, #introduce, #license, #card {
    /*display: flex;
        flex-direction: row;
        align-items: flex-start;*/
    height: 2rem;
    padding: 0.2rem 0;
  }

  #card1 div,
  #card div,
  #license div,
  #introduce div,
  #address div {
    display: inline-block;
  }

  #address div:last-child, #introduce div:last-child {
    /*flex: 1;*/
    height: 1rem;
    /*display: flex;
        display: -webkit-box;*/
    margin-top: 0.08rem;
    display: inline-block;

  }

  textarea {
    /*flex: 1;*/
    margin-left: 0.2rem;
    border: none;
    outline-style: none;
    font-size: 0.2rem;
    height: 1.75rem;
    border: 1px solid #e1e2e6;
    width: 4.5rem;
  }

  #centext {
    font-size: 0.26rem;
    line-height: 0.5rem;
    padding: 0.5rem 0.1rem;
    height: 1.6rem;
    text-align: center;
    padding: 0 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .red {
    color: red;
  }

  #login {
    border: none;
    /*height: 2rem;*/
    margin-bottom: 1rem;
    /*display: flex;
        justify-content: center;*/
  }

  #login button {
    width: 4rem;
    height: 0.8rem;
    font-size: 0.26rem;
    outline-style: none;
    border: none;
    border-radius: 0.4rem;
    background-color: #3385ff;
    color: white;
  }

  .card_imgs, .license_imgs {
    flex: 1;
  }

  .license_imgs span {
    width: 100%;
    display: block;
    text-align: center;
    margin-left: 0.9rem;
  }

  .license_img {
    margin-left: 1.9rem;
    margin-top: 0.3rem;
  }

  .imgs {
    margin-left: -0.8rem;
  }

  .imgs, .license_img {
    width: 1.3rem;
    height: 1.3rem;

  }

  #file1, #file2, #file3 {
    display: none;
  }

  .icon-check {
    color: #CCCCCC;
    font-size: 0.24rem;
  }

  .ccc {
    color: #CCCCCC;
  }

  #login button {
    width: 4rem;
    height: 0.8rem;
    font-size: 0.26rem;
    outline-style: none;
    border: none;
    border-radius: 0.4rem;
    background-color: #1c252c;
    color: white;
    text-align: center;
  }


</style>
