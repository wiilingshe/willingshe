angular.module("security.retryQueue", []).factory("securityRetryQueue", ["$q", "$log", function(a, b) {
	var c = [],
		d = {
			onItemAddedCallbacks: [],
			hasMore: function() {
				return c.length > 0
			},
			push: function(a) {
				c.push(a), angular.forEach(d.onItemAddedCallbacks, function(c) {
					try {
						c(a)
					} catch (d) {
						b.error("securityRetryQueue.push(retryItem): callback threw an error" + d)
					}
				})
			},
			pushRetryFn: function(b, c) {
				1 === arguments.length && (c = b, b = undefined);
				var e = a.defer(),
					f = {
						reason: b,
						retry: function() {
							a.when(c()).then(function(a) {
								e.resolve(a)
							}, function(a) {
								e.reject(a)
							})
						},
						cancel: function() {
							e.reject()
						}
					};
				return d.push(f), e.promise
			},
			retryReason: function() {
				return d.hasMore() && c[0].reason
			},
			cancelAll: function() {
				for (; d.hasMore();) c.shift().cancel()
			},
			retryAll: function() {
				for (; d.hasMore();) c.shift().retry()
			}
		};
	return d
}]);