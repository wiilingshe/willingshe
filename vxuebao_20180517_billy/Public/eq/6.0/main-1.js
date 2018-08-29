var BASE_URL = "/Public/eq/6.0/";
var IS_DEBUG = true;
require.config({
    baseUrl:BASE_URL,
    //配置angular的路径
    paths:{
        "jquery":"../../js/jquery.min",
        "jquery-ui":"../../js/jquery-ui.min",
        "jquery-jcrop":"../../js/jquery.Jcrop.min",
        "angular":"../../js/angular", 
        "uiRouter":"../../js/angular-ui-router",
        "WebUploader":"../../js/webuploader",
        "ocLazyLoad": "../../js/ocLazyLoad.require.min",
        "angular-animate":"../../js/angular-animate.min",
        "angular-sanitize":"../../js/angular-sanitize.min",
        "angular-ui-bootstrap":"../../js/angular-ui-bootstrap",
        "angular-ui-select":"../../js/select.min",
        "angular-ui-sortable":"../../js/sortable",
        "bootstrap":"../../js/bootstrap.min",
        "Chart":"../../js/Chart.min",
        "hammer":"../../js/hammer",
        "angular-translate":"../../js/angular-translate.min",
        "angular-translate-loader-static-files":"../../../debug/js/angular-translate-loader-static-files.min",
        "html2canvas":"../../js/html2canvas.min",
        "angular-ui-grid":"../../../vendor/angular-ui-grid/ui-grid.min",
        "bootstrap-wysiwyg":"../../../vendor/others/bootstrap-wysiwyg",
        "jquery-hotkeys":"../../../vendor/others/jquery.hotkeys.min",
        "angular-file-upload":"../../../vendor/others/angular-file-upload.min",
        "angular-file-upload-directives":"../../../vendor/others/angular-file-upload-directives.min",
        "es5-shim":"../../../vendor/others/es5-shim.min",
        "es5-sham":"../../../vendor/others/es5-sham.min",
        "console-sham":"../../../vendor/others/console-sham.min",
        "angular-locale_zh-cn":"../../../vendor/others/angular-locale_zh-cn.min",
        "ZeroClipboard":"../../js/ZeroClipboard.min",
        "iscroll":"../../../vendor/iscroll/build/iscroll",
        "jquery-ui-panch":"../../../vendor/jquery-ui-panch/jquery.ui.touch-punch.min",
        "jquery-slider":"../../../index/js/jquery.slider",
        "jpages":"../../../index/js/jpages.min",
        "lazyload":"../../../index/js/jquery.lazyload",
        "jwplayer":"../../../index/js/jwplayer",
        "common_v":"../../../index/js/common_v",
        "scrop":"../../../index/js/scrop",
        "echarts":"../../../index/js/echarts.min"
    },
    /**
      * 垫片书写注意
      * 一般在router中只书写一个file文件作为种子启动文件
      * shim垫片中需要书写每个JS间的依赖关系，例子："controllers/active":['angular',"services/active"]
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
        "angular-animate":["angular"],
        "angular-sanitize":["angular"],
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
        "router": ['angular','uiRouter','ocLazyLoad',"controllers/app"],
        
        "controllers/active":['angular',"services/security.service"],
        "controllers/app":['angular',"jquery","uiRouter",'ocLazyLoad',"angular-translate","angular-translate-loader-static-files","services/security.service","services/security.authorization","angular-ui-select","services/config","services/i18nNotifications","services/usercenter","directives/app.rightclick","angular-translate-loader-static-files"],
        "controllers/customer.group":['angular',"services/data", "services/i18nNotifications"],
        "controllers/dialog":['angular'],
        "controllers/error":['angular'],
        "controllers/home":['angular',"services/config","services/sample","services/security.service","services/staticRes",/*"services/security.thirdparty","services/home",*/"directives/home","jquery-slider"],
        "controllers/main.data":['angular',"directives/app.dataDraggable", "controllers/customer.group", "services/i18nNotifications", "directives/app.customer",'services/modal',"angular-ui-bootstrap","jquery-ui","directives/common.dropDown"],
        "controllers/main.data.edit":['angular',"services/usercenter", "services/i18nNotifications",'services/modal','services/data'],
        "controllers/main":['angular','services/mine','services/data',"services/services.configSer",'directives/app.pageTplTypes','services/staticRes','directives/app.addelement',"services/usercenter","services/i18nNotifications","directives/common.scroll","services/scene","services/modal","services/spread","controllers/userCenter.userGuide","controllers/main.userGuide","directives/common.dropDown","directives/app.qrcode","ocLazyLoad"],
        "controllers/main.transferScene":['angular',/*"services/usercenter",*/"services/scene"],
        "controllers/main.userGuide":['angular'],
        "controllers/nav":['angular',"services/services.show","services/staticRes"],
        "controllers/sample":['angular',"jquery",/*"services/security.service",*/"services/sample","services/staticRes","directives/app.addelement","directives/app.qrcode"],
        
        "controllers/scene.create.console.audio":['angular'],
        "controllers/scene.create.console.bg":['angular',"services/file","directives/app.responsiveImage","directives/app.rightclick",'services/file.upload',"services/i18nNotifications",'directives/app.autoclose'],
        "controllers/scene.create.console.button":['angular'],
        "controllers/scene.create.console.category":['angular',"services/file"],
        "controllers/scene.create.console.counter":['angular'],
        "controllers/scene.create.console.cropImage":['angular',"services/file"],
        "controllers/scene.create.console.fake":['angular'],
        "controllers/scene.create.console.imageCrop":['angular',"services/scene.create.console.imageCrop","directives/scene.create.console.imageCrop"],
        "controllers/scene.create.console.input":['angular'],
        "controllers/scene.create.console.link":['angular','directives/scene.create.console.link'],
        "controllers/scene.create.console.linkComponent":['angular'],
        "controllers/scene.create.console.map":['angular',"directives/app.comp.editor"],
        "controllers/scene.create.console.micro":['angular','directives/app.addelement','services/scene'],
        "controllers/scene.create.console.pictures":['angular',"services/file"],
        "controllers/scene.create.console.pictures1":['angular','services/scene.create.console.pictures1','directives/scene.create.console.pictures1'],
        "controllers/scene.create.console.ppt":['angular',"angular-file-upload"],
        "controllers/scene.create.console.psd":['angular','WebUploader'],
        "controllers/scene.create.console.radio.checkbox":['angular'],
        "controllers/scene.create.console.randomevent":['angular'],
        "controllers/scene.create.console.rating":['angular',"directives/common.inputColor"],
        "controllers/scene.create.console.scene-setting-component":['angular',"services/scene.create.console.scene-setting-component","directives/scene.create.console.scene-setting-component"],
        "controllers/scene.create.console.setting.anim":['angular',"directives/app.uislider", "directives/app.limitInput"],
        "controllers/scene.create.console.setting.style":['angular',"directives/colorpicker", "directives/app.style","directives/app.uislider", "directives/app.limitInput", "services/history"],
        "controllers/scene.create.console.setting.trigger":['angular',"directives/colorpicker", "directives/app.style","directives/app.uislider", "directives/app.limitInput","services/scene.edit.trigger"],
        "controllers/scene.create.console.shape":["angular",'services/scene.create.console.shape','directives/scene.create.console.shape'],
        "controllers/scene.create.console.sound":["angular",,"services/scene.create.console.sound","directives/scene.create.console.sound","filters/scene.create.console.sound"],
        "controllers/scene.create.console.soundComponent":["angular","directives/app.addelement"],
        "controllers/scene.create.console.statistiacs":["angular"],
        "controllers/scene.create.console.tel":["angular","directives/app.addelement"],
        "controllers/scene.create.console.adr":["angular"],
        "controllers/scene.create.console.video":["angular"],
        "controllers/scene.create":['angular',"directives/scene.create"],
        
        "controllers/scene.create.new":['angular',"services/scene", "services/staticRes"],
        "controllers/scene.create.pageTpl":['angular',"services/pagetpl"],
        "controllers/scene.create.userGuide":['angular'],
        "controllers/scene.edit.bg":['angular',"services/scene", "services/history"],
        "controllers/scene.edit.select":['angular',"services/scene", "services/history"],
        "controllers/scene":['angular','services/scene','services/staticRes','directives/app.addelement'/*,'controllers/scene.create.userGuide'*/,"ocLazyLoad"],
        "controllers/scene.my.upload":['angular','angular-file-upload'],
        "controllers/scene.myscene":['angular',"services/scene", "services/mine", "services/data", "directives/scene.create.console", "directives/app.addelement", "services/usercenter", "directives/app.qrcode", "services/i18nNotifications"],
        "controllers/scene.pageeffect.console":['angular',"controllers/scene.pageeffect.scratch","controllers/scene.pageeffect.finger","controllers/scene.pageeffect.money","controllers/scene.pageeffect.fall","controllers/scene.pageeffect.snow","controllers/scene.pageeffect.fireworks","controllers/scene.pageeffect.none"],
        "controllers/scene.pageeffect.fall":['angular',"plugins/fallingObject"],
        "controllers/scene.pageeffect.finger":['angular'],
        "controllers/scene.pageeffect.fireworks":['angular'],
        "controllers/scene.pageeffect.money":['angular'],
        "controllers/scene.pageeffect.none":['angular'],
        "controllers/scene.pageeffect.scratch":['angular',"directives/common.inputNumber"],
        "controllers/scene.pageeffect.snow":['angular'],
        
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
        "controllers/spread":["angular","directives/app.pieChart", "directives/app.numChangeAnim", "controllers/spread.tab", "directives/app.qrcode", "directives/app.switchInput", "directives/app.copyButton", "directives/app.spread.console","services/mine","services/data"],
        "controllers/spread.share.domainBind":["angular","services/usercenter", "services/i18nNotifications"],
        "controllers/spread.share":["angular","controllers/spread.share.socialShare", "controllers/spread.share.expandWeb", "controllers/spread.share.domainBind", "controllers/spread.share.siteImport"],
        "controllers/spread.share.siteImport":["angular","services/scene"],
        "controllers/spread.share.socialShare":["angular","directives/app.disableKeydown","services/scene.create.console.scene-setting-component"],
        "controllers/spread.statistics":["angular","directives/spread.statistics"],
        "controllers/spread.tab":["angular","controllers/spread.share","controllers/spread.statistics","controllers/spread.dataCollect"],
        "controllers/common.dropDown":["angular"],
        
        
        "controllers/usercenter":["angular","controllers/usercenter.transfer", "controllers/usercenter.upgrade", "controllers/usercenter.request", "services/usercenter", "services/localizedMessages", "services/security.service", 
                                  "directives/app.addelement", "services/modal", "controllers/usercenter.relAccount", "controllers/usercenter.branch", "services/i18nNotifications", "services/security.thirdparty", "controllers/usercenter.branch.reset", 
                                  "controllers/usercenter.checkMobil","controllers/usercenter.relRegisterAccount", "controllers/usercenter.userGuide", "controllers/usercenter.tab", "controllers/usercenter.privilege"],
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
        "controllers/usercenter.userGuide":["angular"],
        "controllers/usercenter.privilege":["angular","services/usercenter","services/modal","services/security.service"],

        "controllers/message":["angular","services/usercenter"],
        "controllers/invitation":["angular","services/usercenter","services/security.service","directives/app.copyButton","services/modal","services/i18nNotifications"],
        
        
        "directives/app.addBanner":["angular","services/services.configSer","jquery-slider"],
        "directives/app.addelement":["angular","jquery","plugins/slides","iscroll"],
        "directives/app.comp.editor":["angular"],
        "directives/app.component":["angular","services/scene","services/select","controllers/scene.create.console.pictures",'hammer','plugins/utilPictures'],
        "directives/app.customer":["angular","jquery-ui"],
        "directives/app.editor":["angular","plugins/utilFont"],
        "directives/app.keymap":["angular",],
        "directives/app.limitInput":["angular"],
        "directives/app.lineChart":["angular"],
        "directives/app.loading":["angular"],
        "directives/app.notification":["angular"],
        'directives/app.pageTplTypes':["angular"],
        'directives/app.pieChart':["angular"],
        "directives/app.qrcode":["angular","plugins/qrcode"],
        "directives/app.register":["angular"],
        "directives/app.responsiveImage":["angular"],
        "directives/app.rightclick":["angular"],
        "directives/app.copyButton":["angular"],
        "directives/common.dropDown":['angular','controllers/common.dropDown','plugins/regexp'],
        "directives/common.scroll":["angular"],
        "directives/home":["angular"],
        
        "directives/scene.create.console.imageCrop":["angular",'services/scene.create.console.imageCrop','jquery-jcrop'],
        "directives/scene.create.console.link":["angular",'services/scene'],
        "directives/scene.create.console.pictures1":["angular",'services/scene.create.console.pictures1'],
        "directives/scene.create.console.scene-setting-component":["angular","services/scene.create.console.scene-setting-component"],
        "directives/scene.create.console.setting":["angular","controllers/scene.create.console.setting.style","controllers/scene.create.console.setting.anim","controllers/scene.create.console.setting.trigger"],
        
        "directives/scene.create.console":["angular","controllers/scene.create.console.bg","controllers/scene.create.console.ppt","controllers/scene.create.console.psd", "controllers/scene.create.console.map", "controllers/scene.create.console.statistics", 
                                            "controllers/scene.create.console.randomevent","controllers/scene.create.console.shape","controllers/scene.create.console.scene-setting-component","controllers/scene.pageeffect.console",
                                            "controllers/scene.create.console.cropImage","controllers/scene.create.console.imageCrop", "controllers/scene.create.console.category", "controllers/scene.create.console.video", 
                                            "controllers/scene.create.console.link","controllers/scene.create.console.adr","controllers/scene.create.console.micro","controllers/scene.create.console.soundComponent","controllers/scene.create.console.sound","controllers/scene.create.console.pictures1",
                                            "controllers/scene.create.console.fake","controllers/scene.create.console.tel","controllers/scene.create.console.audio","directives/scene.create.console.setting","controllers/scene.create.console.button",
                                            "controllers/scene.create.console.linkComponent","controllers/scene.create.console.radio.checkbox", "controllers/scene.create.console.rating", "controllers/scene.create.console.counter",
                                            "controllers/scene.create.console.input"],
                                            
        "directives/scene.create.console.shape":["angular",'services/scene.create.console.shape'],
        "directives/scene.create.console.sound":["angular","services/scene.create.console.sound"],
        "directives/scene.create":['angular',"services/scene",,"services/scene",'services/modal','directives/app.component','services/pagetpl','controllers/save.template','directives/scene.create.console',
                                    'directives/app.comp.editor','directives/app.addelement','controllers/scene.my.upload','directives/scene.preview','directives/scene.create.hoverElement','controllers/scene.create.hoverElement',
                                    'controllers/scene.create.pageTpl','controllers/scene.userGuide','controllers/scene.edit.bg','directives/scene.edit.keymaps','directives/scene.edit.common','controllers/scene.edit.select',
                                    'directives/app.editor','controllers/scene.support','services/dataCache','jquery-ui','plugins/regexp','plugins/eqxCommon','directives/common.dropDown','bootstrap-wysiwyg','angular-ui-bootstrap',
                                    'directives/common.scroll'],
        "directives/scene.edit.common":["angular","services/scene", "services/history", "services/select","html2canvas"],
        "directives/scene.edit.keymaps":["angular","services/scene", "services/history", "services/select","jquery-hotkeys"],
        "directives/scene.preview":["angular","services/scene.preview"],
        
        "directives/security.login.reset":["angular","controllers/security.login.reset"],
        "directives/security.login.toolbar":["angular","services/usercenter"],
        "directives/spread.statistics":["angular","services/spread", "directives/app.lineChart", "directives/app.pieChart", "directives/app.numChangeAnim","echarts"],
        
        "filters/scene.create.console.sound":["angular","services/scene.create.console.sound"],
        
        "plugins/completeEffect":["jquery"],
        "plugins/eqshow":["jquery"],
        "plugins/flux":["jquery"],
        "plugins/qrcode":["jquery"],
        "plugins/slides":["jquery"],
        "plugins/snowFly":["jquery","plugins/three"],
        "plugins/utilSound":["jquery"],
        "plugins/utilTrigger":{
            exports:"utilTrigger"
        },
        "plugins/fallingObject":["plugins/eqshow"],
        
        "services/active":['angular'],
        "services/config":["angular"],
        "services/data":['angular'],
        "services/dataCache":["angular"],
        "services/file":["angular","services/i18nNotifications", "services/staticRes","services/dataCache"],
        "services/file.upload":["angular","angular-file-upload", "services/file"],
        "services/history":["angular"],
        "services/home":["angular","directives/home"],
        "services/I18N.MESSAGES":["angular"],
        "services/i18nNotifications":["angular","services/localizedMessages","services/notifications"],
        "services/localizedMessages":["angular","services/I18N.MESSAGES"],
        'services/mine':["angular"],
        'services/modal':["angular","controllers/dialog"],
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
        if (err.requireType === 'timeout') {
            console.log('modules: ' + err.requireModules);
        }
    
        throw err;
    };
}
require(['angular', 'router','scrop'], function(angular){
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
    
    angular.bootstrap(document.getElementsByTagName("html"), ['app']);
});