<template>
  <div id="setCard">
    <div class="pic_box">
      <div>头像</div>
      <div>
        <label for="pic">
          <img :src="data.portrait"
               @error="data.portrait = data.portrait == ''? '/static/img/upload.jpg':'/static/img/upload.jpg';" alt=""/>
        </label>
        <input type="file" @change="handle()" name="file" id="pic" value="" style="display: none;"/>
      </div>
    </div>
    <div class="true_name">
      <div>姓名</div>
      <div>
        <input type="text" ref="true_name" v-model="data.true_name" placeholder="请输入真实姓名"/>
      </div>
    </div>
    <div class="phone">
      <div>电话</div>
      <div>
        <input type="number" ref="phone" v-model="data.phone" placeholder="请输入电话"/>
      </div>
    </div>
    <div class="tel">
      <div>固话</div>
      <div>
        <input type="bumber" ref="telephone" v-model="data.telephone" placeholder="请输入固话"/>
      </div>
    </div>
    <div class="email">
      <div>邮箱</div>
      <div>
        <input type="email" ref="email" name="" v-model="data.email" id="" value="" placeholder="请输入邮箱"/>
      </div>
    </div>
    <div class="address">
      <div>地址</div>
      <div>
        <textarea name="" ref="address" v-model="data.address" rows="3" cols="" placeholder="请输入地址"></textarea>
      </div>
    </div>
    <div class="position">
      <div>职位介绍</div>
      <div>
        <textarea name="" ref="job_desc" v-model="data.job_desc" rows="3" cols="" placeholder="请输入职位介绍"></textarea>
      </div>
    </div>
    <div class="details">
      <div>个人详情介绍</div>
      <div>
        <textarea name="" ref="desc" v-model="data.desc" rows="3" cols="" placeholder="请输入个人详情介绍"></textarea>
      </div>
    </div>
    <div class="btn" @click="save()">
      保存
    </div>
  </div>
</template>

<script>
  import {InfiniteScroll, Indicator,Radio, Toast,Field} from 'mint-ui';
  export default {
    data(){
      return {
        data: [],
        file: '',
      }

    },
    created(){
      document.title = '设置个人名片';
      this.global.shouquan();
      this.postData('post', '/shop-v1-custom_get_person_card.html').then(res => {
        if (res.status == 200) {
          if (res.data.status == 1) {
            this.data = res.data.data;
          }
        }

      })
    },
    methods: {
      handle(){
        this.file = $('#pic')[0].files[0];
        if (this.file.size / (1024 * 1024) > 3) {
          Toast({
            message: '图片格式不正确,大小不要超过2M',
            duration: 1000
          });
          $(this).val('');
          return false;
        }
        var fr = new FileReader();
        fr.readAsDataURL(this.file);
        let This = this;
        fr.onload = function () {
          This.data.portrait = fr.result;

        }
      },
      save(){
        Indicator.open();
        var formData = new FormData();
        formData.append('true_name', this.$refs.true_name.value);
        formData.append('phone', this.$refs.phone.value);
        formData.append('telephone', this.$refs.telephone.value);
        formData.append('email', this.$refs.email.value);
        formData.append('address', this.$refs.address.value);
        formData.append('job_desc', this.$refs.job_desc.value);
        formData.append('desc', this.$refs.desc.value);
        formData.append('portrait', this.file);
        this.uploadPic('post', '/shop-v1-custom_set_person_card.html', formData).then(res => {
          if (res.status == 200) {
            if (res.data.status == 1) {
              Toast({
                message: '保存成功',
                duration: 1000
              });
              Indicator.close();
              setTimeout(function () {
                window.history.go(-1);
              }, 2000)

            } else {
              Indicator.close();
              Toast({
                message: res.data.msg,
                duration: 1000
              })

            }
          }
        });

      }
    }
  }
</script>

<style lang="less">
  #setCard {
    background-color: #fff;
    font-size: 0.24rem;
    padding-bottom: 0.8rem;
    .pic_box:after, .phone:after, .email:after, .pic_box:after, .address:after, .position:after, .details:after, .true_name:after {
      display: block;
      content: '';
      clear: both;
    }
    .phone, .tel, .email, .true_name {
      margin: 0 0.2rem;
      font-size: 0.24rem;
      height: 0.8rem;
      border-bottom: 1px solid #e1e2e6;
      div:first-child {
        width: 1.4rem;
        text-align: left;
        display: inline-block;
        line-height: 0.8rem;
      }
      div:last-child {
        display: inline-block;
        float: right;
        input {
          height: 0.6rem;
          text-align: right;
          font-size: 0.22rem;
          border: none;
          outline-style: none;
          margin-top: 0.1rem;
          color: #999;
          background: none;
        }

      }
    }
    .pic_box {
      height: 1.3rem;
      padding: 0.2rem;
      border-bottom: 1px solid #e1e2e6;
      div:first-child {
        float: left;
        margin-top: 1rem;

      }
      div:last-child {
        line-height: 2rem;
        img {
          width: 1.3rem;
          height: 1.3rem;
          margin: 0 auto;
          display: block;

        }
      }
    }
    .address, .position, .details {
      border-bottom: 1px solid #e1e2e6;
      height: 1.3rem;
      margin: 0 0.2rem;
      div:first-child {
        float: left;
        margin-top: 0.8rem;

      }
      div:last-child {
        float: right;
        width: 70%;
        textarea {
          background: none;
          margin-left: 0.2rem;
          margin-top: 0.2rem;
          width: 90%;
          font-size: 0.22rem;
          color: #999;
          padding: 0.05rem;
          resize:none;
          border-color: #eee;
        }

      }
    }
    .btn {
      width: 60%;
      height: 0.8rem;
      background: #007AFF;
      margin: 0 auto;
      border-radius: 0.4rem;
      text-align: center;
      line-height: 0.8rem;
      color: white;
      margin-top: 0.8rem;
    }

  }
</style>
