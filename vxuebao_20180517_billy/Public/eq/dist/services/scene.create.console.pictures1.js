angular.module("scene.create.console.pictures1", ["services.file"]).factory("picturesCropService", ["$rootScope", "fileService", function(a, b) {
	var c, d = {},
		e = [],
		f = !1,
		g = 0,
		h = 0;
	return d.getCoordinateObj = function() {
		return c
	}, d.initCoordinateObj = function() {
		c = {
			ratio: null,
			items: []
		};
		for (var a = 0; 6 > a; a++) c.items.push({})
	}, d.setCropCount = function(a) {
		a ? g = a : g++
	}, d.getCropCount = function() {
		return g
	}, d.setCropping = function(a) {
		f = a
	}, d.getCropping = function() {
		return f
	}, d.cropImage = function(c) {
		b.cropImage(c).success(function(b) {
			if (b.success) {
				var d = {
					width: c.w,
					height: c.h,
					src: b.map.path,
					desc: "",
					index: b.map.index
				};
				e.push(d), h++, g === h && (g = h = 0, a.$broadcast("crop.complete.all", angular.copy(e)), e.length = 0)
			} else alert(b.msg), a.$broadcast("crop.fail")
		}).error(function() {
			alert("网络连接超时，请稍后重试"), a.$broadcast("crop.fail")
		})
	}, d.initCoordinateObj(), d
}]);