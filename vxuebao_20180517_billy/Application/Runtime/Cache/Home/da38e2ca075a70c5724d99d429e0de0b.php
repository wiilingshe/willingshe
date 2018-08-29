<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en"><head>
    <meta charset="utf-8" />
    <meta name="baidu-site-verification" content="2MKKT6mbuL" />
        <title><?php echo ($confinfo2[title]); ?></title>
    <meta name="keywords" content="移动场景应用自营销管家,移动场景自营销管家,移动场景自营销工具,活动自营销管家,场景展示,免费的报名页,收集潜在客户,二次营销,轻CRM,提高移动场景营销效果" />
    <meta id="metaDescription" name="description" content="<?php echo ($confinfo2[desc]); ?>" />
    <META HTTP-EQUIV="pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-store, must-revalidate">
    <META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
    <META HTTP-EQUIV="expires" CONTENT="0">
    <meta id="eqMobileViewport" name="viewport" content="width=320, initial-scale=1, maximum-scale=1, user-scalable=no" servergenerated="true">
    <!--修改开始-->
    <link href="/Public/eq/5.4/layer/skin/layer.css" rel="stylesheet">
    <script type="text/javascript">
        function PCcheck()  {  
            var userAgentInfo = navigator.userAgent;  
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
            var flag = true;  
            for (var v = 0; v < Agents.length; v++) {  
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
            }  
            return flag;  
        }
        if(PCcheck()){
            var link = document.createElement("link");  
            link.rel = "stylesheet";  
            link.href = "/common/css/pcviewer.css";  
            document.head.appendChild(link);  
        }
         
    </script>
    <link rel="stylesheet" type="text/css" href="/view/css/longpage/transition.css">
    <link rel="stylesheet" type="text/css" href="/view/css/longpage/view.css">
    <!--修改结束-->
   <!--  <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="/Public/css/waiwan/jquery.min.js"></script>
    <script type="text/javascript" src="/common/js/jquery.qrcode.js"></script> -->
</head>
<body>
    <!-- container -->
    <div id="shareImage" style="display: none;">
        <img src="Uploads/<?php echo ($confinfo2[imgsrc]); ?>?v=20160713" />
    </div>
    <!-- <div id="code"style="display:none;"></div> -->
    <div class="viewer m-img" id="page1">
        <!-- 弹幕 -->
        <div id="zimu" class="open" style="display: none;"></div>
        <div id="tanmubut" style="display:none"></div>  
        <div class="buttomcontent" id="sent" style="display:none">
            <input type="text" class="inputip" style="border-radius: 5px;" placeholder="请输入评论" id="pltext" maxlength="30"check-count="10">
            <a onMouseOver="this.style.backgroundColor='#13b9af';this.style.color='#fff'" onMouseOut="this.style.backgroundColor='#19ded2'" class="fasong" style="border-radius:5px;position: absolute;line-height: 27px;margin-left: 3px;" id="sendContent">发送</a>
        </div>
        <div id="zimupanel" class="zmpanel" style="display:none;top:0px;">
            <div id="zimuarea" class="mask" style="height:200px"></div>
        </div>
        <!-- 弹幕 -->
        <div id="audio_btn" class="off">
            <div id="yinfu"></div>
            <audio loop src="" id="media" autoplay="" preload></audio>
        </div>
        <div class="nr" id="con" style="  height: 100%;"></div>
    </div>
    <div id="user" style="display: none;">
        <div id="userlogo">
            <img src="Uploads/<?php echo ($confinfo2[imgsrc]); ?>" alt="用户头像">
        </div>
        <div id="pageinfo">
            <h3><?php echo ($confinfo2[title]); ?></h3>
            <p><?php echo ($confinfo2[desc]); ?></p>
            <div>原创 ：免费</div>
        </div>
    </div>
    <div id="author" style="display: none;">
        <span class="author">作者：<i style="font-style: normal;"></i></span>
        <span class="readit">浏览量：<i style="font-style: normal;"></i></span>
    </div>
    <!-- <div id="support">技术支持 BY <a target="_blank" href="http://www.vxuebao.com"><img id="logoSmall" src="http://www.vxuebao.com/view/images/logobai.png"></a></div> -->
    <!-- container -->
    <script>
 
    var scene = {id:"<?php echo ($confinfo2[workid]); ?>",code:"<?php echo ($sceneinfo['scenecode_varchar']); ?>",pageMode:<?php echo ($sceneinfo['movietype_int']); ?>,cover:"<?php echo ($sceneinfo[cover]); ?>",diyname:"<?php echo ($diyname); ?>"};
       <?php if($sceneinfo['accesscode']): ?>
      eqShow.bootstrapWithPassword(); 
       <?php else: ?>
         //setTimeout("eqShow.bootstrap()",22000000);
       <?php endif; ?>
    
</script>
    <script >
        //(function (window, $) {
            window.PREFIX_URL = "http://"+window.location.host+"/";
            window.PREFIX_S1_URL =  "http://"+window.location.host+"/";//"/json/";
            window.PREFIX_S2_URL ="http://"+window.location.host+"/index.php";
            window.PREFIX_HOST = "http://"+window.location.host+"/index.php";
            window.PREFIX_HOST1 = "http://"+window.location.host+"/index.php";
            window.PREFIX_FILE_HOST = "http://"+window.location.host+"/Uploads/";
            window.CLIENT_CDN ="http://"+window.location.host+"/"; 
            window.clientWidth = document.documentElement.clientWidth;
            window.clientHeight = document.documentElement.clientHeight;    
        //})(window, jQuery)
    </script>
    <script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript" src="/vendor/iscroll/build/iscroll.js"></script>
    <script src="/Public/eq/longView/require.min.js" data-main="/Public/eq/longView/main.js"></script>
<script> var  your_demain='<?php if(strpos("http://",C("site_url"))!==false)echo "http://"; echo rtrim(C("site_url"),"/") ?>';
   var  your_webname='<?php echo C("site_name") ?>';
   var  logo_url='<?php echo C("site_name") ?>';
     var  lastpagelink='<?php echo C("lastpagelink") ?>';
     var lastpagetext_color='<?php echo C("lastpagetext_color") ?>';
    var  lastpagetext='<?php echo C("lastpagetext") ?>';
    var jubao_link='<?php echo C("jubao_link") ?>';
   </script>
<?php if(($type) == "0"): ?><style>
#scenead{display: none;}
</style><?php endif; ?>
    <script>
          wx.config({
              debug: false,
              appId: '<?php echo ($confinfo[appId]); ?>',
              timestamp: "<?php echo ($confinfo[timestamp]); ?>",
              nonceStr: '<?php echo ($confinfo[nonceStr]); ?>',
              signature: '<?php echo ($confinfo[signature]); ?>',
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
              ]
          });
          wx.ready(function () {
              var shareData64 = {
                title: '<?php echo ($confinfo2[title]); ?>',
                desc: '<?php echo ($confinfo2[desc]); ?>',
                link: window.location.href,
                imgUrl:  PREFIX_FILE_HOST  +'<?php echo ($confinfo2[imgsrc]); ?>'
              };
              wx.onMenuShareAppMessage(shareData64);
              wx.onMenuShareTimeline(shareData64);

          });
          
          
        wx.error(function (res) {
            //alert(res.errMsg);
        });
        </script>
     <!-- <script type="text/javascript" src="/Public/eq/longView/js/view.js"></script>
   <script src="/Public/eq/5.4/layer/layer.js"></script>
    <script src="/Public/eq/5.4/layer/extend/layer.ext.js"></script>

    <script type="text/javascript">
        layer.config({
            extend: 'extend/layer.ext.js'
        });
    </script> -->
</body>
</html>