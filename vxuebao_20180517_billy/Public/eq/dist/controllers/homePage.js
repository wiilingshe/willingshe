angular.module("main", ["services.mine", "services.data", "app.directives.pageTplTypes", "services.staticRes", "app.directives.addelement", "services.usercenter", /*"main.userGuide", */ "services.i18nNotifications", "common.directives.scroll", "services.modal", "services.configSer", "security.login.toolbar", "ui.bootstrap"]);
angular.module("main").controller("MainCtrl", ["$rootScope", "$scope", "$location", "$translate", "security", "MineService", "dataService", "sceneService", "ModalService", "$modal", "usercenterService", "i18nNotifications", "configSerService", "SpreadService", "$filter", "staticResService", "$timeout","$http","$state","$interval","$location",function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q,$http,$state,$interval,$location) {
		b.createForm = function(){
			if(a.user.type == 1 || a.user.type == 12){
				if(window.confirm("您好！该功能目前只向企业用户开放，点击确定申请成为企业用户")){
					return  window.open("https://wetool.im/f/0viuuz");
				}else{
					return false;
				}
			}else{
				$location.path("form");
			}
		}
		b.myForm = function(){
			if(a.user.type == 1 || a.user.type == 12){
				if(window.confirm("您好！该功能目前只向企业用户开放，点击确定申请成为企业用户")){
					return  window.open("https://wetool.im/f/0viuuz");
				}else{
					return false;
				}
			}else{
				$location.path("form/myForm");
			}
		}
		b.myTest = function(){
			if(a.user.type == 1 || a.user.type == 12){
				if(window.confirm("您好！该功能目前只向企业用户开放，点击确定申请成为企业用户")){
					return  window.open("https://wetool.im/f/0viuuz");
				}else{
					return false;
				}
			}else{
				$location.path("form/myForm");
			}
		}
		b.PREFIX_URL = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.client_cdn = CLIENT_CDN, b.scene = {
			type: null
		}, b.pageSize = 11, b.editInfo = {
			isEditable: !1
		};
		var r = 1;
		b.lists = [{
			title: '我的微课'
		}, {
			title: '模板中心'
		},{
			title: 'PPT导入'
		},{
			title: '长图文'
		}];
		//转换中
		b.changing = function(){
			alert("转换中，请稍后...")
		}
		b.urlPpt = PREFIX_HOST;
		//账号升级
		b.upgrade =function(){
			var modalInstance = j.open({
				windowClass: "console six-contain",
				templateUrl:BASE_URL+"templates/scene.console.upgrade.tpl.html",
				controller:'MainCtrl'
			})
		}
		//willingshe
		b.getPpt = function(size){
			if(a.user.type == 1 || a.user.type == 12){
				if(window.confirm("您好！该功能目前只向企业用户开放，点击确定申请成为企业用户")){
					return  window.open("https://wetool.im/f/0viuuz");
				}else{
					return;
				}
			}else if(a.user.type ==2 || a.user.type == 21 || a.user.type == 23){
					var modalInstance = j.open({
								templateUrl:'myModelContent.html',
								controller:'MainCtrl',
								size:size
							 })
				}
			}
		b.cancel = function(){
			b.$dismiss()
		}
		b.successPpt = function(){
			var a = document.getElementById("f").files[0];
			console.log(a);
			var b = document.getElementById("f")
			var ppt = /\.(pptx|ppt)$/i.test(b.value); //判断ppt的格式
			if(ppt == false){
				return alert("PPT文档后缀名必须是.PPTX")
			}
			var FileController = PREFIX_URL + "index.php?c=Ppt&a=upload";                   
			var form = new FormData();
			form.append("photo", a);
			console.log(form)                 
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", uploadProgress, false);
			xhr.addEventListener("load", uploadComplete, false);
			xhr.addEventListener("error", uploadFailed, false);
			xhr.addEventListener("abort", uploadCanceled, false);
			xhr.open("post", FileController, true);
			function uploadProgress(evt) {
				if (evt.lengthComputable) {
					var percentComplete = Math.round(evt.loaded * 100 / evt.total);
					document.getElementById('baifenbi').innerHTML = percentComplete.toString() + '%';
					if(document.getElementById('baifenbi').innerHTML == "100%"){
						document.getElementById('baifenbi').innerHTML = "请稍后...";
					}
				}else {
					document.getElementById('progressNumber').innerHTML = 'unable to compute';
				}
			}
			function uploadComplete(evt) {
				var pptInfo = $.parseJSON(evt.target.responseText)
				console.log(pptInfo.obj)  //打印ppt地址
			
				if(pptInfo.code == "200"){
					document.getElementById('baifenbi').innerHTML = "";
					document.getElementById("successtopost").innerHTML = 'PPT上传成功，请点击"开始转换"进行转换。'
				}
				document.getElementById("pptPath").innerHTML=pptInfo.obj;
			}
			function uploadFailed(evt) {
				var psdInfo = $.parseJSON(evt.target.responseText)
				alert("上传文件后缀不允许");
			}

			function uploadCanceled(evt) {
				var psdInfo = $.parseJSON(evt.target.responseText)
				alert("上传文件后缀不允许");
			}
				
			xhr.send(form);

		}

		b.reload = function(){
			var modalInstance = j.open({
			windowClass: "console six-contain",
			templateUrl:'myModelContent2.html',
			controller:'MainCtrl'
			})
		}
				// b.$watch("ppts",function(a,c){
				// 	console.log(a);
				// });
		//提交ppt
		b.postPpt = function(){
			var title = document.getElementById("title").value;
			var desc = document.getElementById("desc").value; //$.param
			var pptUrl = document.getElementById("pptPath").innerHTML;
			var photo = document.getElementById("picturePath").innerHTML;
			var file = document.getElementById("f").files[0];
			console.log(pptUrl)
			if(title == "" || title == null){
				return alert("标题不能为空")
			}else if(pptUrl == "" || pptUrl ==null || pptUrl == undefined){
				if(document.getElementById('baifenbi').innerHTML == ""){
					return alert("PPT不能为空")
				}else if(document.getElementById('successtopost').innerHTML == ""){
					return alert("文件正在上传，请稍后")
				}
			}else if(photo == "" || photo ==null){
				photo = "pptmorenfengmian/ppt.jpg"
			};
			document.getElementById("transform").style.display="block";
			var e = {
				"title":title,
				"desc":desc,
				"ppturl":pptUrl,
				"photo":photo
			} //PREFIX_URL + "index.php?c=Ppt&a=change"
			$http({
				method  : 'POST',
				url: PREFIX_URL + "index.php?c=Ppt&a=change",
				data: $.param(e), //序列化参数
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(result){
				if(result.code = "200"){
					b.$dismiss();
					a.$broadcast("search.ppt");
					var m = new Date;
					var item = $interval(function(){
						console.log("返回ppt状态");
						//检测状态清除定时器
						$.ajax({
							type:"GET",
							url:PREFIX_URL+"index.php?c=Ppt&a=pptlist&pageNo=1&pageSize=11&time="+m.getTime(),
							success:function(data){
								var status = data.list[0].is_del;
								var url = data.list[0].pptlink;
								if(status == '0'){
									//清除定时器
									$interval.cancel(item);
									//把ppt网址传给后台
									var href = window.location.href;
									if(href.indexOf('ttp')>0){
										$.ajax({
											type:'POST',
											url:PREFIX_URL + "index.php?c=Ppt&a=wxshare",
											data:{'ppturl':url},
											success:function(data){
												console.log(data)
											}
										})
									}
								}
							}
						})
						a.$broadcast("search.ppt");
					},5000)
				}
			});
		}
		b.listType = 0;
		b.ifCompany = 0;

		b.sceneLoading = !0;
		b.navChange = function(index) {
			b.sceneLoading = !0;//加载条
			switch(index){
				case 0: //我的微课  短页面
					b.$broadcast("search.myScene");
					break;
				case 1: //模板中心  短页面
					b.sceneLoading = !1;//删除加载条
					//b.$broadcast("search.model");
					break;
				case 2: //ppt
					a.$broadcast("search.ppt");
					break;
				case 3: //长图文
					b.$broadcast("search.longpage");
					break;
				default:
					alert("出错；请刷新页面");
					break;
			}

		b.listType = index; //1 || 0
		b.ifCompany = a.user.type;
	};

		b.isAllowedHistory = e.isAllowToAccess(e.accessDef.USERCENTER_HISTORY);
		b.showCloseStatus = [];
		b.showOpenStatus = [];
		b.isActive = "main";
		b.loginSuccess = e.isLoginSuccess;
		b.myScene = !0;
		b.showBranchSelect = !0;

		var s = a.branchid;
		b.XdpageSize = 100;
		b.getBranches = function(a) {
			k.getBranches(b.XdpageSize, a).then(function(a) {
				a.data.success && (b.branches = a.data.list);

			}, function() {})
		};
		b.getBranches(1);

		b.selectBranch = function(d) {
			d ? (b.branchCurrent = d, a.branchid = d.id, c.search({
				branchid: d.id
			})) : (a.branchid = "", c.search("branchid", null));
			b.reload();
		};

		var t = c.search().branchid;
		q(function() {
			if (t){
				for (var a = 0; a < b.branches.length; a++) {
					b.branches[a].id == t && (b.branchCurrent = b.branches[a]);
				}
			}
		}, 300);
		b.showSceneList = function() {
			b.initShowGuide = !1;
			a.$broadcast("eqmain.overflow.visible");

		},

		//获取用户信息
		b.getUserInfo = function() {
			k.getUserInfo().then(function(a) {
				b.userinfo = a.data.obj;
			})
		};
		b.getUserInfo();

		//查询微币
		b.userXd = 0;
		b.getUserXd = function() {
			k.getUserXd().then(function(a) {
				if(a.data.success){
					b.xdCounts = a.data.obj
					b.userXd = a.data.obj || 0
				}
			})
		};
		b.getUserXd();


		b.showSceneList = function() {
			b.initShowGuide = !1;
			a.$broadcast("eqmain.overflow.visible");
		};


		b.customerUpload = function() {//更改封面
			j.open({
				windowClass: "img_console console",
				templateUrl: "/Public/eq/6.0/templates/scene.console.bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(c) {
				if (c.width / c.height === 1) {
					b.userinfo.headImg = c.data;
					var d = {
						headImg: c.data,
						id: b.userinfo.id
					};
					return void k.saveUserInfo(d).then(function(d) {
						d.data.success && (b.editInfo.isEditable = !1, a.$broadcast("headImg.change", c.data))
					})
				}
				j.open({
					windowClass: "console seven-contain",
					templateUrl: "/Public/eq/6.0/templates/scene.console.imageCrop.tpl.html",
					controller: "imageCropCtrl",
					backdrop: "static",
					resolve: {
						obj: function() {
							return {
								type: "square",
								properties: {
									src: c.data
								}
							}
						}
					}
				}).result.then(function(c) {
					b.userinfo.headImg = c.src;
					var d = {
						headImg: c.src,
						id: b.userinfo.id
					};
					k.saveUserInfo(d).then(function(c) {
						c.data.success && (b.editInfo.isEditable = !1, a.$broadcast("headImg.change", c.data.obj.headImg))
					})
				}, function(a) {})
			}, function(a) {})
		},
		b.createScene = function(type, tpl) {
			if(parseInt(type) == 3){
				if(a.user.type == 1 || a.user.type == 12){
					if(window.confirm("您好！该功能目前只向企业用户开放，点击确定申请成为企业用户")){
						return  window.open("https://wetool.im/f/0viuuz");
					}else{
						return;
					}
				}else if(a.user.type ==2 || a.user.type == 21){
					 j.open({
						windowClass: "login-container seven-contain",
						templateUrl: "/Public/eq/6.0/templates/scene.createNew.tpl.html",
						controller: "SceneNewCtrl",
						resolve: {
							items: function() {
								return {
									fileType: type
								}
							}
						}
					})
				}	
			}else if(parseInt(type) == 0){
				j.open({
					windowClass: "login-container seven-contain",
					templateUrl: "/Public/eq/6.0/templates/scene.createNew.tpl.html",
					controller: "SceneNewCtrl",
					resolve: {
						items: function() {
							return {
									fileType: type
								}
						}
					}
				})
			}
		},
		b.buyXd = function() {
			//debugger;
			j.open({
				windowClass: "console six-contain",
				templateUrl: "?c=pay",
				controller: "BuyXdController",
				resolve: {
					getUserXd: function() {
						return function() {
							b.getUserXd();
							b.getXdlog(b.XdtoPage);
						}
					}
				}
			}).result.then(function() {}, function() {})
		}, //修改 
		b.transferXd = function() {
			//debugger;
			j.open({
				windowClass: "six-contain",
				templateUrl: "/Public/eq/6.0/templates/usercenter.transfer.tpl.html",
				controller: "UsercentertransferCtrl",
				resolve: {
					username: function() {
						return b.userinfo.loginName
					}
				}
			}).result.then(function() {
				b.getUserXd();
				b.getXdlog();
				b.getXdStatNum();

			}, function() {})
		}, //修改结束
		b.$watch("user.loginName", function(a, c) {
			if (a) {
				var d = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				b.loginSuccess && "eqs" == a.substr(0, 3) && !d.test(a) && l.pushForCurrentRoute("rel.tip", "notify.tip");
			}
		}), b.editScene = function(a, b, listType) {
			if(listType == 3){
				var islongpage = 1;
				a && a.stopPropagation();
				c.path("scene/create/" + b + "/" + islongpage).search("pageId", 1);
			}else{
				a && a.stopPropagation();
				c.path("scene/create/" + b).search("pageId", 1);
			}
			
		}, b.visitSceneAction = function() {
			i.openMsgDialog({
				msg: "分别可在设置微课-分享设置中、微课详情页中设置微课状态为不允许访问",
				btn: "知道了"
			}, function() {})
		}, b.showPreview = function(a, c, listType) {
			if(c.company_ext.is_audit == 'true'){
				a && a.stopPropagation();
				var d = b.canvasUrl + ("/v-" + c.code);
				window.open(d);
			}else{
				if (c.publishTime){
					if (c.publishTime && c.updateTime > c.publishTime) {
						i.openConfirmDialog({
							msg: "微课有更新需要再次发布才能预览最新内容，坚持预览会看到修改之前的微课",
							confirmName: "发布",
							cancelName: "坚持预览"
						}, function() {//发布
							b.publishScene(a, c, listType);
						}, function() {//坚持预览
							a && a.stopPropagation();
							var d = b.canvasUrl + ("/v-" + c.code);
							window.open(d);
						});
					}else {
						a && a.stopPropagation();
						var d = b.canvasUrl + ("/v-" + c.code);
						window.open(d);
					}
				} else {
					i.openConfirmDialog({
						msg: "尚未发布微课无法预览，请先发布",
						confirmName: "发布",
						cancelName: "取消"
					}, function() {
						b.publishScene(a, c, listType);//发布
					})
				}
			}
			
		}

		if(window.localStorage && "false" == localStorage.getItem("myScenesListType")){
			b.listType = !1;
		}else{
			b.listType = !0;
		}

		b.listToggle = function() {
			b.listType = !b.listType;
			window.localStorage && localStorage.setItem("myScenesListType", b.listType);

		}, b.addColor = function(a) {
			b.trIndex = a;

		}, b.removeColor = function() {
			b.trIndex = -1;

		}, b.sceneSettings = function(a, b, listType) {
			//debugger;
			if(listType == 3){
				var islongpage = 1;
				a && a.stopPropagation();
				c.path("scene/create/" + b+ "/" +islongpage).search({
					pageId: 1,
					openSetting: "show"
				})
			}else{
				a && a.stopPropagation();
				c.path("scene/create/" + b).search({
					pageId: 1,
					openSetting: "show"
				})
			}
			
		}, b.clickScene = function() {
			c.path("main");

		}, b.clickSpread = function() {
			c.path("main/spread");

		}, b.creatCompanyTpl = function(a, c, d) {
			a && a.stopPropagation();
			h.createCompanyTpls(c).then(function(a) {
				a.data.success && (b.myScenes[d].isTpl = 3, l.pushForCurrentRoute("scene.save.success.companyTpl", "notify.success"));
			})
		}, b.clearCompanyTpl = function(a, c, d) {
			a && a.stopPropagation();
			h.clearCompanyTpls(c).then(function(a) {
				a.data.success && (b.myScenes[d].isTpl = 0, l.pushForCurrentRoute("scene.clear.success.companyTpl", "notify.success"))
			})
		}, b.clickCustomer = function() {
			c.path("main/customer");
		};

		b.register = e.getRegisterInfo();

		b.logout = function() {
			e.logout()
		}, b.copyScene = function(a, b, listType) {
			a && a.stopPropagation();
			i.openConfirmDialog({
				msg: "确定复制此微课?"
			}, function() {
				h.copySceneById(b).then(function(a) {
					if(listType == 3){
						var islongpage = 1;
						c.path("scene/create/" + a.data.obj+ "/" + islongpage).search("pageId", 1);
					}else{
						c.path("scene/create/" + a.data.obj).search("pageId", 1)
					}
					
				})
			})
		};

		b.isAllowedToAccessTransfer = e.isAllowToAccess(e.accessDef.TRANSFER_SCENE);

		if(b.isAllowedToAccessTransfer){
			b.transferScene = function(c, d) {
				c && c.stopPropagation();

				if("eqs" == a.user.loginName.substr(0, 3) && null == a.user.email){
					i.openBindEmailDialog();
				}else{
					j.open({
						windowClass: "six-contain",
						templateUrl: "/Public/eq/6.0/templates/main.transferscene.tpl.html",
						controller: "TransferSceneCtrl",
						resolve: {
							sceneId: function() {
								return {
									sceneId: d
								}
							}
						}
					}).result.then(function() {
						b.getMyScenes();
					}, function() {})
				}
			}
		}

		b.color_arry = ['#eac8c1', '#c1ead4', '#d1bce2', '#b8dee8', '#e8e1af', '#a7addb'],
		b.getStyle = function(a, i) {
			i = i || 0;
			i = i % 6;
			var c = b.color_arry[i];
			return {
				"background-image": "url(" + PREFIX_FILE_HOST + a + ")",
				"background-size": "cover",
				"background-color": c
			};
		}, b.getLongStyle = function(a, i, data){//获取长页面背景图
			i = i || 0;
			i = i % 6;
			var c = b.color_arry[i];
			if(data){
				if(data.temp){
					a = data.temp;
				}else{
					a = "assets/images/default_thum_longpage.jpg";
				}
			}else{
				a = "assets/images/default_thum_longpage.jpg";
				
			}
			return {
				"background-image": "url(" + PREFIX_URL + a + ")",
				"background-size": "cover"
			};
		}, b.getImageStyle = function(a, i) {
			i = i || 0;
			i = i % 6;
			var c = b.color_arry[i];
			return {
				"background-image": "url(" + PREFIX_FILE_HOST + a + ")",
				"background-size": "cover",
				"background-color": c
			};
		}, b.totalItems = 0, b.totalItems2 = 0,b.page = {
			currentPage: 1
		};
		b.toPage = "", b.toPage3 = "";
		b.name = null;

		b.EnterPress = function(event, name, fileType) {//enter键搜索
			var d = event || window.event;
			13 == d.keyCode && b.submit(name, fileType);
		};
		b.searchButton = !0;
		var u = {};
		b.submit = function(name, fileType){
			b.name = name;

			switch(fileType){
				case 0:
					//我的微课
					f.getMyScenes(b.scene.type ? b.scene.type.value : null, r, b.pageSize, s, null, name);
					break;
				case 1:
					//模板中心的搜索
					h.getPageTpls(1, null, null, 0, 12, l.orderby, null, name);
					break;
				case 3:
					//长图文
					b.getMyLongScenes(b.page.currentPage3, b.pageSize3);
					break;
			}

			name && (b.searchButton = !1);
			u.refresh = !0; //我的微课的搜索
		}
		b.changeName = function(a) {
			b.searchButton = !0;
			"" == a && u.refresh && f.getMyScenes(b.scene.type ? b.scene.type.value : null, r, b.pageSize, s, null, a);

		};

		b.clearSearch = function(fileType){
			b.searchButton = !0;
			b.name = "";
			switch(fileType){
				case 0:
					//我的微课
					f.getMyScenes(b.scene.type ? b.scene.type.value : null, r, b.pageSize, s);
					break;
				case 1:
					//模板中心的搜索
					h.getPageTpls(1, null, null, 1, 12);
					break;
				case 3:
					//长图文
					b.getMyLongScenes(b.page.currentPage3, b.pageSize3);
					break;
			}
		}
		
		b.getMyScenes = function(a) {//获取个人数据-分类
			f.getMyScenes(b.scene.type ? b.scene.type.value : null, a, b.pageSize, s);
		};
		b.getMyScenes();

		b.$on("search.myScene", function(event){//切换到我的微课
			b.getMyScenes();
		});
		
		b.$on("get.my.scene.list", function(c) {//短页面整理格式
			var data = f.scenes;
			if(data.list && data.list.length > 0){
				b.myScenes = data.list;
				b.totalItems = data.map.count;
				b.page.currentPage = data.map.pageNo;
				b.allPageCount = data.map.count;
				b.toPage = data.map.pageNo;
				if(a.user && a.user.domain){
					b.url = a.user.domain;
					b.canvasUrl = "http://" + b.url;
				}else{
					// b.url = b.PREFIX_CLIENT_HOST;
					// b.canvasUrl = b.url;
					b.canvasUrl = b.PREFIX_CLIENT_HOST;
				}

			}else{
				b.canvasUrl = b.PREFIX_CLIENT_HOST;
				b.totalItems = 0;
				if(b.currentPage > 1){
					b.getMyScenes(--b.currentPage);
				}else{
					b.myScenes = [];
					b.allPageCount = 0;
				}
			}
			b.sceneLoading = !1;
		}), 

		b.getMyLongScenes = function(pageNo, pageSize) {//获取长图文数据 || 分类
			pageNo = pageNo ? pageNo : 1;
			pageSize = pageSize ? pageSize : 9;

			f.getLongPage(b.scene.type ? b.scene.type.value : null, b.name ? b.name : null, pageNo, pageSize).then(function(a) {
				b.longLists = a.data.list;
				b.totalItems3 = a.data.map.count;
				b.page.currentPage3 = a.data.map.pageNo;
				b.toPage3 = a.data.map.pageNo;
				b.pageSize3 = a.data.map.pageNo == 1 ? 9 : 10;

				b.sceneLoading = !1;//去除加载条
			})
		};

		b.$on("search.longpage",function(event){//切换长图文
			b.getMyLongScenes(1, 9);
		});

		a.$on("search.ppt", function(event){//切换ppt
			f.getPPT().then(function(response){
				b.ppt = response.data
				b.ppts = response.data.list;
				b.totalItems2 = b.ppt.map.count;

				b.sceneLoading = !1;//去除加载条
			});
		});
		b.deleteScene = function(a, c,listType) {
			a && a.stopPropagation();
			var d = b.isAllowedHistory ? "确定删除此微课?" : "确定删除此微课?";
			i.openConfirmDialog({
				msg: d
			}, function() {
				f.deleteSceneById(c).then(function() {
					if(listType==0){
						1 == b.myScenes.length && b.currentPage > 1 && b.currentPage--;
						b.getMyScenes(b.currentPage);
					}else{
						1 == b.longLists.length && b.page.currentPage3 > 1 && b.page.currentPage3--;
						b.getMyLongScenes(b.page.currentPage3);
						
					}
				})
			})
		}, b.deleteScene2 = function(a) {
			var url = PREFIX_URL+"index.php?c=Ppt&a=pptdel";
			var e = {"id":a}
			var del = confirm("是否删除此课件？");
			if(del==true){
				$http({
				 method  : 'POST',
				 url: url,
				 data: $.param(e), //序列化参数
				 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				 }).success(function(result){
				 alert(result.msg);
				 var pptId = "ppt" + e.id;
				 document.getElementById(pptId).style.display= "none";
				})
			}else{
				return;
			}
			
		}, b.pageChanged = function(a) {
			b.sceneLoading = !0;
			if (a == 1) {
				b.pageSize = 11;
			} else {
				b.pageSize = 12;
			}
			return 1 > a || a > b.totalItems / 10 + 1 ? void alert("此页超出范围") : (b.page.currentPage = a, void b.getMyScenes(a, b.pageSize));

		}, b.pageChanged2 = function(a){
			b.sceneLoading = !0;
			// if (a == 0) {
				b.pageSize = 11;
			// } else if(a>0){
			// 	b.pageSize = 12;
			// }
			var m = new Date;
			var url = PREFIX_URL+"index.php?c=Ppt&a=pptlist&pageNo=" + a+ "&pageSize=" + b.pageSize +"&time="+m.getTime();
			$http.get(url).success(function(response){
				b.ppt = response
				b.ppts = response.list;
				console.log(b.ppt);
				b.totalItems2 = b.ppt.map.count;
				console.log(b.totalItems2);
				b.page.currentPage2 = b.ppt.map.pageNo;
				console.log(b.page.currentPage2)
			})
		},b.pageChanged3 = function(a){
			b.sceneLoading = !0;
			if(a == 1){
				b.pageSize3 = 9;
			}else if(a > 1){
				b.pageSize3 = 10;
			}
			b.getMyLongScenes(a, b.pageSize3);

		};

		b.getTdStyle = function(a) {
			var b = $(".header_table td:eq(" + a + ")").outerWidth();
			return {
				width: b + "px",
				maxWidth: b + "px"
			}
		}

		b.scene.types = p.getSceneType();
		b.dataDetail = {};
		g.getDatas(s);
		g.getCustomDatas(s);

		b.$on("sceneDatas", function(a, c) {
			b.datasCount = c
		}), b.$on("customDatas", function(a, c) {
			b.customCount = c
		}), b.showDetail = function(a) {
			c.path("spread/share/" + a + "/socialShare")
		}, b.$on("$destroy", function() {
			e.setLoginSuccess(!1)
		}), b.publishScene = function(a, c, listType) {
			//debugger;
			if (a && a.stopPropagation(), !c.name) return void i.openMsgDialog({
				msg: "尚未设置标题，请设置后再执行此操作",
				btn: "去设置"
			}, function() {
				b.sceneSettings(a, c.id, listType)
			});
			var d = window.open();
			h.publishScene(c.id).then(function(a) {
				//debugger;
				if (a.data.success) {
					c.publishTime = (new Date).getTime();
					l.pushForCurrentRoute("scene.publish.success", "notify.success");
					var e = b.canvasUrl + ("/v-" + c.code);
					d.location = e;
				}
			})
		}, b.getRejectDetail = function(a) {
			a.stopPropagation();
			c.path("/usercenter/message");

		}, b.viewDetail = function(d) {
			a.showSpreadTable = !1;
			b.$parent.showBranchSelect = !1;
			c.path("/main/spread/statistics/" + d);
			n.getSceneDetail(d, s);
			n.getSceneData(d, -6, 1, s);
			//n.getWebList(d, !0, s);

			var e = new Date;
			e = new Date(e.getTime() - 864e5)
		}, b.audit = function(userType, sceneId){//积分提交审核 || 审核
			if(parseInt(userType) == 21){
				i.openConfirmDialog({
					msg: "请选择是否提交审核？", 
					confirmName: "确定",
					cancelName: "取消"
				}, function() {
					var isAudit = 1;
					f.subAudit(sceneId, isAudit, b.userinfo.id).then(function(a){
						if(a.data.code == 200){
							$("#scene_"+sceneId+" .audit").removeClass("not-audit").addClass("is-audit").children("span").text("待审核");
							$("#scene_"+sceneId+" .icon_list .audit-scene").remove();
						}
						
					});
				}, function() {});
			}else if(parseInt(userType) == 2 || parseInt(userType) == 23 ){
				i.openConfirmDialog({
					msg: "是否通过审核？",
					confirmName: "通过",
					cancelName: "拒绝"
				}, function() {
					var isPass = 1;
					f.saveAudit(sceneId, isPass, b.userinfo.id).then(function(a){
						if(a.data.code == 200){
							$("#scene_"+sceneId+" .audit").removeClass("is-audit").addClass("pass-audit").children("span").text("已通过");
							$("#scene_"+sceneId+" .icon_list .audit-scene-company").remove();
						}
						
					});
				}, function() {
					var isPass = 3;
					f.saveAudit(sceneId, isPass, b.userinfo.id).then(function(a){
						if(a.data.code == 200){
							$("#scene_"+sceneId+" .audit").removeClass("is-audit").addClass("refuse-audit").children("span").text("已拒绝");
							$("#scene_"+sceneId+" .icon_list .audit-scene-company").remove();
						}
						
					});
					
				});
			}
			

		}
}])/*.controller("BuyXdController", ["$scope", "$modal", "usercenterService", "ModalService", "getUserXd", function(a, b, c, d, e) {
		a.confirm = function() {
			c.getPayXdQrCode(10, 1).then(function(c) {
				if (a.$close(), c.data.success) {
					var f = c.data.obj;
					b.open({
						windowClass: "console",
						templateUrl: "/Public/eq/6.0/templates/usercenter.payment.tpl.html",
						controller: "PayMentCtrl",
						resolve: {
							qrCodeUrl: function() {
								return f
							},
							type: function() {
								return 10
							},
							money: function() {
								return ["500元"]
							},
							method: function() {
								return "buyXd"
							},
							counts: function() {}
						}
					}).result.then(function() {
						e()
					}, function() {})
				} else d.openMsgDialog({
					msg: c.data.msg
				})
			})
		}, a.cancel = function() {
			a.$close()
		}
	}]).controller("UsercentertransferCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "username", "$translate", function(a, b, c, d, e, f, g, h, i, j, k) {
		b.transfer = !0, b.userXd = {
			toUser: "",
			xdCount: ""
		}, b.submit = !1, b.getUserXd = function() {
			e.getUserXd().then(function(a) {
				a.data.success && (b.xdCount = a.data.obj)
			})
		}, b.getUserXd(), b.confirm = function() {
			b.submit = !0, b.getgiveXd()
		}, b.checkEmailFormat = function(a) {
			if(a.toUser){
				if(a.toUser == j){
					b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR2");
					$(".username").addClass("error");
					return !1;
				}else{
					b.mailFormatErr = "";
					return !0;
				}
			}else{
				b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR1");
				$(".username").focus();
				return !1;
			}
		}, b.checkXdFormat = function(a) {
			if(/^\+?[1-9][0-9]*$/.test(a.xdCount)){
				if(b.userXd.xdCount > b.xdCount){
					b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR2");
					return !1;
				}else{
					b.xdFormatErr = "";
					return !0;
				}
			}else{
				b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR1");
				return !1;
			}
		}, b.getgiveXd = function() {
			b.checkEmailFormat(b.userXd) && b.checkXdFormat(b.userXd) && e.getgiveXd(b.userXd).then(function(a) {
				if(200 == a.data.code){
					b.$close();
				}else if(1003 == a.data.code){
					b.mailFormatErr = a.data.msg;
				}else if(1010 == a.data.code){
					b.xdFormatErr = a.data.msg;
				}
			})
		}, b.cancel = function() {
			b.$close();
		}
	}])*/.directive("sysMsgAdjust", function() {
	return {
		restrict: "EA",
		link: function(a, b, c) {
			a.isSysMsgVeryShort = !1;
			var d = a.$watch(function() {
				return $(".messages", b).css("height")
			}, function(b) {
				"44px" === b && (a.isSysMsgVeryShort = !0)
			});
			b.bind("$destroy", function() {
				d()
			})
		}
	}
}).directive("selectPicker", function() {
	return {
		restrict: "EA",
		link: function(a, b, c) {
			b.selectpicker()
		}
	}
});

