angular.module("scene.create.console.sound", ["services.file", "soundLink"]).factory("soundService", ["$rootScope", "$modal", "fileService", "dataCacheService", function(a, b, c, d) {
	var e = {};
	return e.getSysMusicList = function(b, e, f, g) {
		c.getSystemFiles(b, e, f, g).then(function(b) {
			b.data.success ? (d.getAsyncUrl() && (d.push("fileService1", d.getAsyncUrl(), b), d.setAsyncUrl()), a.$broadcast("sounds.update", b.data, f)) : alert(b.data.msg)
		}, function() {
			alert(networkOut)
		})
	}, e.getMyAudios = function(b) {
		c.getFileByCategory(b, 10, "0", "2").then(function(b) {
			b.data.success ? (d.getAsyncUrl() && (d.push("mySounds", d.getAsyncUrl(), b), d.setAsyncUrl()), a.$broadcast("sounds.update", b.data, 2)) : alert(b.data.msg)
		}, function() {
			alert(networkOut)
		})
	}, e.getMySounds = function(b) {
		c.getUserFiles(b, 10, 4, 0).then(function(b) {
			b.data.success ? (d.getAsyncUrl() && (d.push("fileService1", d.getAsyncUrl(), b), d.setAsyncUrl()), a.$broadcast("sounds.update", b.data, 4)) : alert(b.data.msg)
		}, function() {
			alert(networkOut)
		})
	}, e.deleteMySound = function(b) {
		c.deleteFile1(b).success(function(c) {
			c.success ? a.$broadcast("mySounds.delete", b) : alert(c.msg)
		}).error(function() {
			alert(networkOut)
		})
	}, e
}]);