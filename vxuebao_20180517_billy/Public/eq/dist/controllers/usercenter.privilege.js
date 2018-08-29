angular.module("usercenter.privilege", []),
	angular.module("usercenter.privilege").controller("PrivilegeCtrl", ["$location", "usercenterService", "$scope", "$modal", "security", "ModalService", function(a, b, c, d, e, f) {		
		c.tabid = "corporateMember";
		c.$watch(function() {
			return e.currentUser
		}, function(a) {
			if(a){
				c.currentUser = a;
				c.changeMemberType();
			}
		}, !0);

		c.changeMemberType = function() {
			if(c.currentUser && c.currentUser.expiryTime) {
				var a = (new Date).getTime();
				c.currentUser.expiryTime <= a && (c.currentUser.memberType = null);
			}
		};
		c.changeMemberType();

		c.upgradeAccount = function(a, b) {
			if(1 != c.currentUser.type || c.companyInfo && 0 === c.companyInfo.status){
				if(1 == c.currentUser.type && c.companyInfo){
					return void f.openMsgDialog({
						msg: "您不是企业会员,请先申请企业会员后再进行升级！"
					});
				}else if(2 != c.currentUser.type){
					return void f.openMsgDialog({
						msg: "尊敬的用户，您当前账号类型无法升级为企业用户！"
					});
				}else{
					return void d.open({
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
					}).result.then(function() {}, function() {});
				}
			}else{
				return void("eqs" == c.currentUser.loginName.substr(0, 3) && null == c.currentUser.email ? f.openMsgDialog({
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
			}
		}, c.cancel = function() {
			c.$close();

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
				switch(c){
					case 1:
						if(h){
							i = ["99元", "450元"];
						}else{
							i = ["99元", "499元"];
						}
						j = [{
							name: "30天",
							value: 1
						}, {
							name: "180天",
							value: 6
						}]
						break;
					case 2:
						if(h){
							i = ["450元", "800元"], j = [{
								name: "180天",
								value: 1
							}, {
								name: "365天",
								value: 2
							}]
						}else{
							i = ["499元", "900元"], j = [{
								name: "180天",
								value: 1
							}, {
								name: "365天",
								value: 2
							}]
						}
						break;
					case 3:
						if(h){
							i = ["1.6万", "3万"], j = [{
								name: "1年",
								value: 1
							}, {
								name: "2年",
								value: 2
							}]
						}else{
							i = ["1.9万", "3.2万"], j = [{
								name: "1年",
								value: 1
							}, {
								name: "2年",
								value: 2
							}]
						}
						break;
					default:
						if(h){
							i = ["1800元", "3200元"], j = [{
								name: "1年",
								value: 1
							}, {
								name: "2年",
								value: 2
							}]
						}else{i = ["1999元", "3600元"], j = [{
								name: "1年",
								value: 1
							}, {
								name: "2年",
								value: 2
							}]
						}
				}
				if(g.data.success) {
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
				} else {
					e.openMsgDialog({
						msg: g.data.msg
					})
				}
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
		b.qrCodeUrl = c;
		b.money = e[0];
		b.type = d;
		b.counts = h;
		b.payWay = "alipay";
		h && h.length > 0 && (b.curentCount = h[0].value);

		var i = {};
		i["alipay1" + b.curentCount] = c;

		b.paymented = function() {
			b.$close();

		}, b.cancel = function() {
			b.$dismiss();

		}, b.getWeChatUrl = function(a) {
			b.payWay = a;
			var c = 1;
			"wechat" == b.payWay && (c = 0);
			if(i[b.payWay + "" + c + b.curentCount]){
				return void(b.qrCodeUrl = i[b.payWay + "" + c + b.curentCount]);
			}else{
				return void("member" == g ? f.getCompanyQrCode(d, c, b.curentCount).then(function(a) {
					a.data.success && (i[b.payWay + "" + c + b.curentCount] = a.data.obj, b.qrCodeUrl = a.data.obj)
				}) : f.getPayXdQrCode(d, c).then(function(a) {
					a.data.success && (i[b.payWay + "" + c + b.curentCount] = a.data.obj, b.qrCodeUrl = a.data.obj)
				}));
			}
		}, b.setCount = function(a, c) {
			b.curentCount = a;
			b.money = e[c];
			var g = 1;
			if("wechat" == b.payWay && (g = 0), i[b.payWay + "" + g + b.curentCount]) {
				return void(b.qrCodeUrl = i[b.payWay + "" + g + b.curentCount]);
			}
			var h = d,
				j = a;
			1 == d && 6 == a && (h = 2, j = 1);
			f.getCompanyQrCode(h, g, j).then(function(a) {
				if(a.data.success){
					i[b.payWay + "" + g + b.curentCount] = a.data.obj;
					b.qrCodeUrl = a.data.obj;
				}
			})
		}
	}]);