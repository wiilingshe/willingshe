angular.module("usercenter.upgrade", ["services.usercenter", "services.i18nNotifications"]), 
	angular.module("usercenter.upgrade").controller("UsercenterupgradeCtrl", ["$rootScope", "$scope", "$window", "$translate", "usercenterService", "security", "$modal", "ModalService", "i18nNotifications", "$timeout", "user", function(a, b, c, d, e, f, g, h, i, j, k) {
		
		function l() {
			if(0 === m){
				b.isCodeAccessiable = !1;
				b.codeTip = d.instant("usercenter.account.CODE_TIP1");
				m = 60;
			}else{
				b.isCodeAccessiable = !0;
				b.codeTip = d.instant("usercenter.account.CODE_TIP2") + "(" + m + ")", j(function() {
					m--;
					l();
				}, 1e3)
			}
		}

		b.companyInfo = {
			id: k.id
		};

		b.checkName = function(a) {
			if(a.name){
				if(countCharacters(a.name) > 40){
					b.nameError = "企业名称不能超过40个字符";
					return !1;
				}else{
					b.nameError = "";
					return !0;
				}

			}else{
				b.nameError = "请填写企业名称";
				return !1;
			}
		}, b.checkEmail = function(a) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(a.email && !c.test(a.email)){
				b.emailError = "请正确填写邮箱";
				return !1;
			}else{
				if(a.email){
					b.emailError = "";
					return !0;
				}else{
					b.emailError = "请填写企业邮箱";
					return !1;
				}

			}

		}, b.checkcontacts = function(a) {
			if(a.contacts){
				if(countCharacters(a.contacts) > 30){
					b.contactsError = "联系人不能超过30个字符";
					return !1;
				}else{
					b.contactsError = "";
					return !0;
				}
			}else{
				b.contactsError = "请填写联系人";
				return !1;
			}
		}, b.checkCode = function(a) {
			if(a.code){
				b.codeError = "";
				return !0;
			}else{
				b.codeError = "请输入手机验证码";
				return !1;
			}

		}, b.getCode = function(a) {
			if(a.mobile){
				b.telError = "";
				return void e.companyMobile(a.mobile).then(function(a) {
					if(a.data.success){
						l();
					}else{
						b.telError = a.data.msg;
					}
				})
			}else{
				b.telError = "请填写手机号码";
				return !1;
			}

		};
		var m = 60;
		b.checkFormFormat = function(a) {
			if(b.checkName(a) && b.checkEmail(a) && b.checkcontacts(a) && b.checkCode(a)){
				return !0;
			}else{
				return !1;
			}
		}, b.upgradeCompanyMessage = function(c) {
			b.checkFormFormat(c) && e.saveCompanyInfo(c).then(function(d) {
				if(d.data.success){
					i.pushForCurrentRoute("account.success", "notify.success");
					a.$broadcast("companyState");
					b.$close(c.mobile);
				}else{
					b.codeError = d.data.msg;
				}
			})
		}, b.quXiao = function() {
			b.$dismiss();
		}
	}]);