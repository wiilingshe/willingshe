<!--相关协议页面-->
<template>
	<div class="box">
		<p>为维护网上公共秩序和社会稳定，请您自觉遵守以下条款：</p></br>
		<p>一、不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站制作、复制和传播下列信息：</p>
		<p>1.煽动抗拒、破坏宪法和法律、行政法规实施的；</p><p>2.煽动颠覆国家政权，推翻社会主义制度的；</p>
		<p>3.煽动分裂国家、破坏国家统一的；</p>
		<p>4.煽动民族仇恨、民族歧视，破坏民族团结的；</p>
		<p>5.捏造或者歪曲事实，散布谣言，扰乱社会秩序的；</p>
		<p>6.宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；</p>
		<p>7.公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；</p>
		<p>8.损害国家机关信誉的；</p>
		<p>9.其他违反宪法和法律行政法规的；</p>
		<p>10.进行商业广告行为的。</p></br>
		<p>二、互相尊重，对自己的言论和行为负责。</p>
		<p><br/></p>
	</div>
</template>

<script>
	export default {
		
		data(){
			return{
				
			
			}
		},
		created(){
			this.global.shouquan();
			document.title = '协议页';
			
		},
		methods:{
			
			
		},
		mounted(){
			this.share('协议','我的个人中心',this.sharePic);
		}
		
	}
</script>

<style scoped>
	.box{
		display: flex;
		flex-direction: column;
		font-size: 0.24rem;
		text-align: left;
		padding: 1rem 0.2rem;
	}
</style>