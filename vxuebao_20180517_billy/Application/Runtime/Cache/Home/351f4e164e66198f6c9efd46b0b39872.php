<?php if (!defined('THINK_PATH')) exit();?>
<!DOCTYPE html>
<html lang="en"><head>
        <meta charset="utf-8" />
        <title><?php echo ($confinfo2[title]); ?></title>
        <meta id="eqMobileViewport" name="viewport" content="width=320, initial-scale=1, maximum-scale=1, user-scalable=no" servergenerated="true">
        <meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="view/css/vxuebao-5.4.3.css"/>
        <script> var your_demain = '<?php if(strpos("http://",C("site_url"))!==false)echo "http://"; echo rtrim(C("site_url"),"/") ?>';
            var your_webname = '<?php echo C("site_name") ?>';
            var logo_url = '<?php echo C("site_name") ?>';
            var lastpagelink = '<?php echo C("lastpagelink") ?>';
            var lastpagetext_color = '<?php echo C("lastpagetext_color") ?>';
            var lastpagetext = '<?php echo C("lastpagetext") ?>';
            var jubao_link = '<?php echo C("jubao_link") ?>';
        </script>
        <style>/*.scene_title_baner {visibility: hidden;}*/</style>  
    <?php if(($type) != "1"): ?><style>
        .loadbg {position: absolute; top: -5px; left:-3px; z-index: 1000; width: 100px; height: 100px; background: url(view/images/loading.png) no-repeat; background-size: 100%; 
                 -webkit-animation:loading 1.5s linear infinite;animation:loading 1.5s linear infinite} 
        @-webkit-keyframes loading{ 0%{ -webkit-transform:rotate(0)} 100%{ -webkit-transform:rotate(360deg)} } 
        @-moz-keyframes loading{ 0%{ -moz-transform:rotate(0)} 100%{ -moz-transform:rotate(360deg)} }
        .loadlogo { margin: 11px auto; width: 90px; height: 90px; border-radius: 50%; background-position: center center; background-size: cover; background-repeat: no-repeat; background-image: url('<?php if($sceneinfo[loadinglogo]): echo ($sceneinfo[loadinglogo]); else: echo ($confinfo2[imgsrc]); endif; ?>');}
        #linkad {visibility: hidden;}
    </style><?php endif; ?>

    <!--修改开始-->
    <link href="assets/Js/layer/skin/layer.css" rel="stylesheet">
    <!--修改结束-->
    <script type="text/javascript">
        var browser=navigator.appName 
        var b_version=navigator.appVersion 
        var version=b_version.split(";"); 
        var trim_Version=version[1].replace(/[ ]/g,""); 
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"){ 
            alert("您的浏览器版本为IE 6.0，请更换IE9及以上的浏览器，或者选择chrome、火狐等浏览器打开"); 
        }else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0"){ 
            alert("您的浏览器版本为IE 7.0，请更换IE9及以上的浏览器，或者选择chrome、火狐等浏览器打开"); 
        }else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){ 
            alert("您的浏览器版本为IE 8.0，请更换IE9及以上的浏览器，或者选择chrome、火狐等浏览器打开"); 
        } 
    </script>
    </head>
       <body style="background-image:url("view/images/bg_Oly.jpg");">
        <div class="bg_white"></div>
        <div id="ppitest" style="width:1in;visible:hidden;padding:0px"></div>
        <div class="p-index main phoneBox" id="con" style="display: none;">
            <!-- <div class="top"></div>
            <div class="phone_menubar"></div>
            <div class="scene_title_baner" style="display: none">
                <div class="scene_title">导出包测试2</div>
            </div> -->
            <div class="nr" id="nr">
                <div id="audio_btn" class="off">
                    <div id="yinfu"></div>
                    <audio loop src="" id="media" autoplay="" preload></audio>
                </div>
                <div id="loading" class="loading">
                    <div class="loadbox">
                        <div class="loadlogo"></div>
                        <div class="loadbg"></div>
                    </div>
                </div>

            </div>
            <!-- <div class="bottom"></div> -->
            <div id = "screen_panel">
                <span id="shuping" class="view_contrl">竖屏观看</span>
                <span id="hengping" class="view_contrl">横屏观看</span>
            </div>
            <div class="ctrl_panel">
                <a id="pre_page" type="button" class="pre_btn btn btn5" onclick="eqxiu.prePage()"></a>
                <a id="next_page" type="button" class="next_btn btn btn5" onclick="eqxiu.nextPage()"></a>
            </div>
        </div>
         <div id="mainBox-left">
            <div id="user">
                <div id="userlogo">
                    <img src="view/images/default_thum.jpg" alt="用户头像">
                </div>
                <div id="pageinfo">
                    <h3></h3>
                    <p></p>
                    <div>原创 ：免费</div>
                </div>
            </div>
            <div id="author">
                <span class="author">作者：<i style="font-style: normal;"></i></span>
                <span class="readit">浏览量：<i style="font-style: normal;"></i></span>
            </div>
            <div class="miniPage"></div>
        </div>
        <div id="horizon-screen">
            <b id="close" >X</b>
            <div class="black-bg"></div>
            <div id="horizon-screen-box">
                <div id="conbox"></div>
                <div class="miniPageElli"></div>
            </div>
        </div>
<?php if(($isad) == "0"): ?><style>
#scenead{display: none;}
</style><?php endif; ?>
    </body>

    <script src="assets/Js/jquery.min.js"></script>
    <script type="text/javascript" src="assets/Js/qrcode.js"></script>
    <script type="text/javascript" src="assets/Js/jquery.qrcode.js"></script>
    <script >
            (function (window, $) {
                window.PREFIX_URL = "";
                window.PREFIX_S1_URL = "";
                window.PREFIX_S2_URL = "";
                window.PREFIX_HOST = "";
                window.PREFIX_HOST1 = "";
                window.PREFIX_FILE_HOST = "";
                window.CLIENT_CDN = "";
                window.clientWidth = document.documentElement.clientWidth;
                window.clientHeight = document.documentElement.clientHeight;

            })(window, jQuery)
                    window.jsondata = <?php echo ($jsondata); ?>;
    </script>
    <script type="text/javascript" src="assets/Js/vxuebao-5.4.2_view.js"></script>
<script type="text/javascript" src="assets/Js/APIWrapper.js"></script>
<script type="text/javascript" src="assets/Js/SCOFunctions.js"></script>
    <script>

            var scene = {id:<?php echo ($confinfo2[workid]); ?>, code:"<?php echo ($sceneinfo['scenecode_varchar']); ?>", pageMode:<?php echo ($sceneinfo['movietype_int']); ?>, cover:"<?php echo ($sceneinfo[cover]); ?>"};
            setTimeout("eqShow.bootstrap()",2200);
    </script>
    <!--修改开始-->
    <script src="assets/Js/layer/layer.js"></script>
    <script src="assets/Js/layer/extend/layer.ext.js"></script>
    <script type="text/javascript">
        layer.config({
            extend: 'extend/layer.ext.js'
        });
         window.onload = function(){
            var a = window.parent.document.getElementsByTagName('iframe').length;
            //平台、设备和操作系统 
            var system = { 
                win: false, 
                mac: false, 
                xll: false, 
                ipad:false 
            }; 
            //检测平台 
            var p = navigator.platform; 
            system.win = p.indexOf("Win") == 0; 
            system.mac = p.indexOf("Mac") == 0; 
            system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
            system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false; 
            //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面 
            if (system.win || system.mac || system.xll||system.ipad) { 
                if(self!=top){
                    if(a < 1){
                        return false;
                    }else{
                    document.getElementById("con").style.transform="scale(0.72)";
                    document.getElementById('mainBox-left').style.transform="scale(0.8)";
                    document.getElementById('screen_panel').style.display="none";
                    document.getElementById('horizon-screen').style.display="none";
                    document.getElementById('screen_panel').style.display="none";
                    document.getElementsByTagName("body")[0].style.backgroundColor="#fff";
                    document.getElementsByTagName("body")[0].style.backgroundSize="cover";
                    document.getElementById("con").style.left="486px";
                    document.getElementById("mainBox-left").style.left="377px";
                    document.getElementById("mainBox-left").style.top="271px";
                    document.getElementsByClassName('bg_white')[0].remove();
                    }
                }
            }
        <?php if($noqrcode==1){echo "$('#code').hide();";} ?>
        }
        <?php if($noqrcode==1){echo "$('#code').hide();";} ?>
    </script>

    <!--修改结束-->

</html>