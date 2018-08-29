<?php if (!defined('THINK_PATH')) exit();?><!-- loginModal -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" style="width: inherit" role="document">
        <div>
            <div style="float:left;">
                <img src="/assets/images/login/login_img1.jpg" />
            </div>
            <div class="login-form-section ng-scope" style="float:left;">
                
                <div class="login-content" style="height:520px;padding-top:20px;">
                    <form class="loginForm">
                        <div class="close_ico"></div>
                        <script type="text/javascript">
                            $(".close_ico").bind("click",function(){
                                $(".modal").modal('hide');
                            });
                        </script>
                        <div class="section-title">
                            <a class="pull-left b_login l_r"><span>登录</span></a>
                          
                            <a class="pull-right" data-dismiss="modal" data-toggle="modal"
                               data-target="#regModal"><span>注册</span></a>
                        </div>
                        <div class="error-wrap">
                            <div class="alert alert-danger ng-binding" id="loginError" role="alert"
                                 style="display: none">
                            </div>
                        </div>

                        <div class="textbox-wrap">
                            <div class="input-group"><span class="input-group-addon "><i
                                    class="fa fa-envelope"></i></span>
                                <input style="border-top-right-radius:6px;border-bottom-right-radius:6px;" class="form-control" id="loginEmail" name="userEmail" placeholder="请输入邮箱"
                                       type="text" required="" autofocus="" add-class="">
                            </div>

                        </div>

                        <div class="textbox-wrap">
                            <div class="input-group"><span class="input-group-addon "><i class="fa fa-key"></i></span>
                                <input style="border-top-right-radius:6px;border-bottom-right-radius:6px;" class="form-control" id="loginPassword" name="pass" placeholder="输入密码"
                                       type="password" required=""
                                       add-class="">
                            </div>

                        </div>

                        <div class="login-form-action clearfix">
                            <div class="pull-left">
                                <!-- <input style="margin-top:0px;" id="rememberAcc" type="checkbox"
                                       value="true">&nbsp;<span>记住账号</span> --> <input
                                    style="margin-top:0px; margin-left: 20px;" id="rememberMe" type="checkbox"
                                    value="true">&nbsp;<span>记住密码</span>
                            </div>

                            <div class="pull-right">
                                <a data-dismiss="modal" data-toggle="modal" data-target="#forgetModal"
                                   onclick="clearRetrievePassword()">
                                    <ins>忘记密码？</ins>
                                </a>
                            </div>

                        </div>

                        <div class="login-form-action clearfix">
                            <a type="submit" class="btn pull-left btn-main" onClick="login()">
                                <span>登录</span>
                            </a>
                           <!--  <a class="btn pull-right btn-grey0" data-dismiss="modal" data-toggle="modal"
                               data-target="#regModal">
                                <span>注册</span>
                            </a> -->
                        </div>

                        <div class="login-form-action clearfix third-party" style="line-height:30px;">
                           近期有用户发布敏感课件造成不良影响<br>现开启手动审核注册功能，发布敏感课件的账号将会禁用。
                        </div>

                    </form>
                    <div class="login-form-tip">
                        <h6>为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- forgetModal -->
<div class="modal fade" id="forgetModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div style="float:left;">
                <img src="/assets/images/login/login_img1.jpg" />
            </div>
            <div class="login-form-section ng-scope" style="float:left;height:520px;">
                <div class="login-content" style="height:520px;padding-top:10px;">
                    <form class="retrieveForm ng-pristine ng-invalid ng-invalid-required" novalidate="">
                    <div class="close_ico"></div>
                    <script type="text/javascript">
                            $(".close_ico").bind("click",function(){
                                $(".modal").modal('hide');
                            });
                        </script>
                        <div class="section-title">
                            <h3>找回密码</h3>
                        </div>
                        <div class="error-wrap">
                            <div class="alert alert-danger ng-binding" role="alert" id="forgetPwdError"
                                 style="display: none"></div>
                        </div>
                        <div class="textbox-wrap">
                            <div class="input-group">
                                <span class="input-group-addon "><i class="fa fa-envelope"></i></span>
                                <input class="form-control ng-pristine ng-invalid ng-invalid-required"
                                       id="retrieveUsername" name="userEmail" placeholder="邮箱" type="text"
                                       required="" autofocus="" add-class="">
                            </div>
                        </div>
                        <!-- <div class="textbox-wrap validate">
                          <label class="input-label mid" for="validateCode">验证码</label>&nbsp;
                          <div class = "input-group" style = "display:inline-block;">
                            <input name="validateCode" id="retrieveretrieveValidateCode" ng-model="retrieveretrieve.validateCode" style="width: 100px; font-weight: bold; display: inline-block; height: 32px;" type="text" ng-keyup="$event.keyCode == 13 ? retrieveretrievePassword() : null" add-class>
                          </div>&nbsp;
                          <img class="mid validateCode" onclick="$('.validateCodeRefresh').click();" ng-src="{{validateCodeSrc}}">&nbsp;
                          <a class="mid validateCodeRefresh" onclick="$('.validateCode').attr('src', PREFIX_URL + 'servlet/validateCodeServlet?'+new Date().getTime());" href="javascript:">看不清楚</a>
                        </div> -->
                        <div class="login-form-action clearfix">
                            <div>
                                <script type="text/javascript" load-script=""
                                        src="http://api.geetest.com/get.php?gt=1ebc844c9e3a8c23e2ea4b567a8afd2d&amp;time=1460183193196"></script>
                            </div>
                            <div class="pull-right" style="padding-top: 5px;">
                                <a data-dismiss="modal" data-toggle="modal" data-target="#loginModal">
                                    <ins>我想起来了</ins>
                                </a>
                            </div>
                        </div>
                        <div class="login-form-action clearfix">
                            <button type="button" class="btn btn-success pull-left btn-main"
                                    onclick="retrievePassword()"><span>找回密码</span></button>
                            <button type="button" class="btn btn-success pull-right btn-grey0" onClick="reset()"><h3>
                                重置</h3></button>
                        </div>
                    </form>
                    <div id="findPwdSuccess" style="display: none;">
                        <div class="section-title text-center">
                            <h3>恭喜你，找回密码成功。</h3>
                        </div>
                        <div class="send_email">
                            <span class="ng-binding"></span>
                        </div>
                    </div>
                    <div class="login-form-tip" ng-show="!sendPassword &amp;&amp; !unExist">
                        <h6>为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- resetpwdModal -->
<div class="modal fade" id="resetpwdModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="login-form-section ng-scope">
                <div class="login-content">
                    <form class="retrieveForm" novalidate="">
                        <div class="section-title">
                            <h3>重设密码</h3>
                        </div>
                        <div class="error-wrap">
                            <div class="alert alert-danger ng-binding" role="alert" id="resetpwdError"
                                 style="display: none"></div>
                        </div>
                        <div class="textbox-wrap">
                            <div class="input-group">
                                <span class="input-group-addon "><i class="fa fa-key"></i></span>
                                <input class="form-control" id="pwd1" name="pwdl" placeholder="新密码" type="password"
                                       required="" autofocus="" add-class="">
                            </div>
                        </div>
                        <div class="textbox-wrap">
                            <div class="input-group">
                                <span class="input-group-addon "><i class="fa fa-key"></i></span>
                                <input class="form-control" id="pwd2" name="pwd2" placeholder="确认密码" type="password"
                                       required="" autofocus="" add-class="">
                            </div>
                        </div>
                        <input class="form-control" id="key" name="key" type="hidden" value="<?php echo $_GET['key']?>">
                        <div class="login-form-action clearfix">
                            <button type="button" class="btn btn-success pull-left btn-main"
                                    onclick="resetpwd()"><span>确认重设</span></button>
                            <button type="button" class="btn btn-success pull-right btn-grey0" onClick="reset()"><h3>
                                重置</h3></button>
                        </div>
                    </form>
                    <div id="findPwdSuccess" style="display: none;">
                        <div class="section-title text-center">
                            <h3>恭喜你，找回密码成功。</h3>
                        </div>
                        <div class="send_email">
                            <span class="ng-binding"></span>
                        </div>
                    </div>
                    <div class="login-form-tip" ng-show="!sendPassword &amp;&amp; !unExist">
                        <h6>为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- registerModal -->
<div class="modal fade" id="regModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" style="top:15%;>
        <div class="modal-content">
        <div style="float:left;">
                <img src="/assets/images/login/register_img1.jpg" />
            </div>
            <div class="login-form-section ng-scope" style="float:left;">
                <div class="login-content" style="height:600px;padding-top:20px;">
                    <form name="regForm" class="ng-pristine ng-invalid ng-invalid-required">
                    <div class="close_ico"></div>
                    <script type="text/javascript">
                            $(".close_ico").bind("click",function(){
                                $(".modal").modal('hide');
                            });
                        </script>
                        <div class="section-title">
                            <a id="loginBtn"data-dismiss="modal" data-toggle="modal" data-target="#loginModal" class="pull-left b_login"><span>登录</span></a>
                          
                            <a class="pull-right l_r"><span>注册</span></a>
                           <!--  <h3 class="ng-scope">注册</h3>
                            <a class="bbs-help-tip" id="registerHelp" target="_blank"
                               href="http://bbs.e.wesambo.com/forum.php?mod=viewthread&amp;tid=1903&amp;extra=">
                            </a> -->
                        </div>
                        <div class="textbox-wrap">
                            <div class="input-group">
                                <span class="input-group-addon "><i class="fa fa-user"></i></span>
                                <input style="padding-right:0;border-top-right-radius:6px;border-bottom-right-radius:6px;" class="form-control ng-pristine ng-invalid ng-invalid-required" id="regEmail"
                                       name="userEmail" onBlur="checkEmailExist('')" placeholder="登录邮箱" type="email"
                                       required="" autofocus="" add-class="">
                                <span class="error_text ng-binding" id="regEmailError"></span>
                            </div>

                        </div>
                        <div class="textbox-wrap">
                            <div class="input-group">
                                <span class="input-group-addon "><i class="fa fa-key"></i></span>
                                <input style="padding-right:0;border-top-right-radius:6px;border-bottom-right-radius:6px;" class="form-control ng-pristine ng-invalid ng-invalid-required" id="regPassword"
                                       onblur="checkRegPassword()"
                                       name="pass" placeholder="密码6~16个字符(英文字母或数字 区分大小写)" type="password" required=""
                                       add-class="">
                                <span class="error_text ng-binding ng-hide" id="regPasswordError"></span>
                            </div>
                        </div>

                        <div class="textbox-wrap" >
                            <div class="input-group">
                                <span class="input-group-addon "><i class="fa fa-key"></i></span>
                                <input style="padding-right:0;border-top-right-radius:6px;border-bottom-right-radius:6px;" class="form-control ng-pristine ng-invalid ng-invalid-required"
                                       onblur="checkConfirmPassword()"
                                       id="confirmPassword" name="repeatPass" placeholder="确认密码" type="password"
                                       required="" add-class="">
                                <span class="error_text ng-binding ng-hide" id="confirmPwdError"></span>
                            </div>
                        </div>
                        <div class="login-form-action clearfix">
                            <div class="checkbox pull-left">
                                <div class="custom-checkbox">
                                    <div class="icheckbox_square-blue checked">
                                        <input id="agreeArgument" class="check-box ng-pristine ng-valid" type="checkbox"
                                               checked name="iCheck">
                                    </div>
                                </div>
                                <span class="checkbox-text pull-left ng-scope">我已阅读并同意</span>
                            </div>
                            <div class="checkbox pull-right">
                                <a data-dismiss="modal" data-toggle="modal" data-target="#loginModal">
                                    <ins class="ng-scope">已有账户？</ins>
                                </a>
                            </div>
                        </div>
                        <div class="login-form-action clearfix">
                            <button type="button" id="registerBtn" class="btn btn-success pull-left btn-main" onClick="register()"><span class="ng-scope">注册</span></button>
                            <!-- <button type="button" id="loginBtn" class="btn btn-success pull-right btn-grey0"
                                    data-dismiss="modal" data-toggle="modal" data-target="#loginModal"><span
                                    class="ng-scope">登录</span>
                            </button> -->
                        </div>
                        <div class="login-form-action clearfix third-party" style="line-height:30px;">
                            <!-- <span class="ng-scope">第三方账号登录</span> -->
                            <a style="width:161px;height:41px;" id="wechatLoginBtn" onClick="toQzoneLogin('weixin')" class="wx_login"><span
                                    class="wx_title"></span></a>
                            <a style="width:161px;height:41px;" id="qqLoginBtn" onClick="toQzoneLogin('qq')" class="qq_login"><span
                                    class="qq_title"></span></a>
                            <!-- <a ng-href="{{weiboUrl}}" class="weibo_login"><span class="weibo_title"></span></a> -->
                        </div>
                        <div class="login-form-tip">
                            <h6 class="ng-scope">
                                为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</h6>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>

<!--myAlert-->
<div class="modal fade" id="myAlert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width:430px;left:66%;">
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