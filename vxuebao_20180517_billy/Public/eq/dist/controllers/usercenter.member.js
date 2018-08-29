angular.module("usercenter.member", []),
	angular.module("usercenter.member").controller("MemberCtrl", ["$scope", "$modal", "usercenterService", "ModalService", function(a, b, c, d) {	//首次加载	
		
		a.pageNo = 1;
		a.pageSize = 10;
		a.setUserInfo = function() {
			if(1 == a.currentUser.type || 12 == a.currentUser.type) {
				a.userType = "个人用户";
			}else if(2 == a.currentUser.type){
				a.upgradeInfo = "已升级"
			}else{
				a.upgradeInfo = "免费升级";

			 	if(3 == a.currentUser.type) {
					a.userType = "高级用户";

				}else if(21 == a.currentUser.type) {
					a.userType = "企业子用户";

				}else if(4 == a.currentUser.type) {
					a.userType = "服务商用户";
				}else if(23 == a.currentUser.type) {
					a.userType = "企业免费用户";

				}else{
					a.userType = "企业用户";
					if(a.currentUser.memberType) {
						if(a.currentUser.expiryTime) {
							var b = (new Date).getTime();
							a.currentUser.expiryTime <= b && (a.currentUser.memberType = null)
						}
						switch(a.currentUser.memberType){
							case 1:
								a.userPay = "(体验版)";
								break;
							case 2:
								a.userPay = "(高级版)";
								break;
							case 3:
								a.userPay = "(专业版)";
								break;
							case 4:
								a.userPay = "(畅享版)";
								break;
						}
						
					} else {
						a.userPay = "";
					}
				}
			}
		};
		a.setUserInfo();

		a.memberPrivileges = ["拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传"];

		a.getXdLog = function(b, d) {
			a.xdType = b;
			a.currentPage = d;
			c.getXdlog(b, d, a.pageSize).then(function(b) {
				if(b.data.success) {
					a.xdLogs = b.data.list;
					for(var c = 0; c < a.xdLogs.length; c++) {
						if(2 == a.xdLogs[c].type){
							a.xdLogs[c].xd = "-" + a.xdLogs[c].xd;
						}else{
							a.xdLogs[c].xd = "+" + a.xdLogs[c].xd;
						}

					}
					a.totalItems = b.data.map.count;
					a.currentPage = b.data.map.pageNo;
					a.toPage = b.data.map.pageNo;
					a.numPages = Math.ceil(a.totalItems / a.pageSize);
				}
			})
		};
		a.getXdLog(null, 1);

		a.pageChanged = function(b, c) {
			if(1 > c || c > a.numPages && 1 != c){
				return void alert("此页超出范围")
			}else{
				a.currentPage = c;
				a.toPage = c;
				return void a.getXdLog(b, c);
			}

		}, a.getXdStatNum = function() {
			c.getXdStat().then(function(b) {
				a.getXdStat = b.data.map;
			})
		}, a.getXdStatNum();

		a.transferXd = function() {
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
				a.getUserXd();
				a.getXdlog();
				a.getXdStatNum();

			}, function() {})
		}, a.openInvoice = function() {
			a.openInvoiceListModal();

		}, a.openInvoiceListModal = function() {
			b.open({
				windowClass: "console seven-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.invoice-list.html",
				controller: "GetInvoiceListCtrl"
			}).result.then(function() {}, function() {})
		}
	}]).controller("PayMentCtrl", ["$modal", "$scope", "qrCodeUrl", "type", "money", "usercenterService", "method", function(a, b, c, d, e, f, g) {		
		b.qrCodeUrl = c;
		b.money = e;
		b.type = d;
		b.paymented = function() {
			b.$close();
		}, b.cancel = function() {
			b.$dismiss();
		}, b.getWeChatUrl = function() {
			if(!b.wechatUrl){
				if("member" == g){
					f.getCompanyQrCode(d, 0).then(function(a) {
						a.data.success && (b.wechatUrl = a.data.obj);
					})
				}else{
					f.getPayXdQrCode(d, 0).then(function(a) {
						a.data.success && (b.wechatUrl = a.data.obj);
					})
				}
			}
		}
	}]);