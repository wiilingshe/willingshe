angular.module('aaaa',[]).controller('createForm2',function($scope,$http,$location){
	$scope.create = function(){
		$location.path("form/blank");
		var data = {"ftype":"0","title":"text","sceneid":"0","photo":"null","istpl":"0","content":"null"}
		$http({
			url:PREFIX_HOST + '/index.php?c=form&a=design',
			method:'POST',
			data:data
		}).success(function(data){
			var fid = data.fid;
			console.log(fid);
		}).error(function(data,status,c,d){
			console.log(data)
		})
	}
})
angular.module("questionnaire",[]).controller("createForm", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "$stateParams","$modal", function($rootScope, $http, $scope, $setTimeout, security, $window, $stateParams,$modal) {
	$scope.duoxuan = function(){
	}







	$scope.save = function(){
		var data = {"type":"1","ipttitle":"text","iptval":"","info":[],"sort":"1"}
		$.ajax({
			type:"POST",
			url:PREFIX_HOST + "/index.php?c=form&a=create",
			data:data,
			success:function(data){
				var data = eval('(' + data + ')');
				console.log(data)
			}

		});

	};
	$scope.get = function(){
		$.ajax({
			type:"GET",
			url:PREFIX_HOST + "/index.php?c=form&a=create&fid=1",
			success:function(data){
				var data = eval('(' + data + ')');
				console.log(data)
			}

		})
	}
	//添加选项
	$('body').on('click','.addSelect',function(){
		var aa = $(this).parent('.div_table_radio_question').find('li:last').after("<li><input type=\"radio\"><div class=\"select\" ng-mouseover=\"event()\">点击编辑选项</div></li>");
		console.log(aa)
	})
	//显示拖动图标
	$('body').on('mouseover','.div_question',function(){
		$(this).css('border','2px solid #f53d05');
		$(this).css('cursor','move');
		$(this).find('.addSelect').css('display','block');
	});
	$('body').on('mouseout','.div_question',function(){
		$(this).css('border','2px solid #fff');
		$(this).find('.addSelect').css('display','none');
	});
	$(function() {  
    $( "#formContent" ).sortable();  
    $( "#formContent" ).disableSelection();  
  });
	//删除选项
	$('body').on('click','.detel',function(){
		alert(1)
	})
	//标题的编辑
	$('body').on('click','.div_title_question',function(){
		//获取初始值
		if($(this).find('input').length == 0){
			window.selectText2 = $(this).text();
		}else{
			return false;
		}
		//点击进入编辑状态
		var child = $(this).find('input');
		if(child.length == 0){
		var value = $(this).text();
		$(this).html("<input type=\"text\" value="+ value +">");
		$(this).after("<button onclick=\"confirmaa(this)\">确认</button><button class=\"detel\">删除</button><button onclick=\"cancelbb(this)\">取消</button>")
		}else{
		return false;
		}
	});
	
	$scope.createRadioButtonList = function(a){
		console.log(a);
		if($('#question').length>0){
			var length = $('#formContent').children('.div_question').length;
		var bianhao = length+1;
		if(length == 0){

			$('div #question').after("<div class=\"div_question\"><div class=\"div_title_question_all\"><div class=\"div_topic_question\">"+bianhao+".</div><div class=\"div_title_question\">点击编辑题目</div><span class=\"div_if_question\">&nbsp*</span></div><div class=\"div_table_radio_question\"><div class=\"div_table_clear_top\"></div><ul><li><input type=\"radio\"><div class=\"select\">点击编辑选项</div></li><li><input type=\"radio\"><div class=\"select\">点击编辑选项</div></li><li><input type=\"radio\"><div class=\"select\">点击编辑选项</div></li></ul><button class=\"addSelect\">添加选项</button><div class=\"div_table_clear_bottom\"></div><hr style=\"height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;\" /></div></div>");
		}else{
			$('div #formContent').children('.div_question:last').after("<div class=\"div_question\"><div class=\"div_title_question_all\"><div class=\"div_topic_question\">"+bianhao+".</div><div class=\"div_title_question\">点击编辑题目</div><span class=\"div_if_question\">&nbsp*</span></div><div class=\"div_table_radio_question\"><div class=\"div_table_clear_top\"></div><ul><li><input type=\"radio\"><div class=\"select\">点击编辑选项</div></li><li><input type=\"radio\"><div class=\"select\">点击编辑选项</div></li><li><input type=\"radio\"><div class=\"select\">点击编辑选项</div></li></ul><button class=\"addSelect\">添加选项</button><div class=\"div_table_clear_bottom\"></div><hr style=\"height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;\" /></div></div>");
		}
		}else{
			alert("请添加标题！");
			return false;
		}
	}
	//鼠标经过提示编辑
	$('body').on('mouseover' , '.select' , function(){
		var child = $(this).find('input');
		if(child.length == 0){
			$(this).parent().find('div').after("<span class=\"tishiyu\">点击选项可进行编辑</span>");
		}else{
			return false;
		}
	});
	//鼠标移除删除提示框
	$('body').on('mouseout','.select',function(){
		$(this).parent().find('span').remove();
	});
	//选项的编辑
	$('body').on('click','.select',function(){
		 // var dv_num = 0; 
		 //    $(".div_topic_question").each(function(){
		 //    	dv_num +=1;       
		 //    })
		 //    console.log(dv_num);
		if($(this).find('input').length == 0){
			window.selectText = $(this).text();
		}else{
			return false;
		}
		var child = $(this).find('input');
		if(child.length == 0){
			$(this).parent().find('span').remove();
			var value = $(this).text();
			$(this).html("<input type=\"text\" value="+ value +">");
			$(this).after("<button onclick=\"confirmaa(this)\">确认</button><button ng-click=\"detel()\">删除</button><button onclick=\"cancelaa(this)\">取消</button>")
			//$(this).parent().find('button').css('display',"inline-block");
		}else{
			return false;
		}
	})
	$scope.createTitle = function(){
		if(document.getElementById("question")!=undefined){
			alert("标题已存在，不可重复添加标题")
		}else{
			var modalInstance = $modal.open({
			windowClass: "console six-contain",
			templateUrl : BASE_URL + "templates/form/create_name.html",
			controller:"createNameCtrl",
			files:["controllers/formController"]
		})
		}
	}
}]);
angular.module("aaaaa",[]).controller("createNameCtrl",function($scope,$modal){
	$scope.cancel = function(){
		$scope.$dismiss();
	}
	$scope.getPater = function(){
		$scope.title = document.getElementById('nameInput').value;
		$scope.desc = document.getElementById('descInput').value;
		var createDiv = document.createElement('div');
		createDiv.setAttribute('id','question');
		createDiv.innerHTML = "<div id=\"divId\"><h1 id=\"pater_title\" style=\"color:#f53d05\">"+$scope.title+"</h1><div id=\"pater_desc\">"+$scope.desc+"</div><hr style=\"height:1px;border:none;border-top:1px dashed #c1c1c1;\" /></div>";
		document.getElementById('formContent').appendChild(createDiv);
		document.getElementById('divId').addEventListener('mouseover',function(){
			$('#question').css('border','2px solid #f53d05');
			$('#question').css('cursor','Pointer');
		})
		document.getElementById('divId').addEventListener('click',function(){
			var modalInstance = $modal.open({
			windowClass: "console six-contain",
			templateUrl : BASE_URL + "templates/form/create_name.html",
			controller:"createNameCtrl2",
			files:["controllers/formController"]
		})
		})
		document.getElementById('divId').addEventListener('mouseout',function(){
			$('#question').css('border','2px solid #fff');
			$('#question').css('cursor','');
		})
		$scope.$dismiss()
	}
})
angular.module('createname',[]).controller('createNameCtrl2',function($scope){
		$scope.getPater = function(){
			$scope.title = document.getElementById('nameInput').value;
			$scope.desc = document.getElementById('descInput').value;
			if($scope.title == "" || $scope.desc == ""){
				alert("不能为空！");
				return false;
			}
			document.getElementById('pater_title').innerHTML = $scope.title;
			document.getElementById('pater_desc').innerHTML = $scope.desc;
			$scope.$dismiss();
		}
})