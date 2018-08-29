 angular.module("services.modal", ["confirm-dialog", "message-dialog", "bindemail-dialog"]).factory("ModalService", ["$modal", function(a) {
	var b = {};
	return b.openBindEmailDialog = function() {
		a.open({
			keyboard: !1,
			backdropClick: !0,
			windowClass: "confirm-dialog",
			templateUrl: "/Public/eq/6.0/templates/bindemail.tpl.html",
			controller: "BindEmailDialogCtrl"
		})
	}, b.openConfirmDialog = function(b, c, d) {
		a.open({
			backdrop: "static",
			keyboard: !1,
			backdropClick: !1,
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/confirm.tpl.html",
			controller: "ConfirmDialogCtrl",
			resolve: {
				confirmObj: function() {
					return b
				}
			}
		}).result.then(c, d)
	}, b.openMsgDialog = function(b, c, d) {
		a.open({
			backdrop: "static",
			keyboard: !1,
			backdropClick: !1,
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/message.tpl.html",
			controller: "MessageDialogCtrl",
			resolve: {
				msgObj: function() {
					return b
				}
			}
		}).result.then(c, d)
	}, b.openActionResultDialog = function(b, c, d){
		a.open({
			backdrop: "static",
			keyboard: !1,
			backdropClick: !1,
			windowClass: "console six-contain",
			templateUrl: "/Public/eq/6.0/templates/action-result-message.tpl.html",
			controller: "ActionResultCtrl",
			resolve: {
				tipObj: function() {
					return b
				}
			}
		}).result.then(c, d)
	},b
}]);