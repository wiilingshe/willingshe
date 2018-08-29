!function(a, b) {
	function c() {
		var a, c, d, e = [];
		b("#media");
		this.addAudio = function(a, f) {
			var g = new Audio;
			g.src = f, e.push({
				elem: a,
				audio: g
			}), b(g).bind("ended", function() {
				c = !1, d()
			})
		}, this.play = function(b, f, g) {
			var h;
			d = f;
			for (var i = 0; i < e.length; i++) e[i].elem == b && (h = e[i].audio);
			a == h && c ? (h.pause(), c = !1, f()) : a != h || c ? (a && a.pause(), h.currentTime = 0, h.play(), g(), c = !0, a = h) : (h.play(), c = !0, g())
		}, this.pause = function() {
			a && (a.pause(), c = !1)
		}
	}
	a.utilSound = new c
}(window, $);