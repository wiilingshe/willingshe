angular.module("services.staticRes", []), angular.module("services.staticRes").factory("staticResService", [function() {
	var a = {},
		b = [{
			name: "行业",
			value: "101"
		}, {
			name: "个人",
			value: "102"
		}, {
			name: "企业",
			value: "103"
		}, {
			name: "节假",
			value: "104"
		}, {
			// name: "风格",
			// value: "105"
		}, {
			// name: "品牌",
			// value: "106"
		}];
	a.getSceneType = function() {
		return b
	};
	var c = [{
		name: "版式",
		value: "1101"
	}, {
		name: "风格",
		value: "1103"
	}, {
		name: "互动",
		value: "1102"
	}];
	a.getBigTab = function() {
		return c
	};
	var d = {
		1101: [{
			id: 1,
			name: "图文",
			bizType: 1101
		}, {
			id: 2,
			name: "图集",
			bizType: 1101
		}, {
			id: 4,
			name: "文字",
			bizType: 1101
		}, {
			id: 5,
			name: "图表",
			bizType: 1101
		}],
		1102: [{
			id: 6,
			name: "报名表",
			bizType: 1102
		}, {
			id: 8,
			name: "留言",
			bizType: 1102
		}, {
			id: 9,
			name: "联系",
			bizType: 1102
		}],
		1103: [{
			id: 15,
			name: "黑白",
			bizType: 1103
		}, {
			id: 16,
			name: "红色",
			bizType: 1103
		}, {
			id: 17,
			name: "怀旧",
			bizType: 1103
		}, {
			id: 18,
			name: "现代",
			bizType: 1103
		}, {
			id: 19,
			name: "扁平化",
			bizType: 1103
		}, {
			id: 120,
			name: "黄色",
			bizType: 1103
		}, {
			id: 121,
			name: "绿色",
			bizType: 1103
		}, {
			id: 122,
			name: "紫色",
			bizType: 1103
		}, {
			id: 123,
			name: "黑色",
			bizType: 1103
		}, {
			id: 124,
			name: "白色",
			bizType: 1103
		}, {
			id: 125,
			name: "其他",
			bizType: 1103
		}, {
			id: 260,
			name: "English",
			bizType: 1103
		}, {
			id: 262,
			name: "Android",
			bizType: 1103
		}]
	};
	a.getPageTpls = function(a) {
		return a ? d[a] : d[1101].concat(d[1102]).concat(d[1103])
	};
	var e = [{
		id: 13178,
		name: "new",
		value: "210",
		remark: "group1/M00/61/89/yq0KA1T2vXqAGI-4AAAWKIt1ceE158.png"
	},{
		id: 13176,
		name: "hot",
		value: "211",
		remark: "group1/M00/61/89/yq0KA1T2vXqAH3MxAAAdfvrWmmM009.png"
	},{
		id: 13076,
		name: "风格",
		value: "203",
		remark: "group1/M00/61/89/yq0KA1T2vXqAH3MxAAAdfvrWmmM009.png"
	},{
		id: 13078,
		name: "节日",
		value: "205",
		remark: "group1/M00/61/89/yq0KA1T2vXqAGI-4AAAWKIt1ceE158.png"
	}, {
		id: 13075,
		name: "企业",
		value: "202",
		remark: "group1/M00/61/89/yq0KA1T2vXqAdp7RAAAOCH36lkY788.png"
	}, {
		id: 13074,
		name: "行业",
		value: "201",
		remark: "group1/M00/61/89/yq0KA1T2vXqARMyQAAASI6ZG0zM493.png"
	}, {
		id: 13077,
		name: "个人",
		value: "204",
		remark: "group1/M00/61/89/yq0KA1T2vXqAIorQAAAVuqdCoU4830.png"
	}, {
		id: 13073,
		name: "动物",
		value: "1201",
		remark: null
	},{
		id: 13177,
		name: "动漫",
		value: "1202",
		remark: null
	}];
	a.getBgTypes = function() {
		return e
	};
	var f = [{
		id: 13100,
		name: "new",
		value: "150",
		remark: "group1/M00/61/89/yq0KA1T2vXqAOVqkAAAX-MAtU0A633.png"
	},{
		id: 13101,
		name: "hot",
		value: "151",
		remark: "group1/M00/61/89/yq0KA1T2vXqAOVqkAAAX-MAtU0A633.png"
	},{
		id: 13084,
		name: "图标",
		value: "106",
		remark: "group1/M00/61/89/yq0KA1T2vXqAOVqkAAAX-MAtU0A633.png"
	}, {
		id: 13085,
		name: "动画",
		value: "107",
		remark: "group1/M00/61/89/yq0KA1T2vXqANcAcAAATIr_b2OM515.png"
	}, {
		id: 13083,
		name: "节日",
		value: "105",
		remark: "group1/M00/61/89/yq0KA1T2vXqAGI-4AAAWKIt1ceE158.png"
	}, {
		id: 13081,
		name: "风格",
		value: "103",
		remark: "group1/M00/61/89/yq0KA1T2vXqAH3MxAAAdfvrWmmM009.png"
	}, {
		id: 13080,
		name: "企业",
		value: "102",
		remark: "group1/M00/61/89/yq0KA1T2vXqAdp7RAAAOCH36lkY788.png"
	}, {
		id: 13079,
		name: "行业",
		value: "101",
		remark: "group1/M00/61/89/yq0KA1T2vXqARMyQAAASI6ZG0zM493.png"
	}, {
		id: 13082,
		name: "个人",
		value: "104",
		remark: "group1/M00/61/89/yq0KA1T2vXqAIorQAAAVuqdCoU4830.png"
	}, {
		id: 13086,
		name: "海外",
		value: "1101",
		remark: null
	}];
	a.getTpTypes = function() {
		return f
	};
	var g = [];
	a.getAudioTypes = function() {
		return g
	};
	var h = [];
	return a.getSoundTypes = function() {
		return h
	}, a
}]);