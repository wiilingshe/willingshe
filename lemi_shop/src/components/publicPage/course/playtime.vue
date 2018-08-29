<template>
  <div class="playtime" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="false"
       infinite-scroll-immediate-check="false"
       infinite-scroll-distance="20"
       >
       <div class="bg" v-if="editinfo" @click="noedit()"></div>
        <div class="infoedit" v-if="editinfo">
          <div class="infoedit-title">请完善资料</div>
          <div class="infoedit-tip">所有的精彩文章都带上你的个人信息，让客户主动找你买产品！</div>
          <div class="infoedit-inp1">
            <div class="infoedit-inp1-left">
              <img  src="/static/img/xingming@2x.png">
              <input id="name1" type="text" name="name1" :value="userinfo.my_name" placeholder="填写姓名">
            </div>
            <div class="inp1-right"></div>
          </div>
          <div class="infoedit-inp1">
            <div class="infoedit-inp1-left">
              <img  src="/static/img/phone1@2x.png">
              <input id="phnoe1" type="text" name="phnoe1" :value="userinfo.my_phone" placeholder="填写电话">
            </div>
            <div class="inp1-right"></div>
          </div>
          <div class="infoedit-btn">
            <div class="infoedit-btn-left" @click="noedit()">取消</div>
            <div class="infoedit-btn-right" @click="sendedit()">提交</div>
          </div>
        </div>
       <customInfo v-on:edit1="edit1" :userinfo="userinfo" :shareObj="shareObj" v-if="ifuserinfo"></customInfo>
    <ul class="playtime_list" >
        <li class="playtime_firstitem">
          <a class="playtime_firstitem-content" @click="toArticles(firstitem.art_id,firstitem.article_type)" >
            <div class="playtime_firstitem-imgwrap">
              <img class="playtime_firstitem-img" :src="firstitem.pic" @load="imgload(firstitem.art_id)" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;"  >
              <div :class="'load'+ firstitem.art_id"
                   style="position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 2.5rem;
                          height: 55vw;
                          line-height:55vw;
                          text-align: center;"
              >加载中.........</div>
            </div>
            <div class="playtime_firstitem-textwrap">
              <div class="playtime_firstitem-text">
                <span class="playtime_firstitem-bakcol">{{firstitem.title}}</span>
              </div>
              <div class="playtime_firstitem-details">
                <div class="playtime_firstitem-left" style="float: left">
                  <span class="playtime_firstitem-time" style="padding-right: 0.1rem">
                    {{firstitem.format_time}}
                  </span>
                  <!--<span class="playtime_firstitem-type">{{firstitem.cat_name}}</span>-->
                </div>
                <div class="playtime_firstitem-right" style="float: right">
                  <span class="playtime_firstitem-comment" style="padding-right: 0.3rem">
                    <i class="icon iconfont icon-huihua1" style="padding-right: 0.1rem"></i>
                    {{firstitem.comment_num}}
                </span>
                  <span class="playtime_firstitem-collect">
                    <i class="icon iconfont icon-aixin" style="padding-right: 0.1rem"></i>
                    {{firstitem.collect_num}}
                  </span>
                </div>
              </div>
            </div>
          </a>
          <div class="playtime_firstitem-selecttext">
            <a @click="toBoutique()">
              <span style="font-size: 0.24rem;color: #666666;margin-right: 0.1rem">全部文章</span>
              <i class="icon iconfont icon-tiaozhuan"></i>
            </a>
          </div>
        </li>

        <li class="playtime_item" v-for="(item,index) in arr">
          <a class="playtime_item-content" @click="toArticles(item.art_id,item.article_type)">
            <div class="playtime_item-textwrap">
              <div class="playtime_item-text">
                {{item.title}}
              </div>
              <div class="playtime_item-details">
                <div class="playtime_item-top">
                  <span class="playtime_item-type" style="padding-right: 0.12rem;font-size: 0.24rem;color: #999999">
                    {{item.cat_name}}
                  </span>
                </div>
                <div class="playtime_item-left" style="float: left">

                  <span class="playtime_item-comment" style="padding-right: 0.1rem;font-size: 0.24rem;color: #999999">
                    <i class="icon iconfont icon-huihua1" style="padding-right: 0.01rem"></i>
                    {{item.comment_num}}
                  </span>
                  <span class="playtime_item-collect" style="font-size: 0.24rem;color: #999999">
                    <i class="icon iconfont icon-aixin" style="padding-right: 0.01rem"></i>
                    {{item.collect_num}}
                </span>
                </div>
                <div class="playtime_item-right" style="float: right">
                  <span class="playtime_item-time" style="font-size: 0.24rem;color: #999999">
                    {{item.format_time}}
                  </span>

                </div>
              </div>
            </div>
            <div class="playtime_item-imgwrap">
              <img class="playtime_item-img" :src="item.pic" alt="图片未加载成功" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;" @load="imgload(item.art_id)">
              <div :class="'load'+item.art_id"
                   style="position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 2rem;
                          height: 35vw;
                          line-height:35vw;
                          text-align: center;
                          z-index:50;"
              >加载中.........</div>
            </div>
          </a>
        </li>
      </ul>

    <div class="playtime_bottomtip" v-if="!loadis" >
      <loadNo></loadNo>
    </div>

    <div :class="logois">
      <footer1></footer1>
    </div>

    <component :is="rootId"></component>

  </div>
</template>

<script>
  import {InfiniteScroll,Indicator,Toast} from 'mint-ui';
  import footer1 from '@/components/publicPage/footer1';
  import Navigator from '@/components/common/Navigator';
  import customNav from '@/components/common/custom/customNav';
  import loadNo from '@/components/common/loadNo';
  import customInfo from '@/components/common/customInfo';
  export default {
      data(){
          return {
            arr:[],
            firstitem:{},
            artid:'',
            loadis:true,
            logois:'',
            page:1,
            url:'',
            rootId:'',
            userinfo:[],
            ifuserinfo:false,
            editinfo:false,
            ifinfo:'0.2rem',
            ifinfo2:'1rem',
            shareObj:'',
            rootId:'',
            customArr:[''],
            infourl:'',
          }
      },
      created() {
        var self = this;
        Indicator.open();
        document.title = "课间";
        this.global.shouquan();
//        判断显示导航类型
        this.postData('post','/shop-v1-index_get_root.html').then(res => {
          if(res.data.rootId && res.data.rootId != ''){
            this.rootId = this.customArr.indexOf(res.data.rootId) != -1?'Navigator':'customNav';
          }else{
            this.rootId= this.customArr.indexOf(this.$route.query.root_id) != -1 ? 'Navigator':'customNav';
          }
        });
//        文章数据
        this.getData('get','/shop-v1-article_lst.html?is_page_top=1').then(res => {
          if(res.status == 200){
            this.arr = res.data.data;
            this.firstitem = res.data.topArticle;
            this.logois = this.arr.length > 3 ? 'playtime_logomar':'playtime_logobom';
            Indicator.close();
          }
        });
//        分享数据
        this.getData('get','/shop-v1-index_basemsg.html').then(res => {
          if(res.status == 200){
            var datadata = res;
            this.share(res.data.title,res.data.description,res.data.logo);
            self.postData('post','/shop-v1-index_basemsg.html').then(res => {
              var name = res.data.title
              var logo = res.data.logo
              if(self.$route.query.member_id == undefined){
                var data = {}
              }else{
                var data = {mid:self.$route.query.member_id}
              }
              self.postData('post','/shop-v2-st_msg.html',data).then(res => {
                if(res.data.status == 1){
                  self.userinfo = res.data;
                  self.ifuserinfo = true;
                  self.ifinfo = '1.2rem';
                  self.ifinfo2 = '2.2rem';
                  if(res.data.face==''){
                    var face = logo
                  }else{
                    var face = res.data.face
                  }
                  var sharename ='【'+res.data.name+'】-【'+name+'】' 
                  var sharephone = '联系电话：'+res.data.phone
                  // self.share(sharename,datadata.data.description,face);
                }else if(res.data.status == 2){
                  self.ifuserinfo = true;
                  self.userinfo = res.data;
                  self.ifinfo = '1.2rem';
                  self.ifinfo2 = '2.2rem';
                  if(res.data.face==''){
                    var face = logo
                  }else{
                    var face = res.data.face
                  }
                  var sharename ='【'+res.data.name+'】-【'+name+'】' 
                  var sharephone = '联系电话：'+res.data.phone
                  // self.share(sharename,datadata.data.description,face);
                }else if(res.data.status == 0){
                  self.ifuserinfo = false;
                  // self.share(self.obj.title,content,self.obj.pic);
                  // self.share(datadata.data.title,datadata.data.description,datadata.data.logo);
                }
              })
            })
          }
        });

//        函数去抖
//        $(window).on('scroll',aa());
//        function aa() {
//          let bounce;
//          console.log(2);
//          return function () {
//            clearTimeout(bounce);
//            bounce = setTimeout(loga,500);
//
//            function loga() {
//              console.log(1);
//            }
//          }
//        }
//        =============

      },
      methods: {
        edit1(){
        this.editinfo = true
      },
      noedit(){
        this.editinfo = false
      },
      sendedit(){
        var self = this;
        // console.log($('input[name=name1').val(),$('input[name=phnoe1').val())
        this.postData('post','/shop-v2-st_handle.html',{name:$('#name1').val(),phone:$('#phnoe1').val()}).then(res => {
          if(res.data.status){
            Toast(res.data.msg);
            setTimeout(function(){
              window.location.href = window.location.pathname + self.infourl
            },1000)
          }else{
            Toast(res.data.msg);
          }
        })
      },
//          下拉加载数据
        loadMore(){
          if(this.arr.length <= 40 && this.loadis){
            this.page++;
            this.url = '/shop-v1-article_lst.html?is_page_rec=1&page='+this.page;
            this.getData('get',this.url).then(res => {
              if(res.status==200){
//                console.log(res.data);
                if(res.data.data.length == 0){
                  this.loadis =false;
                }
                this.arr = this.arr.concat(res.data.data);
              }
            });
          }
        },
//        文章跳转
        toArticles(id,type){
            let rootId = this.$route.query.root_id;
//            根据不同类型文章传参
          switch(type) {
            case 1:
              this.$router.push({path: "/mine-course-articles", query: {artid: id,root_id:rootId}});
              break;
            case 2:
              this.$router.push({path: "/mine-course-vote", query: {artid: id,root_id:rootId}});
              break;
            case 3:
              this.$router.push({path: "/mine-course-mesay", query: {artid: id,root_id:rootId}});
              break;
            case 4:
              this.$router.push({path: "/mine-course-articles", query: {artid: id,root_id:rootId}});
              break;
          }
        },
//        跳转文章分类页
        toBoutique(){
          let rootId = this.$route.query.root_id;
          this.$router.push({path: "/mine-course-boutiquetext", query:{root_id:rootId}})
        },
//        图片加载中事件
        imgload(id){
            $('.load'+ id).hide();
        }
  },
    components:{footer1,Navigator,loadNo,customNav,customInfo}
  }
</script>

<style scoped lang="less">
  .playtime{
    font-size: 0.24rem;
    position: relative;
    width: 100%;
    width: 100vw;
    /*height: 100%;*/
    /*height: 100vh;*/
    overflow:hidden;
    /*-webkit-overflow-scrolling:touch;*/


    /*overflow: hidden;*/
    font-size: 0.26rem;
    font-weight: 700;
    color: #000000;
    background-color: #fff;

    .bg{
      width: 100%;
      height: 100vh;
      position: fixed;
      z-index: 101;
      background: rgba(0, 0, 0, 0.6);
    }
    .infoedit{
      width: 9rem;
      height: 9rem;
      background: #fff;
      position: fixed;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 4.1rem;
      height: 4.2rem;
      z-index: 102;
      border-radius: 0.05rem;
      &-title{
        font-size: 0.29rem;
        font-weight: bold;
        text-align: center;
        margin-top: 0.32rem;
      }
      &-tip{
        font-size: 0.24rem;
        text-align: center;
        margin:0 0.36rem;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
      }
      &-inp1{
        margin:0 0.36rem;
        margin-bottom: 0.25rem;
        border-bottom: 1px solid #999;
        &-left{
          input{
            border: 0px;
            width: 2.8rem;
            outline-style: none;
            margin-bottom: 0.15rem;
            padding-top: 0.15rem;
            font-size: 0.23rem;
          }
          img{
            width: 0.255rem;
            height: 0.255rem;
            margin-right: 0.1rem;
            position: relative;
            top: 0.03rem;
          }
        }
      }
      &-btn{
        display: flex;
        font-size: 0.24rem;
        justify-content: space-between;
        margin: 0 0.36rem;
        margin-top: 0.3rem;
        &-left,&-right{
          width: 50%;
          text-align: center;
        }
        &-left{
          border-right: 1px solid #eee;
        }
        &-right{
          color:#5A8EC4;
        }
      }
    }
    &_firstitem{
      border-bottom: 0.2rem solid #f2f2f2;
      /*margin-bottom: 0.4rem;*/
      &-imgwrap{

      }
      &-img{
          display: block;
          width: 100%;
          min-height: 2.5rem;
          min-height: 55vw;
          text-align: center;
      }

      &-textwrap{
        padding: 0.2rem 0.2rem 0;
      }
      &-bakcol{
        font-size: 0.28rem;
        color: #333333;
        /*background: #000000;*/
      }
      &-details{
        overflow: hidden;
        padding: 0 0.06rem 0.2rem;
        margin-top: 0.2rem;
        font-size: 0.24rem;
        font-weight: 200;
        color: #999999;
        border-bottom: 0.02rem solid #dddddd;
      }

      &-selecttext{
        padding-bottom: 0.2rem;
        padding-top: 0.25rem;
        text-align: center;
        border-bottom: 0.02rem solid #dddddd;

        a:visited,a:link{
          color: #666666;
        }
      }

    }

    &_list{
      position:relative;
      /*z-index: 40;*/
    }
    &_item{

      a:visited,a:link{
        color: #000000;
      }

      &-content{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        border-bottom: 0.15rem solid #f2f2f2;
      }
      &-imgwrap{
        position: relative;
        /*裁剪图片*/
        height: 2rem;
        height: 33vw;
        overflow: hidden;
      }
      &-img{
        display: block;
        width: 3rem;
        min-height: 2rem;
        min-height: 33vw;
        text-align: center;
      }

      &-textwrap{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;

        -webkit-box-direction: normal;
        -webkit-box-orient: vertical;
        -moz-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;

        flex: 1;

        padding: 0.2rem 0.2rem;
      }
      &-text{
        -webkit-box-flex: 1.0;
        -moz-flex-grow: 1;
        -webkit-flex-grow: 1;
        flex-grow: 1;

        line-height: 1.5;
        word-wrap:break-word;
        word-break: break-all
      }
      &-details{
        font-size:0.2rem;
        font-weight: 200;
        color: #666666;
      }
    }
    &_logomar{
      margin-top: 0.5rem;
      margin-bottom: 0.8rem;
      width: 100%;
    }
    &_logobom{
      position: fixed;
      width: 100%;
      bottom: 0;
    }
    .public{
      z-index:100;
    }


    .icon-tiaozhuan{
      color: #5e96d0;
      font-size: 0.24rem;
    }
    .icon-aixin,.icon-huihua1{
      font-size: 0.2rem;
    }
  }

</style>
