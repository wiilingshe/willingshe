angular.module("scene.create.new", ["services.scene", "services.staticRes"]), angular.module("scene.create.new").controller("SceneNewCtrl", ["$scope", "$location", "$translate", "sceneService", "items", "ModalService", "staticResService", function(a, b, c, d, e, f, g) {
	a.scene = {
		name: ""
	};
	a.scene.types = g.getSceneType();
	if (e.tpl) {
		var h = !0;
		angular.forEach(a.scene.types, function(b, c) {
			if (h) {
				var d = "" + e.tpl.type;
				b.value === d ? (a.scene.type = b, h = !1) : a.scene.type = a.scene.types[0]
			}
		})
	} else {
		a.scene.type = a.scene.types[0];
	}
	var islongpage = 0;
	a.create = function() {
		if (e.fileType == 3) {//长页面
			islongpage= 1;
			d.createBlankScene(null, a.scene.type.value, a.scene.pageMode.id, islongpage).then(function(a) {
				200 == a.data.code ? (b.path("scene/create/" + a.data.obj+ "/"+islongpage), b.search("pageId", 1)) : f.openMsgDialog({
					msg: a.data.msg,
					btn: "确定"
				})
			});
		} else if(e.fileType == 0) {//短页面
			islongpage = 0;
			d.createBlankScene(null, a.scene.type.value, a.scene.pageMode.id, islongpage).then(function(a) {
				200 == a.data.code ? (b.path("scene/create/" + a.data.obj), b.search("pageId", 1)) : f.openMsgDialog({
					msg: a.data.msg,
					btn: "确定"
				})
			});
			
		}else if (e.fileType == 1) {//套用模板
			var c = {
				id: e.tpl.id,
				type: a.scene.type.value,
				pageMode: a.scene.pageMode.id,
				price: e.tpl.price
			};
			d.createByTpl(c).then(function(a) {
				200 == a.data.code ? (b.path("scene/create/" + a.data.obj), b.search("pageId", 1)) : f.openMsgDialog({
					msg: a.data.msg
				})
			}, function(a) {})
		} else d.createBlankScene(null, a.scene.type.value, a.scene.pageMode.id).then(function(a) {
			b.path("scene/create/" + a.data.obj), b.search("pageId", 1)
		});
		a.$close()
	}, a.cancel = function() {
		a.$dismiss()
	}, a.pagemodes = [{
		id: 2,
		name: "上下翻页"
	}, {
		id: 1,
		name: "左右翻页"
	}], a.scene.pageMode = a.pagemodes[0]
}]);