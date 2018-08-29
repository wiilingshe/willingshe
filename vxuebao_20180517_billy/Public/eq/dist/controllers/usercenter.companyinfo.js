angular.module("usercenter.companyinfo", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.companyinfo").controller("companyInfoCtrl", ["$scope", "$modal", "userinfo", "usercenterService", "i18nNotifications", function(a, b, c, d, e) {		
		a.companyUserInfo = {};
		a.designerUserInfo = {};
		a.companyUserInfo.nick = c.nick;
		a.type = c.type;
		a.pid = {};

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
				a.companyUserInfo = b.data.obj;
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
			a.$apply(function() {
				a.designerUserInfo.proid = '';
				a.designerUserInfo.proname = '';
			});
		},
		a.clearCityInfo = function() {
			a.$apply(function() {
				a.designerUserInfo.cityid = '';
				a.designerUserInfo.cityname = '';
			});
		},
		a.checkEmail = function(b) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(b.email && !c.test(b.email)){
				a.authError = "请正确填写邮箱";
				return !1;
			}else{
				a.authError = "";
				return !0;
			}

		};

		2 == a.type && (f(), a.title = "企业会员基本信息");
		1 == a.type || 12 == a.type && (a.title = "个人用户基本信息");
		3 == a.type && (a.title = "高级用户基本信息");
		22 == a.type && (g(), a.title = "设计师基本信息");

		a.saveUserInfo = function(b) {
			b.id = c.id;
			d.saveUserInfo(b).then(function(c) {
				c.data.success && (a.$close(b), e.pushForCurrentRoute("save.success", "notify.success"));
			})
		}, a.saveCompanyInfo = function(b) {
			if(a.checkEmail(b)){
				b.nick = a.companyUserInfo.nick;
				return void d.saveCompanyInfo(b).then(function(c) {
					if(c.data.success){
						e.pushForCurrentRoute("account.success", "notify.success");
						a.$close(b);
					}else{
						a.codeError = c.data.msg;
					}

				})
			}else{
				return !1;
			}
		}, a.saveDesignerInfo = function(b) {
			if(a.checkEmail(b)){
				b.nick = a.designerUserInfo.nick;
				return void d.saveDesignerInfo(b).then(function(c) {
					if(c.data.success){
						e.pushForCurrentRoute("account.success", "notify.success");
						a.$close(b);
					}else{
						a.codeError = c.data.msg;
					}
				})
			}else{
				return !1;
			}
		}, a.cancel = function() {
			a.$close();
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