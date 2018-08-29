angular.module("soundLink", ["soundLink"]), angular.module("soundLink").controller("SoundLinkCtrl", ["$rootScope", "$scope", "$translate", "sceneService", "obj", function(a, b, c, d, e) {
	b.authError = "", b.soundLink = {
		src: ""
	}, b.selectLink = function() {
		b.sound = {}
	}, b.confirm = function() {
		var a = b.soundLink.src;
		if (a.length && a.lastIndexOf(".mp3") !== a.length - 4) return void(b.authError = "请输入mp3格式的音乐链接");
		if (0 === a.length) return b.authError = "链接地址不能为空", void $(".link").focus();
		var c;
		b.sound;
		a && (c = {
			name: "外链音乐",
			src: a
		}), d.soundLink(a, e).then(function(a) {
			200 == a.data.code ? b.$close(c) : (b.authError = a.data.msg, $(".link").focus())
		})
	}, b.cancel = function() {
		b.$dismiss()
	}
}]);