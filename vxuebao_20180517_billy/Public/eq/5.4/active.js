angular.module("active/active.tpl.html", []).run(["$templateCache", function (a) {
    console.log("active.js")
    a.put("active/active.tpl.html", '\n<div id="activeTwo"><!-- 性格色彩 -->\n	<div ng-include = "\'active/tab/active1.tpl.html\'"></div>\n</div>\n\n')
}])