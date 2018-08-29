!function(a) {
	function b() {
		var a = {};
		this.addInterval = function(b, c) {
			a[b] = c
		}, this.deleteInterval = function(b) {
			a[b] && (clearInterval(a[b]), delete a[b])
		}, this.clearInterval = function() {
			for (var b in a) this.deleteInterval(b)
		};
		var b = [{
			value: 1,
			desc: "轮播",
			name: "slide"
		}, {
			value: 2,
			desc: "下落",
			name: "bars"
		}, {
			value: 3,
			desc: "百页窗",
			name: "blinds"
		}, {
			value: 4,
			desc: "消隐",
			name: "blocks"
		}, {
			value: 5,
			desc: "渐变",
			name: "blocks2"
		}, {
			value: 9,
			desc: "梳理",
			name: "zip"
		}, {
			value: 11,
			desc: "翻转",
			name: "bars3d"
		}, {
			value: 13,
			desc: "立方体",
			name: "cube"
		}, {
			value: 14,
			desc: "棋盘",
			name: "tiles3d"
		}, {
			value: 16,
			desc: "飞出",
			name: "explode"
		}];
		this.getPicStyle = function(a) {
			if (a === undefined) return b;
			for (var c = 0; c < b.length; c++) if (a === b[c].value) return b[c]
		}
	}
	a.utilPictures = new b
}(window);