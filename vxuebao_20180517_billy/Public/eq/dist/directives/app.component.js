require(['hammer'],function(Hammer){

angular.module("app.directives.component", ["services.scene", "services.select", "scene.create.console.pictures", "scene.edit.trigger"]).directive("compDraggable", function() {//横向导航栏拖拽增加素材
	return {
		restrict: "A",
		link: function(iScope, iElement, iAttrs) {
			iScope.$on("$destroy", function() {
				$(iElement).draggable();
				$(iElement).draggable("destroy");
				iElement = null;

			}), iElement.on("$destroy", function() {
				$(iElement).draggable();
				$(iElement).draggable("destroy");
				iElement = null;

			}), $(iElement).draggable({
				revert: !1,
				stack: ".comp-draggable",
				helper: "panel" == iAttrs.compDraggable || "page" == iAttrs.compDraggable ? "clone" : "",
				appendTo: "parent",
				containment: "panel" == iAttrs.compDraggable || "page" == iAttrs.compDraggable ? "" : "parent",
				zIndex: 1049,
				opacity: .35,
				stop: function(static, obj) {
					$(static.toElement).one("click", function(event) {
						event.stopImmediatePropagation();
					})
				}
			})
		}
	}
}).directive("compDroppable", function() {
	return {
		restrict: "A",
		link: function(iScope, iElement, iAttrs) {
			iScope.$on("$destroy", function() {
				$(iElement).droppable();
				$(iElement).droppable("destroy");
				iElement = null;

			}), iElement.on("$destroy", function() {
				$(iElement).droppable();
				$(iElement).droppable("destroy");
				iElement = null;

			}), $(iElement).droppable({
				accept: ".comp-draggable",
				hoverClass: "drop-hover",
				drop: function(b, c) {
					debugger;
					if (3 != c.draggable.attr("ctype")) {
						var d = {
							left: c.offset.left - $(this).offset().left + "px",
							top: c.offset.top - $(this).offset().top + "px"
						};
						"panel" == c.draggable.attr("comp-draggable") ? iScope.createComp(c.draggable.attr("ctype"), d) : iScope.updateCompPosition(c.draggable.attr("id"), d)
					} else iScope.createComp(3)
				}
			})
		}
	}
})/*.directive("compSortable", function() {
	return {
		restrict: "A",
		link: function(a, b, c) {
			$(b).sortable({
				axis: "y",
				update: function(a, b) {}
			})
		}
	}
}).directive("compResizable", function() {
	return {
		restrict: "A",
		link: function(a, b, c) {
			$(b).resizable({
				autoHide: !1,
				containment: "parent",
				stop: function(b, c) {
					if ("4" == $(c.element).attr("ctype").charAt(0) || "n" == $(c.element).attr("ctype").charAt(0)) {
						var d = {
							width: c.size.width,
							height: c.size.height,
							imgStyle: {
								width: c.element.find("img").width(),
								height: c.element.find("img").height(),
								marginTop: c.element.find("img").css("marginTop"),
								marginLeft: c.element.find("img").css("marginLeft")
							}
						};
						a.updateCompSize(c.element.attr("id"), d)
					} else a.updateCompSize(c.element.attr("id"), c.size);
					$(b.toElement).one("click", function(a) {
						a.stopImmediatePropagation()
					})
				},
				resize: function(a, c) {
					var d = $(b).find("img").width() / $(b).find("img").height();
					if ("4" == $(c.element).attr("ctype").charAt(0) || "n" == $(c.element).attr("ctype").charAt(0)) {
						var e = c.size.width / c.size.height,
							f = c.element.find("img");
						d >= e ? (f.outerHeight(c.size.height), f.outerWidth(c.size.height * d), f.css("marginLeft", -(f.outerWidth() - c.size.width) / 2), f.css("marginTop", 0)) : (f.outerWidth(c.size.width), f.outerHeight(c.size.width / d), f.css("marginTop", -(f.outerHeight() - c.size.height) / 2), f.css("marginLeft", 0))
					} else c.element.find(".element").outerWidth(c.size.width), c.element.find(".element").outerHeight(c.size.height)
				}
			})
		}
	}
})*/.directive("photoDraggable", function() {
	return {
		restrict: "A",
		link: function(iScope, iElement, iAttrs) {
			iScope.$on("$destroy", function() {
				$(iElement).draggable();
				$(iElement).draggable("destroy");
				iElement = null;

			}), iElement.on("$destroy", function() {
				$(iElement).draggable();
				$(iElement).draggable("destroy");
				iElement = null;

			}), $(iElement).draggable({
				revert: !1,
				helper: "clone",
				appendTo: ".img_list",
				zIndex: 1049,
				opacity: .35,
				stop: function(a, b) {
					$(a.toElement).one("click", function(a) {
						a.stopImmediatePropagation();
					})
				}
			})
		}
	}
})/*.directive("cropDroppable", function() {
	return {
		restrict: "A",
		link: function(a, b, c) {iScope, iElement, iAttrs
			a.$on("$destroy", function() {
				$(b).droppable(), $(b).droppable("destroy"), b = null
			}), b.on("$destroy", function() {
				$(b).droppable(), $(b).droppable("destroy"), b = null
			}), $(b).droppable({
				accept: "li",
				hoverClass: "drop-hover",
				drop: function(b, c) {
					a.preSelectImage(c.draggable.attr("photo-draggable"))
				}
			})
		}
	}
})*/.service("Point", function() {//获取素材原始坐标
	function point(left, top) {
		this.x = left, this.y = top
	}
	return point.prototype.add = function(width, height) {
		return new point(this.x + width, this.y + height);

	}, point.prototype.middle = function(startPointB) {
		return new point((this.x + startPointB.x) / 2, (this.y + startPointB.y) / 2);

	}, point.prototype.detectionPointA = function(startPointA) {
		this.x = startPointA.x < this.x ? startPointA.x : this.x;
		this.y = startPointA.y < this.y ? startPointA.y : this.y;

	}, point.prototype.detectionPointB = function(startPointB) {
		this.x = startPointB.x > this.x ? startPointB.x : this.x;
		this.y = startPointB.y > this.y ? startPointB.y : this.y;

	}, point
}).factory("DetectionBox", ["Point", function(point) {//根据元素拖动的方向设置元素的位置 
	function detectionBox(element) {
		this.element = element;
		this.init();
	}
	return detectionBox.prototype.init = function() {//设置元素的初始位置
		var position = this.element.position();
		this.startPointA = new point(position.left, position.top);
		var element = this.element.get(0);
		this.startPosition = {
			top: parseInt(element.style.top, 10) || 0,
			left: parseInt(element.style.left, 10) || 0
		};
		var d = /[0-9]*[.]*[0-9]*deg/.exec(element.style.transform || element.style.webkitTransform || element.style.mozTransform || element.style.msTransform || element.style.oTransform || ""),
			e = d && d.length ? d[0] : "0";

		this.angle = parseInt(e, 10);
		this.radian = 2 * this.angle * Math.PI / 360;

		var width = this.element.width(),
			height = this.element.height();

		this.elementWidth = width, 
		this.elementHeight = height, 
		this.left = this.startPosition.left, 
		this.top = this.startPosition.top, 
		this.ratio = width / height, 
		this.width = Math.abs(width * Math.cos(this.radian)) + Math.abs(height * Math.sin(this.radian)), 
		this.height = Math.abs(width * Math.sin(this.radian)) + Math.abs(height * Math.cos(this.radian)), 
		this.startPointB = this.startPointA.add(this.width, this.height), 
		this.startPointO = this.startPointA.middle(this.startPointB)
	}, detectionBox.prototype.getID = function() {
		return this.element.attr("id")
	}, detectionBox.prototype.measure = function() {
		return {
			x: this.startPointA.x,
			y: this.startPointA.y,
			width: this.width,
			height: this.height
		}
	}, detectionBox
}]).service("panStateTracker", function() {
	var tracker = {},
		obj = {};
	return tracker.clear = function() {
		obj = {}
	}, tracker.register = function(a) {
		obj[a.attr("id")] = a
	}, tracker.isElementHasBeenRegisted = function(a) {
		return !!obj[a.attr("id")];
	}, tracker.remove = function(a) {
		delete obj[a.attr("id")]
	}, tracker.forEach = function(a) {
		angular.forEach(obj, a)
	}, tracker
}).controller("MouseCompSelectController", ["$scope", "$element", "Point", "DetectionBox", "panStateTracker", "selectService", function(a, $element, point, DetectionBox, e, f) {//拉动选择框，根据坐标判断是否在选择范围内
	function select(a, d, e, f, g) {
		$element.get(0).style.position = "relative";
		this.startPositionX = a;
		this.startPositionY = d;
		this.width = e;
		this.height = f;
		this.selectAreaPointA = new point(a, d);
		this.selectAreaPointB = new point(a + e, d + f);
		this.startFlag = g;
		this.selectAreaTemplate = $element.find(".edit-area-select-container");
		this.selectAreaTemplate.length || (this.selectAreaTemplate = $('<div class="edit-area-select-container"></div>'), $element.append(this.selectAreaTemplate));
		var eleOffset = $element.offset(),
			nrOffset = $("#nr").offset();

		this.offset = eleOffset;
		this.containerOffset = nrOffset;
		$(window).resize(function() {
			angular.extend(eleOffset, $element.offset());
			angular.extend(nrOffset, $("#nr").offset());
		})
	}
	$element.css("user-select", "none");
	var thisObj = this;
	thisObj.allComponents = []; //收集起点X坐标
	thisObj.selectedComponents = [];
	select.prototype.selectStart = function(clientX, clientY) {
		angular.extend(this.offset, $element.offset()); 
		angular.extend(this.containerOffset, $("#nr").offset());
		thisObj.allComponents = [];
		e.forEach(function(clientX) {
			thisObj.allComponents.push(clientX);
		});
		this.startPositionX = clientX;
		this.startPositionY = clientY;
		this.startFlag = !0;
		this.updateSelectedElements();

	}, select.prototype.isSelectStarted = function() {
		return this.startFlag;
	}, select.prototype.selectMove = function(event) {
		this.width = event.clientX - this.startPositionX;
		this.height = event.clientY - this.startPositionY;
		this.updateCurrentPosition();
		this.width > 4 && this.height > 4 && (this.updateSelectArea(), this.updateSelectedElements());

	}, select.prototype.selectEnd = function() {
		this.startPositionX = this.startPositionY = this.width = this.height = 0;
		this.startFlag = !1;
		this.updateCurrentPosition();
		this.updateSelectArea();

	}, select.prototype.getLocalPoint = function(a) {
		return new point(a.x - this.offset.left, a.y - this.offset.top);
	}, select.prototype.updateSelectArea = function() {
		var a = this.getLocalPoint(this.selectAreaPointA);
		this.selectAreaTemplate.css("left", a.x);
		this.selectAreaTemplate.css("top", a.y);
		this.selectAreaTemplate.height(this.height);
		this.selectAreaTemplate.width(this.width);

	}, select.prototype.updateCurrentPosition = function() {
		this.selectAreaPointA.x = this.width > 0 ? this.startPositionX : this.width + this.startPositionX;
		this.selectAreaPointA.y = this.height > 0 ? this.startPositionY : this.height + this.startPositionY;
		this.width = Math.abs(this.width);
		this.height = Math.abs(this.height);
		this.selectAreaPointB.x = this.selectAreaPointA.x + this.width;
		this.selectAreaPointB.y = this.selectAreaPointA.y + this.height;

	}, select.prototype.updateSelectedElements = function() {
		thisObj.selectedComponents = [];
		var self = this,
			b = f.getElements();//获得该页面所有元素
		angular.forEach(thisObj.allComponents, function(item) {
			var id = item.attr("id").split("_")[1];

			//判断该元素是否被包含并选择/取消选择
			if(self.contains(item)){
				item.children(".bar").show();
				return void(-1 === b.indexOf(id) && f.addElement(id));
			}else{
				-1 !== b.indexOf(id) && f.deleteElement(id);
				return void item.children(".bar").hide();
			}
		})
	}, select.prototype.contains = function(a) {
		var b = new DetectionBox(a),
			e = new point(this.containerOffset.left + b.startPointO.x, this.containerOffset.top + b.startPointO.y);

		var pointSY = this.selectAreaPointA.y > 804 ? this.selectAreaPointA.y + 376 : this.selectAreaPointA.y-214;
		var pointEY = this.selectAreaPointB.y > 804 ? this.selectAreaPointB.y + 376 : this.selectAreaPointB.y-214;
			
		return e.x-296 >= this.selectAreaPointA.x-502 && e.x-296 <= this.selectAreaPointB.x-502 && e.y-100 >= pointSY&& e.y-100 <= pointEY
			/*conWidth = $(".container").width(),
			conLen = $(".edit_areaBox").height();
			var pointSY = this.selectAreaPointA.y > 804 ? this.selectAreaPointA.y - parseInt(conLen) - 214 : this.selectAreaPointA.y - 214;
			var pointEY = this.selectAreaPointB.y > 804 ? parseInt(conLen) - 214 : this.selectAreaPointB.y - 214;
			
		return e.x >= this.selectAreaPointA.x - 502 && e.x - parseInt(conWidth) <= this.selectAreaPointB.x + parseInt(conWidth) && e.y >= pointSY&& e.y <= pointEY*/
	};
	var selectElement = new select(0, 0, 0, 0, !1);
	$element.bind("mousedown", function(event) {
		var target = $(event.target);
		$("#nr").find(".mask-trigger").length || target.hasClass("comp-resize") || target.parents("li.comp-resize").length || target.hasClass("ui-draggable") || target.parents(".ui-draggable").length || target.parents("#containment").length || target.parents(".create_left").length || ($("body").css({
			"user-select": "none",
			cursor: "default"
		}), selectElement.selectStart(event.clientX, event.clientY));

	}), $element.bind("mousemove", function(event) {
		selectElement.isSelectStarted() && selectElement.selectMove(event);
	}), $element.bind("mouseup", function() {
		if(selectElement.isSelectStarted()){
			$("body").css({
				"user-select": "initial",
				cursor: "default"
			});
			selectElement.selectEnd();
		}
	})
}]).directive("mouseCompSelect", [function() {
	return {
		restrict: "A",
		controller: "MouseCompSelectController"
	}
}]).factory("editAreaBorderCollisionDetector", ["DetectionBox", "Point", function(DetectionBox, Point) {
	function initEditArea() {
		this.editAreaWidth = 320;
		this.editAreaHeight = 486;
		this.detectionBoxs = [];
	}
	function newinitEditArea() {
		this.editArea = new initEditArea;
	}
	return initEditArea.prototype.initDetectBoxWithElements = function(obj) {
		this.detectionBoxs = [];
		var self = this;
		angular.forEach(obj, function(item) {
			self.detectionBoxs.push(new DetectionBox(item));
		})
	}, newinitEditArea.prototype.initWithElements = function(a) {
		this.editArea.initDetectBoxWithElements(a);
		this.initBigDetectionBoxPoints();

	}, newinitEditArea.prototype.initBigDetectionBoxPoints = function() {
		this.bigDetectionBoxPointA = new Point(this.editArea.editAreaWidth, this.editArea.editAreaHeight);
		this.bigDetectionBoxPointB = new Point(0, 0);
		this.minimumWidth = this.editArea.editAreaWidth;
		this.minimumHeight = this.editArea.editAreaHeight;

		var self = this;

		angular.forEach(this.editArea.detectionBoxs, function(obj) {
			self.bigDetectionBoxPointA.detectionPointA(obj.startPointA);
			self.bigDetectionBoxPointB.detectionPointB(obj.startPointB);
			self.minimumWidth > obj.elementWidth && (self.minimumWidth = obj.elementWidth);
			self.minimumHeight > obj.elementHeight && (self.minimumHeight = obj.elementHeight);
		});
		var c = (this.bigDetectionBoxPointA.x + this.bigDetectionBoxPointB.x) / 2,
			d = (this.bigDetectionBoxPointA.y + this.bigDetectionBoxPointB.y) / 2;
		this.bigDetectionBoxPointO = new Point(c, d)
	}, newinitEditArea.prototype.refreshBoxInfo = function() {
		angular.forEach(this.editArea.detectionBoxs, function(item) {
			item.init();
		});
		this.initBigDetectionBoxPoints();

	}, newinitEditArea.prototype.translateIntoProperMoveDelta = function(obj) {
		var point = {
			x: obj.deltaX,
			y: obj.deltaY
		};
		return point
	}, newinitEditArea.prototype.compDragMoveDelta = function(a) {
		return this.translateIntoProperMoveDelta(a);

	}, new newinitEditArea
}]).controller("MultiCompDragController", ["selectService", "$scope", "$element", "editAreaBorderCollisionDetector", "panStateTracker", "gridGuide", "$rootScope", function(selectService, $scope, $element, editABCDetector, panStateTracker, gridGuide, $rootScope) {

	panStateTracker.clear();
	var self = this;
	self.selectedComponents = [];
	self.initCollisionDetectorWithElements = function() {
		self.selectedComponents = [];
		var nrEle = $("#nr");
		angular.forEach(selectService.getElements(), function(item) {
			self.selectedComponents.push(nrEle.find("#inside_" + item));
		});
		editABCDetector.initWithElements(self.selectedComponents);

	};
	self.isKeyboard = !1;

	self.compDragStart = function(isKeyboard) {
		if(selectService.getElements().length){
			self.initCollisionDetectorWithElements();
			gridGuide.guide.start({
				action: "move"
			});
			self.isKeyboard = !! isKeyboard;
			self.isKeyboard || angular.forEach(self.selectedComponents, function(item) {
				item.css("opacity", .35);
			});
		}
	}, self.compDragMove = function(obj) {
		if (selectService.getElements().length) {
			var point = editABCDetector.compDragMoveDelta({
				deltaX: obj.deltaX,
				deltaY: obj.deltaY
			});
			!self.isKeyboard && gridGuide.guide.options.snap && gridGuide.guide.enforceGuides(point);
			angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
				var trans = "translate3d(" + point.x + "px, " + point.y + "px, 0) rotateZ(" + item.angle + "deg)";
				item.element.css("transform", trans)
			});
			gridGuide.guide.sync(point);
			$rootScope.$broadcast("boxOuter");
		}
	}, self.compDragEnd = function(obj) {
		if (selectService.getElements().length) {
			angular.forEach(self.selectedComponents, function(item) {
				item.css("opacity", 1)
			});
			var pointE = editABCDetector.compDragMoveDelta({
				deltaX: obj.deltaX,
				deltaY: obj.deltaY
			});
			!self.isKeyboard && gridGuide.guide.options.snap && gridGuide.guide.enforceGuides(pointE);
			var length = editABCDetector.editArea.detectionBoxs.length;
			angular.forEach(editABCDetector.editArea.detectionBoxs, function(item, index) {
				var trans = "translate3d(0, 0, 0) rotateZ(" + item.angle + "deg)";
				item.element.css("transform", trans);
				var pointF = {
					top: item.startPosition.top + pointE.y,
					left: item.startPosition.left + pointE.x
				};
				item.element.css("top", pointF.top);
				item.element.css("left", pointF.left);
				$scope.updateCompPosition(item.element.attr("id"), pointF, length - 1 > index);

			});
			gridGuide.guide.stop();
			$rootScope.$broadcast("boxOuter");
		}
	};
	/*gridGuide.grid.init($element), gridGuide.guide.init($element)*/
}]).directive("multiCompDrag", function() {
	return {
		restrict: "A",
		controller: "MultiCompDragController"
	}
}).directive("compDrag", ["panStateTracker", "$rootScope", function(panStateTracker, $rootScope) {//页面素材拖拽
	return {
		require: "^multiCompDrag",
		restrict: "A",
		link: function(iscope, iElement, iAttrs, ctrl) {
			if (!panStateTracker.isElementHasBeenRegisted(iElement)) {
				panStateTracker.register(iElement);
				iElement.on("$destroy", function() {
					panStateTracker.remove(iElement);
				});
				if (iElement.find("img").length) {
					var dragTemplate = $('<div class="dragTemplate" style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;background-color: #fff;opacity: 0;"></div>');
					dragTemplate.bind("dblclick", function() {
						dragTemplate.siblings(".element").trigger("dblclick")
					});
					iElement.find(".element-box-contents").append(dragTemplate);
				}

				var hammer = new Hammer(iElement.find(".element-box-contents").get(0));

				hammer.get("pan").set({
					threshold: 0
				}), hammer.on("panstart", function(event) {
					if($(".edit_area").find(".switch").length){
						return !1;
					}else if(iElement.hasClass("inside-active")){
						return !1;
					}else{
						event.preventDefault();
						event.srcEvent.preventDefault();
						$("body").css({
							"user-select": "none",
							cursor: "default"
						});
						return void ctrl.compDragStart();
					}
				}), hammer.on("panmove", function(event) {
					event.preventDefault();
					if($(".edit_area").find(".switch").length){
						return !1;
					}else if(iElement.hasClass("inside-active")){
						return !1;
					}else{
						return void ctrl.compDragMove(event);
					}
				}), hammer.on("panend", function(event) {
					if($(".edit_area").find(".switch").length){
						return !1;
					}else if(iElement.hasClass("inside-active")){
						return !1;
					}else{
						ctrl.compDragEnd(event);
						$("body").css({
							"user-select": "initial",
							cursor: "default"
						});
						return void $(event.srcEvent.target).one("click", function(eve) {
							eve.stopImmediatePropagation();
							eve.stopPropagation();
							eve.preventDefault();
							return !1;
						})
				}
				})
			}
		}
	}
}]).directive("compRotate", ["$rootScope", function($rootScope) {//单个素材旋转
	return {
		restrict: "A",
		link: function(iScope, iElement, iAttrs) {
			var element = $(iElement),
				rotateEle = $('<div class="bar bar-rotate bar-radius">');
			element.append(rotateEle).append('<div class="bar bar-line">');
			var angle, point = {},
				hammer = new Hammer(rotateEle.get(0));
			hammer.get("pan").set({
				threshold: 0
			}), hammer.on("panstart", function(event) {
				$("body").css({
					"user-select": "none",
					cursor: 'url("/assets/images/mouserotate.ico"), default'
				});
				var eleParent = element.parent();
				point = {
					x: parseFloat(element.css("left")) + eleParent.offset().left + element.width() / 2,
					y: parseFloat(element.css("top")) + eleParent.offset().top + element.height() / 2
				}
			}), hammer.on("panmove", function(event) {
				var centerPoint = event.center,
					pointX = centerPoint.x - point.x,
					pointY = centerPoint.y - point.y,
					num = Math.abs(pointX / pointY);
				angle = Math.atan(num) / (2 * Math.PI) * 360;
				pointX > 0 && 0 > pointY ? angle = 360 + angle : pointX > 0 && pointY > 0 ? angle = 180 - angle : 0 > pointX && pointY > 0 ? angle = 180 + angle : 0 > pointX && 0 > pointY && (angle = 360 - angle);
				angle > 360 && (angle -= 360);
				element.css({
					transform: "rotateZ(" + angle + "deg)"
				});
				$rootScope.$broadcast("boxOuter");

			}), hammer.on("panend", function(event) {
				$("body").css({
					"user-select": "initial",
					cursor: "default"
				});
				iScope.updateCompAngle(element.attr("id"), angle);
				iScope.$broadcast("updateTransform", angle, element.attr("id").split("_")[1]);
				$rootScope.$broadcast("boxOuter");
			})
		}
	}
}]).directive("compResize", ["selectService", "multiCompResize", "Cursor", "gridGuide", "$rootScope",function(selectService, multiCompResize, Cursor, gridGuide, $rootScope) {//拖拽、缩放素材
	function resizeElem(scope, element, bar, resize) {
		bar.css("cursor", resize);
		var hammer = new Hammer(bar.get(0));
		var initHeight;
		hammer.get("pan").set({
			threshold: 0,
			direction: Hammer.DIRECTION_ALL
		}), hammer.on("panstart", function() {
			$("body").css({
				"user-select": "none",
				cursor: "default"
			});
			multiCompResize.resizeStart(element);
			gridGuide.guide.start({
				action: "resize"
			});
			initHeight = $(element).height();

		}), hammer.on("panmove", function(event) {
			var obj = multiCompResize.resizeMove(element, resize, event);
			if(element.get(0).tagName === "DIV"){
				if(obj.height < 0 && ($(element).height() <= 486)) {
					return $(element).height(486);
				}
				$(element).height(initHeight + obj.height);
				sessionStorage.setItem("longpageHeight",initHeight + obj.height);
			}
			gridGuide.guide.sync(obj);
			$rootScope.$broadcast("boxOuter",initHeight + obj.height, element.get(0).tagName);

		}), hammer.on("panend", function() {
			$("body").css({
				"user-select": "initial",
				cursor: "default"
			});
			multiCompResize.resizeEnd(scope, element);
			gridGuide.guide.stop();
			$rootScope.$broadcast("boxOuter" ,$(element).height() ,element.get(0).tagName);
		})
	}
	return {
		restrict: "A",
		link: function(iScope, iElement) {
			var barN = $('<div class="bar bar-n"><div class="bar-radius"></div></div>'),
				barS = $('<div class="bar bar-s"><div class="bar-radius"></div></div>'),
				barE = $('<div class="bar bar-e"><div class="bar-radius"></div></div>'),
				barW = $('<div class="bar bar-w"><div class="bar-radius"></div></div>'),
				barNE = $('<div class="bar bar-ne bar-radius">'),
				barNW = $('<div class="bar bar-nw bar-radius">'),
				barSE = $('<div class="bar bar-se bar-radius">'),
				barSW = $('<div class="bar bar-sw bar-radius">'),
				long = $('<div class="bar bar-s long-bar" style="height: 30px;text-align:center;background:none; width: 60%;margin-left: 68px;margin-top: 18px;background-color: #eee;font-size:12px;line-height:30px;"><b style="display:inline-block;margin:0 10px;width: 0;height: 0;border-left: 5px solid transparent;border-right: 5px solid transparent;border-bottom: 10px solid #666;"></b>拖动调节页面高度<b style="display:inline-block;margin:0 10px;width: 0;height: 0;border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 10px solid #666;"></b></div>');
			if(iElement.get(0).tagName === "DIV"){//长图文拖动调节页面高度
				if((!isEmpty(iScope.longpage) ||iScope.tpl.obj.properties && iScope.tpl.obj.properties.longpage) && !($(".edit_areaBox").find(".long-bar")[0])){
					iElement.append(long);
					long.show();
					resizeElem(iScope, iElement, long, Cursor.RESIZE_S);
				}
			}else{//素材li缩放大小
				iElement.append(barN).append(barS).append(barE).append(barW).append(barNW).append(barSE).append(barSW).append(barNE).unbind("mousedown").mousedown(function(event) {
					var mtLength = !! $("#nr").find(".mask-trigger").length;
					if (!mtLength) {
						var eleID = $(this).attr("id").split("_")[1];
						if (event.ctrlKey || event.shiftKey){
							if("none" != $(this).children(".bar").first().css("display")){
								$(this).children(".bar").hide();
								/*selectService.deleteElement(eleID);*/
							}else{
								$(this).children(".bar").show();
								selectService.addElement(eleID);
							}
						}else {
							if ("none" != $(this).children(".bar").first().css("display")) {
								return;
							}
							$(this).children(".bar").show().end().siblings().children(".bar").hide();
							selectService.clearElements();
							selectService.addElement(eleID);
						}
						iScope.safeApply(function() {})
					}
				}), iElement.find(".element-box").unbind("click").bind("click", function(event) {
					(event.ctrlKey || event.shiftKey) && event.stopPropagation();

				}), iElement.parent().unbind("mousedown").mousedown(function(event) {
					if(!$(event.target).closest("li").length){
						$(this).children("li").children(".bar").hide();
						iScope.$emit("hideStylePanel");
						selectService.clearElements();
						iScope.safeApply(function() {});
					}

				});

				resizeElem(iScope, iElement, barE, Cursor.RESIZE_E);
				resizeElem(iScope, iElement, barW, Cursor.RESIZE_W);
				resizeElem(iScope, iElement, barN, Cursor.RESIZE_N);
				resizeElem(iScope, iElement, barS, Cursor.RESIZE_S);
				resizeElem(iScope, iElement, barNE, Cursor.RESIZE_NE);
				resizeElem(iScope, iElement, barNW, Cursor.RESIZE_NW);
				resizeElem(iScope, iElement, barSE, Cursor.RESIZE_SE);
				resizeElem(iScope, iElement, barSW, Cursor.RESIZE_SW);
			}
		}
	}
}]).service("Cursor", function() {
	var cursor = {
		RESIZE_W: "w-resize",
		RESIZE_E: "e-resize",
		RESIZE_N: "n-resize",
		RESIZE_S: "s-resize",
		RESIZE_SE: "se-resize",
		RESIZE_SW: "sw-resize",
		RESIZE_NE: "ne-resize",
		RESIZE_NW: "nw-resize"
	};
	return cursor
}).factory("multiCompResize", ["selectService", "picturesService", "Cursor", "editAreaBorderCollisionDetector", "sceneService", function(selectService, picturesService, Cursor, editABCDetector, sceneService) {
	var f, g, 
		h = 1,
		i = 1,
		j = (editABCDetector.editArea.editAreaWidth, editABCDetector.editArea.editAreaHeight, null),//奇怪的赋值方式
		k = null,
		multiCResize = {};

	multiCResize.selectedComponents = [];

	multiCResize.initCollisionDetectorWithElements = function() {
		multiCResize.selectedComponents = [];
		var nrElem = $("#nr");
		angular.forEach(selectService.getElements(), function(item) {
			multiCResize.selectedComponents.push(nrElem.find("#inside_" + item))
		});
		editABCDetector.initWithElements(multiCResize.selectedComponents);

	}, multiCResize.resizeStart = function() {
		multiCResize.initCollisionDetectorWithElements();
		j = editABCDetector.bigDetectionBoxPointA;
		k = editABCDetector.bigDetectionBoxPointB;
		f = editABCDetector.minimumWidth;
		g = editABCDetector.minimumHeight;

	}, multiCResize.checkTopBorder = function(point, startPointA) {

		return this;
	}, multiCResize.checkRightBorder = function(point, startPointB) {

		return this;
	}, multiCResize.checkLeftBorder = function(point, startPointA) {

		return this;
	}, multiCResize.checkBottomBorder = function(point, startPointB) {

		return this;
	}, multiCResize.checkMinHeight = function(point, b, elementHeight, i) {
		var e = Math.floor(elementHeight - i);
		point.deltaY * b > e && (point.deltaY = e * b);

		return this;
	}, multiCResize.checkMinWidth = function(point, b, elementWidth, h) {
		var e = Math.floor(elementWidth - h);
		point.deltaX * b > e && (point.deltaX = e * b);

		return this;
	}, multiCResize.compResizeWithRatio = function(event, resize) {
		switch (resize) {
			case Cursor.RESIZE_SE:
				angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					var deltaX = parseInt(event.deltaY * item.ratio, 10),
						deltaY = event.deltaY,
						point = {
							deltaX: deltaX,
							deltaY: deltaY
						};
					multiCResize.checkRightBorder(point, item.startPointB).checkBottomBorder(point, item.startPointB).checkMinHeight(point, -1, item.elementHeight, i).checkMinWidth(point, -1, item.elementWidth, h);
					if(deltaX !== point.deltaX){
						deltaY = point.deltaX / item.ratio;
						point.deltaY = Math.abs(deltaY) < Math.abs(point.deltaY) ? deltaY : point.deltaY;
					}
					event.deltaY = point.deltaY;
					event.deltaX = point.deltaX;
				});
				break;
			case Cursor.RESIZE_SW:
				angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					var deltaX = parseInt(-event.deltaY * item.ratio, 10),
						deltaY = event.deltaY,
						point = {
							deltaX: deltaX,
							deltaY: deltaY
						};
					multiCResize.checkLeftBorder(point, item.startPointA).checkBottomBorder(point, item.startPointB).checkMinHeight(point, -1, item.elementHeight, i).checkMinWidth(point, 1, item.elementWidth, h);
					if(deltaX !== point.deltaX){
						deltaY = -point.deltaX / item.ratio;
						point.deltaY = Math.abs(deltaY) < Math.abs(point.deltaY) ? deltaY : point.deltaY;
					}
					event.deltaY = point.deltaY;
					event.deltaX = point.deltaX;
				});
				break;
			case Cursor.RESIZE_NE:
				angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					var deltaX = parseInt(-event.deltaY * item.ratio, 10),
						deltaY = event.deltaY,
						point = {
							deltaX: deltaX,
							deltaY: deltaY
						};
					multiCResize.checkTopBorder(point, item.startPointA).checkRightBorder(point, item.startPointB).checkMinHeight(point, 1, item.elementHeight, i).checkMinWidth(point, -1, item.elementWidth, h);
					if(deltaX !== point.deltaX){
						deltaY = -point.deltaX / item.ratio;
						point.deltaY = Math.abs(deltaY) < Math.abs(point.deltaY) ? deltaY : point.deltaY;
					}
					event.deltaY = point.deltaY;
					event.deltaX = point.deltaX;
				});
				break;
			case Cursor.RESIZE_NW:
				angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					var deltaX = parseInt(event.deltaY * item.ratio, 10),
						deltaY = event.deltaY,
						point = {
							deltaX: deltaX,
							deltaY: deltaY
						};
					multiCResize.checkLeftBorder(point, item.startPointA).checkTopBorder(point, item.startPointA).checkMinHeight(point, 1, item.elementHeight, i).checkMinWidth(point, 1, item.elementWidth, h);
					if(deltaX !== point.deltaX){
						deltaY = point.deltaX / item.ratio;
						point.deltaY = Math.abs(deltaY) < Math.abs(point.deltaY) ? deltaY : point.deltaY;
					}
					event.deltaY = point.deltaY;
					event.deltaX = point.deltaX;
				})
		}
		return this
	}, multiCResize.resizeMove = function(element, resize, event) {
		var deltaEvent = {
				deltaX: event.deltaX,
				deltaY: event.deltaY
			},
			pointObj = null;
		switch (resize) {
			case Cursor.RESIZE_W:
				multiCResize.checkLeftBorder(deltaEvent, j).checkMinWidth(deltaEvent, 1, f, h);
				pointObj = {
					x: deltaEvent.deltaX,
					y: 0,
					width: -deltaEvent.deltaX,
					height: 0
				}, angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					item.element.css({
						left: item.left + deltaEvent.deltaX,
						width: item.elementWidth - deltaEvent.deltaX
					})
				});
				break;
			case Cursor.RESIZE_E:
				pointObj = {
					x: 0,
					y: 0,
					width: deltaEvent.deltaX,
					height: 0
				},angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					item.element.css("width", item.elementWidth + deltaEvent.deltaX)
				});
				break;
			case Cursor.RESIZE_N:
				multiCResize.checkTopBorder(deltaEvent, j).checkMinHeight(deltaEvent, 1, g, i);
				pointObj = {
					x: 0,
					y: deltaEvent.deltaY,
					width: 0,
					height: -deltaEvent.deltaY
				}, angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					item.element.css({
						top: item.top + deltaEvent.deltaY,
						height: item.elementHeight - deltaEvent.deltaY
					})
				});
				break;
			case Cursor.RESIZE_S:
				pointObj = {
					x: 0,
					y: 0,
					width: 0,
					height: deltaEvent.deltaY
				}, angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					item.element.css("height", item.elementHeight + deltaEvent.deltaY)
				});
				break;
			case Cursor.RESIZE_SE:
				pointObj = {
					x: 0,
					y: 0,
					width: deltaEvent.deltaX,
					height: deltaEvent.deltaY
				}, angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					var b = item.elementHeight + deltaEvent.deltaY,
						c = b * item.ratio;
					item.element.css({
						height: b,
						width: c
					})
				});
				break;
			case Cursor.RESIZE_SW:
				pointObj = {
					x: deltaEvent.deltaX,
					y: 0,
					width: -deltaEvent.deltaX,
					height: deltaEvent.deltaY
				}, angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					var b = item.elementHeight + deltaEvent.deltaY,
						c = b * item.ratio;
					item.element.css({
						left: item.left - (c - item.elementWidth),
						height: b,
						width: c
					})
				});
				break;
			case Cursor.RESIZE_NE:
				pointObj = {
					x: 0,
					y: deltaEvent.deltaY,
					width: deltaEvent.deltaX,
					height: -deltaEvent.deltaY
				}, angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					var b = item.elementHeight - deltaEvent.deltaY,
						c = b * item.ratio;
					item.element.css({
						top: item.top + deltaEvent.deltaY,
						height: b,
						width: c
					})
				});
				break;
			case Cursor.RESIZE_NW:
				pointObj = {
					x: deltaEvent.deltaX,
					y: deltaEvent.deltaY,
					width: -deltaEvent.deltaX,
					height: -deltaEvent.deltaY
				}, angular.forEach(editABCDetector.editArea.detectionBoxs, function(item) {
					var b = item.elementHeight - deltaEvent.deltaY,
						c = b * item.ratio;
					item.element.css({
						top: item.top + deltaEvent.deltaY,
						left: item.left - (c - item.elementWidth),
						height: b,
						width: c
					})
				})
		}
		angular.forEach(multiCResize.selectedComponents, function(item) {
			multiCResize.setChildrenSizeMove(item)
		});

		return pointObj

	}, multiCResize.setChildrenSizeMove = function(selectedComp) {
		var elementBoxElem = selectedComp.children(".element-box"),
			elementBoxObj = {
				width: elementBoxElem.width(),
				height: elementBoxElem.height()
			};
		if ("4" == selectedComp.attr("ctype").charAt(0) || "n" == selectedComp.attr("ctype").charAt(0)) {
			var imgElem = selectedComp.find("img"),
				imgElemRate = imgElem.width() / imgElem.height(),
				elementBoxElemRate = elementBoxObj.width / elementBoxObj.height;
			if(imgElemRate >= elementBoxElemRate){
				imgElem.outerHeight(elementBoxObj.height);
				imgElem.outerWidth(elementBoxObj.height * imgElemRate);
				imgElem.css("marginLeft", -(imgElem.outerWidth() - elementBoxObj.width) / 2);
				imgElem.css("marginTop", 0);
			}else{
				imgElem.outerWidth(elementBoxObj.width);
				imgElem.outerHeight(elementBoxObj.width / imgElemRate);
				imgElem.css("marginTop", -(imgElem.outerHeight() - elementBoxObj.height) / 2);
				imgElem.css("marginLeft", 0);
			}
		} else {
			if("p" == selectedComp.attr("ctype").charAt(0)){
				selectedComp.find(".fluxslider, .images, .image1, .image2").css({
					width: elementBoxObj.width,
					height: elementBoxObj.height
				})
			}else{
				selectedComp.find(".element").css({
					width: elementBoxObj.width,
					height: elementBoxObj.height
				});
				if("i" == selectedComp.attr("ctype") || "d" == selectedComp.attr("ctype")){
					selectedComp.find(".comp_counter").css({
						"line-height": elementBoxObj.height + "px"
					});
				}
			}
		}
	}, multiCResize.resizeEnd = function(iScope) {
		angular.forEach(multiCResize.selectedComponents, function(item, index) {
			multiCResize.setChildrenSizeEnd(iScope, item, index < multiCResize.selectedComponents.length - 1);
			iScope.$broadcast("updateMaxRadius", item);
		})
	}, multiCResize.setChildrenSizeEnd = function(iScope, selectedComp, isLast) {
		var point = selectedComp.position(),
			pointObj = {
				width: selectedComp.width(),
				height: selectedComp.height(),
				left: point.left,
				top: point.top
			};

		if("i" == selectedComp.attr("ctype") || "d" == selectedComp.attr("ctype")){
			pointObj.lineHeight = pointObj.height + "px";

		}else if ("4" == selectedComp.attr("ctype").charAt(0) || "n" == selectedComp.attr("ctype").charAt(0)) {
			var imgElem = selectedComp.find("img"),
				imgElemObj = {
					width: pointObj.width,
					height: pointObj.height,
					left: pointObj.left,
					top: pointObj.top,
					imgStyle: {
						width: imgElem.width(),
						height: imgElem.height(),
						marginTop: imgElem.css("marginTop"),
						marginLeft: imgElem.css("marginLeft")
					}
				};
			sceneService.updateCompSize(selectedComp.attr("id"), imgElemObj, isLast)
		} else if ("p" == selectedComp.attr("ctype").charAt(0)) {
			var property = picturesService.getProperties();

			if (!property || !property.children) {
				return;
			}

			var sliderElem = selectedComp.find(".slider"),
				sliderID = sliderElem.attr("id");
			sliderElem.empty();
			for (var i = 0; i < property.children.length; i++) {
				sliderElem.append('<img src="' + PREFIX_FILE_HOST + property.children[i].src + '">');
			}
			utilPictures.deleteInterval(sliderID);
			new flux.slider("#nr #" + sliderID, {
				autoplay: property.autoPlay,
				delay: property.interval,
				pagination: !1,
				transitions: [utilPictures.getPicStyle(property.picStyle).name],
				width: pointObj.width,
				height: pointObj.height,
				bgColor: property.bgColor,
				onStartEnd: function(data) {
					utilPictures.addInterval(sliderID, data);
				}
			});
			sceneService.updateCompSize(selectedComp.attr("id"), pointObj, isLast);
		} else {
			sceneService.updateCompSize(selectedComp.attr("id"), pointObj, isLast);
		}
	};
	return multiCResize;
}]).directive("pasteElement", ["sceneService", function(sceneService) {//粘贴素材
	function paste() {
		var pasteMenuElem = $('<ul id="pasteMenu" class="dropdown-menu" style="min-width: 100px; display: block;" role="menu" aria-labelledby="dropdownMenu1"><li class="paste" style="text-align:center;" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-paste"></div>&nbsp;&nbsp;粘贴</a></li></ul>').css({
			position: "absolute",
			"user-select": "none"
		});
		pasteMenuElem.find(".paste").on("click", function() {
			sceneService.pasteElement();
			pasteMenuElem.hide();

		});

		return pasteMenuElem;
	}
	return {
		restrict: "EA",
		link: function(iScope, iElement, iAttrs) {
			var element = $(iElement);
			element.on("contextmenu", function(eve) {
				if (sceneService.getCopy()) {
					var pasteMenuElem = paste(),
						eqMain = $("#eq_main"),
						thisPasteMenu = $("#pasteMenu");
					thisPasteMenu.length > 0 && thisPasteMenu.remove();
					eqMain.append(pasteMenuElem);
					pasteMenuElem.css({
						left: eve.pageX + eqMain.scrollLeft() + 15,
						top: eve.pageY + eqMain.scrollTop()
					}).show();
					eqMain.mousemove(function(event) {
						var pasteMenu = $("#pasteMenu");
						if(event.pageX < pasteMenu.offset().left - 20 || event.pageX > pasteMenu.offset().left + pasteMenu.width() + 20 || event.pageY < pasteMenu.offset().top - 20 || event.pageY > pasteMenu.offset().top + pasteMenu.height() + 20){
							pasteMenu.hide();
							$(this).unbind("mousemove");
						}
					})
				}
				return !1
			})
		}
	}
}]).directive("eqxEditDestroy", ["selectService", function(selectService) {
	return {
		link: function(iScope, iElement) {
			iElement.on("$destroy", function() {
				selectService.clearElements();
				utilPictures.clearInterval();
			})
		}
	}
}]).directive("elementAnim", ["selectService", function(selectService) {//动画预览
	function animate(elementBoxElem, animations, animClasses, count) {
		if (animations.length && count < animations.length) {
			var element = elementBoxElem.get(0);
			elementBoxElem.css("animation", "");
			element.offsetWidth = element.offsetWidth;
			elementBoxElem.css("animation", animClasses[count] + " " + animations[count].duration + "s ease 0s").css("animation-fill-mode", "backwards");
			elementBoxElem.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {//动画结束时
				count++;
				animate(elementBoxElem, animations, animClasses, count);
			})
		}
	}
	return {
		restrict: "EA",
		link: function(iScope, iElement) {
			var elementBoxElem;
			iScope.$on("previewCurrentChange", function(event, data) {
				elementBoxElem = elementBoxElem = $("#inside_" + data.elemId + " .element-box");
				var elementBox = elementBoxElem.get(0);
				elementBox.offsetWidth = elementBox.offsetWidth;
				elementBoxElem.css("animation", data.animClasses[data.count] + " " + data.anim.duration + "s ease 0s").css("animation-fill-mode", "backwards");

			}), iScope.$on("previewAllChanges", function(event, data) {
				elementBoxElem = elementBoxElem = $("#inside_" + data.elemId + " .element-box");
				animate(elementBoxElem, data.animations, data.animClasses, data.count);
			})
		}
	}
}]).directive("outerBox", ["DetectionBox", "i18nNotifications", "storageService", function(DetectionBox, i18nNotifications, storageService) {//虚线框
	return {
		restrict: "AE",
		link: function(iScope, iElement, iAttrs, ctrl) {
			function toggleColor(color) {
				if("red" == color){//超出外框
					warnElem.show();
					warnElem.css("background-color", "#ff5548");
					iElement.find(".internal-box").toggleClass("out-warning", !1);
					isOuter = !0;

				}else if("yellow" == color){//超出内框
					warnElem.show();
					isOuter = !1;
					warnElem.css("background-color", "#F2A653");
					showPhone && iElement.find(".internal-box").toggleClass("out-warning", !0);

				}else{
					isOuter = !1;
					iElement.find(".internal-box").toggleClass("out-warning", !1);
					warnElem.hide();

				}
				showPhone && iElement.toggleClass("on", isOuter);
			}
			var warnElem = $("#warn"),
				warnColor = "";
			warnElem.click(function() {
				if("red" == warnColor){
					i18nNotifications.removeAll();
					i18nNotifications.pushForCurrentRoute("outbox.warning", "notify.warning");

				}else if("yellow" == warnColor){
					i18nNotifications.removeAll();
					i18nNotifications.pushForCurrentRoute("outbox.tip", "notify.warning");
				}
			});

			var showPhone = "false" == storageService.get("create.phoneView") ? !0 : !1;

			showPhone || (iElement.css("border-color", "transparent"), iElement.find(".internal-box").css("border-color", "transparent"));

			iScope.$on("switchBox", function(event, isShowPhone) {
				if(isShowPhone == "longpage"){
					return;
				}
				showPhone = !isShowPhone;
				if(isShowPhone){
					iElement.css("border-color", "transparent");
					iElement.find(".internal-box").css("border-color", "transparent");
				}else{
					iElement.css("border-color", "");
					iElement.find(".internal-box").css("border-color", "");
					toggleColor(warnColor);
				}

			}), iScope.$on("boxOuter", function(event) {
				var height,
					color = "",
					i = 0,
					elements = iScope.tpl.obj.elements;

				if(!isEmpty(iScope.tpl.obj.properties && iScope.tpl.obj.properties.longpage)){
					height = parseInt(iScope.tpl.obj.properties.longpage.longpageHeight);
				}else{
					height = 486;
				}

				for (; i < elements.length; i++) {
					if (elements[i].type && (3 != elements[i].type)) {
						var elemID = elements[i].id,
							elem = $("#inside_" + elemID);
						if (0 != elem.length) {
							var point = elem.position(),
								detectionbox = new DetectionBox(elem);
							if (showPhone && (point.left < -29 || point.top < -19 || detectionbox.startPointB.y > (height + 17) || detectionbox.startPointB.x > 345)) {
								color = "red";
								break
							}
							if(point.left < -1 || point.top < -1 || detectionbox.startPointB.y > height || detectionbox.startPointB.x > 320){
								color = "yellow";
							}

						}
					}
				}
				if(warnColor != color){
					if("red" == color){
						i18nNotifications.removeAll();
						i18nNotifications.pushForCurrentRoute("outbox.warning", "notify.warning");
					}else if("yellow" == color){
						i18nNotifications.removeAll();
						i18nNotifications.pushForCurrentRoute("outbox.tip", "notify.warning");
					}else{
						i18nNotifications.removeAll();
					}
				}

				warnColor = color;
				toggleColor(color);
			})
		}
	}
}]);
});

