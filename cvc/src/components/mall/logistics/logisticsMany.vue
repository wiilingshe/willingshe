<template>
  <div class="logisticsMany">
    <div v-if="isShow">
      <div class="logisticsMany_tab">
        <ul class="logisticsMany_tab-list">
          <li class="logisticsMany_tab-item" v-for="(i,index) in tabArr" :class="index==tabIndex ? 'active':''" @click="toggleShop(i,index)">
            {{i.package_name}}
          </li>
        </ul>
      </div>
      <div class="logisticsMany_shop">
        <div class="logisticsMany_shop-left">
          <div class="logisticsMany_shop-wrap">
            <ul class="logisticsMany_shop-list">
              <li v-for="i in orderObj.goods_lst">
                <img :src="i.goods_pic" class="logisticsMany_shop-img" onerror="this.src=&quot;/static/img/1.jpg&quot;">
              </li>
            </ul>
          </div>
        </div>
        <div class="logisticsMany_shop-right">
          共{{shopLen}}件商品
        </div>
      </div>
      <div class="logisticsMany_courier">
        <div class="logisticsMany_courier-content">
          <p>运单号：{{infoArr.logistics_code}}</p>
          <p>快递公司：{{orderObj.express_name}}</p>
        </div>
      </div>
      <div class="logisticsMany_detail">
        <ul v-if="infoArr.Is">
          <li v-for="i in infoArr.traces">
            <div class="logisticsMany_detail-icon">
              <div class="logisticsMany_detail-radius"></div>
              <br>
              <div class="logisticsMany_detail-line"></div>
            </div>
            <div class="tablewrap">
              <div class="table_cell">
                <p class="logisticsMany_detail-text">{{i.AcceptStation}}</p>
                <p>{{i.AcceptTime}}</p>
              </div>
            </div>
          </li>
        </ul>
        <ul v-if="!infoArr.Is">
          <li style="padding: 0.6rem 0 0;font-size: 0.3rem;text-align: center;font-weight: bold">
            {{infoArr.traces}}
          </li>
        </ul>
      </div>
    </div>
    <div class="manyNull" v-if="!isShow">
      <i class="icon iconfont icon-empty" style="font-size: 1.8rem"></i>
      <p style="font-size: 0.3rem">无物流信息</p>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';

  export default{
    data(){
      return{
        tabArr:[],
        tabIndex:0,
        orderObj:{},
        shopLen:0,
        infoArr:{},
        isShow:false,
      }
    },
    created(){
      this.global.shouquan();
      this.noShare();
      Indicator.open();
      let order = this.$route.query.order_no;
      this.postData('post','/shop-g1-order_get_order_logistics.html',{order_no:order}).then(res => {
        if(res.status == 200){
            if(res.data.length != 0){
                this.isShow = true;
              if(res.data.status != 0){
                this.tabArr = res.data;
                this.tabArr.forEach((i)=>{
                  if(typeof i.logistics_info.traces != 'string'){
                    i.logistics_info.traces.reverse();
                  }
                });
                this.orderObj = this.tabArr[0];
                this.shopLen = this.orderObj.goods_lst.length;
                this.infoArr = this.orderObj.logistics_info;

                if(typeof this.infoArr.traces == 'object'){
                  this.infoArr.Is = true;
                }else{
                  this.infoArr.Is = false;
                }
              }else{
                console.log(res.data.msg);
              }
            }
        }
        Indicator.close();
      });
      document.title = "物流信息";
    },
    methods:{
//        切换商品物流
      toggleShop(item,index){

          if(this.tabIndex != index){
            Indicator.open();
            this.orderObj = item;
            this.shopLen = this.orderObj.goods_lst.length;
            this.infoArr = this.orderObj.logistics_info;
            this.tabIndex = index;
            if(typeof this.infoArr.traces == 'object'){
              this.infoArr.Is = true;
            }else{
              this.infoArr.Is = false;
            }
          }
//          this.$nextTick(function () {
//            Indicator.close();
//          });
          setTimeout(function () {
            Indicator.close();
          },100)

      }
    }
  }
</script>
<style scoped lang="less">
  .logisticsMany{
    font-size: 0.24rem;
    min-height: 100%;
    background-color: #ffffff;
    &_tab{
      width: 100%;
      /*overflow: hidden;*/
      overflow-x: scroll;
      background-color: #ffffff;
      &-list{
        display: flex;
        padding: 0 0.2rem;
      }
      &-item{
        /*flex:0 0 1.2rem;*/
        min-width: 1.2rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.26rem;
        color: #333333;
      }
      .active{
        border-bottom: 0.04rem solid #ef4949;
      }
    }
    &_shop{
      display: flex;
      width: 100%;
      background-color: #eeeeee;
      &-left{
        width: 70%;
        overflow-x: scroll;
        padding: 0.16rem 0;
        margin: 0 0.2rem;
      }
      &-wrap{
        width: auto;
      }
      &-list{
        display: flex;
        width: auto;
        li{
          /*flex:0 0 1.18rem;*/
          min-width: 1.18rem;
          height: 1.18rem;
          margin-right: 0.2rem;
          &:last-of-type{
            margin-right: 0;
          }
        }
      }
      &-img{
        width: 1.18rem;
        height: 1.18rem;
      }
      &-right{
        width: 29%;
        text-align: center;
        line-height: 1.5rem;
        border-left: 0.02rem solid #ffffff;
      }

    }
    &_courier{
      display: table;
      width: 100%;
      background-color: #ffffff;
      border-bottom: 0.2rem solid #f9f9f9;
      &-content{
        display: table-cell;
        height: 1.3rem;
        padding-left: 0.2rem;
        vertical-align: middle;
        font-size: 0.26rem;
        p{
          font-size: 0.26rem;
          color: #333333;
          &:first-of-type{
            margin-bottom: 0.2rem;
          }
        }
      }
    }
    &_detail{
      ul{
        overflow: hidden;
        background-color: #ffffff;
        color: #ccc;
        li{
          position: relative;
          /*height: 1rem;*/
          padding-left: 1.05rem;
          padding-right: 0.2rem;

          &:first-of-type{
           color:#ef4949;
            .logisticsMany_detail-radius{
              background-color: #ef4949;
            }
          }
          &:last-of-type .logisticsMany_detail-line{
            background-color: #fff;
          }

          .tablewrap{
           display: table;
            height: 100%;
            width: 100%
          }
          .table_cell{
            display: table-cell;
            height: 100%;
            width: 100%;
            vertical-align: middle;
            padding: 0.25rem 0;
            border-bottom: 0.02rem solid #eeeeee;
          }
        }
      }
      &-icon{
        position: absolute;
        left: 0.5rem;
        top: 30%;
        width: 0.25rem;
        text-align: center;
        font-size: 0;
      }
      &-line{
        display: inline-block;
        width: 0.02rem;
        height: 2.5rem;
        background-color: #ccc;
      }
      &-radius{
        display: inline-block;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        background-color: #ccc;
      }
      &-text{
        margin-bottom: 0.1rem;
        overflow-wrap:break-word;
        word-wrap:break-word;
        word-break:break-all;
      }
    }

    .manyNull{
      padding-top: 1rem;
      text-align: center;
      color: #999999;
      .icon-empty{
        font-size: 1.8rem;
      }
      p{
        font-size: 0.3rem;
      }
    }

  }
</style>
