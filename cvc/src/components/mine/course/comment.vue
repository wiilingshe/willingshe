<template>
  <div class="comment">

    <div class="comment_content">
      <div class="comment_content-title">
        最新评论
      </div>
      <ul>
        <li class="comment_item"
            style="text-align: center;font-size: 0.3rem;color: #999999;padding-top:1rem;" v-if="commentis">
          —— &nbsp还没有评论&nbsp ——
        </li>
        <li class="comment_item" v-for="(item,index) in commentarr">
          <div class="comment_item-top">
            <img class="comment_item-portrait" :src="item.face"/>
            <span class="comment_item-name">{{item.nickname}}</span>
            <!--<span class="comment_item-time">1小时前</span>-->
            <span class="comment_item-up" @click="toSupported(item.cmt_id)">
              <span class="comment_item-uptext" :class="'comment_num'+item.cmt_id">
                {{item.support_count}}
              </span>
              <i class="icon iconfont comment_item-icon " :class="[(item.is_supported ? 'icon-dianzan':'icon-dianzan2'),('comment_icon'+item.cmt_id)]"></i>
              <!--:class="supportis[item.cmt_id] ? 'comment_supported':''"-->
            </span>
          </div>
          <div class="comment_item-text">{{item.content}}</div>
        </li>
      </ul>
      <div class="comment_bottomtip" v-if="!isload" >
        <loadNo></loadNo>
      </div>
    </div>
<!--评论底部栏-->
    <!--<div class="comment_tip" >-->
      <!--<span style="float: left" @click="showComment()">-->
        <!--<i class="icon iconfont icon-fanhui"></i>-->
      <!--</span>-->
      <!--<span style="float: right;font-size: 0.32rem" @click="isOpinion()">-->
        <!--<i class="icon iconfont icon-pinglun2"></i>-->
      <!--</span>-->
    <!--</div>-->

<!--评论输入框-->

    <!--<div class="comment_input" v-if="1">-->
      <!--<textarea class="comment_input-area" ref="area" placeholder="添加评论..." maxlength="60" @keyup="isBtn()"></textarea>-->
      <!--<span class="comment_input-btn" :class="btnis ? '': 'btn-no'" @click="getComment()">发送</span>-->
      <!--<span class="comment_input-btn" @click="isInput()" style="margin-top:0.5rem;background-color: cornflowerblue">返回</span>-->
    <!--</div>-->


    <!--<transition name="opinion-move">-->
      <!--<div class="comment_opinion" v-if="opinionis">-->
        <!--<div class="comment_opinion-title">-->
          <!--<span class="comment_opinion-back" style="float: left" @click="isOpinion()">-->
            <!--<i class="icon iconfont icon-fanhui"></i>-->
          <!--</span>-->
          <!--评论-->
          <!--<span class="comment_opinion-send" style="float: right;color:#333333;font-size: 0.28rem" @click="getComment()">发送</span>-->
        <!--</div>-->
        <!--<div class="comment_opinion-content">-->
          <!--<textarea  autofocus ref="area" class="comment_opinion-input"  placeholder="我有意见..." maxlength="60" @keyup="areaNum()"></textarea>-->
        <!--</div>-->
        <!--<div class="comment_opinion-foot">-->
          <!--<span class="comment_opinion-num" style="float: right">还可输入{{opinionnum}}字</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</transition>-->

  </div>
</template>

<script>
  import {InfiniteScroll} from 'mint-ui';
  import loadNo from '@/components/common/loadNo';
  export default{
      data(){
          return {
            opinionis:false,
            supportis:[],
            supaddnum:[],
            supsubnum:[],
            commentis:true,
            commentarr:[],
            commenturl:'',
            commentpage:1,
            isArr:[{},{}],
            opinionnum:70,
            isload:true,
          };
      },
    created(){
      this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id='+this.$route.query.artid+';page='+this.commentpage;
      this.getData('get',this.commenturl).then(res => {
        if(res.status == 200){
          if(res.data.length){
            this.commentis = false;
            this.commentarr = res.data;
            this.likeComment(0);
            if(res.data.length < 10){
              this.isload = false;
            }
          }else{
            this.commentis = true;
          }
        }
      });
    },
    methods:{
      showComment(){
      },
      isOpinion(){
        this.opinionis = !this.opinionis;
      },
      getComment(){
        let context = this.textValue;
        if(context.length){
          console.log(1);
          this.postData('post','/shop-v1-article_do_comment.html',{art_id:this.$route.query.artid,content:context}).then(res => {
            if(res.status==200){
              this.getData('get',this.commenturl).then(res => {
                if(res.status == 200){
                  if(res.data.length){
                    this.commentis = false;
                    this.commentarr = res.data;
                    for(let i = 0,len = this.commentarr.length;i<len;i++){
                      let id = this.commentarr[i].cmt_id;
                      this.supportis[id] = this.commentarr[i].is_supported;
                      this.Firstis[id] = this.commentarr[i].is_supported;
                      this.supportnum[id] = this.commentarr[i].support_count;
                    }
                  }else{
                    this.commentis = true;
                  }
                }
//          console.log(this.commentarr);
              });
              this.isOpinion();
            }
          })
        }
      },
      toSupported(id){
        let supId = id;
//        console.log('supportis',this.supportis[supId]);
        this.postData('post','/shop-v1-article_sup_comment.html',{c_id:supId}).then(res => {
            if(res.status ==200){
//              console.log(res.data);
              if(res.data.status == 2){
                $(".comment_icon"+supId).removeClass("icon-dianzan");
                $(".comment_icon"+supId).addClass("icon-dianzan2");
                this.supportis[supId] = 0;
              }else{
                $(".comment_icon"+supId).addClass("icon-dianzan");
                $(".comment_icon"+supId).removeClass("icon-dianzan2");
                this.supportis[supId] = 1;
              }
//              console.log('supportis',this.supportis[supId]);
//              console.log(supId,this.supaddnum[supId],this.supsubnum[supId]);
              if(this.supportis[supId]){
                $(".comment_num" + supId).html(this.supaddnum[supId]);
              }else{
                $(".comment_num" + supId).html(this.supsubnum[supId]);
              }
            }
        });
      },
      areaNum(){
        this.opinionnum = 70 - this.$refs.area.value.length;
      },
      loadMore(){
        if(this.isload){
            this.commentpage++;
            this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id='+this.$route.query.artid+'&page='+this.commentpage;
            this.getData('get',this.commenturl).then(res => {
              if(res.status == 200){
//                console.log(res.data);
                if(res.data.length){
                  this.commentarr = this.commentarr.concat(res.data);
                  let firstLen = this.commentarr.length - res.data.length;
                  this.likeComment(firstLen);
                }else{
                  this.isload = false;
                }
//                console.log(this.commentarr);
              }
            });
          }
      },
      likeComment(firstlen){
        let fLen = firstlen;
        for(let i = fLen,len = this.commentarr.length;i<len;i++){
          let id = this.commentarr[i].cmt_id;
          this.supportis[id] = this.commentarr[i].is_supported;
          if(this.commentarr[i].is_supported){
            this.supaddnum[id] = this.commentarr[i].support_count;
            this.supsubnum[id] = this.commentarr[i].support_count - 1;
          }else{
            this.supaddnum[id] = this.commentarr[i].support_count + 1;
            this.supsubnum[id] = this.commentarr[i].support_count;
          }
        }
      }
    },
    components:{loadNo}
  }
</script>

<style scoped lang="less">
  .comment{
    /*position: fixed;*/
    /*top:0;*/
    /*left: 0;*/
    /*z-index: 100;*/
    width: 100%;
    /*height: 7rem;*/
    /*height: 100vh;*/
    /*-webkit-overflow-scrolling:touch;*/
    /*overflow: scroll;*/
    background-color: #ffffff;

    &_content{
      /*width: calc(100vw - 0.2rem);*/
      /*min-height: 100vh;*/
      padding:0.2rem 0 1rem 0.2rem;
      &-title{
        padding-bottom: 0.2rem;
        font-size: 0.28rem;
      }
    }
    &_item{
      margin-bottom: 0.2rem;
      &-portrait{
        width: 0.6rem;
        height:0.6rem;
        vertical-align: middle;
        margin-right: 0.2rem;
        border:0;
        -webkit-border-radius:50%;
        -moz-border-radius:50%;
        border-radius:50%;
      }
      &-name{
        color: #333333;
        font-size: 0.28rem;
        margin-right: 0.2rem;
        max-width: 2rem;
        white-space:nowrap;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        overflow:hidden;
      }
      &-time{
        color: #999999;
        font-size: 0.24rem;
      }
      &-up{
        float: right;
        margin-right: 0.2rem;
        font-size: 0.24rem;
        color: #999999;

        .comment_item-icon{
          margin-left: 0.1rem;
        }
        .icon-dianzan{
          color: #d0cf0f;
        }

      }
      &-text{
        margin-left:0.85rem;
        padding:0.1rem 0 0.4rem 0;
        font-size: 0.26rem;
        color: #333333;
        border-bottom: 0.02rem solid #eeeeee;
      }

      &-revert{
        margin-left:0.85rem;
        margin-top: 0.2rem;
      }
    }

    &_tip{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 90%;
      z-index: 300;
      padding:0.2rem 5% 0.1rem;
      border-top:0.02rem solid #dddddd;
      background-color: #ffffff;
      text-align: center;

      .icon-fanhui,.icon-pinglun2{
        font-size: 0.38rem;
        color: #666666;
      }
    }


    &_opinion{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;
      left: 0;
      z-index: 400;
      font-size: 0.28rem;
      background-color: #ffffff;

      &-title{
        padding: 0.4rem 0.3rem 0.2rem;
        text-align: center;
        font-size: 0.32rem;
        font-weight: 500;
        border-bottom: 0.02rem solid rgba(161, 146, 164, 0.25);
        .icon-fanhui{
          font-size: 0.4rem;
          color: #666666;
        }
      }
      &-input{
        width: 80%;
        height: 5rem;
        padding: 0.2rem 10%;
        font-size: 0.24rem;
        border: none;
        resize : none;
        /*caret-color: #fe0f21;*/
        &:focus{
          outline: none;
        }
      }
      &-foot{
        position: fixed;
        bottom: 0;
        width: 90%;
        padding: 0 5% 0.2rem;
        overflow: hidden;
      }
    }
    .opinion-move-enter-active,.opinion-move-leave-active{
      transition:all 0.5s ease-in;
    }
    .opinion-move-enter,.opinion-move-leave-active{
      left: 100%;
    }



    /*不用*/
    &_publish{
      position: fixed;
      bottom:0;
      width: 94%;
      padding: 0.2rem 3% 0.1rem;
      border-top:0.02rem solid rgba(161, 146, 164, 0.25);
      background-color: #ffffff;
    }
    &_area{
      float: left;
      display: inline-block;
      width: 80%;
      /*height: 0.4rem;*/
      border: none;
      resize : none;
      &:focus{
        outline: none;
      }
    }
    &_btn{
      float: right;
      display: inline-block;
      width: 15%;
      height: 0.4rem;
      padding: 0.06rem 0 0.02rem;
      font-size: 0.24rem;
      color: #ffffff;
      text-align: center;

      -webkit-border-radius:0.4rem;
      -moz-border-radius:0.4rem;
      border-radius:0.4rem;
      background-color: #dfac0f;
    }
    .btn-no{
      opacity: 0.3;
    }
    .btn-no:before{
      content: '';
      position: absolute;
      top:0.1rem;
      display: block;
      width: 1.5rem;
      height: 0.6rem;

    }
  }
</style>
