angular.module("usercenter.account", ["usercenter.relEmail"]),
	angular.module("usercenter.account").controller("UsercenterAccountCtrl", ["$location", "$rootScope", "$scope", "$window", "usercenterService", "$modal", "ModalService", "i18nNotifications", "security", "thirdpartyService", "$translate", "$timeout", function(a, b, c, d, e, f, g, h, i, j, k, l) {
		function m() {
			c.progress = "0", 1 == c.userinfo.checkEmail && 1 == c.userinfo.checkPhone && (c.redColor = !1, l(function() {
				c.progress = "90"
			}, 100)), 1 != c.userinfo.checkEmail && 1 != c.userinfo.checkPhone && (l(function() {
				c.progress = "20"
			}, 100), c.redColor = !0), (1 != c.userinfo.checkEmail && 1 == c.userinfo.checkPhone || 1 == c.userinfo.checkEmail && 1 != c.userinfo.checkPhone) && (c.redColor = !1, l(function() {
				c.progress = "60"
			}, 100))
		}

		function n(a) {
			a && (a.state && /WECHAT_STATE/.test(a.state) ? (s = {
				code: a.code,
				type: "weixin"
			}, j.bindAccountCommon(s)) : j.qqBindAccount(a))
		}
		c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.XdpageSize = 10, c.page = {}, c.pageChanged = function(a) {
			return 1 > a || a > c.branchesCount / 10 + 1 ? void alert("此页超出范围") : (c.currentPage = a, void c.getBranches(a))
		}, c.getBranches = function(a) {
			e.getBranches(c.XdpageSize, a).then(function(a) {
				a.data.success && (c.branches = a.data.list, c.branchesCount = a.data.map.count, c.page.currentPage = a.data.map.pageNo, c.toPage = a.data.map.pageNo, c.branchesNumPages = Math.ceil(c.branchesCount / c.XdpageSize), o())
			}, function() {})
		}, c.getBranches(c.pageNo), c.branchName = {};
		var o = function() {
			var d = a.search().branchid;
			if(d)
				for(var e = 0; e < c.branches.length; e++) c.branches[e].id == d && (c.branchName.name = c.branches[e].loginName);
			else b.branchid = "", a.search("branchid", null)
		};
		c.$watch("branchid", function(a, b) {
			a != b && o()
		}), c.changeCurrent = function() {
			b.branchid = "", a.search("branchid", null)
		}, c.selectBranch = function(c) {
			b.branchid = c.id, a.path("main"), a.search({
				branchid: b.branchid
			})
		}, c.$watch("userinfo", function(a) {
			a && m()
		});
		var p = /^EQS.*qq$/,
			q = /^EQS.*weixin$/;
		c.qqShow = !0, c.weixinShow = !0, p.test(i.currentUser.loginName) && (c.qqShow = !1), q.test(i.currentUser.loginName) && (c.weixinShow = !1);
		var r = null;
		c.goReset = function() {
			r = f.open({
				windowClass: "six-contain",
				templateUrl: BASE_URL + "templates/usercenter.tab.reset.tpl.html",
				controller: "UsercenterAccountCtrl",
				scope: c
			}).result.then(function() {
				r = null
			}, function() {
				r = null
			})
		}, c.checkOldPassword = function() {
			return c.password.old ? (c.oldPassError = "", !0) : (c.oldPassError = "原始密码不能为空", !1)
		}, c.checkPassword = function() {
			if(c.password.newPw) {
				if(/^[a-zA-Z0-9]{6,16}$/g.test(c.password.newPw)) return c.passError = "", !0;
				c.passError = "密码为6~16个字符(英文字母或数字，区分大小写)"
			} else c.passError = "新密码不能为空";
			return !1
		}, c.checkRepeatPassword = function() {
			if(c.password.confirm) {
				if(c.password.confirm == c.password.newPw) return c.rPassError = "", !0;
				c.rPassError = "两次密码输入不一致，请重新输入"
			} else c.rPassError = "确认密码不能为空";
			return !1
		}, c.reset = function() {
			if(c.checkOldPassword() && c.checkPassword() && c.checkRepeatPassword()) {
				if(angular.equals(c.master, c.password)) return void(c.authError = "请不要重复提交！");
				c.oldPassError = "", c.passError = "", c.rPassError = "", i.resetPassword(c.password.old, c.password.newPw).then(function(a) {
					a.data.success ? (h.pushForCurrentRoute("reset.psw.success", "notify.success"), c.master = angular.copy(c.password), c.$close(c.master)) : c.oldPassError = a.data.msg
				})
			}
		}, c.quXiao = function() {
			c.$dismiss()
		}, c.manageBranch = function(a) {
			var b = a;
			if(!a)
				if(3 == i.currentUser.memberType) {
					if(c.branchesCount >= 100) return void g.openMsgDialog({
						msg: "子账号数量已达到限制!"
					})
				} else if(2 == i.currentUser.memberType) {
				if(c.branchesCount >= 50) return void g.openMsgDialog({
					msg: "子账号数量已达到限制!"
				})
			} else if(c.branchesCount >= 30) return void g.openMsgDialog({
				msg: "子账号数量已达到限制!"
			});
			f.open({
				windowClass: "console six-contain branch-contain",
				templateUrl: BASE_URL+"templates/usercenter.console.branch.html",
				controller: "BranchCtrl",
				resolve: {
					branch: function() {
						return a
					}
				}
			}).result.then(function(d) {
				a || (a = {}), d.dept && (a.deptId = d.dept.id, a.deptName = d.dept.name), a.name = d.name, a.id = d.id, a.extPermi = d.extPermi, b ? c.branchesCount++ : (a.loginName = d.loginName, a.status = 1, a.regTime = (new Date).getTime(), c.branches.unshift(a), c.branches.length > 10 && c.branches.splice(c.branches.length - 1, 1)), c.$emit("addBranch", a)
			}, function() {})
		}, c.openBranch = function(a, b) {
			e.openBranch(a.id, b).then(function(c) {
				c.data.success && (b ? (a.status = 1, h.pushForCurrentRoute("branch.open.success", "notify.success")) : (a.status = 2, h.pushForCurrentRoute("branch.close.success", "notify.success")))
			}, function() {
				alert("服务器异常")
			})
		}, c.$on("rel.success", function(a, b) {
			h.pushForCurrentRoute("mail.rel.success", "notify.success"), "weixin" == b ? c.wxRel = !0 : "qq" == b && (c.qqRel = !0)
		}), c.$watch("currentPage.branchCurrentPage", function(a, b) {
			a != b && (c.getBranches(a), c.branchToPage = a)
		}), c.checkMobile = function(a) {
			f.open({
				windowClass: "six-contain mobile-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.checkMobile.html",
				controller: "CheckMobileCtrl",
				scope: c,
				resolve: {
					userinfo: function() {
						return {
							title: a,
							phone: c.userinfo.phone
						}
					}
				}
			}).result.then(function(a) {
				c.userinfo.phone = a, c.userinfo.checkPhone = 1
			}, function() {})
		}, c.createAccount = function() {
			c.emailAccount = !1, f.open({
				windowClass: "six-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.register.html",
				controller: "RelRegisterAccountCtrl",
				scope: c,
				resolve: {
					userinfo: function() {
						return {
							id: c.userinfo.id
						}
					}
				}
			}).result.then(function(b) {
				c.userinfo.noRel = null, c.userinfo.loginName = b.email, /qq/gi.test(b.type) && (c.qqRel = !0), /weixin/gi.test(b.type) && (c.wxRel = !0), /weibo/gi.test(b.type) && (c.wbRel = !0), a.search("bindemail", null)
			}, function() {
				a.search("bindemail", null)
			})
		}, c.relAccount = function(b) {
			c.emailAccount = !1, f.open({
				windowClass: "six-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.relAccount.html",
				controller: "RelAccountCtrl",
				scope: c,
				resolve: {
					userinfo: function() {
						return {
							id: c.userinfo.id
						}
					}
				}
			}).result.then(function(b) {
				c.userinfo.noRel = null, c.userinfo.loginName = b.email, /qq/gi.test(b.type) && (c.qqRel = !0), /weixin/gi.test(b.type) && (c.wxRel = !0), /weibo/gi.test(b.type) && (c.wbRel = !0), a.search("bindemail", null)
			}, function() {
				a.search("bindemail", null)
			})
		}, c.relEmail = function(a) {
			return c.userinfo.noRel ? (alert("请先绑定账号"), void c.createAccount()) : void f.open({
				windowClass: "six-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.relEmail.html",
				controller: "RelEmailCtrl",
				scope: c,
				resolve: {
					userinfo: function() {
						return {
							id: c.userinfo.id,
							email: c.userinfo.email,
							checkEmail: c.userinfo.checkEmail,
							title: a
						}
					}
				}
			}).result.then(function() {}, function() {})
		}, c.verifyEmail = function() {
			e.verifyEmail().then(function(a) {
				200 == a.data.code && g.openMsgDialog({
					msg: "申请绑定成功,已向您的邮箱发送验证邮件,请注意查收。"
				}, function() {})
			}, function(a) {})
		};
		c.bindThirdAccount = function(a) {
			return c.userinfo.noRel ? (alert("请先绑定账号"), void c.createAccount()) : void j.openThirtyPartyWindow(a)
		}, c.unbindRelation = function(a) {
			j.unbindRelation(a)
		}, c.$on("mail.unbind.success", function(a, b) {
			h.pushForCurrentRoute("mail.unbind.success", "notify.success"), "weixin" == b ? c.wxRel = !1 : "qq" == b && (c.qqRel = !1)
		});
		var s;
		d.setValue = function(a) {
			c.bindParam = a, n(c.bindParam), c.$apply()
		}, c.emailAccount = !1, c.upgradeCompany = function() {
			"eqs" == c.userinfo.loginName.substr(0, 3) && null == c.userinfo.email ? c.emailAccount = !0 : f.open({
				windowClass: "seven-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.upgrade_company.html",
				controller: "UsercenterupgradeCtrl",
				resolve: {
					user: function() {
						return {
							id: c.userinfo.id
						}
					}
				}
			}).result.then(function(a) {
				c.userinfo.phone = a, c.userinfo.checkPhone = 1, i.currentUser.type = 2
			}, function() {})
		}, c.companyMes = !0, c.$on("companyState", function() {
			c.companyInfo || (c.companyInfo = {}), c.companyMes = !1, c.userinfo.type = 2
		})
	}]);
angular.module("usercenter.apply", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.apply").controller("ApplyCtrl", ["$rootScope", "$scope", "usercenterService", "$modal", "ModalService", "i18nNotifications", "MineService", "userinfo", "$translate", "$timeout", function(a, b, c, d, e, f, g, h, j, l) {
		function m() {
			0 === B ? (b.isCodeAccessiable = !1, b.codeTip = "获取验证码", B = 60) : (b.isCodeAccessiable = !0, b.codeTip = "重新发送(" + B + ")", l(function() {
				B--, m()
			}, 1e3))
		}
		b.applyInfo = {}, b.applyInfo.nick = h.nick, b.invoiceStat = h.invoice, b.actionerror = "";
		b.serverLabel = [], b.cateLabel = [], b.payLabel = [];
		var n;
		b.applyXiuke = !0, b.title = h.title, 0 === h.status || 3 === h.status ? (n = 0, b.applyXiuke = !0) : (n = 1, b.applyXiuke = !1);
		var o = function(a) {
			c.getAPPlyMessage(a).then(function(c) {
				"province" === a ? (b.serverLabel = c.data.list, c.data.list.length > 0 && (b.moreArea = !0)) : "company_industry" === a ? (b.cateLabel = c.data.list, c.data.list.length > 0 && (b.moreLabel = !0)) : "payType" === a && (b.payLabel = c.data.list)
			})
		};
		o("province"), o("company_industry"), o("payType"), b.cancel = function() {
			b.$dismiss()
		}, b.cate_cancel = function(a) {
			for(var c = 0; c < b.cateLabel.length; c++)
				if(b.cateLabel[c].ischecked = !1, b.cateSelected.length > 0)
					for(var d = 0; d < b.cateSelected.length; d++) b.cateLabel[c].id === b.cateSelected[d].id && (b.cateLabel[c].ischecked = !0);
			b.cateError = "", setTimeout(function() {
				$(a.target).parents(".dropdown.open").trigger("click")
			})
		}, b.server_cancel = function(a) {
			for(i = 0; i < b.serverLabel.length; i++)
				if(b.serverLabel[i].ischecked = !1, b.serverSelected.length > 0)
					for(k = 0; k < b.serverSelected.length; k++) b.serverLabel[i].id === b.serverSelected[k].id && (b.serverLabel[i].ischecked = !0);
			setTimeout(function() {
				$(a.target).parents(".dropdown.open").trigger("click")
			}), b.serverError = ""
		}, b.scene_cancel = function(a) {
			for(i = 0; i < b.myShowScene.length; i++)
				if(b.myShowScene[i].ischecked = !1, b.sceneSelected.length > 0)
					for(k = 0; k < b.sceneSelected.length; k++) b.myShowScene[i].id === b.sceneSelected[k].id && (b.myShowScene[i].ischecked = !0);
			setTimeout(function() {
				$(a.target).parents(".dropdown.open").trigger("click")
			}), b.sceneError = ""
		}, b.checkIntroFormat = function(a) {
			return a.shortIntroduction ? countCharacters(a.shortIntroduction) > 30 ? (b.introError = "简短介绍不能超过30个字符", !1) : (b.introError = "", !0) : (b.introError = "请填写简短介绍", !1)
		}, b.checkIntroFormat1 = function(a) {
			return a.introduction ? countCharacters(a.introduction) > 400 ? (b.introError1 = "秀客介绍不能超过400个字符", !1) : (b.introError1 = "", !0) : (b.introError1 = "请填写秀客介绍", !1)
		}, c.getUserScene().then(function(a) {
			a.data.list.length > 0 ? b.myShowScene = a.data.list : b.myShowScene = null
		});
		var p = [];
		b.sceneSelected = [], b.sceneSelect = function(a, c, d) {
			return p = [], angular.forEach(b.myShowScene, function(a) {
				a.ischecked && p.push({
					code: a.code,
					name: a.name
				})
			}), 3 !== p.length ? (b.sceneError = "请选择三个代表作品", !1) : (b.sceneSelected = p, b.sceneNull = "", void(d && (setTimeout(function() {
				$(c.target).parents(".dropdown.open").trigger("click")
			}), b.sceneError = "")))
		};
		var q = function() {
				return 3 !== b.sceneSelected.length ? (b.sceneNull = "请选择三个代表作品", !1) : (b.sceneNull = "", !0)
			},
			r = [],
			s = [];
		b.serverSelected = [], b.serverSubmit = function(a, c, d) {
			return r = [], angular.forEach(b.serverLabel, function(a) {
				a.ischecked && r.push({
					name: a.name,
					id: a.id
				})
			}), r.length <= 0 ? void(b.serverError = "请选择服务地域") : r.length > 3 ? void(b.serverError = "服务地域不能超过3个") : (b.serverSelected = r, void(d && (setTimeout(function() {
				$(c.target).parents(".dropdown.open").trigger("click")
			}), b.serverError = "", b.serverNull = "")))
		};
		var t = function() {
				return b.serverSelected.length <= 0 || b.serverSelected.length > 3 ? (b.serverNull = "请选择1-3个服务地域", !1) : (b.serverNull = "", !0)
			},
			u = [],
			v = [];
		b.cateSelected = [], b.queren = function(a, c, d) {
			return u = [], angular.forEach(b.cateLabel, function(a) {
				a.ischecked && u.push({
					name: a.name,
					id: a.id
				})
			}), u.length <= 0 ? void(b.cateError = "请选择擅长领域") : u.length > 3 ? void(b.cateError = "擅长领域不能超过3个") : (b.cateSelected = u, b.cateNull = "", void(d && (setTimeout(function() {
				$(c.target).parents(".dropdown.open").trigger("click")
			}), b.cateError = "")))
		};
		var w = function() {
				return b.cateSelected.length <= 0 || b.cateSelected.length > 3 ? (b.cateNull = "请选择1-3个擅长领域", !1) : (b.cateNull = "", !0)
			},
			x = [],
			y = function() {
				x = [];
				var a = !1;
				return angular.forEach(b.payLabel, function(b) {
					b.ischecked && (x.push(b.id), a = !0)
				}), x = x.join(","), a ? (b.payError = "", !0) : (b.payError = "请选择支付方式", !1)
			},
			z = /^[0-9]*$/;
		b.checkQQFormat = function(a) {
			return a.qq && !z.test(a.qq) ? (b.qqError = "qq填写格式错误", !1) : a.qq ? (b.qqError = "", !0) : (b.qqError = "请填写QQ号码", !1)
		};
		var A = function(a) {
			return a.wechat ? (b.wechatError = "", !0) : (b.wechatError = "请填写微信号", !1)
		};
		b.checkEmailFormat = function(a) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			return a.email && !c.test(a.email) ? (b.emailError = "邮箱格式不正确", !1) : a.email ? (b.emailError = "", !0) : (b.emailError = "邮箱不能为空", !1)
		}, b.checkCode = function(a) {
			return a.code ? (b.codeError = "", !0) : (b.codeError = "请输入手机验证码", !1)
		}, b.getCode = function(a, d) {
			return a.phone ? (b.telError = "", void c.relMobileCode(a.phone, d).then(function(a) {
				a.data.success ? m() : b.telError = a.data.msg
			})) : (b.telError = "请填写手机号码", !1)
		};
		var B = 60;
		b.checkFormFormat = function(a) {
			return b.checkIntroFormat(a) && b.checkIntroFormat1(a) && q() && t() && w() && y() && b.checkQQFormat(a) && A(a) && b.checkEmailFormat(a) ? !0 : !1
		}, b.submit = function(a) {
			if(b.checkFormFormat(a)) {
				for(C && !C.checkPhone && 1 !== C.checkPhone && b.checkCode(a), s = [], v = [], k = 0; k < b.cateSelected.length; k++) v.push(b.cateSelected[k].id);
				for(_cateSelected2 = v.join(","), i = 0; i < b.serverSelected.length; i++) s.push(b.serverSelected[i].id);
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
					a.data.success ? (b.applyInfo = a.data.map.status, f.pushForCurrentRoute("visitor.apply", "notify.success"), b.$close(b.applyInfo)) : b.authError = a.data.msg
				})
			}
		}, b.checkFormFormat2 = function(a) {
			return b.checkIntroFormat(a) && b.checkIntroFormat1(a) && q() && t() && w() && y() && b.checkQQFormat(a) && A(a) && b.checkEmailFormat(a) ? !0 : !1
		}, b.reset = function(a) {
			if(b.sceneSelect(), b.serverSubmit(), b.queren(), b.checkFormFormat2(a)) {
				for(v = [], k = 0; k < b.cateSelected.length; k++) v.push(b.cateSelected[k].id);
				for(_cateSelected2 = v.join(","), s = [], i = 0; i < b.serverSelected.length; i++) s.push(b.serverSelected[i].id);
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
					a.data.success ? (f.pushForCurrentRoute("visitor.apply", "notify.success"), b.$close({
						applyInfoNew: d,
						status: a.data.map.status
					})) : b.authError = a.data.msg
				})
			}
		}, b.showPhone = !0;
		var C;
		0 !== h.status && l(function() {
			c.getVisitorMsg().then(function(a) {
				if(a.data.obj) {
					C = b.applyInfo = a.data.obj;
					var c = angular.copy(b.applyInfo.phone);
					C.checkPhone && 1 == C.checkPhone && (b.showPhone = !1, b.$watch("applyInfo.phone", function(a, d) {
						a && a !== c ? b.showPhone = !0 : b.showPhone = !1
					}));
					for(var d = C.represent1, e = d.substr(0, d.indexOf("_")), f = C.represent2, g = f.substr(0, f.indexOf("_")), h = C.represent3, i = h.substr(0, h.indexOf("_")), j = 0; j < b.myShowScene.length; j++)(b.myShowScene[j].code === e || b.myShowScene[j].code === g || b.myShowScene[j].code === i) && (b.myShowScene[j].ischecked = !0, b.sceneSelected.push(b.myShowScene[j]));
					var k = C.tagList;
					for(j = 0; j < k.length; j++) {
						for(var l = 0; l < b.serverLabel.length; l++) k[j].tagId === b.serverLabel[l].id && (b.serverLabel[l].ischecked = !0, b.serverSelected.push({
							name: k[j].name,
							id: k[j].tagId
						}));
						for(var m = 0; m < b.payLabel.length; m++) k[j].tagId === b.payLabel[m].id && (b.payLabel[m].ischecked = !0);
						for(var n = 0; n < b.cateLabel.length; n++) k[j].tagId === b.cateLabel[n].id && (b.cateLabel[n].ischecked = !0, b.cateSelected.push({
							name: k[j].name,
							id: k[j].tagId
						}))
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
angular.module("usercenter.branch", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.branch").controller("BranchCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "branch", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {
		b.originData = b.branch = angular.copy(j), b.dept = {}, b.depts = [], b.resetDefalt = !1, j ? b.resetDefalt = !0 : (b.resetDefalt = !1, setTimeout(function() {
			$("button").css("background-color", "#ccc")
		}, 0), b.branch = {}), b.openResetModal = function(a) {
			g.open({
				windowClass: "console six-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.resetbranchpass.tpl.html",
				controller: "ResetBranchPassCtrl",
				resolve: {
					branch: function() {
						return a
					}
				}
			}).result.then(function() {
				k.pushForCurrentRoute("branch.reset.success", "notify.success")
			}, function() {})
		}, b.getDepts = function() {
			e.getDepts(b.branch.id).then(function(a) {
				b.branchPermi.edit = a.data.company_ext[0]
				b.branchPermi.delete = a.data.company_ext[1]
				b.branchPermi.export = a.data.company_ext[2]
				console.log(b.branchPermi)
				if(b.depts = a.data.list, b.branch.deptName || b.branch.deptId)
					for(var c = 0; c < b.depts.length; c++)
						if(b.depts[c].id == b.branch.deptId) return void(b.branch.dept = b.depts[c])
			}, function() {
				//alert(l.instant("usercenter.account.SERVER_ERROR"))
			})
		}, b.getDepts(), b.authError = "", b.checkDeptFormat = function(a) {
			return a.name ? countCharacters(a.name) > 30 ? ($(".dept-name").addClass("error"), $(".dept-name").change(function() {
				$(this).removeClass("error")
			}), b.deptFormatError = l.instant("usercenter.account.DEPT_ERR2"), !1) : (b.deptFormatError = "", !0) : (b.deptFormatError = l.instant("usercenter.account.DEPT_ERR1"), $(".dept-name").focus(), deptF = {}, !1)
		}, b.addDept = function() {
			b.checkDeptFormat(b.dept) && e.addDept(b.dept).then(function(a) {
				a.data.success && (b.showAddSec = !1, b.depts.unshift({
					id: a.data.obj,
					name: b.dept.name
				}), k.pushForCurrentRoute("dept.create.success", "notify.success"), b.dept = {})
			}, function() {
				b.authError = l.instant("usercenter.account.SERVER_ERROR")
			})
		}, b.branchPermi = {
			edit: !0,
			"delete": !0,
			"export": !0
		}, b.branch.extPermi && (/^([\d,]+,)?1(,[\d,]*)?$/.test(b.branch.extPermi) && (b.branchPermi.edit = !0), /^([\d,]+,)?2(,[\d,]*)?$/.test(b.branch.extPermi) && (b.branchPermi["delete"] = !0), /^([\d,]+,)?3(,[\d,]*)?$/.test(b.branch.extPermi) && (b.branchPermi["export"] = !0)), b.checkEmailFormat = function(a) {
			return b.branch.loginName ? /^[-_a-z0-9\.@]{6,40}$/g.test(b.branch.loginName) ? (b.emailFormatError = "", !0) : (b.emailFormatError = l.instant("usercenter.account.BRANCH_ERR2"), !1) : (b.emailFormatError = l.instant("usercenter.account.BRANCH_ERR1"), !1)
		}, b.checkNameFormat = function(a) {
			return a.name ? countCharacters(a.name) > 30 ? (b.nameFormatErr = l.instant("usercenter.account.LOGIN_NAME_ERR2"), !1) : (b.nameFormatErr = "", !0) : ($(".branch-name").focus(), b.nameFormatErr = l.instant("usercenter.account.LOGIN_NAME_ERR1"), !1)
		}, b.confirm = function() {
			if(b.checkEmailFormat(b.branch) && b.checkNameFormat(b.branch)) {
				var a = {};
				b.branch.dept && (b.branch.deptName = b.branch.dept.name, b.branch.dept.id && (a.deptId = b.branch.deptId = b.branch.dept.id));
				var c = [];
				$.each(b.branchPermi, function(a, b) {
					"edit" == a && b ? c.push("1") : "export" == a && b ? c.push("3") : "delete" == a && b && c.push("2")
				}), b.branch.extPermi = c.join(","), j ? ($.extend(a, {
					id: b.branch.id,
					name: b.branch.name,
					extPermi: b.branch.extPermi
				}), e.updateBranch(a).then(function(a) {
					a.data.success && (b.$close(b.branch), k.pushForCurrentRoute("branch.update.success", "notify.success"))
				}, function(a) {
					b.serverError = l.instant("usercenter.account.SERVER_ERROR")
				})) : ($.extend(a, {
					loginName: b.branch.loginName,
					name: b.branch.name,
					extPermi: b.branch.extPermi
				}), e.createBranch(a).then(function(a) {
					a.data.success ? (b.branch.id = a.data.obj.id, k.pushForCurrentRoute("branch.create.success", "notify.success"), b.$close(b.branch)) : b.serverError = a.data.msg
				}, function(a) {
					b.serverError = l.instant("usercenter.account.SERVER_ERROR")
				}))
			}
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]);
angular.module("usercenter.branch.reset", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.branch.reset").controller("ResetBranchPassCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "branch", "i18nNotifications", function(a, b, c, d, e, f, g, h, i, j, k) {
		b.branch = j, b.reset = function() {
			e.resetBranchPass(j.id)
		}, b.cancel = function() {
			b.$dismiss()
		}, b.$on("reset.branch.success", function() {
			b.$close()
		})
	}]);
angular.module("usercenter.checkMobil", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.checkMobil").controller("CheckMobileCtrl", ["$rootScope", "$scope", "$window", "usercenterService", "$modal", "ModalService", "$location", "$timeout", "userinfo", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k) {
		function l() {
			0 === m ? (b.isCodeAccessiable = !1, b.codeTip = k.instant("usercenter.account.CODE_TIP1"), m = 60) : (b.isCodeAccessiable = !0, b.codeTip = k.instant("usercenter.account.CODE_TIP2") + "(" + m + ")", h(function() {
				m--, l()
			}, 1e3))
		}
		switch(b.title = i.title, b.userinfo = i, b.userinfo.code = "", b.title) {
			case k.instant("usercenter.account.REL_MOBILE"):
				b.dec = k.instant("usercenter.account.REL_MOBILE_DEC");
				break;
			case k.instant("usercenter.account.VALIDATE_MOBILE"):
				b.dec = k.instant("usercenter.account.VALIDATE_MOBILE_DEC");
				break;
			case k.instant("usercenter.account.CHANGE_MOBILE"):
				b.dec = k.instant("usercenter.account.CHANGE_MOBILE_DEC")
		}
		b.checkMobile = function() {
			return /^1\d{10}$/.test(b.userinfo.phone) ? (b.mobileError = "", !0) : ($(".mobile").focus(), b.mobileError = k.instant("usercenter.account.MOBILE_ERROR1"), !1)
		}, b.checkCode = function() {
			return b.userinfo.code ? (b.codeError = "", !0) : ($(".code").focus(), b.codeError = k.instant("usercenter.account.CODE_ERROR"), !1)
		}, b.getCode = function() {
			b.userinfo.phone ? (b.mobileError = "", d.relMobileCode(b.userinfo.phone).then(function(a) {
				a.data.success ? l() : b.relErr = a.data.msg
			})) : (b.mobileError = k.instant("usercenter.account.MOBILE_ERROR2"), $(".mobile").focus())
		};
		var m = 60;
		b.relAccount = function() {
			b.checkMobile() && b.checkCode() && (b.mobileError = "", b.codeError = "", d.relMobile(b.userinfo.phone, b.userinfo.password, b.userinfo.code).then(function(a) {
				a.data.success ? f.openMsgDialog({
					msg: a.data.msg
				}, function() {
					b.$close(b.userinfo.phone)
				}) : b.relErr = a.data.msg
			}))
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]);
angular.module("usercenter.companyinfo", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.companyinfo").controller("companyInfoCtrl", ["$scope", "$modal", "userinfo", "usercenterService", "i18nNotifications", function(a, b, c, d, e) {
		a.companyUserInfo = {}, a.designerUserInfo = {}, a.companyUserInfo.nick = c.nick, a.type = c.type, a.pid = {};
		var g = function() {
			d.getDesignerUserInfo().then(function(b) {
				a.designerUserInfo = b.data.obj;

			});
			d.getProvince().then(function(b) {
				a.provinces = b.data;
			})
		};
		var f = function() {
			d.getCompanyInfo().then(function(b) {
				a.companyUserInfo = b.data.obj
			})
		};
		a.getProvinceInfo = function(id, name) {
				a.pid = id;
				a.name = name;
				a.cities = [];
				console.log('a.pid ' + a.pid + '11111');
				if(a.pid == undefined) {
					a.cities = [];
					a.designerUserInfo.proid = '';
					a.designerUserInfo.proname = '';
				} else {
					a.designerUserInfo.proid = a.pid;
					a.designerUserInfo.proname = a.name;
					var url = PREFIX_URL + "index.php?c=Designer&a=getcity&pid=" + a.pid;
					$.get(url, function(data) {
						data = JSON.parse(data);
						a.cities = data;
						a.$apply();
						console.log(a.cities);
					});
				}
			},
			a.getCityInfo = function(id, name) {
				a.designerUserInfo.cityid = id;
				a.designerUserInfo.cityname = name;
				console.log('a.cid ' + id);
				console.log('a.name ' + name);
			},
			a.clearProvinceInfo = function() {
				a.$apply(
					function() {
						a.designerUserInfo.proid = '';
						a.designerUserInfo.proname = '';
					});
			},
			a.clearCityInfo = function() {
				a.$apply(
					function() {
						a.designerUserInfo.cityid = '';
						a.designerUserInfo.cityname = '';
					});
			},
			a.checkEmail = function(b) {
				var c = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				return b.email && !c.test(b.email) ? (a.authError = "请正确填写邮箱", !1) : (a.authError = "", !0)
			}, 2 == a.type && (f(), a.title = "企业会员基本信息"), 1 == a.type || 12 == a.type && (a.title = "个人用户基本信息"), 3 == a.type && (a.title = "高级用户基本信息"), 22 == a.type && (g(), a.title = "设计师基本信息"), a.saveUserInfo = function(b) {
				b.id = c.id, d.saveUserInfo(b).then(function(c) {
					c.data.success && (a.$close(b), e.pushForCurrentRoute("save.success", "notify.success"))
				})
			}, a.saveCompanyInfo = function(b) {
				return a.checkEmail(b) ? (b.nick = a.companyUserInfo.nick, void d.saveCompanyInfo(b).then(function(c) {
					c.data.success ? (e.pushForCurrentRoute("account.success", "notify.success"), a.$close(b)) : a.codeError = c.data.msg
				})) : !1
			}, a.saveDesignerInfo = function(b) {
				return a.checkEmail(b) ? (b.nick = a.designerUserInfo.nick, void d.saveDesignerInfo(b).then(function(c) {
					c.data.success ? (e.pushForCurrentRoute("account.success", "notify.success"), a.$close(b)) : a.codeError = c.data.msg
				})) : !1;
			}, a.cancel = function() {
				a.$close()
			}, a.invoice = function() {
				b.open({
					windowClass: "six-contain",
					templateUrl: BASE_URL + "templates/usercenter.console.invoice.tpl.html",
					controller: "InvoiceCtrl",
					scope: a,
					resolve: {
						userinfo: function() {
							return {}
						}
					}
				}).result.then(function(a) {}, function() {})
			}
	}]);
angular.module("usercenter.invoice", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.invoice").controller("InvoiceCtrl", ["$scope", "usercenterService", "$modal", "i18nNotifications", "userinfo", function(a, b, c, d, e) {
		a.invoiceStatus = "", a.changeType = function(b) {
			a.invoiceStatus = b
		}, a.editInfo = {
			isEditable: !0
		}, e.view && (a.view = e.view, a.editInfo.isEditable = !1, e.orderIds = e.orderIds.join(","));
		var f = [];
		a.authError = "", a.picture = {}, a.invoice = {
			receiver: "",
			phone: "",
			address: ""
		}, a.reset = function() {
			a.editInfo.isEditable = !0
		}, a.invoiceListPu = {
			invoiceType: 1
		}, a.invoiceListzhuan = {
			invoiceType: 2
		};
		var g = function() {
			b.getUserInvoice().then(function(b) {
				if(200 == b.data.code) {
					b.data.obj && (a.invoice = b.data.obj), b.data.map.invoiceType ? a.invoiceStatus = b.data.map.invoiceType : a.invoiceStatus = 1;
					for(var c = b.data.list, d = 0; d < c.length; d++) 1 == c[d].invoiceType && (a.invoiceListPu = c[0]), 2 == c[d].invoiceType && (a.invoiceListzhuan = c[1], f = c[1].licenseImgsJson.split(","), a.picture = {
						tax: f[0],
						bank: f[1],
						people: f[2],
						mes: f[3]
					})
				}
			})
		};
		g(), a.addPictures = function(b) {
			c.open({
				windowClass: "console img_console",
				templateUrl: BASE_URL + "templates/scene.console.bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1,
							count: 1
						}
					}
				}
			}).result.then(function(c) {
				"tax" == b ? a.picture.tax = c.data : "bank" == b ? a.picture.bank = c.data : "people" == b ? a.picture.people = c.data : "mes" == b && (a.picture.mes = c.data), d.pushForCurrentRoute("upload.success", "notify.success")
			})
		};
		var h = function() {
			return a.picture.tax ? a.picture.bank ? a.picture.people ? a.picture.mes ? !0 : (a.authError = "请上传开票信息加盖公章", !1) : (a.authError = "请上传一般纳税人资质证明", !1) : (a.authError = "请上传银行许可证", !1) : (a.authError = "请上传税务登记证", !1)
		};
		a.submit = function(c) {
			if(!a.invoice.receiver) return void(a.authError = "请填写收件人");
			if(!a.invoice.phone) return void(a.authError = "请填写联系电话");
			if(!a.invoice.address) return void(a.authError = "请填写收货地址");
			var c = {
				orderIds: e.orderIds,
				receiver: a.invoice.receiver,
				address: a.invoice.address,
				phone: a.invoice.phone
			};
			if(1 == a.invoiceStatus && (c.invoiceType = 1, c.title = a.invoiceListPu.title), 2 == a.invoiceStatus) {
				if(!h()) return !1;
				c.invoiceType = 2, c.title = a.invoiceListzhuan.title, c.licenseImgsJson = a.picture.tax + "," + a.picture.bank + "," + a.picture.people + "," + a.picture.mes
			}
			3 == a.invoiceStatus && (c.invoiceType = 3), b.saveOrderInvoice(c).then(function(b) {
				b.data.success && (a.$close(c), d.pushForCurrentRoute("save.success", "notify.success"))
			})
		}, a.saveUserInvoice = function(c) {
			if(!a.invoice.receiver) return void(a.authError = "请填写收件人");
			if(!a.invoice.phone) return void(a.authError = "请填写联系电话");
			if(!a.invoice.address) return void(a.authError = "请填写收货地址");
			var c = {};
			if(c.invoiceDeliver = {
					receiver: a.invoice.receiver,
					address: a.invoice.address,
					phone: a.invoice.phone
				}, c.invoiceList = [], a.invoiceListPu.title && c.invoiceList.push({
					invoiceType: a.invoiceListPu.invoiceType,
					title: a.invoiceListPu.title
				}), a.invoiceListzhuan.title) {
				if(!a.picture.tax) return void(a.authError = "请上传税务登记证");
				if(!a.picture.bank) return void(a.authError = "请上传银行许可证");
				if(!a.picture.people) return void(a.authError = "请上传一般纳税人资质证明");
				if(!a.picture.mes) return void(a.authError = "请上传开票信息加盖公章");
				var f = {
					invoiceType: a.invoiceListzhuan.invoiceType,
					title: a.invoiceListzhuan.title,
					licenseImgsJson: a.picture.tax + "," + a.picture.bank + "," + a.picture.people + "," + a.picture.mes
				};
				c.invoiceList.push(f)
			}
			b.saveUserInvoice(c).then(function(b) {
				b.data.success && (e.view ? a.editInfo.isEditable = !1 : a.$close(c), d.pushForCurrentRoute("save.success", "notify.success"))
			})
		}, a.cancel = function() {
			a.$close()
		}
	}]);
angular.module("usercenter.invoicelist", []).controller("GetInvoiceListCtrl", ["$scope", "usercenterService", "$modal", "ModalService", function(a, b, c, d) {
	a.pageNo = 1, a.pageSize = 5, a.obj = {};
	var e = [],
		f = function(a, c) {
			b.getInvoiceList(a, c)
		};
	f(1, 5), a.$on("get.invoice.list", function(b, c) {
		a.invoiceList = c.list || [];
		for(var d = 0; d < c.list.length; d++) a.invoiceList[d].totalFee = a.invoiceList[d].totalFee / 100, 0 == c.list[d].payType ? a.invoiceList[d].payType = "微信支付" : 1 == c.list[d].payType && (a.invoiceList[d].payType = "支付宝支付");
		a.totalItems = c.map.count, a.currentPage = a.obj.toPage = c.map.pageNo
	}), a.pageChanged = function(c) {
		b.getInvoiceList(c, a.pageSize)
	}, a.cancel = function() {
		a.$dismiss()
	}, a.view = !0, a.ok = function() {
		var b = angular.copy(e);
		e = [], b.length > 0 ? c.open({
			windowClass: "six-contain",
			templateUrl: BASE_URL + "templates/usercenter.console.invoice.tpl.html",
			controller: "InvoiceCtrl",
			scope: a,
			resolve: {
				userinfo: function() {
					return {
						view: a.view,
						orderIds: b
					}
				}
			}
		}).result.then(function(b) {
			f(1, 5), a.switchSelectAll()
		}, function() {}) : d.openMsgDialog({
			msg: "请选择需要开发票的订单列表",
			btn: "去选择"
		}, function() {})
	}, a.switchSelectAll = function(b) {
		e = [], b ? $.each(a.invoiceList, function(a, b) {
			e.push(b.id), b.selected = !0
		}) : $.each(a.invoiceList, function(a, b) {
			b.selected = !1
		})
	}, a.switchSelect = function(a) {
		a.selected ? e.push(a.id) : $.each(e, function(b, c) {
			c == a.id && e.splice(b, 1)
		})
	}
}]);
angular.module("usercenter.member", []),
	angular.module("usercenter.member").controller("MemberCtrl", ["$scope", "$modal", "usercenterService", "ModalService", function(a, b, c, d) {
		a.pageNo = 1, a.pageSize = 10, a.setUserInfo = function() {
			if(1 == a.currentUser.type || 12 == a.currentUser.type) a.userType = "个人用户";
			else if(2 == a.currentUser.type ? a.upgradeInfo = "已升级" : a.upgradeInfo = "免费升级", 3 == a.currentUser.type) a.userType = "高级用户";
			else if(21 == a.currentUser.type) a.userType = "企业子用户";
			else if(4 == a.currentUser.type) a.userType = "服务商用户";
			else if(23 == a.currentUser.type) a.userType = "企业免费用户";
			else if(a.userType = "企业用户", a.currentUser.memberType) {
				if(a.currentUser.expiryTime) {
					var b = (new Date).getTime();
					a.currentUser.expiryTime <= b && (a.currentUser.memberType = null)
				}
				1 == a.currentUser.memberType ? a.userPay = "(体验版)" : 2 == a.currentUser.memberType ? a.userPay = "(高级版)" : 3 == a.currentUser.memberType ? a.userPay = "(专业版)" : 4 == a.currentUser.memberType && (a.userPay = "(畅享版)")
			} else a.userPay = ""
		}, a.setUserInfo(), a.memberPrivileges = ["拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传"], a.getXdLog = function(b, d) {
			a.xdType = b, a.currentPage = d, c.getXdlog(b, d, a.pageSize).then(function(b) {
				if(b.data.success) {
					a.xdLogs = b.data.list;
					for(var c = 0; c < a.xdLogs.length; c++) 2 == a.xdLogs[c].type ? a.xdLogs[c].xd = "-" + a.xdLogs[c].xd : a.xdLogs[c].xd = "+" + a.xdLogs[c].xd;
					a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.toPage = b.data.map.pageNo, a.numPages = Math.ceil(a.totalItems / a.pageSize)
				}
			})
		}, a.getXdLog(null, 1), a.pageChanged = function(b, c) {
			return 1 > c || c > a.numPages && 1 != c ? void alert("此页超出范围") : (a.currentPage = c, a.toPage = c, void a.getXdLog(b, c))
		}, a.getXdStatNum = function() {
			c.getXdStat().then(function(b) {
				a.getXdStat = b.data.map
			})
		}, a.getXdStatNum(), a.transferXd = function() {
			b.open({
				windowClass: "six-contain",
				templateUrl: BASE_URL + "templates/usercenter.transfer.tpl.html",
				controller: "UsercentertransferCtrl",
				resolve: {
					username: function() {
						return a.userinfo.loginName
					}
				}
			}).result.then(function() {
				a.getUserXd(), a.getXdlog(), a.getXdStatNum()
			}, function() {})
		}, a.openInvoice = function() {
			a.openInvoiceListModal()
		}, a.openInvoiceListModal = function() {
			b.open({
				windowClass: "console seven-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.invoice-list.html",
				controller: "GetInvoiceListCtrl"
			}).result.then(function() {}, function() {})
		}
	}]).controller("PayMentCtrl", ["$modal", "$scope", "qrCodeUrl", "type", "money", "usercenterService", "method", function(a, b, c, d, e, f, g) {
		b.qrCodeUrl = c, b.money = e, b.type = d, b.paymented = function() {
			b.$close()
		}, b.cancel = function() {
			b.$dismiss()
		}, b.getWeChatUrl = function() {
			b.wechatUrl || ("member" == g ? f.getCompanyQrCode(d, 0).then(function(a) {
				a.data.success && (b.wechatUrl = a.data.obj)
			}) : f.getPayXdQrCode(d, 0).then(function(a) {
				a.data.success && (b.wechatUrl = a.data.obj)
			}))
		}
	}]);
angular.module("usercenter.privilege", []),
	angular.module("usercenter.privilege").controller("PrivilegeCtrl", ["$location", "usercenterService", "$scope", "$modal", "security", "ModalService", function(a, b, c, d, e, f) {
		c.tabid = "corporateMember", c.$watch(function() {
			return e.currentUser
		}, function(a) {
			a && (c.currentUser = a, c.changeMemberType())
		}, !0), c.changeMemberType = function() {
			if(c.currentUser && c.currentUser.expiryTime) {
				var a = (new Date).getTime();
				c.currentUser.expiryTime <= a && (c.currentUser.memberType = null)
			}
		}, c.changeMemberType(), c.upgradeAccount = function(a, b) {
			return 1 != c.currentUser.type || c.companyInfo && 0 === c.companyInfo.status ? 1 == c.currentUser.type && c.companyInfo ? void f.openMsgDialog({
				msg: "您不是企业会员,请先申请企业会员后再进行升级！"
			}) : 2 != c.currentUser.type ? void f.openMsgDialog({
				msg: "尊敬的用户，您当前账号类型无法升级为企业用户！"
			}) : void d.open({
				windowClass: "console",
				templateUrl: BASE_URL + "templates/usercenter.upgrade.tpl.html",
				controller: "UpgradeCtrl",
				resolve: {
					type: function() {
						return a
					},
					isRenew: function() {
						return b
					}
				}
			}).result.then(function() {}, function() {}) : void("eqs" == c.currentUser.loginName.substr(0, 3) && null == c.currentUser.email ? f.openMsgDialog({
				msg: "第三方账号请先关联账号"
			}) : f.openMsgDialog({
				msg: "尊敬的用户，请您先申请免费企业用户，通过审核后再次升级",
				btn: "我知道了"
			}, function() {
				d.open({
					windowClass: "seven-contain",
					templateUrl: BASE_URL + "templates/usercenter.console.upgrade_company.tpl.html",
					controller: "UsercenterupgradeCtrl",
					resolve: {
						user: function() {
							return {
								id: c.user.id
							}
						}
					}
				}).result.then(function() {}, function() {})
			}, function() {}))
		}, c.cancel = function() {
			c.$close()
		}, c.upgradeCompany = function() {
			d.open({
				windowClass: "seven-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.upgrade_company.tpl.html",
				controller: "UsercenterupgradeCtrl",
				resolve: {
					user: function() {
						return {
							id: c.user.id
						}
					}
				}
			}).result.then(function() {}, function() {})
		}
	}]).controller("UpgradeCtrl", ["$modal", "$scope", "type", "usercenterService", "ModalService", "security", "$location", "isRenew", function(a, b, c, d, e, f, g, h) {
		b.confirm = function() {
			d.getCompanyQrCode(c, 1).then(function(g) {
				b.$close();
				var i, j;
				if(1 == c ? (i = h ? ["99元", "450元"] : ["99元", "499元"], j = [{
						name: "30天",
						value: 1
					}, {
						name: "180天",
						value: 6
					}]) : 2 == c ? h ? (i = ["450元", "800元"], j = [{
						name: "180天",
						value: 1
					}, {
						name: "365天",
						value: 2
					}]) : (i = ["499元", "900元"], j = [{
						name: "180天",
						value: 1
					}, {
						name: "365天",
						value: 2
					}]) : 3 == c ? h ? (i = ["1.6万", "3万"], j = [{
						name: "1年",
						value: 1
					}, {
						name: "2年",
						value: 2
					}]) : (i = ["1.9万", "3.2万"], j = [{
						name: "1年",
						value: 1
					}, {
						name: "2年",
						value: 2
					}]) : h ? (i = ["1800元", "3200元"], j = [{
						name: "1年",
						value: 1
					}, {
						name: "2年",
						value: 2
					}]) : (i = ["1999元", "3600元"], j = [{
						name: "1年",
						value: 1
					}, {
						name: "2年",
						value: 2
					}]), g.data.success) {
					var k = g.data.obj;
					a.open({
						windowClass: "console",
						templateUrl: BASE_URL + "templates/usercenter.payment.tpl.html",
						controller: "PayMentCtrl",
						resolve: {
							qrCodeUrl: function() {
								return k
							},
							type: function() {
								return c
							},
							money: function() {
								return i
							},
							method: function() {
								return "member"
							},
							counts: function() {
								return j
							}
						},
						size: "lg"
					}).result.then(function() {
						d.getUserInfo().then(function(a) {
							a.data.success && (f.currentUser = a.data.obj)
						}), e.openMsgDialog({
							msg: "因网络原因，部分用户开通会有延迟",
							btn: "确定"
						}, function() {
							b.openInvoice()
						})
					}, function() {})
				} else e.openMsgDialog({
					msg: g.data.msg
				})
			})
		}, b.openInvoice = function() {
			e.openConfirmDialog({
				msg: "是否开具发票？",
				confirmName: "是",
				cancelName: "否"
			}, function() {
				b.openInvoiceListModal()
			}, function() {
				g.path("/privilege")
			})
		}, b.openInvoiceListModal = function() {
			a.open({
				windowClass: "console seven-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.invoice-list.tpl.html",
				controller: "GetInvoiceListCtrl"
			}).result.then(function() {}, function() {})
		}, b.cancel = function() {
			b.$close()
		}
	}]).controller("PayMentCtrl", ["$modal", "$scope", "qrCodeUrl", "type", "money", "usercenterService", "method", "counts", function(a, b, c, d, e, f, g, h) {
		b.qrCodeUrl = c, b.money = e[0], b.type = d, b.counts = h, b.payWay = "alipay", h && h.length > 0 && (b.curentCount = h[0].value);
		var i = {};
		i["alipay1" + b.curentCount] = c, b.paymented = function() {
			b.$close()
		}, b.cancel = function() {
			b.$dismiss()
		}, b.getWeChatUrl = function(a) {
			b.payWay = a;
			var c = 1;
			return "wechat" == b.payWay && (c = 0), i[b.payWay + "" + c + b.curentCount] ? void(b.qrCodeUrl = i[b.payWay + "" + c + b.curentCount]) : void("member" == g ? f.getCompanyQrCode(d, c, b.curentCount).then(function(a) {
				a.data.success && (i[b.payWay + "" + c + b.curentCount] = a.data.obj, b.qrCodeUrl = a.data.obj)
			}) : f.getPayXdQrCode(d, c).then(function(a) {
				a.data.success && (i[b.payWay + "" + c + b.curentCount] = a.data.obj, b.qrCodeUrl = a.data.obj)
			}))
		}, b.setCount = function(a, c) {
			b.curentCount = a, b.money = e[c];
			var g = 1;
			if("wechat" == b.payWay && (g = 0), i[b.payWay + "" + g + b.curentCount]) return void(b.qrCodeUrl = i[b.payWay + "" + g + b.curentCount]);
			var h = d,
				j = a;
			1 == d && 6 == a && (h = 2, j = 1), f.getCompanyQrCode(h, g, j).then(function(a) {
				a.data.success && (i[b.payWay + "" + g + b.curentCount] = a.data.obj, b.qrCodeUrl = a.data.obj)
			})
		}
	}]);
angular.module("usercenter.relAccount", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.relAccount").controller("RelAccountCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {
		b.user = j, b.bindAccount = function() {
			return b.user.email ? b.user.password ? void e.relAccount(j.id, b.user.email, b.user.password).then(function(a) {
				if(200 == a.data.code) {
					k.pushForCurrentRoute("email.save.success", "notify.success"), /qq/gi.test(b.user.loginName) && (b.relType = "qq"), /weixin/gi.test(b.user.loginName) && (b.relType = "weixin"), /weibo/gi.test(b.user.loginName) && (b.relType = "weibo");
					var c = {
						type: b.relType,
						email: angular.copy(b.user.email)
					};
					b.$close(c)
				} else b.relErr = a.data.msg
			}, function(a) {
				b.$dismiss()
			}) : (b.relErr = l.instant("usercenter.account.PASSWORD_ERROR"), void $(".third-pwd").focus()) : (b.relErr = l.instant("usercenter.account.ACCOUNT_ERROR"), void $(".third-name").focus())
		}, b.checkUpperCase = function() {
			/[A-Z]/g.test(b.user.email) && (b.user.email = b.user.email.toLowerCase(), b.relErr = l.instant("usercenter.account.EMAIL_TIP"))
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]);
angular.module("usercenter.relEmail", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.relEmail").controller("RelEmailCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {
	switch(b.title = j.title, b.userinfo = j, b.title) {
		case l.instant("usercenter.account.REL_EMAIL"):
			b.dec = l.instant("usercenter.account.REL_EMAIL_DESC");
			break;
		case l.instant("usercenter.account.VALIDATE_EMAIL"):
			b.dec = l.instant("usercenter.account.VALIDATE_EMAIL_DESC");
			break;
		case l.instant("usercenter.account.CHANGE_EMAIL"):
			b.dec = l.instant("usercenter.account.CHANGE_EMAIL")
	}
	b.checkEmailFormat = function(a) {
		var c = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		return c.test(b.userinfo.email) ? (b.emailFormatErr = "", !0) : (b.emailFormatErr = l.instant("usercenter.account.REL_EMAIL_TIP"), !1)
	}, b.checkPassFormat = function(a) {
		return a.password ? (b.passFormatErr = "", !0) : (b.passFormatErr = l.instant("usercenter.account.PASSWORD_ERROR"), $(".email-pwd").focus(), !1)
	}, b.relEmail = function(a) {
		b.checkEmailFormat(a) && b.checkPassFormat(a) && (null == b.userinfo.checkEmail ? b.firstRel = !1 : b.firstRel = !0, e.relEmail(b.userinfo.email, b.userinfo.password, b.firstRel).then(function(a) {
			200 == a.data.code ? (b.relErr = "", h.openMsgDialog({
				msg: "申请绑定成功,已向您的邮箱发送验证邮件,请注意查收。"
			}, function() {
				b.$dismiss()
			})) : (b.firstRel = !0, b.relErr = a.data.msg)
		}, function(a) {}))
	}, b.checkUpperCase = function() {
		/[A-Z]/g.test(b.userinfo.email) && (b.userinfo.email = b.userinfo.email.toLowerCase(), b.relErr = l.instant("usercenter.account.EMAIL_TIP"))
	}, b.cancel = function() {
		b.$dismiss()
	}
}]);
angular.module("usercenter.relRegisterAccount", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.relRegisterAccount").controller("RelRegisterAccountCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo", "i18nNotifications", "localizedMessages", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
		b.user = j, b.user.agreement = !0;
		var n = !1;
		b.cancel = function() {
			b.$dismiss("cancel")
		}, b.registerAccount = function() {
			if(b.userNotExist && b.checkUsername() && b.checkPassword() && b.checkRepeatPassword())
				if(b.user.password === b.user.repeatPassword && b.user.agreement) {
					if(n) return;
					n = !0, e.relAccount(j.id, b.user.email, b.user.password, !0).then(function(a) {
						if(n = !1, 200 == a.data.code) {
							k.pushForCurrentRoute("email.save.success", "notify.success"), /qq/gi.test(b.user.loginName) && (b.relType = "qq"), /weixin/gi.test(b.user.loginName) && (b.relType = "weixin"), /weibo/gi.test(b.user.loginName) && (b.relType = "weibo");
							var c = {
								type: b.relType,
								email: angular.copy(b.user.email)
							};
							b.$close(c)
						} else b.relErr = a.data.msg
					}, function(a) {
						n = !1, b.regErr = l.get("register.error.serverError", {
							exception: x
						}), b.$dismiss()
					})
				} else b.user.password != b.user.repeatPassword ? b.regErr = l.get("register.error.match") : b.regErr = l.get("register.error.agreement")
		}, b.checkUsername = function() {
			if(b.user.email) {
				if(/^[-_a-z0-9\.@]{6,40}$/g.test(b.user.email)) return b.checkUniqueness(b.user.email), !0;
				b.usernameError = m.instant("usercenter.account.REG_ACCOUNT_ERR2")
			} else b.usernameError = m.instant("usercenter.account.REG_ACCOUNT_ERR1");
			return !1
		}, b.checkUniqueness = function(a) {
			f.checkUniqueness(a).success(function(a) {
				b.userNotExist = a.success, b.userNotExist ? b.usernameError = null : b.usernameError = m.instant("usercenter.account.REG_ACCOUNT_ERR3")
			})
		}, b.checkPassword = function() {
			if(b.user.password) {
				if(/^[a-zA-Z0-9]{6,16}$/g.test(b.user.password)) return b.passError = null, !0;
				b.passError = m.instant("usercenter.account.REG_PWD_ERR2")
			} else b.passError = m.instant("usercenter.account.REG_PWD_ERR1");
			return !1
		}, b.checkRepeatPassword = function() {
			if(b.user.repeatPassword) {
				if(b.user.repeatPassword == b.user.password) return b.rPassError = "", !0;
				b.rPassError = m.instant("usercenter.account.REG_PWD_ERR4")
			} else b.rPassError = m.instant("usercenter.account.REG_PWD_ERR3");
			return !1
		}
	}]);
angular.module("usercenter.request", ["services.usercenter", "app.directives.qrcode"]),
	angular.module("usercenter.request").controller("UsercenterrequestCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", function(a, b, c, d, e, f, g, h, i) {
		b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.currentUser = f.currentUser, b.cancel = function() {
			b.$dismiss()
		}
	}]);
angular.module("usercenter.tab", ["usercenter.account", "usercenter.member", "usercenter.trash", "usercenter.apply", "usercenter.companyinfo", "usercenter.invoice", "usercenter.invoicelist"]);
 angular.module("usercenter.tab.server", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.tab.server").controller("ServerTabCtrl", ["$scope", "$rootScope", "usercenterService", "$translate", function(a, b, c, d) {
	a.showController = {}, a.goStep = function(b) {
		a.step = b
	}, a.bindDomain = function() {
		a.showController.agreeBind = !0
	}, a.reApply = function() {
		a.isShowBindPanel = !0, a.showController.agreeBind = !1
	};
	var e = function() {
			c.getDomain().then(function(b) {
				if (b.data.success) if (a.domainInfo = b.data.obj, a.model.day = b.data.obj.typeList[0], b.data.obj.id) {
					a.isShowBindPanel = !1, a.domainInfo.ipAddress = "202.173.11.90";
					var c = a.status = b.data.obj.status;
					1 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS1"), a.unbind = !1, a.domainInfo.restTime = Math.floor((a.domainInfo.endDate - a.domainInfo.startDate) / 864e5)) : 2 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS2"), a.unbind = !1) : 3 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS3"), a.unbind = !0) : 4 === c ? a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS4") : (new Date).getTime() > b.data.obj.endDate && (a.status = 5, a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS5"), a.unbind = !0)
				} else a.isShowBindPanel = !0
			})
		};
	e(), a.model || (a.model = {});
	var f = a.model;
	a.checkDomainFormat = function(b) {
		return b.url ? (a.domainFormatErr = "", !0) : (a.domainFormatErr = d.instant("usercenter.server.WRITE_DNS"), !1)
	}, a.checkDayFormat = function(b) {
		return b.day ? (a.dayFormatErr = "", !0) : (a.dayFormatErr = d.instant("usercenter.server.WRITE_DATE"), !1)
	}, a.checkAppIdAndSecret = function(b) {
		return b.appId && !b.secretId ? (a.appIdFormatErr = d.instant("usercenter.serverWRITE_APPSECRET"), !1) : !b.appId && b.secretId ? (a.appSecretErr = d.instant("usercenter.server.WRITE_APPID"), !1) : (a.appIdFormatErr = "", a.appSecretErr = "", !0)
	}, a.submit = function() {
		if (a.checkDomainFormat(f) && a.checkDayFormat(f) && a.checkAppIdAndSecret(f)) if (a.cost = f.day.label, a.xdCounts >= parseInt(a.cost, 10)) {
			var b = {
				url: f.url,
				buyTime: f.day.value,
				appId: f.appId,
				secretId: f.secretId
			};
			c.bindDomain(b).then(function(b) {
				b.data.success ? (alert(d.instant("usercenter.server.DNS_COMMIT")), a.status = 2, a.isShowBindPanel = !1, a.domainInfo.ipAddress = "202.173.11.90", a.domainInfo.url = f.url) : a.actionerror = b.data.msg
			}, function() {
				alert(d.instant("usercenter.server.SERVER_ERROR"))
			})
		} else a.xiudian = !0
	}
}]);
angular.module("usercenter.transfer", ["services.usercenter"]),
	angular.module("usercenter.transfer").controller("UsercentertransferCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "username", "$translate", function(a, b, c, d, e, f, g, h, i, j, k) {
		b.transfer = !0, b.userXd = {
			toUser: "",
			xdCount: ""
		}, b.submit = !1, b.getUserXd = function() {
			e.getUserXd().then(function(a) {
				a.data.success && (b.xdCount = a.data.obj)
			})
		}, b.getUserXd(), b.confirm = function() {
			b.submit = !0, b.getgiveXd()
		}, b.checkEmailFormat = function(a) {
			return a.toUser ? a.toUser == j ? (b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR2"), $(".username").addClass("error"), !1) : (b.mailFormatErr = "", !0) : (b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR1"), $(".username").focus(), !1)
		}, b.checkXdFormat = function(a) {
			return /^\+?[1-9][0-9]*$/.test(a.xdCount) ? b.userXd.xdCount > b.xdCount ? (b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR2"), !1) : (b.xdFormatErr = "", !0) : (b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR1"), !1)
		}, b.getgiveXd = function() {
			b.checkEmailFormat(b.userXd) && b.checkXdFormat(b.userXd) && e.getgiveXd(b.userXd).then(function(a) {
				200 == a.data.code ? b.$close() : 1003 == a.data.code ? b.mailFormatErr = a.data.msg : 1010 == a.data.code && (b.xdFormatErr = a.data.msg)
			})
		}, b.cancel = function() {
			b.$close()
		}
	}]);
angular.module("usercenter.trash", []),
	angular.module("usercenter.trash").controller("TrashCtrl", ["$location", "$rootScope", "$scope", "usercenterService", "ModalService", "$translate", "fileService", "MineService", "sceneService", "dataCacheService", function(a, b, c, d, e, f, g, h, i, j) {
		c.PREFIX_CLIENT_HOST = PREFIX_HOST;
		var k = b.branchid;
		c.scene = {
			type: null
		}, c.pageSize = 12, c.sceneCurrent = {
			page: "",
			total: ""
		}, c.imageCurrent = {
			page: "",
			total: ""
		}, c.historyTab = {
			page: {}
		};
		var l = function(a) {
			c.sceneHistory = a, "scene" == a ? c.historyTab = {
				pages: {
					currentPage: c.sceneCurrent.page,
					totalItems: c.sceneCurrent.total,
					pageSize: 12
				}
			} : c.historyTab = {
				pages: {
					currentPage: c.imageCurrent.page,
					totalItems: c.imageCurrent.total,
					pageSize: 21
				}
			}
		};
		c.getMyScenes = function(a, b) {
			c.sceneHistory = b, h.getMyHistoryScenes(a, c.pageSize, k).then(function(a) {
				if(a.data.list && a.data.list.length > 0) {
					c.myScenes = a.data.list;
					for(var d = 0; d < c.myScenes.length; d++) c.myScenes[d].time = new Date(c.myScenes[d].delTime).getTime() + 2592e5, c.myScenes[d].history = Math.round((c.myScenes[d].time - (new Date).getTime()) / 1e3 / 60 / 60 / 24);
					c.sceneCurrent.total = a.data.map.count, c.sceneCurrent.page = a.data.map.pageNo
				} else c.sceneTotalItems = 0, c.sceneCurrent.total = 0, c.sceneCurrent.page > 1 ? c.getMyScenes(--c.sceneCurrent.page, "scene") : c.myScenes = [];
				l(b)
			})
		}, c.getMyScenes(1, "scene"), c.deleteScene = function(a, b) {
			e.openConfirmDialog({
				msg: "确定彻底删除此微课?"
			}, function() {
				i.deleteSceneById(a, b).then(function() {
					c.getMyScenes(c.historyTab.pages.currentPage, "scene")
				})
			})
		}, c.revoke = function(a) {
			i.revoke(a).then(function() {
				c.getMyScenes(c.historyTab.pages.currentPage, "scene")
			})
		}, c.$on("images.update", function(a, b, d) {
			c.images = b.list;
			for(var e = 0; e < c.images.length; e++) c.images[e].time = new Date(c.images[e].delTime).getTime() + 2592e5, c.images[e].history = Math.round((c.images[e].time - (new Date).getTime()) / 1e3 / 60 / 60 / 24);
			c.imageCurrent.total = b.map.count, c.imageCurrent.page = b.map.pageNo, l(d)
		}), c.getImages = function(a, d) {
			c.sceneHistory = d, g.userRecycle(a, 21).success(function(a) {
				a.success ? b.$broadcast("images.update", a, d) : alert(a.msg)
			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}, c.$on("file.delete", function(a) {
			c.getImages(c.historyTab.pages.currentPage, "image")
		}), c.deleteImg = function(a, b) {
			e.openConfirmDialog({
				msg: "确定彻底删除此图片?"
			}, function() {
				c.deleteFile(a, b)
			})
		}, c.deleteFile = function(a, c) {
			g.deleteFile1(a, c).success(function(a) {
				a.success ? b.$broadcast("file.delete") : alert(a.msg)
			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}, c.imageRevoke = function(a) {
			g.fileRevoke(a).success(function(a) {
				a.success ? (c.getImages(c.historyTab.pages.currentPage, "image"), j.clear("fileService")) : alert(a.msg)
			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}, c.pageChanged = function(a) {
			return 1 > a || a > c.historyTab.pages.totalItems / 10 + 1 ? void alert(f.instant("main.customer.PAGE_OVERFLOW")) : void("scene" == c.sceneHistory ? c.getMyScenes(a, "scene") : c.getImages(a, "image"))
		}
	}]);
 angular.module("usercenter.upgrade", ["services.usercenter", "services.i18nNotifications"]), 
	angular.module("usercenter.upgrade").controller("UsercenterupgradeCtrl", ["$rootScope", "$scope", "$window", "$translate", "usercenterService", "security", "$modal", "ModalService", "i18nNotifications", "$timeout", "user", function(a, b, c, d, e, f, g, h, i, j, k) {
		function l() {
			0 === m ? (b.isCodeAccessiable = !1, b.codeTip = d.instant("usercenter.account.CODE_TIP1"), m = 60) : (b.isCodeAccessiable = !0, b.codeTip = d.instant("usercenter.account.CODE_TIP2") + "(" + m + ")", j(function() {
				m--, l()
			}, 1e3))
		}
		b.companyInfo = {
			id: k.id
		}, b.checkName = function(a) {
			return a.name ? countCharacters(a.name) > 40 ? (b.nameError = "企业名称不能超过40个字符", !1) : (b.nameError = "", !0) : (b.nameError = "请填写企业名称", !1)
		}, b.checkEmail = function(a) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			return a.email && !c.test(a.email) ? (b.emailError = "请正确填写邮箱", !1) : a.email ? (b.emailError = "", !0) : (b.emailError = "请填写企业邮箱", !1)
		}, b.checkcontacts = function(a) {
			return a.contacts ? countCharacters(a.contacts) > 30 ? (b.contactsError = "联系人不能超过30个字符", !1) : (b.contactsError = "", !0) : (b.contactsError = "请填写联系人", !1)
		}, b.checkCode = function(a) {
			return a.code ? (b.codeError = "", !0) : (b.codeError = "请输入手机验证码", !1)
		}, b.getCode = function(a) {
			return a.mobile ? (b.telError = "", void e.companyMobile(a.mobile).then(function(a) {
				a.data.success ? l() : b.telError = a.data.msg
			})) : (b.telError = "请填写手机号码", !1)
		};
		var m = 60;
		b.checkFormFormat = function(a) {
			return b.checkName(a) && b.checkEmail(a) && b.checkcontacts(a) && b.checkCode(a) ? !0 : !1
		}, b.upgradeCompanyMessage = function(c) {
			b.checkFormFormat(c) && e.saveCompanyInfo(c).then(function(d) {
				d.data.success ? (i.pushForCurrentRoute("account.success", "notify.success"), a.$broadcast("companyState"), b.$close(c.mobile)) : b.codeError = d.data.msg
			})
		}, b.quXiao = function() {
			b.$dismiss()
		}
	}]);
	angular.module("usercenter", ["services.usercenter", "services.localizedMessages", "security.service", "services.i18nNotifications", "security.thirdparty", "app.directives.addelement", "services.modal","app.directives.qrcode","services.file","services.mine","services.scene","services.dataCache","usercenter.transfer", "usercenter.upgrade", "usercenter.request",  "usercenter.relAccount", "usercenter.branch", "usercenter.branch.reset", "usercenter.checkMobil", "usercenter.relRegisterAccount", "userCenter.userGuide", "usercenter.tab", "usercenter.privilege"]),
	angular.module("usercenter").controller("UserCenterCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "$filter", "fixnumFilter", "i18nNotifications", "thirdpartyService", "$translate", "$timeout", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
		b.PREFIX_FILE_HOST = PREFIX_FILE_HOST, b.PREFIX_SERVER_HOST = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.isActive = "usercenter", b.isVendorUser = f.isVendorUser(), b.editInfo = {
			isEditable: !1
		}, b.isDomainAccessable = f.isAllowToAccess(f.accessDef.ACCESS_DOMAIN_BIND), b.isAllowedHistory = f.isAllowToAccess(f.accessDef.USERCENTER_HISTORY), b.isAllowedApply = f.isAllowToAccess(f.accessDef.APPLY_XIUKE), b.password = {}, b.pageSize = 5, b.XdpageNo = 1, b.XdtoPage = "", b.pageNo = 1, b.toPage = b.XdcurrentPage = 1, b.branchToPage = 1, b.viewControl = {
			tab: d.id
		};
		b.showTab = function(a) {
			i.path("/usercenter/" + a, !1), b.viewControl.tab = a
		}, b.currentUser = f.currentUser, b.getUserXd = function() {
			e.getUserXd().then(function(a) {
				a.data.success && (b.xdCounts = a.data.obj)
			})
		}, b.getUserXd(), b.getUserInfo = function() {
			e.getUserInfo().then(function(a) {
				b.userinfo = a.data.obj, b.master = angular.copy(b.userinfo), b.url = "我做的企业秀，用的是微学宝，免费好用，你试试吧：\r\n" + PREFIX_HOST + "/#/home/register?u=" + b.userinfo.id;
				var c = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				"eqs" != b.userinfo.loginName.substr(0, 3) || c.test(b.userinfo.loginName) || (b.userinfo.noRel = "未绑定", /(_qq)$/.test(b.userinfo.loginName) && (b.qqRel = !0), /(_weixin)$/.test(b.userinfo.loginName) && (b.wxRel = !0), /(_weibo)$/.test(b.userinfo.loginName) && (b.wbRel = !0)), /qq/gi.test(b.userinfo.relType) && (b.qqRel = !0), /weixin/gi.test(b.userinfo.relType) && (b.wxRel = !0), /weibo/gi.test(b.userinfo.relType) && (b.wbRel = !0), i.search().bindemail && b.relAccount(), 4 == b.userinfo.type
			})
		}, b.getUserInfo(), b.editMessage = function() {
			var a, c, d;
			// b.userinfo.type = 22
			4 == b.userinfo.type ? (a = "/Public/eq/6.0/templates/usercenter.console.serverinfo.html", c = "ApplyCtrl", d = "服务会员基本信息") : (a = "/Public/eq/6.0/templates/usercenter.console.companyinfo.html", c = "companyInfoCtrl"), g.open({
				windowClass: "six-contain",
				templateUrl: a,
				controller: c,
				scope: b,
				resolve: {
					userinfo: function() {
						return {
							nick: b.userinfo.nick,
							type: b.userinfo.type,
							id: b.userinfo.id,
							title: d
						}
					}
				}
			}).result.then(function(a) {
				4 == b.userinfo.type ? (b.applyInfo = a.status, b.userinfo.nick = a.applyInfoNew.nick) : b.userinfo.nick = a.nick
			}, function() {})
		}, b.copyCode = function() {
			var a, b;
			a = $(".invitation-contain span"), b = a.html(), clipboard.setData("text/plain", b)
		}, b.tabid = d.id, b.customerUpload = function() {
			g.open({
				windowClass: "img_console console",
				templateUrl: "/Public/eq/6.0/templates/scene.console.bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(c) {
				if(c.width / c.height === 1) {
					b.userinfo.headImg = c.data;
					var d = {
						headImg: c.data,
						id: b.userinfo.id
					};
					return void e.saveUserInfo(d).then(function(d) {
						d.data.success && (b.editInfo.isEditable = !1, a.$broadcast("headImg.change", c.data))
					})
				}
				g.open({
					windowClass: "console seven-contain",
					templateUrl: "/Public/eq/6.0/templates/scene.console.imageCrop.tpl.html",
					controller: "imageCropCtrl",
					backdrop: "static",
					resolve: {
						obj: function() {
							return {
								type: "square",
								properties: {
									src: c.data
								}
							}
						}
					}
				}).result.then(function(c) {
					b.userinfo.headImg = c.src;
					var d = {
						headImg: c.src,
						id: b.userinfo.id
					};
					e.saveUserInfo(d).then(function(c) {
						c.data.success && (b.editInfo.isEditable = !1, a.$broadcast("headImg.change", c.data.obj.headImg))
					})
				}, function(a) {})
			}, function(a) {})
		}, b.domain = function() {
			g.open({
				windowClass: "six-contain",
				templateUrl: "/Public/eq/6.0/templates/usercenter.domain.tpl.html",
				controller: "UserCenterCtrl",
				resolve: {
					param: function() {
						return {
							value: b.domainMess
						}
					}
				}
			}).result.then(function() {
				getDomainMess()
			}, function() {})
		}, b.applyShow = function() {
			g.open({
				windowClass: "six-contain",
				templateUrl: "/Public/eq/6.0/templates/usercenter.console.serverinfo.html",
				controller: "ApplyCtrl",
				backdrop: "static",
				invoice: !0,
				resolve: {
					userinfo: function() {
						return {
							status: b.applyInfo,
							id: b.userinfo.id,
							title: "申请成为秀客获取服务商账号",
							invoice: !0
						}
					}
				}
			}).result.then(function(a) {
				b.applyInfo = a
			}, function() {})
		}, o(function() {
			("4" == b.userinfo.type || "1" == b.userinfo.type) && e.getUserStatus().then(function(a) {
				b.applyInfo = a.data.map.status
			})
		}, 300), b.know = function() {
			b.xiudian = !1
		}, b.buyXd = function() {
			g.open({
				windowClass: "console six-contain",
				templateUrl: "?c=pay",
				controller: "BuyXdController",
				resolve: {
					getUserXd: function() {
						return function() {
							b.getUserXd(), b.getXdlog(b.XdtoPage)
						}
					}
				}
			}).result.then(function() {}, function() {})
		}
	}]).controller("BuyXdController", ["$scope", "$modal", "usercenterService", "ModalService", "getUserXd", function(a, b, c, d, e) {
		a.confirm = function() {
			c.getPayXdQrCode(10, 1).then(function(c) {
				if(a.$close(), c.data.success) {
					var f = c.data.obj;
					b.open({
						windowClass: "console",
						templateUrl: "/Public/eq/6.0/templates/usercenter.payment.tpl.html",
						controller: "PayMentCtrl",
						resolve: {
							qrCodeUrl: function() {
								return f
							},
							type: function() {
								return 10
							},
							money: function() {
								return ["500元"]
							},
							method: function() {
								return "buyXd"
							},
							counts: function() {}
						}
					}).result.then(function() {
						e()
					}, function() {})
				} else d.openMsgDialog({
					msg: c.data.msg
				})
			})
		}, a.cancel = function() {
			a.$close()
		}
	}]);