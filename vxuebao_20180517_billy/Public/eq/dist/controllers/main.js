angular.module("main", ["services.mine", "services.data", "app.directives.pageTplTypes", "services.staticRes", "app.directives.addelement", "services.usercenter", /*"main.userGuide", */"services.i18nNotifications", "common.directives.scroll","services.modal","services.configSer","security.login.toolbar","ui.bootstrap"]);
angular.module("main").controller("MainCtrl", ["$rootScope", "$scope", "$location", "$translate", "security", "MineService", "dataService", "sceneService", "ModalService", "$modal", "usercenterService", "i18nNotifications", "configSerService", "SpreadService", "$filter", "staticResService", "$timeout",'$ocLazyLoad', function(a, b, c, d, e, f, g, h, i, j, k, l,m, n, o, p, q,$ocLazyLoad) {
	b.PREFIX_URL = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.client_cdn = CLIENT_CDN, b.scene = {
		type: null
	}, b.pageSize = 12;
	var r = 1;
	b.isAllowedHistory = e.isAllowToAccess(e.accessDef.USERCENTER_HISTORY), b.showCloseStatus = [], b.showOpenStatus = [], b.isActive = "main", b.loginSuccess = e.isLoginSuccess, b.myScene = !0, b.showBranchSelect = !0;
	var s = a.branchid;
	b.XdpageSize = 100, b.getBranches = function(a) {
		k.getBranches(b.XdpageSize, a).then(function(a) {
			a.data.success && (b.branches = a.data.list)
		}, function() {})
	}, b.getBranches(1), b.selectBranch = function(d) {
		d ? (b.branchCurrent = d, a.branchid = d.id, c.search({
			branchid: d.id
		})) : (a.branchid = "", c.search("branchid", null))
	};
	var t = c.search().branchid;
	q(function() {
		if (t) for (var a = 0; a < b.branches.length; a++) b.branches[a].id == t && (b.branchCurrent = b.branches[a])
	}, 300), b.showSceneList = function() {
		b.initShowGuide = !1, a.$broadcast("eqmain.overflow.visible")
	}, b.$watch("user.loginName", function(a, c) {
		if (a) {
			var d = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			b.loginSuccess && "eqs" == a.substr(0, 3) && !d.test(a) && l.pushForCurrentRoute("rel.tip", "notify.tip")
		}
	}), b.editScene = function(a, b) {
		a && a.stopPropagation(), c.path("scene/create/" + b).search("pageId", 1)
	}, b.visitSceneAction = function() {
		i.openMsgDialog({
			msg: "分别可在设置微课-分享设置中、微课详情页中设置微课状态为不允许访问",
			btn: "知道了"
		}, function() {})
	}, b.showPreview = function(a, c) {
		if (c.publishTime) if (c.publishTime && c.updateTime > c.publishTime) i.openConfirmDialog({
			msg: "微课有更新需要再次发布才能预览最新内容，坚持预览会看到修改之前的微课",
			confirmName: "发布",
			cancelName: "坚持预览"
		}, function() {
			b.publishScene(a, c)
		}, function() {
			a && a.stopPropagation();
			var d = b.canvasUrl + ("/v-" + c.code);
			window.open(d)
		});
		else {
			a && a.stopPropagation();
			var d = b.canvasUrl + ("/v-" + c.code);
			window.open(d)
		} else i.openConfirmDialog({
			msg: "尚未发布微课无法预览，请先发布",
			confirmName: "发布",
			cancelName: "取消"
		}, function() {
			b.publishScene(a, c)
		})
	}, window.localStorage && "false" == localStorage.getItem("myScenesListType") ? b.listType = !1 : b.listType = !0, b.listToggle = function() {
		b.listType = !b.listType, window.localStorage && localStorage.setItem("myScenesListType", b.listType)
	}, b.addColor = function(a) {
		b.trIndex = a
	}, b.removeColor = function() {
		b.trIndex = -1
	}, b.sceneSettings = function(a, b) {
		a && a.stopPropagation(), c.path("scene/create/" + b).search({
			pageId: 1,
			openSetting: "show"
		})
	}, b.clickScene = function() {
		c.path("main")
	}, b.clickSpread = function() {
		c.path("main/spread")
	}, b.creatCompanyTpl = function(a, c, d) {
		a && a.stopPropagation(), h.createCompanyTpls(c).then(function(a) {
			a.data.success && (b.myScenes[d].isTpl = 3, l.pushForCurrentRoute("scene.save.success.companyTpl", "notify.success"))
		})
	}, b.clearCompanyTpl = function(a, c, d) {
		a && a.stopPropagation(), h.clearCompanyTpls(c).then(function(a) {
			a.data.success && (b.myScenes[d].isTpl = 0, l.pushForCurrentRoute("scene.clear.success.companyTpl", "notify.success"))
		})
	}, b.clickCustomer = function() {
		c.path("main/customer")
	}, b.register = e.getRegisterInfo(), b.logout = function() {
		e.logout()
	}, b.copyScene = function(a, b) {
		a && a.stopPropagation(), i.openConfirmDialog({
			msg: "确定复制此微课?"
		}, function() {
			h.copySceneById(b).then(function(a) {
				c.path("scene/create/" + a.data.obj).search("pageId", 1)
			})
		})
	}, b.isAllowedToAccessTransfer = e.isAllowToAccess(e.accessDef.TRANSFER_SCENE), b.isAllowedToAccessTransfer && (b.transferScene = function(c, d) {
		c && c.stopPropagation();
		if("eqs" == a.user.loginName.substr(0, 3) && null == a.user.email){
			i.openBindEmailDialog();
		} else {
			$ocLazyLoad.load("controllers/main.transferScene",function(){
				j.open({
					windowClass: "six-contain",
					templateUrl: "/Public/eq/6.0/template/main.transferscene.tpl.html",
					controller: "TransferSceneCtrl",
					resolve: {
						sceneId: function() {
							return {
								sceneId: d
							}
						}
					}
				}).result.then(function() {
					b.getMyScenes()
				}, function() {})
			});
		}
	}), 
	b.color_arry=['#eac8c1','#c1ead4','#d1bce2','#b8dee8','#e8e1af','#a7addb'],
	b.getStyle = function(a,i) {
		i = i || 0;
		i = i % 6;
		var c = b.color_arry[i];
		return {
			"background-image": "url(" + PREFIX_FILE_HOST + a + ")",
			"background-size": "cover",
			"background-color": c
		};
	}, b.totalItems = 0, b.page = {
		currentPage: 1
	}, b.toPage = "", b.name = null, b.EnterPress = function(a, c) {
		var d = a || window.event;
		13 == d.keyCode && b.submit(c)
	}, b.searchButton = !0;
	var u = {};
	b.submit = function(a) {
		b.name = a, f.getMyScenes(b.scene.type ? b.scene.type.value : null, r, b.pageSize, s, null, a), a && (b.searchButton = !1), u.refresh = !0
	}, b.changeName = function(a) {
		b.searchButton = !0, "" == a && u.refresh && f.getMyScenes(b.scene.type ? b.scene.type.value : null, r, b.pageSize, s, null, a)
	}, b.clearSearch = function() {
		b.searchButton = !0, b.name = "", f.getMyScenes(b.scene.type ? b.scene.type.value : null, r, b.pageSize, s)
	}, b.getMyScenes = function(a) {
		f.getMyScenes(b.scene.type ? b.scene.type.value : null, a, b.pageSize, s)
	}, b.getMyScenes(), b.$on("get.my.scene.list", function(c) {
		var d = f.scenes;
		d.list && d.list.length > 0 ? (b.myScenes = d.list, b.totalItems = d.map.count, b.page.currentPage = d.map.pageNo, b.allPageCount = d.map.count, b.toPage = d.map.pageNo, a.user && a.user.domain ? (b.url = a.user.domain, b.canvasUrl = "http://" + b.url) : (b.url = b.PREFIX_CLIENT_HOST, b.canvasUrl = b.url)) : (b.totalItems = 0, b.currentPage > 1 ? b.getMyScenes(--b.currentPage) : (b.myScenes = [], b.allPageCount = 0))
	}), b.deleteScene = function(a, c) {
		a && a.stopPropagation();
		var d = b.isAllowedHistory ? "确定删除此微课?删除后，该微课将在回收站保留3天" : "确定删除此微课?";
		i.openConfirmDialog({
			msg: d
		}, function() {
			f.deleteSceneById(c).then(function() {
				1 == b.myScenes.length && b.currentPage > 1 && b.currentPage--, b.getMyScenes(b.currentPage)
			})
		})
	}, b.pageChanged = function(a) {
		return 1 > a || a > b.totalItems / 10 + 1 ? void alert("此页超出范围") : (b.page.currentPage = a, void b.getMyScenes(a));
		console.log(b.page);
	}, b.getTdStyle = function(a) {
		var b = $(".header_table td:eq(" + a + ")").outerWidth();
		return {
			width: b + "px",
			maxWidth: b + "px"
		}
	}, b.scene.types = p.getSceneType(), b.dataDetail = {}, g.getDatas(s), g.getCustomDatas(s), b.$on("sceneDatas", function(a, c) {
		b.datasCount = c
	}), b.$on("customDatas", function(a, c) {
		b.customCount = c
	}), b.showDetail = function(a) {
		c.path("spread/share/" + a + "/socialShare")
	}, b.$on("$destroy", function() {
		e.setLoginSuccess(!1)
	}), b.publishScene = function(a, c) {
		if (a && a.stopPropagation(), !c.name) return void i.openMsgDialog({
			msg: "尚未设置标题，请设置后再执行此操作",
			btn: "去设置"
		}, function() {
			b.sceneSettings(a, c.id)
		});
		var d = window.open();
		h.publishScene(c.id).then(function(a) {
			if (a.data.success) {
				c.publishTime = (new Date).getTime(), l.pushForCurrentRoute("scene.publish.success", "notify.success");
				var e = b.canvasUrl + ("/v-" + c.code);
				d.location = e
			}
		})
	}, b.getRejectDetail = function(a) {
		a.stopPropagation(), c.path("/usercenter/message")
	}, b.viewDetail = function(d) {
		a.showSpreadTable = !1;
		b.$parent.showBranchSelect = !1;
		c.path("/main/spread/statistics/" + d);
		n.getSceneDetail(d, s);
		n.getSceneData(d, -6, 1, s);
		//n.getWebList(d, !0, s);
		var e = new Date;
		e = new Date(e.getTime() - 864e5)
	}
}]).directive("sysMsgAdjust", function() {
	return {
		restrict: "EA",
		link: function(a, b, c) {
			a.isSysMsgVeryShort = !1;
			var d = a.$watch(function() {
				return $(".messages", b).css("height")
			}, function(b) {
				"44px" === b && (a.isSysMsgVeryShort = !0)
			});
			b.bind("$destroy", function() {
				d()
			})
		}
	}
}).directive("selectPicker", function() {
	return {
		restrict: "EA",
		link: function(a, b, c) {
			b.selectpicker()
		}
	}
});