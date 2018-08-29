angular.module("app", ["ui.router","security.authorization","ui.select","pascalprecht.translate","oc.lazyLoad","services.config","services.i18nNotifications","services.usercenter","app.directives.rightclick"/*,"security.thirdparty"*/]);
angular.module("app").config(["$stateProvider", "$locationProvider", "securityAuthorizationProvider", "uiSelectConfig", "$translateProvider", "$provide", "$httpProvider", function(a, b, c, d, e, f, g) {
	d.theme = "bootstrap";
	e.useStaticFilesLoader({
		prefix: PREFIX_URL + "assets/languages/",
		suffix: ".json"
	});

	var h = "zh-CN";
	"en-US" == h && $(document.body).addClass("en");
	e.preferredLanguage(h);

	g.interceptors.push(["$translate", "$rootScope", function(a, b) {
		var c = h.replace("-", "_");
		b.$on("$translateChangeSuccess", function() {
			c = a.use();
			c && (c = c.replace("-", "_"));
		});

		return {
			request: function(a) {
				return c && (a.headers["Accept-Language"] = c), a || $q.when(a)
			},
			response: function(a) {
				return a || $q.when(a)
			}
		}
	}])
}]);

angular.module("app").run(["security", "$rootScope", "configService", function(a, b, c) {
	b.CLIENT_CDN = CLIENT_CDN;
	b.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
	b.PREFIX_SERVER_HOST = PREFIX_URL;
	b.PREFIX_CLIENT_HOST = PREFIX_HOST;
	b.PREFIX_S3_URL = PREFIX_S3_URL;

	a.requestCurrentUser();

	b.tuijian_url = tuijian_url;
	b.tuijian_pic_url = tuijian_pic_url;
	b.your_demain_beian = your_demain_beian;
	b.your_demain = your_demain;
	b.your_huisi_pic_url = your_huisi_pic_url;
	b.logoSrc = CLIENT_CDN + "assets/images/logo.png";

	c.getLogo().then(function(a) {
		try {
			b.logoSrc = a.data
		} catch (c) {
			b.logoSrc = CLIENT_CDN + "assets/images/logo.png"
		}
	}, function() {
		b.logoSrc = CLIENT_CDN + "assets/images/logo.png"
	});

	b.load2 = function() {
		$("#eq_main").scroll(function() {
			s = $("#eq_main").scrollTop();
			s > 100 ? $(".scroll").css("display", "block") : $(".scroll").css("display", "none")
		})
	};

	b.appIconDown = !0;
	b.downApp = function() {
		b.appIconDown = !1
	};

	b.closeDown = function() {
		b.appIconDown = !0
	};

	b.appIconDown = !0;
	b.downApp = function() {
		b.appIconDown = !1
	};

	b.closeDown = function() {
		b.appIconDown = !0
	};

	b.appIconDown = !0;

	b.downApp = function() {
		b.appIconDown = !1;

	}, b.closeDown = function() {
		b.appIconDown = !0;

	}, b.goTop = function() {
		$("#eq_main").scrollTop(0);

	}, b.$on("$stateChangeSuccess", function(a, c) {
		c.$$state && (b.feedBackUrl = c.$$state.feedBackUrl);
	})
}]);
angular.module("app").run(["$state", "$rootScope", "$location", function(a, b, c) {
	b.$on("$locationChangeStart", function() {
		b.branchid && c.search("branchid", b.branchid);
		$(".modal").remove();
		$(".modal-backdrop").remove();
	});
	var d = c.path;
	c.path = function(e, f) {
		if (f === !1) {
			var g = a.current;
			h = b.$on("$locationChangeSuccess", function() {
				a.current = g;
				h();
			});
		}
		return d.apply(c, [e])
	}
}]), angular.module("app").run(["$templateCache", function(a) {
	a.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="prev eqf-chevron-small-left" ng-click="prev()" ng-show="slides.length > 1"></a>\n    <a class="next eqf-chevron-small-right" ng-click="next()" ng-show="slides.length > 1"></a>\n</div>\n')
}]);


angular.module("app").controller("AppCtrl",["$translate", "$window", "$rootScope", "$location", "$state", "$modal", "security", "$stateParams", "$timeout", "i18nNotifications", "usercenterService", /*"thirdpartyService",*/ "$modalStack","$ocLazyLoad", function(a, c, $rootScope, f, g, h, security, k, l, m, n, /*o,*/ p,$ocLazyLoad) {
	function getSysMsgHasRead() {
		return sessionStorage.getItem("sysMsgHasRead")
	}
	$rootScope.newMsgCount = 0;
	$rootScope.sysNewCount = 0;
	function getNewMessage(list) {
		n.getNewMessage(list).then(function(response) {
			for(var i = 0; i< response.data.list.length; i++){
				if(response.data.list[i].status == 1 && response.data.list[i].bizType == 1){//未读系统公告
					$rootScope.sysMsgs.length < 6 && $rootScope.sysMsgs.push(response.data.list[i]);
					$rootScope.sysNewCount++;
				}

				if(response.data.list[i].status == 1){//未读信息
					$rootScope.newMsgs.length < 6 && $rootScope.newMsgs.push(response.data.list[i]);
					$rootScope.newMsgCount++;
				}
				
			}
			//if(list.type){
				//$rootScope.sysMsgs = response.data.list;
				/*$rootScope.sysMsgs.length > 0 && angular.forEach($rootScope.sysMsgs, function(data,index,array){
					$rootScope.sysMsgs[index].content = $sce.trustAsHtml(data.content);
				});*/
			//} else {
				//$rootScope.newMsgs = response.data.list;
				/*$rootScope.newMsgs.length > 0 && angular.forEach($rootScope.newMsgs, function(data,index,array){
					$rootScope.newMsgs[index].content = $sce.trustAsHtml(data.content);
				});*/
			//}
		})
	}
	$rootScope.openSysMsg = !1;
	$rootScope.openSysMsgDialog = !getSysMsgHasRead();
	$rootScope.closeSysMsgDialog = function() {
		$rootScope.openSysMsgDialog = !$rootScope.openSysMsgDialog;
		sessionStorage.setItem("sysMsgHasRead", "true");

	};

	$rootScope.notifications = m;
	$rootScope.removeNotification = function(a) {
		m.remove(a)
	};
	c.setValue = function(a) {
		$rootScope.thirdpartyLoginParam = a;
		$rootScope.$apply();
	};
	$rootScope.$watch("thirdpartyLoginParam", function(a, b) {
		$ocLazyLoad.load("services/security.thirdparty").then(function(){
			if(a){
				if(a.state && /WECHAT_STATE/.test(a.state)){
					o.weiChatLogin(a.code).then(function(a) {
						200 == a.data.code && (f.path("main"), security.setLoginSuccess(!0));
					})
				}else{
					o.qqLogin(a.access_token, a.expires_in);
				}
			}
		});
	}), $rootScope.$on("$locationChangeStart", function(a) {
		if("/home/login" != f.path() || security.currentUser){
			0 !== f.path().indexOf("/home/register") || security.currentUser || security.showRegister(s);
		}else{
			security.showLogin();
		}

		security.isAuthenticated() && ("/home" == f.path() || "/home/login" == f.path()) && f.path("main");

		if (f.search().resetToken) {
			var b = f.search().resetToken;
			security.requestResetPassword(b)
		}
		var c = p.getTop();
		c && p.dismiss(c.key)
	});
	$rootScope.openLogin = function() {
		f.path("/home/login", !1)
	};
	var s;
	$rootScope.openRegister = function(a) {
		s = a;
		f.path("/home/register", !1);
	};

	$rootScope.isAuthenticated = security.isAuthenticated;
	f.search().branchid && ($rootScope.branchid = f.search().branchid);
	$rootScope.sysMsgs = [];
	$rootScope.newMsgs = [];

	$rootScope.$watch(function() {
			return security.currentUser
		}, function(a) {
			if(a){
				$rootScope.user = a;
				$rootScope.user = a;
				$rootScope.userProperty = a;
				$rootScope.isEditor = security.isEditor();
				$rootScope.isEditor = security.isEditor();
				$rootScope.isAdvancedUser = security.isAdvancedUser();
				$rootScope.isAdvancedUser = security.isAdvancedUser();
				$rootScope.isVendorUser = security.isVendorUser();
				$rootScope.isVendorUser = security.isVendorUser();
				$rootScope.$broadcast("currentUser", a);
				if(security.isAuthenticated()){
					("/home" == f.path() || "/home/login" == f.path()) && f.path("main");
					/*getNewMessage({//»ñÈ¡
						pageNo: 1,
						pageSize: 10,
						unread: !0,
						type: !0
					});*/
					getNewMessage({}/*{
						pageNo: 1,
						pageSize: 10,
						unread: !0
					}*/);
				}
			}
		}, !0);
	$rootScope.$on("addBranch", function(a, b) {
		for (var c = 0; c < $rootScope.userbranches.length; c++) {
			if (b.id == $rootScope.userbranches[c].id) {
				return;
			}
		}
		$rootScope.userbranches.unshift(b);
	}), $rootScope.showBoardsDropdown = function() {
		$rootScope.isProjectsDropdownVisible = !0;

	}, $rootScope.hideBoardsDropdown = function() {
		$rootScope.isProjectsDropdownVisible = !1;
	};
	var t = $(document);
	t.scroll(function() {
		var a = t.scrollTop();
		if(a > 180){
			$(".header-contain", t).addClass("head-shadow");
		}else{
			$(".header-contain", t).removeClass("head-shadow");
		}

	}), $rootScope.$watch("branchid", function() {
		$rootScope.hideOpea = !! $rootScope.branchid;

	}), $rootScope.openReg = function() {
		h.open({
			windowClass: "request_contain",
			templateUrl: "usercenter/request_reg.tpl.html",
			controller: "UsercenterrequestCtrl",
			resolve: {}
		}).result.then(function() {}, function() {})
	}, $rootScope.login = function() {
		security.showLogin();

	}, $rootScope.register = function() {
		security.showRegister();

	}, $rootScope.showToolBar = function() {
		return f.$$path.indexOf("/scene/create") < 0;

	}, $rootScope.showPanel = function() {
		$("#helpPanel").stop().animate({
			right: "0"
		}, 500);

	}, $rootScope.hidePanel = function() {
		$("#helpPanel").stop().animate({
			right: "-120"
		}, 500);

	};

	$rootScope.suggestionUrl = "http://bbs.e.wesambo.com/forum.php?mod=forumdisplay&fid=45";
	$rootScope.feedbackUrl = "http://bbs.e.wesambo.com/forum.php?mod=forumdisplay&fid=46";
	$rootScope.qqChatUrl = "http://shang.qq.com/wpa/qunwpa?idkey=4a2d63670009360b878aa9a1e1437ef4caec132f74a0e2c4df4a686168cc73dc";
	$rootScope.helpUrl = "http://bbs.e.wesambo.com/forum.php";
	$rootScope.createSkillUrl = "http://bbs.e.wesambo.com/forum.php?gid=37";
	$rootScope.safeApply = function(a) {
		var b = this.$root.$$phase;
		"$apply" == b || "$digest" == b ? a && "function" == typeof a && a() : this.$apply(a)
	};
	$rootScope.changeLanguage = function(b) {
		a.use(b);
		window.localStorage.setItem("preferredLanguage", b);
		g.reload();
		"en-US" === b ? $(document.body).addClass("en") : $(document.body).removeClass("en");
	}
}]).filter("fixnum", ["$translate", function($translate) {
	return function(b) {
		var c = b;
		if(b >= 1e4 && 1e8 > b){
			c = (b / 1e4).toFixed(1) + $translate.instant("UNIT1");
		}else if(b >= 1e8){
			c = (b / 1e8).toFixed(1) + $translate.instant("UNIT2");
		}

		return c
	}
}]);