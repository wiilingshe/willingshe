angular.module("security.service", ["security.retryQueue", /*"security.login", "security.register",*/ "security.authority", "ui.bootstrap.modal"/*,"oc.lazyLoad"*/]).factory("security", ["$rootScope", "$http", "$q", "$location", "securityRetryQueue", "$modal", /*"ModalService",*/ "authority","$ocLazyLoad", function(a, b, c, d, e, f, /*g,*/ h,$ocLazyLoad) {
	function i(a) {
		a = a || "/", window.location.href = a
	}
	function j() {
		if (u && (k(u, !1), u = null), s) throw new Error("Trying to open a dialog that is already open!");
		$ocLazyLoad.load('controllers/security.login.form').then(function() {
			s = f.open({
				windowClass: "login-container",
				keyboard: !1,
				templateUrl: "/Public/eq/6.0/templates/login.form.tpl.html",
				controller: "LoginFormController"
			}), s.result.then(l, l);
        }, function(e) {
            console.log(e);
        });
	}
	function k(a, b) {
		a.close(b)
	}
	function l(a) {
		s = null, a ? ("/home/login" == d.path() && d.path("/home", !1), e.retryAll()) : (e.cancelAll(), i())
	}
	function m(a) {
		if (t) throw new Error("Trying to open a dialog that is already open!");
		$ocLazyLoad.load('controllers/security.login.reset').then(function() {
			t = f.open({
				windowClass: "login-container",
				keyboard: !1,
				templateUrl: "/Public/eq/6.0/templates/login.reset.tpl.html",
				controller: "ResetFormController",
				resolve: {
					resetKey: function() {
						return a
					}
				}
			}), t.result.then(function() {
				t = null
			}, function() {
				x.currentUser || d.path("/home", !1).search({}), t = null
			});
        }, function(e) {
            console.log(e);
        });
		
	}
	function n(a) {
		if (s && (k(s, !0), s = null), u) throw new Error("Trying to open a dialog that is already open!");
		$ocLazyLoad.load('controllers/security.register.form').then(function() {
			u = f.open({
				windowClass: "login-container",
				keyboard: !1,
				templateUrl: "/Public/eq/6.0/templates/register.form.tpl.html",
				controller: "RegisterFormController",
				resolve: {
					regMsg: function() {
						return a
					}
				}
			}), u.result.then(function() {
				u = null
			}, function() {
				"/home/register" == d.path() && d.path("/home", !1), u = null
			});
        }, function(e) {
            console.log(e);
        });
	}
	function o(a) {
		if (v) throw new Error("Trying to open a dialog that is already open!");
		$ocLazyLoad.load('controllers/security.otherregister.form').then(function() {
			v = f.open({
				windowClass: "login-container",
				keyboard: !1,
				templateUrl: "/Public/eq/6.0/templates/register.otherregister.tpl.html",
				controller: "OtherRegisterFormController",
				resolve: {
					otherRegisterInfo: function() {
						return a
					}
				}
			});
        }, function(e) {
            console.log(e);
        });
	}
	function p(a) {
		w = a
	}
	function q() {
		return w
	}
	function r() {
		s = null
	}
	var s = null,
		t = null,
		u = null,
		v = null;
	e.onItemAddedCallbacks.push(function(a) {
		e.hasMore() && x.showLogin()
	});
	var w = {},
		x = {
			getLoginReason: function() {
				return e.retryReason()
			},
			showLogin: function() {
				j()
			},
			showRegister: function(a) {
				n(a)
			},
			showOtherRegister: function() {
				o()
			},
			getUserDetail: function(a, c, d) {
				var e = PREFIX_URL + "base/relUserInfo?type=" + a + "&openId=" + c + "&accessToken=" + d,
					f = new Date;
				return e += "&date=" + f.getTime(), b({
					method: "GET",
					url: e,
					withCredentials: !0
				})
			},
			checkUniqueness: function(a) {
				var c = PREFIX_S1_URL + "index.php?c=user&a=checkN&username=" + a,
					d = new Date;
				return c += "&date=" + d.getTime(), b({
					method: "GET",
					url: c,
					withCredentials: !0
				})
			},
			addRegisterInfo: p,
			getRegisterInfo: q,
			login: function(a) {
				var c = this,
					e = b.post(PREFIX_URL + "index.php?c=user&a=login", a, {
						withCredentials: !0,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						}
					});
				return e.then(function(a) {
					return 200 === a.status ? (c.isValidateCodeLogin = !1, a.data.success === !0 ? (k(s, !0), x.requestCurrentUser().then(function() {
						("/home" == d.path() || "/home/login" == d.path()) && d.path("main")
					}), a.data) : a.data) : void x.isAuthenticated()
				}, function(a) {
					x.isAuthenticated()
				})
			},
			closeLoginDialog: r,
			register: function(a, c) {
				var e = b.post(PREFIX_URL + "index.php?c=user&a=register" + c, a, {
					withCredentials: !0,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				});
				return e.then(function(a) {                                            
					if (200 === a.status) {
                                                alert(a.data.msg);d.path("home/login");return;
						if (a.data.success !== !0) return a.data;
						("/home" == d.path() || "/home/register" == d.path()) && d.path("main"), x.requestCurrentUser(), k(u, !0)
					} else x.isAuthenticated()
				}, function(a) {
					x.isAuthenticated()
				})
			},
			qqLogin: function(a, b) {
				x.getThirdPartyInfo(a).then(function(c) {
					var d = c.openid,
						e = (c.client_id, {
							email: "",
							password: "",
							openId: d,
							accessToken: a,
							type: "qq",
							expires: b
						});
					x.thirdPartLogin(e)
				})
			},
			thirdPartLogin: function(a) {
				var c = b.post(PREFIX_URL + "index.php?c=otherlogin", $.param(qqRegisterInfo), {
					withCredentials: !0,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				});
				return c.then(function(a) {
					if (200 === a.status) {
						if (a.data.success !== !0) return a.data;
						("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), x.setLoginSuccess(!0), x.requestCurrentUser(), k(v, !0)
					} else x.isAuthenticated()
				}, function(a) {
					x.isAuthenticated()
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
			cancelRegister: function() {
				u = null, d.path("/home", !1)
			},
			hasRel: function(a) {
				u && k(u, !1);
				var c = new Date,
					e = PREFIX_URL + "base/user/hasRel?type=" + a.type + "&openId=" + a.openId + "&time=" + c.getTime(),
					f = b.get(e, {
						withCredentials: !0
					});
				f.then(function(b) {
					200 === b.status ? b.data.success === !0 ? (("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), x.requestCurrentUser()) : "未关联账号" == b.data.msg && o(a) : x.isAuthenticated()
				}, function(a) {
					x.isAuthenticated()
				})
			},
			cancelLogin: function() {
				s = null, d.path("/home", !1)
			},
			logout: function(a) {
				b({
					withCredentials: !0,
					method: "GET",
					url: PREFIX_URL + "?c=user&a=logout"
				}).then(function(b) {
					x.currentUser = null, i(a)
				}, function() {
					x.currentUser = null, i(a)
				})
			},
			userPromise: null,
			requestCurrentUser: function() {
				if (x.isAuthenticated()) return c.when(x.currentUser);
				var a = new Date;
				return x.userPromise ? x.userPromise : (x.userPromise = b.get(PREFIX_URL + "index.php?c=user&a=check&time=" + a.getTime(), {
					withCredentials: !0
				}).then(function(a) {
					return x.userPromise = null, a.data.success && (x.currentUser = a.data.obj, (!x.currentUser.roleIdList || x.currentUser.roleIdList.length <= 0) && (x.currentUser.roleIdList = [2])), x.currentUser
				}, function() {
					x.userPromise = null
				}), x.userPromise)
			},
			resetPassByKey: function(a, c) {
				var d = {
					key: c,
					newPwd: a
				};
				return b.post(PREFIX_URL + "index.php?c=user&a=reset_password", $.param(d), {
					withCredentials: !0,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				})
			},
			currentUser: null,
			isAuthenticated: function() {
				return !!x.currentUser
			},
			isLoginSuccess: !1,
			setLoginSuccess: function(a) {
				x.isLoginSuccess = a
			},
			thirdPartyUrl: {
				weiChatUrl: "https://open.weixin.qq.com/connect/qrconnect?appid=wxc5f1bbae4bb93ced&redirect_uri=http%3A%2F%2Fe.wesambo.com&response_type=code&scope=snsapi_login&state=WECHAT_STATE#wechat_redirect",
				qqUrl: "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id="+client_id+"&redirect_uri="+redirect_uri+"&scope=get_user_info",
				weiboUrl: "https://api.weibo.com/oauth2/authorize?client_id=3508809852&response_type=token&redirect_uri=http://e.wesambo.com"
			},
			isAllowToAccess: function(a) {
				if (!x.currentUser) return !1;
				var b = h.userRoleDef[x.currentUser.type];
				return b && (b.code & a) > 0 ? !0 : !1
			},
			accessDef: h.accessDef,
			isEditor: function() {
				if (!x.currentUser) return !1;
				var a = x.currentUser.roleIdList;
				if (!a) return !1;
				for (var b = 0; b < a.length; b++) if ("4" == a[b]) return !0;
				return !1
			},
			isAdvancedUser: function() {
				return x.currentUser && "3" == x.currentUser.type ? !0 : !1
			},
			isVendorUser: function() {
				return x.currentUser && "4" == x.currentUser.type ? !0 : !1
			},
			requestResetPassword: function(a) {
				m(a)
			},
			validateToken: function(a) {
				var c = "changepw?token=" + a;
				return b.get(PREFIX_URL + c, {
					withCredentials: !0
				})
			},
			resetPassword: function(a, c) {
				var d = PREFIX_URL + "index.php?c=Usercenter&a=changePwd",
					e = {
						oldPwd: a,
						newPwd: c
					};
				return b.post(d, $.param(e), {
					withCredentials: !0,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				})
			},
			retrievePassword: function(a, c, d, e) {
				var f = PREFIX_URL + "index.php?c=user&a=forget_password",
					g = {
						email: a,
						geetest_challenge: c,
						geetest_validate: d,
						geetest_seccode: e
					};
				return b.post(f, $.param(g), {
					withCredentials: !0,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				})
			}
		};
	return x
}]);