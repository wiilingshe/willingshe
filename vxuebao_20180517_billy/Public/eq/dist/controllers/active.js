angular.module("active",[]).controller("ActiveCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", /*"activeService",*/"$stateParams", function(a, b, c, d, e, f, g, h, i) {
	c.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
	c.PREFIX_SERVER_HOST = PREFIX_URL;
	c.PREFIX_CLIENT_HOST = PREFIX_HOST;
}]);