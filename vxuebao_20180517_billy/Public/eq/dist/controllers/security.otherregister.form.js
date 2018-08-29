angular.module("security.otherregister.form", ["services.localizedMessages", "app.directives.register"]);
angular.module("security.otherregister.form").controller("OtherRegisterFormController", ["$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window", "otherRegisterInfo", function(a, b, c, d, e, f, g, h) {
		a.user = {}, a.user.agreement = !0, a.getUserDetail = function() {
			var b = {
				type: "qq",
				openId: h.openId,
				accessToken: h.accessToken
			};
			c.getUserDetail(b.type, b.openId, b.accessToken).then(function(b) {
				a.otherUserInfo = b.data.obj
			})
		}, a.getUserDetail()
	}]);