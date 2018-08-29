angular.module("scene", [ /*"scene.create", "scene.support",*/ "services.scene", "services.staticRes", /*"scene.create.new",*/ "app.directives.addelement", /*"create.userGuide"*/ ]);
angular.module("scene").controller("SceneCtrl", ["$window", "$scope", "$rootScope", "$location", "$translate", "sceneService", "$modal", "ModalService", "usercenterService", "staticResService", '$ocLazyLoad', function(a, b, c, d, e, f, g, h, i, j, $ocLazyLoad) {
		b.PREFIX_FILE_HOST = PREFIX_FILE_HOST, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.isActive = "scene", b.scene = {
			type: null
		}, b.totalItems = 0, b.currentPage = 1, b.toPage = "", b.tabindex = 0, b.childcat = 0, b.order = "new", b.pageSizeList = 11;
		var k = 0;
		b.pageNoNum = 1, b.blankSample = !0, b.pageTplTypesList = [{
			type: "101",
			name: "行业"
		}, {
			type: "102",
			name: "个人"
		}, {
			type: "103",
			name: "企业"
		}, {
			type: "104",
			name: "节假"
		}, {
			// type: "105",
			// name: "风格"
		}, {
			// type: "106",
			// name: "品牌"
		}], b.getCompanyTpl = function(a, c) {
			b.childcat = 1;
			var d = 11;
			b.childCatrgoryList = [];
			f.getCompanyTpls(b.pageNoNum, d).then(function(a) {
				if(a.data.list && a.data.list.length > 0){
					b.tpls = a.data.list;
					b.totalItems = a.data.map.count + 1;
					b.currentPage = a.data.map.pageNo;
					b.allPageCount = a.data.map.count;
					b.toPage = "";
				}else{
					b.tpls = [];
				}
			})
		}, b.pageChanged = function(a) {//翻页
			b.tplLoading = !0;

			l.targetPage = a;
			b.pageNoNum = a;
			b.toPage = a;
			b.pageNoNum > 1 ? (b.blankSample = !1, b.pageSizeList = 12) : (b.blankSample = !0, b.pageSizeList = 11);
			if(1 > a || a > b.totalItems / 11 + 1){
				return void alert("此页超出范围");
			}else{
				return void(1 == b.childcat ? b.getCompanyTpl(a, b.pageSizeList) : b.getPageTpls(1, l.sceneType, l.tagId, a, b.pageSizeList, l.order));
			} 
		}, b.preview = function(a) {
			var b = PREFIX_HOST + "/v-" + a;//长页面预览路径
			window.open(b, "_blank");
		}, b.getStyle = function(a) {
			return {
				"background-image": "url(" + PREFIX_FILE_HOST + a + ")",
				"background-size": "cover"
			}
		},/* b.userXd = 0, i.getUserXd().then(function(a) {
			b.userXd = a.data.obj || 0
		}), */b.previewScene = function(a) {
			c.tplObj = a, d.path("/v-" + a.code)
		}, b.createScene = function(type, tpl) {
			if (tpl && tpl.price) {
				var price = parseFloat(tpl.price) || 0;
				if(price && price > b.userXd){
					h.openMsgDialog({
						msg: '当前选择需要消耗微币<font color="#ff6e6e">' + price + '</font>个<br/>微币余额不足(<font color="#ff6e6e">' + (b.userXd || 0) + '</font>个)<span class="get-xd"><a href="http://bbs.e.wesambo.com/forum.php?mod=viewthread&tid=297&extra=page%3D1" target = "_blank">获取微币</a></span>'
					});
				}else{
					h.openConfirmDialog({
						msg: '当前选择需要消耗微币<font color="#ff6e6e">' + price + '</font>个<br/>微币余额为<font color="#ff6e6e">' + (b.userXd || 0) + "</font>个"
					}, function() {
						$ocLazyLoad.load("controllers/scene.create.new").then(function() {
							g.open({
								windowClass: "login-container six-contain",
								templateUrl: "/Public/eq/6.0/templates/scene.createNew.tpl.html",
								controller: "SceneNewCtrl",
								resolve: {
									items: function() {
										return {
											fileType: type,
											tpl: tpl
										}
									}
								}
							});
						});

					});
				} 
			} else $ocLazyLoad.load("controllers/scene.create.new").then(function() {
				g.open({
					windowClass: "login-container six-contain",
					templateUrl: "/Public/eq/6.0/templates/scene.createNew.tpl.html",
					controller: "SceneNewCtrl",
					resolve: {
						items: function() {
							return {
								fileType: type,
								tpl: tpl
							}
						}
					}
				})
			});
		}, c.tplId && i.getUserXd().then(function(a) {
			b.userXd = a.data.obj || 0;
		}).then(function() {
			b.createScene(c.tplId);
		}).then(function() {
			c.tplId = null;
		}), b.getStyle = function(a) {
			return {
				"background-image": "url(" + PREFIX_FILE_HOST + a + ")"
			}
		}, b.show = function(a) {
			console.log(a.target);
			$(a.target).children(".cc").css("display", "block");
		};
		b.pageTplTypes = j.getSceneType();

		b.filterTpl = function(a, c) {
			b.selete = !0;
			a ? l.order = 1 : l.order = 2;
			b.getPageTpls(null, l.sceneType, l.tagId, k, b.pageSizeList, l.order);
		};
		var l = {
				sceneType: null,
				tagId: "",
				order: "",
				pageNo: "0",
				targetPage: ""
			},
			m = {},
			n = [];
		b.getPageTplsByType = function(a) {
			l.sceneType = a;
			b.childcat = a;
			b.categoryId = 0;
			if(m[a]){
				n = m[a];
				n.length && (o(), b.getPageTpls(1, l.sceneType, n[0].id, k, 11, l.order));
			}else{
				f.getPageTplTypesTwo(a, a).then(function(c) {
					n = m[a] = c.data.list;
					n.length && (o(), b.getPageTpls(1, l.sceneType, n[0].id, k, 11, l.order));
				})
			}
		};
		var o = function() {
			var a, c = null,
				d = [];
			for (var e in n) {
				n[e].groupId !== c && (a = [], c = n[e].groupId, d.push(a));
				a.push(n[e]);
			}
			d.splice(4, 1);
			d.length ? b.newArrayGroupCat = d : b.newArrayGroupCat = [];
		};
		b.allpage = function(a) {
			l.sceneType = a;
			b.childcat = 0;
			b.getPageTpls(1, null, null, 1, 12, l.order);
			b.newArrayGroupCat = [];
			b.blankSample = !0; //willingshe改成12

		}, b.freeTplChoice = "", b.freeTpl = function(a) {
			b.freeTplChoice = a;
			b.tplnew(b.order);

		};

		b.getPageTpls = function(a, c, d, e, g, h) {//初始化模板
			b.categoryId = d;
			l.tagId = d;
			var i = b.freeTplChoice ? b.freeTplChoice + "=1" : "";
			f.getPageTpls(a, c, d, e, g, h, i);
		};

		b.tplLoading = !0;//加载条

		b.getPageTpls(1, null, null, 1, 12);
		/*b.$on("search.model", function(){//父子控制器切换模板
			b.getPageTpls(1, null, null, 1, 12);
		});*/
		

		b.$on("getSampleList", function(a, data) { //willingshe改成12
			if (data.list && data.list.length > 0) {
				b.tpls = data.list;
				b.totalItems = data.map.count;
				b.currentPage = data.map.pageNo;
				b.allPageCount = data.map.count;
				b.toPage = data.map.pageNo;
				for (var d = 0; d < b.tpls.length; d++) {
					if(b.tpls[d].avatar){
						if(0 === b.tpls[d].avatar.indexOf("http://")){
							b.tpls[d].avatar = b.tpls[d].avatar;
						}else{
							b.tpls[d].avatar = PREFIX_FILE_HOST + b.tpls[d].avatar;
						}
					}
				}
			} else {
				b.tpls = [];
				b.totalItems = 0;
				b.blankSample = !1;
			}
			b.tplLoading = !1;//去除加载条
		});

		b.name = null;

		b.EnterPress = function(a, c) {
			var d = a || window.event;
			13 == d.keyCode && b.submit(c)
		}, b.searchButton = !0;
		var p = {};
		b.submit = function(a) {
			b.name = a;
			f.getPageTpls(1, null, null, k, b.pageSizeList, l.orderby, null, a);
			b.searchButton = !1;
			p.refresh = !0;

		}, b.changeName = function(a) {
			b.searchButton = !0;
			"" === a && p.refresh && f.getPageTpls(1, null, null, k, b.pageSizeList, l.orderby, null, a);

		}, b.clearSearch = function() {
			b.searchButton = !0;
			b.name = "";
			f.getPageTpls(1, null, null, k, b.pageSizeList, l.orderby, null);

		}, b.userScene = function(a) {
			f.getPageTpls(1, null, null, k, b.pageSizeList, l.orderby, null, null, a);
		}
	}]);
