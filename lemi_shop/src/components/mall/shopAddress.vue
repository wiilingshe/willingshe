<template>
  <div class="shopAddress">
    <ul class="shopAddress_list">
      <li class="shopAddress_item" v-for="(i,index) in addressArr">
        <div class="shopAddress_item-content">
          <div class="shopAddress_item-name"><span>{{i.consignee}}</span><span>{{i.mobile}}</span></div>
          <div class="shopAddress_item-address">{{ comAdress(i.province,i.city,i.district)+i.street}}</div>
        </div>
        <div class="shopAddress_item-operation">
          <div class="shopAddress_item-owrap" @click="isDefalut(i.address_id)">
            <span class="shopAddress_item-check" v-if="!i.is_default">
              <i class="icon iconfont icon-check noCheck"></i>
            </span>
            <span class="shopAddress_item-check" v-if="i.is_default">
              <i class="icon iconfont icon-check"></i>
            </span>
            <span>
              默认地址
            </span>
          </div>
          <div class="shopAddress_item-owrap">
            <div style="display: inline-block" @click="goEdit(i.address_id)">
              <span class="">
                <i class="icon iconfont icon-bianji"></i>
              </span>
              <span>编辑</span>
            </div><!----><div style="display: inline-block" @click="toDel(i.address_id,index)">
              <span class="">
                <i class="icon iconfont icon-iconfonticonfontdelete"></i>
              </span>
              <span>删除</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="shopAddress_btn">
      <span @click="goAdd()"><i class="icon iconfont icon-jiahao"></i>新建地址</span>
    </div>
  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';

    export default{
        data(){
            return {
              addressArr:[],
              info:[],
              isAdmin:true,
            }
        },
        created(){
          this.global.shouquan();
          this.noShare();
          let that = this;
          $.ajax({
            url: "@/../static/xml/ChinaArea.xml",
            dataType: 'xml',
            type: 'GET',
            timeout: 2000,
            error: function (xml) {
              alert("加载XML 文件出错！");
            },
            success: function (xml) {
              $(xml).find("province").each(function () {
                let oArea ={id:0,name:''};
                oArea.id = $(this).attr('provinceID');
                oArea.name = $(this).attr('province');
                that.info.push(oArea);

                $(this).find("City").each(function () {
                  let oCity = {id:0,name:''};
                  oCity.id = $(this).attr('CityID');
                  oCity.name = $(this).attr('City');
                  that.info.push(oCity);

                  $(this).find("Piecearea").each(function () {
                    let oPiecearea = {id:0,name:''};
                    oPiecearea.id = $(this).attr('PieceareaID');
                    oPiecearea.name = $(this).attr('Piecearea');
                    that.info.push(oPiecearea);
                  });
                });
              });
            }
          });

//            未授权
          let url = '/shop-g1-user_get_address_list.html';
          this.getData('get',url).then(res => {
              if(res.status ==200){
                this.addressArr = res.data;
              }
          });
          document.title = "收货地址";
        },
      methods: {
//        收货地区id转换地区名
        comAdress(province,city,district){
            let address = {province:'',city:'',district:''};
            this.info.forEach(function (i) {
                switch (i.id ){
                  case province:
                    address.province = i.name;
                    break;
                  case city:
                    address.city = i.name;
                    break;
                  case district:
                    address.district = i.name;
                    break;
                }
            });
          return address.province + ' ' + address.city+ ' ' + address.district + ' ';
        },
//        删除地址
        toDel(id,index){
          MessageBox({
            title: ' ',
            message: '确认删除该地址吗?',
            showCancelButton: true
          }).then(action => {
            if(action == 'confirm'){
              this.postData('post','/shop-g1-user_del_address.html',{address_id:id}).then(res => {
                if(res.status == 200){
                  if(res.data.status == 1){
                    this.addressArr.splice(index,1);
//                    this.$router.go(0);
                  }
                }
              });
            }
          });
          this.$nextTick(function () {
            $('.mint-msgbox-message').css({'font-size':'0.3rem',color:'#333333'});
          });
        },
//        编辑地址
        goEdit(id){
          if(window.location.href.indexOf('goods_id') != -1){
//            this.$router.push({path:'/editAddress',query:{goods_id:this.$route.query.goods_id,addressid:id}});
            this.$router.replace({path:'/editAddress',query:{goods_id:this.$route.query.goods_id,addressid:id}});
          }else{
            this.$router.replace({path:'/editAddress',query:{addressid:id}});
//            this.$router.push({path:'/editAddress',query:{addressid:id}});
          }
        },
//        增加地址
        goAdd(){
          if(window.location.href.indexOf('goods_id') != -1){
            this.$router.replace({path:'/editAddress',query:{goods_id:this.$route.query.goods_id}});
//            this.$router.push({path:'/editAddress',query:{goods_id:this.$route.query.goods_id}});
          }else{
            this.$router.replace({path:'/editAddress'});
//            this.$router.push({path:'/editAddress'});

          }
        },
//        是否默认
        isDefalut(id){
          let addId = id;
          this.postData('post','shop-g1-user_edit_default_address.html',{address_id:addId}).then(res => {
            if(res.status == 200){
              if(res.data.status == 1){
                this.addressArr.forEach(function (i) {
                  i.is_default = addId == i.address_id ? 1:0;
                });
              }else{
                console.log(res.msg);
              }
            }
          });
        }
      }
    }
</script>

<style lang="less">
.shopAddress{
  font-size: 0.24rem;
  background-color: #f9f9f9;
  height: 100vh;

  &_list{
    padding-bottom: 1rem;
  }
  &_item{
    margin-top: 0.2rem;
    background-color: #ffffff;

    &:first-of-type{
      margin-top:0;
    }
    &-wrap{

    }
    &-content{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 1.3rem;
      padding-left: 0.3rem;
    }
    &-name{
      margin-bottom: 0.2rem;
      font-size: 0.26rem;
      color: #333333;
      span{
        &:first-of-type{
          margin-right: 0.8rem;
        }
      }
    }
    &-address{
      font-size: 0.24rem;
      color: #666666;
    }
    &-operation{
      display: flex;
      line-height: 0.7rem;
      padding: 0 0.2rem;
      border-top: 0.02rem solid #f2f2f2;
    }
    &-owrap{
      span{
        display: inline-block;
        /*line-height: 0.7rem;*/
      }
      &:nth-of-type(2){
        flex: 1;
        text-align: right;
        span:nth-of-type(2){
          margin-right: 0.2rem;
        }
      }
      .icon-bianji{
        font-size: 0.34rem;
        vertical-align: -0.03rem;
      }
      .icon-check{
        font-size: 0.4rem;
        vertical-align: -0.04rem;
        color: #ef4949;
        border: 0.01rem solid #cccccc;
        border-radius: 100%;
      }
      .noCheck{
        color: transparent;
      }
      .icon-iconfonticonfontdelete{
        font-size: 0.32rem;
        vertical-align: 0;
      }
    }

  }
  &_btn{
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
    line-height: 0.9rem;
    text-align: center;
    background-color: #ef4949;

    span{
      display: block;
      font-size: 0.3rem;
      color: #ffffff;
    }
    .icon-jiahao{
      margin-right: 0.1rem;
      font-size: 0.3rem;
      color: #ffffff;
    }
  }
}
</style>
