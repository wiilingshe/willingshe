<template>
	<div id="customInfo">
		<div class="userinfo">
	      <div class="userinfo-left">
	        <img :src="pic==''?userinfo.face==''?shareObj.img:userinfo.face:pic">
	        <div class="userinfo-left-name">{{name==''?userinfo.name:name}}</div>
	        <!-- <button @click="edit()">改成我的</button> -->
			<div class="userinfo-right">
				<img src="/static/img/phone.png" style="margin-left: 0.08rem;">
				<a class="userinfo-right-phone" :href="'tel:'+userinfo.phone">{{phone==''?userinfo.phone:phone}}</a>
			</div>
	      </div>
	      <div class="userinfo-right">
	      	<button @click="edit()">改成我的</button>
	        <!-- <img src="/static/img/phone.png">
	        <a class="userinfo-right-phone" :href="'tel:'+userinfo.phone">{{userinfo.phone}}</a> -->
	      </div>
	    </div>
	</div>
</template>
<script>
	export default{
		props:['userinfo','shareObj'],
		data(){
			return{
				ifedit:true,
				name:'',
				phone:'',
				pic:'',
			}
		},
		created(){
			if(this.$route.query.name != undefined){
				this.name = this.$route.query.name
			}
			if(this.$route.query.phone != undefined){
				this.phone = this.$route.query.phone
			}
			if(this.$route.query.pic != undefined){
				this.pic = this.$route.query.pic
			}
		},
		methods:{
			edit(){
				this.$emit('edit1', this.ifedit)
			}
		}
	}
</script>
<style lang="less">
	#customInfo{
    	font-size: 0.24rem;
		.userinfo{
	      display: flex;
	      -webkit-display:flex;
	      justify-content: space-between;
	      width: 100%;
	      height: 0.77rem;
	      background-color: #FFF8E0;
	      &-left{
	        img{
	          width: 0.6rem;
	          height: 0.6rem;
	          border-radius: 50%;
	          // background-color: #eee;
	          display: inline-block;
	          margin-top: 0.085rem;
	          margin-left: 0.17rem;
	          margin-right: 0.05rem;

	        }
	        &-name{
	          display: inline-block;
	          color:#333;
	          vertical-align: top;
	          line-height: 0.77rem;
	        }
	        button{
	          width: 1.2rem;
	          height: 0.36rem;
	          border-radius: 0.18rem;
	          color: #FF5B0A;
	          text-align: center;
	          border:1px solid #FF5B0A;
	          background-color: transparent;
	          display: inline-block;
	          vertical-align: top;
	          margin-top: calc(~"0.385rem - 0.18rem");
	          margin-left: 0.03rem;
	          outline-style: none;
	        }
	        .userinfo-right{
	        	display: inline-block;
	        	vertical-align: top;
	        }
	      }
	      &-right{
	        img{
	          display: inline-block;
	          width: 0.35rem;
	          height: 0.35rem;
	          margin-top: 0.21rem;
	        }
	        &-phone{
	          display: inline-block;
	          vertical-align: top;
	          margin-right: 0.17rem;
	          margin-left: 0.02rem;
	          line-height: 0.77rem;
	          color:#333;
	        }
	        button{
	          width: 1.2rem;
	          height: 0.36rem;
	          border-radius: 0.18rem;
	          color: #FF5B0A;
	          text-align: center;
	          border:1px solid #FF5B0A;
	          background-color: transparent;
	          display: inline-block;
	          vertical-align: top;
	          margin-top: calc(~"0.385rem - 0.18rem");
	          margin-left: 0.03rem;
	          outline-style: none;
	          margin-right: 0.17rem;
	        }
	      }
	    }
	}
</style>