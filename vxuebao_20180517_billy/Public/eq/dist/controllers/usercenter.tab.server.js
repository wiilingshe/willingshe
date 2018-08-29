angular.module("usercenter.tab.server", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.tab.server").controller("ServerTabCtrl", ["$scope", "$rootScope", "usercenterService", "$translate", function(a, b, c, d) {		
	a.showController = {}, a.goStep = function(b) {
		a.step = b
	}, a.bindDomain = function() {
		a.showController.agreeBind = !0
	}, a.reApply = function() {
		a.isShowBindPanel = !0, a.showController.agreeBind = !1
	};
	var e = function() {
		c.getDomain().then(function(b) {
			if (b.data.success) {
				if (a.domainInfo = b.data.obj, a.model.day = b.data.obj.typeList[0], b.data.obj.id) {
					a.isShowBindPanel = !1, a.domainInfo.ipAddress = "202.173.11.90";
					var c = a.status = b.data.obj.status;
					switch(c){
						case 1:
							a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS1");
							a.unbind = !1;
							a.domainInfo.restTime = Math.floor((a.domainInfo.endDate - a.domainInfo.startDate) / 864e5);
							break;
						case 2:
							a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS2");
							a.unbind = !1;
							break;
						case 3:
							a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS3");
							a.unbind = !0;
							break;
						case 4:
							a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS4")
							break;
						default:
							if((new Date).getTime() > b.data.obj.endDate){
								a.status = 5;
								a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS5");
								a.unbind = !0;
							}
					}
				} else {
					a.isShowBindPanel = !0
				}
			}
		})
	};
	e();

	a.model || (a.model = {});
	var f = a.model;
	a.checkDomainFormat = function(b) {
		if(b.url){
			a.domainFormatErr = "";
			return !0;
		}else{
			a.domainFormatErr = d.instant("usercenter.server.WRITE_DNS");
			return !1;
		}

	}, a.checkDayFormat = function(b) {
		if(b.day){
			a.dayFormatErr = "";
			return !0;
		}else{
			a.dayFormatErr = d.instant("usercenter.server.WRITE_DATE");
			return !1;
		}

	}, a.checkAppIdAndSecret = function(b) {
		if(b.appId && !b.secretId){
			a.appIdFormatErr = d.instant("usercenter.serverWRITE_APPSECRET");
			return !1;
		}else if(!b.appId && b.secretId){
			a.appSecretErr = d.instant("usercenter.server.WRITE_APPID");
			return !1;
		}else{
			a.appIdFormatErr = "";
			a.appSecretErr = "";
			return !0;
		}

	}, a.submit = function() {
		if (a.checkDomainFormat(f) && a.checkDayFormat(f) && a.checkAppIdAndSecret(f)) {
			a.cost = f.day.label;
			if (a.xdCounts >= parseInt(a.cost, 10)) {
				var b = {
					url: f.url,
					buyTime: f.day.value,
					appId: f.appId,
					secretId: f.secretId
				};
				c.bindDomain(b).then(function(b) {
					if(b.data.success){
						alert(d.instant("usercenter.server.DNS_COMMIT"));
						a.status = 2;
						a.isShowBindPanel = !1;
						a.domainInfo.ipAddress = "202.173.11.90";
						a.domainInfo.url = f.url;
					}else{
						a.actionerror = b.data.msg;
					}

				}, function() {
					alert(d.instant("usercenter.server.SERVER_ERROR"));
				})
			} else a.xiudian = !0
		}
	}
}]);