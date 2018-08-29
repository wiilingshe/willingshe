angular.module("common.directives.inputNumber", []).directive("eqdInputNumber", function() {
		function a(iScope, iElement, iAttrs, require) {//iScope, iElement, iAttrs, require
			iElement.on("$destroy", function() {
				iElement.unbind("mousedown")
			});
			var min = "string" == typeof iAttrs.min ? iAttrs.min : -Number.MAX_VALUE,
				max = "string" == typeof iAttrs.max ? iAttrs.max : Number.MAX_VALUE,
				unit = "string" == typeof iAttrs.unit ? iAttrs.unit : "px",
				step = "string" == typeof iAttrs.step ? iAttrs.step : "1",
				q = 0;//保留几位小数点
			step.indexOf(".") > -1 && (q = step.split(".")[1].length);

			if("px" == unit){
				require.$parsers.push(b);
				require.$formatters.push(c);
			}else if("deg" == unit){
				unit = "", require.$parsers.push(d);
				require.$formatters.push(e);
			}else if("%" == unit){
				require.$parsers.push(f);
				require.$formatters.push(g);
			}else{
				require.$parsers.push(h);
			}

			iElement.mousedown(function(eve) {
				var c, 
					d = parseFloat(iElement.val()) || 0,
					e = eve.pageX;
				thisDocument.mousemove(function(event) {
					event.preventDefault();
					c = event.pageX - e;
					var f = +(d + c * step).toFixed(q);
					if(f >= min && max >= f){
						f += unit;
					}else if(min > f){
						f = min + unit;
					}else if(f > max){
						f = max + unit;
					}
					require.$viewValue != f && (require.$setViewValue(f), require.$render(), iScope.$apply())
				}), thisDocument.mouseup(function() {
					thisDocument.unbind("mousemove mouseup")
				})
			}).keydown(function(a) {
				var b = a.keyCode;
				return !!(b >= 48 && 57 >= b || b >= 96 && 105 >= b || 36 == b || 35 == b || 37 == b || 39 == b || 8 == b || 46 == b)
			})
		}
		function b(a) {
			return a = /-?\d+/.exec(a), a ? parseFloat(a) + "px" : "0"
		}
		function c(a) {
			return /-?\d+/.exec(a) + "px"
		}
		function d(a) {
			return a = /\d+/.exec(a), a ? "rotateZ(" + parseFloat(a) + "deg)" : "rotateZ(0)"
		}
		function e(a) {
			return /\d+/.exec(a)
		}
		function f(a) {// % 运算单位---涂抹比例
			return a = /\d+/.exec(a), a ? a / 100 + "" : "0"
		}
		function g(a) {// % 运算单位---透明度
			return 100 * a + "%"
		}
		function h(a) {
			return "" === a && (a = "0"), parseFloat(a) + ""
		}
		var thisDocument = $(document);
		return {
			restrict: "E",
			require: "ngModel",
			template: '<input class="eqc-input-number"/>',
			replace: !0,
			link: a
		}
	});