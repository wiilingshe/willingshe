angular.module("usercenter.branch.reset", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.branch.reset").controller("ResetBranchPassCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "branch", "i18nNotifications", function(a, b, c, d, e, f, g, h, i, j, k) {		
		b.branch = j, b.reset = function() {
			e.resetBranchPass(j.id);

		}, b.cancel = function() {
			b.$dismiss();

		}, b.$on("reset.branch.success", function() {
			b.$close();

		})
	}]);