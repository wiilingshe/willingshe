angular.module("security.login.reset", ["services.localizedMessages"]).controller("ResetFormController", ["$scope", "security", "localizedMessages", "$location", "resetKey", function(a, b, c, d, e) {
	a.password = {}, a.checkPassword = function() {
		if (a.password.newPw) {
			if (/^[a-zA-Z0-9]{6,16}$/g.test(a.password.newPw)) return a.passError = null, !0;
			a.passError = "密码为6~16个字符(英文字母或数字，区分大小写)"
		} else a.passError = "新密码不能为空";
		return !1
	}, a.checkRepeatPassword = function() {
		if (a.password.confirm) {
			if (a.password.confirm == a.password.newPw) return a.rPassError = "", !0;
			a.rPassError = "两次密码输入不一致，请重新输入"
		} else a.rPassError = "确认密码不能为空";
		return !1
	}, a.reset = function() {
		a.checkPassword() && a.checkRepeatPassword() && b.resetPassByKey(a.password.newPw, e).then(function(b) {
			200 == b.data.code ? (alert("修改成功"), a.$close(), d.path("/main").search({})) : 1011 == b.data.code && (a.authError = b.data.msg)
		})
	}, a.cancel = function() {
		a.$dismiss()
	}
}]);