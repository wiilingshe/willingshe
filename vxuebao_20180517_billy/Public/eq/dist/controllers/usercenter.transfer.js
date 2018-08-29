angular.module("usercenter.transfer", ["services.usercenter"]),
	angular.module("usercenter.transfer").controller("UsercentertransferCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "username", "$translate", function(a, b, c, d, e, f, g, h, i, j, k) {		
		/*b.transfer = !0;
		b.userXd = {
			toUser: "",
			xdCount: ""
		};
		b.submit = !1;
		b.getUserXd = function() {
			e.getUserXd().then(function(a) {
				a.data.success && (b.xdCount = a.data.obj);
			})
		};
		b.getUserXd();

		b.confirm = function() {
			b.submit = !0;
			b.getgiveXd();
		}, b.checkEmailFormat = function(a) {
			if(a.toUser){
				if(a.toUser == j){
					b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR2");
					$(".username").addClass("error");
					return !1;
				}else{
					b.mailFormatErr = "";
					return !0;
				}
			}else{
				b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR1");
				$(".username").focus();
				return !1;
			}

		}, b.checkXdFormat = function(a) {
			if(/^\+?[1-9][0-9]*$/.test(a.xdCount)){
				if(b.userXd.xdCount > b.xdCount){
					b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR2");
					return !1;
				}else{
					b.xdFormatErr = "";
					return !0;
				}

			}else{
				b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR1");
				return !1;
			}

		}, b.getgiveXd = function() {
			b.checkEmailFormat(b.userXd) && b.checkXdFormat(b.userXd) && e.getgiveXd(b.userXd).then(function(a) {
				if(200 == a.data.code){
					b.$close();
				}else if(1003 == a.data.code){
					b.mailFormatErr = a.data.msg;

				}else if(1010 == a.data.code){
					b.xdFormatErr = a.data.msg;

				}
			})
		}, b.cancel = function() {
			b.$close()
		}*/
		b.transfer = !0, b.userXd = {
			toUser: "",
			xdCount: ""
		}, b.submit = !1, b.getUserXd = function() {
			e.getUserXd().then(function(a) {
				a.data.success && (b.xdCount = a.data.obj)
			})
		}, b.getUserXd(), b.confirm = function() {
			b.submit = !0, b.getgiveXd()
		}, b.checkEmailFormat = function(a) {
			if(a.toUser){
				if(a.toUser == j){
					b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR2");
					$(".username").addClass("error");
					return !1;
				}else{
					b.mailFormatErr = "";
					return !0;
				}
			}else{
				b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR1");
				$(".username").focus();
				return !1;
			}
		}, b.checkXdFormat = function(a) {
			if(/^\+?[1-9][0-9]*$/.test(a.xdCount)){
				if(b.userXd.xdCount > b.xdCount){
					b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR2");
					return !1;
				}else{
					b.xdFormatErr = "";
					return !0;
				}
			}else{
				b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR1");
				return !1;
			}
		}, b.getgiveXd = function() {
			b.checkEmailFormat(b.userXd) && b.checkXdFormat(b.userXd) && e.getgiveXd(b.userXd).then(function(a) {
				if(200 == a.data.code){
					b.$close();
				}else if(1003 == a.data.code){
					b.mailFormatErr = a.data.msg;
				}else if(1010 == a.data.code){
					b.xdFormatErr = a.data.msg;
				}
			})
		}, b.cancel = function() {
			b.$close();
		}
	}]);