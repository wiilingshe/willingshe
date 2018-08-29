<template>
	<div class="box bankcard xiugaibangding" style="background: #f1f2f6;">
		<!-- <div style="height:0.2rem;width:100%;background:#f1f2f6"></div> -->
		<div v-if="info" class="bank_container show_box">
			<div class="listcss">
				<span class="listOne">真实姓名</span>
				<span class="listTwo">{{name}}</span>
			</div>
			<div class="listcss">
				<span class="listOne">手机号码</span>
				<span class="listTwo">{{phone}}</span>
			</div>
			<div class="listcss">
				<span class="listOne">所属银行</span>
				<span class="listTwo">{{bname}}</span>
			</div>
			<div class="listcss">
				<span class="listOne">银行账号</span>
				<span class="listTwo">{{account}}</span>
			</div>
			<div class="listcss">
				<span class="listOne">公开</span>
				<span class="listTwo" v-if="account_type  == 1">否</span>
				<span class="listTwo" v-if="account_type == 2">是</span>
			</div>
			<div class="login">
				<button @click="changeBank()" style="width:4rem;margin-right:0">修改银行卡绑定</button>
			</div>
		</div>
		<div v-if="!info" class="bank_container edit_box">
			<div v-show="!ifBank">
				<div class="box_one">
					<div>真实姓名</div>
					<div>
						<input type="text" ref="name" placeholder="请输入真实姓名" v-model="name"/>
					</div>
				</div>
				<div class="box_two">
					<div>手机号码</div>
					<div>
						<input type="number" placeholder="请输入手机号码" ref="phone" v-model="phone" />
					</div>
				</div>
				<div class="box_four" @click="chooseBank()">
					<div>所属银行</div>
					<div>
						<input type="text" ref="bank" :value="bname"  disabled="disabled" style="background-color:#fff;position: relative;top: -0.05rem;" />
						<input type="text" ref="bid" disabled="disabled" style="display:none" value="111"/>
						<i class="iconfont icon-dayuhao1" style="color: #CCCCCC;"></i>
					</div>
				</div>
				<div class="box_five">
					<div>银行账号</div>
					<div>
						<input type="number" placeholder="请输入银行账号" ref="account" v-model="account" />
					</div>
				</div>
				<div class="yinsi">
					<span class=""><p>公开</p><input type="radio" name="yinsi" v-model="yinsi" value="2"></span>
					<span class=""><p>自己看</p><input type="radio" name="yinsi" v-model="yinsi" value="1"></span>
				</div>
				<div class="login" style="position:relative">
					<button @click="bindBank()">提交</button>
					<button @click="diss()">取消</button>
				</div>
			</div>
			<div v-show="ifBank">
				<div class="bankTitle">选择开户行</div>
				<div style="margin-top:0.2rem;">
					<div class="bankchoose" v-for="item in bankList" @click="mineBank(item.bid,item.bname)">{{item.bname}}</div>
				</div>
			</div>
		</div>
		<div style="color:#999;font-size:0.26rem;text-align: center;width:100%;height:1.1rem;margin:0.1rem 0;">
			<footer1></footer1>
		</div>
	</div>
</template>

<script>
	import footer1 from '@/components/publicPage/footer1'
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return{
				ifBank:false,
				bankList:'',
				name:'',
				phone:'',
				bank:'',
				account:'',
				info:true,
				yinsi:'1',
				account_type:'',
				bname:'',
			}
		},
		created(){
			document.title = '绑定银行卡'
			this.global.shouquan();
			this.noShare();
			this.postData('post','/shop-v1-user_bank_bundling.html').then(res => {
				if(res.data != 0){
					this.name = res.data.name;
					this.phone = res.data.phone;
					this.account = res.data.bank_account;
					this.account_type = res.data.account_type;
					this.bname = res.data.bname;
				}else{
					this.info = false;
				}
			})
		},
		mounted(){
			this.postData('post','/shop-v1-user_bank.html').then(res => {
				this.bankList = res.data
			})
		},
		components:{footer1},
		methods:{
			bindBank(){
				var self = this;
				var reg_phone = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/,
						reg_fullname = /^[\u4e00-\u9fa5]+$/;
				if(reg_fullname.test(self.$refs.name.value) && self.$refs.name.value.length>0 && self.$refs.name.value.length<16){
					if(reg_phone.test(self.$refs.phone.value)){
						if(self.$refs.account.value.length>=16 && self.$refs.account.value.length<=19){
							var data = {
								name:this.$refs.name.value,
								phone:this.$refs.phone.value,
								bank_account:this.$refs.account.value,
								bid:this.$refs.bid.value,
								bname:this.$refs.bank.value,
								account_type:this.yinsi
							};
							this.postData('post','/shop-v1-user_bank_bundling.html',data).then(res => {
								if(res.data.status == 1){
									Toast({
										message:'绑定成功',
										duracrion:'500'
									});
									this.info = true;
									this.postData('post','/shop-v1-user_bank_bundling.html').then(res => {
										this.name = res.data.name;
										this.phone = res.data.phone;
										this.account = res.data.bank_account;
										this.account_type = res.data.account_type;
										this.bname = res.data.bname;
									})
								}else if(res.data.status == 0){
									Toast({
										message:res.data.msg,
										duracrion:'500'
									})
								}
							});
						}else{
							Toast({
								message:'银行卡号码长度不正确',
								duracrion:3000
							});
						}
					}else{
						Toast({
							message:'请正确填写手机号码',
							duracrion:3000
						});
					}
				}else{
					Toast({
						message:'真实姓名只能是汉字，长度必须在0~15字范围内',
						duracrion:4000
					});
				}
			},
			chooseBank(){
				this.ifBank = true;
			},
			mineBank(id,bank){
				this.ifBank = false;
				this.$refs.bid.value = id;/*
				this.$refs.bank.value = bank;*/
				this.bname = bank;
			},
			changeBank(){
				this.info = false;
			},
			diss(){
				this.info = true;
			}
		},
		watch:{
			name(val,oldval){
				this.name = val;
				return val;
			},
			phone(val,oldval){
				this.phone = val;
				return val;
			},
			account(val,oldval){
				this.account = val;
				return val;
			}
		}
	}
</script>

<style lang="less">
	.xiugaibangding{
		::-webkit-input-placeholder { /* WebKit browsers */
		    color:    #ccc;
		}
		:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
		    color:    #ccc;
		}
		::-moz-placeholder { /* Mozilla Firefox 19+ */
		    color:    #ccc;
		}
		:-ms-input-placeholder { /* Internet Explorer 10+ */
		    color:    #ccc;
		}
	}
	.listOne{
		margin-left: 0.2rem;
	}
	.listTwo{
		float: right;
		margin-right: 0.3rem;
	}
	.listcss{
		height: 0.8rem;
	    width: 100%;
	    background: #fff;
	    line-height: 0.8rem;
	    font-size: 0.27rem;
	    color: #333;
	    border-top: 1px solid #e1e2e6;
	}
	.box{
		flex-direction: column;
		font-size: 0.26rem;
		height: 100%;
		background: #f1f2f6;
		color: #333
	}

	.box_one,.box_two,.box_three,.box_four,.box_five{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 0.28rem;
		border-bottom: 1px solid #e1e2e6;
		height: 0.8rem;
		line-height: 0.8rem;
		padding:0 0.2rem;
		background: #fff;
	}
	.bank_container{
		min-height: calc(100vh - 1.3rem);
	}
	.edit_box input[type='text'],.edit_box input[type='number']{
		width: 3.5rem;
		font-size: 0.28rem;
		line-height: 0.5rem;
		text-align: right;
	}

	/*.iconfont{
		color: #CCCCCC;
	}*/

	.bankcard input{
		height: 0.5rem;
		border: none;
		outline-style: none;

	}

	.login{
   	display: flex;
   	flex-direction: row;
   	justify-content: center;
    margin-top: 1rem;
   }

   .bankcard button{
		width: 4rem;
		height: 0.8rem;
		font-size: 0.26rem;
		outline-style: none;
		border: none;
		border-radius: 0.4rem;
		background-color: #3385ff;
		color: white;
	}
	.bankTitle{
		height: 0.8rem;
	    width: 100%;
	    text-align: center;
	    background: #fff;
	    line-height: 0.8rem;
	    font-size: 0.3rem;
	    border-bottom: 1px solid #e1e2e6;
	}
	.bankchoose{
		height: 0.7rem;
    width: calc(100% - 0.2rem);
    background: #fff;
    border-top: 1px solid #e1e2e6;
    line-height: 0.7rem;
    padding-left: 0.2rem;
    font-size: 0.28rem;
	}
	.bankchoose:nth-child(1){
		border-top: 0
	}
	.login button{
		width:2rem;
	}
  .bankcard .login button:nth-child(1){
		margin-right: 0.5rem;
	}
	.login button:nth-child(2){
		margin-left: 0.5rem;
		background: #fff;
		color: #333;
	}
	.yinsi{
		height: 0.8rem;
		width:100%;
		background: #fff;
		line-height: 0.8rem;
	}
	.yinsi span{
		width:46%;
		display: inline-block;
		margin-left: 0.2rem;
	}
	.yinsi span button{
		position: absolute;
	}
	.yinsi input{
		position: relative;
		top: 0.2rem;
		left: 0.2rem;
	}
	.yinsi p{
		display: inline-block;
		margin-left: 0.5rem;
	}
</style>
