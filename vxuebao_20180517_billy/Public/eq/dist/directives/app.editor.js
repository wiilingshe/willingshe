angular.module("app.directives.editor", []).directive("toolbar", ["$compile", "sceneService", function(a, b) {
	function c(c, e, f) {
		var g = b.currentElemDef;
		if("x" == g.type){
			c.showCustomFamilyFont = !0;
			c.showLinkOption = !1;
			d(c);
		}else{
			c.showCustomFamilyFont = !1;
			c.showLinkOption = !0;
		}

		e.bind("keydown", function(a) {
			a.stopPropagation();
		});
		c.internalLinks = angular.copy(c.pages); //link
		c.internalLink || c.externalLink || (c.internalLink = c.internalLinks[0], c.externalLink = "http://");//link
		try {
			c.fontColor = $(g.content).css("color"), c.backgroundColor = $(g.content).css("background-color")
		} catch (h) {}
		var i = ["#000000", "#7e2412", "#ff5400", "#225801", "#0c529e", "#333333", "#b61b52", "#f4711f", "#3bbc1e", "#23a3d3", "#888888", "#d34141", "#f7951e", "#29b16a", "#97daf3", "#cccccc", "#ec7c7c", "#fdea02", "#79c450", "#563679", "#ffffff", "#ffcccc", "#d9ef7f", "#c3f649"],
			j = $(".color-menu"),
			k = $(".bgcolor-menu");
		$.each(i, function(a, b) {
			j.append($('<li><a dropdown-toggle class="btn" data-edit="foreColor ' + b + '" style="background-color: ' + b + '"></a></li>'))
		}), a(j.append($('<li style="position: relative;"><a ng-model="fontColor" ng-click="setSelection()" colorpicker-Position="sceneToobar" class="btn glyphicon glyphicon-remove" colorpicker="rgba" style="background-color: transparent"></a><em style="background-color:#ff5448;position:absolute;height:10px;width:10px;top:0;left:0;z-index:-1"></em><em style="background-color:#f2a653;position:absolute;height:10px;width:10px;top:0;left:10px;z-index:-1"></em><em style="background-color:#08a1ef;position:absolute;height:10px;width:10px;top:10px;left:0;z-index:-1"></em><em style="background-color:#44cb83;position:absolute;height:10px;width:10px;top:10px;left:10px;z-index:-1"></em></li>')))(c), 
		c.$watch("fontColor", function(a, b) {//color
			a && a != b && document.execCommand("foreColor", 0, a)
		});
		var l = function(a) {//color
				var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
				a = a.replace(b, function(a, b, c, d) {
					return b + b + c + c + d + d
				});
				var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
				return c ? {
					r: parseInt(c[1], 16),
					g: parseInt(c[2], 16),
					b: parseInt(c[3], 16)
				} : null
			};
		$.each(i, function(a, b) {
			var c = l(b);
			k.append($('<li><a dropdown-toggle class="btn" data-edit="backColor rgba(' + c.r + "," + c.g + "," + c.b + ', 0.3)" style="background-color: rgba(' + c.r + "," + c.g + "," + c.b + ', 0.3)"></a></li>'))
		});
		a(k.append($('<li style="position: relative;"><a ng-model="backgroundColor" ng-click="setSelection()" colorpicker="rgba" colorpicker-Position="sceneToobar" class="btn glyphicon glyphicon-remove" style="background-color: transparent"></a><em style="background-color:#ff5448;position:absolute;height:10px;width:10px;top:0;left:0;z-index:-1"></em><em style="background-color:#f2a653;position:absolute;height:10px;width:10px;top:0;left:10px;z-index:-1"></em><em style="background-color:#08a1ef;position:absolute;height:10px;width:10px;top:10px;left:0;z-index:-1"></em><em style="background-color:#44cb83;position:absolute;height:10px;width:10px;top:10px;left:10px;z-index:-1"></em></li>')))(c), 
		c.$watch("backgroundColor", function(a) {
			a && document.execCommand("backColor", 0, a);
		});
		c.setSelection = function() {
			var a = window.getSelection();
			a.getRangeAt && a.rangeCount && a.getRangeAt(0);
			a.modify("move", "left", "documentboundary");
			a.modify("extend", "right", "documentboundary");
		};
		g.css.lineHeight = (parseFloat(g.css.lineHeight) || 1).toFixed(1);

		c.increaseLineHeight = function() {
			var a = window.getSelection(),
				b = a.focusNode,
				c = $(b).parents(".element-box");
			g.css.lineHeight = (parseFloat(g.css.lineHeight) + .1).toFixed(1);
			c.css("line-height", g.css.lineHeight);
			$(b.parentNode).focus();
		};
		c.decreaseLineHeight = function() {
			var a = window.getSelection(),
				b = a.focusNode,
				c = $(b).parents(".element-box");
			g.css.lineHeight > .1 && (g.css.lineHeight = (parseFloat(g.css.lineHeight) - .1).toFixed(1), c.css("line-height", g.css.lineHeight));
			$(b.parentNode).focus();
		}
	}
	function d(a) {//多字体
		var b = utilFont.getFontName(),
			c = $(".fontname-menu");
		$.each(b, function(a, b) {
			c.append($('<li class="' + a + '"><a dropdown-toggle class="btn" data-edit="fontName ' + a + '"><img src="' + CLIENT_CDN + b.blueSrc + '"/></a></li>'));
			$("." + a).hover(function() {
				$(this).find("img").attr("src", CLIENT_CDN + b.src)
			}, function() {
				$(this).hasClass("selected-font") || $(this).find("img").attr("src", CLIENT_CDN + b.blueSrc)
			})
		})
	}
	return {
		restrict: "EA",
		replace: !0,
		templateUrl: "/Public/eq/6.0/templates/directives.toolbar.tpl.html",
		link: c
	}
}]);