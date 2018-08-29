angular.module("scene.pageeffect.fall", []), angular.module("scene.pageeffect.fall").controller("fallEffectCtrl", ["$scope", "$translate", function(a, b) {
		a.fallingName = "福字";
		var c = a.properties;
		a.fallings = [{
			name: "福字",
			path: "assets/images/create/fallings/fuzi1.png",
			rotate: 180,
			vy: 3
		}, {
			name: "红包",
			path: "assets/images/create/fallings/hongbao2.png",
			rotate: 180,
			vy: 3
		}, {
			name: "绿枫叶",
			path: "assets/images/create/fallings/lvfengye.png",
			rotate: 180,
			vy: 3
		}, {
			name: "星星",
			path: "assets/images/create/fallings/xing.png",
			rotate: 180,
			vy: 3
		}, {
			name: "雪花",
			path: "assets/images/create/fallings/snow.png",
			rotate: 0,
			vy: 1
		}];
		if(c && c.fallingObject){
			a.controlView.effectType = "fallingObject";
			a.falling = c.fallingObject;
			angular.forEach(a.fallings, function(b, c) {
				b.path == a.falling.src.path && (a.falling.src = b);
			})
		}else{
			a.falling = {
				src: a.fallings[0],
				density: 2
			};
		} 
		a.changeImg = function(newVal){
			a.falling.src = newVal;
			a.fallingName = newVal.name;
		}
		a.$on("save.falling.effect", function() {
			c = {};
			c.fallingObject = a.falling;
			a.$close({
				properties: c,
				name: "落物",
				value: "fallingObject"
			});
		})
	}]);
angular.module("scene.pageeffect.finger", []), angular.module("scene.pageeffect.finger").controller("fingerEffectCtrl", ["$scope", "$translate", function(a, b) {
		a.fingerBgName = "粉红回忆";
		a.fingerName = "粉色指纹";
		var c, d = a.properties;
		a.fingerZws = [{
			name: "粉色指纹",
			path: "assets/images/create/fingers/zhiwen1.png"
		}, {
			name: "白色指纹",
			path: "assets/images/create/fingers/zhiwen2.png"
		}, {
			name: "蓝色指纹",
			path: "assets/images/create/fingers/zhiwen3.png"
		}];
		a.fingerBackgrounds = [{
			name: "粉红回忆",
			path: "assets/images/create/fingers/bg1.jpg"
		}, {
			name: "深蓝花纹",
			path: "assets/images/create/fingers/bg2.jpg"
		}, {
			name: "淡绿清新",
			path: "assets/images/create/fingers/bg3.jpg"
		}, {
			name: "深紫典雅",
			path: "assets/images/create/fingers/bg4.jpg"
		}, {
			name: "淡紫水滴",
			path: "assets/images/create/fingers/bg5.jpg"
		}, {
			name: "蓝白晶格",
			path: "assets/images/create/fingers/bg6.jpg"
		}, {
			name: "蓝色水滴",
			path: "assets/images/create/fingers/bg7.jpg"
		}, {
			name: "朦胧绿光",
			path: "assets/images/create/fingers/bg8.jpg"
		}, {
			name: "灰色金属",
			path: "assets/images/create/fingers/bg9.jpg"
		}];
		if(d && d.finger){
			a.controlView.effectType = "finger";
			a.finger = d.finger;
			angular.forEach(a.fingerZws, function(b, c) {
				b.path == a.finger.zwImage.path && (a.finger.zwImage = b);
			});
			angular.forEach(a.fingerBackgrounds, function(b, c) {
				b.path == a.finger.bgImage.path && (a.finger.bgImage = b);
			})
		}else{
			a.finger = {
				zwImage: a.fingerZws[0],
				bgImage: a.fingerBackgrounds[0]
			}
		}
		c = angular.copy(a.finger.bgImage);
		/*a.$watch("finger.bgImage", function(newVal){
			if(!newVal || newVal.name){
				a.replaceImg(a.finger);
			}
		});*/ 
		/*a.$watch("finger.zwImage", function(newVal){
			a.fingerName = newVal.name;
		});*/
		a.changeImg = function(newVal){
			a.finger.bgImage = newVal;
			a.replaceImg(a.finger);
		}
		a.changeFingerType = function(newVal){
			a.finger.zwImage = newVal;
			a.fingerName = newVal.name;
		}
		a.replaceImg = function(b) {
			if(b.bgImage){
				a.fingerBgName = b.bgImage.name;
				return void(c = angular.copy(a.finger.bgImage));
			}else{
				a.fingerBgName = '自定义';
				return void a.$emit("select.effect.image", "finger");
			}
		}, a.$on("replace.effect.image", function(b, d, e) {
			if("finger" == e){
				a.finger.bgImage || (a.finger.bgImage = {});
				a.finger.bgImage.path = PREFIX_FILE_HOST + d.data;
				a.fingerBackgrounds[0].name || a.fingerBackgrounds.shift();
				a.fingerBackgrounds.unshift(a.finger.bgImage);
				c = angular.copy(a.finger.bgImage);
			}
		}), a.$on("cancel.effect.replace", function(b, d) {
			if("finger" == d){
				angular.forEach(a.fingerBackgrounds, function(b, d) {
					if(c.name){
						c.name == b.name && (a.finger.bgImage = b);
					}else{
						b.name || (a.finger.bgImage = b);
					}
				})
			}
		}), a.$on("save.finger.effect", function() {
			d = {};
			d.finger = a.finger;
			a.$close({
				properties: d,
				name: "指纹",
				value: "finger"
			})
		})
	}]).directive("fingerMove", function() {
		function a(a, b, c) {
			b.css({
				animation: "move 2s ease 0",
				"animation-iteration-count": "infinite"
			})
		}
		return {
			restrict: "EA",
			link: a
		}
	});
angular.module("scene.pageeffect.fireworks", []), angular.module("scene.pageeffect.fireworks").controller("fireWorksCtrl", ["$scope", "$translate", function(a, b) {
		var c = a.properties;
		if(c && c.effect && "fireWorks" == c.effect.name){
			a.controlView.effectType = "fireWorks";
			a.controlView.effectIndex = 5;
		}
		a.$on("save.fireworks.effect", function() {
			c = {};
			c.effect = {
				name: "fireWorks"
			};
			a.$close({
				properties: c,
				name: "烟花",
				value: "effect"
			})
		})
	}]);
angular.module("scene.pageeffect.money", []), angular.module("scene.pageeffect.money").controller("moneyEffectCtrl", ["$scope", "$translate", function(a, b) {
		var c = a.properties;
		if(c && c.effect && "money" == c.effect.name){
			a.controlView.effectType = "money";
			a.money = {
				tip: c.effect.tip
			}
		}else{
			a.money = {
				tip: "握紧钱币，数到手抽筋吧"
			};
		}
		a.$on("save.money.effect", function() {
			c = {};
			c.effect = {
				name: "money",
				tip: a.money.tip
			};
			a.$close({
				properties: c,
				name: "数钱",
				value: "effect"
			})
		})
	}]);
angular.module("scene.pageeffect.none", []), angular.module("scene.pageeffect.none").controller("noneEffectCtrl", ["$scope", "$translate", function(a, b) {
		var c = a.properties;
		c && c.effect && "none" == c.effect.name && (a.controlView.effectType = "none");
		a.$on("save.none.effect", function() {
			c = {};
			c.effect = {
				name: "none"
			};
			a.$close({
				name: "无"
			});
		})
	}]);
angular.module("scene.pageeffect.scratch", ["common.directives.inputNumber","scene.pageeffect.filter"]), 
angular.module("scene.pageeffect.scratch").controller("scratchEffectCtrl", ["$scope", "$rootScope", "$translate", "i18nNotifications", function(a, b, c, d) {
		var e, f = a.properties;
		a.scratchName = "水滴";
		a.scratches = [{
			name: "水滴",
			path: "assets/images/create/waterdrop.jpg"
		}, {
			name: "细沙",
			path: "assets/images/create/sand.jpg"
		}, {
			name: "花瓣",
			path: "assets/images/create/flowers.jpg"
		}, {
			name: "金沙",
			path: "assets/images/create/goldsand.jpg"
		}, {
			name: "白雪",
			path: "assets/images/create/snowground.jpg"
		}, {
			name: "模糊",
			path: "assets/images/create/mohu.jpg"
		}, {
			name: "落叶",
			path: "assets/images/create/leaves.jpg"
		}, {
			name: "薄雾",
			path: "assets/images/create/smoke.png"
		}];
		if(f && (f.image || f.scratch)){
			a.controlView.effectType = "scratch";
			if(f.image || f.scratch){
				if(f.scratch){
					a.scratch = f.scratch;
					f.scratch.percentage.value && (a.scratch.percentage = f.scratch.percentage.value);
					f.scratch.opacity || (a.scratch.opacity = .2);
				}else if(f.image){
					a.scratch = {
						image: f.image,
						percentage: f.percentage.value
					};
					f.tip && (a.scratch.tip = f.tip);
					a.scratch.opacity = .2;
				}
				angular.forEach(a.scratches, function(b, c) {
					a.scratch.image.name == b.name && (a.scratch.image = b)
				});
				a.scratch.image.name || a.scratches.unshift(a.scratch.image);
			}
		}else{
			a.scratch = {
				image: a.scratches[0],
				percentage: .15,
				opacity: .2
			};
		}
		var g = a.$watch("scratch.opacity", function(c, d) {
			b.$broadcast("show.scratch.draw", a.scratch)
		}, !0);
		setTimeout(function() {
			e = angular.copy(a.scratch.image), b.$broadcast("show.scratch.draw", a.scratch, !1)
		}, 0), a.$on("$destroy", function() {
			g()
		});
		/*a.$watch("scratch.image", function(newVal){
			if(!newVal || newVal.name){
				a.replaceImage(a.scratch);
			}
		}); */
		a.changeImg = function(newVal){
			a.scratch.image = newVal;
			a.replaceImage(a.scratch);
		}
		a.replaceImage = function(c) {
			if(c.image){
				a.scratchName = c.image.name;
				e = angular.copy(a.scratch.image);
				return void b.$broadcast("show.scratch.draw", c, !1);
			}else{
				a.scratchName = "自定义";
				return void a.$emit("select.effect.image", "scratch");
			}
		}, a.$on("replace.effect.image", function(c, d, f) {
			if("scratch" == f){
				a.scratch.image || (a.scratch.image = {});
				a.scratch.image.path = PREFIX_FILE_HOST + d.data, a.scratches[0].name || a.scratches.shift();
				a.scratches.unshift(a.scratch.image);
				e = angular.copy(a.scratch.image);
				b.$broadcast("show.scratch.draw", a.scratch, !1);
			}
		}), a.$on("cancel.effect.replace", function(b, c) {
			"scratch" == c && angular.forEach(a.scratches, function(b, c) {
				e.name ? e.name == b.name && (a.scratch.image = b) : b.name || (a.scratch.image = b)
			})
		}), a.$on("save.scratch.effect", function() {
			f = {};
			f.scratch = a.scratch;
			if(f.scratch.percentage > 1){
				return void d.pushForCurrentRoute("scratch.percentage.overflow", "notify.success")
			}else{
				b.$broadcast("clear.scratch.interval");
				return void a.$close({
					properties: f,
					name: "涂抹",
					value: "scratch"
				})
			}
		})
	}]).directive("scratchEffect", function() {
		function a(a, d, e) {
			var f = new Image;
			a.$on("show.scratch.draw", function(a, c, d) {
				f.onload = function() {
					b(this, c)
				}, f.src = c.image.path
			}), a.$on("change.scratch.opacity", function(a, b) {
				$(".scratch-img").css({
					opacity: 1 - parseFloat(b).toFixed(2)
				})
			}), a.$on("clear.scratch.interval", function(a) {
				clearInterval(c)
			})
		}
		function b(a, f) {
			c && clearInterval(c);
			var g = '<canvas class="scratchCanvas" style="position:absolute; top: 0; left: 0;" width="196" height="308"></canvas>',
				h = $(".scratch-img");
			h.empty();
			h.append(g);
			d = h.find("canvas").get(0);
			// if all else fails
			try {
			    // if canvas element doesn't exist...
			    if(!d){ 
			    	console.log('Canvas not found.'); 
			    }else {
			        // if the getContext method doesn't exist (old browser)
			        if(!d.getContext){ 
			        	console.log('Context not supported.'); 
			        }else {
			            var context = d.getContext('2d');

			            // if this particular context isn't supported
			            if(!context){ 
			            	console.log('Context 2D not available.'); 
			            }else {
			                console.log('Context 2D available.'); 
			                e = d.getContext("2d");
							e.lineCap = "round";
							e.lineJoin = "round";
							e.lineWidth = 20;
							e.globalAlpha = 1 - parseFloat(f.opacity).toFixed(2);
							e.drawImage(a, 0, 0, d.width, d.height);
							e.globalCompositeOperation = "destination-out";
			            }
			        }
			    }
			}catch(exc){ 
				console.log(exc); 
			}
			var i = 130,
				j = 80;
			c = setInterval(function() {
				e.moveTo(i, j);
				if(i >= 70 && 140 >= j){
					e.lineTo(i - 2, j + 2);
					e.stroke();
					i -= 2;
					j += 2;
				}else if(120 >= i && 165 >= j){
					e.lineTo(i + 2, j + 1);
					e.stroke();
					i += 2;
					j += 1;
				}else if(i >= 70 && 215 >= j){
					e.lineTo(i - 2, j + 2);
					e.stroke();
					i -= 2;
					j += 2;
				}else{
					clearInterval(c);
					b(a, f);
				}
			}, 50)
		}
		var c, d, e;
		return {
			restrict: "EA",
			link: a
		}
	});
angular.module("scene.pageeffect.snow", []), angular.module("scene.pageeffect.snow").controller("snowEffectCtrl", ["$scope", "$translate", function(a, b) {
		var c = a.properties;
		c && c.effect && "snowFly" == c.effect.name && (a.controlView.effectType = "snowFly");
		a.$on("save.snow.effect", function() {
			c = {};
			c.effect = {
				name: "snowFly"
			};
			a.$close({
				properties: c,
				name: "飘雪",
				value: "effect"
			})
		})
	}]);
angular.module("scene.pageeffect.console", ["scene.pageeffect.scratch", "scene.pageeffect.finger", "scene.pageeffect.money", "scene.pageeffect.fall", "scene.pageeffect.snow", "scene.pageeffect.fireworks", "scene.pageeffect.none","scene.pageeffect.filter"]), 
angular.module("scene.pageeffect.console").controller("pageEffectCtrl", ["$scope", "$rootScope", "$modal", "$translate", "properties", "sceneService", function(a, b, c, d, e, f) {
		a.properties = e;
		a.controlView = {};
		a.effectList = [{
			type: "scratch",
			name: "涂抹",
			src: "assets/images/create/waterdrop.jpg"
		}, {
			type: "finger",
			name: "指纹",
			src: "assets/images/create/fingers/zhiwen1.png"
		}, {
			type: "money",
			name: "数钱",
			src: "assets/images/create/money_thumb1.jpg"
		}, {
			type: "fallingObject",
			name: "环境",
			src: "assets/images/create/falling.png"
		}, {
			type: "snowFly",
			name: "飘雪",
			src: "assets/images/create/snowfly.png"
		}, {
			type: "fireWorks",
			name: "烟花",
			src: "assets/images/create/fireworks.jpg"
		}/*, {
			type: "none",
			name: "无",
			src: ""
		}*/];
		e && (!e || e.scratch || e.finger || e.fallingObject || e.effect) || (e = {}, a.controlView.effectType = "scratch", a.controlView.effectIndex = 0);
		a.selectEffect = function(b, c) {
			a.controlView.effectType = b.type;
			a.controlView.effectIndex = c;
		}, a.confirm = function() {
			switch(a.controlView.effectType){
				case "scratch":
					a.$broadcast("save.scratch.effect");
					break;
				case "finger":
					a.$broadcast("save.finger.effect");
					break;
				case "money":
					a.$broadcast("save.money.effect");
					break;
				case "fallingObject":
					a.$broadcast("save.falling.effect");
					break;
				case "snowFly":
					a.$broadcast("save.snow.effect");
					break;
				case "fireWorks":
					a.$broadcast("save.fireworks.effect");
					break;/*
				case "none":
					a.$broadcast("save.none.effect");
					break;*/
			}
		}, a.$on("select.effect.image", function(a, d) {
			c.open({
				windowClass: "console img_console",
				templateUrl: BASE_URL+"templates/scene.console.bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 0
						}
					}
				}
			}).result.then(function(a) {
				var c = {
					type: 3,
					properties: {
						src: a.data
					}
				};
				if(a.height / a.width >= 1008 / 642 && a.height / a.width <= 1.578125){
					b.$broadcast("replace.effect.image", a, d)
				}else{
					f.openCropModal(c, function(a) {
						var c = {
							data: a.src
						};
						b.$broadcast("replace.effect.image", c, d);
					}, function() {
						b.$broadcast("cancel.effect.replace", d);
					})
				}
			}, function(a) {
				b.$broadcast("cancel.effect.replace", d)
			})
		}), a.cancel = function() {
			b.$broadcast("clear.scratch.interval");
			a.$dismiss();
		}, a.clearPageEffect = function(){
			a.$broadcast("save.none.effect");
		}
	}]);