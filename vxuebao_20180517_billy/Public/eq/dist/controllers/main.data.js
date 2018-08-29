angular.module("main.data", ["app.directives.dataDraggable", "customer.group", "services.i18nNotifications", "app.directives.customer","services.modal","security.login.toolbar","ui.bootstrap"]), angular.module("main.data").controller("CustomerCtrl", ["$translate", "$rootScope", "$scope", "$state", "$location", "$timeout", "dataService", "$modal", "ModalService", "i18nNotifications", "security", function(a, b, c, d, e, f, g, h, i, j, k) {
	c.PREFIX_URL = PREFIX_URL, c.isActive = "customer", c.select = 0, c.showBranchSelect = !0;
	var l = b.branchid;
	c.toPage = 1, c.model = {}, c.dataShow = "message", g.getCustomDatas(l), c.$on("customDatas", function(a, b) {
		c.customCount = b
	}), c.customer = {
		group: null,
		origin: null
	}, c.branchEdit = !0, c.branchDelete = !0, c.branchExport = !0, f(function() {
		21 == c.user.type && (c.user.extPermi ? (/^([\d,]+,)?1(,[\d,]*)?$/.test(c.user.extPermi) ? c.branchEdit = !0 : c.branchEdit = !1, /^([\d,]+,)?2(,[\d,]*)?$/.test(c.user.extPermi) ? c.branchDelete = !0 : c.branchDelete = !1, /^([\d,]+,)?3(,[\d,]*)?$/.test(c.user.extPermi) ? c.branchExport = !0 : c.branchExport = !1) : (c.branchEdit = !1, c.branchDelete = !1, c.branchExport = !1))
	}, 100), c.downLoad = function(a, b) {
		var c;
		c = PREFIX_S3_URL + "index.php?c=custom&a=exp" + (l ? "?user=" + l : ""), b && (c += (/\?/.test(c) ? "&" : "?") + "origin=" + b), a && (c += (/\?/.test(c) ? "&" : "?") + "groupId=" + a), location.href = c
	}, c.staticFileds = [], a(["main.customer.CUSTOMER_NAME", "main.customer.CUSTOMER_MOBILE", "main.customer.CUSTOMER_EMAIL", "main.customer.CUSTOMER_SEX", "main.customer.CUSTOMER_COMPANY", "main.customer.CUSTOMER_JOB", "main.customer.CUSTOMER_ADDRESS", "main.customer.CUSTOMER_TELEPHONE", "main.customer.CUSTOMER_WEBSITE", "main.customer.CUSTOMER_QQ", "main.customer.CUSTOMER_WECHAT", "main.customer.CUSTOMER_REMARK"]).then(function(a) {
		c.staticFileds = [{
			id: "name",
			name: a["main.customer.CUSTOMER_NAME"]
		}, {
			id: "mobile",
			name: a["main.customer.CUSTOMER_MOBILE"]
		}, {
			id: "email",
			name: a["main.customer.CUSTOMER_EMAIL"]
		}, {
			id: "sex",
			name: a["main.customer.CUSTOMER_SEX"]
		}, {
			id: "company",
			name: a["main.customer.CUSTOMER_COMPANY"]
		}, {
			id: "job",
			name: a["main.customer.CUSTOMER_JOB"]
		}, {
			id: "address",
			name: a["main.customer.CUSTOMER_ADDRESS"]
		}, {
			id: "tel",
			name: a["main.customer.CUSTOMER_TELEPHONE"]
		}, {
			id: "website",
			name: a["main.customer.CUSTOMER_WEBSITE"]
		}, {
			id: "qq",
			name: a["main.customer.CUSTOMER_QQ"]
		}, {
			id: "weixin",
			name: a["main.customer.CUSTOMER_WECHAT"]
		}, {
			id: "remark",
			name: a["main.customer.CUSTOMER_REMARK"]
		}]
	}), c.selectScene = function(b, d) {
		c.selectedSceneId = b, g.getSceneField(b).then(function(b) {
			c.fields = b.data.list, c.select = d, $(".list_attribute").html(a.instant("main.customer.DRAG_HERE"))
		})
	}, c.clickScene = function() {
		e.path("main")
	}, c.clickSpread = function() {
		e.path("main/spread")
	}, c.clickCustomer = function() {
		e.path("main/customer")
	}, c.editCustomer = function(a) {
		c.getDataDetail(a.id), c.editData = !0
	}, c.removeCustomer = function(b) {
		i.openConfirmDialog({
			msg: a.instant("main.customer.CONFIRM_TO_DELETE_DATA")
		}, function() {
			g.deleteDataById(b.id).then(function(a) {
				200 == a.data.code && j.pushForCurrentRoute("custom.data.delete", "notify.success"), 1 === c.customerDatas.length && c.model.currentPage > 1 ? c.getDataBySceneId(c.model.currentPage - 1, l, c.groupId, c.origin) : c.getDataBySceneId(c.model.currentPage, l, c.groupId, c.origin), g.getCustomDatas(l)
			})
		})
	}, c.addColor = function(a) {
		c.trIndex = a
	}, c.removeColor = function() {
		c.trIndex = -1
	}, c.totalItems = 0, c.model.currentPage = 0, c.toPage = "", c.pageChanged = function(b, d, e, f) {
		return 1 > b || b > c.totalItems / 10 + 1 ? void alert(a.instant("main.customer.PAGE_OVERFLOW")) : (c.model.currentPage = b, void c.getDataBySceneId(b, d, e, f))
	}, c.getDataBySceneId = function(a, b, d, e) {
		a || (a = 1), d && (c.groupId = d), e && (c.origin = e), g.getAllData(a, b, d, e).then(function(a) {
			c.customerDatas = a.data.list, c.totalItems = a.data.map.count, c.model.currentPage = a.data.map.pageNo, c.toPage = "", c.totalNum = Math.ceil(c.totalItems / a.data.map.pageSize)
		})
	}, c.getDataBySceneId(1, l, null, null), c.editCustom = function(a, b) {
		e.path("/main/customer/" + a.id)
	};
	var m = function() {
			g.getDataMessage(l).then(function(a) {
				c.dataMessage = a.data.list
			})
		};
	m(), c.sceneLoad = function(a) {
		var b = PREFIX_S3_URL + "index.php?c=scenedata&a=excel&flag=noheader&id=" + a + (l ? "&user=" + l : "");
		location.href = b
	}, c.importDatas = function() {
		g.getPremergeScenes(l).then(function(a) {
			c.importDatas = a.data.list, a.data.list.length > 0 && c.selectScene(a.data.list[0].ID, 0)
		})
	}, c.associateData = {};
	var n = !0;
	if (c.confirm = function() {
		n ? jQuery.isEmptyObject(c.associateData, {}) ? (alert(a.instant("main.customer.PLEASE_IMPORT_DATA")), n = !0) : (g.mergeSceneData(c.selectedSceneId, c.associateData).then(function() {
			alert(a.instant("main.customer.IMPORT_CUSTOMER_SUCCESS")), d.reload()
		}, function() {}), n = !1) : alert(a.instant("main.customer.DUPLICATE_CONFIRM"))
	}, c.importDatas(), c.isAllowedToAccessGrouping = k.isAllowToAccess(k.accessDef.GROUP_CUSTOMER), c.isAllowedToAccessGrouping) {
		c.allImages = {
			selected: !1
		}, c.selectAll = function() {
			for (var a = 0, b = c.customerDatas.length; b > a; a++) c.customerDatas[a].selected = c.allImages.selected
		}, c.selectCustomer = function(a) {
			a.selected || (c.allImages.selected = !1)
		}, c.groups = [], c.getGroups = function() {
			c.groups.length > 0 || g.getGroups(l).then(function(a, b) {
				c.groups = a.data.list
			}, function(a) {})
		}, c.getGroups(), c.getOrigins = function() {
			g.getOrigin(l).then(function(a) {
				c.origins = a.data.list
			}, function(b) {
				alert(a.instant("main.customer.SERVER_ERROR"))
			})
		}, c.getOrigins(), c.addGroup = function() {
			h.open({
				windowClass: "group-console console",
				templateUrl: BASE_URL+"templates/main.console.group.tpl.html",
				controller: "AddGroupCtrl"
			}).result.then(function(a) {
				c.groups.push(a), r(), j.pushForCurrentRoute("group.create.success", "notify.success")
			}, function() {})
		};
		var o = [],
			p = [];
		c.assignGroup = function() {
			o = [], p = [];
			for (var b = 0, d = c.customerDatas.length; d > b; b++) c.customerDatas[b].selected && o.push(c.customerDatas[b].id);
			for (b = 0, d = c.groups.length; d > b; b++) c.groups[b].selected && p.push(c.groups[b].id);
			if (!o.length) return void alert(a.instant("main.customer.NO_CUSTOMER_SELECTED"));
			if (!p.length) return void alert(a.instant("main.customer.NO_GROUP_SELECTED"));
			var e = {
				cIds: o,
				gIds: p
			};
			g.assignGroup(e).then(function(a) {
				a.data.success && (r(), c.allImages.selected = !1, q(), j.pushForCurrentRoute("data.assign.success", "notify.success"))
			}, function() {})
		}, c.deleteCustomer = function(b) {
			o = [];
			var d, e;
			if (b) d = {
				ids: b.id
			}, e = a.instant("main.customer.CONFIRM_TO_DELETE_DATA");
			else {
				for (var f = 0, h = c.customerDatas.length; h > f; f++) c.customerDatas[f].selected && o.push(c.customerDatas[f].id);
				if (!o.length) return void alert(a.instant("main.customer.NO_CUSTOMER_SELECTED"));
				d = {
					ids: o
				}, e = a.instant("main.customer.CONFIRM_TO_DELETE_DATA")
			}
			i.openConfirmDialog({
				msg: e
			}, function() {
				g.deleteCustomer(d).then(function(a) {
					a.data.success && (c.allImages.selected = !1, q(), r(), j.pushForCurrentRoute("data.delete.success", "notify.success"))
				}, function(b) {
					alert(a.instant("main.customer.SERVER_ERROR"))
				})
			})
		}, c.deleteGroup = function(b, d) {
			i.openConfirmDialog({
				msg: a.instant("main.customer.CONFIRM_TO_DELETE_GROUP")
			}, function() {
				g.deleteGroup(b.id).then(function(a) {
					a.data.success && (c.groups.splice(d, 1), r(), j.pushForCurrentRoute("group.delete.success", "notify.success"))
				}, function(b) {
					alert(a.instant("main.customer.SERVER_ERROR"))
				})
			})
		};
		var q = function() {
				1 === c.customerDatas.length && c.model.currentPage > 1 ? c.getDataBySceneId(c.model.currentPage - 1) : c.getDataBySceneId(c.model.currentPage)
			},
			r = function() {
				for (var a = 0, b = c.groups.length; b > a; a++) c.groups[a].selected = !1
			}
	}
	c.createData = function() {
		e.path("main/customer/create")
	}, c.sceneData = function() {
		c.dataShow = "dataIn"
	}, c.$watch("model.currentPage", function(a, b) {
		a && a != b && (c.model.toPage = a)
	}, !0)
}]);