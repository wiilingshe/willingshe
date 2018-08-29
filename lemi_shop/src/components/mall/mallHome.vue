<template>
	<div class="mallHome">
    <!--调用自定义首页-->
    <customPage></customPage>
    <div v-if="navIs">
      <customNav v-on:child-say="listenToMyBoy"></customNav>
    </div>
    <div v-if="!navIs">
      <mallTab></mallTab>
    </div>
    <footer1></footer1>

  </div>
</template>
<script>
	import mallTab from '@/components/mall/mallTab'
  import customPage from '@/components/common/customPage';
  import customNav from '@/components/common/custom/customNav';
  import footer1 from '@/components/publicPage/footer1';
  export default{
		data(){
			return{
			    navIs:true,
			}
		},
		created(){
		},
		mounted(){
		},
		components:{mallTab,customPage,customNav,footer1},
		methods:{
      listenToMyBoy(is){
        if(is != undefined){
          this.navIs = is;
        }
      }
		}
	}
</script>
<style lang="less">
	.mallHome{
		font-size: 0.24rem;
	}
</style>
