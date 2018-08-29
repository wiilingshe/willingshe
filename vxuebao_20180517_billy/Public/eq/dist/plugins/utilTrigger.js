!function(a) {
		function b() {
			var a = {
				CLICK: {
					name: "click",
					value: 1,
					title: "点击"
				},
				SHAKE: {
					name: "shake",
					value: 2,
					title: "摇一摇"
				}
			},
				b = {
					SHOW: {
						name: "show",
						value: 1
					},
					HIDE: {
						name: "hide",
						value: 2
					},
					RANDOMEVENT: {
						name: "randomEvent",
						value: 3
					}
				};
			this.getSendType = function(b) {
				if (b === undefined) return a;
				for (var c in a) if (b === a[c].value) return a[c];
				return null
			}, this.getHandleType = function(a) {
				if (a === undefined) return b;
				for (var c in b) if (a === b[c].value) return b[c];
				return null
			}
		}
		a.utilTrigger = new b
	}(window);