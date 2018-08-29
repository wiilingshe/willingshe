angular.module("userCenter.userGuide", []).controller("userCenterGuideCtrl", ["$rootScope", "$scope", "security", "$stateParams", "$location", function($rootScope, b, security, d, $location) {

	function companyInfo(data, isCompanyVip) {
		var currentUserId = sessionStorage.getItem(currentUser.id);
		if(data && data[currentUser.id]){
			if(data[currentUser.id + "_isShow_" + currentUser.type]){
				b.isFirstLogin = !1;
			}else{
				currentUserId || (b.isCompanyVip = isCompanyVip, b.isFirstLogin = !0, sessionStorage.setItem(currentUser.id, !0));
				isCompanyVip && setTimeout(function() {
					b.isShowCompany()
				}, 100)
			}
		}else{
			b.isFirstLogin = !0;
			b.isCompany = !0;
			b.isCompanyVip = isCompanyVip;
			userCenterGuideObj = userCenterGuideObj || {};
			userCenterGuideObj[currentUser.id] = currentUser.type;
			userCenterGuideObj[currentUser.id + "_isShow_" + currentUser.type] = "2" == currentUser.type;
			setStorageObj(storageStr, userCenterGuideObj);
			sessionStorage.setItem(currentUser.id, !0);
		}
	}

	function personalInfo(loginInfo){
		if (window.localStorage) {
			if(loginInfo && loginInfo[$rootScope.user.id]){
				if(!loginInfo[$rootScope.user.id + "_isShow_" + currentUser.type] || b.user.checkEmail){
					b.isFirstLogin = !1;
				}else{
					loginInfo[$rootScope.user.id + "_isShow_" + currentUser.type] = !0;
					b.isFirstLogin = !0;
					currentUser.type != "2" && (b.isPerson = !0);
				}
			}else{
				b.isFirstLogin = !0;
				currentUser.type != "2" && (b.isPerson = !0);
				loginInfo = loginInfo || {};
				loginInfo[$rootScope.user.id] = 1;
				loginInfo[$rootScope.user.id + "_isShow_" + currentUser.type] = "2" != currentUser.type;
				localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
			}
		}
	}
	var userCenterGuideObj, 
		currentUser = security.currentUser,
		storageStr = "userCenterGuide",
		personStorageStr = "loginInfo",
		storageObj = null,
		personStorageObj = null,
		path = $location.path();
	if("1" == currentUser.type && path.indexOf("/account") >= 0){
		storageObj = getStorageObj(storageStr);
		companyInfo(storageObj, !1);
		$("#companyVip").css("background", "rgba(0,0,0,0.8");

	}else if ("2" == currentUser.type && path.indexOf("/main") >= 0) {
		storageObj = getStorageObj(storageStr);
		companyInfo(storageObj, !0);
		personStorageObj = getStorageObj(personStorageStr);
		personalInfo(personStorageObj, !0);

	}else if (("21" == currentUser.type || "1" == currentUser.type) && (path.indexOf("/main") >= 0)) {
		personStorageObj = getStorageObj(personStorageStr);
		personalInfo(personStorageObj, !0);

	}

	
	function getStorageObj(str) {
		if(window.localStorage){
			userCenterGuideObj = JSON.parse(localStorage.getItem(str));
			return userCenterGuideObj ? userCenterGuideObj : !1;
		}else{
			return null;
		}
	}
	function setStorageObj(a, b) {
		if(window.localStorage){
			return void localStorage.setItem(storageStr, JSON.stringify(b));
		}else{
			return null;
		}
	}


	b.showNextGuide = function() {
		b.isCompany = !1;
		b.isPerson = !0;
		$("#companyVip").css("background", "rgba(0,0,0,0");

	}, b.isShowCompany = function() {
		userCenterGuideObj = getStorageObj(storageStr);
		userCenterGuideObj[currentUser.id + "_isShow_" + currentUser.type] = !userCenterGuideObj[currentUser.id + "_isShow_" + currentUser.type];
		localStorage.setItem(storageStr, JSON.stringify(userCenterGuideObj));
	}
	
	
	b.closeDiv = function(){
		b.isPerson = !1;
		b.isFirstLogin = !1;
	},
	b.isShowPerson = function() {
		if (window.localStorage) {
			var loginInfoObj = JSON.parse(localStorage.getItem("loginInfo"));
			loginInfoObj[$rootScope.user.id + "_isShow_" + currentUser.type] = !loginInfoObj[$rootScope.user.id + "_isShow_" + currentUser.type];
			localStorage.setItem("loginInfo", JSON.stringify(loginInfoObj));
		}
	}
}])