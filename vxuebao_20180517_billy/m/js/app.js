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
    $scope.regName = "";
    $scope.regPassword = "";
    $scope.retrieveUsername = "";
    $scope.loginUrl = $rootScope.PREFIX_URL + "index.php?c=user&a=login";
    $scope.registerUrl = $rootScope.PREFIX_URL + "index.php?c=user&a=register";
    $scope.retrieveUrl = $rootScope.PREFIX_URL + "index.php?c=user&a=forget_password";
    $scope.isRegister = false;
    $scope.isForgetPwd = false;
    $scope.loginError = "";
    $scope.registerError = "";
    $scope.forgetError = "";
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
                    localStorage.userName = $scope.loginName;
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

    $scope.checkIsExist = function () {
        $scope.checkIsExistUrl = $rootScope.PREFIX_URL + "index.php?c=user&a=checkN&username=" + $scope.regName;
        $http({
            url: $scope.checkIsExistUrl,
            method: 'GET'
        }).success(function (data) {
            switch (data.code) {
                case 200 :
                    $scope.register();
                    break;
                case 1006 :
                    $scope.registerError = "账号已经存在";
                    break;
            }
        }).error(function () {
            $scope.registerError = "服务器异常";
        });
    };

    $scope.register = function () {
        $http({
            url: $scope.registerUrl,
            method: 'POST',
            data: "loginName=" + $scope.regName + "&password=" + $scope.regPassword,
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).success(function (data) {
            $scope.registerError = data.msg;
        }).error(function () {
            $scope.registerError = "服务器异常";
        })
    };

    $scope.retrievePassword = function () {
        $http({
            url: $scope.retrieveUrl,
            method: 'POST',
            data: "email=" + $scope.retrieveUsername,
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).success(function (data) {
            switch (data.code) {
                case 200 :
                    $scope.forgetError = "重置密码的链接已发送到你的邮箱";
                    break;
                default :
                    $scope.forgetError = "账号不存在";
                    break;
            }
        }).error(function () {
            $scope.forgetError = "服务器异常";
        })
    };

    $scope.setCenter = function () {
        document.getElementById("login").style.height = (window.innerHeight - 2) + "px";
        var clientHeight = document.getElementById("login").style.height;
        clientHeight = parseInt(clientHeight.replace("px", "")) + 2;
        var formHeight = 316;
        var paddingTopVal = (clientHeight - formHeight) / 7 * 2 + "px";
        document.getElementsByClassName("register_con")[0].style.paddingTop = paddingTopVal;
        if (localStorage.userName && localStorage.userName != "") {
            $scope.loginName = localStorage.userName;
        }
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
    $scope.pageNo = 1;
    $scope.isSearch = false;
    $scope.searchVal = "";

    $scope.init = function () {
        $scope.isFirstPage = "已经是第一页";
    };

    $scope.selectLoad = function () {
        if ($scope.isSearch) {
            $scope.search();
        } else {
            $scope.getShow();
        }
    };

    $scope.getShow = function () {
        if ($scope.pageNo == 0) {
            $scope.isFirstPage = "已经是第一页";
            $scope.pageNo = 1;
        } else {
            $scope.isFirstPage = "上一页";
        }
        $http({
            url: $scope.getUserShowUrl,
            method: 'POST',
            data: "pageNo=" + $scope.pageNo + "&pageSize=12",
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).success(function (data) {
            $scope.isNextPage = data.list.length >= 12;
            $scope.showList = data.list;
            for (var i = 0; i < $scope.showList.length; i++) {
                $scope.showList[i].code = $rootScope.WEIKE_URL + $scope.showList[i].code;
            }
        }).error(function () {
            window.location.href = '#/';
            console.log("当前未登录");
        })
    };
    $scope.getShow();

    $scope.pervPage = function () {
        $scope.pageNo = $scope.pageNo - 1;
    };

    $scope.nextPage = function () {
        $scope.pageNo += 1;
    };

    $scope.searchReady = function () {
        if ($scope.isSearch && $scope.searchVal != "") {
            $scope.pageNo = 1;
            $scope.search();
        }
        $scope.isSearch = true;
    };

    $scope.searchCancel = function () {
        $scope.isSearch = false;
        $scope.pageNo = 1;
        $scope.getShow();
    };

    $scope.search = function () {
        $http({
            url: $scope.getUserShowUrl,
            method: 'POST',
            data: "pageNo=" + $scope.pageNo + "&pageSize=12&name=" + $scope.searchVal,
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).success(function (data) {
            $scope.isNextPage = data.list.length >= 12;
            $scope.showList = data.list;
            for (var i = 0; i < $scope.showList.length; i++) {
                $scope.showList[i].code = $rootScope.WEIKE_URL + $scope.showList[i].code;
            }
        }).error(function () {
            window.location.href = '#/';
            console.log("当前未登录");
        })
    }

});