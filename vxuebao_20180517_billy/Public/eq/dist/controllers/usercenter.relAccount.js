angular.module("usercenter.relAccount", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.relAccount").controller("RelAccountCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {		
		b.user = j, b.bindAccount = function() {
			if(b.user.email){
				if(b.user.password){
					return void e.relAccount(j.id, b.user.email, b.user.password).then(function(a) {
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
							b.relErr = a.data.msg
						}
					}, function(a) {
						b.$dismiss()
					})
				}else{
					b.relErr = l.instant("usercenter.account.PASSWORD_ERROR");
					return void $(".third-pwd").focus();
				}
			}else{
				b.relErr = l.instant("usercenter.account.ACCOUNT_ERROR");
				return void $(".third-name").focus();
			}
		}, b.checkUpperCase = function() {
			if(/[A-Z]/g.test(b.user.email)){
				b.user.email = b.user.email.toLowerCase();
				b.relErr = l.instant("usercenter.account.EMAIL_TIP");
			}
		}, b.cancel = function() {
			b.$dismiss();
		}
	}]);