angular.module("app.directives.rightclick", []).directive("rightClick", ["$compile", function(a) {
	return {
		restrict: "EA",
		link: function(b, c, d) {
			var e;
			$(c).on("contextmenu", function(d) {
				if (d.preventDefault(), e && e[0] && e.remove(), "0" == b.categoryId) {
					e = $('<ul class="right-menu dropdown-menu"></ul>'), e.appendTo($(c)), e.css({
						left: d.pageX - $(c).offset().left,
						top: d.pageY - $(c).offset().top
					}).show();
					for (var f in b.myTags) {
						var g = '<li class="tag_list" ng-class="{selected: dropTagIndex == ' + f + '}" ng-click="selectTag(' + b.myTags[f].id + "," + f + ')">' + b.myTags[f].name + "</li>",
							h = a(g)(b);
						e.append(h)
					}
					var i = a('<li class="tag_list add_cate clearfix" style="border-top:1px solid #ccc;margin-bottom:0px;" ng-click="createCategory()"><em>+</em><span>创建分类</span></li>')(b);
					e.append(i);
					var j = a('<li class="btn-main" style="width:100%; padding:0px; border: 0;margin:0px;height:25px; line-height:25px;"><a style="height:25px;line-height:25px;text-indent:0;color:#FFF;padding:0px;text-align:center;" ng-click="setCategory(' + b.dropTagIndex + "," + b.img.id + ')">确定</a></li>')(b);
					e.append(j), $(j).on("click", function() {
						e.hide()
					}), $(document).mousemove(function(a) {
						(a.pageX < e.offset().left - 20 || a.pageX > e.offset().left + e.width() + 20 || a.pageY < e.offset().top - 20 || a.pageY > e.offset().top + e.height() + 20) && (e.hide(), $(this).unbind("mousemove"))
					})
				}
			})
		}
	}
}]);