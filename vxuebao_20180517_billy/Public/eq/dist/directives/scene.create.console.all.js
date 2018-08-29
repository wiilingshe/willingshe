angular.module("scene.create.console.imageCrop").directive("eqxCropPreview", ["imageCropService", "dataCacheService", function(a, b) {
	function c(a, c) {
		d(a, c), a.$on("$destroy", function() {
			m = !1
		}), a.$on("cropItem.change", function(a, b) {
			f(b)
		}), a.$on("cropImage.ok", function(d, e) {
			m || (l = e, b.clear("fileService"), g(a, c))
		}), a.$on("crop.success", function(b, c) {
			4 == l.type && h(c), a.$close(c)
		})
	}
	function d(a, b) {
		b.hide().load(function() {
			b.show();
			var c = $(".image_crop"),
				d = {
					width: c.width(),
					height: c.height()
				},
				f = d.width / d.height;
			j = {
				width: this.width,
				height: this.height
			};
			var g, h = j.width / j.height;
			j.width > d.width || j.height > d.height ? h > f ? (b.css({
				width: d.width,
				height: d.width / h
			}), g = {
				position: "absolute",
				top: "50%",
				marginTop: -d.width / h / 2
			}) : (b.css({
				width: d.height * h,
				height: d.height
			}), g = {
				margin: "auto"
			}) : g = {
				position: "absolute",
				left: "50%",
				top: "50%",
				marginLeft: -j.width / 2,
				marginTop: -j.height / 2
			}, k = {
				width: b.width(),
				height: b.height()
			}, e(a, b, g)
		})
	}
	function e(a, b, c) {
		var d = b.parent().attr("ctype"),
			e = k.width,
			f = k.height;
		if (3 == d || "square" == d) {
			var g = a.$parent.cropOption.currentItem;
			e > f ? e = f * g.ratio : f = e / g.ratio, b.Jcrop({
				keySupport: !1,
				aspectRatio: g.ratio,
				allowSelect: !1,
				setSelect: [0, 0, e, f],
				onRelease: function() {
					this.setOptions({
						setSelect: [0, 0, e, f]
					})
				}
			}, function() {
				i = this
			})
		} else b.Jcrop({
			keySupport: !1,
			aspectRatio: e / f,
			allowSelect: !1,
			setSelect: [0, 0, e, f],
			onRelease: function() {
				this.setOptions({
					setSelect: [0, 0, e, f]
				})
			}
		}, function() {
			i = this
		});
		$(".jcrop-holder").css(c)
	}
	function f(a) {
		var b, c = k.width,
			d = k.height;
		if (-1 === a.ratio) {
			var e = i.tellSelect();
			b = a.lock ? {
				aspectRatio: e.w / e.h,
				setSelect: [0, 0, e.w, e.h]
			} : {
				aspectRatio: 0,
				setSelect: [0, 0, e.w, e.h]
			}
		} else 0 === a.ratio ? b = {
			aspectRatio: c / d,
			setSelect: [0, 0, c, d]
		} : (c > d ? c = d * a.ratio : d = c / a.ratio, b = {
			aspectRatio: c / d,
			setSelect: [0, 0, c, d]
		});
		i.setOptions(b)
	}
	function g(b, c) {
		var d = i.tellSelect();
		if (d.w === k.width && d.h === k.height || 0 === d.w && 0 === d.h) {
			if (!l) return;
			return void b.$dismiss(l.properties.src)
		}
		m = !0;
		var e = j.width / k.width;
		d.w = parseInt(d.w * e, 10), d.h = parseInt(d.h * e, 10), d.x = parseInt(d.x * e, 10), d.y = parseInt(d.y * e, 10), d.src = c.attr("src").split(PREFIX_FILE_HOST)[1], d.x + d.w > j.width && (d.w = j.width - d.x), d.y + d.h > j.height && (d.h = j.height - d.y), 3 == l.type ? d.fileType = 0 : d.fileType = 1, delete d.x2, delete d.y2, l.cw && (d.cw = l.cw), a.cropImage(d)
	}
	function h(a) {
		var b = l;
		b.properties.src = a.src;
		var c = a.width / a.height,
			d = $("#" + b.id),
			e = $("#inside_" + b.id),
			f = e.width(),
			g = e.height(),
			h = f / g;
		c >= h ? (g = f / c, e.height(g), b.css.height = g, b.properties.height = g, d.outerHeight(g), d.outerWidth(f), d.css("marginLeft", 0), d.css("marginTop", 0)) : (f = g * c, e.width(f), b.css.width = f, b.properties.width = f, d.outerWidth(f), d.outerHeight(g), d.css("marginTop", 0), d.css("marginLeft", 0)), d.attr("src", PREFIX_FILE_HOST + a.src), b.properties.imgStyle = {}, b.properties.imgStyle.width = d.outerWidth(), b.properties.imgStyle.height = d.outerHeight(), b.properties.imgStyle.marginTop = d.css("marginTop"), b.properties.imgStyle.marginLeft = d.css("marginLeft")
	}
	var i, j, k, l, m = !1;
	return {
		link: c
	}
}]);
angular.module("scene.create.console.link",["services.scene","common.directives.dropDown","ui.bootstrap"]).directive("limitLinkLength", ["ModalService", function(a) {
	var b = 40;
	return {
		restrict: "A",
		require: "?ngModel",
		link: function(c, d, e, f) {
			d.blur(function() {
				var c = d.val() || "";
				c.length > b && a.openMsgDialog({
					msg: '<div align="left">提示：链接过长有可能会导致链接组件打不开，建议生成短链接后再使用。生成短链接地址<a href="http://dwz.cn" target="_blank"><font color="#08A1EF">http://dwz.cn</font></a></div>'
				}, function() {})
			})
		}
	}
}]);
angular.module("scene.create.console.pictures1").directive("eqxPicturesCropPreview", ["picturesCropService", function(a) {
function b(b, d) {
	var e = a.getCoordinateObj();
	c(d, e), b.$on("$destroy", function() {
		i = j = k = null, a.initCoordinateObj(), a.setCropping(!1)
	}), b.$on("cropItem.change", function(a, b) {
		g(b)
	}), b.$on("image.delete", function() {
		$(".image_crop").children("div").remove()
	}), b.$on("cropImage.ok", function(a, c) {
		h(b, c, e)
	})
}
function c(a, b) {
	var c = $(".image_crop"),
		e = {
			width: c.width(),
			height: c.height()
		},
		f = e.width / e.height;
	a.hide().load(function() {
		var c = {
			width: this.width,
			height: this.height
		};
		a.removeAttr("style").show();
		var g, h = c.width / c.height;
		c.width > e.width || c.height > e.height ? h > f ? (a.css({
			width: e.width,
			height: e.width / h
		}), g = {
			position: "absolute",
			top: "50%",
			marginTop: -e.width / h / 2
		}) : (a.css({
			width: e.height * h,
			height: e.height
		}), g = {
			margin: "auto"
		}) : g = {
			position: "absolute",
			left: "50%",
			top: "50%",
			marginLeft: -c.width / 2,
			marginTop: -c.height / 2
		}, j = {
			width: a.width(),
			height: a.height()
		};
		var i = a.attr("index");
		a.attr("src");
		$.extend(b.items[i], {
			displaySize: j
		}), d(a, b, g, i)
	})
}
function d(a, b, c, d) {
	i && (i.destroy(), i = null);
	var f = j.width,
		g = j.height,
		h = b.items[d].coordinate;
	h && (h.w > f && (h.w = f, h.h = f / b.ratio), h.h > g && (h.h = g, h.w = g * b.ratio), h.x2 = h.x + h.w, h.y2 = h.y + h.h);
	var l;
	l = k && -1 === k.ratio ? 0 : b.ratio || f / g, a.Jcrop({
			keySupport: !1,
			aspectRatio: l,
			allowSelect: !1,
			setSelect: h ? [h.x, h.y, h.x2, h.y2] : [0, 0, f, g],
			onRelease: function() {
				this.setOptions({
					setSelect: [0, 0, f, g]
				})
			},
			onSelect: function() {
				i && e(d, b)
			}
		}, function() {
			i = this, e(d, b)
		}), $(".jcrop-holder").css(c)
	}
	function e(a, b) {
		var c = i.tellSelect();
		b.ratio = c.w / c.h, $.extend(b.items[a].coordinate, c), $.each(b.items, function(a, c) {
			var d = c.coordinate;
			d && f(d, b)
		})
	}
	function f(a, b) {
		var c = a.w / a.h;
		c > b.ratio ? (a.w = a.h * b.ratio, a.x2 = a.x + a.w) : (a.h = a.w / b.ratio, a.y2 = a.y + a.h)
	}
	function g(a) {
		k = a;
		var b, c = j.width,
			d = j.height;
		if (-1 === a.ratio) {
			var e = i.tellSelect();
			b = a.lock ? {
				aspectRatio: e.w / e.h,
				setSelect: [0, 0, e.w, e.h]
			} : {
				aspectRatio: 0,
				setSelect: [0, 0, e.w, e.h]
			}
		} else c > d ? c = d * a.ratio : d = c / a.ratio, b = {
			aspectRatio: c / d,
			setSelect: [0, 0, c, d]
		};
		i.setOptions(b)
	}
	function h(b, c, d) {
		var e = [];
		$.each(d.items, function(b, c) {
			var g = c.coordinate,
				h = c.realSize;
			if (g && h) if (f(g, d), Math.ceil(h.width / h.height * 100) !== Math.ceil(g.w / g.h * 100)) {
				if (c.displaySize) {
					var i = h.width / c.displaySize.width;
					g.w = Math.ceil(g.w * i), g.h = Math.ceil(g.h * i), g.x = Math.ceil(g.x * i), g.y = Math.ceil(g.y * i)
				} else {
					var j = g.w / g.h,
						k = h.width / h.height;
					k > j ? (g.w = Math.ceil(h.height * j), g.h = h.height) : (g.w = h.width, g.h = Math.ceil(h.width / j))
				}
				g.x + g.w > c.realSize.width && (g.w = h.width - g.x), g.y + g.h > c.realSize.height && (g.h = h.height - g.y), g.w === h.width && g.h === h.height || 0 === g.w || 0 === g.h ? e.push({
					src: g.src,
					desc: "",
					height: g.h,
					width: g.w
				}) : (delete g.x2, delete g.y2, a.setCropping(!0), a.cropImage(g), a.setCropCount())
			} else e.push({
				src: g.src,
				desc: "",
				height: g.h,
				width: g.w
			})
		}), 0 === a.getCropCount() && (c.picStyle = c.picStyle.value, c.children = e, b.setPicturesSize(c), b.$close(c))
	}
	var i, j, k;
	return {
		link: b
	}
}]);
angular.module("scene.create.console.radio.checkbox", []), angular.module("scene.create.console.radio.checkbox").directive("stopPropagation", function() {
	return function(a, b) {
		b.bind("keydown", function(a) {
			a.stopPropagation()
		})
	}
});
angular.module("scene.create.console.scene-setting-component").directive("sceneSettingComponent", [function() {
		return {
			scope: !0,
			controller: "SceneSettingComponentController",
			templateUrl: BASE_URL+"templates/scene.console.setting.component.tpl.html",
			link: function(a, b, c) {
				setTimeout(function() {
					b.find(".scene-setting-info.fade").addClass("in")
				})
			}
		}
	}]);
/*angular.module("scene.create.console.setting", ["scene.create.console.setting.style", "scene.create.console.setting.anim", "scene.create.console.setting.trigger"]), angular.module("scene.create.console.setting").directive("styleModal", ["sceneService", "$compile", function(a, b) {
	return {
		restrict: "AE",
		replace: !0,
		scope: {},
		templateUrl: BASE_URL + "templates/scene.console.setting.tpl.html",
		link: function(a, b, c) {
			b.bind("keydown", function(a) {
				a.stopPropagation()
			});
			var d = "style";
			a.$on("showStylePanel", function(b, c) {
				d = a.activeTab, a.activeTab = "", a.$apply(), c && c.activeTab ? a.activeTab = c.activeTab : a.activeTab = d, a.$apply()
			}), a.activeTab = c.activeTab, a.cancel = function() {
				$(b).hide()
			}, a.$on("close.style.panel", function(a) {
				b.hide(), $(".edit_area").find(".boom, .boom1").remove()
			}), a.$on("$locationChangeStart", function() {
				a.cancel()
			})
		},
		controller: ["$scope", function(a) {}]
	}
}]);*/
angular.module("scene.create.console.shape").directive("renderShapeElement", ["shapeService", "$compile", function(a, b) {
	function c(c, d, e) {
		function f(d) {
			var e, f, i;
			$(".svg-panel ul").empty();
			for (var j = 0; j < d.length; j++) {
				
				var k = $('<li class="svg-element" ng-click="selectSvg(' + j + ')"></li>');
				b(k)(c);
				k.appendTo(".svg-panel ul");
				if (d[j].type.indexOf("symbol") < 0) {
					f = document.createElementNS(eqxiuSvg.NAMESPACE, "svg");
					f.setAttribute("style", "position:absolute;left: 50%;margin-left:-32px;top:50%;margin-top:-32px;");
					f.setAttribute("xmlns", eqxiuSvg.NAMESPACE);
					f.setAttribute("version", "1.1");
					f.setAttribute("width", g);
					f.setAttribute("height", h);
					f.setAttribute("preserveAspectRatio", "xMidYMid");
					i = eqxiuSvg.ShapeFromType(d[j].type);
					i.setAttribute("fill", "#E2E2E2");
					f.appendChild(i);
					k.append(f);
					s = eqxiuSvg.boundingBox(i);
					e = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" ");
					f.setAttribute("viewBox", e);
				}else {
					i = eqxiuSvg.ShapeFromType(d[j].type, null, null, j);
					f = '<svg class="svgElement" xmlns="' + eqxiuSvg.NAMESPACE + '" version="1.1" width="' + g + '" height="' + h + '" preserveAspectRatio="none">' + i + "</svg>";
					k.get(0).innerHTML = f;
					s = eqxiuSvg.boundingBox($("#path_" + j).get(0));
					e = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" ");
					var l = k.find(".svgElement");
					l.get(0).setAttribute("viewBox", e), l.attr({
						style: "position:absolute;left: 50%;margin-left:-32px;top:50%;margin-top:-32px;"
					})
				}
				a.shapeList[j].viewBox = e;
				$(k).on("mouseover", function(event){
					$($($(event.target).find("svg")[0]).children()[0]).attr("fill", "");
					$($($(event.target).find("svg")[0]).children()[0]).attr("fill", "#66cc00");
				});
				$(k).on("mouseleave", function(event){
					$($($(event.target).find("svg")[0]).children()[0]).attr("fill", "");
					$($($(event.target).find("svg")[0]).children()[0]).attr("fill", "#E2E2E2");
				});
			}
		}
		var g = (a.svgList, 64),
			h = 64;
		c.$on("render.shape.page", function(a, b) {
			f(b);
		})
	}
	return {
		restrict: "EA",
		link: c
	}
}]);
angular.module("scene.create.console.sound").directive("eqxAudio", function() {
	function a(a, c) {
		var d = {};
		c.bind("pause", function() {
			c.attr("src") && a.$apply(function() {
				d.isPlaying = !1
			})
		}).bind("play", function() {
			c.attr("src") && a.$apply(function() {
				d.isPlaying = !0
			})
		});
		var e = c.get(0);
		a.$on("sound.play", function(a, c) {
			b(d, c, e), d = c
		})
	}
	function b(a, b, c) {
		var d, e = {};
		e.src = b.src || b.url, d = 0 === e.src.indexOf("http://") ? e.src : PREFIX_FILE_HOST + e.src;
		var f = d.substr(d.lastIndexOf("/") + 1),
			g = c.src.substr(d.lastIndexOf("/") + 1);
		null == a.id ? f == g && b.isPlaying ? c.pause() : f != g || b.isPlaying ? (c.src = d, c.play(), a.isPlaying = !1, b.isPlaying = !0) : c.play() : a.id == b.id && b.isPlaying ? c.pause() : a.id != b.id || b.isPlaying ? (c.src = d, c.play(), a.isPlaying = !1, b.isPlaying = !0) : c.play()
	}
	return {
		link: a
	}
});