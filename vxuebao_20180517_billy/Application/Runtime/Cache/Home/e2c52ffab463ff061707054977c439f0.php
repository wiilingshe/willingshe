<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
<meta property="qc:admins" content="25322764376510156375" />
<meta name="baidu-site-verification" content="2MKKT6mbuL" />
<meta charset="utf-8" />
<meta name="description" content="" />
<meta name="keywords" content="" />
<meta name="viewport"content="width=device-width, initial-scale=1.0" />
<meta name="renderer" content="webkit">
<meta property="qc:admins" content="" />
<meta property="wb:webmaster" content="354b970d8cd61602" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link href="/Public/Home/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="/index/css/common.css">
<link rel="stylesheet" type="text/css" href="/index/css/school.css">
<title>微学堂</title>
</head>
<body>
  <div id="eq_main">
  <!--头部-->
  <div class="header">
    <div class="wrap">
      <div class="container" id="nav">
        <div id="logo"><img src="/Public/Home/images/logo.png" width="190" height="45"></div>
        <div id="menu">
          <ul>
              <li><a href="/">首页</a></li>
              <li ><a href="/show/">微课案例</a></li>
              <li class="current"><a href="/school/">微课动态</a></li>
              <li><a target="_blank" href="http://bbs.vxuebao.com/forum.php">V粉社区</a></li>
          </ul>
          <ul id="user">
            <?php if($use == 1): ?><li style="background-color:#66cc00" data-toggle="modal" ><a href="http://www.vxuebao.com/#/main" class="l">进入</a></li>
                <li style="background-color:#343b46" data-toggle="modal"><a href="/index.php?c=user&a=logout" class="r">退出</a></li>
            <?php else: ?>
                <li style="background-color:#66cc00" data-toggle="modal" data-target="#login"><a href="#">登录</a></li>
                <li style="background-color:#343b46" data-toggle="modal" data-target="#reg"><a href="#">注册</a></li><?php endif; ?>
          </ul>
        </div>
      </div>
    </div>
  </div>
    <div class="clear"></div>
    <div id="school_contain">
      <div class="contain_left">
        <ul class="menu">
          <li><a href="<?php echo U('School/index',array('fid' => 63));?>" class="<?php if(($_GET['fid'] == '63') OR ($_GET['fid'] == '')): ?>active<?php endif; ?>">微课动态</a></li>
          <li class="last"><a href="<?php echo U('School/index',array('fid' => 68));?>" class="<?php if(($_GET['fid'] == '68')): ?>active<?php endif; ?>">最新资讯</a></li>
          <!-- <li><a href="<?php echo U('School/index',array('fid' => 64 ));?>" class="<?php if(($_GET['fid'] == '64')): ?>active<?php endif; ?>">活动</a></li>
          <li><a href="<?php echo U('School/index',array('fid' => 65));?>" class="<?php if(($_GET['fid'] == '65')): ?>active<?php endif; ?>">更新日志</a></li>
          <li class="last" ><a href="<?php echo U('School/index',array('fid' => 66));?>" class="<?php if(($_GET['fid'] == '66')): ?>active<?php endif; ?>">团队故事</a></li> -->
        </ul>
      </div>
      <div class="contain_right">
        <?php if($_GET['fid'] != 65): ?><ul>
            <?php if(is_array($data)): foreach($data as $key=>$value): ?><li class="f">
              <div class="right_left">
              <a href="http://bbs.vxuebao.com/forum.php?mod=viewthread&tid=<?php echo ($value["tid"]); ?>&extra=page%3D1" target="blank">
                <?php if(($value["attachment"] == '')): ?><img src="/Public/Home/images/school.png" />
                <?php else: ?>
                  <img src="http://bbs.vxuebao.com/data/attachment/forum/<?php echo ($value["attachment"]); ?>" /><?php endif; ?>
              </a></div>
              <div class="right_center">
                <div class="r_c">
                  <a class="name" target="blank" href="http://bbs.vxuebao.com/forum.php?mod=viewthread&tid=<?php echo ($value["tid"]); ?>&extra=page%3D1"><?php echo ($value["subject"]); ?></a>
                  <p><?php echo ($value["message"]); ?></p>
                  <ul>
                    <li><img src="/index/images/show_ico1.png"><span><?php echo ($value["author"]); ?></span></li>
                    <li style="margin-left:40px;"><img src="/index/images/school_ico1.png"><span><?php echo ($value["views"]); ?></span></li>
                    <li style="float:right;"><img src="/index/images/time_ico.png"><?php echo ($value["time"]); ?></li>
                  </ul>
                </div>
              </div>        
              </li><?php endforeach; endif; ?>        
          </ul>
        <?php else: ?>
          <div class="content">
            <div class="wrapper">
              <div class="main">
                <h1 class="title">更新日志</h1>
                <div class="year">
                  <h2><a href="#" style="font-size:30px;"><?php echo ($data["0"]["year"]); ?><i></i></a></h2>
                  <div class="list">
                    <ul>
                      <?php if(is_array($data)): foreach($data as $key=>$value): ?><li class="cls">
                          <p class="date"><?php echo ($value["mon"]); ?></p>
                          <p class="intro"><?php echo ($value["subject"]); ?></p>
                          <p class="version">&nbsp;</p>
                          <div class="more">
                            <?php echo ($value["message"]); ?>
                          </div>
                        </li><?php endforeach; endif; ?>
                    </ul>
                  </div>
                </div>
                <h3 class="bottom">
              </div>
            </div>
          </div><?php endif; ?>
      </div>
      <div class="clear"></div>
      <div class="pages">
        <?php echo ($page); ?>     
      </div>
    </div>
       <div id="footer">
      <div class="footer_top">
        <div class="t_left">
          <p class="title">CONTACT US</p>
          <P>地址：广州市天河区天河路490号壬丰大厦1702室</P>
          <p>商务合作：Email:sales@vxuebao.com</p>
        </div>
        <div class="t_center">
          <div style="margin-right:20px;">
            <p><img src="/index/images/show_qq.png" style="float:left;"> &nbsp;QQ交流群：476434157</p>
            <p><img src="/index/images/show_weixin.png" style="float:left;"> &nbsp;微信公众号：微学宝微课制作工具
            </p>
          </div>
          <div><img src="/index/images/show_cord.png" style="margin-top:-34px;"></div>
        </div>
        <div class="t_right" style="margin-right:0;">
          <p class="title" style="margin-bottom:20px;">企业号试用申请</p>
          <div><img src="/index/images/show_logo2.png"></div>
        </div>
      </div>
      <div class="footer_bottom">
        <ul>
         <li>友情链接：<a style=" color:#ccc;" target="_blank" href="http://www.learnnow.com.cn/ ">领思</a>/<a style="color:#ccc;" target="_blank" href="http://www.wizrecord.im/">wizrecord</a>/<a style=" color:#ccc;" target="_blank" href="https://wetool.im/" >wetool</a></li>
          <li>CopyRight@2014-<?php echo date('Y',time()); ?> http://www.vxuebao.com</li>
          <li><a style=" color:#ccc;" href="http://www.cyberwisdom.im/elearning16.html">关于我们</a>/<a style=" color:#ccc;" href="http://www.cyberwisdom.im/elearning17.html">联系我们</a></li>
        </ul>
      </div>
    </div>
  </div>
<script type="text/javascript" src="//cdn.bootcss.com/jquery/2.2.0/jquery.min.js"></script>
<script type="text/javascript">
  /*分页*/  
  $(function(){
    $("#page_sub").click(function(){
      var p_num = $('#p_num').val();
      if(p_num){
        var str = window.location.href;
        var isfid = str.indexOf('-fid');
        if(isfid > 0){
    
          window.location.href = "http://"+window.location.host+'/School'+'-index-fid-'+<?php echo ($data["0"]["fid"]); ?>+'-p-'+p_num+'.html';
        }else{
          window.location.href = "http://"+window.location.host+'/School'+'-index'+'-p-'+p_num+'.html';
        }
      }else{
        alert('请选择页码！！！');
      }
    });
    $(document).keypress(function(){
      var p_num = $('#p_num').val();
      if(p_num){
        var str = window.location.href;
        var isfid = str.indexOf('-fid');
        if(isfid > 0){
    
          window.location.href = "http://"+window.location.host+'/School'+'-index-fid-'+<?php echo ($data["0"]["fid"]); ?>+'-p-'+p_num+'.html';
        }else{
          window.location.href = "http://"+window.location.host+'/School'+'-index'+'-p-'+p_num+'.html';
        }
      }
    });
  });
$(".main .year .list").each(function(e, target){
  var $target=  $(target),
  $ul = $target.find("ul");
  $target.height($ul.outerHeight()), $ul.css("position", "absolute");
}); 
$(".main .year>h2>a").click(function(e){
  e.preventDefault();
  $(this).parents(".year").toggleClass("close");
});

</script>
<script src="/Public/Home/js/bootstrap.min.js"></script>
<script src="/index/js/jquery.SuperSlide.2.1.1.js"></script>
<script src="/Public/Home/js/jquery.form.js"></script>
<script type="text/javascript">
   function login(){
   $('.login').ajaxSubmit(function (data) {
    //data = eval("(" + data + ")");
       if(data.code==200){
          location.reload();
       }else{
          $('#loginError').css('display','block');
          $('#loginError').text(data.msg).delay(3000).hide(300);
       }
   });
   return false;
}

function register(){
  var loginName=$("#loginName").val() || '';
  var pwd1=$("#pwd1").val() || '';
  var pwd2=$("#pwd2").val() || '';
  if(pwd1=='' || pwd1!=pwd2 || loginName==''){
    //alert('登录邮箱密码不能为空，且两次密码必须一致');
    $('#registerError').css('display','block');
    $('#registerError').text('登录邮箱密码不能为空，且两次密码必须一致').delay(3000).hide(300);
    return false;
  }
  $('.reg').ajaxSubmit(function (data) {
       //alert(data.msg);
        $('#myAlert .modal-body').text(data.msg);
        $('#myAlert').modal('show');
        $("#reg").modal('hide');
   });
  
  return false;
}

function forgetpwd(){
  var email=$("#getemail").val() || '';
  if(email==''){
    alert('请输入邮箱号码');
    return false;
  }
  $('.getpwd').ajaxSubmit(function (data) {
    var data = eval("(" + data + ")");
       alert(data.msg);
   });
    return false;
}
</script>
</body>
</html>
<div class="modal fade" tabindex="-1" id="login">
  <div class="modal-dialog" id="modal-dialog">
  <div class="row">
  	<div class="col-md-6">
    <img src="/assets/images/login/login_img1.jpg" width="420" height="520">
    </div>
    <div class="col-md-6">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title">邮箱或手机号码登陆</h3>
      </div>
      <form class="login" method='post' action="<?php echo U('user/login');?>">
      <div class="modal-body">
         <div class="error-wrap">
            <div class="alert alert-danger ng-binding" id="loginError" role="alert" style="display: none"></div>
        </div>
        <div class="form-group">
          <input type="email" name="username" class="form-control input-lg" placeholder="登录邮箱">
        </div>
        <div class="form-group">
          <input type="password" name="password" class="form-control input-lg" placeholder="登录密码">
        </div>
        <div class="form-group" style="clear:both; height:30px">
        	<div class="pull-left">
          <input type="checkbox" name="rememberMe"> 记住密码
          </div>
          <div class="pull-right"><a href="#" data-toggle="modal" data-dismiss="modal" data-target="#getpwd">忘记密码？</a></div>
        </div>
      </div>
      </form>
      <div class="modal-footer" id="modal-footer">
        <button type="button" class="btn btn-success btn-block btn-lg" onclick="login();">登录</button>
        <div class="num3" style="margin-top:10px;">
          <a href="/qq/example/oauth/index.php" style="height:40px;width:40px;border:1px solid #66cc00;border-radius:50px;display:inline-block;padding-top:6px;"><img src="/Public/Home/images/qq.jpg"></a>
        </div>
        <p id="msg">近期有用户发布敏感课件造成不良影响<br>
      现开启手动审核注册功能，发布敏感课件的账号将会禁用</p>
        <p id="notice">为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</p>
      </div>
    </div>
  </div>
  </div>
</div>

<div class="modal fade" tabindex="-1" id="reg">
  <div class="modal-dialog" id="modal-dialog">
  <div class="row">
  	<div class="col-md-6">
    <img src="/Public/Home/images/login_img1.jpg" width="420" height="520">
    </div>
    <div class="col-md-6">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title">账号注册</h3>
      </div>
    <form class="reg" name="reg" method="post" action="<?php echo U('user/register');?>">
    <div class="modal-body">
    <div class="error-wrap">
            <div class="alert alert-danger ng-binding" id="registerError" role="alert" style="display: none"></div>
        </div>
        <div class="form-group">
        <input type="email" class="form-control input-lg" name="loginName" id="loginName" placeholder="请设置邮箱">
      </div>
      <div class="form-group">
        <input type="password" class="form-control input-lg" name="password" id="pwd1" placeholder="密码(6-16个字符)">
      </div>
      <div class="form-group">
        <input type="password" class="form-control input-lg" name="password2" id="pwd2" placeholder="确认密码">
      </div>
    </div>
    <div class="modal-footer" id="modal-footer">
      <button type="button" class="btn btn-success btn-block btn-lg" onclick="register();">登录</button>
      <p id="msg">近期有用户发布敏感课件造成不良影响<br>
    现开启手动审核注册功能，发布敏感课件的账号将会禁用</p>
      <p id="notice">为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</p>
    </div>
    </form>
    </div>
  </div>
  </div>
</div>
<!--myAlert-->
<div class="modal fade" id="myAlert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width:430px;">
        <div class="modal-content" style="border-radius:0;">
            <div class="modal-header" style="padding:14px;border:none;background-color:#f7f7f7;color:#333;">
            <!--    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="float:left;">
                    &times;
                </button> -->
                <h3 class="modal-title" id="myModalLabel" style="font-size:18px;color:#0ebfb5;">
                    微学宝温馨提示：
                </h3>
            </div>
            <div class="modal-body" style="height:64px;font-size:16px;text-align:center;padding:20px;">
              
            </div>
            <div class="modal-footer" style="text-align:right;border:none;padding:10px;">
                <button type="button" class="btn btn-default" data-dismiss="modal" style="background-color:#0ebfc1;color:#fff;border-color:none;">关闭
                </button>
                
            </div>
        </div><!-- /.modal-content -->
    </div>
</div>
<div class="modal fade" tabindex="-1" id="getpwd">
  <div class="modal-dialog" id="modal-dialog">
  <div class="row">
  	<div class="col-md-6">
    <img src="/assets/images/login/login_img1.jpg" width="420" height="520">
    </div>
    <div class="col-md-6">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title">找回密码</h3>
      </div>
<form class="getpwd" name="getpwd" method="post" action="index.php?c=user&a=forget_password">
<div class="modal-body">
    <div class="form-group">
    <input type="email" class="form-control input-lg" name="email" id="getemail" placeholder="请输入登录邮箱">
  </div>

</div>
<div class="modal-footer" id="modal-footer">
  <button type="button" class="btn btn-success btn-block btn-lg" onclick="forgetpwd();">找回密码</button>
  <p id="msg">近期有用户发布敏感课件造成不良影响<br>
现开启手动审核注册功能，发布敏感课件的账号将会禁用</p>
  <p id="notice">为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</p>
</div>
</form>
    </div>
  </div>
  </div>
</div>
<!-- resetpwdModal -->
<div class="modal fade" tabindex="-1" id="resetpwdModal">
  <div class="modal-dialog" id="modal-dialog">
  <div class="row">
    <div class="col-md-6">
    <img src="/assets/images/login/login_img1.jpg" width="420" height="520">
    </div>
    <div class="col-md-6">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title">重设密码</h3>
      </div>
      <form class="resetpwdModal" method='post' action="<?php echo U('user/reset');?>">
      <div class="modal-body">
         <div class="error-wrap">
            <div class="alert alert-danger ng-binding" id="resetpwdError" role="alert" style="display: none"></div>
        </div>
        <div class="form-group">
          <input type="password" name="newPwd" id="newPwd" class="form-control input-lg" placeholder="新密码">
        </div>
        <div class="form-group">
          <input type="password" name="newPwd2" id="newPwd2" class="form-control input-lg" placeholder="确认密码">
        </div>
        <input class="form-control" id="key" name="key" type="hidden" value="<?php echo $_GET['key']?>">
      </div>
      </form>
      <div class="modal-footer" id="modal-footer">
        <button type="button" class="btn btn-success btn-block btn-lg" onclick="resetpwd()">确认重设</button>
        
        <p id="msg">近期有用户发布敏感课件造成不良影响<br>
      现开启手动审核注册功能，发布敏感课件的账号将会禁用</p>
        <p id="notice">为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</p>
      </div>
    </div>
  </div>
  </div>
</div>