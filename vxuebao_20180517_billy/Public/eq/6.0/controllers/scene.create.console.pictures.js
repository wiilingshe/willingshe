angular.module("scene.create.console.pictures",["services.file"]).controller("picturesCtrl",["$scope","$timeout","$rootScope","$modal","picturesService","obj",function(e,t,i,r,n,c){var o=530,s=265,a=e.picStyles=utilPictures.getPicStyle();e.currentImageIndex=-1;var h=angular.copy(c),l=e.position=h.css;if(null!=l.width&&null!=l.height){var u=l.width/l.height,p=o/s;u>p?(l.width=o,l.height=o/u):(l.height=s,l.width=s*u)}var d=e.properties=h.properties;d.autoPlay=null==d.autoPlay||d.autoPlay,d.interval=null==d.interval?2e3:d.interval,d.picStyle=null==d.picStyle?a[0]:utilPictures.getPicStyle(d.picStyle),d.bgColor=null==d.bgColor?"rgba(255,255,255,1)":d.bgColor,d.children=null==d.children?[]:d.children,n.setImages(d.children),e.authError="",e.choosePic=function(){return d.children.length>=6?void(e.authError="最多可选择6张图片"):void r.open({windowClass:"console img_console",templateUrl:BASE_URL+"templates/scene.console.bg.tpl.html",controller:"BgConsoleCtrl",resolve:{obj:function(){return{fileType:1,type:"p",count:d.children.length,elemDef:c}}}}).result.then(function(e){$.each(e.selectedImages,function(e,t){n.addImages({src:t.src,desc:"",height:t.height,width:t.width})})},function(){})},e.ok=function(){return 0===d.children.length?void(e.authError="请选择图片"):(d.picStyle=d.picStyle.value,c.properties=d,void e.$close(d))},e.cancel=function(){e.$dismiss()},e.$on("currentImage.update",function(t,i){e.currentImageIndex=i}),e.$on("images.add",function(e,t){d.children=t}),e.$on("images.update",function(e,t){d.children=t})}]).factory("picturesService",["$rootScope","fileService",function(e,t){var i,r,n={},c=[];return n.setJcrop=function(t){e.$broadcast("jcrop.update",t)},n.setImageSize=function(t){e.$broadcast("image.update",t)},n.setCurrentImage=function(t){r=t,e.$broadcast("currentImage.update",t)},n.getCurrentImage=function(){return r},n.addImages=function(t){c.push(t),e.$broadcast("images.add",c)},n.updateImages=function(t,i){c.splice(t,1,i),e.$broadcast("images.update",c)},n.deleteImages=function(t){c.splice(t,1),e.$broadcast("images.update",c)},n.setImages=function(e){return c=e},n.getImages=function(){return c},n.setProperties=function(e){i=e},n.getProperties=function(){return i},n.cropImage=function(i){t.cropImage(i).success(function(t){if(t.success){var r={width:i.w,height:i.h,desc:"",src:t.obj};e.$broadcast("crop.success",r)}else alert(t.msg)}).error(function(){alert("网络连接超时，请稍后重试")})},n}]).directive("eqxPicturesImageCrop",["$compile","picturesService",function(e,t){return{link:function(i,r){var n=$(r),c=$(".pic-preview"),o={width:c.width(),height:c.height()};i.showOperation=!0;var s,a='<div class="operation" ng-show="!showOperation"><a class="quxiao" ng-click="cropCancel()">取消</a><a class="finish" ng-click="cropOk()">完成</a></div>';i.$on("image.update",function(e,t){s={width:t.width,height:t.height}}),i.$on("jcrop.update",function(r,h){c.append(e(a)(i)),i.showOperation=!0,i.$apply();var l=c.children("img"),u={width:l.width(),height:l.height()};n.removeClass("hover").unbind("click").click(function(){var e=t.getImages();0!==e.length&&(i.showOperation=$(this).hasClass("hover"),i.showOperation?($(this).removeClass("hover"),h.release(),h.disable()):($(this).addClass("hover"),h.setSelect([0,0,u.width,u.height]),h.enable()))}),i.cropOk=function(){var e=h.tellSelect();if(!(e.w===o.width&&e.h===o.height||0===e.w&&0===e.h)){var i=s.width/u.width;e.w=parseInt(e.w*i,10),e.h=parseInt(e.h*i,10),e.x=parseInt(e.x*i,10),e.y=parseInt(e.y*i,10),e.x2=parseInt((e.w+e.x)*i,10),e.y2=parseInt((e.h+e.y)*i,10),e.src=l.attr("src").split(PREFIX_FILE_HOST)[1],t.cropImage(e)}},i.cropCancel=function(){i.showOperation=!0,n.removeClass("hover"),h.release(),h.disable()}})}}}]).directive("eqxPicturesImagePreview",["picturesService",function(e){return{link:function(t,i){var r,n,c=$(i),o=$(".pic-preview"),s={width:o.width(),height:o.height()},a=s.width/s.height;c.hide(),c.load(function(){c.show(),n={width:this.width,height:this.height},e.setImageSize(n);var t,i=n.width/n.height;i>a?($(this).css({width:s.width,height:s.width/i}),t={position:"absolute",top:"50%",marginTop:-s.width/i/2}):($(this).css({width:s.height*i,height:s.height}),t={margin:"auto"}),c.Jcrop({keySupport:!1,aspectRatio:a},function(){r=this}),$(".jcrop-holder").css(t),e.setJcrop(r),r.disable()})}}}]).directive("eqxPicturesImageClick",["$compile","picturesService",function(e,t){function i(t,i){$(".pic-preview").html(e('<img eqx-pictures-image-preview ng-src="'+i+'" />')(t))}return{link:function(e,r){var n=$(r);n.click(function(){if(!n.hasClass("hover")){var r=n.index();t.setCurrentImage(r),i(e,$(this).find(".pic-img").attr("src"))}}),n.children(".delete-img").click(function(i){i.stopPropagation(),n.hasClass("hover")&&$(".pic-preview").empty();var r=n.index();t.deleteImages(r);var c=t.getCurrentImage();c>r?t.setCurrentImage(--c):r===c&&t.setCurrentImage(-1),e.$apply()}),e.$on("crop.success",function(r,c){if(n.hasClass("hover")){var o=PREFIX_FILE_HOST+c.src;i(e,o);var s=n.index();t.updateImages(s,c)}})}}}]);