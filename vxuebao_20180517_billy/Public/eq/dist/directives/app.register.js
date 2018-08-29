angular.module("app.directives.register", []).directive("qqButton", ["$translate", function(a) {
	return {
		restrict: "EA",
		scope: {
			someCtrlFn: "&callbackFn",
			openid: "=",
			accesstoken: "="
		},
		link: function(b, c, d) {
			QC.Login({
				btnId: d.id,
				scope: "all"
			}, function(a, c) {
				var d = a;
				QC.Login.check() && QC.Login.getMe(function(a, c) {
					b.openid = a, b.accesstoken = c, b.someCtrlFn({
						arg1: {
							openId: a,
							accessToken: c,
							type: "qq",
							userInfo: d
						}
					})
				})
			}, function(b) {
				alert(a.instant("common.register.QQ_SUCCESS"))
			}), $("#qqLoginBtn a").removeAttr("onclick").click(function() {
				alert(a.instant("common.register.OTHER_SUCCESS"))
			})
		}
	}
}]).directive("wbButton", ["$translate", function(a) {
	return {
		restrict: "EA",
		link: function(b, c, d) {
			WB2.anyWhere(function(a) {
				a.widget.connectButton({
					id: "wb_connect_btn",
					type: "3,2",
					callback: {
						login: function(a) {},
						logout: function() {}
					}
				})
			}), $("#wb_connect_btn").removeAttr("onclick").click(function(b) {
				return b.stopPropagation(), b.preventDefault(), alert(a.instant("common.register.WEIBO_SUCCESS")), !1
			})
		}
	}
}]);