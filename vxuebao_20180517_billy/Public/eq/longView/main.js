var IS_DEBUG = true;
require.config({
	baseUrl:"/Public/eq/longView",
	paths: {
		"jquery": "/Public/js/jquery.min",
    	"layer": "/Public/eq/5.4/layer/layer",
    	"layerExt": "/Public/eq/5.4/layer/extend/layer.ext",
    	"getAnimation": "/Public/eq/longView/js/getAnimation",
    	"getSVG": "/Public/eq/longView/js/getSVG",
    	"getAction": "/Public/eq/longView/js/getAction",
    	"common": "/Public/eq/longView/js/common",
        "flux": "/Public/eq/longView/js/flux",
        "express": "/Public/eq/longView/js/express",
        "vxuebao": "/Public/eq/longView/js/vxuebao",
	},
	shim:{
		"layer": ["jquery"],
		"layerExt": ["jquery","layer"],
		"common": ["jquery"],
		"getAnimation": ["jquery","common"],
		"getSVG": ["jquery","common"],
		"getAction": ["jquery","common"],
        "flux": ["jquery"],
        "express": ["jquery","common"],
        "vxuebao": ["jquery","common","layer","layerExt","getAnimation","getSVG","getAction","flux","express"]
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

   

});