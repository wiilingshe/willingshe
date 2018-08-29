angular.module("usercenter.privilege",[]),angular.module("usercenter.privilege").controller("PrivilegeCtrl",["$location","usercenterService","$scope","$modal","security","ModalService",function(e,n,t,r,o,a){t.tabid="corporateMember",t.$watch(function(){return o.currentUser},function(e){e&&(t.currentUser=e,t.changeMemberType())},!0),t.changeMemberType=function(){if(t.currentUser&&t.currentUser.expiryTime){var e=(new Date).getTime();t.currentUser.expiryTime<=e&&(t.currentUser.memberType=null)}},t.changeMemberType(),t.upgradeAccount=function(e,n){return 1!=t.currentUser.type||t.companyInfo&&0===t.companyInfo.status?1==t.currentUser.type&&t.companyInfo?void a.openMsgDialog({msg:"您不是企业会员,请先申请企业会员后再进行升级！"}):2!=t.currentUser.type?void a.openMsgDialog({msg:"尊敬的用户，您当前账号类型无法升级为企业用户！"}):void r.open({windowClass:"console",templateUrl:BASE_URL+"templates/usercenter.upgrade.tpl.html",controller:"UpgradeCtrl",resolve:{type:function(){return e},isRenew:function(){return n}}}).result.then(function(){},function(){}):void("eqs"==t.currentUser.loginName.substr(0,3)&&null==t.currentUser.email?a.openMsgDialog({msg:"第三方账号请先关联账号"}):a.openMsgDialog({msg:"尊敬的用户，请您先申请免费企业用户，通过审核后再次升级",btn:"我知道了"},function(){r.open({windowClass:"seven-contain",templateUrl:BASE_URL+"templates/usercenter.console.upgrade_company.tpl.html",controller:"UsercenterupgradeCtrl",resolve:{user:function(){return{id:t.user.id}}}}).result.then(function(){},function(){})},function(){}))},t.cancel=function(){t.$close()},t.upgradeCompany=function(){r.open({windowClass:"seven-contain",templateUrl:BASE_URL+"templates/usercenter.console.upgrade_company.tpl.html",controller:"UsercenterupgradeCtrl",resolve:{user:function(){return{id:t.user.id}}}}).result.then(function(){},function(){})}}]).controller("UpgradeCtrl",["$modal","$scope","type","usercenterService","ModalService","security","$location","isRenew",function(e,n,t,r,o,a,c,u){n.confirm=function(){r.getCompanyQrCode(t,1).then(function(c){n.$close();var l,s;switch(t){case 1:l=u?["99元","450元"]:["99元","499元"],s=[{name:"30天",value:1},{name:"180天",value:6}];break;case 2:u?(l=["450元","800元"],s=[{name:"180天",value:1},{name:"365天",value:2}]):(l=["499元","900元"],s=[{name:"180天",value:1},{name:"365天",value:2}]);break;case 3:u?(l=["1.6万","3万"],s=[{name:"1年",value:1},{name:"2年",value:2}]):(l=["1.9万","3.2万"],s=[{name:"1年",value:1},{name:"2年",value:2}]);break;default:u?(l=["1800元","3200元"],s=[{name:"1年",value:1},{name:"2年",value:2}]):(l=["1999元","3600元"],s=[{name:"1年",value:1},{name:"2年",value:2}])}if(c.data.success){var i=c.data.obj;e.open({windowClass:"console",templateUrl:BASE_URL+"templates/usercenter.payment.tpl.html",controller:"PayMentCtrl",resolve:{qrCodeUrl:function(){return i},type:function(){return t},money:function(){return l},method:function(){return"member"},counts:function(){return s}},size:"lg"}).result.then(function(){r.getUserInfo().then(function(e){e.data.success&&(a.currentUser=e.data.obj)}),o.openMsgDialog({msg:"因网络原因，部分用户开通会有延迟",btn:"确定"},function(){n.openInvoice()})},function(){})}else o.openMsgDialog({msg:c.data.msg})})},n.openInvoice=function(){o.openConfirmDialog({msg:"是否开具发票？",confirmName:"是",cancelName:"否"},function(){n.openInvoiceListModal()},function(){c.path("/privilege")})},n.openInvoiceListModal=function(){e.open({windowClass:"console seven-contain",templateUrl:BASE_URL+"templates/usercenter.console.invoice-list.tpl.html",controller:"GetInvoiceListCtrl"}).result.then(function(){},function(){})},n.cancel=function(){n.$close()}}]).controller("PayMentCtrl",["$modal","$scope","qrCodeUrl","type","money","usercenterService","method","counts",function(e,n,t,r,o,a,c,u){n.qrCodeUrl=t,n.money=o[0],n.type=r,n.counts=u,n.payWay="alipay",u&&u.length>0&&(n.curentCount=u[0].value);var l={};l["alipay1"+n.curentCount]=t,n.paymented=function(){n.$close()},n.cancel=function(){n.$dismiss()},n.getWeChatUrl=function(e){n.payWay=e;var t=1;return"wechat"==n.payWay&&(t=0),l[n.payWay+""+t+n.curentCount]?void(n.qrCodeUrl=l[n.payWay+""+t+n.curentCount]):void("member"==c?a.getCompanyQrCode(r,t,n.curentCount).then(function(e){e.data.success&&(l[n.payWay+""+t+n.curentCount]=e.data.obj,n.qrCodeUrl=e.data.obj)}):a.getPayXdQrCode(r,t).then(function(e){e.data.success&&(l[n.payWay+""+t+n.curentCount]=e.data.obj,n.qrCodeUrl=e.data.obj)}))},n.setCount=function(e,t){n.curentCount=e,n.money=o[t];var c=1;if("wechat"==n.payWay&&(c=0),l[n.payWay+""+c+n.curentCount])return void(n.qrCodeUrl=l[n.payWay+""+c+n.curentCount]);var u=r,s=e;1==r&&6==e&&(u=2,s=1),a.getCompanyQrCode(u,c,s).then(function(e){e.data.success&&(l[n.payWay+""+c+n.curentCount]=e.data.obj,n.qrCodeUrl=e.data.obj)})}}]);