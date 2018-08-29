angular.module("nav", ["services.show", "services.staticRes"]),
	angular.module("nav").controller("NavCtrl", ["$rootScope", "$http", "$scope", "showService", "$location", "$stateParams", "staticResService", function(a, b, c, d, e, f, g) {
		c.sceneType = g.getSceneType(), angular.forEach(c.sceneType, function(a) {
			a.value === f.id && (c.$parent.catName = a.name)
		}), c.getCategoryPage = function(a, b) {
			e.path("show/category/" + a)
		};
		var h = null;
		c.search = function(a) {
			h = a
		}, c.submit = function() {
			h ? e.path("show/search/" + h) : e.path("show")
		}, c.EnterPress = function(a, b) {
			var d = a || window.event;
			13 == d.keyCode && c.submit(b)
		}
	}]);