<template>
  <div class="theDeal">
      <div class="top">
        <span class="icon"><i class="icon iconfont icon-check"></i></span>
        交易完成
    </div>
    <div class="comment" @click="toComment()">
      <div class="table_cell">
        <div><i class="icon iconfont icon-xiangji_"></i></div>
        <p>立即晒图评价</p>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        data(){
            return {}
        },
        created(){
          document.title = "交易成功";
          this.noShare();
        },
        methods: {
          toComment(){
            let orderNo = this.$route.query.order_no;
            this.$router.push({path:'/commentComplete',query:{order_no:orderNo}});
          }
        }
    }
</script>
<style scoped lang="less">
  .theDeal{
    .top{
      width: 100%;
      line-height: 1rem;
      background-color: #ef4949;
      font-size: 0.3rem;
      color: #ffffff;
      .icon-check{
        padding: 0 0.2rem 0 0.3rem;
        vertical-align: -0.05rem;
        font-size: 0.5rem;
        color: #ffffff;
      }
    }
    .comment{
      display: table;
      width: 100%;
      height: 1.96rem;
      background-color: #ffffff;
      .table_cell{
        display: table-cell;
        width: 100%;
        height: 1.96rem;
        vertical-align: middle;
        text-align: center;
        .icon-xiangji_{
          font-size: 1rem;
          color: #cccccc;
        }
        p{
          font-size: 0.26rem;
          color: #41a0e9;
        }

      }
    }
  }
</style>
