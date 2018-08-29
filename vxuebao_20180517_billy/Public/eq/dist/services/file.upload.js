angular.module("services.file.upload", ["angularFileUpload", "services.file"]).factory("uploaderService", ["$rootScope", "$http", "$interval", "FileUploader", "fileService", "$translate", function($rootScope, b, $interval, FileUploader, e, $translate) {
	var uploadUrl, fileUpload = {};
	fileUpload.uploader = function(b, e) {
		var limit = 6;
		(2 == b || 4 == b) && (uploadUrl = PREFIX_URL + "index.php?c=upfile&a=upload&bizType=0&fileType=" + b);
		var fileType, fileUploader = new FileUploader({
			url: uploadUrl,
			withCredentials: !0,
			queueLimit: limit,
			onAfterAddingAll: function(b) {
				$rootScope.$broadcast("uploadfiles.add");
				fileUploader.uploadAll();
			},
			onSuccessItem: function(d, e, f, g) {
				function cancleTimer() {
					$interval.cancel(timer)
				}
				var timer = $interval(function() {
					var data = null;
					if(d.progress >= 100){
						if(4 == b){
							data = {
								id: e.obj.id,
								src: e.obj.path,
								name: e.obj.name,
								size: e.obj.size
							};
						}else if(2 == b){
							data = {
								id: e.obj.id,
								url: e.obj.path,
								name: e.obj.name,
								size: e.obj.size
							}
						}else{
							data = {
								tmbPath: e.obj.tmbPath,
								id: e.obj.id,
								path: e.obj.path,
								name: e.obj.name
							}
						}
						$rootScope.$broadcast("thumbnailList.update", data);
						cancleTimer()

					}
				}, 100)
			}
		}),
			k = e || 5145728;

		if("0" == b || "1" == b){
			fileType = "|jpg|png|jpeg|bmp|gif|svg+xml|webp|";
		}else if("4" == b || "2" == b){
			fileType = "|wav|mp3|mpeg|";
		}

		fileUploader.filters.push({
			name: "imageFilter",
			fn: function(a, b) {
				var c = "|" + a.type.slice(a.type.lastIndexOf("/") + 1) + "|";
				return -1 !== fileType.indexOf(c)
			}
		}), fileUploader.filters.push({
			name: "imageSizeFilter",
			fn: function(a, b) {
				var c = a.size;
				console.log(k);
				return c >= k && alert($translate.instant("upload.SIZE_TIP1") + k / 1024 / 1024 + $translate.instant("upload.SIZE_TIP2")), k > c
			}
		}), fileUploader.filters.push({
			name: "fileNameFilter",
			fn: function(a, b) {
				return a.name.length > 50 && alert($translate.instant("upload.NAME_LENGTH")), a.name.length <= 50
			}
		});

		return fileUploader
	};
	return fileUpload;
}]);