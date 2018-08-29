angular.module("directives/select.tpl.html", []).run(["$templateCache", function (a) {
	console.log("directives-select.js")
    a.put("directives/select.tpl.html", '<div class="clearfix">\n    ' +
        '<div class="eqc-mask" ng-click="showList($event)">\n        ' +
        '<div class="eqc-name">{{current.name}}</div>\n        ' +
        '<span class="more eqf-clickmore"></span>\n    </div>\n    ' +
        '<div class="eqc-drop-down-list transform-change">\n        ' +
        '<div class="list">\n            ' +
        '<div class="eqc-scroll" prevent-exception="true" eqd-scroll="{{scrollType}}">\n                ' +
        '<ul class="clearfix" ng-click="selectItem($event)">\n                    ' +
        '<li ng-repeat="item in list"\n                        ng-class="{active: item == current}"\n                        ng-style="{fontFamily: item.fontFamily}" class="eqc-target">{{item.name}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>')
}])