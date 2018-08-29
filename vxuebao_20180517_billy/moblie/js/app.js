var app = angular.module('moblieApp', ['ngRoute']).run(function ($rootScope, $http) {
    $rootScope.PREFIX_URL = "http://" + window.location.host + "/";
    $rootScope.WEIKE_URL = "//" + window.location.host + "/v-";
    //$rootScope.SCAN_URL = "http://qr.liantu.com/api.php?text=";
    $rootScope.logout = function () {
        $http({
            url: $rootScope.PREFIX_URL + "?c=user&a=logout",
            method: 'GET'
        }).success(function () {
            window.location.href = '#/';
        }).error(function () {
            console.log("logout Error");
        })

    };

});

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'indexCtrl'
        })

        .when('/show', {
            templateUrl: 'vxb-show.html',
            controller: 'showCtrl'
        })

        .when('/userShow', {
            templateUrl: 'vxb-user-show.html',
            controller: 'userShowCtrl'
        }).otherwise({
        redirectTo: "#/userShow"
    });

});

app.controller('indexCtrl', function ($scope, $rootScope, $http) {

    $scope.userTitle = "用户登录";
    $scope.loginName = "";
    $scope.password = "";
    $scope.loginUrl = $rootScope.PREFIX_URL + "index.php?c=user&a=login";
    $scope.registerUrl = $rootScope.PREFIX_URL + "index.php?c=user&a=register";
    $scope.loginError = "";
    $scope.isRegister = false;
    $scope.registerError = false;
    $scope.postData = "username=" + $scope.loginName + "&password=" + $scope.password + "&rememberMe=";
    $scope.login = function () {
        $http({
            url: $scope.loginUrl,
            method: 'POST',
            data: "username=" + $scope.loginName + "&password=" + $scope.password + "&rememberMe=",
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).success(function (data) {
            switch (data.code) {
                case 200 :
                    window.location.href = '#/userShow';
                    break;
                case 1003 :
                    $scope.loginError = data.msg;
                    break;
                case 1004:
                    $scope.loginError = data.msg;
                    break;
            }
        }).error(function () {
            $scope.loginError = true;
            console.log("error");
        })
    };

    $scope.register = function () {
        $http({
            url: $scope.registerUrl,
            method: 'POST',
            data: "username=" + $scope.loginName + "&password=" + $scope.password + "&rememberMe=",
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).success(function (data) {
            switch (data.code) {
                case 200 :
                    console.log("Success");
                    break;
                case 1003 :
                    $scope.registerError = true;
                    console.log("error");
                    break;
                case 1004:
                    $scope.registerError = true;
                    console.log("error");
                    break;
            }
        }).error(function () {
            $scope.registerError = true;
            console.log("error");
        })
    };

    $scope.setCenter = function () {
        document.getElementById("login").style.height = (window.innerHeight - 2) + "px";
        var clientHeight = document.getElementById("login").style.height;
        clientHeight = parseInt(clientHeight.replace("px", "")) + 2;
        var formHeight = 316;
        var paddingTopVal = (clientHeight - formHeight) / 7 * 2 + "px";
        document.getElementsByClassName("register_con")[0].style.paddingTop = paddingTopVal;
    };

});

app.controller('showCtrl', function ($scope, $rootScope, $http) {
    $scope.getShowUrl = $rootScope.PREFIX_URL + "index.php?c=eqs&a=promotion&recommend=1&pageNo=1&pageSize=16";
    $scope.showList = [];
    $scope.getShow = function () {
        $http({
            url: $scope.getShowUrl,
            method: 'GET'
        }).success(function (data) {
            $scope.showList = data.list;
            for (var i = 0; i < $scope.showList.length; i++) {
                $scope.showList[i].code = $rootScope.WEIKE_URL + $scope.showList[i].code;
            }
        }).error(function () {
            $scope.loginError = true;
            console.log("error");
        })
    }();

});

app.controller('userShowCtrl', function ($scope, $rootScope, $http) {
    $scope.getUserShowUrl = $rootScope.PREFIX_URL + "index.php?c=scene&a=my";
    $scope.showList = [];
    $scope.getShow = function () {
        $http({
            url: $scope.getUserShowUrl,
            method: 'GET'
        }).success(function (data) {
            window.location.href = '#/userShow';
            $scope.showList = data.list;
            for (var i = 0; i < $scope.showList.length; i++) {
                $scope.showList[i].code = $rootScope.WEIKE_URL + $scope.showList[i].code;
            }
        }).error(function () {
            window.location.href = '#/';
            console.log("当前未登录");
        })
    }();

});