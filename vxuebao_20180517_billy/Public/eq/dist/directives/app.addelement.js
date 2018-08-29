angular.module("app.directives.addelement", []).directive("addElement", ["$compile", function($compile) {
		return {
			restrict: "EA",
			link: function(scope, element, attrs) {
				var e = $("#emailAddress"),
					f = $("#emailAddress").size() + 1;
				element.bind("click", function() {
					var newEle = angular.element('<div><input type="text" id="p_scnt" style="width:100%; height: 30px; margin-top: 15px;" ng-model="attrs.addElement" name="p_scnt_' + f + '" placeholder="Input Value" /></div>');
					e.append(newEle);
					var input = newEle.find("input");
					$compile(input)(scope), f++
				})
			}
		}
	}]).directive("showIcon", ["$compile", "$translate", function($compile, $translate) {
		return {
			restrict: "EA",
			require: "ngModel",
			scope: {
				check: "&callbackFn"
			},
			link: function(scope, element, attrs, controller) {
				var g, h, ele = $compile('<a><span class = "glyphicon glyphicon-ok-circle" ng-show="enabled" style = "margin-top: 8px; color: #9ad64b; font-size: 15px;"></span></a>')(scope);
				scope.update = function() {
					element[0].blur(), scope.check({
						arg1: {
							name: controller.$name
						}
					})
				}, element.bind("focus", function() {
					g = controller.$viewValue;
					element.parent().after(ele);
					scope.enabled = !0;
					("email" === attrs.name || "mobile" === attrs.name || "tel" === attrs.name) && (scope.enabled = !1);
					scope.$apply();
				}).bind("blur", function() {
					scope.enabled = !1;
					h = controller.$viewValue;
					var reg = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
					if ("mobile" === attrs.name && h && !reg.test(d.val())) {
						alert($translate.instant("common.PHONE_ERROR"));
						$('input[name="mobile"]').addClass("error");
						return void $('input[name="mobile"]').change(function() {
							$(this).removeClass("error");
						});
					}
					if ("email" === attrs.name && h) {
						var reg2 = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
						if (!reg2.test(element.val())){ 
							return alert("邮箱格式错误！"); 
							$('input[name="email"]').addClass("error");
							void $('input[name="email"]').change(function() {
								$(this).removeClass("error");
							})
						}
					}
					(h || g) && g !== h && scope.update(); 
					scope.$apply();
				})
			}
		}
	}]).directive("ngHover", function() {
		return {
			restrict: "EA",
			scope: {
				resource: "="
			},
			link: function(a, b, c) {
				b.hover(function() {
					a.$apply(function() {
						a.resource.show = !0
					})
				}, function() {
					a.$apply(function() {
						a.resource.show = !1
					})
				})
			}
		}
	}).directive("imgClick", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).bind("click", function() {
					$(b).find("img").css("border", "4px solid #F60"), $(b).siblings().find("img").css("border", 0)
				})
			}
		}
	}).directive("customFocus", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).siblings().bind("click", function() {
					b[0].focus()
				})
			}
		}
	}).directive("blurChildren", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).on("click", function(a) {
					(a.target == b[0] || $(a.target).hasClass("badge")) && $(".blurClass").find("input:visible").blur()
				})
			}
		}
	}).directive("forbiddenClose", function() {
		return {
			restrict: "EAC",
			link: function(a, b, c) {
				$(b).on("click", function(a) {
					a.stopPropagation()
				})
			}
		}
	}).directive("customeImage", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).hover(function() {
					$("<div><a></a></div>")
				}, function() {})
			}
		}
	}).directive("slides", ["configService", function(a) {
		return {
			restrict: "EA",
			link: function(b, c, d) {
				var e = $(c).find(".slides_container");
				a.getBanners().then(function(a) {
					for (var b = a.data.split(","), d = 0; d < b.length; d++) {
						var f = [];
						f.push(b[d].split("|"));
						for (var g = 0; g < f.length; g++) e.append('<img src="' + f[g][0] + '" usemap="#active' + d + '" width="1000px" height="720px" alt="Slide 1">'), f[g][1] && e.after('<map name="active' + d + '" id="active' + d + '"><area shape="rect" coords="0,0,1000,720" target="_blank" href ="' + f[g][1] + '" /></map>')
					}
					$(c).slides({
						preload: !0,
						play: 5e3,
						pause: 2500,
						hoverPause: !0
					})
				}, function() {
					e.append('<img src="' + CLIENT_CDN + 'assets/images/3.jpg" width="1000px" height="720px" alt="Slide 1">'), e.append('<img src="' + CLIENT_CDN + 'assets/images/2.jpg" width="1000px" height="720px" alt="Slide 1">'), e.append('<img src="' + CLIENT_CDN + 'assets/images/1a.jpg" width="1000px" height="720px" alt="Slide 1">'), $(c).slides({
						preload: !0,
						play: 5e3,
						pause: 2500,
						hoverPause: !0
					})
				})
			}
		}
	}]).directive("slides3", ["configSerService", function(a) {
		return {
			restrict: "EA",
			link: function(b, c, d) {
				var e = $(c).find(".slides_container");
				a.getActivityBanner(d.id).then(function(a) {
					for (var b = a.data.list, f = 0; f < b.length; f++) {
						var g = $('<a href="' + b[f].url + '" style="display:block;" target="' + b[f].target + '" ></a>');
						g.append('<img src="' + b[f].path + '" width="' + d.width + '" height="' + d.height + '" alt="' + b[f].title + '" title="' + b[f].title + '" > '), e.append(g)
					}
					$(c).slides({
						preload: !0,
						play: 5e3,
						pause: 2500,
						hoverPause: !0
					})
				})
			}
		}
	}]).directive("addClass", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).closest(".textbox-wrap").find("[autofocus]").focus(), $(b).on("blur", function() {
					$(b).closest(".textbox-wrap").removeClass("focused")
				}).on("focus", function() {
					$(b).closest(".textbox-wrap").addClass("focused")
				})
			}
		}
	}).directive("loadScript", ["$http", "$timeout", "$rootScope", function(a, b, c) {
		return {
			link: function(b, c, d) {
				var e = function() {
						b.captchaLoaded = !0
					};
				b.$watch(function() {
					return c[0].getAttribute("src")
				}, function(b, d) {
					b && a.jsonp(c[0].getAttribute("src")).success(e).error(e)
				})/*, b.$on("$destroy", function() {
					angular.element(".gt_widget").remove()
				})*/
			}
		}
	}]);