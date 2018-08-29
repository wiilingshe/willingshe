<template>
	<div class="mallTab">
		<mt-tabbar v-model="selected">
		  <mt-tab-item id="tab1">
      <i class="icon iconfont icon-caidantubiao-02"></i>
      <div>首页</div>
    </mt-tab-item>
		  <mt-tab-item id="tab2">
		  	<i class="icon iconfont icon-fenlei2"></i>
		  	<div>分类</div>
		  </mt-tab-item>
		  <mt-tab-item id="tab3">
		  	<i class="icon iconfont icon-gouwuche1"></i>
		  	<div>购物车</div>

		  </mt-tab-item>
		  <mt-tab-item id="tab4">
		  	<i class="iconfont icon-wodedangxuan"></i>
		  	<div>订单</div>
		  </mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
	import { Tabbar, TabItem } from 'mint-ui';
	export default{
		data(){
			return{
				selected:'tab2',
			}
		},
		created(){
			if(window.location.href.indexOf('sortLists') != -1){
				this.selected = 'tab2';
				window.document.title = '分类';
			}else if(window.location.href.indexOf('orderCenter') != -1){
				this.selected = 'tab4'
				window.document.title = '订单中心';
			}else if(window.location.href.indexOf('shopCart') != -1){
				this.selected = 'tab3'
				window.document.title = '购物车';
			}
			else if(window.location.href.indexOf('mallHome') != -1){
				this.selected = 'tab1'
				window.document.title = '首页';
			}
		},
		watch:{
			selected(val,oldval){
				if(val == 'tab1'){
					this.$router.push({path:'/mallHome',query:{type_id:4}});
				}else if(val == 'tab2'){
					this.$router.push({path:'/sortLists'});
				}else if(val == 'tab3'){
					this.$router.push({path:'/shopCart'});
				}else if(val == 'tab4'){
					this.$router.push({path:'/orderCenter'});
				}
			}
		}
	}
</script>
<style lang="less">
	.mallTab{
		position: fixed;
		bottom: 0;
		width: 100%;
		.mint-tab-item{
			color: #ccc;
			background-color: #fff;
		}
		.mint-tabbar > .mint-tab-item.is-selected{
			background-color: #fff;
    		color: #ef4949;
		}
		.mint-tabbar{
			border-top: 1px solid #ddd;
		}
		.mint-tab-item-label div{
			font-size: 0.205rem;
			margin-top: 0.05rem;
		}
	}
</style>
