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
    <meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  	<link rel="stylesheet" href="http://www.vxuebao.com/view/css/vxuebao-5.4.2.min.css?v=201703071554"/>
<!--     <link rel="stylesheet" type="text/css" href="/view/css/font.css"> -->
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
    <script> var  your_demain='<?php if(strpos("http://",C("site_url"))!==false)echo "http://"; echo rtrim(C("site_url"),"/") ?>';
   var  your_webname='<?php echo C("site_name") ?>';
   var  logo_url='<?php echo C("site_name") ?>';
     var  lastpagelink='<?php echo C("lastpagelink") ?>';
	 var lastpagetext_color='<?php echo C("lastpagetext_color") ?>';
    var  lastpagetext='<?php echo C("lastpagetext") ?>';
	var jubao_link='<?php echo C("jubao_link") ?>';
   </script>
    <?php if(($type) != "1"): ?><style>
        .loadbg {position: absolute; top: -5px; left:-3px; z-index: 1000; width: 100px; height: 100px; background: url(/Public/css/images/loading.png) no-repeat; background-size: 100%; 
                 -webkit-animation:loading 1.5s linear infinite;animation:loading 1.5s linear infinite} 
        @-webkit-keyframes loading{ 0%{ -webkit-transform:rotate(0)} 100%{ -webkit-transform:rotate(360deg)} } 
        @-moz-keyframes loading{ 0%{ -moz-transform:rotate(0)} 100%{ -moz-transform:rotate(360deg)} }
        .loadlogo { margin: 11px auto; width: 90px; height: 90px; border-radius: 50%; background-position: center center; background-size: cover; background-repeat: no-repeat; background-image: url('Uploads/<?php if($sceneinfo[loadinglogo]): echo ($sceneinfo[loadinglogo]); else: echo ($confinfo2[imgsrc]); endif; ?>');}
        #linkad {visibility: hidden;}
    
    </style><?php endif; ?>


    <!--修改开始-->
    <link href="Public/eq/5.4/layer/skin/layer.css" rel="stylesheet">
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
<body>
<div id="shareImage" style="display: none;">
    <img src="Uploads/<?php echo ($confinfo2[imgsrc]); ?>?v=20160713" />
</div>
<div class="bg_white"></div>
<div id="ppitest" style="width:1in;visible:hidden;padding:0px"></div>
<div class="p-index main phoneBox" id="con" style="display: none;">
    <div class="top"></div>
    <div class="phone_menubar"></div>
    <div class="scene_title_baner" style="display: none">
        <div class="scene_title"><?php echo ($confinfo2[title]); ?></div>
    </div>
    <div class="nr" id="nr">
        <div id="audio_btn" class="off">
            <div id="yinfu"></div>
            <audio loop src="" id="media" autoplay="" preload></audio>
        </div>
        <!-- 弹幕 -->
        <div id="zimu" class="open"></div>
        <div id="tanmubut" style="display:none"></div>  
        <div class="buttomcontent" id="sent" style="display:none">
            <input type="text" class="inputip" style="border-radius: 5px;" placeholder="请输入评论" id="pltext" maxlength="30"check-count="10">
            <!-- <input type="button" value="发送" class="fasong" style="border-radius:5px;" id="sendContent"> -->
            <a onMouseOver="this.style.backgroundColor='#13b9af';this.style.color='#fff'" onMouseOut="this.style.backgroundColor='#19ded2'" class="fasong" style="border-radius:5px;position: absolute;line-height: 27px;margin-left: 3px;" id="sendContent">发送</a>
        </div>
        <div id="zimupanel" class="zmpanel" style="display:none;top:0px;">
          <div id="zimuarea" class="mask" style="height:200px"></div>
         
            <!-- <div id="sent" class="sentb" style="margin-top:40px;display:block;">
              <input type="text"  ><br/>
              <input type="button" class="btn btn-success"  value="发送弹幕" >
              
            </div> -->
        </div>
            <!-- 弹幕 -->
        <div id="loading" class="loading">
            <div class="loadbox">
                <div class="loadlogo"></div>
                <div class="loadbg"></div>
            </div>
        </div>
        <?php if($sceneinfo['accesscode']): ?>
         <div id="verifyCode" class="verifyCode">
            <div class="container">
                <div class="scene-cover">
                    <img class="cover-img" src="Uploads/<?php echo ($confinfo2[imgsrc]); ?>?v=20160713" />
                </div>
                <div class="scene-name"><?php echo ($confinfo2[title]); ?></div>              
        
                <div class="confirm-password">
                    <label class="verify-label" for="password">请输入访问密码</label>
                    <div class="verify-tips" id="verifyTip">
                        <ul class="password-indicator">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="password-numbers">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>0</span>
                    </div>
                    <div class="password-operation">
                        <span class="btn-clear" id="btnClear">清空</span>
                        <span class="btn-cancel" id="btnCancel">取消</span>
                    </div>
                </div>
            </div>
        </div>
        <?php endif; ?>
    </div>
    <div class="bottom"><span class="scene_descript" style="visibility: hidden;"></span></div>
</div>
<div id="mainBox-left">
    <div id="user">
        <div id="userlogo" style="  height: 140px;width: 140px;overflow: hidden;">
            <img src="Uploads/<?php echo ($confinfo2[imgsrc]); ?>" alt="用户头像">
        </div>
        <div id="pageinfo">
            <h3><?php echo ($confinfo2[title]); ?></h3>
            <p><?php echo ($confinfo2[desc]); ?></p>
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
    <b id="close" style="border:0px;"><img src="view/images/close.png" style="height:30px;width:30px;"></b>
    <div class="black-bg"></div>
    <div id="horizon-screen-box">
        <div id="conbox"></div>
        <div class="miniPageElli"></div>
    </div>
</div>

<?php if(($type) == "0"): ?><style>
#scenead{display: none;}
</style><?php endif; ?>
</body>
<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

    <script src="Public/css/waiwan/jquery.min.js"></script>
<script >
 (function (window, $) {
   window.PREFIX_URL = "http://"+window.location.host+"/";
    window.PREFIX_S1_URL =  "http://"+window.location.host+"/";//"/json/";
    window.PREFIX_S2_URL ="http://"+window.location.host+"/index.php";
    window.PREFIX_HOST = "http://"+window.location.host+"/index.php";
    window.PREFIX_HOST1 = "http://"+window.location.host+"/index.php";
    window.PREFIX_FILE_HOST = "http://"+window.location.host+"/Uploads/";
    window.CLIENT_CDN ="http://"+window.location.host+"/"; 
   window.clientWidth = document.documentElement.clientWidth;
    window.clientHeight = document.documentElement.clientHeight;    
       
})(window, jQuery)
</script>

<script type="text/javascript" src="/Public/eq/5.4/js/vxuebao-5.4.2_view.js?v=20171206"></script>
<!-- <script type="text/javascript" src="/Public/eq/5.4/js/vxuebao-5.4.2_view.js?v=201705311346"></script> -->



   
<script>
 
	var scene = {id:"<?php echo ($confinfo2[workid]); ?>",code:"<?php echo ($sceneinfo['scenecode_varchar']); ?>",pageMode:<?php echo ($sceneinfo['movietype_int']); ?>,cover:"<?php echo ($sceneinfo[cover]); ?>",diyname:"<?php echo ($diyname); ?>"};
	   <?php if($sceneinfo['accesscode']): ?>
      eqShow.bootstrapWithPassword(); 
	   <?php else: ?>
	 eqShow.bootstrap();
         //setTimeout("eqShow.bootstrap()",22000000);
	   <?php endif; ?>
	
</script>
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
<div style="display:none"><script src="https://s95.cnzz.com/stat.php?id=1258616548&web_id=1258616548" language="JavaScript"></script></div>
    <!--修改开始-->
    <script src="Public/eq/5.4/layer/layer.js"></script>
    <script src="Public/eq/5.4/layer/extend/layer.ext.js"></script>
    <script type="text/javascript">
        layer.config({
            extend: 'extend/layer.ext.js'
        });
    </script>
    <!--修改结束-->
</html>