angular.module("services.dataCache", []), 
angular.module("services.dataCache").factory("dataCacheService", ["$timeout", function(a) {
	var b = {};
	this.asyncUrl = "", b.clear = function(a) {
		window.sessionStorage && (a || sessionStorage.clear(), delete sessionStorage[a])
	}, b.push = function(a, b, c) {
		if (window.sessionStorage) {
			var d = sessionStorage.getItem(a);
			d = d ? JSON.parse(d) : {}, d[b] = c, sessionStorage.setItem(a, JSON.stringify(d))
		}
	}, b.get = function(a, b) {
		if (!window.sessionStorage) return null;
		var c = sessionStorage.getItem(a);
		return c ? (c = JSON.parse(c), c[b]) : null
	}, b.asyncGet = function(b, c) {
		var d = sessionStorage.getItem(b);
		d = JSON.parse(d);
		var e = a(function() {
			return d[c]
		});
		return e
	}, b.contains = function(a, b) {
		if (!window.sessionStorage) return !1;
		var c = sessionStorage[a];
		return c ? (c = JSON.parse(c), c[b] ? !0 : !1) : !1
	}, b.setAsyncUrl = function(a) {
		this.asyncUrl = a
	}, b.getAsyncUrl = function() {
		return this.asyncUrl
	};
	var c = {
		photo: [],
		audio: []
	};
	return b.pushUsedFile = function(a, b) {
		var d;
		switch (a) {
		case 1:
			d = c.photo;
			break;
		case 2:
			d = c.audio
		}
		d.indexOf(b) > -1 || d.push(b)
	}, b.removeUsedFile = function(a, b) {
		var d;
		switch (a) {
		case 1:
			d = c.photo;
			break;
		case 2:
			d = c.audio
		}
		var e = d.indexOf(b); - 1 != e && d.splice(e, 1)
	}, b.getUsedFiles = function() {
		for (var a = [], b = [], d = 0; d < c.photo.length; d++) c.photo[d] && (a.push(c.photo[d]), b.push(1));
		for (var e = 0; e < c.audio.length; e++) {
			if (!c.audio[e]) return;
			a.push(c.audio[e]), b.push(2)
		}
		return 0 !== a.length ? {
			file: a.join(","),
			type: b.join(",")
		} : void 0
	}, b.clearUsedFiles = function() {
		c = {
			photo: [],
			audio: []
		}
	}, b
}]);

angular.module("services.dataCache").factory("storageService", [function() {
    var e = {};
	return e.clear = function() {
	        window.localStorage && localStorage.clear()
	    }
	    ,
	    e.push = function(e, t) {
	        window.localStorage && localStorage.setItem(e, t)
	    }
	    ,
	    e.get = function(e) {
	        return window.localStorage ? localStorage.getItem(e) : void 0
	    }
	    ,
	    e
	}
]);