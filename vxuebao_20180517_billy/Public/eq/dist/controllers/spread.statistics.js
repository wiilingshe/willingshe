angular.module("spread.statistics").controller("StatisticsCtrl", ["$translate", "$scope", "$stateParams", "SpreadService", "$rootScope","security", function($translate, $scope, $stateParams, SpreadService, $rootScope, security) {
	$scope.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
	$scope.PREFIX_CLIENT_HOST = PREFIX_HOST;
	$scope.PREFIX_SERVER_HOST = PREFIX_URL;
	$scope.spreadViewGridOptions = {};
	$scope.spreadMobileGridOptions = {};
	$scope.spreadClickGridOptions = {};
	$scope.sceneDeviceData = [];
	$scope.expandWebs = [];
	$scope.totalItems = 0;
	$scope.page = {
		currentPage: 1
	};
	$scope.startDay = 1;
	$scope.toPage = "";
	$scope.dataPieChart = [];

	/*$scope.pageChanged = function(a) {
		if(1 > a || a > $scope.totalItems / 10 + 1){
			return void alert("此页超出范围");
		}else{
			$scope.pageData = $scope.mapOption.data.slice(10 * (a - 1), 10 * a - 1);
			return void($scope.currentPage = a);
		}
	};*/

	var k = $rootScope.branchid;
	$scope.isAllowedToAccessExpandWebsite = security.isAllowToAccess(security.accessDef.EXPAND_WEBSITE);
	$scope.viewStyle = "line";
	$scope.dataLineChartDataOption = {
		data: [
			[],
			[]
		],
		xAxis: []
	}, $scope.dataMobileChartOption = {
		data: [
			[],
			[],
			[],
			[]
		],
		xAxis: []
	}, $scope.contentDataOption = {
		data: [
			[],
			[]
		],
		xAxis: []
	}, $scope.showLine = function() {
		$scope.viewStyle = "line";

	}, $scope.showPie = function() {
		$scope.viewStyle = "pie";

	}, $scope.$on("scene.detail", function(event, sceneObj, user) {
		$scope.scene = sceneObj;
		if($scope.scene){
			switch($scope.scene.type){
				case 101:
					$scope.sceneType = $translate.instant("main.spread.expand.SCENE_TYPE1");
					break;
				case 102:
					$scope.sceneType = $translate.instant("main.spread.expand.SCENE_TYPE2");
					break;
				case 103:
					$scope.sceneType = $translate.instant("main.spread.expand.SCENE_TYPE3");
					break;
				case 104:
					$scope.sceneType = $translate.instant("main.spread.expand.SCENE_TYPE4");
					break;
				case 105:
					$scope.sceneType = $translate.instant("main.spread.expand.SCENE_TYPE5");
					break;
			}
		}

	});

	/*$scope.devicePie = !1;

	$scope.$on("scene.device", function(a, c, d, e, f) {
		if(0 === c.total){
			$scope.sceneDeviceData = [];
		}else{
			$scope.sceneDeviceData = c.data;
		}
	}), $scope.getDeviceDate = function(a, b, c) {
		SpreadService.getDevicePv(a, b, c);

	},*/$scope.$on("scene.data", function(event, chartData, d, e, f, g) {
		$scope.stats = chartData;
		paintCharts(d, e, f, g);

	});
	var paintCharts = function(a, c, d, e) {
		$scope.pageView = 0;
		$scope.spreadClickGridOptions.data = $scope.stats;
		$scope.xAxisData = [];
		$scope.viewLineChartData = [];
		$scope.dataLineChartData = [];
		$scope.dataLineChartFriendGroup = [];
		$scope.dataLineChartFriends = [];
		$scope.dataLineChartFriend = [];
		$scope.dataLineChartOther = [];
		$scope.viewLineTel = [];
		$scope.viewLineTab = [];
		$scope.dataPieChart = [];

		for (var f = 0, g = 0, h = 0, i = 0, j = 0, k = 0; k < $scope.stats.length; k++) {
			$scope.xAxisData.push($scope.stats[k].STAT_DATE);
			$scope.viewLineChartData.push($scope.stats[k].SHOW);
			$scope.dataLineChartData.push($scope.stats[k].DATA);
			$scope.dataLineChartFriendGroup.push($scope.stats[k].S_WX_TIMELINE);
			$scope.dataLineChartFriends.push($scope.stats[k].S_WX_GROUP);
			$scope.dataLineChartFriend.push($scope.stats[k].S_WX_SINGLE);
			$scope.viewLineTel.push($scope.stats[k].TEL);
			$scope.viewLineTab.push($scope.stats[k].LINK);
			$scope.dataOthers = $scope.stats[k].S_MOBILE - $scope.stats[k].S_WX_TIMELINE - $scope.stats[k].S_WX_SINGLE - $scope.stats[k].S_WX_GROUP;
			$scope.dataLineChartOther.push($scope.dataOthers);
			$scope.pageView += $scope.stats[k].SHOW;
			f += $scope.stats[k].S_MOBILE;
			g += $scope.stats[k].S_WX_TIMELINE;
			h += $scope.stats[k].S_WX_SINGLE;
			i += $scope.stats[k].S_WX_GROUP;
		}

		$scope.spreadMobile = !0;
		f = 1;
		if(f > 0){
			j = f - g - h - i;
			$scope.dataPieChart = [{
				value: g,
				name: "微信朋友圈"
			}, {
				value: i,
				name: "微信群"
			}, {
				value: h,
				name: "微信朋友"
			}, {
				value: j,
				name: "其他访问"
			}]
		}else{
			$scope.spreadMobile = !1
		}

		$scope.dataLineChartDataOption = {
			data: [$scope.viewLineChartData, $scope.dataLineChartData],
			xAxis: $scope.xAxisData
		};

		$scope.dataMobileChartOption = {
			data: [$scope.dataLineChartFriendGroup, $scope.dataLineChartFriends, $scope.dataLineChartFriend, $scope.dataLineChartOther],
			xAxis: $scope.xAxisData
		};

		$scope.contentDataOption = {
			data: [$scope.viewLineTel, $scope.viewLineTab],
			xAxis: $scope.xAxisData
		};

		$(".myGrid1").height(50 * ($scope.stats.length + 1) + 1);
		$(".myGrid1 .ui-grid-viewport").height(50 * $scope.stats.length + 1);
	};
	$scope.getAllStats = function(a, c, d) {
		$scope.model = {
			startTime: c,
			endTime: d
		};
		SpreadService.getSceneData(a, c, d, k, $scope.expandId);

	}, $scope.$on("webs.update", function(a) {
		$scope.expandWebs = SpreadService.expandWebs;

	}), $scope.viewExpandDetail = function(a, c) {
		$scope.selectIndex = c;
		$scope.expandId = a;
		if($scope.model){
			$scope.getAllStats($scope.scene.id, $scope.model.startTime, $scope.model.endTime);
		}else{
			$scope.getAllStats($scope.scene.id, -6, 1);
		}

	};
	if ($stateParams.sceneId) {
		//SpreadService.getWebList($stateParams.sceneId, !0, k);
		var m = new Date;
		m = new Date(m.getTime() - 864e5);
		//SpreadService.queryRegion($stateParams.sceneId, j("date")(m))
	}
	$scope.$on("region.update", function(a, c) {
		for (var d = 0; d < c.data.length; d++){
			if(c.data[d].name.indexOf("省") > -1 || c.data[d].name.indexOf("市") > -1){
				c.data[d].name = c.data[d].name.substr(0, c.data[d].name.length - 1);
			}
			switch(c.data[d].name){
				case "内蒙古自治区":
					c.data[d].name = "内蒙古";
					break;
				case "广西壮族自治区":
					c.data[d].name = "广西";
					break;
				case "西藏自治区":
					c.data[d].name = "西藏";
					break;
				case "新疆维吾尔自治区":
					c.data[d].name = "新疆";
					break;
				case "香港特别行政区":
					c.data[d].name = "香港";
					break;
				case "宁夏回族自治区":
					c.data[d].name = "宁夏";
					break;
				case "澳门特别行政区":
					c.data[d].name = "澳门";
					break;
			}
		}
		if (c.max > 0) {
			var e = c.max.toString();
			c.max = (parseInt(e[0], 10) + 1) * Math.pow(10, e.length - 1);
		}
		$scope.mapOption = {
			data: c.data,
			maxValue: c.max
		};
		$scope.totalItems = c.data.length;
		if($scope.totalItems > 10){
			$scope.pageData = $scope.mapOption.data.slice(0, 9);
		}else{
			$scope.pageData = c.data;
		}

	}), $scope.changeMap = function(a) {
		if (a != $scope.startDay) {
			$scope.startDay = a;
			var c = new Date;
			c = new Date(c.getTime() - 864e5 * a);
			//SpreadService.queryRegion("11858950", j("date")(c));
		}
	}
}]);