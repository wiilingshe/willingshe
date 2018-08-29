var IS_DEBUG = true;
require.config({
	baseUrl:"",
	paths: {
		"jquery":"assets/Js/jquery.min",
    	"layer":"assets/Js/layer/layer",
    	"layerExt":"assets/Js/layer/extend/layer.ext",
    	"getAnimation":"longView/js/getAnimation",
    	"getSVG":"longView/js/getSVG",
    	"getAction":"longView/js/getAction",
    	"common":"longView/js/common",
    	"flux":"longView/js/flux",
        "vxuebao":"longView/js/vxuebao",
	},
	shim:{
		"layer": ["jquery"],
		"layerExt": ["jquery","layer"],
		"common": ["jquery"],
		"getAnimation": ["jquery","common"],
		"getSVG": ["jquery","common"],
		"getAction": ["jquery","common"],
		"flux": ["jquery"],
        "vxuebao": ["jquery","common","layer","flux","layerExt","getAnimation","getSVG","getAction"]
	},
	waitSeconds:0
});
if(IS_DEBUG){
    require.onError = function (err) {
        console.log(err.requireType);
        if (err.requireType === "timeout") {
            console.log("modules: " + err.requireModules);
        }
    
        throw err;
    };
}
require(["layer","layerExt"],function(layer){
        layer.config({
            extend: 'extend/layer.ext.js'
        });
});
require(["jquery","vxuebao"],function($, vxuebao){

    //检测是否手机端&&修改大小
    function classReplace(obj,class1,class2,class3){
        if(arguments.length > 3){
            return $(obj).removeClass(class1).removeClass(class2).addClass(class3);
        }else{
            return $(obj).removeClass(class1).addClass(class2);
        }
    }
    if(PCcheck()){
        /*alert("电脑");*/
        if($(window).height() > 750){
            classReplace("#container","container1","container3","container5");
            
        }else{
            classReplace("#container","container1","container5","container3");
        }
        $("#support").show();
        $("#bg").show();
    }else{
        /*alert("手机");*/
        classReplace("#container","container5","container3","container1");
        $("#support").hide();
        $("#bg").hide();
    }

});