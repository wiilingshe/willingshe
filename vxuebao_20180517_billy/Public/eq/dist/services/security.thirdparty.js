angular.module("security.thirdparty", ["security.service"]).factory("thirdpartyService", ["$rootScope", "$http", "$location", "$window", "security", "$translate", "i18nNotifications", function(a, b, c, d, e, f, g) {
	function h(a) {
		var b = "https://graph.qq.com/oauth2.0/authorize?",
			c = client_id,
			d = ["client_id=" + c, "redirect_uri=" + a, "scope=get_user_info", "response_type=token"],
			e = d.join("&");
		return j = b + e
	}
	function i(a) {
		var b = "https://open.weixin.qq.com/connect/qrconnect?",
			c = "wx5a3ca7ea184c3a3b",
			d = ["appid=" + c, "redirect_uri=" + a, "scope=snsapi_login", "response_type=code", "state=WECHAT_STATE#wechat_redirect"],
			e = d.join("&");
		return k = b + e
	}
	var j, k, l = {
		qqUrl: h,
		wxUrl: i,
		qqLogin: function(a, b) {
			l.getThirdPartyInfo(a).then(function(c) {
				var d = c.openid,
					e = (c.client_id, {
						email: "",
						password: "",
						openId: d,
						accessToken: a,
						type: "qq",
						expires: b
					});
				l.thirdPartLogin(e)
			})
		},
		thirdPartLogin: function(a) {
			var d = b.post(PREFIX_URL + "index.php?c=otherlogin", $.param(a), {
				withCredentials: !0,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			});
			return d.then(function(a) {
				if (200 === a.status) {
					if (a.data.success !== !0) return a.data;
					("/home" == c.path() || "/home/login" == c.path()) && c.path("main"), e.setLoginSuccess(!0), e.requestCurrentUser()
				} else e.isAuthenticated()
			}, function(a) {
				e.isAuthenticated()
			})
		},
		getThirdPartyInfo: function(a) {
			var b = "https://graph.qq.com/oauth2.0/me?access_token=" + a;
			return $.ajax({
				type: "get",
				url: b,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "callback",
				xhrFields: {
					withCredentials: !0
				}
			})
		},
		weiChatLogin: function(a) {
			return b.post(PREFIX_URL + "index.php?c=otherlogin&code=" + a + "&type=weixin&time=" + (new Date).getTime(), {}, {
				withCredentials: !0,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			})
		},
		unbindRelation: function(c) {
			var d = {
				type: c
			},
				e = "m/u/unRelation";
			b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + e,
				data: $.param(d),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(function(b) {
				b.data.success && a.$broadcast("mail.unbind.success", c)
			})
		},
		wxBindAccount: function(a) {
			l.bindAccountCommon(a)
		},
		qqBindAccount: function(a) {
			l.getThirdPartyInfo(a.access_token).then(function(b) {
				var c = b.openid,
					d = (b.client_id, {
						openId: c,
						accessToken: a.access_token,
						expires: a.expires_in,
						type: "qq"
					});
				l.bindAccountCommon(d)
			}, function(a) {})
		},
		bindAccountCommon: function(c) {
			var d = "m/u/bind/third";
			b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + d,
				data: $.param(c),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(function(b) {
				b.data.success ? a.$broadcast("rel.success", c.type) : g.pushForCurrentRoute("already.bind.error", "notify.success", {
					msg: b.data.msg
				})
			}, function(a) {
				alert(f.instant("common.security.SERVER_ERROR"))
			})
		},
		openThirtyPartyWindow: function(a) {
			var b, c = redirect_uri;
			"qq" == a ? b = l.qqUrl(c) : "weixin" == a && (b = l.wxUrl(c)), d.open(b, "_blank", "width=600,height=600,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes")
		}
	};
	return l
}]);