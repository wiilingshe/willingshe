angular.module("services.pagetpl", []), angular.module("services.pagetpl").factory("pageTplService", ["$http", "$rootScope", "$modal", "$q", "dataCacheService", function(a, b, c, d, e) {
		var f = {};
		return f.getPageTpls = function(b) {
			var c = "index.php?c=scene&a=getpagetpl&type=" + b,
				d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getMyTplList = function(b) {
			var c = "/index.php?c=scene&a=pagelist&id=" + b,
				d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getPageTplTypes = function() {
			var b = "index.php?c=statics&a=getPageTplType",
				c = new Date;
			return b += (/\?/.test(b) ? "&" : "?") + "time=" + c.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + b
			})
		}, f.getPageTagLabel = function(b) {
			var c = "index.php?c=statics&a=tagList&type=1";
			null != b && (c += (/\?/.test(c) ? "&" : "?") + "bizType=" + b);
			var d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getTagSysListWithType = function(b) {
			var c = "index.php?c=upfile&a=systag&type=2";
			null != b && (c += (/\?/.test(c) ? "&" : "?") + "bizType=" + b);
			var d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getPageTagLabelCheck = function(b) {
			var c = "/m/scene/tag/page/list?id=" + b,
				d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getPageTplTypestemp = function(b, c, d, f) {
			var g = "index.php?c=scene&a=syspagetpl",
				h = g,
				i = (new Date, {});
			return null != b && (h += (/\?/.test(g) ? "&" : "?") + "tagId=" + b, i.tagId = b), 
				c && (h += (/\?/.test(g) ? "&" : "?") + "name=" + c, i.name = c), 
				d && (h += (/\?/.test(g) ? "&" : "?") + "pageSize=" + d, i.pageSize = d), 
				f && (h += (/\?/.test(g) ? "&" : "?") + "pageNo=" + f, i.pageNo = f), 
				e.contains("pageTpl", h) ? e.asyncGet("pageTpl", h) : (e.setAsyncUrl(h), a({
					withCredentials: !0,
					method: "POST",
					url: PREFIX_URL + g,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					},
					data: $.param(i)
				}))
		},f.getPageTplTypestempLongpage = function(b, c, d, f,type) {//系统图片库/背景库/模板库
			//debugger;
			var g = type != 0 ? "index.php?c=upfile&a=syslist" : "index.php?c=scene&a=syspagetpl",
				h = g,
				i = (new Date, {}),
				filetype = type == 3 ? 0 : 1,
				fileId = b.indexOf(",") ?  b.split(",")[0] : b,
				fileTagId = b.indexOf(",") ?  b.split(",")[1] : "";
			return null != b && !type && (h += (/\?/.test(g) ? "&" : "?") + "tagId=" + b, i.tagId = b), 
					c && !type && (h += (/\?/.test(g) ? "&" : "?") + "name=" + c, i.name = c), 
					d && (h += (/\?/.test(g) ? "&" : "?") + "pageSize=" + (type ? 18 : d), i.pageSize = (type ? 18 : d)), 
					f && (h += (/\?/.test(g) ? "&" : "?") + "pageNo=" + f, i.pageNo = f), 
					type != 0 ? (h += (/\?/.test(g) ? "&" : "?") + "fileType=" +filetype, i.fileType = filetype) : (h += (/\?/.test(g) ? "&" : "?") + "islong=" + 1, i.islong = 1), 
					fileId && type && (h += (/\?/.test(g) ? "&" : "?") + "bizType=" + fileId, i.bizType = b), 
					fileTagId && type && (h += (/\?/.test(g) ? "&" : "?") + "&tagId=" +fileTagId, i.tagId = fileTagId),
					c && type && (h += (/\?/.test(g) ? "&" : "?") + "key=" + c, i.key = c), 
					e.contains("pageTpl", h) ? e.asyncGet("pageTpl", h) : (e.setAsyncUrl(h), a({
						withCredentials: !0,
						method: "POST",
						url: PREFIX_URL + h,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						},
						data: $.param(i)
					}))
		}, f.updataChildLabel = function(b, c) {
			var d = "m/scene/tag/page/set/?ids=" + b;
			null != c && (d += (/\?/.test(d) ? "&" : "?") + "pageId=" + c);
			var e = new Date;
			return d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + d
			})
		}, f
	}]);