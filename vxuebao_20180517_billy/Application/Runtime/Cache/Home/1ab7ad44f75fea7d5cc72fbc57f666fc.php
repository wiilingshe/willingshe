<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en" ng-controller="AppCtrl">
<head>
<base href="/">
<meta property="qc:admins" content="25322764376510156375" />
<meta name="baidu-site-verification" content="2MKKT6mbuL" />
<meta charset="utf-8" />
<meta name="description" content="<?php echo (C("content")); ?>" />
<meta name="keywords" content="<?php echo (C("keyword")); ?>" />
<meta name="viewport"content="width=device-width, initial-scale=1.0" />
<meta name="renderer" content="webkit">
<meta property="qc:admins" content="<?php echo (C("THINK_SDK_QQ.qqqqqq52")); ?>" />
<meta property="wb:webmaster" content="354b970d8cd61602" />
<title><?php echo (C("site_title")); ?></title>
<script>
  var PREFIX_URL = "http://"+window.location.host+"/";
  var PREFIX_S1_URL = "http://"+window.location.host+"/";
  var PREFIX_S2_URL = "http://"+window.location.host+"/";
  var PREFIX_S3_URL = "http://"+window.location.host+"/";
  var PREFIX_HOST = "http://"+window.location.host;
  var PREFIX_HOST1 = "http://"+window.location.host+"/";
  var JSON_URL = "http://"+window.location.host+"/index.php";
  var PREFIX_FILE_HOST = "http://"+window.location.host+"/Uploads/"; 
  var SYS_FILE_HOST = "http://"+window.location.host+"/Uploads/";
  var CLIENT_CDN = "http://"+window.location.host+"/";
  var INTERVAL_OBJ = {}; // 用于图集使用的定时器对象
  var IS_OPEN_REG='<?php echo (C("is_open_reg")); ?>' ;
  var QI_AD_XDS='<?php if(C("qi_ad_xds"))echo C("qi_ad_xds");else echo 100; ?>';
  QI_AD_XDS = parseInt(QI_AD_XDS);
  var loadingLogo_qi_xd='<?php if(C("loadingLogo_qi_xd"))echo C("loadingLogo_qi_xd");else echo 100; ?>';
  loadingLogo_qi_xd = parseInt(loadingLogo_qi_xd);
  var guding_qi_xd='<?php if(C("guding_qi_xd"))echo C("guding_qi_xd");else echo 15; ?>';
  var custome_qi_xd='<?php if(C("custome_qi_xd"))echo C("custome_qi_xd");else echo 30; ?>';
  var  GET_XD_LINK='<?php echo ($sys["get_xd_link"]); ?>';
  var  zixun_qq='<?php echo C("zixun_qq") ?>';
  var  zixun_tel='<?php echo C("zixun_tel") ?>';
  var  zixun_mail='<?php echo C("zixun_mail") ?>';
  var  jishu_qq='<?php echo C("jishu_qq") ?>';
  var  jishu_tel='<?php echo C("jishu_tel") ?>';
  var  address='<?php echo C("address") ?>';
  var  your_demain='<?php echo C("site_url") ?>';
  var  your_webname='<?php echo C("site_name") ?>';
  var your_demain_beian='<?php echo C("ipc") ?>';
  var lastpagetext='<?php echo C("lastpagetext") ?>'
  var your_weixinhao_pic_url='<?php echo C("your_weixinhao_pic_url") ?>';
  var your_anli_pic_url='<?php echo C("your_anli_pic_url") ?>';
  var your_huisi_pic_url='<?php echo C("your_huisi_pic_url") ?>';
  var tuijian_pic_url='<?php echo C("tuijian_pic_url") ?>';
  var tuijian_url='<?php echo C("tuijian_url") ?>';
  var client_id='<?php echo (C("THINK_SDK_QQ.APP_KEY")); ?>';
  var redirect_uri='<?php echo urlencode(rtrim(C("site_url"),"/")."/index.php?c=otherlogin&type=qq") ?>';
  var PREFIX_HOST_ARRAY = [
    "http://"+window.location.host,
    "http://"+window.location.host,
    "http://"+window.location.host,
   "http://"+window.location.host
  ];
  var mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
  };
  if(mobilecheck()) {
    var appendUrl = "";

    if(location.href.indexOf('/error/500') < 0 && location.href.indexOf('/about') < 0){
        window.location.href = PREFIX_HOST + '/m/#/userShow';
    }
  }
  function gt_custom_ajax(result, selector) {
    selectorA = selector;
    if (result) {
      //当验证成功时,延迟2秒自动刷新验证码
      /*setTimeout(function() {
        selector(".gt_refresh_button").click();
      }, 2000);*/
      challenge = selector(".geetest_challenge").value;
      validate = selector(".geetest_validate").value;
      seccode = selector(".geetest_seccode").value;
      submit = true;
    }
  }
  
  
  var web_muban_status = '3';
 if(web_muban_status==1){
  var web_muban ='<div id="home" class="min_contain" login-loading>    <header>        <div class="we_nav content_center">            <div class="link_list">                <ul class="clearfix">                    <li><a target="_blank" href="#/show">用户案例</a></li>                   <!--  <li ng-hide="isAuthenticated()"><a href = "#/home/login">登录</a></li>                    <li ng-hide="isAuthenticated()" class=""><a href = "#/home/register">注册</a></li> -->                    <li ng-hide="isAuthenticated()"><a ng-click = "openLogin()">登录</a></li>                    <li ng-hide="isAuthenticated()" class=""><a ng-click = "openRegister()">注册</a></li>                    <li ng-show="isAuthenticated()"><a href="#/main">进入</a></li>                </ul>            </div>                              <div id="logo"><img ng-src="{{logoSrc}}" alt=""></div>        </div>        </header>   <div id="example_con">        <div id="example">            <div slides id="slides">                <div class="slides_container"></div>                <a href="#" class="prev"><img ng-src="{{CLIENT_CDN}}assets/images/arrow-prev.png" width="60px" height="114px" alt="Arrow Prev"></a>                <a href="#" class="next"><img ng-src="{{CLIENT_CDN}}assets/images/arrow-next.png" width="60px" height="114px" alt="Arrow Next"></a>            </div>        </div>    </div>    <hgroup class="core_five">        <div class="home_core content_center">            <h1><img ng-src="{{CLIENT_CDN}}assets/images/home/advantage.png" /></h1>            <div class="advantage_con">                <ul class="clearfix">                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/5.png" alt="" /></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/4.png" alt="" /></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/2.png" alt="" /></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/1.png" alt="" /></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/3.png" alt="" /></li>                </ul>            </div>        </div>    </hgroup>    <div class="cat_xq">        <div class="product_contain">            <div class="product_con content_center">                <ul class="clearfix">                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/pro_10.png" alt=""/></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/pro_13.png" alt=""/></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/pro_15.png" alt=""/></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/pro_17.png" alt=""/></li>                </ul>                <ul class="clearfix">                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/pro_24.png" alt=""/></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/pro_26.png" alt=""/></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/pro_27.png" alt=""/></li>                    <li><img ng-src="{{CLIENT_CDN}}assets/images/home/pro_28.png" alt=""/></li>                </ul>            </div>        </div><!--         <div class="cat_wra">            <div class="cat_contain content_center">                <div class="cat_head"><ul class="clearfix"><li class="mou"><span  ng-class="{hover:page == \'month\'}" ng-click="page = \'month\'"><em>月排名</em></span></li><li class="wek"><span ng-class="{hover:page == \'week\'}"  ng-click="page = \'week\'"><em>周排名</em></span></li><li class="day"><span ng-class="{hover:page == \'day\'}"  ng-click="page = \'day\'"><em>日排名</em></span></li></ul></div>                <div class="cat_content">                    <ul class="clearfix" >                        <li ng-repeat="weekTop in weekTop" ng-show="page == \'week\'">                            <div class="num_con">                                <div class="num_head clearfix"><span>num</span><img ng-src="{{CLIENT_CDN}}assets/images/home/PV.png" /><em class="pv_numbers">{{weekTop.showCount | fixnum}}</em></div>                                <div class="img_con">                                    <a target="_blank" ng-href="{{PREFIX_CLIENT_HOST + \'v-\' + weekTop.code}}">                                        <img ng-src="{{PREFIX_FILE_HOST + weekTop.image.imgSrc}}" alt="" />                                    </a>                                    <p><a target="_blank" ng-href="{{PREFIX_CLIENT_HOST + \'v-\' + weekTop.code}}" title="{{weekTop.name}}">{{weekTop.name}}</a></p>                                </div>                            </div>                        </li>                                          </ul>                    <ul class="clearfix" >                        <li ng-repeat="dayTop in dayTop" ng-show="page == \'day\'">                            <div class="num_con">                                <div class="num_head clearfix"><span>num</span><img ng-src="{{CLIENT_CDN}}assets/images/home/PV.png" /><em class="pv_numbers">{{dayTop.showCount | fixnum}}</em></div>                                <div class="img_con">                                    <a target="_blank" ng-href="{{PREFIX_CLIENT_HOST + \'v-\' + dayTop.code}}">                                        <img ng-src="{{PREFIX_FILE_HOST + dayTop.image.imgSrc}}" alt="" />                                    </a>                                    <p><a target="_blank" ng-href="{{PREFIX_CLIENT_HOST + \'v-\' + dayTop.code}}" title="{{dayTop.name}}">{{dayTop.name}}</a></p>                                </div>                            </div>                        </li>                                          </ul>                    <ul class="clearfix" >                        <li ng-repeat="monthTop in monthTop" ng-show="page == \'month\'">                            <div class="num_con">                                <div class="num_head clearfix"><span>num</span><img ng-src="{{CLIENT_CDN}}assets/images/home/PV.png" /><em class="pv_numbers">{{monthTop.showCount | fixnum}}</em></div>                                <div class="img_con">                                    <a  target="_blank" ng-href="{{PREFIX_CLIENT_HOST + \'v-\' + monthTop.code}}">                                        <img ng-src="{{PREFIX_FILE_HOST + monthTop.image.imgSrc}}" alt="" />                                    </a>                                    <p><a target="_blank" ng-href="{{PREFIX_CLIENT_HOST + \'v-\' + monthTop.code}}" title="{{monthTop.name}}">{{monthTop.name}}</a></p>                                </div>                            </div>                        </li>                                          </ul>                                                                </div>            </div>        </div> -->    </div>    <div class="customer_case">        <div class="customer_case_con content_center clearfix">            <div class="case_cat">                <h1><img ng-src="{{CLIENT_CDN}}assets/images/home/case.png" alt="" /></h1>                <ul>                    <li id="one1" ng-class="{hover:typeindex == \'all\'}" ng-click="getHomes(\'all\', null, 1, 9);type=null">全部案例</li>                    <li ng-repeat = "sceneType in sceneTypes" ng-class = "{hover: typeindex == $index}" ng-click = "getHomes($index, sceneType.value, 1, 9)">                        {{sceneType.name}}                    </li>                </ul>            </div>            <div class="case_img">                <ul class="clearfix">                    <li ng-repeat="home in homes" style="height:235px;">                         <a ng-href="{{PREFIX_CLIENT_HOST + \'v-\' + home.code}}" target="_blank">                        <div ng-show="showCode == true" class="cj_img qrcode" qr-code qr-url="{{PREFIX_CLIENT_HOST + \'/v-\' + home.code}}"></div>                        <div ng-hide="showCode == true" class="cj_img"><img ng-src="{{PREFIX_FILE_HOST + home.image.imgSrc}}" alt="" width="235px" /></div>                        <p class="sample_erwei"><a ng-href="{{PREFIX_CLIENT_HOST + \'/v-\' + home.code}}" target="_blank" ng-mouseover="showCode = true" ng-mouseleave="showCode = false" >二维码</a></p>                    </a>                    </li>                 </ul>            </div>        </div>    </div>     <div class="home_reg">        <div class="home_reg_con">            <div><a ng-click = "register()" alt="立即注册" title="立即注册"><img ng-src="{{CLIENT_CDN}}assets/images/home/ntb_04.png" alt="" /></a></div>        </div>    </div>       <div class="contact">        <div class="contact_con content_center clearfix">            <aside>                <h4><img ng-src="{{CLIENT_CDN}}assets/images/home/wo.png" alt="" /></h4>                <p class="clearfix" style="padding-top:5px"><span class="con_tel">  电话：'+zixun_tel+' <br> 邮箱：'+zixun_mail+' <br> 地址：'+address+'</span></p>                    </aside>            <div class="erwei">                <p style="text-align:right;"><!-- <img ng-src="{{CLIENT_CDN}}assets/images/home/foot_66.png" />-->  </p>                <p><!-- <img ng-src="{{CLIENT_CDN}}assets/images/home/foot_73.png" />--> </p>            </div>        </div>    </div></div><div class="scroll" data-ng-init="load2()" ><a class="scroll_top" href="#element-id">TOP</a></div><div ng-include="\'footer.tpl.html\'"></div>';

  }else if(web_muban_status==2){
  var web_muban ='<div class="topButton" align="center"><table class="toptable" cellspacing="0"><tr> <td><img style="cursor:pointer;" height="45" src="{{logoSrc}}" onclick="openFirstPage()" alt="HTML5在线制作" title="微场景免费在线制作"></td><td id="loginc" align="right">     </td>       <td  class="tbutton"><a  href="#/show"><font color="white">用户案例</font></a></td>   <td  class="tbutton" ng-hide="isAuthenticated()"><a  ng-click = "openLogin()"><font color="white">登录</font></a></td>       <td  class="tbutton" ng-hide="isAuthenticated()"><a  ng-click = "openRegister()"><font color="white">注册</font></a></td><td ng-show="isAuthenticated()" class="tbutton"><a href="#/main"><font color="white">进入</font></a></td></tr></table> </div><div id="body" class="body" align="center"><div class="contant"><table class="pages" cellspacing="0"><tr><td valign="top"> <img style="margin-left:70px;margin-top:80px;" src="static/img/Public/eq/6.0/js/index/advantage.png" alt="HTML5在线制作" title="微场景免费在线制作">  </td></tr><tr><td valign="top"><img style="margin-left:167px;" src="static/img/Public/eq/6.0/js/index/4.png" alt="HTML5在线制作" title="微场景免费在线制作"><img style="margin-left:20px;" src="static/img/Public/eq/6.0/js/index/5.png" alt="HTML5在线制作" title="微场景免费在线制作"><img style="margin-left:20px;" src="static/img/Public/eq/6.0/js/index/2.png" alt="HTML5在线制作" title="微场景免费在线制作"><img style="margin-left:20px;" src="static/img/Public/eq/6.0/js/index/1.png" alt="HTML5在线制作" title="微场景免费在线制作">           <img style="margin-left:20px;" src="static/img/Public/eq/6.0/js/index/3.png" alt="HTML5在线制作" title="微场景免费在线制作">        </td></tr><tr><td valign="top" align="center"><img style="margin-top:30px;" src="static/img/Public/eq/6.0/js/index/btn-bg.png" alt="HTML5在线制作" title="微场景免费在线制作"></td></tr><tr><td valign="top" align="right"><table cellspacing="0" style="width:100%;"><tr><td valign="top" align="left" width="450"><img width="300" src="static/img/Public/eq/6.0/js/index/slide_02.png" alt="HTML5在线制作" title="微场景免费在线制作"></td><td valign="bottom"><div style="color:white;"><h3>让您SHOW得如此精彩</h3><p>海量素材，多样模板，拖拽组件，一键推广</p><p>多种互动效果，满足极致交互体验</p> <p>图文动画，音频视频，多媒体视听感受</p>           <br></div>          </td> <td valign="top" align="right"><div style="color:white;" align="left"><h3>SHOW,让移动推广变得如此简单</h3><p>精美画面，社交展示，数据收集，持续营销</p><p>移动时代专业级的场景制作平台</p></div></td></tr></table></td></tr><tr><td valign="top"><div style="margin-top:190px;"><img style="margin-left:110px;" src="static/img/Public/eq/6.0/js/index/pro_10.png" alt="HTML5在线制作" title="微场景免费在线制作"><img style="margin-left:30px;" src="static/img/Public/eq/6.0/js/index/pro_13.png" alt="HTML5在线制作" title="微场景免费在线制作"><img style="margin-left:30px;" src="static/img/Public/eq/6.0/js/index/pro_15.png" alt="HTML5在线制作" title="微场景免费在线制作"><br><br><br><br><img style="margin-left:80px;" src="static/img/Public/eq/6.0/js/index/pro_17.png" alt="HTML5在线制作" title="微场景免费在线制作"> <img style="margin-left:30px;" src="static/img/Public/eq/6.0/js/index/pro_26.png" alt="HTML5在线制作" title="微场景免费在线制作"><img style="margin-left:30px;" src="static/img/Public/eq/6.0/js/index/pro_27.png" alt="HTML5在线制作" title="微场景免费在线制作"></div></td></tr><tr><td valign="top"><div id="temptest" style="width:800px;" align="right"><br/><br/><br/><br/><br/><br/><br/><br/><p style="color:white;">业务QQ：'+zixun_qq+'</p><p style="color:white;">业务电话：'+zixun_tel+'</p><p style="color:white;">邮箱：'+zixun_mail+'</p><p style="color:white;">联系地址：'+address+'</p></div> </td></tr><tr><td valign="top"></td></tr></table>    </div></div><div class="foot" align="right"><table><tr><td style="color:white;font-family:微软雅黑;font-size:12px;" align="right">{{web_ipc}}  &nbsp;&nbsp; 2015 '+lastpagetext+'版权所有&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table></div><div class="gotoBottom" onclick="godown()">联系</div> <div class="gotoTop" onclick="goup()">UP</div>';

  }else{
  var web_muban ="<link href=\"/Public/eq/6.0/js/index/css/Public/eq/6.0/js/index_v.css\" rel=\"stylesheet\" type=\"text/css\" />  <link href=\"/Public/eq/6.0/js/index/css/y_add.css\" rel=\"stylesheet\" type=\"text/css\">"+""+
    "<div class=\"header-fixed\"><div class=\"header\"><div class=\"header-line\"></div><div class=\"logo\"><a href=\"/\"><img src=\"{{logoSrc}}\"></a></div><div class=\"wrap\"><div class=\"header-nav\"><ul class=\"nav\"><li class=\"current\"><a href=\"/\" hidefocus=\"true\">首页</a></li><li  class=\" \"><a href=\"img\\game.html \" hidefocus=\"true\">微课大赛</a></li><li class=\" \"><a href=\"#/show\" hidefocus=\"true\">微课广场</a></li><li class=\" \"><a href=\"http://bbs.vxuebao.com/forum.php?gid=37 \" hidefocus=\"true\">微课魔法书</a></li><li class=\" \"><a href=\"img\\price.html \" hidefocus=\"true\">服务价格</a></li><!--<li class=\" \"><a href=\"http://bbs.vxuebao.com\" hidefocus=\"true\">论坛</a></li>--></ul></div></div>     <div class=\"login\"><a ng-hide=\"isAuthenticated()\" ng-click=\"openLogin()\" class=\"l\">登录</a><a ng-hide=\"isAuthenticated()\" ng-click=\"openRegister()\"class=\"r\">注册</a><a ng-show=\"isAuthenticated()\" href=\"#/main\" class=\"l\">进入</a><a ng-show=\"isAuthenticated()\" href=\"index.php?c=user&a=logout\" class=\"r\">退出</a></div></div></div><div class=\"header-shadow\" style=\"display:block;\"></div><div class=\"header\"><div class=\"header-line\"></div><div class=\"logo\"><a href=\"/\"><img src=\"{{logoSrc}}\"></a></div><div class=\"wrap\"><div class=\"header-nav\"><ul class=\"nav\"><li class=\"current\"><a href=\"/\" hidefocus=\"true\">首页</a></li><li  class=\" \"><a href=\"img\\game.html \" hidefocus=\"true\">微课大赛</a></li> <li class=\" \"><a href=\"#/show\" hidefocus=\"true\">微课广场</a></li><li class=\" \"><a href=\"http://bbs.vxuebao.com/forum.php?gid=37 \" hidefocus=\"true\">微课魔法书</a></li><li class=\" \"><a href=\"img\\price.html \" hidefocus=\"true\">服务价格</a></li><!--<li class=\" \"><a href=\"http://bbs.vxuebao.com\" hidefocus=\"true\">论坛</a></li>--><li ng-repeat='menu in menus' class=\"\"><a href=\"{{menu.url}}\" hidefocus=\"true\">{{menu.name}}</a></li></ul></div></div><div class=\"login\">     <a ng-hide=\"isAuthenticated()\" ng-click=\"openLogin()\" class=\"l\">登录</a><a ng-hide=\"isAuthenticated()\" ng-click=\"openRegister()\"class=\"r\">注册</a>    <a ng-show=\"isAuthenticated()\" href=\"#/main\" class=\"l\">进入</a><a ng-show=\"isAuthenticated()\" href=\"index.php?c=user&a=logout\" class=\"r\">退出</a></div></div><div id=\"float\"><div id=\"float_txt01\"><div align=\"center\">免费微课培训<a href=\"javascript:\" class=\"float_close\" onclick='addCookie(\"app\",\"1\",1)'>关闭</a></div></div><div id=\"float_pic\"><img src=\""+tuijian_pic_url+"\"  width=\" 130\" height=\"130\"></div><div id=\"float_button\"><a target=\"_blank\" href=\""+tuijian_url+"\">立即报名</a></div>   </div><div class=\"slide\"><ul class=\"slides-bg\" id='slides_bgcc'>"+
    "{{slides_bgcc}}"+
    "</ul><ul class=\"slides-container\" style=\"position: relative;\" id=\"banner_body\"></ul><div class=\"slide-shortcut\"><!--<ul class=\"slide-switch\" id=\"slide_switchcc\">"+
    ""+ 
    "</ul>--><a class=\"slide-shortcut-prev\" href=\"javascript:;\" style=\"display: none;\"></a><a class=\"slide-shortcut-next\" href=\"javascript:;\" style=\"display: none;\"></a></div></div><div class=\"feature\"><div class=\"feature-item item1\"><div class=\"feature-inner\"><!-- <h3><div class=\"t_0\">做微课，从未如此简单</div><div class=\"t_1\">海量模板,60人的素材制作团队,只为让你更省时</div><div class=\"t_1\">完全免费,所有账号和素材免费,只为让你更省钱</div><div class=\"t_1\">私密保护,支持部署到企业内部,只为让你更省心</div><div class=\"t_1\">课件导出,唯一免费的导出平台,只为让你更省力</div> --><!-- <div class=\"t_2\">无需编程即可制作含各种特效和交互的移动手机页面</div><div class=\"t_2\">"+your_webname+"让人人都能轻松做出电影特效一般的炫酷特效</div> --></h3><div class=\"a1\" style=\"opacity: 1;\"></div><div class=\"a2\"  style=\"opacity: 1;\"></div><div class=\"a3\" style=\"top: -50px; opacity: 1;\"></div></div></div><div class=\"feature-item item2\"><div class=\"feature-inner wrap\"><h3><div class=\"t_0\"></div><div class=\"t_1\"></div></h3><div class=\"a1\" style=\"top: 80px; opacity: 1;\"></div></div></div></div><div class=\"index_case\"><div class=\"index_box\"><div><img style=margin-top:110px; src=\"/Public/images/add.jpg\" /></div><div class=\"case_box\"><ul>"+
    "<li ng-repeat=\"home in homes\" id=\"Image{{home.id}}\" myid=\"{{home.id}}\" mycode=\"{{home.code}}\"><div class=\"pic\"><a target=\"_blank\"  href=\"?c=view&id={{home.code}}\"  onMouseOut=\"MM_swapImgRestoremy(this)\" onmouseover=\"MM_swapImage(this,'','http://qr.liantu.com/api.php?text=',1)\"><img src=\"{{PREFIX_FILE_HOST + home.image.imgSrc}}\" name=\"Image{{home.id}}\" width=\"282\" height=\"290\" border=\"0\"></a></div><div class=\"p01\"><div class=\"tb1\"><img src=\"{{PREFIX_FILE_HOST + home.image.imgSrc}}\" width=\"24\" height=\"24\" border=\"0\" id=\"tb1img{{home.id}}\"></div><div class=\"tit\">{{home.name}}</div></div><div class=\"p02\"><div class=\"t4\"><div class=\"pic\"><a href=\"?c=view&id={{home.code}}\" target=\"_blank\"><img src=\"/Public/eq/6.0/js/index/images/c_yl.png\" /></a></div><div class=\"txt\"><a href=\"?c=view&id={{home.code}}\" target=\"_blank\" style=\" color:#999999\">预览</a></div></div><div class=\"t4\" style=\"float:left;\"><div class=\"pic\" onMouseOut=\"MM_swapImgRestoremy(this)\" onMouseOver=\"MM_swapImage(this,'','http://qr.liantu.com/api.php?text=',1)\"><img src=\"/Public/eq/6.0/js/index/images/c_qr.png\" /></div><div class=\"txt\" onMouseOut=\"MM_swapImgRestoremy(this)\" onMouseOver=\"MM_swapImage(this,'','http://qr.liantu.com/api.php?text=',1)\">扫描</div></div></div></li>"+
    "</ul></div><div class=\"clear\"></div></div></div><div class=\"tu1\"></div><div class=\"tu2\"></div><div id=\"footer\">"+
    <!-- "<div class=\"inner\"><div class=\"friendlinks\"><h3 class=\"title\">了解更多产品</h3><p><a ng-repeat='link in product' ng-href=\"{{link.url}}\" target=\"_blank\" class=\"link\">{{link.name}}</a></p></div></div>"+ -->
    "<div class=\"footer_box\"><div class=\"footer_nav\"><div class=\"tit\"><div>了解更多产品</div></div><div class=\"txt\"><div align=\"center\"><a ng-repeat='link in product' ng-href=\"{{link.link}}\" target=\"_blank\" class=\"link\"><img src=\"{{link.url}}\"><br />{{link.descript}}</a></div></div></div><div class=\"footer_con\"><div class=\"txt01\">        <div class=\"title\">公司地址</div><div><p>地址：广州市天河区490号壬丰大厦1702室</p><p>Email：consulting@vxuebao.com</p><p>微信公众号：微学宝微课制作工具</p><p>电话： (020) 3888 6860-330</p><p>加入微学宝用户交流5群：476434157</p></div></div><div class=\"txt02\"><a href=\"http://www.cyberwisdom.net.cn/elearning17.html\" target=\"_blank\">关于我们</a></div></div><!--<div class=\"footer_QR\"><div class=\"pic\"><img src=\""+your_weixinhao_pic_url+"\" width=\"120\"></div><div class=\"txt\">微信公众号</div></div>--><div class=\"footer_QR\"><div class=\"pic\"><img src=\""+your_huisi_pic_url+"\" width=\"120\"></div><div class=\"txt\">微学宝微课制作工具</div></div><div class=\"di\">     <p>CopyRight © 2014-2016 "+your_demain+",All Rights Reserved.&nbsp;&nbsp;版权所有&nbsp;&nbsp;<a target=\"_blank\" rel=\"nofollow\" href=\"http://www.miitbeian.gov.cn/\">"+your_demain_beian+"</a></p></div><div class=\"clear\"></div>"
    }
</script>
<!--<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />-->

<link rel="stylesheet" href="/vendor/hint.css/hint.min.css"/>
<!-- compiled CSS -->
<link rel="stylesheet" href="/assets/vxuebao-common-5.4.2.min.css"/>
<link rel="stylesheet" href="/assets/vxuebao-5.4.2.min.css"/>
<link rel="stylesheet" href="/assets/questionnaire.css"/>
<link rel="stylesheet" type="text/css" href="/assets/vxuebao-6.0.css">

<link rel="stylesheet" href="/vendor/angular-ui-grid/ui-grid.min.css"/>
<!-- <link rel="stylesheet" href="/assets/webuploader.css"/> -->

<!--CDN -->
<link rel="stylesheet" href="/Public/css/waiwan/font-awesome/css/font-awesome.min.css?v=201612071402">
<link rel="stylesheet" href="/Public/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Public/css/jquery.Jcrop.min.css">
<link rel="stylesheet" href="/Public/css/select.min.css">
<link href="/Public/css/hint.min.css" rel="stylesheet">
<!-- 新模板页 -->
<!-- <link rel="stylesheet" href="/icomoon/style.css"> -->
<!-- <link rel="stylesheet" href="assets/component.css"> -->

<!--70c-->
  <link rel="stylesheet" href="/index/css/shortcut.css"/>
  <link rel="stylesheet" href="/assets/lycc_map.css"/>
<style>
.myGrid {
  width: 998px;
  height: 550px;
}
.myGrid1 {
  width: 650px;
  height: 550px;
}
.choose_template .main .content .mask ul li .roll :hover .cc{
  display: block;
}
/*.main_navbar ul li:nth-child(3){
  margin-right: 596px;
}
.main_navbar ul li:nth-child(4){
  margin-right: 596px;
}*/
.alert-warning{
  display: none;
}
.message{margin-left:30px;margin-top:10px;line-height:24px;color:#ffd5bc;overflow:hidden;margin-bottom: 30px;}
.message .input{border: 1px solid #66cc00;width:480px;height:40px;line-height:28px;background:#ffffff;padding-left:20px;color:black;font-family:Microsoft YaHei;}
.message .liulan{margin-left:15px;width:80px;height:40px;border:1px solid #66cc00;background:#66cc00;color:#ffffff;cursor:pointer;}
.message .files{position:absolute;left:-1000px;top:52px;heigth:26px;cursor:pointer;filter: Alpha(opacity=0);-moz-opacity:0;opacity:0;}
#notify .alert-success{animation:myalert 3s forwards;}
@keyframes myalert{from{display: block;opacity: 1;}to{display: none;opacity: 0;}}
.autoSave{
  animation:autoSave 3s forwards;
}
@keyframes autoSave{
  from{display: block;opacity: 1;}
  to{display: none;opacity: 0;}
}
</style>

<!--修改开始-->
<link href="/Public/eq/5.4/layer/skin/layer.css" rel="stylesheet">
<!--修改结束-->

<!-- requireJs -->
<script type="text/javascript" src="Public/js/jquery-3.0.0.min.js"></script>
<!-- <script type="text/javascript" src="Public/js/jquery.qrcode.js"></script>
<script type="text/javascript" src="Public/js/qrcode.js"></script> -->
<script type="text/javascript" src="/index/js/echarts.min.js"></script>
<script src="/Public/js/require.min.js" data-main="/Public/eq/6.0/main.js"></script>


</head>
<body right-click>
  <!--<input type="text" style="display:none" id="userId" ng-model="user.id" />
<div class="position:relative"><div style="z-index:2000;" id="notify" ng-include="'notifications.tpl.html'" ng-if="notifications.getCurrent().length"></div></div>-->
<div id="psd_transformation" style="display:none;position:fixed;width:100%;height:100%;background-color:#000;z-index:10001;opacity:0.5;"></div>
    <div class="psd_transformation" style="display:none;background-color: #fff;position: fixed;width: 373px;z-index: 10003;border-radius: 5px;margin-left: 40%;margin-top: 20%;">
        <div class="modal-header">psd转换</div>
        <div class="modal-body">psd正在后台转换，请勿关闭页面并等待页面自动刷新</div>
    </div>
    <div id="codeUpload" style="display:none;position:fixed;width:100%;height:100%;background-color:#000;z-index:10001;opacity:0.5;"></div>
    <div id="codeKuang" style="display:none;width:591px;height:473px;background-color:#fff;position:absolute;z-index: 10002;margin-left: -295px;margin-top: -236px;top:50%;left:50%;">
        <a id="soundCode" style="position:absolute;color:#fff;right:-30px;top:-30px;" onclick="closeCodes()">
            <div style="width: 30px;height: 30px;border-radius: 15px;">
                <p style="text-align: center;line-height: 30px; height:32px;width:32px;background:url('/assets/images/re-design/bg_close.png') no-repeat;"></p>
            </div>
        </a>
        <a id="picCode" style="position:absolute;color:#fff;right:-30px;top:-30px;" onclick="closeCodep()">
            <div style="width: 30px;height: 30px;border-radius: 15px;">
                <p style="text-align: center;line-height: 30px; height:32px;width:32px;background:url('/assets/images/re-design/bg_close.png') no-repeat;"></p>
            </div>
        </a>
        <div id="codeSound" style="display:inline-block;padding:125px 0 0 222px;"></div>
        <div id="codePic" style="display:inline-block;padding:125px 0 0 222px;"></div>
        <!-- <p id="codeSound2" style="text-align: center;margin-top: -25px;">请用手机扫描二维码上传</p> -->
        <!-- <p id="codePic2" style="text-align: center;margin-top: -25px;">请用手机扫描二维码上传</p> -->
    </div>
    <input type="text" style="display:none" id="userId" ng-model="user.id" />
    <div class="position:relative">
        <div style="z-index:2000;" id="notify" ng-include="'/Public/eq/6.0/templates/notifications.tpl.html'" ng-if="notifications.getCurrent().length"></div>
    </div>
    <div ui-view id="eq_main"></div>

    <div style="display:none"><script src="https://s95.cnzz.com/stat.php?id=1258616548&web_id=1258616548" language="JavaScript"></script></div>
<script>
    var closeCodes = function(){
        $('#codeUpload').css("display","none");
        $('#codeKuang').css("display","none");
        clearInterval(cc);
        document.getElementById("codeSound").children[0].remove();
      
    }
    var closeCodep = function(){
        $('#codeUpload').css("display","none");
        $('#codeKuang').css("display","none");
        clearInterval(ww);
        document.getElementById("codePic").children[0].remove();
      
    }
var closeCodep = function(){
  $('#codeUpload').css("display","none");
  $('#codeKuang').css("display","none");
  clearInterval(ww);
  document.getElementById("codePic").children[0].remove();
  
}
</script>
<script>
    var redirect_uri = encodeURIComponent('/password.html');
    var submit = false;
    var challenge, validate, seccode, selectorA;
</script>
<script type="text/javascript">
    if (self.location.hash.indexOf('returl') > 1) {
        var returl = document.cookie = self.location.hash.split("returl=");
        document.cookie = "returl=" + returl[1];;
    }
    setInterval(
        function() {
            if ((top.location != self.location) && self.location.hash.indexOf('create') < 1) {
                var returl = getCookie("returl");
                window.location.href = returl;
            }
        }, 2000);

    function getCookie(cookieName) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (cookieName == arr[0]) {
                return arr[1];
            }
        }
        return "";
    }


</script>
<script type="text/ng-template" id="myModelContent2.html">
    <div class="modal-header" style="padding-top:27px;padding-bottom:40px;">
        <div class="col-xs-11"><p style="font-size:18px;color:#666">PPT转H5提示：</p></div>
        <div class="col-xs-1">
            <a ng-click="cancel()">x</a>
        </div>
    </div>
    <div class="modal-body">
        <h3 style="color:#666;text-align:center;font-size: 22px;">PPT正在后台转换，请稍等约五分钟后回来查看。</h3>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="cancel()">确定</button>
    </div> 
</script>

<lable  style="opacity: 0;height: 0px !important;position: absolute;top: 100px;z-index: -1000;">
 </lable>

<script type="text/ng-template" id="myModelContent.html">  
    <div id="hah">
        <p ng-click="cancel()" style="margin-left:815px;margin-top:10px"><a href=""><span>x</span></a></p>
        <div class="modal-body"style="margin-left:35px;">
            <div class="row" style="padding-top:30px">
                <div class="col-xs-2" style="margin-left:30px">
                    <div id="kuang" class="ppt-left" style="width:150px;height:150px;border:1px solid #66cc00;">
                        <input id="tou" onchange="change(this)" type="file"  style= "background-color:transparent;position: absolute;width:150px;height:150px;opacity:0;">
                        <img id="img" style="margin: 28px 0 auto 50px;" src="assets/add.png">
                        <p id="addPpt" style="color:#66cc00;margin: 10px auto auto 19px;">点击上传课程封面</p>
                    </div>
                </div>
                <div class="col-xs-9" style="margin-left:35px;">
                    <input id="title" placeholder="请输入课程标题" type="text" class="ppt-right"style="border-radius: 0px;width:500px;height:40px;border:1px solid #000;margin-bottom:16px;border:1px solid #66cc00;">
                    <textarea id="desc" placeholder="请输入课程简介"  type="text" class="ppt-right"style="width:500px;height:94px;border:1px solid #000;border:1px solid #66cc00;line-height: 25px;"></textarea >
                </div>
            </div>

            <div class="row" style="margin-left: 30px;margin-top:20px">
                <h4 style="color:#4b4b4b">PPT上传提示：</h4><br/>
                <p style="color:#4b4b4b">1、支持2007版及以上的PPT版本。</p>
                <p style="color:#4b4b4b">2、PPT的大小限制在20M以内，如果文档过大请先压缩PPT。</p>
                <p style="color:#4b4b4b">3、PPT先上传成功后，再转换为H5，时间大约在5分钟左右，请耐心等待。</p>
            </div>
        
            <div class="row" style="margin-bottom:10px;">
                <div>
                    <div class="message" style="margin-top:20px;">
                        <form method="post" action="" enctype="multipart/form-data">
                            <input type="text" id="txt" name="txt" class="input" disabled="disabled" style="margin-left:15px;border-radius: 0px;" />
                            <input type="button" onMouseMove="f.style.pixelLeft=event.x-60;f.style.pixelTop=this.offsetTop;" value="浏览" size="30" onClick="f.click()" class="liulan">
                            <button ng-click="successPpt()" type="submit" class="btn" style="width:80px;height:40px;background-color:#e93e46;color:#ffffff;border-radius:0px;">上传</button>
                            <input type="file" id="f" onChange="txt.value=this.value" name="f" style="height:26px;" class="files"  size="1" hidefocus>
                            <p id="pptPath" style="color:black;margin-left:15px;display:none"></p>
                            <p id="picturePath" style="color:black;margin-left:15px;display:none"></p> 
                            <div class="col-xs-2"><p id="baifenbi" style="color:#666;"></p></div>
                            <div class="col-xs-7"><p id="successtopost" style="color:#666;margin-left:-127px;"></div>
                        </form>
                        <div style="margin-left:-65px;">
                            <button type="button" class="btn btn-primary" style="display:block;margin:0 auto;width:80px;height:40px;border-radius:0px;margin-top:30px;" ng-click="postPpt()">开始转换</button>
                            <p id="transform" style="display:none;text-align: center;color:#666">转换中，请稍后...</p>
                        </div>
                  
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>
<script type="text/javascript">
    function change(file) {
        var img = document.getElementById("img");
        var tou = document.getElementById("tou")
        var a = /\.(jpg|png|gif|swf|bmp|jpeg)$/i.test(tou.value); //判断封面类型
        if (file.files && file.files[0]) {
            if (a == true) {
                var picture = document.getElementById("tou").files[0];
                console.log(picture);
                var FileController = "http://" + window.location.host + "/index.php?c=upfile&a=upload&bizType=0&fileType=1";
                var form = new FormData();
                form.append("file", picture);
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", uploadComplete, false);
                xhr.addEventListener("error", uploadFailed, false);
                xhr.addEventListener("abort", uploadCanceled, false);
                xhr.open("post", FileController, true);

                function uploadComplete(evt) {
                    /* This event is raised when the server send back a response */
                    var picturePath = $.parseJSON(evt.target.responseText)
                    console.log(picturePath.obj.path) //打印图片地址
                    document.getElementById("picturePath").innerHTML = picturePath.obj.path;
                }

                function uploadFailed(evt) {
                    var psdInfo = $.parseJSON(evt.target.responseText)
                    alert("上传文件后缀不允许");
                }

                function uploadCanceled(evt) {
                    var psdInfo = $.parseJSON(evt.target.responseText)
                    alert("上传文件后缀不允许");
                }
                xhr.send(form);
                var reader = new FileReader();
                reader.onload = function(evt) {
                    img.setAttribute('src', evt.target.result);
                    img.style.width = "inherit";
                    img.style.height = "inherit";
                    img.style.marginLeft = "0px";
                    img.style.marginTop = "0px";
                    document.getElementById("kuang").style.border = "0px"
                    document.getElementById("addPpt").style.display = "none";
                }
                reader.readAsDataURL(file.files[0]);
            } else {
                return alert("图片格式必须为jpg、png、jpeg、bmp！")
            }
        } else {
            // prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
            return;
        }
    }
</script>
</body>
</html>