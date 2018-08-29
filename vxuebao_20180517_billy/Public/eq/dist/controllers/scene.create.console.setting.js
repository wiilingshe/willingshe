angular.module("scene.create.console.setting.anim", ["app.directives.uislider", "app.directives.limitInput"]), angular.module("scene.create.console.setting.anim").controller("AnimConsoleCtrl", ["$scope", "$rootScope", "sceneService", "security", function($scope, $rootScope, sceneService, security) {
		function previewCurrentChange(anim, thisCount) {//预览单个动画
			var animData = {
				anim: anim,
				animClasses: animClasses,
				count: thisCount,
				elemId: $scope.elemDef.id
			};
			$rootScope.$broadcast("previewCurrentChange", animData)
		}
		function previewAllChanges(anim, thisAnimClasses) {//预览所有动画
			var animData = {
				animations: anim,
				animClasses: thisAnimClasses,
				count: count,
				elemId: $scope.elemDef.id
			};
			$rootScope.$broadcast("previewAllChanges", animData)
		}
		var curElem = $scope.elemDef = sceneService.currentElemDef;

		$scope.animations = [];//已加的动画
		$scope.types = [];//已加动画的类型
		$scope.directions = [];//已加动画的方向
		
		var animCssName, count, animClasses = [];
		$scope.animTypeEnum = [
			{
				id: -1,
				name: "无"
			}, {
				id: 0,
				name: "淡入",
				cat: "进入"
			}, {
				id: 1,
				name: "移入",
				cat: "进入"
			}, {
				id: 2,
				name: "弹入",
				cat: "进入"
			}, {
				id: 20,
				name: "翻转进入",
				cat: "进入"
			}, {
				id: 3,
				name: "中心弹入",
				cat: "进入"
			}, {
				id: 4,
				name: "中心放大",
				cat: "进入"
			}, {
				id: 12,
				name: "翻滚进入",
				cat: "进入"
			}, {
				id: 24,
				name: "翻开进入",
				cat: "进入"
			}, {
				id: 13,
				name: "光速进入",
				cat: "进入"
			}, {
				id: 6,
				name: "摇摆",
				cat: "强调"
			}, {
				id: 5,
				name: "抖动",
				cat: "强调"
			}, {
				id: 7,
				name: "旋转",
				cat: "强调"
			}, {
				id: 8,
				name: "翻转",
				cat: "强调"
			}, {
				id: 9,
				name: "悬摆",
				cat: "强调"
			}, {
				id: 23,
				name: "闪烁",
				cat: "强调"
			}, {
				id: 21,
				name: "放大抖动",
				cat: "强调"
			}, {
				id: 22,
				name: "倾斜摆动",
				cat: "强调"
			}, {
				id: 10,
				name: "淡出",
				cat: "退出"
			}, {
				id: 17,
				name: "移出",
				cat: "退出"
			}, {
				id: 19,
				name: "弹出",
				cat: "退出"
			}, {
				id: 11,
				name: "翻转消失",
				cat: "退出"
			}, {
				id: 14,
				name: "中心消失",
				cat: "退出"
			}, {
				id: 18,
				name: "中心缩小",
				cat: "退出"
			}, {
				id: 15,
				name: "翻滚退出",
				cat: "退出"
			}, {
				id: 25,
				name: "翻开消失",
				cat: "退出"
			}, {
				id: 16,
				name: "光速退出",
				cat: "退出"
			}
		];
		var k, l, m = [26, 27, 28];//剔除id为26,27,28的数据
		if (!security.isAllowToAccess(security.accessDef.COMP_ANIMATION)){
			for (k = 0; k < $scope.animTypeEnum.length; k++){
				for (l = 0; l < m.length; l++){
					$scope.animTypeEnum[k].id == m[l] && ($scope.animTypeEnum.splice(k, 1), k--);
				}
			}
		}
		$scope.animDirectionEnum = [{
			id: 0,
			name: "从左向右"
		}, {
			id: 1,
			name: "从上到下"
		}, {
			id: 2,
			name: "从右向左"
		}, {
			id: 3,
			name: "从下到上"
		}];
		if (curElem.properties.anim) {
			if (curElem.properties.anim instanceof Array) {
				if (curElem.properties.anim.length) {
					for (k = 0; k < curElem.properties.anim.length; k++) {
						if (null != curElem.properties.anim[k].type && -1 != curElem.properties.anim[k].type) {
							for ($scope.animations.push(curElem.properties.anim[k]), l = 0, tlen = $scope.animTypeEnum.length; l < tlen; l++) {
								$scope.animations[k].type == $scope.animTypeEnum[l].id && ($scope.types[k] = $scope.animTypeEnum[l]);
							}
							for (l = 0, tlen = $scope.animDirectionEnum.length; l < tlen; l++) {
								$scope.animations[k].direction == $scope.animDirectionEnum[l].id && ($scope.directions[k] = $scope.animDirectionEnum[l]);
							}
						}
					}
				} else {
					curElem.properties.anim.splice(k, 1);
					k--;
				}
			} else {
				for (k = 0; k < $scope.animTypeEnum.length; k++) {
					$scope.animTypeEnum[k].id == curElem.properties.anim.type && ($scope.types[0] = $scope.animTypeEnum[k]);
				}
				if (null != curElem.properties.anim.direction) {
					$scope.directions[0] = $scope.animDirectionEnum[curElem.properties.anim.direction]
				} else {
					$scope.directions[0] = $scope.animDirectionEnum[0];
				}
				curElem.properties.anim.duration = parseFloat(curElem.properties.anim.duration);
				curElem.properties.anim.delay = parseFloat(curElem.properties.anim.delay);
				curElem.properties.anim.countNum = parseInt(curElem.properties.anim.countNum, 10) || 1;
				$scope.animations.push(curElem.properties.anim)
			}
		}
		curElem.properties || (curElem.properties = {});

		var initAnim = {//初始化动画数据
			type: null,
			direction: null,
			duration: 2,
			delay: 0,
			countNum: 1,
			count: null
		};
		$scope.addAnim = function(event) {
			if (!event.originalEvent._constructed) {
				var newInitAnim = angular.copy(initAnim);
				newInitAnim.type = $scope.animTypeEnum[0].id;
				newInitAnim.direction = $scope.animDirectionEnum[0].id;
				$scope.animations.push(newInitAnim);
				var animationsLength = $scope.animations.length;
				$scope.types[animationsLength - 1] = $scope.animTypeEnum[0];
				$scope.directions[animationsLength - 1] = $scope.animDirectionEnum[0];
			}
		}, $scope.removeAnim = function(index, event) {
			event.stopPropagation();
			$scope.animations.splice(index, 1);
			$scope.types.splice(index, 1);
			$scope.directions.splice(index, 1);

		}, $scope.clear = function() {
			$scope.animations = [];
		};
		$scope.$watch("animations", function(newVal, oldVal) {
			newVal != oldVal && (curElem.properties.anim = $scope.animations);
		}, !0);
		$scope.$watch("types", function(newVal, oldVal) {
			if (newVal && newVal != oldVal){
				for (var i = 0; i < newVal.length; i++){
					oldVal[i] && newVal[i].id != oldVal[i].id && previewCurrentChange($scope.animations[i], i)
				}
			}
		}, !0);
		$scope.$watch("directions", function(newVal, oldVal) {
			if (newVal && newVal != oldVal){
				for (var i = 0; i < newVal.length; i++){
					oldVal[i] && newVal[i].id != oldVal[i].id && previewCurrentChange($scope.animations[i], i)
				}
			}
		}, !0);
		$scope.previewAnim = function(event) {//预览动画
			if (!event.originalEvent._constructed) {
				for (var newAnimations = angular.copy($scope.animations), newAnim = [], newCount = [], i = 0; i < newAnimations.length; i++){
					if(null != newAnimations[i].type && -1 != newAnimations[i].type){
						newAnim.push(newAnimations[i]);
						newCount[i] = eqxCommon.convertType(newAnimations[i]);
					}else{
						newAnimations.splice(i, 1);
						i--;
					}
				}
				count = 0;
				previewAllChanges(newAnim, newCount)
			}
		}, $scope.changeAnimation = function(anim, index) {//选择动画
			animCssName = eqxCommon.convertType(anim), animClasses[index] = animCssName
		}
	}]);
angular.module("scene.create.console.setting.style", ["colorpicker.module", "app.directives.style", "app.directives.uislider", "app.directives.limitInput", "services.history"]);
angular.module("scene.create.console.setting.style").controller("StyleConsoleCtrl", ["$scope", "sceneService", function($scope, sceneService) {
		var curElem = $scope.elemDef = sceneService.currentElemDef;//被选中的当前素材数据
		delete curElem.css.borderTopLeftRadius, 
		delete curElem.css.borderTopRightRadius, 
		delete curElem.css.borderBottomLeftRadius, 
		delete curElem.css.borderBottomRightRadius, 
		delete curElem.css.border;
		
		var curElemCssList = curElem.css, 
			curElemElementBox = $("#inside_" + $scope.elemDef.id + " > .element-box");
		$scope.model = {
			backgroundColor: curElemCssList.backgroundColor || "",
			opacity: 100 - 100 * curElemCssList.opacity || 0,
			color: curElemCssList.color || "#676767",
			borderWidth: parseInt(curElemCssList.borderWidth, 10) || 0,
			borderStyle: curElemCssList.borderStyle || "solid",
			borderColor: curElemCssList.borderColor || "rgba(0,0,0,1)",
			paddingBottom: parseInt(curElemCssList.paddingBottom, 10) || 0,
			paddingTop: parseInt(curElemCssList.paddingTop, 10) || 0,
			lineHeight: +curElemCssList.lineHeight || 1,
			borderRadius: parseInt(curElemCssList.borderRadius, 10) || 0,
			transform: curElemCssList.transform && parseInt(curElemCssList.transform.replace("rotateZ(", "").replace("deg)", ""), 10) || 0
		};
		$scope.maxRadius = Math.min(curElemElementBox.outerWidth(), curElemElementBox.outerHeight()) / 2 + 10;
		if (curElemCssList.borderRadiusPerc) {
			$scope.model.borderRadiusPerc = parseInt(curElemCssList.borderRadiusPerc, 10);
		} else {
			if (curElemCssList.borderRadius) {
				if ("999px" == curElemCssList.borderRadius) {
					$scope.model.borderRadiusPerc = 100;
				} else {
					$scope.model.borderRadiusPerc = parseInt(100 * parseInt(curElemCssList.borderRadius, 10) * 2 / Math.min(curElemElementBox.outerWidth(), curElemElementBox.outerHeight()), 10);
					$scope.model.borderRadiusPerc > 100 && ($scope.model.borderRadiusPerc = 100);
				}
			} else {
				$scope.model.borderRadiusPerc = 0;
			}
		}
		$scope.tmpModel = {
			boxShadowDirection: 0,
			boxShadowX: 0,
			boxShadowY: 0,
			boxShadowBlur: 0,
			boxShadowSize: 0,
			boxShadowColor: "rgba(0,0,0,0.5)"
		};
		if (curElemCssList.boxShadow) {
			var boxShadowList = curElemCssList.boxShadow.split(" ");
			$scope.tmpModel.boxShadowX = parseInt(boxShadowList[0], 10);
			$scope.tmpModel.boxShadowY = parseInt(boxShadowList[1], 10);
			$scope.tmpModel.boxShadowDirection = parseInt(curElemCssList.boxShadowDirection, 10) || 0;
			$scope.tmpModel.boxShadowBlur = parseInt(boxShadowList[2], 10);
			$scope.tmpModel.boxShadowColor = boxShadowList[3];
			$scope.tmpModel.boxShadowSize = parseInt(curElemCssList.boxShadowSize, 10) || 0;
		}
		$scope.clear = function() {
			$scope.model = {
				backgroundColor: "#ffffff",
				opacity: 0,
				color: "#676767",
				borderWidth: 0,
				borderStyle: "solid",
				borderColor: "rgba(0,0,0,1)",
				paddingBottom: 0,
				paddingTop: 0,
				lineHeight: 1,
				borderRadius: 0,
				transform: 0
			}, $scope.tmpModel = {
				boxShadowDirection: 0,
				boxShadowX: 0,
				boxShadowY: 0,
				boxShadowBlur: 0,
				boxShadowSize: 0,
				boxShadowColor: (curElemCssList.boxShadowSize, "rgba(0,0,0,0.5)")
			}
		};
		$scope.$watch("tmpModel", function(newVal, oldVal) {
			var newModel = {};
			$.extend(!0, newModel, $scope.model);
			newModel.borderRadius += "px";
			newModel.borderTopLeftRadius = newModel.borderTopRightRadius = newModel.borderBottomLeftRadius = newModel.borderBottomRightRadius = newModel.borderRadius;
			newModel.opacity = (100 - $scope.model.opacity) / 100;
			newModel.boxShadow = Math.round($scope.tmpModel.boxShadowX) + "px " + Math.round($scope.tmpModel.boxShadowY) + "px " + $scope.tmpModel.boxShadowBlur + "px " + $scope.tmpModel.boxShadowColor;
			newModel.boxShadowDirection = $scope.tmpModel.boxShadowDirection;
			newModel.boxShadowSize = $scope.tmpModel.boxShadowSize;
			newModel.transform = "rotateZ(" + $scope.model.transform + "deg)";
			$.extend(!0, curElem.css, newModel);
		
		}, !0);
		$scope.$watch("model", function(newVal, old) {
			if ($scope.elemDef.properties instanceof Array) {
				$scope.elemDef.properties = {}
			}
			var newModel = {};
			elemId = $scope.elemDef.id;
			$scope.elemDef.css.color = newVal.color;
			var type = document.getElementById("" + elemId + "").getAttribute("ctype");
			if (document.getElementById("" + elemId + "").children[0] && (document.getElementById("" + elemId + "").children[0].style.color != "") && (parseInt(type) == 2)) {
				var colorVal = newVal.color;
				if ($scope.elemDef.content.split('color:')[1]) {
					var oldVal = $scope.elemDef.content.split('color:')[1].split(";")[0];
				}
				if (colorVal && colorVal != "#676767") {
					$scope.elemDef.content = $scope.elemDef.content.replace(oldVal, colorVal);
				}
				$scope.elemDef.css.color = colorVal;
				document.getElementById("" + elemId + "").children[0].style.color = colorVal;
			/*var oldVal = $scope.elemDef.content && $scope.elemDef.content.split('color:')[1].split(";")[0] || "";
			$scope.model.color = oldVal;
			document.getElementById(""+elemId + "").children[0].style.color = "";
			document.getElementById(""+elemId + "").parentElement.parentElement.style.color = $scope.model.color;*/
			}
			$.extend(!0, newModel, $scope.model);
			newModel.borderRadius += "px";
			newModel.borderTopLeftRadius = newModel.borderTopRightRadius = newModel.borderBottomLeftRadius = newModel.borderBottomRightRadius = newModel.borderRadius;
			newModel.opacity = (100 - $scope.model.opacity) / 100;
			newModel.boxShadow = Math.round($scope.tmpModel.boxShadowX) + "px " + Math.round($scope.tmpModel.boxShadowY) + "px " + $scope.tmpModel.boxShadowBlur + "px " + $scope.tmpModel.boxShadowColor;
			newModel.boxShadowDirection = $scope.tmpModel.boxShadowDirection;
			newModel.boxShadowSize = $scope.tmpModel.boxShadowSize;
			newModel.transform = "rotateZ(" + $scope.model.transform + "deg)";
			$.extend(!0, curElem.css, newModel);
		
		}, !0);
	}]).directive("styleInput", ["multiCompResize", "$rootScope", function(a, $rootScope) {//输入框
		return {
			restrict: "AE",
			link: function(iScope, iElem, iAttrs) {
				var elemElementBox = $("#inside_" + iScope.elemDef.id + " > .element-box");
				$("#inside_" + iScope.elemDef.id, "#nr");
				iScope.$watch(function() {
					return $(iElem).val()
				}, function(newVal, oldVal) {
					if (newVal != oldVal) {
						if ("borderWidth" == iAttrs.cssItem) {
							elemElementBox.css({
								borderStyle: iScope.model.borderStyle,
								borderWidth: $(iElem).val()
							});
							var elemElementBoxData = {
								width: elemElementBox.width(),
								height: elemElementBox.height()
							};
							if (4 == iScope.elemDef.type) {
								var imgElem = elemElementBox.find("img"), 
								imgElemRate = imgElem.width() / imgElem.height(), 
								elemElementBoxRate = elemElementBoxData.width / elemElementBoxData.height;
								if (imgElemRate >= elemElementBoxRate) {
									imgElem.outerHeight(elemElementBoxData.height);
									imgElem.outerWidth(elemElementBoxData.height * imgElemRate);
									imgElem.css("marginLeft", -(imgElem.outerWidth() - elemElementBoxData.width) / 2);
									imgElem.css("marginTop", 0);
								
								} else {
									imgElem.outerWidth(elemElementBoxData.width);
									imgElem.outerHeight(elemElementBoxData.width / imgElemRate);
									imgElem.css("marginTop", -(imgElem.outerHeight() - elemElementBoxData.height) / 2);
									imgElem.css("marginLeft", 0);
								
								}
								iScope.elemDef.properties.imgStyle.marginTop = imgElem.css("marginTop");
								iScope.elemDef.properties.imgStyle.marginLeft = imgElem.css("marginLeft");
								iScope.elemDef.properties.imgStyle.width = imgElem.outerWidth();
								iScope.elemDef.properties.imgStyle.height = imgElem.outerHeight();
							}
						}
						
						"borderRadius" == iAttrs.cssItem && elemElementBox.css({
							borderRadius: iScope.model.borderRadius
						});

						"opacity" == iAttrs.cssItem && elemElementBox.css({
							opacity: (100 - $(iElem).val()) / 100
						});

						"backgroundColor" == iAttrs.cssItem && elemElementBox.css({
							backgroundColor: $(iElem).val()
						});
						if("color" == iAttrs.cssItem){
							elemElementBox.css({
								color: $(iElem).val()
							});

							if ("h" == iScope.elemDef.type) {
								var l = elemElementBox.find("svg");
								if(l.find("g").length){
									l.find("g").attr("fill", $(iElem).val());
								}else{
									l.children().attr("fill", $(iElem).val());
								}

							}
						}
						
						"borderStyle" == iAttrs.cssItem && (elemElementBox.css({
							borderStyle: iScope.model.borderStyle
						}), $rootScope.$broadcast("hisChange"));

						"borderColor" == iAttrs.cssItem && elemElementBox.css({
							borderColor: iScope.model.borderColor
						});

						"padding" == iAttrs.cssItem && elemElementBox.css({
							paddingTop: iScope.model.paddingTop,
							marginTop: -iScope.model.paddingBottom
						});

						"lineHeight" == iAttrs.cssItem && elemElementBox.css({
							lineHeight: iScope.model.lineHeight
						});

						"transform" == iAttrs.cssItem && (elemElementBox.parents("li").css({
							transform: "rotateZ(" + iScope.model.transform + "deg)"
						}), $rootScope.$broadcast("boxOuter"));
						
						if ("boxShadow" == iAttrs.cssItem) {
							iScope.tmpModel.boxShadowX = -Math.sin(iScope.tmpModel.boxShadowDirection * Math.PI / 180) * iScope.tmpModel.boxShadowSize;
							iScope.tmpModel.boxShadowY = Math.cos(iScope.tmpModel.boxShadowDirection * Math.PI / 180) * iScope.tmpModel.boxShadowSize;
							elemElementBox.css({
								boxShadow: Math.round(iScope.tmpModel.boxShadowX) + "px " + Math.round(iScope.tmpModel.boxShadowY) + "px " + iScope.tmpModel.boxShadowBlur + "px " + iScope.tmpModel.boxShadowColor
							})
						}
					}
				})
			}
		}
	}])/*.directive("angleKnob", function() {//圆盘改变阴影
	return {
		restrict: "AE",
		templateUrl: BASE_URL + "templates/scene.console.angle-knob.tpl.html",
		link: function(a, b, c) {
			function d(a, b) {
				var c = Math.sqrt((a - 28) * (a - 28) + (b - 28) * (b - 28)) / 28, 
				d = 28 + (a - 28) / c, 
				e = 28 + (b - 28) / c;
				g.css({
					top: Math.round(e),
					left: Math.round(d)
				})
			}
			function e(a, b) {
				var c = a - 28, 
				d = 28 - b, 
				e = 180 * Math.atan(c / d) / Math.PI;
				return b > 28 && (e += 180), 28 >= b && 28 > a && (e += 360), Math.round(e)
			}
			var f = $(b).find(".sliderContainer"), 
			g = $(b).find(".sliderKnob");
			a.$watch(function() {
				return a.tmpModel.boxShadowDirection
			}, function(a) {
				g.css({
					top: 28 - 28 * Math.cos(a * Math.PI / 180),
					left: 28 + 28 * Math.sin(a * Math.PI / 180)
				})
			}), 0 !== a.tmpModel.boxShadowDirection && g.css({
				top: 28 - 28 * Math.cos(a.tmpModel.boxShadowDirection * Math.PI / 180),
				left: 28 + 28 * Math.sin(a.tmpModel.boxShadowDirection * Math.PI / 180)
			}), f.bind("mousedown", function(b) {
				b.stopPropagation();
				var c = f.offset().left, 
				g = f.offset().top;
				d(b.pageX - c, b.pageY - g);
				var h = e(b.pageX - c, b.pageY - g);
				a.tmpModel.boxShadowDirection = h;
				a.$apply();
				$(this).bind("mousemove", function(b) {
					b.stopPropagation();
					d(b.pageX - c, b.pageY - g);

					var f = e(b.pageX - c, b.pageY - g);
					a.tmpModel.boxShadowDirection = f;
					a.$apply()

				}), $(this).bind("mouseup mouseleave", function(a) {
					$(this).unbind("mousemove");
					$(this).unbind("mouseup mouseleave");
				})
			})
		}
	}
});*/
angular.module("scene.create.console.setting.trigger", ["colorpicker.module", "app.directives.style", "app.directives.uislider", "app.directives.limitInput", "scene.edit.trigger","scene.create.console.setting.trigger"]), 
angular.module("scene.create.console.setting.trigger").controller("TriggerConsoleCtrl", ["$scope", "$rootScope", "$translate", "sceneService", "triggerService", "$modal", "ModalService", "i18nNotifications", "security", function($scope, $rootScope, c, sceneService, triggerService, f, g, i18nNotifications, security) {
		function sendTriggerData() {//触发数据传递
			var curTrigger = triggerService.getTrigger(curElemDef.id);
			if (curTrigger && curTrigger.sends.length){
				checkTrigger(curTrigger.sends);
				for (i = 0; i < curTrigger.sends.length && $scope.triggerEvents[i]; i++){
					if(i > 0){
						curTrigger.sends[i].delay = curTrigger.sends[i - 1].delay + $scope.triggerEvents[i].delay;
					}else{
						curTrigger.sends[i].delay = $scope.triggerEvents[i].delay;
					}
				}
			}
			var trigger;
			$.each(currentPageIdIndexData, function(index, item) {
				triggerService.clearTrigger(index);
				trigger = triggerService.getTrigger(index);
				trigger && trigger.sends.length && checkTrigger(trigger.sends);
				trigger ? item.trigger = trigger : delete item.trigger;

			});
			if(2 == $scope.sendType.value){
				trigger = triggerService.getTrigger($scope.elemDef.id);
				trigger && trigger.sends.length && checkTrigger(trigger.sends);
				$scope.elemDef.properties || ($scope.elemDef.properties = {});
				$scope.elemDef.properties.trigger = trigger;
			}
		}
		function initTrigger() {//初始化
			if (!curElemDef)
				return void ($scope.triggerEvents = []);
			var trigger = triggerService.getTrigger(curElemDef.id);
			if (trigger && trigger.sends.length) {
				checkTrigger(trigger.sends);
				$scope.triggerEvents = [];

				var newSends = angular.copy(trigger.sends);
				angular.forEach(newSends, function(item, index) {
					$scope.triggerEvents.push({});
					angular.forEach(item.handles, function(handlesItem, handlesIndex) {
						if(1 != handlesItem.type && 2 != handlesItem.type || !handlesItem.ids.length){
							if(3 == handlesItem.type && handlesItem.ids.length){
								$scope.triggerEvents[index] = angular.copy($scope.eventTypes[1]);
								$scope.triggerEvents[index].type = 2;
							}
						}else{
							$scope.triggerEvents[index] = angular.copy($scope.eventTypes[0]);
							$scope.triggerEvents[index].type = 1;
						}
					});

					if (index > 0){
						for (i = 0; index > i; i++){
							item.delay -= newSends[i].delay;
						}
					}
					$scope.triggerEvents[index].handles = item.handles;
					if(item.delay){
						$scope.triggerEvents[index].delay = item.delay;
					}else{
						$scope.triggerEvents[index].delay = 0;
					}
				})
			}
			$scope.triggerEvents.length && $.each($scope.triggerEvents, function(index, item) {
				item.triggerElements = [];
				item.handles && item.handles.length && $.each(item.handles, function(handlesIndex, handlesItem) {
					handlesItem.ids.length && $.each(handlesItem.ids, function(idsIndex, idsItem) {
						item.triggerElements.push({
							id: idsItem,
							handleType: handlesItem
						})
					})
				})
			})
		}
		function checkTrigger(sends) {//检查数据
			for (var b = 0; b < sends.length; b++){
				"undefined" == typeof sends[b].sendIndex && sends[b].hasOwnProperty("sendIndex") && ($scope.splice(b, 1), b--)
			}
		}
		var sendType = utilTrigger.getSendType();
		security.isAllowToAccess(security.accessDef.SHAKE_TRIGGER) || delete sendType.SHAKE;
		$scope.sendTypes = sendType;
		$scope.sendType = $scope.sendTypes.CLICK;

		var curElemDef = $scope.elemDef = sceneService.currentElemDef, //选中素材
			currentPageIdIndexData = sceneService.getElementsMap(), //以素材id为下标的当前页数据集
			currentPageDataObj = (utilTrigger.getHandleType(), sceneService.getSceneObj().obj);//当前页面数据的obj

		if (currentPageDataObj && currentPageDataObj.elements.length) {
			$scope.triggerSources = [];
			var currentPageDataObjElems = angular.copy(currentPageDataObj.elements);
			$.each(currentPageDataObjElems, function(index, item) {
				if("2" == item.type || "4" == item.type || "h" == item.type || "x" == item.type){
					switch (item.type + ""){
						case "2":
							item.name = "文字";
							break;
						case "4":
							item.name = "图片";
							break;
						case "h":
							item.name = "形状";
							break;
						case "x":
							item.name = "多字体";
							break;
					}
					$scope.triggerSources.push(item);
				}
			}), $.each($scope.triggerSources, function(index, item) {
				item.name += index + 1
			})
		}
		$scope.$watch("elemDef", function(newVal, oldVal) {
			if(newVal){
				curElemDef = newVal;
				$.each($scope.triggerSources, function(index, item) {
					item.id == newVal.id && ($scope.sourceElem = item);
				})
			}
		}, !0);
		$scope.$watch("sendType", function(newVal) {
			$scope.triggerEvents = [];
			1 == newVal.value ? curElemDef = $scope.elemDef = sceneService.currentElemDef : 2 == newVal.value && (curElemDef = $scope.elemDef = q);
			initTrigger();
		}, !0);
		$scope.eventTypes = [{
			name: "existElement",
			value: 1,
			title: "选择界面已有元素",
			children: [{
					type: "SHOW",
					title: "显示"
				}, {
					type: "HIDE",
					title: "隐藏"
				}]
			}, {
				name: "randomEvent",
				value: 2,
				title: "随机图片"
			}];
		if(curElemDef && 1 == $scope.sendType.value){
			switch (curElemDef.type +""){
				case "2":
					$scope.triggerOriginal = "文字1";
					break;
				case 4:
					$scope.triggerOriginal = "图片1";
					break;
				case "h":
					$scope.triggerOriginal = "形状1";
					break;
				case "x":
					$scope.triggerOriginal = "多字体1";
					break;
			}
		}
		$scope.selectTriggerOriginal = function() {
			$rootScope.$broadcast("select.trigger.original");
		};

		$scope.triggerEvents = [];

		$scope.addTriggerEvent = function(eventType, length) {
			if($(".trigger-elem-list").length == 0){
				if (!$scope.sourceElem && 1 == $scope.sendType.value){
					return void i18nNotifications.pushForCurrentRoute("select.trigger.source", "notify.success");
				}
				$scope.triggerEvents.push({
					title: eventType.title,
					value: eventType.value,
					delay: 0
				});
				$scope.triggerEvents.length;
				if(1 == eventType.value){
					$scope.addTriggerItem($scope.triggerEvents[length], length);
				}else if(2 == eventType.value){
					$scope.addRandomImg($scope.triggerEvents[length], length);
				}
			}else{
				return;
			}
			
		}, $scope.addTriggerItem = function(triggerEvent, index, event) {//增加触发当前页面元素
			$scope.currentTriggerEvent = triggerEvent;
			$scope.currentIndex = index;
			$rootScope.$broadcast("element.triggered.add", triggerEvent, index);

		}, $scope.addRandomImg = function(b, c) {//增加触发随机元素
			$scope.currentTriggerEvent = b;
			$scope.currentIndex = c;
			sceneService.createComp("n");
		}, 
		// $scope.uploadImages = function(){
		//     $('.bs-example-modal-lg').modal('toggle'); 
		//     console.log('aaaaaaaaa');
		// }, 
		$scope.$on("create.randomevent.trigger", function(event, initData) {
			$rootScope.$broadcast("show.random.trigger", curElemDef, initData, $scope.currentIndex);

		}), $scope.$on("receive.element.update", function(b, c, d, f, g) {
			$scope.triggeredElements = [];
			$scope.currentTriggerEvent ? $scope.currentTriggerEvent.handles = [] : $scope.triggerEvents && ($scope.triggerEvents[g].handles = []);
			var triggerSends = triggerService.getTrigger(curElemDef.id).sends;
			triggerSends.length && checkTrigger(triggerSends);
			angular.forEach(triggerSends, function(item, index) {
				$scope.triggerEvents[g].handles = item.handles
			});
			sendTriggerData();
			initTrigger();
		}), $scope.switchShow = function(triggerElementId, sendIndex) {//隐藏或者显示
			if (triggerElementId.triggerType){
				if (1 == triggerElementId.triggerType){
					var showType = triggerElementId.triggerType = 2, 
						isShow = !1;
				}else{
					var showType = triggerElementId.triggerType = 1, 
						isShow = !0;
				}
			}else if (1 == triggerElementId.handleType.type){//显示改隐藏
				var showType = triggerElementId.handleType.type = 2, 
					isShow = !1;
			}else{//隐藏改显示
				var showType = triggerElementId.handleType.type = 1, 
					isShow = !0;
			}
			$rootScope.$broadcast("switch.triggered.state", isShow, showType, triggerElementId.id, sendIndex)
		}, $scope.removeTrigger = function(index, event) {
			var curElemDefId = curElemDef.id, 
				trigger = triggerService.getTrigger(curElemDefId);
			if (trigger && trigger.sends) {
				if (checkTrigger(trigger.sends), !trigger.sends[index]){
					return void $scope.triggerEvents.splice(index, 1);
				}
				triggerService.deleteTriggerBySendIndex(index, curElemDefId);
				$.each(trigger.sends, function(index, item) {
					item.sendIndex = index
				})
			}
			$scope.triggerEvents.splice(index, 1);

		}, $scope.getTriggerSources = function(sourceElem) {//改变目标元素
			$scope.triggerEvents = [];
			if(sourceElem){
				$("#nr").find("#inside_" + sourceElem.id).trigger("mousedown");
				curElemDef = $scope.elemDef = currentPageIdIndexData[sourceElem.id];
				initTrigger();
			}
		};

		initTrigger();

		$scope.confirm = function() {
			sendTriggerData();
			$rootScope.$broadcast("close.style.panel");

		}, $scope.cancelTriggerElem = function(triggerElementId, sendIndex) {
			var curElemDefId = curElemDef.id;
			$rootScope.$broadcast("cancel.element.trigger", triggerElementId, curElemDefId, sendIndex);
			initTrigger();

		}, $scope.editRandomElem = function() {
		}, $scope.clear = function() {
			triggerService.resetTrigger(curElemDef.id);
			$scope.triggerEvents = [];

		}
	}]).directive("eqxTrigger", ["$compile", "$translate", "sceneService", "triggerService", function($compile, b, sceneService, triggerService) {
		function eqxTrigger(iScope, iElem, iAttrs) {
			var curElemDef = sceneService.currentElemDef;
			iScope.$watch("sendType", function(newVal) {
				if(1 == newVal.value){
					curElemDef = iScope.elemDef = sceneService.currentElemDef;
				}else if(2 == newVal.value){
					curElemDef = iScope.elemDef = sceneService.getSceneObj().obj;
				}
			}, !0);
			var insideElem, nrEditBox = $("#nr");
			nrEditBox.find(".edit_area").find("li");
			iScope.$on("element.triggered.add", function(event, triggerEvent, index) {//添加触发
				$(".switch-original").remove();
				insideElem = $("#inside_" + iScope.elemDef.id);
				var switchOriginal = $('<div class="switch-original">');
				insideElem.append(switchOriginal).children(".bar").hide();
				initTriggerPanel(iScope, iScope.elemDef, triggerEvent, index);

			}), iScope.$on("create.trigger.menu", function(event, elem, elemEvent) {//弹出触发设置框
				if (!elem.find(".switch-original").length) {
					var triggerMenuElem = triggerPanel(iScope, elem);
					createTriggerPanel(triggerMenuElem, "triggerMenu", elemEvent)
				}
			}), iScope.$on("switch.triggered.state", function(event, isShow, showType, triggerElementIdId, sendIndex) {//设置触发显示||隐藏状态
				var triggerElementIdElem = $("#inside_" + triggerElementIdId);
				showType.type;
				if(isShow){
					triggerToShow(triggerElementIdElem, iScope.sendType, triggerTypes, curElemDef.id, triggerElementIdId, sendIndex);
				}else{
					triggerToHide(triggerElementIdElem, iScope.sendType, triggerTypes, curElemDef.id, triggerElementIdId, sendIndex);
				}
			}), iScope.$on("show.random.trigger", function(event, curElemDef, initData, currentIndex) {//设置随机事件
				triggerService.getSendIds(triggerTypes.RANDOMEVENT.value, curElemDef.id);
				var randomValue = utilTrigger.getHandleType().RANDOMEVENT.value;
				triggerToRandom(iScope.sendType, randomValue, curElemDef.id, initData.id, currentIndex);
				triggerService.getTrigger(curElemDef.id);

			}), iScope.$on("cancel.element.trigger", function(event, triggerElementId, curElemDefId, sendIndex) {//删除触发事件
				insideElem = $("#inside_" + triggerElementId);
				deleteAllTriggers(insideElem, iScope.sendType, triggerTypes, curElemDefId, triggerElementId, sendIndex);
				if("n" == currentPageIdListData[triggerElementId].type){
					$("#nr").find("#inside_" + triggerElementId).remove();
					sceneService.deleteElement(triggerElementId);

				}
				if (iScope.triggerEvents.length){
					for (var g = 0; g < iScope.triggerEvents.length; g++) {
						var h = !0;
						if (iScope.triggerEvents[g].handles){
							for (var i = 0; i < iScope.triggerEvents[g].handles.length; i++){
								iScope.triggerEvents[g].handles[i].ids.length && (h = !1);
							}
						}
						h && (iScope.triggerEvents.splice(g, 1), g--);
					}
				}
			}), iScope.$on("select.trigger.original", function(event) {//触发列表展示
				var liList = nrEditBox.find(".edit_area").children("li");
				$('<div class="mask-trigger">').insertAfter(".edit_area").click(function() {
					$(this).remove();
					liList.each(function() {
						var self = $(this), 
							selfCtype = self.attr("ctype"), 
							selfId = parseInt(self.attr("id").replace("inside_", ""), 10);
						(2 == selfCtype || 4 == selfCtype || "h" == selfCtype || "x" == selfCtype) && self.css({
							"background-color": "",
							"z-index": currentPageIdListData[selfId].css.zIndex
						})
					});
					var elemId = parseInt($(".switch-original").parent().attr("id").replace("inside_", ""), 10);
					curElemDef = iScope.elemDef = sceneService.currentElemDef = currentPageIdListData[elemId];

					switch (curElemDef.type + ""){
						case "2":
							$scope.triggerOriginal = "文字1";
							break;
						case "4":
							$scope.triggerOriginal = "图片1";
							break;
						case "h":
							$scope.triggerOriginal = "形状1";
							break;
						case "x":
							$scope.triggerOriginal = "多字体1";
							break;
					}
					iScope.$apply();

				});

				liList.each(function() {
					var self = $(this), 
						selfCtype = self.attr("ctype");
					(2 == selfCtype || 4 == selfCtype || "h" == selfCtype || "x" == selfCtype) && self.css({
						"background-color": "rgba(255,255,255,0.9)",
						"z-index": 10001
					})
				})
			})
		}
		function initTriggerPanel(iScope, elemDef, triggerEvent, index) {//显示触发设置二级框，将编辑区域素材高亮显示  iScope, iScope.elemDef, triggerEvent, index
			var nrEditBox = $("#nr"), 
				liList = nrEditBox.find(".edit_area").children("li");
			
			nrEditBox.find(".mask-trigger").remove();
			$compile('<div class="trigger-elem-list" trigger-elem-list panel-draggable></div>')(iScope).appendTo(".content");
			$('<div class="mask-trigger">').insertAfter("#nr .edit_area");

			var triggerSends;
			triggerService.getTrigger(elemDef.id) && (triggerSends = triggerService.getTrigger(elemDef.id).sends);
			liList.each(function() {
				var self = $(this), 
					selfCtype = self.attr("ctype");
				if(2 == selfCtype || 4 == selfCtype || "h" == selfCtype || "x" == selfCtype){
					self.css({
						"background-color": "rgba(255,255,255,0.9)",
						"z-index": 10001
					});
					triggerSends && triggerSends.length && $.each(triggerSends, function(sendsIndex, sendsItem) {
						sendsIndex != index && $.each(sendsItem.handles, function(handleIndex, handleItem) {
							handleItem.ids.length && $.each(handleItem.ids, function(idIndex, idItem) {
								self.attr("id") == "inside_" + idItem && self.css({
									"background-color": "",
									"z-index": ""
								})
							})
						})
					})
				}
			});
			if (elemDef) {
				var idList = [];
				$.each(triggerTypes, function(typeIndex, typeItem) {
					if (2 != typeItem.value) {
						var sendIds = triggerService.getSendIds(typeItem.value, elemDef.id);
						$.each(sendIds, function(sendIdIndex, sendIdItem) {
							idList.push(sendIdItem)
						})
					}
				}), $.each(idList, function(idIndex, idItem) {
					var liItem = nrEditBox.find("#inside_" + idItem);
					liItem.css({
						"background-color": "",
						"z-index": ""
					})
				}), $("#comp_setting").css({
					zIndex: "1100"
				})
			}
		}
		function triggerPanel(iScope, liElem) {//iScope, elem
			var curIndex = iScope.currentIndex, 
				triggerMenuElem = $('<ul id="triggerMenu" class="dropdown-menu" style="min-width: 100px; display: block;" role="menu" aria-labelledby="dropdownMenu1"><li class="trigger-show" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-dengpao1"></div>显示</a></li><li class="trigger-hide" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-dengpao1" style="color: #5F5F5F;"></div>隐藏</a></li><li class="trigger-none" role="presentation"><a role="menuitem" tabindex="-1"><div style="width: 21px;"></div>取消</a></li></ul>').css({
						position: "fixed",
						"user-select": "none"
					}), 
				switchOriginal = $(".edit_area").find(".switch-original"), 
				originalElem = parseInt(switchOriginal.parent().attr("id").replace("inside_", ""), 10), 
				liId = parseInt(liElem.attr("id").replace("inside_", ""), 10);

			return triggerMenuElem.children(".trigger-show").click(function() {
				triggerToShow(liElem, iScope.sendType, triggerTypes, originalElem, liId, curIndex);
				triggerMenuElem.hide();
				iScope.$apply();

			}), triggerMenuElem.children(".trigger-hide").click(function() {
				triggerToHide(liElem, iScope.sendType, triggerTypes, originalElem, liId, curIndex);
				triggerMenuElem.hide();
				iScope.$apply();

			}), triggerMenuElem.children(".trigger-none").click(function() {
				deleteAllTriggers(liElem, iScope.sendType, triggerTypes, originalElem, liId, curIndex);
				triggerMenuElem.hide();
				$.each(iScope.triggerElements, function(index, item) {
					liId == item.id && (item.checked = !1, item.triggerType = "")
				});
				iScope.$apply();

			}), triggerMenuElem
		}
		function triggerToShow(triggerElement, sendType, triggerType, curElemDefId, triggerElementId, sendIndex) {//设置为触发显示时
			if(!triggerElement.children(".boom").length){
				triggerElement.children(".boom1").remove();
				$('<div class="boom">').appendTo(triggerElement);
				triggerService.deleteTrigger(sendType.value, triggerType.HIDE.value, curElemDefId, triggerElementId, sendIndex);
				triggerService.addTrigger(sendType.value, triggerType.SHOW.value, curElemDefId, triggerElementId, sendIndex);
			}
		}
		function triggerToHide(triggerElement, sendType, triggerType, curElemDefId, triggerElementId, sendIndex) {//设置为触发隐藏时
			if(!triggerElement.children(".boom1").length){
				triggerElement.children(".boom").remove();
				$('<div class="boom1">').appendTo(triggerElement);
				triggerService.deleteTrigger(sendType.value, triggerType.SHOW.value, curElemDefId, triggerElementId, sendIndex);
				triggerService.addTrigger(sendType.value, triggerType.HIDE.value, curElemDefId, triggerElementId, sendIndex);
			}
		}
		function deleteAllTriggers(insideElem, sendType, triggerType, curElemDefId, triggerElementId, sendIndex) {//删除触发
			insideElem.children(".boom, .boom1").remove();
			triggerService.deleteTrigger(sendType.value, triggerType.SHOW.value, curElemDefId, triggerElementId, sendIndex);
			triggerService.deleteTrigger(sendType.value, triggerType.HIDE.value, curElemDefId, triggerElementId, sendIndex);
			triggerService.deleteTrigger(sendType.value, triggerType.RANDOMEVENT.value, curElemDefId, triggerElementId, sendIndex);

		}
		function triggerToRandom(sendType, randomValue, curElemDefId, initDataId, currentIndex) {//设置随机图片事件
			triggerService.deleteTrigger(sendType.value, randomValue, curElemDefId, initDataId, currentIndex);
			triggerService.addTrigger(sendType.value, randomValue, curElemDefId, initDataId, currentIndex);

		}
		function createTriggerPanel(triggerMenuElem, idStr, elemEvent) {//
			var eqMainElem = $("#eq_main");
			$("#" + idStr).remove();
			triggerMenuElem.css({
				left: elemEvent.pageX + eqMainElem.scrollLeft() + 15,
				top: elemEvent.pageY + eqMainElem.scrollTop(),
				zIndex: 10001
			}).appendTo(eqMainElem);
			eqMainElem.mousemove(function(event) {
				triggerMenuElem = $("#" + idStr);
				if(event.pageX < triggerMenuElem.offset().left - 20 || event.pageX > triggerMenuElem.offset().left + triggerMenuElem.width() + 20 || event.pageY < triggerMenuElem.offset().top - 20 || event.pageY > triggerMenuElem.offset().top + triggerMenuElem.height() + 20){
					triggerMenuElem.hide();
					$(this).unbind("mousemove");
				}
			})
		}
		var triggerTypes = (utilTrigger.getSendType(), utilTrigger.getHandleType()), 
			currentPageIdListData = sceneService.getElementsMap();
		return {
			restrict: "EA",
			link: eqxTrigger
		}
	}]).directive("leavePanel", function() {
		function leavePanel(iScope, iElem, iAttrs) {
			iElem.hover(function() {
			}, function() {
				iScope.obj = {
					showTriggerPanel: !1
				};
				iScope.$apply();
			})
		}
		return {
			restrict: "EA",
			link: leavePanel
		}
	}).directive("triggerElemList", ["$translate", "sceneService", "triggerService", function(a, sceneService, triggerService) {//触发二级设置框
		function triggerElemList(iScope, iElem, iAttrs) {
			var elements = angular.copy(sceneService.getSceneObj().obj.elements), 
				currentPageIdListData = sceneService.getElementsMap(), 
				types = {};
			iScope.triggerElements = [];
			var trigger;
			if(1 == iScope.sendType.value){
				trigger = iScope.elemDef.trigger
			}else if(2 == iScope.sendType.value){
				iScope.elemDef.properties || (iScope.elemDef.properties = {});
				trigger = iScope.elemDef.properties.trigger;
			}

			var liList = $("#nr").find(".edit_area").children("li");
			$.each(elements, function(index, item) {
				if("2" == item.type || "4" == item.type || "h" == item.type || "x" == item.type){
					types[item.type] || (types[item.type] = []);
					types[item.type].push(item);
				}
			});
			$.each(types, function(index, item) {
				$.each(item, function(elementIndex, elementItem) {
					switch (elementItem.type + ""){
						case "2":
							elementItem.name = "文字";
							break;
						case "4":
							elementItem.name = "图片";
							break;
						case "h":
							elementItem.name = "形状";
							break;
						case "x":
							elementItem.name = "多字体";
							break;
					}
					elementItem.name += elementIndex + 1;
					elementItem.id != iScope.elemDef.id && iScope.triggerElements.push(elementItem);

				})
			});
			trigger && trigger.sends && $.each(trigger.sends, function(sendIndex, sendItem) {
				sendIndex != iScope.currentIndex && $.each(sendItem.handles, function(handleIndex, handleItem) {
					handleItem.ids.length && $.each(handleItem.ids, function(idIndex, idItem) {
						for (var d = 0; d < iScope.triggerElements.length; d++){
							iScope.triggerElements[d].id == idItem && (iScope.triggerElements.splice(d, 1), d--);
						}
					})
				})
			}), iScope.changed = function(triggerElement) {
				if(triggerElement.checked){
					triggerService.deleteTrigger(iScope.sendType.value, triggerType.HIDE.value, iScope.elemDef.id, triggerElement.id, iScope.currentIndex);
					triggerService.addTrigger(iScope.sendType.value, triggerType.SHOW.value, iScope.elemDef.id, triggerElement.id, iScope.currentIndex);
				}else{
					triggerService.deleteTrigger(iScope.sendType.value, triggerType.SHOW.value, iScope.elemDef.id, triggerElement.id, iScope.currentIndex);
					triggerService.deleteTrigger(iScope.sendType.value, triggerType.HIDE.value, iScope.elemDef.id, triggerElement.id, iScope.currentIndex);
				}
			}, iScope.confirmList = function() {
				$(".mask-trigger").remove();
				$(".trigger-list").remove();
				$(".trigger-elem-list").remove();

				if(iScope.elemDef){
					$(".switch-original").remove();
					$("#triggerMenu").hide();
					$(".edit_area").find(".boom, .boom1").remove();
				}
				liList.each(function() {
					var self = $(this), 
						selfCtype = self.attr("ctype"), 
						selfLiId = parseInt(self.attr("id").replace("inside_", ""), 10);
					(2 == selfCtype || 4 == selfCtype || "h" == selfCtype || "x" == selfCtype) && self.css({
						"background-color": "",
						"z-index": currentPageIdListData[selfLiId].css.zIndex
					})
				});
				var trigger, c = !1;
				if(1 == iScope.sendType.value){
					trigger = iScope.elemDef.trigger
				}else if(2 == iScope.sendType.value){
					iScope.elemDef.properties || (iScope.elemDef.properties = {});
					trigger = iScope.elemDef.properties.trigger;
				}
				if(trigger && trigger.sends && trigger.sends[iScope.currentIndex]){
					$.each(trigger.sends[iScope.currentIndex].handles, function(index, item) {
						item.ids.length && (c = !0)
					});
					c || iScope.triggerEvents.splice(iScope.currentIndex, 1);

				}else{
					iScope.triggerEvents.splice(iScope.currentIndex, 1);
				}
			}, iScope.$watch("elemDef", function(newVal) {
				var trigger;
				if(1 == iScope.sendType.value){
					trigger = newVal.trigger;
				}else if(2 == iScope.sendType.value){
					newVal.properties || (newVal.properties = {});
					trigger = newVal.properties.trigger;
				}

				trigger && trigger.sends && $.each(trigger.sends, function(sendIndex, sendItem) {
					$.each(sendItem.handles, function(handleIndex, handleItem) {
						$.each(handleItem.ids, function(idIndex, idItem) {
							$.each(iScope.triggerElements, function(triggerElementIndex, triggerElementItem) {
								if(triggerElementItem.id == idItem){
									triggerElementItem.checked = !0;
									triggerElementItem.triggerType = handleItem.type;
								}
							})
						})
					})
				})
			}, !0)
		}
		var triggerType = (utilTrigger.getSendType(), utilTrigger.getHandleType());
		return {
			restrict: "EA",
			templateUrl: BASE_URL + "templates/scene.console.triggerelemlist.tpl.html",
			replace: !1,
			link: triggerElemList
		}
	}]).directive("highlightElement", function() {//高亮显示素材
	function highlightElement(iScope, iElem, iAttrs) {
		var triggerElemId, 
			liLists = $("#nr").find("li");

		setTimeout(function() {
			iElem.find(".trigger-elem").hover(function(event) {
				triggerElemId = $(this).attr("id").substring(8);
				$.each(liLists, function(index, item) {
					"inside_" + iScope.elemDef.id != $(item).attr("id") && $(item).css({
						zIndex: "",
						"background-color": ""
					})
				});
				$("#inside_" + triggerElemId).css({
					"z-index": 10001,
					"background-color": "rgba(255,255,255,0.9)"
				});
			}, function() {
				$.each(iScope.triggerElements, function(index, item) {
					$("#inside_" + item.id).css({
						"z-index": 10001,
						"background-color": "rgba(255,255,255,0.9)"
					})
				})
			})
		}, 0)
	}
	return {
		restrict: "EA",
		link: highlightElement
	}
});
