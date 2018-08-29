var eqxCommon = function() {
	var a = function(a) {
			var b, c, d = a.type;
			0 === d && (b = "fadeIn");
			1 === d && (c = a.direction, 
				0 === c && (b = "fadeInLeft"), 
				1 === c && (b = "fadeInDown"), 
				2 === c && (b = "fadeInRight"), 
				3 === c && (b = "fadeInUp")
			);
			6 === d && (b = "wobble");
			5 === d && (b = "rubberBand");
			7 === d && (b = "rotateIn");
			8 === d && (b = "flip");
			9 === d && (b = "swing");
			2 === d && (c = a.direction, 
				0 === c && (b = "bounceInLeft"), 
				1 === c && (b = "bounceInDown"), 
				2 === c && (b = "bounceInRight"), 
				3 === c && (b = "bounceInUp")
			);
			3 === d && (b = "bounce");
			4 === d && (b = "zoomIn");
			10 === d && (b = "fadeOut");
			11 === d && (b = "flipOutY");
			12 === d && (b = "rollIn");
			13 === d && (b = "lightSpeedIn");
			14 === d && (b = "bounceOut");
			15 === d && (b = "rollOut");
			16 === d && (b = "lightSpeedOut");
			17 === d && (c = a.direction, 
				0 === c && (b = "fadeOutRight"), 
				1 === c && (b = "fadeOutDown"), 
				2 === c && (b = "fadeOutLeft"), 
				3 === c && (b = "fadeOutUp")
			);
			18 === d && (b = "zoomOut");
			19 === d && (c = a.direction, 
				0 === c && (b = "bounceOutRight"), 
				1 === c && (b = "bounceOutDown"), 
				2 === c && (b = "bounceOutLeft"), 
				3 === c && (b = "bounceOutUp")
			);
			20 === d && (b = "flipInY");
			21 === d && (b = "tada");
			22 === d && (b = "jello");
			23 === d && (b = "flash");
			24 === d && (b = "flipInX");
			25 === d && (b = "flipOutX");

			return b
		},
		b = function(a, b, c) {
			function d(a, b, f) {
				if (f.length && e < f.length) {
					a.css("animation", "");
					a.get(0);
					a.css("animation", b[e] + " " + f[e].duration + "s ease " + f[e].delay + "s " + (f[e].countNum ? f[e].countNum : ""));
					if("view" == c){
						f[e].count && e == f.length - 1 && a.css("animation-iteration-count", "infinite");
						a.css("animation-fill-mode", "both");
					}else{
						a.css("animation-iteration-count", "1");
						a.css("animation-fill-mode", "backwards");
					}
					f[e].linear && a.css("animation-timing-function", "linear");
					a.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
						e++;
						d(a, b, f);
					})
				}
			}
			var e = 0;
			if (b.properties && b.properties.anim) {
				var f = [];
				b.properties.anim.length ? f = b.properties.anim : f.push(b.properties.anim);
				var g = $(".element-box", a);
				g.attr("element-anim", "");
				for (var h, i = [], j = [], k = 0, l = f.length; l > k; k++) {
					if(null != f[k].type && -1 != f[k].type){
						h = eqxCommon.convertType(f[k]);
						i.push(h);
						j.push(f[k]);
					}

				}
				if(b.properties.anim.trigger){
					a.click(function() {
						d(g, h, b.properties.anim);
					})
				}else{
					d(g, i, j);
				}
			}
		},
		c = function(a, b) {
			var c = $(a);
			if (b.trigger && b.trigger.receives && b.trigger.receives.length) {
				$.each(b.trigger.receives, function(a, d) {
					if (d.ids.length) {
						var e = utilTrigger.getHandleType(d.type).name;
						("show" == e || "randomEvent" == e) && c.hide(), "hide" == e && c.show(), c.bind(e, function() {
							if ("show" == e) {
								$(this).show();
							}else if ("hide" == e) {
								$(this).hide();
							}else if ("randomEvent" == e) {
								$(this).show();
								var a = Math.floor(Math.random() * b.properties.pics.length);
								$(this).find("img").css({
									display: "none"
								}), $(this).find("img").eq(a).css({
									display: "block"
								})
							}
						})
					}
				})
			}
		},
		d = function() {
			var a, b, c = window.navigator,
				d = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
			if ($.isArray(c.languages)) for (a = 0; a < c.languages.length; a++) if (b = c.languages[a], b && b.length) return b;
			for (a = 0; a < d.length; a++) if (b = c[d[a]], b && b.length) return b;
			return null
		};
	return {
		convertType: a,
		animation: b,
		bindTrigger: c,
		getFirstBrowserLanguage: d
	}
}();