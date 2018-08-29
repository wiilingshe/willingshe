<template>
  <component :is="rootId"></component>
</template>
<script>
  import Aw from '@/components/customized/2018/1/Aw';
  import customPage from '@/components/common/customPage';
  export default{
        data(){
            return {
              rootId:'',
              customArr:['']
            }
        },
        created(){
          this.global.shouquan();
          this.postData('post','/shop-v1-index_get_root.html').then(res => {
            if(res.data.rootId && res.data.rootId != ''){
                this.rootId = this.customArr.indexOf(res.data.rootId) != -1?res.data.rootId:'customPage';
            }else{
                this.rootId= this.customArr.indexOf(this.$route.query.root_id) != -1 ? this.$route.query.root_id:'customPage';
              }
          })
        },
    components:{Aw,customPage},
    }
</script>
<style lang="less">
</style>
