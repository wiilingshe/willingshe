angular.module("scene.userGuide",[]).controller("SceneUserGuideCtrl",["$rootScope","$scope",function(e,r){if(window.localStorage){var i=JSON.parse(localStorage.getItem("sceneUserGuide"));i&&i[e.user.id]?r.firstLogin=!1:(r.firstLogin=!0,i=i||{},i[e.user.id]=1,localStorage.setItem("sceneUserGuide",JSON.stringify(i)))}r.currentGuideIndex=0,r.guideLength=5,r.showNextGuide=function(){r.currentGuideIndex+=1,r.guideLength==r.currentGuideIndex&&(r.firstLogin=!1)}}]);