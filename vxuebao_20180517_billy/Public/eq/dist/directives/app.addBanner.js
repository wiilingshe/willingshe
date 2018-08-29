angular.module("app.directives.addBanner", []).directive("slides2", ["configSerService", function(configSerService) {
	return {
		restrict: "EA",
		link: function(scope, element, attrs) {
			var slidesContainer = $(element).find(".slides_container");
			configSerService.getActivityBanner(attrs.id).then(function(callBack) {
				for (var list = callBack.data.list, f = 0; f < list.length; f++) {
					var ele = $('<a href="' + list[f].url + '" style="display:block;" target="' + list[f].target + '" ></a>');
					ele.append('<img src="' + list[f].path + '" width="' + attrs.width + '" height="' + attrs.height + '" alt="' + list[f].title + '" title="' + list[f].title + '" > ');
					slidesContainer.append(ele)
				}
				$(element).slider({
					preload: !0,
					play: 5e3,
					pause: 2500,
					hoverPause: !0
				})
			})
		}
	}
}]);