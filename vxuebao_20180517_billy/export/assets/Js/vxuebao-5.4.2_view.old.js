/**
 * eqShow - v5.4.2 - 2015-11-20
 *
 *
 * Copyright (c) 2015
 * Licensed MIT <>
 */

function mobilecheck() {
    var a = !1;
    return function (b) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
    }(navigator.userAgent || navigator.vendor || window.opera), a
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
function countCharacters(a) {
    var b = 0;
    if (!a) return 0;
    for (var c = 0; c < a.length; c++) {
        var d = a.charCodeAt(c);
        d >= 1 && 126 >= d || d >= 65376 && 65439 >= d ? b++ : b += 2
    }
    return b
}
function playVideo(a) {
    if (a && a.bgAudio) {
        var b = $("#media"),
            c = $("#audio_btn"),
            d = ($("#yinfu"), "");
        a.bgAudio.url ? d = 0 == a.bgAudio.url.indexOf("http://") ? a.bgAudio.url : PREFIX_FILE_HOST + a.bgAudio.url : !a.bgAudio.url && a.bgAudio.src && (d = 0 == a.bgAudio.src.indexOf("http://") ? a.bgAudio.src : PREFIX_FILE_HOST + a.bgAudio.src), b.attr("src", d), c.addClass("video_exist"), b.bind("canplay", function () {
            b.get(0).play()
        }).bind("play", function () {
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
function renderPage(a, b, c) {
    loadPage();
    console.log('触发SCORM标准');
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
    function b() {
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
}(window), function (a, b) {
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
}(window, $), window.flux = {
    version: "1.4.4"
}, function (a) {
    flux.slider = function (b, c) {
        flux.browser.init(), flux.browser.supportsTransitions || window.console && window.console.error && console.error("Flux Slider requires a browser that supports CSS3 transitions");
        var d = this;
        this.element = a(b), this.transitions = [];
        for (var e in flux.transitions) this.transitions.push(e);
        this.options = a.extend({
            autoplay: !0,
            transitions: this.transitions,
            delay: 4e3,
            pagination: !0,
            controls: !1,
            captions: !1,
            width: null,
            height: null,
            onTransitionEnd: null,
            onStartEnd: null,
            bgColor: ""
        }, c), this.height = this.options.height ? this.options.height : null, this.width = this.options.width ? this.options.width : null;
        var f = [];
        a(this.options.transitions).each(function (a, b) {
            var c = new flux.transitions[b](this),
                d = !0;
            c.options.requires3d && !flux.browser.supports3d && (d = !1), c.options.compatibilityCheck && (d = c.options.compatibilityCheck()), d && f.push(b)
        }), this.options.transitions = f, this.images = new Array, this.imageLoadedCount = 0, this.currentImageIndex = 0, this.nextImageIndex = 1, this.playing = !1, this.container = a('<div class="fluxslider"></div>').appendTo(this.element), this.surface = a('<div class="surface" style="position: relative"></div>').appendTo(this.container), this.container.bind("click", function (b) {
            a(b.target).hasClass("hasLink") && (window.location = a(b.target).data("href"))
        }), this.imageContainer = a('<div class="images loading1"></div>').css({
            position: "relative",
            overflow: "hidden"
        }).appendTo(this.surface), this.width && this.height && this.imageContainer.css({
            width: this.width + "px",
            height: this.height + "px"
        }), this.image1 = a('<div class="image1" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), this.image2 = a('<div class="image2" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), a(this.image1).add(this.image2).css({
            position: "absolute",
            top: "0px",
            left: "0px"
        }), this.element.find("img, a img").each(function (b, c) {
            var e = c.cloneNode(!1),
                f = a(c).parent();
            f.is("a") && a(e).data("href", f.attr("href")), d.images.push(e), a(c).remove()
        });
        for (var g = 0; g < this.images.length; g++) {
            var h = new Image;
            h.onload = function () {
                d.imageLoadedCount++, d.width = d.width ? d.width : this.width, d.height = d.height ? d.height : this.height, d.imageLoadedCount >= d.images.length && (d.finishedLoading(), d.setupImages())
            }, h.src = this.images[g].src
        }
        this.element.bind("fluxTransitionEnd", function (a, b) {
            d.options.onTransitionEnd && (a.preventDefault(), d.options.onTransitionEnd(b))
        }), this.options.autoplay && this.start();
        var i = {},
            j = {},
            k = 20;
        this.element.bind("mousedown touchstart", function (a) {
            "touchstart" == a.type ? i.left = a.originalEvent.touches[0].pageX : "mousedown" == a.type && (i.left = a.pageX)
        }).bind("mouseup touchend", function (a) {
            "touchend" == a.type ? j.left = a.originalEvent.changedTouches[0].pageX : "mouseup" == a.type && (j.left = a.pageX), j.left - i.left > k ? d.prev(null, {
                direction: "right"
            }) : i.left - j.left > k && d.next(null, {
                direction: "left"
            }), d.options.autoplay && (d.stop(), d.start())
        }), setTimeout(function () {
            a(window).focus(function () {
                d.isPlaying() && d.next()
            })
        }, 100)
    }, flux.slider.prototype = {
        constructor: flux.slider,
        playing: !1,
        start: function () {
            var a = this;
            this.playing = !0, this.interval = setInterval(function () {
                a.transition()
            }, this.options.delay), "function" == typeof this.options.onStartEnd && this.options.onStartEnd(this.interval)
        },
        stop: function () {
            this.playing = !1, clearInterval(this.interval), this.interval = null
        },
        isPlaying: function () {
            return this.playing
        },
        next: function (a, b) {
            b = b || {}, b.direction = "left", this.showImage(this.currentImageIndex + 1, a, b)
        },
        prev: function (a, b) {
            b = b || {}, b.direction = "right", this.showImage(this.currentImageIndex - 1, a, b)
        },
        showImage: function (a, b, c) {
            this.setNextIndex(a), this.setupImages(), this.transition(b, c)
        },
        finishedLoading: function () {
            var b = this;
            if (this.container.css({
                    width: this.width + "px",
                    height: this.height + "px"
                }), this.imageContainer.removeClass("loading1"), this.options.pagination && (this.pagination = a('<ul class="pagination"></ul>').css({
                    margin: "0px",
                    padding: "0px",
                    "text-align": "center"
                }), this.pagination.bind("click", function (c) {
                    c.preventDefault(), b.showImage(a(c.target).data("index"))
                }), a(this.images).each(function (c, d) {
                    var e = a('<li data-index="' + c + '">' + (c + 1) + "</li>").css({
                        display: "inline-block",
                        "margin-left": "0.5em",
                        cursor: "pointer"
                    }).appendTo(b.pagination);
                    0 == c && e.css("margin-left", 0).addClass("current")
                }), this.container.append(this.pagination)), a(this.imageContainer).css({
                    width: this.width + "px",
                    height: this.height + "px"
                }), a(this.image1).css({
                    width: this.width + "px",
                    height: this.height + "px"
                }), a(this.image2).css({
                    width: this.width + "px",
                    height: this.height + "px"
                }), this.container.css({
                    width: this.width + "px",
                    height: this.height + (this.options.pagination ? this.pagination.height() : 0) + "px"
                }), this.options.controls) {
                var c = {
                    padding: "4px 10px 10px",
                    "font-size": "60px",
                    "font-family": "arial, sans-serif",
                    "line-height": "1em",
                    "font-weight": "bold",
                    color: "#FFF",
                    "text-decoration": "none",
                    background: "rgba(0,0,0,0.5)",
                    position: "absolute",
                    "z-index": 2e3
                };
                this.nextButton = a('<a href="#">»</a>').css(c).css3({
                    "border-radius": "4px"
                }).appendTo(this.surface).bind("click", function (a) {
                    a.preventDefault(), b.next()
                }), this.prevButton = a('<a href="#">«</a>').css(c).css3({
                    "border-radius": "4px"
                }).appendTo(this.surface).bind("click", function (a) {
                    a.preventDefault(), b.prev()
                });
                var d = (this.height - this.nextButton.height()) / 2;
                this.nextButton.css({
                    top: d + "px",
                    right: "10px"
                }), this.prevButton.css({
                    top: d + "px",
                    left: "10px"
                })
            }
            this.options.captions && (this.captionBar = a('<div class="caption"></div>').css({
                background: "rgba(0,0,0,0.6)",
                color: "#FFF",
                "font-size": "16px",
                "font-family": "helvetica, arial, sans-serif",
                "text-decoration": "none",
                "font-weight": "bold",
                padding: "1.5em 1em",
                opacity: 0,
                position: "absolute",
                "z-index": 110,
                width: "100%",
                bottom: 0
            }).css3({
                "transition-property": "opacity",
                "transition-duration": "800ms",
                "box-sizing": "border-box"
            }).prependTo(this.surface)), this.updateCaption()
        },
        setupImages: function () {
            var b = this.getImage(this.currentImageIndex),
                c = {
                    background: 'url("' + b.src + '") 50% 50% / contain no-repeat ' + this.options.bgColor,
                    zIndex: 101,
                    cursor: "auto"
                };
            a(b).data("href") ? (c.cursor = "pointer", this.image1.addClass("hasLink"), this.image1.data("href", a(b).data("href"))) : (this.image1.removeClass("hasLink"), this.image1.data("href", null)), this.image1.css(c).children().remove(), this.image2.css({
                background: 'url("' + this.getImage(this.nextImageIndex).src + '") 50% 50% / contain no-repeat ' + this.options.bgColor,
                zIndex: 100
            }), this.options.pagination && this.pagination && (this.pagination.find("li.current").removeClass("current"), a(this.pagination.find("li")[this.currentImageIndex]).addClass("current"))
        },
        transition: function (b, c) {
            if (void 0 == b || !flux.transitions[b]) {
                var d = Math.floor(Math.random() * this.options.transitions.length);
                b = this.options.transitions[d]
            }
            var e = null;
            try {
                e = new flux.transitions[b](this, a.extend(this.options[b] ? this.options[b] : {}, c))
            } catch (f) {
                e = new flux.transition(this, {
                    fallback: !0
                })
            }
            e.run(), this.currentImageIndex = this.nextImageIndex, this.setNextIndex(this.currentImageIndex + 1), this.updateCaption()
        },
        updateCaption: function () {
            var b = a(this.getImage(this.currentImageIndex)).attr("title");
            this.options.captions && this.captionBar && ("" !== b && this.captionBar.html(b), this.captionBar.css("opacity", "" === b ? 0 : 1))
        },
        getImage: function (a) {
            return a %= this.images.length, this.images[a]
        },
        setNextIndex: function (a) {
            void 0 == a && (a = this.currentImageIndex + 1), this.nextImageIndex = a, this.nextImageIndex > this.images.length - 1 && (this.nextImageIndex = 0), this.nextImageIndex < 0 && (this.nextImageIndex = this.images.length - 1)
        },
        increment: function () {
            this.currentImageIndex++, this.currentImageIndex > this.images.length - 1 && (this.currentImageIndex = 0)
        }
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.browser = {
        init: function () {
            if (void 0 === flux.browser.supportsTransitions) {
                var b = (document.createElement("div"), ["-webkit", "-moz", "-o", "-ms"]);
                if (window.Modernizr && void 0 !== Modernizr.csstransitions ? flux.browser.supportsTransitions = Modernizr.csstransitions : flux.browser.supportsTransitions = this.supportsCSSProperty("Transition"), window.Modernizr && void 0 !== Modernizr.csstransforms3d) flux.browser.supports3d = Modernizr.csstransforms3d;
                else if (flux.browser.supports3d = this.supportsCSSProperty("Perspective"), flux.browser.supports3d && "webkitPerspective" in a("body").get(0).style) {
                    var c = a('<div id="csstransform3d"></div>'),
                        d = a('<style media="(transform-3d), (' + b.join("-transform-3d),(") + '-transform-3d)">div#csstransform3d { position: absolute; left: 9px }</style>');
                    a("body").append(c), a("head").append(d), flux.browser.supports3d = 9 == c.get(0).offsetLeft, c.remove(), d.remove()
                }
            }
        },
        supportsCSSProperty: function (a) {
            for (var b = document.createElement("div"), c = ["Webkit", "Moz", "O", "Ms"], d = !1, e = 0; e < c.length; e++) c[e] + a in b.style && (d = d || !0);
            return d
        },
        translate: function (a, b, c) {
            return a = void 0 != a ? a : 0, b = void 0 != b ? b : 0, c = void 0 != c ? c : 0, "translate" + (flux.browser.supports3d ? "3d(" : "(") + a + "px," + b + (flux.browser.supports3d ? "px," + c + "px)" : "px)")
        },
        rotateX: function (a) {
            return flux.browser.rotate("x", a)
        },
        rotateY: function (a) {
            return flux.browser.rotate("y", a)
        },
        rotateZ: function (a) {
            return flux.browser.rotate("z", a)
        },
        rotate: function (a, b) {
            return !a in {
                x: "",
                y: "",
                z: ""
            } && (a = "z"), b = void 0 != b ? b : 0, flux.browser.supports3d ? "rotate3d(" + ("x" == a ? "1" : "0") + ", " + ("y" == a ? "1" : "0") + ", " + ("z" == a ? "1" : "0") + ", " + b + "deg)" : "z" == a ? "rotate(" + b + "deg)" : ""
        }
    }, a(function () {
        flux.browser.init()
    })
}(window.jQuery || window.Zepto), function (a) {
    a.fn.css3 = function (a) {
        var b = {},
            c = ["webkit", "moz", "ms", "o"];
        for (var d in a) {
            for (var e = 0; e < c.length; e++) b["-" + c[e] + "-" + d] = a[d];
            b[d] = a[d]
        }
        return this.css(b), this
    }, a.fn.transitionEnd = function (b) {
        for (var c = ["webkitTransitionEnd", "transitionend", "oTransitionEnd"], d = 0; d < c.length; d++) this.bind(c[d], function (d) {
            for (var e = 0; e < c.length; e++) a(this).unbind(c[e]);
            b && b.call(this, d)
        });
        return this
    }, flux.transition = function (b, c) {
        if (this.options = a.extend({
                requires3d: !1,
                after: function () {
                }
            }, c), this.slider = b, this.options.requires3d && !flux.browser.supports3d || !flux.browser.supportsTransitions || this.options.fallback === !0) {
            var d = this;
            this.options.after = void 0, this.options.setup = function () {
                d.fallbackSetup()
            }, this.options.execute = function () {
                d.fallbackExecute()
            }
        }
    }, flux.transition.prototype = {
        constructor: flux.transition,
        hasFinished: !1,
        run: function () {
            var a = this;
            void 0 !== this.options.setup && this.options.setup.call(this), this.slider.image1.css({
                "background-image": "none"
            }), this.slider.imageContainer.css("overflow", this.options.requires3d ? "visible" : "hidden"), setTimeout(function () {
                void 0 !== a.options.execute && a.slider.image1.css("background-color", ""), a.options.execute.call(a)
            }, 5)
        },
        finished: function () {
            this.hasFinished || (this.hasFinished = !0, this.options.after && this.options.after.call(this), this.slider.imageContainer.css("overflow", "hidden"), this.slider.setupImages(), this.slider.element.trigger("fluxTransitionEnd", {
                currentImage: this.slider.getImage(this.slider.currentImageIndex)
            }))
        },
        fallbackSetup: function () {
        },
        fallbackExecute: function () {
            this.finished()
        }
    }, flux.transitions = {}, flux.transition_grid = function (b, c) {
        return new flux.transition(b, a.extend({
            columns: 6,
            rows: 6,
            forceSquare: !1,
            setup: function () {
                var b = this.slider.image1.width(),
                    c = this.slider.image1.height(),
                    d = Math.floor(b / this.options.columns),
                    e = Math.floor(c / this.options.rows);
                this.options.forceSquare && (e = d, this.options.rows = Math.floor(c / e));
                for (var f = b - this.options.columns * d, g = Math.ceil(f / this.options.columns), h = c - this.options.rows * e, i = Math.ceil(h / this.options.rows), j = (this.slider.image1.height(), 0), k = 0, l = document.createDocumentFragment(), m = 0; m < this.options.columns; m++) {
                    var n = d,
                        k = 0;
                    if (f > 0) {
                        var o = f >= g ? g : f;
                        n += o, f -= o
                    }
                    for (var p = 0; p < this.options.rows; p++) {
                        var q = e,
                            r = h;
                        if (r > 0) {
                            var o = r >= i ? i : r;
                            q += o, r -= o
                        }
                        var s = a('<div class="tile tile-' + m + "-" + p + '"></div>').css({
                            width: n + "px",
                            height: q + "px",
                            position: "absolute",
                            top: k + "px",
                            left: j + "px"
                        });
                        this.options.renderTile.call(this, s, m, p, n, q, j, k), l.appendChild(s.get(0)), k += q
                    }
                    j += n
                }
                this.slider.image1.get(0).appendChild(l)
            },
            execute: function () {
                var a = this,
                    b = this.slider.image1.height(),
                    c = this.slider.image1.find("div.barcontainer");
                this.slider.image2.hide(), c.last().transitionEnd(function (b) {
                    a.slider.image2.show(), a.finished()
                }), c.css3({
                    transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, b / 2, b / 2)
                })
            },
            renderTile: function (a, b, c, d, e, f, g) {
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.bars = function (b, c) {
        return new flux.transition_grid(b, a.extend({
            columns: 10,
            rows: 1,
            delayBetweenBars: 40,
            renderTile: function (b, c, d, e, f, g, h) {
                a(b).css({
                    background: this.slider.image1.css("background"),
                    "background-size": this.slider.width + "px " + this.slider.height + "px",
                    "background-position": "-" + g + "px 0px"
                }).css3({
                    "transition-duration": "400ms",
                    "transition-timing-function": "ease-in",
                    "transition-property": "all",
                    "transition-delay": c * this.options.delayBetweenBars + "ms"
                })
            },
            execute: function () {
                var b = this,
                    c = this.slider.image1.height(),
                    d = this.slider.image1.find("div.tile");
                a(d[d.length - 1]).transitionEnd(function () {
                    b.finished()
                }), setTimeout(function () {
                    d.css({
                        opacity: "0.5"
                    }).css3({
                        transform: flux.browser.translate(0, c)
                    })
                }, 50)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.bars3d = function (b, c) {
        return new flux.transition_grid(b, a.extend({
            requires3d: !0,
            columns: 7,
            rows: 1,
            delayBetweenBars: 150,
            perspective: 1e3,
            renderTile: function (b, c, d, e, f, g, h) {
                var i = a('<div class="bar-' + c + '"></div>').css({
                        width: e + "px",
                        height: "100%",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        "z-index": 200,
                        background: this.slider.image1.css("background"),
                        "background-size": this.slider.width + "px " + this.slider.height + "px",
                        "background-position": "-" + g + "px 0px",
                        "background-repeat": "no-repeat"
                    }).css3({
                        "backface-visibility": "hidden"
                    }),
                    j = a(i.get(0).cloneNode(!1)).css({
                        "background-image": this.slider.image2.css("background-image")
                    }).css3({
                        transform: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -f / 2, f / 2)
                    }),
                    k = a('<div class="side bar-' + c + '"></div>').css({
                        width: f + "px",
                        height: f + "px",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        background: "#222",
                        "z-index": 190
                    }).css3({
                        transform: flux.browser.rotateY(90) + " " + flux.browser.translate(f / 2, 0, -f / 2) + " " + flux.browser.rotateY(180),
                        "backface-visibility": "hidden"
                    }),
                    l = a(k.get(0).cloneNode(!1)).css3({
                        transform: flux.browser.rotateY(90) + " " + flux.browser.translate(f / 2, 0, e - f / 2)
                    });
                a(b).css({
                    width: e + "px",
                    height: "100%",
                    position: "absolute",
                    top: "0px",
                    left: g + "px",
                    "z-index": c > this.options.columns / 2 ? 1e3 - c : 1e3
                }).css3({
                    "transition-duration": "800ms",
                    "transition-timing-function": "linear",
                    "transition-property": "all",
                    "transition-delay": c * this.options.delayBetweenBars + "ms",
                    "transform-style": "preserve-3d"
                }).append(i).append(j).append(k).append(l)
            },
            execute: function () {
                this.slider.image1.css3({
                    perspective: this.options.perspective,
                    "perspective-origin": "50% 50%"
                }).css({
                    "-moz-transform": "perspective(" + this.options.perspective + "px)",
                    "-moz-perspective": "none",
                    "-moz-transform-style": "preserve-3d"
                });
                var a = this,
                    b = this.slider.image1.height(),
                    c = this.slider.image1.find("div.tile");
                this.slider.image2.hide(), c.last().transitionEnd(function (b) {
                    a.slider.image1.css3({
                        "transform-style": "flat"
                    }), a.slider.image2.show(), a.finished()
                }), setTimeout(function () {
                    c.css3({
                        transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, b / 2, b / 2)
                    })
                }, 50)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.blinds = function (b, c) {
        return new flux.transitions.bars(b, a.extend({
            execute: function () {
                var b = this,
                    c = (this.slider.image1.height(), this.slider.image1.find("div.tile"));
                a(c[c.length - 1]).transitionEnd(function () {
                    b.finished()
                }), setTimeout(function () {
                    c.css({
                        opacity: "0.5"
                    }).css3({
                        transform: "scalex(0.0001)"
                    })
                }, 50)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.zip = function (b, c) {
        return new flux.transitions.bars(b, a.extend({
            execute: function () {
                var b = this,
                    c = this.slider.image1.height(),
                    d = this.slider.image1.find("div.tile");
                a(d[d.length - 1]).transitionEnd(function () {
                    b.finished()
                }), setTimeout(function () {
                    d.each(function (b, d) {
                        a(d).css({
                            opacity: "0.3"
                        }).css3({
                            transform: flux.browser.translate(0, b % 2 ? "-" + 2 * c : c)
                        })
                    })
                }, 20)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.blocks = function (b, c) {
        return new flux.transition_grid(b, a.extend({
            forceSquare: !0,
            delayBetweenBars: 100,
            renderTile: function (b, c, d, e, f, g, h) {
                var i = Math.floor(10 * Math.random() * this.options.delayBetweenBars);
                a(b).css({
                    background: this.slider.image1.css("background"),
                    "background-size": this.slider.width + "px " + this.slider.height + "px",
                    "background-position": "-" + g + "px -" + h + "px"
                }).css3({
                    "transition-duration": "350ms",
                    "transition-timing-function": "ease-in",
                    "transition-property": "all",
                    "transition-delay": i + "ms"
                }), void 0 === this.maxDelay && (this.maxDelay = 0), i > this.maxDelay && (this.maxDelay = i, this.maxDelayTile = b)
            },
            execute: function () {
                var b = this,
                    c = this.slider.image1.find("div.tile");
                this.maxDelayTile.transitionEnd(function () {
                    b.finished()
                }), setTimeout(function () {
                    c.each(function (b, c) {
                        a(c).css({
                            opacity: "0"
                        }).css3({
                            transform: "scale(0.8)"
                        })
                    })
                }, 50)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.blocks2 = function (b, c) {
        return new flux.transition_grid(b, a.extend({
            cols: 12,
            forceSquare: !0,
            delayBetweenDiagnols: 150,
            renderTile: function (b, c, d, e, f, g, h) {
                Math.floor(10 * Math.random() * this.options.delayBetweenBars);
                a(b).css({
                    background: this.slider.image1.css("background"),
                    "background-size": this.slider.width + "px " + this.slider.height + "px",
                    "background-position": "-" + g + "px -" + h + "px"
                }).css3({
                    "transition-duration": "350ms",
                    "transition-timing-function": "ease-in",
                    "transition-property": "all",
                    "transition-delay": (c + d) * this.options.delayBetweenDiagnols + "ms",
                    "backface-visibility": "hidden"
                })
            },
            execute: function () {
                var b = this,
                    c = this.slider.image1.find("div.tile");
                c.last().transitionEnd(function () {
                    b.finished()
                }), setTimeout(function () {
                    c.each(function (b, c) {
                        a(c).css({
                            opacity: "0"
                        }).css3({
                            transform: "scale(0.8)"
                        })
                    })
                }, 50)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.cube = function (b, c) {
        return new flux.transition(b, a.extend({
            requires3d: !0,
            barWidth: 100,
            direction: "left",
            perspective: 1e3,
            setup: function () {
                var b = this.slider.image1.width(),
                    c = this.slider.image1.height();
                this.slider.image1.css3({
                    perspective: this.options.perspective,
                    "perspective-origin": "50% 50%"
                }), this.cubeContainer = a('<div class="cube"></div>').css({
                    width: b + "px",
                    height: c + "px",
                    position: "relative"
                }).css3({
                    "transition-duration": "800ms",
                    "transition-timing-function": "linear",
                    "transition-property": "all",
                    "transform-style": "preserve-3d"
                });
                var d = {
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        top: "0px",
                        left: "0px"
                    },
                    e = a('<div class="face current"></div>').css(a.extend(d, {
                        background: this.slider.image1.css("background"),
                        "background-size": this.slider.width + "px " + this.slider.height + "px"
                    })).css3({
                        "backface-visibility": "hidden"
                    });
                this.cubeContainer.append(e);
                var f = a('<div class="face next"></div>').css(a.extend(d, {
                    background: this.slider.image2.css("background-image")
                })).css3({
                    transform: this.options.transitionStrings.call(this, this.options.direction, "nextFace"),
                    "backface-visibility": "hidden"
                });
                this.cubeContainer.append(f), this.slider.image1.append(this.cubeContainer)
            },
            execute: function () {
                var a = this;
                this.slider.image1.width(), this.slider.image1.height();
                this.slider.image2.hide(), this.cubeContainer.transitionEnd(function () {
                    a.slider.image2.show(), a.finished()
                }), setTimeout(function () {
                    a.cubeContainer.css3({
                        transform: a.options.transitionStrings.call(a, a.options.direction, "container")
                    })
                }, 50)
            },
            transitionStrings: function (a, b) {
                var c = this.slider.image1.width(),
                    d = this.slider.image1.height(),
                    e = {
                        up: {
                            nextFace: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, d / 2, d / 2),
                            container: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -d / 2, d / 2)
                        },
                        down: {
                            nextFace: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -d / 2, d / 2),
                            container: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, d / 2, d / 2)
                        },
                        left: {
                            nextFace: flux.browser.rotateY(90) + " " + flux.browser.translate(c / 2, 0, c / 2),
                            container: flux.browser.rotateY(-90) + " " + flux.browser.translate(-c / 2, 0, c / 2)
                        },
                        right: {
                            nextFace: flux.browser.rotateY(-90) + " " + flux.browser.translate(-c / 2, 0, c / 2),
                            container: flux.browser.rotateY(90) + " " + flux.browser.translate(c / 2, 0, c / 2)
                        }
                    };
                return e[a] && e[a][b] ? e[a][b] : !1
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.tiles3d = function (b, c) {
        return new flux.transition_grid(b, a.extend({
            requires3d: !0,
            forceSquare: !0,
            columns: 5,
            perspective: 600,
            delayBetweenBarsX: 200,
            delayBetweenBarsY: 150,
            renderTile: function (b, c, d, e, f, g, h) {
                var i = a("<div></div>").css({
                        width: e + "px",
                        height: f + "px",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        background: this.slider.image1.css("background"),
                        "background-size": this.slider.width + "px " + this.slider.height + "px",
                        "background-position": "-" + g + "px -" + h + "px",
                        "background-repeat": "no-repeat",
                        "-moz-transform": "translateZ(1px)"
                    }).css3({
                        "backface-visibility": "hidden"
                    }),
                    j = a(i.get(0).cloneNode(!1)).css({
                        "background-image": this.slider.image2.css("background-image")
                    }).css3({
                        transform: flux.browser.rotateY(180),
                        "backface-visibility": "hidden"
                    });
                a(b).css({
                    "z-index": (c > this.options.columns / 2 ? 500 - c : 500) + (d > this.options.rows / 2 ? 500 - d : 500)
                }).css3({
                    "transition-duration": "800ms",
                    "transition-timing-function": "ease-out",
                    "transition-property": "all",
                    "transition-delay": c * this.options.delayBetweenBarsX + d * this.options.delayBetweenBarsY + "ms",
                    "transform-style": "preserve-3d"
                }).append(i).append(j)
            },
            execute: function () {
                this.slider.image1.css3({
                    perspective: this.options.perspective,
                    "perspective-origin": "50% 50%"
                });
                var a = this,
                    b = this.slider.image1.find("div.tile");
                this.slider.image2.hide(), b.last().transitionEnd(function (b) {
                    a.slider.image2.show(), a.finished()
                }), setTimeout(function () {
                    b.css3({
                        transform: flux.browser.rotateY(180)
                    })
                }, 50)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.turn = function (b, c) {
        return new flux.transition(b, a.extend({
            requires3d: !0,
            perspective: 1300,
            direction: "left",
            setup: function () {
                var b = a('<div class="tab"></div>').css({
                        width: "50%",
                        height: "100%",
                        position: "absolute",
                        top: "0px",
                        left: "left" == this.options.direction ? "50%" : "0%",
                        "z-index": 101
                    }).css3({
                        "transform-style": "preserve-3d",
                        "transition-duration": "1000ms",
                        "transition-timing-function": "ease-out",
                        "transition-property": "all",
                        "transform-origin": "left" == this.options.direction ? "left center" : "right center"
                    }),
                    c = (a("<div></div>").appendTo(b).css({
                        background: this.slider.image1.css("background"),
                        "background-size": this.slider.width + "px " + this.slider.height + "px",
                        "background-position": ("left" == this.options.direction ? "-" + this.slider.image1.width() / 2 : 0) + "px 0",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        "-moz-transform": "translateZ(1px)"
                    }).css3({
                        "backface-visibility": "hidden"
                    }), a("<div></div>").appendTo(b).css({
                        background: this.slider.image2.css("background"),
                        "background-size": this.slider.width + "px " + this.slider.height + "px",
                        "background-position": ("left" == this.options.direction ? 0 : "-" + this.slider.image1.width() / 2) + "px 0",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: "0",
                        left: "0"
                    }).css3({
                        transform: flux.browser.rotateY(180),
                        "backface-visibility": "hidden"
                    }), a("<div></div>").css({
                        position: "absolute",
                        top: "0",
                        left: "left" == this.options.direction ? "0" : "50%",
                        width: "50%",
                        height: "100%",
                        background: this.slider.image1.css("background"),
                        "background-size": this.slider.width + "px " + this.slider.height + "px",
                        "background-position": ("left" == this.options.direction ? 0 : "-" + this.slider.image1.width() / 2) + "px 0",
                        "z-index": 100
                    })),
                    d = a('<div class="overlay"></div>').css({
                        position: "absolute",
                        top: "0",
                        left: "left" == this.options.direction ? "50%" : "0",
                        width: "50%",
                        height: "100%",
                        background: "#000",
                        opacity: 1
                    }).css3({
                        "transition-duration": "800ms",
                        "transition-timing-function": "linear",
                        "transition-property": "opacity"
                    }),
                    e = a("<div></div>").css3({
                        width: "100%",
                        height: "100%"
                    }).css3({
                        perspective: this.options.perspective,
                        "perspective-origin": "50% 50%"
                    }).append(b).append(c).append(d);
                this.slider.image1.append(e)
            },
            execute: function () {
                var a = this;
                this.slider.image1.find("div.tab").first().transitionEnd(function () {
                    a.finished()
                }), setTimeout(function () {
                    a.slider.image1.find("div.tab").css3({
                        transform: flux.browser.rotateY("left" == a.options.direction ? -179 : 179)
                    }), a.slider.image1.find("div.overlay").css({
                        opacity: 0
                    })
                }, 50)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.slide = function (b, c) {
        return new flux.transition(b, a.extend({
            direction: "left",
            setup: function () {
                var b = this.slider.image1.width(),
                    c = this.slider.image1.height(),
                    d = a('<div class="current"></div>').css({
                        height: c + "px",
                        width: b + "px",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        background: this.slider["left" == this.options.direction ? "image1" : "image2"].css("background")
                    }).css3({
                        "backface-visibility": "hidden"
                    }),
                    e = a('<div class="next"></div>').css({
                        height: c + "px",
                        width: b + "px",
                        position: "absolute",
                        top: "0px",
                        left: b + "px",
                        background: this.slider["left" == this.options.direction ? "image2" : "image1"].css("background")
                    }).css3({
                        "backface-visibility": "hidden"
                    });
                this.slideContainer = a('<div class="slide"></div>').css({
                    width: 2 * b + "px",
                    height: c + "px",
                    position: "relative",
                    left: "left" == this.options.direction ? "0px" : -b + "px",
                    "z-index": 101
                }).css3({
                    "transition-duration": "600ms",
                    "transition-timing-function": "ease-in",
                    "transition-property": "all"
                }), this.slideContainer.append(d).append(e), this.slider.image1.append(this.slideContainer)
            },
            execute: function () {
                var a = this,
                    b = this.slider.image1.width();
                "left" == this.options.direction && (b = -b), this.slideContainer.transitionEnd(function () {
                    a.finished()
                }), setTimeout(function () {
                    a.slideContainer.css3({
                        transform: flux.browser.translate(b)
                    })
                }, 50)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function (a) {
    flux.transitions.explode = function (b, c) {
        return new flux.transition_grid(b, a.extend({
            columns: 6,
            forceSquare: !0,
            delayBetweenBars: 30,
            perspective: 800,
            requires3d: !0,
            renderTile: function (b, c, d, e, f, g, h) {
                var i = Math.floor(10 * Math.random() * this.options.delayBetweenBars);
                a(b).css({
                    background: this.slider.image1.css("background"),
                    "background-size": this.slider.width + "px " + this.slider.height + "px",
                    "background-position": "-" + g + "px -" + h + "px"
                }).css3({
                    "transition-duration": "500ms",
                    "transition-timing-function": "ease-in",
                    "transition-property": "all",
                    "transition-delay": i + "ms"
                }), void 0 === this.maxDelay && (this.maxDelay = 0), i > this.maxDelay && (this.maxDelay = i, this.maxDelayTile = b)
            },
            execute: function () {
                this.slider.image1.css3({
                    perspective: this.options.perspective,
                    "perspective-origin": "50% 50%"
                }).css({
                    "-moz-transform": "perspective(" + this.options.perspective + "px)",
                    "-moz-perspective": "none",
                    "-moz-transform-style": "preserve-3d"
                });
                var b = this,
                    c = this.slider.image1.find("div.tile");
                this.maxDelayTile.transitionEnd(function () {
                    b.slider.image1.css3({
                        "transform-style": "flat"
                    }), b.finished()
                }), setTimeout(function () {
                    c.each(function (b, c) {
                        a(c).css({
                            opacity: "0"
                        }).css3({
                            transform: flux.browser.translate(0, 0, 700) + " rotate3d(" + (Math.round(2 * Math.random()) - 1) + ", " + (Math.round(2 * Math.random()) - 1) + ", " + (Math.round(2 * Math.random()) - 1) + ", 90deg) "
                        })
                    })
                }, 50)
            }
        }, c))
    }
}(window.jQuery || window.Zepto), function () {
    window.eqxiuSvg = {
        NAMESPACE: "http://www.w3.org/2000/svg",
        SYMBOLS: {},
        boundingBox: function (a) {
            var b, c = a.parentNode,
                d = document.createElementNS(eqxiuSvg.NAMESPACE, "svg");
            return d.setAttribute("width", "0"), d.setAttribute("height", "0"), d.setAttribute("style", "visibility: hidden; position: absolute; left: 0; top: 0;"), d.appendChild(a), document.body.appendChild(d), b = a.getBBox(), c ? c.appendChild(a) : d.removeChild(a), document.body.removeChild(d), b
        },
        pointsToPolygon: function (a) {
            for (var b = []; a.length >= 2;) b.push(a.shift() + "," + a.shift());
            return b.join(" ")
        },
        symbol: function (a, b, c) {
            var d = c ? c : "#555",
                e = eqxiuSvg.SYMBOLS[a],
                f = '<g fill="' + d + '" id="path_' + b + '">' + e + "</g>";
            return f
        },
        ShapeFromType: function (a, b, c, d, e) {
            return b || (b = 64), c || (c = 64), /symbols\-/.test(a) ? eqxiuSvg.symbol(a.replace(/^symbols\-/, ""), d, e) : "rect" == a ? eqxiuSvg.rect(b, c) : "circle" == a ? eqxiuSvg.ellipse(b, c) : "diamond" == a ? eqxiuSvg.polygon(b, c, 4) : "octagon" == a ? eqxiuSvg.polygon(b, c, 8) : "triangle-up" == a ? eqxiuSvg.triangleUp(b, c) : "triangle-down" == a ? eqxiuSvg.triangleDown(b, c) : "triangle-left" == a ? eqxiuSvg.triangleLeft(b, c) : "triangle-right" == a ? eqxiuSvg.triangleRight(b, c) : "arrow-up" == a ? eqxiuSvg.arrowUp(b, c) : "arrow-down" == a ? eqxiuSvg.arrowDown(b, c) : "arrow-left" == a ? eqxiuSvg.arrowLeft(b, c) : "arrow-right" == a ? eqxiuSvg.arrowRight(b, c) : void 0
        },
        rect: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "rect");
            return c.setAttribute("width", a), c.setAttribute("height", b), c
        },
        ellipse: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "ellipse");
            return c.setAttribute("rx", a / 2), c.setAttribute("ry", b / 2), c.setAttribute("cx", a / 2), c.setAttribute("cy", b / 2), c
        },
        triangleUp: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
            return c.setAttribute("points", eqxiuSvg.pointsToPolygon([a / 2, 0, a, b, 0, b])), c
        },
        triangleDown: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
            return c.setAttribute("points", eqxiuSvg.pointsToPolygon([0, 0, a, 0, a / 2, b])), c
        },
        triangleLeft: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
            return c.setAttribute("points", eqxiuSvg.pointsToPolygon([0, b / 2, a, 0, a, b])), c
        },
        triangleRight: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
            return c.setAttribute("points", eqxiuSvg.pointsToPolygon([a, b / 2, 0, b, 0, 0])), c
        },
        arrowUp: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
            return c.setAttribute("points", eqxiuSvg.pointsToPolygon([.5 * a, 0, a, .5 * b, .7 * a, .5 * b, .7 * a, b, .3 * a, b, .3 * a, .5 * b, 0, .5 * b, .5 * a, 0])), c
        },
        arrowDown: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
            return c.setAttribute("points", eqxiuSvg.pointsToPolygon([.5 * a, b, a, .5 * b, .7 * a, .5 * b, .7 * a, 0, .3 * a, 0, .3 * a, .5 * b, 0, .5 * b, .5 * a, b])), c
        },
        arrowLeft: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
            return c.setAttribute("points", eqxiuSvg.pointsToPolygon([a, .3 * b, .5 * a, .3 * b, .5 * a, 0, 0, .5 * b, .5 * a, b, .5 * a, .7 * b, a, .7 * b, a, .3 * b])), c
        },
        arrowRight: function (a, b) {
            var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
            return c.setAttribute("points", eqxiuSvg.pointsToPolygon([0, .3 * b, .5 * a, .3 * b, .5 * a, 0, a, .5 * b, .5 * a, b, .5 * a, .7 * b, 0, .7 * b])), c
        },
        polygon: function (a, b, c) {
            var d = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon"),
                e = [];
            if (3 === c) e = [a / 2, 0, a, b, 0, b];
            else if (c > 3) for (var f = a / 2, g = b / 2, h = 0; c > h; h++) {
                var i = f + f * Math.cos(2 * Math.PI * h / c),
                    j = g + g * Math.sin(2 * Math.PI * h / c);
                i = Math.round(10 * i) / 10, j = Math.round(10 * j) / 10, e.push(i), e.push(j)
            }
            return d.setAttribute("points", eqxiuSvg.pointsToPolygon(e)), d
        }
    }
}(), function (a, b) {
    function c(a) {
        function b(a, b, c) {
            return a[b] || (a[b] = c())
        }

        var c = b(a, "eqShow", Object);
        return b(c, "templateParser", function () {
            var a = {};
            return function (c, d) {
                if ("hasOwnProperty" === c) throw new Error("hasOwnProperty is not a valid name");
                return d && a.hasOwnProperty(c) && (a[c] = null), b(a, c, d)
            }
        })
    }

    function d(b) {
        templateParser = c(a)
    }

    var e = a.eqShow || (a.eqShow = {});
    d(e)
}(window, document), function (a) {
    function b(a, b, c, d) {
        var e = {},
            f = a / b,
            g = c / d;
        return f > g ? (e.width = c, e.height = c / f) : (e.height = d, e.width = d * f), e
    }

    function c(a, b) {
        "view" == i.mode && b.properties.url && $(a).click(function (a) {
            var c = b.properties.url;
            isNaN(c) ? window.open(c) : eqxiu.pageScroll(c)
        })
    }

    function d(a) {
        $(a).bind("touchstart mousedown", function (a) {
            a.stopPropagation()
        })
    }

    function e(a) {
        a.focus(function (a) {
            eqxiu.pauseAutoFlip()
        }).blur(function (a) {
            $(document).trigger("startAutoFlip")
        })
    }

    function f(a) {
        for (var b = $(a).find("a[data]"), c = 0; c < b.length; c++) if (b[c] && "view" == i.mode) {
            $(b[c]).css("cursor", "pointer");
            var d = $(b[c]).attr("data");
            !
                function (a) {
                    b[c].removeAttribute("href"), $(b[c]).click(function (b) {
                        eqxiu.pageScroll(a)
                    })
                }(d)
        }
    }

    function g(a, b) {
        if (b.trigger) {
            var c = $(a);
            j && clearTimeout(j), b.trigger.sends && b.trigger.sends.length && $.each(b.trigger.sends, function (a, b) {
                c.bind(utilTrigger.getSendType(b.type).name, function () {
                    j = setTimeout(function () {
                        $.each(b.handles, function (a, b) {
                            var c = utilTrigger.getHandleType(b.type).name;
                            $.each(b.ids, function (a, b) {
                                var d;
                                d = $("#inside_" + b, ".phone-view").length ? $("#inside_" + b, ".phone-view") : $("#inside_" + b), d.trigger(c)
                            })
                        })
                    }, 1e3 * b.delay)
                })
            })
        }
    }

    function h(a, b) {
        if (b.sound) {
            var c = $(a),
                d = $("#media").get(0);
            0 == b.sound.src.indexOf("http://") ? b.sound.src = b.sound.src : b.sound.src = PREFIX_FILE_HOST + b.sound.src, utilSound.addAudio(a, b.sound.src), c.click(function () {
                utilSound.play(a, function () {
                    d && d.play()
                }, function () {
                    d && d.pause()
                })
            })
        }
    }

    var i = a.templateParser("jsonParser", function () {
        function a(a) {
            return function (b, c) {
                a[b] = c
            }
        }

        function b(a, b) {
            try {
                var c = l[("" + a.type).charAt(0)](a)
            } catch (d) {
                return
            }
            if (c) {
                var e = $('<li comp-drag comp-rotate class="comp-resize comp-rotate inside" id="inside_' + a.id + '" num="' + a.num + '" ctype="' + a.type + '"></li>');
                if (3 != ("" + a.type).charAt(0) && 1 != ("" + a.type).charAt(0) && e.attr("comp-resize", ""), "p" == ("" + a.type).charAt(0) && e.removeAttr("comp-rotate"), 1 == ("" + a.type).charAt(0) && e.removeAttr("comp-drag"), 2 == ("" + a.type).charAt(0) && e.addClass("wsite-text"), "x" == ("" + a.type).charAt(0) && e.addClass("show-text"), 4 == ("" + a.type).charAt(0) && (a.properties.imgStyle && $(c).css(a.properties.imgStyle), e.addClass("wsite-image")), "n" == ("" + a.type).charAt(0) && e.addClass("wsite-image"), "h" == ("" + a.type).charAt(0) && e.addClass("wsite-shape"), 5 == ("" + a.type).charAt(0) && e.addClass("wsite-input"), 6 == ("" + a.type).charAt(0) && e.addClass("wsite-button"), 8 == ("" + a.type).charAt(0) && e.addClass("wsite-button"), "v" == ("" + a.type).charAt(0) && e.addClass("wsite-video"), e.mouseenter(function () {
                        $(this).addClass("inside-hover")
                    }), e.mouseleave(function () {
                        $(this).removeClass("inside-hover")
                    }), "edit" == i.mode || "x" != ("" + a.type).charAt(0)) {
                    var f = $('<div class="element-box">').append($('<div class="element-box-contents">').append(c));
                    e.append(f), 5 != ("" + a.type).charAt(0) && 6 != ("" + a.type).charAt(0) && "r" != a.type && "c" != a.type && "a" != a.type && "8" != a.type && "l" != a.type && "s" != a.type && "i" != a.type && "h" != a.type || "edit" != b || $(c).before($('<div class="element" style="position: absolute; height: 100%; width: 100%;z-index: 1;">'))
                }
                if (a.css) {
                    var g = 320 - parseInt(a.css.left);
                    if (e.css({
                            width: g
                        }), e.css({
                            width: a.css.width,
                            height: a.css.height,
                            left: a.css.left,
                            top: a.css.top,
                            zIndex: a.css.zIndex,
                            bottom: a.css.bottom,
                            transform: a.css.transform
                        }), (0 === a.css.boxShadowSize || "0" == a.css.boxShadowSize) && (a.css.boxShadow = "rgba(0,0,0,0) 0 0 0"), "edit" != i.mode && "x" == ("" + a.type).charAt(0)) return e.append(c), e.find(".element-box").css({
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
                    }), e;
                    isAndroid() && isWeixin() && 4 == a.type && "0px" != a.css.borderRadius && 0 == a.css.borderWidth && a.properties.anim && (a.css.borderWidth = 1, a.css.borderColor = "rgba(0,0,0,0)"), f.css(a.css).css({
                        width: "100%",
                        height: "100%",
                        transform: "none"
                    }), f.children(".element-box-contents").css({
                        width: "100%",
                        height: "100%"
                    }), 4 != ("" + a.type).charAt(0) && "n" != ("" + a.type).charAt(0) && "p" != ("" + a.type).charAt(0) && "h" != ("" + a.type).charAt(0) && $(c).css({
                        width: a.css.width,
                        height: a.css.height
                    }), "h" == ("" + a.type).charAt(0) && ($(c).find("g").length ? $(c).find("g").attr("fill", a.css.color) : $(c).children().attr("fill", a.css.color), f.children(".element-box-contents").css("position", "relative"))
                }
                return e
            }
        }

        function c(a) {
            for (var b = 0; b < a.length - 1; b++) for (var c = b + 1; c < a.length; c++) if (parseInt(a[b].css.zIndex, 10) > parseInt(a[c].css.zIndex, 10)) {
                var d = a[b];
                a[b] = a[c], a[c] = d
            }
            for (var e = 0; e < a.length; e++) a[e].css.zIndex = e + 1 + "";
            return a
        }

        function d(a, d, e) {
            d = d.find(".edit_area");
            var f, i = a.elements;
            if (i) for (i = c(i), f = 0; f < i.length; f++) if (i[f].sceneId = a.sceneId, 3 == i[f].type) {
                var j = l[("" + i[f].type).charAt(0)](i[f], d);
                "edit" == e && m[("" + i[f].type).charAt(0)] && m[("" + i[f].type).charAt(0)](j, i[f])
            } else {
                var k = b(i[f], e);
                if (!k) continue;
                d.append(k);
                for (var p = 0; p < o.length; p++) o[p](k, i[f], e);
                n[("" + i[f].type).charAt(0)] && (n[("" + i[f].type).charAt(0)](k, i[f]), "edit" != e && (g(k, i[f]), h(k, i[f]))), "edit" == e && m[("" + i[f].type).charAt(0)] && m[("" + i[f].type).charAt(0)](k, i[f])
            }
        }

        function e() {
            return m
        }

        function f() {
            return l
        }

        function j(a) {
            o.push(a)
        }

        function k() {
            return o
        }

        var l = {},
            m = {},
            n = {},
            o = [],
            p = containerWidth = 320,
            q = containerHeight = 486,
            r = 1,
            s = 1,
            t = {
                getComponents: f,
                getEventHandlers: e,
                addComponent: a(l),
                bindEditEvent: a(m),
                bindAfterRenderEvent: a(n),
                addInterceptor: j,
                getInterceptors: k,
                wrapComp: b,
                mode: "view",
                parse: function (a) {
                    var b = $('<div class="edit_wrapper" data-scene-id="' + a.def.sceneId + '"><ul eqx-edit-destroy id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active"></div>'),
                        c = this.mode = a.mode;
                    this.def = a.def, "view" == c && tplCount++;
                    var e = $(a.appendTo);
                    return containerWidth = e.width(), containerHeight = e.height(), r = p / containerWidth, s = q / containerHeight, d(a.def, b.appendTo($(a.appendTo)), c)
                }
            };
        return t
    });
    i.addInterceptor(function (a, b, c) {
        eqxCommon.animation(a, b, c)
    }), i.addComponent("1", function (a) {
        var b = document.createElement("div");
        if (b.id = a.id, b.setAttribute("class", "element comp_title"), a.content && (b.textContent = a.content), a.css) {
            var c, d = a.css;
            for (c in d) b.style[c] = d[c]
        }
        if (a.properties.labels) for (var e = a.properties.labels, f = 0; f < e.length; f++) $('<a class = "label_content" style = "display: inline-block;">').appendTo($(b)).html(e[f].title).css(e[f].color).css("width", 100 / e.length + "%");
        return b
    }), i.addComponent("2", function (a) {
        var b = document.createElement("div");
        return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_paragraph editable-text"), a.content && (b.innerHTML = a.content), b.style.cursor = "default", b
    }), i.addComponent("x", function (a) {
        var b;
        if (!mobilecheck() && window.top == window && $(".create_left").get(0) && (i.mode = "edit"), "edit" == i.mode) b = document.createElement("div"), b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_paragraph editable-text"), a.content && (b.innerHTML = a.content), b.style.cursor = "default";
        else var b = '<div class="element-box"><img src="' + a.properties.dataUrl + '"></div>';
        return b
    }), i.addComponent("3", function (a, b) {
        var c, d = document.createElement("div");
        "edit" == i.mode ? (c = b ? b.parent(".edit_wrapper") : $("#nr .edit_wrapper"), d.setAttribute("class", "wrapper-background"), d.setAttribute("id", a.id)) : "view" == i.mode && (c = b ? b.parent(".edit_wrapper") : $("#edit_area" + i.def.id).parent(".edit_wrapper"), d.setAttribute("id", "wrapper-background" + i.def.id)), $(d).prependTo(c).css({
            width: "100%",
            height: "100%"
        });
        var e, f = new Image;
        return a.properties.imgSrc ? (e = a.properties.imgSrc, /^http.*!/.test(e) ? (f.src = e, d.style.backgroundImage = "url(" + e + ")") : (f.src = PREFIX_FILE_HOST + e, d.style.backgroundImage = "url(" + PREFIX_FILE_HOST + e + ")"), d.style.backgroundOrigin = "element content-box", d.style.backgroundSize = "cover", d.style.backgroundPosition = "50% 50%", a.effect && ("scaleUp" == a.effect.type ? $(d).css({
            animation: "scaleUp 7s ease 1s",
            "animation-fill-mode": "both"
        }) : "scaleDown" == a.effect.type && $(d).css({
            animation: "scaleDown 7s ease 1s",
            "animation-fill-mode": "both"
        }))) : a.properties.bgColor && (d.style.backgroundColor = a.properties.bgColor), d
    }), i.addComponent("4", function (a) {
        var b = document.createElement("img");
        return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_image editable-image"), /^http.*/.test(a.properties.src) ? b.src = a.properties.src : b.src = PREFIX_FILE_HOST + a.properties.src, b
    }), i.addComponent("h", function (a) {
        var b, c;
        if (a.properties.type.indexOf("symbol") < 0) {
            var b = document.createElementNS(eqxiuSvg.NAMESPACE, "svg");
            return b.id = a.id, b.setAttribute("class", "element svg-element"), b.setAttribute("xmlns", eqxiuSvg.NAMESPACE), b.setAttribute("version", "1.1"), b.setAttribute("width", "100%"), b.setAttribute("height", "100%"), b.setAttribute("preserveAspectRatio", "none"), c = eqxiuSvg.ShapeFromType(a.properties.type), c.setAttribute("fill", "#555"), b.appendChild(c), s = eqxiuSvg.boundingBox(c), viewBox = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" "), b.setAttribute("viewBox", viewBox), b
        }
        return b = document.createElement("div"), c = eqxiuSvg.ShapeFromType(a.properties.type, 100, 100, a.id, a.css.color), b = '<svg id="' + a.id + '" class="element svg-element" ctype="' + a.type + '" xmlns="' + eqxiuSvg.NAMESPACE + '" version="1.1" width="100%" height="100%" preserveAspectRatio="xMidYMid" viewBox="' + a.properties.viewBox + '">' + c + "</svg>"
    }), i.addComponent("v", function (a) {
        var b = document.createElement("a");
        return b.setAttribute("class", "element video_area"), b.id = a.id, b.setAttribute("ctype", a.type), a.properties.src && b.setAttribute("videourl", a.properties.src), b
    }), i.addComponent("5", function (a) {
        var b = document.createElement("textarea");
        return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_input editable-text"), b.setAttribute("maxlength", "300"), a.properties.required && b.setAttribute("required", a.properties.required), a.properties.placeholder && b.setAttribute("placeholder", a.properties.placeholder), b.setAttribute("name", "eq[f_" + a.id + "]"), b.style.width = "100%", b
    }), i.addComponent("r", function (a) {
        var b = $('<div class="element comp_radio editable-text" id="' + a.id + '"></div>');
        b.attr("ctype", a.type), b.attr("required", a.properties.required), b.attr("title", a.title), b.attr("name", "eq[f_" + a.id + "]");
        var c = $('<div class="radio-title">' + a.title + "</div>");
        a.properties.titleStyle && c.css(a.properties.titleStyle), b.append(c);
        var d = $('<div class="options"></div>'),
            e = JSON.parse(a.choices);
        return $.each(e.options, function (b, c) {
            var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="radio" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
            a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle), d.append(f)
        }), b.append(d), b.width("100%"), b.get(0)
    }), i.addComponent("c", function (a) {
        var b = $('<div class="element comp_radio editable-text" id="' + a.id + '"></div>');
        b.attr("ctype", a.type), b.attr("required", a.properties.required), b.attr("title", a.title), b.attr("name", "eq[f_" + a.id + "]");
        var c = $('<div class="radio-title">' + a.title + "(可多选)</div>");
        a.properties.titleStyle && c.css(a.properties.titleStyle), b.append(c);
        var d = $('<div class="options"></div>'),
            e = JSON.parse(a.choices);
        return $.each(e.options, function (b, c) {
            var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="checkbox" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
            a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle), d.append(f)
        }), b.append(d), b.width("100%"), b.get(0)
    }), i.addComponent("a", function (a) {
        var b = $('<div class="element comp_rating editable-text" id="' + a.id + '"></div>');
        b.attr("ctype", a.type), b.attr("required", a.properties.required), b.attr("title", a.title), b.attr("name", "eq[f_" + a.id + "]"), b.append($('<div class="rating-title">' + a.title + "</div>"));
        for (var c = $('<div class="rating-icons"></div>'), d = 0; 5 > d; d++) c.append($('<i class="' + a.properties.icon + "-line " + a.properties.size + '">').css("color", a.properties.color));
        return b.append(c), b.append($('<input type="hidden" name="eq[f_' + a.id + ']" value="">')), b.width("100%"), b.get(0)
    }), i.addComponent("p", function (a) {
        if (a.properties && a.properties.children) {
            var c = a.css.width,
                d = a.css.height,
                e = $('<div id="' + a.id + '" class="slider element" ctype="' + a.type + '"></div>');
            return a.properties.bgColor && e.css("backgroundColor", a.properties.bgColor), $.each(a.properties.children, function (a, f) {
                var g = b(f.width, f.height, c, d),
                    h = $('<img src="' + PREFIX_FILE_HOST + f.src + '">');
                h.css({
                    margin: (d - g.height) / 2 + "px " + (c - g.width) / 2 + "px",
                    width: g.width,
                    height: g.height
                }), e.append(h)
            }), utilPictures.deleteInterval(a.id), e.get(0)
        }
    }), i.addComponent("n", function (a) {
        if (a.properties && a.properties.pics.length) {
            var b = (a.css.width, a.css.height, $('<div id="' + a.id + '" class="random-event element comp_image editable-image" ctype="' + a.type + '"></div>'));
            return $.each(a.properties.pics, function (a, c) {
                var d = $('<img src="' + PREFIX_FILE_HOST + c.src + '">');
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
            }), b.get(0)
        }
    }), i.addComponent("6", function (a) {
        var b = document.createElement("button");
        if (b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_button editable-text"), a.properties.title) {
            var c = a.properties.title.replace(/ /g, "&nbsp;");
            b.innerHTML = c
        }
        return b.style.width = "100%", b
    }), i.addComponent("8", function (a) {
        var b = document.createElement("a");
        b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text");
        var c = null;
        return a.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>'), $(b).html(c), "view" == i.mode && $(b).attr("href", "tel:" + a.properties.number)) : a.properties.title && (c = a.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c), "view" == i.mode && $(b).attr("href", "tel:" + a.properties.number)), b.style.cursor = "default", b.style.width = "100%", b
    }), i.addComponent("l", function (a) {
        var b = document.createElement("a");
        b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text");
        var c = null;
        return a.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>'), $(b).html(c)) : a.properties.title && (c = a.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c)), b.style.cursor = "default", b.style.width = "100%", b
    }), i.addComponent("s", function (a) {
        var b = document.createElement("a");
        b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text");
        var c = null;
        return a.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>'), $(b).html(c)) : a.properties.title && (c = a.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c)), b.style.cursor = "default", b.style.width = "100%", b
    }), i.addComponent("i", function (b) {
        var c = $('<div class="element comp_counter not-voted editable-text" id="' + b.id + '"></div>');
        c.attr("ctype", b.type), c.attr("name", "eq[f_" + b.id + "]"), c.addClass(b.properties.layout).addClass(b.properties.size);
        var d = $('<div class="counter-container"></div>');
        b.properties.imgSrc ? d.append($('<img class="counter-elem counter-icon" style="width: 115px; height: 115px; margin: 0 auto;" src="' + (PREFIX_FILE_HOST + b.properties.imgSrc) + '"></img>')) : d.append($('<i class="counter-elem counter-icon ' + b.properties.icon + '">').css("color", b.properties.color));
        var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
        if (d.append(e), "view" == i.mode ? a.counterValues && a.counterValues.then(function (c) {
                var d = c.map[b.id] || 0;
                e.attr("data-counter-number", d);
                var f = a.fixedNum(d);
                e.text(f)
            }) : c.removeClass("not-voted"), c.width("100%"), "counter-tb" === b.properties.layout) {
            var f = 0;
            f = b.properties.imgSrc ? "counter-l" == b.properties.size ? 77 : "counter-m" == b.properties.size ? 71 : 66 : "counter-l" == b.properties.size ? 40 : "counter-m" == b.properties.size ? 30 : 20, d.css("margin-top", -f)
        }
        return "edit" != i.mode && setTimeout(function () {
            var a = {
                width: "auto",
                "min-width": b.css.width
            };
            c.css(a), c.parents("li.comp-resize").css(a)
        }, 100), c.append(d), b.css.lineHeight && c.css("line-height", b.css.lineHeight), c.get(0)
    }), i.addComponent("d", function (b) {
        var c = $('<div class="element comp_counter editable-text" id="' + b.id + '"></div>');
        c.attr("ctype", b.type), c.addClass(b.properties.layout).addClass(b.properties.size);
        var d = $('<div class="counter-container"></div>');
        d.append($('<i class="counter-elem counter-icon ' + b.properties.icon + '">').css("color", b.properties.color));
        var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
        if (d.append(e), "view" == i.mode && a.showCount && a.showCount.then(function (b) {
                var c = a.fixedNum(b),
                    d = c || 0;
                e.text(d)
            }), c.width("100%"), "counter-tb" === b.properties.layout) {
            var f = 0;
            f = "counter-l" == b.properties.size ? 40 : "counter-m" == b.properties.size ? 30 : 20, d.css("margin-top", -f)
        }
        return c.append(d), b.css.lineHeight && c.css("line-height", b.css.lineHeight), c.get(0)
    }), i.addComponent("7", function (a) {
        var b = document.createElement("div");
        if (b.id = "map_" + a.id, b.setAttribute("class", "element comp_map_wrapper"), a.content && (b.textContent = a.content), a.css) {
            var c, d = a.css;
            for (c in d) b.style[c] = d[c]
        }
        return b.style.height = "250px", b
    }), i.bindAfterRenderEvent("1", function (a, b) {
        if (a = $("div", a)[0], "view" == i.mode && 1 == b.type) {
            var c = b.properties.labels;
            for (key in c)!
                function (b) {
                    $($(a).find(".label_content")[b]).on("click", function () {
                        pageScroll(c[b])
                    })
                }(key)
        }
    }), i.bindAfterRenderEvent("8", function (a, b) {
        a = $("a", a)[0];
        var c = {
            id: b.sceneId,
            num: b.properties.number
        };
        if ("view" == i.mode) {
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
    }), i.bindAfterRenderEvent("l", function (a, b) {
        if (a = $("a", a)[0], "view" == i.mode) {
            var c = b.properties.url;
            $(a).click(function (a) {
                isNaN(c) ? window.open(c) : eqxiu.pageScroll(c)
            })
        }
    }), i.bindAfterRenderEvent("s", function (a, b) {
        a = $("a", a)[0], "view" == i.mode && $(a).click(function (a) {
        })
    }), i.bindAfterRenderEvent("i", function (b, c) {
        if ("view" == i.mode) {
            var d = $(b).find(".counter-icon");
            d.click(function (e) {
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
                        var f = a.fixedNum(e);
                        $(".counter-number", g).text(f)
                    }
                })
            })
        }
    }), i.bindAfterRenderEvent("4", function (a, b) {
        c(a, b)
    }), i.bindAfterRenderEvent("x", function (a, b) {
        c(a, b)
    }), i.bindAfterRenderEvent("n", function (a, b) {
    }), i.bindAfterRenderEvent("h", function (a, b) {
        "view" == i.mode && b.properties.url && $(a).click(function (a) {
            var c = b.properties.url;
            isNaN(c) ? window.open(c) : eqxiu.pageScroll(c)
        })
    }), i.bindAfterRenderEvent("5", function (a, b) {
        var c = mobilecheck();
        d($(a).find("textarea")), e($(a).find("textarea")), "view" == i.mode && c && parseFloat(b.css.top) >= 200 && ($(a).find("textarea").focus(function (b) {
            $(a).closest(".edit_area").css({
                top: "-150px"
            })
        }), $(a).find("textarea").blur(function (b) {
            $(a).closest(".edit_area").css({
                top: 0
            })
        }))
    }), i.bindAfterRenderEvent("r", function (a, b) {
        "view" == i.mode && d($(a).find("label"))
    }), i.bindAfterRenderEvent("c", function (a, b) {
        "view" == i.mode && d($(a).find("label"))
    }), i.bindAfterRenderEvent("v", function (a, b) {
        "view" == i.mode && $(a).click(function () {
            $(a).hide(), $("#audio_btn").hasClass("video_exist") && ($("#audio_btn").hide(), $("#media")[0].pause()), utilSound.pause(), $('<div class="video_mask page_effect lock" id="mask_' + b.id + '"></div>').appendTo($(a).closest(".m-img")), $('<a class = "close_mask" id="close_' + b.id + '"></a>').appendTo($(a).closest(".m-img")), $(b.properties.src).appendTo($("#mask_" + b.id)).attr("style", "position: absolute;top:0; min-height: 45%; max-height: 100%; top: 20%;").attr("width", "100%").removeAttr("height"), $("#close_" + b.id).bind("click", function () {
                $(a).show(), $("#mask_" + b.id).remove(), $("#close_" + b.id).remove(), $("#audio_btn").hasClass("video_exist") && $("#audio_btn").show(function () {
                    $("#media")[0].play()
                })
            })
        })
    }), i.bindAfterRenderEvent("2", function (a, b) {
        f(a)
    }), i.bindAfterRenderEvent("6", function (a, b) {
        if (a = $("button", a)[0], "view" == i.mode) {
            var c = {
                    REQUIRED: "为必填项！",
                    WRONG_PHONE_NUMBER_FORMAT: "手机号码格式错误！",
                    WRONG_EMAIL_FORMAT: "邮箱格式错误！",
                    FILL_OUT_THE_FORM: "请填写表单！",
                    DUPLICATED_SUBMISSION: "请不要重复提交！",
                    THANKS_FOR_PARTICIPATION: "您提交的信息已经咻咻地跑到我们的数据库啦！灰常感谢您的参与呐~！"
                },
                d = function (a, b, d) {
                    var e = !0,
                        f = {};
                    if ($("textarea", d).each(function () {
                            if (e) {
                                if ("required" == $(this).attr("required") && "" == $(this).val().trim()) return layer.alert($(this).attr("placeholder") + c.REQUIRED), void(e = !1);
                                if ("502" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
                                    var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
                                    if (!a.test($(this).val())) return layer.alert("手机号码格式错误！"), void(e = !1)
                                }
                                if ("503" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
                                    var b = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
                                    if (!b.test($(this).val())) return layer.alert("邮箱格式错误！"), void(e = !1)
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
                        if ($.isEmptyObject(f)) return void(g = !0);
                        for (var h in f) if ("" !== f[h]) {
                            g = !0;
                            break
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
                                }), layer.alert("您提交的信息已经咻咻地跑到我们的数据库啦！灰常感谢您的参与呐~！")
                            }
                        }) : void layer.alert("请填写表单！")
                    }
                };
            i.def.sceneId;
            $(a).bind("click", function () {
                var b, c = $(a).parents(".edit_wrapper").attr("data-scene-id");
                b = c ? $(a).parents(".nr").find('.edit_wrapper[data-scene-id="' + c + '"]') : $(a).parents(".nr"), d(this, c, b)
            })
        }
    }), i.bindAfterRenderEvent("7", function (a, b) {
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
    }), i.bindAfterRenderEvent("p", function (a, b) {
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
    }), i.bindAfterRenderEvent("a", function (a, b) {
        function c(a) {
            f.each(function (b, c) {
                $(c).removeClass(h).addClass(h + "-line"), a >= b && $(c).removeClass(h + "-line").addClass(h)
            })
        }

        var e = $(a);
        if ("view" == i.mode) {
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
            }), d(e.find(".rating-icons"))
        }
    });
    var j
}(window.eqShow);
var tplCount = 0,
    eqxCommon = function () {
        var a = function (a) {
                var b, c, d = a.type;
                return 0 === d && (b = "fadeIn"), 1 === d && (c = a.direction, 0 === c && (b = "fadeInLeft"), 1 === c && (b = "fadeInDown"), 2 === c && (b = "fadeInRight"), 3 === c && (b = "fadeInUp")), 6 === d && (b = "wobble"), 5 === d && (b = "rubberBand"), 7 === d && (b = "rotateIn"), 8 === d && (b = "flip"), 9 === d && (b = "swing"), 2 === d && (c = a.direction, 0 === c && (b = "bounceInLeft"), 1 === c && (b = "bounceInDown"), 2 === c && (b = "bounceInRight"), 3 === c && (b = "bounceInUp")), 3 === d && (b = "bounce"), 4 === d && (b = "zoomIn"), 10 === d && (b = "fadeOut"), 11 === d && (b = "flipOutY"), 12 === d && (b = "rollIn"), 13 === d && (b = "lightSpeedIn"), 14 === d && (b = "bounceOut"), 15 === d && (b = "rollOut"), 16 === d && (b = "lightSpeedOut"), 17 === d && (c = a.direction, 0 === c && (b = "fadeOutRight"), 1 === c && (b = "fadeOutDown"), 2 === c && (b = "fadeOutLeft"), 3 === c && (b = "fadeOutUp")), 18 === d && (b = "zoomOut"), 19 === d && (c = a.direction, 0 === c && (b = "bounceOutRight"), 1 === c && (b = "bounceOutDown"), 2 === c && (b = "bounceOutLeft"), 3 === c && (b = "bounceOutUp")), 20 === d && (b = "flipInY"), 21 === d && (b = "tada"), 22 === d && (b = "jello"), 23 === d && (b = "flash"), 24 === d && (b = "flipInX"), 25 === d && (b = "flipOutX"), b
            },
            b = function (a, b, c) {
                function d(a, b, f) {
                    if (f.length && e < f.length) {
                        a.css("animation", "");
                        a.get(0);
                        a.css("animation", b[e] + " " + f[e].duration + "s ease " + f[e].delay + "s " + (f[e].countNum ? f[e].countNum : "")), "view" == c ? (f[e].count && e == f.length - 1 && a.css("animation-iteration-count", "infinite"), a.css("animation-fill-mode", "both")) : (a.css("animation-iteration-count", "1"), a.css("animation-fill-mode", "backwards")), f[e].linear && a.css("animation-timing-function", "linear"), a.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                            e++, d(a, b, f)
                        })
                    }
                }

                var e = 0;
                if (b.properties && b.properties.anim) {
                    var f = [];
                    b.properties.anim.length ? f = b.properties.anim : f.push(b.properties.anim);
                    var g = $(".element-box", a);
                    g.attr("element-anim", "");
                    for (var h, i = [], j = [], k = 0, l = f.length; l > k; k++) null != f[k].type && -1 != f[k].type && (h = eqxCommon.convertType(f[k]), i.push(h), j.push(f[k]));
                    b.properties.anim.trigger ? a.click(function () {
                        d(g, h, b.properties.anim)
                    }) : d(g, i, j)
                }
            },
            c = function (a, b) {
                var c = $(a);
                if (b.trigger && b.trigger.receives && b.trigger.receives.length) {
                    $.each(b.trigger.receives, function (a, d) {
                        if (d.ids.length) {
                            var e = utilTrigger.getHandleType(d.type).name;
                            ("show" == e || "randomEvent" == e) && c.hide(), "hide" == e && c.show(), c.bind(e, function () {
                                if ("show" == e) $(this).show();
                                else if ("hide" == e) $(this).hide();
                                else if ("randomEvent" == e) {
                                    $(this).show();
                                    var a = Math.floor(Math.random() * b.properties.pics.length);
                                    $(this).find("img").css({
                                        display: "none"
                                    }), $(this).find("img").eq(a).css({
                                        display: "block"
                                    })
                                }
                            })
                        }
                    })
                }
            },
            d = function () {
                var a, b, c = window.navigator,
                    d = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
                if ($.isArray(c.languages)) for (a = 0; a < c.languages.length; a++) if (b = c.languages[a], b && b.length) return b;
                for (a = 0; a < d.length; a++) if (b = c[d[a]], b && b.length) return b;
                return null
            };
        return {
            convertType: a,
            animation: b,
            bindTrigger: c,
            getFirstBrowserLanguage: d
        }
    }();
eqShow.getShowCount = function (a) {
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
    }), this.showCount
}, eqShow.fixedNum = function (a) {
    var b;
    return 1e4 > a ? b = a : a >= 1e4 && 1e8 > a ? b = (a / 1e4).toFixed(2) + "万" : a >= 1e8 && (b = (a / 1e8).toFixed(2) + "亿"), b
}, eqShow.showProgressBar = function (a, b, c) {
    if (a.obj.property.slideNumber) {
        var d = $('<div class="progress"></div>'),
            e = $("<span></span>"),
            f = $('<em class="page-tip"></em>');
        d.append(e).append(f), c && a.obj.property.slideDisplay ? c.append(d.css("display", a.obj.property.slideDisplay)) : $("#nr").append(d.css("display", "block"))
    }
    var g = function () {
        a.obj.property.slideNumber && e && setTimeout(function () {
            var a = $(".z-active").get(0) ? $(".z-active").get(0) : $(".z-current").get(0);
            if (a) {
                var c = $(a).find(".m-img").attr("id").substring(4),
                    g = b.length,
                    h = c / g,
                    i = 100;
                f.text(c + "/" + g), e.css("width", parseFloat(d.width()) * h), $(a).find(".lock").length && (i = 0), d.css("z-index", i)
            }
        }, 100)
    };
    g(), b.eq(0).find(".u-arrow-bottom").css("bottom", "30px"), eqShow.progressInterval = setInterval(function () {
        g()
    }, 300)
}, eqShow.selectElement = function (a) {
    var b;
    return b = $("#inside_" + a, ".phone-view").length ? $("#inside_" + a, ".phone-view") : $("#inside_" + a)
}, function (a) {
    function b(b) {
        return b.classList ? b.classList : a(b).attr("class").match(/\S+/gi)
    }

    a.fn.ShareLink = function (c) {
        function d(a) {
            var b = g[a];
            return b = b.replace("{url}", encodeURIComponent(c.url)), b = b.replace("{title}", encodeURIComponent(c.title)), b = b.replace("{text}", encodeURIComponent(c.text)), b = b.replace("{image}", encodeURIComponent(c.image))
        }

        var e = {
                title: "",
                text: "",
                image: "",
                url: window.location.href,
                class_prefix: "s_"
            },
            c = a.extend({}, e, c),
            f = c.class_prefix.length,
            g = {
                twitter: "https://twitter.com/intent/tweet?url={url}&text={text}",
                pinterest: "https://www.pinterest.com/pin/create/button/?media={image}&url={url}&description={text}",
                facebook: "https://www.facebook.com/sharer.php?u={url}",
                vk: "https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}&noparse=true",
                linkedin: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}",
                myworld: "https://connect.mail.ru/share?url={url}&title={title}&description={text}&imageurl={image}",
                odnoklassniki: "http://odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl={url}&st.comments={text}",
                tumblr: "https://tumblr.com/share?s=&v=3&t={title}&u={url}",
                blogger: "https://blogger.com/blog-this.g?t={text}&n={title}&u={url}",
                delicious: "https://delicious.com/save?url={url}&title={title}",
                plus: "https://plus.google.com/share?url={url}",
                digg: "https://digg.com/submit?url={url}&title={title}",
                reddit: "http://reddit.com/submit?url={url}&title={title}",
                stumbleupon: "https://www.stumbleupon.com/submit?url={url}&title={title}",
                pocket: "https://getpocket.com/edit?url={url}&title={title}",
                chiq: "http://www.chiq.com/create/bookmarklet?u={url}&i={image}&d={title}&c={url}",
                qrifier: "http://qrifier.com/q?inc=qr&type=url&size=350&string={url}",
                qrsrc: "http://www.qrsrc.com/default.aspx?shareurl={url}",
                qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}",
                tulinq: "http://www.tulinq.com/enviar?url={url}&title={title}",
                misterwong: "http://www.mister-wong.com/index.php?action=addurl&bm_url={url}&bm_description={title}&bm_notice=",
                sto_zakladok: "http://www.100zakladok.ru/save/?bmurl={url}&bmtitle={title}",
                two_linkme: "http://www.2linkme.com/?collegamento={url}&id=2lbar",
                adifni: "http://www.adifni.com/account/bookmark/?bookmark_url={url}",
                amazonwishlist: "http://www.amazon.com/gp/wishlist/static-add?u={url}&t={title}",
                amenme: "http://www.amenme.com/AmenMe/Amens/AmenToThis.aspx?url={url}&title={title}",
                aim: "http://lifestream.aol.com/share/?url={url}&title={title}&description={text} ",
                aolmail: "http://webmail.aol.com/25045/aol/en-us/Mail/compose-message.aspx?to=&subject={title}&body={{content}}",
                arto: "http://www.arto.com/section/linkshare/?lu={url}&ln={title}",
                baidu: "http://cang.baidu.com/do/add?it={title}&iu={url}&fr=ien&dc={text}",
                bitly: "https://bitly.com/a/bitmarklet?u={url}",
                bizsugar: "http://www.bizsugar.com/bizsugarthis.php?url={url}",
                blinklist: "http://www.blinklist.com/blink?u={url}&t={title}&d={text}",
                blip: "http://blip.pl/dashboard?body={title}%3A%20{url}",
                blogmarks: "http://blogmarks.net/my/new.php?mini=1&simple=1&url={url}&title={title}&content={text}",
                blurpalicious: "http://www.blurpalicious.com/submit/?url={url}&title={title}&desc={text}",
                bobrdobr: "http://bobrdobr.ru/addext.html?url={url}&title={title}&desc={text}",
                bonzobox: "http://bonzobox.com/toolbar/add?u={url}&t={title}&desc={text}",
                bookmerkende: "http://www.bookmerken.de/?url={url}&title={title}",
                box: "https://www.box.net/api/1.0/import?import_as=link&url={url}&name={title}&description={text}",
                bryderi: "http://bryderi.se/add.html?u={url}",
                buddymarks: "http://buddymarks.com/add_bookmark.php?bookmark_title={title}&bookmark_url={url}&bookmark_desc={text}",
                camyoo: "http://www.camyoo.com/note.html?url={url}",
                care2: "http://www.care2.com/news/compose?sharehint=news&share[share_type]news&bookmarklet=Y&share[title]={title}&share[link_url]={url}&share[content]={text}",
                citeulike: "http://www.citeulike.org/posturl?url={url}&title={title}",
                classicalplace: "http://www.classicalplace.com/?u={url}&t={title}&c={text}",
                cosmiq: "http://www.cosmiq.de/lili/my/add?url={url}",
                diggita: "http://www.diggita.it/submit.php?url={url}&title={title}",
                diigo: "http://www.diigo.com/post?url={url}&title={title}&desc={text}",
                domelhor: "http://domelhor.net/submit.php?url={url}&title={title}",
                dotnetshoutout: "http://dotnetshoutout.com/Submit?url={url}&title={title}",
                douban: "http://www.douban.com/recommend/?url={url}&title={title}",
                dropjack: "http://www.dropjack.com/submit.php?url={url}",
                edelight: "http://www.edelight.de/geschenk/neu?purl={url}",
                ekudos: "http://www.ekudos.nl/artikel/nieuw?url={url}&title={title}&desc={text}",
                elefantapl: "http://elefanta.pl/member/bookmarkNewPage.action?url={url}&title={title}&bookmarkVO.notes=",
                embarkons: "http://www.embarkons.com/sharer.php?u={url}&t={title}",
                evernote: "http://www.evernote.com/clip.action?url={url}&title={title}",
                extraplay: "http://www.extraplay.com/members/share.php?url={url}&title={title}&desc={text}",
                ezyspot: "http://www.ezyspot.com/submit?url={url}&title={title}",
                fabulously40: "http://fabulously40.com/writeblog?subject={title}&body={url}",
                informazione: "http://fai.informazione.it/submit.aspx?url={url}&title={title}&desc={text}",
                fark: "http://www.fark.com/cgi/farkit.pl?u={url}&h={title}",
                farkinda: "http://www.farkinda.com/submit?url={url}",
                favable: "http://www.favable.com/oexchange?url={url}&title={title}&desc={text}",
                favlogde: "http://www.favlog.de/submit.php?url={url}",
                flaker: "http://flaker.pl/add2flaker.php?title={title}&url={url}",
                folkd: "http://www.folkd.com/submit/{url}",
                fresqui: "http://fresqui.com/enviar?url={url}",
                friendfeed: "http://friendfeed.com/share?url={url}&title={title}",
                funp: "http://funp.com/push/submit/?url={url}",
                fwisp: "http://fwisp.com/submit.php?url={url}",
                givealink: "http://givealink.org/bookmark/add?url={url}&title={title}",
                gmail: "http://mail.google.com/mail/?view=cm&fs=1&to=&su={title}&body={text}&ui=1",
                goodnoows: "http://goodnoows.com/add/?url={url}",
                google: "http://www.google.com/bookmarks/mark?op=add&bkmk={url}&title={title}&annotation={text}",
                googletranslate: "http://translate.google.com/translate?hl=en&u={url}&tl=en&sl=auto",
                greaterdebater: "http://greaterdebater.com/submit/?url={url}&title={title}",
                hackernews: "http://news.ycombinator.com/submitlink?u={url}&t={title}",
                hatena: "http://b.hatena.ne.jp/bookmarklet?url={url}&btitle={title}",
                hedgehogs: "http://www.hedgehogs.net/mod/bookmarks/add.php?address={url}&title={title}",
                hotmail: "http://www.hotmail.msn.com/secure/start?action=compose&to=&subject={title}&body={{content}}",
                w3validator: "http://validator.w3.org/check?uri={url}&charset=%28detect+automatically%29&doctype=Inline&group=0",
                ihavegot: "http://www.ihavegot.com/share/?url={url}&title={title}&desc={text}",
                instapaper: "http://www.instapaper.com/edit?url={url}&title={title}&summary={text}",
                isociety: "http://isociety.be/share/?url={url}&title={title}&desc={text}",
                iwiw: "http://iwiw.hu/pages/share/share.jsp?v=1&u={url}&t={title}",
                jamespot: "http://www.jamespot.com/?action=spotit&u={url}&t={title}",
                jumptags: "http://www.jumptags.com/add/?url={url}&title={title}",
                kaboodle: "http://www.kaboodle.com/grab/addItemWithUrl?url={url}&pidOrRid=pid=&redirectToKPage=true",
                kaevur: "http://kaevur.com/submit.php?url={url}",
                kledy: "http://www.kledy.de/submit.php?url={url}&title={title}",
                librerio: "http://www.librerio.com/inbox?u={url}&t={title}",
                linkuj: "http://linkuj.cz?id=linkuj&url={url}&title={title}&description={text}&imgsrc=",
                livejournal: "http://www.livejournal.com/update.bml?subject={title}&event={url}",
                logger24: "http://logger24.com/?url={url}",
                mashbord: "http://mashbord.com/plugin-add-bookmark?url={url}",
                meinvz: "http://www.meinvz.net/Suggest/Selection/?u={url}&desc={title}&prov=addthis.com",
                mekusharim: "http://mekusharim.walla.co.il/share/share.aspx?url={url}&title={title}",
                memori: "http://memori.ru/link/?sm=1&u_data[url]={url}",
                meneame: "http://www.meneame.net/submit.php?url={url}",
                mixi: "http://mixi.jp/share.pl?u={url}",
                moemesto: "http://moemesto.ru/post.php?url={url}&title={title}",
                myspace: "http://www.myspace.com/Modules/PostTo/Pages/?u={url}&t={title}&c=",
                n4g: "http://www.n4g.com/tips.aspx?url={url}&title={title}",
                netlog: "http://www.netlog.com/go/manage/links/?view=save&origin=external&url={url}&title={title}&description={text}",
                netvouz: "http://netvouz.com/action/submitBookmark?url={url}&title={title}&popup=no&description={text}",
                newstrust: "http://newstrust.net/submit?url={url}&title={title}&ref=addthis",
                newsvine: "http://www.newsvine.com/_tools/seed&save?u={url}&h={title}&s={text}",
                nujij: "http://nujij.nl/jij.lynkx?u={url}&t={title}&b={text}",
                oknotizie: "http://oknotizie.virgilio.it/post?title={title}&url={url}",
                oyyla: "http://www.oyyla.com/gonder?phase=2&url={url}",
                pdfonline: "http://savepageaspdf.pdfonline.com/pdfonline/pdfonline.asp?cURL={url}",
                pdfmyurl: "http://pdfmyurl.com?url={url}",
                phonefavs: "http://phonefavs.com/bookmarks?action=add&address={url}&title={title}",
                plaxo: "http://www.plaxo.com/events?share_link={url}&desc={text}",
                plurk: "http://www.plurk.com/m?content={url}+({title})&qualifier=shares ",
                posteezy: "http://posteezy.com/node/add/story?title={title}&body={url}",
                pusha: "http://www.pusha.se/posta?url={url}&title={title}&description={text}",
                rediff: "http://share.rediff.com/bookmark/addbookmark?title={title}&bookmarkurl={url}",
                redkum: "http://www.redkum.com/add?url={url}&step=1&title={title}",
                scoopat: "http://scoop.at/submit?url={url}&title={title}&body={text}",
                sekoman: "http://sekoman.lv/home?status={title}&url={url}",
                shaveh: "http://shaveh.co.il/submit.php?url={url}&title={title}",
                shetoldme: "http://shetoldme.com/publish?url={url}&title={title}&body={text}",
                sinaweibo: "http://v.t.sina.com.cn/share/share.php?url={url}&title={title}",
                sodahead: "http://www.sodahead.com/news/submit/?url={url}&title={title}",
                sonico: "http://www.sonico.com/share.php?url={url}&title={title}",
                springpad: "http://springpadit.com/s?type=lifemanagr.Bookmark&url={url}&name={title}",
                startaid: "http://www.startaid.com/index.php?st=AddBrowserLink&type=Detail&v=3&urlname={url}&urltitle={title}&urldesc={text}",
                startlap: "http://www.startlap.hu/sajat_linkek/addlink.php?url={url}&title={title}",
                studivz: "http://www.studivz.net/Suggest/Selection/?u={url}&desc={title}&prov=addthis.com",
                stuffpit: "http://www.stuffpit.com/add.php?produrl={url}",
                stumpedia: "http://www.stumpedia.com/submit?url={url}",
                svejo: "http://svejo.net/story/submit_by_url?url={url}&title={title}&summary={text}",
                symbaloo: "http://www.symbaloo.com/en/add/?url={url}&title={title}",
                thewebblend: "http://thewebblend.com/submit?url={url}&title={title}",
                thinkfinity: "http://www.thinkfinity.org/favorite-bookmarklet.jspa?url={url}&subject={title}",
                thisnext: "http://www.thisnext.com/pick/new/submit/url/?description={text}&name={title}&url={url}",
                tuenti: "http://www.tuenti.com/share?url={url}",
                typepad: "http://www.typepad.com/services/quickpost/post?v=2&qp_show=ac&qp_title={title}&qp_href={url}&qp_text={text}",
                viadeo: "http://www.viadeo.com/shareit/share/?url={url}&title={title}&urlaffiliate=32005&encoding=UTF-8",
                virb: "http://virb.com/share?external&v=2&url={url}&title={title}",
                visitezmonsite: "http://www.visitezmonsite.com/publier?url={url}&title={title}&body={text}",
                vybralisme: "http://vybrali.sme.sk/sub.php?url={url}",
                webnews: "http://www.webnews.de/einstellen?url={url}&title={title}",
                wirefan: "http://www.wirefan.com/grpost.php?d=&u={url}&h={title}&d={text}",
                wordpress: "http://wordpress.com/wp-admin/press-this.php?u={url}&t={title}&s={text}&v=2",
                wowbored: "http://www.wowbored.com/submit.php?url={url}",
                wykop: "http://www.wykop.pl/dodaj?url={url}&title={title}&desc={text}",
                yahoobkm: "http://bookmarks.yahoo.com/toolbar/savebm?opener=tb&u={url}&t={title}&d={text}",
                yahoomail: "http://compose.mail.yahoo.com/?To=&Subject={title}&body={{content}}",
                yammer: "https://www.yammer.com/home/bookmarklet?bookmarklet_pop=1&u={url}&t={title}",
                yardbarker: "http://www.yardbarker.com/author/new/?pUrl={url}&pHead={title}",
                yigg: "http://www.yigg.de/neu?exturl={url}&exttitle={title}&extdesc={text}",
                yoolink: "http://go.yoolink.to/addorshare?url_value={url}&title={title}",
                yorumcuyum: "http://www.yorumcuyum.com/?baslik={title}&link={url}",
                youmob: "http://youmob.com/mobit.aspx?title={title}&mob={url}",
                zakladoknet: "http://zakladok.net/link/?u={url}&t={title}",
                ziczac: "http://ziczac.it/a/segnala/?gurl={url}&gtit={title}"
            };
        this.each(function (e, h) {
            for (var i = b(h), e = 0; e < i.length; e++) {
                var j = i[e];
                if (j.substr(0, f) == c.class_prefix && g[j.substr(f)]) {
                    var k = d(j.substr(f));
                    a(h).attr("href", k).click(function () {
                        var b = screen.width,
                            d = screen.height,
                            e = c.width ? c.width : b - .2 * b,
                            f = c.height ? c.height : d - .2 * d,
                            g = b / 2 - e / 2,
                            h = d / 2 - f / 2,
                            i = "toolbar=0,status=0,width=" + e + ",height=" + f + ",top=" + h + ",left=" + g;
                        return window.open(a(this).attr("href"), "", i) && !1
                    })
                }
            }
        })
    }
}(jQuery), function () {
    eqShow.shakeTrigger = function (a, b) {
        function c(a) {
            var b = a.accelerationIncludingGravity,
                e = (new Date).getTime();
            if (e - j > 100) {
                var n = parseInt(e - j);
                j = e, f = b.x, g = b.y, h = b.z;
                var o = Math.abs(f + g + h - k - l - m) / n * 1e4;
                o > i && (window.removeEventListener("devicemotion", c, !0), d.sends && d.sends.length && $.each(d.sends, function (a, b) {
                    time = setTimeout(function () {
                        $.each(b.handles, function (a, b) {
                            var c = utilTrigger.getHandleType(b.type).name;
                            $.each(b.ids, function (a, b) {
                                var d = $("#inside_" + b);
                                d.trigger(c)
                            })
                        })
                    }, 1e3 * b.delay)
                })), k = f, l = g, m = h
            }
        }

        var d, e = $(b).find(".m-img").attr("id").substring(4);
        if (a[e - 1].properties && (d = a[e - 1].properties.trigger), d && d.sends) {
            var f, g, h, i = 3e3,
                j = 0,
                k = 0,
                l = 0,
                m = 0;
            window.DeviceMotionEvent && b && window.addEventListener("devicemotion", c, !1)
        }
    }
}(), function (a) {
    function b(a, b, i) {
        var j = 0,
            k = [0],
            l = "",
            m = null,
            l = i || "UTF8";
        if ("UTF8" !== l && "UTF16" !== l) throw "encoding must be UTF8 or UTF16";
        if ("HEX" === b) {
            if (0 !== a.length % 2) throw "srcString of HEX type must be in byte increments";
            m = d(a), j = m.binLen, k = m.value
        } else if ("ASCII" === b || "TEXT" === b) m = c(a, l), j = m.binLen, k = m.value;
        else {
            if ("B64" !== b) throw "inputFormat must be HEX, TEXT, ASCII, or B64";
            m = e(a), j = m.binLen, k = m.value
        }
        this.getHash = function (a, b, c, d) {
            var e, i = null,
                l = k.slice(),
                m = j;
            if (3 === arguments.length ? "number" != typeof c && (d = c, c = 1) : 2 === arguments.length && (c = 1), c !== parseInt(c, 10) || 1 > c) throw "numRounds must a integer >= 1";
            switch (b) {
                case "HEX":
                    i = f;
                    break;
                case "B64":
                    i = g;
                    break;
                default:
                    throw "format must be HEX or B64"
            }
            if ("SHA-1" !== a) throw "Chosen SHA variant is not supported";
            for (e = 0; c > e; e++) l = o(l, m), m = 160;
            return i(l, h(d))
        }, this.getHMAC = function (a, b, i, m, n) {
            var p, q, r, s, t = [],
                u = [];
            switch (p = null, m) {
                case "HEX":
                    m = f;
                    break;
                case "B64":
                    m = g;
                    break;
                default:
                    throw "outputFormat must be HEX or B64"
            }
            if ("SHA-1" !== i) throw "Chosen SHA variant is not supported";
            if (q = 64, s = 160, "HEX" === b) p = d(a), r = p.binLen, p = p.value;
            else if ("ASCII" === b || "TEXT" === b) p = c(a, l), r = p.binLen, p = p.value;
            else {
                if ("B64" !== b) throw "inputFormat must be HEX, TEXT, ASCII, or B64";
                p = e(a), r = p.binLen, p = p.value
            }
            if (a = 8 * q, b = q / 4 - 1, r / 8 > q) {
                if ("SHA-1" !== i) throw "Unexpected error in HMAC implementation";
                p = o(p, r), p[b] &= 4294967040
            } else q > r / 8 && (p[b] &= 4294967040);
            for (q = 0; b >= q; q += 1) t[q] = 909522486 ^ p[q], u[q] = 1549556828 ^ p[q];
            if ("SHA-1" !== i) throw "Unexpected error in HMAC implementation";
            return i = o(u.concat(o(t.concat(k), a + j)), a + s), m(i, h(n))
        }
    }

    function c(a, b) {
        var c, d, e = [],
            f = [],
            g = 0;
        if ("UTF8" === b) for (d = 0; d < a.length; d += 1) for (c = a.charCodeAt(d), f = [], c > 2048 ? (f[0] = 224 | (61440 & c) >>> 12, f[1] = 128 | (4032 & c) >>> 6, f[2] = 128 | 63 & c) : c > 128 ? (f[0] = 192 | (1984 & c) >>> 6, f[1] = 128 | 63 & c) : f[0] = c, c = 0; c < f.length; c += 1) e[g >>> 2] |= f[c] << 24 - g % 4 * 8, g += 1;
        else if ("UTF16" === b) for (d = 0; d < a.length; d += 1) e[g >>> 2] |= a.charCodeAt(d) << 16 - g % 4 * 8, g += 2;
        return {
            value: e,
            binLen: 8 * g
        }
    }

    function d(a) {
        var b, c, d = [],
            e = a.length;
        if (0 !== e % 2) throw "String of HEX type must be in byte increments";
        for (b = 0; e > b; b += 2) {
            if (c = parseInt(a.substr(b, 2), 16), isNaN(c)) throw "String of HEX type contains invalid characters";
            d[b >>> 3] |= c << 24 - b % 8 * 4
        }
        return {
            value: d,
            binLen: 4 * e
        }
    }

    function e(a) {
        var b, c, d, e, f, g = [],
            h = 0;
        if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/)) throw "Invalid character in base-64 string";
        if (b = a.indexOf("="), a = a.replace(/\=/g, ""), -1 !== b && b < a.length) throw "Invalid '=' found in base-64 string";
        for (c = 0; c < a.length; c += 4) {
            for (f = a.substr(c, 4), d = e = 0; d < f.length; d += 1) b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(f[d]), e |= b << 18 - 6 * d;
            for (d = 0; d < f.length - 1; d += 1) g[h >> 2] |= (e >>> 16 - 8 * d & 255) << 24 - h % 4 * 8, h += 1
        }
        return {
            value: g,
            binLen: 8 * h
        }
    }

    function f(a, b) {
        var c, d, e = "",
            f = 4 * a.length;
        for (c = 0; f > c; c += 1) d = a[c >>> 2] >>> 8 * (3 - c % 4), e += "0123456789abcdef".charAt(d >>> 4 & 15) + "0123456789abcdef".charAt(15 & d);
        return b.outputUpper ? e.toUpperCase() : e
    }

    function g(a, b) {
        var c, d, e, f = "",
            g = 4 * a.length;
        for (c = 0; g > c; c += 3) for (e = (a[c >>> 2] >>> 8 * (3 - c % 4) & 255) << 16 | (a[c + 1 >>> 2] >>> 8 * (3 - (c + 1) % 4) & 255) << 8 | a[c + 2 >>> 2] >>> 8 * (3 - (c + 2) % 4) & 255, d = 0; 4 > d; d += 1) f = 8 * c + 6 * d <= 32 * a.length ? f + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >>> 6 * (3 - d) & 63) : f + b.b64Pad;
        return f
    }

    function h(a) {
        var b = {
            outputUpper: !1,
            b64Pad: "="
        };
        try {
            a.hasOwnProperty("outputUpper") && (b.outputUpper = a.outputUpper), a.hasOwnProperty("b64Pad") && (b.b64Pad = a.b64Pad)
        } catch (c) {
        }
        if ("boolean" != typeof b.outputUpper) throw "Invalid outputUpper formatting option";
        if ("string" != typeof b.b64Pad) throw "Invalid b64Pad formatting option";
        return b
    }

    function i(a, b) {
        return a << b | a >>> 32 - b
    }

    function j(a, b, c) {
        return a ^ b ^ c
    }

    function k(a, b, c) {
        return a & b ^ ~a & c
    }

    function l(a, b, c) {
        return a & b ^ a & c ^ b & c
    }

    function m(a, b) {
        var c = (65535 & a) + (65535 & b);
        return ((a >>> 16) + (b >>> 16) + (c >>> 16) & 65535) << 16 | 65535 & c
    }

    function n(a, b, c, d, e) {
        var f = (65535 & a) + (65535 & b) + (65535 & c) + (65535 & d) + (65535 & e);
        return ((a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (f >>> 16) & 65535) << 16 | 65535 & f
    }

    function o(a, b) {
        var c, d, e, f, g, h, o, p, q, r = [],
            s = k,
            t = j,
            u = l,
            v = i,
            w = m,
            x = n,
            y = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        for (a[b >>> 5] |= 128 << 24 - b % 32, a[(b + 65 >>> 9 << 4) + 15] = b, q = a.length, o = 0; q > o; o += 16) {
            for (c = y[0], d = y[1], e = y[2], f = y[3], g = y[4], p = 0; 80 > p; p += 1) r[p] = 16 > p ? a[p + o] : v(r[p - 3] ^ r[p - 8] ^ r[p - 14] ^ r[p - 16], 1), h = 20 > p ? x(v(c, 5), s(d, e, f), g, 1518500249, r[p]) : 40 > p ? x(v(c, 5), t(d, e, f), g, 1859775393, r[p]) : 60 > p ? x(v(c, 5), u(d, e, f), g, 2400959708, r[p]) : x(v(c, 5), t(d, e, f), g, 3395469782, r[p]), g = f, f = e, e = v(d, 30), d = c, c = h;
            y[0] = w(c, y[0]), y[1] = w(d, y[1]), y[2] = w(e, y[2]), y[3] = w(f, y[3]), y[4] = w(g, y[4])
        }
        return y
    }

    "function" == typeof define ? define(function () {
        return b
    }) : "undefined" != typeof exports ? "undefined" != typeof module && module.exports ? module.exports = exports = b : exports = b : a.jsSHA = b
}(this), function (a, b) {
    a.completeEffect = function (a) {
        return a.find(".lock").get(0) ? !1 : !0
    }
}(window, jQuery), function () {
    window.eqx = {}, window.eqx.money = {
        config: {
            mode: 3,
            effectCallback: "editMoney",
            imageCallback: "countMoney",
            resources: [{
                url: CLIENT_CDN + "view/js/countMoney.js",
                type: "js"
            }, {
                url: CLIENT_CDN + "assets/images/money/moneybg.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/moremoney.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/flymoney.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/float.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/float2.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/float3.png",
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
}(), function () {
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
}(), function (a, b) {
    function c(a, c) {
        completeEffect(b(".z-current")) && (E = "started", D.length || (D = n.find(".main-page")), c || (B ? (a = event, q = {
            x: a.touches[0].pageX - n.offset().left,
            y: a.touches[0].pageY - n.offset().top
        }) : q = {
            x: a.pageX - n.offset().left,
            y: a.pageY - n.offset().top
        }))
    }

    function d(a, c) {
        if (E = "turning", W && W.obj.property.autoFlip && W.obj.property.autoFlipTime && m(), c || (B ? (a = event, r = {
                x: a.touches[0].pageX - n.offset().left,
                y: a.touches[0].pageY - n.offset().top
            }) : r = {
                x: a.pageX - n.offset().left,
                y: a.pageY - n.offset().top
            }), s = r.x - q.x, 0 > s) {
            if (x) {
                x = !1, B && p ? v = !0 : q.y >= n.height() / 2 ? t = !0 : q.y < n.height() / 2 && (u = !0), y = b(".z-current").get(0);
                var d = b(y).find(".m-img").attr("id").substring(4);
                if (o = b("#flip" + d), Z || (z = b(y).parent(".flip-mask").get(0).nextElementSibling && b(b(y).parent(".flip-mask").get(0).nextElementSibling).find(".main-page").get(0) ? b(b(y).parent(".flip-mask").get(0).nextElementSibling).find(".main-page").get(0) : A ? D.first().get(0) : !1), z) {
                    b(z).find(".m-img").attr("id").substring(4);
                    b(y).parent(".flip-mask").css({
                        zIndex: 100,
                        display: "block"
                    }), b(z).addClass("z-active").parent(".flip-mask").css({
                        zIndex: 99,
                        display: "block"
                    }), i(z), completeEffect(b(z)) || b("#audio_btn").css("opacity", 0), t ? (b(".z-current").css({
                        top: o.height() - n.height() + "px",
                        left: "0"
                    }), o.css({
                        top: "-" + (o.height() - n.height()) + "px"
                    }), b(".turning").css({
                        transformOrigin: "0% 100% 0px",
                        left: n.width() + "px",
                        top: n.height() + "px"
                    })) : u ? b(".turning").css({
                        top: "0",
                        left: n.width() + "px",
                        transformOrigin: "0% 0% 0px"
                    }) : v && (b(".z-current").css({
                        top: 0,
                        left: b(this).width() - n.width() + "px"
                    }), o.css({
                        top: 0,
                        left: -(o.width() - n.width()) + "px"
                    }), b(".turning").css({
                        transformOrigin: "0% 100% 0px",
                        left: n.width() + "px",
                        top: 0
                    }))
                }
            }
        } else if (s > 0 && x) {
            x = !1, w = !0, y = b(".z-current").get(0);
            var d = b(y).find(".m-img").attr("id").substr(4);
            o = b("#flip" + d), Z || (z = b(y).parent(".flip-mask").get(0).previousElementSibling && b(b(y).parent(".flip-mask").get(0).previousElementSibling).find(".main-page").get(0) ? b(b(y).parent(".flip-mask").get(0).previousElementSibling).find(".main-page").get(0) : A ? D.last().get(0) : !1), z && (i(z), completeEffect(b(z)) || b("#audio_btn").css("opacity", 0), b(y).parent(".flip-mask").css({
                display: "block"
            }), b(z).addClass("z-active").parent(".flip-mask").css({
                zIndex: 99,
                display: "block"
            }), b(".turning").css({
                top: "0",
                left: "0",
                transformOrigin: "0% 0% 0px"
            }))
        }
        z && f(r)
    }

    function e(a, b) {
        if (!z) return E = "feeling", t = !1, u = !1, v = !1, w = !1, void(x = !0);
        E = "leaving";
        var c, d, e, g;
        b ? (c = a.x, d = a.y) : B ? (c = r.x - n.offset().left, d = r.y - n.offset().top) : (c = a.pageX - n.offset().left, d = a.pageY - n.offset().top), t ? (F = 16, e = -n.width(), g = n.height(), C = setInterval(function () {
            c = F >= c - e ? c : c - F, d = F >= g - d ? d : d + F, f({
                x: c,
                y: d
            }), F >= c - e && F >= g - d && (clearInterval(C), h())
        }, 10)) : u ? (F = 16, e = -n.width(), g = 0, C = setInterval(function () {
            c = F >= c - e ? c : c - F, d = F >= d - g ? d : d - F, f({
                x: c,
                y: d
            }), F >= c - e && F >= d - g && (clearInterval(C), h())
        }, 1)) : v ? (F = 5, e = -n.width(), C = setInterval(function () {
            c = F >= c - e ? c : c - F, f({
                x: c,
                y: d
            }), F >= c - e && (clearInterval(C), h())
        }, 1)) : w && (F = 3, e = n.width(), g = 0, C = setInterval(function () {
            c = F >= e - c ? c : c + F, f({
                x: c,
                y: d
            }), F >= e - c && (clearInterval(C), h())
        }, 1))
    }

    function f(a) {
        t || u ? (H = n.width() - a.x, t ? I = Math.abs(n.height() - a.y) : u && (I = a.y), J = I / H, K = I / Math.sqrt(H * H + I * I), L = Math.sqrt(1 - K * K), M = Math.sqrt(H * H + I * I) / 2, N = M * J, O = Math.sqrt(N * N + M * M), P = O / J, G = 180 * Math.atan(J) / Math.PI > 0 ? 180 * Math.atan(J) / Math.PI : 0, Q = (n.width() - O) * L, R = (n.width() - O) * K * L, S = (n.width() - O) * (1 - K * K), Q >= 1 && (t ? (G > 1 ? b(".turning").css({
            width: O + "px",
            height: P + "px",
            backgroundColor: "#ff0000",
            background: "-webkit-linear-gradient(" + (180 - G) + "deg, #fff 10%, #d1cfc7 40%, #f2eee2 50%, transparent 50%, transparent 100%)",
            transform: "translateX(-" + (O - 3) + "px) translateY(-" + (P - 3) + "px) rotate(" + 2 * G + "deg) scaleX(-1)"
        }) : g(a), T = "0% 100% 0px", U = "rotate(-" + (90 - G) + "deg) translateY(" + Q + "px)", V = "rotate(" + (90 - G) + "deg) translateY(-" + R + "px) translateX(-" + S + "px)") : u && (G > 1 ? b(".turning").css({
            width: O + "px",
            height: P + "px",
            backgroundColor: "#000",
            background: "-webkit-linear-gradient(-" + (180 - G) + "deg, #fff 10%, #d1cfc7 40%, #f2eee2 50%, transparent 50%, transparent 100%)",
            transform: "translateX(-" + (O - 2) + "px) rotate(-" + 2 * G + "deg) scaleX(-1)"
        }) : g(a), T = "0% 0% 0px", U = "rotate(" + (90 - G) + "deg) translateY(-" + Q + "px)", V = "rotate(-" + (90 - G) + "deg) translateY(" + R + "px) translateX(-" + S + "px)"), o.css({
            zIndex: 100,
            transformOrigin: T,
            transform: U
        }), b(z).parent(".flip-mask").css({
            zIndex: 99,
            display: "block"
        }), b(z).css({
            zIndex: 1e3
        }), b(y).css({
            transformOrigin: T,
            transform: V
        }))) : v ? (b(".turning").css({
            width: (n.width() - a.x) / 2 + "px",
            height: n.height() + "px",
            left: a.x + "px",
            background: "-webkit-linear-gradient(left, #fff 0% , #d1cfc7 15%, #f2eee2 85%, #fff 100%)"
        }), o.css({
            transformOrigin: "0% 50% 0px",
            left: 0,
            transform: "translateX(-" + (o.width() - a.x) + "px)"
        }), b(y).css({
            transformOrigin: "0% 50% 0px",
            transform: "translateX(" + (o.width() - a.x) + "px)"
        })) : w && (o.css({
            zIndex: 100,
            transformOrigin: "0% 50% 0px",
            transform: "translateX(" + a.x + "px)"
        }), b(y).css({
            transformOrigin: "0% 50% 0px",
            transform: "translateX(-" + a.x + "px)"
        }), b(".turning").css({
            width: n.width() - a.x + "px",
            height: n.height() + "px",
            left: -(n.width() - 2 * a.x) + "px",
            background: "-webkit-linear-gradient(left, #fff 0% , #d1cfc7 15%, #f2eee2 85%, #fff 100%)"
        }))
    }

    function g(a) {
        b(".turning").css({
            width: (n.width() - a.x + 6) / 2 + "px",
            height: n.height() + "px",
            top: 0,
            left: a.x + 2 + "px",
            background: "-webkit-linear-gradient(left, #fff 0% , #d1cfc7 10%, #f2eee2 90%, #fff 100%)",
            transform: "",
            border: 0
        })
    }

    function h() {
        var a = W.list;
        W.obj.property.autoFlip && W.obj.property.autoFlipTime && l(), utilSound.pause();
        var c = b("#report0");
        c.length && c.remove(), E = "feeling", t = !1, u = !1, v = !1, w = !1, x = !0, s = 0, b(".flip-mask").css({
            transform: "",
            top: 0,
            left: 0,
            zIndex: 0
        }), b(y).removeClass("z-current").css({
            transform: "",
            top: 0,
            left: 0
        }), b(z).removeClass("z-active").addClass("z-current").css({
            transform: ""
        }), b(".turning").css({
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            transform: "",
            background: "none"
        }), y = z;
        var d = b(z).find(".m-img").attr("id").substring(4);
        b("#flip" + d).css({
            zIndex: 100
        }), b("#audio_btn").css("opacity", 1), z = null;
        var e = b(y).find(".m-img").attr("id").substring(4);
        a[e - 1].elements && a[e - 1].elements.length && b.each(a[e - 1].elements, function (a, c) {
            "d" == c.type && eqShow.getShowCount(W.obj.id).then(function (a) {
                var d = eqShow.fixedNum(a);
                b("#" + c.id).find(".counter-number").text(d)
            })
        }), $ || eqShow.showProgressBar(W, b("#nr").find(".main-page")), $ = !0
    }

    function i(a) {
        if (a) {
            var c = b(a).find(".m-img").attr("id").substring(4);
            b(a).find("li").each(function (a) {
                for (var d = 0; d < W.list[c - 1].elements.length; d++) W.list[c - 1].elements[d].id == parseInt(b(this).attr("id").substring(7), 10) && eqxCommon.animation(b(this), W.list[c - 1].elements[d], "view")
            })
        }
    }

    function j() {
        "turning" != E && "leaving" != E && (q = {
            x: 0,
            y: n.height()
        }, c(q, "mock"), E = "turning", b(".main-page").css({
            width: n.width() + "px",
            height: n.height() + "px"
        }), r = {
            x: 0,
            y: n.height()
        }, w = !0, C = setInterval(function () {
            r.x++, d(r, "mock"), r.x <= 250 && (clearInterval(C), e(r, "mock"))
        }, 1))
    }

    function k() {
        "turning" != E && "leaving" != E && (q = {
            x: n.width(),
            y: n.height()
        }, c(q, "mock"), E = "turning", b(".main-page").css({
            width: n.width() + "px",
            height: n.height() + "px"
        }), r = {
            x: n.width(),
            y: n.height()
        }, B && p ? v = !0 : t = !0, Y = setInterval(function () {
            r.x -= 5, r.y -= 5, d(r, "mock"), r.x <= 200 && (clearInterval(Y), e(r, "mock"), A || z || m())
        }, 1))
    }

    function l() {
        _ = setInterval(function () {
            return completeEffect(b(".z-current")) ? void k() : void m()
        }, 1e3 * X)
    }

    function m() {
        clearInterval(_)
    }

    var n = b(".nr"),
        o = null,
        p = isAndroid(),
        q = {},
        r = {},
        s = 0,
        t = !1,
        u = !1,
        v = !1,
        w = !1,
        x = !0,
        y = null,
        z = null,
        A = !1,
        B = mobilecheck(),
        C = null,
        D = [],
        E = "feeling",
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        R = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = null,
        X = 0,
        Y = "",
        Z = !1;
    a.turnBook = function (a) {
        W = a, W.obj.property.autoFlip && W.obj.property.autoFlipTime && (X = W.obj.property.autoFlipTime, l()), A = W.obj.property.triggerLoop, b('<div class="turning"></div>').appendTo(".nr"), b(".main-page").css({
            width: b(".nr").width() + "px",
            height: b(".nr").height() + "px"
        }), n.on(B ? "touchstart" : "mousedown", function (a) {
            "feeling" == E && (c(a), b(".main-page").css({
                width: n.width() + "px",
                height: n.height() + "px"
            }))
        }).on(B ? "touchmove" : "mousemove", function (a) {
            ("started" == E || "turning" == E) && d(a)
        }).on(B ? "touchend" : "mouseup mouseleave", function (a) {
            return Z = !1, b(".z-current").get(0) ? 0 == s ? (x = !0, void(E = "feeling")) : void("turning" == E && e(a)) : void 0
        })
    };
    var $ = !1;
    a.flipBookScroll = function (a) {
        Z = !0;
        for (var c, d = 0, e = W.list.length; e > d; d++) a == W.list[d].id && (c = W.list[d].num);
        c || (c = a), y = b(".z-current").get(0);
        var f = b(y).find(".m-img").attr("id").substring(4),
            g = b(y).parent(".flip-mask").siblings(".flip-mask").find(".main-page").find("#page" + c);
        g && (z = b(g).parent(".main-page").get(0), f > c ? j() : c > f && k())
    }, b(document).on("bookFlipPre", function (a) {
        j()
    }), b(document).on("bookFlipNext", function (a) {
        k()
    });
    var _
}(window, jQuery);
var eqxiu = function () {
    function a(a) {
        if ("10" != m._scrollMode) {
            B = !0;
            for (var d, e = 0, f = m._pageData.length; f > e; e++) a == m._pageData[e].id && (d = m._pageData[e].num);
            d || (d = a);
            var g = $(m.$currentPage).find(".m-img").attr("id").substring(4),
                h = $(m.$currentPage).siblings(".main-page").find("#page" + d);
            if (!h) return;
            m.$activePage = $(h).parent(".main-page").get(0), g > d ? b() : d > g && c()
        } else flipBookScroll(a)
    }

    function b(a) {
        if (!(v && 2 == a || w && 1 == a)) if ("10" != m._scrollMode) {
            var b = 0;
            n();
            var c = setInterval(function () {
                b += 2, "0" == m._scrollMode || "1" == m._scrollMode || "2" == m._scrollMode || "6" == m._scrollMode || "7" == m._scrollMode || "8" == m._scrollMode || "11" == m._scrollMode || "12" == m._scrollMode ? H = b : ("3" == m._scrollMode || "4" == m._scrollMode || "5" == m._scrollMode || "9" == m._scrollMode) && (G = b), o(), b >= 21 && (clearInterval(c), p())
            }, 1)
        } else $(document).trigger("bookFlipPre")
    }

    function c(a) {
        if (!(v && 2 == a || w && 1 == a)) if ("10" != m._scrollMode) {
            t = !1;
            var b = 0;
            n();
            var c = setInterval(function () {
                b -= 2, "0" == m._scrollMode || "1" == m._scrollMode || "2" == m._scrollMode || "6" == m._scrollMode || "7" == m._scrollMode || "8" == m._scrollMode || "11" == m._scrollMode || "12" == m._scrollMode ? H = b : ("3" == m._scrollMode || "4" == m._scrollMode || "5" == m._scrollMode || "9" == m._scrollMode) && (G = b), o(), -21 >= b && (clearInterval(c), p(), A || m.$activePage || clearInterval(y))
            }, 1)
        } else $(document).trigger("bookFlipNext")
    }

    function d() {
        y = setInterval(function () {
            "10" != m._scrollMode && c()
        }, u)
    }

    function e() {
        clearInterval(y)
    }

    function f() {
        m.$activePage = m._$pages.last().get(0), m._$pages.parent().find(".z-current").removeClass("z-current"), m._$pages.last().addClass("z-current")
    }

    function g(a) {
        a ? m._$pages.last().prev().remove() : m._$pages.last().remove()
    }

    function h(a) {
        m._scrollMode = a, q = a, _scrollMode = a
    }

    function i(a) {
        u = 1e3 * a, e(), d()
    }

    function j() {
        m._$pages = m._$app.find(".main-page")
    }

    function f(a) {
        m._$pages.parent().find(".z-current").removeClass("z-current"), a ? (m.$activePage = m._$pages.last().prev().get(0), m._$pages.last().prev().addClass("z-current")) : (m.$activePage = m._$pages.last().get(0), m._$pages.last().addClass("z-current"))
    }

    function k(a) {
        m._pageData = a
    }

    function l(a) {
        A = a
    }

    var m, n, o, p, q, r, s, t, u, v, w, x, y, z = $(window),
        A = !1,
        B = !1,
        C = mobilecheck(),
        D = tabletCheck(),
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = !1,
        J = !1,
        K = !0,
        L = 500,
        M = .4,
        N = function (a, b, c, e) {
            function f(a, b, c) {
                for (var d = ["", "webkit", "moz"], e = 0, f = d.length; f > e; e++) {
                    0 != e || mobilecheck() || (b = b.substring(0, 1).toLowerCase() + b.substring(1, b.length));
                    var g = c instanceof Array ? c[e] : c,
                        h = d[e] + b;
                    a[h] = g
                }
            }

            function g(a, b, c) {
                for (var d = ["", "-webkit-", "-moz-"], e = 0; e < d.length; e++) a.css(d[e] + b, c)
            }

            function h(a) {
                var b;
                return b = $("#inside_" + a, ".phone-view").length ? $("#inside_" + a, ".phone-view") : $("#inside_" + a)
            }

            function i() {
                m._isDisableFlipPage = !0;
                var a;
                "0" == b || "1" == b || "2" == b || "6" == b || "9" == b || "11" == b || "12" == b ? (a = H > 0 ? -s : s, g($(m.$activePage), "transform", "translateY(" + a + "px)"), g($(m.$currentPage), "transform", "translateY(0) scale(1)")) : ("3" == b || "5" == b) && (a = G > 0 ? -r : r, g($(m.$activePage), "transform", "translateX(" + a + "px)"), g($(m.$currentPage), "transform", "translateX(0) scale(1)")), setTimeout(function () {
                    $(m.$currentPage).attr("style", ""), $(m.$activePage).attr("style", ""), $(m.$activePage).removeClass("z-active z-move"), m._isDisableFlipPage = !1
                }, 500)
            }

            function j() {
                if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) if (H > 0) {
                    if (m._isDisableFlipPrevPage) return;
                    J || K ? (J = !1, K = !1, Z(!0), _(!0, "bottom center", "translateY", s)) : aa(!0, "translateY", s, H, m._scrollMode)
                } else if (0 > H) {
                    if (m._isDisableFlipNextPage) return;
                    !J || K ? (J = !0, K = !1, Z(!1), _(!1, "top center", "translateY", s)) : aa(!1, "translateY", s, H, m._scrollMode)
                }
            }

            function k() {
                Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (ba("translateY", H, s, m._scrollMode), $(document).trigger("flipend")) : (m._isDisableFlipPage = !1, i())
            }

            function l() {
                if (Math.abs(G) > Math.abs(H) && completeEffect($(m.$currentPage))) if (G > 0) {
                    if (m._isDisableFlipPrevPage) return;
                    J || K ? (J = !1, K = !1, Z(!0), _(!0, "center right", "translateX", r)) : aa(!0, "translateX", r, G, m._scrollMode);
                } else if (0 > G) {
                    if (m._isDisableFlipNextPage) return;
                    !J || K ? (J = !0, K = !1, Z(!1), _(!1, "center left", "translateX", r)) : aa(!1, "translateX", r, G, m._scrollMode)
                }
            }

            function q() {
                Math.abs(G) > Math.abs(H) && Math.abs(G) > 20 ? (ba("translateX", G, r, m._scrollMode), $(document).trigger("flipend")) : (m._isDisableFlipPage = !1, i())
            }

            function t() {
                if (Math.abs(G) > Math.abs(H) && completeEffect($(m.$currentPage))) if (G > 0) {
                    if (m._isDisableFlipPrevPage) return;
                    J || K ? (J = !1, K = !1, Z(!0), r = C ? window.innerWidth : $(".nr").width(), _(!0, "", "translateX", r)) : aa(!0, "translateX", r, G, m._scrollMode)
                } else if (0 > G) {
                    if (m._isDisableFlipNextPage) return;
                    !J || K ? (J = !0, K = !1, Z(!1), r = C ? window.innerWidth : $(".nr").width(), _(!1, "", "translateX", r)) : aa(!1, "translateX", r, G, m._scrollMode)
                }
            }

            function y() {
                Math.abs(G) > Math.abs(H) && Math.abs(G) > 20 ? (ba("translateX", G, r, m._scrollMode), $(document).trigger("flipend")) : (m._isDisableFlipPage = !1, i())
            }

            function N() {
                if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) if (H > 0) {
                    if (m._isDisableFlipPrevPage) return;
                    J || K ? (J = !1, K = !1, Z(!0), s = C ? window.innerHeight : $(".nr").height(), _(!0, "", "translateY", s)) : aa(!0, "translateY", s, H, m._scrollMode)
                } else if (0 > H) {
                    if (m._isDisableFlipNextPage) return;
                    !J || K ? (J = !0, K = !1, Z(!1), s = C ? window.innerHeight : $(".nr").height(), _(!1, "", "translateY", s)) : aa(!1, "translateY", s, H, m._scrollMode)
                }
            }

            function O() {
                Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (ba("translateY", H, s, m._scrollMode), $(document).trigger("flipend")) : (m._isDisableFlipPage = !1, i())
            }

            function P() {
                if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) if (H > 0) {
                    if (m._isDisableFlipNextPage) return;
                    (!J || K) && (J = !0, K = !1, m.$activePage && $(m.$activePage).removeClass("z-move z-active"), Z(!0), f(m.$activePage.style, "Transform", "rotateX(90deg) translateY(-" + s / 2 + "px) translateZ(" + s / 2 + "px)"), f(ca.get(0).style, "Perspective", "700px"), f(ca.get(0).style, "TransformStyle", "preserve-3d")), m.$activePage && m.$activePage.classList.contains("main-page") && ($(m.$activePage).addClass("z-active z-move").trigger("active").css("zIndex", 1), f(m.$currentPage.style, "Transform", "rotateX(-" + H / s * 90 + "deg) translateY(" + H / 2 + "px) translateZ(" + H / 2 + "px)"), f(m.$activePage.style, "Transform", "rotateX(" + (90 - H / s * 90) + "deg) translateY(" + (-(s / 2) + H / 2) + "px) translateZ(" + (s / 2 - H / 2) + "px)"))
                } else if (0 > H) {
                    if (m._isDisableFlipNextPage) return;
                    (!J || K) && (J = !0, K = !1, m.$activePage && $(m.$activePage).removeClass("z-move z-active"), Z(!1), f(m.$activePage.style, "Transform", "rotateX(-90deg) translateY(-" + s / 2 + "px) translateZ(-" + s / 2 + "px)"), f(ca.get(0).style, "Perspective", "700px"), f(ca.get(0).style, "TransformStyle", "preserve-3d")), m.$activePage && m.$activePage.classList.contains("main-page") ? ($(m.$activePage).addClass("z-active z-move").trigger("active").css("zIndex", 0), f(m.$currentPage.style, "Transform", "rotateX(" + -H / s * 90 + "deg) translateY(" + H / 2 + "px) translateZ(" + -H / 2 + "px)"), f(m.$activePage.style, "Transform", "rotateX(" + (-90 - H / s * 90) + "deg) translateY(" + (s / 2 + H / 2) + "px) translateZ(" + (s / 2 + H / 2) + "px)")) : (f(m.$currentPage.style, "Transform", "translateX(0px) scale(1)"), m.$activePage = null)
                }
            }

            function Q() {
                Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (H > 0 ? f(m.$currentPage.style, "Transform", "rotateX(-90deg) translateY(" + s / 2 + "px) translateZ(" + s / 2 + "px)") : f(m.$currentPage.style, "Transform", "rotateX(90deg) translateY(-" + s / 2 + "px) translateZ(" + s / 2 + "px)"), f(m.$currentPage.style, "zIndex", "0"), f(m.$activePage.style, "Transform", "rotateX(0deg) translateY(0px) translateZ(0px)"), f(m.$activePage.style, "zIndex", "2"), $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
            }

            function R() {
                if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) if (H > 0) {
                    if (m._isDisableFlipNextPage) return;
                    (!J || K) && (J = !0, K = !1, m.$activePage && $(m.$activePage).removeClass("z-move z-active"), Z(!0), g(ca, "perspective", "700px"), g(ca, "transform-style", "preserve-3d"), f(m.$activePage.style, "TransformOrigin", "top"), f(m.$activePage.style, "Transform", "rotateX(90deg)")), m.$activePage && m.$activePage.classList.contains("main-page") && ($(m.$activePage).addClass("z-active z-move").trigger("active"), f(m.$activePage.style, "Transform", "rotateX(" + (90 - H / s * 90) + "deg) "))
                } else if (0 > H) {
                    if (m._isDisableFlipNextPage) return;
                    (!J || K) && (J = !0, K = !1, m.$activePage && $(m.$activePage).removeClass("z-move z-active"), Z(!1), f(m.$activePage.style, "TransformOrigin", "bottom"), f(m.$activePage.style, "Transform", "rotateX(-90deg)"), g(ca, "perspective", "700px"), g(ca, "transform-style", "preserve-3d")), m.$activePage && m.$activePage.classList.contains("main-page") ? ($(m.$activePage).addClass("z-active z-move").trigger("active"), f(m.$activePage.style, "Transform", "rotateX(" + (-90 - H / s * 90) + "deg) ")) : (f(m.$currentPage.style, "Transform", "translateX(0px) scale(1)"), m.$activePage = null)
                }
            }

            function S() {
                Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (H > 0 ? f(m.$activePage.style, "Transform", "rotateX(0deg)") : f(m.$activePage.style, "Transform", "rotateX(0deg)"), $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
            }

            function T() {
                if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) {
                    if (H > 0) {
                        if (m._isDisableFlipPrevPage) return;
                        (J || K) && (J = !1, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!0), m.$activePage.style.zIndex = 2, m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move")), m.$activePage.style.opacity = 0)
                    } else if (0 > H) {
                        if (m._isDisableFlipNextPage) return;
                        (!J || K) && (J = !0, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!1), m.$activePage.style.zIndex = 2, m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move")), m.$activePage.style.opacity = 0)
                    }
                    var a = Math.abs(H) / s * 1.3;
                    m.$activePage.style.opacity = a.toFixed(1), a.toFixed(3) <= 1 && g($(m.$activePage), "transform", "scale(" + a.toFixed(3) + ")")
                }
            }

            function U() {
                Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (g($(m.$activePage), "transform", "scale(1)"), m.$activePage.style.opacity = 1, $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
            }

            function V() {
                if (Math.abs(G) > Math.abs(H) && completeEffect($(m.$currentPage))) if (G > 0) {
                    if (m._isDisableFlipPrevPage) return;
                    J || K ? (J = !1, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!0), m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move"), g($(m.$activePage), "Transform", "scale(0.3) translateX(0) translateZ(-" + s + "px) rotateY(45deg)"), m.$activePage.style.zIndex = "0"), g(ca, "perspective", "1000px"), m.$currentPage.style.zIndex = "100") : m.$activePage && (r / 4 >= G ? g($(m.$currentPage), "Transform", "translateX(" + G + "px)") : g($(m.$currentPage), "Transform", "translateX(" + 1.5 * G + "px) scale(" + ((5 * r / 4 - G) / r).toFixed(3) + ") rotateY(" + G / r * 45 + "deg) translateZ(-" + (G - r / 4) + "px)"))
                } else if (0 > G) {
                    if (m._isDisableFlipNextPage) return;
                    !J || K ? (J = !0, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!1), m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move"), g($(m.$activePage), "Transform", "scale(0.3) translateX(" + (r + 300) + "px) translateZ(-" + s + "px) rotateY(-45deg)"), m.$activePage.style.zIndex = "0"), g(ca, "perspective", "1000px"), m.$currentPage.style.zIndex = "100") : m.$activePage && (G >= -r / 4 ? g($(m.$currentPage), "Transform", "translateX(" + G + "px)") : g($(m.$currentPage), "Transform", "translateX(" + 1.5 * G + "px) scale(" + ((5 * r / 4 + G) / r).toFixed(3) + ") rotateY(" + G / r * 45 + "deg) translateZ(" + (G + r / 4) + "px)"), g($(m.$activePage), "Transform", "scale(" + (.3 - (G + r / 4) / r).toFixed(3) + ") translateX(" + (-G - r / 4 + 200) + "px) translateZ(" + (-G - 3 * r / 4) + "px) rotateY(-" + (45 + (G + r / 4) / r * 45) + "deg)"))
                }
            }

            function W() {
                Math.abs(G) > Math.abs(H) && Math.abs(G) > 20 ? (G > 0 ? (m.$currentPage.style.webkitTransformOrigin = "left", m.$currentPage.style.webkitTransform = "translateX(0) translateZ(-" + s + "px) rotateY(0) scale(0.2)", m.$activePage.style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)", m.$currentPage.style.zIndex = "0", m.$activePage.style.zIndex = "1") : (m.$currentPage.style.webkitTransformOrigin = "right", m.$currentPage.style.webkitTransform = "translateX(" + r + "px) translateZ(-" + s + "px) rotateY(0) scale(0.2)", m.$activePage.style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)", m.$activePage.style.zIndex = "1", m.$currentPage.style.zIndex = "0"), $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
            }

            function X() {
                if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) {
                    if (H > 0) {
                        if (m._isDisableFlipPrevPage) return;
                        (J || K) && (J = !1, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!0), m.$activePage && m.$activePage.classList.contains("main-page") && ($(m.$activePage).addClass("z-active z-move"), $(m.$activePage).css({
                            zIndex: 0,
                            opacity: 1
                        })), $(m.$currentPage).css({
                            opacity: 1
                        }), $(m.$activePage).css({
                            zIndex: 0,
                            opacity: 1
                        }), g($(m.$activePage), "transform", "translateY(0)"), g($(m.$currentPage), "transform-origin", "0% 0% 0px"))
                    } else if (0 > H) {
                        if (m._isDisableFlipNextPage) return;
                        (!J || K) && (J = !0, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!1), m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move"), $(m.$activePage).css({
                            zIndex: 0,
                            opacity: 1
                        })), $(m.$currentPage).css({
                            opacity: 1
                        }), $(m.$activePage).css({
                            zIndex: 0,
                            opacity: 1
                        }), g($(m.$activePage), "transform", "translateY(0)"), g($(m.$currentPage), "transform-origin", "0% 0% 0px"))
                    }
                    m.$activePage && (g($(m.$currentPage), "transform-origin", "0% 0% 0px"), g($(m.$currentPage), "transform", "rotate(" + Math.abs(H) / s * 90 + "deg)"), m.$currentPage.style.opacity = ((s - Math.abs(H)) / s).toFixed(1))
                }
            }

            function Y() {
                Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (g($(m.$currentPage), "transform", "translateY(" + s + "px) rotate(" + Math.abs(H) / s * 90 + "deg)"), $(m.$currentPage).css({
                    opacity: .5
                }), $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
            }

            function Z(a) {
                B || (a ? m.$currentPage.previousElementSibling && m.$currentPage.previousElementSibling.classList.contains("main-page") ? m.$activePage = m.$currentPage.previousElementSibling : A ? m.$activePage = m._$pages.last().get(0) : m.$activePage = !1 : m.$currentPage.nextElementSibling && m.$currentPage.nextElementSibling.classList.contains("main-page") ? m.$activePage = m.$currentPage.nextElementSibling : A ? m.$activePage = m._$pages.first().get(0) : m.$activePage = !1)
            }

            function _(a, b, c, d) {
                if (m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), m.$activePage && m.$activePage.classList.contains("main-page")) {
                    m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move");
                    var e = a ? "-" : "";
                    m.$activePage.style.webkitTransition = "none", m.$activePage.style.webkitTransform = c + "(" + e + d + "px)", m.$activePage.style.mozTransition = "none", m.$activePage.style.mozTransform = c + "(" + e + d + "px)", m.$activePage.style.transition = "none", m.$activePage.style.transform = c + "(" + e + d + "px)", $(m.$activePage).trigger("active"), b && g($(m.$currentPage), "transform-origin", b)
                } else f(m.$currentPage.style, "Transform", c + "(0px) scale(1)")
            }

            function aa(a, b, c, d, e) {
                if (m.$activePage) {
                    var f = a ? "-" : "";
                    g($(m.$activePage), "transform", b + "(" + f + (c - Math.abs(d)) + "px)"), "1" == e || "3" == e ? g($(m.$currentPage), "transform", "scale(" + ((c - Math.abs(d)) / s).toFixed(3) + ")") : ("5" == e || "11" == e) && g($(m.$currentPage), "transform", b + "(" + d + "px)")
                }
            }

            function ba(a, b, c, d) {
                if ("1" == d || "3" == d) g($(m.$currentPage), "transform", "scale(0.2)");
                else if ("5" == d || "11" == d) {
                    var e = b > 0 ? "" : "-";
                    g($(m.$currentPage), "transform", a + "(" + e + c + "px)")
                } else g($(m.$currentPage), "transform", "scale(1)");
                g($(m.$activePage), "transform", a + "(0px)")
                var nowPage = m.$activePage.firstElementChild.getAttribute('id');
                console.log(nowPage);
                //到达最后一页
                if (nowPage === ('page' + tplCount)) {
                    doQuit("completed");
                    console.log('SCORM标准完毕');
                }

                //修改开始

                var pageNum = parseInt(nowPage.substr(4));

                if (pageNum == 1) {
                    pageMusics[0] ? aud.setAttribute('src', pageMusics[0].url) : aud.setAttribute('src', "");
                } else {
                    pageMusics[pageNum] ? aud.setAttribute('src', pageMusics[pageNum].url) : aud.setAttribute('src', "");
                }

                //修改结束

            }

            this._$app = a, this._$pages = this._$app.find(".main-page"), this.$currentPage = this._$pages.eq(0), this.$activePage = null, this._isInitComplete = !1, this._isDisableFlipPage = !1, this._isDisableFlipPrevPage = !1, this._isDisableFlipNextPage = !1, this._scrollMode = b, this._pageData = c, this.pageData = e, b = b, m = this, r = C || D ? window.innerWidth : a.width(), s = C || D ? window.innerHeight : a.height();
            var ca = $("#con"),
                da = !1;
            if (("8" == b || "9" == b) && (M = .7, L = 800), 0 == b || 1 == b || 2 == b || 6 == b || 7 == b || 8 == b || 11 == b || 12 == b ? w = !0 : (3 == b || 4 == b || 5 == b || 10 == b) && (v = !0), w ? (x = $(".ctrl_panel_dir .ctrl-down"), $nextCtrl = $(".ctrl_panel_dir .ctrl-up")) : v && (x = $(".ctrl_panel_dir .ctrl-right"), $nextCtrl = $(".ctrl_panel_dir .ctrl-left")), e.obj.property.hasOwnProperty("triggerLoop") || (e.obj.property.triggerLoop = !0), A = e.obj.property.triggerLoop, e.obj.property.autoFlip && (u = 1e3 * e.obj.property.autoFlipTime, d()), c[0].elements && c[0].elements.length) for (var ea = 0; ea < c[0].elements.length; ea++) {
                eqShow.shakeTrigger(c, m.$currentPage);
                var fa = h(c[0].elements[ea].id);
                eqxCommon.bindTrigger(fa, c[0].elements[ea])
            }
            !
                function () {
                    z.on("scroll.elasticity", function (a) {
                        a.preventDefault()
                    }).on("touchmove.elasticity", function (a) {
                        a.preventDefault()
                    }), z.delegate("img", "mousemove", function (a) {
                        a.preventDefault()
                    })
                }(), "10" != b ? m._$app.on("mousedown touchstart", function (a) {
                n(a)
            }).on("mousemove touchmove", function (a) {
                o(a)
            }).on("mouseup touchend mouseleave", function (a) {
                p(a)
            }) : turnBook(e), n = function (a) {
                da = !1, C && a && (a = event), m._isDisableFlipPage || (m.$currentPage = m._$pages.filter(".z-current").get(0), B || (m.$activePage = null), m.$currentPage && completeEffect($(m.$currentPage)) && (I = !0, J = !1, K = !0, G = 0, H = 0, a && "mousedown" == a.type ? (E = a.pageX, F = a.pageY) : a && "touchstart" == a.type && (E = a.touches ? a.touches[0].pageX : a.originalEvent.touches[0].pageX, F = a.touches ? a.touches[0].pageY : a.originalEvent.touches[0].pageY), m.$currentPage.classList.add("z-move"), f(m.$currentPage.style, "Transition", "none"), "12" == m._scrollMode && (m.$currentPage.style.zIndex = 3)))
            }, o = function (a) {
                if (C && a && (a = event), I && m._$pages.length > 1) {
                    if (a && "mousemove" == a.type ? (G = a.pageX - E, H = a.pageY - F) : a && "touchmove" == a.type && (G = (a.touches ? a.touches[0].pageX : a.originalEvent.touches[0].pageX) - E, H = (a.touches ? a.touches[0].pageY : a.originalEvent.touches[0].pageY) - F), !da && (Math.abs(G) > 20 || Math.abs(H) > 20)) {
                        if (m.$activePage) {
                            var b = $(m.$activePage).find(".m-img").attr("id").substring(4);
                            $(m.$activePage).find("li").each(function (a) {
                                for (var c = 0; c < m._pageData[b - 1].elements.length; c++) if (m._pageData[b - 1].elements[c].id == parseInt($(this).attr("id").substring(7), 10)) {
                                    eqxCommon.animation($(this), m._pageData[b - 1].elements[c], "view");
                                    var d = h(m._pageData[b - 1].elements[c].id);
                                    eqxCommon.bindTrigger(d, m._pageData[b - 1].elements[c])
                                }
                            })
                        }
                        da = !0
                    }
                    "0" == m._scrollMode || "2" == m._scrollMode || "1" == m._scrollMode ? j() : "4" == m._scrollMode || "3" == m._scrollMode ? l() : "5" == m._scrollMode ? t() : "6" == m._scrollMode ? P() : "7" == m._scrollMode ? R() : "8" == m._scrollMode ? T() : "9" == m._scrollMode ? V() : "11" == m._scrollMode ? N() : "12" == m._scrollMode && X()
                }
            }, p = function (a) {
                if (I && completeEffect($(m.$currentPage))) if (I = !1, m.$activePage) {
                    m._isDisableFlipPage = !0;
                    var b;
                    b = "6" == m._scrollMode || "7" == m._scrollMode ? "cubic-bezier(0,0,0.99,1)" : "12" == m._scrollMode ? "cubic-bezier(.17,.67,.87,.13)" : "linear", m.$currentPage.style.webkitTransition = "-webkit-transform " + M + "s " + b, m.$activePage.style.webkitTransition = "-webkit-transform " + M + "s " + b, m.$currentPage.style.mozTransition = "-moz-transform " + M + "s " + b, m.$activePage.style.mozTransition = "-moz-transform " + M + "s " + b, m.$currentPage.style.transition = "transform " + M + "s " + b, m.$activePage.style.transition = "transform " + M + "s " + b, "0" == m._scrollMode || "2" == m._scrollMode || "1" == m._scrollMode ? k() : "4" == m._scrollMode || "3" == m._scrollMode ? q() : "5" == m._scrollMode ? y() : "6" == m._scrollMode ? Q() : "7" == m._scrollMode ? S() : "8" == m._scrollMode ? U() : "9" == m._scrollMode ? W() : "11" == m._scrollMode ? O() : "12" == m._scrollMode && Y()
                } else m.$currentPage.classList.remove("z-move");
                B = !1
            }, $(document).on("flipend", function (a) {
                completeEffect($(m.$activePage)) || $("#audio_btn").css("opacity", 0);
                var d = $("#report0"),
                    g = $(m.$activePage).find(".m-img").attr("id").substring(4);
                c = m._pageData, c[g - 1].elements && c[g - 1].elements.length && $.each(c[g - 1].elements, function (a, b) {
                    "d" == b.type && eqShow.getShowCount(e.obj.id).then(function (a) {
                        var c = eqShow.fixedNum(a);
                        $("#" + b.id).find(".counter-number").text(c)
                    })
                }), setTimeout(function () {
                    f(m.$currentPage.style, "Transition", "none"), $(m.$activePage).removeClass("z-active z-move").addClass("z-current"), $(m.$currentPage).removeClass("z-current z-move"), m._isDisableFlipPage = !1, m.$currentPage = $(m.$activePage).trigger("current"), $(m.$currentPage).trigger("hide"), utilSound.pause(), d.length && d.remove(), ("8" == b || "9" == b || "12" == b) && ($(m.$currentPage).css("z-index", "1"), $(".main-page").attr("style", "")), eqShow.shakeTrigger(c, m.$currentPage), A || (1 == g ? x.removeClass("enabled") : g == m._pageData.length ? $nextCtrl.removeClass("enabled") : (x.addClass("enabled"), $nextCtrl.addClass("enabled")))
                }, L)
            }), $(document).on("startAutoFlip", function (a) {
                e.obj.property.autoFlip && d()
            }), eqShow.showProgressBar(e, m._$pages, a)
        };
    return {
        pageScroll: a,
        nextPage: c,
        prePage: b,
        lastPage: f,
        app: N,
        pauseAutoFlip: e,
        removeLastPage: g,
        changeScrollMode: h,
        startAutoFlip: i,
        changeAppPage: j,
        setTriggerLoop: l,
        setPageData: k
    }
}();
!
    function (a, b) {
        function c(a, c) {
            if (!b("#report0").length) {
                var e = [];
                e[0] = '', b(e[0]).appendTo("#page" + a), b(e[1]).appendTo("#report0");
                for (var f = 2; 4 >= f; f++) b(e[f]).appendTo("#report1");
                d(c)
            }
        }

        function d(a) {
            if (g.length) return void e(g, a);
            var c = PREFIX_URL + "base/class/expose_types";
            b.ajax({
                type: "GET",
                url: c,
                xhrFields: {
                    withCredentials: !0
                },
                crossDomain: !0
            }).then(function (b) {
                if (b.success) {
                    g = b.list, e(g, a)
                }
            })
        }

        function e(a, c) {
            for (var d, e = 0, g = a.length; g > e; e++) {
                var h = '<li value="' + a[e].value + '"><span>' + a[e].name + "</span></li>";
                b(h).appendTo("#reportList")
            }
            var i = b("#reportList").find("li").eq(0);
            i.addClass("active"), d = i.val(), b("#reportList").find("li").click(function (a) {
                b(this).siblings().removeClass("active"), b(this).addClass("active"), d = b(this).val()
            }), b("#reportSubmit").click(function (a) {
                f(c, d)
            }), b("#report0").parent(".m-img").click(function (a) {
                b("#report0").remove()
            }), b("#report0").click(function (a) {
                a.stopPropagation()
            })
        }

        function f(a, c) {
            var d = PREFIX_URL + "eqs/expose",
                e = {
                    sceneId: a,
                    type: c
                };
            b.ajax({
                type: "POST",
                url: d,
                data: b.param(e),
                xhrFields: {
                    withCredentials: !0
                },
                crossDomain: !0
            }).then(function (a) {
                a.success && (b("#report0").remove(), alert("举报成功！"))
            }, function (a) {
                b("#report0").remove()
            })
        }

        a.addReport = function (a, d) {
            var e = '<li comp-drag="" comp-rotate="" class="comp-resize comp-rotate inside wsite-text" id="inside_439881" num="1" ctype="2" comp-resize="" style="width: 320px; height: 36px; left: -250px; top: 420px; z-index: 999;"><div class="element-box" style="height: 100%; z-index: 3; width: 100%; left: 0px; top: 420px; transform: none;-webkit-animation: fadeIn 3s ease 1s both;-webkit-animation-play-state: initial;\\"><div class="element-box-contents" style="width: 100%; height: 100%;"><div id="439881" ctype="2" class="element comp_paragraph editable-text" style="cursor: default; width: 320px; height: 36px;"></div></div></div></li>',
                f = b("#page" + a).find(".edit_wrapper").find("ul");
            b(e).appendTo(f).click(function (b) {
                b.stopPropagation(), c(a, d)
            })
        };
        var g = []
    }(window, jQuery), function (window, $) {
    function appendActivityPage(a, b) {
        a.obj.property.activityPageId && (activityPagePromise = $.ajax({
            type: "GET",
            url: PREFIX_S2_URL + "?c=scene&a=getlastpagebg&id=" + a.obj.property.activityPageId,
            crossDomain: !0,
            success: function (a) {
                a.obj && b.push(a.obj)
            }
        }))
    }

    function internationalLastPage(a, b, c) {
        var d = '{"id":"","sceneId":"","num":2,"name":null,"properties":null,"elements":[{"id":439880,"pageId":129810,"sceneId":16060,"num":0,"type":"3","isInput":0,"title":null,"content":null,"status":1,"css":{},"properties":{"bgColor":"#E6E9EE"}},{"id":439881,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><span style=\\"line-height: 1; background-color: initial;\\"><font size=\\"4\\" color=\\"#888888\\"><b>场景名称</b></font></span></div>","status":1,"css":{"height":"65","zIndex":"10","width":"320","left":"0px","top":"77px"},"properties":{}},{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}},{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"height":"16","zIndex":"11","width":"280","left":"21px","top":"122px"},"properties":{"height":"100px","imgStyle":{"width":280,"height":73,"marginTop":"-24px","marginLeft":"0px"},"width":"100px","src":"' + CLIENT_CDN + 'view/images/line.png"}},';
        return 100 == a.obj.bizType && isMobile && (d += '{"id":439884,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div id=\\"eqx-share-container\\" style=\\"text-align: center;padding-top: 0;\\"></div>","status":1,"css":{"height":"45","zIndex":"11","width":"280","left":"21px","top":"360px","text-align": "center"},"properties":{"anim":[{"type":20,"direction":0,"duration":"1","delay":"1","countNum":"1"}]}},'), d += '{"id":439885,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;padding-top: 0;\\"><span style=\\"font-size: small; line-height: 1; background-color: initial;\\"><a href=\\"' + PREFIX_S1_URL + "eqs/link?id=16060&amp;url=" + encodeURIComponent(redirectUrl) + '\\" target=\\"_blank\\"><img style=\\"width: 140px;\\" src=\\"' + CLIENT_CDN + 'assets/images/available-on-the-app-store.png\\"></a></span></div>","status":1,"css":{"borderRadius":"0px","borderStyle":"solid","height":"50","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"12","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"1px","paddingBottom":"20px","top":"410px"},"properties":{"anim":{"type":1,"direction":3,"duration":"1","delay":"0.6"}}}]}'
    }

    function eqFreepage(a, b, c) {
        function d(a, b, c) {
            activityPagePromise ? activityPagePromise.done(function () {
                c.list.push(a), parsePage(b, c)
            }).fail(function () {
                c.list.push(a), parsePage(b, c)
            }) : (c.list.push(a), parsePage(b, c))
        }

        var e = '{"id":"","sceneId":"","num":2,"name":null,"properties":null,"elements":[{"id":439880,"pageId":129810,"sceneId":16060,"num":0,"type":"3","isInput":0,"title":null,"content":null,"status":1,"css":{},"properties":{"bgColor":"#E6E9EE"}},{"id":439881,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><span style=\\"line-height: 1; background-color: initial;\\"><font size=\\"4\\" color=\\"#888888\\"><b>场景名称</b></font></span></div>","status":1,"css":{"height":"65","zIndex":"10","width":"320","left":"0px","top":"77px"},"properties":{}},{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}},{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"height":"16","zIndex":"11","width":"280","left":"21px","top":"122px"},"properties":{"height":"100px","imgStyle":{"width":280,"height":73,"marginTop":"-24px","marginLeft":"0px"},"width":"100px","src":"' + CLIENT_CDN + 'view/images/line.png"}},{"id":439885,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div id=\\"linkad\\" style=\\"text-align: center;padding-top: 0;\\"><span style=\\"font-size: small; line-height: 1; background-color: initial;\\"><a href=\\"' + PREFIX_S1_URL + "index.php?c=scene&a=link&id=16060&amp;url=" + encodeURIComponent(lastpagelink) + '\\" target=\\"_blank\\"><font color=\\"#888888\\">免费创建一个场景？→</font><font color=\\"#23a3d3\\">' + lastpagetext + '</font></a></span></div>","status":1,"css":{"borderRadius":"0px","borderStyle":"solid","height":"30","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"12","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"1px","paddingBottom":"20px","top":"420px"},"properties":{"anim":{"type":1,"direction":3,"duration":"1","delay":"0.6"}}}]}';
        100 == a.obj.bizType && (e = internationalLastPage(a, b, c));
        var f = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}}',
            g = '{"id":81395,"pageId":"","sceneId":"","num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"%","borderStyle":"solid","height":"158","zIndex":"1000","paddingTop":"0px","borderColor":"rgba(0,0,0,1)","boxShadow":"0 0px 0px #333333","color":"#000000","backgroundColor":"white","borderWidth":"0px","width":"158","left":"84px","paddingTop":"11px","paddingLeft":"10px","top":"170px"},"properties":{"height":"100px","imgStyle":{"width":139,"height":136,"marginTop":"0px","marginLeft":"0px"},"width":"100px","src":"group1/M00/01/30/yq0JCFQpOR-AOULFAAFBPO1yzBQ984.jpg"}}',
            h = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"bottom-logo\\" style=\\"text-align: center;cursor:pointer;height:136px;width:139px;\\"><em style=\\"color:white;line-height:136px;font-size:120px;\\" class=\\"eqf-eqxiu\\"></em></div>","status":1,"css":{"height":"158","width":"158","left":"84px","top":"170px","backgroundColor":"white"},"properties":{}}',
            i = '{"id":81465,"pageId":"","sceneId":"","num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><font color=\\"#ffffff\\" size=\\"3\\">击此处进行编辑</font></div>","status":1,"css":{"zIndex":"102","height":"65","width":"320","left":"0px","top":"70px"},"properties":{}}',
            j = '{"id":2557867,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"logo-shadow1\\" style=\\"text-align: center;cursor:pointer;height:127px;width:220px;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);position:absolute;left:20px;top:56px;\\"></div>","status":1,"css":{"height":"257","width":"257","left":"78px","top":"175px"},"properties":{}}',
            k = '{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"width:280px;height:1px;background-color:rgba(60,60,60,0.4);cursor:pointer;position:absolute;left:0;-webkit-filter:drop-shadow(0px 1px 0px rgba(60,60,60,0.4));top:12px;\\"></div>","status":1,"css":{"height":"24","width":"280","left":"21px","top":"122px"},"properties":{}}';
        if (ad = 1, a.obj.property.lastPageId) customLastPage = !0, $.ajax({
            type: "GET",
            url: PREFIX_S2_URL + "?c=scene&a=getlastpagebg&id=" + a.obj.property.lastPageId,
            crossDomain: !0,
            success: function (c) {
                if (!c.obj) {
                    e = e.replace(/id=16060/, "id=" + a.obj.id);
                    var f = JSON.parse(e);
                    return f.num = a.list.length + 1, f.elements[2].properties.src = a.obj.cover, f.elements[1].content = f.elements[1].content.replace(/场景名称/, a.obj.name), f.elements[1].properties.height = 65, f.elements[1].height = 65, void d(f, b, a)
                }
                c.obj.sceneId = a.obj.id;
                for (var l, m = 0; m < c.obj.elements.length; m++)"4" != c.obj.elements[m].type || "group1/M00/A5/5E/yq0KA1QmePmAKr7yAAEByp5jyLc752.jpg" != c.obj.elements[m].properties.src && "group1/M00/C5/9D/yq0KA1SH1zuAFgkLAAAFgBR8hJs456.png" != c.obj.elements[m].properties.src && "group1/M00/C5/3F/yq0KA1SHp-2AQZZZAAB-7rIaK6I743.png" != c.obj.elements[m].properties.src && "group1/M00/C5/9D/yq0KA1SH1zuAeQuFAAAFfUkeXDc110.png" != c.obj.elements[m].properties.src || (c.obj.elements.splice(m, 1), m--);
                "group1/M00/61/8A/yq0KA1T2vYSAEgo7AACovQVgHxk048.jpg" != a.obj.cover ? (l = JSON.parse(g), l.properties.src = a.obj.cover) : l = JSON.parse(h), c.obj.elements.push(l), c.obj.elements.push(JSON.parse(j)), c.obj.elements.push(JSON.parse(k));
                var n = JSON.parse(i);
                n.content = n.content.replace(/击此处进行编辑/, a.obj.name), c.obj.elements.push(n);
                for (var m = 0; m < c.obj.elements.length; m++)"2" == c.obj.elements[m].type && /http:\/\/service.eqxiu.com\/eqs\/link/.test(c.obj.elements[m].content) && (c.obj.elements[m].content = c.obj.elements[m].content.replace(/;url=.*com"/, ";url=" + encodeURIComponent(redirectUrl) + '"'));
                d(c.obj, b, a)
            }
        });
        else {
            e = e.replace(/id=16060/, "id=" + a.obj.id);
            var l = JSON.parse(e);
            l.num = a.list.length + 1, "group1/M00/61/8A/yq0KA1T2vYSAEgo7AACovQVgHxk048.jpg" != a.obj.cover && (l.elements[2] = JSON.parse(f), l.elements[2].properties.src = a.obj.cover), l.elements[1].content = l.elements[1].content.replace(/场景名称/, a.obj.name), d(l, b, a)
        }
    }

    function eqDefaultBottomLabel(a, b) {
        var c = '{"id":480292,"pageId":136042,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;transform: none;-webkit-animation: fadeIn 2s ease 1s both;-webkit-animation-play-state: initial;\\"><a href=\\"' + PREFIX_S1_URL + "eqs/link?id=16060&amp;url=" + encodeURIComponent(redirectUrl) + '\\" target=\\"_blank\\" style=\\"font-size: x-small;display:block;line-height: 10px;\\"><font color=\\"#ffffff\\">' + companyName + '</font></a></div>","status":1,"css":{"zIndex":"1000","height":"20","width":"129","left":"97px","top":"418px","backgroundColor":"rgba(0,0,0,0.6)","borderRadius":"20px"},"properties":{"anim":{"type":0,"direction":0,"duration":2,"delay":"0"}}}';
        ad = 2;
        var d;
        c = c.replace(/id=16060/, "id=" + a.obj.id), d = b[b.length - 1].elements, b[b.length - 1].elements || (d = b[b.length - 1].elements = []), d.push(JSON.parse(c)), parsePage(b, a)
    }

    function eqCustomBottomLabel(a, b) {
        ad = 2, $.ajax({
            type: "GET",
            url: PREFIX_S2_URL + "?c=scene&a=getlastpagebg&id=" + a.obj.property.bottomLabel.id,
            crossDomain: !0,
            success: function (c) {
                if (!c.obj) return void eqDefaultBottomLabel(a, b);
                var d = c.obj.elements,
                    e = 0;
                for (d.length; e < d.length; e++) {
                    var f = d[e];
                    if (f.sceneId = a.obj.id, f.pageId = b[b.length - 1].id, a.obj.property.bottomLabel.name && a.obj.property.bottomLabel.url && "http://" != a.obj.property.bottomLabel.url) 2 == f.type && f.content.indexOf("EQXIU.COM科技公司") > 0 && (f.content = f.content.replace(/EQXIU.COM科技公司/, '<a href="' + PREFIX_S1_URL + "eqs/link?id=" + a.obj.id + "&amp;url=" + encodeURIComponent(a.obj.property.bottomLabel.url) + '" target=_blank>' + a.obj.property.bottomLabel.name + "</a>"));
                    else if (a.obj.property.bottomLabel.name) 2 == f.type && f.content.indexOf("EQXIU.COM科技公司") > 0 && (f.content = f.content.replace(/EQXIU.COM科技公司/, a.obj.property.bottomLabel.name));
                    else if (/易企秀技术支持/.test(f.content)) {
                        f.content = '<div style="text-align: center;">' + f.content + "</div>";
                        var g = {
                            zIndex: "1000",
                            height: "33",
                            width: "129",
                            left: "97px"
                        };
                        $.extend(f.css, g)
                    } else 2 == f.type && f.content && (f.content = "");
                    f.css.zIndex = 200, a.list[a.list.length - 1].elements || (a.list[a.list.length - 1].elements = []), a.list[a.list.length - 1].elements.push(f), customLastPage = !0
                }
                parsePage(b, a)
            }
        })
    }

    function eqHideAll(a, b) {
        ad = 0, parsePage(b, a)
    }

    function parsePage(pages, data) {
        var nr = document.getElementById("audio_btn");
        var audio = document.createElement("audio");
        audio.id = "pageMusic";
        audio.setAttribute("autoplay", "");
        nr.appendChild(audio);
        window.pageMusics = [];
        aud = document.getElementById("pageMusic");
        for (var i = 0; i < data.obj.music_url.length; i++) {
            var music = data.obj.music_url[i];
            var pageNo = data.obj.music_url[i].num;
            if (pageNo == 1) {
                pageMusics[0] = music;
            } else {
                pageMusics[pageNo] = music;
            }
        }
        //console.log(pageMusics);
        pageMusics[0] ? aud.setAttribute('src', pageMusics[0].url) : aud.setAttribute('src', "");
        for (var pageInfo = [], init = !1, audioObj = {
            bgAudio: data.obj.bgAudio
        }, pageNum = 1; pageNum <= pages.length; pageNum++) if ($('<section class="main-page"><div class="m-img" id="page' + pageNum + '"></div></section>').appendTo(".nr"), 10 == pageMode && ($("#page" + pageNum).parent(".main-page").wrap('<div class="flip-mask" id="flip' + pageNum + '"></div>'), $(".main-page").css({
                width: $(".nr").width() + "px",
                height: $(".nr").height() + "px"
            })), pages.length > 1 && (0 == pageMode || 1 == pageMode || 2 == pageMode || 6 == pageMode || 7 == pageMode || 8 == pageMode || 11 == pageMode || 12 == pageMode ? $('<section class="u-arrow-bottom"><img src="' + CLIENT_CDN + 'view/images/btn01_arrow.png" /></section>').appendTo("#page" + pageNum) : (3 == pageMode || 4 == pageMode || 5 == pageMode || 9 == pageMode || 10 == pageMode) && $('<section class="u-arrow-right"><img src="' + CLIENT_CDN + 'view/images/btn01_arrow_right.png" /></section>').appendTo("#page" + pageNum)), 1 == pageNum && ($(".loading").hide(), $(".main-page").eq(0).addClass("z-current"), pages[pageNum - 1].elements && pages[pageNum - 1].elements.length && $.each(pages[pageNum - 1].elements, function (a, b) {
                "d" == b.type && eqShow.getShowCount(data.obj.id)
            })), pages[pageNum - 1].properties && !$.isEmptyObject(pages[pageNum - 1].properties) ? pages[pageNum - 1].properties.image || pages[pageNum - 1].properties.scratch ? scriptLoaded.scratch ? addScratchEffect(pages, pageNum) : !
                function (a) {
                    $.getScript(CLIENT_CDN + "view/js/scratch_effect.js", function (b, c, d) {
                        scriptLoaded.scratch = !0, addScratchEffect(audioObj, pages, a)
                    })
                }(pageNum) : pages[pageNum - 1].properties.finger ? (pageInfo.push({
                num: pageNum,
                finger: pages[pageNum - 1].properties.finger
            }), init || (init = !0, $.getScript(CLIENT_CDN + "view/js/lock_effect.js", function (a, b, c) {
                test(audioObj, pages, pageInfo, $(".m-img").width(), $(".m-img").height())
            }))) : pages[pageNum - 1].properties.fallingObject ? scriptLoaded.fallingObject ? fallingObject(pages, pageNum) : !
                function (a) {
                    $.getScript(CLIENT_CDN + "view/js/falling_object.js", function (b, c, d) {
                        scriptLoaded.fallingObject = !0, fallingObject(pages, a), 1 == a && playVideo(audioObj)
                    })
                }(pageNum) : pages[pageNum - 1].properties.effect ? !
                function (a) {
                    resources.load(window.eqx[pages[a - 1].properties.effect.name].config.resources), resources.onReady(function () {
                        window[pages[a - 1].properties.effect.name].doEffect(audioObj, a, pages, renderPage)
                    })
                }(pageNum) : renderPage(eqShow, pageNum, pages) : (renderPage(eqShow, pageNum, pages), 1 == pageNum && playVideo(audioObj)), pageNum == pages.length) {
            eqxiu.app($(".nr"), data.obj.pageMode, pages, data);
            if (isMobile || $("img").on("dragstart", function (a) {
                    a.preventDefault()
                }), !preview) {

            }
        }
        if (data.obj.createTime > 14165028e5) {
            if (100 != data.obj.bizType && !data.obj.property.hideEqAd && 1 == data.obj.property.eqAdType) return void addReport(pages.length, data.obj.id);
            100 == data.obj.bizType || data.obj.property.eqAdType || data.obj.property.hideEqAd || data.obj.property.isAdvancedUser || addReport(pages.length, data.obj.id)
        }
        if (100 == data.obj.bizType) {
            var $eqxShareContainer = $("#eqx-share-container");
            with ($eqxShareContainer.length && ($eqxShareContainer.append($('<div class="eqx-share">\n    <a class="eqx-share-btn btn-facebook"><span class="eqx-share-icon icon-facebook"></span></a>\n    <a class="eqx-share-btn btn-twitter"><span class="eqx-share-icon icon-twitter"></span></a>\n    <a class="eqx-share-btn btn-plus"><span class="eqx-share-icon icon-google_plus"></span></a>\n    <a class="eqx-share-btn btn-linkedin"><span class="eqx-share-icon icon-linkedin"></span></a>\n    <a class="eqx-share-btn btn-pinterest"><span class="eqx-share-icon icon-pinterest"></span></a>\n    <a class="addthis_sharing_toolbox"></a>\n</div>')), $(".eqx-share-btn").ShareLink({
                title: data.obj.name,
                text: data.obj.description,
                image: PREFIX_FILE_HOST + data.obj.cover,
                url: window.location.href.split("#")[0],
                class_prefix: "btn-"
            })), document) 0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-55c029461a7d08e5"]
        }
    }

    function addReportToLastPage(pages, data) {
        if (data.obj.createTime > 14165028e5) {
            if (100 != data.obj.bizType && !data.obj.property.hideEqAd && 1 == data.obj.property.eqAdType) return void addReport(pages.length, data.obj.id);
            100 == data.obj.bizType || data.obj.property.eqAdType || data.obj.property.hideEqAd || data.obj.property.isAdvancedUser || addReport(pages.length, data.obj.id)
        }
        if (100 == data.obj.bizType) {
            var $eqxShareContainer = $("#eqx-share-container");
            with ($eqxShareContainer.length && ($eqxShareContainer.append($('<div class="eqx-share">\n    <a class="eqx-share-btn btn-facebook"><span class="eqx-share-icon icon-facebook"></span></a>\n    <a class="eqx-share-btn btn-twitter"><span class="eqx-share-icon icon-twitter"></span></a>\n    <a class="eqx-share-btn btn-plus"><span class="eqx-share-icon icon-google_plus"></span></a>\n    <a class="eqx-share-btn btn-linkedin"><span class="eqx-share-icon icon-linkedin"></span></a>\n    <a class="eqx-share-btn btn-pinterest"><span class="eqx-share-icon icon-pinterest"></span></a>\n    <a class="addthis_sharing_toolbox"></a>\n</div>')), $(".eqx-share-btn").ShareLink({
                title: data.obj.name,
                text: data.obj.description,
                image: PREFIX_FILE_HOST + data.obj.cover,
                url: window.location.href.split("#")[0],
                class_prefix: "btn-"
            })), document) 0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-55c029461a7d08e5"]
        }
    }

    function addEnabledClassToPageCtrl(a) {
        var b, c, d = a.obj.pageMode,
            e = a.obj.property.triggerLoop;
        0 == d || 1 == d || 2 == d || 6 == d || 7 == d || 8 == d || 11 == d || 12 == d ? b = !0 : (3 == d || 4 == d || 5 == d || 10 == d) && (c = !0), setTimeout(function () {
            b ? ($(".ctrl_panel_dir .ctrl-up").addClass("enabled"), e && $(".ctrl_panel_dir .ctrl-down").addClass("enabled")) : c && ($(".ctrl_panel_dir .ctrl-left").addClass("enabled"), e && $(".ctrl_panel_dir .ctrl-right").addClass("enabled"))
        }, 0)
    }

    var redirectUrl, companyName, pageMode, preview, param, ad, customLastPage = !1,
        isMobile = mobilecheck(),
        scriptLoaded = [],
        activityPagePromise = null;
    window.appendLastPage = function (a, b, c, d, e, f) {
        if (pageMode = c, preview = d, param = e, ad = f, 100 == a.obj.bizType ? (redirectUrl = "https://itunes.apple.com/us/app/easyshow-free-h5-sence-slides/id987351120?mt=8", companyName = "Hypefolio") : (redirectUrl = your_demain, companyName = "易企秀技术支持"), appendActivityPage(a, b), a.obj.createTime > 14165028e5) if (100 == a.obj.bizType) eqFreepage(a, b);
        else if (a.obj.property.hideEqAd) eqHideAll(a, b);
        else {
            if (a.obj.property && a.obj.property.eqAdType) switch (a.obj.property.eqAdType) {
                case 1:
                    return void eqFreepage(a, b);
                case 2:
                    return void eqDefaultBottomLabel(a, b);
                case 3:
                    return void eqCustomBottomLabel(a, b)
            }
            a.obj.property.isAdvancedUser ? a.obj.property && a.obj.property.bottomLabel && a.obj.property.bottomLabel.id ? eqCustomBottomLabel(a, b) : eqDefaultBottomLabel(a, b) : eqFreepage(a, b)
        } else eqHideAll(a, b)
    }, isMobile && $(".nr").css({
        width: "100%",
        height: "100%"
    })
}(window, jQuery), function (window, $) {
    function getCounterValues(a) {
        var b = {
            sceneId: a.obj.id,
            fieldIds: ""
        };
        $.each(a.list, function (a, c) {
            c.elements && $.each(c.elements, function (a, c) {
                "i" === c.type && (b.fieldIds += (b.fieldIds ? "," : "") + c.id)
            })
        }), b.fieldIds && (window.eqShow.counterValues = $.ajax({
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

    function getRequestUrl() {
        var a;
        return preview ? (a = isNewPreviewLocation ? PREFIX_URL + "index.php?c=scene&a=view&id=" + sceneId + "&preview=preview" + ".data" : PREFIX_URL + "index.php?c=scene&a=view&id=" + sceneId + "&preview=preview", branchid && (a += (/\?/.test(a) ? "&" : "?") + "user=" + branchid)) : a = mobileview ? PREFIX_URL + "event/9100?p1=" + sceneId : window.scene && window.scene.id ? window.isCheck ? PREFIX_SERVER_HOST + "m/eqs/view/page/" + window.scene.id : PREFIX_S1_URL + "index.php?c=scene&a=view&id=" + window.scene.id : PREFIX_S1_URL + "eqs/v-" + sceneId, a += (/\?/.test(a) ? "&" : "?") + "time=" + (new Date).getTime()
    }

    function combineUrl(a, b, c) {
        return b && (a += "?1=1", a += /\?.*/.test(b) ? "&" + b.substring(1) : /\&.*/.test(b) ? b : "&" + b), a += (/\?/.test(a) ? "&" : "?") + "ad=" + c, a += (/\?/.test(a) ? "&" : "?") + "time=" + (new Date).getTime()
    }

    function bindShare(data) {
        if (mobilecheck() || tabletCheck()) isWeixin() && configWeixin(data);
        else if (100 != data.obj.bizType) with (window._bd_share_config = {
            common: {
                bdSnsKey: {},
                bdText: data.obj.name,
                bdSign: "on",
                bdDesc: data.obj.name,
                bdUrl: PREFIX_HOST + "/v-" + sceneId,
                bdStyle: "0",
                bdSize: "32"
            },
            share: {}
        }, document) 0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~(-new Date / 36e5)]
    }

    function getDomain(a) {
        var b = "null";
        ("undefined" == typeof a || null == a) && (a = window.location.href);
        var c = /.*\:\/\/([^\/]*).*/,
            d = a.match(c);
        return "undefined" != typeof d && null != d && (b = d[1]), b
    }

    function configWeixin(a) {
        var b = location.href.split("#")[0],
            c = getDomain(b),
            d = Date.now(),
            e = "eqs/wx/ticket",
            f = getDomain(PREFIX_HOST);
        b.indexOf(f) < 0 && (e += (/\?/.test(e) ? "&" : "?") + "domain=" + c), e += (/\?/.test(e) ? "&" : "?") + "time=" + (new Date).getTime(), $.ajax({
            type: "GET",
            url: PREFIX_S1_URL + e,
            crossDomain: !0
        }).then(function (b) {
            b.success && b.obj.appId && b.obj.ticket && -1 != b.obj.ticket && bindWeixinEventWithSDK(b.obj.appId, b.obj.ticket, a, d)
        }, function (a) {
        })
    }

    function bindWeixinEventWithSDK(a, b, c, d) {
        var e = location.href.split("#")[0],
            f = "eqxiuview",
            g = "jsapi_ticket=" + b + "&noncestr=" + f + "&timestamp=" + d + "&url=" + e,
            h = new jsSHA(g, "TEXT"),
            i = h.getHash("SHA-1", "HEX");
        wx.config({
            debug: !1,
            appId: a,
            timestamp: d,
            nonceStr: f,
            signature: i,
            jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
        }), wx.ready(function () {
            shareWeixinWhenReady(e, c)
        })
    }

    function shareWeixinWhenReady(a, b) {
        var c = b.obj.name,
            d = b.obj.cover,
            e = b.obj.description;
        e || (e = " "), wx.onMenuShareTimeline({
            title: c,
            link: a,
            imgUrl: PREFIX_FILE_HOST + d,
            success: function () {
            },
            cancel: function () {
            }
        }), wx.onMenuShareAppMessage({
            title: c,
            desc: e,
            link: a,
            imgUrl: PREFIX_FILE_HOST + d,
            success: function () {
            },
            cancel: function () {
            }
        }), wx.onMenuShareQQ({
            title: c,
            desc: e,
            link: a,
            imgUrl: PREFIX_FILE_HOST + d,
            success: function () {
            },
            cancel: function () {
            }
        }), wx.onMenuShareWeibo({
            title: c,
            desc: e,
            link: a,
            imgUrl: PREFIX_FILE_HOST + d,
            success: function () {
            },
            cancel: function () {
            }
        }), $("#media").get(0).play()
    }

    function parseJson(a, b) {
        isNewPreviewLocation || window.scene || (document.title = a.obj.name, $("#metaDescription").attr("content", a.obj.name + ", " + a.obj.description + ", 由易企秀免费移动场景应用自营销管家提供技术支持"), $(".scene_title").text(a.obj.name)), b || bindShare(a), pageMode = a.obj.pageMode;
        var c = [];
        return a.obj.property && (a.obj.property = JSON.parse(a.obj.property) || {}), a.obj.bgAudio && "string" == typeof a.obj.bgAudio && (a.obj.bgAudio = JSON.parse(a.obj.bgAudio) || null), c = a.list, c.length <= 0 ? (alert("此场景不存在!"), void(window.location.href = your_demain)) : void appendLastPage(a, c, pageMode, preview, param, ad)
    }

    var url, preview, mobileview, pageMode, branchid, ad = 0;
    $.ajaxSetup({
        cache: !0
    });
    var isNewPreviewLocation = false;
    url = '';
    var sceneId = 0;
    isNewPreviewLocation && (sceneId = 0);
    var param = 0;
    if (( window.preview || isNewPreviewLocation) && (preview = !0), !(mobilecheck() || tabletCheck() && window == window.top)) {

        var addElmentsForPc = function (a) {

            var b = document.getElementsByTagName("head")[0],
                c = document.createElement("link");
            c.href = CLIENT_CDN + "assets/Css/pcviewer.css", c.rel = "stylesheet", b.appendChild(c), window != window.top ? ($("body").css("background-image", "none"), window.location.href.indexOf("hidePhone") > 0 && ($(".top").hide(), $(".bottom").hide(), $(".phone_menubar").hide(), $(".scene_title_baner").attr("style", "display:none !important"), $("body").css({
                "background-color": "rgba(0,0,0,0.6)"
            }), $(".p-index").wrap('<div class = "phone_panel"></div>'), $('<div class = "ctrl_panel_dir"></div>').appendTo($(".phone_panel")), setTimeout(function () {
                $(".phone_panel").css({
                    position: "absolute",
                    width: "94%",
                    height: "94%",
                    top: "3%",
                    left: "3%",
                    "margin-top": 0,
                    "margin-left": 0
                });
                var a = $(".ctrl_panel_dir");
                $(".ctrl_panel_dir").css({
                    position: "fixed",
                    bottom: "3%",
                    right: "3%"
                }), $(".phoneBox").css({
                    width: "100%",
                    height: "100%"
                }), $('<div class="ctrl-left" onclick = "eqxiu.prePage(1)"></div>').appendTo(a), $('<div class="ctrl-right" onclick = "eqxiu.nextPage(1)"></div>').appendTo(a), $('<div class="ctrl-up" onclick = "eqxiu.prePage(2)"></div>').appendTo(a), $('<div class="ctrl-down" onclick = "eqxiu.nextPage(2)"></div>').appendTo(a)
            }, 100))) : ($("body").css("backgroundImage", "url(view/images/previewbg_spring.jpg)"), $.getScript(CLIENT_CDN + "common/js/qrcode.js", function () {
                $.getScript(CLIENT_CDN + "common/js/jquery.qrcode.js", function () {
                    window.scene && 100 == window.scene.bizType ? ($("#con").before('<div id="code" style="margin-top: -200px;">\n    <div style="font-size: 14px;">Share your folio on social network!</div>\n    <div class="eqx-share">\n        <a class="eqx-share-btn btn-facebook"><span class="eqx-share-icon icon-facebook"></span></a>\n        <a class="eqx-share-btn btn-twitter"><span class="eqx-share-icon icon-twitter"></span></a>\n        <a class="eqx-share-btn btn-plus"><span class="eqx-share-icon icon-google_plus"></span></a>\n        <a class="eqx-share-btn btn-linkedin"><span class="eqx-share-icon icon-linkedin"></span></a>\n        <a class="eqx-share-btn btn-pinterest"><span class="eqx-share-icon icon-pinterest"></span></a>\n        <a class="addthis_sharing_toolbox"></a>\n    </div>\n    <div id="view_reg" style="border: none;margin-bottom: 26px;"><span>\n        <a target="_blank" href=' + your_demain + ' style="color: #fff;border-bottom-color: #fff;font-size: 14px;">So Cool, Let me try it!</a>\n    </span></div>\n    <div style="text-align: center;background:#fff;padding: 10px;" id="codeImg"/> \n    <div style="text-align: center;font-size: 14px;">Scan the QR Code!</div>\n    <div id="support">Powered BY <a target="_blank" href=' + your_demain + '><img id="logoSmall" style="width: 64px;vertical-align: bottom;" src="' + CLIENT_CDN + 'view/images/hypefolio-logo.png"/></a></div></div>'), $(".eqx-share-btn").ShareLink({
                        title: window.scene.name,
                        text: window.scene.description,
                        image: PREFIX_FILE_HOST + window.scene.cover,
                        url: window.location.href.split("#")[0],
                        class_prefix: "btn-"
                    })) : $("#con").before('<div id="code"><div>扫一扫，分享给朋友！</div><div style="text-align: center;background:#fff;padding: 10px;" id="codeImg"/><div id="view_share" class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a></div><div id="view_reg">这么漂亮的场景&nbsp;→<span><a target="_blank" href=' + your_demain + '>我也来制作</a></span></div><div id="support">技术支持 BY <a target="_blank" href=' + your_demain + '><img id="logoSmall" src="' + CLIENT_CDN + 'view/images/bg_small.png"/></a></div></div>');
                    var b, c = getDomain(PREFIX_HOST);
                    b = window.location.href.indexOf(c) >= 0 ? parseInt(10 * Math.random(), 10) % 2 ? PREFIX_URL : PREFIX_URL : PREFIX_URL, $("#codeImg").qrcode({
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: b + "v-" + a + "?eqrcode=1"
                    })
                })
            }), $(".p-index").wrap('<div class = "phone_panel"></div>'), $('<div class = "ctrl_panel"></div>').appendTo($(".phone_panel")), setTimeout(function () {
                window.scene && 100 == window.scene.bizType ? ($(".phone_menubar").addClass("hypefolio"), $('<a id = "pre_page" type = "button" class = "pre_btn btn" onclick = "eqxiu.prePage()">\n    <span style="transform: rotateZ(90deg);display: inline-block;font-size: 36px;">&lt;</span>\n</a>').prependTo($(".ctrl_panel")), $('<a id = "next_page" type = "button" class = "next_btn btn" onclick = "eqxiu.nextPage()">\n    <span style="transform: rotateZ(90deg);display: inline-block;font-size: 36px;margin-top: 5px;">&gt;</span>\n</a>').appendTo($(".ctrl_panel"))) : ($('<a id = "pre_page" type = "button" class = "pre_btn btn" onclick = "eqxiu.prePage()">上一页</a>').prependTo($(".ctrl_panel")), $('<a id = "next_page" type = "button" class = "next_btn btn" onclick = "eqxiu.nextPage()">下一页</a>').appendTo($(".ctrl_panel")))
            }, 100))
        };
        addElmentsForPc(sceneId)
    }
    jQuery.support.cors = !0, eqShow.bootstrap = function () {
        var a = jsondata;
        parseJson(a, !1)
    }, eqShow.bootstrapWithPassword = function () {
        function a() {
            $("#verifyTip").addClass("shake").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).removeClass("shake"), c()
            })
        }

        function b(b) {
            $("#loading").show(), $.ajax({
                type: "GET",
                url: g,
                data: $.param({
                    password: b
                }),
                xhrFields: {
                    withCredentials: !0
                },
                success: function (b) {
                    200 === b.code ? (b.obj = b.obj || window.scene, $("#verifyCode").remove(), parseJson(b, !0)) : ($("#loading").hide(), $("#verifyCode").show(), a())
                },
                crossDomain: !0
            })
        }

        function c() {
            $(".password-indicator li").each(function (a, b) {
                a < o.length ? $(b).addClass("active") : $(b).removeClass("active")
            })
        }

        function d(a) {
            var d = $(a.target);
            d.addClass("active"), o += d.text(), c(), 4 == o.length && (b(o), o = ""), setTimeout(function () {
                d.removeClass("active")
            }, 100)
        }

        function e(a) {
            o = "", c()
        }

        function f(a) {
            o && (o = o.substring(0, o.length - 1), c())
        }

        var g = getRequestUrl();
        if ($("#loading").hide(), $("#verifyCode").show(), window.scene) {
            var h = {
                name: window.scene.name,
                cover: window.scene.cover,
                description: window.scene.description
            };
            bindShare({
                obj: h
            })
        }
        var i = mobilecheck(),
            j = tabletCheck();
        if (!i || i && /Android (\d+\.\d+)/.test(navigator.userAgent) ? ($(".password-numbers>span").on("click", d), $("#btnClear").on("click", e), $("#btnCancel").on("click", f)) : ($(".password-numbers>span").on("touchstart", d), $("#btnClear").on("touchstart", e), $("#btnCancel").on("touchstart", f)), i || j) {
            var k, l = $(".container"),
                m = l.width(),
                n = l.height();
            k = Math.floor(10 * Math.min(document.documentElement.clientHeight / n, document.documentElement.clientWidth / m)) / 10, l.css("transform", "scale(" + k + ", " + k + ")")
        }
        var o = ""
    }
}(window, jQuery), $(".main").show(), $.easing.jswing = $.easing.swing, $.extend($.easing, {
    def: "easeOutQuad",
    swing: function (a, b, c, d, e) {
        return $.easing[$.easing.def](a, b, c, d, e)
    },
    easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
        return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * (2 * Math.PI) / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (2 == (b /= e / 2)) return c + d;
        if (g || (g = e * (.3 * 1.5)), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return 1 > b ? -.5 * (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g) * .5 + d + c
    },
    easeInBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
    },
    easeOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
    },
    easeInOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * (b * b * (((f *= 1.525) + 1) * b - f)) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
    },
    easeInBounce: function (a, b, c, d, e) {
        return d - $.easing.easeOutBounce(a, e - b, 0, d, e) + c
    },
    easeOutBounce: function (a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? d * (7.5625 * b * b) + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    },
    easeInOutBounce: function (a, b, c, d, e) {
        return e / 2 > b ? .5 * $.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * $.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
    }
});