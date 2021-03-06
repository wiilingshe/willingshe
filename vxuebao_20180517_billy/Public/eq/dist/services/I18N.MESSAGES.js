angular.module("I18N.MESSAGES", []).service("I18N.MESSAGES", ["$translate", "$rootScope", function(a, b) {
		function c() {
			angular.copy({
				"notify.success": "success",
				"notify.info": "info",
				"notify.danger": "danger",
				"notify.warning": "warning",
				"notify.tip": "tip",
				"errors.route.changeError": "Route change error",
				"crud.user.save.success": "A user with id '{{id}}' was saved successfully.",
				"crud.user.remove.success": "A user with id '{{id}}' was removed successfully.",
				"crud.user.remove.error": "Something went wrong when removing user with id '{{id}}'.",
				"crud.user.save.error": "Something went wrong when saving a user...",
				"crud.project.save.success": "A project with id '{{id}}' was saved successfully.",
				"crud.project.remove.success": "A project with id '{{id}}' was removed successfully.",
				"crud.project.save.error": "Something went wrong when saving a project...",
				"login.reason.notAuthorized": "离开久了，麻烦再登录一次吧！",
				"login.reason.notAuthenticated": "您的账号已在其它地方登录，如非本人操作，请立即修改密码确保账号安全！",
				"login.error.invalidCredentials": "登录失败，请检查邮箱和密码是否正确。",
				"login.error.serverError": "There was a problem with authenticating: {{exception}}.",
				"register.error.serverError": "There was a problem with authenticating: {{exception}}.",
				"login.reset.notmatch": "新密码和重复密码不匹配",
				"register.error.match": "两次输入密码不一致",
				"register.error.agreement": "请先同意注册协议再完成注册",
				"file.bg.pageSize": "12",
				"scene.create.console.ppt.error":"还未上传PPT图片,请重新上传！",
				"scene.create.console.ppt.success":"PPT图片上传成功！",
				"scene.create.console.psd.error":"还未上传PSD图片,请重新上传！",
				"scene.create.console.psd.success":"PSD图片上传成功！",
				"scene.save.success.published": "微课已保存成功！",
				"scene.save.success.nopublish": "保存成功，还需要发布哦！",
				"scene.save.success.companyTpl": "成功生成企业样例",
				"scene.clear.success.companyTpl": "成功取消企业样例",
				"companytpl.setting.success": "成功生成企业模板",
				"mytpl.setting.success": "成功生成我的模板",
				"scene.publish.success": "微课发布成功",
				"account.success": "提交成功！",
				"branch.open.success": "账号打开成功！",
				"branch.close.success": "账号关闭成功！",
				"dept.create.success": "部门创建成功！",
				"dept.update.success": "修改成功！",
				"branch.create.success": "账号创建成功！",
				"branch.update.success": "账号修改成功！",
				"scene.setting.success": "微课设置成功！",
				"data.assign.success": "分组成功！",
				"data.delete.success": "数据删除成功！",
				"custom.data.delete": "此条客户数据删除成功！",
				"group.delete.success": "分组删除成功！",
				"group.create.success": "分组创建成功！",
				"group.delete.data": "成功从分组内移除",
				"rel.tip": "您的账号还没有绑定邮箱，去用户中心->账号管理，马上绑定",
				"page.change.success": "页面名称修改成功！",
				"email.save.success": "邮箱绑定成功！",
				"reset.psw.success": "密码修改成功！",
				"save.success": "保存成功！",
				"upload.success": "上传成功！",
				"mail.rel.success": "关联成功！",
				"mail.unbind.success": "解除关联成功！",
				"file.assign.success": "分组成功！",
				"already.rel": "此账号已经关联过邮箱",
				"branch.reset.success": "子账号密码重置成功！",
				"already.bind.error": "{{msg}}",
				"reject.crop.image": "不支持裁剪GIF格式图片！",
				"visitor.apply": "信息已经提交审核，审核通过后会更新秀客信息，请耐心等待。",
				"select.trigger.source": "请选择触发源",
				"scratch.percentage.overflow": "涂抹比例不能大于100%",
				"invitation.sendemail.success": "邮件发送成功!",
				"invitation.sendemail.error": "邮件发送失败!",
				"outbox.warning": "红色警告：超出虚线外边框的内容，将无法在手机中被看到",
				"outbox.tip": "橙色警告：超出虚线内边框的内容，在部分老机型手机中将无法看到",
				"already.apply.discovery": "您已申请加入微课，暂时不能再申请！",
				"already.apply.sample": "您已申请过成为样例，暂时不能再申请！",
				"already.apply.activity": "您已申请过成为活动，暂时不能再申请！",
				"scene.apply.success": "申请成功",
				"xd.insufficient": "微币余额不足，去用户中心－>会员服务进行充值",
				"customer.name.overflow": "姓名不能超过50个字符",
				"scene.deny.apply": "审核未通过的微课不能申请活动",
				"scene.incheck.apply": "审核中的微课不能申请活动",
				"scene.accessCode.apply": "加密设置的微课不能加入活动"
			}, d)
		}
		var d = {};
		return a("notificationmsg.NOT_AUTHORIZED").then(function() {
			c()
		}), b.$on("$translateChangeSuccess", function() {
			a("notificationmsg.NOT_AUTHORIZED").then(function() {
				c()
			})
		}), d
	}]);