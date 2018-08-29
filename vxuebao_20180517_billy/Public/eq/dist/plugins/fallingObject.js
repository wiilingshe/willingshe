function fallingObject(a, b) {
	function c(a) {
		a.clearRect(0, 0, k, l);
		for (var b = 0; b < o.length; b++) a.save(), a.translate(o[b].x, o[b].y), a.scale(o[b].scale, o[b].scale), a.rotate(o[b].rotate), a.fillRect(0, 0, p, p), a.restore()
	}
	function d() {
		Math.random() < .02 * h.density && f(), e()
	}
	function e() {
		for (var a = 0; a < o.length; a++) o[a].x += o[a].vx, o[a].y += o[a].vy, o[a].vy += o[a].g;
		for (var b = 0, a = 0; a < o.length; a++) o[a].y < l - p && o[a].x > -p && o[a].x < k && (o[b++] = o[a]);
		for (; o.length > b;) o.pop();
		o.length > q && (o.length = q)
	}
	function f() {
		var a = .5 * Math.random() + .3,
			b = {
				x: Math.ceil(Math.random() * k),
				y: -p,
				g: .02 * a * h.src.vy,
				vx: .05 * Math.pow(-1, Math.ceil(1e3 * Math.random())),
				vy: .01 * a * h.src.vy,
				color: "yellow",
				scale: a,
				rotate: Math.pow(-1, Math.ceil(1e3 * Math.random())) * Math.random() * (h.src.rotate || 0) * Math.PI / 180
			};
		o.push(b)
	}
	var g = a[b - 1];
	if (g.properties) {
		var h = g.properties.fallingObject || {};
		renderPage(eqShow, b, a);
		for (var i = 0; i < a[b - 1].elements.length; i++) {
			var j = eqShow.selectElement(a[b - 1].elements[i].id);
			eqxCommon.bindTrigger(j, a[b - 1].elements[i])
		}
		var k = $(".m-img").width(),
			l = $(".m-img").height(),
			m = document.createElement("canvas");
		m.width = k, m.height = l, $(m).prependTo("#page" + b + " .edit_wrapper").attr("class", "cas page_effect").attr("id", "can" + b).attr("style", "z-index: 0");
		var n = m.getContext("2d"),
			o = [],
			p = 60,
			q = 20,
			r = new Image;
		r.src = h.src.path, r.onload = function() {
			n.beginPath(), pattern = n.createPattern(r, "repeat"), n.fillStyle = pattern, n.closePath(), eqShow.stopFallingObject = setInterval(function() {
				c(n), d()
			}, 20)
		}
	}
}