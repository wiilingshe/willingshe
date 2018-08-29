angular.module("common.directives.scroll", []).directive("eqdScroll", function() {
	var a = {
		mouseWheel: !0,
		scrollbars: !0,
		interactiveScrollbars: !0,
		click: !0,
		bounce: !1
	};
	return function(b, c, d) {
		c.css({
			position: "relative",
			"overflow-y": "hidden"
		}), delete a.disableMouse, delete a.preventDefaultException, d.preventException && (a.preventDefaultException = {
			tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV|SPAN|EM|A|LI|B)$/
		}), "true" == d.disableMouse && (a.disableMouse = !0);
		var e, f = new IScroll(c.get(0), a),
			g = b.$watch(function() {
				clearTimeout(e), e = setTimeout(function() {
					f.refresh()
				}, 100)
			});
		d.refresh && (f.on("scrollStart", function() {
			c.children().on("mousewheel", function(a) {
				f.y <= f.maxScrollY + 200 && b.$eval(d.refresh)
			})
		}), f.on("scrollEnd", function() {
			c.children().unbind("mousewheel")
		})), c.on("$destroy", function() {
			f.destroy(), f = null, g(), clearTimeout(e)
		}), b.$on("scroll.refresh." + d.scroll, function() {
			e = setTimeout(function() {
				f.refresh()
			}, 100)
		}), b.$on("scroll.scrollTo", function(a, b, c) {
			f.scrollTo(b, c)
		})
	}});