angular.module("security.login.form",["services.localizedMessages","app.directives.addelement","security.thirdparty","services.dataCache"]).controller("LoginFormController",["$scope","$timeout","$window","security","localizedMessages","$location","$sce","thirdpartyService","dataCacheService",function(e,r,t,o,a,i,n,s,l){if(e.user={},e.retrieve={},e.showLogin=!0,e.sendPassword=!1,e.unExist=!1,e.authError=null,e.isValidateCodeLogin=o.isValidateCodeLogin,e.validateCodeSrc=PREFIX_URL+"servlet/validateCodeServlet",e.authReason=null,o.getLoginReason()&&(e.authReason=o.isAuthenticated()?a.get("login.reason.notAuthorized"):"您的账号已在其它地方登录，如非本人操作，请立即修改密码确保账号安全！"),window.localStorage){var c=localStorage.getItem("userEmail");c&&(e.user.email=c)}e.rotate=function(t){$(".modal-content").addClass("flip"),$(".login-form-section").fadeOut(600),r(function(){e.showLogin=!t,$(".login-form-section").fadeIn(0),$(".modal-content").removeClass("flip")},600)},e.login=function(){e.user.rememberAcc&&e.user.email?localStorage.setItem("userEmail",e.user.email):localStorage.removeItem("userEmail"),e.authError=null;var r={username:e.user.email,password:e.user.password,rememberMe:e.user.rememberMe};return!e.isValidateCodeLogin||(r.geetest_challenge=challenge,r.geetest_validate=validate,r.geetest_seccode=seccode,challenge&&validate&&seccode)?e.user.email?e.user.password?void o.login($.param(r)).then(function(r){challenge=null,validate=null,seccode=null,l.clear(),r?(selectorA&&selectorA(".gt_refresh_button").click(),1005===r.code,r.map&&(e.isValidateCodeLogin=r.map.isValidateCodeLogin),e.authReason="",e.authError=r.msg):(e.authError=a.get("login.error.invalidCredentials"),submit=!1)},function(r){e.authError=a.get("login.error.serverError",{exception:r})}):(e.authReason="",void(e.authError="密码不能为空")):(e.authReason="",void(e.authError="邮箱不能为空")):(e.authReason="",void(e.authError="验证码不能为空"))},e.openRegister=function(){i.path("/home/register",!1)},e.clearForm=function(){e.user={}},e.cancelLogin=function(){o.cancelLogin()},e.reset=function(){e.user={},e.retrieve={}};var d="https://api.geetest.com/get.php?gt=1ebc844c9e3a8c23e2ea4b567a8afd2d&time="+(new Date).getTime();e.validateCodeUrl=n.trustAsResourceUrl(d),r(function(){$('input[name="userEmail"]').focus()},300),e.retrievePassword=function(){return e.retrieve.email?submit?challenge&&validate&&seccode?void o.retrievePassword(e.retrieve.email,challenge,validate,seccode).then(function(r){challenge="",validate="",seccode="",200==r.data.code?(e.sendPassword=!0,submit=!1):(selectorA&&selectorA(".gt_refresh_button").click(),1003==r.data.code?e.retrieveError="账号不存在":1005==r.data.code&&(e.retrieveError="验证码错误"))}):void(e.retrieveError="验证码不能为空"):void(e.retrieveError="验证码匹配错误"):void(e.retrieveError="邮箱不能为空")},e.openThirdPatyWindow=function(e){s.openThirtyPartyWindow(e)}}]);