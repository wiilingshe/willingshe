angular.module("scene.create.console.shape",[]).factory("shapeService", ["$rootScope", function(a) {
	var b = {},
		c = b.svgList = [{
			type: "rect"
		}, {
			type: "circle"
		}, {
			type: "diamond"
		}, {
			type: "octagon"
		}, {
			type: "triangle-up"
		}, {
			type: "triangle-down"
		}, {
			type: "triangle-left"
		}, {
			type: "triangle-right"
		}, {
			type: "arrow-up"
		}, {
			type: "arrow-down"
		}, {
			type: "arrow-left"
		}, {
			type: "arrow-right"
		}];
	for (var d in eqxiuSvg.SYMBOLS) b.svgList.push({
		type: "symbols-" + d
	});
	return b.shapeList = [], b.getShapeByPage = function(d, e) {
		d * e <= c.length ? b.shapeList = c.slice((d - 1) * e, e * d) : b.shapeList = c.slice((d - 1) * e, c.length), a.$broadcast("render.shape.page", b.shapeList)
	}, b
}]);