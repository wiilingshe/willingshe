angular.module("bindemail-dialog", []).controller("BindEmailDialogCtrl", ["$scope", function(a) {}]);
angular.module("confirm-dialog", []).controller("ConfirmDialogCtrl", ["$scope", "confirmObj","$sce", function(a, b,$sce) {
	a.confirmObj = b;
	a.bgStyle = b.bgStyle ? b.bgStyle : null;
	a.confirmObj.msg = $sce.trustAsHtml(a.confirmObj.msg);
	a.ok = function() {
		a.$close()
	}, a.cancel = function() {
		a.$dismiss()
	}
}]);
angular.module("message-dialog", []).controller("MessageDialogCtrl", ["$scope", "msgObj","$sce", function(a, b,$sce) {
	b.msg = $sce.trustAsHtml(b.msg);
	a.bgStyle = b.bgStyle ? b.bgStyle : null
	a.msgObj = b, a.close = function() {
		a.$close()
	}, a.cancel = function() {
		a.$dismiss()
	}
}]);
angular.module("action-result-message", []).controller("ActionResultCtrl", ["$scope", "tipObj","$sce", function(a, b,$sce) {
	b.msg = $sce.trustAsHtml(b.msg);
	a.isSuccess = b.success;
	a.bgStyle = b.bgStyle ? b.bgStyle : {
		backgroundColor: 'rgba(0,0,0,.3)',
		position: 'fixed',
		top: 0, 
		bottom: 0,
		left: 0,
		right: 0
	};
	a.msgObj = b, a.close = function() {
		a.$close()
	}, a.cancel = function() {
		a.$dismiss()
	}
}]);