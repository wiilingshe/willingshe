/*angular.module("main.transferScene", ["services.scene"]), angular.module("main.transferScene").controller("TransferSceneCtrl", ["$scope", "$rootScope", "sceneService", "sceneId", "$translate", function(a, b, c, d, e) {
	a.model = {
		toUser: ""
	}, a.transferScene = !0, a.confirm = function() {
		return a.model.toUser ? a.model.toUser == b.user.loginName ? void(a.actionerror = e.instant("main.TRANSFER_SELF")) : void c.transferScene(d.sceneId, a.model.toUser).then(function(b) {
			200 == b.data.code ? a.transferScene = !1 : a.actionerror = b.data.msg
		}) : void(a.actionerror = e.instant("main.EMPTY_ACCOUTN"))
	}, a.cancel = function() {
		a.$close()
	}
}]);*/
angular.module("main.transferScene", ["services.usercenter"]), angular.module("main.transferScene").controller("TransferSceneCtrl", ["$scope", "$rootScope", "sceneService", "sceneId", "$translate", function(a, b, c, d, e) {
	a.model = {
		toUser: ""
	};
	a.transferScene = !0;
	a.confirm = function() {
		if(a.model.toUser){
			if(a.model.toUser == b.user.loginName){
				return void(a.actionerror = e.instant("main.TRANSFER_SELF"));
			}else{
				return void c.transferScene(d.sceneId, a.model.toUser).then(function(b) {
					200 == b.data.code ? a.transferScene = !1 : a.actionerror = b.data.msg
				})
			}
		}else{
			return void(a.actionerror = e.instant("main.EMPTY_ACCOUTN"));
		}
	}, a.cancel = function() {
		a.$close();
	}
}]);