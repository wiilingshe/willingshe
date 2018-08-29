<template>
	<div class="sortLists">
		<div style="height:0.768rem;width:100%;background-color:#fff;border-bottom: 1px solid #eee;">
			<div class="search">
				<div style="position: relative;">
					<i class="icon iconfont icon-sousuo1"></i>
					<input type="text" placeholder="请输入商品名称" ref="name">
				</div>
				<div style="height: 0.768rem;float: right;" @click="search()">
					<span>搜索</span>
				</div>
			</div>
		</div>
		<div class="lists">
			<ul>
				<li>
					<div class="idLists">
						<div class="idlist">
							推荐分类
						</div>
						<div @click="getlits(item.cat_id)" class="idlist" v-for="(item,index) in arr" :data-id="item.cat_id" :style="{'background-color':catId ==item.cat_id?'#f9f9f9':'#fff',color:catId ==item.cat_id?'#ef4949':'#333'}" :class="{redone:index==0?true:false}">
							{{item.cat_name}}
						</div>
					</div>
				</li>
				<li style="width: calc(100% - 1.75rem);height: calc(100vh - 0.768rem - 53px);overflow: scroll">
            <div class="rightList" v-for="(item2,index) in arr2">
              <div class="childTitle" :data-id="item2.cat_id">
                <div style="margin-bottom:0.17rem;">{{item2.cat_name}}</div>
                <div class="childlists">
                  <ul class="ul2">
                    <li v-for="item3 in item2.child" @click="tolists(item3.cat_id)">
                      <div v-if="item3.cat_pic!=''" class="img1" :style="{'background-image':'url('+item3.cat_pic+')'}"></div>
                      <div v-if="item3.cat_pic==''" class="img1" :style="{'background-image':'url(../../../static/img/zhanwei.png)'}"></div>
                      <div style="color:#666;line-height: 0.4rem" :data-id="item3.cat_id">
                        {{item3.cat_name}}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
				</li>
			</ul>
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
	import mallTab from '@/components/mall/mallTab'
  import customNav from '@/components/home/custom/customNav';

  export default{
		data(){
			return{
				arr:[],
				catId:'',
				arr2:[],
				arr3:[],
        navIs:true
			}
		},
		created(){
      document.title='分类';
      this.global.shouquan();
			this.getData('get','/shop-g1-goods_cate.html').then(res => {
				this.arr = res.data;
				this.arr2 = res.data[0].child;
			})
		},
    mounted(){
      this.postData('post','/shop-v1-index_basemsg.html').then(res => {
        this.share('分类',res.data.description,res.data.logo);
      });
    },
		methods:{
//      左侧分类点击事件
			getlits(id){
				$('.idlist').removeClass('redone');
				this.catId = id;
				for(let i=0;i<this.arr.length;i++){
					if(this.arr[i].cat_id == id){
						this.arr2 = this.arr[i].child;
					}
				}
			},
//      跳转分类商品页
			tolists(id){
				this.$router.push({path:'goodsLists',query:{catId:id}});
			},
//      搜索跳转分类商品页
			search(){
				this.$router.push({path:'goodsLists',query:{name:this.$refs.name.value}});
			},
//      是否显示原导航栏
      listenToMyBoy(is){
        if(is != undefined){
          this.navIs = is;
        } else {
          this.$nextTick(function () {
            $('.customNav_bottomnav').css({position:'fixed',bottom:0});
          });
        }
      }
		},
		components:{mallTab,customNav},
	}
</script>
<style lang="less">
	.sortLists{
		font-size: 0.205rem;
		.search{
			height: 0.768rem;
			background-color: #fff;
			width: calc(~"100% - 0.34rem");
			margin-left: 0.17rem;
			i{
				position: absolute;
				color: #ccc;
				top: 0.2rem;
				left: 0.1rem;
				font-size: 0.35rem;
			}
			input{
				height: 0.426rem;
				border-radius: 0.213rem;
				-webkit-appearance: none;
				outline-style: none;
				border: 1px solid #eee;
				margin-top: 0.17rem;
				background-color: #eee;
				text-align: center;
				width: 5.5rem;
			}
			span{
				font-size: 0.222rem;
				line-height: 0.768rem;
			}
			div{
				display: inline-block;
			}
		}
		.lists{
			ul{
				li{
					float: left;
					.idLists{
						height: calc(~"100vh - 0.768rem - 53px");
						width: 1.706rem;
						background-color: #fff;
						overflow-y:scroll;
						overflow-x: hidden;
						-webkit-overflow-scrolling:touch;
						.idlist{
							height: 0.683rem;
							width: calc(~"100% - 0.2rem");
							padding-left: 0.1rem;
							padding-right: 0.17rem;
							line-height: 0.683rem;
							font-size: 0.222rem;
							text-align: center;
							overflow: hidden;
							white-space: nowrap;
    						text-overflow: ellipsis;
						}
						.redone{
							background-color: #eee !important;
							color: #ef4949 !important;
						}
					}
					.rightList{
						width: calc(~"100% - 0.34rem");
						margin-left: 0.17rem;
						.childTitle{
							margin: 0.17rem 0;
							.childlists{
								background-color: #fff;
								.ul2{
									width: 100%;
									display: inline-block;
									li{
										width: 100%/3;
										background-color: #fff;
										text-align: center;
										.img1{
											width: 1.066rem;
											height: 1.066rem;
											background-color: #eee;
											margin: 0 auto;
											margin-top: 0.17rem;
											background-size: cover;
										}
									}
								}
							}
						}
					}
					.nodata{
						width: 100%;
						text-align: center;
						color: #666;
						margin-top: 50%;
					}
				}
			}
		}
	}
</style>
