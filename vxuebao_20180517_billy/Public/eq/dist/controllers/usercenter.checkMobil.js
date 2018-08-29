angular.module("usercenter.checkMobil", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.checkMobil").controller("CheckMobileCtrl", ["$rootScope", "$scope", "$window", "usercenterService", "$modal", "ModalService", "$location", "$timeout", "userinfo", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k) {		
		function l() {
			if(0 === m){
				b.isCodeAccessiable = !1;
				b.codeTip = k.instant("usercenter.account.CODE_TIP1");
				m = 60;
			}else{
				b.isCodeAccessiable = !0;
				b.codeTip = k.instant("usercenter.account.CODE_TIP2") + "(" + m + ")";
				h(function() {
					m--;
					l();
				}, 1e3)
			}
		}
		switch(b.title = i.title, b.userinfo = i, b.userinfo.code = "", b.title) {
			case k.instant("usercenter.account.REL_MOBILE"):
				b.dec = k.instant("usercenter.account.REL_MOBILE_DEC");
				break;
			case k.instant("usercenter.account.VALIDATE_MOBILE"):
				b.dec = k.instant("usercenter.account.VALIDATE_MOBILE_DEC");
				break;
			case k.instant("usercenter.account.CHANGE_MOBILE"):
				b.dec = k.instant("usercenter.account.CHANGE_MOBILE_DEC");
		}
		b.checkMobile = function() {
			if(/^1\d{10}$/.test(b.userinfo.phone)){
				b.mobileError = "";
				return !0;
			}else{
				$(".mobile").focus();
				b.mobileError = k.instant("usercenter.account.MOBILE_ERROR1");
				return !1;
			}
		}, b.checkCode = function() {
			if(b.userinfo.code){
				b.codeError = "";
				return !0;
			}else{
				$(".code").focus();
				b.codeError = k.instant("usercenter.account.CODE_ERROR");
				return !1;
			}

		}, b.getCode = function() {
			if(b.userinfo.phone){
				b.mobileError = "";
				d.relMobileCode(b.userinfo.phone).then(function(a) {
					a.data.success ? l() : b.relErr = a.data.msg;
				})
			}else{
				b.mobileError = k.instant("usercenter.account.MOBILE_ERROR2");
				$(".mobile").focus();
			}

		};
		var m = 60;
		b.relAccount = function() {
			if(b.checkMobile() && b.checkCode()){
				b.mobileError = "";
				b.codeError = "";
				d.relMobile(b.userinfo.phone, b.userinfo.password, b.userinfo.code).then(function(a) {
					if(a.data.success){
						f.openMsgDialog({
							msg: a.data.msg
						}, function() {
							b.$close(b.userinfo.phone)
						});
					}else{
						b.relErr = a.data.msg;
					}
				})
			}
		}, b.cancel = function() {
			b.$dismiss();
		}
	}]);