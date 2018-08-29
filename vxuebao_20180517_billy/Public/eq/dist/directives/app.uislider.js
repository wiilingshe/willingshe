angular.module("app.directives.uislider", []).value("uiSliderConfig", {}).directive("uiSlider", ["uiSliderConfig", "$timeout", function(uiSliderConfig, $timeout) {
		return uiSliderConfig = uiSliderConfig || {}, {
			require: "ngModel",
			compile: function() {
				return function(iScope, iElem, iAttrs, iTransclude) {
					function g(a, b) {
						return b ? parseFloat(a) : parseInt(a, 10)
					}
					function h() {
						iElem.slider("destroy")
					}
					var newUiSliderConfig = angular.extend(iScope.$eval(iAttrs.uiSlider) || {}, uiSliderConfig),
						value = {
							min: null,
							max: null
						},
						k = ["min", "max", "step"],
						l = angular.isUndefined(iAttrs.useDecimals) ? !1 : !0,
						m = function() {
							if(angular.isArray(iTransclude.$viewValue) && newUiSliderConfig.range !== !0){
								console.warn("Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true.");
								newUiSliderConfig.range = !0;
							}
							angular.forEach(k, function(index) {
								angular.isDefined(iAttrs[index]) && (newUiSliderConfig[index] = g(iAttrs[index], l));
							});
							iElem.slider(newUiSliderConfig);
							m = angular.noop;//空函数
						};
					angular.forEach(k, function(index) {
						iAttrs.$observe(index, function(b) {
							if(b){
								m();
								newUiSliderConfig[index] = g(b, l);
								iElem.slider("option", index, g(b, l));
								iTransclude.$render();
							}
						})
					}), iAttrs.$observe("disabled", function(a) {
						m();
						iElem.slider("option", "disabled", !! a);

					}), iScope.$watch(iAttrs.uiSlider, function(newVal) {
						m();
						newVal !== undefined && iElem.slider("option", newVal);

					}, !0);

					$timeout(m, 0, !0);

					iElem.bind("slide", function(a, b) {
						iTransclude.$setViewValue(b.values || b.value);
						iScope.$apply();

					}), iTransclude.$render = function() {
						m();
						var a = newUiSliderConfig.range === !0 ? "values" : "value";
						newUiSliderConfig.range || !isNaN(iTransclude.$viewValue) || iTransclude.$viewValue instanceof Array ? newUiSliderConfig.range && !angular.isDefined(iTransclude.$viewValue) && (iTransclude.$viewValue = [0, 0]) : iTransclude.$viewValue = 0;

						if(newUiSliderConfig.range === !0){
							angular.isDefined(newUiSliderConfig.min) && newUiSliderConfig.min > iTransclude.$viewValue[0] && (iTransclude.$viewValue[0] = newUiSliderConfig.min);
							angular.isDefined(newUiSliderConfig.max) && newUiSliderConfig.max < iTransclude.$viewValue[1] && (iTransclude.$viewValue[1] = newUiSliderConfig.max);

							if(iTransclude.$viewValue[0] > iTransclude.$viewValue[1]){
								value.min >= iTransclude.$viewValue[1] && (iTransclude.$viewValue[0] = value.min);
								value.max <= iTransclude.$viewValue[0] && (iTransclude.$viewValue[1] = value.max);
							}
							value.min = iTransclude.$viewValue[0];
							value.max = iTransclude.$viewValue[1];
						}

						iElem.slider(a, iTransclude.$viewValue);

					}, iScope.$watch(iAttrs.ngModel, function(newVal) {
						newUiSliderConfig.range === !0 && iTransclude.$render();

					}, !0);

					iElem.bind("$destroy", h);

					var n = $('<div class="ui-slider-progress-bar"></div>');
					iElem.append(n);

					var o = iScope.$watch(iAttrs.ngModel, function(newVal) {
						setTimeout(function() {
							n.css("width", $(".ui-slider-handle", iElem).css("left"))
						})
					}, !0);
					iElem.bind("$destroy", function() {
						o();
					})
				}
			}
		}
	}]).directive("uiSliderT", ["$rootScope", function($rootScope) {
		var documentElem = $(document);
		return {
			require: "ngModel",
			template: '<div class="slider-con"></div>',
			link: function(iScope, iElem, iAttr, iTransclude) {
				iElem.on("$destroy", function() {
					iElem.unbind("mousedown")
				});
				var min = "string" == typeof iAttr.min ? iAttr.min : -Number.MAX_VALUE,
					max = "string" == typeof iAttr.max ? iAttr.max : Number.MAX_VALUE,
					step = "string" == typeof iAttr.step ? iAttr.step : 1,
					rate = max / 100,
					fixed = "string" == typeof iAttr.max ? iAttr.fixed : 0;
				iTransclude.$render = function() {
					iElem.find(".slider-con").css("width", 100 * iTransclude.$modelValue / max + "%");
				};
				iElem.mousedown(function(event) {
					event.stopPropagation();
					var l, offsetX = event.offsetX,
						pageX = event.pageX,
						documentElemMove = function(eve) {
							eve.stopPropagation();
							l = eve.pageX - pageX;//鼠标移动和元素移动的距离差
							var num = +((offsetX + l) * rate / step).toFixed(fixed) * step;//鼠标横坐标移动距离换算的行高
							num > max ? num = +max : min > num && (num = +min);
							iTransclude.$viewValue != num && (iTransclude.$setViewValue(num), iTransclude.$render(), iScope.$apply());
						},
						documentElemUp = function() {
							documentElem.unbind("mouseup", documentElemUp);
							documentElem.unbind("mousemove", documentElemMove);
							iAttr.hisRecords && $rootScope.$broadcast("hisChange");
						};
					documentElem.mousemove(documentElemMove);
					documentElem.mouseup(documentElemUp)
				});
				iElem.click(function(even) {
					even.stopPropagation();
					iTransclude.$setViewValue(+(even.offsetX * max / 100 / step).toFixed(fixed) * step);
					iTransclude.$render();
					iScope.$apply();
					iAttr.hisRecords && $rootScope.$broadcast("hisChange");
				})
			}
		}
	}]);