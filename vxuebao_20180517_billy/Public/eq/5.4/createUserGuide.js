angular.module("scene/createUserGuide.tpl.html", []).run(["$templateCache", function (a) {
    console.log("createUserGuide.js");
    //a.put("scene/createUserGuide.tpl.html", '<div class="create-user-guide" ng-show="false" ng-controller="CreateUserGuideCtrl">\n    <div class="carousel-user-guide">\n        <h2><em>用户引导</em><span ng-click="close()">&times;</span></h2>\n        <div class="carousel-user-guide-container">\n            <carousel interval="myInterval">\n                <slide ng-repeat="slide in userGuideSlides" active="slide.active">\n                    <img ng-src="{{slide.image}}">\n                </slide>\n            </carousel>\n            <button ng-show="currentIndex == 5" class="btn btn-main operation" ng-click="close()">我知道了</button>\n        </div>\n    </div>\n</div>')
}])