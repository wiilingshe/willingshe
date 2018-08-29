angular.module("scene.edit.trigger", []).factory("triggerService", ["$rootScope", function(a) {
	function b(a, b, c, d, e) {
		var g = f(a, b, c, e).ids,
			h = g.indexOf(d);
		h >= 0 || g.push(d)
	}
	function c(a, b, c, d, e) {
		var g = m[c];
		if (g && g.sends.length) {
			var h = f(a, b, c, e).ids,
				i = h.indexOf(d);
			0 > i || h.splice(i, 1)
		}
	}
	function d(b, c, d, e) {
		var f = i(b, d, e).ids,
			g = f.indexOf(c);
		if(!g >= 0){
			f.push(c);
			a.$broadcast("receive.element.update", b, c, d, e);
		}
	}
	function e(b, c, d, e) {
		var f = i(b, d, e).ids,
			g = f.indexOf(c);
		if(!0 > g){
			f.splice(g, 1);
			a.$broadcast("receive.element.update", b, c, d, e);
		}
	}
	function f(a, b, c, d) {
		var e = g(a, c, d).handles,
			f = j(e, b);
		if (f) return f;
		var h = {
			type: b,
			ids: []
		};
		return e.push(h), h
	}
	function g(a, b, c) {
		var d = h(b),
			e = d.sends,
			f = k(e, c);
		if (f) return f;
		var g = {
			sendIndex: c,
			delay: 0,
			type: a,
			handles: []
		};
		return e.push(g), g
	}
	function h(a) {
		return m[a] || (m[a] = {
			sends: [],
			receives: []
		}), m[a]
	}
	function i(a, b, c) {
		var d = h(b),
			e = d.receives,
			f = j(e, a);
		if (f) return f;
		var g = {
			type: a,
			ids: []
		};
		return e.push(g), g
	}
	function j(a, b) {
		for (var c = 0; c < a.length; c++) {
			if (b == a[c].type) {
				return a[c];
			}
		}
		return null
	}
	function k(a, b) {
		for (var c = 0; c < a.length; c++) {
			if (b == a[c].sendIndex) {
				return a[c];
			}
		}
		return null
	}
	var l = {},
		m = {};
	l.getTrigger = function(a) {
		return m[a]
	}, l.getReceiveIds = function(a, b, c) {
		if ("number" != typeof a || "number" != typeof b || "number" != typeof c) {
			return [];
		}
		var d = f(a, b, c).ids;
		return angular.copy(d)
	}, l.getSendIds = function(a, b) {
		if ("number" != typeof a || "number" != typeof b) {
			return [];
		}
		var c = i(a, b).ids;
		return angular.copy(c)
	}, l.setTrigger = function(a, b) {
		"number" == typeof a && "object" == typeof b && (m[a] = b);

	}, l.addTrigger = function(a, c, e, f, h) {
		if("number" == typeof a && "number" == typeof c && "number" == typeof e && "number" == typeof f){
			m[e] && m[e].sends[h] || g(a, e, h);
			b(a, c, e, f, m[e].sends[h].sendIndex);
			d(c, e, f, h);
		}
		
	}, l.deleteTrigger = function(a, b, d, f, g) {
		if("number" == typeof a && "number" == typeof b && "number" == typeof d && "number" == typeof f && m[d] && m[d].sends[g]){
			c(a, b, d, f, m[d].sends[g].sendIndex);
			e(b, d, f, g);
		}
	}, l.clearTrigger = function(a) {
		var b = m[a];
		if (b) {
			for (var c = !1, d = !1, e = 0; e < b.sends.length; e++) {
				if ("number" == typeof b.sends[e].sendIndex) {
					for (var f = 0; f < b.sends[e].handles.length; f++) {
						if (b.sends[e].handles[f].ids.length) {
							c = !0;
							break
						}
					}
				}
				if (c) break
			}
			for (var g = 0; g < b.receives.length; g++) {
				if (b.receives[g].ids.length) {
					d = !0;
					break
				}
			}
			c || d || delete m[a]
		}
	}, l.resetTrigger = function(a) {
		if ("number" == typeof a) {
			var b = utilTrigger.getSendType(),
				c = utilTrigger.getHandleType();
			for (var d in b) {
				for (var e in c) {
					var f = b[d].value,
						g = c[e].value,
						h = i(g, a).ids;
					h.length && $.each(h, function(b, c) {
						for (var d = l.getTrigger(c).sends, e = 0; e < d.length; e++){
							"undefined" == typeof d[e].sendIndex && d[e].hasOwnProperty("sendIndex") && (d.splice(e, 1), e--);
						}
						var h = c;
						$.each(d, function(b, c) {
							var d = b;
							$.each(c.handles, function(b, c) {
								c.value;
								if (c.ids.length) {
									var i = c.ids;
									for (e = 0; e < i.length; e++) {
										i[e] == a && l.deleteTrigger(f, g, h, a, d);
									}
								}
							})
						})
					});
					var j = l.getTrigger(a);
					if (j && j.sends.length) {
						for (var k = 0; k < j.sends.length; k++){
							if("undefined" == typeof j.sends[k].sendIndex && triggerSends[k].hasOwnProperty("sendIndex")){
								j.sends.splice(k, 1);
								k--;
							}else{
								l.deleteTriggerBySendIndex(k, a);
							}
						}
					}
				}
			}
		}
	}, l.deleteTriggerBySendIndex = function(b, c) {
		var d = m[c];
		if (d && d.sends.length) {
			for (var e = 0; e < d.sends.length; e++){
				if("undefined" == typeof d.sends[e].sendIndex && triggerSends[e].hasOwnProperty("sendIndex")){
					d.sends.splice(e, 1);
					e--;
				}
			}
			var f = d.sends[b].type;
			$.each(d.sends[b].handles, function(d, e) {
				var g = e.type;
				if (e.ids.length) {
					for (var h = 0; h < e.ids.length; h++) {
						a.$broadcast("delete.random.elem", e.ids[h]);
						l.deleteTrigger(f, g, c, e.ids[h], b);
						h--;
					}
				}
			}), d.sends.splice(b, 1)
		}
	}, 
	l.getSend = g;

	return l
}]);