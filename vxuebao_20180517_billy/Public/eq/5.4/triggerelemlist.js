angular.module("scene/console/triggerelemlist.tpl.html", []).run(["$templateCache", function (a) {
    console.log("triggerelemlist.js");
    a.put("scene/console/triggerelemlist.tpl.html", '<div class="trigger-list">\n    <div class="modal-header">\n        <h4 class="modal-title">选择触发哪些元素显示或隐藏</h4>\n    </div>\n    <div class="modal-body">\n        <ul highlight-element>\n            <li class="trigger-elem" ng-repeat="triggerElement in triggerElements track by $index" id="{{\'trigger_\' + triggerElement.id}}">\n                <div>\n                    <div class="square one-line">\n                        <div class="checkbox-square" ng-class="{checked: triggerElement.checked}">\n                            <em class="eqf-clickmore"></em>\n                            <input type="checkbox" ng-model="triggerElement.checked" ng-change="changed(triggerElement)"/>\n                        </div>\n                        <label>\n                            {{triggerElement.name}}\n                        </label>\n                        <div class="fr" ng-if="triggerElement.checked">\n                            <a style="padding-right: 5px;" class="fl" ng-click="switchShow(triggerElement, currentIndex);" ng-show="triggerElement.triggerType==1">显示</a>\n                            <a style="padding-right: 5px;" class="fl" ng-click="switchShow(triggerElement, currentIndex);" ng-show="triggerElement.triggerType==2">隐藏</a>\n                            <div class="switch" style="float:left;" ng-class="{\'switch-open\':triggerElement.triggerType==1,\'switch-close\':triggerElement.triggerType==2}" ng-click="switchShow( triggerElement, currentIndex)">\n                                <div class="circle-con">\n                                    <i class="circle"></i>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </li>\n        </ul>\n    </div>\n    <div class="modal-footer">\n        <a class="btn btn-primary" ng-click="confirmList()">\n            <span>确定\n            </span>\n        </a>\n    </div>\n</div>')
}])