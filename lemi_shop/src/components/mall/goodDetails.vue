<template>
	<div class="goodDetails" :class="selectSkuis?'goodHidden':''">
		<div v-if="!nogoods">
		<div class="lunbo">
			<ul class="ul1">
				<li>
					<div class="goBack" v-if="false">
						<i class="icon iconfont icon-zuola"></i>
					</div>
				</li>
				<li>
					<div class="more" @click="more()">
						<span>...</span>
					</div>
				</li>
			</ul>
			<div class="moreTable">
				<div class="san"></div>
				<table class="table1">
					<tr @click="toHome()">
						<td><i class="icon iconfont icon-shouye1"></i></td>
						<td style="border-bottom:1px solid #eee;">首页</td>
					</tr>
          <tr @click="toshopcart()">
            <td><i class="icon iconfont icon-gouwuche"></i></td>
            <td style="border-bottom:1px solid #eee;">购物车</td>
          </tr>
					<tr @click="toMine()">
						<td><i class="icon iconfont icon-wode1"></i></td>
						<td>订单中心</td>
					</tr>
				</table>
			</div>
			<mt-swipe :auto="0" style="z-index: 2">
				<mt-swipe-item v-if="list.video != null">
			  	<video x5-playsinline="" playsinline="" webkit-playsinline="" ref="headVideo" style="width: 100%;height: 6.4rem;" :poster="list.pic" :src="list.video" controls="controls"></video>
			  	<!-- <video style="width: 100%;height: 6.4rem;"  src="http://www.w3school.com.cn/i/movie.ogg"  controls="" x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto"></video> -->
          <!--<img style="position:absolute;left:0;top: 0;width: 100%;height: 6.4rem;" :src="list.pic" v-if="pauseIs"  @click="videoPlay()">-->
			  </mt-swipe-item>
			  <mt-swipe-item v-for="(item,index) in arr" :key="index">
			  	<img style="width:100%;height:6.4rem;" :src="item" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;">
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="info">
			<div class="title1">
				{{list.goods_name}}
			</div>
			<div class="desc1">
				{{list.goods_intro}}
			</div>
			<div class="real1">
				<span class="lastPrice" v-if="list.promotion_type == 0 || ifSalse == false"><span><span style="font-size:0.222rem;">&yen;</span> <span class="lastPrice1">{{list.shop_price}}</span></span></span>
				<span class="lastPrice" v-if="list.promotion_type == 1 && ifSalse == true"><span><span style="font-size:0.222rem;">&yen;</span> <span class="lastPrice1">{{list.sale_price*list.shop_price}}</span></span></span>
				<span class="promotions" v-if="list.promotion_type == 1 && list.sale_msg != '' && ifSalse == true">{{list.sale_msg}}</span>
			</div>
			<div class="normalPrice">
				<span>原价：</span>
				<span>&yen;<span>{{list.market_price}}</span></span>
			</div>
		</div>
		<div class="sku" @click="skuPage()" v-if="saleIs">
			<span class="left1">{{firstName}}</span>
			<span class="right1"><i class="icon iconfont icon-next-page"></i></span>
		</div>
		<div class="address" @click="addressPage()" v-if="saleIs">
			<span class="xuanze1">...</span>
			<div class="address1">
				<span style="color:#666;">送至</span>
				<span><i class="icon iconfont icon-location"></i></span>
				<span class="name1">{{dizhi | ifNan}}</span>
			</div>
			<div class="costs1">
				<span style="color:#666;">运费</span>
				<span>{{yunfei == 0? '包邮':yunfei}}</span>
			</div>
		</div>
		<div class="details">
			<mt-navbar v-model="selected1">
			  <mt-tab-item id="1">商品介绍</mt-tab-item>
			  <mt-tab-item id="2">售后保障</mt-tab-item>
			  <mt-tab-item id="3">评价</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected1">
			  <mt-tab-container-item id="1">
			    <div v-html="list.goods_desc" style="position: relative;z-index: 0;">
			    	{{list.goods_desc}}
			    </div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="2">
			  	<div v-html="list.customer_service" style="position: relative;z-index: 0;">
			    	{{list.customer_service}}
			    </div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="3">
			    <div class="comment1">
			    	<div class="commentList" v-for="i in commentLists">
			    		<div class="listTop">
			    			<div class="tou1">
                  <img :src="i.face" onerror="this.src=&quot;/static/img/onerr3.jpg&quot;" v-if="!i.is_anonymous">
                  <img src="../../../static/img/onerr3.jpg" v-if="i.is_anonymous">
			    			</div>
			    			<div class="name2">
			    				<div v-if="!i.is_anonymous">{{i.nickname}}</div>
                  <div v-if="i.is_anonymous" style="color: #999">匿名用户</div>
                  <div style="position: relative;top: -0.08rem;">
			    					<i class="icon iconfont icon-start" style="position: relative;left: -0.08rem;" ></i>
			    					<i class="icon iconfont " style="position: relative;left: -0.28rem;" :class="i.star_count > 1? 'icon-start':'icon-xingxing_kongxin'"></i>
			    					<i class="icon iconfont " style="position: relative;left: -0.48rem;" :class="i.star_count > 2? 'icon-start':'icon-xingxing_kongxin'"></i>
			    					<i class="icon iconfont " style="position: relative;left: -0.68rem;" :class="i.star_count > 3? 'icon-start':'icon-xingxing_kongxin'"></i>
			    					<i class="icon iconfont " style="position: relative;left: -0.88rem;" :class="i.star_count > 4? 'icon-start':'icon-xingxing_kongxin'"></i>
			    				</div>
			    			</div>
			    			<div class="time1">
			    				{{i.comment_time}}
			    			</div>
			    		</div>
			    		<div class="listBottom">
			    			<div class="neirong1">
			    				<div class="discuss">
			    					{{i.content}}
			    				</div>
			    				<div class="commentPic">
			    					<ul  :class="i.imgLst.length >4? 'ul2':'ul3'">
			    						<li v-for="(j,index) in i.imgLst">
			    							<div class="img1" :style="{'background-image':'url('+j+')','background-size':'cover'}" @click="showImg(i.imgLst,index)"></div>
			    						</li>
			    					</ul>
			    				</div>
                  <div class="commentType">
                    {{i.sku_name}}
                  </div>
                  <div class="commentTime">
                    {{i.buy_time}}
                  </div>
                  <!--商家回复-->
                  <!--<div class="comment_replay"></div>-->
			    			</div>
			    		</div>

			    	</div>
            <div class="commentNull" v-if="commentLists.length==0" style="text-align: center;padding: 0.5rem 0;color: #999999">
              <i class="icon iconfont icon-empty" style="font-size: 1.8rem"></i>
              <p style="font-size: 0.3rem">暂无评论</p>
            </div>
			    </div>
			  </mt-tab-container-item>
			</mt-tab-container>
		</div>
		<div style="height:0.768rem;"></div>
		<div class="caozuo">
			<ul class="ul7" v-if="saleIs">
				<li @click="addshopcart()">
					<i class="icon iconfont icon-gouwuche"></i>
					<span>加入购物车</span>
				</li>
				<li @click="buy()" :class="btnIs?'redbtn':'blockbtn'">
					立即购买
				</li>
			</ul>
      <ul class="ul7" v-if="!saleIs">
        <li style="width: 100%;background-color: #999999">
          <!--<i class="icon iconfont icon-gouwuche"></i>-->
          <span style="color: #666;top: 0;font-size: 0.28rem">已下架</span>
        </li>
      </ul>
      <transition name="backTop-move">
        <div class="backTop" @click="toTop()" v-if="topIs">
          <div class="articles_backTop-icon">
            <i class="icon iconfont icon-shangla"></i>
          </div>
          Top
        </div>
      </transition>
		</div>
		<!-- 选择规格 -->
		<div class="selectSku">
      <div class="selectSkuback" @click="closeSku()"></div>
			<div class="selectSku1">
				<ul class="ul4">
					<li>
						<div style="position:relative;top:-0.5rem;padding:0.1rem;background-color:#fff;margin-left: 0.17rem;margin-right: 0.17rem;">
							<img class="img2" :src="arr" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;">
						</div>
					</li>
					<li>
						<div class="xintable">
							<div>
								<div>&yen; <span>{{thisPrice}}</span><span style="text-decoration: line-through;color: #999;margin-left:0.17rem;">&yen;{{list.market_price}}</span></div>
								<div>商家编码：{{thisCode}}</div>
							</div>
						</div>
					</li>
					<li style="float:right" @click="closeSku()">
						<i class="icon iconfont icon-guanbi1"></i>
					</li>
				</ul>
			</div>
      <div class="selectCon">
        <div class="selectSku2" v-for="item in arr2">
          <div class="skuTitle" style="margin-bottom:0.17rem;margin-top:0.17rem;" :data-id="item.spec_info.spec_id">
            {{item.spec_info.spec_name}}
          </div>
          <div>
            <!-- 选中添加属性sku1 -->
            <!--<span v-for="item2 in item.spec_value_array" v-if="item2">-->
            <!--{{item2}}-->
            <!--</span>-->
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
                <span class="num1" :data-all="allnum">1</span>
                <span class="jia" @click="jia()">+</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="selectSku4">
        </div>
      </div>

			<!-- <div class="selectSku5 nobuy" @click="buy()">
				立即购买
			</div> -->
		</div>
		<!-- 收货地址 -->
		<div class="addressList">
      <div class="addressBack" @click="closeAddress1()"></div>
      <div class="addressWrap">
        <div class="addressTitle">
          配送至
          <i class="icon iconfont icon-guanbi" @click="closeAddress1()"></i>
        </div>
        <div class="addressList1" :class="{'selectAddress':item.is_default==1?true:false}" @click="selectAddress(item.address_id,$event,item)" v-for="item in addressLists">
          <ul class="ul6">
            <li>
              <i class="icon iconfont icon-location_fill"></i>
            </li>
            <li>
              <span>{{item.province}}{{item.city}}{{item.district}}{{item.street}}</span>
            </li>
            <li>
              <i class="icon iconfont icon-gou" :class="{'selectAddress':item.is_default==1?true:false}"></i>
            </li>
          </ul>
        </div>
        <div class="getOther" @click="getOther()">
          选择其他收货地址
        </div>
      </div>

		</div>
		<section class="showChose" v-show="showChose">
	      <section class="address" style="padding:0">
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
	    <transition name="works">
	      <div class="customAdv_big" v-if="imgShow">
	          <span class="customAdv_close" @click="closeImg()">
	            <i class="icon iconfont icon-guanbi"></i>
	          </span>
	        <mt-swipe :auto="0" :defaultIndex="defaultIndex">
	          <mt-swipe-item  v-for="(item,index) in bigImg" :key="index">
	            <div style="display: table;width:100%;height: 100%;">
	              <div style="display: table-cell;width:100%;vertical-align: middle;height: 100%;">
	                <img  class="customAdv_bigimg" :src="item" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" >
	              </div>
	            </div>
	          </mt-swipe-item>
	        </mt-swipe>
	      </div>
	    </transition>
	    </div>
	    <div v-if="nogoods">
	    	<div class="commentNull" style="text-align: center;padding: 2rem 0;color: #999999">
	            <i class="icon iconfont icon-cry" style="font-size: 1.8rem"></i>
	            <p style="font-size: 0.3rem">当前商品不存在</p>
	          </div>
	    </div>
	</div>
</template>
<script>
	import { Swipe, SwipeItem,Navbar, TabItem,Toast,Switch,Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				addressArr:{},
				info:[],
            	info2:[],
				arr:[],
				selected1:'1',
				list:[],
				arr2:[],
				ifSalse:false,
				ifBuy:false,
				skuValue:'',
				allnum:0,
				thisPrice:'--',
				thisCode:'--',
				addressLists:[],
				dizhi:'请选择地址',
				yunfei:'请选择地址',
				address_id:'',
				skuStr:'',
				skuId:'',
				skuName:'',
				consignee:'',
				mobile:'',
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
	            street:'',
	            // v-for循环判断是否为当前
	            selected: false,
	            market_price:'',
	            commentLists:[],
	            ifcomment:true,
        imgShow:false,
        bigImg:[],
        defaultIndex:0,
        buyNum:1,
        firstName:'选择 ',
        btnIs:true,
        skuIs:true,
        saleIs:true,
        topIs:false,
        osTop:0,
        winH:0,
        pauseIs:false,
        selectSkuis:false,
        nogoods:false,
			}
		},
		created(){
			this.global.shouquan();
			var self = this;
			if(this.$route.query.shop_id == undefined){
				var shopId = 0;
			}else{
				var shopId = this.$route.query.shop_id;
			}
			this.postData('post','/shop-g1-goods_show.html',{goods_id:this.$route.query.goods_id,shop_id:shopId}).then(res => {
        if(res.status == 200){
//          console.log(res.data.length);
          if(res.data.status == 1){
          	this.nogoods = false;
              if(res.data.data.is_on_sale == 0){
                this.saleIs = false;
                this.skuIs = false;
                Toast({
                  message: "商品已下架",
                  position: 'middle',
                  duration: 2000
                });
              }

            this.list = res.data.data;
                this.thisCode = res.data.data.code;
//            console.log(this.thisCode);
                this.arr = [res.data.data.pic];
                this.arr2 = res.data.data.sku.spec_list ? res.data.data.sku.spec_list:[];
//            console.log(this.arr2[0].spec_value_array[0].spec_value_id);
//				let firstName = '选择 ';
                this.arr2.forEach((i)=>{
                  this.firstName = this.firstName +' '+ i.spec_info.spec_name;
                });
                if(!this.arr2.length){
                  this.firstName = '选择购买数量';
                  this.skuIs = false;
                }

                document.title =this.list.goods_name;
                if(res.data.data.promotion_type == 1){
                  var now = new Date().getTime();
                  now = (now/1000).toFixed(0)
                  if(parseInt(res.data.data.sale_start_time)<parseInt(now) && parseInt(now)<parseInt(res.data.data.sale_end_time)){
                    this.ifSalse = true;
                    this.thisPrice = res.data.data.sale_price*res.data.data.shop_price;
                    this.thisPrice = this.thisPrice.toFixed(2);
                  }else{
                    this.thisPrice = res.data.data.shop_price;
                  }
                }else{
                  this.thisPrice = res.data.data.shop_price;
                }
                this.getData('get','/shop-g1-user_get_default_address.html').then(res => {
                  $.ajax({
                    type:'get',
                    url:'../../../static/xml/ChinaArea.xml',
                    dataType: 'xml',
                    success:function(xml){
                      for(let i=0;i<$(xml).find('province').length;i++){
                        if(res.data.province == $(xml).find('province').eq(i).attr('provinceID')){
                          res.data.province = $(xml).find('province').eq(i).attr('province');
                          var a = $(xml).find('province').eq(i).find('City');
                          for(let y=0;y<a.length;y++){
                            if(res.data.city == a.eq(y).attr('CityID')){
                              res.data.city = a.eq(y).attr('City');
                              var piecearea = a.eq(y).find('Piecearea');
                              for(let q=0;q<piecearea.length;q++){
                                if(res.data.district == piecearea.eq(q).attr('PieceareaID')){
                                  res.data.district = piecearea.eq(q).attr('Piecearea');
                                }
                              }
                            }
                          }
                        }
                      }
                      self.dizhi = res.data.province+res.data.city+res.data.district+res.data.street;
                      $('.name1').eq(0).attr('data-id',res.data.address_id);
                      $('.name1').eq(0).attr('data-type','2');
                      self.address_id = res.data.address_id;
                      self.consignee = res.data.consignee;
                      self.mobile = res.data.mobile;
                      self.postData('post','/shop-g1-goods_get_freight.html',{'mould_id':self.list.mould_id,'search_data':$('.name1').eq(0).attr('data-id'),'search_type':$('.name1').eq(0).attr('data-type'),'buy_num':$('.num1').eq(0).text()}).then(res => {
                        if(res.data.length == 0){
                          self.yunfei = '0'
                        }else{
                          self.yunfei = res.data.freight;
                        }
                      });
                      self.City = res.data.city;
                      self.District = res.data.district;
                      self.Province = res.data.province;
                      self.street = res.data.street;
                    }
                  });
                })

              this.share(this.list.goods_name,this.list.goods_intro,this.list.pic);
          }else{
          	this.nogoods = true;
            // Toast({
            //   message: "商品不存在",
            //   position: 'middle',
            //   duration: 2000
            // });
            // this.$nextTick(function () {
            //   this.$router.back();
            // });
          }
        }

			});
//			加载地址列表
			this.getData('get','/shop-g1-user_get_address_list.html').then(res => {
				var self = this;
				let that = this;
				this.addressLists = res.data;
//				匹配地址所在地区
				$.ajax({
					type:'get',
					url:'../../../static/xml/ChinaArea.xml',
					dataType: 'xml',
					error: function (xml) {
			            Toast({
			              message: "加载XML 文件出错！",
			              position: 'middle',
			              duration: 2000
			            });
			          },
					success:function(xml){
						for(let x=0;x<res.data.length;x++){
							for(let i=0;i<$(xml).find('province').length;i++){
								if(res.data[x].province == $(xml).find('province').eq(i).attr('provinceID')){
									res.data[x].province = $(xml).find('province').eq(i).attr('province');
									var a = $(xml).find('province').eq(i).find('City');
									for(let y=0;y<a.length;y++){
										if(res.data[x].city == a.eq(y).attr('CityID')){
											res.data[x].city = a.eq(y).attr('City');
											var piecearea = a.eq(y).find('Piecearea');
											for(let q=0;q<piecearea.length;q++){
												if(res.data[x].district == piecearea.eq(q).attr('PieceareaID')){
													res.data[x].district = piecearea.eq(q).attr('Piecearea');
												}
											}
										}
									}
								}
							}
						}
			            self.addressLists = res.data;
			            console.log(self.addressLists)
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
						// self.dizhi = res.data[0].province+res.data[0].city+res.data[0].district+res.data[0].street;
					}
				})
			});
      this.winH = $(window).height();
    },
		mounted(){
			let that = this;
//			加载地区XML文件
	        // $.ajax({
	        //   url: "../../../static/xml/ChinaArea.xml",
	        //   dataType: 'xml',
	        //   type: 'GET',
	        //   timeout: 2000,
	        //   error: function (xml) {
	        //     Toast({
	        //       message: "加载XML 文件出错！",
	        //       position: 'middle',
	        //       duration: 3000
	        //     });
	        //   },
	        //   success: function (xml) {
         //      $(xml).find("province").each(function () {
         //        let oArea ={id:0,name:'',city:[]};
         //        oArea.id = $(this).attr('provinceID');
         //        oArea.name = $(this).attr('province');
         //        $(this).find("City").each(function () {
         //          let oCity = {id:0,name:'',district:[]};
         //          oCity.id = $(this).attr('CityID');
         //          oCity.name = $(this).attr('City');
         //          oArea.city.push(oCity);
         //          $(this).find("Piecearea").each(function () {
         //            let oPiecearea = {id:0,name:''};
         //            oPiecearea.id = $(this).attr('PieceareaID');
         //            oPiecearea.name = $(this).attr('Piecearea');
         //            if (oPiecearea.name == '市辖区')
         //              return true;
         //            oCity.district.push(oPiecearea);
         //          });
         //        });
         //        that.info.push(oArea);
         //      });
	        //   }
	        // });
      window.addEventListener('scroll', this.scrollTop);
		},
		methods:{
//		=======收货地址地区选择函数=========
			getOther(){
				this.showChose = true;
			},
			getProvinceId: function(code,input,index) {
	          this.province = code;
	          this.Province = input;
	          this.showProvince=false;
	          this.showCity=true;
	          this.showDistrict = false;
	          this.showCityList = this._filter(this.info,'city',this.province);

	          if(this.showCityList.length == 0){
	              this.City = false;
              this.District = false;
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
	        districtSelected: function(){
	          this.showProvince=false;
	          this.showCity=false;
	          this.showDistrict = true;
	        },
	        _filter(add,name,code) {
	          let result = [];
	          for(let i=0;i<add.length;i++) {
	            if(code == add[i].id){
	              result = add[i][name];
	            }
	          }
	          return result;
	        },
	        closeAdd: function() {
            this.showChose = false;
	        },
            // 获取运费
	        closeAddress(){
	        	console.log(this)
	        	this.address_id = this.province;
				this.postData('post','/shop-g1-goods_get_freight.html',{'mould_id':this.list.mould_id,'search_data':this.province,'buy_num':$('.num1').eq(0).text(),'search_type':1}).then(res => {
					if(res.data.length == 0){
						this.yunfei = '0'
					}else{
						this.yunfei = res.data.freight;
					}
				});
				this.showChose = false;
				$('.name1').eq(0).attr('data-type','1');
				$('.addressList').eq(0).css('bottom','-100%');
				let city = this.City? this.City:'';
				let district = this.District? this.District:'';
				this.dizhi = this.Province + ' ' + city+ ' ' + district;
				if(city == ''){
				this.city = 0;
				}
				if(district == ''){
				this.district = 0;
				}
				// "address_id":this.address_id,
				// 			"consignee":this.consignee,
				// 			"province":this.Province,
				// 			"city":this.City,
				// 			"district":this.District,
				// 			"street":this.street,
				// 			"zipcode":"",
				// 			"mobile":this.mobile,
				// this.address_id = ;
				// this.consignee = ;
	        },
//      ============================
//      添加购物车
			addshopcart(){
        if(this.list.sku.spec_list && this.list.sku.spec_list.length != 0){
					var data = {
						g_id:this.$route.query.goods_id,
						sku_id:this.skuId,
						goods_num:$('.num1').eq(0).text()
						// g_name:this.list.goods_name,
						// shop_price:this.thisPrice,
						// sku_name:this.skuName,
					}
				}else{
					var data = {
						g_id:this.$route.query.goods_id,
						goods_num:$('.num1').eq(0).text()
						// g_name:this.list.goods_name,
						// shop_price:this.thisPrice,
						// sku_name:this.skuName,
					}
				}
				if(data.sku_id == '' && this.list.sku.spec_list.length != 0){
					Toast({
					  message: '请选择规格',
					  iconClass: 'icon iconfont icon-tishi',
					  duration: 1000
					});
				}else{
					this.postData('post','/shop-g1-cart_add_cart.html',data).then(res => {
						if(res.data.status == 1){
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-check',
							  duration: 1000
							});
						}else if(res.data.status == 0){
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-tishi',
							  duration: 1000
							});
						}
					})
				}
			},
//      商品数量加减
			jian(){
        if(this.allnum != 0 && $('.num1').eq(0).text() > 1){
					var num = Number($('.num1').eq(0).text()) - Number(1);
					$('.num1').eq(0).text(num);
				}
			},
			jia(){
        if( (this.list.goods_number > 0) && (this.allnum != 0 && $('.num1').eq(0).text() < this.allnum)){
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
//      选中商品类型sku
			selectSku1(id,e){
				$('.num1').eq(0).text('1');
				$(e.target).closest('.selectSku2').find('span').removeClass('sku1');
				$(e.target).addClass('sku1');
				var geshu = 0;
				var str = '';
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
				for(let x=0;x<this.list.sku.sku_lst.length;x++){
					if(str == this.list.sku.sku_lst[x].attr_value_items){
						if(this.list.promotion_type == 1 && this.ifSalse == true){
							this.thisPrice = this.list.sku.sku_lst[x].shop_price*this.list.sale_price;
							this.thisPrice = this.thisPrice.toFixed(2);
						}else{
							this.thisPrice = this.list.sku.sku_lst[x].shop_price;
						}
//						this.thisCode = this.list.sku.sku_lst[x].code;
						this.allnum = this.list.sku.sku_lst[x].goods_number;
            this.skuId = this.list.sku.sku_lst[x].sku_id;
						this.skuName = this.list.sku.sku_lst[x].sku_name;
						this.market_price = this.list.sku.sku_lst[x].market_price;
						if(this.list.sku.sku_lst[x].goods_number != 0){
							if(geshu == $('.selectSku2').length){
								$('.selectSku5').eq(0).removeClass('nobuy');
							}
							$('.left1').eq(0).text(this.skuName);
              this.btnIs = true;
						}else{
							$('.left1').eq(0).text(this.skuName);
              this.btnIs = false;
							Toast({
							  message: '暂无库存',
							  iconClass: 'icon iconfont icon-kulian',
							  duration: 1000
							});
						}
					}
				}
			},
//      关闭商品类型选择
			closeSku(){
        $('.selectSku').eq(0).animate({'left':'-100%'});
        this.selectSkuis = false;
        this.buyNum = $('.num1').eq(0).text();
        if(this.address_id != ''){
          this.postData('post','/shop-g1-goods_get_freight.html',{'mould_id':this.list.mould_id,'search_data':this.address_id,'search_type':$('.name1').eq(0).attr('data-type'),'buy_num':$('.num1').eq(0).text()}).then(res => {
            if(res.data.length == 0){
              this.yunfei = '0'
            }else{
              this.yunfei = res.data.freight;
            }
          })
        }
			},
//      关闭地址
			closeAddress1(){
        $('.addressList .addressBack').animate({'opacity':'0'},100);
        this.$nextTick(function () {
          $('.addressList').eq(0).animate({'bottom':'-100%'});
        })
			},
//      选中地址列表项
			selectAddress(id,e,item){
				this.address_id = id;
				$('.addressList1').removeClass('selectAddress');
				$('.addressList1').find('i').removeClass('selectAddress');
				$(e.target).closest('.addressList1').addClass('selectAddress');
				$(e.target).closest('.addressList1').find('.icon-gou').addClass('selectAddress');
				this.postData('post','/shop-g1-goods_get_freight.html',{'mould_id':this.list.mould_id,'search_data':id,'search_type':2,'buy_num':$('.num1').eq(0).text()}).then(res => {
					this.dizhi = $(e.target).closest('.addressList1').find('li').eq(1).find('span').eq(0).text();
					if(res.data.length == 0){
						this.yunfei = '0'
					}else{
						this.yunfei = res.data.freight;
					}
				});
				$('.name1').eq(0).attr('data-type','2');

		        $('.addressList .addressBack').animate({'opacity':'0'});
		        this.$nextTick(function () {
		          $('.addressList').eq(0).animate({'bottom':'-100%'});
		        })
				this.address_id = item.address_id;
				this.consignee = item.consignee;
				this.City = item.city;
				this.District = item.district;
				this.street = item.street;
				this.zipcode = item.zipcode;
				this.mobile = item.mobile;
			},
//      显示商品类型选择
			skuPage(){
        $('.selectSku').eq(0).animate({'left':'0'});
        this.selectSkuis = true;

        let skuList = this.list.sku.sku_lst?this.list.sku.sku_lst:[];
        if(!skuList.length){
          this.allnum = this.list.goods_number;
        }else{
          this.$nextTick(function () {
//                编辑默认选择第一个
            let name = $('.left1').eq(0).text();
            if(name == this.firstName){
              for(let i = 0;i< this.arr2.length;i++){
                $('.selectSku2:eq('+i+') .sku2:eq(0)').trigger('click');
              }
            }else{
              let nameArr = name.split('_');
              for(let i = 0;i< this.arr2.length;i++){
                this.arr2[i].spec_value_array.forEach((j,index)=>{
                  if(j.spec_value_name == nameArr[i]){
                    $('.selectSku2:eq('+i+') .sku2:eq('+index+')').trigger('click');
                  }
                });
              }
            }
            $('.num1').eq(0).text(this.buyNum);
          })
        }
      },
//      收货地址列表显示
			addressPage(){
        $('.addressList').eq(0).animate({'bottom':'0'});
				this.$nextTick(function () {
          $('.addressList .addressBack').animate({'opacity':'1'},1500);
        })
      },
//      点击更多事件
			more(){
				if($('.moreTable').eq(0).css('display') == 'none'){
					$('.moreTable').eq(0).css('display','block')
				}else{
					$('.moreTable').eq(0).css('display','none')
				}
			},
      //    跳转首页
			toHome(){
		        this.postData('post','/shop-v1-index_get_root.html').then(res => {
		          let id = '';
		          if(res.data.rootId && res.data.rootId != ''){
		            id = res.data.rootId;
		          }
		          this.$router.push({path:'/mallHome',query:{type_id:this.$route.query.type_id,root_id:id}});
		        })
			},
      //    跳转订单中心
			toMine(){
        this.postData('post','/shop-v1-index_get_root.html').then(res => {
          let id = '';
          if(res.data.rootId && res.data.rootId != ''){
            id = res.data.rootId;
          }
          this.$router.push({path:'/orderCenter',query:{type_id:this.$route.query.type_id,root_id:id}});
        })
			},
      //    跳转购物车
      toshopcart(){
        this.postData('post','/shop-v1-index_get_root.html').then(res => {
            let id = '';
          if(res.data.rootId && res.data.rootId != ''){
            id = res.data.rootId;
          }
          this.$router.push({path:'/shopCart',query:{type_id:this.$route.query.type_id,root_id:id}});
        })

      },
//      购买商品
			buy(){
				var self = this;
		        this.buyNum = $('.num1').eq(0).text();
		        if(this.address_id != ''){
		          this.postData('post','/shop-g1-goods_get_freight.html',{'mould_id':this.list.mould_id,'search_data':this.address_id,'search_type':$('.name1').eq(0).attr('data-type'),'buy_num':$('.num1').eq(0).text()}).then(res => {
		            if(res.data.length == 0){
		              this.yunfei = '0'
		            }else{
		              this.yunfei = res.data.freight;
		            }
	        		if( this.arr2.length && $('.num1').eq(0).attr('data-all') == 0){
					 	Toast({
					 	  message: '请选择规格',
					 	  iconClass: 'icon iconfont icon-tishi',
					 	  duration: 1000
					 	});
					 	return false;
					 }
	        		if(this.arr2.length && this.skuStr == ''){
					 	Toast({
					 	  message: '请选择规格',
					 	  iconClass: 'icon iconfont icon-tishi',
					 	  duration: 1000
					 	})
					}else{
						var name = this.list.goods_name;
						var price = $('.lastPrice1').eq(0).text();
						var length = $('.sku1').length;
						var sku = '';
						for(let i=0;i<length;i++){
							sku = sku+','+$('.sku1').eq(i).text()
						}
						sku = sku.substr(1);
						var num = $('.num1').eq(0).text();
						var address = $('.name1').eq(0).text();
						var pic = this.list.pic;
						var yunfei = this.yunfei;
						var address_id = this.address_id;
						var data = {
							"goods_lst":[{
								"goods_id":this.$route.query.goods_id,
								"goods_name":name,
								"goods_pic":pic,
								"sku_name":this.skuName,
								"sku_id":this.skuId,
								"shop_price":this.thisPrice,
								"market_price":this.market_price,
								"goods_num":num,
								"sku_id":this.skuId,
							}],
							"consignee_address":{
	              			"mould_id":this.list.mould_id,
							"address_id":this.address_id,
							"consignee":this.consignee,
							"province":this.Province,
							"city":this.City,
							"district":this.District,
							"street":this.street,
							"zipcode":"",
							"mobile":this.mobile,
							},
							"yunfei":yunfei,
						}
						if($('.name1').eq(0).attr('data-type') == 1){
							data.consignee_address = {
	              			"mould_id":"",
							"address_id":"",
							"consignee":"",
							"province":"",
							"city":"",
							"district":"",
							"street":"",
							"zipcode":"",
							"mobile":"",
							};
						}
						window.localStorage.setItem('select',JSON.stringify(data));
						this.$router.push({path:'/confirmOrder',query:{'goods_id':this.$route.query.goods_id,type_id:this.$route.query.type_id}});
					}
		          })
		        }
			},
//      显示评论大图
      showImg(imgArr,index){
        this.bigImg = imgArr;
        this.defaultIndex = index;
        this.imgShow = true;
      },
//      关闭评论大图
      closeImg(){
        this.imgShow = false;
      },
//      回到顶部
      toTop(){
        this.toScroll(0);
        this.topIs = false;
      },
      toScroll(offset){
        clearInterval(timer);
        let footTop = offset;
        let firstTop = document.documentElement.scrollTop || document.body.scrollTop;

        var timer = setInterval(function(){
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let speed =footTop > firstTop?Math.floor( (osTop-footTop) / 4): Math.ceil( (osTop-footTop) / 4);
          document.documentElement.scrollTop = document.body.scrollTop = osTop - speed;
          if(footTop > firstTop){
            if(osTop >= footTop){
              clearInterval(timer);
            }
          }else{
            if(osTop <= footTop){
              clearInterval(timer);
            }
          }

        },30);
      },
      scrollTop(){
        this.osTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.topIs = this.osTop > this.winH ? true : false;
      },
//      videoPause(){
//        console.log(1);
//        this.pauseIs = true;
//      },
//      videoPlay(){
//        this.pauseIs = false;
//        this.$refs.headVideo.play();
//        console.log(this.$refs.headVideo);
//      }
		},
		filters:{
			ifNan(val){
				if(JSON.stringify(val) == 'null'){
					return '请选择地址';
				}else{
					return val;
				}
			}
		},
		watch:{
			selected1(val,oldval){
				if(val == 3){
					if(this.ifcomment == true){
						Indicator.open();
						this.postData('post','/shop-g1-goods_get_comment_lst.html',{goods_id:this.$route.query.goods_id,page:1,page_size:10}).then(res => {
							Indicator.close();
							this.ifcomment = false;
              this.commentLists = res.data;
            },res => {
							Indicator.close();
						})
					}
				}
			}
		}
	}
</script>
<style lang="less">
	.goodDetails{
		font-size: 0.205rem;
		color: #333;
		video::-internal-media-controls-download-button {
		    display:none;
		}
		video::-webkit-media-controls-enclosure {
		    overflow:hidden;
		}
		video::-webkit-media-controls-panel {
		    width: calc(~"100% + 0.6rem");
		}
		.showChose{
	      position: fixed;
	      left: 0;
	      bottom: 0;
	      right: 0;
	      top: 0;
        z-index: 10;
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
		.lunbo{
			height: 6.4rem;
			width: 100%;
			background-color: #fff;
			.moreTable{
				width: 1.88rem;
				height: 2.11rem;
				background-color: #f9f9f9;
				border-radius: 0.08rem;
				position: absolute;
				z-index: 999;
				right: 0.17rem;
				top: 1rem;
				display: none;
				.san{
					width: 0;
					height: 0;
					border: 0.15rem solid transparent;
					border-bottom-color: #f9f9f9;
				    margin-top: -0.3rem;
				    margin-left: 1.45rem;
				}
				.table1{
					width: 100%;
					tr{
						height: 0.66rem;
						td:nth-child(1){
							width: 15%;
							i{
								padding-left: 0.17rem;
							}
						}
						td:nth-child(2){
							font-size: 0.222rem;
						}
					}
				}
			}
			.ul1{
				li{
					float: left;
					width: 100%;
				}
				position: absolute;
    			width: 100%;
    			z-index: 999;
			}
			.more,
			.goBack{
				width: 0.51rem;
				height: 0.51rem;
				background-color: rgba(0,0,0,0.6);
				border-radius: 50%;
				position: relative;
				margin: 0.17rem 0.17rem 0 0.17rem;
			}
			.goBack{
				i{
					position: absolute;
					color: #fff;
					font-size: 0.25rem;
				    top: 0.12rem;
				    left: 0.1rem;
				}
			}
			.more{
				float: right;
				span{
					position: absolute;
					font-size: 0.45rem;
				    color: #fff;
				    line-height: 0.23rem;
				    left: 0.08rem;
				}
			}
		}
		.info{
			height: 2.13rem;
			width: calc(~"100% - 0.34rem");
			background-color: #fff;
			margin-bottom: 0.17rem;
			padding-left: 0.17rem;
			padding-right: 0.17rem;
			.title1{
				font-size: 0.222rem;
				letter-spacing: 0.015rem;
				margin-bottom: 0.13rem;
				padding-top: 0.13rem;
			}
			.desc1{
				margin-bottom: 0.18rem;
				color: #ef4949;
			}
			.real1{
				margin-bottom: 0.1rem;
				color: #ef4949;
				.lastPrice{
					font-size: 0.29rem;
					font-weight: 500;
				}
				.promotions{
					border: 1px solid #ef4949;
					padding: 1px;
					border-radius: 2px;
				}
			}
			.normalPrice{
				text-decoration: line-through;
				color: #999;
			}
		}
		.sku{
			height: 0.6rem;
			width: 100%;
			background-color: #fff;
			line-height: 0.6rem;
			.left1{
				margin-left: 0.17rem;
			}
			.right1{
				float: right;
				i{
					font-size: 0.25rem;
					margin-right: 0.17rem;
					color: #999;
				}
			}
		}
		.address{
			height: 0.72rem;
			width: calc(~"100% - 0.34rem");
			padding: 0.19rem 0.17rem;
			background-color: #fff;
			margin-top: 0.17rem;
			position: relative;
			.xuanze1{
				position: absolute;
				right: 0.17rem;
				top: 0.1rem;
				font-size: 0.5rem;
    			color: #999;
			}
			.address1{
				margin-bottom: 0.17rem;
				i{
					font-size: 0.2rem;
					color: #ef4949;
				}
				.name1{
				    width: 4.5rem;
				    display: inline-block;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    overflow: hidden;
				    vertical-align: top;
				}
			}
      .icon-guanbi{
        color: #000000;
      }
		}
		.details{
			margin-top: 0.17rem;
			.mint-navbar{
				height: 0.6rem;
			}
			.mint-navbar .mint-tab-item.is-selected{
				border-bottom: 0;
			    color: #ef4949;
			}
			.mint-tab-item-label{
				font-size: 0.205rem;
				line-height: 0;
				font-weight: 500;
			}
			.comment1{
				.commentList{
					background-color: #fff;
					padding-bottom: 0.17rem;
    				border-bottom: 1px solid #eee;
					.listTop{
						height: 1.04rem;
						.tou1{
							display: inline-block;
							height: 0.682rem;
							width: 0.682rem;
							border-radius: 50%;
							background-color: #eee;
							vertical-align: top;
							margin-top: 0.17rem;
							margin-left: 0.17rem;
              img{
                height: 0.682rem;
                width: 0.682rem;
                border-radius: 50%;
              }
						}
						.name2{
							display: inline-block;
							vertical-align: top;
							height: 0.6rem;
							margin-top: 0.22rem;
							margin-left: 0.17rem;
              .icon-xingxing_kongxin{

              }
              .icon-start{
                color: #ef4949;
              }
						}
						.time1{
							display: inline-block;
							vertical-align: top;
							float: right;
						    margin-right: 0.17rem;
						    vertical-align: middle;
						    line-height: 1.04rem;
						    color: #999;
						}
					}
					.listBottom{
						width: 100%;
						background-color: #fff;
						overflow: auto;
						.neirong1{
							width: calc(~"100% - 1.04rem");
							background-color: #fff;
							float: right;
							.discuss{
								width: calc(~"100% - 0.17rem")
							}
              .commentType,.commentTime{
                font-size: 0.205rem;
                color: #cccccc;
              }
              .commentType{
                margin-top: 0.14rem;
              }
              .commentTime{
                margin-top: 0.1rem;
              }

						}
						.commentPic{
              overflow: hidden;
							.ul2{
								li{
									float: left;
									margin-right: 0.09rem;
									margin-bottom: 0.09rem;
									.img1{
										width: 1.28rem;
										height: 1.28rem;
										background-color: #eee;
									}
								}
							}
							.ul3{
								width: 3rem;
								li{
									float: left;
									margin-right: 0.09rem;
									margin-top: 0.09rem;
									.img1{
										width: 1.28rem;
										height: 1.28rem;
										background-color: #eee;
									}
								}
							}
						}
					}
				}
			}
      img{
        max-width: 100% !important;
      }
		}
		.selectSku{
			position: fixed;
			/*bottom: -100%;*/
      left: -100%;
      bottom: 0.768rem;
			width: 100%;
			background-color: #eee;
      z-index: 5;
      .selectCon{
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
							font-size: 0.222rem;
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
		.addressList{
			background-color: #fff;
			width: 100%;
			height: auto;
			position: fixed;
		    bottom: -100%;
      z-index: 5;
		    border-top: 1px solid #eee;
      .addressBack{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100vh;
        /*background-color: rgba(0, 0, 0, 0.7);*/
        z-index: -1;
        opacity: 0;
      }
      .addressWrap{
        background-color: #fff;
        width: 100%;
        height: auto;
        bottom: -100%;
        border-top: 1px solid #eee;
      }
			.addressTitle{
				width: 100%;
				text-align: center;
				height: 0.768rem;
				line-height: 0.768rem;
				position: relative;
				border-bottom: 1px solid #eee;
				font-size: 0.239rem;
				i{
					position: absolute;
					right: 0.17rem;
					font-size: 0.3rem;
				}
			}
			.addressList1{
				overflow: auto;
				color: #999;
				.ul6{
					width: calc(~"100% - 0.68rem");
					height: auto;
					background-color: #fff;
					padding: 0.17rem 0.34rem;
					display: inline-flex;
					font-size: 0.222rem;
					li{
						float: left;
					}
					li:nth-child(1){
						i{
							margin-right: 0.17rem;
						}
					}
					li:nth-child(2){
						width: 4rem;
						position: relative;
    					top: 0.08rem;
					}
					li:nth-child(3){
						margin-left: 0.17rem;
						font-weight: bold;
						i{
							color: #fff;
						}
						.selectAddress{
							color: #ef4949;
						}
					}
				}
			}
			.selectAddress{
				color: #ef4949;
			}
			.getOther{
				width: 100%;
				background-color: #ef4949;
				height: 0.768rem;
				line-height: 0.768rem;
				text-align: center;
				color: #fff;
				font-size: 0.256rem;
				margin-top: 0.17rem;
			}
		}
		.caozuo{
			height: 0.768rem;
			width: 100%;
			overflow:auto;
			position: fixed;
			bottom: 0;
			.ul7{
				width: 100%;
				li{
					width: 50%;
					text-align: center;
					float: left;
					height: 0.768rem;
					line-height: 0.768rem;
					font-size: 0.239rem;
				}
				li:nth-child(1){
					background-color: #fff;
					span{
						position: relative;
    					top: -0.05rem;
					}
				}
				li:nth-child(2){
					color: #fff;
				}
        .blockbtn{
          background-color: #999;
        }
        .redbtn{
          background-color: #ef4949;
        }
			}
      .backTop{
        position: fixed;
        right: 0.4rem;
        bottom: 1rem;
        padding: 0.1rem 0.1rem;
        font-size: 0.24rem;
        font-weight: bold;
        text-align: center;
        border-radius: 0.1rem;
        background-color: #dedede;
        opacity: 0.7;
      }
      .backTop-move-enter-active,.backTop-move-leave-active{
        transition:all 1s ease-in;
      }
      .backTop-move-enter,.backTop-move-leave-active{
        opacity: 0;
      }
		}

    .customAdv{
      &_big{
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99;
        background-color: rgba(51, 51, 51, 0.94);
        .mint-swipe-indicator{
          box-sizing: border-box;
          background-color: #000000;
          opacity: 0.6;
        }
        .mint-swipe-indicator.is-active{
          background-color: #ffffff;
          border: 0.03rem solid #000;
          opacity: 1;
        }
      }
      &_close{
        position: absolute;
        top:0.3rem;
        right: 0.2rem;
        z-index: 999;
        color: #ffffff;
      }
      &_bigimg{
        display: inline-block;
        width: 100%;
      }
    }
    .icon-guanbi{
      color: #ffffff;
    }
    .works-enter-active,.works-leave-active{
      transition:all 0.5s;
    }
    .works-enter,.works-leave-active{
      opacity: 0;
    }

  }
  .goodHidden{
    height: 100vh;
    overflow: hidden;
  }
</style>
