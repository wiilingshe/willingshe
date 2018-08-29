<template>
<div class="chooseAddress">
  <ul class="chooseAddress_list">
    <li class="chooseAddress_item" v-for="(i,index) in addressArr" @click="chooseAdres(i.address_id,i.consignee,i.mobile,i.province,i.city,i.district,i.street)">
      <div class="chooseAddress_item-content">
        <div class="chooseAddress_item-name"><span>{{i.consignee}}</span><span>{{i.mobile}}</span></div>
        <div class="chooseAddress_item-address"><span v-if="i.is_default">[默认地址]</span>{{ comAdress(i.province,i.city,i.district)+i.street}}</div>
      </div>
    </li>
    <li class="chooseAddress_null" v-if="nullIs">
      <i class="icon iconfont icon-empty" style="font-size: 2rem"></i>
      <p style="font-size: 0.3rem;color: #999">请点击地址管理，添加收货地址</p>
    </li>
  </ul>

  <div class="chooseAddress_btn">
    <span @click="toEdit()">地址管理</span>
  </div>
</div>
</template>

<script>
    export default{
        data(){
            return {
              addressArr:[],
              info:[],
              nullIs:false,
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
            if(!this.addressArr.length){
              this.nullIs = true;
              }
          }
        });
        document.title = "选择收货地址";
      },
      methods:{
//          地区id转换地区名称
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
          return address.province + address.city + address.district;
        },
//        地址管理页跳转
        toEdit(){
          if(window.location.href.indexOf('goods_id') != -1){
            this.$router.push({path:'/shopAddress',query:{goods_id:this.$route.query.goods_id}});
          }else{
            this.$router.push({path:'/shopAddress'});
          }
        },
//        选择地址，跳转回订单详情
        chooseAdres(address_id,consignee,mobile,province,city,district,street){
          let selectList = window.localStorage.getItem('select');
//          console.log(selectList);
          selectList = JSON.parse(selectList);
//          console.log(selectList);
          this.info.forEach(function (i) {
            switch (i.id ){
              case province:
                selectList.consignee_address.province = i.name;
                break;
              case city:
                selectList.consignee_address.city = i.name;
                break;
              case district:
                selectList.consignee_address.district = i.name;
                break;
            }
          });
          selectList.consignee_address.street = street;
          selectList.consignee_address.consignee = consignee;
          selectList.consignee_address.mobile = mobile;
          selectList.consignee_address.address_id = address_id;
          if(selectList.goods_lst[0].goods_id == this.$route.query.goods_id){
            this.postData('post','/shop-g1-goods_get_freight.html',{'mould_id':selectList.consignee_address.mould_id,'search_data':address_id,'search_type':2,buy_num:selectList.goods_lst[0].goods_num}).then(res => {
              if(res.status == 200){
                selectList.yunfei = res.data.freight;
                window.localStorage.setItem('select',JSON.stringify(selectList));
                this.$router.push({path:'/confirmOrder',query:{goods_id:this.$route.query.goods_id}});
              }else{
                Toast({
                  message: '获取运费失败，请刷新重试',
                  iconClass: 'icon iconfont icon-tishi',
                  duration: 1000
                });
              }
            });
          }else{
            let cartList = '';
            for(let i = 0;i<selectList.goods_lst.length;i++){
                if(i == 0){
                  cartList = selectList.goods_lst[i].goods_cart_id;
                }else{
                  cartList = cartList + ',' +selectList.goods_lst[i].goods_cart_id;
                }
            }
            this.postData('post','/shop-g1-cart_settlement_goods_cart.html',{sel_c_ids:cartList,address_id:address_id}).then(res => {
              if(res.status == 200){
                selectList.shipping_amount = res.data.shipping_amount;
                window.localStorage.setItem('select',JSON.stringify(selectList));
                this.$router.push({path:'/confirmOrder',query:{goods_id:this.$route.query.goods_id}});
              }else{
                Toast({
                  message: '获取运费失败，请刷新重试',
                  iconClass: 'icon iconfont icon-tishi',
                  duration: 1000
                });
              }
            });
          }
        }
      }
    }
</script>

<style scoped lang="less">
  .chooseAddress{
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
        span{
          color: #ef4949;
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
    &_null{
      padding-top: 1.5rem;
      text-align: center;
      color: #dddddd;
    }
  }
</style>
