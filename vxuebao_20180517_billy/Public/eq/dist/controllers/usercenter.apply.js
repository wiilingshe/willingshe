angular.module("usercenter.apply", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.apply").controller("ApplyCtrl", ["$rootScope", "$scope", "usercenterService", "$modal", "ModalService", "i18nNotifications", "MineService", "userinfo", "$translate", "$timeout", function(a, b, c, d, e, f, g, h, j, l) {		
		function m() {
			if(0 === B){
				b.isCodeAccessiable = !1;
				b.codeTip = "获取验证码";
				B = 60;
			}else{
				b.isCodeAccessiable = !0;
				b.codeTip = "重新发送(" + B + ")";
				l(function() {
					B--;
					m();
				}, 1e3)
			}
		}

		b.applyInfo = {};
		b.applyInfo.nick = h.nick;
		b.invoiceStat = h.invoice;
		b.actionerror = "";
		b.serverLabel = [];
		b.cateLabel = [];
		b.payLabel = [];

		var n;

		b.applyXiuke = !0;
		b.title = h.title;
		if(0 === h.status || 3 === h.status){
			n = 0;
			b.applyXiuke = !0;
		}else{
			n = 1;
			b.applyXiuke = !1;
		}

		var o = function(a) {
			c.getAPPlyMessage(a).then(function(c) {
				switch(a){
					case "province":
						b.serverLabel = c.data.list;
						c.data.list.length > 0 && (b.moreArea = !0);
						break;
					case "company_industry":
						b.cateLabel = c.data.list;
						c.data.list.length > 0 && (b.moreLabel = !0);
						break;
					case "payType":
						b.payLabel = c.data.list;
						break;
				}
			})
		};
		o("province");
		o("company_industry");
		o("payType");

		b.cancel = function() {
			b.$dismiss();
		}, b.cate_cancel = function(a) {
			for(var c = 0; c < b.cateLabel.length; c++){
				if(b.cateLabel[c].ischecked = !1, b.cateSelected.length > 0){
					for(var d = 0; d < b.cateSelected.length; d++) {
						b.cateLabel[c].id === b.cateSelected[d].id && (b.cateLabel[c].ischecked = !0);
					}
				}
			}
			b.cateError = "";
			setTimeout(function() {
				$(a.target).parents(".dropdown.open").trigger("click");
			})
		}, b.server_cancel = function(a) {
			for(i = 0; i < b.serverLabel.length; i++){
				if(b.serverLabel[i].ischecked = !1, b.serverSelected.length > 0){
					for(k = 0; k < b.serverSelected.length; k++) {
						b.serverLabel[i].id === b.serverSelected[k].id && (b.serverLabel[i].ischecked = !0);
					}
				}
			}
			setTimeout(function() {
				$(a.target).parents(".dropdown.open").trigger("click")
			});
			b.serverError = "";

		}, b.scene_cancel = function(a) {
			for(i = 0; i < b.myShowScene.length; i++){
				if(b.myShowScene[i].ischecked = !1, b.sceneSelected.length > 0){
					for(k = 0; k < b.sceneSelected.length; k++) {
						b.myShowScene[i].id === b.sceneSelected[k].id && (b.myShowScene[i].ischecked = !0);
					}
				}
			}
			setTimeout(function() {
				$(a.target).parents(".dropdown.open").trigger("click")
			});
			b.sceneError = "";

		}, b.checkIntroFormat = function(a) {
			if(a.shortIntroduction){
				if(countCharacters(a.shortIntroduction) > 30){
					b.introError = "简短介绍不能超过30个字符";
					return !1;
				}else{
					b.introError = "";
					return !0;
				}
			}else{
				b.introError = "请填写简短介绍";
				return !1;
			}
		}, b.checkIntroFormat1 = function(a) {
			if(a.introduction){
				if(countCharacters(a.introduction) > 400){
					b.introError1 = "秀客介绍不能超过400个字符";
					return !1;
				}else{
					b.introError1 = "";
					return !0;
				}
			}else{
				b.introError1 = "请填写秀客介绍";
				return !1;
			}
		}, c.getUserScene().then(function(a) {
			if(a.data.list.length > 0){
				b.myShowScene = a.data.list;
			}else{
				b.myShowScene = null;
			}
		});

		var p = [];
		b.sceneSelected = [];

		b.sceneSelect = function(a, c, d) {
			p = [];
			angular.forEach(b.myShowScene, function(a) {
				a.ischecked && p.push({
					code: a.code,
					name: a.name
				})
			});
			if(3 !== p.length){
				b.sceneError = "请选择三个代表作品";
				return !1;
			}else{
				b.sceneSelected = p;
				b.sceneNull = "";
				return void(d && (setTimeout(function() {
					$(c.target).parents(".dropdown.open").trigger("click");
				}), b.sceneError = ""))
			}
		};
		var q = function() {
				if(3 !== b.sceneSelected.length){
					b.sceneNull = "请选择三个代表作品";
					return !1;
				}else{
					b.sceneNull = "";
					return !0;
				}

			},
			r = [],
			s = [];

		b.serverSelected = [];
		b.serverSubmit = function(a, c, d) {
			r = [];
			angular.forEach(b.serverLabel, function(a) {
				a.ischecked && r.push({
					name: a.name,
					id: a.id
				})
			});
			if(r.length <= 0){
				return void(b.serverError = "请选择服务地域");

			}else if(r.length > 3){
				return void(b.serverError = "服务地域不能超过3个");

			}else{
				b.serverSelected = r;
				return void(d && (setTimeout(function() {
					$(c.target).parents(".dropdown.open").trigger("click");
				}), b.serverError = "", b.serverNull = ""));
			}
		};

		var t = function() {
				if(b.serverSelected.length <= 0 || b.serverSelected.length > 3){
					b.serverNull = "请选择1-3个服务地域";
					return !1;
				}else{
					b.serverNull = "";
					return !0;
				}
			},
			u = [],
			v = [];

		b.cateSelected = [];
		b.queren = function(a, c, d) {
			u = [];
			angular.forEach(b.cateLabel, function(a) {
				a.ischecked && u.push({
					name: a.name,
					id: a.id
				})
			});
			if(u.length <= 0){
				return void(b.cateError = "请选择擅长领域");

			}else if(u.length > 3){
				return void(b.cateError = "擅长领域不能超过3个");

			}else{
				b.cateSelected = u;
				b.cateNull = "";
				return void(d && (setTimeout(function() {
					$(c.target).parents(".dropdown.open").trigger("click")
				}), b.cateError = ""));
			}
		};
		var w = function() {
				if(b.cateSelected.length <= 0 || b.cateSelected.length > 3){
					b.cateNull = "请选择1-3个擅长领域";
					return !1;
				}else{
					b.cateNull = "";
					return !0;
				}

			},
			x = [],
			y = function() {
				x = [];
				var a = !1;
				angular.forEach(b.payLabel, function(b) {
					b.ischecked && (x.push(b.id), a = !0);
				});
				x = x.join(",");
				if(a){
					b.payError = "";
					return !0;
				}else{
					b.payError = "请选择支付方式";
					return !1;
				}

			},
			z = /^[0-9]*$/;
		b.checkQQFormat = function(a) {
			if(a.qq && !z.test(a.qq)){
				b.qqError = "qq填写格式错误";
				return !1;
			}else{
				if(a.qq){
					b.qqError = "";
					return !0;
				}else{
					b.qqError = "请填写QQ号码";
					return !1;
				}

			}

		};
		var A = function(a) {
			if(a.wechat){
				b.wechatError = "";
				return !0;
			}else{
				b.wechatError = "请填写微信号";
				return !1;
			}

		};
		b.checkEmailFormat = function(a) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(a.email && !c.test(a.email)){
				b.emailError = "邮箱格式不正确";
				return !1;
			}else{
				if(a.email){
					b.emailError = "";
					return !0;
				}else{
					b.emailError = "邮箱不能为空";
					return !1;
				}

			}

		}, b.checkCode = function(a) {
			if(a.code){
				b.codeError = "";
				return !0;
			}else{
				b.codeError = "请输入手机验证码";
				return !1;
			}

		}, b.getCode = function(a, d) {
			if(a.phone){
				b.telError = "";
				return void c.relMobileCode(a.phone, d).then(function(a) {
					a.data.success ? m() : b.telError = a.data.msg
				});
			}else{
				b.telError = "请填写手机号码";
				return !1;
			}
		};
		var B = 60;
		b.checkFormFormat = function(a) {
			if(b.checkIntroFormat(a) && b.checkIntroFormat1(a) && q() && t() && w() && y() && b.checkQQFormat(a) && A(a) && b.checkEmailFormat(a)){
				return !0;
			}else{
				return !1;
			} 
		}, b.submit = function(a) {
			if(b.checkFormFormat(a)) {
				for(C && !C.checkPhone && 1 !== C.checkPhone && b.checkCode(a), s = [], v = [], k = 0; k < b.cateSelected.length; k++) {
					v.push(b.cateSelected[k].id);
				}
				for(_cateSelected2 = v.join(","), i = 0; i < b.serverSelected.length; i++) {
					s.push(b.serverSelected[i].id);
				}
				_serverSelected2 = s.join(",");
				var d = {
					shortIntroduction: a.shortIntroduction,
					introduction: a.introduction,
					represent1: b.sceneSelected[0].code + "_" + b.sceneSelected[0].name,
					represent2: b.sceneSelected[1].code + "_" + b.sceneSelected[1].name,
					represent3: b.sceneSelected[2].code + "_" + b.sceneSelected[2].name,
					qq: a.qq,
					wechat: a.wechat,
					phone: a.phone,
					email: a.email,
					addr: _serverSelected2 || "",
					pay: x || "",
					good: _cateSelected2 || "",
					code: a.code,
					type: n
				};
				c.saveApplyInfo(d).then(function(a) {
					if(a.data.success){
						b.applyInfo = a.data.map.status;
						f.pushForCurrentRoute("visitor.apply", "notify.success");
						b.$close(b.applyInfo);

					}else{
						b.authError = a.data.msg;
					}
				})
			}
		}, b.checkFormFormat2 = function(a) {
			if(b.checkIntroFormat(a) && b.checkIntroFormat1(a) && q() && t() && w() && y() && b.checkQQFormat(a) && A(a) && b.checkEmailFormat(a)){
				return !0;
			}else{
				return !1;
			}
		}, b.reset = function(a) {
			if(b.sceneSelect(), b.serverSubmit(), b.queren(), b.checkFormFormat2(a)) {
				for(v = [], k = 0; k < b.cateSelected.length; k++) {
					v.push(b.cateSelected[k].id);
				}
				for(_cateSelected2 = v.join(","), s = [], i = 0; i < b.serverSelected.length; i++) {
					s.push(b.serverSelected[i].id);
				}
				_serverSelected2 = s.join(",");
				var d = {
					nick: b.applyInfo.nick,
					shortIntroduction: a.shortIntroduction,
					introduction: a.introduction,
					represent1: b.sceneSelected[0].code + "_" + b.sceneSelected[0].name,
					represent2: b.sceneSelected[1].code + "_" + b.sceneSelected[1].name,
					represent3: b.sceneSelected[2].code + "_" + b.sceneSelected[2].name,
					qq: a.qq,
					wechat: a.wechat,
					email: a.email,
					addr: _serverSelected2 || "",
					pay: x || "",
					good: _cateSelected2 || "",
					type: n,
					phone: a.phone,
					code: a.code
				};
				c.resetApplyInfo(d).then(function(a) {
					if(a.data.success){
						f.pushForCurrentRoute("visitor.apply", "notify.success");
						b.$close({
							applyInfoNew: d,
							status: a.data.map.status
						})
					}else{
						b.authError = a.data.msg;
					}
				})
			}
		};
		b.showPhone = !0;

		var C;
		0 !== h.status && l(function() {
			c.getVisitorMsg().then(function(a) {
				if(a.data.obj) {
					C = b.applyInfo = a.data.obj;

					var c = angular.copy(b.applyInfo.phone);
					if(C.checkPhone && 1 == C.checkPhone){
						b.showPhone = !1;
						b.$watch("applyInfo.phone", function(a, d) {
							if(a && a !== c){
								b.showPhone = !0;
							}else{
								b.showPhone = !1;
							}
						})
					}

					var d = C.represent1, 
						e = d.substr(0, d.indexOf("_")), 
						f = C.represent2, 
						g = f.substr(0, f.indexOf("_")), 
						h = C.represent3, 
						i = h.substr(0, h.indexOf("_")), 
						j = 0;

					for(; j < b.myShowScene.length; j++){
						if(b.myShowScene[j].code === e || b.myShowScene[j].code === g || b.myShowScene[j].code === i){
							b.myShowScene[j].ischecked = !0;
							b.sceneSelected.push(b.myShowScene[j]);
						}
					}
					var k = C.tagList;
					for(j = 0; j < k.length; j++) {
						for(var l = 0; l < b.serverLabel.length; l++) {
							if(k[j].tagId === b.serverLabel[l].id){
								b.serverLabel[l].ischecked = !0;
								b.serverSelected.push({
									name: k[j].name,
									id: k[j].tagId
								});
							}
						}
						for(var m = 0; m < b.payLabel.length; m++) {
							if(k[j].tagId === b.payLabel[m].id){
								b.payLabel[m].ischecked = !0;
							}
						}
						for(var n = 0; n < b.cateLabel.length; n++) {
							if(k[j].tagId === b.cateLabel[n].id){
								b.cateLabel[n].ischecked = !0;
								b.cateSelected.push({
									name: k[j].name,
									id: k[j].tagId
								});
							}
						}
					}
				}
			})
		}, 1e3), b.invoice = function() {
			d.open({
				windowClass: "six-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.invoice.tpl.html",
				controller: "InvoiceCtrl",
				scope: b,
				resolve: {
					userinfo: function() {
						return {}
					}
				}
			}).result.then(function(a) {}, function() {})
		}
	}]);