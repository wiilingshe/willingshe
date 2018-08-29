angular.module("security.login.toolbar",[])
.directive("loginToolbar", ["security", "$rootScope", "$location", function(security, $rootScope,$location) {
		var e = {
			templateUrl: "/Public/eq/6.0/templates/login.toolbar.tpl.html",
			restrict: "E",
			replace: !0,
			scope: !0,
			link: function(iScope, iElem, iAttrs, g) {
				iScope.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
				iScope.isAuthenticated = security.isAuthenticated;
				iScope.login = security.showLogin;
				iScope.logout = security.logout;
				iScope.requestResetPassword = security.requestResetPassword;
				iScope.isAdvancedUser = $rootScope.isAdvancedUser;
				iScope.isEditor = $rootScope.isEditor;
				iScope.isVendorUser = $rootScope.isVendorUser;

				iScope.$watch(function() {
					return security.currentUser
				}, function(newVal) {
					iScope.currentUser = newVal;
					if(iScope.currentUser.headImg){
						/^http.*/.test(newVal.headImg) && (iScope.headImg = newVal.headImg);
					}else{
						iScope.headImg = CLIENT_CDN + "assets/images/defaultuser.jpg";
					}

				});

				iScope.$on("headImg.change", function(event, data) {
					iScope.currentUser.headImg = data
				}), iScope.$on("minusCount", function(event, data) {
					iScope.count -= data;
					iScope.newMsgCount = iScope.count > 9 ? "9+" : iScope.count;

				}), iScope.changeCurrent = function() {
					$rootScope.branchid = "";
					$location.search("branchid", null);
					$location.path("/usercenter/children");

				}, iScope.openMsgPanel = function() {
					!$(".mes_con").hasClass("open");

				}
			}
		};
		return e
	}]);