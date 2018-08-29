<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo (C("site_title")); ?></title>
    <link href="/Public/Home/css/bootstrap.min.css" rel="stylesheet">
    <link href="/Public/Home/css/index.css" rel="stylesheet">
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
<body>
<div class="container" id="nav">
  <div id="logo"><img src="http://www.vxuebao.com<?php echo ($logo); ?>" width="190" height="45"></div>
  <div id="menu">
      <ul>
          <li class="current"><a href="/">首页</a></li>
          <li><a href="/show/">微课案例</a></li>
          <li><a href="/school/">微课动态</a></li>
          <li><a target="_blank" href="http://bbs.vxuebao.com/forum.php">V粉社区</a></li>
      </ul>
    <ul id="user">
          <li style="background-color:#66cc00" data-toggle="modal" data-target="#login"><a href="#">登录</a></li>
          <li style="background-color:#343b46" data-toggle="modal" data-target="#reg"><a href="#">注册</a></li>
    </ul>
  </div>
</div>
<div class="slide">
    <div class="bd">
    <ul>
    <?php if(is_array($banner)): $i = 0; $__LIST__ = $banner;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li style="background: url(http://www.vxuebao.com/Uploads<?php echo ($v["url"]); ?>) 50% 0px no-repeat;"><a target="_blank" href="<?php echo ($v["link"]); ?>" style="display:block;height:400px;"></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
    </ul>
    </div>
    <div>
        <a class="prev" href="javascript:void(0)"></a>
        <a class="next" href="javascript:void(0)"></a>
    </div>
</div>
<div id="ad1">
    <img src="/Public/Home/images/a1d1.jpg" width="1200" height="180">
</div>
<div id="ad2"><img src="/Public/Home/images/a2d2.jpg" width="1200" height="750"><div class="clearfix"></div></div>
<div id="ad3"><img src="/Public/Home/images/a3d3.jpg" width="1200" height="120"></div>
    
<div id="list" class="container">
  <div class="row">
   	<div class="col-md-3">
            	<div class="pic"><a href="#"><img src="/Public/Home/images/list.jpg" width="100%" height="100%" class="img-responsive center-block"></a><span class="eqcode"><img src="/Public/Home/images/eqcode2.png"  width="100%" height="100%" class="img-responsive center-block"></span></div>
              	<div class="p01">
                    <p><span class="label"><img src="/Public/Home/images/list.jpg" width="24" height="24"></span><a href="#">PPT的一百种死法</a></p>
                </div>
                <div class="p02">
                	<p class="qrcode"><span class="glyphicon glyphicon-qrcode"></span> 扫描</p>
                	<p class="search"><span class="glyphicon glyphicon-search"></span> <a href="uploads/ppt/201610/5812afa6c81f6/index.html" target="_blank">预览</a></p>
            	</div>
            </div>

<?php if(is_array($pro)): $i = 0; $__LIST__ = $pro;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><div class="col-md-3">
          <div class="pic"><a href="#"><img src="http://www.vxuebao.com/Uploads/<?php echo ($v["thumbnail_varchar"]); ?>" width="100%" height="100%" class="img-responsive center-block"></a><span class="eqcode"><img src="index.php?c=Qrcode&code=<?php echo ($v["scenecode_varchar"]); ?>"  width="100%" height="100%" class="img-responsive center-block"></span></div>
            <div class="p01">
                <p><span class="label"><img src="http://www.vxuebao.com/Uploads/<?php echo ($v["thumbnail_varchar"]); ?>" width="24" height="24"></span><a href="#"><?php echo ($v["scenename_varchar"]); ?></a></p>
            </div>
            <div class="p02">
              <p class="qrcode"><span class="glyphicon glyphicon-qrcode"></span> 扫描</p>
              <p class="search"><span class="glyphicon glyphicon-search"></span> <a href="v-<?php echo ($v["scenecode_varchar"]); ?>" target="_blank">预览</a></p>
          </div>
        </div><?php endforeach; endif; else: echo "" ;endif; ?>      
            
        </div>
    </div>
    <div id="ad4"><img src="/Public/Home/images/a4d4.jpg" width="1200" height="115"></div>
    <div id="ad5">
      <img src="/Public/Home/images/a5d5.jpg" width="1200" height="395" border="0" usemap="#Map"/>
      <map name="Map" id="Map"><area shape="rect" coords="69,68,297,140" target="_blank" href="http://www.cgnpc.com.cn/" />
      <area shape="rect" coords="346,68,576,143" target="_blank" href="http://www.bankcomm.com/BankCommSite/default.shtml" />
      <area shape="rect" coords="622,68,852,142" target="_blank" href="http://www.cmbc.com.cn/" />
      <area shape="rect" coords="900,69,1131,143" target="_blank" href="http://www.apollo.com.cn/" />
      <area shape="rect" coords="68,161,298,234" target="_blank" href="http://www.huawei.com/cn/" />
      <area shape="rect" coords="346,162,576,234" target="_blank" href="http://www.fineland.com.cn/cn/index.asp" />
      <area shape="rect" coords="621,160,849,233" target="_blank" href="http://www.meiyijia.com.cn/" />
      <area shape="rect" coords="901,160,1130,233" target="_blank" href="http://www.zlyz.com.cn/" />
      <area shape="rect" coords="68,253,298,327" target="_blank" href="http://cn.cvte.com/" />
      <area shape="rect" coords="347,254,577,326" target="_blank" href="http://www.csair.com/cn/index.shtml" />
      <area shape="rect" coords="623,255,852,323" target="_blank" href="https://www.hsbc.com.cn/1/2/" />
      <area shape="rect" coords="900,253,1130,328" target="_blank" href="http://www.cib.com.cn/cn/index.html" />
      </map>
    </div>


<div id="footer" class="ng-scope">
    <div class="footer_box">


        <div class="footer_nav">
            <div class="tit">了解更多产品</div>
            <div class="txt">
                <div align="center">
                <?php if(is_array($links)): $i = 0; $__LIST__ = $links;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><a target="_blank" class="link" href="<?php echo ($v["link"]); ?>">
                        <img src="http://www.vxuebao.com/Uploads<?php echo ($v["url"]); ?>">
                        <br>
                        <?php echo ($v["descript"]); ?>
                    </a><?php endforeach; endif; else: echo "" ;endif; ?>
                </div>
            </div>
        </div>
        <div class="footer_con">
            <div class="txt01">
                <div class="title">联系我们</div>
                <div>
                    <p>Email：sales@vxuebao.com</p>
                    <p>广州办公室电话： 020-3888 6860</p>
                    <p>加入微学宝用户交流5群：476434157</p>
              
                </div>
            </div>
            <div class="txt02">
                <a href="http://www.cyberwisdom.im/elearning16.html" target="_blank">
                    关于我们
                </a>
            </div>
            <div style="clear:both"></div>
        </div>
        <div class="footer_QR">
            <div class="pic"><img src="<?php echo (C("your_huisi_pic_url")); ?>" width="110px"></div>
            <div class="txt"><?php echo C('weicode');?></div>
            
        </div>
        <div class="footer_wb">
            <div class="pic"><img src="http://www.vxuebao.com/Uploads/weibo.jpg" width="110px" /></div>
            <div class="txt">新浪微博</div>
        </div>
        <div style="clear:both"></div>


        <div class="di">
            <p>
                CopyRight © 2014-<?php echo date('Y',time()); ?> http://www.vxuebao.com,All Rights Reserved.&nbsp;&nbsp;版权所有&nbsp;&nbsp;
                <a target="_blank" rel="nofollow" href="http://www.miitbeian.gov.cn/">
                    粤ICP备13053614号-4                </a>
            </p>
        </div>
        <div class="clear"></div>
    </div>
</div>


<script src="/Public/Home/js/jquery.min.js"></script>
<script src="/Public/Home/js/bootstrap.min.js"></script>
<script src="/index/js/jquery.SuperSlide.2.1.1.js"></script>
<script src="/Public/Home/js/jquery.form.js"></script>
<script>

$(document).ready(function(){
  var modeltype,URL=window.location.href;
  modeltype=URL.split("#")[1];
  if(modeltype=='resetpwd'){
      $('#resetpwdModal').modal('show');
  }

  $(".pic").mouseover(function(){
    $(this).find('span.eqcode').show(); 
  });
  $(".pic").mouseout(function(){
    $(this).find('span.eqcode').hide(); 
  });
  
  
  $(".qrcode,.search").mouseover(function(){
    $(this).parent().parent().find('span.eqcode').show(); 
  });
  $(".qrcode,.search").mouseout(function(){
    $(this).parent().parent().find('span.eqcode').hide(); 
  });
  $('.slide').slide({mainCell:".bd ul",autoPlay:true,interTime:5000});
});

function login(){
   $('.login').ajaxSubmit(function (data) {
    //data = eval("(" + data + ")");
       if(data.code==200){
          location.reload();
       }else{
        //alert(data.msg);
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

//重设密码
function resetpwd(){
  var pwd1 = $("#newPwd").val() || '';
  var pwd2 = $("#newPwd2").val() || '';
  if(pwd1 == '' || pwd1 != pwd2){
    $('#resetpwdError').css('display','block');
    $('#resetpwdError').text('密码不能为空且两次密码必须一致').delay(3000).hide(300);
    return false;
  }
  $('.resetpwdModal').ajaxSubmit(function(data){
      $('#myAlert .modal-body').text(data.msg);
      $('#myAlert').modal('show');
      $("#resetpwdModal").modal('hide');
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