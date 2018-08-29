<template>
	<div class="box setUp">
		<div class="boxNext" v-show="!nextShow">
			<div class="portrait">
				<div>头像</div>
				<div>
					<img :src=arr.face alt="" />
				</div>
			</div>
			<div class="name" style="border-bottom:1px solid #eee;">
				<div>昵称</div>
				<div>{{ arr.nickname }}
					<!-- <i class="iconfont icon-dayuhao1"></i> -->
				</div>
			</div>
			<div class="gender">
				<div>性别</div>
				<div @click="sex()" class="sex">{{ sexNmae }}</div>
				<div><i class="iconfont icon-dayuhao1"></i></div>
			</div>
			<div class="age">
				<div>生日</div>
                <mt-button @click="open('picker1')" size="large" class="buttons">{{arr.birthday}}</mt-button>
			    <br>
			    <mt-datetime-picker
			      ref="picker1"
			      type="date"
			      v-model="value1"
			      year-format="{value} 年"
			      month-format="{value} 月"
			      date-format="{value} 日"
			      :startDate="startDate"
			      :endDate="endDate"
			      @confirm="handleChange">
			    </mt-datetime-picker>
			    <div><i class="iconfont icon-dayuhao1"></i></div>
			</div>
			<div class="introduce">
				<div>地区</div>
				<div @click="backList()">{{introduce}}</div>
				<div><i class="iconfont icon-dayuhao1"></i></div>
			</div>
      <div class="phone" style="border-bottom:0;">
        <div>手机</div>
        <div @click="toPhone()">{{phonetext}}</div>
        <div><i class="iconfont icon-dayuhao1"></i></div>
      </div>
		</div>
		<div v-show="nextShow">
			<mt-radio
	          title="选择性别"
	          v-model="radioValue"
	          :options="options" @change="check">
	        </mt-radio>
		</div>
		<!-- <div class="refresh" @click="submit" v-show="!nextShow">
			修改
		</div> -->
		<div style="position: absolute;bottom: 0;width: 100%;">
			<footer1></footer1>
		</div>
	</div>
</template>

<script>
	import footer1 from '@/components/common/footer1'
	import { DatetimePicker,Toast } from 'mint-ui'
	import { Picker } from 'mint-ui'
	import { Radio } from 'mint-ui'
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				arr:[],
				value:'',
				radioValue:'',
				options : [{
				            label: '男',
				            value: '1'
				            },
				            {
				            label: '女',
				            value: '2',
				            checked:true
				            },
				            {
				            label: '其他',
				            value: '3'
				            }],
				nextShow:false,
				value:'null',
				startDate: new Date('1960-01-01'),
				endDate: new Date(),
				value1:'',
				sex1:'',
				sexNmae:'',
				introduce:'',
        phonetype:'',
        phonetext:''
			}
		},
		created(){
			document.title="个人资料";
			this.global.shouquan();
      		this.noShare();
			this.getData('get','/shop-v1-user_get_ext_info.html').then(res => {
				if(res.status == 200){
					this.arr = res.data
          this.introduce = res.data.location;
          this.radioValue= res.data.sex;
					if(res.data.sex == 1){
						this.sexNmae = '男'
					}else if(res.data.sex == 2){
						this.sexNmae = '女'
					}else if(res.data.sex == 3){
						this.sexNmae = '其他'
					}
					/*this.phonenum = this.$route.query.phone;*/
					if(res.data.phone!=null && res.data.phone!=''){
					  this.phonetext = res.data.phone;
					  this.phonetype = 2;
					}else{
					  this.phonetext = '未绑定';
					  this.phonetype = 1;
					}
				}
			});

    },
    components:{footer1},
		mounted(){
		},
		methods:{
			openPicker() {
                this.$refs.picker.open();
           },
		   check(val){
		   	this.sex1 = val;
		   	if(val==1){
		   		this.sexNmae = '男'
		   	}
		   	if(val==2){
		   		this.sexNmae = '女'
		   	}
		   	if(val==3){
		   		this.sexNmae = '其他'
		   	}
			this.nextShow = false;
			this.submit();
		   },
		   sex(){
		   	this.nextShow = true;
		   },
		   open(picker1) {
		        this.$refs[picker1].open();
		    },
		    handleChange(value) {
		    	var aa = value.toLocaleDateString();
		    	var bb=aa.replace(/\//g,'-');
		    	this.arr.birthday = bb
		    	this.submit();
		    },
			submit(){
		        if(!this.sex1){
		            this.sex1 = this.arr.sex;
		        }
		        if(!this.introduce){
		            this.introduce = this.arr.location;
		        }
		        this.postData('post','/shop-v1-user_save_ext_info.html',{'birthday':this.arr.birthday,'sex':this.sex1,'location':this.introduce}).then(res => {
						if(res.status == 200){
							if(res.data.status == 1){
								Toast({
								  message: res.data.msg,
								});
							}
							if(res.data.status == 0){
								Toast({
								  message: res.data.msg,
								});
							}
						}


				    });
			},
			backList(){
				var self = this;
				MessageBox.prompt(' ', '请输入地区', {inputPlaceholder: '请输入地区'}).then(({ value, action }) => {
				  self.introduce = value;
				  self.submit();
				})
			},
      toPhone(){
      	if(this.phonetext =='未绑定' || this.phonetext =='' || this.phonetext ==null){
      		this.$router.push({path: "/bindPhone", query: {phonetype:1}});
      	}else{
      		this.$router.push({path: "/bindPhone", query: {phonetype:2}});
      	}
      }

	}


	}
</script>

<style scoped lang="less">
	.refresh{
		width: 5rem;
	    background: #1c252c;
	    margin: 0 auto;
	    height: 0.7rem;
	    border-radius: 0.5rem;
	    color: #fff;
	    line-height: 0.7rem;
	    margin-top: 1rem;
	    text-align: center;
	}
	i{
		color: #999;
		margin-left: 0.16rem;
	}
	.box{
		display: flex;
		flex-direction: column;
		color: #333;
		background: #f1f2f6;
	    position: absolute;
	    height: 100%;
	    width: 100%;
	}
	.boxNext{
		background: #fff;
	}
	.box>div{
		font-size: 0.28rem;
	}

	.portrait{
		margin-right:0.3rem;
		margin-left: 0.3rem;
		height: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
	}
	.portrait div:first-child{
		width: 20%;
		line-height: 2rem;
		text-align: left;
	}
	.portrait div:nth-child(2){
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-self: center;
	}
	.portrait div:nth-child(2) img{
		width: 1.26rem;
		height: 1.26rem;
		border-radius: 50%;
		background-color: #eee;

	}

	.name,.gender,.age,.introduce,.phone{
		height: 1rem;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
		border-bottom: 1px solid #eee;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

	}
	.name{border:0;}

	.name div:first-child,.gender div:first-child,.age div:first-child,.introduce div:first-child,.phone div:first-child{
		width: 20%;
		line-height: 1rem;
		text-align: left;

	}
	.introduce div:nth-child(2),.phone div:nth-child(2){
		line-height: 1rem;
		text-align: right;
		width: 80%;
		color: #666;
	}
	.name div:last-child,.gender div:last-child,.age div:last-child,.introduce div:last-child,.phone div:last-child{
		line-height: 1rem;
		color: #666;
		font-size: 0.28rem;
	}


	.icon-dayuhao1{
		font-size: 0.24rem;
	}
	.inputs{
		height: 0.7rem;
		border: none;
		outline-style: none;
	}

	.buttons{
		background: none;
		border: none;
		height: 100%;
		text-align: right;
		box-shadow: none;
		color: #999;
		width: 80%;
		font-weight: 100;
		font-size: 0.28rem;
		border-radius: 0rem !important;
		color:#666 !important;
		position: relative;
    	left: 0.25rem;
	}
	.sex{
		line-height: 1rem;
		color: #666;
		text-align: right;
		width: 80%;
	}
</style>
