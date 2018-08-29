angular.module("services.file", ["services.i18nNotifications", "services.staticRes","services.dataCache"]); 
angular.module("services.file").factory("fileService", ["$rootScope", "$http", "i18nNotifications", "staticResService", "dataCacheService", function(a, b, c, d, e) {
	function f(a) {
		var c = "m/base/file/recently/used?fileType=" + a;
		return c += (/\?/.test(c) ? "&" : "?") + "time=" + (new Date).getTime(), b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}
	function g(a, c) {
		var d = "index.php?c=statics&a=history_save&fileIds=" + a + "&fileTypes=" + c;
		return d += (/\?/.test(d) ? "&" : "?") + "time=" + (new Date).getTime(), b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		})
	}
	function h() {
		var a = [{
			color: "#6366C3"
		}, {
			color: "#29A1D6"
		}, {
			color: "#332E42"
		}, {
			color: "#DBF3FF"
		}, {
			color: "#434A54"
		}, {
			color: "#000000"
		}, {
			color: "#F1F03E"
		}, {
			color: "#FCF08E"
		}, {
			color: "#972D53"
		}, {
			color: "#724192"
		}, {
			color: "#967BDC"
		}, {
			color: "#EC87C1"
		}, {
			color: "#D870AF"
		}, {
			color: "#F6F7FB"
		}, {
			color: "#666C78"
		}, {
			color: "#ABB1BD"
		}, {
			color: "#CCD0D9"
		}, {
			color: "#E6E9EE"
		}, {
			color: "#48CFAE"
		}, {
			color: "#36BC9B"
		}, {
			color: "#3BAEDA"
		}, {
			color: "#50C1E9"
		}, {
			color: "#AC92ED"
		}, {
			color: "#4B89DC"
		}, {
			color: "#4B89DC"
		}, {
			color: "#5D9CEC"
		}, {
			color: "#8DC153"
		}, {
			color: "#ED5564"
		}, {
			color: "#DB4453"
		}, {
			color: "#FB6E52"
		}, {
			color: "#FFCE55"
		}, {
			color: "#F6BB43"
		}, {
			color: "#E9573E"
		}, {
			color: "#9FF592"
		}, {
			color: "#A0D468"
		}];
		return a
	}
	function i(b) {
		C.sysCategoryList = "1" == b ? d.getTpTypes() : d.getBgTypes(), a.$broadcast("sysCategory.update")
	}
	function j(b) {
		C.sysMusicList = "2" == b ? d.getAudioTypes() : d.getSoundTypes(), a.$broadcast("sysMusic.update")
	}
	function k(c) {
		var d = "index.php?c=upfile&a=systag&type=11";
		c && (d += "&bizType=" + c);
		var f = d,
			g = e.get("sysTag", d);
		return g ? (C.sysTagList = g.list, void a.$broadcast("sysTag.update")) : (d += (/\?/.test(d) ? "&" : "?") + "time=" + (new Date).getTime(), void b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		}).then(function(b) {
			b.data.success && (C.sysTagList = b.data.list, e.push("sysTag", f, b.data), a.$broadcast("sysTag.update"))
		}))
	}
	function l(a, c, d, f, g, h, i) {
		return a += "pageNo=" + (c ? c : 1), a += "&pageSize=" + (d ? d : 10), a += "&fileType=" + f, (g || 0 === g) && (a += "&bizType=" + g), h && (a += "&tagId=" + h), i && (a += "&delete=1"), (searchVal != "") && (a += "&key=" + searchVal), e.contains("fileService1", a) ? e.asyncGet("fileService1", a) : (e.setAsyncUrl(a), a += "&time=" + Date.now(), b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + a
		}))
	}
	function m(c, d, f, g, h, i) {//图片/背景：c=url,d=pageNo,f=pageSize,g=type,h=id(种类),i= 
		g = g.toString();
		if (g === "0") {
            categoryUrl = PREFIX_URL + "index.php?c=upfile&a=getfiletype&filetype=bgType";
        } else if (g === "1") {
            categoryUrl = PREFIX_URL + "index.php?c=upfile&a=getfiletype&filetype=tpType";
        }
        if ("pure" != h) {
            "1" == g && (f = 21), c += "pageNo=" + (d ? d : 1), c += "&pageSize=" + (f ? f : 10), c += "&fileType=" + g, (h || 0 === h) && (c += "&bizType=" + h), i && (c += "&tagId=" + i);
            if (searchVal != "") {
                var currentPageNo = "pageNo=" + d;
	    		if(oldSearchPage != currentPageNo){ 
					searchUrl = searchUrl.replace(oldSearchPage, currentPageNo)
					oldSearchPage = currentPageNo
				}
                c = searchUrl;
            }
            var j = e.get("fileService", c);
            if (j) return C.imgList = j.list, C.totalItems = j.map.count, C.pageNo = j.map.pageNo, void a.$broadcast("imgList.update");
            var k = c;
            c += "&time=" + Date.now(), b({
                withCredentials: !0,
                method: "GET",
                url: PREFIX_URL + c
            }).then(function (b) {
                b.data.success && (C.imgList = b.data.list, C.totalItems = b.data.map.count, C.pageNo = b.data.map.pageNo, e.push("fileService", k, b.data), a.$broadcast("imgList.update"))
            })
        } else d * f <= D.length ? C.imgList = D.slice((d - 1) * f, d * f) : C.imgList = D.slice((d - 1) * f, D.length), C.totalItems = D.length, C.pageNo = d, a.$broadcast("imgList.update")
    }
	function n(a, b, c, d, e) {
		var f = "index.php?c=upfile&a=syslist&";
		return l(f, a, b, c, d, e)
	}
	function o(a, b, c, d, e) {
		var f = "index.php?c=upfile&a=syslist&";
		m(f, a, b, c, d, e)
	}
	function p(a, b, c, d, e, f) {
		var g = "index.php?c=upfile&a=userList&";
		return l(g, a, b, c, d, e, f)
	}
	function q(a, b, c, d, e) {
		var f = "index.php?c=upfile&a=userList&";
		m(f, a, b, c, d, e)
	}
	function r(c) {
		var d = "index.php?c=upfile&a=delete",
			e = {
				id: c
			};
		b({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + d,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(e)
		}).then(function(b) {
			b.data.success && a.$broadcast("files.delete")
		})
	}
	function s(a, c) {
		var d, e = "index.php?c=upfile&a=delete";
		return d = c ? {
			id: a,
			backup: c
		} : {
			id: a
		}, b({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + e,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(d)
		})
	}
	function t(a, c) {
		var d = "m/base/file/recycle/list?pageNo=" + a + "&pageSize=" + c;
		return b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		})
	}
	function u(a) {
		var c = "m/base/file/revoke?id=" + a;
		return b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}
	function v(c) {
		var d = "index.php?c=tag&a=create",
			e = {
				tagName: c
			};
		b({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + d,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(e)
		}).then(function(b) {
			C.tagList.push({
				id: b.data.obj,
				name: c
			}), a.$broadcast("tagList.update")
		}, function(a) {
			$scope.authError = "创建失败"
		})
	}
	function w() {
		var c = "index.php?c=tag&a=my&time" + (new Date).getTime();
		b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		}).then(function(b) {
			b.data.success && (C.tagList = b.data.list, a.$broadcast("tagList.update"))
		})
	}
	function x(c, d) {
		var e = "index.php?c=tag&a=delete",
			f = {
				id: c
			};
		b({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + e,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(f)
		}).then(function(b) {
			b.data.success && (C.tagList.splice(d, 1), a.$broadcast("tagList.delete"))
		})
	}
	function y(c, d) {
		var e = "index.php?c=tag&a=set",
			f = {
				tagId: c,
				fileIds: d
			};
		b({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + e,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(f)
		}).then(function(b) {
			b.data.success && a.$broadcast("tag.assign")
		})
	}
	function z(c, d) {
		var e = "m/base/file/tag/unset",
			f = {
				tagId: c,
				fileIds: d
			};
		b({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + e,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(f)
		}).then(function(b) {
			b.data.success && a.$broadcast("tag.unbind")
		})
	}
	function A(a, c, d, f) {
		var g = "index.php?c=upfile&a=syslist";
		if ("0" === d && "2" === f && (g = "index.php?c=upfile&a=userList&"), g += "&pageNo=" + (a ? a : 1), g += "&pageSize=" + (c ? c : 12), d && "all" != d && (g += "&bizType=" + (d ? d : -1)), g += "&fileType=" + (f ? f : -1), e.contains("mySounds", g)) return e.asyncGet("mySounds", g);
		e.setAsyncUrl(g);
		var h = new Date;
		return g += "&time=" + h.getTime(), b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + g
		})
	}
	function B(a) {
		var c = "index.php?c=page&a=crop";
		return b({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(a)
		})
	}
	function getVideo(pageNo,pageSize){
		var c = "/index.php?c=upfile&a=userList&pageNo="+pageNo+"&pageSize="+pageSize+"&fileType=5&time="+(new Date).getTime();
		return b({
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
		})
	}
	var C = {
		pageNo: 1,
		totalItems: 0,
		sysCategoryList: [],
		getSysCategory: i,
		sysTagList: [],
		getSysMusicCategory: j,
		userRecycle: t,
		fileRevoke: u,
		sysMusicList: [],
		getSysTagByCatId: k,
		imgList: [],
		getSystemFiles: n,
		getUserFiles: p,
		getSystemFiles1: o,
		getUserFiles1: q,
		tagList: [],
		createTag: v,
		getTagList: w,
		deleteTag: x,
		assignTag: y,
		unbindTag: z,
		deleteFile: r,
		deleteFile1: s,//删除文件
		getFileByCategory: A,
		getBgColorList: h,
		cropImage: B,
		getFilesHistory: f,
		saveFilesHistory: g,
		getMyvideo:getVideo,
		getPictures:m
	},
		D = h();
	return C
}]);