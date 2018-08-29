angular.module("scene.create.longpage", []);
angular.module("scene.create.longpage").controller("CreateLongPageSceneCtrl", ["$timeout", "$compile", "$rootScope", "$scope", "$stateParams", "$state", "$location", "sceneService", "pageTplService", "$modal", "ModalService", "security", "$window", "i18nNotifications", "historyService",  "selectService", "continueUrl", "triggerService", "staticResService", "dataCacheService", "fileService", "storageService","gridGuide","$element","$http","uploaderService","sceneViewService", "$interval", function($timeout, $compile, $rootScope, $scope, $stateParams, f, $location, sceneService, pageTplService, $modal, ModalService, security, n, i18nNotifications, historyService, selectService, continueUrl, t, staticResService, dataCacheService, fileService, storageService, gridGuide, $element, $http, uploaderService, sceneViewService, $interval) {
	
		/*//自动保存
		var autoSave = $interval(function(){
			$scope.findMultilFont();
			sceneService.saveScene($scope.tpl.obj).then(function(){
				$scope.$broadcast("showAutoSave");
			});
		},30000);
		$scope.$on("showAutoSave", function(){
			$("#autoSave").css({opacity: 1});
			$timeout(function(){
				$("#autoSave").css({opacity: 0});
			}, 1000);
		});
	*/
		$rootScope.$on("picture.show",function(event){//控制图片库显隐
			$scope.picture = true;
			$scope.bg = false;
			$scope.model = false;
			$scope.tabid ='template';
			$scope.pageTpl = {};
			$scope.getPageTpls();
		});
		$rootScope.$on("bg.show",function(event){//控制背景库显隐
			$scope.bg = true;
			$scope.picture = false;
			$scope.model = false;
			$scope.tabid ='template';
			$scope.pageTpl = {};
			$scope.getPageTpls();
		});
		$scope.$on("model.show", function(event){//控制模板库显隐
			$scope.model = true;
			$scope.picture = false;
			$scope.bg = false;
			$scope.tabid ='template';
			$scope.pageTpl = {};
			$scope.getPageTpls();
		});
		function isExistSubmitBtn() {
			var submitButton = !1;
			angular.forEach($scope.tpl.obj.elements, function(item) {
				6 == ("" + item.type).charAt(0) && (submitButton = !0)
			});
			return submitButton
		};
		window.isEmpty = function(obj){
		    for (var name in obj){
		        return false;
		    }
		    return true;
		};
		function getPageData(pageNum, isInsert, isCopy, isChangeSort) {
			sessionStorage.setItem("pageid",$scope.pages[pageNum-1].id);
			$scope.loading = !0;
			$scope.pageId = $scope.pages[pageNum - 1].id;

			sceneService.getSceneByPage($scope.pageId, isInsert, isCopy).then(function(data) {//课程数据响应
				var page;
				$scope.font = data.data.obj.scene.font;//多字体文件动态导出
				if(!isEmpty($scope.longpage) || data.data.obj.properties && data.data.obj.properties.longpage){
					$scope.pageHeight = !isEmpty($scope.longpage) ? $scope.longpage.longpageHeight : data.data.obj.properties.longpage.longpageHeight;
					sessionStorage.setItem("longpageID",data.data.obj.id);
					sessionStorage.setItem("longpageHeight",$scope.pageHeight);
				}else{
					$scope.longpage ={
						longpageHeight: 486,
						islongpage: true,
						id: data.data.obj.id
					}
					$scope.pageHeight = 486;
					page = {
						longpage: $scope.longpage
					}
					sessionStorage.setItem("longpageID",$scope.longpage.id);
					sessionStorage.setItem("longpageHeight",$scope.longpage.longpageHeight);
				}
				$scope.loading = !1;
				$scope.tpl = data.data; 
				$scope.tpl.obj.properties ? (!$scope.tpl.obj.properties.longpage && ($scope.tpl.obj.properties.longpage = $scope.longpage)) : ($scope.tpl.obj.properties = page);
				pageEffect = $scope.tpl.obj.properties;
				pageEffect && pageEffect.trigger && t.setTrigger($scope.tpl.obj.id, I.trigger);
				delete $scope.tpl.obj.scene;
				$scope.sceneId = $scope.tpl.obj.sceneId;
				$scope.controlView.showBgTag = !1;
				angular.forEach($scope.tpl.obj.elements, function(item, index) {
					3 == item.type && ($scope.controlView.showBgTag = !0, $scope.currentBgDef = item);
				});

				//检查特效
				if(pageEffect){
					if(pageEffect.image || pageEffect.scratch){
						$scope.effectName = "涂抹";
					}else if(pageEffect.finger){
						$scope.effectName = "指纹";
					}else if(pageEffect.effect){
						switch(pageEffect.effect.name){
							case "money":
								$scope.effectName = "数钱"
								break;
							case "snowFly":
								$scope.effectName = "飘雪"
								break;
							case "fireWorks":
								$scope.effectName = "烟花"
								break;
							case "none":
								$scope.effectName = "无"
								break;
						}
					}else if(pageEffect.fallingObject){
						$scope.effectName = "环境"
					}
				}

				if(isInsert || isCopy){
					$location.$$search = {};
					$location.search("pageId", ++pageNum);
					$scope.getPageNames();
				}

				$scope.pageNum = pageNum;
				$("#nr").empty();

				var newObj = angular.copy($scope.tpl.obj);

				newObj.elements = historyService.addPage(newObj.id, newObj.elements), 
				sceneService.templateEditor.parse({
					def: $scope.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				}), 
				$scope.originData = JSON.stringify($scope.tpl), 
				$rootScope.$broadcast("dom.changed", $scope.pageHeight), 
				$scope.loadTime++;//运行次数;

				$scope.editLoading = !1;//加载条
			}, function() {
				$scope.loading = !1
			})
		}
		function successPop() {
			i18nNotifications.pushForCurrentRoute("scene.save.success.nopublish", "notify.success")
		}

		var tplId, //套用模板的id，用于统计模板使用次数
			pageSize = 21, 
			pageNo = 1, 
			totalPage = 0, 
			G = !1,
			Time = 1;//缩放次数

		$scope.loading = !1, 
		$scope.PREFIX_FILE_HOST = PREFIX_FILE_HOST, 
		$scope.tpl = {}, $scope.originData = "",
		$scope.font = [], //多字体动态导出
		$scope.scale = 1, $scope.bigger = true, $scope.smaller = true, 
		$scope.longpage ={},$scope.loadTime = 0,//长页面初始化
		$scope.picture = false, $scope.picTag = [] , $scope.showPicTag = false, $scope.bg = false, $scope.fileType = 0;//左边图片/背景素材库入口
		$scope.model = true;//模板中心入口，默认显示模板
		$scope.marginTop = $scope.scale == 1.0 ? -314 : parseInt(-314 - Time * 2);
		$scope.pageHeight = 486,
		$scope.scenePicUrl = "";//课件截图，用于首页展示
		
		$scope.templateType = 1;
		$scope.controlView = {};
		$scope.showSearch = !0;
		$scope.completeHtml2Canvas = null;
		$scope.editLoading = !0;//加载条

		$scope.lastPageTypes = [{
			name: "微学宝尾页",
			value: "eqFree"
		}, {
			name: "微学宝底标",
			value: "eqLink"
		}, {
			name: "去掉微学宝展示",
			value: "eqHide"
		}];
		$scope.pageTpl = {}, 
		$scope.isAppEditor = !1, 
		$scope.tabid = "template", 
		$scope.$watch("user", function(newVal) {
			if (newVal){
				for (var i = 0; i < newVal.roleIdList.length; i++){
					13 == newVal.roleIdList[i] && ($scope.isAppEditor = !0);
					(4 == newVal.roleIdList[i] || 12 == newVal.roleIdList[i] || 13 == newVal.roleIdList[i]) && ($scope.isTplEditor = !0);
				}
			}
		}, !0);
		$scope.refreshTpl = function() {//iscroll滑动更新
			totalPage > pageNo && !G && (G = !0, $scope.getPageTpls(++pageNo))
		};
		$scope.showPhone = "false", 
		$rootScope.$broadcast("switchBox", $scope.showPhone), 
		storageService.push("create.phoneView", $scope.showPhone);

		$scope.createComp = function(type, kind) {
			$scope.sceneSetting.showFlag = !1;

			if("6" == type && isExistSubmitBtn()){
				return void ModalService.openMsgDialog({
					msg: "当前页面的提交按钮已经存在，请不要重复添加。"
				})
			}else{
				return void sceneService.createComp(type, null, kind);
			}

		},$scope.$on("hisChange", function() {
			historyService.addPageHistory($scope.tpl.obj.id, $scope.tpl.obj.elements);

		}), pageTplService.getPageTagLabel(11001).then(function(data) {//模板用途标签
			$scope.tplFormatList = data.data.list;

		}), pageTplService.getPageTagLabel(11003).then(function(data) {//模板风格标签
			$scope.tplInteractionList = data.data.list;

		}), pageTplService.getPageTagLabel(11002).then(function(data) {//模板功能标签
			$scope.tplStyleList = data.data.list;

		}), $scope.getPageTplTypestemp = function(key, name, pageSize, num) {//左边素材库初始化
			var url,time,categoryUrl;
			if($scope.picture){//图片库
				$scope.fileType = 4;
				categoryUrl = PREFIX_URL + "index.php?c=upfile&a=getfiletype&filetype=tpType";
				pageTplService.getPageTplTypestempLongpage(key, name, pageSize, num , $scope.fileType).then(function(data) {
					if (G = !1, data.data.list && data.data.list.length > 0) {
						pageNo > 1 ? $scope.pageTpls = $scope.pageTpls.concat(data.data.list) : $scope.pageTpls = data.data.list;
						totalPage = Math.ceil(data.data.map.count / pageSize);
						time = data.config.url.split("&time")[0];
						dataCacheService.contains(time) || (dataCacheService.push("pageTpl", dataCacheService.getAsyncUrl(), data), dataCacheService.setAsyncUrl());
					}else {
						$scope.pageTpls = [];
						totalPage = 0;
					}
				});
				$scope.picture && $.get(categoryUrl, function (data) {//一级分类
		            $scope.sysCategoryList = data;
		        });
		        key && $scope.picture && ($http({//二级分类
					withCredentials: !0,
					method: "GET",
					url: PREFIX_URL + "index.php?c=upfile&a=systag&type=11&bizType="+key
				}).then(function(data) {
					if(data.data.list.length > 0){
						$scope.showPicTag = true;
					}else{
						$scope.showPicTag = false;
						$scope.picTag = [];
					}
					$scope.picTag = data.data.list;
					
				}));
			}else if($scope.bg){//背景库
				$scope.fileType = 3;
				categoryUrl = PREFIX_URL + "index.php?c=upfile&a=getfiletype&filetype=bgType";
				pageTplService.getPageTplTypestempLongpage(key, name, pageSize, num , $scope.fileType).then(function(data) {
					if (G = !1, data.data.list && data.data.list.length > 0) {
						pageNo > 1 ? $scope.pageTpls = $scope.pageTpls.concat(data.data.list) : $scope.pageTpls = data.data.list;
						totalPage = Math.ceil(data.data.map.count / pageSize);
						time = data.config.url.split("&time")[0];
						dataCacheService.contains(time) || (dataCacheService.push("pageTpl", dataCacheService.getAsyncUrl(), data), dataCacheService.setAsyncUrl());
					} else {
						$scope.pageTpls = [];
						totalPage = 0;
					}
				});
				$.get(categoryUrl, function (data) {//一级分类
		            $scope.sysCategoryList = data
		        });
		        key && ($http({//二级分类
					withCredentials: !0,
					method: "GET",
					url: PREFIX_URL + "index.php?c=upfile&a=systag&type=11&bizType="+key
				}).then(function(data) {
					(data.data.list.length > 0) ? ($scope.showPicTag = true) : ($scope.showPicTag = false, $scope.picTag = []);
					$scope.picTag = data.data.list;
					
				}));
			}else{
				$scope.fileType = 0;
				pageTplService.getPageTplTypestempLongpage(key, name, pageSize, num, $scope.fileType).then(function(data) {
					//debugger;
					if (G = !1, data.data.list && data.data.list.length > 0) {
						pageNo > 1 ? $scope.pageTpls = $scope.pageTpls.concat(data.data.list) : $scope.pageTpls = data.data.list;
						totalPage = Math.ceil(data.data.map.count / pageSize);
						time = data.config.url.split("&time")[0];
						dataCacheService.contains(time) || (dataCacheService.push("pageTpl", dataCacheService.getAsyncUrl(), data), dataCacheService.setAsyncUrl())
					} else {
						$scope.pageTpls = [];
						totalPage = 0;
					}
				})
			}
			
		} , $scope.enterPress = function(event) {//左边素材库enter键搜索
			var pressEvent = event || window.event;
			13 == pressEvent.keyCode && $scope.getPageTpls();
		}, $scope.getPageTpls = function(num) {//左边素材库搜索
			var tplKey = "";
			num || (num = pageNo = 1);
			for (var key in $scope.pageTpl){
				"name" != key && $scope.pageTpl[key] && (tplKey += $scope.pageTpl[key] + ",");
			}
			"" !== tplKey && (tplKey = tplKey.substr(0, tplKey.length - 1));
			$scope.pageTpl.name && "" !== $scope.pageTpl.name && ($scope.showSearch = !1);
			if($scope.tabid=='myCollection'){
				$scope.myPageTpls && $scope.getPageTplsByMyType($scope.fileType, tplKey, $scope.pageTpl.name, pageSize, num);
			}else{
				$scope.getPageTplTypestemp(tplKey, $scope.pageTpl.name, pageSize, num);}
			};

		$scope.getPageTpls();

		$scope.resetTplFilter = function() {//reset search
			$scope.pageTpl.name = null;
			$scope.showSearch = !0;
			$scope.getPageTpls();

		}
		$scope.support = function() {
			if(window.sessionStorage && "false" === sessionStorage.getItem("checkSuport")){
				return !1;
			}else{ 
				if(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv:11/) || navigator.userAgent.match(/Chrome/)){
					return !1;
				}else if(navigator.userAgent.match(/iPad/) && navigator.userAgent.match(/CriOS/)){
					return !1;
				}else{
					continueUrl.setUrl($location.path());
					$location.path("scene/support");
					return !0;
				}
			}
		};
		if (!$scope.support()) {
			$scope.createCompGroup = function(type, data) {//创建联系人
				$scope.sceneSetting.showFlag = !1;
				if("g101" == type && isExistSubmitBtn()){
					ModalService.openMsgDialog({
						msg: "当前页面的提交按钮已经存在，本操作将会删除已添加的按钮。"
					});
					angular.forEach($scope.tpl.obj.elements, function(item) {
						6 == ("" + item.type).charAt(0) && ($("#nr").find("#inside_" + item.id).remove(), selectService.deleteElement(item.id), sceneService.deleteElement(item.id))
					})
				}
				sceneService.createCompGroup(type, null, data);
			};
			$scope.isRadioCheckboxRatingAccessable = security.isAllowToAccess(security.accessDef.RADIO_CHECKBOX_RATING);
			$scope.isInteractionAccessable = security.isAllowToAccess(security.accessDef.INTERACTION);
			$scope.isInteractionCounterAccessable = security.isAllowToAccess(security.accessDef.INTERACTION_COUNTER);
			$scope.updateCompPosition = sceneService.updateCompPosition;
			$scope.updateCompAngle = sceneService.updateCompAngle;
			$scope.updateCompSize = sceneService.updateCompSize;
			$scope.openAudioModal = sceneService.openAudioModal;
			$scope.openTriggerMode = sceneService.openTriggerMode;
			$scope.$on("dom.changed", function(event, data) {
				$compile($("#nr"))($scope), 
				//初始化网格和感应区
				$scope.container = $element.find(".edit_wrapper");
				$scope.pageHeight = data ? data : $scope.pageHeight;
				!$scope.container.find(".eq-block-grid")[0] && gridGuide.grid.init($scope.container);//网格
				!$scope.container.find(".eq-block-guides")[0] && gridGuide.guide.init($scope.container);//感应区

				$rootScope.$broadcast("boxOuter");
			});
			var cropImage = null;
			$scope.$on("showCropPanel", function(event, data) {
				var cropPanel = $(".content").eq(0);
				if(cropImage){
					$rootScope.$broadcast("changeElemDef", data);
					cropImage.show();
				}else{
					cropImage = $compile("<div crop-image></div>")($scope);
				}
				cropPanel.append(cropImage);
			});
			$scope.openPageEffectModal = function(effect) {//右边打开特效框
				var newEffect = angular.copy(effect);
				$modal.open({
					windowClass: "console six-contain effect-console",
					templateUrl: BASE_URL + "templates/scene.console.pageeffect.tpl.html",
					controller: "pageEffectCtrl",
					resolve: {
						properties: function() {
							return newEffect
						}
					}
				}).result.then(function(data) {//回调函数
					$scope.tpl.obj.properties || ($scope.tpl.obj.properties = {}), 
					$scope.tpl.obj.properties.scratch = null, 
					$scope.tpl.obj.properties.finger = null, 
					$scope.tpl.obj.properties.fallingObject = null, 
					$scope.tpl.obj.properties.effect = null, 
					"无" != data.name && ($scope.tpl.obj.properties[data.value] = data.properties[data.value]), 
					$scope.effectName = data.name
				}, function() {
					$rootScope.$broadcast("clear.scratch.interval")
				})
			};
			var pageEffect, stylePanel = null;
			$scope.$on("showStylePanel", function(event, data) {
				var containment = $("#containment").eq(0);
				
				if(stylePanel){
					stylePanel.show()
				}else{
					if("style" == data.activeTab){
						stylePanel = $compile('<div style-modal active-tab="style"></div>')($scope);
					}else if("anim" == data.activeTab){
						stylePanel = $compile('<div style-modal active-tab="anim"></div>')($scope);
					}else if("trigger" == data.activeTab){
						stylePanel = $compile('<div style-modal active-tab="trigger"></div>')($scope);
					}
				}
				containment.append(stylePanel);
				$(".longpageStatis").length > 0 && $(".longpageStatis").hide();
			}), $scope.$on("hideStylePanel", function(event) {
				stylePanel && stylePanel.hide();

			}), $scope.refreshPage = function(pageObj, index) {//刷新预览 
				if ($scope.completeHtml2Canvas) {
					return void $scope.completeHtml2Canvas.then(function() {
						$scope.refreshPage(pageObj, index)
					});
				}
				parseInt(index, 10);
				$("#nr").empty();
				sceneService.templateEditor.parse({// = eqShow.templateParser("jsonParser")
					def: $scope.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				});
				$rootScope.$broadcast("dom.changed")
			};
			$scope.saveUsedFiles = function(saveSceneFun) {
				var elements = [];
				$.extend(elements, $scope.tpl.obj.elements);

				var originDataElements = JSON.parse($scope.originData).obj.elements;

				for (var i = 0; i < elements.length; i++) {
					// console.log(elements.length);
					var element = elements[i];
					if (element.sound || element.type + "" == "3" || element.type + "" == "4"){
						for (var j = 0; j < originDataElements.length; j++) {
							var originDataElement = originDataElements[j];
							if (element.id == originDataElement.id) {
								if(element.type + "" != "3" && element.type + "" != "4"){
									!element.sound || originDataElement.sound && originDataElement.sound.id == element.sound.id || dataCacheService.pushUsedFile(2, element.sound.id);
								}else{
									element.properties.id != originDataElement.properties.id && dataCacheService.pushUsedFile(1, element.properties.id);
								}
								break;
							}
							if(j == originDataElements.length - 1){
								if(element.type + "" != "3" && element.type + "" != "4"){
									dataCacheService.pushUsedFile(2, element.sound.id);
								}else{
									dataCacheService.pushUsedFile(1, element.properties.id);
								}
							}
						}
					}
				}
				var data = dataCacheService.getUsedFiles();
				dataCacheService.clearUsedFiles();
				if(data){
					fileService.saveFilesHistory(data.file, data.type).then(function() {
						saveSceneFun && saveSceneFun()
					});
				}else{
					saveSceneFun && saveSceneFun();
				}
			}, $scope.stopCopy = function() {
				copied = !1
			}/*; $scope.getOriginPageName = function(page) {//获得焦点时获取标签名
				pageTagName = page.name
			},*/ $scope.getPageNames = function() {
				var sceneId = $stateParams.sceneId;
				sceneService.getPageNames(sceneId).then(function(a) {
					$scope.pages =a.data.list;
					/*angular.forEach($scope.pages, function(a, b) {
						a.name || (a.name = "第" + (b + 1) + "页")
					});*/
					getPageData($location.search().pageId ? $location.search().pageId : $scope.pages[0].num)
				})
			}, 
			$scope.scene = null, 
			sceneService.getSceneDetail($stateParams.sceneId, $rootScope.branchid).then(function(data) {
				$scope.scene = sceneService.getCurrentScene();
				$scope.sceneSetting.oldBgAudio = $scope.scene.bgAudio;
				$scope.getPageNames();

			}), $scope.removeScratch = function(event) {//去除特效
				event.stopPropagation(), 
				$scope.tpl.obj.properties.scratch = null, 
				$scope.tpl.obj.properties.finger = null, 
				$scope.tpl.obj.properties.fallingObject = null, 
				$scope.tpl.obj.properties.effect = null

			}, $scope.$on("text.click", function(event, elem) {
				$("#btn-toolbar").remove(), $("body").append($compile("<toolbar></toolbar>")($scope));
				var top = $(elem).offset().top;
				$timeout(function() {
					$("#btn-toolbar").css("top", top - 50); 
					$("#btn-toolbar").show(); 
					$("#btn-toolbar").bind("click mousedown", function(event) {
						event.stopPropagation();
					});
					$(elem).wysiwyg_destroy();
					$(elem).wysiwyg();
					$(elem).trigger("dblclick").focus();
					setTimeout(function() {
						if (window.getSelection) {
							var selection = window.getSelection();
							selection.modify("move", "left", "documentboundary"), 
							selection.modify("extend", "right", "documentboundary")
						}
					})
				})
			}), $scope.findMultilFont = function(){//检取多字体
				var sceneData = $scope.tpl.obj.elements;
				var data = [];
				$scope.font = [];
				for(var i = 0; i< sceneData.length; i++){
					if(sceneData[i].type == "x"){
						data.push($(sceneData[i].content).css("font-family"))
					} //收集整个课件的字体
				}
				
				if(data.length > 0) {
					for(var j = 0; j < data.length; j++) {
						if ($scope.font.indexOf(data[j]) < 0) {
							data[j] && $scope.font.push(data[j])
						}
					}
				};//剔除总字体中重复的字体
				$scope.tpl.obj && ($scope.tpl.obj.font = $scope.font);
				return $scope.tpl.obj;
			};
			
			Array.prototype.indexOf = function(val) {//检查元素在数组中的下标
				for (var i = 0; i < this.length; i++) {
					if (this[i] == val) return i;
				}
				return -1;
			};
			Array.prototype.remove = function(val) {//根据下标删除数组中的元素
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
			};
			
			$rootScope.$on("make.shortPic.complete", function(event, url){
				$scope.scenePicUrl = url;
			});
			var isAlreadyCheck = !1;
			$scope.saveScene = function(isSave, fun) {
				$rootScope.$broadcast("make.shortPic");
				if (!$scope.scene.name && isSave && !$scope.sceneSetting.showFlag) {
					return void ModalService.openMsgDialog({
						msg: "尚未设置标题，请设置后再执行此操作",
						btn: "去设置"
					}, function() {
						$scope.sceneSetting.showFlag = !0
					});
				}
				if (!isAlreadyCheck) {
					
					$scope.findMultilFont(); //查找多字体

					if ($scope.sceneSetting.showFlag) {
						return void $scope.sceneSetting.saveSceneSetting().then(function() {
							$scope.saveScene(isSave, fun);
						});
					}
					if ($scope.sceneSetting.oldBgAudio != $scope.scene.bgAudio) {
						return void sceneService.saveSceneSettings($scope.scene).then(function() {
							fileService.saveFilesHistory($scope.scene.bgAudio ? $scope.scene.bgAudio.id : 0, 2).then(function() {
								dataCacheService.clear("fileService1");
							});
							$scope.sceneSetting.oldBgAudio = $scope.scene.bgAudio;
							$scope.saveScene(isSave, fun);
						});
					}
					if ($scope.completeHtml2Canvas) {
						return void $scope.completeHtml2Canvas.then(function() {
							$scope.saveScene(isSave, fun);
						});
					}
					if (isAlreadyCheck = !0, $scope.originData == JSON.stringify($scope.tpl)) {
						fun && fun();
						isSave && (!$scope.scene.publishTime || $scope.scene.updateTime > $scope.scene.publishTime ? successPop() : i18nNotifications.pushForCurrentRoute("scene.save.success.published", "notify.success"));
						return void(isAlreadyCheck = !1);
					}
					delete $scope.tpl.obj.scene;
					sceneService.resetCss();
					sceneService.saveScene($scope.tpl.obj).then(function(data) {
						isSave && $scope.saveUsedFiles();
						isAlreadyCheck = !1;
						if(data.data.success){
							$scope.scene.updateTime = (new Date).getTime();
							$scope.originData = angular.toJson($scope.tpl);
							tplId && (sceneService.recordTplUsage(tplId), tplId = null);
							fun && fun();
							return void(isSave && successPop());
						}else{
							return void alert("保存失败，服务器忙碌请稍后再试。");
						}
						
					}, function() {
						isAlreadyCheck = !1;
						alert("保存失败，服务器忙碌请稍后再试。");
					});
				}
			}, $scope.publishScene = function() {
				if($rootScope.user.company_ext.is_audit == "true"){
					ModalService.openMsgDialog({
						msg: "您的课件尚未通过审核，不能发布！",
						btn: "确定"
					});
				}else{
					if($scope.scene.name || $scope.sceneSetting.showFlag){
						if(2 != $scope.scene.status || $scope.allowPublish){
							if($scope.sceneSetting.showFlag){
								return void $scope.sceneSetting.saveSceneSetting().then(function() {
									$scope.publishScene();
								})
							}else{
								if($scope.sceneSetting.oldBgAudio != $scope.scene.bgAudio){
									return void sceneService.saveSceneSettings($scope.scene).then(function() {
										if($scope.scene.bgAudio){
											fileService.saveFilesHistory($scope.scene.bgAudio.id, 2).then(function() {
												dataCacheService.clear("fileService1"), 
												$scope.sceneSetting.oldBgAudio = $scope.scene.bgAudio;
												$scope.publishScene();
											})
										}else{
											$scope.sceneSetting.oldBgAudio = $scope.scene.bgAudio;
											$scope.publishScene();
										}
									})
								}else{
									if($scope.completeHtml2Canvas){
										return void $scope.completeHtml2Canvas.then(function() {
											$scope.publishScene();
										})
									}else{
										if(!$scope.allowPublish && $scope.scene.publishTime && $scope.scene.updateTime <= $scope.scene.publishTime && $scope.originData == angular.toJson($scope.tpl)){
											return void $location.path("spread/share/" + $scope.sceneId + "/socialShare");
										}else{
											return void $scope.saveUsedFiles(function() {
												$scope.saveScene(null, function() {
													sceneService.publishSceneLongPage($scope.tpl.obj.sceneId, $scope.scenePicUrl).then(function(data) {
														if(data.data.success){
															i18nNotifications.pushForNextRoute("scene.publish.success", "notify.success");
															$location.path("spread/share/" + $scope.sceneId + "/socialShare");
														}
													})
												})
											})
										}
									}
								}
							}
						}else{
							return void ModalService.openConfirmDialog({
								msg: "当前微课为不允许访问状态，发布微课将重新对外开放访问 ",
								confirmName: "坚持发布",
								cancelName: "保存退出"
							}, function() {
								$scope.allowPublish = !0;
								$scope.publishScene();
							}, function() {
								$scope.saveScene(null, function() {
									$location.path("spread/share/" + $scope.sceneId + "/socialShare");
								})
							})
						}
					}else{
						return void ModalService.openMsgDialog({
							msg: "尚未设置标题，请设置后再执行此操作",
							btn: "去设置"
						}, function() {
							$scope.sceneSetting.showFlag = !0;
						})
					}
				}
				
			}, $scope.exitScene = function() {
				JSON.parse($scope.originData);
				$location.$$search = {};
				if($scope.originData == angular.toJson($scope.tpl)){
					$location.path("main")
				}else{
					ModalService.openConfirmDialog({
						msg: "是否保存更改内容？",
						confirmName: "保存",
						cancelName: "不保存"
					}, function() {
						$scope.saveScene();
						$location.path("main");
					}, function() {
						$location.path("main");
					})
				} 
			}, $scope.duplicatePage = function() {//复制当前页
				$scope.saveScene(null, function() {
					getPageData($scope.pageNum, !1, !0)
				})
			};
			/*var L = function() {
					sceneService.deletePage($scope.tpl.obj.id).then(function() {
						$scope.loading = !1, 
						$location.$$search = {}, 
						$scope.pages.length == $scope.pageNum ? (
							$scope.pages.pop(), $location.search("pageId", --$scope.pageNum), getPageData($scope.pageNum, !1, !1)
						) : (
							$scope.pages.splice($scope.pageNum - 1, 1), $location.search("pageId", $scope.pageNum), getPageData($scope.pageNum, !1, !1)
						)
					}, function() {
						$scope.loading = !1
					})
				};*/
			$scope.removeBG = function(event) {//删除背景
				var i, elements = $scope.tpl.obj.elements;
				for (i = 0; i < elements.length; i++){
					if (3 == elements[i].type) {
						elements.splice(i, 1);//删除该背景数据
						var j;
						for (j = i; j < elements.length; j++){
							elements[j].num--;
						}
						break
					}
				}
				$rootScope.$broadcast("remove.scene.bg")
			},$scope.triggerToModel = function(){
				$scope.$broadcast("model.show");

			}, $scope.removeBGAudio = function(event) {
				event.stopPropagation();
				$scope.scene.bgAudio = null;
			}, $(".scene_title").on("paste", function(event) {
				event.preventDefault();
				var pasteText = (event.originalEvent || event).clipboardData.getData("text/plain") || prompt("Paste something..");
				document.execCommand("insertText", !1, pasteText)

			});
			$scope.myName = [{
				name: "我的"
			}];
			$scope.myCompany = [{
				name: "企业"
			}];
			$scope.creatCompanyTemplate = function() {//创建企业模板
				var obj = $.extend(!0, {}, $scope.tpl.obj);
				obj.islong = 1; //是否长图文模板
				if (delete obj.scene, $rootScope.user) {
					var companyTplId = parseInt($rootScope.user.companyTplId, 10);
					// var companyTplId =50;
					if(companyTplId){
						obj.sceneId = companyTplId;
					}else if($rootScope.companySceneId){
						obj.sceneId = $rootScope.companySceneId;
					}else{
						obj.sceneId = null;
					}

					sceneService.saveCompanyTpl(obj).then(function(data) {
						if(data.data.success){
							i18nNotifications.pushForCurrentRoute("companytpl.setting.success", "notify.success");
							$rootScope.companySceneId = data.data.obj;
							$scope.$broadcast("model.show");
							$scope.getPageTplsByCompanyType();
						}
					});
				} else{
					$scope.myCompanyTpls = [];
				}
			}, $rootScope.$on("saveCompanyTemplate", function() {
				$scope.creatCompanyTemplate();
			});

			var companySceneId = null;
			$scope.getPageTplsByCompanyType = function(userType) {//获取企业模板
				if(parseInt(userType) != 1){//用户为企业用户或者企业子用户时
					$scope.myCompanyTpls = [];
					$scope.myCompany[0].active = !0;
					if (!companySceneId){
						if ($rootScope.companySceneId){
							companySceneId = $rootScope.companySceneId;
						}else {
							var companyTplId = parseInt($rootScope.user.companyTplId, 10);
							companyTplId && (companySceneId = $rootScope.companySceneId = companyTplId);
						}
					}
					if(companySceneId){
						sceneService.previewSceneLongpage(companySceneId).then(function(data) {
							$scope.myCompanyTpls = data.data.list;
							$scope.tabid = "company";
						});
					}else{
						$scope.tabid = "company";
					}
				}else{//用户为免费用户时
					$scope.tabid = "company";
				}
				
			}, /*$scope.getRecentlyUsedTpls = function() {
				$scope.tabid = "recentlyUsed";
				sceneService.recentlyUsedTpls().then(function(data) {
					$scope.myRecentlyTpls = data.data.list;
				})
			},*/ $scope.setTplTab = function() {
				$scope.tabid = "template";
				$scope.myPageTpls = [];

			}, $scope.creatMyTemplate = function() {//创建我的模板
				var obj = $.extend(!0, {}, $scope.tpl.obj);
				obj.islong = 1; //是否长图文模板
				if (delete obj.scene, $rootScope.user) {
					var property = JSON.parse($rootScope.user.property);

					if(property && property.myTplId){
						obj.sceneId = property.myTplId;
					}else if($rootScope.mySceneId){
						obj.sceneId = $rootScope.mySceneId;
					}else{
						obj.sceneId = null;
					}

					sceneService.saveMyTpl(obj).then(function(data) {
						i18nNotifications.pushForCurrentRoute("mytpl.setting.success", "notify.success");
						$rootScope.mySceneId = data.data.obj;
						$scope.$broadcast("model.show");
						$scope.getPageTplsByMyType();
					})
				} else{
					$scope.myPageTpls = [];
				}
			}, $scope.$on("saveMyTemplate", function() {
				$scope.creatMyTemplate();
			});

			var mySceneId = null;
			$scope.getPageTplsByMyType = function(type,id,name,PS,PN) {//获取我的图片/我的背景/我的模板
				if(type){//图片/背景
					$scope.tabid = "myCollection";
					sceneService.previewSceneLongpage(mySceneId,type,id,name,PS,PN).then(function(data) {
						if (G = !1, data.data.list && data.data.list.length > 0) {
							PN > 1 ? $scope.myPageTpls = $scope.myPageTpls.concat(data.data.list) : $scope.myPageTpls = data.data.list;
							totalPage = Math.ceil(data.data.map.count / pageSize);
							time = data.config.url.split("&time")[0];
							dataCacheService.contains(time) || (dataCacheService.push("MyPageTpl", dataCacheService.getAsyncUrl(), data), dataCacheService.setAsyncUrl());
						} else {
							$scope.pageTpls = [];
							totalPage = 0;
						}
					})
				}else{//模板
					$scope.myPageTpls = [];
					$scope.myName[0].active = !0;

					if (!mySceneId) {
						if ($rootScope.mySceneId) {
							mySceneId = $rootScope.mySceneId;
						}else {
							var property = JSON.parse($rootScope.user.property);
							property && property.myTplId && (mySceneId = $rootScope.mySceneId = property.myTplId);
						}
					}
					mySceneId ? sceneService.previewSceneLongpage(mySceneId).then(function(data) {
						$scope.myPageTpls = data.data.list;
						$scope.tabid = "myCollection";
					}) : $scope.tabid = "myCollection"
				}
				
			}, $scope.$on("myPageList.update", function(event, elemId, elem, myTplId) {//更新模板
				if ("my-tpl" == elemId){
					for (i = 0; i < $scope.myPageTpls.length; i++){
						$scope.myPageTpls[i].id == myTplId && $scope.myPageTpls.splice(i, 1);
					}
				}
				if ("company-tpl" == elemId){
					for (i = 0; i < $scope.myCompanyTpls.length; i++){
						$scope.myCompanyTpls[i].id == myTplId && $scope.myCompanyTpls.splice(i, 1)
					}
				}
			}), $scope.$on("myPageList.delete", function(event, elemId, elem) {//删除模板
				"company-tpl" == elemId && 21 == $rootScope.user.type && (elem.context.firstElementChil$scope.outerHTML = "");
			});
			/*var O = {};
			$scope.getPageTplsByType = function(a) {
				O[a] ? ($scope.childCatrgoryList = O[a], $scope.getPageTplTypestemp($scope.childCatrgoryList[0].id), childTagCut()) : ($scope.childCatrgoryList = O[a] = staticResService.getPageTpls(a), $scope.getPageTplTypestemp($scope.childCatrgoryList[0].id), childTagCut())
			};
			var P = {};
			$scope.getPageTagLabel = function(a) {
				P[a] ? ($scope.pageLabel = P[a], R()) : $scope.scene && $scope.isAppEditor ? pageTplService.getPageTagLabel(1601).then(function(a) {
					$scope.pageLabel = P[1601] = a.data.list, R()
				}) : ($scope.pageLabel = P[a] = staticResService.getPageTpls(a), R())
			}, $scope.pageLabelAll = [];
			var Q, R = function(a) {
					pageTplService.getPageTagLabelCheck($scope.pageIdTag).then(function(a) {
						Q = a.data.list;
						for (var b = 0; b < $scope.pageLabel.length; b++) {
							for (var c = {
								id: $scope.pageLabel[b].id,
								name: $scope.pageLabel[b].name
							}, e = 0; e < Q.length; e++) {
								if (Q[e].id === $scope.pageLabel[b].id) {
									$rootScope.ischecked = !0;
									break
								}
								$rootScope.ischecked = !1
							}
							$scope.pageLabelAll.push(c)
						}
					})
				};
			$scope.exitPageTplPreview = function() {
				$("#nr").empty(), sceneService.templateEditor.parse({
					def: $scope.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				}), $rootScope.$broadcast("dom.changed")
			}, */$scope.insertPageTpl = function(pageTplId) {//使用模板
				$scope.loading = !0;
				var toInsertPageTpl = function(pageTplId) {
					sceneService.getSceneTpl(pageTplId).then(function(response) {
						$scope.controlView.showBgTag = !1;
						$scope.loading = !1;
						tplId = response.data.obj.id;
						$scope.tpl.obj.elements = sceneService.getElements();
						$("#nr").empty();
						historyService.addPageHistory($scope.tpl.obj.id, $scope.tpl.obj.elements);
						sceneService.templateEditor.parse({
							def: $scope.tpl.obj,
							appendTo: "#nr",
							mode: "edit"
						});
						angular.forEach($scope.tpl.obj.elements, function(item, index) {
							3 == item.type && ($scope.controlView.showBgTag = !0, $scope.currentBgDef = item);
						});
						$rootScope.$broadcast("dom.changed");
						$rootScope.$broadcast("switchBox", "longpage");
						$scope.$broadcast("boxOuter", parseInt(response.data.properties_text.longpage.longpageHeight));//高度自适应
					}, function() {
						$scope.loading = !1
					})
				};
				if($scope.tpl.obj.elements && $scope.tpl.obj.elements.length > 0){
					ModalService.openConfirmDialog({
						msg: "页面模板会覆盖编辑区域已有组件，是否继续？",
						confirmName: "是",
						cancelName: "取消"
					}, function() {
						toInsertPageTpl(pageTplId);
					});
				}else{
					toInsertPageTpl(pageTplId);
				}
			};/* $scope.chooseThumb = function() {
				$modal.open({
					windowClass: "console img_console",
					templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
					controller: "BgConsoleCtrl",
					resolve: {
						obj: function() {
							return {
								fileType: "0"
							}
						}
					}
				}).result.then(function(a) {
					$scope.tpl.obj.properties || ($scope.tpl.obj.properties = {}), $scope.tpl.obj.properties.thumbSrc = a.data
				}, function() {
					$scope.tpl.obj.properties.thumbSrc = null
				})
			}, $(window).bind("beforeunload", function() {
				return "请确认您的微课已保存"
			}), $scope.$on("$destroy", function() {
				$(window).unbind("beforeunload"), historyService.clearHistory(), sceneService.setCopy(!1), utilPictures.clearInterval()
			}), $scope.sortableOptions = {
				placeholder: "ui-state-highlight ui-sort-position",
				containment: "#containment",
				update: function(a, b) {
					var c = b.item.sortable.dropindex + 1,
						e = $scope.pages[b.item.sortable.index].id;
					$scope.saveScene(null, function() {
						sceneService.changePageSort(c, e).then(function(a) {
							getPageData(c, !1, !1, !0), $location.$$search = {}, $location.search("pageId", c), $scope.pageNum = c
						})
					})
				}
			},*/ $scope.$on("history.changed", function() {
				$scope.canBack = historyService.canBack($scope.tpl.obj.id);
				$scope.canForward = historyService.canForward($scope.tpl.obj.id);

			}),$scope.back = function() {
				if($scope.completeHtml2Canvas){
					return void $scope.completeHtml2Canvas.then(function() {
						$scope.back();
					});
				}else{
					$scope.controlView.showBgTag = !1;
					return void sceneService.historyBack();
				}
			}, $scope.forward = function() {
				if($scope.completeHtml2Canvas){
					return void $scope.completeHtml2Canvas.then(function() {
						$scope.forward();
					});
				}else{
					return void sceneService.historyForward();
				}
			}, $scope.openEffects = function() {
				$scope.tpl.obj.properties && ($scope.tpl.obj.properties.scratch || $scope.tpl.obj.properties.finger || $scope.tpl.obj.properties.fallingObject || $scope.tpl.obj.properties.effect) || $scope.openPageEffectModal($scope.tpl.obj.properties);

			}, $scope.openBgPanel = function() {
				$scope.controlView.showBgTag || $scope.createComp("3");

			}, $scope.openAudioPanel = function() {
				$scope.scene.bgAudio || $scope.openAudioModal();

			}, $scope.closeOtherPanel = function(str) {
				var isShow = !$scope.$eval(str);
				$scope.showBackgroundPanel = !1;
				$scope.showMusicPanel = !1;
				$scope.showEffectsPanel = !1;
				$scope.gridGuideSetting.showFlag = !1;
				$scope.$broadcast("hideBgOption");
				$scope.showBgOptionPanel = !1;
				$scope.$eval(str + "=" + isShow);

			}, $scope.removeAudio = function(event) {
				$scope.scene.bgAudio = null;

			}, $scope.sceneSetting = {
				showFlag: !1,//显示设置框
				oldBgAudio: null
			}, $scope.settingScene = function() {
				$scope.sceneSetting.showFlag = !0;

			};

			"show" == $location.search().openSetting && $timeout(function() {
				$scope.sceneSetting.showFlag = !0
			}, 100);

			$scope.$on("show.edit.bg", function(event, src) {
				$scope.controlView.showBgTag = !0;//高亮显示竖向导航栏背景图标
				$scope.currBgSrc = src;

			}), $scope.gridGuideSetting = {
				showFlag: !1
			}, $scope.replaceBg = function(currentBgDef) {
				sceneService.openBgModal(currentBgDef);
				$("#nr").find(".wrapper-background").css({
					animation: "",
					"animation-fill-mode": ""
				});
			};
			/*var S = [];
			$scope.showFirstTimeTip = function(a) {
				if ($scope.sceneSetting.showFlag = !1, "x" == a && ($scope.showXiuFontTip = !0, window.localStorage)) {
					var b = localStorage.getItem("setXiuFontAction");
					b && (S = b.split(","), S.indexOf($rootScope.user.id) > -1 && ($scope.showXiuFontTip = !1, sceneService.createComp("x")))
				}
			}, $scope.switchShowFontTip = function(a) {
				a && (S.push($rootScope.user.id), localStorage.setItem("setXiuFontAction", S.join(",")))
			},$scope.hidePageTip = function() {
	            storageService.get("create.showAddPageTip") || (storageService.push("create.showAddPageTip", !1), $scope.showAddPageTip = !1)
	        },*/$scope.changeEditorScaling = function(type){
	        	$(".scaleBox").fadeIn(300);
	        	var height = $scope.tpl.obj.id == sessionStorage.getItem("longpageID") ? sessionStorage.getItem("longpageHeight") : 486;
	        	var scale;

	        	if(type == 'big'){
	        		Time = Time == 0 ? 1 : Time;
	        		$scope.scale < 1.5 ? (scale = parseFloat($scope.scale) ,scale += 0.1 ,$scope.scale = parseFloat(scale).toFixed(1),Time++,$scope.smaller = true) : ($scope.bigger = false, Time = 6);
	        		(Time <= 6) && ($scope.marginTop = -314 - Time * 2);
	        		$(".edit_area").css({
		        		height: height,
		        		transformOrigin: "top center",
		        		transform: "scale("+$scope.scale+")",
		        		top: -2
		        	}),
		        	$(".box").css({
		        		transformOrigin: "top center",
		        		transform: "scale("+$scope.scale+")",
		        		marginTop: $scope.marginTop
		        	}),
		        	$(".wrapper-background").css({
		        		transformOrigin: "top center",
		        		transform: "scale("+$scope.scale+")",
		        		marginTop: -297
		        	});
	        	}else{
	        		//$scope.scale > 0.6 ? (scale = parseFloat($scope.scale) ,scale -= 0.1 ,$scope.scale = parseFloat(scale).toFixed(1),Time--,$scope.bigger = true) : ($scope.smaller = false,Time = -4);
	        		$scope.scale > 1 ? (scale = parseFloat($scope.scale) ,scale -= 0.1 ,$scope.scale = parseFloat(scale).toFixed(1),Time--,$scope.bigger = true) : ($scope.smaller = false,Time = 0);
	        		(Time > 0) && ($scope.marginTop += $scope.scale >= 1 ? 2 : -Time);
	        		$(".edit_area").css({
		        		height: height,
		        		transformOrigin: "top center",
		        		transform: "scale("+$scope.scale+")",
		        		top: -2
		        	}),
		        	$(".box").css({
		        		transformOrigin: "top center",
		        		transform: "scale("+$scope.scale+")",
		        		marginTop: $scope.marginTop
		        	}),
		        	$(".wrapper-background").css({
		        		transformOrigin: "top center",
		        		transform: "scale("+$scope.scale+")",
		        		marginTop: -297
		        	});
	        	}
	        	gridGuide.grid.paint(gridGuide.grid.boxWidth,Math.floor(height * $scope.scale),$scope.scale);
	        },$scope.$watch("scale",function(newValue,oldValue){
	        	$timeout(function(){
	        		$(".scaleBox").fadeOut(300);
	        	},500)
	        }),$scope.preview = function(){
	        	$modal.open({
					windowClass: "console preview_console",
					templateUrl: BASE_URL + "templates/scene.console.longpage.preview.tpl.html",
					controller: "longPagePreview",
					resolve: {
						obj: function() {
							return {
								scene: $scope.scene,
								height: $scope.tpl.obj.properties.longpage.longpageHeight
							}
						}
					}
				}).result.then(function(data) {
					
				})
	        },$scope.replaceByClick = function(img, type, event) {//$scope.picture为true，图片
	        	if(!img.shape){
	        		img.shape = {};
	        		img.shape.width = event.target.naturalWidth;
	        		img.shape.height = event.target.naturalHeight;
	        	}
				var obj = (img.path || img.tmbPath) && {
					type: type,
					id: img.id,
					data: img.path || img.tmbPath,
					width: img.shape.width,
					height: img.shape.height
				}
				type == 4 ? sceneService.addImg(sceneService.getElementData(obj.type), obj) : sceneService.addBg(sceneService.getElementData(obj.type), obj);
			};

			$scope.uploader = uploaderService.uploader(1);//上传图片/背景

			$scope.$on("uploadfiles.add", function(event) {//删减上传图片数量个我的图片/背景，为更新我的图片/背景作准备
				dataCacheService.clear("fileService");
				if($scope.myPageTpls.length == pageSize){
					$scope.myPageTpls.splice($scope.myPageTpls.length - $scope.uploader.queue.length - 1, $scope.uploader.queue.length);
				}
			});

			var uploaderData;
			$scope.$on("thumbnailList.update", function(event, data) {//更新我的图片库/背景库
				for (var i = 0; i < $scope.uploader.queue.length; i++) {
					100 == $scope.uploader.queue[i].progress && ($scope.uploader.queue.splice(i, 1), uploaderData = data, $scope.myPageTpls.unshift(uploaderData));
				}
				dataCacheService.clear("fileService");
			}),$scope.$watch("fileType", function(newValue, oldValue) {//监视文件类型设置上传接口
				var type = newValue == 3 ? 0 : 1;
				$scope.uploader = uploaderService.uploader(type);
				var url = PREFIX_URL + "index.php?c=upfile&a=upload&bizType=0&fileType=" + type;
				$scope.uploader && ($scope.uploader.url = url);
			}),$scope.$on("boxOuter",function(event, data, tagName){//监视编辑框高度变化
				var height = data ? data : (parseInt(sessionStorage.getItem("longpageHeight")) ? parseInt(sessionStorage.getItem("longpageHeight")) : $scope.longpage.longpageHeight);
				$scope.pageHeight = height;
				if(!tagName || (tagName && (tagName == "DIV"))){
					$(".box").height(height+34);
					$(".internal-box").height(height);
					$(".eq-block-guides").height(height);
					$(".edit_area").height(height);
					$(".edit_areaBox").height(height);
					/*$(".edit_wrapper").height(height+300);*/
					$(".wrapper-background").height(height);
					gridGuide.grid.paint(gridGuide.grid.boxWidth,height);
					
					//当高度变化时
					if(data && (height != $scope.tpl.obj.properties.longpage.longpageHeight)){
						$scope.tpl.obj.properties.longpage.longpageHeight = height;
					}
				}
				
				
			}),$scope.$watch("pageHeight", function(newValue, oldValue){
				if($scope.loadTime && newValue >= 486){
					sessionStorage.setItem("longpageHeight",$scope.pageHeight);
					$scope.$broadcast("boxOuter", parseInt(newValue));
				}
			}),$scope.addPageLength = function(addLength){
				$scope.pageHeight += parseInt(addLength);
			},$scope.dePageLength = function(deLength){
				$scope.pageHeight = ($scope.pageHeight - parseInt(deLength)) > 486 ? ($scope.pageHeight - parseInt(deLength)) : 486;
			}/*,$scope.makeShortPic = function(){
				$rootScope.$broadcast("make.shortPic");
			}*/;
		}
}]);