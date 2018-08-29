angular.module("spread.dataCollect", []), angular.module("spread.dataCollect").controller("DataCollectCtrl", ["$rootScope", "$scope", "$timeout", "dataService", "ModalService", "i18nNotifications", function(a, b, c, d, e, f) {
	function g(a, c, e) {
		d.getDataBySceneId(a, c, e, l).then(function(a) {
			a.data.list.length > 0 && (k = a.data.list.shift().slice(1));
			for (var c = 0; c < a.data.list.length; c++) a.data.list[c].$$id = a.data.list[c][0], a.data.list[c].splice(0, 1);
			if (j.length < 1) for (c = 0; c < k.length; c++) j.push({
				title: k[c],
				selected: !1,
				id: c
			});
			if (b.dataShow.length > 0) for (b.dataShowList.length = 0, c = 0; c < b.dataShow.length; c++) for (var d = 0; d < b.dataHeaders.length; d++) b.dataShow[c].id == b.dataHeaders[d].id && (b.dataHeaders[d].selected = !0);
			else if (j.length > 0 && j.length < 8) for (c = 0; c < j.length; c++) j[c].selected = !0, isTimeColumnSelected = !0;
			else if (j.length > 7) for (var e = 0; 8 > e; e++) j[e].selected = !0;
			b.dataList = a.data.list, b.totalItems = a.data.map.count, b.page.currentPage = a.data.map.pageNo, b.toPage = a.data.map.pageNo, h(), b.totalItems < 1e3 ? b.showUp = !1 : (b.showUp = !0, o())
		})
	}
	function h() {
		b.dataShow.length = 0;
		for (var a = 0; a < j.length; a++) j[a].selected && (b.dataShow.push({
			title: j[a].title,
			selected: !0,
			id: j[a].id
		}), b.dataContain = !0);
		if (b.dataShow.length < 1) b.dataShowList.length = 0;
		else for (var c = 0; c < b.dataList.length; c++) {
			var d = b.dataShowList[c] = [];
			for (d.push(b.dataList[c].$$id), d.$$id = d[0], d.splice(0, 1), a = 0; a < b.dataShow.length; a++) {
				var e = b.dataShow[a].id;
				d.push(b.dataList[c][e])
			}
		}
		0 === b.dataShow.length ? b.dataContain = !1 : 1 == b.dataShow.length ? b.tdW = "100%" : 2 == b.dataShow.length ? b.tdW = "50%" : 3 == b.dataShow.length ? b.tdW = "33.3%" : 4 == b.dataShow.length ? b.tdW = "25%" : 5 == b.dataShow.length ? b.tdW = "20%" : 6 == b.dataShow.length ? b.tdW = "16.5%" : 7 == b.dataShow.length && (b.tdW = "14.5%")
	}
	b.totalItems = 0, b.page = {
		currentPage: 1
	}, b.toPage = "", b.dataList = [];
	var j = b.dataHeaders = [],
		k = [];
	b.dataShow = [], b.dataShowList = [];
	var l = a.branchid;
	b.branchEdit = !0, b.branchDelete = !0, b.branchExport = !0, c(function() {
		21 == b.user.type && (b.user.extPermi ? (/^([\d,]+,)?1(,[\d,]*)?$/.test(b.user.extPermi) ? b.branchEdit = !0 : b.branchEdit = !1, /^([\d,]+,)?2(,[\d,]*)?$/.test(b.user.extPermi) ? b.branchDelete = !0 : b.branchDelete = !1, /^([\d,]+,)?3(,[\d,]*)?$/.test(b.user.extPermi) ? b.branchExport = !0 : b.branchExport = !1) : (b.branchEdit = !1/*, b.branchDelete = !1, b.branchExport = !1*/))
	}, 100), b.selectHeader = function(a, b, c) {
		h()
	};
	var m = PREFIX_S3_URL + "index.php?c=scenedata&a=excel&flag=noheader&id=" + b.sceneId + (l ? "&user=" + l : ""),
		n = PREFIX_S3_URL + "index.php?c=scenedata&a=excel&id=" + b.sceneId + (l ? "&user=" + l : "");
	b.dataOutNoHeader = function() {
		location.href = m
	}, b.dataOutNoHeaderPage = function(a, c) {
		var d;
		d = m + (/\?/.test(m) ? "&" : "?") + "start=" + a + "&end=" + c, location.href = d, b.dataPageList = !1
	}, b.dataOutDirect = function() {
		location.href = n
	}, b.dataOutPage = function(a, c) {
		var d;
		d = n + (/\?/.test(n) ? "&" : "?") + "start=" + a + "&end=" + c, location.href = d, b.dataPageList = !1
	};
	var o = function(a, c) {
			b.dataPageNums = [], b.dataPageobg = {};
			for (var d = Math.ceil(b.totalItems / 10, 16), e = Math.ceil(d / 100, 16), f = 1; e + 1 > f; f++) b.start = 100 * (f - 1) + 1, b.end = 100 * f, f == e && (b.end = d), b.dataPageobg = {
				start: b.start,
				end: b.end
			}, b.dataPageNums.push(b.dataPageobg)
		};
	b.dataDelete = function(a, c) {
		var h, j;
		for (selectIds = [], i = 0; i < b.dataShowList.length; i++) b.dataShowList[i].selected && selectIds.push(b.dataShowList[i].$$id);
		return selectIds.length ? (h = {
			ids: selectIds
		}, j = "确认删除选中数据？", void e.openConfirmDialog({
			msg: j
		}, function() {
			d.deleteDataBySceneId(b.sceneId, h).then(function(a) {
				200 == a.data.code && (f.pushForCurrentRoute("data.delete.success", "notify.success"), b.allSelect.selected = !1, g(b.sceneId, b.page.currentPage, 10))
			})
		})) : void alert("您还没有选择数据")
	}, b.allSelect = {
		selected: !1
	}, b.selectAll = function() {
		for (var a = 0, c = b.dataShowList.length; c > a; a++) b.dataShowList[a].selected = b.allSelect.selected
	}, b.selectData = function(a) {
		a.selected || (b.allSelect.selected = !1)
	}, b.pageChanged = function(a) {
		return 1 > a || a > b.totalItems / 10 + 1 ? void alert("此页超出范围") : (b.allSelect.selected = !1, b.page.currentPage = a, void g(b.sceneId, a, 10))
	}, g(b.sceneId, b.page.currentPage, 10), b.clickDown = function() {
		$(".origin-ul").css({
			height: "auto"
		})
	}
}]);