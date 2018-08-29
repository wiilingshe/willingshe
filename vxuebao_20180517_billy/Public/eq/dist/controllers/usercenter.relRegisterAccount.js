angular.module("usercenter.relRegisterAccount", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.relRegisterAccount").controller("RelRegisterAccountCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo", "i18nNotifications", "localizedMessages", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l, m) {		
		b.user = j, b.user.agreement = !0;
		var n = !1;
		b.cancel = function() {
			b.$dismiss("cancel")
		}, b.registerAccount = function() {
			if(b.userNotExist && b.checkUsername() && b.checkPassword() && b.checkRepeatPassword()){
				if(b.user.password === b.user.repeatPassword && b.user.agreement) {
					if(n) {
						return;
					}
					n = !0;
					e.relAccount(j.id, b.user.email, b.user.password, !0).then(function(a) {
						n = !1;
						if(200 == a.data.code) {
							k.pushForCurrentRoute("email.save.success", "notify.success");

							/qq/gi.test(b.user.loginName) && (b.relType = "qq");
							/weixin/gi.test(b.user.loginName) && (b.relType = "weixin");
							/weibo/gi.test(b.user.loginName) && (b.relType = "weibo");

							var c = {
								type: b.relType,
								email: angular.copy(b.user.email)
							};
							b.$close(c);
						} else {
							b.relErr = a.data.msg;
						}
					}, function(a) {
						n = !1;
						b.regErr = l.get("register.error.serverError", {
							exception: x
						});
						b.$dismiss();
					})
				} else {
					if(b.user.password != b.user.repeatPassword){
						b.regErr = l.get("register.error.match");
					}else{
						b.regErr = l.get("register.error.agreement");
					}

				}
			}
		}, b.checkUsername = function() {
			if(b.user.email) {
				if(/^[-_a-z0-9\.@]{6,40}$/g.test(b.user.email)) {
					b.checkUniqueness(b.user.email);
					return !0;
				}
				b.usernameError = m.instant("usercenter.account.REG_ACCOUNT_ERR2")
			} else {
				b.usernameError = m.instant("usercenter.account.REG_ACCOUNT_ERR1");
			}
			return !1
		}, b.checkUniqueness = function(a) {
			f.checkUniqueness(a).success(function(a) {
				b.userNotExist = a.success;
				if(b.userNotExist){
					b.usernameError = null;
				}else{
					b.usernameError = m.instant("usercenter.account.REG_ACCOUNT_ERR3");
				}
			})
		}, b.checkPassword = function() {
			if(b.user.password) {
				if(/^[a-zA-Z0-9]{6,16}$/g.test(b.user.password)) {
					b.passError = null;
					return !0;
				}
				b.passError = m.instant("usercenter.account.REG_PWD_ERR2")
			} else {
				b.passError = m.instant("usercenter.account.REG_PWD_ERR1");
			}
			return !1
		}, b.checkRepeatPassword = function() {
			if(b.user.repeatPassword) {
				if(b.user.repeatPassword == b.user.password) {
					b.rPassError = "";
					return !0;
				}
				b.rPassError = m.instant("usercenter.account.REG_PWD_ERR4");
			} else {
				b.rPassError = m.instant("usercenter.account.REG_PWD_ERR3");
			}
			return !1
		}
	}]);