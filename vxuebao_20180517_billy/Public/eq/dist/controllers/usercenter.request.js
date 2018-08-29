angular.module("usercenter.request", ["services.usercenter", "app.directives.qrcode"]),
	angular.module("usercenter.request").controller("UsercenterrequestCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", function(a, b, c, d, e, f, g, h, i) {		
		b.PREFIX_CLIENT_HOST = PREFIX_HOST;
		b.currentUser = f.currentUser;
		b.cancel = function() {
			b.$dismiss();
		}
	}]);