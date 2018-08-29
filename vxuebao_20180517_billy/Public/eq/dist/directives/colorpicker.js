angular.module("colorpicker.module", []).factory("Helper", function() {
		return {
			closestSlider: function(a) {
				var b = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector;
				return b.bind(a)("I") ? a.parentNode : a
			},
			getOffset: function(a, b) {
				for (var c = 0, d = 0, e = 0, f = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);) c += a.offsetLeft, d += a.offsetTop, b || "BODY" !== a.tagName ? (e += a.scrollLeft, f += a.scrollTop) : (e += document.documentElement.scrollLeft || a.scrollLeft, f += document.documentElement.scrollTop || a.scrollTop), a = a.offsetParent;
				return {
					top: d,
					left: c,
					scrollX: e,
					scrollY: f
				}
			},
			stringParsers: [{
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
				parse: function(a) {
					return [a[1], a[2], a[3], a[4]]
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
				parse: function(a) {
					return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
				}
			}, {
				re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
				parse: function(a) {
					return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
				}
			}, {
				re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
				parse: function(a) {
					return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
				}
			}]
		}
	}).factory("Color", ["Helper", function(a) {
		return {
			value: {
				h: 1,
				s: 1,
				b: 1,
				a: 1
			},
			rgb: function() {
				var a = this.toRGB();
				return "rgb(" + a.r + "," + a.g + "," + a.b + ")"
			},
			rgba: function() {
				var a = this.toRGB();
				return "rgba(" + a.r + "," + a.g + "," + a.b + "," + a.a + ")"
			},
			hex: function() {
				return this.toHex()
			},
			RGBtoHSB: function(a, b, c, d) {
				a /= 255, b /= 255, c /= 255;
				var e, f, g, h;
				return g = Math.max(a, b, c), h = g - Math.min(a, b, c), e = 0 === h ? null : g === a ? (b - c) / h : g === b ? (c - a) / h + 2 : (a - b) / h + 4, e = (e + 360) % 6 * 60 / 360, f = 0 === h ? 0 : h / g, {
					h: e || 1,
					s: f,
					b: g,
					a: d || 1
				}
			},
			setColor: function(b) {
				b = b.toLowerCase();
				for (var c in a.stringParsers) if (a.stringParsers.hasOwnProperty(c)) {
					var d = a.stringParsers[c],
						e = d.re.exec(b),
						f = e && d.parse(e);
					if (f) return this.value = this.RGBtoHSB.apply(null, f), !1
				}
			},
			setHue: function(a) {
				this.value.h = 1 - a
			},
			setSaturation: function(a) {
				this.value.s = a
			},
			setLightness: function(a) {
				this.value.b = 1 - a
			},
			setAlpha: function(a) {
				this.value.a = parseInt(100 * (1 - a), 10) / 100
			},
			toRGB: function(a, b, c, d) {
				a || (a = this.value.h, b = this.value.s, c = this.value.b), a *= 360;
				var e, f, g, h, i;
				return a = a % 360 / 60, i = c * b, h = i * (1 - Math.abs(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], {
					r: Math.round(255 * e),
					g: Math.round(255 * f),
					b: Math.round(255 * g),
					a: d || this.value.a
				}
			},
			toHex: function(a, b, c, d) {
				var e = this.toRGB(a, b, c, d);
				return "#" + (1 << 24 | parseInt(e.r, 10) << 16 | parseInt(e.g, 10) << 8 | parseInt(e.b, 10)).toString(16).substr(1)
			}
		}
	}]).factory("Slider", ["Helper", function(a) {
		var b = {
			maxLeft: 0,
			maxTop: 0,
			callLeft: null,
			callTop: null,
			knob: {
				top: 0,
				left: 0
			}
		},
			c = {};
		return {
			getSlider: function() {
				return b
			},
			getLeftPosition: function(a) {
				return Math.max(0, Math.min(b.maxLeft, b.left + ((a.pageX || c.left) - c.left)))
			},
			getTopPosition: function(a) {
				return Math.max(0, Math.min(b.maxTop, b.top + ((a.pageY || c.top) - c.top)))
			},
			setSlider: function(d, e) {
				var f = a.closestSlider(d.target),
					g = a.getOffset(f, e);
				b.knob = f.children[0].style, b.left = d.pageX - g.left - window.pageXOffset + g.scrollX, b.top = d.pageY - g.top - window.pageYOffset + g.scrollY, c = {
					left: d.pageX,
					top: d.pageY
				}
			},
			setSaturation: function(a, c) {
				b = {
					maxLeft: 100,
					maxTop: 100,
					callLeft: "setSaturation",
					callTop: "setLightness"
				}, this.setSlider(a, c)
			},
			setHue: function(a, c) {
				b = {
					maxLeft: 0,
					maxTop: 100,
					callLeft: !1,
					callTop: "setHue"
				}, this.setSlider(a, c)
			},
			setAlpha: function(a, c) {
				b = {
					maxLeft: 0,
					maxTop: 100,
					callLeft: !1,
					callTop: "setAlpha"
				}, this.setSlider(a, c)
			},
			setKnob: function(a, c) {
				b.knob.top = a + "px", b.knob.left = c + "px"
			}
		}
	}]).directive("colorpicker", ["$document", "$compile", "Color", "Slider", "Helper", function(a, b, c, d, e) {
		return {
			scope: {
				disable: "@"
			},
			require: "?ngModel",
			restrict: "A",
			link: function(f, g, h, i) {
				var j, k = {
					x: parseInt(h.x, 10) || 0,
					y: parseInt(h.y, 10) || 0
				},
					l = h.colorpicker ? h.colorpicker : "hex",
					m = angular.isDefined(h.colorpickerPosition) ? h.colorpickerPosition : "bottom",
					n = angular.isDefined(h.colorpickerInline) ? h.colorpickerInline : !1,
					o = angular.isDefined(h.colorpickerFixedPosition) ? h.colorpickerFixedPosition : !1,
					p = angular.isDefined(h.colorpickerParent) ? g.parent() : angular.element(document.body),
					q = angular.isDefined(h.colorpickerWithInput) ? h.colorpickerWithInput : !1,
					r = q ? '<input type="text" name="colorpicker-input">' : "",
					s = n ? "" : '<button type="button" class="close close-colorpicker">&times;</button>',
					t = '<div class="colorpicker dropdown" ng-click="$event.stopPropagation();"><div class="dropdown-menu"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview>' + r + s + "</div></div>",
					u = angular.element(t),
					v = c,
					w = u.find("colorpicker-hue"),
					x = u.find("colorpicker-saturation"),
					y = u.find("colorpicker-preview"),
					z = u.find("i");
				if (b(u)(f), f.disable && f.$watch("disable", function(a, b) {
					a != b && "false" == a && J()
				}), q) {
					var A = u.find("input");
					A.on("mousedown", function(a) {
						a.stopPropagation()
					}).on("keyup", function(a) {
						var b = this.value;
						g.val(b), i && f.$apply(i.$setViewValue(b)), a.stopPropagation(), a.preventDefault()
					}), g.on("keyup", function() {
						A.val(g.val())
					})
				}
				var B = function() {
						a.on("mousemove", D), a.on("mouseup", E)
					};
				"rgba" === l && (u.addClass("alpha"), j = u.find("colorpicker-alpha"), j.on("click", function(a) {
					d.setAlpha(a, o), D(a)
				}).on("mousedown", function(a) {
					d.setAlpha(a, o), B()
				})), w.on("click", function(a) {
					d.setHue(a, o), D(a)
				}).on("mousedown", function(a) {
					d.setHue(a, o), B()
				}), x.on("click", function(a) {
					d.setSaturation(a, o), D(a)
				}).on("mousedown", function(a) {
					d.setSaturation(a, o), B()
				}), o && u.addClass("colorpicker-fixed-position"), u.addClass("colorpicker-position-" + m), "true" === n && u.addClass("colorpicker-inline"), p.append(u), i && (i.$render = function() {
					g.val(i.$viewValue)
				}, f.$watch(h.ngModel, function() {
					F()
				})), g.on("$destroy", function() {
					u.remove()
				});
				var C = function() {
						try {
							y.css("backgroundColor", v[l]())
						} catch (a) {
							y.css("backgroundColor", v.toHex())
						}
						x.css("backgroundColor", v.toHex(v.value.h, 1, 1, 1)), "rgba" === l && (j.css.backgroundColor = v.toHex())
					},
					D = function(a) {
						var b = d.getLeftPosition(a),
							c = d.getTopPosition(a),
							e = d.getSlider();
						d.setKnob(c, b), e.callLeft && v[e.callLeft].call(v, b / 100), e.callTop && v[e.callTop].call(v, c / 100), C();
						var h = v[l]();
						return g.val(h), i && f.$apply(i.$setViewValue(h)), q && A.val(h), !1
					},
					E = function() {
						a.off("mousemove", D), a.off("mouseup", E)
					},
					F = function() {
						v.setColor(g.val()), z.eq(0).css({
							left: 100 * v.value.s + "px",
							top: 100 - 100 * v.value.b + "px"
						}), z.eq(1).css("top", 100 * (1 - v.value.h) + "px"), z.eq(2).css("top", 100 * (1 - v.value.a) + "px"), C()
					},
					G = function() {
						var a, b = e.getOffset(g[0]);
						return angular.isDefined(h.colorpickerParent) && (b.left = 0, b.top = 0), "top" === m ? a = {
							top: b.top - 147 + k.y,
							left: b.left + k.x
						} : "right" === m ? a = {
							top: b.top + k.y,
							left: b.left + 126 + k.x
						} : "bottom" === m ? a = {
							top: b.top + g[0].offsetHeight + 2 + k.y,
							left: b.left + k.x
						} : "left" === m ? a = {
							top: b.top + k.y,
							left: b.left - 150 + k.x
						} : "sceneToobar" === m && (a = {
							top: b.top + k.y - 110,
							left: b.left - 150 + k.x + 40
						}), {
							top: a.top + "px",
							left: a.left + "px"
						}
					},
					H = function() {
						J()
					};
				n === !1 ? g.on("click", function() {
					F(), u.addClass("colorpicker-visible").css(G()), a.on("mousedown", H)
				}) : (F(), u.addClass("colorpicker-visible").css(G())), u.on("mousedown", function(a) {
					a.stopPropagation(), a.preventDefault()
				});
				var I = function(a) {
						i && f.$emit(a, {
							name: h.ngModel,
							value: i.$modelValue
						})
					},
					J = function() {
						u.hasClass("colorpicker-visible") && (u.removeClass("colorpicker-visible"), I("colorpicker-closed"), a.off("mousedown", H))
					};
				u.find("button").on("click", function() {
					J()
				})
			}
		}
	}]);