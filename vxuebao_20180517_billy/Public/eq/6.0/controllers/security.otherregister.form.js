angular.module("security.otherregister.form",["services.localizedMessages","app.directives.register"]),angular.module("security.otherregister.form").controller("OtherRegisterFormController",["$scope","$timeout","security","localizedMessages","$location","$http","$window","otherRegisterInfo",function(e,r,t,o,s,i,n,a){e.user={},e.user.agreement=!0,e.getUserDetail=function(){var r={type:"qq",openId:a.openId,accessToken:a.accessToken};t.getUserDetail(r.type,r.openId,r.accessToken).then(function(r){e.otherUserInfo=r.data.obj})},e.getUserDetail()}]);