angular.module("visitorXq",["services.visitor"]),angular.module("visitorXq").controller("VisitorXqCtrl",["$rootScope","$http","$scope","$translate","showService","$location","$stateParams","visitorService",function(t,i,s,e,a,o,r,g){s.childCat="visitor",s.pageNo=1,s.pageSize=16,s.serverTag=[],s.cateTag=[],s.payTag=[],s.userId=r.id,s.qqAction=e.instant("show.visitorXq.QQ_LABEL"),s.getUserDetail=function(){g.getVisitorMsg(s.userId).then(function(t){s.visitorMsg=t.data.obj,null===s.visitorMsg.tel&&s.visitorMsg.phone?s.visitorMsg.tel=s.visitorMsg.phone:s.visitorMsg.tel&&s.visitorMsg.phone&&(s.visitorMsg.tel=s.visitorMsg.phone);var i=t.data.obj.tagList;if(i)for(var a=0;a<i.length;a++)"province"==i[a].type?s.serverTag.push({tagId:i[a].tagId,name:i[a].name}):"company_industry"==i[a].type?s.cateTag.push({tagId:i[a].tagId,name:i[a].name}):"payType"==i[a].type&&s.payTag.push({tagId:i[a].tagId,name:i[a].name});s.visitorMsg.headImg&&(0===s.visitorMsg.headImg.indexOf("http://")?s.visitorMsg.headImg=s.visitorMsg.headImg:s.visitorMsg.headImg=PREFIX_FILE_HOST+s.visitorMsg.headImg),null===s.visitorMsg.qq&&(s.qqAction="",$(".qq").addClass("hui"),s.visitorMsg.qq=e.instant("show.visitorXq.NO_QQ_HINT")),null===s.visitorMsg.tel&&($(".phone").addClass("hui"),s.visitorMsg.tel=e.instant("show.visitorXq.NO_TEL")),null===s.visitorMsg.wechat&&($(".weixin").addClass("hui"),s.visitorMsg.wechat=e.instant("show.visitorXq.NO_WECHAT"))})},s.getUserDetail(),s.totalItems=0,s.currentPage=1,s.getUserWorks=function(){g.getVisitorMesList(s.userId,s.pageNo,s.pageSize).then(function(t){s.visitorWorks=t.data.list,s.totalItems=t.data.map.count,s.toPage=t.data.map.pageNo;for(var i=0;i<s.visitorWorks.length;i++)s.visitorWorks[i].headImg&&0===s.visitorWorks[i].headImg.indexOf("http://")?s.visitorWorks[i].headImg=CLIENT_CDN+"assets/images/xiaotouxiang.png":s.visitorWorks[i].headImg=CLIENT_CDN+"assets/images/xiaotouxiang.png"})},s.getUserWorks(),s.pageChanged=function(t){return s.pageNo=t,1>t||t>s.totalItems/16+1?void alert(e.instant("show.OVER_PAGE_NUMBER")):void s.getUserWorks(s.userId,t,s.pageSize)}}]);