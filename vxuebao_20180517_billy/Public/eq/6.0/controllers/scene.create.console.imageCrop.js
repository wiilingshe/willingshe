angular.module("scene.create.console.imageCrop").controller("imageCropCtrl",["$translate","$rootScope","$scope","imageCropService","obj","dataCacheService",function(e,t,r,o,c,s){var a;"square"==c.type?a=r.cropOption={type:c.type,title:"图片裁切",desc:"图片将按照要求的比例进行裁切",showItems:!1,imgSrc:c.properties.src,cropItems:[{ratio:1,desc:"正方形比例"}]}:3==c.type?a=r.cropOption={type:c.type,title:"背景裁切",desc:"背景图将按照要求的比例进行裁切",showItems:!1,imgSrc:c.properties.src,cropItems:[{ratio:640/1008,desc:"背景图比例"}]}:4==c.type&&(a=r.cropOption={type:c.type,title:"图片裁切",desc:"请根据你的需求，点击右侧常用比例进行裁切",showItems:!0,imgSrc:c.properties.src,cropItems:[{value:1,ratio:0,desc:"原图比例"},{value:2,ratio:1,desc:"1:1"},{value:3,ratio:4/3,desc:"4:3"},{value:4,ratio:.75,desc:"3:4"},{value:5,ratio:320/486,desc:"标准屏比例"},{value:6,ratio:320/243,desc:"1/2屏比例"},{value:7,ratio:320/162,desc:"1/3屏比例"},{value:8,ratio:-1,desc:"自定义",lock:!1}]}),a.currentItem=a.cropItems[0],r.cropItemChange=function(e){null==e.lock&&(a.cropItems[7].lock=!1),a.currentItem=e,t.$broadcast("cropItem.change",e)},r.ok=function(){t.$broadcast("cropImage.ok",c)},r.cancel=function(){r.$dismiss(c.properties.src)}}]);