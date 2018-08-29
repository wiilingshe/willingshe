<?php if (!defined('THINK_PATH')) exit();?>

<link rel="stylesheet" href="/assets/vxuebao-5.4.2.css"/>
<link rel="stylesheet" href="/assets/questionnaire.css"/>
<script type="text/javascript" src="/Public/js/jquery-1.7.1.min.js"></script>
<div class="view_form_header" style="display: block;">
	<a href="http://www.vxuebao.com" target="_blank">
		<img style="margin-top: 12px;margin-left: 20px;" src="/Uploads/ad/2016-03-25/56f48fcc5a56a.png">
	</a>
</div>

<div class="container phoneContainer" style="background-color:#fff;margin-top:50px;margin-bottom: 130px;padding-bottom: 38px;">
<div class="row phoneRow" style="padding:30px">
	<div class="col-md-12 relust_test_name"></div>
	<div class="md-col-12 phonefen">
		<div style="font-size: 15px;color: #6c0;margin-top: 75px;margin-bottom: 30px;">考试详情：</div>
		<div style="font-size:15px;color:#9d9d9d;margin-bottom: 30px;">
			<span>总分：</span><span style="color:#6c0" class="total_score"></span>分
			<span style="margin-left:10px">合格分数线：</span><span style="color:#6c0" class="pass_grade"></span>分
			<span style="margin-left:10px">答卷耗时：</span><span style="color:#6c0" class="ehtime"></span>
		</div>
	</div>
	<div class="">
		<div class="col-md-4 heiban_fen" style="padding-left:0px">
			<div style="position: absolute;color: #fff;font-size: 56px;" class="ban_fen"></div>
			<img src="/view/images/fenshuban.png" style="width: 100%;">
		</div>
		<div class="col-md-8 every_timu">
			<div class="every_timu_header" style="border-top:1px solid #eee">
				<div>题型</div>
				<div>答题数</div>
				<div>答对题数</div>
				<div>总分</div>
				<div>得分</div>
			</div>
			<div class="every_timu_dan">
				<div>单选题</div>
				<div class="timu_dan_all"></div>
				<div class="timu_dan_right"></div>
				<div class="timu_dan_total"></div>
				<div class="timu_dan_fen"></div>
			</div>
			<div class="every_timu_duo">
				<div>多选题</div>
				<div class="timu_dan_all"></div>
				<div class="timu_dan_right"></div>
				<div class="timu_dan_total"></div>
				<div class="timu_dan_fen"></div>
			</div>
			<div class="every_timu_tian">
				<div>填空题</div>
				<div class="timu_dan_all"></div>
				<div class="timu_dan_right"></div>
				<div class="timu_dan_total"></div>
				<div class="timu_dan_fen"></div>
			</div>
			<div class="every_timu_attachment">
				<div>连线题</div>
				<div class="timu_dan_all"></div>
				<div class="timu_dan_right"></div>
				<div class="timu_dan_total"></div>
				<div class="timu_dan_fen"></div>
			</div>
			<div class="every_timu_judge">
				<div>判断题</div>
				<div class="timu_dan_all"></div>
				<div class="timu_dan_right"></div>
				<div class="timu_dan_total"></div>
				<div class="timu_dan_fen"></div>
			</div>
		</div>
	</div>
</div>
	<div style="font-size:15px;color:#9d9d9d;margin-bottom: 30px;" class="col-md-12 testResult_fen col-xs-12">
			<span>本次考试共</span><span style="color:#6c0" class="allsb"></span>道题，
			<span>总分：</span><span style="color:#6c0" class="total_score"></span>分，
			<span>您做对</span><span style="color:#6c0" class="truesb"></span>道题，得分<span class="escore" style="color:#6c0"></span>分。<br/>
			<span class="wenda_nook" style="color:#ff766c;margin-top:10px;display:block;margin-left:-16px">（此分数不包含问答题，待审卷老师评分后才加入问答题分数）</span>
			<span class="wenda_ok" style="color:#ff766c;margin-top:10px;display:block;margin-left:-5px">（此分数包含问答题分数）</span>
		</div>
		<div class="col-md-12" style="text-align: center;"><a style="background: #6c0;border: 0px;color: #fff;padding: 9px;margin-bottom:30px" onclick="seeformscore()">查看答案和解析</a></div>
</div>


<div class="view_form_footer">
<div style="text-align:center;line-height:100px;color:#fff;font-size:14px">友情链接： <a target="_blank" href="http://www.learnnow.net.cn/">领思</a> <a target="_blank" href="http://wizrecord.im/">wizrecord</a> <a target="_blank" href="http://wetool.im/">wetool</a> <a target="_blank" href="http://www.weteam.im/">weteam</a>  <span style="margin: 0 20px;">|</span> CopyRight © 2014-2016 http://www.vxuebao.com  <span style="margin: 0 20px;">|</span> 关于我们/联系我们/新手教程/e-learning</div>
</div>
<style type="text/css">
body{
	background-color: #f5f8ed;
	margin: 0px;
	padding: 0px;
}
</style>
<script>
	var host  = window.location.host;
	var pathname = window.location.pathname;
	var eid = pathname.slice(30,-5);
	$(function(){
		
		$.ajax({
			type:'GET',
			async:false,
			url:'/index.php?c=form&a=resexam',
			data:{'eid':eid},
			success:function(data){
				var data = eval('('+data+')');
				var escore = data.escore;
				var escore = escore.slice(0,-3);
				$('.ban_fen').eq(0).text(data.escore+'分');
				var img_width = $('img').eq(1).css('width');
				var img_height = $('img').eq(1).css('height');
				var fen_width = $('.ban_fen').eq(0).css('width');
				var len = (parseInt(img_width)/2)-(parseInt(fen_width)/2);
				$('.ban_fen').eq(0).css('margin-left',len);
				$('.ban_fen').eq(0).css('margin-top','69px');
				$('.relust_test_name').eq(0).text(data.eusername+'的考卷');
				$('.total_score').text(data.total_score);
				$('.pass_grade').eq(0).text(data.pass_grade);
				$('.ehtime').eq(0).text(data.ehtime);
				$('.truesb').eq(0).text(data.truesb);
				$('.allsb').eq(0).text(data.allsb);
				$('.escore').eq(0).text(escore);
				$('.every_timu_dan div.timu_dan_all').eq(0).text(data.tb[0].radio);
				$('.every_timu_dan div.timu_dan_right').eq(0).text(data.tb[0].rd);	
				$('.every_timu_dan div.timu_dan_total').eq(0).text(data.tb[0].radio_s);
				$('.every_timu_dan div.timu_dan_fen').eq(0).text(data.tb[0].rdsc);
				$('.every_timu_duo div.timu_dan_all').eq(0).text(data.tb[1].choice);
				$('.every_timu_duo div.timu_dan_right').eq(0).text(data.tb[1].co);	
				$('.every_timu_duo div.timu_dan_total').eq(0).text(data.tb[1].choice_s);
				$('.every_timu_duo div.timu_dan_fen').eq(0).text(data.tb[1].cosc);
				$('.every_timu_tian div.timu_dan_all').eq(0).text(data.tb[2].fill);
				$('.every_timu_tian div.timu_dan_right').eq(0).text(data.tb[2].fl);	
				$('.every_timu_tian div.timu_dan_total').eq(0).text(data.tb[2].fill_s);
				$('.every_timu_tian div.timu_dan_fen').eq(0).text(data.tb[2].flsc);
				$('.every_timu_judge div.timu_dan_all').eq(0).text(data.tb[3].judg);
				$('.every_timu_judge div.timu_dan_right').eq(0).text(data.tb[3].jd);	
				$('.every_timu_judge div.timu_dan_total').eq(0).text(data.tb[3].judg_s);
				$('.every_timu_judge div.timu_dan_fen').eq(0).text(data.tb[3].jdsc);
				$('.every_timu_attachment div.timu_dan_all').eq(0).text(data.tb[4].cnt);
				$('.every_timu_attachment div.timu_dan_right').eq(0).text(data.tb[4].ct);	
				$('.every_timu_attachment div.timu_dan_total').eq(0).text(data.tb[4].ctn_s);
				$('.every_timu_attachment div.timu_dan_fen').eq(0).text(data.tb[4].ctsc);
				if(data.ehand == 0){
					$('.wenda_nook').eq(0).css('display','none');
				}else if(data.ehand == 1){
					$('.wenda_ok').eq(0).css('display','none');
				}
			}
		});
		var sUserAgent = navigator.userAgent.toLowerCase();
	    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	    var bIsAndroid = sUserAgent.match(/android/i) == "android";
	    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM){
	    	var a = $('.phoneContainer').eq(0);
	    	$('body').css({'background-color':'#fff','font-size':'39px'});
	    	$('.heiban_fen').eq(0).css('margin-bottom','35px');
	        $('.testResult_fen').eq(0).css({'text-align':'center','margin-top':'20px'});
	        $('.view_form_header').eq(0).remove();
	        a.removeClass('container');
	        a.css('margin-top','0px');
	        $('.phoneRow').eq(0).removeClass('row');
	        $('.view_form_footer').eq(0).remove();
	        $('.phoneRow').eq(0).css({'padding':'0'});
	        $('.relust_test_name').eq(0).css({'text-align': 'center','line-height': '110px','font-size': '57px'});
	        $('.phonefen div').css({'font-size':'39px','padding-left':'25px','padding-right':'25px'});
	        $('.heiban_fen').eq(0).remove();
	        $('.phonefen').eq(0).css('margin-bottom','100px')
	        $('.testResult_fen').eq(0).css({'font-size':'39px','padding-left':'25px','padding-right':'25px','margin-top':'110px'});
	        $('.wenda_nook').eq(0).css({'margin-top':'25px','margin-bottom':'25px'});
	        $('.every_timu').eq(0).css('transform','scale(0.95)');
	        $('.every_timu div div').css({'height':'88px','line-height':'88px'})

	    }
		
	})
	var seeformscore = function(){
		var data = new Date();
		var url = window.location.host;
		window.open('http://'+url + '/form/testMarking/'+data.getTime()+eid);
	}
</script>