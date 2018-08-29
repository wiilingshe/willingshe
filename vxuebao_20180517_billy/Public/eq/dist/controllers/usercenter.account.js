angular.module("usercenter.account", ["usercenter.relEmail"]),
	angular.module("usercenter.account").controller("UsercenterAccountCtrl", ["$location", "$rootScope", "$scope", "$window", "usercenterService", "$modal", "ModalService", "i18nNotifications", "security", "thirdpartyService", "$translate", "$timeout", function(a, b, c, d, e, f, g, h, i, j, k, l) {		
		function m() {
			c.progress = "0";
			if(1 == c.userinfo.checkEmail && 1 == c.userinfo.checkPhone){
				c.redColor = !1, l(function() {
					c.progress = "90";
				}, 100)
			}else if(1 != c.userinfo.checkEmail && 1 != c.userinfo.checkPhone){
				l(function() {
					c.progress = "20";
				}, 100);
				c.redColor = !0
			}else if(1 != c.userinfo.checkEmail && 1 == c.userinfo.checkPhone || 1 == c.userinfo.checkEmail && 1 != c.userinfo.checkPhone){
				c.redColor = !1;
				l(function() {
					c.progress = "60";
				}, 100)
			}
		}

		function n(a) {
			if(a){
				if(a.state && /WECHAT_STATE/.test(a.state)){
					s = {
						code: a.code,
						type: "weixin"
					};
					j.bindAccountCommon(s);
				}else{
					j.qqBindAccount(a);
				}
			}
		}

		c.PREFIX_CLIENT_HOST = PREFIX_HOST;
		c.XdpageSize = 10;
		c.page = {};

		c.pageChanged = function(a) {
			if(1 > a || a > c.branchesCount / 10 + 1){
				return void alert("此页超出范围");
			}else{
				c.currentPage = a;
				return void c.getBranches(a);
			}

		}, c.getBranches = function(a) {
			e.getBranches(c.XdpageSize, a).then(function(a) {
				if(a.data.success){
					c.branches = a.data.list;
					c.branchesCount = a.data.map.count;
					c.page.currentPage = a.data.map.pageNo;
					c.toPage = a.data.map.pageNo;
					c.branchesNumPages = Math.ceil(c.branchesCount / c.XdpageSize);
					o();
				}

			}, function() {})
		};
		c.getBranches(c.pageNo);
		c.branchName = {};

		var o = function() {
			var d = a.search().branchid;
			if(d){
				for(var e = 0; e < c.branches.length; e++) {
					c.branches[e].id == d && (c.branchName.name = c.branches[e].loginName);
				}
			}else {
				b.branchid = "", a.search("branchid", null)
			}
		};
		c.$watch("branchid", function(a, b) {
			a != b && o();
		}), c.changeCurrent = function() {
			b.branchid = "";
			a.search("branchid", null);

		}, c.selectBranch = function(c) {
			b.branchid = c.id;
			a.path("main");
			a.search({
				branchid: b.branchid
			});
		}, c.$watch("userinfo", function(a) {
			a && m();

		});
		var p = /^EQS.*qq$/,
			q = /^EQS.*weixin$/;

		c.qqShow = !0;
		c.weixinShow = !0;
		p.test(i.currentUser.loginName) && (c.qqShow = !1);
		q.test(i.currentUser.loginName) && (c.weixinShow = !1);

		var r = null;
		c.goReset = function() {
			r = f.open({
				windowClass: "six-contain",
				templateUrl: BASE_URL + "templates/usercenter.tab.reset.tpl.html",
				controller: "UsercenterAccountCtrl",
				scope: c
			}).result.then(function() {
				r = null;
			}, function() {
				r = null;
			})
		}, c.checkOldPassword = function() {
			if(c.password.old){
				c.oldPassError = "";
				return !0;
			}else{
				c.oldPassError = "原始密码不能为空";
				return !1;
			}
		}, c.checkPassword = function() {
			if(c.password.newPw) {
				if(/^[a-zA-Z0-9]{6,16}$/g.test(c.password.newPw)) {
					return c.passError = "", !0;
				}
				c.passError = "密码为6~16个字符(英文字母或数字，区分大小写)"
			} else {
				c.passError = "新密码不能为空";
			}

			return !1
		}, c.checkRepeatPassword = function() {
			if(c.password.confirm) {
				if(c.password.confirm == c.password.newPw) {
					return c.rPassError = "", !0;
				}
				c.rPassError = "两次密码输入不一致，请重新输入"
			} else {
				c.rPassError = "确认密码不能为空";
			}

			return !1
		}, c.reset = function() {
			if(c.checkOldPassword() && c.checkPassword() && c.checkRepeatPassword()) {
				if(angular.equals(c.master, c.password)) {
					return void(c.authError = "请不要重复提交！");
				}
				c.oldPassError = "";
				c.passError = "";
				c.rPassError = "";
				i.resetPassword(c.password.old, c.password.newPw).then(function(a) {
					if(a.data.success){
						h.pushForCurrentRoute("reset.psw.success", "notify.success");
						c.master = angular.copy(c.password);
						c.$close(c.master);
					}else{
						c.oldPassError = a.data.msg;
					}
				})
			}
		}, c.quXiao = function() {
			c.$dismiss();

		}, c.manageBranch = function(a) {
			var b = a;
			if(!a){
				if(3 == i.currentUser.memberType) {
					if(c.branchesCount >= 100) {
						return void g.openMsgDialog({
							msg: "子账号数量已达到限制!"
						})
					}
				} else if(2 == i.currentUser.memberType) {
					if(c.branchesCount >= 50) {
						return void g.openMsgDialog({
							msg: "子账号数量已达到限制!"
						})
					}
				} else if(c.branchesCount >= 30) {
					return void g.openMsgDialog({
						msg: "子账号数量已达到限制!"
					});
				}
			}
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
				a || (a = {});
				if(d.dept){
					a.deptId = d.dept.id;
					a.deptName = d.dept.name;
				}

				a.name = d.name;
				a.id = d.id;
				a.extPermi = d.extPermi;

				if(b){
					c.branchesCount++;
				}else{
					a.loginName = d.loginName;
					a.status = 1;
					a.regTime = (new Date).getTime();
					c.branches.unshift(a);
					c.branches.length > 10 && c.branches.splice(c.branches.length - 1, 1);
				}

				c.$emit("addBranch", a);

			}, function() {})
		}, c.openBranch = function(a, b) {
			e.openBranch(a.id, b).then(function(c) {
				if(c.data.success){
					if(b){
						a.status = 1;
						h.pushForCurrentRoute("branch.open.success", "notify.success");
					}else{
						a.status = 2;
						h.pushForCurrentRoute("branch.close.success", "notify.success");
					}
				}
			}, function() {
				alert("服务器异常")
			})
		}, c.$on("rel.success", function(a, b) {
			h.pushForCurrentRoute("mail.rel.success", "notify.success");
			if("weixin" == b){
				c.wxRel = !0;
			}else if("qq" == b){
				c.qqRel = !0;
			}

		}), c.$watch("currentPage.branchCurrentPage", function(a, b) {
			if(a != b){
				c.getBranches(a);
				c.branchToPage = a;
			}

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
				c.userinfo.phone = a;
				c.userinfo.checkPhone = 1;

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
				c.userinfo.noRel = null;
				c.userinfo.loginName = b.email;

				/qq/gi.test(b.type) && (c.qqRel = !0);
				/weixin/gi.test(b.type) && (c.wxRel = !0);
				/weibo/gi.test(b.type) && (c.wbRel = !0);

				a.search("bindemail", null);

			}, function() {
				a.search("bindemail", null);
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
				c.userinfo.noRel = null;
				c.userinfo.loginName = b.email;

				/qq/gi.test(b.type) && (c.qqRel = !0);
				/weixin/gi.test(b.type) && (c.wxRel = !0);
				/weibo/gi.test(b.type) && (c.wbRel = !0);

				a.search("bindemail", null);
			}, function() {
				a.search("bindemail", null);
			})
		}, c.relEmail = function(a) {
			if(c.userinfo.noRel){
				alert("请先绑定账号");
				return void c.createAccount();
			}else{
				return void f.open({
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
			}
		}, c.verifyEmail = function() {
			e.verifyEmail().then(function(a) {
				200 == a.data.code && g.openMsgDialog({
					msg: "申请绑定成功,已向您的邮箱发送验证邮件,请注意查收。"
				}, function() {})
			}, function(a) {})
		};
		c.bindThirdAccount = function(a) {
			if(c.userinfo.noRel){
				alert("请先绑定账号");
				return void c.createAccount();
			}else{
				return void j.openThirtyPartyWindow(a);
			}
		}, c.unbindRelation = function(a) {
			j.unbindRelation(a);

		}, c.$on("mail.unbind.success", function(a, b) {
			h.pushForCurrentRoute("mail.unbind.success", "notify.success");
			if("weixin" == b){
				c.wxRel = !1;
			}else if("qq" == b){
				c.qqRel = !1;
			}
		});
		var s;
		d.setValue = function(a) {
			c.bindParam = a;
			n(c.bindParam);
			c.$apply();

		};

		c.emailAccount = !1;
		c.upgradeCompany = function() {
			if("eqs" == c.userinfo.loginName.substr(0, 3) && null == c.userinfo.email){
				c.emailAccount = !0
			}else{
				f.open({
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
					c.userinfo.phone = a;
					c.userinfo.checkPhone = 1;
					i.currentUser.type = 2;

				}, function() {})
			}
		};

		c.companyMes = !0;
		c.$on("companyState", function() {
			c.companyInfo || (c.companyInfo = {});
			c.companyMes = !1;
			c.userinfo.type = 2;
		})
	}]);