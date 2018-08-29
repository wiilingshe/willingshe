angular.module("usercenter.relEmail", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.relEmail").controller("RelEmailCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {		

	b.title = j.title;
	b.userinfo = j;
	switch(b.title) {
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
		if(c.test(b.userinfo.email)){
			b.emailFormatErr = "";
			return !0;
		}else{
			b.emailFormatErr = l.instant("usercenter.account.REL_EMAIL_TIP");
			return !1;
		}

	}, b.checkPassFormat = function(a) {
		if(a.password){
			b.passFormatErr = "";
			return !0;
		}else{
			b.passFormatErr = l.instant("usercenter.account.PASSWORD_ERROR");
			$(".email-pwd").focus();
			return !1;
		}

	}, b.relEmail = function(a) {
		if(b.checkEmailFormat(a) && b.checkPassFormat(a)){

			b.firstRel = null == b.userinfo.checkEmail ? !1 : !0;

			e.relEmail(b.userinfo.email, b.userinfo.password, b.firstRel).then(function(a) {
				if(200 == a.data.code){
					b.relErr = "";
					h.openMsgDialog({
						msg: "申请绑定成功,已向您的邮箱发送验证邮件,请注意查收。"
					}, function() {
						b.$dismiss();
					})
				}else{
					b.firstRel = !0;
					b.relErr = a.data.msg;
				}

			}, function(a) {})
		}
	}, b.checkUpperCase = function() {
		if(/[A-Z]/g.test(b.userinfo.email)){
			b.userinfo.email = b.userinfo.email.toLowerCase();
			b.relErr = l.instant("usercenter.account.EMAIL_TIP");
		}

	}, b.cancel = function() {
		b.$dismiss();
	}
}]);