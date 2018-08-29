 angular.module("scene.preview", ["services.scene"]); 
 angular.module("scene.preview").factory("sceneViewService", ["$http", function(a) {
	var b = {};
	return b.getSceneData = function(b) {
		var c = "index.php?c=scene&a=view&id=" + b + "&time=" + (new Date).getTime();
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, b.getSelfLastPage = function(b) {
		var c = "index.php?c=scene&a=getlastpagebg&id=" + b;
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_S1_URL + c
		})
	}, b.getActivityPage = function(b) {
		var c = "eqs/trailer/" + b;
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_S2_URL + c
		})
	}, b
}]).factory("sceneDataParseService", ["sceneViewService", "sceneService","$rootScope", function(a, b, $rootScope) {
	$rootScope.view = !0;
	$rootScope.$on("changeView",function(a, b, longpage){
		longpage ? ($rootScope.view = !1) : ($rootScope.view = !0);
	});

	function c(b, c) {
		if(b.obj.property.lastPageId){
			a.getSelfLastPage(b.obj.property.lastPageId).then(function(a) {
				if(a.data.obj){
					e(b.obj, a.data);
					b.list.push(a.data.obj);
					o.lastPage = c[c.length - 1];
					i(c, b);
				}else{
					d(b.obj);
					o.lastPage = c[c.length - 1];
					i(c, b);
				}
			})
		}else{
			d(b.obj, c);
			o.lastPage = c[c.length - 1];
			i(c, b);
		}
	}
	function d(a, b) {
		var c = "http://e.wesambo.com",
			d = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}}',
			e = '{"id":"","sceneId":"","num":2,"name":null,"properties":null,"elements":[{"id":439880,"pageId":129810,"sceneId":16060,"num":0,"type":"3","isInput":0,"title":null,"content":null,"status":1,"css":{},"properties":{"bgColor":"#E6E9EE"}},{"id":439881,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><span style=\\"line-height: 1; background-color: initial;\\"><font size=\\"4\\" color=\\"#888888\\"><b>微课名称</b></font></span></div>","status":1,"css":{"height":"65","zIndex":"10","width":"320","left":"0px","top":"77px"},"properties":{}},{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"bottom-logo\\" style=\\"text-align: center;cursor:pointer;height:142px;width:142px;border-radius:10px;\\"><em style=\\"color:white;line-height:142px;font-size:30px;\\" class=\\"eqf-love\\"></em></div>","status":1,"css":{"height":"157","width":"172","left":"77px","top":"170px"},"properties":{}},{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"width:280px;height:1px;background-color:rgba(60,60,60,0.4);cursor:pointer;position:absolute;left:0;-webkit-filter:drop-shadow(0px 1px 0px rgba(60,60,60,0.4));top:12px;\\"></div>","status":1,"css":{"height":"24","width":"280","left":"21px","top":"122px"},"properties":{}},{"id":439885,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;padding-top: 0;\\" id=\\"scenead\\"><span style=\\"font-size: small; line-height: 1; background-color: initial;\\"><a href=\\"' + PREFIX_S1_URL + "index.php?c=scene&a=link&id=16060&amp;url=" + encodeURIComponent(c) + '\\" target=\\"_blank\\"><font color=\\"#888888\\">免费创建一个微课？→</font><font color=\\"#23a3d3\\">'+lastpagetext+'</font></a></span></div>","status":1,"css":{"borderRadius":"0px","borderStyle":"solid","height":"30","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"12","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"1px","paddingBottom":"20px","top":"420px"},"properties":{"anim":{"type":1,"direction":3,"duration":"1","delay":"0.6"}}}]}';
		e = e.replace(/id=16060/, "id=" + a.id);
		var f = JSON.parse(e);
		f.num = b.length + 1;
		a.cover && "group1/M00/61/8A/yq0KA1T2vYSAEgo7AACovQVgHxk048.jpg" != a.cover && (f.elements[2] = JSON.parse(d), f.elements[2].properties.src = a.cover);
		f.elements[1].content = f.elements[1].content.replace(/微课名称/, a.name ? a.name : "");
		b.push(f);
	}
	function e(a, b) {
		var c = '{"id":81395,"pageId":"","sceneId":"","num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"%","borderStyle":"solid","height":"158","zIndex":"1000","paddingTop":"0px","borderColor":"rgba(0,0,0,1)","boxShadow":"0 0px 0px #333333","color":"#000000","backgroundColor":"white","borderWidth":"0px","width":"158","left":"84px","paddingTop":"11px","paddingLeft":"10px","top":"170px"},"properties":{"height":"100px","imgStyle":{"width":139,"height":136,"marginTop":"0px","marginLeft":"0px"},"width":"100px","src":"group1/M00/01/30/yq0JCFQpOR-AOULFAAFBPO1yzBQ984.jpg"}}',
			d = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"bottom-logo\\" style=\\"text-align: center;cursor:pointer;height:136px;width:139px;\\"><em style=\\"color:white;line-height:136px;font-size:120px;\\" class=\\"eqf-eqxiu\\"></em></div>","status":1,"css":{"height":"158","width":"158","left":"84px","top":"170px","backgroundColor":"white"},"properties":{}}',
			e = '{"id":81465,"pageId":"","sceneId":"","num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><font color=\\"#ffffff\\" size=\\"3\\">击此处进行编辑</font></div>","status":1,"css":{"zIndex":"102","height":"65","width":"320","left":"0px","top":"70px"},"properties":{}}',
			f = '{"id":2557867,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"logo-shadow1\\" style=\\"text-align: center;cursor:pointer;height:127px;width:220px;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);position:absolute;left:20px;top:56px;\\"></div>","status":1,"css":{"height":"257","width":"257","left":"78px","top":"175px"},"properties":{}}',
			g = '{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"width:280px;height:1px;background-color:rgba(60,60,60,0.4);cursor:pointer;position:absolute;left:0;-webkit-filter:drop-shadow(0px 1px 0px rgba(60,60,60,0.4));top:12px;\\"></div>","status":1,"css":{"height":"24","width":"280","left":"21px","top":"122px"},"properties":{}}';
		b.obj.sceneId = a.id;
		for (var h, i = 0; i < b.obj.elements.length; i++){
			"4" != b.obj.elements[i].type || "group1/M00/A5/5E/yq0KA1QmePmAKr7yAAEByp5jyLc752.jpg" != b.obj.elements[i].properties.src && "group1/M00/C5/9D/yq0KA1SH1zuAFgkLAAAFgBR8hJs456.png" != b.obj.elements[i].properties.src && "group1/M00/C5/3F/yq0KA1SHp-2AQZZZAAB-7rIaK6I743.png" != b.obj.elements[i].properties.src && "group1/M00/C5/9D/yq0KA1SH1zuAeQuFAAAFfUkeXDc110.png" != b.obj.elements[i].properties.src || (b.obj.elements.splice(i, 1), i--);
			"2" == b.obj.elements[i].type && (b.obj.elements.splice(i, 1), i--);
		}
		"group1/M00/61/8A/yq0KA1T2vYSAEgo7AACovQVgHxk048.jpg" != a.cover ? (h = JSON.parse(c), h.properties.src = a.cover) : h = JSON.parse(d);
		b.obj.elements.push(h);
		b.obj.elements.push(JSON.parse(f));
		b.obj.elements.push(JSON.parse(g));

		var j = JSON.parse(e);
		j.content = j.content.replace(/击此处进行编辑/, a.name);
		b.obj.elements.push(j);

		for (var k = 0; k < b.obj.elements.length; k++){
			if("2" == b.obj.elements[k].type && /http:\/\/service.e.wesambo.com\/eqs\/link/.test(b.obj.elements[k].content)){
				b.obj.elements[k].content = b.obj.elements[k].content.replace(/;url=.*com"/, ";url=" + encodeURIComponent(redirectUrl) + '"');
			}
		}
	}
	function f(b, c) {
		a.getSelfLastPage(b.obj.property.bottomLabel.id).then(function(a) {
			if (a.data.success) {
				var d = c[c.length - 1];
				d.elements || (d.elements = []);
				d.elements = d.elements.concat(a.data.obj.elements);
				i(c, b);
			}
		})
	}
	function g(a, b) {
		h(a, b);
		i(b, a);
	}
	function h(a, b) {
		var c, d = "http://e.wesambo.com",
			e = "微学宝技术支持",
			f = '{"id":480292,"pageId":136042,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;transform: none;-webkit-animation: fadeIn 2s ease 1s both;-webkit-animation-play-state: initial;\\"><a href=\\"' + PREFIX_S1_URL + "eqs/link?id=16060&amp;url=" + encodeURIComponent(d) + '\\" target=\\"_blank\\" style=\\"font-size: x-small;display:block;line-height: 10px;\\"><font color=\\"#ffffff\\">' + e + '</font></a></div>","status":1,"css":{"zIndex":"1000","height":"20","width":"129","left":"97px","top":"418px","backgroundColor":"rgba(0,0,0,0.6)","borderRadius":"20px"},"properties":{"anim":{"type":0,"direction":0,"duration":2,"delay":"0"}}}';
		f = f.replace(/id=16060/, "id=" + a.id);
		c = b[b.length - 1].elements;
		b[b.length - 1].elements || (c = b[b.length - 1].elements = []);
		c.push(JSON.parse(f));
	}
	function i(a, b) {
		var c = b.obj.pageMode;
		b.obj.property.slideNumber ? b.obj.property.slideDisplay = "block" : b.obj.property.slideDisplay = "none";
		b.obj.property.slideNumber = !0;
		var d = {
				bgAudio: b.obj.bgAudio
			}, e;
		for (e = 1; e <= a.length; e++) {
			$('<section class="main-page"><div class="m-img" id="page' + e + '"></div></section>').appendTo(".phone-view"), a.length > 1 && ($('<section class="u-arrow-bottom"><div class="pre-wrap"><div class="pre-box1"><div class="pre1"></div></div><div class="pre-box2"><div class="pre2"></div></div></div></section>').appendTo("#page" + e), $('<section class="u-arrow-right"><div class="pre-wrap-right"><div class="pre-box3"><div class="pre3"></div></div><div class="pre-box4"><div class="pre4"></div></div></div></section>').appendTo("#page" + e)), 1 == e && $(".phone-view .main-page").eq(0).addClass("z-current");
			var f = e;
			if(a[f - 1].properties && !$.isEmptyObject(a[f - 1].properties)){
				if(!a[f - 1].properties.image){
					if(a[f - 1].properties.scratch){//涂抹
						addScratchEffect(d, a, f)
					}else if(a[f - 1].properties.finger){//指纹
						p = [];
						p.push({
							num: f,
							finger: a[f - 1].properties.finger
						});
						lockEffect(d, a, p, $(".m-img").width(), $(".m-img").height());

					}else if(a[f - 1].properties.fallingObject){//环境
						fallingObject(a, f)
					}else if(a[f - 1].properties.effect){//飘雪、烟花、数钱
						!function(b) {
							window[a[b - 1].properties.effect.name].doEffect(d, b, a, renderPage);
						}(f)
					}else{
						renderPage(eqShow, f, a)
					}
				}
			}else{
				renderPage(eqShow, f, a);
				1 == f && playVideo(d)
			}

			if (e == a.length) {
				eqxiu.app($(".phone-view"), b.obj.pageMode, a, b);
			}
			$rootScope.view && $(".phone-view .wrapper-background").css({
				top: 0,
				right: 0,
				marginTop: 0,
				marginRight: 0
			})
		}
		if(0 === c || 1 == c || 2 == c || 6 == c || 7 == c || 8 == c || 11 == c || 12 == c){
			$(".phone-view .u-arrow-right").hide();
		}else if(3 == c || 4 == c || 5 == c || 9 == c || 10 == c){
			$(".phone-view .u-arrow-bottom").hide();
		}
	}
	function j(b) {
		var c = [];
		$.extend(!0, c, n._pages), o.activePage && c.push(o.activePage);
		var f = c.length + 1;
		if (!b) {
			d({
				name: o.sceneName
			}, c), o.lastPage = c[c.length - 1];
			var g = c[c.length - 1];
			if(o.haseLastPage){ 
				k(o.lastPageNum, g)
			}else{
				$(".phone-view .main-page").last().after('<section class="main-page"><div class="m-img" id="page' + f + '"></div></section>');
				o.lastPageNum = f;
				renderPage(eqShow, o.lastPageNum, c);
				o.haseLastPage = !0;
			}
			n.app.changeAppPage();

			return void n.app.setPageData(c)
		}
		a.getSelfLastPage(b).then(function(a) {
			if (a.data.success) {
				o.lastPage = a.data.obj; 
				if (o.haseLastPage) {
					var b = {
						id: "1",
						name: o.sceneName,
						cover: o.sceneCover
					};
					e(b, a.data);
					k(o.lastPageNum, a.data.obj);
					c.push(a.data.obj);

				} else {
					$(".phone-view .main-page").last().after('<section class="main-page"><div class="m-img" id="page' + f + '"></div></section>');
					o.lastPageNum = f;
					renderPage(eqShow, o.lastPageNum, c.push([a.data.obj]));
					o.haseLastPage = !0;
				}
				n.app.changeAppPage();
				n.app.setPageData(c);
			}
		})
	}
	function k(a, c) {
		$("#page" + a).empty(), b.templateEditor.parse({
			def: c,
			appendTo: "#page" + a,
			mode: "view"
		})
	}
	function l(a, b, c, d) {
		var e = 0;
		for (a.length; e < a.length; e++) {
			var f = a[e];
			if (f.pageId = b.id, c.name && c.url && "http://" != c.url) {
				if(2 == f.type && f.content.indexOf("e.wesambo.com科技公司") > 0){
					f.content = f.content.replace(/e.wesambo.com科技公司/, '<a href="' + PREFIX_S1_URL + "eqs/link?id=" + d + "&amp;url=" + encodeURIComponent(c.url) + '" target=_blank>' + c.name + "</a>");
				}
			}else if (c.name) {
				if(2 == f.type && f.content.indexOf("e.wesambo.com科技公司") > 0){
					f.content = f.content.replace(/e.wesambo.com科技公司/, c.name);
				}
			}else if (/微学宝技术支持/.test(f.content)) {
				f.content = '<div style="text-align: center;">' + f.content + "</div>";
				var g = {
					zIndex: "1000",
					height: "33",
					width: "129",
					left: "97px"
				};
				$.extend(f.css, g)
			} else {
				2 == f.type && f.content && (f.content = "");
			}
			f.css.zIndex = 200
		}
	}
	function m() {
		n.app.removeLastPage();
		n.app.changeAppPage();
		o.haseLastPage = !1;
	}
	var n = {};
	n.app = eqxiu;
	var o = {
		haseLastPage: !1,
		sceneName: "",
		sceneCover: "",
		lastPage: null,
		activePage: null,
		activePageNum: null,
		lastPageNum: null
	};
	n._pages = [];
	n.parse = function(a) {
		o.activePage = null;
		a.obj.property && (a.obj.property = JSON.parse(a.obj.property) || {});
		a.obj.name && (o.sceneName = a.obj.name);
		a.obj.cover && (o.sceneCover = a.obj.cover);
		a.obj.bgAudio && "string" == typeof a.obj.bgAudio ? a.obj.bgAudio = JSON.parse(a.obj.bgAudio) : $("#audio_btn").hide();

		var b = (a.obj.pageMode, a.list);

		$.extend(!0, n._pages, a.list);
		if ( a.obj.property.hideEqAd) {
			i(b, a);
		}else {
			switch (a.obj.property.eqAdType) {
				case 1:
					o.haseLastPage = !0;
					c(a, b);
					o.lastPageNum = b.length + 1;
					break;
				case 2:
					g(a, b);
					break;
				case 3:
					f(a, b);
					break;
				default:
					o.haseLastPage = !0;
					c(a, b);
			}
		}
	};
	var p = [];
	return n.changeBottomType = function(b, c, d, e) {
		if ("eqFree" == b) {
			j(c), n.app.lastPage();
			var f = n._pages.length;
			k(f, n._pages[n._pages.length - 1])
		} else if ("eqLink" == b) {
			o.lastPageNum = null;
			o.haseLastPage && (m(), o.lastPage = null);
			n.app.lastPage( !! o.activePage);
			if (2 == e) {
				var g = [];
				$.extend(!0, g, n._pages);
				var i = g[g.length - 1];
				i.elements || (i.elements = []);
				h(i, g);

				return void k(n._pages.length, i)
			}
			if (!d || !d.id) return;
			a.getSelfLastPage(d.id).then(function(a) {
				if (a.data.success) {
					var b = {};
					$.extend(!0, b, n._pages[n._pages.length - 1]);
					b.elements || (b.elements = []);
					l(a.data.obj.elements, b, d, n._pages[0].sceneId);
					b.elements = b.elements.concat(a.data.obj.elements);
					k(n._pages.length, b);
				}
			})
		} else {
			o.lastPageNum = null;
			o.haseLastPage ? (m(), o.lastPage = null) : k(n._pages.length, n._pages[n._pages.length - 1]);
			n.app.lastPage();
		}
	}, n.removeActivePage = function() {
		n.app.removeLastPage(o.haseLastPage);
		n.app.changeAppPage();
		n.app.lastPage();
		o.activePageNum = null;

	}, n.playVideo = function(a) {
		var b = {
			bgAudio: a
		};
		a || (b.bgAudio = {
			url: ""
		});
		playVideo(b);
		a || $("#audio_btn").hide();

	}, n.changeScrollMode = function(a) {
		n.app.changeScrollMode(a);
		if(0 === a || 1 == a || 2 == a || 6 == a || 7 == a || 8 == a || 11 == a || 12 == a){
			$(".phone-view .u-arrow-right").hide(), $(".phone-view .u-arrow-bottom").show();
		}else if(3 == a || 4 == a || 5 == a || 9 == a || 10 == a){
			$(".phone-view .u-arrow-bottom").hide();
			$(".phone-view .u-arrow-right").show();
		}
	}, n.changeSceneName = function(a) {
		o.sceneName = a;
	}, n.changeSceneCover = function(a) {
		o.sceneCover = a;
	}, n.replaceActivePage = function(b) {
		a.getActivityPage(b).then(function(a) {
			var b, c = [];
			if(o.haseLastPage){
				$.extend(!0, c, n._pages);
				o.lastPage && c.push(o.lastPage);
				c.push(a.data.obj);
				b = c.length;
				if(o.activePage){
					k(o.activePageNum, a.data.obj);
				}else{
					$(".phone-view .main-page").last().prev().after('<section class="main-page"><div class="m-img" id="page' + b + '"></div></section>');
					o.activePageNum = b;
					renderPage(eqShow, o.activePageNum, c);
				}

				n.app.setPageData(c);
				n.app.changeAppPage();
			}else{
				$.extend(!0, c, n._pages);
				c.push(a.data.obj);
				b = c.length;
				if(o.activePage){
					k(o.activePageNum, a.data.obj);
				}else{
					$(".phone-view .main-page").last().after('<section class="main-page"><div class="m-img" id="page' + b + '"></div></section>');
					o.activePageNum = b;
					renderPage(eqShow, o.activePageNum, c);
				}
				n.app.changeAppPage();
				n.app.setPageData(c);
			}
			o.activePage = a.data.obj
		})
	}, n
}]);