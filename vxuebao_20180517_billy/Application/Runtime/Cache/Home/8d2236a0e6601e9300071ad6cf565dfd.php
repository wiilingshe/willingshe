<?php if (!defined('THINK_PATH')) exit();?><!-- 发布预览 -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>微学宝</title>
		<script type="text/javascript" src="/Public/js/jquery-1.7.1.min.js"></script>
		<!-- // <script type="text/javascript" src="../../Public/eq/5.4/js/form_exampaper.js"></script> -->
    	<script type="text/javascript" src="/Public/eq/5.4/js/form_exampaper.js?v=201708151124"></script> 
    	<link rel="stylesheet" href="/assets/vxuebao-5.4.2.css"/>
    	<link rel="stylesheet" href="/assets/questionnaire.css"/>
    	<!-- <link rel="stylesheet" type="text/css" href="assets/bootstrap.min.css"/> -->
	</head>
	<style type="text/css">
	.form_title_mp{
	    font-size: 39px;
	    margin-bottom: 10px;
	    color: #565656;
	    padding-top: 15px;
	    padding-left: 20px;
	}
	.form_dan_mp p{
		font-size: 36px;
		margin-left: 52px;
    	margin-top: -7px;
    	color: #828282;
	}
	.jqradio{
		    display: inline-block;
		    width: 30px;
		    border: 1px solid rgb(0, 0, 0);
		    height: 30px;
		    border-radius: 30px;
		    position: absolute;
	}
	.jqradio input{
		display: none;
	}
	.jqradio span{
	background-color: #6c0;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    margin-left: 6px;
    margin-top: 6px;
	}
	.form_dub_kuan_mp,
	.form_dan_kuan_mp{
		    /*border: 1px solid #666;*/
		    padding: 18px 5px 18px 21px;
		    margin-top: 3px;
	}
	.form_input_mp{
		height: 80px;
	    font-size: 49px;
	    font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	    width: 100%;
	    border: 1px solid #e0e0e0;
	}
	textarea:focus,
	#form input.form_input_mp:focus{
		border: 1px solid #6c0;
	}
	.form_area_mp{
		height: 200px;
	    font-size: 49px;
	    font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	    width: 100%;
	}
	.view_form_footer{
	    width: 100%;
	    height: 105px;
	    background-color: #999;
	    position: fixed;
	    bottom: 0px;
	    font-size: 40px;
	    text-align: center;
	    line-height: 107px;
	    color: #fff;
	}
	.view_form_header{
		width: 100%;
	    background-color: #fff;
	    height: 60px;
	}
	.div_table_radio_question{
		margin-top: -6px;
	}
	.reset{
		border: 1px solid #6c0;
	    padding: 2px;
	    background-color: #6c0;
	    color: #fff;
	}
	.reset:hover{
		color: #fff;
		background-color: #5cb304;
	}
	</style>
	<body style="background-color:#f5f8ed">
		<div class="view_form_header" style="display:none">
			<a href="http://www.vxuebao.com" target="_blank">
				<img style="margin-top: 12px;margin-left: 20px;" src="/Uploads/ad/2016-03-25/56f48fcc5a56a.png">
			</a>
		</div>
		<div class="form_pc">
			<div class="bg_alert"></div>
			<!-- <div class="alertpng">
				<div class="alertpng_nei">
					<a class="close_preview"></a>
					<img src="../view/images/alert.png">
				</div>
			</div> -->
			<div class="container header_pic" style="overflow: hidden;">
				<div class="row">
					<img class="previewPic" style="width:100%;margin-top:40px;height:165px" class="pre_view">
				</div>
			</div>
			<div class="container content_timu" style="background-color:#fff">
				<div class="row">
					<div class="formTilte"></div>
					<form id="form" method ='post' >
						<div id="formTilte" style="margin: 0 auto;width: 800px;"><p></p><div></div></div>
						<div style="position: relative;">
							<input type="submit" class="btn" value="提交" id="post" style="margin-left: 45%;margin-bottom: 30px;"/>
						</div>
					</form>
				</div>
			</div>
		</div>
	</body>
</html>