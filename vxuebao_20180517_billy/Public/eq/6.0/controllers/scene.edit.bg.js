angular.module("scene.edit.bg",["services.scene","services.history"]),angular.module("scene.edit.bg").controller("editBgCtrl",["$scope","$rootScope","sceneService","historyService",function(e,t,n,r){e.cropBg=function(c){e.$broadcast("hide.editbg.panel");var o={type:3,properties:{src:c.properties.imgSrc}};n.openCropModal(o,function(n){t.$broadcast("scene.bg.replace",{type:"imgSrc",src:n.src},c),c.properties.imgSrc=n.src,r.addPageHistory(c.pageId,e.tpl.obj.elements)},function(){})},e.scaleUpBg=function(e){e||(e={}),e.effect={type:"scaleUp",duration:1,blurSize:5}},e.scaleDownBg=function(e){e||(e={}),e.effect={type:"scaleDown",duration:1,blurSize:5}},e.blurBg=function(e){e||(e={}),e.effect={type:"blur",duration:1,blurSize:5}},e.sharpBg=function(e){e||(e={}),e.effect={type:"sharp",duration:1,sharpSize:5}},e.removeBgEffect=function(t){e.currentBgDef.effect=null},e.$on("hideBgOption",function(){e.showBgOptionPanel=!1}),e.switchBgOption=function(t){e.showBgOptionPanel=t}}]);