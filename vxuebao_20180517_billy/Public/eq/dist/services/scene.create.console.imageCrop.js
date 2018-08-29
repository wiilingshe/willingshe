angular.module("scene.create.console.imageCrop", ["services.file"]);
angular.module("scene.create.console.imageCrop").factory("imageCropService", ["$rootScope", "fileService", function(a, b) {
	var c = {};
	return c.cropImage = function(c) {
		b.cropImage(c).success(function(b) {
			if (b.success) {
				var d = {
					width: c.w,
					height: c.h,
					src: b.map.path,
					id: b.map.id
				};
				a.$broadcast("crop.success", d)
			} else alert(b.msg), a.$broadcast("crop.fail")
		}).error(function() {
			alert("网络连接超时，请稍后重试"), a.$broadcast("crop.fail")
		})
	}, c
}]);