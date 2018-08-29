angular.module("scene.create.console.imageCrop").controller("imageCropCtrl", ["$translate", "$rootScope", "$scope", "imageCropService", "obj", "dataCacheService", function(a, b, c, d, e, f) {
	var g;
	"square" == e.type ? g = c.cropOption = {
		type: e.type,
		title: "图片裁切",
		desc: "图片将按照要求的比例进行裁切",
		showItems: !1,
		imgSrc: e.properties.src,
		cropItems: [{
			ratio: 1,
			desc: "正方形比例"
		}]
	} : 3 == e.type ? g = c.cropOption = {
		type: e.type,
		title: "背景裁切",
		desc: "背景图将按照要求的比例进行裁切",
		showItems: !1,
		imgSrc: e.properties.src,
		cropItems: [{
			ratio: 640 / 1008,
			desc: "背景图比例"
		}]
	} : 4 == e.type && (g = c.cropOption = {
		type: e.type,
		title: "图片裁切",
		desc: "请根据你的需求，点击右侧常用比例进行裁切",
		showItems: !0,
		imgSrc: e.properties.src,
		cropItems: [{
			value: 1,
			ratio: 0,
			desc: "原图比例"
		}, {
			value: 2,
			ratio: 1,
			desc: "1:1"
		}, {
			value: 3,
			ratio: 4 / 3,
			desc: "4:3"
		}, {
			value: 4,
			ratio: .75,
			desc: "3:4"
		}, {
			value: 5,
			ratio: 320 / 486,
			desc: "标准屏比例"
		}, {
			value: 6,
			ratio: 320 / 243,
			desc: "1/2屏比例"
		}, {
			value: 7,
			ratio: 320 / 162,
			desc: "1/3屏比例"
		}, {
			value: 8,
			ratio: -1,
			desc: "自定义",
			lock: !1
		}]
	}), g.currentItem = g.cropItems[0], c.cropItemChange = function(a) {
		null == a.lock && (g.cropItems[7].lock = !1), g.currentItem = a, b.$broadcast("cropItem.change", a)
	}, c.ok = function() {
		b.$broadcast("cropImage.ok", e)
	}, c.cancel = function() {
		c.$dismiss(e.properties.src)
	}
}]);