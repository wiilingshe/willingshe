angular.module("spread.statistics", ["services.spread", "app.directives.lineChart", "app.directives.pieChart", "app.directives.numChangeAnim"]);
(function(){
	if(typeof define == "function" && define.amd){
		require(["echarts"],function(echarts){
			callback(echarts);
		});
	} else {
		callback();
	}
	
	function callback(echarts){
		echarts = echarts || window.echarts;
		angular.module("spread.statistics").directive("eqdMap", ["$parse", function(a) {
			return {
				restrict: "E",
				scope: {
					option: "@"
				},
				template: '<div class="echartView"></div>',
				link: function(a, b, c) {
					a.echart = echarts.init(b.find("div")[0], "gray");
					var d = {
						title: {
							text: "",
							subtext: "",
							x: "center"
						},
						tooltip: {
							trigger: "item"
						},
						legend: {
							orient: "vertical",
							x: "right",
							data: ["pv"]
						},
						dataRange: {
							min: 0,
							max: 2500,
							text: ["高", "低"],
							calculable: !0,
							precision: 0
						},
						series: [{
							name: "pv",
							type: "map",
							mapType: "china",
							itemStyle: {
								normal: {
									label: {
										show: !0
									}
								},
								emphasis: {
									color: "#59c3f9",
									label: {
										show: !0
									}
								}
							},
							data: a.data
						}]
					};
					a.$watch("option", function(b, c) {
						if (b != c) {
							var e = JSON.parse(b);
							d.series[0].data = e.data, d.dataRange.max = e.maxValue, a.echart.clear(), a.echart.setOption(d)
						}
					})
				}
			}
		}]).directive("eqdLineChart", [function() {
			return {
				restrict: "E",
				scope: {
					option: "@",
					legend: "@"
				},
				template: '<div class="lineChartView"></div>',
				link: function(a, b, c) {
					a.echart = echarts.init(b.find("div")[0], "macarons");
					var d = JSON.parse(c.legend),
						e = {
							title: {
								text: "访问次数",
								x: "center"
							},
							legend: {
								data: d,
								x: "left"
							},
							calculable: !0,
							tooltip: {
								trigger: "axis"
							},
							xAxis: [{
								type: "category",
								boundaryGap: !1,
								data: []
							}],
							yAxis: [{
								type: "value"
							}],
							series: [{
								name: "",
								type: "line",
								smooth: !0,
								itemStyle: {
									normal: {
										areaStyle: {
											type: "default"
										}
									}
								},
								data: []
							}]
						},
						f = JSON.parse(c.option);
					e.xAxis[0].data = f.xAxis;
					for (var g = 1; g < f.data.length; g++) e.series[g] = angular.copy(e.series[0]);
					for (var h = 0; h < f.data.length; h++) e.series[h].name = d[h], e.series[h].data = f.data[h];
					a.echart.setOption(e), a.$watch("option", function(b, c) {
						if (b != c) {
							var d = JSON.parse(b);
							e.xAxis[0].data = d.xAxis;
							for (var f = 0; f < d.data.length; f++) e.series[f].data = d.data[f];
							a.echart.showLoading(), a.echart.hideLoading(), a.echart.setOption(e, !0)
						}
					})
				}
			}
		}]).directive("eqdPieChart", [function() {
			return {
				restrict: "E",
				scope: {
					data: "@",
					name: "@"
				},
				template: '<div class="pieChartView"></div>',
				link: function(a, b, c) {
					a.echart = echarts.init(b.find("div")[0], "macarons");
					for (var d = JSON.parse(c.data), e = [], f = 0; f < d.length; f++) e.push(d[f].name);
					var g = {
						tooltip: {
							trigger: "item",
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							orient: "vertical",
							x: "left",
							data: e
						},
						calculable: !0,
						series: [{
							name: c.name,
							type: "pie",
							radius: "55%",
							center: ["50%", "60%"],
							data: d
						}]
					};
					a.echart.setOption(g), a.$watch("data", function(b, c) {
						if (b != c) {
							var d = JSON.parse(b);
							g.series[0].data = d;
							for (var e = [], f = 0; f < d.length; f++) e.push(d[f].name);
							g.legend.data = e, a.echart.showLoading(), a.echart.hideLoading(), a.echart.setOption(g)
						}
					})
				}
			}
		}]);
	}
})();