<template>
  <div class="commentSuccess">
    <div class="table">
      <div class="table_cell">
        <span>
          <i class="icon iconfont icon-check"></i>
        </span>
        <p class="text1">感谢您的用心评价 !</p>
        <p class="text2">愿您每天都有好心情 ~</p>
        <div class="btn" @click="backOrder()">返回订单</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        data(){
            return{
            }
        },
      created(){
            document.title = '评价成功';
            this.noShare();
      },
      methods:{
        backOrder(){
//            let orderNo = this.$route.query.order_no;
            this.$router.push({path:'/orderCenter',query:{type_id:this.$route.query.type_id}});
        }
      }
    }
</script>

<style scoped lang="less">
  .commentSuccess{
    .table{
      display: table;
      width: 100%;
      height:100vh;
      &_cell{
        display: table-cell;
        width: 100%;
        height: 100%;
        vertical-align: middle;
        text-align: center;
        .icon-check{
          font-size: 1.5rem;
          color: #4896d8;
        }
        .text1{
          margin-top: 0.47rem;
          font-size: 0.34rem;
          color: #333333;
        }
        .text2{
          margin-top: 0.2rem;
          font-size: 0.26rem;
          color: #999999;
        }
        .btn{
          display: inline-block;
          /*width:6.2rem;*/
          width: 90%;
          margin-top: 0.8rem;
          line-height: 0.9rem;
          font-size: 0.3rem;
          color: #ffffff;
          background-color:#4896d8;
        }
      }
    }
  }
</style>
