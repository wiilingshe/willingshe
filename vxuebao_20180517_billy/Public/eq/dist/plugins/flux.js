window.flux = {
	version: "1.4.4"
}, function(a) {
	flux.slider = function(b, c) {
		flux.browser.init(), flux.browser.supportsTransitions || window.console && window.console.error && console.error("Flux Slider requires a browser that supports CSS3 transitions");
		var d = this;
		this.element = a(b), this.transitions = [];
		for (var e in flux.transitions) this.transitions.push(e);
		this.options = a.extend({
			autoplay: !0,
			transitions: this.transitions,
			delay: 4e3,
			pagination: !0,
			controls: !1,
			captions: !1,
			width: null,
			height: null,
			onTransitionEnd: null,
			onStartEnd: null,
			bgColor: ""
		}, c), this.height = this.options.height ? this.options.height : null, this.width = this.options.width ? this.options.width : null;
		var f = [];
		a(this.options.transitions).each(function(a, b) {
			var c = new flux.transitions[b](this),
				d = !0;
			c.options.requires3d && !flux.browser.supports3d && (d = !1), c.options.compatibilityCheck && (d = c.options.compatibilityCheck()), d && f.push(b)
		}), this.options.transitions = f, this.images = new Array, this.imageLoadedCount = 0, this.currentImageIndex = 0, this.nextImageIndex = 1, this.playing = !1, this.container = a('<div class="fluxslider"></div>').appendTo(this.element), this.surface = a('<div class="surface" style="position: relative"></div>').appendTo(this.container), this.container.bind("click", function(b) {
			a(b.target).hasClass("hasLink") && (window.location = a(b.target).data("href"))
		}), this.imageContainer = a('<div class="images loading1"></div>').css({
			position: "relative",
			overflow: "hidden"
		}).appendTo(this.surface), this.width && this.height && this.imageContainer.css({
			width: this.width + "px",
			height: this.height + "px"
		}), this.image1 = a('<div class="image1" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), this.image2 = a('<div class="image2" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), a(this.image1).add(this.image2).css({
			position: "absolute",
			top: "0px",
			left: "0px"
		}), this.element.find("img, a img").each(function(b, c) {
			var e = c.cloneNode(!1),
				f = a(c).parent();
			f.is("a") && a(e).data("href", f.attr("href")), d.images.push(e), a(c).remove()
		});
		for (var g = 0; g < this.images.length; g++) {
			var h = new Image;
			h.onload = function() {
				d.imageLoadedCount++, d.width = d.width ? d.width : this.width, d.height = d.height ? d.height : this.height, d.imageLoadedCount >= d.images.length && (d.finishedLoading(), d.setupImages())
			}, h.src = this.images[g].src
		}
		this.element.bind("fluxTransitionEnd", function(a, b) {
			d.options.onTransitionEnd && (a.preventDefault(), d.options.onTransitionEnd(b))
		}), this.options.autoplay && this.start();
		var i = {},
			j = {},
			k = 20;
		this.element.bind("mousedown touchstart", function(a) {
			"touchstart" == a.type ? i.left = a.originalEvent.touches[0].pageX : "mousedown" == a.type && (i.left = a.pageX)
		}).bind("mouseup touchend", function(a) {
			"touchend" == a.type ? j.left = a.originalEvent.changedTouches[0].pageX : "mouseup" == a.type && (j.left = a.pageX), j.left - i.left > k ? d.prev(null, {
				direction: "right"
			}) : i.left - j.left > k && d.next(null, {
				direction: "left"
			}), d.options.autoplay && (d.stop(), d.start())
		}), setTimeout(function() {
			a(window).focus(function() {
				d.isPlaying() && d.next()
			})
		}, 100)
	}, flux.slider.prototype = {
		constructor: flux.slider,
		playing: !1,
		start: function() {
			var a = this;
			this.playing = !0, this.interval = setInterval(function() {
				a.transition()
			}, this.options.delay), "function" == typeof this.options.onStartEnd && this.options.onStartEnd(this.interval)
		},
		stop: function() {
			this.playing = !1, clearInterval(this.interval), this.interval = null
		},
		isPlaying: function() {
			return this.playing
		},
		next: function(a, b) {
			b = b || {}, b.direction = "left", this.showImage(this.currentImageIndex + 1, a, b)
		},
		prev: function(a, b) {
			b = b || {}, b.direction = "right", this.showImage(this.currentImageIndex - 1, a, b)
		},
		showImage: function(a, b, c) {
			this.setNextIndex(a), this.setupImages(), this.transition(b, c)
		},
		finishedLoading: function() {
			var b = this;
			if (this.container.css({
				width: this.width + "px",
				height: this.height + "px"
			}), this.imageContainer.removeClass("loading1"), this.options.pagination && (this.pagination = a('<ul class="pagination"></ul>').css({
				margin: "0px",
				padding: "0px",
				"text-align": "center"
			}), this.pagination.bind("click", function(c) {
				c.preventDefault(), b.showImage(a(c.target).data("index"))
			}), a(this.images).each(function(c, d) {
				var e = a('<li data-index="' + c + '">' + (c + 1) + "</li>").css({
					display: "inline-block",
					"margin-left": "0.5em",
					cursor: "pointer"
				}).appendTo(b.pagination);
				0 == c && e.css("margin-left", 0).addClass("current")
			}), this.container.append(this.pagination)), a(this.imageContainer).css({
				width: this.width + "px",
				height: this.height + "px"
			}), a(this.image1).css({
				width: this.width + "px",
				height: this.height + "px"
			}), a(this.image2).css({
				width: this.width + "px",
				height: this.height + "px"
			}), this.container.css({
				width: this.width + "px",
				height: this.height + (this.options.pagination ? this.pagination.height() : 0) + "px"
			}), this.options.controls) {
				var c = {
					padding: "4px 10px 10px",
					"font-size": "60px",
					"font-family": "arial, sans-serif",
					"line-height": "1em",
					"font-weight": "bold",
					color: "#FFF",
					"text-decoration": "none",
					background: "rgba(0,0,0,0.5)",
					position: "absolute",
					"z-index": 2e3
				};
				this.nextButton = a('<a href="#">??</a>').css(c).css3({
					"border-radius": "4px"
				}).appendTo(this.surface).bind("click", function(a) {
					a.preventDefault(), b.next()
				}), this.prevButton = a('<a href="#">??</a>').css(c).css3({
					"border-radius": "4px"
				}).appendTo(this.surface).bind("click", function(a) {
					a.preventDefault(), b.prev()
				});
				var d = (this.height - this.nextButton.height()) / 2;
				this.nextButton.css({
					top: d + "px",
					right: "10px"
				}), this.prevButton.css({
					top: d + "px",
					left: "10px"
				})
			}
			this.options.captions && (this.captionBar = a('<div class="caption"></div>').css({
				background: "rgba(0,0,0,0.6)",
				color: "#FFF",
				"font-size": "16px",
				"font-family": "helvetica, arial, sans-serif",
				"text-decoration": "none",
				"font-weight": "bold",
				padding: "1.5em 1em",
				opacity: 0,
				position: "absolute",
				"z-index": 110,
				width: "100%",
				bottom: 0
			}).css3({
				"transition-property": "opacity",
				"transition-duration": "800ms",
				"box-sizing": "border-box"
			}).prependTo(this.surface)), this.updateCaption()
		},
		setupImages: function() {
			var b = this.getImage(this.currentImageIndex),
				c = {
					background: 'url("' + b.src + '") 50% 50% / contain no-repeat ' + this.options.bgColor,
					zIndex: 101,
					cursor: "auto"
				};
			a(b).data("href") ? (c.cursor = "pointer", this.image1.addClass("hasLink"), this.image1.data("href", a(b).data("href"))) : (this.image1.removeClass("hasLink"), this.image1.data("href", null)), this.image1.css(c).children().remove(), this.image2.css({
				background: 'url("' + this.getImage(this.nextImageIndex).src + '") 50% 50% / contain no-repeat ' + this.options.bgColor,
				zIndex: 100
			}), this.options.pagination && this.pagination && (this.pagination.find("li.current").removeClass("current"), a(this.pagination.find("li")[this.currentImageIndex]).addClass("current"))
		},
		transition: function(b, c) {
			if (b == undefined || !flux.transitions[b]) {
				var d = Math.floor(Math.random() * this.options.transitions.length);
				b = this.options.transitions[d]
			}
			var e = null;
			try {
				e = new flux.transitions[b](this, a.extend(this.options[b] ? this.options[b] : {}, c))
			} catch (f) {
				e = new flux.transition(this, {
					fallback: !0
				})
			}
			e.run(), this.currentImageIndex = this.nextImageIndex, this.setNextIndex(this.currentImageIndex + 1), this.updateCaption()
		},
		updateCaption: function() {
			var b = a(this.getImage(this.currentImageIndex)).attr("title");
			this.options.captions && this.captionBar && ("" !== b && this.captionBar.html(b), this.captionBar.css("opacity", "" === b ? 0 : 1))
		},
		getImage: function(a) {
			return a %= this.images.length, this.images[a]
		},
		setNextIndex: function(a) {
			a == undefined && (a = this.currentImageIndex + 1), this.nextImageIndex = a, this.nextImageIndex > this.images.length - 1 && (this.nextImageIndex = 0), this.nextImageIndex < 0 && (this.nextImageIndex = this.images.length - 1)
		},
		increment: function() {
			this.currentImageIndex++, this.currentImageIndex > this.images.length - 1 && (this.currentImageIndex = 0)
		}
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.browser = {
		init: function() {
			if (flux.browser.supportsTransitions === undefined) {
				var b = (document.createElement("div"), ["-webkit", "-moz", "-o", "-ms"]);
				if (window.Modernizr && Modernizr.csstransitions !== undefined ? flux.browser.supportsTransitions = Modernizr.csstransitions : flux.browser.supportsTransitions = this.supportsCSSProperty("Transition"), window.Modernizr && Modernizr.csstransforms3d !== undefined) flux.browser.supports3d = Modernizr.csstransforms3d;
				else if (flux.browser.supports3d = this.supportsCSSProperty("Perspective"), flux.browser.supports3d && "webkitPerspective" in a("body").get(0).style) {
					var c = a('<div id="csstransform3d"></div>'),
						d = a('<style media="(transform-3d), (' + b.join("-transform-3d),(") + '-transform-3d)">div#csstransform3d { position: absolute; left: 9px }</style>');
					a("body").append(c), a("head").append(d), flux.browser.supports3d = 9 == c.get(0).offsetLeft, c.remove(), d.remove()
				}
			}
		},
		supportsCSSProperty: function(a) {
			for (var b = document.createElement("div"), c = ["Webkit", "Moz", "O", "Ms"], d = !1, e = 0; e < c.length; e++) c[e] + a in b.style && (d = d || !0);
			return d
		},
		translate: function(a, b, c) {
			return a = a != undefined ? a : 0, b = b != undefined ? b : 0, c = c != undefined ? c : 0, "translate" + (flux.browser.supports3d ? "3d(" : "(") + a + "px," + b + (flux.browser.supports3d ? "px," + c + "px)" : "px)")
		},
		rotateX: function(a) {
			return flux.browser.rotate("x", a)
		},
		rotateY: function(a) {
			return flux.browser.rotate("y", a)
		},
		rotateZ: function(a) {
			return flux.browser.rotate("z", a)
		},
		rotate: function(a, b) {
			return !a in {
				x: "",
				y: "",
				z: ""
			} && (a = "z"), b = b != undefined ? b : 0, flux.browser.supports3d ? "rotate3d(" + ("x" == a ? "1" : "0") + ", " + ("y" == a ? "1" : "0") + ", " + ("z" == a ? "1" : "0") + ", " + b + "deg)" : "z" == a ? "rotate(" + b + "deg)" : ""
		}
	}, a(function() {
		flux.browser.init()
	})
}(window.jQuery || window.Zepto), function(a) {
	a.fn.css3 = function(a) {
		var b = {},
			c = ["webkit", "moz", "ms", "o"];
		for (var d in a) {
			for (var e = 0; e < c.length; e++) b["-" + c[e] + "-" + d] = a[d];
			b[d] = a[d]
		}
		return this.css(b), this
	}, a.fn.transitionEnd = function(b) {
		for (var c = ["webkitTransitionEnd", "transitionend", "oTransitionEnd"], d = 0; d < c.length; d++) this.bind(c[d], function(d) {
			for (var e = 0; e < c.length; e++) a(this).unbind(c[e]);
			b && b.call(this, d)
		});
		return this
	}, flux.transition = function(b, c) {
		if (this.options = a.extend({
			requires3d: !1,
			after: function() {}
		}, c), this.slider = b, this.options.requires3d && !flux.browser.supports3d || !flux.browser.supportsTransitions || this.options.fallback === !0) {
			var d = this;
			this.options.after = undefined, this.options.setup = function() {
				d.fallbackSetup()
			}, this.options.execute = function() {
				d.fallbackExecute()
			}
		}
	}, flux.transition.prototype = {
		constructor: flux.transition,
		hasFinished: !1,
		run: function() {
			var a = this;
			this.options.setup !== undefined && this.options.setup.call(this), this.slider.image1.css({
				"background-image": "none"
			}), this.slider.imageContainer.css("overflow", this.options.requires3d ? "visible" : "hidden"), setTimeout(function() {
				a.options.execute !== undefined && a.slider.image1.css("background-color", ""), a.options.execute.call(a)
			}, 5)
		},
		finished: function() {
			this.hasFinished || (this.hasFinished = !0, this.options.after && this.options.after.call(this), this.slider.imageContainer.css("overflow", "hidden"), this.slider.setupImages(), this.slider.element.trigger("fluxTransitionEnd", {
				currentImage: this.slider.getImage(this.slider.currentImageIndex)
			}))
		},
		fallbackSetup: function() {},
		fallbackExecute: function() {
			this.finished()
		}
	}, flux.transitions = {}, flux.transition_grid = function(b, c) {
		return new flux.transition(b, a.extend({
			columns: 6,
			rows: 6,
			forceSquare: !1,
			setup: function() {
				var b = this.slider.image1.width(),
					c = this.slider.image1.height(),
					d = Math.floor(b / this.options.columns),
					e = Math.floor(c / this.options.rows);
				this.options.forceSquare && (e = d, this.options.rows = Math.floor(c / e));
				for (var f = b - this.options.columns * d, g = Math.ceil(f / this.options.columns), h = c - this.options.rows * e, i = Math.ceil(h / this.options.rows), j = (this.slider.image1.height(), 0), k = 0, l = document.createDocumentFragment(), m = 0; m < this.options.columns; m++) {
					var n = d,
						k = 0;
					if (f > 0) {
						var o = f >= g ? g : f;
						n += o, f -= o
					}
					for (var p = 0; p < this.options.rows; p++) {
						var q = e,
							r = h;
						if (r > 0) {
							var o = r >= i ? i : r;
							q += o, r -= o
						}
						var s = a('<div class="tile tile-' + m + "-" + p + '"></div>').css({
							width: n + "px",
							height: q + "px",
							position: "absolute",
							top: k + "px",
							left: j + "px"
						});
						this.options.renderTile.call(this, s, m, p, n, q, j, k), l.appendChild(s.get(0)), k += q
					}
					j += n
				}
				this.slider.image1.get(0).appendChild(l)
			},
			execute: function() {
				var a = this,
					b = this.slider.image1.height(),
					c = this.slider.image1.find("div.barcontainer");
				this.slider.image2.hide(), c.last().transitionEnd(function(b) {
					a.slider.image2.show(), a.finished()
				}), c.css3({
					transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, b / 2, b / 2)
				})
			},
			renderTile: function(a, b, c, d, e, f, g) {}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.bars = function(b, c) {
		return new flux.transition_grid(b, a.extend({
			columns: 10,
			rows: 1,
			delayBetweenBars: 40,
			renderTile: function(b, c, d, e, f, g, h) {
				a(b).css({
					background: this.slider.image1.css("background"),
					"background-size": this.slider.width + "px " + this.slider.height + "px",
					"background-position": "-" + g + "px 0px"
				}).css3({
					"transition-duration": "400ms",
					"transition-timing-function": "ease-in",
					"transition-property": "all",
					"transition-delay": c * this.options.delayBetweenBars + "ms"
				})
			},
			execute: function() {
				var b = this,
					c = this.slider.image1.height(),
					d = this.slider.image1.find("div.tile");
				a(d[d.length - 1]).transitionEnd(function() {
					b.finished()
				}), setTimeout(function() {
					d.css({
						opacity: "0.5"
					}).css3({
						transform: flux.browser.translate(0, c)
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.bars3d = function(b, c) {
		return new flux.transition_grid(b, a.extend({
			requires3d: !0,
			columns: 7,
			rows: 1,
			delayBetweenBars: 150,
			perspective: 1e3,
			renderTile: function(b, c, d, e, f, g, h) {
				var i = a('<div class="bar-' + c + '"></div>').css({
					width: e + "px",
					height: "100%",
					position: "absolute",
					top: "0px",
					left: "0px",
					"z-index": 200,
					background: this.slider.image1.css("background"),
					"background-size": this.slider.width + "px " + this.slider.height + "px",
					"background-position": "-" + g + "px 0px",
					"background-repeat": "no-repeat"
				}).css3({
					"backface-visibility": "hidden"
				}),
					j = a(i.get(0).cloneNode(!1)).css({
						"background-image": this.slider.image2.css("background-image")
					}).css3({
						transform: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -f / 2, f / 2)
					}),
					k = a('<div class="side bar-' + c + '"></div>').css({
						width: f + "px",
						height: f + "px",
						position: "absolute",
						top: "0px",
						left: "0px",
						background: "#222",
						"z-index": 190
					}).css3({
						transform: flux.browser.rotateY(90) + " " + flux.browser.translate(f / 2, 0, -f / 2) + " " + flux.browser.rotateY(180),
						"backface-visibility": "hidden"
					}),
					l = a(k.get(0).cloneNode(!1)).css3({
						transform: flux.browser.rotateY(90) + " " + flux.browser.translate(f / 2, 0, e - f / 2)
					});
				a(b).css({
					width: e + "px",
					height: "100%",
					position: "absolute",
					top: "0px",
					left: g + "px",
					"z-index": c > this.options.columns / 2 ? 1e3 - c : 1e3
				}).css3({
					"transition-duration": "800ms",
					"transition-timing-function": "linear",
					"transition-property": "all",
					"transition-delay": c * this.options.delayBetweenBars + "ms",
					"transform-style": "preserve-3d"
				}).append(i).append(j).append(k).append(l)
			},
			execute: function() {
				this.slider.image1.css3({
					perspective: this.options.perspective,
					"perspective-origin": "50% 50%"
				}).css({
					"-moz-transform": "perspective(" + this.options.perspective + "px)",
					"-moz-perspective": "none",
					"-moz-transform-style": "preserve-3d"
				});
				var a = this,
					b = this.slider.image1.height(),
					c = this.slider.image1.find("div.tile");
				this.slider.image2.hide(), c.last().transitionEnd(function(b) {
					a.slider.image1.css3({
						"transform-style": "flat"
					}), a.slider.image2.show(), a.finished()
				}), setTimeout(function() {
					c.css3({
						transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, b / 2, b / 2)
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.blinds = function(b, c) {
		return new flux.transitions.bars(b, a.extend({
			execute: function() {
				var b = this,
					c = (this.slider.image1.height(), this.slider.image1.find("div.tile"));
				a(c[c.length - 1]).transitionEnd(function() {
					b.finished()
				}), setTimeout(function() {
					c.css({
						opacity: "0.5"
					}).css3({
						transform: "scalex(0.0001)"
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.zip = function(b, c) {
		return new flux.transitions.bars(b, a.extend({
			execute: function() {
				var b = this,
					c = this.slider.image1.height(),
					d = this.slider.image1.find("div.tile");
				a(d[d.length - 1]).transitionEnd(function() {
					b.finished()
				}), setTimeout(function() {
					d.each(function(b, d) {
						a(d).css({
							opacity: "0.3"
						}).css3({
							transform: flux.browser.translate(0, b % 2 ? "-" + 2 * c : c)
						})
					})
				}, 20)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.blocks = function(b, c) {
		return new flux.transition_grid(b, a.extend({
			forceSquare: !0,
			delayBetweenBars: 100,
			renderTile: function(b, c, d, e, f, g, h) {
				var i = Math.floor(10 * Math.random() * this.options.delayBetweenBars);
				a(b).css({
					background: this.slider.image1.css("background"),
					"background-size": this.slider.width + "px " + this.slider.height + "px",
					"background-position": "-" + g + "px -" + h + "px"
				}).css3({
					"transition-duration": "350ms",
					"transition-timing-function": "ease-in",
					"transition-property": "all",
					"transition-delay": i + "ms"
				}), this.maxDelay === undefined && (this.maxDelay = 0), i > this.maxDelay && (this.maxDelay = i, this.maxDelayTile = b)
			},
			execute: function() {
				var b = this,
					c = this.slider.image1.find("div.tile");
				this.maxDelayTile.transitionEnd(function() {
					b.finished()
				}), setTimeout(function() {
					c.each(function(b, c) {
						a(c).css({
							opacity: "0"
						}).css3({
							transform: "scale(0.8)"
						})
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.blocks2 = function(b, c) {
		return new flux.transition_grid(b, a.extend({
			cols: 12,
			forceSquare: !0,
			delayBetweenDiagnols: 150,
			renderTile: function(b, c, d, e, f, g, h) {
				Math.floor(10 * Math.random() * this.options.delayBetweenBars);
				a(b).css({
					background: this.slider.image1.css("background"),
					"background-size": this.slider.width + "px " + this.slider.height + "px",
					"background-position": "-" + g + "px -" + h + "px"
				}).css3({
					"transition-duration": "350ms",
					"transition-timing-function": "ease-in",
					"transition-property": "all",
					"transition-delay": (c + d) * this.options.delayBetweenDiagnols + "ms",
					"backface-visibility": "hidden"
				})
			},
			execute: function() {
				var b = this,
					c = this.slider.image1.find("div.tile");
				c.last().transitionEnd(function() {
					b.finished()
				}), setTimeout(function() {
					c.each(function(b, c) {
						a(c).css({
							opacity: "0"
						}).css3({
							transform: "scale(0.8)"
						})
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.cube = function(b, c) {
		return new flux.transition(b, a.extend({
			requires3d: !0,
			barWidth: 100,
			direction: "left",
			perspective: 1e3,
			setup: function() {
				var b = this.slider.image1.width(),
					c = this.slider.image1.height();
				this.slider.image1.css3({
					perspective: this.options.perspective,
					"perspective-origin": "50% 50%"
				}), this.cubeContainer = a('<div class="cube"></div>').css({
					width: b + "px",
					height: c + "px",
					position: "relative"
				}).css3({
					"transition-duration": "800ms",
					"transition-timing-function": "linear",
					"transition-property": "all",
					"transform-style": "preserve-3d"
				});
				var d = {
					height: "100%",
					width: "100%",
					position: "absolute",
					top: "0px",
					left: "0px"
				},
					e = a('<div class="face current"></div>').css(a.extend(d, {
						background: this.slider.image1.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px"
					})).css3({
						"backface-visibility": "hidden"
					});
				this.cubeContainer.append(e);
				var f = a('<div class="face next"></div>').css(a.extend(d, {
					background: this.slider.image2.css("background-image")
				})).css3({
					transform: this.options.transitionStrings.call(this, this.options.direction, "nextFace"),
					"backface-visibility": "hidden"
				});
				this.cubeContainer.append(f), this.slider.image1.append(this.cubeContainer)
			},
			execute: function() {
				var a = this;
				this.slider.image1.width(), this.slider.image1.height();
				this.slider.image2.hide(), this.cubeContainer.transitionEnd(function() {
					a.slider.image2.show(), a.finished()
				}), setTimeout(function() {
					a.cubeContainer.css3({
						transform: a.options.transitionStrings.call(a, a.options.direction, "container")
					})
				}, 50)
			},
			transitionStrings: function(a, b) {
				var c = this.slider.image1.width(),
					d = this.slider.image1.height(),
					e = {
						up: {
							nextFace: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, d / 2, d / 2),
							container: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -d / 2, d / 2)
						},
						down: {
							nextFace: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -d / 2, d / 2),
							container: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, d / 2, d / 2)
						},
						left: {
							nextFace: flux.browser.rotateY(90) + " " + flux.browser.translate(c / 2, 0, c / 2),
							container: flux.browser.rotateY(-90) + " " + flux.browser.translate(-c / 2, 0, c / 2)
						},
						right: {
							nextFace: flux.browser.rotateY(-90) + " " + flux.browser.translate(-c / 2, 0, c / 2),
							container: flux.browser.rotateY(90) + " " + flux.browser.translate(c / 2, 0, c / 2)
						}
					};
				return e[a] && e[a][b] ? e[a][b] : !1
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.tiles3d = function(b, c) {
		return new flux.transition_grid(b, a.extend({
			requires3d: !0,
			forceSquare: !0,
			columns: 5,
			perspective: 600,
			delayBetweenBarsX: 200,
			delayBetweenBarsY: 150,
			renderTile: function(b, c, d, e, f, g, h) {
				var i = a("<div></div>").css({
					width: e + "px",
					height: f + "px",
					position: "absolute",
					top: "0px",
					left: "0px",
					background: this.slider.image1.css("background"),
					"background-size": this.slider.width + "px " + this.slider.height + "px",
					"background-position": "-" + g + "px -" + h + "px",
					"background-repeat": "no-repeat",
					"-moz-transform": "translateZ(1px)"
				}).css3({
					"backface-visibility": "hidden"
				}),
					j = a(i.get(0).cloneNode(!1)).css({
						"background-image": this.slider.image2.css("background-image")
					}).css3({
						transform: flux.browser.rotateY(180),
						"backface-visibility": "hidden"
					});
				a(b).css({
					"z-index": (c > this.options.columns / 2 ? 500 - c : 500) + (d > this.options.rows / 2 ? 500 - d : 500)
				}).css3({
					"transition-duration": "800ms",
					"transition-timing-function": "ease-out",
					"transition-property": "all",
					"transition-delay": c * this.options.delayBetweenBarsX + d * this.options.delayBetweenBarsY + "ms",
					"transform-style": "preserve-3d"
				}).append(i).append(j)
			},
			execute: function() {
				this.slider.image1.css3({
					perspective: this.options.perspective,
					"perspective-origin": "50% 50%"
				});
				var a = this,
					b = this.slider.image1.find("div.tile");
				this.slider.image2.hide(), b.last().transitionEnd(function(b) {
					a.slider.image2.show(), a.finished()
				}), setTimeout(function() {
					b.css3({
						transform: flux.browser.rotateY(180)
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.turn = function(b, c) {
		return new flux.transition(b, a.extend({
			requires3d: !0,
			perspective: 1300,
			direction: "left",
			setup: function() {
				var b = a('<div class="tab"></div>').css({
					width: "50%",
					height: "100%",
					position: "absolute",
					top: "0px",
					left: "left" == this.options.direction ? "50%" : "0%",
					"z-index": 101
				}).css3({
					"transform-style": "preserve-3d",
					"transition-duration": "1000ms",
					"transition-timing-function": "ease-out",
					"transition-property": "all",
					"transform-origin": "left" == this.options.direction ? "left center" : "right center"
				}),
					c = (a("<div></div>").appendTo(b).css({
						background: this.slider.image1.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px",
						"background-position": ("left" == this.options.direction ? "-" + this.slider.image1.width() / 2 : 0) + "px 0",
						width: "100%",
						height: "100%",
						position: "absolute",
						top: "0",
						left: "0",
						"-moz-transform": "translateZ(1px)"
					}).css3({
						"backface-visibility": "hidden"
					}), a("<div></div>").appendTo(b).css({
						background: this.slider.image2.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px",
						"background-position": ("left" == this.options.direction ? 0 : "-" + this.slider.image1.width() / 2) + "px 0",
						width: "100%",
						height: "100%",
						position: "absolute",
						top: "0",
						left: "0"
					}).css3({
						transform: flux.browser.rotateY(180),
						"backface-visibility": "hidden"
					}), a("<div></div>").css({
						position: "absolute",
						top: "0",
						left: "left" == this.options.direction ? "0" : "50%",
						width: "50%",
						height: "100%",
						background: this.slider.image1.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px",
						"background-position": ("left" == this.options.direction ? 0 : "-" + this.slider.image1.width() / 2) + "px 0",
						"z-index": 100
					})),
					d = a('<div class="overlay"></div>').css({
						position: "absolute",
						top: "0",
						left: "left" == this.options.direction ? "50%" : "0",
						width: "50%",
						height: "100%",
						background: "#000",
						opacity: 1
					}).css3({
						"transition-duration": "800ms",
						"transition-timing-function": "linear",
						"transition-property": "opacity"
					}),
					e = a("<div></div>").css3({
						width: "100%",
						height: "100%"
					}).css3({
						perspective: this.options.perspective,
						"perspective-origin": "50% 50%"
					}).append(b).append(c).append(d);
				this.slider.image1.append(e)
			},
			execute: function() {
				var a = this;
				this.slider.image1.find("div.tab").first().transitionEnd(function() {
					a.finished()
				}), setTimeout(function() {
					a.slider.image1.find("div.tab").css3({
						transform: flux.browser.rotateY("left" == a.options.direction ? -179 : 179)
					}), a.slider.image1.find("div.overlay").css({
						opacity: 0
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.slide = function(b, c) {
		return new flux.transition(b, a.extend({
			direction: "left",
			setup: function() {
				var b = this.slider.image1.width(),
					c = this.slider.image1.height(),
					d = a('<div class="current"></div>').css({
						height: c + "px",
						width: b + "px",
						position: "absolute",
						top: "0px",
						left: "0px",
						background: this.slider["left" == this.options.direction ? "image1" : "image2"].css("background")
					}).css3({
						"backface-visibility": "hidden"
					}),
					e = a('<div class="next"></div>').css({
						height: c + "px",
						width: b + "px",
						position: "absolute",
						top: "0px",
						left: b + "px",
						background: this.slider["left" == this.options.direction ? "image2" : "image1"].css("background")
					}).css3({
						"backface-visibility": "hidden"
					});
				this.slideContainer = a('<div class="slide"></div>').css({
					width: 2 * b + "px",
					height: c + "px",
					position: "relative",
					left: "left" == this.options.direction ? "0px" : -b + "px",
					"z-index": 101
				}).css3({
					"transition-duration": "600ms",
					"transition-timing-function": "ease-in",
					"transition-property": "all"
				}), this.slideContainer.append(d).append(e), this.slider.image1.append(this.slideContainer)
			},
			execute: function() {
				var a = this,
					b = this.slider.image1.width();
				"left" == this.options.direction && (b = -b), this.slideContainer.transitionEnd(function() {
					a.finished()
				}), setTimeout(function() {
					a.slideContainer.css3({
						transform: flux.browser.translate(b)
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function(a) {
	flux.transitions.explode = function(b, c) {
		return new flux.transition_grid(b, a.extend({
			columns: 6,
			forceSquare: !0,
			delayBetweenBars: 30,
			perspective: 800,
			requires3d: !0,
			renderTile: function(b, c, d, e, f, g, h) {
				var i = Math.floor(10 * Math.random() * this.options.delayBetweenBars);
				a(b).css({
					background: this.slider.image1.css("background"),
					"background-size": this.slider.width + "px " + this.slider.height + "px",
					"background-position": "-" + g + "px -" + h + "px"
				}).css3({
					"transition-duration": "500ms",
					"transition-timing-function": "ease-in",
					"transition-property": "all",
					"transition-delay": i + "ms"
				}), this.maxDelay === undefined && (this.maxDelay = 0), i > this.maxDelay && (this.maxDelay = i, this.maxDelayTile = b)
			},
			execute: function() {
				this.slider.image1.css3({
					perspective: this.options.perspective,
					"perspective-origin": "50% 50%"
				}).css({
					"-moz-transform": "perspective(" + this.options.perspective + "px)",
					"-moz-perspective": "none",
					"-moz-transform-style": "preserve-3d"
				});
				var b = this,
					c = this.slider.image1.find("div.tile");
				this.maxDelayTile.transitionEnd(function() {
					b.slider.image1.css3({
						"transform-style": "flat"
					}), b.finished()
				}), setTimeout(function() {
					c.each(function(b, c) {
						a(c).css({
							opacity: "0"
						}).css3({
							transform: flux.browser.translate(0, 0, 700) + " rotate3d(" + (Math.round(2 * Math.random()) - 1) + ", " + (Math.round(2 * Math.random()) - 1) + ", " + (Math.round(2 * Math.random()) - 1) + ", 90deg) "
						})
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto)