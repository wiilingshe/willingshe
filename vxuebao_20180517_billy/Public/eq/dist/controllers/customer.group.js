angular.module("customer.group", ["services.data", "services.i18nNotifications"]), angular.module("customer.group").controller("AddGroupCtrl", ["$rootScope", "$scope", "dataService", "i18nNotifications", "$translate", function(a, b, c, d, e) {
	b.group = {}, b.authError = "", b.confirm = function() {
		if (!b.group.name) return void(b.authError = e.instant("main.customer.GROUP_NAME_ERROR1"));
		var a = countCharacters(b.group.name);
		if (a > 12) return void(b.authError = e.instant("main.customer.GROUP_NAME_ERROR2"));
		var f = {
			name: b.group.name
		};
		c.createGroup(f).then(function(a) {
			a.data.success && (d.pushForCurrentRoute("group.create.success", "notify.success"), b.$close({
				id: a.data.obj,
				name: b.group.name
			}))
		}, function() {})
	}, b.cancel = function() {
		b.$dismiss()
	}
}]);