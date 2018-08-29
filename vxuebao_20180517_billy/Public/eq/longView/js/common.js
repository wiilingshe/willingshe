
	function mobilecheck() {
	    var a = !1;
	    return function (b) {
	        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
	    }(navigator.userAgent || navigator.vendor || window.opera), a
	}
	function PCcheck()  {  
	    var userAgentInfo = navigator.userAgent;  
	    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
	    var flag = true;  
	    for (var v = 0; v < Agents.length; v++) {  
	        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
	    }  
	    return flag;  
	}
	function isWeixin() {
	    var a = navigator.userAgent.toLowerCase();
	    return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
	}
	function isAndroid() {
	    var a = navigator.userAgent,
	        b = (navigator.appVersion, a.indexOf("Android") > -1 || a.indexOf("Linux") > -1);
	    return b
	}
	function tabletCheck() {
	    var a = /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase());
	    return a
	}
	function checkHeight(){
	    var windowHeight = $(window).height();
	    return windowHeight > 750 ? 1.5 : 1.3;
	}
	function isEmpty(obj){
        for (var name in obj){
            return false;
        }
        return true;
    };
!
    function (a) {
        function b() {
            var a = {};
            this.addInterval = function (b, c) {
                a[b] = c
            }, this.deleteInterval = function (b) {
                a[b] && (clearInterval(a[b]), delete a[b])
            }, this.clearInterval = function () {
                for (var b in a) this.deleteInterval(b)
            };
            var b = [{
                value: 1,
                desc: "轮播",
                name: "slide"
            }, {
                value: 2,
                desc: "下落",
                name: "bars"
            }, {
                value: 3,
                desc: "百页窗",
                name: "blinds"
            }, {
                value: 4,
                desc: "消隐",
                name: "blocks"
            }, {
                value: 5,
                desc: "渐变",
                name: "blocks2"
            }, {
                value: 9,
                desc: "梳理",
                name: "zip"
            }, {
                value: 11,
                desc: "翻转",
                name: "bars3d"
            }, {
                value: 13,
                desc: "立方体",
                name: "cube"
            }, {
                value: 14,
                desc: "棋盘",
                name: "tiles3d"
            }, {
                value: 16,
                desc: "飞出",
                name: "explode"
            }];
            this.getPicStyle = function (a) {
                if (void 0 === a) return b;
                for (var c = 0; c < b.length; c++) if (a === b[c].value) return b[c]
            }
        }

        a.utilPictures = new b
    }(window), function (a) {
    function b() {//触发
        var a = {
                CLICK: {
                    name: "click",
                    value: 1,
                    title: "点击"
                },
                SHAKE: {
                    name: "shake",
                    value: 2,
                    title: "摇一摇"
                }
            },
            b = {
                SHOW: {
                    name: "show",
                    value: 1
                },
                HIDE: {
                    name: "hide",
                    value: 2
                },
                RANDOMEVENT: {
                    name: "randomEvent",
                    value: 3
                }
            };
        this.getSendType = function (b) {
            if (void 0 === b) return a;
            for (var c in a) if (b === a[c].value) return a[c];
            return null
        }, this.getHandleType = function (a) {
            if (void 0 === a) return b;
            for (var c in b) if (a === b[c].value) return b[c];
            return null
        }
    }
    a.utilTrigger = new b
}(window), function (a, b) {//音效&音乐
    function c() {
        var a, c, d, e = [];
        b("#media");
        this.addAudio = function (a, f) {
            var g = new Audio;
            g.src = f, e.push({
                elem: a,
                audio: g
            }), b(g).bind("ended", function () {
                c = !1, d()
            })
        }, this.play = function (b, f, g) {
            var h;
            d = f;
            for (var i = 0; i < e.length; i++) e[i].elem == b && (h = e[i].audio);
            a == h && c ? (h.pause(), c = !1, f()) : a != h || c ? (a && a.pause(), h.currentTime = 0, h.play(), g(), c = !0, a = h) : (h.play(), c = !0, g())
        }, this.pause = function () {
            a && (a.pause(), c = !1)
        }
    }

    a.utilSound = new c
}(window, $),function () {//特效
    window.eqx = {}, window.eqx.money = {
        config: {
            mode: 3,
            effectCallback: "editMoney",
            imageCallback: "countMoney",
            resources: [{
                url: CLIENT_CDN + "view/js/countMoney.js",
                type: "js"
            }, {
                url: CLIENT_CDN + "assets/images/create/money/money_bg.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/create/money/rmb.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/create/money/rmb.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/create/money/rmb.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/create/money/bag.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/create/money/rmb.png",
                type: "image"
            }]
        }
    }, window.eqx.snowFly = {
        config: {
            mode: 4,
            effectCallback: "flyAction",
            resources: [{
                url: CLIENT_CDN + "view/js/effect/snoweffect.js",
                type: "js"
            }, {
                url: CLIENT_CDN + "view/js/effect/threecanvas.js",
                type: "js"
            }]
        }
    }, window.eqx.rainyDay = {
        config: {
            mode: 4,
            effectCallback: "rainyEffect",
            resources: [{
                url: CLIENT_CDN + "view/js/effect/rainyday.js",
                type: "js"
            }, {
                url: CLIENT_CDN + "view/js/effect/rainyeffect.js",
                type: "js"
            }]
        }
    }, window.eqx.fireWorks = {
        config: {
            mode: 4,
            effectCallback: "fireWorks",
            resources: [{
                url: CLIENT_CDN + "view/js/effect/fireworks.js",
                type: "js"
            }]
        }
    }
}(),function () {
    function a(a) {
        resources.loaded = !0, a instanceof Array ? a.forEach(function (a) {
            b(a)
        }) : b(a)
    }

    function b(a) {
        if ("loading" != f[a.url]) {
            if (f[a.url]) return f[a.url];
            if (f[a.url] = !1, "image" == a.type) {
                var b = new Image;
                f[a.url] = "loading", b.onload = function () {
                    f[a.url] = b, d() && g.forEach(function (a) {
                        a()
                    })
                }, b.src = a.url
            } else "js" == a.type && (f[a.url] = "loading", $.getScript(a.url, function (b, c, e) {
                f[a.url] = !0, d() && g.forEach(function (a) {
                    a()
                })
            }))
        }
    }

    function c(a) {
        return f[a]
    }

    function d() {
        var a = !0;
        for (var b in f) if (f.hasOwnProperty(b) && (!f[b] || "loading" == f[b])) return !1;
        return a
    }

    function e(a) {
        g.push(a)
    }

    var f = {},
        g = [];
    window.resources = {
        load: a,
        get: c,
        onReady: e,
        isReady: d
    }
}();

    function getCounterValues(a) {//计数
        var b = {
            sceneId: a.obj.id,
            fieldIds: ""
        };
        

        $.each(a.list, function (a, c) {
            c.elements && $.each(c.elements, function (a, c) {
                "i" === c.type && (b.fieldIds += (b.fieldIds ? "," : "") + c.id)
            })
        }), b.fieldIds && (window.counterValues = $.ajax({
            type: "GET",
            url: PREFIX_S1_URL + "index.php?c=scene&a=countervalues",
            data: $.param(b),
            xhrFields: {
                withCredentials: !0
            },
            error: function (a) {
                layer.alert("Connection error")
            },
            crossDomain: !0
        }))
    }
    function getShowCount(a) {
        return this.showCount = $.ajax({
            type: "GET",
            url: PREFIX_S1_URL + "index.php?c=scene&a=pv&sceneId=" + a,
            xhrFields: {
                withCredentials: !0
            },
            error: function (a) {
                layer.alert("Connection error")
            },
            crossDomain: !0
        })
    }
    function fixedNum(a) {
        var b;
        return 1e4 > a ? b = a : a >= 1e4 && 1e8 > a ? b = (a / 1e4).toFixed(2) + "万" : a >= 1e8 && (b = (a / 1e8).toFixed(2) + "亿"), b
    }
    function getDomain(a) {
        var b = "null";
        ("undefined" == typeof a || null == a) && (a = window.location.href);
        var c = /.*\:\/\/([^\/]*).*/,
            d = a.match(c);
        return "undefined" != typeof d && null != d && (b = d[1]), b
    }
    function playVideo(a) {//播放音乐
        if (a && a.bgAudio) {
            var b = $("#media"),
                c = $("#audio_btn"),
                d = ($("#yinfu"), "");
                a.bgAudio.url ? d = 0 == a.bgAudio.url.indexOf("http://") ? a.bgAudio.url : PREFIX_FILE_HOST + a.bgAudio.url : !a.bgAudio.url && a.bgAudio.src && (d = 0 == a.bgAudio.src.indexOf("http://") ? a.bgAudio.src : PREFIX_FILE_HOST + a.bgAudio.src), b.attr("src", d), c.addClass("video_exist"), b/*.bind("canplay", function () {
                    b.get(0).play()
                }).*/.bind("play", function () {
                    c.addClass("rotate")
                }).bind("pause", function () {
                    c.removeClass("rotate")
                });
                var e = mobilecheck() ? "touchend" : "click";
                $("#audio_btn").show().on(e, function (a) {
                    a.stopPropagation(), $(this).hasClass("rotate") ? b.get(0).pause() : (b.get(0).play(), utilSound.pause())
                })
        }
        
    }
    function renderPage() {//处理手机端展示适配问题
        var d, e, f = 1,
            g = $(window).width(),
            h = $(window).height();
        imageWidth = $(".edit_wrapper").width(), imageHeight = $(".edit_wrapper").height();
        g / h >= 320 / 486 ? (f = h / 486, d = (g / f - 320) / 2) : (f = g / 320, e = (h / f - 320) / 2),console.log(f),window != window.top && $(".viewer").css({
            width: "100%",
            height: "100%",
            overflow: "hidden",
            "transform-origin": "top left",
            transform: "scale(" + f + ")"
        }),/*e && $(".edit_area").css({
            marginTop: e
        }),*/ d && $(".edit_area").css({
            marginLeft: d
        }), $("#eqMobileViewport").attr("content", "width=320, initial-scale=" + f + ", maximum-scale=" + f + ", user-scalable=no")
    }
    function takeAd(){//页面底部广告
        var advertisement = "<div class='advertisement' id='scenead'>我也来制作长图文微课--<a target='_blank' href='http://www.vxuebao.com'>微学宝</a></div>";
        $(".edit_wrapper").append(advertisement);
    }

    /**动态生成页面内容**/
    var url, preview, mobileview, pageMode, branchid, ad = 0;
    $.ajaxSetup({
        cache: !0
    });
    var isNewPreviewLocation = /[http|https]:\/\/.*\/m\/scene\/preview\//.test(window.location.href);
    var url;
    if(/[http|https]:\/\/.*\/v-/.test(window.location.href)){
        url = window.location.href.split("/v-")[1];
    }else {
        if(isNewPreviewLocation){
            url = window.location.href.split("/m/scene/preview/")[1];
        }else{
            url = window.location.href.split("id=")[1];
        }
    }
    var sceneId = url.split("#")[0].split("&")[0].split("?")[0];
    isNewPreviewLocation && (sceneId = sceneId.substring(0, sceneId.indexOf(".html")));
    var param = url.split(sceneId)[1];
    if ((param.indexOf("preview=preview") > 0 || window.preview || isNewPreviewLocation) && (preview = !0), param.indexOf("branchid=") > 0 && (branchid = param.substring(param.indexOf("branchid=") + 9)), param.indexOf("mobileview=mobileview") > 0 && (mobileview = !0), !(mobilecheck() || tabletCheck() && window == window.top)) {
        var addElmentsForPc = function (a) {
            var b = document.getElementsByTagName("head")[0],
                c = document.createElement("link");//修改大小&修改路径
            if(window != window.top){
                $("ody").css("background-image", "none"); 
                $("#page1").attr("style", "left:4px;top:134px"); 
                if(window.location.href.indexOf("hidePhone") > 0){
                    $("#mainBox-left").hide();
                    $("body").css({
                        "background-color": "rgba(0,0,0,0.6)"
                    })
                }
            }else{
                $("body").css({"backgroundImage": "url(http://www.vxuebao.com/view/images/bg_Oly.jpg)","position": "absolute"}); 
                $.getScript(CLIENT_CDN + "common/js/qrcode.js", function () {
                    $.getScript(CLIENT_CDN + "common/js/jquery.qrcode.js", function () {
                        /* window.scene && 100 == window.scene.bizType ? ($("#mainBox-left").before('<div id="code" style="margin-top: -200px;">\n    <div style="font-size: 14px;">Share your folio on social network!</div>\n    <div class="eqx-share">\n        <a class="eqx-share-btn btn-facebook"><span class="eqx-share-icon icon-facebook"></span></a>\n        <a class="eqx-share-btn btn-twitter"><span class="eqx-share-icon icon-twitter"></span></a>\n        <a class="eqx-share-btn btn-plus"><span class="eqx-share-icon icon-google_plus"></span></a>\n        <a class="eqx-share-btn btn-linkedin"><span class="eqx-share-icon icon-linkedin"></span></a>\n        <a class="eqx-share-btn btn-pinterest"><span class="eqx-share-icon icon-pinterest"></span></a>\n        <a class="addthis_sharing_toolbox"></a>\n    </div>\n    <div id="view_reg" style="border: none;margin-bottom: 26px;"><span>\n        <a target="_blank" href=' + your_demain + ' style="color: #fff;border-bottom-color: #fff;font-size: 14px;">So Cool, Let me try it!</a>\n    </span></div>\n    <div style="text-align: center;background:#fff;padding: 10px;" id="codeImg"/> \n    <div style="text-align: center;font-size: 14px;">Scan the QR Code!</div>\n    <div id="support">Powered BY <a target="_blank" href=' + your_demain + '><img id="logoSmall" style="width: 64px;vertical-align: bottom;" src="' + CLIENT_CDN + 'view/images/hypefolio-logo.png"/></a></div></div>'), $(".eqx-share-btn").ShareLink({
                            title: window.scene.name,
                            text: window.scene.description,
                            image: PREFIX_FILE_HOST + window.scene.cover,
                            url: window.location.href.split("#")[0],
                            class_prefix: "btn-"//添加标题和描述&&修改大小
                        })) : */
                        $("body").before('<div id="bg" class="bg_white"></div><div id="support">技术支持 BY <a target="_blank" href=' + your_demain + '><img id="logoSmall" src="' + CLIENT_CDN + 'view/images/logobai.png"/></a></div></div>');
                        var b, c = getDomain(PREFIX_HOST);
                        b = window.location.href.indexOf(c) >= 0 ? parseInt(10 * Math.random(), 10) % 2 ? PREFIX_URL : PREFIX_URL : PREFIX_URL, $("#codeImg").qrcode({
                            render: "canvas",
                            width: 100,
                            height: 100,
                            text: b + "v-" + a + "?eqrcode=1"
                        })
                    })
                });
                $("#page1").wrap('<section id="container" class="container main-page"></section>');
                $("#user").wrap('<div id="mainBox-left"></div>'); 
                $("#author").appendTo($("#mainBox-left")); 
                $("#user").show();
                $("#author").show();
                $('<div id="code"><span>扫我在手机上观看</span><div style="text-align: center;background:#fff;  margin-top: 3px;" id="codeImg"/></div><div class="otherOptions"><span class="vxueSquar"><a target="_blank" href="http://www.vxuebao.com/show/">查看其它案例</a></span><span class="vxuebaoDIY"><a target="_blank" href=' + your_demain + '>我也来制作</a></span></div>').appendTo($("#mainBox-left"))
            }
        };
        addElmentsForPc(sceneId)
    }
    
    
    if (mobilecheck() || $("img").on("dragstart", function (a) {//用户访问次数/浏览量
        a.preventDefault()
    }), !preview) {
        var pvUrl = PREFIX_S1_URL + "index.php?c=scene&a=addpv&id=" + scene.id;
        param && (pvUrl += "?1=1", pvUrl += /\?.*/.test(param) ? "&" + param.substring(1) : /\&.*/.test(param) ? param : "&" + param), pvUrl += (/\?/.test(pvUrl) ? "&" : "?") + "ad=" + ++ad, $.ajax({
            type: "GET",
            url: pvUrl,
            xhrFields: {
                withCredentials: !0
            },
            crossDomain: !0
        })
    }

    //检测是否手机端&&修改大小
    function classReplace(obj,class1,class2,class3){
        if(arguments.length > 3){
            return $(obj).removeClass(class1).removeClass(class2).addClass(class3);
        }else{
            return $(obj).removeClass(class1).addClass(class2);
        }
    }
    if(PCcheck()){
        /*alert("电脑");*/
        if($(window).height() > 750){
            classReplace("#page1","viewer1","viewer3","viewer5");
            classReplace("#container","container1","container3","container5");
            classReplace("#mainBox-left", "mainBox-left3", "mainBox-left5")
            
        }else{
            classReplace("#page1","viewer1","viewer5","viewer3");
            classReplace("#container","container1","container5","container3");
            classReplace("#mainBox-left", "mainBox-left5", "mainBox-left3")
        }
        classReplace(".open","open-Mobile","open-PC");
        classReplace(".buttomcontent","buttomcontent-Mobile","buttomcontent-PC");
        classReplace("#tanmubut","tanmubut-Mobile","tanmubut-PC");
        classReplace(".zmpanel","zmpanel-Mobile","zmpanel-PC");
    }else{
        /*alert("手机");*/
        classReplace("#page1","viewer5","viewer3", "viewer1");
        classReplace("#container","container5","container3","container1");
        classReplace(".open","open-PC","open-Mobile");
        classReplace(".buttomcontent","buttomcontent-PC","buttomcontent-Mobile");
        classReplace("#tanmubut","tanmubut-PC","tanmubut-Mobile");
        classReplace(".zmpanel","zmpanel-PC","zmpanel-Mobile");
    }

    