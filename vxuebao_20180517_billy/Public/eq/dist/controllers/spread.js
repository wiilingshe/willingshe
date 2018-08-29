angular.module("spread", ["app.directives.pieChart", "app.directives.numChangeAnim", "spread.tab", "app.directives.qrcode", "app.directives.switchInput", "app.directives.copyButton", "app.spread.console","security.login.toolbar","ui.bootstrap","scene.preview"]),
angular.module("spread").controller("SpreadCtrl", ["$scope", "$rootScope", "$location", "$stateParams", "sceneService", "sceneViewService",function($scope, $rootScope, $location, $stateParams, sceneService, sceneViewService) {
	$scope.status = $rootScope.user.company_ext.data_permiss;
	$scope.viewControl = {};
	$scope.viewControl.tab = $stateParams.tab;
	$scope.sceneId = $stateParams.sceneId;

	var url, branchid = $rootScope.branchid;
	$scope.$watch("user", function(newVal) {
		newVal && (url = $rootScope.user && $rootScope.user.domain ? "http://" + $rootScope.user.domain : $rootScope.PREFIX_CLIENT_HOST, getMyScene())
	}, !0);
	$scope.getMyScene = getMyScene;

	$scope.sceneSettings = function(event) {
		event && event.stopPropagation();
		$location.path("scene/create/" + $scope.sceneId).search({
			pageId: 1,
			openSetting: "show"
		})
	};
	var getMyScene = function() {
		sceneViewService.getSceneData($scope.sceneId).then(function(sceneData){
			if(sceneData.data.list[0].properties && sceneData.data.list[0].properties.longpage && sceneData.data.list[0].properties.longpage.islongpage){
				$scope.islongpage = sceneData.data.list[0].properties.longpage.islongpage;
			}else{
				$scope.islongpage = !1;
			}
			$scope.sceneDetailPromise = sceneService.getSceneDetail($scope.sceneId, branchid);
			$scope.sceneDetailPromise.then(function(data) {
				$scope.scene = data.data.obj;
				$scope.url = $scope.selectedUrl = url + "/v-" + $scope.scene.code;
				if($scope.scene.accessCode){
					$scope.sceneStadus = "加密访问";
				}else{
					if(1 == $scope.scene.status){
						$scope.sceneStadus = "开放访问";
					}else{
						$scope.sceneStadus = "关闭访问";
					}
				}
			})
		});
			
	};
	$scope.showShare = function(tab) {
		$scope.viewControl.tab = tab;
		$scope.viewControl.subtab || ($scope.viewControl.subtab = "socialShare");
		$location.path("spread/share/" + $stateParams.sceneId + "/socialShare", !1);

	}, $scope.showStatistics = function(tab) {
		$scope.viewControl.tab = tab;
		$location.path("spread/statistics/" + $stateParams.sceneId, !1);

	}, $scope.dataCollect = function(tab) {
		$scope.viewControl.tab = tab;
		$location.path("spread/dataCollect/" + $stateParams.sceneId, !1);

	}, $scope.openScene = function(status, isOpen) {
		if(isOpen){
			sceneService.openScene($scope.scene.id).then(function(data) {
				data.data.success && ($scope.scene.status = 1)
			})
		}else{
			sceneService.closeScene($scope.scene.id).then(function(data) {
				data.data.success && ($scope.scene.status = 2)
			})
		}
	}
}]);