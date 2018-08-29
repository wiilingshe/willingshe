angular.module("scene.create", ["app.directives.editor", "services.scene", "services.modal", "app.directives.component", "services.pagetpl", "save.template", "scene.create.console", "app.directives.comp.editor", "app.directives.addelement", "scene.my.upload", "services.i18nNotifications", "services.history", "security.service", "scene.edit.select", "scene.edit.common", "scene.edit.keymap", "scene.edit.bg", "scene.userGuide", "services.staticRes", "scene.create.pageTpl", "scene.create.hoverElement", "scene.preview", "services.file","services.dataCache","ui.bootstrap"]);
angular.module("scene.create").directive("changeColor", function() {
	return {
		link: function(a, b, c) {
			b.bind("click", function() {
				$(b).addClass("current")
			})
		}
	}
}).directive("thumbTpl", ["sceneService", "ModalService","fileService", function(sceneService, ModalService, fileService) {
	return {
		scope: {
			myTpl: "="
		},
		replace: !1,
		template: '<div class="delete-element hint--bottom hint--rounded" ng-click="deleteMyTpl($event)" data-hint="删除此文件"><span class="eqf-scene-delete"></span></div>',
		link: function(iScope, iElement, iAttrs) {
			if(iElement.get(0).tagName == "LI") {//左边模板库删除按钮
				iScope.$emit("myPageList.delete", iAttrs.id, iElement);
				iAttrs.noDel && iElement.empty();
				iScope.deleteMyTpl = function(event) {
					event.stopPropagation();
					ModalService.openConfirmDialog({
						msg: "确定删除此模板?"
					}, function() {
						sceneService.deletePage(iScope.myTpl.id).then(function() {
							iScope.$emit("myPageList.update", iAttrs.id, iElement, iScope.myTpl.id);
						}, function(data) {
							alert("服务器异常!");
						})
					})
				};
				$('<div class = "tmp-bg"></div>').appendTo(iElement);
				sceneService.templateEditor.parse({
					def: iScope.myTpl,
					appendTo: iElement,
					mode: "view"
				});
				$(".edit_area", iElement).css("transform", "scale(0.25) translateX(-480px) translateY(-729px)");

			}else{//左边图片/背景删除按钮
				iScope.$emit("myPageList.delete", iAttrs.id, iElement.parent());
				iAttrs.noDel && iElement.empty();
				iScope.deleteMyTpl = function(event) {
					event.stopPropagation();
					ModalService.openConfirmDialog({
						msg: "确定删除此文件?"
					}, function() {
						fileService.deleteFile1(iScope.myTpl.id).then(function() {
							iScope.$emit("myPageList.update", iAttrs.id, iElement.parent(), iScope.myTpl.id);
						}, function(data) {
							alert("服务器异常!");
						})
					})
				}
			}
		}
	}
}]).directive("converToImage", ["selectService", function(a) {
	function link(iScope, iElement, iAttrs) {
		iElement.mousedown(function(event) {
			$(".content").trigger("mousedown");
		})
	}
	return {
		restrict: "EA",
		link: link
	}
}]).directive("switchBtn", [function() {//开关

	return {
		require: "ngModel",
		restrict: "AE",
		template: '<div class="switch" ng-click="switch()"><div class="circle-con"><i class="circle"></i></div></div>',
		link: function(iScope, iElement, iAttrs, ctrl) {

			var switchEle = iElement.find(".switch");
			ctrl.$render = function() {
				switchEle.toggleClass("switch-open", angular.equals(ctrl.$modelValue, "enable"));
				switchEle.toggleClass("switch-close", angular.equals(ctrl.$modelValue, "disable"));
			};
			switchEle.bind("click", function() {
				var switchOpen = switchEle.hasClass("switch-open");
				iScope.$apply(function() {
					ctrl.$setViewValue(switchOpen ? "disable" : "enable");
					ctrl.$render();
				})
			})
		}
	}
}])/*.directive("pageTplColor", [function() {
	return {
		require: "ngModel",
		restrict: "AE",
		template: '<em value="1" style="background-color:#ff5448"></em><em value="2" style="background-color:#f2a653"></em><em value="3" style="background-color:#f9ce49"></em><em value=4"" style="background-color:#44cb83"></em><em value="5" style="background-color:#56c6ff"></em><em value="6" style="background-color:#08a1ef"></em><em value="7" style="background-color:#7171ef"></em><em value="8" style="background-color:#cc62c7"></em><em value="9" style="background-color:#7c4611"></em><em value="10" style="background-color:#000000"></em><em value="124" style="border:1px solid #ccd5db;color:#000000;"></em><em style="position:relative;"><em style="background-color:#ff5448;top:0;left:0;"></em><em style="background-color:#f2a653;top:0;left:9px;"></em><em style="background-color:#08a1ef;top:9px;left:0;"></em><em style="background-color:#44cb83;top:9px;left:9px;"></em></em>',
		link: function(iScope, iElement, iAttrs, ctrl) {
			function init() {
				thisDocument.unbind("click", init);
				iScope.$apply(function() {
					iScope.pageTpl.showColorPanel = !1;
				})
			}
			var thisDocument = $(document), 
				thisEm = iElement.find("> em");

			for (var i = 0; i < thisEm.length; i++) {
				iScope.pageTpl.color == $(thisEm[i]).attr("value") && $(thisEm[i]).addClass("eqf-yes2");
			}
			iElement.on("$destroy", function() {
				thisDocument.unbind("click", init);
				thisEm.unbind("click");

			});
			thisDocument.click(init);
			thisEm.bind("click", function() {
				init();
				ctrl.$setViewValue($(this).attr("value"));

				if("124" == $(this).attr("value")){
					$(".select-color .tpl-color").css("border", "1px solid #ccd5db");
				}else{
					$(".select-color .tpl-color").css("border", "none");
				}

				$(".select-color .tpl-color").css("background-color", $(this).css("background-color"));
			})
		}
	}
}])*/.directive("loadErr", [function() {
	return {
		restrict: "A",
		link: function(iScope, iElement, iAttrs) {
			iElement.bind("error", function() {
				iAttrs.$set("src", "assets/images/create/pic.svg");
				iElement.addClass("load-err");
			})
		}
	}
}]).directive("closePanel", [function() {
	return {
		scope: {
			pause: "@",
			model: "@"
		},
		restrict: "A",
		templateUrl: "",
		link: function(iScope, iElement, iAttrs, ctrl) {
			function stopPro(event) {
				"false" == iScope.pause && event.stopPropagation();
			}
			function isShowBox(event) {
				iScope.$apply(function() {
					iScope.$eval("$parent." + iScope.model + "=false");
				})
			}
			var thisDocument = $(document);
			iElement.click(stopPro);
			thisDocument.click(isShowBox);
			iElement.on("$destroy", function() {
				thisDocument.unbind("click", isShowBox);
				iElement.unbind("click");
			})
		}
	}
}]).factory("gridGuide", ["panStateTracker", "DetectionBox", "selectService", "editAreaBorderCollisionDetector",function(a, b, c, d) {
	var grid = {
		init: function(container,width) {//网格初始化
			var selfWidth = width ? width : this.boxWidth;
			var pageHeight = sessionStorage.getItem("pageid") == sessionStorage.getItem("longpageID") ? sessionStorage.getItem("longpageHeight") : 486;
			this.color = this.getColor() ? this.getColor() : "rgba(150, 150, 150, 0.2)";
			this.$container = container;
			this.render();
			setTimeout(function() {
				"disable" != grid.getVisable() && grid.show();
			}, 1)
		},
		render: function() {//渲染html
			$(".eq-block-grid").length > 0 && $(".eq-block-grid").remove();
			$(".eq-block-guides").length > 0 && $(".eq-block-guides").remove();

			this.domElement = $('<div class="eq-block-grid">');
			this.canvasElement = $('<canvas class="eq-block-grid-inner">').appendTo(this.domElement);
		},
		show: function() {//设置网格显示
			this.domElement.appendTo(this.$container);
			this.paint();
			this.enabled = !0;
		},
		hide: function() {//设置网格隐藏
			this.domElement && this.domElement.remove();
			this.enabled = !1;
		},
		setVisable: function(gridState) {//设置网格是否可视
			window.localStorage && localStorage.setItem("sceneGridVisable", gridState);
		},
		getVisable: function() {//获取网格是否可视
			return window.localStorage ? localStorage.getItem("sceneGridVisable") : void 0;
		},
		setColor: function(color) {//设置网格颜色
			window.localStorage && localStorage.setItem("sceneGridColor", color);
		},
		getColor: function() {//获取网格颜色
			return window.localStorage ? localStorage.getItem("sceneGridColor") : void 0;
		},
		getGuideState: function() {//获取参考线
			return window.localStorage ? localStorage.getItem("sceneGridState") : void 0;
		},
		setGuideState: function(guideState) {//设置参考线
			window.localStorage && localStorage.setItem("sceneGridState", guideState);
		},
		getSnapState: function() {//获取吸附效果
			return window.localStorage ? localStorage.getItem("sceneSnapState") : void 0;
		},
		setSnapState: function(snapState) {//设置吸附效果
			window.localStorage && localStorage.setItem("sceneSnapState", snapState);
		},
		paint: function(gridWidth,pageHeight){//描绘网格
			if(!gridWidth){
				gridWidth = this.boxWidth ? this.boxWidth : 32;
			}
			if(!pageHeight){
				pageHeight = sessionStorage.getItem("pageid") == sessionStorage.getItem("longpageID") ? sessionStorage.getItem("longpageHeight") : 486;
			}
			var a = 320,
				b = pageHeight ? pageHeight : 486,
				c = Math.round(b / gridWidth),
				d = Math.round(a / gridWidth),
				e = gridWidth,
				f = gridWidth,
				g = (b - f * c) / 2;
			this.canvasElement.css({
				left: 0,
				top: 0
			}), this.canvasElement.attr({
				width: a,
				height: b
			}),this.canvasElement.parent().css({
				width: a,
				height: b,
				marginRight: /*scale ? (-160 - arr[scale]) : */-160
			}),this.$container.find(".eq-block-guides").css({
				width: a,
				height: b
			});
			var h = this.canvasElement.get(0).getContext("2d");
			h.clearRect(0, 0, a, b);
			for (var i = 1; d > i; i++) {
				h.fillStyle = this.color;
				h.fillRect(Math.floor(i * e), 0, 1, b);
			}
			for (var j = 1; c > j; j++) {
				h.fillStyle = this.color;
				h.fillRect(0, Math.floor(j * f) + g, a, 1);
			}
		},
		getRows: function() {
			return 16
		},
		getCols: function() {
			return 10
		}
	},
		f = {
			snap: grid.getSnapState() ? grid.getSnapState() : !0,
			action: "move",
			threshold: 1,
			enabled: grid.getGuideState() ? grid.getSnapState() : !0
		},
		guide = {
			init: function(a) {
				this.guides = {
					h: [],
					v: []
				}, this.slideBounds = {
					width: 320,
					height: 486,
					x: 0,
					y: 0
				};

				this.render();
				a.append(this.domElement);
				this.options = f;
			},
			render: function() {
				this.domElement = $('<div class="eq-block-guides">')
			},
			start: function(d) {
				if (this.options.enabled) {
					this.allBlocks = [];
					a.forEach(function(a, c) {
						guide.allBlocks.push(new b(a))
					});

					this.targetBlocks = [];
					angular.forEach(c.getElements(), function(a) {
						guide.allBlocks.forEach(function(b) {
							b.element.attr("id") == "inside_" + a && guide.targetBlocks.push(b);
						})
					});

					this.gridLines = [];
					var h = grid.getCols(),
						i = grid.getRows(),
						j = Math.round(this.slideBounds.width / h),
						k = Math.round(this.slideBounds.height / i),
						l = (this.slideBounds.height - k * i) / 2;
					if (grid.enabled) {
						for (var m = 1; h > m; m++) {
							this.gridLines.push(this.getCenterEdge({
								x: m * j,
								y: 0,
								width: 0,
								height: this.slideBounds.height
							}, "grid-col-" + m, "horizontal"));
						}
						for (var n = 1; i > n; n++) {
							this.gridLines.push(this.getCenterEdge({
								x: 0,
								y: n * k + l,
								width: this.slideBounds.width,
								height: 0
							}, "grid-row-" + n, "vertical"))
						}
					}
					this.gridLines.push(this.getCenterEdge({
						x: this.slideBounds.width / 2,
						y: 0,
						width: 0,
						height: this.slideBounds.height
					}, "grid-col-center", "horizontal"));

					this.gridLines.push(this.getCenterEdge({
						x: 0,
						y: this.slideBounds.height / 2,
						width: this.slideBounds.width,
						height: 0
					}, "grid-row-center", "vertical"));

					this.options = $.extend(f, d);
				}
			},
			stop: function() {
				this.clearGuideElements()
			},
			sync: function(a) {
				this.options.enabled && (this.findGuides(a), this.renderGuides());
			},
			findGuides: function(a) {
				a = angular.extend({
					x: 0,
					y: 0,
					width: 0,
					height: 0
				}, a);
				this.guides.h.length = 0;
				this.guides.v.length = 0;

				var b = {
						x: d.bigDetectionBoxPointA.x + a.x,
						y: d.bigDetectionBoxPointA.y + a.y,
						width: d.bigDetectionBoxPointB.x - d.bigDetectionBoxPointA.x + a.width,
						height: d.bigDetectionBoxPointB.y - d.bigDetectionBoxPointA.y + a.height
					},
					c = this.getEdges(b, "target-bounds", "resize" === this.options.action);

				this.combinedBounds = b;
				this.allBlocks.forEach(function(a) {
					-1 === guide.targetBlocks.indexOf(a) && guide.compageEdges(c, guide.getEdges(a.measure(), a.getID()), guide.options.threshold);

				}), this.gridLines.forEach(function(a) {
					guide.compageEdges(c, a, guide.options.threshold);

				}), this.guides.h.sort(function(a, b) {
					return a.distance - b.distance;

				}), this.guides.v.sort(function(a, b) {
					return a.distance - b.distance;

				})
			},
			enforceGuides: function(a) {
				if (this.options.enabled) {
					var b = this.options.threshold;
					this.options.threshold = 3;
					this.findGuides(a);
					this.options.threshold = b;

					var c, 
						d = 0,
						e = 0;

					this.guides.h.length && (c = this.guides.h[0], d = c.compareEdge.x - c.targetEdge.x);
					this.guides.v.length && (c = this.guides.v[0], e = c.compareEdge.y - c.targetEdge.y);
					a.x += d;
					a.y += e;
				}
			},
			compageEdges: function(a, b, c) {
				var d;
				a.h.forEach(function(a) {
					b.h.forEach(function(b) {
						d = Math.abs(a.x - b.x);
						c > d && guide.guides.h.push({
							distance: d,
							targetEdge: a,
							compareEdge: b
						});
					})
				}), a.v.forEach(function(a) {
					b.v.forEach(function(b) {
						d = Math.abs(a.y - b.y);
						c > d && guide.guides.v.push({
							distance: d,
							targetEdge: a,
							compareEdge: b
						})
					})
				})
			},
			renderGuides: function() {
				var a = [];
				this.guides.h.forEach(function(b) {
					a.push(guide.renderGuide(b))

				}), this.guides.v.forEach(function(b) {
					a.push(guide.renderGuide(b))

				});

				this.clearGuideElements(a)
			},
			renderGuide: function(a) {
				var b = a.targetEdge,
					c = a.compareEdge,
					d = $('[data-guide-id="' + c.id + '"]');

				if(0 === d.length){
					d = $('<div data-guide-id="' + c.id + '">').appendTo(this.domElement);

					setTimeout(function() {
						d.addClass("show")
					}, 1)
				}
				var e = {
					top: Math.min(c.bounds.y, this.combinedBounds.y),
					right: Math.max(c.bounds.x + c.bounds.width, this.combinedBounds.x + this.combinedBounds.width),
					bottom: Math.max(c.bounds.y + c.bounds.height, this.combinedBounds.y + this.combinedBounds.height),
					left: Math.min(c.bounds.x, this.combinedBounds.x)
				};
				if ("number" == typeof c.y) {
					var f = "s" === b.direction ? -1 : 0;
					d.addClass("guide-h");
					d.css({
						top: Math.floor(c.y + f),
						left: e.left,
						width: e.right - e.left
					})
				} else {
					var g = "e" === b.direction ? -1 : 0;
					d.addClass("guide-v");
					d.css({
						left: Math.floor(c.x + g),
						top: e.top,
						height: e.bottom - e.top
					})
				}
				return c.id
			},
			getEdges: function(a, b, c) {
				var d = {
					h: [{
						id: b + "-h1",
						bounds: a,
						x: a.x,
						offset: 0,
						direction: "w"
					}, {
						id: b + "-h2",
						bounds: a,
						x: a.x + a.width / 2,
						offset: -a.width / 2,
						direction: "hc"
					}, {
						id: b + "-h3",
						bounds: a,
						x: a.x + a.width,
						offset: -a.width,
						direction: "e"
					}],
					v: [{
						id: b + "-v1",
						bounds: a,
						y: a.y,
						offset: 0,
						direction: "n"
					}, {
						id: b + "-v2",
						bounds: a,
						y: a.y + a.height / 2,
						offset: -a.height / 2,
						direction: "vc"
					}, {
						id: b + "-v3",
						bounds: a,
						y: a.y + a.height,
						offset: -a.height,
						direction: "s"
					}]
				};
				return c && (d.h.splice(1, 1), d.v.splice(1, 1)), d
			},
			getCenterEdge: function(a, b, c) {
				var d = {
					h: [],
					v: []
				};
				return "vertical" === c ? d.v.push({
					id: b + "-v2",
					bounds: a,
					y: a.y + a.height / 2,
					offset: -a.height / 2,
					direction: b
				}) : d.h.push({
					id: b + "-h2",
					bounds: a,
					x: a.x + a.width / 2,
					offset: -a.width / 2,
					direction: b
				}), d
			},
			clearGuideElements: function(a) {
				var b = this.domElement.find(".guide-v, .guide-h");
				a && a.length && (b = b.filter(function(b, c) {
					return -1 === a.indexOf(c.getAttribute("data-guide-id"))
				}));
				b.remove();
			}
		};
	return {
		grid: grid,
		guide: guide
	}
}]).directive("gridGuideSetting", ["gridGuide", function(gridGuide) {//网格设置框
	return {
		scope: !0,
		template: '<div class="grid-guide-setting"><div class="setting-group"><span>网格开关</span><div class="setting-choice"><switch-btn ng-model="config.gridState"></switch-btn></div></div><div class="setting-group"><span>网格大小</span><div class="setting-choice" style="margin-left: 40px;"><input type="number" min="10" max="320" style="width: 45px;height: 20px;color: #666;line-height: 20px;padding:0 0 0 5px;" ng-model="grid.boxWidth"></div></div><div class="setting-group" style="height:60px;"><span style="height:24px;">网格颜色</span><div class="color-contain"><input class="color-picker-input" ng-model="grid.color" type="text" /><a class="color-picker" ng-style="{backgroundColor: grid.color}" ng-model="grid.color" colorpicker="rgba" disable="{{gridGuideSetting.showFlag}}"></a></div></div><div class="setting-group"><span>智能参考</span><div class="setting-choice"><switch-btn ng-model="config.guideState"></switch-btn></div></div><div class="setting-group"><span>吸附效果</span><div class="setting-choice"><switch-btn ng-model="config.snapState"></switch-btn></div></div></div>',
		link: function(iScope, iElement) {
			function isShowFlag() {
				iScope.$apply(function() {
					iScope.gridGuideSetting.showFlag = !1
				})
			}
			var thisDocument = $(document);
			iElement.on("$destroy", function() {
				thisDocument.unbind("click", isShowFlag)
			}), thisDocument.click(isShowFlag)
		},
		controller: ["$scope", function($scope) {
			$scope.findHeight = function(){
				pageHeight = sessionStorage.getItem("pageid") == sessionStorage.getItem("longpageID") ? sessionStorage.getItem("longpageHeight") : 486;
				return pageHeight
			}
            $scope.grid = gridGuide.grid;
            $scope.guide = gridGuide.guide;
            $scope.config = {
				gridState: $scope.grid.getVisable() || "enable",
				guideState: "false" == $scope.grid.getGuideState() ? "disable" : "enable",
				snapState: "false" == $scope.grid.getSnapState() ? "disable" : "enable"
			};
			$scope.grid.boxWidth = 32;

			$scope.$watch("config.gridState", function(newVal) {//网格开关
				$scope.container = !!$(".edit_wrapper")[0];
				if("enable" === newVal){
					$scope.$parent.gridGuideSetting.isGridEnabled = !0;
					$scope.container && ($scope.grid.show($scope.grid.boxWidth),$scope.findHeight());

				}else if("disable" === newVal){
					$scope.$parent.gridGuideSetting.isGridEnabled = !1;
					$scope.grid.hide();

				}
				$scope.grid.setVisable(newVal);

			}), $scope.$watch("grid.color", function(newVal) {//网格颜色设置
				$scope.container = !!$(".edit_wrapper")[0];
				if(newVal){
					$scope.container && ($scope.grid.paint($scope.grid.boxWidth,$scope.findHeight()));
					$scope.grid.setColor(newVal);
				}
			}), $scope.$watch("config.guideState", function(newVal) {//参考线
				$scope.container = !!$(".edit_wrapper")[0];
				if($scope.container){
					if("enable" === newVal){
						$scope.guide.options.enabled = !0;
						$scope.grid.setGuideState(!0);
					}else if("disable" === newVal){
						$scope.guide.options.enabled = !1;
						$scope.grid.setGuideState(!1);
					}
				}
			}), $scope.$watch("grid.boxWidth", function(newVal) {//监视网格大小，并画出网格
				$scope.container = !!$(".edit_wrapper")[0];
                if (newVal) {
                    var num = parseInt(newVal, 10);
                    $scope.container && $scope.grid.paint(num,$scope.findHeight());
                }
            }),$scope.$watch("config.snapState", function(newVal) {//吸附
            	$scope.container = !!$(".edit_wrapper")[0];
            	if($scope.container){
            		if("enable" === newVal){
            			$scope.guide.options.snap = !0;
            			$scope.grid.setSnapState(!0);
            		}else if("disable" === newVal){
            			$scope.guide.options.snap = !1;
            			$scope.grid.setSnapState(!1);
            		}
            	}
			})
		}]
	}
}]);