 angular.module("spread.share.expandWeb", []), angular.module("spread.share.expandWeb").controller("ExpandWebCtrl", ["$rootScope", "$scope", "$stateParams", "SpreadService", "ModalService", function(a, b, c, d, e) {
	var f = a.branchid;
	/*var g = function() {
			d.getWebList(b.sceneId, !0, f)
		};
	g(), */b.$on("webs.update", function(a) {
		b.expandWebs = d.expandWebs || []
	}), b.addExpandWeb = function(c) {
		c.unshift({
			name: b.scene.name + "_扩展" + (c.length + 1),
			url: b.selectedUrl,
			showCount: 0
		}), a.$broadcast("make.input.focus")
	}, b.deleteWeb = function(a, c) {
		e.openConfirmDialog({
			msg: "删除后微课原地址无法访问，相应数据无法查看。"
		}, function() {
			var e = {
				id: c.id,
				index: a
			};
			c.id ? d.deleteWeb(e) : b.expandWebs.splice(a, 1)
		})
	};
	var h;
	b.recordName = function(a) {
		h = a
	}, b.updateName = function(a) {
		var c = {
			sceneId: b.sceneId,
			name: a.name
		};
		if (a.id) {
			if (h == a.name) return;
			c.id = a.id
		}
		d.updateName(c).then(function(c) {
			c.data.success && (a.id || (a.id = c.data.obj.id, a.url = b.selectedUrl + "?qrc=" + a.id))
		}, function(a) {
			alert("服务器异常！")
		})
	}, b.qrcodeList = [{
		type: 1,
		name: "小（256px）",
		size: 256
	}, {
		type: 2,
		name: "中（512px）",
		size: 512
	}, {
		type: 3,
		name: "大（1024px）",
		size: 1024
	}], b.downloadQrcode = function(b) {
		a.$broadcast("download.canvas", b.size)
	}
}]);