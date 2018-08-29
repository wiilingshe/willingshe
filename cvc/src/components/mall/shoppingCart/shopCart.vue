<template>
  <div class="shopCart">
    <div class="edit">
      <i class="icon iconfont icon-bianji" @click="edit()"></i>
      <span @click="edit()">完成</span>
    </div>
    <nodata v-if="nodata"></nodata>
    <div class="lists1" v-if="!nodata">
      <div class="list" v-for="i in arr">
        <ul>
          <li>
            <span class="select" @click="ifGou($event,i.is_on_sale)" :data-id="i.goods_cart_id" :data-goodsId="i.goods_id" :data-price="i.shop_price" :data-num="i.goods_num" :class="i.is_on_sale==0? 'grayback':'' ">
              <i class="icon iconfont icon-gou" :class="i.is_on_sale==0?'graycolor':''"></i>
            </span>
          </li>
          <li>
            <div class="img1" :style="{'background-image':'url('+i.goods_pic+')'}">
            </div>
          </li>
          <li>
            <div class="name2">{{i.goods_name}}</div>
            <div  :data-id="i.goods_cart_id" class="sku1" :class="{'editSku':ifedit}" @click="changeSku(i.goods_pic,i.shop_price,i.goods_subtotal,i.sku_name,i.goods_id,$event,i.goods_num,i.is_on_sale)" v-show="i.sku_name != ''">
              {{i.sku_name}}
              <i v-show="ifedit" class="icon iconfont icon-xiala" style="font-size: 0.25rem;position: absolute;right: 0.17rem;"></i>
            </div>
            <div class="price1">
              <span class="jiage">&yen;{{i.shop_price}}</span>
              <span class="zhenjia">&yen;{{i.market_price}}</span>
              <!--v-if="i.sku_id != 0"-->
              <div class="div1" :data-id="i.sku_id" >
                <span class="jian1" @click="jian1($event,i.stock,i.is_on_sale)">-</span>
                <span :data-all="i.stock" class="num11">{{i.goods_num}}</span>
                <span class="jia1" @click="jia1($event,i.stock,i.is_on_sale)">+</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="xia">
      <ul>
        <li>
          <span class="allradio">
            <input type="checkbox" name="" v-model="ifAll">
            <span :style="{display:ifAll==false?'none':'block'}"></span>
          </span>
          <span class="all">
            全选
          </span>
          <div class="heji">
            <span>合计：</span>
            <span>&yen;{{allPrice}}</span>
          </div>
        </li>
        <li class="jiesuan" @click="dothis()" :class="nodata?'blackcolor':'redcolor'">
          去结算
        </li>
      </ul>
    </div>
    <!-- 选择规格 -->
    <div class="selectSku">
      <div class="selectSkuback"></div>
      <div class="selectSku1">
        <ul class="ul4">
          <li>
            <div style="position:relative;top:-0.5rem;padding:0.1rem;background-color:#fff;margin-left: 0.17rem;margin-right: 0.17rem;">
              <img class="img2" :src="pic">
            </div>
          </li>
          <li>
            <div class="xintable">
              <div>
                <div>&yen; <span>{{price}}</span></div>
                <div>商品规格：{{skuname}}</div>
              </div>
            </div>
          </li>
          <li style="float:right" @click="closeSku()">
            <i class="icon iconfont icon-guanbi1"></i>
          </li>
        </ul>
      </div>
      <div class="selectCon">
        <div class="selectSku2" v-for="item in arr2.spec_list">
          <div class="skuTitle" style="margin-bottom:0.17rem;margin-top:0.17rem;" :data-id="item.spec_info.spec_id">
            {{item.spec_info.spec_name}}
          </div>
          <div>
            <!-- 选中添加属性sku1 -->
            <span class="sku2" v-for="item2 in item.spec_value_array" :data-id="item2.spec_value_id" @click="selectSku1(item2.spec_value_id,$event)">{{item2.spec_value_name}}</span>
          </div>
        </div>
        <div class="selectSku3">
          <ul class="ul5">
            <li>
              购买数量
            </li>
            <li>
              <div style="position: relative;top: -0.06rem;">
                <span class="jian" @click="jian()">-</span>
                <span class="num1" :data-all="stock">1</span>
                <span class="jia" @click="jia()">+</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="selectSku4">
        </div>
      </div>
      <div class="selectSku5 nobuy" @click="confirm()">
        确认
      </div>
    </div>
    <div v-if="navIs">
      <customNav v-on:child-say="listenToMyBoy"></customNav>
    </div>
    <div v-if="!navIs">
      <mallTab></mallTab>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import nodata from '@/components/common/nodata';
  import mallTab from '@/components/mall/mallTab'
  import customNav from '@/components/home/custom/customNav';

  export default{
    data(){
      return{
        arr:[],
        arr2:[],
        pic:'',
        price:'',
        stock:'',
        skuname:'',
        ifedit:false,
        allnum:'',
        skuId:'',
        ifgou:true,
        ifAll:false,
        cartList:'',
        allPrice:0,
        nodata:false,
        navIs:true,
      }
    },
    created(){
      var self = this;
      this.global.shouquan();
      this.noShare();
      this.getData('get','/shop-g1-cart_cart_lst.html').then(res => {
        this.arr = res.data;
        if(res.data.length == 0){
          self.nodata = true;
        }
      });
      document.title = "购物车";
    },
    methods:{
//        商品是否下架
      ifGou(e,sale){
          if(sale == 0 && !this.ifedit){
            Toast({
              message: '该商品已下架',
              iconClass: 'icon iconfont icon-tishi',
              duration: 2000
            });
//            console.log(sale);
            return false;
          }

        if($(e.target).hasClass('select1') == false){
          $(e.target).addClass('select1')
        }else{
          $(e.target).removeClass('select1')
        }
        this.cartList = '';
        this.allPrice = 0;

        for(let i=0;i<$('.select').length;i++){

          if($('.select').eq(i).find('i').hasClass('select1') == true){
            this.cartList = this.cartList + ',' + $('.select').eq(i).attr('data-id');
            this.allPrice = Number(this.allPrice) + Number($('.select').eq(i).attr('data-price'))*Number($('.select').eq(i).attr('data-num'));
            this.allPrice = this.allPrice.toFixed(2);
          }
        }
        this.cartList = this.cartList.substr(1);

      },
//      编辑
      edit(){
          if(!this.nodata){
            if(this.ifedit == false){
              this.ifedit = true;
              $('.edit').eq(0).find('i').css('display','none');
              $('.edit').eq(0).find('span').css('display','block');
              $('.heji').css({'display':'none'});
              $('.jiesuan').eq(0).text('删除')
            }else{
              $('.select1').removeClass('select1');
              this.ifAll = false;
              this.ifedit = false;
              $('.edit').eq(0).find('i').css('display','block');
              $('.edit').eq(0).find('span').css('display','none');
              $('.heji').css({'display':'block'});
              $('.jiesuan').eq(0).text('去结算')
            }
          }
      },
//      点击规格修改
      changeSku(pic,price,stock,skuname,id,e,num,sale){
        if(sale && this.ifedit == true){
          $('.selectSku5').eq(0).attr('data-id',$(e.target).attr('data-id'));
          this.pic = pic;
          this.price = price;
          this.stock = stock;
          this.postData('post','/shop-g1-cart_get_sku_lst_by_gid.html',{g_id:id}).then(res => {
            this.arr2 = res.data;
            $('.selectSku').eq(0).animate({'left':'0'});

            this.$nextTick(function () {
//                默认选择
              let name = skuname.split(',');
              for(let i = 0;i< this.arr2.spec_list.length;i++){
                this.arr2.spec_list[i].spec_value_array.forEach((j,index)=>{
                  if(j.spec_value_name == name[i]){
                    $('.selectSku2:eq('+i+') .sku2:eq('+index+')').trigger('click');
                  }
                });
                }
              $('.num1').eq(0).text(num);
            })
          })
        }
      },
//      关闭规格
      closeSku(){
        $('.selectSku').eq(0).animate({'left':'-100%'});
      },
//      选中规格
      selectSku1(id,e){
        $('.num1').eq(0).text('1');
        $(e.target).closest('.selectSku2').find('span').removeClass('sku1');
        $(e.target).addClass('sku1');
        var geshu = 0;
        var str = ''
        for(let i=0;i<$('.selectSku2').length;i++){
          if($('.selectSku2').eq(i).html().indexOf('sku1') != -1){
            geshu = geshu + 1;
            var titleId = $('.selectSku2').eq(i).find('.skuTitle').eq(0).attr('data-id');
            var skuId = $('.selectSku2').eq(i).find('.sku1').eq(0).attr('data-id');
            if(str == ''){
              str = str + titleId + ':' + skuId;
            }else{
              str = str + ';' + titleId + ':' + skuId;
            }
          }
        }
        this.skuStr = str;
        console.log(this.arr2);
        for(let x=0;x<this.arr2.sku_lst.length;x++){
          if(str == this.arr2.sku_lst[x].attr_value_items){
            this.price = this.arr2.sku_lst[x].shop_price;
            this.thisCode = this.arr2.sku_lst[x].code;
            this.stock = this.arr2.sku_lst[x].goods_number;
            this.skuId = this.arr2.sku_lst[x].sku_id;
            this.skuname = this.arr2.sku_lst[x].sku_name;
            if(this.arr2.sku_lst[x].goods_number != 0){
              if(geshu == $('.selectSku2').length){
                $('.selectSku5').eq(0).removeClass('nobuy');
              }
              $('.left1').eq(0).text(this.skuName);
            }else{
              $('.left1').eq(0).text(this.skuName);
              Toast({
                message: '暂无库存',
                iconClass: 'icon iconfont icon-kulian',
                duration: 1000
              });
            }
          }
        }
      },
//      商品数量计算函数
      changenum(num,e){

        var self = this;

        var id = $(e.target).closest('li').find('.sku1').eq(0).attr('data-id');
//        var sku_id = $(e.target).closest('.div1').attr('data-id');
        this.postData('post','/shop-g1-cart_update_cart_goods_num.html',{cart_id:id,goods_number:num}).then(res => {
          if(res.data.status == 1){
//            Toast({
//              message: res.data.msg,
//              iconClass: 'icon iconfont icon-tishi',
//              duration: 1000
//            });
            self.allPrice = 0;
            let numIndex = $('.div1').index($(e.target).closest('.div1'));
            this.arr[numIndex].goods_num = num;
            for(let i=0;i<$('.select').length;i++){
              if($('.select').eq(i).find('i').hasClass('select1') == true){
                self.cartList = self.cartList + ',' + $('.select').eq(i).attr('data-id');
                self.allPrice = Number(self.allPrice) + Number($('.select').eq(i).attr('data-price'))*Number(this.arr[i].goods_num);
                self.allPrice = self.allPrice.toFixed(2);
              }
            }
          }else{
            Toast({
              message: res.data.msg,
              iconClass: 'icon iconfont icon-tishi',
              duration: 1000
            });
          }
        })
      },
//      规格选择数量加减
      jian1(e,stock,sale){
        if(sale){
            var numm = $(e.target).closest('.div1').find('.num11').eq(0).attr('data-all');
            if(numm != 0 && $(e.target).closest('.div1').find('.num11').eq(0).text() > 1){
              var num = Number($(e.target).closest('.div1').find('.num11').eq(0).text()) - Number(1);
              $(e.target).closest('.div1').find('.num11').eq(0).text(num);
              this.changenum(num,e)
            }
          }else{
          Toast({
            message: '商品已下架',
            iconClass: 'icon iconfont icon-kulian',
            duration: 1000
          });
        }
      },
      jia1(e,stock,sale){
          if(sale){
            var numm = $(e.target).closest('.div1').find('.num11').eq(0).attr('data-all');
            if(numm == undefined || (numm != 0 && parseInt($(e.target).closest('.div1').find('.num11').eq(0).text()) < parseInt(numm))){
              var num = Number($(e.target).closest('.div1').find('.num11').eq(0).text()) + Number(1);
              $(e.target).closest('.div1').find('.num11').eq(0).text(num);
              this.changenum(num,e);
            }else{
              Toast({
                message: '库存不足',
                iconClass: 'icon iconfont icon-kulian',
                duration: 1000
              });
            }
          }else{
            Toast({
              message: '商品已下架',
              iconClass: 'icon iconfont icon-kulian',
              duration: 1000
            });
          }
      },
//      购物车数量加减
      jian(){
        if(this.stock != 0 && $('.num1').eq(0).text() > 1){
          var num = Number($('.num1').eq(0).text()) - Number(1);
          $('.num1').eq(0).text(num);
        }
      },
      jia(){
        if(this.stock != 0 && $('.num1').eq(0).text() < this.stock){
          var num = Number($('.num1').eq(0).text()) + Number(1);
          $('.num1').eq(0).text(num);
        }else{
          Toast({
            message: '库存不足',
            iconClass: 'icon iconfont icon-kulian',
            duration: 1000
          });
        }
      },
//      确认规格
      confirm(){
        var id = $('.selectSku5').eq(0).attr('data-id');
        this.postData('post','/shop-g1-cart_update_cart_goods_sku.html',{cart_id:id,sku_id:this.skuId,goods_num:$('.num1').eq(0).text()}).then(res => {
          if(res.data.status == 1){
            $('.selectSku').eq(0).animate({'left':'-100%'});
            this.getData('get','/shop-g1-cart_cart_lst.html').then(res => {
              this.arr = res.data;
            })
//            this.postData('post','/shop-g1-cart_update_cart_goods_num.html',{cart_id:id,sku_id:this.skuId,goods_number:$('.num1').eq(0).text()}).then(res => {
//              if(res.data.status == 1){
//              }else{
//                Toast({
//                  message: res.data.msg,
//                  iconClass: 'icon iconfont icon-tishi',
//                  duration: 1000
//                });
//              }
//            })
          }else{
            Toast({
              message: res.data.msg,
              iconClass: 'icon iconfont icon-tishi',
              duration: 1000
            });
          }
        })
      },
//      结算
      dothis(){
          if(!this.nodata){
            if(this.ifedit == false){
              var list = '';
              for(let i=0;i<$('.select').length;i++){
                if($('.select').eq(i).find('i').hasClass('select1') == true){
                  var goods_id = $('.select').eq(i).attr('data-goodsId')
                  if(list.indexOf(goods_id) == -1){
                    list = list + ',' + goods_id;
                  }
                }
              }
              if(list == ''){
                Toast({
                  message: '请选择商品',
                  iconClass: 'icon iconfont icon-tishi',
                  duration: 1000
                });
                return false;
              }

              list = list.substr(1);
              this.postData('post','/shop-g1-cart_settlement_goods_cart.html',{sel_c_ids:this.cartList}).then(res => {
                if(res.data.status == 0){
                  Toast({
                    message: res.data.msg,
                    iconClass: 'icon iconfont icon-tishi',
                    duration: 1000
                  });
                }else{
                  window.localStorage.setItem('select',JSON.stringify(res.data));
                  this.$router.push({'path':'confirmOrder'})
                }
              })
            }else{
              this.postData('post','/shop-g1-cart_batch_remove_cart_goods.html',{cart_ids:this.cartList}).then(res => {
                if(res.data.status == 1){
                  Toast({
                    message: res.data.msg,
                    iconClass: 'icon iconfont icon-check',
                    duration: 1000
                  });
                  this.getData('get','/shop-g1-cart_cart_lst.html').then(res => {
                    this.arr = res.data;
                    this.nodata = this.arr.length == 0? true:false;
                  });
                }else{
                  Toast({
                    message: res.data.msg,
                    iconClass: 'icon iconfont icon-tishi',
                    duration: 1000
                  });
                }
              })
            }
          }
      },
//      自定义导航显示
      listenToMyBoy(is){
        if(is != undefined){
          this.navIs = is;
        } else {
          this.$nextTick(function () {
            $('.customNav_bottomnav').css({position:'fixed',bottom:0});
            let cusBottom = $('.customNav_bottomnav-wrap').height();
            $('.selectSku').css({'bottom':cusBottom});
            $('.xia').css({'bottom':cusBottom});
          });
        }
      }
    },
    components:{mallTab,nodata,customNav},
    watch:{
//        全部选中
      ifAll(val,oldval){
          if(!this.nodata){
            if(this.ifedit){
              if(val == true){
                $('.select').find('i').addClass('select1');
              }else{
                $('.select').find('i').removeClass('select1');
              }
            }else{
              if(val == true){
                $('.select').find('i').not('.graycolor').addClass('select1');
              }else{
                $('.select').find('i').not('.graycolor').removeClass('select1');
              }
            }
            this.cartList = '';
            this.allPrice = 0;
            for(let i=0;i<$('.select').length;i++){
              if($('.select').eq(i).find('i').hasClass('select1') == true){
                this.cartList = this.cartList + ',' + $('.select').eq(i).attr('data-id');
                this.allPrice = Number(this.allPrice) + Number($('.select').eq(i).attr('data-price'))*Number($('.select').eq(i).attr('data-num'));
                this.allPrice = this.allPrice.toFixed(2);
              }
            }
            this.cartList = this.cartList.substr(1);
          }
      }
    }
  }
</script>

<style lang="less">

  .shopCart{
    font-size: 0.205rem;
    .edit{
      width: 100%;
      height: 0.682rem;
      background-color: #fff;
      color: #999;
      border-bottom: 1px solid #eee;
      position: relative;
      span{
        right: 0.17rem;
        position: absolute;
        line-height: 0.682rem;
        font-size: 0.23rem;
        display: none;;
      }
      i{
        float: right;
        font-size: 0.26rem;
        line-height: 0.65rem;
        margin-right: 0.17rem;
      }
      i:after{
        content: '编辑';
        font-size: 0.222rem;
      }
    }
    .lists1{
      height: calc(~"100vh - 2.2rem");
      overflow:scroll;
      -webkit-overflow-scrolling:touch;
      .list{
        height: 1.79rem;
        width: 100%;
        background-color: #fff;
        overflow:auto;
        margin-bottom: 0.17rem;
        ul{
          li{
            float: left;
            height: 1.79rem;
          }
          li:nth-child(1){
            width: 0.72rem;
            .select{
              width: 0.3rem;
              height: 0.3rem;
              border-radius: 50%;
              border: 1px solid #ddd;
              display: inline-block;
              margin-top: calc(~"100%");
              margin-left: 0.17rem;
              position: relative;
              i{
                font-size: 0.3rem;
                font-weight: bold;
                border-radius: 50%;
                color: #fff;
              }
            }
            .select1{
              background-color: #ef4949;
              border: 1px solid #ef4949;
              color: #fff;
              i{
                color: #fff;
                border-radius: 50%;
              }
            }

            .grayback{
              background-color: #999999;
            }
            .graycolor{
              color: #999999;
            }
          }
          li:nth-child(2){
            width: 1.43rem;
            .img1{
              width: 1.433rem;
              height: 1.433rem;
              background-color: #eee;
              background-size:cover;
              margin-top: 0.17rem;
            }
          }
          li:nth-child(3){
            width: calc(~"100% - 3.685rem + 1.365rem");
            margin-left: 0.17rem;
            height: 1.792rem;
            position: relative;
            .div1{
              display:inline-block;
              float:right;
              margin-right: 0.17rem;
              .jian1,.jia1,.num11{
                width: 0.426rem;
                height: 0.426rem;
                display: inline-block;
                  text-align: center;
                  line-height: 0.426rem;
              }
              .num11{
                font-size: 0.205rem;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                width: 0.6rem;
              }
              .jian1{
                color: #999;
                border:1px solid #ccc;
                position: relative;
                left: 0.08rem;
                border-radius: 0.1rem 0 0 0.1rem;
              }
              .jia1{
                color: #999;
                border:1px solid #ccc;
                position: relative;
                right: 0.08rem;
                border-radius: 0 0.1rem 0.1rem 0;
              }
            }
            .name2{
              font-size: 0.222rem;
              margin-top: 0.17rem;
              max-height: 0.84rem;
                overflow: hidden;
            }
            .sku1{
              margin-top: 0.06rem;
              color: #999;
              position: relative;
            }
            .editSku{
              background-color: #eee;
              padding: 0.05rem;
              width: calc(~"100% - 0.4rem");
            }
            .price1{
              font-size: 0.222rem;
              position: absolute;
              bottom: 0.17rem;
              width: 100%;
              height: 0.48rem;
              .jiage{
                color: #ef4949;
                position: relative;
                top: 0.1rem;
              }
              .zhenjia{
                color: #999;
                text-decoration: line-through;
                position: relative;
                top: 0.1rem;
                margin-left: 0.1rem;
              }
            }
          }
        }
      }
    }
    .xia{
      height: 0.682rem;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #eee;
      position: fixed;
      bottom: 53px;
      overflow: auto;
      ul{
        font-size: 0.222rem;
        li{
          float: left;
        }
        li:nth-child(1){
          width: calc(~"100% - 2.13rem");
          height: 0.682rem;
          .all{
            line-height: 0.682rem;

          }
          .heji{
            display:inline-block;
            float:right;
            margin-right:0.17rem;
            line-height:0.682rem;
            span:nth-child(2){
              color: #ef4949;
            }
          }
          .allradio{
            width: 0.3rem;
            height: 0.3rem;
            border-radius: 50%;
            border:1px solid #ddd;
            display: inline-block;
            margin-left: 0.17rem;
            position: relative;
            top: 0.06rem;
            input{
              position: absolute;
              top: 0.05rem;
              left: 0.05rem;
              opacity: 0;
            }
            span {
              width: 0.2rem;
              height: 0.2rem;
              border-radius: 50%;
              background-color: #ef4949;
              display: inline-block;
              margin-left: 0.05rem;
              margin-top: 0.05rem;
            }
          }
        }
        li:nth-child(2){
          width: 2.13rem;
          height: 0.682rem;

          color: #fff;
          text-align: center;
          line-height: 0.682rem;
          font-size: 0.222rem;
        }
        .redcolor{
          background-color: #ef4949;
        }
        .blackcolor{
          background-color: #999999;
        }
      }
    }
    .selectSku{
      position: fixed;
      bottom: 53px;
      width: 100%;
      background-color: #eee;
      left: -100%;
      .selectCon{
        width: 100%;
        max-height: 50vh;
        overflow-y: scroll;
        background-color: #fff;
      }
      .selectSkuback{
        position: absolute;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.69);
        left: 0;
        top: -100vh;
      }
      .selectSku1{
        border-top: 1px solid #eee;
        .ul4{
          width: 100%;
            height: 1.59rem;
            background: #fff;
          li{
            float: left;
          }
          li:nth-child(1){
            height: 1.59rem;
            background-color: #fff;
          }
          .img2{
            width: 1.79rem;
            height: 1.79rem;
          }
          .xintable{
            height: 1.59rem;display: table;
          }
          .xintable>div{
            display: table-cell;vertical-align: middle;
            div:nth-child(1){
              color: #ef4949;
            }
            div:nth-child(2){
              width: 50vw;
              font-size: 0.222rem;
              overflow-wrap:break-word;
              word-wrap:break-word;
              word-break:break-all;
            }
            span{
              font-size: 0.29rem;
            }
          }
          i{
            float: right;
            margin-top: 0.17rem;
            margin-right: 0.17rem;
          }
        }
      }
      .selectSku2{
        height: auto;
        width: calc(~"100% - 0.34rem");
        padding-left: 0.17rem;
        padding-right: 0.17rem;
        background-color: #fff;
        border-top: 1px solid #eee;
        .sku1,.sku2{
          margin-right: 0.17rem;
          margin-bottom: 0.17rem;
        }
        .sku2{
          color: #333;
          background-color: #eeeeee;
          padding: 0.1rem;
          border-radius: 0.1rem;
          display: inline-block;
        }
        .sku1{
          color: #fff;
          background-color: #ef4949;
          padding: 0.1rem;
          border-radius: 0.1rem;
          display: inline-block;
        }
      }
      .selectSku3{
        height: 0.64rem;
        width: calc(~"100% - 0.34rem");
        padding: 0 0.17rem;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee;
        .ul5{
          padding-top: 0.17rem;
          li{
            float: left;
            width: 50%;
          }
          li:nth-child(1){

          }
          li:nth-child(2){
            div{
              float: right;
            }
          }
          .jian,.jia,.num1{
            width: 0.426rem;
            height: 0.426rem;
            background-color: #eee;
            display: inline-block;
              text-align: center;
              line-height: 0.426rem;
          }
          .num1{
            font-size: 0.205rem;
            background-color: #f0f0f0;
          }
          .jian{
            background-color: #eeeeee;
            color: #999;
          }
          .jia{
            background-color: #dddddd;
            color: #999;
          }
        }
      }
      .selectSku4{
        height: 0.58rem;
        width: 100%;
        background-color: #fff;
      }
      .selectSku5{
        height: 0.77rem;
        text-align: center;
        background-color: #ef4949;
        line-height: 0.77rem;
        color: #fff;
        font-size: 0.239rem;
      }
      .nobuy{
        background-color: #999999;
      }
    }
  }
</style>
