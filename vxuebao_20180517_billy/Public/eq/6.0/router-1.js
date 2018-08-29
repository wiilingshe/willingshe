/**
 * Created By Json 2016/07/02
 */

/**
  * routerMaps用来保存router相关配置
  * key值为模块名，url为路由匹配路径，templateUrl为模板相对于baseUrl（requireJs配置中的baseUrl）的相对路径
  * files为需要按需加载的controller的JS文件（可多个，按数组顺序加载）
  * isRequireUser值为布尔型,表示是否需要用户登录认证模块
  */
var routerMaps = {
	"active":{
		url:"/active",
		templateUrl:"templates/active.tpl.html",
		controller:"ActiveCtrl",
		files:["controllers/active"]
	},
	"home":{
		url:"/home",
		feedBackUrl: "http://e.wesambo.com/v-vk2Ucz15",
		templateUrl: "templates/home.tpl.html",
		controller:"HomeCtrl",
		files:["controllers/home"]
	},
	"reg":{
		url:"/reg",
		templateUrl: "templates/reg.tpl.html"
	},
	"otherRegister":{
		url:"/otherRegister",
		templateUrl: "templates/otherRegister.tpl.html"
	},
	"agreement":{
		url:"/agreement",
		templateUrl: "templates/agreement.tpl.html"
	},
	"about":{
		url:"/about",
		templateUrl: "templates/about.tpl.html"
	},
	"error":{
		url:"/error/:codeid",
		controller:"ErrorCtrl",
		templateUrl: "templates/error.tpl.html",
		files:["controllers/error"]
	},
	"sample":{
		url:"/sample",
		controller:"SampleCtrl",
		templateUrl: "templates/sample.tpl.html",
		files:["controllers/sample"]
	},
	"main":{
		url:"/main",
		feedBackUrl: "http://e.wesambo.com/v-2qFiYzrc",
		templateUrl: "templates/main.tpl.html",
		controller: "MainCtrl",
		files:["controllers/main"],
		isRequireUser:true
	},
	"mainCustomer":{
		url:"/main/customer", 
		feedBackUrl: "http://e.wesambo.com/v-zJuTC6jT",
		templateUrl: "templates/main.customer.tpl.html",
		controller: "CustomerCtrl",
		files: ["controllers/main.data"],
		isRequireUser:true
	},
	"mainCustomerDetails":{
		url:"/main/customer/:sceneId",
		templateUrl: "templates/main.data.editData.tpl.html",
		controller: "EditDataCtrl",
		files: ["controllers/main.data.edit"],
		isRequireUser:true
	},
	"spreadTab":{
		url:"/spread/:tab/:sceneId",
		feedBackUrl: "http://e.wesambo.com/v-euMcJX7J",
		templateUrl: "templates/spread.tpl.html",
		controller: "SpreadCtrl",
		files: ["controllers/spread"],
		reloadOnSearch: true,
		isRequireUser:true
	},
	"spreadSubTab":{
		url:"/spread/:tab/:sceneId/:subtab",
		templateUrl: "templates/spread.tpl.html",
		controller: "SpreadCtrl",
		files: ["controllers/spread"],
		reloadOnSearch: true,
		isRequireUser:true
	},	
	"show":{
		url: "/show",
		templateUrl: "templates/show.tpl.html",
		controller: "ShowCtrl",
		files: ["controllers/show","controllers/nav"]
	},
	"active1":{
		url: "/show/active",
		templateUrl: "templates/show.active.tpl.html",
		controller: "Active1Ctrl",
		files: ["controllers/show.active","controllers/nav"]
	},
	"activexq":{
		url: "/show/active/:id",
		templateUrl: "templates/show.active-xq.tpl.html",
		controller: "ActiveXqCtrl",
		files: ["controllers/show.activexq","controllers/nav"]
	},
	"search":{
		url: "/show/search/:name",
		templateUrl: "templates/show.search.tpl.html",
		controller: "SearchCtrl",
		files: ["controllers/show.search","controllers/nav"]
	},
	"category":{
		url: "/show/category/:id",
		templateUrl: "templates/show.category.tpl.html",
		controller: "CategoryCtrl",
		files: ["controllers/show.category","controllers/nav"]
	},
	"recommend":{
		url: "/show/recommend",
		templateUrl: "templates/show.recommend.tpl.html",
		controller: "RecommendCtrl",
		files: ["controllers/show.recommend","controllers/nav"]
	},
	"visitor":{
		url: "/show/visitor",
		templateUrl: "templates/show.visitor.tpl.html",
		controller: "VisitorCtrl",
		files: ["controllers/show.visitor","controllers/nav"]
	},
	"visitorxq":{
		url: "/show/visitor/:id",
		templateUrl: "templates/show.visitor-xq.tpl.html",
		controller: "VisitorXqCtrl",
		files: ["controllers/show.visitorxq","controllers/nav"]
	},
	"scene":{
		url: "/scene",
		templateUrl: "templates/scene.tpl.html",
		controller: "SceneCtrl",
		files: ["controllers/scene"],
		isRequireUser:true
	},
	"sceneCreate":{
		url: "/scene/create/:sceneId",
		templateUrl: "templates/scene.create.tpl.html",
		controller: "CreateSceneCtrl",
		files: ["controllers/scene.create"],
		isRequireUser:true
	},
	"sceneSupport":{
		url: "/scene/support",
		templateUrl: "templates/scene.support.tpl.html",
		controller: "SupportCtrl",
		files: ["controllers/scene.support"],
		reloadOnSearch:false
	},
	"sceneMyscene":{
		url: "/scene/preview/:sceneId",
		feedBackUrl: "http://e.wesambo.com/v-QblumX2x",
		templateUrl: "templates/scene.myscene.tpl.html",
		controller: "MySceneCtrl",
		files: ["controllers/scene.myscene"],
		reloadOnSearch:false
	},
	"usercenter":{
		url: "/usercenter/:id",
		templateUrl: "templates/usercenter.tpl.html",
		controller: "UserCenterCtrl",
		files: ["controllers/usercenter","controllers/usercenter.member","controllers/usercenter.account","controllers/usercenter.trash"],
		isRequireUser:true
	},
	"message":{
		url: "/message",
		templateUrl: "templates/usercenter.message.tpl.html",
		controller: "MessageCtrl",
		files:["controllers/message"],
		isRequireUser:true
	},
	"invitation":{
		url: "/invitation",
		templateUrl: "templates/usercenter.console.invitation.tpl.html",
		controller: "InvitationCtrl",
		files:["controllers/invitation"],
		isRequireUser:true
	},
	"privilege":{
		url: "/privilege",
		templateUrl: "templates/usercenter.tab.privilege.tpl.html",
		controller: "PrivilegeCtrl",
		files:["controllers/usercenter.privilege"]
	}
};

var app = angular.module('app');
app.config(function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider,securityAuthorizationProvider){
	
	$ocLazyLoadProvider.config({
      loadedModules: ['app'],
      asyncLoader: require
    });
    
    $urlRouterProvider.otherwise('/home');
	
	//生成路由表（如果有需要使用到resolve的情况下，可以在routerMaps添加相关属性进行扩展）
	for(var key in routerMaps){
		if(typeof routerMaps[key] == "object"){
			var maps = angular.copy(routerMaps[key]);
			if("templateUrl" in routerMaps[key]){
				maps.templateUrl = BASE_URL + routerMaps[key].templateUrl;
			}
			if(routerMaps[key].files instanceof Array){
				var lazyDeferred;
				maps.templateProvider = function lazyTemplateProvider() { return lazyDeferred.promise; };
				maps.resolve = {};
				maps.resolve.deps = ['$templateCache', '$ocLazyLoad', '$q', function lazyResolve($templateCache, $ocLazyLoad, $q) {
                		lazyDeferred = $q.defer();
                		var realKey = this.self.name;
                        return $ocLazyLoad.load({
                            name: realKey,
                            files: routerMaps[realKey].files
                        }).then(function() {
				            lazyDeferred.resolve(maps.templateUrl && $templateCache.get(maps.templateUrl));
				        });
                    }];
			}
			if(maps.isRequireUser === true){
				maps.resolve.authenticatedUser = securityAuthorizationProvider.requireAuthenticatedUser;
            }
			delete maps.files;
			$stateProvider = $stateProvider.state(key, maps);
		}
	}
});

/*app.controller("AppCtrl", function($state){
    var app = this;
    app.click = function(){
        $state.go('active');
    }
}).filter("fixnum", ["$translate", function(a) {
	return function(b) {
		var c = b;
		return b >= 1e4 && 1e8 > b ? c = (b / 1e4).toFixed(1) + a.instant("UNIT1") : b >= 1e8 && (c = (b / 1e8).toFixed(1) + a.instant("UNIT2")), c
	}
}]);*/