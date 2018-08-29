angular.module("security.authorization", ["security.service","security.retryQueue"]).provider("securityAuthorization", {
	requireAdminUser: ["securityAuthorization", function(a) {
		return a.requireAdminUser()
	}],
	requireAuthenticatedUser: ["securityAuthorization", function(a) {
		return a.requireAuthenticatedUser()
	}],
	$get: ["security", "securityRetryQueue", function(a, b) {
		var c = {
			requireAuthenticatedUser: function() {
				var d = a.requestCurrentUser().then(function(d) {
					return a.isAuthenticated() ? void 0 : b.pushRetryFn("unauthenticated-client", c.requireAuthenticatedUser)
				});
				return d
			},
			requireAdminUser: function() {
				var d = a.requestCurrentUser().then(function(d) {
					return a.isAdmin() ? void 0 : b.pushRetryFn("unauthorized-client", c.requireAdminUser)
				});
				return d
			}
		};
		return c
	}]
});