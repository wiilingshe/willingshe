<template>
	<div class="commentComplete">
		<div class="main" v-for="(item,index1) in commentArr">
      <div class="table">
        <div class="table_cell">
          <img class="main_img" :src="item.goods_pic" onerror="this.src=&quot;/static/img/onerr2.png&quot;">
        </div>
        <div class="table_cell">
          <p class="name">{{item.goods_name}}</p>
          <p class="type">{{item.sku_name}}</p>
        </div>
      </div>
      <div class="score">
        <span>评分</span>
        <div class="star">
          <span v-for="i in 5" @click="comStar(i,index1)">
            <i class="icon iconfont" :class="i>dataArr[index1].starIndex? 'icon-xingxing_kongxin':'icon-start'"></i>
          </span>
        </div>
      </div>
      <div class="comment">
        <textarea class="commenttext" type="text" placeholder="来说说你对宝贝的评价"></textarea>
        <div class="upload">
          <span v-for="(i,index) in dataArr[index1].picArr">
            <img :src="i.pic" class="upload_img"><!----><input type="file" @change="changeTog($event,index1,index)" class="uploadfile">
          </span>
          <span v-if="dataArr[index1].uploadIs">
            <input type="file" @change="change($event,index1)" class="uploadfile">
            <i class="icon iconfont icon-tianjiatupian"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="anonymousWrap">
      <div class="anonymous">
        <div @click="toggleAnony()"><span><i class="icon iconfont icon-check" :class="anonymousIs?'red':''"></i></span>匿名</div>
        <div>你写的评价将以匿名的形式展现</div>
      </div>
    </div>
    <div class="btn" @click="postComment()">
      发布评价
    </div>
	</div>
</template>
<script>
  import {Toast,Indicator} from 'mint-ui'

  export default{
		data(){
			return{
        commentArr:[],
        anonymousIs:false,
        dataArr:[],
        a:2
			}
		},
    created(){
      this.global.shouquan();
      this.noShare();
      Indicator.open();
      let order = this.$route.query.order_no;
      this.postData('post','/shop-g1-order_to_comment.html',{order_no:order}).then(res => {
          if(res.status == 200){
              if(res.data.status !=0){
                this.commentArr = res.data;
                this.commentArr.forEach( (i) =>{
                  let data = {};
                  data.starIndex = 5;
                  data.picArr = [];
                  data.uploadIs = true;
                  data.goodsId = i.order_goods_item_id;
                  data.comment = '';
                  data.filesArr = [];
                  this.dataArr.push(data);
                });
              }
          }
        Indicator.close();
      });
      document.title = "评论";
    },
    methods:{
//     评价星数
      comStar(i,index){
        this.dataArr[index].starIndex = i;
      },
//     匿名选择
      toggleAnony(){
          this.anonymousIs = !this.anonymousIs;
      },
//     添加上传图片
      change($event,index1){
        Indicator.open();
        let that = this;
        let reader = new FileReader();
        if($event.target.files.length == 0){
          this.$nextTick(function () {
            Indicator.close();
          });
          return false;
        }
        let type = $event.target.files[0].type;
        if(!/image\/\w+/.test(type)){
            this.$nextTick(function () {
              Indicator.close();
            });
          Toast({
            message: "格式错误，请上传图片",
            position: 'middle',
            duration: 3000
          });
          return false;
        }
        let imgSize = $event.target.files[0].size/1024;
//        that.dataArr[index1].filesArr.push($event.target.files[0]);
        reader.readAsDataURL($event.target.files[0]);
        reader.onload = function(){
          let oPic = {pic:reader.result};
          that.dataArr[index1].picArr.push(oPic);
          if(that.dataArr[index1].picArr.length >= 6){
            that.dataArr[index1].uploadIs = false;
          }
          if(imgSize > 1000) {
            that.canvasUrl(reader.result,{'quality': 0.1},that,index1);
          }else if(imgSize > 300){
            that.canvasUrl(reader.result,{'quality': 0.5},that,index1);
          }else{
            that.dataArr[index1].filesArr.push($event.target.files[0]);
          }
          Indicator.close();
        };
      },
//     替换上传图片
      changeTog($event,index1,index){
        Indicator.open();
        let that = this;
        let reader = new FileReader();
        if($event.target.files.length == 0){
          this.$nextTick(function () {
            Indicator.close();
          });
          return false;
        }
        let type = $event.target.files[0].type;
        if(!/image\/\w+/.test(type)){
          this.$nextTick(function () {
            Indicator.close();
          });
          Toast({
            message: "格式错误，请上传图片",
            position: 'middle',
            duration: 3000
          });
          return false;
        }
        let imgSize = $event.target.files[0].size/1024;
//        this.dataArr[index1].filesArr[index] = $event.target.files[0];
        reader.readAsDataURL($event.target.files[0]);
        reader.onload = function(){
          that.dataArr[index1].picArr[index].pic = reader.result;
          if(imgSize > 1000) {
            that.canvasUrl(reader.result,{'quality': 0.1},that,index1,index);
          }else if(imgSize > 300){
            that.canvasUrl(reader.result,{'quality': 0.5},that,index1,index);
          }else{
            that.dataArr[index1].filesArr[index] = $event.target.files[0];
          }
          Indicator.close();
        }
      },
//      图片压缩
      canvasUrl(path,obj,vue,index1,index){
        let img = new Image();
        img.src = path;
        img.onload = function(){
          let that = this;
          // 默认按比例压缩
          let w = that.width,
             h = that.height,
            scale = w / h;

          w = obj.width || w;
          h = obj.height || (w / scale);
          let quality = 0.7;  // 默认图片质量为0.7
          //生成canvas
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          // 创建属性节点
          let anw = document.createAttribute("width");
          anw.nodeValue = w;
          let anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
//          console.log(base64);
          let bl = vue.Base64ToBlob(base64);
          if(index == undefined){
            vue.dataArr[index1].filesArr.push(bl);
          }else{
            vue.dataArr[index1].filesArr[index] = bl;
          }
        }
      },
//      图片格式转换
      Base64ToBlob(urlData){
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
      },
//     提交评论
      postComment(){
        let order = this.$route.query.order_no;
        let anonymous = this.anonymousIs? 1:0;
        let commentText = $('.commenttext');

        let formdata = new FormData();
        formdata.append('order_no',order);
        formdata.append('is_anonymous',anonymous);
        this.dataArr.forEach((i,index)=>{
          let picname1 = 'pic_';
          let picname2 = '_'+i.goodsId;
          let picname;
          let oImg = {};
          for(let n=0;n<i.filesArr.length;n++){
            picname =picname1 + n + picname2;
            oImg[n] = picname;
//            formdata.append(picname,i.filesArr[n]);
            formdata.append(picname,i.filesArr[n],"file_"+Date.parse(new Date())+n+".jpg");
          }
          let obj1 = {'order_goods_item_id':i.goodsId,'content':commentText[index].value,'star_count':i.starIndex,'pics':oImg};
          let data1 = JSON.stringify(obj1);
          formdata.append('data[]',data1);
        });

        Indicator.open();
        this.uploadPic('post','/shop-g1-order_do_comment.html',formdata).then(res => {
            if(res.status == 200){
                if(res.data.status == 1){
                  this.$router.push({path:'/commentSuccess'});
                }else{
                  Toast({
                    message: res.data.msg,
                    position: 'middle',
                    duration: 3000
                  });
                }
            }else{
              Toast({
                message: '评论提交失败',
                position: 'middle',
                duration: 3000
              });
            }
          Indicator.close();
        });
//        Indicator.close();
//        return false;
//        $.ajax({
//          url: "http://www.lemi.com/shop-g1-order_do_comment.html" ,
//          type: 'POST',
//          data: formdata,
//          async: false,
//          cache: false,
//          contentType: false,
//          processData: false,
//          success: function (returndata) {
//          },
//          error: function (returndata) {
//          }
//        });
      }
    }
	}
</script>
<style lang="less">
	.commentComplete{
		font-size: 0.205rem;
		color: #000;

    .main{
      margin-bottom: 0.2rem;
      padding:0 0.2rem;
      background-color: #ffffff;
      .table{
        display: table;
        width: 100%;
        padding: 0.3rem 0 0.35rem;
        .table_cell{
          display: table-cell;
          vertical-align: middle;
          &:first-of-type{
            width:1rem;
            padding-right: 0.2rem;
          }
          .main_img{
            width: 1rem;
            height: 1rem;
          }
          .name{
            font-size: 0.26rem;
            color: #333;
          }
          .type{
            margin-top: 0.1rem;
            font-size: 0.24rem;
            color: #999;
          }
        }
      }
      .score{
        font-size: 0;
        line-height: 1;
        color: #333;
        padding-bottom: 0.2rem;
        border-bottom: 0.02rem solid #eeeeee;
        &>span{
          font-size: 0.24rem;
          margin-right: 0.1rem;
        }
        .star{
          display: inline-block;
          vertical-align: -0.04rem;
          font-size: 0;
          span{
            display: inline-block;
            width: 0.45rem;
            height: 0.5rem;
          }
          .icon-start{
            color: #ef4949;
            font-size: 0.42rem;
          }
          .icon-xingxing_kongxin{
            font-size: 0.42rem;
          }
        }
      }
      .comment{
        .commenttext{
          width: 100%;
          height: 1.5rem;
          padding-top: 0.2rem;
          font-size: 0.24rem;
          resize : none;
          border: none;
          &:focus{
            outline: none;
            color: #333333;
          }
          &:-moz-placeholder {
            color: #cccccc;
          }
          &:-ms-input-placeholder{
            color: #cccccc;
          }
          &::-webkit-input-placeholder{
            color: #cccccc;
          }
        }
        .upload{
          padding-bottom: 0.2rem;
          .icon-tianjiatupian{
            font-size: 0.7rem;
            color: #999999;
          }
        }


      }
      .upload{
        font-size: 0;
        span{
          display: inline-block;
          position: relative;
          width: 0.7rem;
          height: 0.7rem;
          vertical-align: middle;
          margin-right: 0.3rem;
          &:last-of-type{
            margin-right: 0;
          }
          img{
            width: 0.7rem;
            height: 0.7rem;
          }
        }
        .uploadfile{
          position: absolute;
          left: 0;
          top: 0;
          width: 0.7rem;
          height: 0.7rem;
          opacity: 0;
        }
      }
    }

    .anonymousWrap{
      padding: 0 0.2rem;
      background-color: #ffffff;
      .anonymous{
        display: flex;
        font-size: 0.24rem;
        border-top: 0.02rem solid #eeeeee;
        background-color: #ffffff;
        div{
          line-height: 0.8rem;
        }
        div:first-of-type{
          color: #333333;
          span{
            padding-right: 0.1rem;
            vertical-align: middle;
            .icon-check{
              color: #999;
            }
            .red{
              color: #ef4949;
            }

          }
        }
        div:last-of-type{
          flex:1;
          text-align: right;
          color: #999999;
        }
      }
    }

    .btn{
      margin: 0.3rem 0.2rem 0;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.3rem;
      color: #fff;
      background-color: #ef4949;
    }
	}
</style>
