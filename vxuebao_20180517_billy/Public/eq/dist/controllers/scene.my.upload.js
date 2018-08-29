angular.module("scene.my.upload", ["angularFileUpload"]);
angular.module("scene.my.upload").controller("UploadCtrl", ["$scope", "FileUploader", "fileService", "category", "$timeout", "$interval", function(a, b, c, d, e, f) {
	a.category = d;
	var g;
	g = a.category.scratch || a.category.headerImage || a.category.companyImg ? a.uploader = new b({
		url: PREFIX_URL + "index.php?c=upfile&a=upload&bizType=" + d.categoryId + "&fileType=" + d.fileType,
		withCredentials: !0,
		queueLimit: 1,
		onSuccessItem: function(b, c, d, e) {
			function g() {
				f.cancel(h), alert("上传完毕"), a.$close(c.obj.path)
			}
			a.progressNum = 0;
			var h = f(function() {
				a.progressNum < 100 ? a.progressNum += 15 : g()
			}, 100)
		}
	}) : a.uploader = new b({
		url: PREFIX_URL + "index.php?c=upfile&a=upload&bizType=" + d.categoryId + "&fileType=" + d.fileType,
		withCredentials: !0,
		queueLimit: 5,
		onCompleteAll: function() {
			function b() {
				f.cancel(c), alert("上传完毕"), a.$close()
			}
			a.progressNum = 0;
			var c = f(function() {
				a.progressNum < 100 ? a.progressNum += 15 : b()
			}, 100)
		}
	}), d.limitSize = d.limitSize || 5145728;
	var h, i = d.limitSize;
	"0" == d.fileType || "1" == d.fileType ? h = "|jpg|png|jpeg|bmp|gif|svg+xml|" : ("2" == d.fileType || "4" == d.fileType) && (h = "|mp3|mpeg|"), g.filters.push({
		name: "imageFilter",
		fn: function(a, b) {
			var c = "|" + a.type.slice(a.type.lastIndexOf("/") + 1) + "|";
			return -1 !== h.indexOf(c)
		}
	}), g.filters.push({
		name: "imageSizeFilter",
		fn: function(a, b) {
			var c = a.size;
			console.log(a)
			return c >= i && alert("上传文件大小限制在" + i / 1024 / 1024 + "M以内"), i > c
		}
	}), g.filters.push({
		name: "fileNameFilter",
		fn: function(a, b) {
			return a.name.length > 50 && alert("文件名应限制在50字符以内"), a.name.length <= 50
		}
	}), a.removeQueue = function() {}
}]);