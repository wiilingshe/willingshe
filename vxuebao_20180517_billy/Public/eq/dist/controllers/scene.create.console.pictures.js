angular.module("scene.create.console.pictures", ["services.file"]).controller("picturesCtrl", ["$scope", "$timeout", "$rootScope", "$modal", "picturesService", "obj", function(a, b, c, d, e, f) {
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
}]);