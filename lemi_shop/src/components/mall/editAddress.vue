<template>
  <div class="editAddress">
    <div class="editAddress_list">
      <ul>
        <li class="editAddress_item">
          <span>收货人&nbsp:</span><input type="text" ref="consignee">
        </li>
        <li class="editAddress_item">
          <span>联系方式&nbsp:</span><input type="text" ref="mobile">
        </li>
        <li class="editAddress_item" @click="choseAdd()">
          <span>所在地区&nbsp:</span><input type="text" ref="addressArea" disabled><span style="margin: 0"><i class="icon iconfont icon-dayuhao1"></i></span>
        </li>
        <li class="editAddress_item">
          <span>详细地址&nbsp:</span><input type="text" ref="street">
        </li>
      </ul>
    </div>
    <div class="editAddress_operation" v-if="!isDefault">
      <div class="editAddress_operation-text">
        <span>设为默认地址</span>
        <span>注&nbsp:&nbsp每次下单会默认使用此地址</span>
      </div>
      <div class="editAddress_operation-option">
        <mt-switch v-model="value"></mt-switch>
      </div>
    </div>
    <div class="editAddress_btn" @click="postAddress()">
      保存
    </div>
    <div class="editAddress_picker" v-if="0">
    </div>
    <section class="showChose" v-show="showChose">
      <section class="address">
        <section class="title">
          <h4>所在地区</h4>
          <span @click="closeAdd()"><i class="icon iconfont icon-guanbi"></i></span>
        </section>
        <section class="title">
          <div class="area" @click="provinceSelected()" :class="Province?'':'active'">{{Province?Province:'请选择'}}</div>
          <div class="area" @click="citySelected()" :class="City?'':'active'" v-show="Province">{{City?City:'请选择'}}</div>
          <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
        </section>
        <div class="wrap">
          <ul>
            <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
            <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
            <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          </ul>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import { Switch,Toast } from 'mint-ui';

    export default{
        data(){
          return{
            addressArr:{},
            value:false,
            isDefault:false,
            info:[],
            showChose: false,
            showProvince: true,
            showCity: false,
            showDistrict: false,
            showCityList: false,
            showDistrictList: false,
            province: 0,
            city: 0,
            district: 0,
            GetProvinceId: '',
            District: false,
            Province: false,
            City: false,
            // v-for循环判断是否为当前
            selected: false,
          }
        },
      created(){
        let that = this;
        this.noShare();
//        地区选择
        $.ajax({
          url: "@/../static/xml/ChinaArea.xml",
          dataType: 'xml',
          type: 'GET',
          timeout: 2000,
          error: function (xml) {
            Toast({
              message: "加载XML 文件出错！",
              position: 'middle',
              duration: 3000
            });
          },
          success: function (xml) {
            $(xml).find("province").each(function () {
              let oArea ={id:0,name:'',city:[]};
              oArea.id = $(this).attr('provinceID');
              oArea.name = $(this).attr('province');
              $(this).find("City").each(function () {
                let oCity = {id:0,name:'',district:[]};
                oCity.id = $(this).attr('CityID');
                oCity.name = $(this).attr('City');
                oArea.city.push(oCity);
                $(this).find("Piecearea").each(function () {
                  let oPiecearea = {id:0,name:''};
                  oPiecearea.id = $(this).attr('PieceareaID');
                  oPiecearea.name = $(this).attr('Piecearea');
                  if (oPiecearea.name == '市辖区')
                      return true;
                    oCity.district.push(oPiecearea);
                });
              });
              that.info.push(oArea);
            });

            that.$nextTick(function () {
              let href = window.location.href;
              if(href.indexOf('addressid') != -1){
                let url = '/shop-g1-user_get_address_list.html';
                that.getData('get',url).then(res => {
                  if(res.status == 200){
                    that.addressArr = res.data;
                    let Arr = that.addressArr.filter(function (i) {
                      if(i.address_id == that.$route.query.addressid)
                        return i;
                    });
                    that.$refs.consignee.value = Arr[0].consignee;
                    that.$refs.mobile.value = Arr[0].mobile;
                    that.$refs.addressArea.value = that.comAdress(Arr[0].province,Arr[0].city,Arr[0].district);
                    that.$refs.street.value = Arr[0].street;
                    that.isDefault = Arr[0].is_default;
                    that.district = Arr[0].district;
                    that.province = Arr[0].province;
                    that.city = Arr[0].city;
                  }
                });
              }
            });
          }
        });
        document.title = "收货地址";
      },
      watch:{
//          默认地址是否选中
        value:function (val,oldval) {
          this.value = val;
        }
      },
      methods:{
//          地区id转换地区名称
        comAdress(province,city,district){
          let address = {province:'',city:'',district:''};
          this.info.forEach(function (i) {
            if(i.id == province){
              address.province = i.name;
              i.city.forEach(function (j) {
                  if(j.id == city){
                    address.city = j.name;
                    j.district.forEach(function (k) {
                      if(k.id == district){
                        address.district = k.name;
                      }
                    });
                  }
              });
            }
          });
          return address.province + ' ' + address.city+ ' ' + address.district + ' ';
        },
//          显示地区选择
        choseAdd: function() {
          this.showChose = true;
        },
//        关闭地区选择
        closeAdd: function() {
          this.showChose = false;
        },
//        地区三级联动函数==========
        _filter(add,name,code) {
          let result = [];
          for(let i=0;i<add.length;i++) {
            if(code == add[i].id){
              result = add[i][name];
            }
          }
          return result;
        },
        getProvinceId: function(code,input,index) {
          this.province = code;
          this.Province = input;
          this.showProvince=false;
          this.showCity=true;
          this.showDistrict = false;
          this.showCityList = this._filter(this.info,'city',this.province);

          if(this.showCityList.length == 0){
            this.closeAddress();
          }
          // 点击选择当前
          this.info.map( a => a.selected = false );
          this.info[index].selected = true;
        },
        provinceSelected: function() {
          // 清除市级和区级列表
          this.showCityList = false;
          this.showDistrictList = false;
          // 清除市级和区级选项
          this.City = false;
          this.District = false;
          // 选项页面的切换
          this.showProvince = true;
          this.showCity = false;
          this.showDistrict = false;
          //重置省级
          this.Province = false;
        },
        getCityId: function(code, input, index) {
          this.city = code;
          this.City = input;
          this.showProvince=false;
          this.showCity=false;
          this.showDistrict = true;
          this.showDistrictList = this._filter(this.showCityList,'district',this.city);

          if(this.showDistrictList == undefined){
            this.closeAddress();
          }
          // 选择当前添加active
          this.showCityList.map( a => a.selected = false );
          this.showCityList[index].selected = true;
        },
        citySelected: function() {
          this.showProvince=false;
          this.showCity=true;
          this.showDistrict = false;
          //重置市级
          this.City = false;
        },
        getDistrictId: function(code, input, index) {
          this.district = code;
          this.District = input;
          // 选择当前添加active
          this.showDistrictList.map( a => a.selected = false );
          this.showDistrictList[index].selected = true;
          // 选取市区选项之后关闭弹层
          this.closeAddress();

        },
        districtSelected: function() {
          this.showProvince=false;
          this.showCity=false;
          this.showDistrict = true;
        },
        closeAddress(){
          this.showChose = false;
          let city = this.City? this.City:'';
          let district = this.District? this.District:'';
          this.$refs.addressArea.value = this.Province + ' ' + city+ ' ' + district;
          if(city == ''){
            this.city = 0;
          }
          if(district == ''){
            this.district = 0;
          }
        },
        //        ==================
//        提交地址修改
        postAddress(){
          let isdefault = this.isDefault ? Number(this.isDefault):Number(this.value);
          let consignee = this.$refs.consignee.value;
          let street = this.$refs.street.value;
          let mobile = this.$refs.mobile.value;

          if(consignee!= ''){
              if(mobile!=''){
                if(street!=''){
                    if(this.$refs.addressArea.value != ''){
                      let href = window.location.href;
                      if(href.indexOf('addressid') != -1){
                        this.postData('post','/shop-g1-user_edit_address.html',{address_id:this.$route.query.addressid,consignee:consignee,province:this.province,city:this.city,district:this.district,street:street,mobile:mobile,is_default:isdefault}).then(res => {
                          if(res.status == 200){
                            if(res.data.status == 1){
                              Toast({
                                message: '修改地址成功',
                                position: 'middle',
                                duration: 2000
                              });
                              let that = this;
                              setTimeout(function () {
                                if(window.location.href.indexOf('goods_id') != -1){
                                  that.$router.push({path:'/chooseAddress',query:{goods_id:that.$route.query.goods_id}});
                                }else{
//                                  that.$router.push({path:'/chooseAddress'});
                                  that.$router.replace({path:'/shopAddress'});
                                }
                              },1000);
                            }else{
                              Toast({
                                message: res.data.msg,
                                position: 'middle',
                                duration: 2000
                              });
                            }
                          }
                        });
                      }else{
                        //          新增
                        this.postData('post','/shop-g1-user_add_address.html',{consignee:consignee,province:this.province,city:this.city,district:this.district,street:street,mobile:mobile,is_default:isdefault}).then(res => {
                          if(res.status == 200){
                            if(res.data.status == 1){
                              Toast({
                                message: '新增地址成功',
                                position: 'middle',
                                duration: 2000
                              });
                              let that = this;
                              setTimeout(function () {
                                if(window.location.href.indexOf('goods_id') != -1){
                                  that.$router.push({path:'/chooseAddress',query:{goods_id:that.$route.query.goods_id}});
                                }else{
                                  that.$router.replace({path:'/shopAddress'});
//                                  that.$router.push({path:'/shopAddress'});
//                                  that.$router.push({path:'/chooseAddress'});
                                }
                              },1000);
                            }else{
                              Toast({
                                message: res.data.msg,
                                position: 'middle',
                                duration: 2000
                              });
                            }
                          }
                        });
                      }
                    }else{
                      Toast({
                        message: "请输入您的所在地区",
                        position: 'middle',
                        duration: 3000
                      });
                    }
                }else{
                  Toast({
                    message: "请输入您的详细地址",
                    position: 'middle',
                    duration: 3000
                  });
                }
              }else{
                Toast({
                  message: "请输入您的联系方式",
                  position: 'middle',
                  duration: 3000
                });
              }
          }else{
            Toast({
              message: "请输入您的姓名",
              position: 'middle',
              duration: 3000
            });
          }
        },
      }
    }
</script>

<style lang="less">
  .editAddress{
    height: 100vh;
    font-size: 0.24rem;
    background-color: #f9f9f9;
    &_list{
      background-color: #ffffff;
      padding: 0 0.2rem;
    }
    &_item{
      display: flex;
      line-height: 0.8rem;
      font-size: 0.26rem;
      color: #333333;
      border-bottom: 0.02rem solid #eeeeee;

      &:last-of-type{
        border-bottom:0;
      }
      span{
        margin-right: 0.25rem;
      }
      input{
        flex: 1;
        font-size: 0.26rem;
        color: #333333;
        border:none;
        resize : none;
        &:focus{
          outline: none;
        }
        &:disabled{
          background-color:#ffffff;
        }
      }
      .icon-dayuhao1{
        color: #cccccc;
        font-size: 0.35rem;
      }
    }
    &_operation{
      display: table;
      width: 100%;
      height: 1.25rem;
      margin-top: 0.2rem;
      background-color: #ffffff;
      &-text{
        display: table-cell;
        vertical-align: middle;
        padding-left: 0.2rem;
        span{
          display: block;
          font-size:0.24rem;
          color: #cccccc;
          &:first-of-type{
            margin-bottom: 0.2rem;
            font-size:0.26rem;
            color: #333333;
          }
        }
      }
      &-option{
        display: table-cell;
        width: 0.7rem;
        vertical-align: middle;
        padding-right: 0.2rem;

      }
    }
    &_btn{
      position: fixed;
      left: 0;
      bottom:0;
      width: 100%;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.3rem;
      color: #ffffff;
      background-color: #ef4949;
    }
    &_picker{
      &-head{
        text-align: center;
        font-size: 0.26rem;
        color: #999999;
      }
    }
    .showChose{
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.51);
      .address{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50%;
        background-color: #ffffff;
        .title{
          display: flex;
          .icon-guanbi{
            font-size: 0.3rem;
          }
          &:first-of-type{
            padding: 0.3rem 0.2rem 0;
            font-size: 0.26rem;
            color: #999999;
            h4{
              flex: 1;
              text-align: center;
            }
          }
          &:nth-of-type(2){
            font-size: 0.24rem;
            color: #333333;
            border-bottom: 0.02rem solid #eeeeee;
            .area{
              line-height: 0.65rem;
              padding: 0 0.15rem;
            }
            .active{
              border-bottom: 0.02rem solid #ef4949;
            }
          }
        }
        .wrap{
          height: 80%;
          overflow-y: scroll;
          ul{
            padding-left:0.2rem;
            padding-bottom: 10%;
            .addList{
              font-size: 0.24rem;
              color: #333333;
              margin-top: 0.3rem;
            }
          }
        }
      }
    }


  }
</style>
