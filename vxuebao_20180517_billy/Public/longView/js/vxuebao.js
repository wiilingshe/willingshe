var addObj = {},//addComponent
        bindEditObj = {},// bindEditEvent
        bindAfterRenderObj = {},// bindAfterRenderEvent
        animArr = [],
        p = containerWidth = !PCcheck() ? 320 : 320*(checkHeight()),
        q = containerHeight = !PCcheck() ? 486 : 486*(checkHeight()),
        celectMap= [],
        j,
        data = {
            mode:"view",
            def:{},
            appendTo:"#con"
        },
        tplCount = 0,
        sceneId = jsondata.obj.id,
        counterValues = 0, 
        showCount = !0;
var vxuebao = function(){
    var  reset = function(a) {//按照z-index值重新排序
            for (var b = 0; b < a.length - 1; b++) {
                for (var c = b + 1; c < a.length; c++) {
                    if (a[b].css && a[c].css && (parseInt(a[b].css.zIndex, 10) > parseInt(a[c].css.zIndex, 10))) {
                        var d = a[b];
                        a[b] = a[c], a[c] = d
                    }
                }
            }
            for (var e = 0; e < a.length; e++) {
                a[e].css.zIndex = e + 1 + "";
            }
            return a;   
        },
        appendToUL = function(a, d, e) {//data,element=".edit_wrapper","view"
            d = d.find(".edit_area");
            var f, i = a.elements;
            if (i) {
                for (i = vxuebao.reset(i), f = 0; f < i.length; f++) {
                    if (i[f].sceneId = a.sceneId, 3 == i[f].type) {//课件每一页的背景
                        var j = addObj[("" + i[f].type).charAt(0)](i[f], d);
                        "edit" == e && m[("" + i[f].type).charAt(0)] && m[("" + i[f].type).charAt(0)](j, i[f])
                    } else {
                        var k = vxuebao.makeLi(i[f], e);//课件素材li
                        var conli = "#inside_" + i[f].id;
                        if (!k) continue;
                        d.append(k);//将li按照整理好从小到大z-index值的顺序添加到ul中
                        for (var p = 0; p < animArr.length; p++) {
                            animArr[p](k, i[f], e);
                            eqxCommon.bindTrigger(conli,i[f]);
                        };
                        bindAfterRenderObj[("" + i[f].type).charAt(0)] && (bindAfterRenderObj[("" + i[f].type).charAt(0)](k, i[f]), "edit" != e && (vxuebao.trigger(k, i[f]),vxuebao.trigger(conli,i[f]), vxuebao.bgMusic(k, i[f])));
                        "edit" == e && bindEditObj[("" + i[f].type).charAt(0)] && bindEditObj[("" + i[f].type).charAt(0)](k, i[f]);
                        
                    }
                }
            }
            return d
        },
        addComponent = function (b, c) {
            addObj[b] = c;
        }, 
        bindEditEvent = function(b, c){
            bindEditObj[b] = c;
        },
        bindAfterRenderEvent = function(b, c){
            bindAfterRenderObj[b] = c;
        },
        parse = function (a) {
            var height = PCcheck() ? parseInt(a.def.properties.longpage.longpageHeight) * checkHeight() : parseInt(a.def.properties.longpage.longpageHeight);
            var b, c;
            if(!PCcheck()){//判断移动端&&修改大小
                b = $('<div class="edit_wrapper" data-scene-id="' + a.def.sceneId + '"  style="height:'+height+'px;"><ul eqx-edit-destroy id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active edit_area1"  style="height:'+height+'px;"></div>');
            }else{
                if($(window).height() >750){
                    b = $('<div class="edit_wrapper" data-scene-id="' + a.def.sceneId + '"  style="height:'+height+'px;"><ul eqx-edit-destroy id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active edit_area5"  style="height:'+height+'px;"></div>');
                }else{
                    b = $('<div class="edit_wrapper" data-scene-id="' + a.def.sceneId + '"  style="height:'+height+'px;"><ul eqx-edit-destroy id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active edit_area3"  style="height:'+height+'px;"></div>');
                }
            }
            
            c = this.mode = a.mode;
            this.def = a.def, "view" == c && tplCount++;
            var e = $(a.appendTo);
            return containerWidth = e.width(), containerHeight = e.height(), r = p / containerWidth, s = q / containerHeight, vxuebao.appendToUL(a.def, b.appendTo($(a.appendTo)), c);
        },
        makeLi = function(a, b) {
            var c = addObj[("" + a.type).charAt(0)](a)

            //判断移动端&&修改大小--零件
            if(PCcheck()){
                for(var key in a.properties.imgStyle){
                    if(typeof(a.properties.imgStyle[key]) == "number"){
                        a.properties.imgStyle[key] = Math.round(a.properties.imgStyle[key] *(checkHeight()));
                    };
                    if(typeof(a.properties.imgStyle[key]) == "string"){
                        a.properties.imgStyle[key] = "-"+
                                                      Math.round(Number(a.properties.imgStyle[key].slice(1,-2))*(checkHeight()))
                                                        +"px";
                    };
                            
                }
            }
            if (c) {
                var e = $('<li comp-drag comp-rotate class="comp-resize comp-rotate inside" id="inside_' + a.id + '" num="' + a.num + '" ctype="' + a.type + '"></li>');
                
                1 == ("" + a.type).charAt(0) && e.removeAttr("comp-drag");
                2 == ("" + a.type).charAt(0) && e.addClass("wsite-text");
                3 != ("" + a.type).charAt(0) && 1 != ("" + a.type).charAt(0) && e.attr("comp-resize", "");
                4 == ("" + a.type).charAt(0) && (a.properties.imgStyle && $(c).css(a.properties.imgStyle), e.addClass("wsite-image"));
                5 == ("" + a.type).charAt(0) && e.addClass("wsite-input");
                6 == ("" + a.type).charAt(0) && e.addClass("wsite-button");
                8 == ("" + a.type).charAt(0) && e.addClass("wsite-button");
                "h" == ("" + a.type).charAt(0) && e.addClass("wsite-shape");
                "n" == ("" + a.type).charAt(0) && e.addClass("wsite-image");
                "p" == ("" + a.type).charAt(0) && e.removeAttr("comp-rotate");
                "v" == ("" + a.type).charAt(0) && e.addClass("wsite-video");
                "x" == ("" + a.type).charAt(0) && (e.addClass("show-text"),a.css.color && $(c).css("color",a.css.color));
                e.mouseenter(function () {
                    $(this).addClass("inside-hover")
                });
                e.mouseleave(function () {
                    $(this).removeClass("inside-hover")
                });

                /*if ("edit" == data.mode || "x" != ("" + a.type).charAt(0)) {*/
                    var f = $('<div class="element-box">').append($('<div class="element-box-contents">').append(c));
                    e.append(f);
                    5 != ("" + a.type).charAt(0) && 6 != ("" + a.type).charAt(0) && "r" != a.type && "c" != a.type && "a" != a.type && "8" != a.type && "l" != a.type && "s" != a.type && "i" != a.type && "h" != a.type || "edit" != b || $(c).before($('<div class="element" style="position: absolute; height: 100%; width: 100%;z-index: 1;">'))
                /*}*/
                //判断移动端&&修改大小
                if(PCcheck()){
                    if (a.css) {
                        var g = 320*(checkHeight()) - parseInt(a.css.left);
                        e.css({
                            width: g
                        }), e.css({
                            width: Math.ceil(parseInt(a.css.width)*(checkHeight())),
                            height: Math.ceil(parseInt(a.css.height)*(checkHeight())),
                            left: Math.ceil(parseInt(a.css.left)*(checkHeight())),
                            top: Math.ceil(parseInt(a.css.top)*(checkHeight())),
                            zIndex: a.css.zIndex,
                            bottom: Math.ceil(parseInt(a.css.bottom)*(checkHeight())),
                            transform: a.css.transform
                        });
                        (0 === a.css.boxShadowSize || "0" == a.css.boxShadowSize) && (a.css.boxShadow = "rgba(0,0,0,0) 0 0 0");

                        if ("edit" != data.mode && "x" == ("" + a.type).charAt(0)) {
                            e.append(f);
                            e.find(".element-box").css({
                                borderStyle: a.css.borderStyle,
                                borderWidth: a.css.borderWidth,
                                borderColor: a.css.borderColor,
                                borderTopLeftRadius: a.css.borderTopLeftRadius,
                                borderTopRightRadius: a.css.borderTopRightRadius,
                                borderBottomRightRadius: a.css.borderBottomRightRadius,
                                borderBottomLeftRadius: a.css.borderBottomLeftRadius,
                                boxShadow: a.css.boxShadow,
                                backgroundColor: a.css.backgroundColor,
                                opacity: a.css.opacity,
                                width: "100%",
                                height: "100%",
                                overflow: "hidden"
                            }), e.find("img").css({
                                width: "100%"
                            });
                            return e;
                        }
                        isAndroid() && isWeixin() && 4 == a.type && "0px" != a.css.borderRadius && 0 == a.css.borderWidth && a.properties.anim && (a.css.borderWidth = 1, a.css.borderColor = "rgba(0,0,0,0)");
                        f.css(a.css).css({
                            width: "100%",
                            height: "100%",
                            transform: "none"
                        }), f.children(".element-box-contents").css({
                            width: "100%",
                            height: "100%"
                        }), 4 != ("" + a.type).charAt(0) && "n" != ("" + a.type).charAt(0) && "m" != ("" + a.type).charAt(0) && "p" != ("" + a.type).charAt(0) && "h" != ("" + a.type).charAt(0) && $(c).css({
                            width: Math.round(parseInt(a.css.width)*(checkHeight())),//修改大小
                            height: Math.round(parseInt(a.css.height)*(checkHeight()))
                        }), "h" == ("" + a.type).charAt(0) && ($(c).find("g").length ? $(c).find("g").attr("fill", a.css.color) : $(c).children().attr("fill", a.css.color), f.children(".element-box-contents").css("position", "relative"))
                    }
                }else{
                    if (a.css) {
                        var g = 320 - a.css.left;
                       e.css({
                            width: g
                        }), e.css({
                            width: a.css.width,
                            height: a.css.height,
                            left: a.css.left,
                            top: a.css.top,
                            zIndex: a.css.zIndex,
                            bottom: a.css.bottom,
                            transform: a.css.transform
                        });
                        (0 === a.css.boxShadowSize || "0" == a.css.boxShadowSize) && (a.css.boxShadow = "rgba(0,0,0,0) 0 0 0");

                        if ("edit" != data.mode && "x" == ("" + a.type).charAt(0)) {
                            e.append(c);
                            e.find(".element-box").css({
                                borderStyle: a.css.borderStyle,
                                borderWidth: a.css.borderWidth,
                                borderColor: a.css.borderColor,
                                borderTopLeftRadius: a.css.borderTopLeftRadius,
                                borderTopRightRadius: a.css.borderTopRightRadius,
                                borderBottomRightRadius: a.css.borderBottomRightRadius,
                                borderBottomLeftRadius: a.css.borderBottomLeftRadius,
                                boxShadow: a.css.boxShadow,
                                backgroundColor: a.css.backgroundColor,
                                opacity: a.css.opacity,
                                width: "100%",
                                height: "100%",
                                overflow: "hidden"
                            }), e.find("img").css({
                                width: "100%"
                            });
                            return e;
                        }
                        isAndroid() && isWeixin() && 4 == a.type && "0px" != a.css.borderRadius && 0 == a.css.borderWidth && a.properties.anim && (a.css.borderWidth = 1, a.css.borderColor = "rgba(0,0,0,0)");
                        f.css(a.css).css({
                            width: "100%",
                            height: "100%",
                            transform: "none"
                        }), f.children(".element-box-contents").css({
                            width: "100%",
                            height: "100%"
                        }), 4 != ("" + a.type).charAt(0) && "n" != ("" + a.type).charAt(0) && "m" != ("" + a.type).charAt(0) && "p" != ("" + a.type).charAt(0) && "h" != ("" + a.type).charAt(0) && $(c).css({
                            width: a.css.width,
                            height: a.css.height
                        }), "h" == ("" + a.type).charAt(0) && ($(c).find("g").length ? $(c).find("g").attr("fill", a.css.color) : $(c).children().attr("fill", a.css.color), f.children(".element-box-contents").css("position", "relative"))
                    }
                }
                return e
            }
        
        },
        getAnim = function() {
            return animArr//拼接css3动画
        },
        addInterceptor = function (a) {//拼接css3动画
            animArr.push(a)
        },
        trigger  = function(a, b) {//触发 sends
            if (b.trigger) {
                var c = $(a);
                j && clearTimeout(j);
                b.trigger.sends && b.trigger.sends.length && $.each(b.trigger.sends, function (a, b) {
                    c.bind(utilTrigger.getSendType(b.type).name, function () {
                        j = setTimeout(function () {
                            $.each(b.handles, function (a, b) {

                                var c = utilTrigger.getHandleType(b.type).name;
                                $.each(b.ids, function (a, b) {
                                    var d;
                                    d = $("#inside_" + b, ".phone-view").length ? $("#inside_" + b, ".phone-view") : $("#inside_" + b);
                                    d.trigger(c);
                                })
                            })
                        }, 1e3 * b.delay)
                    })
                })
            }
        },
        bgMusic = function(a, b) {//背景音乐与音效相互切换
            if (b.sound) {
                var c = $(a),
                    d = $("#media").get(0);
                0 == b.sound.src.indexOf("http://") ? b.sound.src = b.sound.src : b.sound.src = PREFIX_FILE_HOST + b.sound.src;
                utilSound.addAudio(a, b.sound.src);
                c.click(function () {
                    var media = $("#media").get(0);
                    utilSound.play(a, function () {
                        media && media.play()
                    }, function () {
                        media && media.pause()
                    })
                })
            }
        },
        turnTo = function(a, b) {//跳转
            "view" == data
        },
        stopMove = function(a) {
            $(a).bind("touchstart mousedown", function (a) {
                a.stopPropagation()
            })
        },
        AutoFlip = function(a) {
            a.focus(function (a) {
                action.pauseAutoFlip()
            }).blur(function (a) {
                $(document).trigger("startAutoFlip")
            })
        },
        fontClick = function(a) {
            for (var b = $(a).find("a[data]"), c = 0; c < b.length; c++) {
                if (b[c] && "view" == data.mode) {
                    $(b[c]).css("cursor", "pointer");
                    var d = $(b[c]).attr("data");
                    !function (a) {
                        b[c].removeAttribute("href"), $(b[c]).click(function (b) {
                            eqxiu.pageScroll(a)
                        })
                    }(d)
                }
            }
        },
        getCode = function(sceneId){
             $.getScript(CLIENT_CDN + "common/js/qrcode.js", function () {
                $.getScript(CLIENT_CDN + "common/js/jquery.qrcode.js", function () {
                    var b, c = getDomain(PREFIX_HOST);
                    b = window.location.href.indexOf(c) >= 0 ? parseInt(10 * Math.random(), 10) % 2 ? PREFIX_URL : PREFIX_URL : PREFIX_URL;
                    $("<span>扫我在手机观看</span>").appendTo($("#code")),$("#code").qrcode({
                        render: "canvas",
                        width: 100,
                        height: 100,
                        /*text: b + "v-" + sceneId + "?eqrcode=1"*/
                        text: b + "view.html?id=" + sceneId 
                    })
                });
            });
        },
        getEffect = function(list,type){
            var audioObj = {
                bgAudio: eval("("+list.obj.bgAudio+")")
            },pages = list.list,a = 1;
            switch (type) {
                case "finger":
                    var obj = {finger: list.list[0].properties.finger,num: list.list[0].num},pageInfo = [obj];
                    return $.getScript("view/js/lock_effect.js", function (b, c, d) {
                                test(audioObj, pages, pageInfo, $(".m-img").width(), $(".m-img").height(),a)
                            });
                case "scratch":
                    return $.getScript("view/js/scratch_effect.js", function (b, c, d) {
                                addScratchEffect(audioObj, pages, a, a)
                            });
                case "fallingObject":
                    return $.getScript("view/js/falling_object.js", function (b, c, d) {
                                fallingObject(list.list, a,a)
                            });
                case "effect":
                        debugger;
                    return resources.load(window.eqx[list.list[0].properties.effect.name].config.resources), resources.onReady(function () {
                                window[list.list[0].properties.effect.name].doEffect(audioObj, a, list.list)
                            });
            }
            
            
        },
        getPictureList = function(childWidth, childHeight, parentWidth, parentHeight){//图集
            var e = {},
                childRate = childWidth / childHeight,
                parentRate = parentWidth / parentHeight;
                if(childRate > parentRate){
                    e.width = parentWidth;
                    e.height = parentWidth / childRate;
                }else{
                    e.height = parentHeight;
                    e.width = parentHeight * childRate;
                }

            return e
        },
        playPageMusic = function(pageMusics){//播放当页音乐
            var aud = $("<audio id='pageMusic' autoplay='true' src=''></audio>");
            (pageMusics.length > 0 ) && aud.appendTo($("#page1"));
            var nowPage = $("#page1");
            var pageNum = 1;
            var src = pageMusics[0] && (pageMusics[0].url.substr(0,5) == "index" ? pageMusics[0].url.split('index.php')[1] :(pageMusics[0].url));
             pageMusics[0] ? aud.attr('src', src) : aud.attr('src', "");
                
        };
        return{
            reset: reset,
            appendToUL: appendToUL,
            addComponent: addComponent,
            bindEditEvent: bindEditEvent,
            bindAfterRenderEvent: bindAfterRenderEvent,
            parse: parse,
            makeLi: makeLi,
            getAnim: getAnim,
            addInterceptor: addInterceptor,
            trigger: trigger,
            bgMusic: bgMusic,
            turnTo: turnTo ,
            stopMove: stopMove,
            AutoFlip: AutoFlip,
            fontClick: fontClick,
            getCode: getCode,
            getEffect: getEffect,
            getPictureList: getPictureList,
            playPageMusic: playPageMusic
        }
}();
    vxuebao.addInterceptor(function(a, b, c) {
        eqxCommon.animation(a, b, c)//拼接css3动画
    }),vxuebao.addComponent("1", function (a) {
        var b = document.createElement("div");
        b.id = a.id;
        b.setAttribute("class", "element comp_title");
        a.content && (b.textContent = a.content);
        if (a.css) {
            var c, d = a.css;
            for (c in d) {
                b.style[c] = d[c]
            }
        }
        if (a.properties.labels) {
            for (var e = a.properties.labels, f = 0; f < e.length; f++) {
                $('<a class = "label_content" style = "display: inline-block;">').appendTo($(b)).html(e[f].title).css(e[f].color).css("width", 100 / e.length + "%");
            }
        }
        return b
    }), vxuebao.addComponent("2", function (a) {
        var b = document.createElement("div");
        if(PCcheck()){//判断移动端&&修改大小
            if((a.content).indexOf("font-size")){
                var content = a.content; 
                var re = /font-size/g; // 注意g将全文匹配，不加将永远只返回第一个匹配。 
                var arr; 
                while((arr = re.exec(content)) !=null){ //exec使arr返回匹配的第一个，while循环一次将使re在g作用寻找下一个匹配。 
                    var position = arr.index;
                    var head = a.content.slice(0,position+11);
                    var fontSize = Math.round(Number(a.content.slice(position+11,position+13))*(checkHeight()));
                    var foot = a.content.slice(position+13);
                    if(fontSize){
                        a.content = head + fontSize + foot;
                    }
                } 
            }
            if((a.content).indexOf("line-height")){
                var position1 = (a.content).indexOf("line-height");
                    var head1 = a.content.slice(0,position1+13);
                    var fontSize1 = Math.round(Number(a.content.slice(position1+13,position1+17))*(checkHeight()));
                    var foot1 = a.content.slice(position1+17);
                    if(fontSize1){
                        a.content = head1 + fontSize1 + foot1;
                    }
            }
        }
        b.id = a.id;
        b.setAttribute("ctype", a.type);
        !PCcheck() ? b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph1") : ($(window).height() >750 ? b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph5") :b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph3"));

        a.content && (b.innerHTML = a.content);
        b.style.cursor = "default";

        return b
    }), vxuebao.addComponent("x", function (a) {
        if(PCcheck()){//判断移动端&&修改大小
            if((a.content).indexOf("font-size")){
                var content = a.content; 
                var re = /font-size/g; // 注意g将全文匹配，不加将永远只返回第一个匹配。 
                var arr; 
                while((arr = re.exec(content)) !=null){ //exec使arr返回匹配的第一个，while循环一次将使re在g作用寻找下一个匹配。 
                    var position = arr.index;
                    var head = a.content.slice(0,position+11);
                    var fontSize = Math.round(Number(a.content.slice(position+11,position+13))*(checkHeight()));
                    var foot = a.content.slice(position+13);
                    if(fontSize){
                        a.content = head + fontSize + foot;
                    }
                } 
            }
            if((a.content).indexOf("line-height")){
                var position1 = (a.content).indexOf("line-height");
                    var head1 = a.content.slice(0,position1+13);
                    var fontSize1 = Math.round(Number(a.content.slice(position1+13,position1+17))*(checkHeight()));
                    var foot1 = a.content.slice(position1+17);
                    if(fontSize1){
                        a.content = head1 + fontSize1 + foot1;
                    }
            }
        }
        var b;
        b = document.createElement("div");
        b.id = a.id;
        b.setAttribute("ctype", a.type);
        !PCcheck() ? b.setAttribute("class", "element comp_paragraph comp_paragraph1 editable-text") : ($(window).height() >750 ? b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph5") : b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph3"));
        a.content && (b.innerHTML = a.content);
        b.style.cursor = "default";

        return b
    }), vxuebao.addComponent("3", function (a, b) {
        var c, d = document.createElement("div");
        "edit" == data.mode ? (c = b ? b.parent(".edit_wrapper") : $("#nr .edit_wrapper"), d.setAttribute("class", "wrapper-background"), d.setAttribute("id", a.id)) : "view" == data.mode && (c = b ? b.parent(".edit_wrapper") : $("#edit_area" + data.def.id).parent(".edit_wrapper"), d.setAttribute("id", "wrapper-background" + data.def.id)), $(d).prependTo(c).css({
            width: "100%",
            height: "100%"
        });
        var e, f = new Image;
        if(a.properties.imgSrc){
            e = a.properties.imgSrc;
            if(/^http.*!/.test(e)){
                f.src = e;
                d.style.backgroundImage = "url(" + e + ")";
            }else{
                f.src = window.PREFIX_FILE_HOST+ e;
                d.style.backgroundImage = "url(" + window.PREFIX_FILE_HOST + e + ")";
            }
            d.style.backgroundOrigin = "element content-box";
            d.style.backgroundSize = "cover";
            d.style.backgroundPosition = "50% 50%";
            a.effect && ("scaleUp" == a.effect.type ? $(d).css({
                animation: "scaleUp 7s ease 1s",
                "animation-fill-mode": "both"
            }) : "scaleDown" == a.effect.type && $(d).css({
                animation: "scaleDown 7s ease 1s",
                "animation-fill-mode": "both"
            }))
        }else{
            a.properties.bgColor && (d.style.backgroundColor = a.properties.bgColor);
        }

        return d
    }), vxuebao.addComponent("4", function (a) {
        if(a.properties.src){
            var b = document.createElement("img");
            b.id = a.id;
            b.setAttribute("ctype", a.type);
            b.setAttribute("class", "element comp_image editable-image");
            /^http.*/.test(a.properties.src) ? b.src = a.properties.src : b.src = window.PREFIX_FILE_HOST + a.properties.src;

            return b
        }
        
    }), vxuebao.addComponent("m", function (a) {//创建百度地图img标签
        var b = $("<div id='"+a.id+"' ctype='"+a.type+"' class='element comp_image editable-image' ></div>");
        celectMap.push(a);
        //异步生成百度地图
        asyncLoading(); 
        return b
    }),vxuebao.addComponent("h", function (a) {
        if(PCcheck()){//判断移动端&&修改大小
            if(a.css["borderRadius"]){
                a.css["borderRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
                a.css["borderBottomLeftRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
                a.css["borderBottomRightRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
                a.css["borderTopLeftRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
                a.css["borderTopRightRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
            }
        }
        var b, c;
        if (a.properties.type.indexOf("symbol") < 0) {

            var b = document.createElementNS(eqxiuSvg.NAMESPACE, "svg");
            b.id = a.id;
            b.setAttribute("class", "element svg-element");
            b.setAttribute("xmlns", eqxiuSvg.NAMESPACE);
            b.setAttribute("version", "1.1");
            b.setAttribute("width", "100%");
            b.setAttribute("height", "100%");
            b.setAttribute("preserveAspectRatio", "none");
            c = eqxiuSvg.ShapeFromType(a.properties.type);
            c.setAttribute("fill", "#555");
            b.appendChild(c);
            s = eqxiuSvg.boundingBox(c);
            viewBox = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" ");
            b.setAttribute("viewBox", viewBox);

            return b
        }

        b = document.createElement("div");
        c = eqxiuSvg.ShapeFromType(a.properties.type, 100, 100, a.id, a.css.color);
        b = '<svg id="' + a.id + '" class="element svg-element" ctype="' + a.type + '" xmlns="' + eqxiuSvg.NAMESPACE + '" version="1.1" width="100%" height="100%" preserveAspectRatio="xMidYMid" viewBox="' + a.properties.viewBox + '">' + c + "</svg>"

        return b;

        //return b = document.createElement("div"), c = eqxiuSvg.ShapeFromType(a.properties.type, 100, 100, a.id, a.css.color), b = '<svg id="' + a.id + '" class="element svg-element" ctype="' + a.type + '" xmlns="' + eqxiuSvg.NAMESPACE + '" version="1.1" width="100%" height="100%" preserveAspectRatio="xMidYMid" viewBox="' + a.properties.viewBox + '">' + c + "</svg>"
    }), vxuebao.addComponent("v", function (a) {
        var b = document.createElement("div");
        var c = document.createElement("a");
        $(c).appendTo($(b));
        b.setAttribute("class", "element video_area");
        c.setAttribute("class", "element video_box");
        b.id = a.id;
        b.setAttribute("ctype", a.type);
        b.setAttribute("type", a.properties.type);
        /^http.*/.test(a.properties.src) ? b.setAttribute("videourl", a.properties.src) : b.setAttribute("videourl", PREFIX_FILE_HOST + a.properties.src);

        return b
    }), vxuebao.addComponent("5", function (a) {
        var b = document.createElement("textarea");//判断移动端&&修改大小
        b.id = a.id;
        b.setAttribute("ctype", a.type);
        !PCcheck() ? b.setAttribute("class", "element comp_input editable-text comp_input1") : ($(window).height() >750 ? b.setAttribute("class", "element comp_input editable-text comp_input5") : b.setAttribute("class", "element comp_input editable-text comp_input3"));
        b.setAttribute("maxlength", "300");
        a.properties.required && b.setAttribute("required", a.properties.required);
        a.properties.placeholder && b.setAttribute("placeholder", a.properties.placeholder);
        b.setAttribute("name", "eq[f_" + a.id + "]");
        b.style.width = "100%";

        return b
    }), vxuebao.addComponent("r", function (a) {//判断移动端&&修改大小--单选框
        var b = !PCcheck() ? $('<div class="element comp_radio editable-text comp_radio1" id="' + a.id + '"></div>') : ($(window).height() >750 ? $('<div class="element comp_radio editable-text comp_radio5" id="' + a.id + '"></div>') : $('<div class="element comp_radio editable-text comp_radio3" id="' + a.id + '"></div>'));
        b.attr("ctype", a.type);
        b.attr("required", a.properties.required);
        b.attr("title", a.title);
        b.attr("name", "eq[f_" + a.id + "]");

        var c = $('<div class="radio-title">' + a.title + "</div>");
        a.properties.titleStyle && c.css(a.properties.titleStyle);
        b.append(c);

        var d = $('<div class="options"></div>'),
            e = JSON.parse(a.choices);
        $.each(e.options, function (b, c) {
            var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="radio" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
            a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle);
            d.append(f);
        });
        b.append(d);
        b.width("100%");

        return b.get(0)
    }), vxuebao.addComponent("c", function (a) {//判断移动端&&修改大小--多选框
        var b = !PCcheck() ? $('<div class="element comp_radio editable-text comp_radio1" id="' + a.id + '"></div>') : ($(window).height() >750 ? $('<div class="element comp_radio editable-text comp_radio5" id="' + a.id + '"></div>') : $('<div class="element comp_radio editable-text comp_radio3" id="' + a.id + '"></div>'));
        b.attr("ctype", a.type);
        b.attr("required", a.properties.required);
        b.attr("title", a.title);
        b.attr("name", "eq[f_" + a.id + "]");

        var c = $('<div class="radio-title">' + a.title + "(可多选)</div>");
        a.properties.titleStyle && c.css(a.properties.titleStyle);
        b.append(c);

        var d = $('<div class="options"></div>'),
            e = JSON.parse(a.choices);
        $.each(e.options, function (b, c) {
            var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="checkbox" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
            a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle);
            d.append(f);
        });
        b.append(d);
        b.width("100%");

        return b.get(0)
    }), vxuebao.addComponent("a", function (a) {
        if(PCcheck()){//判断移动端&&修改大小--添加评分
           if(typeof(a.css["lineHeight"]) == "string"){
                a.css["lineHeight"] = Math.round(Number((a.css["lineHeight"]).slice(0,-2)) * (checkHeight()))+"px";
            } 
        }
        var b = !PCcheck() ? $('<div class="element comp_rating editable-text comp_rating1" id="' + a.id + '"></div>') : ($(window).height() >750 ? $('<div class="element comp_rating editable-text comp_rating5" id="' + a.id + '"></div>') : $('<div class="element comp_rating editable-text comp_rating3" id="' + a.id + '"></div>'));
        b.attr("ctype", a.type);
        b.attr("required", a.properties.required);
        b.attr("title", a.title);
        b.attr("name", "eq[f_" + a.id + "]");
        b.append(!PCcheck() ? $('<div class="rating-title rating-title1">' + a.title + "</div>") : ($(window).height() >750 ? $('<div class="rating-title rating-title5">' + a.title + "</div>") : $('<div class="rating-title rating-title3">' + a.title + "</div>")));

        var c = !PCcheck() ? $('<div class="rating-icons rating-icons1"></div>') : ($(window).height() >750 ? $('<div class="rating-icons rating-icons5"></div>') : $('<div class="rating-icons rating-icons3"></div>'));

        for (var d = 0; 5 > d; d++) {
            c.append($('<i class="' + a.properties.icon + "-line " + a.properties.size + '">').css("color", a.properties.color));
        }
        b.append(c);
        b.append($('<input type="hidden" name="eq[f_' + a.id + ']" value="">'));
        b.width("100%");

        return b.get(0)
    }), vxuebao.addComponent("p", function (a) {
        if (a.properties && a.properties.children) {//判断移动端&&修改大小
            var c = !PCcheck() ? a.css.width : Math.round(parseInt(a.css.width)*(checkHeight())),
                d = !PCcheck() ? a.css.height : Math.round(parseInt(a.css.height)*(checkHeight())),
                e = $('<div id="' + a.id + '" class="slider element" ctype="' + a.type + '"></div>');
            a.properties.bgColor && e.css("backgroundColor", a.properties.bgColor);
            $.each(a.properties.children, function (a, f) {
                var g = vxuebao.getPictureList(f.width, f.height, c, d),
                    h = $('<img src="' + window.PREFIX_FILE_HOST + f.src + '">');
                h.css({//判断移动端&&修改大小
                    margin: (d - g.height) / 2 + "px " + (c - g.width) / 2 + "px",
                    width: !PCcheck() ? g.width : Math.round(parseInt(g.width)*(checkHeight())),
                    height: !PCcheck() ? g.height : Math.round(parseInt(g.height)*(checkHeight()))
                });
                e.append(h);
            });
            utilPictures.deleteInterval(a.id);

            return e.get(0)
        }
    }), vxuebao.addComponent("n", function (a) {
        if (a.properties && a.properties.pics.length) {
            var b = (a.css.width, a.css.height, $('<div id="' + a.id + '" class="random-event element comp_image editable-image" ctype="' + a.type + '"></div>'));
            $.each(a.properties.pics, function (a, c) {
                var d = $('<img src="' + window.PREFIX_FILE_HOST + c.src + '">');
                d.css({
                    width: "100%",
                    height: "100%",
                    display: "none"
                }), 0 === a && (d.css({
                    display: "block"
                }), b.css({
                    width: "100%",
                    height: "100%"
                })), b.append(d)
            });
            return b.get(0)
        }
    }), vxuebao.addComponent("6", function (a) {
        var b = document.createElement("button");//判断移动端&&修改大小--提交按钮
        b.id = a.id;
        b.setAttribute("ctype", a.type);
        !PCcheck() ? b.setAttribute("class", "element comp_button editable-text comp_button1") : ($(window).height() >750 ? b.setAttribute("class", "element comp_button editable-text comp_button5") : b.setAttribute("class", "element comp_button editable-text comp_button3"));
        if (a.properties.title) {
            var c = a.properties.title.replace(/ /g, "&nbsp;");
            b.innerHTML = c
        }
        b.style.width = "100%";

        return b
    }), vxuebao.addComponent("8", function (a) {
        var b = document.createElement("a");//判断移动端&&修改大小--添加电话
        b.id = a.id;
        b.setAttribute("ctype", a.type);
        !PCcheck() ? b.setAttribute("class", "element comp_anchor comp_anchor1 editable-text") : ($(window).height() > 750 ? b.setAttribute("class", "element comp_anchor comp_anchor5 editable-text") : b.setAttribute("class", "element comp_anchor comp_anchor3 editable-text"));
        var c = null;
        if(a.properties.imgSrc){
            c = $('<img style="width: 100%; height: 100%;" src="' + (window.PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>');
            $(b).html(c);
            "view" == data.mode && $(b).attr("href", "tel:" + a.properties.number);

        }else if(a.properties.title){
            c = a.properties.title.replace(/ /g, "&nbsp;");
            $(b).html(c);
            "view" == data.mode && $(b).attr("href", "tel:" + a.properties.number);
        }

        b.style.cursor = "default";
        b.style.width = "100%";

        return b
    }), vxuebao.addComponent("l", function (a) {////判断移动端&&修改大小--添加链接&一键拨号
        var b = document.createElement("a");
        b.id = a.id;
        b.setAttribute("ctype", a.type);
        !PCcheck() ? b.setAttribute("class", "element comp_anchor comp_anchor1 editable-text") : ($(window).height() > 750 ? b.setAttribute("class", "element comp_anchor comp_anchor5 editable-text") : b.setAttribute("class", "element comp_anchor comp_anchor3 editable-text"));
        var c = null;
        if(a.properties.imgSrc){
            c = $('<img style="width: 100%; height: 100%;" src="' + (window.PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>');
            $(b).html(c);

        }else if(a.properties.title){
            c = a.properties.title.replace(/ /g, "&nbsp;");
            $(b).html(c);
        }

        b.style.cursor = "default";
        b.style.width = "100%";

        return b
    }), vxuebao.addComponent("s", function (a) {////判断移动端&&修改大小--添加音效
        var b = document.createElement("a");
        b.id = a.id;
        b.setAttribute("ctype", a.type);
        !PCcheck() ? b.setAttribute("class", "element comp_anchor comp_anchor1 editable-text") : ($(window).height() > 750 ? b.setAttribute("class", "element comp_anchor comp_anchor5 editable-text") : b.setAttribute("class", "element comp_anchor comp_anchor3 editable-text"));
        var c = null;
        if(a.properties.imgSrc){
            c = $('<img style="width: 100%; height: 100%;" src="' + (window.PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>');
            $(b).html(c);

        }else if(a.properties.title){
            c = a.properties.title.replace(/ /g, "&nbsp;");
            $(b).html(c);
        }
        b.style.cursor = "default";
        b.style.width = "100%";

        return b
    }), vxuebao.addComponent("i", function (b) {//计数--喜欢
        if(PCcheck()){//判断移动端&&修改大小
            if(typeof(b.css["lineHeight"]) == "string"){
                b.css["lineHeight"] = Math.round(Number((b.css["lineHeight"]).slice(0,-2)) * (checkHeight()))+"px";
            }else{
                if(typeof(b.css["height"]) == "string"){
                    b.css["lineHeight"] = Math.round(Number((b.css["height"]).slice(0,-2)) * (checkHeight()))+"px";
                }else{
                    b.css["lineHeight"] = Math.round(b.css["height"] * checkHeight())+"px";
                }
            }
            if(typeof(b.css["borderRadius"]) == "string"){
                b.css["borderRadius"] = Math.round(Number((b.css["borderRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                if(b.css["borderBottomLeftRadius"]){
                    b.css["borderBottomLeftRadius"] = Math.round(Number((b.css["borderBottomLeftRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                    b.css["borderBottomRightRadius"] = Math.round(Number((b.css["borderBottomRightRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                    b.css["borderTopLeftRadius"] = Math.round(Number((b.css["borderTopLeftRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                    b.css["borderTopRightRadius"] = Math.round(Number((b.css["borderTopRightRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                }
                
            }else{
                b.css["borderRadius"] = Math.round(Number((b.css["borderRadius"])) * (checkHeight()));
                if(b.css["borderBottomLeftRadius"]){
                    b.css["borderBottomLeftRadius"] = Math.round(Number((b.css["borderBottomLeftRadius"])) * (checkHeight()));
                    b.css["borderBottomRightRadius"] = Math.round(Number((b.css["borderBottomRightRadius"])) * (checkHeight()));
                    b.css["borderTopLeftRadius"] = Math.round(Number((b.css["borderTopLeftRadius"])) * (checkHeight()));
                    b.css["borderTopRightRadius"] = Math.round(Number((b.css["borderTopRightRadius"])) * (checkHeight()));
                }
                
            }
        }
        var c = !PCcheck() ? $('<div class="element comp_counter not-voted editable-text comp_counter1" id="' + b.id + '"></div>') : ($(window).height() >750 ? $('<div class="element comp_counter not-voted editable-text comp_counter5" id="' + b.id + '"></div>') : $('<div class="element comp_counter not-voted editable-text comp_counter3" id="' + b.id + '"></div>'));
        c.attr("ctype", b.type);
        c.attr("name", "eq[f_" + b.id + "]");
        c.addClass(b.properties.layout).addClass(b.properties.size);

        var d = $('<div class="counter-container"></div>');
        if(b.properties.imgSrc){
            d.append($('<img class="counter-elem counter-icon" style="width: 115px; height: 115px; margin: 0 auto;" src="' + (PREFIX_FILE_HOST + b.properties.imgSrc) + '"></img>'))
        }else{
            d.append($('<i class="counter-elem icon iconfont ' + b.properties.icon + '"></i>').css("color", b.properties.color));
        }
        var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
        if (d.append(e), "view" == data.mode ? counterValues && counterValues.then(function (c) {
                var d = c.map[b.id] || 0;
                e.attr("data-counter-number", d);
                var f = fixedNum(d);
                e.text(f)
            }) : c.removeClass("not-voted"), c.width("100%"), "counter-tb" === b.properties.layout) {
            var f = 0;
            
            if(b.properties.imgSrc){
                if("counter-l" == b.properties.size){
                    f = PCcheck() ? Math.round(62 * (checkHeight())) : 62;
                }else if("counter-m" == b.properties.size){
                    f = PCcheck() ? Math.round(57 * (checkHeight())) : 57;
                }else{
                    f = PCcheck() ? Math.round(53 * (checkHeight())) : 53;
                }

            }else{
                if("counter-l" == b.properties.size){
                    f = PCcheck() ? Math.round(30 * (checkHeight())) : 30;
                }else if("counter-m" == b.properties.size){
                    f = PCcheck() ? Math.round(20 * (checkHeight())) : 20;
                }else{
                    f = PCcheck() ? Math.round(15 * (checkHeight())) : 15;
                }
            }
            d.css("margin-top", -f)
        }
        "edit" != data.mode && setTimeout(function () {
           /* var a = {
                width: "auto",
                "min-width": b.css.width
            };
            c.css(a), c.parents("li.comp-resize").css(a)*/
        }, 100);
        c.append(d);/* b.css.lineHeight && c.css("line-height", b.css.lineHeight),*/ 

        return c.get(0)
    }), vxuebao.addComponent("d", function (b) {
        if(PCcheck()){//判断移动端&&修改大小
            if(typeof(b.css["lineHeight"]) == "string"){
                b.css["lineHeight"] = Math.round(Number((b.css["lineHeight"]).slice(0,-2)) * (checkHeight()))+"px";
            }
            if(typeof(b.css["borderRadius"]) == "string"){
                b.css["borderRadius"] = Math.round(Number((b.css["borderRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                if(b.css["borderBottomLeftRadius"]){
                    b.css["borderBottomLeftRadius"] = Math.round(Number((b.css["borderBottomLeftRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                    b.css["borderBottomRightRadius"] = Math.round(Number((b.css["borderBottomRightRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                    b.css["borderTopLeftRadius"] = Math.round(Number((b.css["borderTopLeftRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                    b.css["borderTopRightRadius"] = Math.round(Number((b.css["borderTopRightRadius"]).slice(0,-2)) * (checkHeight()))+"px";
                }
                
            }else{
                b.css["borderRadius"] = Math.round(Number((b.css["borderRadius"])) * (checkHeight()));
                if(b.css["borderBottomLeftRadius"]){
                    b.css["borderBottomLeftRadius"] = Math.round(Number((b.css["borderBottomLeftRadius"])) * (checkHeight()));
                    b.css["borderBottomRightRadius"] = Math.round(Number((b.css["borderBottomRightRadius"])) * (checkHeight()));
                    b.css["borderTopLeftRadius"] = Math.round(Number((b.css["borderTopLeftRadius"])) * (checkHeight()));
                    b.css["borderTopRightRadius"] = Math.round(Number((b.css["borderTopRightRadius"])) * (checkHeight()));
                }
                
            }
        }
        
        var c = !PCcheck() ? $('<div class="element comp_counter editable-text comp_counter1" id="' + b.id + '"></div>') : ($(window).height() >750 ? $('<div class="element comp_counter editable-text comp_counter5" id="' + b.id + '"></div>') : $('<div class="element comp_counter editable-text comp_counter3" id="' + b.id + '"></div>'));
        c.attr("ctype", b.type);
        c.addClass(b.properties.layout).addClass(b.properties.size);

        var d = $('<div class="counter-container"></div>');
        d.append($('<i class="counter-elem icon iconfont ' + b.properties.icon + '"></i>').css("color", b.properties.color));

        var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
        d.append(e);
        "view" == data.mode && showCount && showCount.then(function (b) {
            var c = fixedNum(b),
                d = c || 0;
            e.text(d)
        });
        c.width("100%");

        if ("counter-tb" === b.properties.layout) {
            var f = 0;
            if("counter-l" == b.properties.size){
                f = PCcheck() ? Math.round(30 * (checkHeight())) : 30;
            }else if("counter-m" == b.properties.size){
                f = PCcheck() ? Math.round(20 * (checkHeight())) : 20;
            }else{
                f = PCcheck() ? Math.round(15 * (checkHeight())) : 15;
            }

            d.css("margin-top", -f)
        }
        c.append(d);
        b.css.lineHeight && c.css("line-height", b.css.lineHeight);

        return c.get(0)
    }), vxuebao.addComponent("7", function (a) {
        var b = document.createElement("div");
        b.id = "map_" + a.id;
        b.setAttribute("class", "element comp_map_wrapper");
        a.content && (b.textContent = a.content);

        if (a.css) {
            var c, d = a.css;
            for (c in d) {
                b.style[c] = d[c]
            }
        }
        b.style.height = "250px";

        return b
    }), vxuebao.bindAfterRenderEvent("1", function (a, b) {
        if (a = $("div", a)[0], "view" == data.mode && 1 == b.type) {
            var c = b.properties.labels;
            for (key in c){
                !function (b) {
                    $($(a).find(".label_content")[b]).on("click", function () {
                        console.log('14')
                        pageScroll(c[b])
                    })
                }(key)
            }
        }
    }), vxuebao.bindAfterRenderEvent("8", function (a, b) {
        a = $("a", a)[0];
        var c = {
            id: b.sceneId,
            num: b.properties.number
        };
        if ("view" == data.mode) {
            var d = function () {
                $.ajax({
                    cache: !0,
                    type: "POST",
                    url: PREFIX_S1_URL + "index.php?c=scene&a=dial",
                    data: $.param(c),
                    async: !1,
                    error: function (a) {
                        layer.alert("Connection error")
                    },
                    success: function (a) {
                    }
                })
            };
            a.addEventListener("click", d)
        }
    }), vxuebao.bindAfterRenderEvent("l", function (a, b) {
        if (a = $("a", a)[0], "view" == data.mode) {
            var c = b.properties.url;
            $(a).click(function (a) {
                isNaN(c) ? window.open(c) : action.pageScroll(c)
            })
        }
    }), vxuebao.bindAfterRenderEvent("s", function (a, b) {
        a = $("a", a)[0], "view" == data.mode && $(a).click(function (a) {
        })
    }), vxuebao.bindAfterRenderEvent("i", function (b, c) {
        if ("view" == data.mode) {
            var d = $(b).find(".icon");
            var round = $(b).find(".element-box");
            var css = c;
            var elem = $(b).find(".counter-elem");

            d.click(function (e) {
                //debugger;
                console.log('12');

                var f = {
                        sceneId: c.sceneId,
                        fieldId: c.id
                    },
                    g = $(b);
                $.ajax({
                    cache: !0,
                    type: "POST",
                    url: PREFIX_S1_URL + "index.php?c=scene&a=counterset",
                    data: $.param(f),
                    async: !1,
                    error: function (a) {
                        layer.alert("Connection error")
                    },
                    success: function (b) {
                        d.unbind("click"), g.find(".comp_counter").removeClass("not-voted");
                        var c = $(".counter-number", g),
                            e = (parseInt(c.attr("data-counter-number"), 10) || 0) + 1;
                        c.attr("data-counter-number", e);
                        var f = fixedNum(e);
                        $(".counter-number", g).text(f);
                        round.css({
                            color: css.css.backgroundColor,
                            backgroundColor: css.properties.color
                        });
                        round.find(".icon").css("color", css.css.backgroundColor);
                        round.find(".counter-number").css("color", css.css.backgroundColor);
                    }
                })
            })
        }
    }), vxuebao.bindAfterRenderEvent("4", function (a, b) {
        $(a).bind("mousedown",function(event){
            event.preventDefault();
        });
        vxuebao.turnTo(a,b)//链接
    }),vxuebao.bindAfterRenderEvent("m", function (a, b) {
        vxuebao.turnTo(a,b)
    }), vxuebao.bindAfterRenderEvent("x", function (a, b) {
        vxuebao.turnTo(a,b)
    }), vxuebao.bindAfterRenderEvent('n', function (a, b) {
    }),vxuebao.bindAfterRenderEvent("h", function (a, b) {
            vxuebao.stopMove($(a))
            "view" == data.mode && b.properties.url && $(a).click(function (a) {//链接
                var c = b.properties.url;
                isNaN(c) ? window.open(c) : action.pageScroll(c)
            })
    }), vxuebao.bindAfterRenderEvent("5", function (a, b) {
        var c = mobilecheck();
        vxuebao.stopMove($(a).find("textarea"));
        vxuebao.AutoFlip($(a).find("textarea"));
        "view" == data.mode && c && parseFloat(b.css.top) >= 200 && ($(a).find("textarea").focus(function (b) {
            $(a).closest(".edit_area").css({
                top: "-150px"
            })
        }), $(a).find("textarea").blur(function (b) {
            $(a).closest(".edit_area").css({
                top: 0
            })
        }))
    }), vxuebao.bindAfterRenderEvent("r", function (a, b) {
        "view" == data.mode && vxuebao.stopMove($(a).find("label"))
    }), vxuebao.bindAfterRenderEvent("c", function (a, b) {
        "view" == data.mode && vxuebao.stopMove($(a).find("label"))
    }), vxuebao.bindAfterRenderEvent("v", function (a, b) {
         function autoClick(){
            $(a).find(".video_box").trigger('click');  
        }
        $autoFun=setTimeout(autoClick,0);
        "view" == data.mode && $(a).find(".video_box").click(function () {
            if(b.properties.type == "v1"){
                $(a).find(".video_box").hide();
                $("#audio_btn").hasClass("video_exist") && ($("#audio_btn").hide(), $("#media")[0].pause());
                utilSound.pause();
                $('<div class="video_mask" id="mask_' + b.id + '"></div>').appendTo($(a));
                $('<a class = "close_mask" id="close_' + b.id + '"></a>').appendTo($(a));
                $(b.properties.src).appendTo($("#mask_" + b.id)).attr("style", "position: absolute;height: 100%;").attr("width", "100%").removeAttr("height");
                $("#close_" + b.id).bind("click", function () {
                        $(a).find(".video_box").show();
                        $("#mask_" + b.id).remove();
                        $("#close_" + b.id).remove();
                        $("#audio_btn").hasClass("video_exist") && $("#audio_btn").show(function () {
                            $("#media")[0].play()
                        })
                    })
            }else{
                var src = /^http.*/.test(b.properties.src) ? b.properties.src : (PREFIX_FILE_HOST + b.properties.src);
               $("#audio_btn").hasClass("video_exist") && ($("#audio_btn").hide(), $("#media")[0].pause());
                utilSound.pause();
                $('<div class="video_mask" id="mask_' + b.id + '"></div>').appendTo($(a));
                $('<a class = "close_mask" id="close_' + b.id + '"></a>').appendTo($(a));
                $("<video src='"+ src +"' controls='controls'></video>").appendTo($("#mask_" + b.id)).attr("style", "position: absolute;height: 100%;").attr("width", "100%").removeAttr("height");
                $("#close_" + b.id).bind("click", function () {
                    $("#mask_" + b.id).remove(); 
                    $("#close_" + b.id).remove();
                    $("#audio_btn").hasClass("video_exist") && $("#audio_btn").show(function () {
                        $("#media")[0].play();
                    })
                })
            }
            
        })
    }), vxuebao.bindAfterRenderEvent("2", function (a, b) {
        vxuebao.fontClick(a);
    }), vxuebao.bindAfterRenderEvent("6", function (a, b) {
        if (a = $("button", a)[0], "view" == data.mode) {
            var c = {
                    REQUIRED: "为必填项！",
                    WRONG_PHONE_NUMBER_FORMAT: "手机号码格式错误！",
                    WRONG_EMAIL_FORMAT: "邮箱格式错误！",
                    FILL_OUT_THE_FORM: "请填写表单！",
                    DUPLICATED_SUBMISSION: "请不要重复提交！",
                    THANKS_FOR_PARTICIPATION: "谢谢您的参与！"
                },
                d = function (a, b, d) {
                    var e = !0,
                        f = {};
                    if ($("textarea", d).each(function () {
                            if (e) {
                                if ("required" == $(this).attr("required") && "" == $(this).val().trim()) {
                                    return layer.alert($(this).attr("placeholder") + c.REQUIRED), void(e = !1);
                                }
                                if ("502" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
                                    var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
                                    if (!a.test($(this).val())) {
                                        return layer.alert("手机号码格式错误！"), void(e = !1)
                                    }
                                }
                                if ("503" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
                                    var b = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
                                    if (!b.test($(this).val())) {
                                        return layer.alert("邮箱格式错误！"), void(e = !1)
                                    }
                                }
                                f[$(this).attr("name")] = $(this).val()
                            }
                        }), $("input:checked", d).each(function () {
                            var a = $(this);
                            f[a.attr("name")] ? f[a.attr("name")] += "," + a.val() : f[a.attr("name")] = a.val()
                        }), $('.comp_radio[required="required"]', d).each(function () {
                            var a = $(this);
                            f[a.attr("name")] || (layer.alert(a.attr("title") + c.REQUIRED), e = !1)
                        }), $('input[type="hidden"]', d).each(function () {
                            f[$(this).attr("name")] = $(this).val()
                        }), $('.comp_rating[required="required"]', d).each(function () {
                            var a = $(this);
                            f[a.attr("name")] && "0" != f[a.attr("name")] || (layer.alert(a.attr("title") + "为必填项！"), e = !1)
                        }), e) {
                        var g = !1;
                        if ($.isEmptyObject(f)) {
                            return void(g = !0);
                        }
                        for (var h in f) {
                            if ("" !== f[h]) {
                                g = !0;
                                break
                            }
                        }
                        return g ? void $.ajax({
                            cache: !0,
                            type: "POST",
                            url: PREFIX_S1_URL + "index.php?c=scenedata&a=add&id=" + b,
                            data: $.param(f),
                            async: !1,
                            error: function (a) {
                                layer.alert("Connection error")
                            },
                            success: function (b) {
                                $(a).unbind("click").click(function () {
                                    layer.alert("请不要重复提交！")
                                }), layer.alert("谢谢您的参与！")
                            }
                        }) : void layer.alert("请填写表单！")
                    }
                };
            data.def.sceneId;
            $(a).bind("click", function () {
                console.log('9')
                var b, c = $(a).parents(".edit_wrapper").attr("data-scene-id");
                b = c ? $(a).parents(".nr").find('.edit_wrapper[data-scene-id="' + c + '"]') : $(a).parents(".nr");
                d(this, c, b);
            })
        }
    }), vxuebao.bindAfterRenderEvent("7", function (a, b) {
        var c = new BMap.Map("map_" + b.id, {
                enableMapClick: !1
            }),
            d = new BMap.Point(b.properties.x, b.properties.y),
            e = new BMap.Marker(d);
        c.addOverlay(e);
        var f = new BMap.Label(b.properties.markTitle, {
            offset: new BMap.Size(20, -10)
        });
        e.setLabel(f), c.disableDoubleClickZoom(), c.centerAndZoom(d, 15)
    }), vxuebao.bindAfterRenderEvent("p", function (a, b) {
        if (!$(a).closest(".page_tpl_container ").length) {
            $(a).children(".element-box").css("overflow", "visible"), utilPictures.deleteInterval(b.id);
            var c = $(a).find("#" + b.id);
            new flux.slider(c, {
                autoplay: b.properties.autoPlay,
                delay: b.properties.interval,
                pagination: !1,
                transitions: [utilPictures.getPicStyle(b.properties.picStyle).name],
                width: b.css.width,
                height: b.css.height,
                bgColor: b.properties.bgColor,
                onStartEnd: function (a) {
                    utilPictures.addInterval(b.id, a)
                }
            })
        }
    }), vxuebao.bindAfterRenderEvent("a", function (a, b) {
        function c(a) {
            f.each(function (b, c) {
                $(c).removeClass(h).addClass(h + "-line");
                a >= b && $(c).removeClass(h + "-line").addClass(h);
            })
        }

        var e = $(a);
        if ("view" == data.mode) {
            var f = e.find("i"),
                g = e.find("input"),
                h = b.properties.icon;
            f.each(function (a, b) {
                $(b).bind("click", function () {
                    c(a), g.val(a + 1)
                }), $(b).bind("mouseenter", function () {
                    c(a)
                })
            }), e.find(".rating-icons").bind("mouseleave", function () {
                c(parseInt(g.val(), 10) - 1)
            }), vxuebao.stopMove(e.find(".rating-icons"))
        }
    });

     //异步生成百度地图
    function initialize(){
        for(var i = 0; i<celectMap.length;i++){
            var container = "" +celectMap[i].id
            var map = new BMap.Map(container);
            var point = new BMap.Point(celectMap[i].properties.pointX,celectMap[i].properties.pointY);
            map.centerAndZoom(point, celectMap[i].properties.zoom);
            if(i != 0){
                var pointChange = new BMap.Point(celectMap[i].properties.pointX-0.002,celectMap[i].properties.pointY+0.0015);
                map.centerAndZoom(pointChange, celectMap[i].properties.zoom);
            }
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            map.enableScrollWheelZoom(true);
            map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
        }
        
    }
    function asyncLoading(){  
        var script = document.createElement("script");  
        script.type = "text/javascript";  
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=AvwUoRnNEB5MVHYRpRdwFemgZa92M2fl&callback=initialize";  
        document.head.appendChild(script); 
         
    }
    window.onload = asyncLoading;
    function getData(vxuebao) {//接收后台数据
            $("#author .author>i").text(jsondata.obj.userName);
            $("#author .readit>i").text(jsondata.obj.showCount);
            var obj = {
                bgAudio: eval("("+jsondata.obj.bgAudio+")")
            },effectType;
            $("#code").remove()
            data.def = jsondata.list[0];
            if(!isEmpty(jsondata.list[0].properties)){//特效
                if(!isEmpty(jsondata.list[0].properties.finger)){
                    effectType = "finger";
                }else if(!isEmpty(jsondata.list[0].properties.scratch)){
                    effectType = "scratch";
                }else if(!isEmpty(jsondata.list[0].properties.fallingObject)){
                    playVideo(obj);
                    effectType = "fallingObject";
                }else if(!isEmpty(jsondata.list[0].properties.effect)){
                    playVideo(obj);
                    effectType = "effect";
                }else{
                    playVideo(obj);
                }
                vxuebao.getEffect(jsondata,effectType);
            }else{
                playVideo(obj);//背景音乐
            };
            vxuebao.playPageMusic(jsondata.obj.music_url);//当前页音乐
            vxuebao.parse(data);//拼接html
            mobilecheck() && ($(".viewer").css({//手机端适配
                width: "100%",
                height: "100%",
                margin: 0
            }),$(".edit_wrapper").css("width","100%"),$("#container").css("width","100%"),renderPage());
            (parseInt(JSON.parse(jsondata.obj.property).eqAdType) == 1) && takeAd();//页面底部广告
    }
    

    var p1 = new Promise(//异步生成滚动条
        // The resolver function is called with the ability to resolve or
        // reject the promise
        function(resolve, reject) {
            getData(vxuebao);
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    // We fulfill the promise !
                    if(PCcheck()){
                        var myScroll = new IScroll('#con', {//下拉条 iscroll
                            mouseWheel: true,
                            scrollbars: true
                        });
                        $(".iScrollIndicator").hide();
                        $("#page1").bind('mouseover', function(event, delta) {
                            $(".iScrollIndicator").show(500);
                        });
                        $("#page1").bind('mouseleave', function(event, delta) {
                            $(".iScrollIndicator").hide(500);
                        });
                    }else{
                        $("#fireworks1").attr("style","position:fixed !important;z-index: 1");
                        $("#snowcas1").attr("style","position:fixed !important;top:0;width: 100%;height:100%");
                        
                    }
                }, Math.random() * 2000);
        }
    );

    // We define what to do when the promise is resolved/fulfilled with the then() call,
    // and the catch() method defines what to do if the promise is rejected.
    p1.then(
    // Log the fulfillment value
        function(val) {
            console.log(val);
        }
    ).catch(
        // Log the rejection reason
        function(reason) {
            console.log('Handle rejected promise ('+reason+') here.');
        }
    );
    