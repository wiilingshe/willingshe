angular.module("usercenter.trash", []),
	angular.module("usercenter.trash").controller("TrashCtrl", ["$location", "$rootScope", "$scope", "usercenterService", "ModalService", "$translate", "fileService", "MineService", "sceneService", "dataCacheService", function(a, b, c, d, e, f, g, h, i, j) {		
		c.PREFIX_CLIENT_HOST = PREFIX_HOST;
		var k = b.branchid;
		c.scene = {
			type: null
		};

		c.pageSize = 12;

		c.sceneCurrent = {
			page: "",
			total: ""
		};
		c.imageCurrent = {
			page: "",
			total: ""
		};
		c.historyTab = {
			page: {}
		};
		var l = function(a) {
			c.sceneHistory = a;
			if("scene" == a){
				c.historyTab = {
					pages: {
						currentPage: c.sceneCurrent.page,
						totalItems: c.sceneCurrent.total,
						pageSize: 12
					}
				}
			}else{
				c.historyTab = {
					pages: {
						currentPage: c.imageCurrent.page,
						totalItems: c.imageCurrent.total,
						pageSize: 21
					}
				}
			}
		};
		c.getMyScenes = function(a, b) {
			c.sceneHistory = b, h.getMyHistoryScenes(a, c.pageSize, k).then(function(a) {
				if(a.data.list && a.data.list.length > 0) {
					c.myScenes = a.data.list;
					for(var d = 0; d < c.myScenes.length; d++) {
						c.myScenes[d].time = new Date(c.myScenes[d].delTime).getTime() + 2592e5;
						c.myScenes[d].history = Math.round((c.myScenes[d].time - (new Date).getTime()) / 1e3 / 60 / 60 / 24);
					}
					c.sceneCurrent.total = a.data.map.count;
					c.sceneCurrent.page = a.data.map.pageNo;
				} else {
					c.sceneTotalItems = 0;
					c.sceneCurrent.total = 0;
					c.sceneCurrent.page > 1 ? c.getMyScenes(--c.sceneCurrent.page, "scene") : c.myScenes = [];
				}
				l(b)
			})
		};
		c.getMyScenes(1, "scene");

		c.deleteScene = function(a, b) {
			e.openConfirmDialog({
				msg: "确定彻底删除此微课?"
			}, function() {
				i.deleteSceneById(a, b).then(function() {
					c.getMyScenes(c.historyTab.pages.currentPage, "scene");
				})
			})
		}, c.revoke = function(a) {
			i.revoke(a).then(function() {
				c.getMyScenes(c.historyTab.pages.currentPage, "scene");
			})
		}, c.$on("images.update", function(a, b, d) {
			c.images = b.list;
			for(var e = 0; e < c.images.length; e++) {
				c.images[e].time = new Date(c.images[e].delTime).getTime() + 2592e5;
				c.images[e].history = Math.round((c.images[e].time - (new Date).getTime()) / 1e3 / 60 / 60 / 24);
			}
			c.imageCurrent.total = b.map.count;
			c.imageCurrent.page = b.map.pageNo, l(d);

		}), c.getImages = function(a, d) {
			c.sceneHistory = d;
			g.userRecycle(a, 21).success(function(a) {
				if(a.success){
					b.$broadcast("images.update", a, d);
				}else{
					alert(a.msg);
				}
			}).error(function() {
				alert("网络连接超时，请稍后重试");
			})
		}, c.$on("file.delete", function(a) {
			c.getImages(c.historyTab.pages.currentPage, "image");

		}), c.deleteImg = function(a, b) {
			e.openConfirmDialog({
				msg: "确定彻底删除此图片?"
			}, function() {
				c.deleteFile(a, b);
			})
		}, c.deleteFile = function(a, c) {
			g.deleteFile1(a, c).success(function(a) {
				if(a.success){
					b.$broadcast("file.delete");
				}else{
					alert(a.msg);
				}

			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}, c.imageRevoke = function(a) {
			g.fileRevoke(a).success(function(a) {
				if(a.success){
					c.getImages(c.historyTab.pages.currentPage, "image");
					j.clear("fileService");
				}else{
					alert(a.msg);
				}

			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}, c.pageChanged = function(a) {
			if(1 > a || a > c.historyTab.pages.totalItems / 10 + 1){
				return void alert(f.instant("main.customer.PAGE_OVERFLOW"));
			}else{
				return void("scene" == c.sceneHistory ? c.getMyScenes(a, "scene") : c.getImages(a, "image"));
			}
		}
	}]);