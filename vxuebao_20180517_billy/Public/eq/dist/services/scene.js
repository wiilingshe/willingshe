angular.module("services.scene", [/*"scene.create.console", */"services.history", "services.select", "scene.create.console.pictures", "scene.edit.trigger", "services.dataCache","security.login.toolbar"]);
angular.module("services.scene").factory("sceneService", ["$http", "$rootScope", "$modal", "$q", "security", "$cacheFactory", "historyService", "selectService", "picturesService", "ModalService", "triggerService", "$translate", "i18nNotifications", "dataCacheService","$ocLazyLoad", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n,$ocLazyLoad) {
	b.presentPageObj = null;
	function deleteElements(a) {//添加素材时过滤数据异常的数据
		newCurrentPageElements.splice(newCurrentPageElements.indexOf(currentPageIdListData[a]), 1);
		delete currentPageIdListData[a];
	}
	function refreshPage(pageData) {//撤销或者恢复时刷新页面
		currentPageData.obj.elements = pageData;
		$("#nr").empty();
		da.parse({
			def: currentPageData.obj,
			appendTo: "#nr",
			mode: "edit"
		});
		for (var key in pageData){ 
			if (3 == pageData[key].type) {
				var imgSrc = "";
				pageData[key].properties.imgSrc && (imgSrc = pageData[key].properties.imgSrc);
				b.$broadcast("show.edit.bg", imgSrc);
				break
			}
		}
		b.$broadcast("dom.changed")
	}
	function resetData(pageDta) {//撤销或者恢复时重组数据
		angular.copy({}, currentPageIdListData);
		$.each(pageDta, function(index, item) {
			currentPageIdListData[item.id] = item;
		})
	}
	function initTopZIndex(type, data) {//添加素材时初始化素材的top以及zIndex
		var item = {},
			editArea = $("#nr .edit_area"),
			editAreaLast = editArea.children().last(),
			maxIndexElem = editArea.children(".maxIndex"),
			zIndexAttr = 1;

		if(maxIndexElem.length > 0){
			zIndexAttr = parseInt(maxIndexElem.css("z-index"), 10) + 1;
		}else if(editAreaLast.length > 0){
			zIndexAttr = parseInt(editAreaLast.css("z-index"), 10) + 1;
		}else{
			zIndexAttr = 101;
		}

		if (data) {
			data.zIndex = zIndexAttr;

			if(parseInt(data.top, 10) > $("#nr .edit_area").outerHeight() - 20){
				data.top = $("#nr .edit_area").outerHeight() - 20 + "px";
			}

			return data;
		}
		var editAreaOuterWidth = $("#nr .edit_area").outerWidth(),
			outerWidth = editAreaOuterWidth;

		if("v" == type){
			outerWidth = 50;
		}else if("4" == type){
			outerWidth = 80;
		}else if(5 == ("" + type).charAt(0) || "6" == type || "r" == type || "c" == type || "a" == type){
			outerWidth = 200;
		}

		item = {
			top: parseInt($(".edit_wrapper").scrollTop() - 300) + parseInt($(window).height() / 2)
		};
		item.zIndex = zIndexAttr;

		return item
	}
	function resetElemPoint(copyItem, pasteItem, index, maxLength) {//改变被粘贴素材的坐标 copyData[i], pasteData[i], a, pasteData.length
		var top = parseInt(copyItem.css.top, 10) + 10 * ha,
			left = parseInt(copyItem.css.left, 10);

		if(top + 34 > $("#nr .edit_area").outerHeight()){
			pasteItem.css.top = top + "px";
			pasteItem.css.left = left + 10 + "px";
		}else{
			pasteItem.css.top = top + 34 + "px";
			pasteItem.css.left = copyItem.css.left;
			index == maxLength && ha++;
		}
	}
	function createElementID() {//生成素材id随机数 
		return Math.ceil(1e10 * Math.random());
	}
	function makeUpElementData(type, b, c) {//拼接新增素材数据
		var elementCSS, 
			elementID = createElementID(),
			elementData = {};

		type = ("" + type).charAt(0);
		switch(type){
			case "1": 
				elementData = {
					id: elementID,
					properties: {
						title: l.instant("common.scene.COMMIT")
					},
					type: "1",
					pageId: currentPageData.obj.id,
					sceneId: currentPageData.obj.sceneId
				};
				break;
			case "2": //普通字体
				elementCSS = initTopZIndex(type, b);
				$.extend(!0, elementCSS, {
					width: 320,
					height: 38
				});
				elementData = {
					content: l.instant("common.scene.EDIT_TIP"),
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "2"
				};
				break;
			case "3"://背景素材
				var backgroundData = [];
				for (var i = 0; i < newCurrentPageElements.length; i++) {
					"3" == newCurrentPageElements[i].type && backgroundData.push(newCurrentPageElements[i]);
				}
				if (backgroundData.length > 0) {
					return backgroundData[0];
				}
				elementData = {
					content: null,
					css: {},
					id: elementID,
					num: 0,
					pageId: currentPageData.obj.id,
					properties: {
						bgColor: null,
						imgSrc: null
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "3"
				}
				break;
			case "4"://图片
				elementCSS = initTopZIndex(type, b);
				elementCSS.width = "100px";
				elementCSS.height = "100px";
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						width: "100px",
						height: "100px",
						src: ""
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "4"
				};
				break;
			case "5": //输入框
				elementCSS = initTopZIndex(type, b);
				elementCSS.width = "200px";
				$.extend(!0, elementCSS, {
					color: "#66cc00",
					borderWidth: "1",
					borderStyle: "solid",
					borderColor: "#66cc00",
					borderRadius: "0",
					backgroundColor: "#ffffff"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						placeholder: l.instant("common.scene.NAMED")
					},
					isInput: 1,
					sceneId: currentPageData.obj.sceneId,
					title: l.instant("common.scene.NAMED"),
					type: "5"
				};
				break;
			case "6": //提交按钮
				elementCSS = initTopZIndex(type, b);
				elementCSS.width = "100px";
				$.extend(!0, elementCSS, {
					color: "#fff",
					borderRadius: "0",
					backgroundColor: "#66cc00"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						title: l.instant("common.scene.COMMIT")
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "6"
				};
				break;
			case "8": //电话
				elementCSS = initTopZIndex(type, b);
				$.extend(!0, elementCSS, {
					color: "rgb(255, 255, 255)",
					width: "100px",
					height: "40px",
					lineHeight: "40px",
					borderWidth: "0",
					borderStyle: "solid",
					borderColor: "#ccc",
					borderRadius: "0",
					backgroundColor: "rgb(244, 113, 31)"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						title: l.instant("common.scene.DIALING"),
						number: ""
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "8"
				};
				break;
			case "a": //评分
				elementCSS = initTopZIndex(type, b);
				elementCSS.width = "200px";
				delete elementCSS.height;
				$.extend(!0, elementCSS, {
					color: "#676767",
					borderWidth: "0",
					borderStyle: "solid",
					borderColor: "#ccc",
					borderRadius: "0",
					backgroundColor: "#f9f9f9"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						icon: "eqf-star",
						size: "rating-m",
						color: "#66cc00"
					},
					isInput: 1,
					sceneId: currentPageData.obj.sceneId,
					title: "",
					type: "a"
				};
				break;
			case "c"://多选题
				elementCSS = initTopZIndex(type, b);
				elementCSS.width = "200px";
				delete elementCSS.height;
				$.extend(!0, elementCSS, {
					color: "#676767",
					borderWidth: "1",
					borderStyle: "solid",
					borderColor: "#08a1ef",
					borderRadius: "0",
					backgroundColor: "#ffffff"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						titleStyle: {
							backgroundColor: "#08a1ef",
							color: "#ffffff"
						},
						optionStyle: {
							borderBottomWidth: "1",
							borderBottomStyle: "solid",
							borderBottomColor: "#08a1ef"
						}
					},
					choices: '{"seq":3,"options":[{"id":1,"label":"选项1"},{"id":2,"label":"选项2"},{"id":3,"label":"选项3"}]}',
					isInput: 1,
					sceneId: currentPageData.obj.sceneId,
					title: "",
					type: "c"
				};
				break;
			case "d"://阅读量
				elementCSS = initTopZIndex(type, b);
				$.extend(!0, elementCSS, {
					width: "70px",
					height: "70px",
					lineHeight: "70px",
					color: "#66cc00",
					borderWidth: "0",
					borderStyle: "solid",
					borderColor: "#ccc",
					borderRadius: "35px",
					backgroundColor: "#f9f9f9"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						layout: "counter-tb",
						size: "counter-m",
						color: "#66cc00",
						icon: "icon-yulan"
					},
					sceneId: currentPageData.obj.sceneId,
					title: "",
					type: "d"
				};
				break;
			case "h"://形状
				elementCSS = initTopZIndex(type, b);
				$.extend(!0, elementCSS, {
					color: "#555",
					width: "100px",
					height: "100px"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					pageId: currentPageData.obj.id,
					properties: {
						type: "rect"
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "h"
				};
				break;
			case "i"://计数
				elementCSS = initTopZIndex(type, b);
				$.extend(!0, elementCSS, {
					width: "70px",
					height: "70px",
					lineHeight: "70px",
					color: "#66cc00",
					borderWidth: "0",
					borderStyle: "solid",
					borderColor: "#ccc",
					borderRadius: "35px",
					backgroundColor: "#f9f9f9"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						layout: "counter-tb",
						size: "counter-m",
						color: "#66cc00",
						icon: "icon-dianzandian"
					},
					sceneId: currentPageData.obj.sceneId,
					title: "",
					type: "i"
				};
				break;
			case "l"://链接
				elementCSS = initTopZIndex(type, b);
				$.extend(!0, elementCSS, {
					color: "rgb(255, 255, 255)",
					width: "100px",
					height: "40px",
					lineHeight: "40px",
					borderWidth: "0",
					borderStyle: "solid",
					borderColor: "#ccc",
					borderRadius: "0",
					backgroundColor: "rgb(244, 113, 31)"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						title: l.instant("common.scene.BUY")
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "l"
				};
				break;
			case "m"://百度地图
				elementCSS = initTopZIndex(type, b);
				elementCSS.width = "320px";
				elementCSS.height = "240px";
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						width: "400px",
						height: "300px"
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "m"
				};
				break;
			case "n"://随机事件
				elementCSS = initTopZIndex(type, b);
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					pageId: currentPageData.obj.id,
					properties: {
						pics: []
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "n"
				};
				break;
			case "p"://图集
				elementCSS = initTopZIndex(type, b);
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						title: l.instant("common.scene.ATLAS")
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "p"
				};
				break;
			case "r"://单选题
				elementCSS = initTopZIndex(type, b);
				elementCSS.width = "200px";
				delete elementCSS.height;
				$.extend(!0, elementCSS, {
					color: "#676767",
					borderWidth: "1",
					borderStyle: "solid",
					borderColor: "#08a1ef",
					borderRadius: "0",
					backgroundColor: "#ffffff"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						titleStyle: {
							backgroundColor: "#08a1ef",
							color: "#ffffff"
						},
						optionStyle: {
							borderBottomWidth: "1",
							borderBottomStyle: "solid",
							borderBottomColor: "#08a1ef"
						}
					},
					choices: '{"seq":3,"options":[{"id":1,"label":"选项1"},{"id":2,"label":"选项2"},{"id":3,"label":"选项3"}]}',
					isInput: 1,
					sceneId: currentPageData.obj.sceneId,
					title: "",
					type: "r"
				};
				break;
			case "s"://音效
				elementCSS = initTopZIndex(type, b);
				$.extend(!0, elementCSS, {
					color: "rgb(255, 255, 255)",
					width: "100px",
					height: "40px",
					lineHeight: "40px",
					borderWidth: "0",
					borderStyle: "solid",
					borderColor: "#ccc",
					borderRadius: "0",
					backgroundColor: "rgb(244, 113, 31)"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						title: l.instant("common.scene.SURPRISE")
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "s"
				};
				break;
			case "t": //上一页&下一页
				elementCSS = initTopZIndex(type, b);
				elementCSS.width = "200px";
				elementCSS.height = "40px";
				$.extend(!0, elementCSS, {
					color: "#fff",
					borderRadius: "0",
					backgroundColor: "#66cc00"
				});
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						title: "下一页"
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "t"
				};
				break;
			case "v"://视频
				elementCSS = initTopZIndex(type, b);
				elementCSS.width = "200px";
				elementCSS.height = "200px";
				elementData = {
					content: "",
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						src: ""
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: "v"
				};
				break;
			case "x"://多字体
				elementCSS = initTopZIndex(type, b);
				$.extend(!0, elementCSS, {
					width: 320,
					height: 38
				});
				elementData = {
					content: l.instant("common.scene.EDIT_TIP"),
					css: elementCSS,
					id: elementID,
					num: 1,
					pageId: currentPageData.obj.id,
					properties: {
						dataUrl: ""
					},
					sceneId: currentPageData.obj.sceneId,
					title: null,
					type: ("" + type).charAt(0)
				}
				break;
		}
		c && $.extend(!0, elementData, c);
		newCurrentPageElements.push(elementData);
		currentPageIdListData[elementData.id] = elementData;

		return elementData;
	}
	function makeUpHtml(a, c, d) {//根据数据拼接html
		var e = da.wrapComp(c, "edit");//拼接html
		$("#nr .edit_area").append(e);
		for (var f = da.getInterceptors(), h = 0; h < f.length; h++){
			f[h](e, c);
		}
		da.getEventHandlers()[("" + a).charAt(0)](e, c);

		if(!d){
			g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements);
			b.$broadcast("dom.changed");
			e.trigger("mousedown");
		}

		return  e
	}
	function getCompGroup(a, b) {
		var compGroup = [];
		if("g101" == a){
			compGroup.push(createCustomComp("501"));
			compGroup.push(createCustomComp("502"));
			compGroup.push(createCustomComp("503"));
			compGroup.push(createCustomComp("601"));
		}
		return compGroup;
	}
	function textEdit(textElem, textData) {//文字编辑   textElem textData
		sceneService.currentElemDef = textData;
		var textHeight = textData.css.height || 0;
		$(textElem).css({
			"min-height": textHeight,
			cursor: "text"
		});
		if(!$(textElem).parents("li").hasClass("inside-active")){
			$(textElem).bind("click", function(event) {
				event.stopPropagation();
			});
			$(document).bind("mousedown", function(event) {
				b.$broadcast("convert.html.canvas", textData, textElem);
				$(textElem).css({
					"min-height": "inherit",
					cursor: "default"
				});
				$("#btn-toolbar").find("input[type=text][data-edit]").blur();
				$("#btn-toolbar") && $("#btn-toolbar").remove();
				$(textElem).unbind("click");
				var textContent = textData.content;
				textData.content = $(textElem).html();
				//比较html内的content与data中的content，有差异的话就重新以html中的content替代data中的content，插件是bootstrap-wysiwyg；
				textContent != textData.content && b.$broadcast("hisChange");
				$(textElem).children().css("color") && (textData.css.color = $(textElem).children().css("color"));

				var newTextHeight = parseInt($(textElem).parent().height(), 10);
				if(newTextHeight > textHeight){
					textData.css.height = newTextHeight;
					$(textElem).parents("li").height(newTextHeight);
				}

				$(textElem).parents("li").removeClass("inside-active").css("user-select", "none"); 
				$(textElem).removeAttr("contenteditable");
				window.getSelection && window.getSelection().modify("move", "right", "line");
				$(document).unbind("mousedown");
			});
			$(textElem).parents("li").addClass("inside-active").css("user-select", "text");
			b.$broadcast("text.click", textElem)
		}
	}
	function elementOfPicture(initData, longpageObj) {//图片 替换图片或者新增图片
		var solvePicData = function(pic) {
			if(!pic.data){
				return deleteElements(initData.id);
			}
			initData.properties.src = pic.data;
			initData.properties.id = pic.id;
			var picRate = pic.width / pic.height;
				imgElem = $("#" + initData.id);

			if (imgElem.length > 0) { //替换图片
				var boxWidth = $("#inside_" + initData.id).width();
					boxHeight = $("#inside_" + initData.id).height();
					boxRate = boxWidth / boxHeight;

				if(picRate >= boxRate){//替换图片的宽高比大于被替换图片的宽高比
					imgElem.outerHeight(boxHeight);
					imgElem.outerWidth(boxHeight * picRate);
					imgElem.css("marginLeft", -(imgElem.outerWidth() - boxWidth) / 2); 
					imgElem.css("marginTop", 0);

				}else{//替换图片的宽高比小于被替换图片的宽高比
					imgElem.outerWidth(boxWidth); 
					imgElem.outerHeight(boxWidth / picRate);
					imgElem.css("marginTop", -(imgElem.outerHeight() - boxHeight) / 2);
					imgElem.css("marginLeft", 0);
				}

				imgElem.attr("src", PREFIX_FILE_HOST + pic.data);
				initData.properties.imgStyle = {};
				initData.properties.imgStyle.width = imgElem.outerWidth();
				initData.properties.imgStyle.height = imgElem.outerHeight();
				initData.properties.imgStyle.marginTop = imgElem.css("marginTop"); 
				initData.properties.imgStyle.marginLeft = imgElem.css("marginLeft");

			} else{//新增图片 
				pic.width > $("#nr .edit_area").width() && (pic.width = $("#nr .edit_area").width(), pic.height = pic.width / picRate);
				pic.height > $("#nr .edit_area").height() && (pic.height = $("#nr .edit_area").height(), pic.width = pic.height * picRate);
				initData.css.width = pic.width;
				initData.css.height = pic.height;
				initData.properties.imgStyle = {};
				initData.properties.imgStyle.width = pic.width;
				initData.properties.imgStyle.height = pic.height;
				initData.properties.imgStyle.marginTop = "0";
				initData.properties.imgStyle.marginLeft = "0";

				makeUpHtml(initData.type, initData);
			}
		}
		if(!longpageObj){
			return openPhotoModal(initData, function(data){
				solvePicData(data);
			}, function() {
				initData.properties.src || deleteElements(initData.id)
			})
		}else{//长图文左边图片库新增图片
			return longpageObj.data ? solvePicData(longpageObj) : deleteElements(initData.id)
		}
	};
	function elementOfShape(initData) {//形状
		la || c.open({
			windowClass: "console six-contain shape-console",
			templateUrl: "/Public/eq/6.0/templates/scene.console.shape.tpl.html",
			controller: "ShapeConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(shapeObj) {
			var shapeElem = $("#" + initData.id);
			initData.properties.type = shapeObj.type;
			initData.properties.viewBox = shapeObj.viewBox;

			if (shapeElem.length) {
				var d = $("#nr").find("#inside_" + initData.id);
				d.remove(), makeUpHtml(initData.type, initData)
			} else {
				makeUpHtml(initData.type, initData)
			}
		}, function() {
			$("#" + initData.id).length || deleteElements(initData.id)
		})
	}
	function elementOfMap(initData) {//百度地图类型链接模板和控制器，以及加全局样式
		la || c.open({
			windowClass: "console",
			templateUrl: "/Public/eq/6.0/templates/scene.console.adr.tpl.html",
			controller: "AdrConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(mapObj) {
			var mapElem = $("#" + initData.id);
			initData.properties.zoom = mapObj[0].zoom;
			initData.properties.pointX = mapObj[0].pointX;
			initData.properties.pointY = mapObj[0].pointY;
			initData.properties.mapSrc = mapObj[0].src;

			if (mapElem.length) {
				var d = $("#nr").find("#inside_" + initData.id);
				d.remove();
				makeUpHtml(initData.type, initData);
			} else {
				makeUpHtml(initData.type, initData);
			}
		}, function() {
			$("#" + initData.id).length || deleteElements(initData.id)
		})
	}
	function elementOfSubmit(initData) {//提交按钮
		c.open({
			windowClass: "console seven-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.button.tpl.html",
			controller: "ButtonConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(submitObj) {
			initData.properties.title = submitObj.title;
			initData.properties.number = submitObj.number;
			$.extend(!0, initData.css, submitObj.btnStyle);

			var submitElem = $("#" + initData.id, $("#nr"));
			submitElem.length > 0 && submitElem.parents("li").remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			$("#" + initData.id).length || deleteElements(initData.id);
		})
	}
	function elementOfTurnTo(type, kind, initData) {//表单跳转 上一页&&下一页
		c.open({
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.turnTo.tpl.html",
			controller: "TurnToConsoleCtrl",
			resolve: {
				obj: function() {
					return {
						type: type,
						mType: kind,
						data: initData
					}
				}
			}
		}).result.then(function(turnObj) {
			initData.properties.title = turnObj.title;
			initData.properties.number = turnObj.number;
			$.extend(!0, initData.css, turnObj.btnStyle);

			var turnElem = $("#" + initData.id, $("#nr"));
			turnElem.length > 0 && turnElem.parents("li").remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			$("#" + initData.id).length || deleteElements(initData.id);
		})
	}
	function elementOfPhone(initData) {//电话
		la || (la = c.open({
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.tel.tpl.html",
			controller: "TelConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(phoneObj) {
			la = null;
			initData.properties.title = phoneObj.title;
			initData.properties.number = phoneObj.number;
			phoneObj.title.replace(/ /g, "&nbsp;");
			$.extend(!0, initData.css, phoneObj.btnStyle);

			$("#" + initData.id).length > 0 && $("#" + initData.id).parents("li").remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			la = null;
			$("#" + initData.id).length || deleteElements(initData.id);
		}))
	}
	function elementOfInput(initData) {//输入框
		la || (la = c.open({
			windowClass: "console seven-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.input.tpl.html",
			controller: "InputConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(inputObj) {
			la = null;
			inputObj.type && (initData.type = inputObj.type);
			initData.properties.placeholder = inputObj.title;
			initData.properties.required = inputObj.required;
			initData.title = inputObj.title;
			$.extend(!0, initData.css, inputObj.btnStyle);

			var inputElem = $("#" + initData.id);
			inputElem.length > 0 && inputElem.parents("li").remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			la = null;
			$("#" + initData.id).length || deleteElements(initData.id);
		}))
	}
	function elementOfForm(initData) {//单选题 || 多选题
		la || (la = c.open({
			windowClass: "console eight-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.radio-checkbox.tpl.html",
			controller: "RadioCheckboxConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(formObj) {
			la = null;
			initData.title = formObj.title;
			initData.type = formObj.type;

			var formElem = $("#nr").find("#inside_" + initData.id);
			formElem.length && formElem.remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			la = null;
			$("#" + initData.id).length || deleteElements(initData.id);
		}))
	}
	function elementOfVote(initData) {//投票
		la || (la = c.open({
			windowClass: "console seven-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.rating.tpl.html",
			controller: "RatingConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(voteObj) {
			la = null;

			var voteElem = $("#nr").find("#inside_" + initData.id);
			voteElem.length && voteElem.remove();

			makeUpHtml(initData.type, initData)
		}, function() {
			la = null;
			$("#" + initData.id).length || deleteElements(initData.id);
		}))
	}
	function elementOfCounter(initData) {//计数
		la || (la = c.open({
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.counter.tpl.html",
			controller: "CounterConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(countObj) {
			la = null;
			$.extend(!0, initData.css, countObj.btnStyle);

			$("#" + initData.id).length > 0 && $("#" + initData.id).parents("li").remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			la = null;
			$("#" + initData.id).length || deleteElements(initData.id);
		}))
	}
	function elementOfStatistics(initData) {//阅读量
		la || (la = c.open({
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.statistics-component.tpl.html",
			controller: "StatisticsConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(staticObj) {
			la = null;
			$.extend(!0, initData.css, staticObj.btnStyle);

			$("#" + initData.id).length > 0 && $("#" + initData.id).parents("li").remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			la = null;
			$("#" + initData.id).length || deleteElements(initData.id)
		}))
	}
	function elementOfLink(initData) {//链接
		la || (la = c.open({
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.link-component.tpl.html",
			controller: "LinkComponentConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(linkObj) {
			la = null;
			if(isNaN(initData.properties.url)){
				initData.properties.url = PREFIX_S1_URL + "eqs/link?id=" + initData.sceneId + "&url=" + encodeURIComponent(initData.properties.url);
			}
			$.extend(!0, initData.css, linkObj.btnStyle);

			$("#" + initData.id).length > 0 && $("#" + initData.id).parents("li").remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			la = null, $("#" + initData.id).length || deleteElements(initData.id)
		}))
	}
	function elementOfSound(initData) {//音效组件 -- 横向导航栏添加音效
		la || (la = c.open({
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.sound-component.tpl.html",
			controller: "SoundComponentConsoleCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(soundObj) {
			la = null;
			soundObj.title.replace(/ /g, "&nbsp;");
			$.extend(!0, initData.css, soundObj.btnStyle);

			$("#" + initData.id).length > 0 && $("#" + initData.id).parents("li").remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			la = null;
			$("#" + initData.id).length || deleteElements(initData.id);
		}))
	}
	function elementOfPictureList(initData) {//图集
		la || (la = c.open({
			windowClass: "console seven-contain pictures1 pictures2",
			backdrop: "static",
			templateUrl: "/Public/eq/6.0/templates/scene.console.pictures1.tpl.html",
			controller: "pictures1Ctrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(picListObj) {
			la = null;
			initData.properties = picListObj;

			var picListElem = $("#inside_" + initData.id);
			picListElem.length && picListElem.remove();

			makeUpHtml(initData.type, initData);
		}, function() {
			la = null;
			$("#" + initData.id).length || deleteElements(initData.id);
		}))
	}
	function elementOfTextToMusic(a, b) {//文本转语音
		var thisScene = currentScene;
		openTextToMusicModal(thisScene, 2, function(a) {
			thisScene.bgAudio && n.pushUsedFile(2, a.id);
			a.url || a.src ? (n.removeUsedFile(2, a.id), thisScene.bgAudio = a) : thisScene.bgAudio = null;
		}, function() {
			la = null
		})
	}
   	function elementOfMusic(a, b) {//音乐  openAudioModal  
		var thisScene = currentScene;
		openSoundModal(thisScene, 2, function(a) {
			thisScene.bgAudio && n.pushUsedFile(2, a.id);
			a.url || a.src ? (n.removeUsedFile(2, a.id), thisScene.bgAudio = a) : thisScene.bgAudio = null;
		}, function() {
			la = null
		})
	}
	function addSound(a, b) {//横向导航栏 && 右键添加音效
		openSoundModal(a, 4, function(b) {
			var elem = $("#inside_" + a.id);
			if(b.src){
				a.sound = b;
				elem.children(".sound").length || $('<div class="sound eqf-music">').click(function() {
					addSound(a)
				}).appendTo(elem)
			}else{
				delete a.sound, elem.children(".sound").remove()
			}
		}, function() {
			la = null
		})
	}
	function openSoundModal(a, b, d, e) {//打开音乐 || 音效框
		la || (la = c.open({
			windowClass: "console img_console",
			templateUrl: "/Public/eq/6.0/templates/scene.console.sound.tpl.html",
			controller: "soundCtrl",
			resolve: {
				obj: function() {
					return {
						elemDef: a,
						type: b
					}
				}
			}
		}).result.then(function(a) {
			la = null;
			d(a);
		}, function() {
			la = null
		}))
	}
	function openTextToMusicModal(a, b, d, e) {//打开文本转语音
		la || (la = c.open({
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.sound2.tpl.html",
			controller: "soundCtrl",
			resolve: {
				obj: function() {
					return {
						elemDef: a,
						type: b
					}
				}
			}
		}).result.then(function(a) {
			la = null, d(a)
		}, function() {
			la = null
		}))
	}
	function elementOfVideo(initData) {//视频
		la || (la = c.open({
			windowClass: "console seven0-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.video.tpl.html",
			controller: "VideoCtrl",
			resolve: {
				obj: function() {
					return initData
				}
			}
		}).result.then(function(videoObj) {
			la = null;
			initData.properties = videoObj;

			$("#" + initData.id).length || makeUpHtml(initData.type, initData)
		}, function() {
			la = null;
			$("#" + initData.id).length || deleteElements(initData.id);
		}))
	}
	function elementOfBackground(initData, longpageBg) {// 背景  openBgModal
		!longpageBg ? (openPhotoModal(initData, function(bgObj) {
			if ("imgSrc" == bgObj.type) {
				var imgData = {
					type: 3,
					properties: {
						src: bgObj.data,
						id: bgObj.id
					}
				};
				if(bgObj.height / bgObj.width >= 1008 / 642 && bgObj.height / bgObj.width <= 1.578125){
					b.$broadcast("scene.bg.replace", {
						type: "imgSrc",
						src: bgObj.data,
						id: bgObj.id
					}, initData);
					g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements);

				}else{
					openImageCropModal(imgData, function(bgCutObj) {
						b.$broadcast("scene.bg.replace", {
							type: "imgSrc",
							src: bgCutObj.src,
							id: bgCutObj.id
						}, initData);
						g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements);
					}, function() {
						$("#" + initData.id).length || deleteElements(initData.id)
					})
				}
			}
			if("backgroundColor" == bgObj.type){
				b.$broadcast("scene.bg.replace", bgObj, initData);
				g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements);
			}

		}, function() {
			$("#" + initData.id).length || deleteElements(initData.id)
		})) : (function(bgObj){
			if (3 == bgObj.type) {
				var imgData = {
					type: 3,
					properties: {
						src: bgObj.data,
						id: bgObj.id
					}
				};
				if(bgObj.height / bgObj.width >= 1008 / 642 && bgObj.height / bgObj.width <= 1.578125){
					b.$broadcast("scene.bg.replace", {
						type: "imgSrc",
						src: bgObj.data,
						id: bgObj.id
					}, initData);
					g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements);
				}else{
					openImageCropModal(imgData, function(bgCutObj) {
						b.$broadcast("scene.bg.replace", {
							type: "imgSrc",
							src: bgCutObj.src,
							id: bgCutObj.id
						}, initData);
						g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements);
					}, function() {
						$("#" + initData.id).length || deleteElements(initData.id)
					})
				}
			}
			if("backgroundColor" == bgObj.type){
				b.$broadcast("scene.bg.replace", bgObj, initData);
				g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements);
			}

		}(longpageBg))
	}
	function elementOfRandoment(a) {//随机事件
		la || (la = c.open({
			windowClass: "console six-contain randomevent-console",
			templateUrl: "/Public/eq/6.0/templates/scene.console.randomevent.tpl.html",
			controller: "RandomEventCtrl",
			resolve: {
				obj: function() {
					return a
				}
			}
		}).result.then(function(c) {
			la = null;
			if(c && 0 !== c.length){
				a.properties.pics = c;
				$("#" + a.id).length || makeUpHtml(a.type, a);
				b.$broadcast("create.randomevent.trigger", a);
			}
		}, function() {
			la = null, $("#" + a.id).length || deleteElements(a.id)
		}))
	}
    function elementOfPPT(a){//PPT导入
        la || (la = c.open({
            windowClass: "console ppt_console",
            templateUrl: "/Public/eq/6.0/templates/scene.console.ppt.tpl.html",
            controller: "PptCtrl",
            resolve: {
                obj: function() {
                    return a
                }
            }
        }).result.then(function(b) {
            la = null, a.properties.src = b, $("#" + a.id).length || makeUpHtml(a.type, a)
        }, function() {
            la = null, $("#" + a.id).length || deleteElements(a.id)
        }))
    }
     function elementOfPSD(a){//PSD导入
            la || (la = c.open({
                windowClass: "console psd_console",
                templateUrl: "/Public/eq/6.0/templates/scene.console.psd.tpl.html",
                controller: "PsdCtrl",
                resolve: {
                    obj: function() {
                        return {
							type: "z"
						}
                    }
                }
            }).result.then(function(b) {
                la = null, a.properties.src = b, $("#" + a.id).length || makeUpHtml(a.type, a)
            }, function() {
                la = null, $("#" + a.id).length || deleteElements(a.id)
            }))
        }
	function openPhotoModal(a, b, d) {//打开图片 || 背景框
		if (!la) {
			var e = "0";
			3 == a.type && (e = "0"), 4 == a.type && (e = "1"), la = c.open({
				windowClass: "console img_console",
				templateUrl: "/Public/eq/6.0/templates/scene.console.bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: e,
							elemDef: a
						}
					}
				}
			}).result.then(function(a) {
				la = null;
				a.data ? b(a) : d(a)
			}, function(a) {
				la = null;
				d(a)
			})
		}
	}
	function showStylePanel_Style(a, c, d) {//组件设置 ---样式
		sceneService.currentElemDef = a;
		b.$broadcast("showStylePanel", {
			activeTab: "style"
		});
	}
	function showStylePanel_Animate(a, c, d) {//组件设置 ---动画
		sceneService.currentElemDef = a;
		b.$broadcast("showStylePanel", {
			activeTab: "anim"
		});
	}
	function showStylePanel_Trigger(a, c, d) {//组件设置 ---触发
		sceneService.currentElemDef = a;
		b.$broadcast("showStylePanel", {
			activeTab: "trigger"
		});
	}
	function openImageCropModal(a, b, d) {//图片切割框
		$ocLazyLoad.load("controllers/scene.create.console.imageCrop").then(function(){
			la = c.open({
				windowClass: "console seven-contain pictures1",
				templateUrl: "/Public/eq/6.0/templates/scene.console.imageCrop.tpl.html",
				controller: "imageCropCtrl",
				backdrop: "static",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(a) {
				la = null, "function" == typeof b && b(a)
			}, function(a) {
				la = null, "function" == typeof d && d(a)
			})
		});
	}
	function openTriggerModal() {//横向导航栏打开触发框  openTriggerMode
		$(".content").trigger("mousedown");
		sceneService.currentElemDef = null;
		b.$broadcast("showStylePanel", {
			activeTab: "trigger"
		})
	}
	function openLinkModal(a) {//鼠标右键打开链接
		a.sceneId = currentPageData.obj.sceneId;
		c.open({
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/scene.console.link.tpl.html",
			controller: "LinkConsoleCtrl",
			resolve: {
				obj: function() {
					return a
				}
			}
		}).result.then(function(b) {
			if(b && "http://" != b){
				if(isNaN(b)){
					a.properties.url = PREFIX_S1_URL + "eqs/link?id=" + a.sceneId + "&url=" + encodeURIComponent(b);
				}else{
					a.properties.url = b;
				}
				$("#inside_" + a.id).find(".fa-link").removeClass("fa-link").addClass("fa-anchor");
			}else{
				delete a.properties.url;
				$("#inside_" + a.id).find(".fa-anchor").removeClass("fa-anchor").addClass("fa-link");
			}
		})
	}
	function openTextStylePanel(textID, textData) {//根据鼠标动作 完成字体设置
		var textElem = $(".element", textID)[0];
		$(textElem).mousedown(function(event) {
			$(this).parents("li").hasClass("inside-active") && event.stopPropagation();
		});
		$(textElem).bind("contextmenu", function(event) {
			$(this).parents("li").hasClass("inside-active") ? event.stopPropagation() : $(this).blur();
		});
		$(textElem).bind("dblclick", function(event) {
			if($("#nr").find(".mask-trigger").length){
				return !1;
			}else{
				textEdit(textElem, textData);
				$("#popMenu").hide();
				return void event.stopPropagation();
			}
		});
		$(textElem).bind("keydown", function(event) {
			event.stopPropagation();
		})
	}
	var currentScene, //当前课件除了pageData之外的数据  来自index.php?c=scene&a=detail&id=接口
		currentScenePromise, //回调函数
		pasteData, //用于储存被粘贴数据
		copyData, //用于储存选择数据
		currentPageId, //当前页ID
		sceneService = {},//本服务文件 返回的json数据
		da = eqShow.templateParser("jsonParser"),
		currentPageData = null,//页面初始化时记录的当前页数据
		newCurrentPageElements = null,//页面修改时记录的当前页数据
		currentPageIdListData = {},//以素材id为下标的当前页数据集
		ha = ($("#nr .edit_area"), 0),//奇怪的赋值方式
		ia = !1;
	sceneService.historyBack = function() {//历史撤销
		g.canBack(currentPageData.obj.id) && (newCurrentPageElements = g.back(currentPageData.obj.id), resetData(newCurrentPageElements), refreshPage(newCurrentPageElements), b.$broadcast("close.style.panel"))
	}, sceneService.historyForward = function() {//历史恢复
		g.canForward(currentPageData.obj.id) && (newCurrentPageElements = g.forward(currentPageData.obj.id), resetData(newCurrentPageElements), refreshPage(newCurrentPageElements), b.$broadcast("close.style.panel"))
	};
	sceneService.createCompGroup = function(a, c) {//联系人
		for (var d = getCompGroup(a), e = 0; e < d.length; e++) {
			var f = makeUpElementData(d[e].type, c, d[e]);
			c = c ? {
				left: c.left,
				top: parseInt(c.top, 10) + 50 + "px"
			} : {
				left: "60px",
				top: "150px"
			}, makeUpHtml(d[e].type, f, !0)
		}
		g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements), b.$broadcast("dom.changed")
	},
	createCustomComp = function(a, b) {//createCustomComp
		var c;
		switch(a){
			case "501":
				c = {
					css:{
						left: "60px",
						top: "100px"
					},
					properties: {
						placeholder: l.instant("common.scene.NAME")
					},
					title: l.instant("common.scene.NAME"),
					type: 501
				}
				break;
			case "502":
				c = {
					properties: {
						placeholder: l.instant("common.scene.MOBILE")
					},
					title: l.instant("common.scene.MOBILE"),
					type: 502
				}
				break;
			case "503":
				c = {
					properties: {
						placeholder: l.instant("common.scene.EMAIL")
					},
					title: l.instant("common.scene.EMAIL"),
					type: 503
				}
				break;
			case "601":
				c = {
					css: {
						left: "110px"
					},
					properties: {
						title: l.instant("common.scene.COMMIT")
					},
					type: 601
				}
				break;
		}

		return c
	};
	sceneService.createComp = function(type, e, kind) {//添加新素材
		var elementData;
		searchVal = "";
		if ("g" == ("" + type).charAt(0)) return void sceneService.createCompGroup(type, e);//联系人
		if ("9" == ("" + type).charAt(0)) return void elementOfMusic(elementData, 2);//音乐
		if ("q" == ("" + type).charAt(0)) return void elementOfTextToMusic(elementData, 2);//文本转语音

		elementData = makeUpElementData(type, e);

		if (4 == type) return kind == "longpage" ? (void b.$broadcast("picture.show")) : (void elementOfPicture(elementData));//使用左边图片库
		if ("h" == type) return void elementOfShape(elementData);//形状
		if ("m" == type) return void elementOfMap(elementData);//添加百度地图类型
		if (5 == type) return void elementOfInput(elementData);//输入框
		if (6 == type) return void elementOfSubmit(elementData);//提交按钮
		if ("t" == type) return void elementOfTurnTo(type, kind, elementData);//上一页&下一页
        if (8 == type) return void elementOfPhone(elementData);//电话
		if (22 == type) return void elementOfPPT(elementData);//ppt导入
		if ("z" == type) return void elementOfPSD(elementData);//psd导入
		if ("p" == type) return void elementOfPictureList(elementData);//图集
		if ("v" == type) return void elementOfVideo(elementData);//视频
		if (3 == type) return kind == "longpage" ? (void b.$broadcast("bg.show")) : (void elementOfBackground(elementData));//使用左边背景库
		if ("r" == type || "c" == type) return void elementOfForm(elementData);//单选题或者多选题
		if ("a" == type) return void elementOfVote(elementData);//评分
		if ("i" == type) return kind && (elementData.properties.icon = kind), void elementOfCounter(elementData);//计数
		if ("d" == type) return kind && (elementData.properties.icon = kind), void elementOfStatistics(elementData);//阅读量
		if ("l" == type) return void elementOfLink(elementData);//链接
		if ("s" == type) return void elementOfSound(elementData);//音效
		if ("n" == type) return void elementOfRandoment(elementData);//随机事件
		if (2 == type || "x" == type) {//多字体 || 文本
			var elem = makeUpHtml(type, elementData);
			$(".element", elem).trigger("dblclick").focus();
			setTimeout(function() {
				if (window.getSelection) {
					var getSelection = window.getSelection();
					getSelection.modify("move", "left", "line");
					getSelection.modify("extend", "right", "line");
				}
			})
		} else {
			makeUpHtml(type, elementData)
		}
	}, sceneService.updateCompPosition = function(a, c, d) {
		for (var e = 0; e < newCurrentPageElements.length; e++){
			if("inside_" + newCurrentPageElements[e].id == a){
				newCurrentPageElements[e].css ? (
					newCurrentPageElements[e].css.left = c.left, 
					newCurrentPageElements[e].css.top = c.top, 
					d || g.addPageHistory(currentPageData.obj.id, newCurrentPageElements)
				) : (
					newCurrentPageElements[e].css = c, 
					d || g.addPageHistory(currentPageData.obj.id, newCurrentPageElements)
				)
			}
		};
		b.$$phase || b.$apply()
	}, sceneService.updateCompAngle = function(a, c) {
		for (var d = 0; d < newCurrentPageElements.length; d++){
			if("inside_" + newCurrentPageElements[d].id == a){
				if(newCurrentPageElements[d].css){
					newCurrentPageElements[d].css.transform = "rotateZ(" + c + "deg)";
				}else{
					newCurrentPageElements[d].css = {};
				}
				g.addPageHistory(currentPageData.obj.id, newCurrentPageElements);
			}
		};
		b.$apply();
	}, sceneService.setCopy = function(a) {
		ia = a;
		b.$broadcast("copyState.update", a);
	}, sceneService.getCopy = function() {
		return ia
	}, sceneService.getPageNames = function(b) {
		var c = "index.php?c=scene&a=pagelist&id=" + b + "&date=" + (new Date).getTime();
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, sceneService.changePageSort = function(b, c) {
		var d = "index.php?c=page&a=pageSort&id=" + c + "&pos=" + b + "&date=" + (new Date).getTime();
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		})
	}, sceneService.updateCompSize = function(a, c, d) {
		for (var e = 0; e < newCurrentPageElements.length; e++){
			if("inside_" + newCurrentPageElements[e].id == a){
				newCurrentPageElements[e].css || (newCurrentPageElements[e].css = {});
				newCurrentPageElements[e].css.width = c.width;
				newCurrentPageElements[e].css.height = c.height;
				c.lineHeight && (newCurrentPageElements[e].css.lineHeight = c.lineHeight);
				newCurrentPageElements[e].css.top = c.top;
				newCurrentPageElements[e].css.left = c.left;
				newCurrentPageElements[e].properties.width = c.width;
				newCurrentPageElements[e].properties.height = c.height;
				c.imgStyle && (newCurrentPageElements[e].properties.imgStyle = c.imgStyle);
				d || g.addPageHistory(currentPageData.obj.id, newCurrentPageElements);
			}
		};
		b.$$phase || b.$apply();
	}, sceneService.savePageNames = function(b) {
		var c = "index.php?c=page&a=savePageName",
			d = {
				id: b.id,
				sceneId: b.sceneId,
				name: b.name
			};
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(d)
		})
	}, sceneService.resetCss = function() {
		$("#nr .edit_area li").each(function(a, b) {
			var c = currentPageIdListData[b.id.replace(/inside_/g, "")];
			c && (c.css || (c.css = {}), c.css.zIndex = a)
		})
	}, sceneService.copyElement = function() {
		ha = 0;
		currentPageId = currentPageData.obj.id;
		var selectedElements = h.getElements(),//被选中的素材
			selectedElementsList = [];//被选中的素材的数据集
		$.each(selectedElements, function(a, c) {
			selectedElementsList.push(currentPageIdListData[c])
		});
		pasteData = angular.copy(selectedElementsList);//用于粘贴重置的复制数据
		copyData = angular.copy(selectedElementsList);//用于比照的复制数据
		sceneService.setCopy(!0);

	}, sceneService.isCurrentPageSubmitButtonAlreadyExist = function() {//判断是否包含提交按钮
		var a = !1;
		angular.forEach(currentPageData.obj.elements, function(b) {
			6 == ("" + b.type).charAt(0) && (a = !0);
		});
		return a;
	}, sceneService.pasteElement = function() {//粘贴素材
		var index = 0, 
			elementList = [], 
			isExist = sceneService.isCurrentPageSubmitButtonAlreadyExist();
		for (var i = 0; i < pasteData.length; i++) {
			if (6 !== pasteData[i].type && 601 !== pasteData[i].type || !isExist) {
				pasteData[i].pageId = currentPageData.obj.id;
				pasteData[i].id = createElementID();

				if(currentPageId == pasteData[i].pageId){
					index++;
					resetElemPoint(copyData[i], pasteData[i], index, pasteData.length);
				}else{
					ha = 0;
					pasteData[i].css = angular.copy(copyData[i].css);
				}

				var newPasteData = angular.copy(pasteData[i]);
				newCurrentPageElements.push(newPasteData);
				currentPageIdListData[newPasteData.id] = newPasteData;
				elementList.push(makeUpHtml(newPasteData.type, newPasteData, !0));
			}
		}
		currentPageId = currentPageData.obj.id;
		g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements);
		b.$broadcast("dom.changed");
		angular.forEach(h.getElements(), function(item) {
			$("#inside_" + item).children(".bar").hide();
		});
		h.clearElements();
		$.each(elementList, function(index, item) {
			item.children(".bar").show();
			h.addElement(item.attr("id").split("_")[1]);
		})
	}, sceneService.openCropModal = function(a, b, c) {
		openImageCropModal(a, b, c);
	}, sceneService.replaceBgImage = function(a, c, d) {
		var e = a;
		c.style.backgroundImage = "url(" + PREFIX_FILE_HOST + e + ")";
		d.properties.bgColor = null;
		d.properties.imgSrc = e;
		b.$broadcast("show.edit.bg");
	};
	var la = null;
	
	utilTrigger.getSendType();
	utilTrigger.getHandleType();

	sceneService.openTriggerMode = openTriggerModal;
	da.addInterceptor(function(a, c, d) {

		function f() {
			var d = $('<ul id="popMenu" class="dropdown-menu" style="min-width: 150px; display: block;" role="menu" aria-labelledby="dropdownMenu1"><li class="edit" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-write"></div>编辑</a></li><li class="style" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-type"></div>样式</a></li><li class="animation" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-move"></div>动画</a></li><li class="sound" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-music"></div>音效</a></li><li class="trigger" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-chufa"></div>触发</a></li><li class="link" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-link"></div>链接</a></li><li class="copy" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-scene-copy"></div>复制</a></li><li class="cut" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-cut"></div>裁切</a></li><li role="presentation" class="bottom_bar"><a title="置顶"><div class="eqf-top up-all"></div></a><a title="上移一层"><div class="eqf-up up"></div></a><a title="下移一层"><div class="eqf-down down"></div></a><a title="置底"><div class="eqf-under down-all"></div></a><a title="删除"><div class="eqf-scene-delete remove"></div></a></li></ul>').css({
				position: "absolute",
				"user-select": "none"
			});
			ia && d.find(".copy").after($('<li class="paste" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-print"></div>粘贴</a></li>'));
			d.find(".edit").click(function(b) {
				switch (b.stopPropagation(), c.type.toString().charAt(0)) {
					case "1":
						break;
					case "2":
						textEdit(a.find(".element").get(0), c);
						break;
					case "x":
						textEdit(a.find(".element").get(0), c);
						break;
					case "3":
						break;
					case "4":
						elementOfPicture(c);
						break;
					case "h":
						elementOfShape(c);
						break;
					case "m"://百度地图
						elementOfMap(c);
						break;
					case "5":
						elementOfInput(c);
						break;
					case "6":
						elementOfSubmit(c);
						break;
					case "t"://表单跳转
						elementOfTurnTo(c);
						break;
					case "7":
						break;
					case "8":
						elementOfPhone(c);
						break;
					case "9":
						break;
					case "g":
						break;
					case "p":
						elementOfPictureList(c);
						break;
					case "v":
						elementOfVideo(c);
						break;
					case "r":
					case "c":
						elementOfForm(c);
						break;
					case "a":
						elementOfVote(c);
						break;
					case "l":
						elementOfLink(c);
						break;
					case "s":
						elementOfSound(c);
						break;
					case "i":
						elementOfCounter(c);
						break;
					case "d":
						elementOfStatistics(c);
						break;
					case "n"://随机事件
						P(c)
				}
				d.hide()
			}), d.find(".style").click(function(b) {
				b.stopPropagation();
				showStylePanel_Style(c, function(b) {
					if (1 == c.type) {
						for (var d in c.properties.labels) {
							if(b.backgroundColor){
								c.properties.labels[d].color.backgroundColor = b.backgroundColor;
								$(".label_content").css("background-color", b.backgroundColor);
							}
							if(b.color){
								c.properties.labels[d].color.color = b.color;
								$(".label_content").css("color", b.color);
							}
						}
					}else {
						$(".element-box", a).css(b);
						$.extend(!0, c.css, b);
					}
				});
				d.hide();
			}), d.find(".animation").click(function(a) {
				a.stopPropagation();
				showStylePanel_Animate(c, function(a) {
					c.properties.anim = a
				});
				d.hide();
			}), d.find(".link").click(function(a) {
				a.stopPropagation();
				openLinkModal(c);
				d.hide();

			}), d.find(".remove").click(function(a) {
				a.stopPropagation();
				b.$broadcast("element.delete");

			}), d.find(".sound").click(function(a) {
				a.stopPropagation();
				addSound(c, 4);
				d.hide();

			}), d.find(".trigger").click(function(a) {
				a.stopPropagation();
				var b = utilTrigger.getHandleType();
				$.each(b, function(a, b) {
					k.getSendIds(b.value, c.id);
				});
				showStylePanel_Trigger(c, function(a) {
					c.properties.trigger = a;
				});
				d.hide();
			})/*, d.find(".down").click(function(b) {
				var c = a.prev();
				if (!(c.length <= 0)) {
					var d = a.css("zIndex");
					a.css("zIndex", c.css("zIndex")), c.css("zIndex", d), c.before(a)
				}
			}), d.find(".up").click(function(b) {
				var c = a.next();
				if (!(c.length <= 0)) {
					var d = a.css("zIndex");
					a.css("zIndex", c.css("zIndex")), c.css("zIndex", d), c.after(a)
				}
			}), d.find(".up-all").click(function(b) {
				var c = a.siblings("li"),
					d = c.last();
				d.after(a), a.css("zIndex", c.length + 1), c.each(function(a, b) {
					$(b).css("zIndex", a + 1)
				})
			}), d.find(".down-all").click(function(b) {
				var c = a.siblings("li"),
					d = c.first();
				d.before(a), a.css("zIndex", 1), c.each(function(a, b) {
					$(b).css("zIndex", a + 2)
				})
			})*/,d.find(".down").click(function(event) {
				var target = a,
					prev = target.prev();
				if (!(prev.length <= 0)) {
					console.log("down");
					var targetIndex, 
						preIndex,
						targetID = target.attr("id").slice(7),
						preID = prev.attr("id").slice(7),
						zIndex = target.css("zIndex");
					target.css("zIndex", prev.css("zIndex")), 
					prev.css("zIndex", zIndex), 
					prev.before(target);
					if(newCurrentPageElements.length > 1){
						for(var i = 0; i<newCurrentPageElements.length; i++){
							if(newCurrentPageElements[i].id == targetID){
								targetIndex = i;
							}else if(newCurrentPageElements[i].id == preID){
								preIndex = i;
							}else{
								continue;
							}
						}
						var arr = newCurrentPageElements[preIndex];
						newCurrentPageElements[preIndex] = newCurrentPageElements[targetIndex], 
						newCurrentPageElements[targetIndex] = arr
					}
				}

			}), d.find(".up").click(function(event) {
				var target = a,
					next = target.next()
				if (!(next.length <= 0)) {
					console.log("up");
					var targetIndex, 
						nextIndex,
						targetID = target.attr("id").slice(7).
						nextID = next.attr("id").slice(7),
						zIndex = target.css("zIndex");
					target.css("zIndex", next.css("zIndex")), 
					next.css("zIndex", zIndex), 
					next.after(target);
					if(newCurrentPageElements.length > 1){
						for(var i = 0; i<newCurrentPageElements.length; i++){
							if(newCurrentPageElements[i].id == targetID){
								targetIndex = i;
							}else if(newCurrentPageElements[i].id == nextID){
								nextIndex = i;
							}else{
								continue;
							}
						}
						var arr = newCurrentPageElements[nextIndex];
						newCurrentPageElements[nextIndex] = newCurrentPageElements[targetIndex], 
						newCurrentPageElements[targetIndex] = arr
					}
				}
			}), d.find(".up-all").click(function(event) {
				var target = a,
					siblings = target.siblings("li"),
					last = siblings.last(),
					targetID = target.attr("id").slice(7),
					arr = [];
				last.after(target), target.css("zIndex", siblings.length + 1), siblings.each(function(index, element) {
					$(element).css("zIndex", index + 1)
				})
				console.log("up-all");
				for(var i = 0; i<newCurrentPageElements.length; i++){
					if(newCurrentPageElements[i].id != targetID){
						arr.push(newCurrentPageElements[i]);
					}else{
						continue;
					}
				}
				for(var i = 0; i<newCurrentPageElements.length; i++){
					if(newCurrentPageElements[i].id == targetID){
						arr.push(newCurrentPageElements[i]);
					}else{
						continue;
					}
				}
				newCurrentPageElements = arr;

			}), d.find(".down-all").click(function(event) {
				
				var target = a,
					siblings = target.siblings("li"),
					first = siblings.first(),
					targetID = target.attr("id").slice(7),
					arr = [];
				first.before(target), target.css("zIndex", 1), siblings.each(function(index, element) {
					$(element).css("zIndex", index + 2);
				});
				console.log("down-all");
				for(var i = 0; i<newCurrentPageElements.length; i++){
					if(newCurrentPageElements[i].id == targetID){
						arr.push(newCurrentPageElements[i]);
					}else{
						continue;
					}
				}
				for(var i = 0; i<newCurrentPageElements.length; i++){
					if(newCurrentPageElements[i].id != targetID){
						arr.push(newCurrentPageElements[i]);
					}else{
						continue;
					}
				}
				newCurrentPageElements = arr;
			}), d.find(".copy").click(function(a) {
				a.stopPropagation();
				$(".modal-dialog")[0] || sceneService.copyElement();
				d.hide();

			}), d.find(".paste").click(function(a) {
				a.stopPropagation();
				$(".modal-dialog")[0] || sceneService.pasteElement();
				d.hide();

			}), d.find(".cut").click(function(a) {
				a.stopPropagation();
				openImageCropModal(c, function() {
					g.addPageHistory(currentPageData.obj.id, currentPageData.obj.elements);
				});
				d.hide();

			});
			2 != c.type && 4 != c.type && "h" != c.type && "x" != c.type && d.find(".trigger").hide();
			2 != c.type && 4 != c.type && 5 != c.type && "h" != c.type && "x" != c.type && 501 != c.type && 502 != c.type && 503 != c.type && d.find(".sound").hide();
			e.isAllowToAccess(e.accessDef.SCENE_EDIT_TRIGGER) || d.find(".trigger").hide();
			e.isAllowToAccess(e.accessDef.SCENE_EDIT_SOUND) || d.find(".sound").hide();
			4 != c.type && "h" != c.type && "x" != c.type && d.find(".link").hide();
			4 != c.type && d.find(".cut").hide();
			"p" == c.type && (d.find(".animation").hide(), d.find(".style").hide());
			(6 == c.type || 601 == c.type) && d.find(".copy").hide();

			return d;
		}
		if ("view" != d) {
			c.trigger && k.setTrigger(c.id, c.trigger);
			var eqMain = $("#eq_main");
			c.sound && $('<div class="sound eqf-music">').click(function() {
				addSound(c);
			}).appendTo(a);
			a.on("contextmenu", ".element-box", function(d) {
				function e(a, b) {
					$("#" + b).remove();
					a.css({
						left: d.pageX + eqMain.scrollLeft() + 15,
						top: d.pageY + eqMain.scrollTop(),
						zIndex: 10001
					}).appendTo(eqMain);
					eqMain.mousemove(function(c) {
						a = $("#" + b);
						(c.pageX < a.offset().left - 20 || c.pageX > a.offset().left + a.width() + 20 || c.pageY < a.offset().top - 20 || c.pageY > a.offset().top + a.height() + 20) && (a.hide(), $(this).unbind("mousemove"));
					})
				}
				if (d.stopPropagation(), "none" != $(".select-panel").css("display")) {
					return !1;
				}
				if ($("#nr").find(".mask-trigger").length) {

					sceneService.currentElemDef && b.$broadcast("create.trigger.menu", a, d);

					if (!$(".edit_area").find(".switch-original").length) {
						var g = $('<div class="switch">');
						a.append(g).children(".bar").hide();
					}
					return !1
				}
				$("#comp_setting:visible").length > 0 && "p" != c.type && (sceneService.currentElemDef = c, b.$broadcast("showStylePanel"));
				var i = f();
				return e(i, "popMenu"), !1
			});
			a.on("click", function(b) {
				b.stopPropagation();
				if($("#nr").find(".mask-trigger").length){
					return void 0;
				}else{
					showStylePanel_Style(c, function(b) {
						if (1 == c.type) {
							for (var d in c.properties.labels) {
								if(b.backgroundColor){
									c.properties.labels[d].color.backgroundColor = b.backgroundColor;
									$(".label_content").css("background-color", b.backgroundColor);
								}
								if(b.color){
									c.properties.labels[d].color.color = b.color;
									$(".label_content").css("color", b.color);
								}
							}
						}else {
							$(".element-box", a).css(b), $.extend(!0, c.css, b)
						}
					});
					return !1;
				}
			});
			a.attr("title", "按住鼠标进行拖动，点击鼠标进行编辑");
		}
	}), da.bindEditEvent("2", function(a, b) {
		openTextStylePanel(a, b);

	}), da.bindEditEvent("x", function(a, b) {
		openTextStylePanel(a, b);

	}), da.bindEditEvent("3", function(a, b) {

	}), da.bindEditEvent("v", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfVideo(b), $("#popMenu").hide()
		})
	}), da.bindEditEvent("4", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			if($("#nr").find(".mask-trigger").length){
				return !1;
			}else{
				elementOfPicture(b);
				return void $("#popMenu").hide();
			}
		})
	}), da.bindEditEvent("m", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			if($("#nr").find(".mask-trigger").length){
				return !1;
			}else{
				elementOfMap(b);
				return void $("#popMenu").hide();
			}
		})
	}), da.bindEditEvent("n", function(a, b) {//随机事件
		var c = $(".element", a)[0];
		$(c).bind("dblclick", function() {
			return $("#nr").find(".mask-trigger").length ? !1 : (P(b), void $("#popMenu").hide())
		})
	}), da.bindEditEvent("h", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			if($("#nr").find(".mask-trigger").length){
				return !1;
			}else{
				elementOfShape(b);
				return void $("#popMenu").hide();
			}

		})
	}), da.bindEditEvent("5", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
			elementOfInput(b), $("#popMenu").hide()
		})
	}), da.bindEditEvent("r", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfForm(b);
			$("#popMenu").hide();
		})
	}), da.bindEditEvent("c", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfForm(b);
			$("#popMenu").hide();
		})
	}), da.bindEditEvent("a", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfVote(b);
			$("#popMenu").hide();
		})
	}), da.bindEditEvent("p", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfPictureList(b);
			$("#popMenu").hide();
		}), i.setProperties(b.properties)
	}), da.bindEditEvent("6", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfSubmit(b);
			$("#popMenu").hide();
		})
	}), da.bindEditEvent("t", function(a, b) {//表单跳转
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfTurnTo(b);
			$("#popMenu").hide();
		})
	}), da.bindEditEvent("8", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfPhone(b);
			$("#popMenu").hide();
		})
	}), da.bindEditEvent("l", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfLink(b);
			$("#popMenu").hide();
		})
	}), da.bindEditEvent("s", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfSound(b);
			$("#popMenu").hide();
		})
	}), da.bindEditEvent("i", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfCounter(b);
			$("#popMenu").hide();
		})
	}), da.bindEditEvent("d", function(a, b) {
		var c = $(".element", a)[0];
		$(c).unbind("dblclick");
		$(c).bind("dblclick", function() {
			elementOfStatistics(b);
			$("#popMenu").hide();
		})
	});/* da.bindEditEvent("7", function(a, b) {
		var d = $(".element", a)[0];
		d.addEventListener("click", function(a) {
			la || c.open({
				windowClass: "",
				templateUrl: "/Public/eq/6.0/templates/scene.console.map.tpl.html",
				controller: "MapConsoleCtrl"
			}).result.then(function(a) {
				var c = new BMap.Map("map_" + b.id);
				c.clearOverlays();
				var d = new BMap.Point(a.lng, a.lat),
					e = new BMap.Marker(d);
				c.addOverlay(e);
				var f = new BMap.Label(a.address, {
					offset: new BMap.Size(20, -10)
				});
				e.setLabel(f), c.centerAndZoom(d, 12), b.properties.pointX = a.lng, b.properties.pointY = a.lat, b.properties.x = a.lng, b.properties.y = a.lat, b.properties.markTitle = a.address
			})
		})
	}),*/ 
	sceneService.templateEditor = da;
	/*sceneService.getTplById = function(b) {
		var c = "m/scene/select?id=" + b,
			d = new Date;
		return c += "&time=" + d.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, */sceneService.createByTpl = function(b) {//套用模板创建微课
		var c = PREFIX_URL + "index.php?c=scene&a=createBySys";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, sceneService.getSceneDetail = function(b, c) {//获取课件设置信息
		var d = "index.php?c=scene&a=detail&id=" + b;
		c && (d += (/\?/.test(d) ? "&" : "?") + "user=" + c);
		currentScenePromise = a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		});
		currentScene = null;
		currentScenePromise.then(function(a) {
			if(a.data.obj.bgAudio.url == ""){
				a.data.obj.bgAudio = null;
			}else{
				a.data.obj.bgAudio = a.data.obj.bgAudio;
			}
			currentScene = a.data.obj;
		});

		return currentScenePromise
	}, sceneService.getCurrentScene = function() {
		return currentScene
	}, sceneService.getCurrentScenePromise = function() {
		return currentScenePromise
	}, sceneService.saveSceneSettings = function(b) {//保存设置
		b = angular.copy(b);
		angular.isObject(b.bgAudio) && (b.bgAudio = JSON.stringify(b.bgAudio));
		b.image = null;
		var c = "index.php?c=scene&a=saveSettings";
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			},
			data: JSON.stringify(b)
		})
	}, sceneService.publishScene = function(b) {//发布课件---短页面
		var c = "index.php?c=scene&a=publish&id=" + b,
			d = new Date;
		return c += "&time=" + d.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	},sceneService.publishSceneLongPage = function(b, url) {//发布课件---长图文，发布时把课件封面保存
		var data = {
			temp: url
		}
		var c = "index.php?c=scene&a=publish&id=" + b,
			d = new Date;
		return c += "&time=" + d.getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			},
			data: JSON.stringify(data)
		})
	}, sceneService.closeScene = function(b) {//关闭微课访问
		var c = "index.php?c=scene&a=off&id=" + b,
			d = new Date;
		return c += "&time=" + d.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, sceneService.openScene = function(b) {//开放微课访问
		var c = "index.php?c=scene&a=on&id=" + b,
			d = new Date;
		return c += "&time=" + d.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, sceneService.createBlankScene = function(b, c, d,islongpage) {//建立空白微课
		var e = {
			name: b,
			type: c,
			pageMode: d,
			islongpage: islongpage
		},
			f = "index.php?c=scene&a=create";
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + f,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(e)
		})
	}, sceneService.copySceneById = function(b) {//复制微课
		var c = "index.php?c=scene&a=createByCopy&id=" + b;
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, sceneService.deleteSceneById = function(b, c) {//删除微课
		var d = "index.php?c=scene&a=delscene&id=" + b;
		return c && (d += "&backup=" + c), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		})
	},/* sceneService.getCoverImages = function() {
		var b = "index.php?c=upfile&a=userList&bizType=99&fileType=1&time=" + (new Date).getTime();
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + b
		})
	}, */sceneService.revoke = function(b) {
		var c = "m/scene/revoke?id=" + b + "&time=" + (new Date).getTime();
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, sceneService.getSceneByPage = function(pageNum, isInsert, isCopy) {
		var url = "";
		if(isInsert || isCopy){
			url = "index.php?c=scene&a=createpage&id=" + pageNum;
			isCopy && (url += "&copy=true");
		}else{
			url = "index.php?c=scene&a=design&id=" + pageNum;
		}
		var g = d.defer(),
			h = new Date;
		return url += (/\?/.test(url) ? "&" : "?") + "time=" + h.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + url
		}).then(function(a) {
			//b.presentPageObj = a.data;
			g.resolve(a);
			currentPageData = a.data;
			currentPageData.obj.elements || (currentPageData.obj.elements = []);
			newCurrentPageElements = currentPageData.obj.elements;

			for (var b = 0; newCurrentPageElements && b < newCurrentPageElements.length; b++) {
				currentPageIdListData[newCurrentPageElements[b].id] = newCurrentPageElements[b];
			}
		}, function(a) {
			g.reject(a);
		}), g.promise
	}, /*sceneService.previewSceneTpl = function(b) {
		var c = "index.php?c=scene&a=syspageinfo&id=" + b,
			e = (d.defer(), new Date);
		return c += (/\?/.test(c) ? "&" : "?") + "time=" + e.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, sceneService.recentlyUsedTpls = function() {
		var b = "/m/scene/tpl/recently/used";
		return b += (/\?/.test(b) ? "&" : "?") + "time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + b
		})
	}, */sceneService.recordTplUsage = function(b) {//记录模板套用次数
		var c = "index.php?c=scene&a=usepage&id=" + b;
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c
		})
	}, sceneService.getSceneTpl = function(b) {//套用模板
		var c = f.get("tplCache") ? f.get("tplCache") : f("tplCache"),
			e = d.defer();
		if (c.get(b)) {
			var g = $.extend(!0, {}, c.get(b));
			g.data.obj.scene && g.data.obj.scene.bgAudio && (currentScene.bgAudio = g.data.obj.scene.bgAudio);
			for (var h = 0; h < g.data.obj.elements.length; h++) {
				var i = g.data.obj.elements[h];
				i.id = createElementID();
				i.sceneId = currentPageData.obj.sceneId;
				i.pageId = currentPageData.obj.id;
			}
			newCurrentPageElements = g.data.obj.elements;
			for (var j = 0; j < newCurrentPageElements.length; j++) {
				currentPageIdListData[newCurrentPageElements[j].id] = newCurrentPageElements[j];
			}
			e.resolve(g)
		} else {
			var k = "index.php?c=scene&a=syspageinfo&id=" + b,
				l = new Date;
			k += (/\?/.test(k) ? "&" : "?") + "time=" + l.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + k
			}).then(function(a) {
				c.put(a.data.obj.id, $.extend(!0, {}, a));
				a.data.obj.scene && a.data.obj.scene.bgAudio && (currentScene.bgAudio = a.data.obj.scene.bgAudio);
				for (var b = 0; b < a.data.obj.elements.length; b++) {
					var d = a.data.obj.elements[b];
					d.id = createElementID();
					d.sceneId = currentPageData.obj.sceneId;
					d.pageId = currentPageData.obj.id;
				}
				newCurrentPageElements = a.data.obj.elements;
				for (var f = 0; f < newCurrentPageElements.length; f++) {
					currentPageIdListData[newCurrentPageElements[f].id] = newCurrentPageElements[f];
				}
				e.resolve(a)
			}, function(a) {
				e.reject(a)
			})
		}
		return e.promise
	}, sceneService.saveScene = function(b) {//保存微课
		/*var oldVal;
		for(var i = 0;i<b.elements.length;i++){
			if(b.elements[i].type && (b.elements[i].type == 2)){
				var colorVal = b.elements[i].css.color;
				if(b.elements[i].content.split('color:')[1]){
					oldVal = b.elements[i].content.split('color:')[1].split(";")[0];
				}
				if(colorVal && colorVal != "#676767"){
					b.elements[i].content = b.elements[i].content.replace(oldVal,colorVal);
				}
			}
		}*/
		if(b.elements.length < newCurrentPageElements.length){
			console.log("controller 和 scene数据传递出错");
			b.elements = newCurrentPageElements;
		}
		var c = "index.php?c=scene&a=savepage";
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			},
			data: JSON.stringify(b)
		})
	}, sceneService.deletePage = function(b) {//删除页面
		var c = "index.php?c=scene&a=delPage&id=" + b;
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}/*, sceneService.getBgImages = function(b) {
		var c = "m/scene/gallery/" + b,
			d = new Date;
		return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	};*/

	sceneService.createCustomComp = createCustomComp;
	sceneService.openAudioModal = elementOfMusic;
	sceneService.openBgModal = elementOfBackground;

	sceneService.getElements = function() {
		return newCurrentPageElements
	}, sceneService.getElementsMap = function() {
		return currentPageIdListData
	};

	sceneService.deleteElement = deleteElements;

	sceneService.getSceneObj = function() {
		return currentPageData
	}/*, sceneService.getTpls = function(b, c, d, e) {
		var f = "m/scene/listTpl";
		null != b && (f += (/\?/.test(f) ? "&" : "?") + "sceneType=" + b), f += (/\?/.test(f) ? "&" : "?") + "pageNo=" + (c ? c : 1), f += (/\?/.test(f) ? "&" : "?") + "pageSize=" + (d ? d : 12), e && (f += (/\?/.test(f) ? "&" : "?") + "orderBy=" + e);
		var g = new Date;
		return f += (/\?/.test(f) ? "&" : "?") + "time=" + g.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + f
		})
	}, */sceneService.getCompanyTpls = function(b, c) {
		var d = "/m/scene/tpl/company/list?pageNo=" + b + "&pageSize=" + c;
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		})
	}, sceneService.createCompanyTpls = function(b) {
		var c = "/m/scene/tpl/company/set?id=" + b;
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c
		})
	}, sceneService.clearCompanyTpls = function(b) {
		var c = "/m/scene/tpl/company/unset?id=" + b;
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c
		})
	}, sceneService.getPageTpls = function(c, d, e, f, g, h, i, j, k) {//获取模板
		var l = "index.php?c=scene&a=syslist",
			m = new Date;
		l += (/\?/.test(l) ? "&" : "?") + "time=" + m.getTime();
		var n = {
			tplType: 1,
			bizType: d,
			tagId: e,
			order: h,
			freeTplSetting: i,
			name: j,
			createUser: k,
			pageNo: f ? f : 1,
			pageSize: g ? g : 12
		};
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + l,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(n)
		}).then(function(a) {
			200 == a.data.code && (sceneService.scenes = a.data, b.$broadcast("getSampleList", a.data))
		})
	}, sceneService.getPageTplTypesTwo = function(b, c) {//模板中心类型筛选
		var d = "index.php?c=upfile&a=systag&type=2&bizType=" + c,
			e = new Date;
		return d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		})
	}, sceneService.saveMyTpl = function(b) {//保存为我的模板
		var c = "index.php?c=user&a=saveMyTpl";
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			},
			data: JSON.stringify(b)
		})
	}, sceneService.saveCompanyTpl = function(b) {//保存为企业模板
		var c = "index.php?c=company&a=saveMyTpl";
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			},
			data: JSON.stringify(b)
		})
	}, sceneService.previewScene = function(b) {//短页面获取我的模板 || 企业模板
		var c = "index.php?c=user&a=getMyTpl&id=" + b,
			e = new Date;
		c += (/\?/.test(c) ? "&" : "?") + "time=" + e.getTime();
		var g = d.defer();
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		}).then(function(a) {
			for (var b = f.get("tplCache") ? f.get("tplCache") : f("tplCache"), c = 0; c < a.data.list.length; c++) {
				var d = {
					data: {
						obj: {
							elements: a.data.list[c].elements,
							scene: a.data.obj
						}
					}
				};
				b.put(a.data.list[c].id, $.extend(!0, {}, d))
			}
			g.resolve(a)
		}), g.promise
	}, sceneService.previewSceneLongpage = function(b,type,id,name,pageSize,pageNo) {//长图文：背景库/图片库/模板库
		var c = type ?  "index.php?c=upfile&a=userList&pageNo="+(pageNo ? pageNo : 1)+"&pageSize=21&fileType="+(type == 3 ? 0 : 1) : "index.php?c=user&a=getMyTpl&id=" + b + "&islong=1",
			e = new Date;
		c += (/\?/.test(c) ? "&" : "?") + "time=" + e.getTime();
		var g = d.defer();
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		}).then(function(a) {
			for (var b = f.get("tplCache") ? f.get("tplCache") : f("tplCache"), c = 0; c < a.data.list.length; c++) {
				var d = {
					data: {
						obj: {
							elements: a.data.list[c].elements,
							scene: a.data.obj
						}
					}
				};
				b.put(a.data.list[c].id, $.extend(!0, {}, d))
			}
			g.resolve(a)
		}), g.promise
	}, sceneService.transferScene = function(b, c) {//转送
		var d = PREFIX_URL + "index.php?c=scene&a=transfer";
		return d += "&loginName=" + c, d += "&id=" + b, d += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: d
		})
	}, /*sceneService.getActivities = function() {
		var b = PREFIX_S1_URL + "index.php?c=eqs&a=activity&all=1";
		return a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, */sceneService.getSceneTemplatePrices = function() {
		var b = PREFIX_URL + "index.php?c=statics&a=scene_template_prices";
		return a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, sceneService.soundLink = function(b, c) {
		var d = "index.php?c=upfile&a=savewl&url=" + b + "&fileType=" + c,
			e = new Date;
		return d += "&time=" + e.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		})
	};

	sceneService.getElementData = makeUpElementData;
	sceneService.addImg = elementOfPicture;
	sceneService.addBg = elementOfBackground;

	return sceneService;
}]);
		