angular.module("scene.create.console.adr", []), angular.module("scene.create.console.adr").controller("AdrConsoleCtrl", ["$scope","obj",function($scope,obj) {
		//百度地图控制器
		$scope.mapSrc = obj.properties.mapSrc;
		$scope.replaceImage = function(j) {
			$scope.position = $("#position").val();
			function GetRequest(url) {
		  		var url = url;
		   		var theRequest = new Object();
		   		if (url.indexOf("?") != -1) {
			      	var str = url.substr(1);
			      	strs = str.split("&");
			      	for(var i = 0; i < strs.length; i ++) {
			         	theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
			      	}
		    	}
				return theRequest.markers.split(',');
			}
			if(!$scope.position) return void($scope.authError = "请输入地址");
			var zoomIndex = $scope.position.indexOf("zoom");
			var markersIndex = $scope.position.indexOf("markers");
			var douIndex = $scope.position.lastIndexOf(",");
			// var pointX = Number($scope.position.slice(markersIndex+8,douIndex));
			// var pointY = Number($scope.position.slice(douIndex+1));
			var pointX = GetRequest($scope.position)[0];
			var pointY = GetRequest($scope.position)[1];
			var zoom = Number($scope.position.slice(zoomIndex+5,markersIndex-1));
			var f=[];
			f.push({
				zoom:zoom,
				pointX:pointX,
				pointY:pointY,
				src:$scope.position
			});
			if($("#position").focus()) $scope.authError =null;
			$scope.$close(f);
		}
		,$scope.cancel = function() {
			$scope.$dismiss();
		}

	}])
/*angular.module("scene.create.console.audio", []), angular.module("scene.create.console.audio").controller("AudioConsoleCtrl", ["$scope", "$rootScope", "$sce", "$timeout", "$modal", "fileService", "obj", function(a, b, c, d, e, f, g) {
	function h(a) {
		f.getFileByCategory(a, 10, "2", "1").success(function(data) {
			data.success ? b.$broadcast("sounds.update", data) : alert(data.msg)
		}).error(function() {
			alert("网络连接超时，请稍后重试")
		})
	}
	function i(a) {
		f.getFileByCategory(a, 10, "2", "0").success(function(data) {
			data.success ? b.$broadcast("sounds.update", data) : alert(data.msg)
		}).error(function() {
			alert("网络连接超时，请稍后重试")
		})
	}
	a.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
	var j = a.sounds = [];
	a.pagination = {};
	a.getSounds = function(b) {
		a.isMySound ? i(b) : h(b)
	}, a.selectTab = function(b) {
		a.isMySound = b, a.getSounds()
	}, a.$on("sounds.update", function(b, c) {
		j.length = 0, $.each(c.list, function(a, b) {
			j.push({
				id: b.id,
				name: b.name,
				src: b.path,
				isPlaying: !1
			})
		});
		var d = c.map;
		a.pagination = {
			totalItems: d.count,
			pageSize: d.pageSize,
			currentPage: d.pageNo,
			numPages: Math.ceil(d.count / d.pageSize)
		}
	}), a.model = {
		bgAudio: {
			url: g.url ? g.url : "",
			type: g.type ? g.type : "3"
		},
		compType: "bgAudio"
	}, d(function() {
		"1" == g.type && g.url && (a.model.type1 = g.url), 
		"2" == g.type && g.url && (a.model.type2 = c.trustAsResourceUrl(PREFIX_FILE_HOST + g.url)), 
		"3" == g.type && g.url && (a.model.type3 = c.trustAsResourceUrl(PREFIX_FILE_HOST + g.url))
	}), a.goUpload = function() {
		e.open({
			windowClass: "upload-console",
			templateUrl: BASE_URL+"templates/my-upload.html",
			controller: "UploadCtrl",
			resolve: {
				category: function() {
					return {
						categoryId: 0,
						fileType: 2
					}
				}
			}
		}).result.then(function(a) {
			i()
		})
	}, a.playAudio = function(a) {
		$("#audition" + a)[0].play()
	}, a.pauseAudio = function(a) {
		$("#audition" + a)[0].pause()
	}, a.authError = "", a.confirm = function() {
		if ("1" == a.model.bgAudio.type) {
			if (!a.model.type1) {
				return $('input[type="text"]').focus(), 
				void(a.authError = "链接地址不能为空");
			}
			a.model.bgAudio.url = a.model.type1
		}
		if ("2" == a.model.bgAudio.type) {
			if (!a.model.selectedMyAudio) {
				return $("select").focus(), 
				void(a.authError = "您没有选择音乐");
			}
			a.model.bgAudio.url = a.model.selectedMyAudio.path
		}
		if ("3" == a.model.bgAudio.type) {
			if (!a.model.selectedAudio) {
				return $("select").focus(), 
				void(a.authError = "您没有选择音乐");
			}
			a.model.bgAudio.url = a.model.selectedAudio.path
		}
		a.$close(a.model)
	}, a.cancel = function() {
		a.$dismiss()
	}
}]);*/
angular.module("scene.create.console.bg", ["services.file", /*"scene.my.upload",*/ "app.directives.responsiveImage", "app.directives.rightclick", "services.file.upload", "services.i18nNotifications", "app.directives.autoclose"])
angular.module("scene.create.console.bg").controller("BgConsoleCtrl", ["$scope", "$modal", "ModalService", "sceneService", "fileService", "localizedMessages", "obj", "uploaderService", "i18nNotifications", "security", "dataCacheService", function($scope,$modal, ModalService, sceneService, fileService, localizedMessages, obj, uploaderService, i18nNotifications, security, dataCacheService) {//图片库 && 背景库
	$scope.mobileUploads = function(){//手机扫码上传
		var href = document.location.href;
		var wei = href.indexOf("?");
		var classId = href.substring(38, wei);
		$('#codeKuang').css('background','url("/assets/images/re-design/bg_code.jpg") no-repeat')
		$.ajax({
			type: 'GET',
			url: "http://" + window.location.host + "/index.php?c=scene&a=detail&id=" + classId,
			success: function(data) {
				console.log(data.token);
				$('#codePic').qrcode({
					text: "http://" + window.location.host + "/index.php?c=Mobile&token=" + data.token + "&type=0",
					width: 125,
					height: 125
				});
				window.ww = setInterval(function() {
					$.ajax({
						type: "GET",
						url: "http://" + window.location.host + "/index.php?c=Scene&a=mobfile&type=1",
						success: function(data) {
							if (data.code == "200") {
								console.log("success");
								document.getElementById("codeUpload").style.display = "none";
								document.getElementById("codeKuang").style.display = "none";
								document.getElementById("codePic").children[0].remove();
								sessionStorage.setItem("fileService", "");
								var c = "index.php?c=upfile&a=userList&"
								fileService.getUserFiles1(1, 18, 1);
							} else if (data.code == "400") {
								console.log("false")

							}
						}

					})
				}, 5000);
			}
		})
		$('#codeKuang').css('display','block');
		$('#codeUpload').css('display','block');
		$('#codeSound').css('display','none');
		$('#soundCode').css('display','none');
		$('#picCode').css('display','block');
		$('#codePic').css('display','block');
	}
	function updateImgList() {//更新图片库/背景库
		$scope.$watch("imgList", function(newVal) {
			for (var i = 0; i < newVal.length; i++) {
				if (newVal[i].selected){ 
					return void($scope.mangeObj.manageAll = !0);
				}
				$scope.mangeObj.manageAll = !1;
			}
		}, !0)
	}
	function init() {//初始化
		$scope.systemImages = !1, 
		$scope.userTagId = "", 
		$scope.sysCatId = "", 
		fileService.getUserFiles1(1, pageSize, fileType, null, $scope.userTagId)
	}
	var fileType = $scope.fileType = obj.fileType,
		pageSize, 
		pageNo = 1;
	$scope.type = obj.type,
	$scope.currentPage = 1, 
	$scope.systemImages = !0, 
	$scope.isAllowedHistory = security.isAllowToAccess(security.accessDef.USERCENTER_HISTORY), 
	$scope.toPage = 1, 
	$scope.mangeObj = {
		manageAll: !1
	}, $scope.showObj = {
		showGroup: !1
	}, 
	pageSize = $scope.pageSize = 21, 
	("p" == $scope.type || "n" == $scope.type) && ($scope.mangeObj.manageAll = !0), 
	$scope.showOld = {//新增图片分类列表
		showOG: !1
	};
	$scope.switchToSystemImages = function(bool) {
		$scope.systemImages = "true" === bool
	},
	$scope.getSysCategory = function(fileType) {
		fileService.getSysCategory(fileType);
	},
	$scope.getSystemFiles1 = function(pageNo, pageSize, fileType, sysCatId, sysTagId) {
		fileService.getSystemFiles1(pageNo, pageSize, fileType, sysCatId, sysTagId);
	};
	$scope.getSystemFiles = function() {
		if("0" != $scope.sysCatId){
			$scope.mangeObj.manageAll = !1, 
			window.localStorage && ("1" == $scope.fileType ? localStorage.setItem("photoTag", "") : localStorage.setItem("backgroundTag", "")), 
			$scope.userTagId = "", 
			$scope.sysCatId = "0", 
			$scope.sysTagList = [], 
			$scope.sysTagId = "", 
			imgDataList = [], 
			$scope.getSystemFiles1(pageNo, pageSize, fileType);
		}
	}, $scope.getHistory = function() {
		$scope.userTagId = "history";
		fileService.getFilesHistory(1).then(function(data) {
			data.data.success && ($scope.imgList = data.data.list)
		})
	}, $scope.$on("sysCategory.update", function(event) {
		$.get(categoryUrl, function (data) {
			$scope.sysCategoryList = data
		});
		//$scope.sysCategoryList = fileService.sysCategoryList
	}), $scope.getSysCatAndList = function(type) {
		searchVal = "";
		imgDataList = []; 
		$scope.sysCatId = type;
		if("0" != type && "pure" != type){
			fileService.getSysTagByCatId(type);
		}else{
			$scope.sysTagList = []; 
			$scope.sysTagId = ""; 
			angular.forEach($scope.imgList, function(item, index) {
				item.selected = !1
			});
		}
		$scope.getSystemFiles1(pageNo, pageSize, fileType, type);
	}, $scope.$on("sysTag.update", function(event) {
		$scope.sysTagList = fileService.sysTagList
	}), $scope.getSysImgByTag = function(sysTagId) {
		imgDataList = [], 
		$scope.sysTagId = sysTagId, 
		$scope.getSystemFiles1(pageNo, pageSize, fileType, $scope.sysCatId, sysTagId)
	}, $scope.$watch("currentPage", function(newVal, oldVal) {
		if(newVal != oldVal){
			$scope.toPage = newVal, 
			imgDataList = [], 
			$scope.systemImages ? $scope.getSystemFiles1(newVal, pageSize, fileType, $scope.sysCatId, $scope.sysTagId) : fileService.getUserFiles1(newVal, pageSize, fileType, null, $scope.userTagId)
		}
	}), $scope.getImgByPage = function() {
		$scope.currentPage = $scope.toPage
	}, $scope.getUserFiles = function(tagId, currentPage) {
		if(tagId !== $scope.userTagId){
			$scope.mangeObj.manageAll = !1;
			window.localStorage && ("1" == $scope.fileType ? localStorage.setItem("photoTag", tagId) : localStorage.setItem("backgroundTag", tagId));
			$scope.thumbnailList = [];
			imgDataList = [];
			$scope.userTagId = tagId;
			$scope.sysCatId = "";
			fileService.getUserFiles1(currentPage, pageSize, fileType, null, tagId);
		}
	}, $scope.$on("imgList.update", function(event) {
		$scope.imgList = fileService.imgList;
		$scope.totalItems = fileService.totalItems;
		$scope.currentPage = fileService.pageNo;

	});
	if (window.localStorage) {
		var localTag = "1" == $scope.fileType ? localStorage.getItem("photoTag") : localStorage.getItem("backgroundTag");
		if(localTag){
			$scope.getUserFiles(parseInt(localTag, 10));
			$scope.switchToSystemImages(!1);
			$scope.sysCatId = "";
		}else{$scope.getSystemFiles1(pageNo, pageSize, fileType);
			$scope.sysCatId = "0";
		}
	} else {
		$scope.getSystemFiles1(pageNo, pageSize, fileType)
	};
	$scope.getSysCategory(fileType);
	var w = null;
	$scope.createTag = function() {
		if($scope.tagList.length >= 8){
			return void($scope.authError = "最多能创建8个自定义分组！");
		}else{
			return void(w = $modal.open({
				windowClass: "console",
				templateUrl: BASE_URL+"templates/scene.console.category.tpl.html",
				controller: "CategoryConsoleCtrl"
			}));
		}
	};
	$scope.getTagList = function() {
		fileService.getTagList()
	},$scope.getTagList(), 
	$scope.deleteTag = function(tagId, index) {
		ModalService.openConfirmDialog({
			msg: "确定删除此分组?"
		}, function() {
			fileService.deleteTag(tagId, index)
		})
	}, $scope.$on("tagList.update", function(event) {
		$scope.tagList = fileService.tagList
	}), $scope.$on("tagList.delete", function(event) {
		init()
	});
	var imgDataList = [];
	$scope.switchSelect = function(img, shape, event, bool) {
		if ($scope.mangeObj.manageAll || !bool) {
			event.stopPropagation();
			img.selected = !img.selected;

			if ($scope.systemImages && "p" != obj.type && "n" != obj.type){ 
				angular.forEach($scope.imgList, function(item, index) {
					!item.selected || item.id == img.id && item.color == img.color || (item.selected = !1)
				});
				if (img.selected) {
					var thisImg;
					imgDataList = [], 
					img.path ? (thisImg = {
						id: img.id,
						src: img.path,
						shape: img.shape
					}) : (img.color && (thisImg = {
						color: img.color
					}));
					imgDataList.push(thisImg)
				} else {
					imgDataList = [];
				}
			}else{
				 if (img.selected){
					$scope.mangeObj.manageAll = !0;
					imgDataList.push({
						id: img.id,
						src: img.path || img.tmbPath,
						shape: img.shape
					})
				}else{
					for (var key in imgDataList) {
						imgDataList[key].id == img.id && imgDataList.splice(key, 1)
					}
				}
				
			}
		}else {
			updateImgList();
			for (var key in imgDataList) {
				imgDataList[key].id == img.id && imgDataList.splice(key, 1)
			}
		}
	}, $scope.cancelSelect = function() {
		for (var key in $scope.imgList) {
			$scope.imgList[key].selected && ($scope.imgList[key].selected = !1);
		}
		imgDataList = []
	}, $scope.assignTag = function(tag) {
		var idList = [];
		$scope.showObj.showGroup = !1;
		for (var i = 0; i < imgDataList.length; i++) {
			idList.push(imgDataList[i].id);
		}
		if (!idList.length) {
			return void($scope.authError = "请先点击管理选择一张图片再进行分组");
		}
		angular.forEach($scope.imgList, function(item, index) {
			item.selected = !1
		});
		var idArr = idList.join(",");
		dataCacheService.clear("fileService"), 
		fileService.assignTag(tag, idArr), 
		imgDataList = [];

	}, $scope.$on("tag.assign", function() {
		i18nNotifications.pushForCurrentRoute("data.assign.success", "notify.success")

	}), $scope.unbindTag = function(unbindId) {
		for (var idList = [], i = 0; i < imgDataList.length; i++) {
			idList.push(imgDataList[i].id);
		}
		if (!idList.length) {
			return void($scope.authError = "请先选择一张图片再解除分组");
		}
		var idArr = idList.join(",");
		dataCacheService.clear("fileService"), 
		fileService.unbindTag(unbindId, idArr);

	}, $scope.$on("tag.unbind", function() {
		i18nNotifications.pushForCurrentRoute("group.delete.data", "notify.success"), 
		fileService.getUserFiles1($scope.currentPage, pageSize, fileType, null, $scope.userTagId);

	}), $scope.deleteFile = function(delId) {
		var idList = [];
		if (!delId && 0 === imgDataList.length) {
			return void($scope.authError = "请您选中图片后再进行删除操作！");
		}

		for (var i = 0; i < imgDataList.length; i++) {
			idList.push(imgDataList[i].id);
		}

		var message = "";
		if($scope.isAllowedHistory){
			message = delId ? "确定删除此图片？删除后，该图片将在回收站保留3天" : "确定删除所选图片？删除后，该图片将在回收站中保留3天";
		}else{
			message = delId ? "确定删除此图片？" : "确定删除所选图片？";
		}

		var imgId = delId ? delId : idList.join(",");
		ModalService.openConfirmDialog({
			msg: message
		}, function() {
			fileService.deleteFile(imgId), 
			dataCacheService.clear("fileService");
		})
	},$scope.delAll = function(type){
		var pageNumber = $('#del_this_page').val();
		var arr = [];
		var time = new Date;
		$.ajax({
			type:'GET',
			url:PREFIX_URL + 'index.php?c=upfile&a=userList&pageNo='+pageNumber+'&pageSize=18&fileType='+type+'&time='+time.getTime(),
			success:function(data){
				console.log(data.list.length);
				for(i=0;i<data.list.length;i++){		
					arr.push(data.list[i].id);
				}
				var str = arr.join()
				console.log(arr)
				fileService.deleteFile(str), dataCacheService.clear("fileService")
			}
		})
		
	},$scope.$on("files.delete", function(event) {
		$scope.sysCatId = "", 
		imgDataList = [], 
		fileService.getUserFiles1($scope.currentPage, pageSize, fileType, null, $scope.userTagId);

	}), $scope.replaceImage = function() {
		if (!imgDataList.length) {
			return void($scope.authError = "请您先选择图片！");
		}

		var img;
		if ("p" != obj.type && "n" != obj.type) {
			if (imgDataList.length > 1) {
				return void($scope.authError = "只能选择一张图片进行替换！");
			};
			img = imgDataList[0]
		} else {
			var count = obj.count + imgDataList.length,
				number = "p" == obj.type ? 6 : 10;

			if (count > number) {
				return $scope.authError = "最多可选择" + (number - obj.count) + "张图片", !1;
			}

			$scope.picObj = [];
			for (var i = 0; i < imgDataList.length; i++) {
				$scope.picObj.push({
					width: imgDataList[i].shape.width,
					height: imgDataList[i].shape.height,
					src: imgDataList[i].src
				})
			}
		}

		var imgData = {};

		if(img && img.src){
			imgData = {
				type: "imgSrc",
				data: img.src,
				width: img.shape.width,
				height: img.shape.height,
				id: img.id
			}
		}

		if("0" == fileType){
			img.src ? $scope.$close(imgData) : $scope.$close({
					type: "backgroundColor",
					data: {
						color: img.color
					}
				});
		}else{
			("p" == obj.type || "n" == obj.type) && (imgData.selectedImages = $scope.picObj);
			$scope.$close(imgData);
		}
	}, $scope.replaceByClick = function(img, shape, event) {
		if (!$scope.mangeObj.manageAll) {
			if ("p" == obj.type || "n" == obj.type) {
				return void $scope.switchSelect(img, shape, event, !0);
			}

			imgDataList = [];
			if(!imgDataList.length && !$scope.mangeObj.manageAll || $scope.systemImages){
				if(img.path || img.tmbPath){
					imgDataList.push({
						id: img.id,
						src: img.path || img.tmbPath,
						shape: img.shape
					})
				}else{ 
					img.color && imgDataList.push({
						color: img.color
					})
				};
				$scope.replaceImage();
			}
		}
	};
	$scope.uploader = uploaderService.uploader(fileType);
	$scope.$on("uploadfiles.add", function(event) { //图片上传更新
		$scope.systemImages && init(), 
		dataCacheService.clear("fileService"), 
		$scope.imgList.length == pageSize && $scope.imgList.splice($scope.imgList.length - $scope.uploader.queue.length - 1, $scope.uploader.queue.length)
	});
	var uploadFiles;
	$scope.$on("thumbnailList.update", function(event, data) { //图片上传更新
		for (var i = 0; i < $scope.uploader.queue.length; i++) {
			if(100 == $scope.uploader.queue[i].progress){
				$scope.uploader.queue.splice(i, 1);
				uploadFiles = data;
				$scope.imgList.unshift(uploadFiles);
			}
		}
		dataCacheService.clear("fileService");
	}), $scope.$on("upload.bg.complete", function(event, data) {
		fileService.deleteFile(z.id);
		sceneService.openCropModal(data, function(callback) {
			z.tmbPath = callback.src, 
			z.id = callback.id, 
			$scope.imgList.unshift(z);
		}, function(event) {});

	}), $scope.cancel = function() {
		$scope.$dismiss();
	}, $scope.search = function() {
		searchVal = document.getElementById('search-value').value;//获取搜索的关键字
		searchUrl = '/index.php?c=upfile&a=syslist&pageNo=1&pageSize=21&fileType=' + fileType + '&bizType=0&key=' + searchVal;
		fileService.getPictures(0, 1, 21, 0, "0", 0); //执行请求函数
	}, window.enterSearchPic = function() {
		var myEvent = event || window.event || arguments.callee.caller.arguments[0];
		if (myEvent && myEvent.keyCode==13){
			searchVal = document.getElementById('search-value').value //获取搜索的关键字
			searchUrl = '/index.php?c=upfile&a=syslist&pageNo=1&pageSize=21&fileType=' + fileType + '&bizType=0&key=' + searchVal 
			fileService.getPictures(0, 1, 21, 0, "0", 0) //执行请求函数
		}
	}, $scope.$watch("userTagId", function(newVal, olaVal) {
		var url = PREFIX_URL + "index.php?c=upfile&a=upload&bizType=0&fileType=" + fileType;
		newVal && (url += "&tagId=" + newVal), $scope.uploader.url = url
	})
}]);
angular.module("scene.create.console.button", []), angular.module("scene.create.console.button").controller("ButtonConsoleCtrl", ["$scope", "obj", function($scope,obj) {//提交按钮 
		$scope.btnIndex = 0;
		$scope.model = {
			title: obj.properties.title
		}, $scope.authError = "";
		$scope.buttons = [{
			id: 1,
			text: "点击提交",
			btnStyle: {
				backgroundColor: "#08a1ef",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 2,
			text: "立即提交",
			btnStyle: {
				backgroundColor: "rgb(255, 255, 255)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(0, 0, 0)"
			}
		}, {
			id: 3,
			text: "提交信息",
			btnStyle: {
				backgroundColor: "#f6b223",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 4,
			text: "立即参加",
			btnStyle: {
				height: "30px",
				backgroundColor: "#333333",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 5,
			text: "提交表单",
			btnStyle: {
				height: "30px",
				backgroundColor: "#a0d86b",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 6,
			text: "马上订购",
			btnStyle: {
				height: "30px",
				backgroundColor: "#ff6666",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}], angular.forEach($scope.buttons, function(item, index) {
			if("" !== $scope.model.title && obj.css.backgroundColor && obj.css.backgroundColor == item.btnStyle.backgroundColor){
				$scope.btnIndex = index;
			}
		}), $scope.confirm = function() {
			if($scope.model.title && 0 !== $scope.model.title.length){
				return void $scope.$close($scope.model);
			}else{
				$scope.authError = "按钮名称不能为空";
				return void $('.bg_console input[type="text"]').focus();
			}
		}, $scope.cancel = function() {
			$scope.$dismiss();
		}, $scope.chooseTabButton = function(button, index) {
			$scope.model.title = button.text; 
			$scope.model.btnStyle = button.btnStyle; 
			$scope.btnIndex = index;

		}
	}]);
angular.module("scene.create.console.turnTo", []), angular.module("scene.create.console.turnTo").controller("TurnToConsoleCtrl", ["$scope", "obj", function($scope, obj) {//上一页&&下一页
		$scope.model = {
			title: obj.mType == "next" ? "下一页": "上一页"
		}, $scope.authError = "";
		$scope.buttons = [{
			id: "next",
			text: "下一页",
			btnStyle: {
				backgroundColor: "#08a1ef",
				height: "30px",
				"text-align": "center",
				lineHeight: "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: "pre",
			text: "上一页",
			btnStyle: {
				backgroundColor: "#08a1ef",
				height: "30px",
				"text-align": "center",
				lineHeight: "30px",
				color: "rgb(255, 255, 255)"
			}
		}], angular.forEach($scope.buttons, function(item, index) {
			if("" !== $scope.model.title && obj.mType && obj.mType == item.id){
				$scope.btnIndex = index;
			}
		}), $scope.confirm = function() {
			if($scope.model.title && 0 !== $scope.model.title.length){
				return void $scope.$close($scope.model);
			}else{
				$scope.authError = "按钮名称不能为空";
				return void $('.bg_console input[type="text"]').focus();
			}
		}, $scope.cancel = function() {
			$scope.$dismiss();
		}, $scope.chooseTabButton = function(button, index) {
			$scope.model.title = button.text;
			$scope.btnIndex = index;
		}
	}]);
angular.module("scene.create.console.category", ["services.file"]), angular.module("scene.create.console.category").controller("CategoryConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "fileService", function($scope, b, c, fileService) {
		$scope.category = {}, $scope.authError = "";
		$scope.confirm = function() {
			if($scope.category.name && $scope.category.name.trim()){
				if(countCharacters($scope.category.name) > 16){
					return void($scope.authError = "分类名称不能超过16个字符")
				}else{
					fileService.createTag($scope.category.name); 
					return void $scope.$close();
				}
			}else{
				return void($scope.authError = "请输入分类名称！");
			}
		}, $scope.cancel = function() {
			$scope.$dismiss()
		}
	}]);
angular.module("scene.create.console.counter", []), angular.module("scene.create.console.counter").controller("CounterConsoleCtrl", ["$scope", "obj", "$modal", function($scope, obj, $modal) {//计数
		$scope.model = {
			title: obj.title,
			properties: {
				layout: obj.properties.layout,
				size: obj.properties.size,
				color: obj.properties.color,
				icon: obj.properties.icon,
				imgSrc: obj.properties.imgSrc
			}
		}, 
		$scope.authError = "", 
		$scope.openImageModal = function() {
			$modal.open({
				windowClass: "img_console console",
				templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(img) {
				$scope.model.properties.icon = ""; 
				$scope.model.properties.imgSrc = obj.properties.imgSrc = img.data;
			}, function(a) {})
		}, $scope.confirm = function() {
			angular.extend(obj, $scope.model);
			var height = parseInt(obj.css.height, 10) || 0;

			if($scope.model.properties.imgSrc && 115 > height){
				$scope.model.btnStyle = {
					width: "320px",
					height: "115px",
					lineHeight: "115px",
					backgroundColor: "transparent"
				}
			}
			if("counter-lr" === $scope.model.properties.layout){
				!$scope.model.properties.imgSrc && 80 > height && ($scope.model.btnStyle = {
					height: "40px",
					lineHeight: "40px",
					width: "80px"
				});
				if($scope.model.properties.imgSrc && 155 > height){
					$scope.model.btnStyle = $scope.model.btnStyle || {};
					$scope.model.btnStyle.height = $scope.model.btnStyle.lineHeight = "155px";
				}
			}

			$scope.$close($scope.model);

		}, $scope.cancel = function() {
			$scope.$dismiss();

		}, $scope.chooseEqfont = function(icon) {
			$scope.model.properties.icon = icon;
			$scope.model.properties.imgSrc = null;
		}
	}]);
angular.module("scene.create.console.cropImage", ["services.file"]).directive("cropImage", ["sceneService", "fileService", "$compile", function(a, b, c) {
	return {
		restrict: "EAC",
		scope: {},
		replace: !0,
		templateUrl: BASE_URL+"templates/scene.console.cropimage.tpl.html",
		link: function(c, d, e) {
			function f() {
				if(o.css.width / o.css.height > m / n){
					k = parseInt(o.css.width * m / o.css.width, 10); 
					l = parseInt(o.css.height * m / o.css.width, 10);
				}else{
					k = parseInt(o.css.width * n / o.css.height, 10); 
					l = parseInt(o.css.height * n / o.css.height, 10);
				}
				var a = (m - k) / 2,
					b = (n - l) / 2,
					c = (m - k) / 2 + k,
					d = (n - l) / 2 + l;
				j = [0, 0, m, n];
				r = o.css.width / o.css.height;
				i = [a, b, c, d];
			}
			function g(a) {
				$(".cropWidth").html(parseInt(a.w, 10)); 
				$(".cropHeight").html(parseInt(a.h, 10));
			}
			c.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
			var h, i, j, k, l, m, n, o = a.currentElemDef,
				p = a.currentElemDef.properties.src,
				q = $("#target"),
				r = o.css.width / o.css.height;
			c.fit = !0, 
			c.lockRatio = !1, 
			c.$on("changeElemDef", function(a, b) {
				o = b, 
				c.fit = !0, 
				c.lockRatio = !1;
				if(o.properties.src != p){
					p = o.properties.src, 
					h.setImage(PREFIX_FILE_HOST + p), 
					q.unbind("load").attr("src", PREFIX_FILE_HOST + p).load(function() {
						m = this.width, 
						n = this.height, 
						c.preSelectImage(p), 
						c.$apply()
					})
				}else{
					c.preSelectImage(p);
					c.$apply();
				}
			}), c.preSelectImage = function(a) {
				if(h){
					f(); 
					h.setOptions({
						aspectRatio: r,
						setSelect: i
					});
				}else{
					q.attr("src", PREFIX_FILE_HOST + a).load(function() {
						m = this.width, 
						n = this.height, 
						q.Jcrop({
							onChange: g,
							keySupport: !1,
							setSelect: [0, 0, 100, 100],
							boxHeight: 320,
							boxWidth: 680
						}, function() {
							h = this
						}), 
						a && (f(), h.setOptions({
							aspectRatio: r,
							setSelect: i
						}))
					})
				}
			}, 
			c.preSelectImage(p), 
			c.$watch("lockRatio", function(a, b) {
				if (h) {
					var c = h.tellSelect();
					c.w = parseInt(c.w, 10), 
					c.h = parseInt(c.h, 10), 
					a ? h.setOptions({
						aspectRatio: c.w / c.h
					}) : h.setOptions({
						aspectRatio: null
					})
				}
			}), c.$watch("fit", function(a, b) {
				if (h) {
					if (a) {
						var c = h.tellSelect();
						c.x = parseInt(c.x, 10), 
						c.y = parseInt(c.y, 10), 
						c.x2 = parseInt(c.x2, 10), 
						c.y2 = parseInt(c.y2, 10), 
						j = [c.x, c.y, c.x2, c.y2], 
						h.setOptions({
							aspectRatio: r,
							setSelect: i
						});
					} else {
						h.setOptions({
							aspectRatio: null,
							setSelect: j
						});
					}
				}
			}), c.crop = function() {
				var c = a.currentElemDef,
					e = h.tellSelect();
				if(0 === e.w || 0 === e.h){
					return void $(d).hide();

				}else{
					e.x = parseInt(e.x, 10); 
					e.y = parseInt(e.y, 10); 
					e.w = parseInt(e.w, 10); 
					e.h = parseInt(e.h, 10);
					e.x2 = parseInt(e.x2, 10);
					e.y2 = parseInt(e.y2, 10);
					e.src = $("#target").attr("src").split(PREFIX_FILE_HOST)[1];
					return void b.cropImage(e).then(function(a) {
						var b = {
							type: "imgSrc",
							data: a.data.obj,
							width: e.w,
							height: e.h
						};
						c.properties.src = b.data;
						var f = b.width / b.height,
							g = $("#" + c.id),
							h = $("#inside_" + c.id).width(),
							i = $("#inside_" + c.id).height(),
							j = h / i;
						if(f >= j){
							i = h / f, 
							$("#inside_" + c.id).height(i), 
							c.css.height = i, 
							c.properties.height = i, 
							g.outerHeight(i), g.outerWidth(h), 
							g.css("marginLeft", 0), 
							g.css("marginTop", 0)
						}else{
							h = i * f, 
							$("#inside_" + c.id).width(h), 
							c.css.width = h, 
							c.properties.width = h, 
							g.outerWidth(h), 
							g.outerHeight(i), 
							g.css("marginTop", 0), 
							g.css("marginLeft", 0)
						};
						g.attr("src", PREFIX_FILE_HOST + b.data), 
						c.properties.imgStyle = {}, 
						c.properties.imgStyle.width = g.outerWidth(), 
						c.properties.imgStyle.height = g.outerHeight(), 
						c.properties.imgStyle.marginTop = g.css("marginTop"), 
						c.properties.imgStyle.marginLeft = g.css("marginLeft"), 
						$(d).hide()
					}, function(b) {
						c.properties.src || a.deleteElement(c.id)
					})
				}
			}, c.cancel = function() {
				$(d).hide()
			}
		}
	}
}]);
angular.module("scene.create.console.fake", []), angular.module("scene.create.console.fake").controller("FakeConsoleCtrl", ["$scope", "type", function(a, b) {
		a.type = b
	}]);
angular.module("scene.create.console.imageCrop").controller("imageCropCtrl", ["$translate", "$rootScope", "$scope", "imageCropService", "obj", "dataCacheService", function(a, $rootScope, $scope, d, obj, f) {
	var g;
	"square" == obj.type ? g = $scope.cropOption = {
		type: obj.type,
		title: "图片裁切",
		desc: "图片将按照要求的比例进行裁切",
		showItems: !1,
		imgSrc: obj.properties.src,
		cropItems: [{
			ratio: 1,
			desc: "正方形比例"
		}]
	} : 3 == obj.type ? g = $scope.cropOption = {
		type: obj.type,
		title: "背景裁切",
		desc: "背景图将按照要求的比例进行裁切",
		showItems: !1,
		imgSrc: obj.properties.src,
		cropItems: [{
			ratio: 640 / 1008,
			desc: "背景图比例"
		}]
	} : 4 == obj.type && (g = $scope.cropOption = {
		type: obj.type,
		title: "图片裁切",
		desc: "请根据你的需求，点击右侧常用比例进行裁切",
		showItems: !0,
		imgSrc: obj.properties.src,
		cropItems: [{
			value: 1,
			ratio: 0,
			desc: "原图比例"
		}, {
			value: 2,
			ratio: 1,
			desc: "1:1"
		}, {
			value: 3,
			ratio: 4 / 3,
			desc: "4:3"
		}, {
			value: 4,
			ratio: .75,
			desc: "3:4"
		}, {
			value: 5,
			ratio: 320 / 486,
			desc: "标准屏比例"
		}, {
			value: 6,
			ratio: 320 / 243,
			desc: "1/2屏比例"
		}, {
			value: 7,
			ratio: 320 / 162,
			desc: "1/3屏比例"
		}, {
			value: 8,
			ratio: -1,
			desc: "自定义",
			lock: !1
		}]
	}), 
	g.currentItem = g.cropItems[0], 
	$scope.cropItemChange = function(a) {
		null == a.lock && (g.cropItems[7].lock = !1), 
		g.currentItem = a, 
		$rootScope.$broadcast("cropItem.change", a);

	}, $scope.ok = function() {
		$rootScope.$broadcast("cropImage.ok", obj)

	}, $scope.cancel = function() {
		$scope.$dismiss(obj.properties.src)
	}
}]);
angular.module("scene.create.console.input", []), angular.module("scene.create.console.input").controller("InputConsoleCtrl", ["$scope","obj", function($scope, obj) {//输入框
	$scope.btnIndex = 0;
	var inputText = "输入框";
	$scope.buttons = [{
		id: 1,
		text: inputText,
		btnStyle: {
			/*height: "40px",*/
			backgroundColor: "#fff",
			"text-align": "center",
			borderWidth: "1",
			borderStyle: "solid",
			borderColor: "#08a1ef",
			color: "#08a1ef"
		}
	}, {
		id: 2,
		text: inputText,
		btnStyle: {
			/*height: "40px",*/
			backgroundColor: "#fff",
			"text-align": "center",
			borderWidth: "1",
			borderStyle: "solid",
			borderColor: "#666",
			color: "#666"
		}
	}, {
		id: 3,
		text: inputText,
		btnStyle: {
			/*height: "40px",*/
			backgroundColor: "#fff",
			"text-align": "center",
			borderWidth: "1",
			borderStyle: "solid",
			borderColor: "#f6b223",
			color: "#f6b223"
		}
	}, {
		id: 4,
		text: inputText,
		btnStyle: {
			/*height: "40px",*/
			backgroundColor: "#fff",
			"text-align": "center",
			borderWidth: "1",
			borderStyle: "solid",
			borderColor: "#000",
			color: "#000"
		}
	}, {
		id: 5,
		text: inputText,
		btnStyle: {
			/*height: "40px",*/
			backgroundColor: "#fff",
			"text-align": "center",
			borderWidth: "1",
			borderStyle: "solid",
			borderColor: "#a0d86b",
			color: "#a0d86b"
		}
	}, {
		id: 6,
		text: inputText,
		btnStyle: {
			/*height: "40px",*/
			backgroundColor: "#fff",
			"text-align": "center",
			borderWidth: "1",
			borderStyle: "solid",
			borderColor: "#f66",
			color: "#f66"
		}
	}];
	$scope.model = {
		title: obj.title,
		type: obj.type,
		required: obj.properties.required,
		btnStyle: $scope.buttons[0].btnStyle
	}, $scope.authError = "";
	angular.forEach($scope.buttons, function(item, index) {
		"" !== $scope.model.title && obj.css.borderColor && obj.css.borderColor == item.btnStyle.borderColor && ($scope.btnIndex = index)
	}), $scope.confirm = function() {
		if($scope.model.title && 0 !== $scope.model.title.length){
			return void $scope.$close($scope.model);
		}else{
			$scope.authError = "输入框名称不能为空";
			return void $('input[type="text"]').focus();
		}
	}, $scope.cancel = function() {
		$scope.$dismiss();
	}, $scope.chooseTabButton = function(input, index) {
		$scope.model.btnStyle = input.btnStyle; 
		$scope.btnIndex = index;
	}
}]);
angular.module("scene.create.console.link").controller("LinkConsoleCtrl", ["$scope", "obj", "sceneService",function($scope, obj, sceneService) {//右击添加链接
		$scope.url = {}, $scope.url.externalLink = "http://";
		var link;
		$scope.confirm = function() {
			if("external" == $scope.url.link){
				link = $scope.url.externalLink;
			}else{
				"internal" == $scope.url.link && (link = $scope.url.internalLink.id);
			};
			$scope.$close(link);
		}, $scope.cancel = function() {
			$scope.$dismiss()
		}, $scope.removeLink = function(b) {
			if("external" == b){
				$scope.url.externalLink = "http://";
			}else{
				"internal" == b && ($scope.url.internalLink = $scope.pageList[0]);
			}
			$scope.url.link = "";
		}, $scope.changed = function() {
			if("external" == $scope.url.link){
				$scope.url.internalLink = $scope.pageList[0];
			}else{
				$scope.url.externalLink = "http://";
			}
		}, $scope.selectRadio = function(b) {
			$scope.url.link || ("external" == b ? $scope.url.link = "external" : "internal" == b && ($scope.url.link = "internal"))

		}, $scope.getPageNames = function() {
			var sceneId = obj.sceneId;
			sceneService.getPageNames(sceneId).then(function(b) {
				$scope.pageList = b.data.list;
				$scope.pageList.unshift({
					id: 0,
					name: "无"
				});
				$scope.url.internalLink = $scope.pageList[0];
				angular.forEach($scope.pageList, function(item, index) {
					item.name || (item.name = "第" + item.num + "页");

					if(obj.properties.url && obj.properties.url == item.id){
						$scope.url.link = "internal";
						$scope.url.internalLink = item;
					}

				});
				if(obj.properties.url && isNaN(obj.properties.url)){
					$scope.url.link = "external"; 
					$scope.url.externalLink = decodeURIComponent(obj.properties.url.split("=")[2]);
				}
			})
		};
		$scope.getPageNames();
	}]);
angular.module("scene.create.console.linkComponent", []), angular.module("scene.create.console.linkComponent").controller("LinkComponentConsoleCtrl", ["$scope", "obj", "$modal", "sceneService", function($scope, obj, $modal, sceneService) {//横向导航栏增加链接
	$scope.btnIndex = 0;
	$scope.model = {
		title: obj.properties.title,
		imgSrc: obj.properties.imgSrc,
		url: {
			link: "external",
			externalLink: "http://"
		}
	};
	if(obj.properties.url){
		if(angular.isNumber(obj.properties.url)){
			$scope.model.url.link = "internal";
			$scope.model.url.internalLink = obj.properties.url;
		}else{
			$scope.model.url.link = "external";
			 $scope.model.url.externalLink = decodeURIComponent(obj.properties.url.split("=")[2]);
		}
	}
	$scope.authError = "", 
	$scope.buttons = [{
		id: 1,
		text: "点我购买",
		btnStyle: {
			width: "80px",
			backgroundColor: "rgb(250, 188, 61)",
			height: "30px",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}, {
		id: 2,
		text: "点开链接",
		btnStyle: {
			width: "80px",
			backgroundColor: "rgb(50, 190, 166)",
			height: "30px",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}, {
		id: 3,
		text: "马上购买",
		btnStyle: {
			width: "80px",
			backgroundColor: "rgb(224, 79, 95)",
			height: "30px",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}, {
		id: 4,
		text: "关注我们",
		btnStyle: {
			width: "80px",
			height: "30px",
			backgroundColor: "rgb(37, 183, 211)",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}], $scope.openImageModal = function() {
		$modal.open({
			windowClass: "img_console console",
			templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
			controller: "BgConsoleCtrl",
			resolve: {
				obj: function() {
					return {
						fileType: 1
					}
				}
			}
		}).result.then(function(b) {
			$scope.model.title = "", 
			$scope.btnIndex = -1, 
			$scope.model.btnStyle = {
				width: "115px",
				height: "115px",
				"line-height": "1",
				backgroundColor: "transparent"
			}, 
			$scope.model.imgSrc = obj.properties.imgSrc = b.data
		}, function(a) {})
	}, angular.forEach($scope.buttons, function(item, index) {
		if("" !== $scope.model.title && obj.css.backgroundColor && obj.css.backgroundColor == item.btnStyle.backgroundColor){
			$scope.btnIndex = index
		}

	}), $scope.confirm = function() {
		if(null != $scope.model.imgSrc || $scope.model.title && 0 !== $scope.model.title.length){
			if($scope.model.url.internalLink || $scope.model.url.externalLink){
				if("internal" === $scope.model.url.link){
					obj.properties.url = $scope.model.url.internalLink;
				}else{
					obj.properties.url = $scope.model.url.externalLink;
				}
				obj.properties.title = $scope.model.title;
				return void $scope.$close($scope.model);
			}else{
				return void($scope.authError = "链接不能为空")
			}
		}else{
			$scope.authError = "按钮名称不能为空";
			return void $("#buttonName").focus();
		}

	}, $scope.cancel = function() {
		$scope.$dismiss();

	}, $scope.chooseTabButton = function(button, index) {
		$scope.model.title = button.text;
		$scope.model.btnStyle = button.btnStyle;
		$scope.btnIndex = index;
		$scope.model.imgSrc = obj.properties.imgSrc = null;

	}, $scope.removeLink = function(str) {
		if("external" == str){
			$scope.model.url.externalLink = null;
		}else if("internal" == str){
			$scope.model.url.internalLink = 0;
		}
		$scope.model.url.link = "";

	}, $scope.changed = function() {
		if("external" == $scope.model.url.link){
			$scope.model.url.internalLink = 0;
		}else{
			$scope.model.url.externalLink = "http://";
		}

	}, $scope.selectRadio = function(str) {
		if("external" == str){
			$scope.model.url.link = "external";
		}else{
			"internal" == str && ($scope.model.url.link = "internal");
		} 
		$scope.changed();

	}, $scope.getPageNames = function() {
		var sceneId = obj.sceneId;
		sceneService.getPageNames(sceneId).then(function(b) {
			$scope.pageList = b.data.list;
			$scope.pageList.unshift({
				id: 0,
				name: "无"
			}), angular.forEach($scope.pageList, function(item, index) {
				item.name || (item.name = "第" + item.num + "页")
			});
			if(obj.properties.url && angular.isNumber(obj.properties.url)){
				$scope.model.url.link = "internal";
				$scope.model.url.internalLink = obj.properties.url;
			} 
		})
	},
	$scope.getPageNames();
}]);
/*angular.module("scene.create.console.map", ["app.directives.comp.editor"]), angular.module("scene.create.console.map").controller("MapConsoleCtrl", ["$scope", "sceneService", "$timeout", function(a, b, c) {
	var d = null,
		e = null;
	a.address = {
		address: "",
		lat: "",
		lng: ""
	}, a.search = {
		address: ""
	}, a.searchResult = [], c(function() {
		d = new BMap.Map("l-map"), d.addControl(new BMap.NavigationControl), d.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
		var b = {
			onSearchComplete: function(b) {
				e.getStatus() == BMAP_STATUS_SUCCESS && (a.searchResult = b.Fn, a.$apply())
			}
		};
		e = new BMap.LocalSearch(d, b)
	}), a.searchAddress = function() {
		e.search(a.search.address)
	}, a.setPoint = function(b, c, e) {
		a.address.address = e, a.address.lat = b, a.address.lng = c, d.clearOverlays();
		var f = new BMap.Point(c, b),
			g = new BMap.Marker(f);
		d.addOverlay(g);
		var h = new BMap.Label(e, {
			offset: new BMap.Size(20, -10)
		});
		g.setLabel(h), d.centerAndZoom(f, 12)
	}, a.resetAddress = function() {
		a.$close(a.address)
	}, a.cancel = function() {
		a.$dismiss()
	}
}]);*/
/*angular.module("scene.create.console.micro", ["app.directives.addelement", "services.scene"]), angular.module("scene.create.console.micro").controller("MicroConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj", "sceneService", function(a, b, c, d, e) {
	a.model || (a.model = {});
	var f = [];
	a.isSelected = [], a.backgroundColors = [{
		backgroundColor: "#D34141"
	}, {
		backgroundColor: "#000"
	}, {
		backgroundColor: "#23A3D3"
	}, {
		backgroundColor: "#79C450"
	}, {
		backgroundColor: "#fafafa"
	}], a.labelNames = [{
		id: 1,
		title: "栏目一",
		color: {
			backgroundColor: ""
		}
	}, {
		id: 2,
		title: "栏目二",
		color: {
			backgroundColor: ""
		}
	}, {
		id: 3,
		title: "栏目三",
		color: {
			backgroundColor: ""
		}
	}, {
		id: 4,
		title: "栏目四",
		color: {
			backgroundColor: ""
		}
	}], a.model.color = d.properties.labels[0].color.backgroundColor, a.selectColor = function(b) {
		a.model.color = b.backgroundColor, angular.forEach(a.labelNames, function(a, c) {
			a.color.backgroundColor && (a.color.backgroundColor = b.backgroundColor)
		})
	}, angular.forEach(d.properties.labels, function(b, c) {
		angular.forEach(a.labelNames, function(a, c) {
			b.id == a.id && (a.title = b.title, a.color.backgroundColor = b.color.backgroundColor, a.link = b.link, a.selected = !0, b.mousedown = !1)
		})
	}), a.confirm = function() {
		f = [];
		var b = 0,
			c = 0;
		angular.forEach(a.labelNames, function(a, d) {
			a.selected && (a.link ? f.push(a) : c++, b++)
		}), 2 > b ? alert("导航标签不能少于两个！") : c > 0 ? alert("每个导航必须有链接页面！") : a.$close(f)
	}, a.cancel = function() {
		a.$dismiss()
	}, a.switchLabel = function(b, c) {
		a.label = b, b.selected ? a.labelIndex == c ? (b.color.backgroundColor = "", b.selected = !1, b.mousedown = !1) : (a.labelIndex = c, b.mousedown = !0) : (b.color.backgroundColor = a.model.color, a.labelIndex = c, b.selected = !0, b.mousedown = !0), b.mousedown ? (a.model.title = b.title, b.link ? a.model.link = a.pageList[b.link] : a.model.link = a.pageList[0]) : (a.model.title = "", a.model.link = a.pageList[0])
	}, a.selectLink = function(b) {
		a.label.mousedown && (a.label.link = b.num, console.log(a.labelNames))
	}, a.changeLabelName = function() {
		a.label.mousedown && (a.label.title = a.model.title)
	}, a.getPageNames = function() {
		var b = d.sceneId;
		e.getPageNames(b).then(function(b) {
			a.pageList = b.data.list, a.pageList.unshift({
				id: 0,
				name: "无"
			}), angular.forEach(a.pageList, function(a, b) {
				a.name || (a.name = "第" + a.num + "页")
			}), a.model.link = a.pageList[0]
		})
	}, a.getPageNames()
}]);*/
/*angular.module("scene.create.console.pictures", ["services.file"]).controller("picturesCtrl", ["$scope", "$timeout", "$rootScope", "$modal", "picturesService", "obj", function(a, b, c, d, e, f) {
	var g = 530,
		h = 265,
		i = a.picStyles = utilPictures.getPicStyle();
	a.currentImageIndex = -1;
	var j = angular.copy(f),
		k = a.position = j.css;
	if (null != k.width && null != k.height) {
		var l = k.width / k.height,
			m = g / h;
		l > m ? (k.width = g, k.height = g / l) : (k.height = h, k.width = h * l)
	}
	var n = a.properties = j.properties;
	n.autoPlay = null == n.autoPlay ? !0 : n.autoPlay, n.interval = null == n.interval ? 2e3 : n.interval, n.picStyle = null == n.picStyle ? i[0] : utilPictures.getPicStyle(n.picStyle), n.bgColor = null == n.bgColor ? "rgba(255,255,255,1)" : n.bgColor, n.children = null == n.children ? [] : n.children, e.setImages(n.children), a.authError = "", a.choosePic = function() {
		return n.children.length >= 6 ? void(a.authError = "最多可选择6张图片") : void d.open({
			windowClass: "console img_console",
			templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
			controller: "BgConsoleCtrl",
			resolve: {
				obj: function() {
					return {
						fileType: 1,
						type: "p",
						count: n.children.length,
						elemDef: f
					}
				}
			}
		}).result.then(function(a) {
			$.each(a.selectedImages, function(a, b) {
				e.addImages({
					src: b.src,
					desc: "",
					height: b.height,
					width: b.width
				})
			})
		}, function() {})
	}, a.ok = function() {
		return 0 === n.children.length ? void(a.authError = "请选择图片") : (n.picStyle = n.picStyle.value, f.properties = n, void a.$close(n))
	}, a.cancel = function() {
		a.$dismiss()
	}, a.$on("currentImage.update", function(b, c) {
		a.currentImageIndex = c
	}), a.$on("images.add", function(a, b) {
		n.children = b
	}), a.$on("images.update", function(a, b) {
		n.children = b
	})
}]).factory("picturesService", ["$rootScope", "fileService", function(a, b) {
	var c, d, e = {},
		f = [];
	return e.setJcrop = function(b) {
		a.$broadcast("jcrop.update", b)
	}, e.setImageSize = function(b) {
		a.$broadcast("image.update", b)
	}, e.setCurrentImage = function(b) {
		d = b, a.$broadcast("currentImage.update", b)
	}, e.getCurrentImage = function() {
		return d
	}, e.addImages = function(b) {
		f.push(b), a.$broadcast("images.add", f)
	}, e.updateImages = function(b, c) {
		f.splice(b, 1, c), a.$broadcast("images.update", f)
	}, e.deleteImages = function(b) {
		f.splice(b, 1), a.$broadcast("images.update", f)
	}, e.setImages = function(a) {
		return f = a
	}, e.getImages = function() {
		return f
	}, e.setProperties = function(a) {
		c = a
	}, e.getProperties = function() {
		return c
	}, e.cropImage = function(c) {
		b.cropImage(c).success(function(b) {
			if (b.success) {
				var d = {
					width: c.w,
					height: c.h,
					desc: "",
					src: b.obj
				};
				a.$broadcast("crop.success", d)
			} else alert(b.msg)
		}).error(function() {
			alert("网络连接超时，请稍后重试")
		})
	}, e
}]).directive("eqxPicturesImageCrop", ["$compile", "picturesService", function(a, b) {
	return {
		link: function(c, d) {
			var e = $(d),
				f = $(".pic-preview"),
				g = {
					width: f.width(),
					height: f.height()
				};
			c.showOperation = !0;
			var h, i = '<div class="operation" ng-show="!showOperation"><a class="quxiao" ng-click="cropCancel()">取消</a><a class="finish" ng-click="cropOk()">完成</a></div>';
			c.$on("image.update", function(a, b) {
				h = {
					width: b.width,
					height: b.height
				}
			}), c.$on("jcrop.update", function(d, j) {
				f.append(a(i)(c)), c.showOperation = !0, c.$apply();
				var k = f.children("img"),
					l = {
						width: k.width(),
						height: k.height()
					};
				e.removeClass("hover").unbind("click").click(function() {
					var a = b.getImages();
					0 !== a.length && (c.showOperation = $(this).hasClass("hover"), c.showOperation ? ($(this).removeClass("hover"), j.release(), j.disable()) : ($(this).addClass("hover"), j.setSelect([0, 0, l.width, l.height]), j.enable()))
				}), c.cropOk = function() {
					var a = j.tellSelect();
					if (!(a.w === g.width && a.h === g.height || 0 === a.w && 0 === a.h)) {
						var c = h.width / l.width;
						a.w = parseInt(a.w * c, 10), a.h = parseInt(a.h * c, 10), a.x = parseInt(a.x * c, 10), a.y = parseInt(a.y * c, 10), a.x2 = parseInt((a.w + a.x) * c, 10), a.y2 = parseInt((a.h + a.y) * c, 10), a.src = k.attr("src").split(PREFIX_FILE_HOST)[1], b.cropImage(a)
					}
				}, c.cropCancel = function() {
					c.showOperation = !0, e.removeClass("hover"), j.release(), j.disable()
				}
			})
		}
	}
}]).directive("eqxPicturesImagePreview", ["picturesService", function(a) {
	return {
		link: function(b, c) {
			var d, e, f = $(c),
				g = $(".pic-preview"),
				h = {
					width: g.width(),
					height: g.height()
				},
				i = h.width / h.height;
			f.hide(), f.load(function() {
				f.show(), e = {
					width: this.width,
					height: this.height
				}, a.setImageSize(e);
				var b, c = e.width / e.height;
				c > i ? ($(this).css({
					width: h.width,
					height: h.width / c
				}), b = {
					position: "absolute",
					top: "50%",
					marginTop: -h.width / c / 2
				}) : ($(this).css({
					width: h.height * c,
					height: h.height
				}), b = {
					margin: "auto"
				}), f.Jcrop({
					keySupport: !1,
					aspectRatio: i
				}, function() {
					d = this
				}), $(".jcrop-holder").css(b), a.setJcrop(d), d.disable()
			})
		}
	}
}]).directive("eqxPicturesImageClick", ["$compile", "picturesService", function(a, b) {
	function c(b, c) {
		$(".pic-preview").html(a('<img eqx-pictures-image-preview ng-src="' + c + '" />')(b))
	}
	return {
		link: function(a, d) {
			var e = $(d);
			e.click(function() {
				if (!e.hasClass("hover")) {
					var d = e.index();
					b.setCurrentImage(d), c(a, $(this).find(".pic-img").attr("src"))
				}
			}), e.children(".delete-img").click(function(c) {
				c.stopPropagation(), e.hasClass("hover") && $(".pic-preview").empty();
				var d = e.index();
				b.deleteImages(d);
				var f = b.getCurrentImage();
				f > d ? b.setCurrentImage(--f) : d === f && b.setCurrentImage(-1), a.$apply()
			}), a.$on("crop.success", function(d, f) {
				if (e.hasClass("hover")) {
					var g = PREFIX_FILE_HOST + f.src;
					c(a, g);
					var h = e.index();
					b.updateImages(h, f)
				}
			})
		}
	}
}]);*/
angular.module("scene.create.console.pictures1").controller("pictures1Ctrl", ["$translate", "$rootScope", "$scope", "$modal", "picturesCropService", "obj", function($translate, $rootScope, $scope, $modal, picturesCropService, obj) {
	function makeCurImg(index) {
		picList.currentImage = {
			index: index,
			src: property.children[index].src + "?t=" + Date.now()
		}
	}
	function makePicList(index, src) {
		$("<img>").attr("src", PREFIX_FILE_HOST + src).load(function() {
			$.extend(CoordinateObj.items[index], {
				coordinate: {
					x: 0,
					y: 0,
					x2: this.width,
					y2: this.height,
					w: this.width,
					h: this.height,
					src: src,
					fileType: 1,
					index: index
				},
				realSize: {
					width: this.width,
					height: this.height
				}
			})
		})
	}
	var picList = $scope.imageOption = {
		title: "图集组件",
		desc: "通过图片裁切可制作超酷图集",
		showCrop: !1,
		showLoading: !1,
		currentImage: {
			index: -1,
			src: ""
		}
	},
	scale = $scope.cropOption = {
		showItems: !0,
		imgSrc: obj.properties.src,
		cropItems: [{
			value: 2,
			ratio: 1,
			desc: "1:1"
		}, {
			value: 3,
			ratio: 4 / 3,
			desc: "4:3"
		}, {
			value: 4,
			ratio: .75,
			desc: "3:4"
		}, {
			value: 5,
			ratio: 320 / 486,
			desc: "标准屏比例"
		}, {
			value: 6,
			ratio: 320 / 243,
			desc: "1/2屏比例"
		}, {
			value: 7,
			ratio: 320 / 162,
			desc: "1/3屏比例"
		}, {
			value: 8,
			ratio: -1,
			desc: "自定义",
			lock: !1
		}]
	};
	scale.currentItem = scale.cropItems[0];
	var picStyles = $scope.picStyles = utilPictures.getPicStyle(),
		object = angular.copy(obj),
		property = $scope.properties = object.properties;
	property.autoPlay = null == property.autoPlay ? !0 : property.autoPlay, 
	property.interval = null == property.interval ? 2e3 : property.interval, 
	property.picStyle = null == property.picStyle ? picStyles[0] : utilPictures.getPicStyle(property.picStyle), 
	property.bgColor = null == property.bgColor ? "rgba(255,255,255,0)" : property.bgColor, 
	property.children = null == property.children ? [] : property.children, 
	property.children.length > 0 && (picList.showCrop = !0, makeCurImg(0));

	for (var i = 0; 6 > i; i++) {
		property.children[i] ? makePicList(i, property.children[i].src) : property.children.push({});
	}

	var CoordinateObj = picturesCropService.getCoordinateObj();
	$scope.cropItemChange = function(item) {
		null == item.lock && (scale.cropItems[6].lock = !1); 
		scale.currentItem = item;
		$rootScope.$broadcast("cropItem.change", item);

	}, $scope.addPictures = function(event, index, more) {
		event.stopPropagation();
		var imgNum = 0;
		if(more){
			$.each(property.children, function(index, item) {
				item.src && imgNum++;
			})
		}else{
			imgNum = 5;
		}
		$modal.open({
			windowClass: "console img_console",
			templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
			controller: "BgConsoleCtrl",
			resolve: {
				obj: function() {
					return {
						fileType: 1,
						type: "p",
						count: imgNum,
						elemDef: obj
					}
				}
			}
		}).result.then(function(obj) {
			picList.showCrop = !0;
			var imgIndex = index,
				imgNum = 0,
				imgLength = property.children.length;
			if (more) {
				for (; imgLength > imgIndex;) {
					if (!property.children[imgIndex++].src) {
						var moreImg = obj.selectedImages[imgNum++];
						property.children[imgIndex - 1] = {
							src: moreImg.src,
							desc: "",
							height: moreImg.height,
							width: moreImg.width
						};
						makePicList(imgIndex - 1, moreImg.src);
						makeCurImg(index);
					}
					if (imgNum === obj.selectedImages.length) {
						break;
					}
					imgIndex === imgLength && (imgIndex = 0);
				}
			} else {
				var finalImg = obj.selectedImages[0];
				property.children[index] = {
					src: finalImg.src,
					desc: "",
					height: finalImg.height,
					width: finalImg.width
				};
				makePicList(index, finalImg.src);
				makeCurImg(index);
			}
		})
	}, $scope.setPicturesSize = function(objPro) {
		var num2, picWidth, picHeight, 
			proper = objPro.children[0],
			num = proper.width / proper.height;
		if(object.css.width || object.css.height){
			num2 = object.css.width / object.css.height;
			if(num > num2){
				picWidth = object.css.width;
				picHeight = picWidth / num;
			}else{
				picHeight = object.css.height;
				picWidth = picHeight * num;
			}
		}else{
			num2 = 2;
			if(num > num2){
				picWidth = 320;
				picHeight = picWidth / num;
			}else{
				picHeight = 160;
				picWidth = picHeight * num;
			}
		}
		obj.css.width = picWidth;
		obj.css.height = picHeight;
	}, $scope.delPicture = function(index) {
		property.children[index] = {};
		CoordinateObj.items[index] = {};
		if(index === picList.currentImage.index){
			picList.currentImage.index = -1;
			$rootScope.$broadcast("image.delete", index);
		}

	}, $scope.changePicture = function(index) {
		picList.currentImage.index !== index && makeCurImg(index);

	}, $scope.ok = function() {
		if(0 === property.children.length){
			return void(picList.desc = "请选择图片，最多添加6张");
		}else{
			return void(picturesCropService.getCropping() || (picList.showLoading = !0, $rootScope.$broadcast("cropImage.ok", property)));
		}

	}, $scope.cancel = function() {
		$scope.$dismiss();

	}, $scope.$on("crop.complete.all", function(event, data) {
		property.picStyle = property.picStyle.value;
		$.each(data, function(index, item) {
			property.children[item.index] = item
		});
		var newPro = angular.copy(property),
			newProKid = newPro.children;
		for (var i = 5; i >= 0; i--){
			newProKid[i].src || newProKid.splice(i, 1);
		}

		$scope.setPicturesSize(newPro);
		$scope.$close(newPro);

	}), $scope.$on("crop.fail", function() {
		picturesCropService.setCropping(!1);
		picList.showLoading = !1;
		
	})
}]);
angular.module("scene.create.console.ppt", ['angularFileUpload']), angular.module("scene.create.console.ppt").controller("PptCtrl", ["$scope", "$stateParams","$http","FileUploader","i18nNotifications","$state","$location", function($scope,$stateParams,$http,FileUploader,i18nNotifications,$state,$location) {//PPT上传
	var vm = $scope.vm = {};
	vm.values=[{value:'竖屏导入',way:'0'},{value:'横屏导入',way:'1'}];
	vm.selection=vm.values[0];
	var way=0;
	vm.change=function(index){
		way=index;
	};
	var c = "index.php?c=upfile&a=upload&bizType=0&fileType=0";
	var uploader = $scope.uploader = new FileUploader({
		url: PREFIX_URL + c
		// queueLimit: 1,
		// removeAfterUpload: true 
	});
	uploader.filters.push({
		name: 'imageFilter',
		fn: function(item /*{File|FileLikeObject}*/ , options) {
			var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	});
	// $scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
	//   uploader.clearQueue();
	// };
	uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
		console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function(fileItem) {
		console.info('onAfterAddingFile', fileItem);
	};
	uploader.onAfterAddingAll = function(addedFileItems) {
		console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function(item) {
			console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function(fileItem, progress) {
		console.info('onProgressItem', fileItem, progress);
	};
	uploader.onProgressAll = function(progress) {
		console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function(fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
		console.log(response);
	};
	uploader.onErrorItem = function(fileItem, response, status, headers) {
		console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function(fileItem, response, status, headers) {
		console.info('onCancelItem', fileItem, response, status, headers);
	};
	uploader.onCompleteItem = function(fileItem, response, status, headers) {
		console.info('onCompleteItem', fileItem, response, status, headers);
	};
	uploader.onCompleteAll = function() {
		console.info('onCompleteAll');
	};
	$scope.submitImages = function(){
		var urls=[];
		var obj=[];
		for(var i=0; i<uploader.queue.length; i++){
			obj[i] =JSON.parse(uploader.queue[i]._xhr.response);
			urls.push({url: obj[i].obj.path});
		};
		var req ={seceneId:$stateParams.sceneId,way:way,obj:urls};
		var c = PREFIX_URL + "index.php?c=scene&a=pptsave";
		return $http({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: req
		})
		.then(function(b) {
			if (b.data.code==200) {
				i18nNotifications.pushForCurrentRoute("scene.create.console.ppt.success", "notify.success");
				uploader.queue.length = 0;
				$scope.$dismiss();
				$state.go($state.current,{},{reload: true,location:false});
			}
			if(b.data.code==400){
				i18nNotifications.pushForCurrentRoute("scene.create.console.ppt.error", "notify.warning");
			}
		});
	};
	$scope.cancel = function() {
		$('console ppt_console').on('hide.bs.modal',function(e){
			 console.log('123245');
		});
		$scope.$dismiss();
	 };

}]);

angular.module("scene.create.console.psd", []), angular.module("scene.create.console.psd").controller("PsdCtrl", ["$scope", "$stateParams","$http","FileUploader","i18nNotifications","$state","$location","$timeout", "$rootScope","obj","ModalService", function($scope,$stateParams,$http,FileUploader,i18nNotifications,$state,$location,$timeout,$rootScope,obj, ModalService) {//PSD上传
		$scope.uploadFile = false;
		$scope.title = obj.type == "z" ? "PSD导入" : "视频上传";
		obj.type == "z" ? $scope.info = "文件最大不能超过40M!"  : $scope.info = "文件最大不能超过20M! 支持格式：.mp4";
		var fileName,xinxi;
		$scope.infoChange = function(){
			xinxi = document.getElementById("xinxi");
			fileName = document.getElementById("file-7").files[0].name;
			xinxi.innerHTML = fileName;
		}
		$scope.cancel = function() {
			$('console ppt_console').on('hide.bs.modal',function(e){

			});
			$scope.$dismiss();
		};
		$scope.submitImages = function(){
			$scope.uploadFile = true;
			if(fileName.indexOf(".psd") < 0 && fileName.indexOf(".mp4") < 0) {
				return obj.type=="z" ? alert("您上传的文件格式不支持，支持格式：.psd") : alert("您上传的文件格式不支持，支持格式：.mp4");
			}
			var fileObj = document.getElementById("file-7").files[0]; // 获取文件对象
			var FileController = fileName.indexOf(".psd") >= 0 ? "index.php?c=scene&a=psd" : "index.php?c=upfile&a=upload&bizType=0&fileType=5";                    // 接收上传文件的后台地址 
			// FormData 对象
			var form = new FormData();
			form.append("sceneid", $stateParams.sceneId);
			form.append("pageid", sessionStorage.getItem("pageid"));                        // 可以增加表单数据
			form.append("file", fileObj);                           // 文件对象
			
			//clear
			sessionStorage.setItem("pageid","");


			// XMLHttpRequest 对象
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", uploadProgress, false);
			xhr.addEventListener("load", uploadComplete, false);
			xhr.addEventListener("error", uploadFailed, false);
			xhr.addEventListener("abort", uploadCanceled, false);
			xhr.open("post", FileController, true);

			function uploadProgress(evt) {
				if (evt.lengthComputable) {
					var percentComplete = Math.round(evt.loaded * 100 / evt.total);
					document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
					document.getElementById('progressStick').style.width = percentComplete.toString() + '%';
					var progress = document.getElementById('progressNumber').innerHTML; 
					if(progress == '100%'){
						fileName.indexOf(".psd") >= 0 ? document.getElementById('jiema').innerHTML="上传成功，解码中，请稍后..." : document.getElementById('jiema').innerHTML = "保存中...";
					}
				}
				else {
					document.getElementById('progressNumber').innerHTML = 'unable to compute';
				}
			}

			function uploadComplete(evt) {
				if(fileName.indexOf(".psd") >= 0){
					var psdInfo = $.parseJSON(evt.target.responseText);
					//alert(psdInfo.msg);
					$scope.$close();
					(obj.type=="z") && $('#psd_transformation').css('display','block');
					(obj.type=="z") && $('.psd_transformation').eq(0).css('display','block');
					//$state.go($state.current,{},{reload: true,location:false});
					var int = setInterval(function(){
						$.ajax({
							type:"GET",
							url:"index.php?c=Scene&a=psdchange&psdid="+ psdInfo.obj.psdid,
							success:function(data){
								if(data.code == 200){
									clearInterval(int);
									(obj.type=="z") && $('#psd_transformation').css('display','none');
									(obj.type=="z") && $('.psd_transformation').eq(0).css('display','none');
									$state.go($state.current,{},{reload: true,location:false});
								}
							}
						})
					},3000);
				}else if(fileName.indexOf(".mp4") >= 0){
					ModalService.openActionResultDialog({
						msg: "上传视频成功！",
						success: !0,
						bgStyle: {
								backgroundColor: 'rgba(0,0,0,.3)',
								position: 'fixed',
								top: 0,
								bottom: '79px',
								left: '-180px',
								right: '-180px'
							}
					},function(){
						$scope.$close();
					});
				}
			}

			function uploadFailed(evt) {
				var psdInfo = $.parseJSON(evt.target.responseText)
				alert(psdInfo.msg);
			}

			function uploadCanceled(evt) {
				var psdInfo = $.parseJSON(evt.target.responseText)
				alert(psdInfo.msg);
			}
			xhr.send(form);
		}
	}])
angular.module("scene.create.console.radio.checkbox",[]).controller("RadioCheckboxConsoleCtrl", ["$translate", "$scope", "obj", "ModalService", function($translate, $scope,obj, ModalService) {
	function refresh(index) {
		var element = $("#optionGroupContainer"),
			optionGroup = element.find(".option-group").eq(index),
			num = 72,
			top = optionGroup.position().top;
		top > num && element.scrollTop(element.scrollTop() + (top - num))
	}
	var choices = JSON.parse(obj.choices);
	$scope.model = {
		title: obj.title,
		type: obj.type,
		options: choices.options,
		required: obj.properties.required
	}, $scope.buttons = [{
		id: 1,
		btnStyle: {
			backgroundColor: "#08a1ef",
			height: "30px",
			"line-height": "30px",
			borderWidth: "1px",
			borderStyle: "solid",
			borderColor: "#08a1ef",
			color: "rgb(255, 255, 255)"
		},
		properties: {
			titleStyle: {
				backgroundColor: "#08a1ef",
				color: "#ffffff"
			},
			optionStyle: {
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
				borderBottomColor: "#08a1ef"
			}
		}
	}, {
		id: 2,
		btnStyle: {
			backgroundColor: "#fff",
			height: "30px",
			"line-height": "30px",
			borderWidth: "1px",
			borderStyle: "solid",
			borderColor: "#fff",
			color: "rgb(0, 0, 0)"
		},
		properties: {
			titleStyle: {
				backgroundColor: "#fff",
				color: "#000"
			},
			optionStyle: {
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
				borderBottomColor: "#fff"
			}
		}
	}, {
		id: 3,
		btnStyle: {
			backgroundColor: "#f6b223",
			height: "30px",
			"line-height": "30px",
			borderWidth: "1px",
			borderStyle: "solid",
			borderColor: "#f6b223",
			color: "rgb(255, 255, 255)"
		},
		properties: {
			titleStyle: {
				backgroundColor: "#f6b223",
				color: "#ffffff"
			},
			optionStyle: {
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
				borderBottomColor: "#f6b223"
			}
		}
	}, {
		id: 4,
		btnStyle: {
			backgroundColor: "#333",
			height: "30px",
			"line-height": "30px",
			borderWidth: "1px",
			borderStyle: "solid",
			borderColor: "#333",
			color: "rgb(255, 255, 255)"
		},
		properties: {
			titleStyle: {
				backgroundColor: "#333",
				color: "#ffffff"
			},
			optionStyle: {
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
				borderBottomColor: "#333"
			}
		}
	}, {
		id: 5,
		btnStyle: {
			backgroundColor: "#a0d86b",
			height: "30px",
			"line-height": "30px",
			borderWidth: "1px",
			borderStyle: "solid",
			borderColor: "#a0d86b",
			color: "rgb(255, 255, 255)"
		},
		properties: {
			titleStyle: {
				backgroundColor: "#a0d86b",
				color: "#ffffff"
			},
			optionStyle: {
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
				borderBottomColor: "#a0d86b"
			}
		}
	}, {
		id: 6,
		btnStyle: {
			backgroundColor: "#ff6666",
			height: "30px",
			"line-height": "30px",
			borderWidth: "1px",
			borderStyle: "solid",
			borderColor: "#ff6666",
			color: "rgb(255, 255, 255)"
		},
		properties: {
			titleStyle: {
				backgroundColor: "#ff6666",
				color: "#ffffff"
			},
			optionStyle: {
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
				borderBottomColor: "#ff6666"
			}
		}
	}], angular.forEach($scope.buttons, function(item, index) {
		if(obj.properties.titleStyle && obj.properties.titleStyle.backgroundColor == item.properties.titleStyle.backgroundColor){
			$scope.btnIndex = index;
		}
	}), $scope.chooseTabButton = function(button, index) {
		$scope.model.btnStyle = button.btnStyle;
		$scope.btnIndex = index;
		$.extend(obj.css, {
			borderStyle: button.btnStyle.borderStyle,
			borderColor: button.btnStyle.borderColor
		})
	}, $scope.authError = "", 
	$scope.addNewOption = function(index) {//增加选项
		if($scope.model.options.length < 8){
			++choices.seq;
			$scope.model.options.splice(index + 1, 0, {
				id: choices.seq,
				label: "选项" + choices.seq
			});
			setTimeout(function() {
				refresh(index);
			});
		}else{
			ModalService.openMsgDialog({
				msg: "（您可以添加八个选项，每个选项最多请不要超过41字）",
				bgStyle: {
					position: 'fixed',
				    top: 0,
				    backgroundColor: 'rgba(0,0,0,.3)',
				    bottom: '-109px',
				    left: '-121px',
				    right: '-121px'
				}
			});
		}
	}, $scope.deleteTheOption = function(index) {//删除选项
		if($scope.model.options.length > 1){
			ModalService.openConfirmDialog({
				msg: "您确定要删除内容为“" + $scope.model.options[index].label + "”的选项？<br/>删除选项后，将导致该选项已收集的数据无法正确地显示。",
				bgStyle: {
					position: 'fixed',
				    top: 0,
				    backgroundColor: 'rgba(0,0,0,.3)',
				    bottom: '-109px',
				    left: '-121px',
				    right: '-121px'
				}
			}, function() {
				$scope.model.options.splice(index, 1)
			})
		}
	}, $scope.confirm = function() {
		if($scope.model.title && 0 !== $scope.model.title.length){
			angular.forEach($scope.model.options, function(data) {
				delete data.$$hashKey;
			});
			obj.choices = JSON.stringify(choices);
			obj.properties.required = $scope.model.required;
			($scope.btnIndex || 0 === $scope.btnIndex) && $.extend(obj.properties, $scope.buttons[$scope.btnIndex].properties);
			return void $scope.$close($scope.model);
		}else{
			$scope.authError = "输入框名称不能为空";
			return void $("#radioTitle").focus();
		}
	}, $scope.cancel = function() {
		$scope.$dismiss();
	}
}]);
angular.module("scene.create.console.randomevent", ["app.directives.responsiveImage"]), angular.module("scene.create.console.randomevent").controller("RandomEventCtrl", ["$scope", "$modal", "obj", function($scope, $modal, obj) {
		obj.properties.pics.length ? $scope.picList = obj.properties.pics : $scope.picList = [];
		$scope.delImage = function(index) {
			$scope.picList.splice(index, 1)
		};
		$scope.replaceImage = function(index) {
			$modal.open({
				windowClass: "console img_console",
				templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1,
							type: "n",
							count: 9,
							elemDef: obj
						}
					}
				}
			}).result.then(function(data) {
				$scope.picList[index] = data.selectedImages[0];
			}, function() {})
		}, $scope.choosePic = function() {
			if($scope.picList.length >= 10){
				return void($scope.authError = "最多可选择10张图片");
			}else{
				return void $modal.open({
					windowClass: "console img_console",
					templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
					controller: "BgConsoleCtrl",
					resolve: {
						obj: function() {
							return {
								fileType: 1,
								type: "n",
								count: $scope.picList.length,
								elemDef: obj
							}
						}
					}
				}).result.then(function(data) {
					$.each(data.selectedImages, function(index, item) {
						$scope.picList.unshift(item);
					})
				}, function() {})
			}
		}, $scope.confirm = function() {
			$scope.$close($scope.picList);
		}, $scope.cancel = function() {
			$scope.$dismiss();
		}
	}]).factory("randomEventService", ["$rootScope", function(a) {
		var b = {};
		return b
	}]);
angular.module("scene.create.console.rating", ["common.directives.inputColor"]), angular.module("scene.create.console.rating").controller("RatingConsoleCtrl", ["$scope","obj", function($scope,obj) {//选项-评分
		$scope.model = {
			title: obj.title,
			properties: {
				icon: obj.properties.icon,
				size: obj.properties.size,
				color: obj.properties.color,
				required: obj.properties.required
			}
		}, $scope.authError = "";
		$scope.confirm = function() {
			if($scope.model.title && 0 !== $scope.model.title.length){
				$.extend(!0, obj, $scope.model);
				return void $scope.$close($scope.model);
			}else{
				$scope.authError = "标题名称不能为空";
				return void $("#ratingTitle").focus();
			}
		}, $scope.chooseEqfont = function(type) {
			$scope.model.properties.icon = type;
		}, $scope.cancel = function() {
			$scope.$dismiss();
		}
	}]);
angular.module("scene.create.console.scene-setting-component").controller("SceneSettingComponentController", ["$q", "$stateParams", "$rootScope", "$scope", "sceneService","$modal", "usercenterService", "security", "pageTplService", "i18nNotifications", "ModalService", "sceneSettingCache", "memberHandler", "eqADTypeChoice", "staticResService", "sceneDataParseService", "dataCacheService", "fileService", "storageService","$location", function($q, $stateParams, $rootScope, $scope, sceneService, $modal, usercenterService, security, pageTplService, i18nNotifications, ModalService, sceneSettingCache, memberHandler, eqADTypeChoice, staticResService, sceneDataParseService, dataCacheService, fileService, storageService,$location) {
	$scope.islongpage = !!$stateParams.islongpage;
	$scope.isShowSetting = (("show" == $location.search().openSetting) || $stateParams.islongpage && $location.path().indexOf("openSetting=show") >=0) ? !0 : !1;
	function switchToAdState(type, bool) {
		switch (type) {
			case eqADTypeChoice.HIDE:
				$scope.eqShowType = sceneShowType.EQHIDE, 
				$scope.scene.property.eqAdType = eqADTypeChoice.HIDE, 
				$scope.scene.property.hideEqAd = !0;
				break;
			case eqADTypeChoice.DEFAULT_BOTTOM:
				$scope.eqShowType = sceneShowType.EQLINK, 
				$scope.scene.property.eqAdType = eqADTypeChoice.DEFAULT_BOTTOM, 
				$scope.scene.property.hideEqAd = !1;
				break;
			case eqADTypeChoice.CUSTOM_BOTTOM:
				$scope.eqShowType = sceneShowType.EQLINK, 
				$scope.scene.property.eqAdType = eqADTypeChoice.CUSTOM_BOTTOM, 
				$scope.scene.property.hideEqAd = !1;
				break;
			default:
			case eqADTypeChoice.FREEPAGE:
				$scope.eqShowType = sceneShowType.EQFREE, 
				$scope.scene.property && ($scope.scene.property.eqAdType = eqADTypeChoice.FREEPAGE, $scope.scene.property.hideEqAd = !1)
		};
		if(bool){
			$scope.$broadcast("changeView", !1,$scope.isShowSetting);
			sceneDataParseService.changeBottomType($scope.eqShowType, $scope.scene.property.lastPageId, $scope.scene.property.bottomLabel, $scope.scene.property.eqAdType);
		}
	}
	function saveSceneSettings(scene) {
		if($scope.isFormerScene && $scope.adSpend == memberHandler.getPriceByADType($scope.scene.property.eqAdType)){
			delete $scope.scene.property.eqAdType;
		}

		if(angular.isObject($scope.scene.property)){
			$scope.scene.property = angular.toJson($scope.scene.property);
		}

		if(angular.isString($scope.scene.type)){
			$scope.scene.type = parseInt($scope.scene.type, 10)
		}

		if($scope.scene.loadingLogo === !1){
			delete $scope.scene.loadingLogo;
		}

		if($scope.$parent.scene.bgAudio){
			if(angular.isObject($scope.$parent.scene.bgAudio)){
				$scope.scene.bgAudio = JSON.stringify($scope.$parent.scene.bgAudio);
			}else{
				$scope.scene.bgAudio = $scope.$parent.scene.bgAudio;
			}
		};
		sceneService.saveSceneSettings($scope.scene).then(function(data) {
			if(200 == data.data.code){
				i18nNotifications.pushForCurrentRoute("scene.setting.success", "notify.success");
				$scope.$parent.sceneSetting.showFlag = !1; 
				$scope.$parent.sceneSetting.oldBgAudio != $scope.scene.bgAudio && fileService.saveFilesHistory(JSON.parse($scope.scene.bgAudio).id, 2).then(function() {
					dataCacheService.clear("fileService1");
				});
				$scope.$parent.sceneSetting.oldBgAudio = $scope.scene.bgAudio;
				if(data.data.obj){
					angular.copy(data.data.obj, sceneService.getCurrentScene());
				}else{
					angular.copy($scope.scene, sceneService.getCurrentScene());
				}
				defer.resolve(data);
			}else{
				ModalService.openMsgDialog({
					msg: data.data.msg
				}, function() {}); 
				angular.isString($scope.scene.property) && ($scope.scene.property = JSON.parse($scope.scene.property));
				$scope.scene.type = "" + $scope.scene.type; 
				defer.reject(data);
			}
		}, function(data) {
			$scope.invalidText = data;
			defer.reject(data);
		})
	}
	$scope.isVipUser = memberHandler.isVipUser, 
	$scope.oriSceneState = !1, 
	$scope.sceneState = !1;
	var defer = $q.defer();
	$scope.setPhoneCtrl = function() {
		var pageMode = $scope.scene.pageMode;
		if(0 === pageMode || 1 == pageMode || 2 == pageMode || 6 == pageMode || 7 == pageMode || 8 == pageMode || 11 == pageMode || 12 == pageMode){
			$scope.phonePageMode = "NS";
		}else{
			$scope.phonePageMode = "EW";
		}
	};
	var typeList = ["101", "102", "103", "104", "105", "106"];
	if($scope.scene){
		$scope.scene.accessCode ? $scope.sceneStatue = 3 : $scope.sceneStatue = $scope.scene.status;
		$scope.appendActive = !! $scope.scene.promIds;
		$scope.loadingLogo = !! $scope.scene.loadingLogo;
		-1 == typeList.indexOf($scope.scene.type + "") && ($scope.scene.type = "101");
		$scope.setPhoneCtrl();
	}else{
		$scope.$watch("sceneId", function(newVal, oldVal) {
			if(newVal != oldVal){
				$scope.scene.accessCode ? $scope.sceneStatue = 3 : $scope.sceneStatue = $scope.scene.status;
				$scope.loadingLogo = !! $scope.scene.loadingLogo;
				$scope.appendActive = !! $scope.scene.promIds;
				-1 == typeList.indexOf($scope.scene.type + "") && ($scope.scene.type = "101");
				$scope.setPhoneCtrl();
			}
		})
	};
	$scope.$watch("scene", function(newVal, oldVal) {
		newVal != oldVal && ($scope.oldScene = JSON.stringify($scope.scene))
	}), $scope.closeSetting = function() {
		if(JSON.stringify($scope.scene) != $scope.oldScene){
			ModalService.openConfirmDialog({
				msg: "设置内容有变化，是否确认修改"
			}, function() {
				$scope.saveSceneSettings($scope.scene)
			}, function() {
				$scope.sceneSetting.showFlag = !1
			})
		}else{
			$scope.sceneSetting.showFlag = !1;
		}
		eqShow.stopSnowFly && clearInterval(eqShow.stopSnowFly);
		eqShow.stopFallingObject && clearInterval(eqShow.stopFallingObject);
		eqShow.stopFireworkEffect && eqShow.stopFireworkEffect();

	}, $scope.sceneSetting.saveSceneSetting = function() {
		defer = $q.defer();
		$scope.saveSceneSettings($scope.scene);
		return defer.promise;

	};
	$scope.isAllowToAccessLastPageSetting = security.isAllowToAccess(security.accessDef.SCENE_HIDE_LASTPAGE_SETTING);
	$scope.isAllowedToAccessNewPageFlip = security.isAllowToAccess(security.accessDef.ACCESS_NEW_PAGEFLIP);
	(2 === security.currentUser.type || 21 === security.currentUser.type) && memberHandler.initUserMemberDetail();

	var SceneSettingTab = {
		SHARE_SCENE: "shareScene",
		LOADING_LOGO: "loadingLogo",
		EQSHOW: "eqShow"
	},
	sceneShowType = {
		EQFREE: "eqFree",
		EQLINK: "eqLink",
		EQHIDE: "eqHide"
	};

	$scope.eqSceneSettingTabs = SceneSettingTab, 
	$scope.eqSceneSettingCurrent = SceneSettingTab.SHARE_SCENE,
	$scope.eqShowType = sceneShowType.EQFREE, 
	$scope.eqADTypeChoice = eqADTypeChoice, 
	$scope.switchToAdState = switchToAdState, 
	$scope.adSpend = 0, 
	$scope.isFormerScene = !1, 
	$scope.nextPage = function() {
		sceneDataParseService.app.nextPage();
		$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);

	}, $scope.prePage = function() {
		sceneDataParseService.app.prePage();
		$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);

	}, 

	$scope.showPhoneTitle = !0, 

	$scope.changeSceneName = function() {
		sceneDataParseService.changeSceneName($scope.scene.name)

	}, $scope.$on("changeView", function(event, data) {
		$scope.showPhoneTitle = !data

	}), 
	$scope.PREFIX_FILE_HOST = PREFIX_FILE_HOST, 
	$scope.alwaysOpen = !0;

	$scope.changeView = function() {
		$rootScope.$broadcast("changeView", !0, $scope.isShowSetting);

	}, $scope.changeTagId = function() {
		if($scope.$parent.scene.tagId){
			$scope.scene.tagId = $scope.$parent.scene.tagId;
			i18nNotifications.pushForCurrentRoute("already.apply.discovery", "notify.success");
		}
	},/* $scope.changeAppendActive = function(a) {
		if ($scope.oldSceneApplyState.promIds && ($scope.scene.promIds !== $scope.oldSceneApplyState.promIds || !$scope.appendActive)) {
			return $scope.appendActive = !0, void ModalService.openMsgDialog({
				msg: "该微课已经参与活动，不可参与其他活动；请复制该微课展示后，再次选择参与活动。"
			});
		}
		var b;
		if(a || !$scope.appendActive || (b = storageService.get("appendActive"), b && -1 != b.split(",").indexOf($rootScope.user.id))){
			a || $scope.appendActive || !$scope.scene.promIds || sceneDataParseService.removeActivePage();
			if(a){
				$scope.appendActive = !0;
				$scope.showActiveTip = !1;
				if($scope.hideActiveTip){
					b = storageService.get("appendActive");
					b ? (b += "," + rootScope.user.id) : (b = rootScope.user.id);
					storageService.push("appendActive", b);
				}
			}
			return void($scope.appendActive || ($scope.scene.promIds = null, $scope.activityPageTpls = []))
		}else{
			return $scope.appendActive = !1, void($scope.showActiveTip = !0);
		}
	},*/ $scope.changeLoop = function() {
		$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);
		sceneDataParseService.app.setTriggerLoop($scope.scene.property.triggerLoop);

	}, $scope.changetanmu = function() {
		$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);
		sceneDataParseService.app.setTriggerLoop($scope.scene.property.iftanmu);

	}, $scope.changePageMode = function() {
		$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);
		$scope.setPhoneCtrl();
		sceneDataParseService.changeScrollMode($scope.scene.pageMode);

	}, $scope.changeProgess = function() {
		$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);
		$rootScope.$broadcast("processBar", $scope.scene.property.slideNumber);

	}, $scope.changeCode = function() {
		$rootScope.$broadcast("changeView", !1,$scope.isShowSetting);
		$rootScope.$broadcast("passPanelSwitch", $scope.scene.isAccessCode);

	}, $scope.changeLogo = function() {
		$scope.loadingLogo = !$scope.loadingLogo;
		$scope.loadingLogo || delete $scope.scene.loadingLogo;
		$rootScope.$broadcast("showLoading", $scope.loadingLogo, $scope.scene.loadingLogo);

	}, $scope.changeBottomLabel = function() {
		sceneDataParseService.changeBottomType($scope.eqShowType, $scope.scene.property.lastPageId, $scope.scene.property.bottomLabel, $scope.scene.property.eqAdType);

	}, $scope.changeAutoFlip = function() {
		$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);
		if($scope.scene.property.autoFlip){
			sceneDataParseService.app.startAutoFlip($scope.scene.property.autoFlipTime);
		}else{
			sceneDataParseService.app.pauseAutoFlip();
		}

	}, $scope.changeEqshowType = function() {
		"eqHide" == $scope.eqShowType && sceneDataParseService.removeLastPage()
	}, $scope.changeSceneState = function() {
		if($scope.oldSceneApplyState.promIds){
			return 1 != $scope.sceneStatue && ModalService.openMsgDialog({
				msg: "该微课已经参与活动，不可以关闭或加密!"
			}),
			void($scope.sceneStatue = 1);
		}else{
			if(3 == $scope.sceneStatue){
				$scope.scene.status = 1;
				$scope.scene.isAccessCode = !0;
				$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);
				$rootScope.$broadcast("passPanelSwitch", !0);
			}else{
				$scope.scene.status = $scope.sceneStatue;
				delete $scope.scene.isAccessCode;
				delete $scope.scene.accessCode;
				$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);
				$rootScope.$broadcast("passPanelSwitch", !1);
			}
			return void(1 != $scope.sceneStatue && (
				$scope.scene.isShow = 0, 
				$scope.scene.applyTemplate = 0, 
				$scope.appendActive = !1, 
				$scope.scene.isTpl = 0, 
				$scope.scene.promIds = null
				)
			)
		}
	}, $scope.$watch("scene.bgAudio", function(newVal, oldVal) {
		if(angular.isObject(newVal) && angular.isObject(oldVal)){
			newVal.url != oldVal.url && sceneDataParseService.playVideo(newVal);
		}else{
			newVal != oldVal && sceneDataParseService.playVideo(newVal);
		}
		$rootScope.$broadcast("changeView", !1, $scope.isShowSetting);

	}),/* $scope.openScene = function(status, bool) {
		if(bool){
			sceneService.openScene(status.id).then(function(data) {
				data.data.success && (status.status = 1);
			});
		}else{
			sceneService.closeScene(status.id).then(function(data) {
				data.data.success && (status.status = 2);
			});
		}
	}, */$scope.openImageModal = function() {
		$rootScope.$broadcast("changeView", !0, $scope.isShowSetting);
		$modal.open({
			windowClass: "img_console console",
			templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
			controller: "BgConsoleCtrl",
			resolve: {
				obj: function() {
					return {
						fileType: 1
					}
				}
			}
		}).result.then(function(data) {
			if(data.width / data.height === 1){
				$scope.newCoverImage = data; 
				$scope.newCoverImage.tmbPath = data.data;
				$scope.newCoverImage.path = data.data;
				$scope.scene.cover = $scope.newCoverImage.path;
				return void sceneDataParseService.changeSceneCover($scope.scene.cover)
			}else{
				return void $modal.open({
					windowClass: "console seven-contain",
					templateUrl: BASE_URL+"templates/scene.console.imageCrop.tpl.html",
					controller: "imageCropCtrl",
					backdrop: "static",
					resolve: {
						obj: function() {
							return {
								type: "square",
								properties: {
									src: data.data
								},
								cw: 250
							}
						}
					}
				}).result.then(function(data2) {
					var coverImg = {
						width: data2.width,
						height: data2.height,
						data: data2.src,
						type: "imgSrc"
					};
					$scope.newCoverImage = coverImg, 
					$scope.newCoverImage.tmbPath = coverImg.data, 
					$scope.newCoverImage.path = coverImg.data, 
					$scope.scene.cover = $scope.newCoverImage.path, 
					sceneDataParseService.changeSceneCover($scope.scene.cover)
				}, function(data3) {})
			}
		}, function(data4) {})
	};
	var loadingLogo = null;
	$scope.countCharacters = countCharacters, 
	$scope.saveSceneSettings = function(scene) {
		if ($scope.maxLength30(), !$scope.scene.name || !$scope.scene.name.trim()) {
			return $scope.invalidText = "noneName", void ModalService.openMsgDialog({
				msg: "微课标题不能为空！"
			}, function() {});
		}
		if(!$scope.scene.description) {
			$scope.scene.description = "微学宝，人人都是微课大师！";
		}
		if($scope.scene.property.autoFlip == null){
			$scope.scene.property.autoFlip = false;
			if ($scope.scene.property.autoFlip && !$scope.scene.property.autoFlipTime){
				return void($scope.invalidText = "请选择翻页频率");
			}
		}else{
			if ($scope.scene.property.autoFlip && !$scope.scene.property.autoFlipTime){
				return void($scope.invalidText = "请选择翻页频率");
			}
		}
		var characterLength = countCharacters($scope.scene.name.trim());
		if (!(characterLength > 48)) {
			if ("1" === $scope.scene.isShow && !$scope.scene.tagId) {
				return void ModalService.openMsgDialog({
					msg: "请选择申请微课的微课类型"
				}, function() {
					$("#tag").focus()
				});
			}

			if ($scope.scene.property && $scope.scene.property.eqAdType == eqADTypeChoice.CUSTOM_BOTTOM && (!$scope.scene.property.bottomLabel || !$scope.scene.property.bottomLabel.id)) {
				return void ModalService.openMsgDialog({
					msg: "请选择您要使用的自定义底标！"
				}, function() {});
			}

			if ($scope.scene.property && $scope.scene.property.bottomLabel && $scope.scene.property.bottomLabel.name && countCharacters($scope.scene.property.bottomLabel.name) > 16){ 
				return void ModalService.openMsgDialog({
					msg: "自定义名称不能超过16个字符"
				}, function() {});
			}

			if ($scope.scene.property && $scope.scene.property.bottomLabel && !$scope.scene.property.bottomLabel.name && $scope.scene.property.bottomLabel.url && "http://" != $scope.scene.property.bottomLabel.url) {
				return void ModalService.openMsgDialog({
					msg: "请输入自定义底标名称"
				}, function() {});
			}

			if ($scope.scene.accessCode && ("0" != $scope.scene.applyPromotion || "0" != $scope.scene.applyTemplate)) {
				return void ModalService.openMsgDialog({
					msg: "申请样例、推荐的微课不能同时设置密码，请修改。"
				});
			}

			if (3 == $scope.sceneStatue && (!$scope.scene.accessCode || 4 != $scope.scene.accessCode.length)) {
				return void ModalService.openMsgDialog({
					msg: "请输入有效的微课密码！"
				});
			}

			if ($scope.scene.promIds && $scope.activityPageTpls.length && !$scope.scene.property.activityPageId) {
				return void ModalService.openMsgDialog({
					msg: "请选择活动尾页！"
				});
			}

			if ($scope.oldSceneApplyState.promIds && $scope.scene.property.eqAdType != eqADTypeChoice.FREEPAGE) {
				return void ModalService.openMsgDialog({
					msg: "该微课已选择参加活动，不可以清除微学宝尾页，请重新选择！"
				});
			}

			if ($scope.scene.promIds && ($scope.scene.property.eqAdType != eqADTypeChoice.FREEPAGE || $scope.scene.property.adSpend)) {
				return void ModalService.openMsgDialog({
					msg: "该微课已选择清除微学宝尾页，不可以参加活动；请复制该微课展示后，再次选择参与活动。"
				});
			}

			if ($scope.appendActive && !$scope.scene.promIds) {
				return void ModalService.openMsgDialog({
					msg: "请选择活动尾页！"
				});
			}

			if ($scope.scene.property && $scope.scene.property.autoFlipTime > 60) {
				return void ModalService.openMsgDialog({
					msg: "自动翻页时间不能超过60秒。"
				});
			}

			$scope.scene.property.eqAdType = parseInt($scope.scene.property.eqAdType, 10);

			var price = 0; //memberHandler.getCurrentSelectionPrice(d.scene, d.adSpend, d.isFormerScene, D);
			if(0 === price){
				saveSceneSettings(scene);
			}else{
				if(price && price > $scope.userXd){
					ModalService.openMsgDialog({
						msg: '当前选择需要消耗微币<font color="#ff6e6e">' + price + '</font>个<br/>微币余额不足(<font color="#ff6e6e">' + ($scope.userXd || 0) + '</font>个)<span class="get-xd"><a href="http://bbs.e.wesambo.com/forum.php?mod=viewthread&tid=297&extra=page%3D1" target = "_blank">获取微币</a></span>'
					})
				}else{
					if(price){
						ModalService.openConfirmDialog({
							msg: '当前选择需要消耗微币<font color="#ff6e6e">' + price + '</font>个<br/>微币余额为<font color="#ff6e6e">' + ($scope.userXd || 0) + "</font>个"
						}, function() {
							saveSceneSettings(scene)
						})
					}else{
						saveSceneSettings(scene);
					}
				}
			}
		}
	}, $scope.oldSceneApplyState = {
		applyPromotion: "",
		applyTemplate: "",
		promIds: ""
	}, $scope.getSceneDetail = function() {
		sceneService.getCurrentScenePromise().then(function() {
			$scope.scene = angular.copy(sceneService.getCurrentScene()); 
			$scope.scene.price = "" + ($scope.scene.price || "0"); 
			$scope.oldSceneApplyState.applyPromotion = $scope.scene.applyPromotion = "" + $scope.scene.applyPromotion;
			$scope.oldSceneApplyState.applyTemplate = $scope.scene.applyTemplate = "" + $scope.scene.applyTemplate;
			$scope.scene.isTpl = "" + $scope.scene.isTpl; 
			$scope.scene.isShow = $scope.scene.isShow ? "" + $scope.scene.isShow : "0";
			$scope.oldSceneApplyState.promIds = $scope.scene.promIds = $scope.scene.promIds ? parseFloat($scope.scene.promIds) : null;
			2 == $scope.scene.pageMode && ($scope.scene.pageMode = 0);

			if($scope.scene.property){
				angular.isString($scope.scene.property) && ($scope.scene.property = JSON.parse($scope.scene.property))
			}else{
				$scope.scene.property = {};
			}

			loadingLogo = $scope.scene.loadingLogo || $scope.scene.property.loadingLogo; 
			$scope.scene.property.hasOwnProperty("triggerLoop") || ($scope.scene.property.triggerLoop = !0);
			$scope.scene.property.hasOwnProperty("slideNumber") || ($scope.scene.property.slideNumber = !0); 
			$scope.scene.property.autoFlipTime || ($scope.scene.property.autoFlipTime = 3);
			$scope.adSpend = $scope.scene.property.adSpend || 0;
			$scope.isFormerScene = !1;

			if($scope.scene.property.hideEqAd){
				$scope.adSpend = memberHandler.getPriceByADType(eqADTypeChoice.HIDE); 
				$scope.scene.property.eqAdType = eqADTypeChoice.HIDE;
				$scope.eqShowType = sceneShowType.EQHIDE;
			}else{
				if($scope.scene.property.eqAdType){
					switchToAdState($scope.scene.property.eqAdType);
				}else{
					if($scope.scene.createTime < 14165028e5){
						$scope.isFormerScene = !0;
						$scope.adSpend = memberHandler.getPriceByADType(eqADTypeChoice.HIDE);
						switchToAdState(eqADTypeChoice.HIDE);
					}else{
						if($scope.scene.property.isAdvancedUser){
							if($scope.scene.property.bottomLabel && $scope.scene.property.bottomLabel.id){
								$scope.isFormerScene = !0;
								$scope.adSpend = memberHandler.getPriceByADType(eqADTypeChoice.CUSTOM_BOTTOM);
								switchToAdState(eqADTypeChoice.CUSTOM_BOTTOM);
							}else{
								$scope.isFormerScene = !0;
								$scope.adSpend = memberHandler.getPriceByADType(eqADTypeChoice.DEFAULT_BOTTOM);
								switchToAdState(eqADTypeChoice.DEFAULT_BOTTOM);
							}

						}else{
							$scope.adSpend = memberHandler.getPriceByADType(eqADTypeChoice.FREEPAGE);
							switchToAdState(eqADTypeChoice.FREEPAGE);
							if($scope.scene.startDate && $scope.scene.endDate){
								$scope.startDate = new Date($scope.scene.startDate);
								$scope.endDate = new Date($scope.scene.endDate);
								$scope.alwaysOpen = !1;
							}

						}
					}
				}
			}

			$scope.scene.type = "" + $scope.scene.type;
			/*sceneSettingCache.activitiesPromise.then(function(data) {
				$scope.activities = data.data.list || [];
				$scope.getActivityPageTpl();
			});*/
			if($scope.scene.bgAudio){
				$scope.scene.bgAudio = angular.isString($scope.scene.bgAudio) ? JSON.parse($scope.scene.bgAudio) : $scope.scene.bgAudio;
			}

			var bgAudioWatchFun = $scope.$watch("$parent.scene.bgAudio", function(newVal) {
				$scope.scene.bgAudio = angular.isString(newVal) ? JSON.parse(newVal) : newVal
			});

			$scope.$on("$destroy", function() {
				bgAudioWatchFun();
			})
		})
	};

	$scope.types = staticResService.getSceneType(), 
	$scope.tplPrices = [];

	var sceneTplPricesPromise = sceneSettingCache.sceneTplPricesPromise.then(function(data) {
			for (var i = 0; i < data.data.list.length; i++){
				if("免费" != data.data.list[i].name && -1 == data.data.list[i].name.indexOf("微币")){
					data.data.list[i].name += "微币";
				}
			}
			$scope.tplPrices = data.data.list || [];
		}), 
		F = [];

	$scope.sceneTags = [];
	var sceneTagsPromise = sceneSettingCache.sceneTagsPromise.then(function(data) {
		$scope.sceneTags = F = data.data.list || []
	});

	$q.all([sceneTplPricesPromise, sceneTagsPromise]).then(function() {
		$scope.getSceneDetail()
	});

	var typeWatchFun = $scope.$watch("scene.type", function(newVal) {
		if(newVal){
			$scope.sceneTags = [];
			angular.forEach(F, function(item) {
				newVal == item.bizType && $scope.sceneTags.push(item)
			})
		}
	});
	$scope.$on("$destroy", function() {
		typeWatchFun();
	}), $scope.pagemodes = [{
		id: 0,
		name: "上下翻页"
	}, {
		id: 1,
		name: "上下惯性翻页"
	}, {
		id: 3,
		name: "左右惯性翻页"
	}, {
		id: 4,
		name: "左右翻页"
	}, {
		id: 5,
		name: "左右连续翻页"
	}, {
		id: 6,
		name: "立体翻页"
	}, {
		id: 7,
		name: "卡片翻页"
	}, {
		id: 8,
		name: "放大翻页"
	}, {
		id: 9,
		name: "交换翻页"
	}, {
		id: 10,
		name: "翻书翻页"
	}, {
		id: 11,
		name: "上下连续翻页"
	}, {
		id: 12,
		name: "掉落翻页"
	}];
	var arr = [11, 12];
	if (!$scope.isAllowedToAccessNewPageFlip) {
		for (var i = 0; i < $scope.pagemodes.length; i++){
			for (var j = 0; j < arr.length; j++) {
				$scope.pagemodes[i].id == arr[j] && ($scope.pagemodes.splice(i, 1), i--)
			};
		} 
	};
	$scope.userXd = 0, 
	$scope.getUserXd = function() {
		usercenterService.getUserXd().then(function(data) {
			$scope.userXd = data.data.obj || 0
		})
	}, 
	$scope.getUserXd(), 
	sceneSettingCache.pageTplsPromise.then(function(data) {
		if(data.data.list && data.data.list.length > 0){
			$scope.pageTpls = data.data.list;
		}else{
			$scope.pageTpls = [];
		}

	}), sceneSettingCache.bottomPageTplsPromise.then(function(data) {
		if(data.data.list && data.data.list.length > 0){
			$scope.bottomPageTpls = data.data.list;
		}else{
			$scope.bottomPageTpls = [];
		}

	}), $scope.chooseLastPage = function(pageId) {
		$scope.scene.property.lastPageId = pageId;
		switchToAdState(eqADTypeChoice.FREEPAGE, !0);

	}, $scope.chooseCustomBottomLabel = function(id) {
		$scope.scene.property.bottomLabel || ($scope.scene.property.bottomLabel = {});
		$scope.scene.property.bottomLabel.id = id;
		switchToAdState(eqADTypeChoice.CUSTOM_BOTTOM, !0);

	}, $scope.maxLength30 = function() {
		if ($scope.scene.description && ($scope.scene.description = $scope.scene.description.replace(/\n|\r/g, " ")), $scope.scene.description && $scope.scene.description.length > 30) {
			var str = $scope.scene.description.replace(/[^\x00-\xff]/g, "xx");
			if (str.length > 60) {
				var str2 = str.substring(0, 60).replace(/xx/g, "中").length;
				$scope.scene.description = $scope.scene.description.substring(0, str2)
			}
		}
	}, $scope.maxLength24 = function() {
		if ($scope.scene.name && ($scope.scene.name = $scope.scene.name.replace(/\n|\r/g, " ")), $scope.scene.name && $scope.scene.name.length > 24) {
			var str3 = $scope.scene.name.replace(/[^\x00-\xff]/g, "xx");
			if (str3.length > 48) {
				var str4 = str3.substring(0, 48).replace(/xx/g, "中").length;
				$scope.scene.name = $scope.scene.name.substring(0, str4)
			}
		}
	}, $scope.uploadLoadingLogo = function() {
		$modal.open({
			windowClass: "img_console console",
			templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
			controller: "BgConsoleCtrl",
			resolve: {
				obj: function() {
					return {
						fileType: 1
					}
				}
			}
		}).result.then(function(data) {
			$scope.scene.loadingLogo = data.data; 
			$rootScope.$broadcast("showLoading", $scope.scene.loadingLogo, data.data);

		}, function(event) {})
	}, 
	$scope.moreActivities = function() {}, 

	$scope.isLoadingLogoAccessible = security.isAllowToAccess(security.accessDef.LOADING_LOGO), 
	$scope.isTemplatePaymentAccessible = security.isAllowToAccess(security.accessDef.TEMPLATE_PAYMENT),

	$scope.cancelSceneSetting = function() {
		$scope.$parent.sceneSetting.showFlag = !1;

	}, $scope.fourNumberPassword = function() {
		if($scope.scene.accessCode){
			$scope.scene.accessCode = $scope.scene.accessCode.replace(/\D/g, "");
			$scope.scene.accessCode.length > 4 && ($scope.scene.accessCode = $scope.scene.accessCode.substr(0, 4));

		}
	}, 
	$scope.isScenePasswordAccessible = security.isAllowToAccess(security.accessDef.SCENE_PASSWORD), 
	$scope.activityPageTpls = [], 
	$scope.selectedActivity = null, 
	$scope.getActivityPageTpl = function(arg) {
		if ($scope.oldSceneApplyState.promIds && $scope.scene.promIds !== $scope.oldSceneApplyState.promIds) {
			return ModalService.openMsgDialog({
				msg: "该微课已经参与活动，不可参与其他活动；请复制该微课展示后，再次选择参与活动。"
			}), void($scope.scene.promIds = $scope.oldSceneApplyState.promIds);
		}
		if ($scope.scene.promIds) {
			var actSceneId = null;
			angular.forEach($scope.activities, function(item) {
				item.id === $scope.scene.promIds && (actSceneId = item.sceneId, $scope.selectedActivity = item);
			});
			actSceneId && pageTplService.getPageTpls(actSceneId).then(function(data) {
				if(data.data.list && data.data.list.length > 0){
					$scope.activityPageTpls = data.data.list;
					if(!$scope.scene.property.activityPageId || arg){
						if($scope.activityPageTpls.length){
							$scope.scene.property.activityPageId = $scope.activityPageTpls[0].id; 
							$scope.chooseActivityPageTpl($scope.scene.property.activityPageId);
						}else{
							$scope.scene.property.activityPageId = null;
						}
					}
				}else{
					$scope.activityPageTpls = [];
				}
			})
		} else {
			$scope.activityPageTpls = [], 
			$scope.scene.property.activityPageId = null;
		}
	}, $scope.chooseActivityPageTpl = function(id) {
		$scope.scene.property.activityPageId = id;
		sceneDataParseService.replaceActivePage(id);
	}
}]).value("eqADTypeChoice", {
	HIDE: 0,
	FREEPAGE: 1,
	DEFAULT_BOTTOM: 2,
	CUSTOM_BOTTOM: 3
});
angular.module("scene.create.console.shape").controller("ShapeConsoleCtrl", ["$scope", "shapeService", function($scope, shapeService) {//形状组件
	$scope.getShapeByPage = function(pageNo, pageSize) {
		shapeService.getShapeByPage(pageNo, pageSize)
	}
	var svgList = shapeService.svgList;
	$scope.currentPage = 1, 
	$scope.totalItems = svgList.length;
	var pageSize = $scope.pageSize = 21;
	$scope.$watch("currentPage", function(newVal) {
		$scope.toPage = newVal;
		$scope.getShapeByPage(newVal, pageSize);

	}), $scope.confirm = function() {
		$scope.$close({
			type: "rect"
		});
	}, $scope.pageChanged = function(toPage) {
		if(1 > toPage || toPage > $scope.totalItems / 18 + 1){
			return void alert("此页超出范围");
		}else{
			return void($scope.currentPage = toPage);
		}
	}, $scope.cancel = function() {
		$scope.$dismiss();
	}, $scope.selectSvg = function(a) {
		var c = shapeService.shapeList[a].type,
			d = shapeService.shapeList[a].viewBox;
		$scope.$close({
			type: c,
			viewBox: d
		})
	}
}]);
angular.module("scene.create.console.sound").controller("soundCtrl", ["$rootScope", "$scope", "$translate", "soundService", "ModalService", "obj", "uploaderService", "$modal", "fileService", "dataCacheService","$stateParams", function($rootScope, $scope, c, soundService, ModalService, obj, uploaderService, $modal, fileService, dataCacheService, stateParams) {//音乐
	$scope.myValue_spd = 5;
	$scope.myValue_pit = 5;
	$scope.myValue_vol = 5;
	$scope.soundUploadCode = function() {
		var href = document.location.href;
		var wei = href.indexOf("?");
		var classId = href.substring(38, wei);
		$('#codeKuang').css('background','url("/assets/images/re-design/bg_mc_code.png") no-repeat')
		$.ajax({
			type: "GET",
			url: "http://" + window.location.host + "/index.php?c=scene&a=detail&id=" + classId,
			success: function(data) {
				$('#codeSound').qrcode({
					text: "http://" + window.location.host + "/index.php?c=Mobile&token=" + data.token + "&type=2",
					width: 125,
					height: 125
				});
			}
		})
		sessionStorage.setItem("mySounds", "");
		document.getElementById("codeUpload").style.display = "block";
		document.getElementById("codeKuang").style.display = "block";
		$('#codeSound').css('display', 'inline-block');
		$('#codePic').css('display', 'none');
		$('#soundCode').css('display', 'block');
		$('#picCode').css('display', 'none');

		window.cc = setInterval(function() {
			$.ajax({
				type: "GET",
				url: "http://" + window.location.host + "/index.php?c=Scene&a=mobfile&type=2",
				success: function(data) {
					if (data.code == "200") {
						console.log("success");
						fileService.getFileByCategory(1, 10, "0", "2").then(function(data) {
							$scope.sounds = data.data.list;
							$scope.sound = data.data.list;
							clearInterval(window.cc);
						})
						document.getElementById("codeUpload").style.display = "none";
						document.getElementById("codeKuang").style.display = "none";
						document.getElementById("codeSound").children[0].remove();
					} else if (data.code == "400") {
						console.log("false")
	
					}
				}
	
			})
		}, 5000);
	}	
	var selfSoundList = $scope.sounds = [],
		selfSoundType = $scope.type = obj.type;
	$scope.selectSoundError = "";
	$scope.uploader = uploaderService.uploader(obj.type, 11194304);
	var pageSize = $scope.pageSize = 10,
		pageNo = 1;
	$scope.actionContent = !1, 
	$scope.pagination = {}, 
	$scope.sound = {}, 
	$scope.soundLink = {
		src: ""
	};
	var soundType = !1;
	if(window.localStorage){
		soundType = 2 == selfSoundType ? localStorage.getItem("musicTag") : localStorage.getItem("soundTag");
		if("true" == soundType){
			$scope.isMySound = !0;
		}else{
			if("false" != soundType && soundType){
				$scope.isMySound = "history";
			}else{
				$scope.isMySound = !1;
			}
		}
	}else{
		$scope.isMySound = !1;
	}

	$scope.alertAction = !0, 
	$scope.soundAction = !1, 
	$scope.popSoundAction = function() {
		$scope.soundAction = !0
	};
	$scope.closeAction = function() {
		$scope.soundAction = !1;
		useIdList.indexOf($rootScope.user.id) > -1 && ($scope.alertAction = !1);
	};
	$scope.actionShow = !1;
	var useIdList = [];
	if (window.localStorage) {
		var setSoundAction = localStorage.getItem("setSoundAction");
		if(setSoundAction){
			useIdList = setSoundAction.split(",");
			useIdList.indexOf($rootScope.user.id) > -1 && ($scope.alertAction = !1);
		}
	}
	$scope.isCheckbox = function(actionShow) {//是否显示上传提示
		if(actionShow){
			useIdList.push($rootScope.user.id);
			localStorage.setItem("setSoundAction", useIdList.join(","));
		}
	};
	4 == selfSoundType && obj.elemDef.sound && obj.elemDef.sound.src && ($scope.sound = obj.elemDef.sound);
	if (2 == selfSoundType && obj.elemDef.bgAudio) {
		if ("string" == typeof obj.elemDef.bgAudio) {
			var bgAudio = JSON.parse(obj.elemDef.bgAudio);
			$scope.sound = bgAudio;
			bgAudio && bgAudio.src && ($scope.sound.url = bgAudio.src);
		} else {
			$scope.sound = obj.elemDef.bgAudio;
			obj.elemDef.bgAudio.src && ($scope.sound.url = obj.elemDef.bgAudio.src);
		}
	}
	$scope.$on("uploadfiles.add", function(event) {
		2 == $scope.type ? dataCacheService.clear("mySounds") : dataCacheService.clear("fileService1");
		$scope.selectTab(!0);

	}), $scope.$on("thumbnailList.update", function(event, data) {
		for (var selfDate, i = 0; i < $scope.uploader.queue.length; i++) {
			if (100 == $scope.uploader.queue[i].progress) {
				$scope.uploader.queue.splice(i, 1), selfDate = data, selfSoundList.unshift(selfDate);
				for (var j = 0; 10 > j; j++) {
					if(0 === selfSoundList[i].size){
						selfSoundList[i].size = null;
					}else{
						if(selfSoundList[i].size > 0 && selfSoundList[i].size < 1024){
							selfSoundList[i].size = selfSoundList[i].size + " KB";
						}else{
							selfSoundList[i].size >= 1024 && (selfSoundList[i].size = (selfSoundList[i].size / 1024).toPrecision(2) + " MB");
						}
					}
				}
			}
		}
		selfSoundList.length > 0 && ($scope.actionContent = !1);
		2 == $scope.type ? dataCacheService.clear("mySounds") : dataCacheService.clear("fileService1");
	});
	$scope.getSounds = function(toPage) {
		//searchVal = document.getElementById('search-value').value //获取搜索的关键字 willingshe
		$scope.toPage = toPage;
		if(4 == selfSoundType){
			$scope.isMySound ? soundService.getMySounds(toPage) : $scope.getSysMusicList($scope.sysCatId, toPage);
		}else if(2 == selfSoundType){
			 $scope.isMySound ? soundService.getMyAudios(toPage) : $scope.getSysMusicList($scope.sysCatId, toPage);
		}
	},$scope.getSoundsTo = function(toPage) {
		searchVal = document.getElementById('search-value').value //获取搜索的关键字 willingshe
		$scope.toPage = toPage;
		if(4 == selfSoundType){
			$scope.isMySound ? soundService.getMySounds(toPage) : $scope.getSysMusicList($scope.sysCatId, toPage);
		}else if(2 == selfSoundType){
			 $scope.isMySound ? soundService.getMyAudios(toPage) : $scope.getSysMusicList($scope.sysCatId, toPage);
		}

	}, window.enterSearchSound = function(toPage) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode==13){
			searchVal = document.getElementById('search-value').value //获取搜索的关键字
			$scope.toPage = toPage;
			if(4 == selfSoundType){
				$scope.isMySound ? soundService.getMySounds(toPage) : $scope.getSysMusicList($scope.sysCatId, toPage);
			}else if(2 == selfSoundType){
				$scope.isMySound ? soundService.getMyAudios(toPage) : $scope.getSysMusicList($scope.sysCatId, toPage);
			}
		}
		//searchVal = document.getElementById('search-value').value //获取搜索的关键字
		//$scope.toPage = toPage, 4 == selfSoundType ? $scope.isMySound ? soundService.getMySounds(toPage) : $scope.getSysMusicList($scope.sysCatId, toPage) : 2 == selfSoundType && ($scope.isMySound ? soundService.getMyAudios(toPage) : $scope.getSysMusicList($scope.sysCatId, toPage))
	}, 
	$scope.sysCate = !$scope.isMySound, 
	$scope.selectTab = function(isMySound) {
		if(window.localStorage){
			if(2 == $scope.type){
				localStorage.setItem("musicTag", isMySound);
			}else{
				localStorage.setItem("soundTag", isMySound);
			}
		}
		isMySound ? $scope.sysCate = !1 : $scope.sysCate = !0;
		$scope.isMySound = isMySound;
		"history" == isMySound ? $scope.getHistory() : $scope.getSounds(1);
	}, $scope.setPageMusic = function(data, type, isSoundSelected) {
		$scope.selectSound(data, type, isSoundSelected);

		//设置当前页面的背景音乐
		if(music && pageNo){
			var url = PREFIX_URL + "index.php?c=scene&a=bg_music";
			music.num = parseInt(pageNo);
			music.sceneId = parseInt(sceneId);
			$.ajax(url,{
				type: 'post',
				data: JSON.stringify(music),
				headers: {"Content-Type": "text/plain; charset=UTF-8"
			},
			success: function (data){
				//alert("设置成功");
				ModalService.openActionResultDialog({
					msg: "设置成功！",
					success: !0,
					bgStyle: {
							backgroundColor: 'rgba(0,0,0,.3)',
							position: 'fixed',
							top: 0,
							bottom: '-150px',
							left: '-180px',
							right: '-180px'
						}
				},function(){
					$scope.$dismiss();
				});
				
			}});
		} else {
			//alert("当前未选择任何音乐");
			ModalService.openMsgDialog({
				msg: "当前未选择任何音乐！",
				btn: "确定",
				bgStyle: {
						backgroundColor: 'rgba(0,0,0,.3)',
						position: 'fixed',
						top: 0,
						bottom: '-150px',
						left: '-180px',
						right: '-180px'
					}
			});
		}
	}, $scope.getHistory = function() {
		fileService.getFilesHistory(2).then(function(data) {
			data.data.success && $rootScope.$broadcast("sounds.update", data.data, selfSoundType, $scope.type)
		})
	}, $scope.openConvert = function() {
		$scope.track = '女';
		$scope.trackId = 0;
		$("#convert").modal({show:true});
		$("body *:last").hide();
		if(!$("#convertMusic").attr("src") && $("#convertMusic").attr("src") != ""){
			new_obj = $("<audio id='convertMusic' src='' autoplay>");
			$(".container").append(new_obj);
		}
	};
	setTimeout($scope.openConvert,0)/*willing语音*/, 
	$scope.playConvertSound = function() {
		var x = $(event.target).closest('.sound-flex').find('input:radio[name="aaa"]:checked');
		console.log(x.val());
		var val = $("#convertVal").val();
		var spd = $(event.target).closest('.sound-flex').find('.voice_spd_num').eq(0).val();
		console.log(spd);
		var pit = $(event.target).closest('.sound-flex').find('.voice_pit_num').eq(0).val();
		console.log(pit);
		var vol = $(event.target).closest('.sound-flex').find('.voice_vol_num').eq(0).val();
		console.log(vol);
		var url = PREFIX_URL + "index.php?c=Text2audio&a=getaudio&text="+val+"&per=" + x.val()+"&spd="+spd+"&pit="+pit+"&vol="+vol;
		$("#convertMusic").attr("src",url);
	}, $scope.downloadSound = function(){
		var x = $(event.target).closest('.sound-flex').find('input:radio[name="aaa"]:checked');
		var val = $("#convertVal").val();
		var spd = $(event.target).closest('.sound-flex').find('.voice_spd_num').eq(0).val();
		var pit = $(event.target).closest('.sound-flex').find('.voice_pit_num').eq(0).val();
		var vol = $(event.target).closest('.sound-flex').find('.voice_vol_num').eq(0).val();
		var url = PREFIX_URL + "index.php?c=Text2audio&a=downaudio&text="+val+"&per=" + x.val()+"&spd="+spd+"&pit="+pit+"&vol="+vol;
		window.open(url);
	}, $scope.setConvertSound = function() {
		var x = $(event.target).parent().parent().parent().parent().parent().parent().parent().find('input:radio[name="aaa"]:checked');
		var val = $("#convertVal").val();
		var spd = $(event.target).closest('.sound-flex').find('.voice_spd_num').eq(0).val();
		var pit = $(event.target).closest('.sound-flex').find('.voice_pit_num').eq(0).val();
		var vol = $(event.target).closest('.sound-flex').find('.voice_vol_num').eq(0).val();
		var pageNo = window.location.href.split("=")[1];
		var str = window.location.href.split("?")[0]
		var sceneId = stateParams.sceneId;
		var music = {};
		if(val != "" && pageNo){
			var musicUrl = "";
			var getMusicUrl = PREFIX_URL + "index.php?c=Text2audio&a=bacurl&text="+val+"&per=" + x.val()+"&spd="+spd+"&pit="+pit+"&vol="+vol;
			$.ajax(getMusicUrl,{
			type: 'get',
			success: function (data){
				music.num = parseInt(pageNo);
				music.url = JSON.parse(data).url;
				music.sceneId = parseInt(sceneId);
				var url = PREFIX_URL + "index.php?c=scene&a=bg_music";
				$.ajax(url,{
					type: 'post',
					data: JSON.stringify(music),
					headers: {"Content-Type": "text/plain; charset=UTF-8"
				},
				success: function (data){
					/*alert("设置成功");*/
					ModalService.openActionResultDialog({
						msg: "设置当前页音乐成功！",
						btn: "确定",
						success: !0,
						bgStyle: {
								position: 'fixed',
								top: '0px',
								bottom: '-15px',
								left: '0px',
								right: '0px',
								backgroundColor: 'rgba(0, 0, 0, 0.298039)'
						}
					}, function() {
						$scope.$dismiss();
					}); 
				}});
			}});
		} else {
			ModalService.openActionResultDialog({
				msg: "设置当前页音乐失败！",
				btn: "确定",
				success: !1,
				bgStyle: {
						position: 'fixed',
						top: '0px',
						bottom: '-15px',
						left: '0px',
						right: '0px',
						backgroundColor: 'rgba(0, 0, 0, 0.298039)'
				}
			});
		}
	}, $scope.changeTrack = function() {
		($scope.track=="女") ?  $scope.track='男' : $scope.track='女';
		($scope.trackId==0) ? $scope.trackId=1 : $scope.trackId=0;
	}, 
	$('body').on('mousedown','.voice_spd',function(event){
		var y = event.offsetX;
		var x = Math.ceil(y/447*9);
		var pre = x*11.1111111111111+'%';
		$(this).children('.voice_spd_green').eq(0).animate({width:pre});
		var voice = $(this).parent().parent().find('.voice_spd_num').eq(0).val(x);
	});
	$('body').on('mousedown','.voice_pit',function(event){
		var y = event.offsetX;
		var x = Math.ceil(y/447*9);
		var pre = x*11.1111111111111+'%';
		$(this).children('.voice_pit_green').eq(0).animate({width:pre});
		var voice = $(this).parent().parent().find('.voice_pit_num').eq(0).val(x);
	});
	$('body').on('mousedown','.voice_vol',function(event){
		var y = event.offsetX;
		var x = Math.ceil(y/447*9);
		var pre = x*11.1111111111111+'%';
		$(this).children('.voice_vol_green').eq(0).animate({width:pre});
		var voice = $(this).parent().parent().find('.voice_vol_num').eq(0).val(x);
	});
	$scope.soundSpd = function($event){
		var val = $('.voice_spd_num').eq(0).val();
		var zheng = val%1;
		if(zheng != 0 || val > 9){
			$('.voice_spd_num').eq(0).val(9);
			$('.voice_spd_green').eq(0).animate({'width':'100%'},100);
		}else if(val == ""){
			return;
		}else{
			var pre = val*11.1111111111111+'%';
			$('.voice_spd_green').eq(0).animate({'width':pre},100);
		}
	}
	$scope.soundPit = function($event){
		var val = $('.voice_pit_num').eq(0).val();
		var zheng = val%1;
		if(zheng != 0 || val > 9){
			$('.voice_pit_num').eq(0).val(9);
			$('.voice_pit_green').eq(0).animate({'width':'100%'},100);
		}else if(val == ""){
			return;
		}else{
			var pre = val*11.1111111111111+'%';
			$('.voice_pit_green').eq(0).animate({'width':pre},100);
		}
	}
	$scope.soundVol = function($event){
		var val = $('.voice_vol_num').eq(0).val();
		var zheng = val%1;
		if(zheng != 0 || val > 9){
			$('.voice_vol_num').eq(0).val(9);
			$('.voice_vol_green').eq(0).animate({'width':'100%'},100);
		}else if(val == ""){
			return;
		}else{
			var pre = val*11.1111111111111+'%';
			$('.voice_vol_green').eq(0).animate({'width':pre},100);
		}
	}

	$scope.clearCurrentMusic = function() {
		ModalService.openConfirmDialog({
			msg: "确定清空当前页面音乐吗？",
			btn: "确定",
			btn: "取消",
			bgStyle: {
					position: 'fixed',
					left: '-180px',
					top: 0,
					right: '-180px',
					bottom: '-153px',
					backgroundColor: 'rgba(0,0,0,.3)'
			}
		}, function() {
			var pageNo = window.location.href.split("=")[1];
			var str = window.location.href.split("?")[0]
			var sceneId = stateParams.sceneId;
			var music = {};
			var url = PREFIX_URL + "index.php?c=scene&a=bg_music";
			music.num = parseInt(pageNo);
			music.sceneId = parseInt(sceneId);
			music.url = "";
			music.type = "del";
			$.ajax(url, {
				type: 'post',
				data: JSON.stringify(music),
				headers: {"Content-Type": "text/plain; charset=UTF-8"
			},
			success: function (data){
				ModalService.openActionResultDialog({
					msg: "清除成功",
					success: !0,
					bgStyle: {
							backgroundColor: 'rgba(0,0,0,.3)',
							position: 'fixed',
							top: 0,
							bottom: '-153px',
							left: '-180px',
							right: '-180px'
						}
				});
			}});
		}, function(){})
		
	}, $scope.urlLink = function() {
		$modal.open({
			windowClass: "console six-contain",
			templateUrl: BASE_URL + "templates/scene.console.soundLink.tpl.html",
			controller: "SoundLinkCtrl",
			resolve: {
				obj: function() {
					return obj.type
				}
			}
		}).result.then(function() {
			$scope.isMySound = !0;
			$scope.selectTab(!0);
		}, function() {})
	}, $scope.isSoundSelected = function(type, sound, data) {
		if(sound && sound.length == undefined){ //willing
			if(2 === type){
				return sound.id ? sound.id == data.id : sound.url == data.url
			}else if(4 === type){
				return sound.id ? sound.id == data.id : sound.src == data.src;
			}else{
				return void 0;
			}

		}else{
			return false;
		}
	}, $scope.selectSound = function(data, type, isSoundSelected) {
		music = data;
		pageNo = window.location.href.split("=")[1];
		var str = window.location.href.split("?")[0]
		sceneId = str.substring(str.length-7);
		if(data && data.url && data.url.substr(0, 1) == "/"){ 
			data.url = data.url.substr(1, data.url.length);

		}
		isSoundSelected ? $scope.sound = {} : $scope.sound = data
	}, $scope.clearSearchVal = function() {
		searchVal = ""
		document.getElementById('search-value').value = ""
	}, $scope.playSound = function(event, index) {
		event.stopPropagation();
		$rootScope.$broadcast("sound.play", selfSoundList[index]);

	}, $scope.deleteMySound = function(event, index) {
		event.stopPropagation();
		ModalService.openConfirmDialog({
			msg: "确定删除此音乐吗？"
		}, function() {
			2 == $scope.type ? dataCacheService.clear("mySounds") : dataCacheService.clear("fileService1");
			soundService.deleteMySound(selfSoundList[index].id);

		})
	}, $scope.clear = function() {
		music = null;
		$scope.sound = {};
	}, $scope.ok = function(data, type, isSoundSelected) {
		//选择音乐
		$scope.selectSound(data, type, isSoundSelected);

		if($scope.sound && $scope.sound.url==undefined){  //willing
			$scope.sound.url = $scope.sound.path
			console.log($scope.sound.url)
		}
		if($scope.sound && $scope.sound.url && $scope.sound.url.substr(0, 1) == "/"){ 
			$scope.sound.url = $scope.sound.url.substr(1,$scope.sound.url.length);
		}
		var selfSound, 
		soundData = $scope.sound;
		if(4 == selfSoundType){
			selfSound = soundData && soundData.src ? {
				name: soundData.name,
				src: soundData.src,
				id: soundData.id
			} : {};
			$scope.$close(selfSound);
		}
		if(2 == selfSoundType){
			r = soundData.url ? {
				url: soundData.url,
				name: soundData.name,
				id: soundData.id
			} : {};
			$scope.$close(r);
		}
	}, $scope.cancel = function() {
		$scope.$dismiss();

	}, $scope.$on("sounds.update", function(event, data, type) {
		if (selfSoundList.length = 0, data.list.length > 0) {
			$scope.actionContent = !1;
			$.each(data.list, function(index, item) {
				0 === item.path.indexOf("http://") && (item.isValue = !0);
				if(item.size < 1024 && item.size > 0){
					item.size = item.size + " KB";
				}else if(item.size >= 1024){
					item.size = (item.size / 1024).toPrecision(2) + " MB";
				}else if(0 === item.size){
					item.size = null;
				}

				if(4 == type){
					selfSoundList.push({
						id: item.id,
						name: item.name,
						src: item.path,
						isPlaying: !1,
						size: item.size,
						isValue: item.isValue
					});
				}else if(2 == type){
					selfSoundList.push({
						id: item.id,
						name: item.name,
						url: item.path,
						isPlaying: !1,
						size: item.size,
						isValue: item.isValue
					});
				}
			});
			var map = data.map;
			map && ($scope.pagination = {
				totalItems: map.count,
				pageSize: map.pageSize,
				currentPage: map.pageNo,
				numPages: Math.ceil(map.count / map.pageSize)
			})
		} else {
			$scope.pagination.totalItems = 0;
			$scope.actionContent = !0;
		}
	}), $scope.$on("mySounds.delete", function(event, data) {
		data === $scope.sound.id && ($scope.sound = {});
		if(2 == selfSoundType){
			soundService.getMyAudios($scope.pagination.currentPage);
		}else if(4 == selfSoundType){
			soundService.getMySounds($scope.pagination.currentPage);
		}
	});
	$scope.getSysMusicCategory = function(type) {
		fileService.getSysMusicCategory(type)
	};

	$scope.$on("sysMusic.update", function(event) {
		$scope.sysMusicList = fileService.sysMusicList;
	}), 

	$scope.getSysMusicCategory(selfSoundType), 

	$scope.getSysMusicList = function(id, toPage) {
		$scope.sysCatId = id;
		soundService.getSysMusicList(toPage, pageSize, selfSoundType, id);
	};
	if("history" == $scope.isMySound){
		$scope.getHistory();
	}else{
		if($scope.isMySound){
			4 == selfSoundType ? soundService.getMySounds(pageNo) : soundService.getMyAudios(pageNo);
		}else{
			$scope.getSysMusicList(0, pageNo);
		}
	}
}]);
angular.module("scene.create.console.soundComponent", ["app.directives.addelement"]), 
angular.module("scene.create.console.soundComponent").controller("SoundComponentConsoleCtrl", ["$scope", "obj", "$modal", function($scope, obj, $modal) {//音效
	$scope.model = {
		title: obj.properties.title,
		imgSrc: obj.properties.imgSrc,
		sound: obj.sound
	}, $scope.authError = "", $scope.buttons = [{
		id: 1,
		text: "有惊喜",
		btnStyle: {
			width: "100px",
			backgroundColor: "rgb(244, 113, 31)",
			height: "30px",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}, {
		id: 2,
		text: "听一听",
		btnStyle: {
			width: "100px",
			backgroundColor: "rgb(253, 175, 7)",
			height: "30px",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}, {
		id: 3,
		text: "点我听歌",
		btnStyle: {
			width: "100px",
			backgroundColor: "rgb(121, 196, 80)",
			height: "30px",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}, {
		id: 4,
		text: "点播歌曲",
		btnStyle: {
			width: "100px",
			height: "30px",
			backgroundColor: "#fff",
			"text-align": "center",
			border: "1px solid #3FB816",
			"line-height": "30px",
			color: "rgb(0, 0, 0)"
		}
	}], $scope.openImageModal = function() {
		$modal.open({
			windowClass: "img_console console",
			templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
			controller: "BgConsoleCtrl",
			resolve: {
				obj: function() {
					return {
						fileType: 1
					}
				}
			}
		}).result.then(function(data) {
			$scope.model.title = "";
			$scope.btnIndex = -1;
			$scope.model.btnStyle = {
				width: "115px",
				height: "115px",
				"line-height": "1",
				backgroundColor: "transparent"
			};
			$scope.model.imgSrc = obj.properties.imgSrc = data.data;
		}, function(event) {})
	}, angular.forEach($scope.buttons, function(item, index) {
		if("" !== $scope.model.title && obj.css.backgroundColor && obj.css.backgroundColor == item.btnStyle.backgroundColor){
			$scope.btnIndex = index;
		}
	}), $scope.confirm = function() {
		if(null != $scope.model.imgSrc || $scope.model.title && 0 !== $scope.model.title.length){
			if(!$scope.model.sound || $.isEmptyObject($scope.model.sound)){
				return void($scope.authError = "您还没有选择音效")
			}else{
				obj.sound = $scope.model.sound;
				obj.properties.title = $scope.model.title;
				return void $scope.$close($scope.model);
			}
		}else{
			$scope.authError = "按钮名称不能为空";
			return void $('.form-list input[type="text"].btn-name').focus();
		}
	}, $scope.openSoundModal = function() {
		$modal.open({
			windowClass: "console img_console",
			templateUrl: BASE_URL+"templates/scene.console.sound.tpl.html",
			controller: "soundCtrl",
			resolve: {
				obj: function() {
					return {
						elemDef: obj,
						type: 4
					}
				}
			}
		}).result.then(function(data) {
			$scope.model.sound = data;
		}, function() {})
	}, $scope.cancel = function() {
		$scope.$dismiss();
	}, $scope.chooseTabButton = function(button, index) {
		$scope.model.title = button.text;
		$scope.model.btnStyle = button.btnStyle;
		$scope.btnIndex = index;
		$scope.model.imgSrc = obj.properties.imgSrc = null;
	}
}]);
angular.module("scene.create.console.statistics", []), angular.module("scene.create.console.statistics").controller("StatisticsConsoleCtrl", ["$scope", "obj", function($scope, obj) {
	$scope.model = {
		title: obj.title,
		properties: {
			layout: obj.properties.layout,
			size: obj.properties.size,
			color: obj.properties.color,
			icon: obj.properties.icon,
			imgSrc: obj.properties.imgSrc
		}
	}, $scope.authError = "", $scope.confirm = function() {7
		angular.extend(obj, $scope.model);
		var height = parseInt(obj.css.height, 10) || 0;
		if($scope.model.properties.imgSrc && 115 > height){
			$scope.model.btnStyle = {
				width: "320px",
				height: "115px",
				lineHeight: "115px",
				backgroundColor: "transparent"
			}
		}
		if("counter-lr" === $scope.model.properties.layout){
			!$scope.model.properties.imgSrc && 80 > height && ($scope.model.btnStyle = {
				height: "40px",
				lineHeight: "40px",
				width: "80px"
			});
			if($scope.model.properties.imgSrc && 155 > height){
				$scope.model.btnStyle = $scope.model.btnStyle || {};
				$scope.model.btnStyle.height = $scope.model.btnStyle.lineHeight = "155px";
			}
		}
		$scope.$close($scope.model);
	}, $scope.cancel = function() {
		$scope.$dismiss()
	}, $scope.chooseEqfont = function(type) {
		$scope.model.properties.icon = type;
		$scope.model.properties.imgSrc = null;
	}
}]);
angular.module("scenobj.creatobj.consolobj.tel", ["app.directives.addelement"]), 
angular.module("scenobj.creatobj.consolobj.tel").controller("TelConsoleCtrl", ["$scope", "obj", "$modal", function($scope, obj, $modal) {
	$scope.btnIndex = 0;
	$scope.model = {
		title: obj.properties.title,
		number: obj.properties.number,
		imgSrc: obj.properties.imgSrc
	}, $scope.authError = "", $scope.buttons = [{
		id: 1,
		text: "一键拨号",
		btnStyle: {
			width: "80px",
			backgroundColor: "rgb(250, 188, 61)",
			height: "30px",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}, {
		id: 2,
		text: "热线电话",
		btnStyle: {
			width: "80px",
			backgroundColor: "rgb(50, 190, 166)",
			height: "30px",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}, {
		id: 3,
		text: "拨打电话",
		btnStyle: {
			width: "80px",
			backgroundColor: "rgb(224, 79, 95)",
			height: "30px",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}, {
		id: 4,
		text: "一键拨号",
		btnStyle: {
			width: "80px",
			height: "30px",
			backgroundColor: "rgb(37, 183, 211)",
			"text-align": "center",
			"line-height": "30px",
			color: "rgb(255, 255, 255)"
		}
	}], $scope.openImageModal = function() {
		$modal.open({
			windowClass: "img_console console",
			templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
			controller: "BgConsoleCtrl",
			resolve: {
				obj: function() {
					return {
						fileType: 1
					}
				}
			}
		}).result.then(function(data) {
			$scope.model.title = "";
			$scope.btnIndex = -1;
			$scope.model.btnStyle = {
				width: "115px",
				height: "115px",
				"line-height": "1",
				backgroundColor: "transparent"
			};
			$scope.model.imgSrc = obj.properties.imgSrc = data.data;
		}, function(event) {})
	}, angular.forEach($scope.buttons, function(item, index) {
		if("" !== $scope.model.title && obj.css.backgroundColor && obj.css.backgroundColor == item.btnStyle.backgroundColor){
			$scope.btnIndex = index;
		}
	}), $scope.confirm = function() {
		if(null != $scope.model.imgSrc || $scope.model.title && 0 !== $scope.model.title.length){
			if($scope.model.number && 0 !== $scope.model.title.number){
				return void $scope.$close($scope.model);
			}else{
				$scope.authError = "电话号码不能为空";
				return void $('.form-list input[type="text"].tel-button').focus();
			}
		}else{
			$scope.authError = "按钮名称不能为空";
			return void $('.form-list input[type="text"].btn-name').focus();
		}
	}, $scope.cancel = function() {
		$scope.$dismiss();
	}, $scope.chooseTabButton = function(button, index) {
		$scope.model.title = button.text;
		$scope.model.btnStyle = button.btnStyle;
		$scope.btnIndex = index;
		$scope.model.imgSrc = obj.properties.imgSrc = null;
	}
}]);
angular.module("scene.create.console.video", []), angular.module("scene.create.console.video").controller("VideoCtrl", ["$scope", "$translate", "obj", "$modal","$state","$location","fileService","ModalService","dataCacheService","$rootScope",function($scope, c, obj,$modal,$state,$location,fileService,ModalService,dataCacheService,$rootScope) {//视频

	function checkIsSupport(src) {//判断是否支持该通用代码
		var url = src.substring(src.indexOf("src=") + 4),
			videoSrc = url.substring(url.indexOf("://") + 3),
			net = videoSrc.substring(0, videoSrc.indexOf("/"));
		return net.indexOf("v.qq") >= 0 || net.indexOf("tudou") >= 0 || net.indexOf("youku") >= 0 ? !0 : !1
	}
	function showVideo(page){//请求视频库
		$scope.cancelSelect();
		fileService.getMyvideo(page,12).success(function(data){
			$scope.videoList = data.list;
			var map = data.map;
			map && ($scope.pagination = {
				totalItems: map.count,
				pageSize: map.pageSize,
				currentPage: map.pageNo,
				numPages: Math.ceil(map.count / map.pageSize)
			});
			$scope.currentPage = map.pageNo;
		});
	}
	var idList = [];//删除的视频的id集合

	$scope.common = true;
	$scope.mine = false;
	$scope.pagination = {};
	$scope.currentPage = 1;
	$scope.toPage = 1;
	$scope.videoList = {};
	$scope.model || ($scope.model = {});
	$scope.authError = "";
	$scope.model.src = obj.properties.src;

	$scope.manageObj = {//管理
		/*manageAll: false,*/
		selected: false,
		selectedObj: []
	},$scope.changeCommon = function(){//切换到视频通用代码
		$scope.common = true;
		$scope.mine = false;
		/*$scope.manageObj.selected = false;
		$scope.manageObj.manageAll = false;*/
	},$scope.changeMine = function(){//切换到我的视频
		$scope.common = false;
		$scope.mine = true;
		showVideo($scope.currentPage);

	},$scope.getvideos = function(pageNo){//翻页
		$scope.currentPage = parseInt(pageNo);
		if(1 > pageNo || pageNo > $scope.pagination.numPages){
			return void alert("请输入有效页码")
		}else{
			return showVideo($scope.currentPage);
		}
	},$scope.$watch("currentPage",function(newVal,oldVal){
		$scope.toPage = newVal; 
	}),$scope.doUpload = function(){//上传视频
		if(parseInt($rootScope.user.type) === 1) {
			if(window.confirm("您好！该功能目前只向企业用户开放，点击确定申请成为企业用户")){
				return  window.open("https://wetool.im/f/0viuuz");
			}else{
				return;
			};
		}else{
			$modal.open({
				windowClass: "video_upload_console console",
				templateUrl: BASE_URL+"templates/scene.console.psd.tpl.html",
				controller: "PsdCtrl",
				resolve: {
					obj: function() {
						return {
							type: "v"
						}
					}
				}
			}).result.then(function(data) {
				showVideo($scope.currentPage);
			}, function(data) {})
		}
		
	},$scope.setVideos = function(video){//添加视频
		var videoData = {
			src: video.path,
			type: "v2"
		}
		$scope.$close(videoData);
	},$scope.manage = function(){
		$scope.manageObj.manageAll = true;
	},$scope.cancelSelect = function(){//取消选择
		/*$scope.manageObj.selected = false;
		$scope.manageObj.manageAll = false;*/
		for(var i = 0; i < idList.length; i++){
			$scope.manageObj.selectedObj[idList[i]].selected = !1;
		}
		idList = [];
		$scope.manageObj.selected = !1;
		$scope.manageObj.selectedObj = [];
	},$scope.deleteFile = function(obj){//删除视频
		obj && $scope.selVideo(obj);

		if(idList.length == 0) {
			return void($scope.authError = "请选择要删除的视频");
		}else{
			var idString = idList.join(",");
			ModalService.openConfirmDialog({
				msg: "确定删除所选的视频?"
			}, function() {
				dataCacheService.clear("fileService");
				fileService.deleteFile(idString);
			})

		}
		
	},$scope.$on("files.delete", function(){//删除成功后刷新页面
		showVideo($scope.currentPage);
	}),$scope.selVideo = function(obj){//选择视频
		$scope.manageObj.selectedObj[obj.id] = obj;
		$scope.manageObj.selectedObj[obj.id].selected = !$scope.manageObj.selectedObj[obj.id].selected;


		if(!$scope.manageObj.selectedObj[obj.id].selected){
			idList.splice(jQuery.inArray(obj.id,idList),1); 
		}else{
			idList.push(obj.id);
		}

		idList.length > 0 ? ($scope.manageObj.selected = !0) : ($scope.manageObj.selected = !1);
	},$scope.confirm = function() {//确定添加视频
		if (!$scope.model.src && $scope.common) {
			return $("textarea").focus(), void($scope.authError = "请输入视频地址");
		}
		var isCheck = checkIsSupport($scope.model.src);
		var videoData = {
			src: $scope.model.src,
			type:"v1"
		}
		if(isCheck){
			return void $scope.$close(videoData);
		}else{
			$("textarea").addClass("error"), $("textarea").change(function() {
				$(this).removeClass("error");
			});
			if($scope.common){
				return void($scope.authError = "暂不支持添加此视频！");
			}else{
				return void($scope.authError = "请选择视频！");
			}
		}
	}, $scope.cancel = function() {
		$scope.$dismiss();
	}
}]);
/*angular.module("scene.create.new", ["services.scene", "services.staticRes"]), angular.module("scene.create.new").controller("SceneNewCtrl", ["$scope", "$location", "$translate", "sceneService", "items", "ModalService", "staticResService", function(a, b, c, d, e, f, g) {
	if (a.scene = {
		name: ""
	}, a.scene.types = g.getSceneType(), e) {
		var h = !0;
		angular.forEach(a.scene.types, function(b, c) {
			if (h) {
				var d = "" + e.type;
				b.value === d ? (a.scene.type = b, h = !1) : a.scene.type = a.scene.types[0]
			}
		})
	} else a.scene.type = a.scene.types[0];
	a.create = function() {
		if (e) {
			var c = {
				id: e.id,
				type: a.scene.type.value,
				pageMode: a.scene.pageMode.id,
				price: e.price
			};
			d.createByTpl(c).then(function(a) {
				200 == a.data.code ? (b.path("scene/create/" + a.data.obj), b.search("pageId", 1)) : f.openMsgDialog({
					msg: a.data.msg
				})
			}, function(a) {})
		} else d.createBlankScene(null, a.scene.type.value, a.scene.pageMode.id).then(function(a) {
			b.path("scene/create/" + a.data.obj), b.search("pageId", 1)
		});
		a.$close()
	}, a.cancel = function() {
		a.$dismiss()
	}, a.pagemodes = [{
		id: 2,
		name: "上下翻页"
	}, {
		id: 1,
		name: "左右翻页"
	}], a.scene.pageMode = a.pagemodes[0]
}]);*/
angular.module("scene.create.pageTpl", []), angular.module("scene.create.pageTpl").controller("PageTplController", ["$scope", "pageTplService", function(a, b) {
	a.$watch("tpl", function(b) {
		if (a.tplElements = [], b && b.obj && b.obj.elements) {
			var c = angular.copy(b.obj.elements);
			$.each(c, function(b, c) {
				"4" == c.type && (c.isEditable || (c.isEditable = 1), a.tplElements.push(c))
			})
		}
	}, !0), a.pageChildLabel = function() {
		var c, d = [];
		for (c = 0; c < a.pageLabelAll.length; c++) a.pageLabelAll[c].ischecked && d.push(a.pageLabelAll[c].id);
		a.tpl.obj.elements && $.each(a.tplElements, function(b, c) {
			$.each(a.tpl.obj.elements, function(a, b) {
				c.id == b.id && (-1 == c.isEditable ? b.isEditable = -1 : delete b.isEditable)
			})
		}), b.updataChildLabel(d, a.pageIdTag).then(function() {
			alert("分配成功！"), a.controlView.pageList = !1
		}, function() {})
	}
}]);
angular.module("create.userGuide", []).controller("CreateUserGuideCtrl", ["$rootScope", "$scope", function(a, b) {
	if (window.localStorage) {
		var c = JSON.parse(localStorage.getItem("createUserGuide"));
		c && c[a.user.id] ? b.firstLogin = !1 : (b.firstLogin = !0, c = c || {}, c[a.user.id] = 1, localStorage.setItem("createUserGuide", JSON.stringify(c)))
	}
	b.myInterval = -1, b.userGuideSlides = [{
		image: CLIENT_CDN + "assets/images/scene/user-guide1.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide2.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide3.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide4.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide5.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide6.png"
	}], b.close = function() {
		b.firstLogin = !1
	}, b.currentIndex = 0;
	var d = b.$watch("userGuideSlides", function() {
		angular.forEach(b.userGuideSlides, function(a, c) {
			a.active && (b.currentIndex = c)
		})
	}, !0);
	b.$on("$destroy", d)
}]);
angular.module("scene.create.longpage.preview", []).controller("longPagePreview", ["$scope","obj", function($scope,obj) {
		$scope.host = obj.scene.code;
		$scope.height = parseInt(obj.height * 1.5 + 100);
		$scope.url = PREFIX_URL +"v-" + $scope.host;
		$scope.close = function(){
			$scope.$close();
		};
		var p1 = new Promise(//异步生成二维码
			function(resolve, reject) {
				window.setTimeout(
					function() {
						$('#codeImg').qrcode({
							text: PREFIX_URL +"v-" + $scope.host,
							width: 100, 
							height: 100
						})
					}, Math.random() * 1000);
			}
		);

}]);
