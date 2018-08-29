angular.module("usercenter", ["usercenter.transfer", "usercenter.upgrade", "usercenter.request", "services.usercenter", "services.localizedMessages", "security.service", "app.directives.addelement", "services.modal", "usercenter.relAccount", "usercenter.branch", "services.i18nNotifications", "security.thirdparty", "usercenter.branch.reset", "usercenter.checkMobil", "usercenter.relRegisterAccount", "userCenter.userGuide", "usercenter.tab", "usercenter.privilege"]),
	angular.module("usercenter").controller("UserCenterCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "$filter", "fixnumFilter", "i18nNotifications", "thirdpartyService", "$translate", "$timeout", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
		b.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
		b.PREFIX_SERVER_HOST = PREFIX_URL;
		b.PREFIX_CLIENT_HOST = PREFIX_HOST;
		b.isActive = "usercenter";
		b.isVendorUser = f.isVendorUser();

		b.editInfo = {
			isEditable: !1
		};
		b.isDomainAccessable = f.isAllowToAccess(f.accessDef.ACCESS_DOMAIN_BIND);
		b.isAllowedHistory = f.isAllowToAccess(f.accessDef.USERCENTER_HISTORY);
		b.isAllowedApply = f.isAllowToAccess(f.accessDef.APPLY_XIUKE);
		b.password = {};
		b.pageSize = 5;
		b.XdpageNo = 1;
		b.XdtoPage = "";
		b.pageNo = 1;
		b.toPage = b.XdcurrentPage = 1;
		b.branchToPage = 1;
		b.viewControl = {
			tab: d.id
		};
		b.showTab = function(a) {
			i.path("/usercenter/" + a, !1);
			b.viewControl.tab = a;

		};
		b.currentUser = f.currentUser;
		b.getUserXd = function() {
			e.getUserXd().then(function(a) {
				a.data.success && (b.xdCounts = a.data.obj);
			})
		};
		b.getUserXd();

		b.getUserInfo = function() {
			e.getUserInfo().then(function(a) {
				b.userinfo = a.data.obj;
				b.master = angular.copy(b.userinfo);
				b.url = "我做的企业秀，用的是微学宝，免费好用，你试试吧：\r\n" + PREFIX_HOST + "/#/home/register?u=" + b.userinfo.id;
				var c = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

				"eqs" != b.userinfo.loginName.substr(0, 3) || c.test(b.userinfo.loginName) || (b.userinfo.noRel = "未绑定", /(_qq)$/.test(b.userinfo.loginName) && (b.qqRel = !0), /(_weixin)$/.test(b.userinfo.loginName) && (b.wxRel = !0), /(_weibo)$/.test(b.userinfo.loginName) && (b.wbRel = !0));
				/qq/gi.test(b.userinfo.relType) && (b.qqRel = !0);
				/weixin/gi.test(b.userinfo.relType) && (b.wxRel = !0);
				/weibo/gi.test(b.userinfo.relType) && (b.wbRel = !0);
				i.search().bindemail && b.relAccount();
				4 == b.userinfo.type
			})
		};
		b.getUserInfo();

		b.editMessage = function() {
			var a, c, d;
			// b.userinfo.type = 22
			if(4 == b.userinfo.type){
				a = "/Public/eq/6.0/templates/usercenter.console.serverinfo.html";
				c = "ApplyCtrl";
				d = "服务会员基本信息";
			}else{
				a = "/Public/eq/6.0/templates/usercenter.console.companyinfo.html";
				c = "companyInfoCtrl";
			}
			
			g.open({
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
							title: d,
							name:b.userinfo.name
						}
					}
				}
			}).result.then(function(a) {
				if(4 == b.userinfo.type){
					b.applyInfo = a.status;
					b.userinfo.nick = a.applyInfoNew.nick;
				}else{
					b.userinfo.nick = a.nick;
				}

			}, function() {})
		}, b.copyCode = function() {
			var a, b;
			a = $(".invitation-contain span");
			b = a.html();
			clipboard.setData("text/plain", b);

		};
		b.tabid = d.id;

		b.customerUpload = function() {
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
						if(d.data.success){
							b.editInfo.isEditable = !1;
							a.$broadcast("headImg.change", c.data);
						}

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
						if(c.data.success){
							b.editInfo.isEditable = !1;
							a.$broadcast("headImg.change", c.data.obj.headImg);
						}

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
				getDomainMess();
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
				b.applyInfo = a;
			}, function() {})
		}, o(function() {
			("4" == b.userinfo.type || "1" == b.userinfo.type) && e.getUserStatus().then(function(a) {
				b.applyInfo = a.data.map.status
			})
		}, 300), b.know = function() {
			b.xiudian = !1;

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