<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
<!--
h3 {
	text-align: center;
}
#sm span {
	margin-right: 10px;
	color: #666666;
	font-size: 14px;
}
#content {
	line-height: 1.75;
	margin-top: 10px;
}
#content img{
	max-width:100%;
}
-->
    </style>
</head>
<body>
  <h3><?php echo ($data["subject"]); ?></h3>
  <div id="sm"><span><?php echo (date('Y-m-d',$data["dateline"])); ?></span><span><?php echo ($data["author"]); ?></span><span>阅读：<?php echo ($data["views"]); ?></span></div>
  <div id="content"><?php echo ($data["message"]); ?></div>
</body>
</html>