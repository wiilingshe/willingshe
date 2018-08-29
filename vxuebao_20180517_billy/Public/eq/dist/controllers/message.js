angular.module("message", []),
	angular.module("message").controller("MessageCtrl", ["$scope", "$rootScope", "usercenterService",function($scope, $rootScope, usercenterService) {
		$scope.toPage = 1;
		$scope.currentPage = 1;
		$scope.pageSize = 6;
		/*$scope.currentPage = {
			msgCurrentPage: 1,
			branchCurrentPage: 1
		};*/
		//消息分类
		$scope.branchs =  [{
			name: "其他",
			value: "0"
		}, {
			name: "系统公告",
			value: "1"
		}, {
			name: "审核通知",
			value: "2"
		}];

		$scope.getNewsType = function(){
			$scope.getUserMsg($scope.type);
		}

		//获取消息数据
		$scope.getUserMsg = function() {
			$scope.unread = 0;
			var list = {
				pageNo: $scope.toPage,
				pageSize: $scope.pageSize,
				type: $scope.type && $scope.type.value ? $scope.type.value : null
			}
			usercenterService.getNewMessage(list).then(function(response) {
				angular.forEach(response.data.list, function(item, index) {
					if(0 == item.bizType){
						item.type = "其他";
					}else if(1 == item.bizType){
						item.type = "系统公告";
					}else if(2 == item.bizType){
						item.type = "审核通知";
					}
					if(item.status == 1){
						$scope.unread++;
					}
				});

				$scope.Msgs = response.data.list;

				$scope.msgCount = response.data.map.count;
				$scope.msgNumPages = Math.ceil($scope.msgCount / $scope.pageSize);
				//$scope.toPage = response.data.map.pageNo;
				$scope.currentPage = response.data.map.pageNo;
			})
		};
		$scope.getUserMsg();

		/*$scope.$watch("currentPage.msgCurrentPage", function(newVal, oldVal) {
			if(newVal != oldVal){
				$scope.toPage = newVal;
				$scope.getUserMsg();
			}

		});*/
		$scope.pageChanged = function(toPage) {
			$scope.selected && ($scope.selected = !$scope.selected);
			//$scope.currentPage[msgCurrentPage] = toPage;
			$scope.toPage = toPage;
			return 1 > toPage || toPage > $scope.msgCount / 6 + 1 ? void alert("此页超出范围") : (void $scope.getUserMsg());
		};

		$scope.selected = !1, $scope.news = {};
		var idList, list = [];
		$scope.selectAllMsg = function(msgList){//
			list = [];
			idList = null;
			$scope.selected = !$scope.selected;
			if($scope.selected){
				angular.forEach(msgList, function(item, index) {
					1 == item.status && list.push(item.id);
					$scope.news[item.id] = item;
					$scope.news[item.id].show = !0
				});

				idList = list.join();
			}else{
				angular.forEach(msgList, function(item, index) {
					$scope.news[item.id] = item;
					$scope.news[item.id].show = !1
				});
				list = [];
				idList = null;
			}
			
		};
		$scope.selectMsg = function(newMsg){
			$scope.news[newMsg.id] = newMsg;
			$scope.news[newMsg.id].show = !$scope.news[newMsg.id].show;
			if($scope.news[newMsg.id].show){
				1 == newMsg.status && list.push(newMsg.id);
			}else{
				if(list.length > 0){
					for(var i = 0; i<list.length; i++){
						if (list[i] == newMsg.id) {
							list.splice(i, 1);
						}
					}
				}
			}
			idList = list.join();
		}
		$scope.setRead = function(msgList) {
			if(idList){
				usercenterService.setRead(idList).then(function(response) {
					if(200 == response.data.code){
						$rootScope.$broadcast("minusCount", list.length);
						$scope.newMsgCount = 0;
						angular.forEach(msgList, function(item, index) {
							for(var i = 0; i < list.length; i++){
								if(parseInt(list[i]) == parseInt(item.id)){
									list.splice(i, 1);
									item.status = 0;
									$scope.unread > 0 && $scope.unread--;
								}
							}
						})
					}
				}) 
			}else{
				alert("没有未读信息！");
			}
			
		};
	}]);