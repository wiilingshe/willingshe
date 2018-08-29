angular.module("scene.create").controller("CreateSceneCtrl", ["$timeout", "$compile", "$rootScope", "$scope", "$stateParams", "$state", "$location", "sceneService", "pageTplService", "$modal", "ModalService", "security", "$window", "i18nNotifications", "historyService", "panStateTracker", "selectService", "continueUrl", "triggerService", "staticResService", "dataCacheService", "fileService", "storageService", "$element", "gridGuide", "sceneViewService", "$interval", function($timeout, $compile, $rootScope, $scope, $stateParams, f, $location, sceneService, pageTplService, $modal, ModalService, security, n, i18nNotifications, historyService, panStateTracker, selectService, continueUrl, t, staticResService, dataCacheService, fileService, storageService, $element, gridGuide, sceneViewService, $interval) {
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
	});*/
		
		window.isEmpty = function(obj) {
			for (var name in obj) {
				return false;
			}
			return true;
		};
		function isExistSubmitBtn() {
			var submitButton = !1;
			angular.forEach($scope.tpl.obj.elements, function(item) {
				6 == ("" + item.type).charAt(0) && (submitButton = !0)
			});
			return submitButton;
		}
		function getPageData(pageNum, isInsert, isCopy, isChangeSort) {
			sessionStorage.setItem("pageid", $scope.pages[pageNum - 1].id);
			$scope.loading = !0;
			$scope.pageId = $scope.pages[pageNum - 1].id;

			sceneService.getSceneByPage($scope.pageId, isInsert, isCopy).then(function(data) {
				$scope.font = data.data.obj.scene.font; //多字体文件动态导出
				$scope.loading = !1;
				$scope.tpl = data.data;
				pageEffect = $scope.tpl.obj.properties;
				pageEffect && pageEffect.trigger && t.setTrigger($scope.tpl.obj.id, pageEffect.trigger);
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
				
				newObj.elements = historyService.addPage(newObj.id, newObj.elements);
				sceneService.templateEditor.parse({
					def: $scope.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				});

				$scope.originData = JSON.stringify($scope.tpl);
				$rootScope.$broadcast("dom.changed");
				$rootScope.$broadcast("switchBox", $scope.showPhone);
				$scope.editLoading = !1;//加载条
			}, function() {
				$scope.loading = !1;
			})
		}
		function successPop() {
			i18nNotifications.pushForCurrentRoute("scene.save.success.nopublish", "notify.success")
		}
		
		$scope.loading = !1, 
		$scope.PREFIX_FILE_HOST = PREFIX_FILE_HOST, 
		$scope.tpl = {}, 
		$scope.originData = "", 
		$scope.font = [];
		$scope.editLoading = !0;//加载条

		var tplId, //套用模板的id，用于统计模板使用次数
			pageTagName = "", //修改右边页面序列名
			pageSize = 21, 
			pageNo = 1, 
			totalPage = 0, 
			G = !1;
		$scope.templateType = 1, 
		$scope.controlView = {}, 
		$scope.showSearch = !0, 
		$scope.completeHtml2Canvas = null, 
		$scope.lastPageTypes = [{
				name: "微学宝尾页",
				value: "eqFree"
			}, {
				name: "微学宝底标",
				value: "eqLink"
			}, {
				name: "去掉微学宝展示",
				value: "eqHide"
		}], 
		$scope.pageTpl = {}, 
		$scope.isAppEditor = !1, 
		$scope.tabid = "template";

		$scope.$watch("user", function(newVal) {
			if (newVal){
				for (var i = 0; i < newVal.roleIdList.length; i++){
					13 == newVal.roleIdList[i] && ($scope.isAppEditor = !0);
					(4 == newVal.roleIdList[i] || 12 == newVal.roleIdList[i] || 13 == newVal.roleIdList[i]) && ($scope.isTplEditor = !0);
				}
			}
		}, !0);
		$scope.refreshTpl = function() {
			totalPage > pageNo && !G && (G = !0, $scope.getPageTpls(++pageNo))
		}, 
		$scope.showPhone = "false" == storageService.get("create.phoneView") ? !1 : !0, 
		$scope.showPhoneTip = "false" == storageService.get("create.showPhoneTip") ? !1 : !0, 
		$scope.switchPhone = function() {
			$scope.showPhone = !$scope.showPhone;
			$rootScope.$broadcast("switchBox", $scope.showPhone);
			storageService.push("create.phoneView", $scope.showPhone);
			storageService.get("create.showPhoneTip") || (storageService.push("create.showPhoneTip", !1), $scope.showPhoneTip = !1);

		}, $scope.$on("switchBox", function(event, showPhone) {
			showPhone ? $(".edit_wrapper").append($('<div ng-if="showPhone" class="phone"><h4 class="name">' + $scope.scene.name + '</h4> </div>')) : $(".workspace .phone").remove();

		}), $scope.createComp = function(type, kind) {
			$scope.sceneSetting.showFlag = !1;
			if("6" == type && isExistSubmitBtn()){
				return void ModalService.openMsgDialog({
					msg: "当前页面的提交按钮已经存在，请不要重复添加。"
				})
			}else{
				return void sceneService.createComp(type, null, kind);
			}
		}, $scope.$on("hisChange", function() {
			historyService.addPageHistory($scope.tpl.obj.id, $scope.tpl.obj.elements);

		}), pageTplService.getPageTagLabel(11001).then(function(data) {
			$scope.tplFormatList = data.data.list;

		}), pageTplService.getPageTagLabel(11003).then(function(data) {
			$scope.tplInteractionList = data.data.list;

		}), pageTplService.getPageTagLabel(11002).then(function(data) {
			$scope.tplStyleList = data.data.list;

		}), $scope.getPageTplTypestemp = function(key, name, pageSize, num) {
			pageTplService.getPageTplTypestemp(key, name, pageSize, num).then(function(data) {
				if (G = !1, data.data.list && data.data.list.length > 0) {
					$scope.pageTpls = pageNo > 1 ? $scope.pageTpls.concat(data.data.list) : data.data.list;
					totalPage = Math.ceil(data.data.map.count / pageSize);
					var url = data.config.url.split("&time")[0];
					dataCacheService.contains(url) || (dataCacheService.push("pageTpl", dataCacheService.getAsyncUrl(), data), dataCacheService.setAsyncUrl())

				} else{
					$scope.pageTpls = [], totalPage = 0
				}
			})
		}, $scope.enterPress = function(event) {//模板搜索
			var pressEvent = event || window.event;
			13 == pressEvent.keyCode && $scope.getPageTpls();
			
		}, $scope.getPageTpls = function(num) {
			var tplKey = "";
			num || (num = pageNo = 1);
			for (var key in $scope.pageTpl){
				"name" != key && $scope.pageTpl[key] && (tplKey += $scope.pageTpl[key] + ",");
			}
			"" !== tplKey && (tplKey = tplKey.substr(0, tplKey.length - 1));
			$scope.pageTpl.name && "" !== $scope.pageTpl.name && ($scope.showSearch = !1);
			$scope.getPageTplTypestemp(tplKey, $scope.pageTpl.name, pageSize, num);

		};

		$scope.getPageTpls();
		
		$scope.resetTplFilter = function() {
			$scope.pageTpl.name = null;
			$scope.showSearch = !0;
			$scope.getPageTpls();

		}, $scope.support = function() {
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
				$scope.sceneSetting.showFlag = !1, "g101" == type && isExistSubmitBtn() && (ModalService.openMsgDialog({
					msg: "当前页面的提交按钮已经存在，本操作将会删除已添加的按钮。"
				}), angular.forEach($scope.tpl.obj.elements, function(item) {
					6 == ("" + item.type).charAt(0) && ($("#nr").find("#inside_" + item.id).remove(), selectService.deleteElement(item.id), sceneService.deleteElement(item.id))
				}));
				sceneService.createCompGroup(type, null, data)
			}, 
			$scope.isRadioCheckboxRatingAccessable = security.isAllowToAccess(security.accessDef.RADIO_CHECKBOX_RATING), 
			$scope.isInteractionAccessable = security.isAllowToAccess(security.accessDef.INTERACTION), 
			$scope.isInteractionCounterAccessable = security.isAllowToAccess(security.accessDef.INTERACTION_COUNTER), 
			$scope.updateCompPosition = sceneService.updateCompPosition, 
			$scope.updateCompAngle = sceneService.updateCompAngle, 
			$scope.updateCompSize = sceneService.updateCompSize, 
			$scope.openAudioModal = sceneService.openAudioModal, 
			$scope.openTriggerMode = sceneService.openTriggerMode;

			$scope.$on("dom.changed", function(event) {
				$compile($("#nr"))($scope);
				$rootScope.$broadcast("boxOuter");
				$scope.container = $element.find(".edit_wrapper");
				//$scope.editArea = $element.find(".edit_area");
				gridGuide.grid.init($scope.container); //网格
				gridGuide.guide.init($scope.container); //感应区
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
			$scope.openPageEffectModal = function(effect) {//横向导航栏特效按钮
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
				}).result.then(function(data) {
					$scope.tpl.obj.properties || ($scope.tpl.obj.properties = {});
					$scope.tpl.obj.properties.scratch = null;
					$scope.tpl.obj.properties.finger = null;
					$scope.tpl.obj.properties.fallingObject = null;
					$scope.tpl.obj.properties.effect = null;
					"无" != data.name && ($scope.tpl.obj.properties[data.value] = data.properties[data.value]);
					$scope.effectName = data.name;
				}, function() {
					$rootScope.$broadcast("clear.scratch.interval");
				})
			};
			var pageEffect, stylePanel = null;
			$scope.$on("showStylePanel", function(event, data) {//显示组件设置框
				var content = $(".content").eq(0);
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
				content.append(stylePanel);
			}), $scope.$on("hideStylePanel", function(event) {//隐藏组件设置框
				stylePanel && stylePanel.hide()
			}), $scope.refreshPage = function(pageObj, index) {//刷新预览
				if ($scope.completeHtml2Canvas){
					return void $scope.completeHtml2Canvas.then(function() {
						$scope.refreshPage(pageObj, index)
					});
				}
				parseInt(index, 10);
				$("#nr").empty();
				sceneService.templateEditor.parse({
					def: $scope.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				});
				$rootScope.$broadcast("dom.changed");
				$rootScope.$broadcast("switchBox", $scope.showPhone);
			}, $scope.navTo = function(page, index) {//切换页面
				
				$scope.controlView.pageList = !0;
				$scope.isTplEditor && ($scope.pageLabelAll.length = 0, $scope.pageIdTag = page.id, $scope.getPageTagLabel());
				if(page.id != $scope.tpl.obj.id){
					$scope.editLoading = !0;//加载条
					$scope.setEditableStatus();
					$scope.controlView.showBgTag = !1;
					$scope.saveUsedFiles(function() {
						$scope.saveScene(null, function() {
							getPageData(index + 1);
							$location.$$search = {};
							$location.search("pageId", page.num);
						})
					});
					panStateTracker.clear();
				}
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
			}, $scope.getOriginPageName = function(page) {//获取焦点时获取
				pageTagName = page.name
			}, $scope.getPageNames = function() {
				var sceneId = $stateParams.sceneId;
				sceneService.getPageNames(sceneId).then(function(data) {
					$scope.pages = data.data.list;
					angular.forEach($scope.pages, function(item, index) {
						item.name || (item.name = "第" + (index + 1) + "页");
					});
					getPageData($location.search().pageId ? $location.search().pageId : $scope.pages[0].num);
				})
			};

			$scope.scene = null;
			sceneService.getSceneDetail($stateParams.sceneId, $rootScope.branchid).then(function(data) {
				$scope.scene = sceneService.getCurrentScene();
				$scope.sceneSetting.oldBgAudio = $scope.scene.bgAudio;
				$scope.getPageNames();

			});

			$scope.editableStatus = [];
			$scope.setEditableStatus = function(index, status, event) {
				if (index !== undefined){
					$scope.editableStatus[index] = status;
				}else{
					for (var i = 0; i < $scope.editableStatus.length; i++){
						$scope.editableStatus[i] = !1
					}
				}
			}, $scope.savePageNames = function(page, index) {//失去焦点时保存
				page.name || (page.name = "第" + (index + 1) + "页");
				$scope.tpl.obj.name = page.name;
				pageTagName != page.name && sceneService.savePageNames($scope.tpl.obj).then(function(data) {
					i18nNotifications.pushForCurrentRoute("page.change.success", "notify.success");
				})
			}, $scope.removeScratch = function(event) {//删除特效
				event.stopPropagation();
				$scope.tpl.obj.properties.scratch = null;
				$scope.tpl.obj.properties.finger = null;
				$scope.tpl.obj.properties.fallingObject = null;
				$scope.tpl.obj.properties.effect = null;
				
			}, $scope.$on("text.click", function(event, elem) {
				$("#btn-toolbar").remove(), $("body").append($compile("<toolbar></toolbar>")($scope));
				var top = $(elem).offset().top;
				$timeout(function() {
					$("#btn-toolbar").css("top", top - 50), 
					$("#btn-toolbar").show(), 
					$("#btn-toolbar").bind("click mousedown", function(event) {
						event.stopPropagation()
					}), 
					$(elem).wysiwyg_destroy(), 
					$(elem).wysiwyg(), 
					$(elem).trigger("dblclick").focus(), 
					setTimeout(function() {
						if (window.getSelection) {
							var selection = window.getSelection();
							selection.modify("move", "left", "documentboundary"), 
							selection.modify("extend", "right", "documentboundary")
						}
					})
				})
			}), $scope.updatePosition = function(data) {
				var i, j, 
					elements = $scope.tpl.obj.elements, 
					arr = [];
				for (j = 0; j < elements.length; j++){
					if ("3" == elements[j].type) {
						elements[j].num = 0, arr.push(elements[j]), elements.splice(j, 1);
						break
					}
				}
				for (i = 0; i < data.length; i++){
					for (j = 0; j < elements.length; j++){
						if (elements[j].num == data[i]) {
							elements[j].num = i + 1, arr.push(elements[j]), elements.splice(j, 1);
							break
						}
					}
				}
				$scope.tpl.obj.elements = arr;
			}, $scope.updateEditor = function() {
				$("#nr").empty();
				sceneService.templateEditor.parse({
					def: $scope.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				});
				$compile($("#nr"))($scope);
			}, $scope.findMultilFont = function() {
				sceneViewService.getSceneData($stateParams.sceneId).then(function(data) {
					var sceneData = data.data.list;
					var data = [];
					($scope.font == null) && ($scope.font = [])
					for (var i = 0; i < sceneData.length; i++) {
						for (var j = 0; j < sceneData[i].elements.length; j++) {
							(sceneData[i].elements[j].type == "x") && (data.push($(sceneData[i].elements[j].content).css("font-family"))) //收集整个课件的字体
						}
					}
					if (data.length > 0) {
						for (var j = 0; j < data.length; j++) {
							if ($scope.font.indexOf(data[j]) < 0) {
								data[j] && $scope.font.push(data[j]);
							}
						}
					} //剔除总字体中重复的字体
					$scope.tpl.obj && ($scope.tpl.obj.font = $scope.font);
				});
			};
			Array.prototype.indexOf = function(val) {
				for (var i = 0; i < this.length; i++) {
					if (this[i] == val){
						return i;
					}
				}
				return -1;
			};
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
			};
			var isAlreadyCheck = !1; //保存前检查课件
			$scope.saveScene = function(isSave, fun) {
				if (!$scope.scene.name && isSave && !$scope.sceneSetting.showFlag){//未设置课件题目点击保存
					return void ModalService.openMsgDialog({
						msg: "尚未设置标题，请设置后再执行此操作",
						btn: "去设置"
					}, function() {
						$scope.sceneSetting.showFlag = !0
					});
				}
				if (!isAlreadyCheck) {
					//动态导出多字体
					$scope.findMultilFont();

					//动态导出多字体
					
					if ($scope.sceneSetting.showFlag){//设置框显示
						return void $scope.sceneSetting.saveSceneSetting().then(function() {
							$scope.saveScene(isSave, fun);
						});
					}
					if ($scope.sceneSetting.oldBgAudio != $scope.scene.bgAudio){//修改背景音乐
						return void sceneService.saveSceneSettings($scope.scene).then(function() {
							fileService.saveFilesHistory($scope.scene.bgAudio ? $scope.scene.bgAudio.id : 0, 2).then(function() {
								dataCacheService.clear("fileService1");
							});
							$scope.sceneSetting.oldBgAudio = $scope.scene.bgAudio;
							$scope.saveScene(isSave, fun);
						});
					}
					if ($scope.completeHtml2Canvas){//htmlcanvas的回调函数，继承于$rootScope
						return void $scope.completeHtml2Canvas.then(function() {
							$scope.saveScene(isSave, fun);
						});
					}

					isAlreadyCheck = !0;

					if ($scope.originData == JSON.stringify($scope.tpl)){//数据没有修改
						fun && fun();
						if(isSave){
							if(!$scope.scene.publishTime || $scope.scene.updateTime > $scope.scene.publishTime){
								successPop();
							}else{
								i18nNotifications.pushForCurrentRoute("scene.save.success.published", "notify.success");
							}
						}

						return void (isAlreadyCheck = !1);
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
							return void (isSave && successPop());

						}else{
							return void alert("保存失败，服务器忙碌请稍后再试。");
						}
					}, function() {
						isAlreadyCheck = !1;
						alert("保存失败，服务器忙碌请稍后再试。");
					})
				}
			}, $scope.publishScene = function() {
				if($rootScope.user.company_ext.is_audit == "true"){
					ModalService.openMsgDialog({
						msg: "您的课件尚未通过审核，不能发布！",
						btn: "确定"
					});
				}else{
					if($scope.scene.name || $scope.sceneSetting.showFlag){//已经设置课件标题/设置框已经显示
						if(2 != $scope.scene.status || $scope.allowPublish){//课件状态为允许访问/不允许访问且坚持发布
							if($scope.sceneSetting.showFlag){//设置框显示
								return void $scope.sceneSetting.saveSceneSetting().then(function() {
									$scope.publishScene()
								})
							}else{
								if($scope.sceneSetting.oldBgAudio != $scope.scene.bgAudio){//修改背景音乐
									return void sceneService.saveSceneSettings($scope.scene).then(function() {
										if($scope.scene.bgAudio){
											fileService.saveFilesHistory($scope.scene.bgAudio.id, 2).then(function() {
												dataCacheService.clear("fileService1");
												$scope.sceneSetting.oldBgAudio = $scope.scene.bgAudio;
												$scope.publishScene();
											})
										}else{
											$scope.sceneSetting.oldBgAudio = $scope.scene.bgAudio;
											$scope.publishScene();
										}
									})
								}else{
									if($scope.completeHtml2Canvas){//htmlcanvas的回调函数，继承于$rootScope
										return void $scope.completeHtml2Canvas.then(function() {
											$scope.publishScene();
										})
									}else{
										if(!$scope.allowPublish && $scope.scene.publishTime && $scope.scene.updateTime <= $scope.scene.publishTime && $scope.originData == angular.toJson($scope.tpl)){//已经发布过，且课件修改时间低于发布时间，且课件数据没有修改
											return void $location.path("spread/share/" + $scope.sceneId + "/socialShare");
										}else{
											return void $scope.saveUsedFiles(function() {
												$scope.saveScene(null, function() {
													sceneService.publishScene($scope.tpl.obj.sceneId).then(function(data) {
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
									$location.path("spread/share/" + $scope.sceneId + "/socialShare")
								})
							})
						}
					}else{
						return void ModalService.openMsgDialog({
							msg: "尚未设置标题，请设置后再执行此操作",
							btn: "去设置"
						}, function() {
							$scope.sceneSetting.showFlag = !0
						})
					}
				}
				
			}, $scope.exitScene = function() {
				JSON.parse($scope.originData);
				$location.$$search = {};
				if($scope.originData == angular.toJson($scope.tpl)){//检查是否数据是否修改过
					$location.path("main");
				}else{
					ModalService.openConfirmDialog({
						msg: "是否保存更改内容？",
						confirmName: "保存",
						cancelName: "不保存"
					}, function() {//保存
						$scope.saveScene();
						$location.path("main");
					}, function() {//不保存
						$location.path("main");
					});
				}
			}, $scope.duplicatePage = function() {//复制当前页
				$scope.saveScene(null, function() {
					getPageData($scope.pageNum, !1, !0);
				});
			}, $scope.insertPage = function() {//增加页面
				$scope.saveUsedFiles(function() { 
					$scope.saveScene(null, function() {
						getPageData($scope.pageNum, !0, !1);
					})
				});
				$("#pageList").height() >= 360 && $timeout(function() {
					var pageList = document.getElementById("pageList");
					pageList.scrollTop = pageList.scrollHeight
				}, 200);
			}, $scope.deletePage = function(event) {//删除页面
				event.stopPropagation();

				ModalService.openConfirmDialog({
					msg: "确定删除此页，删除后将不可恢复？"
				}, function() {
					if (1 != $scope.pages.length && !$scope.loading) {
						$scope.loading = !0;
						$scope.action = !1;//检查是否有输入框
						for (var i = 0; i < $scope.tpl.obj.elements.length; i++) {
							var elements = $scope.tpl.obj.elements;
							5 == elements[i].type.toString()[0] && ($scope.action = !0);
						}
						if($scope.action === !0){
							ModalService.openConfirmDialog({
								msg: "确定删除此页，将同时删除该微课已收集的数据?"
							}, function() {
								toDeletePage()
							});
						}else{
							toDeletePage();
						}
					}
				});
			};
			var toDeletePage = function() {
				sceneService.deletePage($scope.tpl.obj.id).then(function() {
					$scope.loading = !1;
					$location.$$search = {};
					if($scope.pages.length == $scope.pageNum){
						$scope.pages.pop();
						$location.search("pageId", --$scope.pageNum);
						getPageData($scope.pageNum, !1, !1);
					}else{
						$scope.pages.splice($scope.pageNum - 1, 1);
						$location.search("pageId", $scope.pageNum);
						getPageData($scope.pageNum, !1, !1);
					}
				}, function() {
					$scope.loading = !1
				})
			};
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
				obj.islong = 0; //是否长图文模板
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
			$scope.getPageTplsByCompanyType = function() {//获取企业模板
				$scope.myCompanyTpls = [];
				$scope.myCompany[0].active = !0;
				if (!companySceneId){
					if ($rootScope.companySceneId){
						companySceneId = $rootScope.companySceneId;
					}else {
						var companyTplId = parseInt($rootScope.user.companyTplId, 10);
						companyTplId && (companySceneId = $rootScope.companySceneId = companyTplId)
					}
				}
				if(companySceneId){
					sceneService.previewScene(companySceneId).then(function(data) {
						$scope.myCompanyTpls = data.data.list;
						$scope.tabid = "company";
					});
				}else{
					$scope.tabid = "company";
				}
			}, /*$scope.getRecentlyUsedTpls = function() {
				$scope.tabid = "recentlyUsed";
				sceneService.recentlyUsedTpls().then(function(data) {
					$scope.myRecentlyTpls = data.data.list;
				})
			}, */$scope.setTplTab = function() {
				$scope.tabid = "template";

			}, $scope.creatMyTemplate = function() {//创建我的模板
				var obj = $.extend(!0, {}, $scope.tpl.obj);
				obj.islong = 0; //是否长图文模板
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
						$scope.getPageTplsByMyType();
					})
				} else{
					$scope.myPageTpls = [];
				}
			}, $scope.$on("saveMyTemplate", function() {
				$scope.creatMyTemplate();
			});
			var mySceneId = null;
			$scope.getPageTplsByMyType = function() {//获取我的模板
				$scope.myPageTpls = [];
				$scope.myName[0].active = !0;
				if (!mySceneId){
					if ($rootScope.mySceneId){
						mySceneId = $rootScope.mySceneId;
					}else {
						var property = JSON.parse($rootScope.user.property);
						property && property.myTplId && (mySceneId = $rootScope.mySceneId = property.myTplId);
					}
				}
				if(mySceneId){
					sceneService.previewScene(mySceneId).then(function(data) {
						$scope.myPageTpls = data.data.list;
						$scope.tabid = "myCollection";
					})
				}else{
					$scope.tabid = "myCollection";
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
			$scope.getPageTplsByType = function(type) {
				if(O[type]){
					$scope.childCatrgoryList = O[type];
					$scope.getPageTplTypestemp($scope.childCatrgoryList[0].id);
					childTagCut();
				}else{
					$scope.childCatrgoryList = O[type] = staticResService.getPageTpls(type);
					$scope.getPageTplTypestemp($scope.childCatrgoryList[0].id);
					childTagCut();
				}
			};
			var P = {};
			$scope.getPageTagLabel = function(type) {
				if(P[type]){
					$scope.pageLabel = P[type];
					getPageTagLabelCheck();
				}else{
					if($scope.scene && $scope.isAppEditor){
						pageTplService.getPageTagLabel(1601).then(function(data) {
							$scope.pageLabel = P[1601] = data.data.list;
							getPageTagLabelCheck();
						})
					}else{
						$scope.pageLabel = P[type] = staticResService.getPageTpls(type);
						getPageTagLabelCheck();
					}
				}
			};

			$scope.pageLabelAll = [];

			var list, getPageTagLabelCheck = function(event) {
				pageTplService.getPageTagLabelCheck($scope.pageIdTag).then(function(data) {
					list = data.data.list;
					for (var i = 0; i < $scope.pageLabel.length; i++) {
						var pageLabelAttr = {
							id: $scope.pageLabel[i].id,
							name: $scope.pageLabel[i].name
						};
						for (var j = 0; j < list.length; j++) {
							if (list[j].id === $scope.pageLabel[i].id) {
								pageLabelAttr.ischecked = !0;
								break
							}
							pageLabelAttr.ischecked = !1
						}
						$scope.pageLabelAll.push(pageLabelAttr)
					}
				})
			};*/
			/*$scope.exitPageTplPreview = function() {
				$("#nr").empty();
				sceneService.templateEditor.parse({
					def: $scope.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				});
				$rootScope.$broadcast("dom.changed")
			}, */$scope.insertPageTpl = function(pageTplId) {//使用模板
				$scope.loading = !0;
				var toInsertPageTpl = function(pageTplId) {
					sceneService.getSceneTpl(pageTplId).then(function(data) {
						$scope.controlView.showBgTag = !1;
						$scope.loading = !1;
						tplId = data.data.obj.id;
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
						$rootScope.$broadcast("switchBox", $scope.showPhone);
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
			}, $scope.chooseThumb = function() {//选择本页缩略图
				$modal.open({
					windowClass: "console img_console",
					templateUrl: BASE_URL + "templates/scene.console.bg.tpl.html",
					controller: "BgConsoleCtrl",
					resolve: {
						obj: function() {
							return {
								fileType: "0"
							}
						}
					}
				}).result.then(function(data) {
					$scope.tpl.obj.properties || ($scope.tpl.obj.properties = {});
					$scope.tpl.obj.properties.thumbSrc = data.data;
				}, function() {
					$scope.tpl.obj.properties.thumbSrc = null
				})
			}, $(window).bind("beforeunload", function() {//关闭网页时提醒
				return "请确认您的微课已保存";

			}), $scope.$on("$destroy", function() {//关闭时解除监听事件
				$(window).unbind("beforeunload");
				historyService.clearHistory();
				sceneService.setCopy(!1);
				utilPictures.clearInterval();

			}), $scope.sortableOptions = {//插件---->拖动改变页面列表顺序
				placeholder: "ui-state-highlight ui-sort-position",
				containment: "#containment",
				update: function(event, data) {
					var dropindex = data.item.sortable.dropindex + 1, 
						id = $scope.pages[data.item.sortable.index].id;
					$scope.saveScene(null, function() {
						sceneService.changePageSort(dropindex, id).then(function(data) {
							getPageData(dropindex, !1, !1, !0);
							$location.$$search = {};
							$location.search("pageId", dropindex);
							$scope.pageNum = dropindex;
						})
					})
				}
			}, $scope.$on("history.changed", function() {
				$scope.canBack = historyService.canBack($scope.tpl.obj.id);
				$scope.canForward = historyService.canForward($scope.tpl.obj.id);

			}), $scope.back = function() {
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
			$scope.showFirstTimeTip = function(type) {
				if ($scope.sceneSetting.showFlag = !1, "x" == type && ($scope.showXiuFontTip = !0, window.localStorage)) {
					var setXiuFontAction = localStorage.getItem("setXiuFontAction");
					setXiuFontAction && (S = setXiuFontAction.split(","), S.indexOf($rootScope.user.id) > -1 && ($scope.showXiuFontTip = !1, sceneService.createComp("x")))
				}
			}, $scope.switchShowFontTip = function(hideFontTip) {
				hideFontTip && (S.push($rootScope.user.id), localStorage.setItem("setXiuFontAction", S.join(",")))
			};*/
		}
	}]);
