var BASE_URL = "/Public/eq/6.0/";
var IS_DEBUG = true;
require.config({
    baseUrl:"/Public/eq/dist/",
    //配置angular的路径
    paths:{
        "qrcode":"/Public/js/qrcode",
        "jq-qrcode":"/Public/js/jquery.qrcode",
        "jquery":"/Public/js/jquery.min",
        "jquery-ui":"/Public/js/jquery-ui.min",
        "jquery-jcrop":"/Public/js/jquery.Jcrop.min",
        "angular":"/Public/js/angular", 
        "uiRouter":"/Public/js/angular-ui-router",
        "WebUploader":"/Public/js/webuploader",
        "ocLazyLoad": "/Public/js/ocLazyLoad.require.min",
        "angular-animate":"/Public/js/angular-animate.min",
        "angular-sanitize":"/Public/js/angular-sanitize.min",//ng-bind-html
        "angular-ui-bootstrap":"/Public/js/angular-ui-bootstrap",
        "angular-ui-select":"/Public/js/select.min",
        "angular-ui-sortable":"/Public/js/sortable",//拖拽
        "bootstrap":"/Public/js/bootstrap.min",
        "Chart":"/Public/js/Chart.min",
        "hammer":"/Public/js/hammer",
        "angular-translate":"/Public/js/angular-translate.min",//翻译语言
        "angular-translate-loader-static-files":"/debug/js/angular-translate-loader-static-files.min",
        "html2canvas":"/Public/js/html2canvas.min",//base64图片
        "angular-ui-grid":"/vendor/angular-ui-grid/ui-grid.min",//网格
        "bootstrap-wysiwyg":"/vendor/others/bootstrap-wysiwyg",//文字编辑选择框，字体大小，字体颜色等
        "jquery-hotkeys":"/vendor/others/jquery.hotkeys.min",//快捷键
        "angular-file-upload":"/vendor/others/angular-file-upload.min",//文件上传
        "angular-file-upload-directives":"/vendor/others/angular-file-upload-directives.min",//文件上传
        "es5-shim":"/vendor/others/es5-shim.min",//让一些低级的浏览器支持最新的ecmascript5的一些特性
        "es5-sham":"/vendor/others/es5-sham.min",//让一些低级的浏览器支持最新的ecmascript5的一些特性, 与es5-shim一起使用
        "console-sham":"/vendor/others/console-sham.min",
        "angular-locale_zh-cn":"/vendor/others/angular-locale_zh-cn.min",
        "ZeroClipboard":"/vendor/others/ZeroClipboard",//复制功能
        "iscroll":"/vendor/iscroll/build/iscroll",
        "jquery-ui-panch":"/vendor/jquery-ui-panch/jquery.ui.touch-punch.min",
        "jquery-slider":"/index/js/jquery.slider",
        "jpages":"/index/js/jpages.min",//分页
        "lazyload":"/index/js/jquery.lazyload",
        "jwplayer":"/index/js/jwplayer",
        "common_v":"/index/js/common_v",
        "scrop":"/index/js/scrop",//裁剪
        "echarts":"/index/js/echarts.min"
    },
    /**
      * 垫片书写注意
      * 一般在router中只书写一个file文件作为种子启动文件
      * shim垫片中需要书写每个JS间的依赖关系，例子："controllers/active":["angular","services/active"]
      * 如果css也进行模块化的话，也可以作为模块化样式加入，书写格式为[css!]+[css相对baseUrl的路径]，例如：【css!module.css】
      */
    shim:{
        "jquery-ui":["jquery"],
        "jquery-jcrop":["jquery"],
        "angular":{
            deps:["jquery"],
            exports:"angular"
        },
        "ocLazyLoad": ["angular"],
        "ngRoute":["angular"],
        "uiRouter":["angular"],
        "angular-animate":["angular"],//无
        "angular-sanitize":["angular"],//无
        "angular-ui-bootstrap":["angular"],
        "angular-ui-select":["angular","angular-ui-bootstrap"],
        "angular-ui-sortable":["angular"],
        "angular-translate":["angular"],
        "angular-translate-loader-static-files":["angular","angular-translate"],
        "bootstrap":["jquery"],
        "hammer":{
            exports:"Hammer"
        },
        "layer":{
            deps:["jquery"],
            exports:"layer"
        },
        "layer-extend":{
            deps:["layer"],
            exports:"layer.prompt"
        },
        "angular-ui-grid":["angular"],
        "bootstrap-wysiwyg":["bootstrap"],
        "jquery-hotkeys":["jquery"],
        "angular-file-upload":["angular"],
        "angular-file-upload-directives":["angular"],
        "console-sham":{
            exports:"console"
        },
        "angular-locale_zh-cn":["angular"],
        "iscroll":{
            exports:"IScroll"
        },
        "jquery-ui-panch":["jquery"],
        "jquery-slider":["jquery"],
        "jpages":["jquery"],
        "lazyload":["jquery"],
        "jwplayer":{
            exports:"jwplayer"
        },
        "common_v":["jquery"],
        "scrop":["jquery","lazyload","jpages","common_v"],
        "router": ["angular","uiRouter","ocLazyLoad","controllers/app"],
        
        "controllers/active":["angular","services/security.service"],
        "controllers/formController2":["jquery","jquery-ui","qrcode","jq-qrcode","jquery-jcrop"],
        "controllers/app":["angular","jquery","uiRouter","ocLazyLoad","angular-translate","angular-translate-loader-static-files","services/security.service","services/security.authorization","angular-ui-select","services/config","services/i18nNotifications","services/usercenter","directives/app.rightclick","angular-translate-loader-static-files"],
        "controllers/customer.group":["angular","services/data", "services/i18nNotifications"],
        "controllers/dialog":["angular"],
        "controllers/error":["angular"],
        "controllers/home":["angular","services/config","services/sample","services/security.service","services/staticRes",/*"services/security.thirdparty","services/home",*/"directives/home","jquery-slider"],
        "controllers/main.data":["angular","directives/app.dataDraggable", "controllers/customer.group", "services/i18nNotifications", "directives/app.customer","services/modal","angular-ui-bootstrap","jquery-ui","directives/common.dropDown"],
        "controllers/main.data.edit":["angular","services/usercenter", "services/i18nNotifications","services/modal","services/data"],
        "controllers/main":["angular","services/mine","services/data","services/services.configSer","directives/app.pageTplTypes","services/staticRes","directives/app.addelement","services/usercenter","services/i18nNotifications","directives/common.scroll","services/scene","services/modal","services/spread","controllers/userCenter.userGuide",/*"controllers/main.userGuide",*/"directives/common.dropDown","directives/app.qrcode","ocLazyLoad"],
        "controllers/main.transferScene":["angular",/*"services/usercenter",*/"services/scene"],
        /*"controllers/main.userGuide":["angular"],*/
        "controllers/nav":["angular","services/services.show","services/staticRes"],
        "controllers/sample":["angular","jquery",/*"services/security.service",*/"services/sample","services/staticRes","directives/app.addelement","directives/app.qrcode"],
        "controllers/scene.create.console.imageCrop":['angular',"services/scene.create.console.imageCrop","directives/scene.create.console.all"],
        
        //压缩修改5，合并scene.create.js
        "controllers/scene.create.console.setting":["angular",,"directives/app.uislider", "directives/app.limitInput","directives/colorpicker", "directives/app.style","directives/app.uislider", "directives/app.limitInput", "services/history","services/scene.edit.trigger"],
        "controllers/scene.create.console.pictures":["angular","services/file"],

        //压缩修改1，合并scene.create.console.js
        "controllers/scene.create.console":["angular","qrcode","jq-qrcode","services/file","services/file.upload","services/i18nNotifications","services/scene.create.console.imageCrop","services/scene","services/scene.create.console.pictures1","services/scene.create.console.scene-setting-component","services/history","services/scene.edit.trigger","services/scene.create.console.shape","services/scene.create.console.sound","directives/app.responsiveImage","directives/app.rightclick","directives/app.autoclose","directives/app.comp.editor","directives/app.addelement","directives/common.inputColor", "directives/app.style","directives/app.uislider","directives/app.uislider", "directives/app.limitInput","directives/colorpicker","directives/scene.create.console.all","filters/scene.create.console.sound","angular-file-upload","WebUploader","controllers/scene.create.console.setting"],


        "controllers/scene.create":["angular","angular-ui-sortable","directives/scene.create","plugins/flux","directives/app.component","services/file.upload","services/scene.preview"],
        "controllers/scene.create.longpage":["angular","angular-ui-sortable","directives/scene.create","plugins/flux","directives/app.component","services/file.upload","services/scene.preview"],

        "controllers/scene.create.pageTpl":["angular","services/pagetpl"],
        "controllers/scene.create.new":["angular","services/scene", "services/staticRes"],
        "controllers/scene.create.userGuide":["angular"],

        "controllers/scene":["angular","services/scene","services/staticRes","directives/app.addelement","ocLazyLoad"],
        "controllers/scene.edit.bg":["angular","services/scene", "services/history"],
        "controllers/scene.edit.select":["angular","services/scene", "services/history"],
        "controllers/scene.my.upload":["angular","angular-file-upload"],
        "controllers/scene.myscene":["angular","services/scene", "services/mine", "services/data", "directives/scene.create.console", "directives/app.addelement", "services/usercenter", "directives/app.qrcode", "services/i18nNotifications"],
        
        //压缩修改6，合并scene.pageeffect.js
        "controllers/scene.pageeffect":["angular","plugins/fallingObject","directives/common.inputNumber", "filters/scene.pageeffect.console"],
        
        "controllers/security.login.form":["angular","services/localizedMessages","directives/app.addelement","services/security.thirdparty","services/dataCache"],
        "controllers/security.login.reset":["angular","services/localizedMessages"],
        "controllers/security.otherregister.form":["angular","services/localizedMessages","directives/app.register"],
        "controllers/security.register.form":["angular","services/localizedMessages","directives/app.register"],
        "controllers/security.register":["angular","controllers/security.register.form","controllers/security.otherregister.form"],

        "controllers/show":["angular","services/services.show","services/services.activity","directives/app.addBanner","services/config","services/services.configSer","services/security.service"],
        "controllers/show.active":["angular","services/services.show","services/services.activity","directives/app.addBanner","services/config","services/services.configSer","services/security.service"],
        "controllers/show.activexq":["angular","services/services.show","services/services.activity","directives/app.addBanner","services/config","services/services.configSer","services/security.service"],
        "controllers/show.search":["angular","services/services.show","services/services.activity","directives/app.addBanner","services/config","services/services.configSer","angular-translate","services/security.service"],
        "controllers/show.category":["angular","services/services.show","services/services.activity","directives/app.addBanner","angular-translate","services/security.service"],
        "controllers/show.recommend":["angular","services/services.show","services/services.activity","services/config","angular-translate","services/security.service"],
        "controllers/show.visitor":["angular","services/services.show","services/services.vistor","services/usercenter","services/security.service"],
        "controllers/show.visitorxq":["angular","services/services.show","angular-translate","services/services.vistor","services/security.service"],

        "controllers/spread":["angular","directives/app.pieChart", "directives/app.numChangeAnim", "controllers/spread.tab", "directives/app.qrcode", "directives/app.switchInput", "directives/app.copyButton", "directives/app.spread.console","services/mine","services/data","services/scene.preview"],
        "controllers/spread.share.domainBind":["angular","services/usercenter", "services/i18nNotifications"],
        "controllers/spread.share":["angular","controllers/spread.share.socialShare", "controllers/spread.share.expandWeb", "controllers/spread.share.domainBind", "controllers/spread.share.siteImport"],
        "controllers/spread.share.siteImport":["angular","services/scene"],
        "controllers/spread.share.socialShare":["angular","directives/app.disableKeydown","services/scene.create.console.scene-setting-component"],
        "controllers/spread.statistics":["angular","directives/spread.statistics"],
        "controllers/spread.tab":["angular","controllers/spread.share","controllers/spread.statistics","controllers/spread.dataCollect"],
        
        
        //压缩修改3，合并usercenter.js
       /*"controllers/usercenter":["angular","directives/app.addelement", "services/usercenter","services/security.service","services/modal","angular-translate","services/i18nNotifications","directives/app.qrcode","services/localizedMessages","services/security.thirdparty","services/file","services/mine","services/scene","services/dataCache"],
        "controllers/userCenter.userGuide":["angular"],*/
        /*"controllers/usercenter":["angular","directives/app.addelement", "services/usercenter","services/security.service","services/modal","angular-translate","services/i18nNotifications","directives/app.qrcode","services/localizedMessages","services/security.thirdparty","services/file","services/mine","services/scene","services/dataCache","controllers/usercenter.console"],
        "controllers/usercenter.console":["angular","services/usercenter","services/i18nNotifications","angular-translate","services/security.service","services/modal"],*/
        /*"controllers/usercenter":["angular","services/usercenter", "services/localizedMessages", "services/security.service", "directives/app.addelement", "services/modal", "services/i18nNotifications", "services/security.thirdparty","controllers/usercenter.console"],
        "controllers/usercenter.console":["angular","services/usercenter","services/i18nNotifications","angular-translate","services/security.service","services/modal","services/localizedMessages","services/security.thirdparty","services/mine","services/scene","services/dataCache"],
        "controllers/userCenter.userGuide":["angular"],*/
        /**/"controllers/usercenter":["angular","controllers/usercenter.transfer", "controllers/usercenter.upgrade", "controllers/usercenter.request", "services/usercenter", "services/localizedMessages", "services/security.service", "directives/app.addelement", "services/modal", "controllers/usercenter.relAccount", "controllers/usercenter.branch", "services/i18nNotifications", "services/security.thirdparty", "controllers/usercenter.branch.reset", "controllers/usercenter.checkMobil","controllers/usercenter.relRegisterAccount", "controllers/userCenter.userGuide", "controllers/usercenter.tab", "controllers/usercenter.privilege"],
        "controllers/usercenter.transfer": ["angular","services/usercenter","services/security.service","services/modal","angular-translate"],
        "controllers/usercenter.upgrade":["angular","services/usercenter","services/security.service","services/i18nNotifications","services/modal"],
        "controllers/usercenter.request":["angular","services/usercenter","directives/app.qrcode","services/security.service","services/modal"],
        "controllers/usercenter.relAccount":["angular","services/usercenter","services/i18nNotifications","services/security.service","services/modal"],
        "controllers/usercenter.branch":["angular","services/usercenter","services/i18nNotifications","angular-translate","services/security.service","services/modal"],
        "controllers/usercenter.branch.reset":["angular","services/usercenter","services/i18nNotifications","services/security.service","services/modal"],
        "controllers/usercenter.checkMobil":["angular","services/usercenter","services/i18nNotifications","angular-translate","services/security.service","services/modal"],
        "controllers/usercenter.relRegisterAccount":["angular","services/usercenter","services/i18nNotifications","services/security.service","angular-translate","services/modal","services/localizedMessages"],
        "controllers/usercenter.tab":["angular","controllers/usercenter.account", "controllers/usercenter.member", "controllers/usercenter.trash", "controllers/usercenter.apply", "controllers/usercenter.companyinfo", "controllers/usercenter.invoice", "controllers/usercenter.invoicelist"],
        "controllers/usercenter.member":["angular","services/usercenter","services/modal"],
        "controllers/usercenter.account":["angular","controllers/usercenter.relEmail","services/usercenter","services/i18nNotifications","services/security.service","services/modal","angular-translate","services/security.thirdparty"],
        "controllers/usercenter.trash":["angular","services/usercenter","services/modal","angular-translate","services/file","services/mine","services/scene","services/dataCache"],
        "controllers/usercenter.apply":["angular","services/usercenter","services/i18nNotifications","services/modal","services/mine","angular-translate"],
        "controllers/usercenter.companyinfo":["angular","services/usercenter","services/i18nNotifications","services/modal"],
        "controllers/usercenter.invoice":["angular","services/usercenter","services/i18nNotifications","services/modal"],
        "controllers/usercenter.invoicelist":["angular","services/usercenter","services/modal"],
        "controllers/usercenter.privilege":["angular","services/usercenter","services/security.service","services/modal"],
        "controllers/userCenter.userGuide":["angular"],

        "controllers/common.dropDown":["angular"],
        "controllers/message":["angular","directives/common.dropDown", "angular-ui-bootstrap"],
        "controllers/invitation":["angular","services/usercenter","services/security.service","directives/app.copyButton","services/modal","services/i18nNotifications"],

        "controllers/homePage":["angular","services/mine","services/data","services/services.configSer","directives/app.pageTplTypes","services/staticRes","directives/app.addelement","services/usercenter","services/i18nNotifications","directives/common.scroll","services/scene","services/modal","services/spread","controllers/userCenter.userGuide",/*"controllers/main.userGuide",*/"directives/common.dropDown","directives/app.qrcode","ocLazyLoad","services/security.service","angular-translate","services/localizedMessages","services/security.thirdparty","services/file","services/scene","services/dataCache","directives/scene.create.console","controllers/scene","controllers/scene.create.new","controllers/usercenter.transfer","controllers/usercenter","controllers/main.transferScene"],
        
        "directives/app.addBanner":["angular","services/services.configSer","jquery-slider"],
        "directives/app.addelement":["angular","jquery","plugins/slides","iscroll"],
        "directives/app.comp.editor":["angular"],
        "directives/app.component":["angular","services/scene","services/select","controllers/scene.create.console.pictures","hammer","plugins/utilPictures","plugins/flux"],
        "directives/app.customer":["angular","jquery-ui"],
        "directives/app.editor":["angular","plugins/utilFont"],
        "directives/app.keymap":["angular",],
        "directives/app.limitInput":["angular"],
        "directives/app.lineChart":["angular"],
        "directives/app.loading":["angular"],
        "directives/app.notification":["angular"],
        "directives/app.pageTplTypes":["angular"],
        "directives/app.pieChart":["angular"],
        "directives/app.qrcode":["angular","plugins/qrcode"],
        "directives/app.register":["angular"],
        "directives/app.responsiveImage":["angular"],
        "directives/app.rightclick":["angular"],
        "directives/app.copyButton":["angular"],
        "directives/common.dropDown":["angular","controllers/common.dropDown","plugins/regexp"],
        "directives/common.scroll":["angular"],
        "directives/home":["angular"],
        "directives/ng-iscroll":["angular","iscroll"],
        


        "directives/scene.create.console.setting":["angular","controllers/scene.create.console.setting"],
        "directives/scene.create.console.all":["angular","services/scene.create.console.sound","services/scene.create.console.shape","directives/scene.create.console.setting","services/scene.create.console.scene-setting-component","services/scene.create.console.pictures1","services/scene.create.console.imageCrop","jquery-jcrop","services/scene"],

        //压缩修改2，重写依赖
        "directives/scene.create.console":["angular","controllers/scene.create.console","controllers/scene.pageeffect","directives/scene.create.console.setting"],
                                            
        
        "directives/scene.create":["angular","controllers/save.template","controllers/scene.my.upload","directives/scene.create.hoverElement","controllers/scene.userGuide","controllers/scene.edit.bg","controllers/scene.support","controllers/scene.edit.select","services/scene","services/modal","services/pagetpl","services/scene","services/dataCache","directives/app.component","directives/scene.create.console","directives/app.comp.editor","directives/app.addelement","directives/scene.preview","directives/common.dropDown","directives/common.scroll","directives/scene.edit.keymaps","directives/scene.edit.common","directives/app.editor","jquery-ui","plugins/regexp","plugins/eqxCommon","bootstrap-wysiwyg","angular-ui-bootstrap"],
        "directives/scene.edit.common":["angular","services/scene", "services/history", "services/select","html2canvas"],
        "directives/scene.edit.keymaps":["angular","services/scene", "services/history", "services/select","jquery-hotkeys"],
        "directives/scene.preview":["angular","services/scene.preview"],
        
        "directives/security.login.reset":["angular","controllers/security.login.reset"],
        "directives/security.login.toolbar":["angular"],
        "directives/spread.statistics":["angular","services/spread", "directives/app.lineChart", "directives/app.pieChart", "directives/app.numChangeAnim","echarts"],
        
        "filters/scene.create.console.sound":["angular","services/scene.create.console.sound"],
        "filters/scene.pageeffect.console":["angular"],

        
        "plugins/completeEffect":["jquery","plugins/regexp"],
        "plugins/eqshow":["jquery","plugins/flux","plugins/regexp"],
        "plugins/flux":["jquery"],
        "plugins/qrcode":["jquery"],
        "plugins/slides":["jquery"],
        "plugins/eqxiu":["jquery","plugins/regexp"],
        "plugins/snowFly":["jquery","plugins/three"],
        "plugins/utilSound":["jquery"],
        "plugins/utilTrigger":{
            exports:"utilTrigger"
        },
        "plugins/eqxiu":["jquery","plugins/regexp"],
        "plugins/fallingObject":["plugins/eqshow"],
        
        "services/active":["angular"],
        "services/config":["angular"],
        "services/data":["angular"],
        "services/dataCache":["angular"],
        "services/file":["angular","services/i18nNotifications", "services/staticRes","services/dataCache"],
        "services/file.upload":["angular","angular-file-upload", "services/file"],
        "services/history":["angular"],
        "services/home":["angular","directives/home"],
        "services/I18N.MESSAGES":["angular"],
        "services/i18nNotifications":["angular","services/localizedMessages","services/notifications"],
        "services/localizedMessages":["angular","services/I18N.MESSAGES"],
        "services/mine":["angular"],
        "services/modal":["angular","controllers/dialog"],
        "services/notifications":["angular"],
        "services/sample":["angular"],
        
        "services/scene.create.console.imageCrop":["angular","services/file"],
        "services/scene.create.console.pictures1":["angular","services/file"],
        "services/scene.create.console.scene-setting-component":["angular","services/pagetpl"],
        "services/scene.create.console.shape":["angular","plugins/eqxiuSvg"],
        "services/scene.create.console.sound":["angular","services/file", "controllers/soundLink"],
        "services/scene.edit.trigger":["angular"],
        "services/scene":["angular","services/modal",/*"directives/scene.create.console",*/"services/select","services/history","services/scene.edit.trigger","controllers/scene.create.console.pictures","services/dataCache","plugins/eqshow","plugins/utilTrigger"],
        "services/scene.preview":["angular","services/scene","services/mine","services/data","plugins/eqxiu","plugins/utilSound","plugins/lockEffect","plugins/completeEffect","plugins/addScratchEffect","plugins/snowFly","plugins/money"],
        
        "services/security.authority":["angular","angular-translate"],
        "services/security.authorization":["angular","services/security.service","services/security.retryQueue"],
        "services/security.interceptor":["angular","services/security.retryQueue"],
        "services/security":["angular","services/security.service","services/security.interceptor","services/security.login","services/security.authorization"],
        "services/security.login":["controllers/security.login.form","controllers/security.login.reset","directives/security.login.reset","directives/security.login.toolbar"],
        "services/security.retryQueue":["angular"],
        "services/security.service":["angular","services/security.retryQueue"/*,"services/security.login","directives/app.register"*/,"services/security.authority","angular-ui-bootstrap","ocLazyLoad","directives/security.login.toolbar"],
        "services/security.thirdparty":["angular","services/security.service"],
        "services/select":["angular"],
        "services/services.configSer":["angular"],
        "services/spread":["angular","services/scene"],
        "services/staticRes":["angular"],
        "services/usercenter":["angular"],
    },
    waitSeconds : 0
});
if(IS_DEBUG){
    require.onError = function (err) {
        console.log(err.requireType);
        if (err.requireType === "timeout") {
            console.log("modules: " + err.requireModules);
        }
    
        throw err;
    };
}
require(["angular", "router","scrop"], function(angular){
    window.searchVal = "",
    window.searchUrl = "",
    window.oldSearchPage = "pageNo=1",
    window.categoryUrl = "",
    window.music = null ,
    window.mytplList = [],
    window.tplCount = 0,
    
    window.randomRange = function(a, b) {
        return Math.random() * (b - a) + a
    }
    window.countCharacters = function(a) {
        var b = 0;
        if (!a) return 0;
        for (var c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            d >= 1 && 126 >= d || d >= 65376 && 65439 >= d ? b++ : b += 2
        }
        return b
    }
    window.playVideo = function(a) {
        if (a && a.bgAudio) {
            var b = $("#media"),
                c = $("#audio_btn"),
                d = ($("#yinfu"), "");
            a.bgAudio.url ? d = 0 == a.bgAudio.url.indexOf("http://") ? a.bgAudio.url : PREFIX_FILE_HOST + a.bgAudio.url : !a.bgAudio.url && a.bgAudio.src && (d = 0 == a.bgAudio.src.indexOf("http://") ? a.bgAudio.src : PREFIX_FILE_HOST + a.bgAudio.src), b.attr("src", d), c.addClass("video_exist"), b.bind("canplay", function() {
                b.get(0).play()
            }).bind("play", function() {
                c.addClass("rotate")
            }).bind("pause", function() {
                c.removeClass("rotate")
            });
            var e = mobilecheck() ? "touchend" : "click";
            $("#audio_btn").show().on(e, function(a) {
                a.stopPropagation(), $(this).hasClass("rotate") ? b.get(0).pause() : (b.get(0).play(), utilSound.pause())
            })
        }
    }
    window.renderPage = function(a, b, c) {
        a.templateParser("jsonParser").parse({
            def: c[b - 1],
            appendTo: "#page" + b,
            mode: "view"
        });
        var d, e, f = 1,
            g = $(".z-current").width(),
            h = $(".z-current").height();
        imageWidth = $(".m-img").width(), imageHeight = $(".m-img").height(), g / h >= 320 / 486 ? (f = h / 486, d = (g / f - 320) / 2) : (f = g / 320, e = (h / f - 486) / 2), window != window.top && $(".phoneBox .nr").css({
            width: "100%",
            height: "100%",
            overflow: "hidden",
            "transform-origin": "top left",
            transform: "scale(" + f + ")"
        }), e && $(".edit_area").css({
            marginTop: e
        }), d && $(".edit_area").css({
            marginLeft: d
        }), tplCount == c.length && $("#eqMobileViewport").attr("content", "width=320, initial-scale=" + f + ", maximum-scale=" + f + ", user-scalable=no")
    }
    
    angular.bootstrap(document.getElementsByTagName("html"), ["app"]);
});