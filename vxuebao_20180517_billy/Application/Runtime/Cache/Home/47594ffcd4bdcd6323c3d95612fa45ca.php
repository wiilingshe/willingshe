<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html lang="zh-cn">
<head>
<meta charset="utf-8">
<title>手机<?php echo ($tpname); ?>上传</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style type="text/css">
#list{
	width:100%;
}
#preview{
	width:100%;
	position: relative;
	padding: 0px;
	margin: 0px -10px 0px 0px;
}
#preview li.p{
	position: relative;
	float: left;
	width: 50%;
	text-align: center;
	list-style-image: none;
	list-style-type: none;
	padding: 0px;
	height: 170px;
	margin: 10px 0px 0px 0px;
}
#preview li.m {
	line-height: 1.75;
	font-size: medium;
	text-indent: 10px;
}
#preview li.m:nth-child(even) {
	background:#efefef;
}
#preview li.p img{
	width: 160px;
	height: 160px;
	padding: 2px;
	border: 1px solid #efefef;
}
.btn{position: relative;overflow: hidden;margin-right: 4px;display:inline-block;*display:inline;padding:4px 10px 4px;font-size:14px;line-height:18px;*line-height:20px;color:#fff;text-align:center;vertical-align:middle;cursor:pointer;background-color:#5bb75b;border:1px solid #cccccc;border-color:#e6e6e6 #e6e6e6 #bfbfbf;border-bottom-color:#b3b3b3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
.btn input {position: absolute;top: 0; right: 0;margin: 0;border: solid transparent;opacity: 0;filter:alpha(opacity=0); cursor: pointer;}
h4 {
	border-bottom: 2px solid #efefef;
	padding: 0px;
	line-height: 45px;
	height: 45px;
	margin: 0px 0px 10px 0px;
}
h4 span {
	float: left;
	line-height: 45px;
	height: 45px;
}
#submit {
	color: #fff;
	background-color: #428bca;
	font-size: 16px;
	line-height: 35px;
	font-weight: bold;
	text-align: center;
	height: 35px;
	border: 0px none #fff;
	width: 100%;
	margin-top: 10px;
}
</style>
<script type="text/javascript" src="/Public/mobile/jquery.min.js"></script>
<script type="text/javascript" src="/Public/mobile/jquery.wallform.js"></script>
<script type="text/javascript">
$(function(){
	$('#photo').die('click').live('change', function(){
		var status = $("#up_status");
		var btn = $("#up_btn");
		$("#imageform").ajaxForm({
			target: '#preview', 
			beforeSubmit:function(){
				status.show();
				btn.hide();
			}, 
			success:function(){
				status.hide();
				btn.show();
			}, 
			error:function(){
				status.hide();
				btn.show();
		} }).submit();
	});
});
</script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
<body>
<h4><img src="/assets/images/logo.png" width="124" height="45"><span>选择手机<?php echo ($tpname); ?></span></h4>
<div class="demo">
	<form id="imageform" method="post" enctype="multipart/form-data" action="index.php?c=Mobile&a=upload">
		<div id="up_status" style="display:none"><img src="/Public/mobile/loader.gif" alt="uploading"/></div>
		<div id="up_btn" class="btn">
			<span>添加<?php echo ($tpname); ?></span>
			<input id="photo" type="file" name="photo">
			<input name="type" type="hidden" value="<?php echo ($type); ?>">
		</div>
	</form>
	<div id="list">
		<ul id="preview"></ul>
	</div>
	<button id="submit">提交</button>
	
</div>
<script>
$('#submit').click(function () {
	var photo = $('input:[name="photo[]"]');
	if(photo.length==0){
		alert('上传的<?php echo ($tpname); ?>不能为');
	}else{
		window.location.href='index.php?c=Mobile&a=save&type=<?php echo ($type); ?>';
	}
});

</script>
</body>
</html>