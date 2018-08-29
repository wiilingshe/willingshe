!function() {
	function a(a) {
		$("#finger_div" + a).on(d, function() {
			$("#page" + a).find(".u-arrow-bottom").attr("style", "display: none;"), $("#page" + a).find(".edit_wrapper").attr("style", "display: none;"), $("#finger_line" + a).show(), $("#finger_info" + a).html("扫描中..."), $("#finger_line" + a).stop(!0, !1).animate({
				top: "50%",
				marginTop: "-87px"
			}, 1e3, function() {
				$("#finger_div" + a).unbind(), $("#finger_info" + a).hide().html("扫描成功").fadeIn(300, function() {
					$("#finger_line" + a).fadeOut(), $("#finger_zw" + a).fadeOut(), $("#finger_div" + a).fadeOut(), $("#finger_info" + a).fadeOut(200, function() {
						setTimeout(function() {
							$("#finger_background" + a).removeClass("lock").addClass("unlock")
						}, 500), $("#finger_background" + a).addClass("noFinger").fadeOut(500, function() {
							$("#page" + a).empty(), renderPage(eqShow, a, b);
							for (var c = 0; c < b[a - 1].elements.length; c++) {
								var d = eqShow.selectElement(b[a - 1].elements[c].id);
								eqxCommon.bindTrigger(d, b[a - 1].elements[c])
							}
						}), $("#audio_btn").css("opacity", 1), 1 == a && playVideo(audioObj)
					})
				})
			})
		})
	}
	var b;
	window.lockEffect = function(c, d, e, f, g) {
		audioObj = c, b = d;
		for (var h = 0; h < e.length; h++) {
			var i = e[h].num;
			$(".finger_background", "#page" + i).length && $(".finger_background", "#page" + i).remove(), $('<div class = "finger_background page_effect lock"></div>').prependTo($("#page" + i)).attr("id", "finger_background" + i).attr("style", "background-image: url(" + e[h].finger.bgImage.path + ");width:100%; height: 100%;"), $('<div class = "finger_div"></div>').prependTo($("#finger_background" + i)).attr("id", "finger_div" + i), $('<img class = "finger_zw"/>').appendTo($("#finger_background" + i)).attr("id", "finger_zw" + i).attr("src", e[h].finger.zwImage.path), $('<img class = "finger_line" src = "' + CLIENT_CDN + 'view/images/finger_line.png">').appendTo($("#finger_background" + e[h].num)).attr("id", "finger_line" + e[h].num), $('<p class = "finger_info"></p>').appendTo($("#finger_background" + i)).attr("id", "finger_info" + i), renderPage(eqShow, i, d), a(i)
		}
	};
	var c = "ontouchstart" in window ? !0 : !1,
		d = c ? "touchstart" : "mousedown"
}();