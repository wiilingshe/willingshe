angular.module("data.edit", ["services.usercenter", "services.i18nNotifications"]), angular.module("data.edit").controller("EditDataCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "dataService", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {
	b.sceneId = d.sceneId, b.sexOptions = [{
		id: 1,
		name: "男"
	}, {
		id: 2,
		name: "女"
	}], b.sex = b.sexOptions[0], b.isAllowedToAccessGrouping = f.isAllowToAccess(f.accessDef.GROUP_CUSTOMER);
	var m = a.branchid,
		n = {};
	b.getDataDetail = function(a) {
		j.getDataDetail(b.sceneId, m).then(function(a) {
			b.dataDetail = a.data.obj, n = a.data.obj, b.groupNames = b.dataDetail.group;
			var c = b.dataDetail.email,
				d = b.dataDetail.sex,
				e = b.dataDetail.mobile,
				f = b.dataDetail.tel;
			c ? b.formEmails = c.split(",") : b.formEmails = [""], e ? b.formMobiles = e.split(",") : b.formMobiles = [""], f ? b.formTels = f.split(",") : b.formTels = [""], d && ("男" == d ? b.sex = b.sexOptions[0] : b.sex = b.sexOptions[1])
		})
	}, "create" != b.sceneId && b.getDataDetail(b.sceneId), b.dataDetail || (b.dataDetail = {}, b.sex = null, b.formEmails = [""], b.formMobiles = [""], b.formTels = [""]), b.updateData = function(a, c, d) {
		var e = a.name,
			f = {};
		if ("email" == e || "mobile" == e || "tel" == e) {
			f[e] = "";
			var g, h = [];
			for (g = 0; g < c.length; g++) c[g] && h.push(c[g]);
			for (g = 0; g < h.length - 1; g++) f[e] += h[g] + ",";
			f[e] += h[g]
		} else f[e] = b.dataDetail[e];
		n[e] = f[e]
	}, b.updateSex = function(a) {
		var c = {};
		c.id = b.sceneId, 0 !== a.id ? c.sex = a.name : c.sex = "", n.sex = c.sex
	}, b.formEmails = [""], b.formMobiles = [""], b.formTels = [""], b.removeInputs = function(a, c, d) {
		if (d.length > 1) {
			if (!d[a]) return void d.splice(a, 1);
			d.splice(a, 1), b.updateData({
				name: c
			}, d)
		} else 1 === d.length && "" !== d[0] && (d[a] = "", b.updateData({
			name: c
		}, d))
	}, b.addInputs = function(a) {
		a.push("")
	}, b.saveData = function() {
		if (countCharacters(n.name) > 50) return void k.pushForCurrentRoute("customer.name.overflow", "notify.success");
		delete n.group, n && $.each(n, function(a, b) {
			"undefined" == b && (n[a] = null)
		});
		var a = "create" == b.sceneId ? !0 : !1;
		"create" == b.sceneId && delete n.id, j.saveData($.param(n), a).then(function(a) {
			a.data.success && (alert(l.instant("main.customer.SAVE_SUCCESS")), i.path("/main/customer"))
		})
	}, b.cancel = function() {
		i.path("/main/customer")
	}, b.groups = [], b.getGroups = function() {
		b.groups.length > 0 || j.getGroups().then(function(a) {
			b.groups = a.data.list
		}, function(a) {
			alert(l.instant("main.customer.SERVER_ERROR"))
		})
	}, b.getGroups(), b.deleteAssociation = function(a, c, d) {
		var e = {
			cId: a,
			gId: c
		};
		h.openConfirmDialog({
			msg: l.instant("main.customer.ENSURE_RELIEVE")
		}, function() {
			j.deleteAssociation(e).then(function(a) {
				if (a.data.success) for (var d = 0; d < b.groupNames.length; d++) b.groupNames[d].id == c && b.groupNames.splice(d, 1)
			}, function(a) {
				alert(l.instant("main.customer.SERVER_ERROR"))
			})
		})
	}, b.addGroup = function() {
		g.open({
			windowClass: "group-console",
			templateUrl: BASE_URL+"templates/main.console.group.tpl.html",
			controller: "AddGroupCtrl"
		}).result.then(function(a) {
			b.groups.push(a)
		}, function() {})
	};
	var o = [];
	b.assignGroup = function() {
		for (var a = [], c = 0, d = b.groups.length; d > c; c++) if (b.groups[c].selected) {
			o.push(b.groups[c].id);
			var e = {
				id: b.groups[c].id,
				name: b.groups[c].name
			};
			a.push(e)
		}
		if (!o.length) return void alert(l.instant("main.customer.SELECT_GROUP"));
		var f = {
			cIds: b.dataDetail.id,
			gIds: o
		};
		j.assignGroup(f).then(function(c) {
			if (c.data.success) {
				p();
				for (var d = 0; d < a.length; d++) if (b.groupNames.length > 0) for (var e = 0; e < b.groupNames.length && b.groupNames[e].id != a[d].id; e++) e == b.groupNames.length - 1 && b.groupNames.push(a[d]);
				else b.groupNames.push(a[d]);
				k.pushForCurrentRoute("data.assign.success", "notify.success")
			}
		}, function() {})
	}, b.deleteGroup = function(a, c) {
		h.openConfirmDialog({
			msg: l.instant("main.customer.ENSURE_DEL")
		}, function() {
			j.deleteGroup(a.id).then(function(d) {
				if (d.data.success) {
					p(), b.groups.splice(c, 1);
					for (var e = 0; e < b.groupNames.length; e++) b.groupNames[e].id == a.id && b.groupNames.splice(e, 1)
				}
			}, function(a) {
				alert(l.instant("main.customer.SERVER_ERROR"))
			})
		})
	};
	var p = function() {
			for (var a = 0, c = b.groups.length; c > a; a++) b.groups[a].selected = !1
		}
}]);