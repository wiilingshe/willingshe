!function() {
	if("function" == typeof define && define.amd)
        require(["html2canvas"], function(html2canvas){
        	callback(html2canvas);
        });
    else {
    	callback();
    }
    
    function callback(html2canvas){
        	window.html2canvas = html2canvas;//截图插件全局定义
    	function a(a, b, c, d, e, f, g, h, i) {
			function j(a, c) {
				function d() {
					l(n)
				}
				a.$on("element.delete", function(a) {
					n = f.getElements();
					for (var a = 0, b = n.length; b > a; a++) {
						var c = $("#nr").find("#inside_" + n[a]).attr("ctype");
						if ("5" == c.charAt(0) || "a" == c || "r" == c || "c" == c) return void h.openConfirmDialog({
							msg: "将删除已收集的数据",
							confirmName: "确定",
							cancelName: "取消"
						}, d)
					}
					l(n)
				}), a.$on("element.selectall", function() {
					m()
				}), a.$on("scene.bg.replace", function(c, d, e) {
					var f = $("#nr .edit_area").parent();
					var container = f;
					a.currentBgDef = e;
					var g = $(".wrapper-background").get(0);
					var height = sessionStorage.getItem("pageid") == sessionStorage.getItem("longpageID") ? sessionStorage.getItem("longpageHeight") : 486;
					g || (g = document.createElement("div"), $(g).prependTo(container).addClass("wrapper-background").css({
						height: height,
						backgroundSize: "cover",
						backgroundPosition: "50% 50%",
						zIndex: -1
					}).attr("id", e.id));
					if ("imgSrc" == d.type) {
						var h = d.src;
						h.indexOf("/Uploads/") > 0 && (h = h.slice(h.indexOf("/Uploads/")+8));//避免出现绝对路径
						g.style.backgroundImage = "url(" + PREFIX_FILE_HOST + h + ")", 
						e.properties.bgColor = null, 
						e.properties.imgSrc = h, 
						e.properties.id = d.id, 
						b.$broadcast("show.edit.bg", h)
					} else if("backgroundColor" == d.type){
						g.style.backgroundImage = "none";
						g.style.backgroundColor = d.data.color;
						e.properties.imgSrc = null;
						e.properties.bgColor = d.data.color;
						b.$broadcast("show.edit.bg");
					}
				}), a.$on("remove.scene.bg", function(b) {
					$(".wrapper-background").css({
						backgroundColor: "transparent",
						backgroundImage: "none"
					}).removeAttr("id"), a.controlView.showBgTag = !1
				}), a.$on("delete.random.elem", function(a, b) {
					"n" == o[b].type && ($("#nr").find("#inside_" + b).remove(), e.deleteElement(b))
				}), a.$on("convert.html.canvas", function(a, b, c) {}), a.$on("select.less.id", function(b, c) {
					o[c] && k(a, o[c], $("#nr #" + c).get(0))
				}), a.$on("select.less", function(b, c) {
					c && c.length && $.each(c, function(b, c) {
						o[c] && k(a, o[c], $("#nr #" + c).get(0))
					})
				})
			}
			function k(b, c, d,html2canvas) {
				html2canvas = html2canvas || window.html2canvas;
			    if(typeof html2canvas == "function"){
			    	if ("x" == c.type) {
						var defer = a.defer();
						b.completeHtml2Canvas = defer.promise;
						var f = $(d).closest("li").clone();
						f.appendTo("#nr .edit_area").css({
							position: "absolute",
							zIndex: 2,
							opacity: 0,
							transform: ""
						}), setTimeout(function() {
							var a = f.find(".element-box").get(0),
								d = f.width(),
								g = f.height();
							$(a).attr("style", "").css({
								color: c.css.color,
								width: d + "px",
								height: g + "px"
							}), f.css({
								transform: ""
							}), html2canvas(a, {
								width: d,
								height: g,
								onrendered: function(a) {
									f.remove();
									var d = a.toDataURL();
									/*c.properties.dataUrl = d, */defer.resolve(), b.completeHtml2Canvas = null
								}
							})
						}, 0)
					}
			    }
			}
			function make(html2canvas){
				html2canvas = html2canvas || window.html2canvas;
				//var defer = a.defer();
				//var promise = defer.promise;
				setTimeout(function() {
					var con = $(".edit_areaBox")
					html2canvas(con, {
						width: 320,
						height: 625,
						onrendered: function(canvas) {
							/*var url = "http://www.vxuebao.com/Uploads/syspic/image/20161115/15030397008.png";*/
							var url = canvas.toDataURL();
							b.$broadcast("make.shortPic.complete", url);
							//defer.resolve(), promise = null
						}
					})
				}, 0)
			}
			b.$on("make.shortPic", function(){
				make(html2canvas);
			});
			function l(a) {
				var c = e.getSceneObj(),
					d = e.getElementsMap();
				utilTrigger.getHandleType();
				g.addPageHistory(c.obj.id, c.obj.elements), $.each(a, function(a, b) {
					i.resetTrigger(parseInt(b, 10)), 
					$("#nr").find("#inside_" + b).remove(), 
					e.deleteElement(b)
				}), $.each(d, function(a, b) {
					i.clearTrigger(a);
					var c = i.getTrigger(a);
					c ? b.trigger = c : delete b.trigger
				}), g.addPageHistory(c.obj.id, c.obj.elements), f.clearElements(), b.$broadcast("hideStylePanel"), $("#popMenu").hide()
			}
			function m() {
				f.clearElements();
				var a = $("#nr").find("ul").find("li");
				a.children(".bar").show(), a.each(function(a, b) {
					f.addElement($(b).attr("id").split("_")[1])
				})
			}
			var n, o = e.getElementsMap();
			return {
				restrict: "EA",
				link: j
			}
		}
		angular.module("scene.edit.common", ["services.scene", "services.select", "services.history"]).directive("editCommon", ["$q", "$rootScope", "$location", "$translate", "sceneService", "selectService", "historyService", "ModalService", "triggerService", a])
    }
    
	
}();