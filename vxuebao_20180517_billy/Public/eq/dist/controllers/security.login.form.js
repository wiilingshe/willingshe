angular.module("security.login.form", ["services.localizedMessages", "app.directives.addelement", "security.thirdparty","services.dataCache"]).controller("LoginFormController", ["$scope", "$timeout", "$window", /*"$translate",*/ "security", "localizedMessages", "$location", "$sce", "thirdpartyService", "dataCacheService", function(a, b, c, /*d,*/ e, f, g, h, i, j) {
		if (a.user = {}, a.retrieve = {}, a.showLogin = !0, a.sendPassword = !1, a.unExist = !1, a.authError = null, a.isValidateCodeLogin = e.isValidateCodeLogin, a.validateCodeSrc = PREFIX_URL + "servlet/validateCodeServlet", a.authReason = null, e.getLoginReason() && (a.authReason = e.isAuthenticated() ? f.get("login.reason.notAuthorized") : "您的账号已在其它地方登录，如非本人操作，请立即修改密码确保账号安全！"), window.localStorage) {
			var k = localStorage.getItem("userEmail");
			k && (a.user.email = k)
		}
		a.rotate = function(c) {
			$(".modal-content").addClass("flip"), $(".login-form-section").fadeOut(600), b(function() {
				a.showLogin = !c, $(".login-form-section").fadeIn(0), $(".modal-content").removeClass("flip")
			}, 600)
		}, a.login = function() {
			a.user.rememberAcc && a.user.email ? localStorage.setItem("userEmail", a.user.email) : localStorage.removeItem("userEmail"), a.authError = null;
			var b = {
				username: a.user.email,
				password: a.user.password,
				rememberMe: a.user.rememberMe
			};
			return !a.isValidateCodeLogin || (b.geetest_challenge = challenge, b.geetest_validate = validate, b.geetest_seccode = seccode, challenge && validate && seccode) ? a.user.email ? a.user.password ? void e.login($.param(b)).then(function(b) {
				challenge = null, validate = null, seccode = null, j.clear(), b ? (selectorA && selectorA(".gt_refresh_button").click(), 1005 === b.code, b.map && (a.isValidateCodeLogin = b.map.isValidateCodeLogin), a.authReason = "", a.authError = b.msg) : (a.authError = f.get("login.error.invalidCredentials"), submit = !1)
			}, function(b) {
				a.authError = f.get("login.error.serverError", {
					exception: b
				})
			}) : (a.authReason = "", void(a.authError = "密码不能为空")) : (a.authReason = "", void(a.authError = "邮箱不能为空")) : (a.authReason = "", void(a.authError = "验证码不能为空"))
		}, a.openRegister = function() {
			g.path("/home/register", !1)
		}, a.clearForm = function() {
			a.user = {}
		}, a.cancelLogin = function() {
			e.cancelLogin()
		}, a.reset = function() {
			a.user = {}, a.retrieve = {}
		};
		var l = "https://api.geetest.com/get.php?gt=1ebc844c9e3a8c23e2ea4b567a8afd2d&time=" + (new Date).getTime();
		a.validateCodeUrl = h.trustAsResourceUrl(l), b(function() {
			$('input[name="userEmail"]').focus()
		}, 300), a.retrievePassword = function() {
			return a.retrieve.email ? submit ? challenge && validate && seccode ? void e.retrievePassword(a.retrieve.email, challenge, validate, seccode).then(function(b) {
				challenge = "", validate = "", seccode = "", 200 == b.data.code ? (a.sendPassword = !0, submit = !1) : (selectorA && selectorA(".gt_refresh_button").click(), 1003 == b.data.code ? a.retrieveError = "账号不存在" : 1005 == b.data.code && (a.retrieveError = "验证码错误"))
			}) : void(a.retrieveError = "验证码不能为空") : void(a.retrieveError = "验证码匹配错误") : void(a.retrieveError = "邮箱不能为空")
		}, a.openThirdPatyWindow = function(a) {
			/*e.cancelLogin(),*/ i.openThirtyPartyWindow(a)
		}
	}]);