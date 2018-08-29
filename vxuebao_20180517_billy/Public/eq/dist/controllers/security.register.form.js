angular.module("security.register.form", ["services.localizedMessages", "app.directives.register", "security.thirdparty"]);
angular.module("security.register.form").controller("RegisterFormController", ["$scope", "$timeout", /*"$translate",*/ "security", "localizedMessages", "$location", "$http", "$window", "thirdpartyService", "regMsg", function(a, b, /*c,*/ d, e, f, g, h, i, j) {
	j ? a.user = j : a.user = {}, a.user.agreement = !0, a.regErr = "注册一个有效的账号，更好体验功能";
	var k = !1;
	a.openWeibo = function() {
		alert("新浪微博注册功能即将开放")
	}, a.register = function() {
		var b = {
			loginName: a.user.email,
			password: a.user.password
		};
		a.userNotExist && a.checkUsername() && a.checkPassword() && a.checkRepeatPassword() && l && l.then(function() {
			if (a.user.password === a.user.repeatPassword && a.user.agreement) {
				if (k) return;
				k = !0;
				var c = "";
				location.hash.indexOf("?") >= 0 && (c = location.hash.replace("#/home/register", "")), d.register($.param(b), c).then(function(b) {
					k = !1, b && (a.regErr = b.msg)
				}, function(b) {
					k = !1, a.regErr = e.get("register.error.serverError", {
						exception: b
					})
				})
			} else a.user.password != a.user.repeatPassword ? a.regErr = e.get("register.error.match") : a.regErr = e.get("register.error.agreement")
		})
	};
	var l = null;
	a.checkUniqueness = function(b) {
		l = d.checkUniqueness(b).success(function(b) {
			a.userNotExist = b.success, a.userNotExist ? a.usernameError = null : a.usernameError = "账号已存在，请重新填写"
		})
	}, a.checkIconUser = "", a.checkIconPass = "", a.checkIconRePass = "", a.checkUsername = function() {
		if (a.user.email) {
			if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(a.user.email)) return a.checkUniqueness(a.user.email), !0;
			a.usernameError = "账号为6-40个字符(英文字母或数字，只支持小写)以及-_@.的组合"
		} else a.usernameError = "账号不能为空";
		return !1
	}, a.checkPassword = function() {
		if (a.user.password) {
			if (/^[a-zA-Z0-9]{6,16}$/g.test(a.user.password)) return a.passError = null, !0;
			a.passError = "密码为6~16个字符(英文字母或数字，区分大小写)"
		} else a.passError = "密码不能为空";
		return !1
	}, a.checkRepeatPassword = function() {
		if (a.user.repeatPassword) {
			if (a.user.repeatPassword == a.user.password) return a.rPassError = "", !0;
			a.rPassError = "两次密码输入不一致，请重新输入"
		} else a.rPassError = "确认密码不能为空";
		return !1
	}, a.openLogin = function() {
		f.path("/home/login", !1)
	}, a.reset = function() {
		a.user = {}
	}, a.openThirdPatyWindow = function(a) {
		d.cancelRegister(), i.openThirtyPartyWindow(a)
	}
}]).controller("BindingController", ["$rootScope", "$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window", function(a, b, c, d, e, f, g, h) {
	b.qq_url = "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id="+client_id+"&redirect_uri=" + redirect_uri + "&display=pc", b.weibo_url = "https://api.weibo.com/oauth2/authorize?client_id=3508809852&response_type=token&redirect_uri=" + PREFIX_HOST
}]);