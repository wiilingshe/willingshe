angular.module("services.i18nNotifications", ["services.notifications", "services.localizedMessages"]), 
angular.module("services.i18nNotifications").factory("i18nNotifications", ["localizedMessages", "notifications","$rootScope", function(a, b, $rootScope) {
	var c = function(b, c, d, e) {
			return angular.extend({
				message: a.get(b, d),
				type: a.get(c, d)
			}, e)
		},
		d = {
			pushSticky: function(a, d, e, f) {
				return b.pushSticky(c(a, d, e, f))
			},
			pushForCurrentRoute: function(a, d, e, f) {
				return b.pushForCurrentRoute(c(a, d, e, f))
			},
			pushForNextRoute: function(a, d, e, f) {
				return b.pushForNextRoute(c(a, d, e, f))
			},
			getCurrent: function() {
				var arr = b.getCurrent();
				var current = arr.length > 0 ? arr[arr.length - 1] : [];
				arr.length > 0 && $rootScope.$broadcast("message.current",current);
				return b.getCurrent();
			},
			remove: function(a) {
				return b.remove(a)
			},
			removeAll: function() {
				return b.removeAll()
			}
		};
	return d
}]);