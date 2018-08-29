angular.module("scene.create.console.setting", []), angular.module("scene.create.console.setting").directive("styleModal", ["sceneService", "$compile", function(a, b) {
	return {
		restrict: "AE",
		replace: !0,
		scope: {},
		templateUrl: BASE_URL + "templates/scene.console.setting.tpl.html",
		link: function(a, b, c) {
			b.bind("keydown", function(a) {
				a.stopPropagation()
			});
			var d = "style";
			a.$on("showStylePanel", function(b, c) {
				d = a.activeTab, a.activeTab = "", a.$apply(), c && c.activeTab ? a.activeTab = c.activeTab : a.activeTab = d, a.$apply()
			}), a.activeTab = c.activeTab, a.cancel = function() {
				$(b).hide()
			}, a.$on("close.style.panel", function(a) {
				b.hide(), $(".edit_area").find(".boom, .boom1").remove();
				$(".longpageStatis").length > 0 && $(".longpageStatis").show()
			}), a.$on("$locationChangeStart", function() {
				a.cancel()
			})
		},
		controller: ["$scope", function(a) {}]
	}
}]);