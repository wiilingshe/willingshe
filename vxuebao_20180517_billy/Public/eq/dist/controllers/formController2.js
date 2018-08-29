angular.module('cancelWarm',[]).controller('cancelWarmCtrl',['$scope','$location',function($scope,$location){
	$scope.commit = function(){
		$location.path('/form');
	}
	$scope.cancel = function(){
		$scope.$dismiss();
	}
}])
angular.module('viewForm',[]).controller('viewForm',['$scope','$location','$compile','$modal',function($scope,$location,$compile,$modal){
	$scope.host = $location.url()
	$scope.fid = $scope.host.substr(15);
	var a = $('.marking_title_top');
	$scope.createForm = function(){
		$location.path('/form')
	}
	$.ajax({
		type:'GET',
		url:PREFIX_HOST+'/index.php?c=form&a=preview&fid='+$scope.fid,
		success:function(data){
			var data = eval('('+data+')');
			if(data.code==1001) $(".previewPic").eq(0).attr('src','/view/images/preview.png'); $('.marking_inform_desc').text('提示: '+data.msg); //未发布
			if(data.bg_photo == ''){
				$('.previewPic').eq(0).attr('src','/view/images/preview.png')
			}else{
				$('.previewPic').eq(0).attr('src',data.bg_photo)
			}
			$scope.len = data.list.length;
			for(i=0;i<$scope.len;i++){
				if(data.list[i].type == 1){
					$('.marking_title_top').eq(0).text(data.list[i].ipttitle);
				}else if(data.list[i].type == 2){
					$('.marking_inform_desc').eq(0).text(data.list[i].ipttitle)
				}else if(data.list[i].type == 3 || data.list[i].type == 4 || data.list[i].type == 6 || data.list[i].type == 9 || data.list[i].type == 17){
					var radioHtml = '';
					for(x=0;x<data.list[i].info.length;x++){
						var a = '<div class="form_odd_select" style="background-color: rgb(255, 255, 255); cursor: pointer;"><div class="form_radio_bg" style="margin-top:-2px"><div class="form_redio_mid"></div></div><input style="display:none" type="radio" value="A"><p class="preview_left">'+data.list[i].info[x]+'</p></div>'
						var radioHtml = radioHtml + a;
					}
					if(data.list[i].type == 9){
						var radioHtml = '<div class="form_odd_select" style="background-color: rgb(255, 255, 255); cursor: pointer;"><div class="form_radio_bg" form_radio_bg><div class="form_redio_mid"></div></div><input style="display:none" type="radio" value="A" name="question[3509][]"><p class="preview_left">A.对</p></div><div class="form_odd_select" style="background-color: rgb(255, 255, 255); cursor: pointer;"><div class="form_radio_bg" form_radio_bg><div class="form_redio_mid"></div></div><input style="display:none" type="radio" value="B" name="question[3509][]"><p class="preview_left">B.错</p></div>'
					}
					var html = '<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="duo" style="color: #ff766c;display:none;font-size:16px">【多选题】</div><div class="form_type">3</div><div class="form_id">3504</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div></div><div class="div_table_radio_question"><div class="opt_all" style="margin-top:15px">'+radioHtml+'</div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px"></div>'
					$('.div_question:last').after($compile(html)($scope));
					if(data.list[i].type == 4){
						$('.div_question:last').find('.duo').eq(0).css('display','inline-block')
					}
					if(data.list[i].score == 0){
						$('.div_question:last').find('.preview_score').eq(0).css('display','none')
					}
				}else if(data.list[i].type == 7){
					var leftData = data.list[i].info.left;
					var rightData = data.list[i].info.right;
					leftData = leftData.replace(/&quot;/g,"\"");
					rightData = rightData.replace(/&quot;/g,"\"");
					leftData = eval('('+leftData+')');
					rightData = eval('('+rightData+')');
					var leftHtmls = '';
					var rightHtmls = '';
					for(var key in leftData){
						var two = 'L'+key;
						var leftHtml = '<input class="left" value="'+leftData[key][two]+'" disabled="disabled">';
						leftHtmls = leftHtmls +leftHtml;
					}
					for(var key2 in rightData){
						var two2 = 'R'+key2;
						var rightHtml = '<input class="right" value="'+rightData[key2][two2]+'" disabled="disabled">';
						rightHtmls = rightHtmls + rightHtml;
					}
					var html = '<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="form_type">'+data.list[i].type+'</div><div class="form_id">'+data.list[i].id+'</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div></div><div class="opt_all" style="margin-top:15px;"><div style="width:25%;display:inline-block">'+leftHtmls+'</div><div style="width:25%;display:inline-block">'+rightHtmls+'</div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px"></div>'
					$('.div_question:last').after(html);
					if(data.list[i].score == 0){
						$('.div_question:last').find('.preview_score').eq(0).css('display','none')
					}
				}else if(data.list[i].type == 5 || data.list[i].type == 8){
					var html = '<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div></div><div class="div_table_clear_top"></div><textarea disabled="disabled" class="write_area" placeholder="作答区..." type="text" name="question[3506][]"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px"></div>';
					$('.div_question:last').after(html)
					if(data.list[i].score == 0){
						$('.div_question:last').find('.preview_score').eq(0).css('display','none')
					}
				}else if(data.list[i].type == 11 || data.list[i].type == 12 || data.list[i].type == 13 || data.list[i].type == 14 || data.list[i].type == 15 || data.list[i].type == 16){
					var html = '<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="div_title_question">'+data.list[i].ipttitle+'</div></div><div class="div_table_clear_top"></div><input disabled="disabled" type="text" class="form_name" name="question[3511][]" style="margin-top:5px"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px"></div>';
					$('.div_question:last').after(html)
					if(data.list[i].score == 0){
						$('.div_question:last').find('.preview_score').eq(0).css('display','none')
					}
				}
			}
		}
	});
	$scope.savePic = function(){
		$scope.urlTpl = $('.previewPic').eq(0).attr('src');
		$scope.pathname = window.location.hash;
		$scope.pathname = $scope.pathname.slice(16);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST+'/index.php?c=form&a=bgphoto',
			data:{'fid':$scope.pathname,'tpl':$scope.urlTpl},
			success:function(data){
				var data = eval('('+data+')');
				$('.tishi').eq(0).css('display','none')
				alert('成功修改背景图！')
			}
		})
	}
	$scope.fileNameChanged = function(ele){
		if(ele.files.length > 0){
			$('.tishi').eq(0).css('display','block');
		}
		if(ele.files.length > 0){
			var formData = new FormData($('#viewPicUpload')[0]);
		        formData.append("bgphone","true");  
				$.ajax({
					type:'POST',
					url:PREFIX_HOST+'/index.php?c=form&a=upload_photo',
					data:formData,
					async: false,  
			        cache: false,  
			        contentType: false,  
			        processData: false,  
					success:function(data){
						$('.previewPic').eq(0).attr('src','Uploads/'+data.src);
						$scope.savePic();
					}
				})
		}
		
	}
}])
angular.module('tpl',['toBottom']).controller('formTpl',['$scope','$location','formService',function($scope,$location,formService){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.myForm = function(){
			return formService.myForm();
		}
		$scope.myTest = function(){
			return formService.myTest();
		}
	$scope.tplSearch = function(){
		var text = $('#tpl_search').val();
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=template',
			data:{'search':text},
			success:function(data){
				var data = eval('('+data+')');
				//console.log(data);
				getData(data)
			}
		})
	}
	$scope.nextPage = function($event){
		var nub = parseInt($($event.target).parent().find('.pageNo').text()) + parseInt("1");
		if(nub > $scope.pageNub){
			alert('已是最后一页')
		}else{
		$($event.target).parent().find('.pageNo').html(nub);
		$($event.target).parent().find('input').val(nub);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=template&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				getData(data)
			}
		})
		}
	}
	$scope.prePage = function($event){
		if($($event.target).parent().find('.pageNo').text() == 1){
			alert('当前页为首页')
		}else{
		var nub = $($event.target).parent().find('.pageNo').text() - 1;
		$($event.target).parent().find('.pageNo').html(nub);
		$($event.target).parent().find('input').val(nub);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=template&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
		}
	}
	$scope.dingPage = function($event){
		var nub = $($event.target).parent().find('input').val()
		if(nub > $scope.number){
			alert('最大页码为'+$scope.number)
		}else{
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=template&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
		}
	}
	$scope.toPage = function($event){
		var text = $($event.target).text();
		$($event.target).parent().find('.pageNo').html(text);
		$($event.target).parent().find('input').val(text);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=template&pageNo='+text,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
	}
	$scope.weiPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=template&pageNo='+$scope.number,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
	};
	$scope.firstPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=template&pageNo=1',
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
	};
	$('body').on('mouseover','.tpl_list_demo',function(){
			$(this).css('cursor','pointer')
	})
	$('body').on('mouseout','.tpl_list_demo',function(){
			$(this).css('cursor','')
	});
	$('body').on('mouseover','.translucent_form',function(){
		$(this).css('background-color','rgba(0, 0, 0, 0.8)'); 
		$(this).find('.translucent_mid span').css('display','block');
		$(this).find('.translucent_mid').css('background','url(view/images/form_view_see.png)');
		$(this).find('.translucent_mid').css('background-position-x','10px');
		$(this).find('.translucent_mid').css('background-position-y','15px');
		$(this).find('.translucent_mid').css('background-repeat','no-repeat');
		$(this).find('.translucent_mid').css('background-color','rgba(255, 255, 255, 0.2)');
		$(this).find('.translucent_see span').css('display','block')
		$(this).find('.translucent_see').css('background','url(view/images/form_view_edit.png)');
		$(this).find('.translucent_see').css('background-size','45%');
		$(this).find('.translucent_see').css('background-position-x','14px');
		$(this).find('.translucent_see').css('background-position-y','13px');
		$(this).find('.translucent_see').css('background-repeat','no-repeat');
		$(this).find('.translucent_see').css('background-color','rgba(255, 255, 255, 0.2)');
	});
	$('body').on('mouseout','.translucent_form',function(){
		$(this).css('background-color','rgba(0, 0, 0,0)');
		$(this).find('.translucent_mid').css('background-color','rgba(255, 255, 255, 0)');
		$(this).find('.translucent_mid').css('background','');
		$(this).find('.translucent_mid span').css('display','none');
		$(this).find('.translucent_see').css('background-color','rgba(255, 255, 255, 0)');
		$(this).find('.translucent_see').css('background','');
		$(this).find('.translucent_see span').css('display','none')
	})
	$scope.useTpl = function($event){
		var id = $($event.target).parent().parent().find('.tpl_id').text()
		//console.log(id)
		var type = $($event.target).parent().parent().find('.tpl_type').text()
		//console.log(id);
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=paraphrase&fid=' + id,
			success:function(data){
				var data = eval('('+data+')');
				if(type == 1){
					$location.path('/form/blank/'+ data.obj);
					$scope.$apply();
				}else if(type == 2){
					$location.path('/form/tests/'+ data.obj);
					$scope.$apply();
				}
			}
		})
	}
	$scope.preview = function($event){
		var id = $($event.target).parent().parent().find('.tpl_id').text()
		// window.open('/form-ipt-fid-'+id)
		window.open('#/form/viewForm/'+id);
	}
	function getData(data){
		$scope.lists = data.list;
		$scope.length = data.list.length;
		$scope.number = Math.ceil(data.count/data.pageSize);
		// if(data.count < 16){
		// 	$('.page_tpl').eq(0).css('display','none');
		// }
		$scope.pages = [];
		for(i=0;i<$scope.number;i++){
			x = i + 1;
			$scope.pages.push(x)
		}
		$scope.$apply();
	}
	$.ajax({
		type:'GET',
		async:false,
		url:PREFIX_HOST + '/index.php?c=form&a=template',
		success:function(data){
			var data = eval('('+data+')');
			getData(data);
		}
	});
	$scope.change = function(sort){
		if(sort == 0){
			$.ajax({
				type:'GET',
				url:PREFIX_HOST + '/index.php?c=form&a=template',
				success:function(data){
					var data = eval('('+data+')');
					getData(data);
				}
			});
		}else{
			$.ajax({
				type:'GET',
				url:PREFIX_HOST + '/index.php?c=form&a=template&form_type=' + sort,
				success:function(data){
					var data = eval('('+data+')');
					getData(data);
				}
			});
		}
		
	};
	$scope.tplNew = function(){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=template&new_form=1',
			success:function(data){
				var data = eval('('+data+')');
				getData(data);
			}
		})
	};
	$scope.tplHot = function(){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=template&hot_form=1',
			success:function(data){
				var data = eval('('+data+')');
				getData(data);
			}
		})
	}
}])
angular.module('view',['toBottom']).controller('studentView',['$scope','$modal','$location','formService',"usercenterService",function($scope,$modal,$location,formService,usercenterService){
	$scope.formType = 1;
	$('body').on('mouseover','.view_edit',function(){
		$(this).children('a').eq(0).css('color','#6c0')
	})
	$('body').on('mouseout','.view_edit',function(){
		$(this).children('a').eq(0).css('color','#76838f');
		$(this).css('color','#6c0')
	})
	$scope.createForm = function(){
		$location.path('/form')
	}
	$('body').on('mouseover','.view_see',function(){
		$(this).find('.view_see_top').eq(0).css('background-color','#6c0')
		$(this).css('color','#6c0');
		$(this).find('img').attr('src','../view/images/form_view_see.png')
	})
	$('body').on('mouseout','.view_see',function(){
		$(this).find('.view_see_top').eq(0).css('background-color','#fff');
		$(this).css('color','#76838f')
		$(this).find('img').attr('src','../view/images/form_view_see2.png')
	})
	$('body').on('mouseover','.view_edit',function(){
		$(this).find('.view_edit_top').eq(0).css('background-color','#6c0')
		$(this).find('img').attr('src','../view/images/form_view_edit.png')
	})
	$('body').on('mouseout','.view_edit',function(){
		$(this).find('.view_edit_top').eq(0).css('background-color','#fff')
		$(this).find('img').attr('src','../view/images/form_view_edit2.png')
	})
	var jcropApi;
	var url = $location.url();
	var fid = url.substr(11);
	var getData = function(data){
		$scope.ifFormType = data.list.type;
	}
	$scope.viewForm = function(){
		$scope.eid = fid;
		window.open('#/form/viewForm/'+$scope.eid);
	}
	$.ajax({
		type:'GET',
		url:PREFIX_HOST + '/index.php?c=form&a=view&id='+fid,
		async:false,
		success:function(data){
			var data = eval('('+data+')');
			getData(data);
			var a = $('.form_title').eq(0);
			$('.form_pic').eq(0).attr('src',data.list.photo);
			var b = $('.form_title').eq(0).text();
			if(b != "null"){
				$('.form_title').eq(0).text(data.list.title);
			}else{
				$('.form_title').eq(0).text('未设置标题');
			}
			$('.create_time').eq(0).text(data.list.create_time);
			if(data.list.publishint == "1"){
				$('.form_status').eq(0).text('已发布')
			}else{
				$('.form_status').eq(0).text('未发布')
			}
		}
	});
	$('body').on('click','.pic_upload_k',function(){
		$('.pic_upload').eq(0).animate({'opacity':'1'});
		$('.pic_upload').eq(0).css('height','inherit');
		$('.view_box').eq(0).css('height','inherit');
		$('.pic_upload').eq(0).css('display','block');
	})
	$scope.doUpload = function(){
		var form = new FormData($( "#uploadForm" )[0]);
	     $.ajax({  
	          url: PREFIX_HOST+'/index.php?c=form&a=upload_photo' ,  
	          type: 'POST',  
	          data: form,  
	          async: false,  
	          cache: false,  
	          contentType: false,  
	          processData: false,  
	          success: function (data) {  
	          	  //更换裁剪图片
	              $('.pic_path').eq(0).text(data.src);
	              jcropApi.setImage('Uploads/'+data.src);
	              $("#xuwanting").Jcrop({
						onChange:showCoords,
						onSelect:showCoords,
						boxWidth:300,
						boxHeight:300,
						aspectRatio:1,
						bgOpacity:0.6,
						setSelect:[0,0,300,300]
					}, function() {
						jcropApi = this;
				});
	              $('.pic_hint').eq(0).css('display','none')
	          },  
	          error: function (returndata) {  
	              alert(returndata);  
	          }  
	     });  
	}
	//记得放在jQuery(window).load(...)内调用，否则Jcrop无法正确初始化
	$("#xuwanting").Jcrop({
			onChange:showCoords,
			onSelect:showCoords,
			boxWidth:300,
			boxHeight:300,
			aspectRatio:1,
			bgOpacity:0.6,
			setSelect:[0,0,300,300]
		}, function() {
			jcropApi = this;
	});	
	//简单的事件处理程序，响应自onChange,onSelect事件，按照上面的Jcrop调用
	function showCoords(obj){
		$("#x1").val(obj.x);
		$("#y1").val(obj.y);
		$("#x2").val(obj.x2);
		$("#y2").val(obj.y2);
		$("#w").val(obj.w);
		$("#h").val(obj.h);
	}	
	$scope.myForm = function(){
		return formService.myForm();
	}
	$scope.myTest = function(){
		return formService.myTest();
	}
	$scope.fileChanged = function(ele){
		$('.pic_hint').eq(0).css('display','inline-block')
	    $scope.files = ele.files;
	    $scope.$apply(); //传播Model的变化。 
	    $scope.doUpload(); 
	}
	//确定裁剪
	$scope.confirm = function(){
		$.ajax({
			type:'POST',
			url:PREFIX_HOST+'/index.php?c=page&a=crop',
			data:{
				'x':$("#x1").val(),
				'y':$("#y1").val(),
				'w':$("#w").val(),
				'h':$("#h").val(),
				'src':$('.pic_path').eq(0).text(),
				'fileType':'1'},
			success:function(data){
				//裁剪成功更换封面
				var src = data.obj;
				$('.form_pic').eq(0).attr('src',PREFIX_HOST+'/Uploads/'+src);
				var path = '/Uploads/'+src;
				$.ajax({
					type:'POST',
					url: PREFIX_HOST+'/index.php?c=form&a=view&id='+fid,
					data:{'photo':path},
					success:function(data){
						// alert('上传成功！');
						$('#picCut').css({'display':'block','opacity':'1'});
						$('#picCut').attr('class','saveSuccesss');
						setTimeout(function(){
							$('#picCut').css({'display':'none','opacity':'0'});
							$('#picCut').removeClass('saveSuccesss');
						},1000);
						$('.pic_upload').eq(0).css({'overflow':'hidden'});
						$('.pic_upload').eq(0).animate({'height':'0','opacity':'0'});
					}
				})
			}
		})
	}
	var href = PREFIX_HOST + "/form/ipt/fid/"+fid;
	$('#student_pre').attr('href',href);
	$('#student_pre').attr('target','_blank');
	$('#form_url').html(href);
	$('#form_code').qrcode({ 
	    //render: "table", //table方式 
	    width: 150, //宽度 
	    height:150, //高度 
	    text: href //任意内容 
	}); 
	$scope.copyUrl = function(){
		var Url2=document.getElementById("form_url");
		Url2.select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		alert("已复制好，可贴粘。");
	}
		//导出问卷
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=outscore&efid=' + fid,
			success:function(data){
				var data = eval('('+data+')');
				var url = PREFIX_HOST + '/' + data.forwardUrl;
				$('#form_export').attr('href',url);
			}
		})
	$scope.editForm = function(){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST+'/index.php?c=form&a=view&id='+fid,
			success:function(data){
				var data = eval('('+data+')');
				var type = data.list.type;
				if(type == 1){
					$location.path('/form/blank/'+fid);
					$scope.$apply()
				}else if(type == 2){
					$location.path('/form/tests/'+fid);
					$scope.$apply()
				}
			}
		})
		
	}
	$('#student_pre').click(function(){
		window.open(href);
	});
	$('#data').click(function(){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			success:function(data){
				var data = eval('('+data+')');
			}

		})
	})
}])
angular.module('ggg',['toBottom']).controller('marking',['$scope','$location','formService',function($scope,$location,formService){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.myForm = function(){
		return formService.myForm();
	}
	$scope.myTest = function(){
		return formService.myTest();
	}
	function getData(data){
		$scope.lists = data.list;
		$scope.length = data.list.length;
		$scope.data = data;
		$('#marking_inform').find('.marking_inform_time').eq(0).html($scope.data.time);
	}
	var href = $location.url();
	var eid = href.substr(14,href.length);
	$.ajax({
			type:'GET',
			async:false,
			url:PREFIX_HOST + '/index.php?c=form&a=readpaper&eid='+eid,
			success:function(data){
			var data = eval('('+data+')');
			$('#form_test_time').html(data.time)
			$('#form_marking').find('.marking_title_top').html(data.title);
			$('#mark_sore').html(data.score+'分');
			getData(data);
		}
	});
	for(i=0;i<$scope.length;i++){
		var a = $scope.lists[i].question
		var htmls = '';
		var sort = i+1;
		//判断是不是第一道题
		if(i==0){
			//判断是不是选择题
			if(a != null){
				//是选择题是连线题
				for(x=0;x<a.length;x++){
					var html = '<div class="preview_left">'+a[x]+'</div>';
					var htmls = htmls + html;
				}
				if($scope.lists[i].type == 9){
					htmls = '<div class="preview_left">A.对</div><div class="preview_left">B.错</div>'
				}
				if($scope.lists[i].type == 7){
					var leftData = $scope.lists[i].question.left;
					var rightData = $scope.lists[i].question.right;
					leftData = leftData.replace(/&quot;/g,"\"");
					rightData = rightData.replace(/&quot;/g,"\"");
					leftData = eval('('+leftData+')');
					rightData = eval('('+rightData+')');
					var leftHtmls = '';
					var rightHtmls = '';
					for(var key in leftData){
						var l = 'L'+key;
						var r = 'R'+key;
						var leftHtml = '<input disabled="disabled" class="'+l+'" value="'+leftData[key][l]+'" style="margin-bottom:15px;">';
						leftHtmls = leftHtmls + leftHtml;
						var rightHtml = '<input disabled="disabled" class="'+r+'" value="'+rightData[key][r]+'" style="margin-bottom:15px;">';
						rightHtmls = rightHtmls + rightHtml;
					}
					var html = '<div class="div_question"><div class="marking_opt"><span class="div_topic_question">'+sort+'</span><div class="marking_title div_title_question preview_left" style="display:inline-block">'+$scope.lists[i].ipttitle+'</div><div class="preview_score">（分值：'+$scope.lists[i].e_score+'）</div><div class="form_opt opt_all">'+htmls+'</div><hr style="height:1px;border:none;border-top:1px dashed #d4d4d4;" /><div style="color:#f3695f;margin-bottom:20px">正确答案：</div><canvas id="canvas'+$scope.lists[i].id+'" width="400" height="300" style="position:absolute"></canvas><div class="left" style="display:inline-block;width:156px">'+leftHtmls+'</div><div class="right" style="display:inline-block;width:156px;margin-left:100px">'+rightHtmls+'</div><div style="color:#6c0;margin-bottom:20px">学生答案：</div><canvas id="myCanvas'+$scope.lists[i].id+'" width="400" height="300" style="position:absolute"></canvas><div class="sleft" style="display:inline-block;width:156px">'+leftHtmls+'</div><div class="sright" style="display:inline-block;width:156px;margin-left:100px">'+rightHtmls+'</div></div></div>';
					$('#form_marking').after(html);
					var canvasId = $('.marking_opt:last').find('canvas').eq(0).attr('id');
					var canvasLeft = $('.marking_opt:last').find('#'+canvasId).offset().left;
					var canvasTop = $('.marking_opt:last').find('#'+canvasId).offset().top;
					var inputWidth = $('.marking_opt:last').find('input').eq(0).css('width');
					inputWidth = parseInt(inputWidth);
					var c = document.getElementById(canvasId);
					var cxt = c.getContext('2d');
					var tanswer = $scope.lists[i].tanswer;
					for(var key in tanswer){
						var leftClass = tanswer[key].substring(0,2);
						var rightClass = tanswer[key].substr(2);
						var leftTop = $('.marking_opt:last').find('.'+leftClass).eq(0).offset().top;
						var leftLeft = $('.marking_opt:last').find('.'+leftClass).eq(0).offset().left;
						var rightTop = $('.marking_opt:last').find('.'+rightClass).eq(0).offset().top;
						var rightLeft = $('.marking_opt:last').find('.'+rightClass).eq(0).offset().left;
						cxt.moveTo(inputWidth,parseInt(leftTop-canvasTop+8));
						cxt.lineTo(parseInt(rightLeft-canvasLeft),parseInt(rightTop-canvasTop+8));
						cxt.stroke();
					}
					var scanvasId = $('.marking_opt:last').find('canvas').eq(1).attr('id');
					var scanvasLeft = $('.marking_opt:last').find('#'+scanvasId).offset().left;
					var scanvasTop = $('.marking_opt:last').find('#'+scanvasId).offset().top;
					var sc = document.getElementById(scanvasId);
					var scxt = sc.getContext('2d');
					var answer = $scope.lists[i].answer;
					for(var key in answer){
						var leftClass = answer[key].substring(0,2);
						var rightClass = answer[key].substr(2);
						var leftTop = $('.marking_opt:last').find('.'+leftClass).eq(1).offset().top;
						var leftLeft = $('.marking_opt:last').find('.'+leftClass).eq(1).offset().left;
						var rightTop = $('.marking_opt:last').find('.'+rightClass).eq(1).offset().top;
						var rightLeft = $('.marking_opt:last').find('.'+rightClass).eq(1).offset().left;
						scxt.moveTo(inputWidth+1,parseInt(leftTop-scanvasTop+8));
						scxt.lineTo(parseInt(rightLeft-scanvasLeft+1),parseInt(rightTop-scanvasTop+8));
						scxt.stroke();
					}
				}else{
					$('#form_marking').after('<div class="div_question"><div class="marking_opt"><span class="div_topic_question">'+sort+'.</span><div class="marking_title div_title_question preview_left" style="display:inline-block">'+$scope.lists[i].ipttitle+'</div><div class="preview_score">（分值：'+$scope.lists[i].e_score+'）</div><div class="form_opt opt_all">'+htmls+'</div><hr style="height:1px;border:none;border-top:1px dashed #d4d4d4;" /><div class="t_answer"><span>正确答案：</span><span class="stu_tanswer">'+$scope.lists[i].tanswer+'</span></div><div class="s_answer"><span>学生答案：</span><span class="stu_answer">'+$scope.lists[i].answer+'</span></div></div></div>')
				}
			}else{
				if($scope.lists[i].type == 5){
					$('#form_marking').after('<div class="div_question"><div class="marking_opt"><span class="div_topic_question">'+sort+'.</span><div class="marking_title div_title_question preview_left" style="display:inline-block">'+$scope.lists[i].ipttitle+'</div><div class="preview_score">（分值：'+$scope.lists[i].e_score+'）</div><div class="form_opt opt_all">'+htmls+'</div><div class="t_answer"><span>正确答案：</span><span class="stu_tanswer">'+$scope.lists[i].tanswer+'</span></div><div class="s_answer"><span>学生答案：</span><span class="stu_answer">'+$scope.lists[i].answer+'</span></div></div></div>')
				}else if($scope.lists[i].type == 12 || $scope.lists[i].type == 13 || $scope.lists[i].type == 14 || $scope.lists[i].type == 15 || $scope.lists[i].type == 16){
					return;
				}else if($scope.lists[i].type == 11){
					$('#marking_inform').find('.marking_inform_name').eq(0).html($scope.lists[i].answer[0]);
					$('#form_marking').after('<div class="div_question"><div class="marking_opt" style="display:none"></div></div>');
				}else{
					$('#form_marking').after('<div class="div_question"><div class="marking_opt"><span class="div_topic_question">'+sort+'.</span><div class="marking_title div_title_question preview_left" style="display:inline-block">'+$scope.lists[i].ipttitle+'</div><div class="preview_score">（分值：'+$scope.lists[i].e_score+'）</div><div class="form_opt opt_all">'+htmls+'</div><div class="s_answer"><span>学生答案：</span><span class="stu_answer">'+$scope.lists[i].answer+'</span></div></div></div>')
				}
				
			}
		}else if(i>0){
			//判断是不是选择题
			if(a != null){
				for(x=0;x<a.length;x++){
					var html = '<div class="preview_left">'+a[x]+'</div>';
					var htmls = htmls + html;
				}
				if($scope.lists[i].type == 9){
					htmls = '<div class="preview_left">A.对</div><div class="preview_left">B.错</div>'
				}
				if($scope.lists[i].type != 7){
					$('.marking_opt:last').after('<div class="marking_opt"><span class="div_topic_question">'+sort+'</span><div class="marking_title div_title_question preview_left" style="display:inline-block">'+$scope.lists[i].ipttitle+'</div><div class="preview_score">（分值：'+$scope.lists[i].e_score+'）</div><div class="form_opt opt_all">'+htmls+'</div><hr style="height:1px;border:none;border-top:1px dashed #d4d4d4;" /><div class="t_answer"><span>正确答案：</span><span class="stu_tanswer">'+$scope.lists[i].tanswer+'</span></div><div class="s_answer"><span>学生答案：</span><span class="stu_answer">'+$scope.lists[i].answer+'</span></div></div>');
				}else if($scope.lists[i].type == 7){
					var leftData = $scope.lists[i].question.left;
					var rightData = $scope.lists[i].question.right;
					leftData = leftData.replace(/&quot;/g,"\"");
					rightData = rightData.replace(/&quot;/g,"\"");
					leftData = eval('('+leftData+')');
					rightData = eval('('+rightData+')');
					var leftHtmls = '';
					var rightHtmls = '';
					for(var key in leftData){
						var l = 'L'+key;
						var r = 'R'+key;
						var leftHtml = '<input disabled="disabled" class="'+l+'" value="'+leftData[key][l]+'" style="margin-bottom:15px;">';
						leftHtmls = leftHtmls + leftHtml;
						var rightHtml = '<input disabled="disabled" class="'+r+'" value="'+rightData[key][r]+'" style="margin-bottom:15px;">';
						rightHtmls = rightHtmls + rightHtml;
					}
					var html = '<div class="marking_opt"><span class="div_topic_question">'+sort+'</span><div class="marking_title div_title_question preview_left" style="display:inline-block">'+$scope.lists[i].ipttitle+'</div><div class="preview_score">（分值：'+$scope.lists[i].e_score+'）</div><div class="form_opt opt_all">'+htmls+'</div><hr style="height:1px;border:none;border-top:1px dashed #d4d4d4;" /><div style="color:#f3695f;margin-bottom:20px">正确答案：</div><canvas id="canvas'+$scope.lists[i].id+'" width="400" height="300" style="position:absolute"></canvas><div class="left" style="display:inline-block;width:156px">'+leftHtmls+'</div><div class="right" style="display:inline-block;width:156px;margin-left:100px">'+rightHtmls+'</div><div style="color:#6c0;margin-bottom:20px">学生答案：</div><canvas id="myCanvas'+$scope.lists[i].id+'" width="400" height="300" style="position:absolute"></canvas><div class="sleft" style="display:inline-block;width:156px">'+leftHtmls+'</div><div class="sright" style="display:inline-block;width:156px;margin-left:100px">'+rightHtmls+'</div></div>';
					$('.marking_opt:last').after(html);
					var canvasId = $('.marking_opt:last').find('canvas').eq(0).attr('id');
					var canvasLeft = $('.marking_opt:last').find('#'+canvasId).offset().left;
					var canvasTop = $('.marking_opt:last').find('#'+canvasId).offset().top;
					var inputWidth = $('.marking_opt:last').find('input').eq(0).css('width');
					inputWidth = parseInt(inputWidth);
					var c = document.getElementById(canvasId);
					var cxt = c.getContext('2d');
					var tanswer = $scope.lists[i].tanswer;
					for(var key in tanswer){
						var leftClass = tanswer[key].substring(0,2);
						var rightClass = tanswer[key].substr(2);
						var leftTop = $('.marking_opt:last').find('.'+leftClass).eq(0).offset().top;
						var leftLeft = $('.marking_opt:last').find('.'+leftClass).eq(0).offset().left;
						var rightTop = $('.marking_opt:last').find('.'+rightClass).eq(0).offset().top;
						var rightLeft = $('.marking_opt:last').find('.'+rightClass).eq(0).offset().left;
						cxt.moveTo(inputWidth,parseInt(leftTop-canvasTop+8));
						cxt.lineTo(parseInt(rightLeft-canvasLeft),parseInt(rightTop-canvasTop+8));
						cxt.stroke();
					}
					var scanvasId = $('.marking_opt:last').find('canvas').eq(1).attr('id');
					var scanvasLeft = $('.marking_opt:last').find('#'+scanvasId).offset().left;
					var scanvasTop = $('.marking_opt:last').find('#'+scanvasId).offset().top;
					var sc = document.getElementById(scanvasId);
					var scxt = sc.getContext('2d');
					var answer = $scope.lists[i].answer;
					for(var key in answer){
						var leftClass = answer[key].substring(0,2);
						var rightClass = answer[key].substr(2);
						var leftTop = $('.marking_opt:last').find('.'+leftClass).eq(1).offset().top;
						var leftLeft = $('.marking_opt:last').find('.'+leftClass).eq(1).offset().left;
						var rightTop = $('.marking_opt:last').find('.'+rightClass).eq(1).offset().top;
						var rightLeft = $('.marking_opt:last').find('.'+rightClass).eq(1).offset().left;
						scxt.moveTo(inputWidth+1,parseInt(leftTop-scanvasTop+8));
						scxt.lineTo(parseInt(rightLeft-scanvasLeft+1),parseInt(rightTop-scanvasTop+8));
						scxt.stroke();
					}
				}
				
			}else{
				if($scope.lists[i].type == 5){
					$('.marking_opt:last').after('<div class="marking_opt"><span class="div_topic_question">'+sort+'</span><div class="marking_title div_title_question preview_left" style="display:inline-block">'+$scope.lists[i].ipttitle+'</div><div class="preview_score">（分值：'+$scope.lists[i].e_score+'）</div><div class="form_opt opt_all">'+htmls+'</div><div class="t_answer"><span>正确答案：</span><span class="stu_tanswer">'+$scope.lists[i].tanswer+'</span></div><div class="s_answer"><span>学生答案：</span><span class="stu_answer">'+$scope.lists[i].answer+'</span></div></div>')
				}else if($scope.lists[i].type == 7){
					var leftData = $scope.lists[i].question.left;
					leftData = leftData.replace(/&quot;/g,"\"");
					leftData = eval('('+leftData+')');
				}else if($scope.lists[i].type == 12 || $scope.lists[i].type == 13 || $scope.lists[i].type == 14 || $scope.lists[i].type == 15 || $scope.lists[i].type == 16){
					return;
				}else if($scope.lists[i].type == 11){
					$('#marking_inform').find('.marking_inform_name').html($scope.lists[i].answer[0]);
					$('#marking_inform').find('.marking_inform_time').html($scope.data.time);
					$('#form_marking:last').after('<div class="marking_opt" style="display:none"></div>');
				}else{
					$('.marking_opt:last').after('<div class="marking_opt"><span class="div_topic_question">'+sort+'</span><div class="marking_title div_title_question preview_left" style="display:inline-block">'+$scope.lists[i].ipttitle+'</div><div class="preview_score">（分值：'+$scope.lists[i].e_score+'）</div><div class="form_opt opt_all">'+htmls+'</div><div class="s_answer"><span>学生答案：</span><span class="stu_answer">'+$scope.lists[i].answer+'</span></div></div>')
				}
			}
		}
		if($scope.lists[i].type == 6 || $scope.lists[i].type == 17){
			$('.marking_opt').eq(i).find('.preview_score').eq(0).text('（此题为投票题，不计入总分）')
		}
	}
}])
var testStatistics = angular.module('ddd',['toBottom'])
testStatistics.controller('testStatistics',['$scope','$location','formService',function($scope,$location,formService){
	$scope.formType = 1;
	$scope.legend = ['不及格','及格','良好','优秀'] ;  //点

	$scope.getPer = function(){
		$scope.fine_score = $('.statistics_per_header').eq(0).find('input').eq(0).val();
		$scope.good_score = $('.statistics_per_header').eq(0).find('input').eq(1).val();
		$.ajax({
			type:'GET',
			async:false,
			url:PREFIX_HOST + '/index.php?c=form&a=scorelist&fid='+fid+'&fine_score='+$scope.fine_score+'&good_score='+$scope.good_score,
			success:function(data){
				var data = eval('('+data+')')
				$scope.legend = ['不及格','及格','良好','优秀']
				$scope.value = [data.st_res.pnum.failed_num,data.st_res.pnum.pass_num,data.st_res.pnum.fine_num,data.st_res.pnum.good_num]
				var myChart = echarts.init(document.getElementById('piemain'),'macarons'); 
				var myChart2 = echarts.init(document.getElementById('linemain'),'macarons'); 
					option = {
					    tooltip : { 
					        trigger: 'item',
					        formatter: "{b} : {c} ({d}%)"
					    },
					    legend: {
					        orient: 'vertical',
					        left: 'right',
					        data: $scope.legend
					    },
					    color:['#ff766c','#7fd7a2','#83c0e9','#f898bf'],
					    series : [
					        {
					            name: '访问来源',//a
					            type: 'pie',
								radius : '50%'  ,
								center: ['45%', '35%'],
					            data:function(){
					            	var data=[];
					            	for(i=0;i<$scope.legend.length;i++){
					            		var datalist = {value:$scope.value[i],name:$scope.legend[i]}
					            		data.push(datalist)
					            		
					            	}
								    return data;
					            }(),
					            itemStyle: {
					            	normal:{
							             label:{
							             show:true,
							             formatter: '{b} : {c}人 \n ({d}%)'
							             },
							             labelLine:{
							             show:true
							             }
						             },
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    ]
					};
					option2 = {
			            	tooltip: {
						        formatter: "{b} : {c}人"
			            	},
			            	toolbox: {
						        show : true,
						        feature : {
						            mark : {show: true},
						            dataView : {show: true, readOnly: false},
						            magicType : {show: true, type: ['line', 'bar']},
						            restore : {show: true},
						            saveAsImage : {show: true}
						        }
						    },
						    xAxis: {
						        data: ["不及格","及格","良好","优秀"]
						    },
						    yAxis: {splitArea : {show : true}},
						    series: [{
						        name: '成绩',
						        type: 'bar',
						        center: ['20%', '30%'],
						        data: [data.st_res.pnum.failed_num,data.st_res.pnum.pass_num,data.st_res.pnum.fine_num,data.st_res.pnum.good_num],
						        itemStyle: {
			                                    normal: {
			                                        color: function(params) {
			                                            // build a color map as your need.
			                                            var colorList = [
			                                              '#ff766c','#7fd7a2','#83c0e9','#f898bf','#27727B',
			                                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
			                                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
			                                            ];
			                                            return colorList[params.dataIndex]
			                                        },
			                　　　　　　　　　　　　　　//以下为是否显示，显示位置和显示格式的设置了
			                                        label: {
			                                            show: true,
			                                            position: 'top',
			                                            //formatter: '{c}'
			                                            formatter: '{c}'
			                                        }
			                                    }
			                                }
						    }]
			            };
					myChart.setOption(option);
					myChart2.setOption(option2);
			},
			error:function(data){
				console.log(data);
			}
		})
	}
	$scope.percentage = function(){
		var height = $('.statistics_per').eq(0).css('height')
		if(height == '0px'){
				$('.statistics_per').eq(0).animate({height:'470px'},'1000',function(){
					$('.all_title button').eq(0).text('收起统计')
				})
		}else{
			$('.statistics_per').eq(0).animate({height:'0px'},'1000',function(){
				$('.all_title button').eq(0).text('查看统计百分比')
			});
		}
	}
	$scope.stu_info = function($event){
		//考生信息
		var status = $($event.target).closest('.repeat_count').eq(0).find('.stu_info_id').eq(0).css('display');
		if(status == 'none'){
			var div_stu_len = $('.stu_info_id').length;
			for(r=0;r<div_stu_len;r++){
				var ss = $('.stu_info_id').eq(r).css('display')
				if(ss == 'block'){
					$('.stu_info_id').eq(r).css('display','none');
					$('.stu_info_id').eq(r).children('.stu_info_id_name').eq(0).remove()
				}
			}
			$($event.target).closest('.repeat_count').eq(0).find('.stu_info_id').eq(0).css('display','block')
			var einfo = $($event.target).closest('.repeat_count').eq(0).find('.mid_stu_info').eq(0).text();
			einfo = eval('('+einfo+')');
			for(i=0;i<einfo.arr_info_name.length;i++){
				$($event.target).closest('.repeat_count').eq(0).find('.stu_info_id').eq(0).children('.stu_info_id_name').after('<div class="col-xs-6">'+einfo.arr_info_name[i]+'</div><div class="col-xs-6">'+einfo.arr_info_val[i]+'</div><br/>')
			}
		}else{
			$($event.target).closest('.repeat_count').eq(0).find('.stu_info_id').eq(0).css('display','none')
			$($event.target).closest('.repeat_count').eq(0).find('.stu_info_id').eq(0).children('.stu_info_id_name').eq(0).remove()
		}
	}
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.myForm = function(){
		return formService.myForm();
	}
	$scope.myTest = function(){
		return formService.myTest();
	}
	//考试成绩统计
	function getData(data){
		$scope.lists = data.list;
		$scope.pageNub = Math.ceil(data.map.count/data.map.pageSize);
		var arr = []
		for(i=0;i<$scope.pageNub;i++){
			var x = i + 1;
			arr.push(x);
		}
		$scope.pages = arr;
		$scope.$apply();
      	$("html,body").animate({scrollTop:0}, 500);
      	if(data.map.count < 15){
      		$('.page_tpl').eq(0).css('display','none');
      	}
      	$scope.listsLen = data.list.length;
      	
      	for(t=0;t<$scope.listsLen;t++){
      		var arr_info_name = [];
      		var arr_info_val = [];
      		for(var key in data.list[t].einfo){
      			var einfo_name = key;
      			var einfo_val = data.list[t].einfo[key];
      			arr_info_name.push(einfo_name);
      			arr_info_val.push(einfo_val[0]);

      		}
      		$scope.lists[t].arr_info_name = arr_info_name;
      		$scope.lists[t].arr_info_val = arr_info_val;
      	}
      	
	}
	var a = $location.url();
	var fid = a.substr(21,a.length);
	$.ajax({
		type:'GET',
		async: false,
		url:PREFIX_HOST + '/index.php?c=form&a=scorelist&fid='+fid,
		success:function(data){
			var data = eval('('+data+')');
			getData(data);
		}
	})
	$('body').on('mouseover','.repeat_count',function(){
		$(this).css('background-color','#f0f0f0');
	});
	$('body').on('mouseout','.repeat_count',function(){
		$(this).css('background-color','#fff');
	})	
	//阅卷
	$scope.marking = function($event){
		$scope.eid = $($event.target).parent().parent().find('.formFid').text();
		// $location.path('/form/marking/'+$scope.eid);
		window.open('#/form/marking/'+$scope.eid)
	}
	$scope.nextPage = function($event){
		var nub = parseInt($($event.target).parent().find('.pageNo').text()) + parseInt("1");
		if(nub > $scope.pageNub){
			alert('已是最后一页')
		}else{
		$($event.target).parent().find('.pageNo').html(nub);
		$($event.target).parent().find('input').val(nub);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=scorelist&fid='+fid+'&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				getData(data)
			}
		})
		}
	}
	$scope.prePage = function($event){
		if($($event.target).parent().find('.pageNo').text() == 1){
			alert('当前页为首页')
		}else{
		var nub = $($event.target).parent().find('.pageNo').text() - 1;
		$($event.target).parent().find('.pageNo').html(nub);
		$($event.target).parent().find('input').val(nub);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=scorelist&fid='+fid+'&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
		}
	}
	$scope.dingPage = function($event){
		var nub = $($event.target).parent().find('input').val()
		if(nub > $scope.pageNub){
			alert('最大页码为'+$scope.pageNub)
		}else{
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=scorelist&fid='+fid+'&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
		}
	}
	$scope.toPage = function($event){
		var text = $($event.target).text();
		$($event.target).parent().find('.pageNo').html(text);
		$($event.target).parent().find('input').val(text);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=scorelist&fid='+fid+'&pageNo='+text,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
	}
	$scope.weiPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=scorelist&fid='+fid+'&pageNo='+$scope.pageNub,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
	};
	$scope.firstPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=scorelist&fid='+fid+'&pageNo=1',
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
	};
}]);
testStatistics.directive('line', function() {  
    return {  
        scope: {  
            id: "@",  
            legend: "=",  
            item: "=" 
        },  
        restrict: 'E',  
        template: '<div style="height:400px;"></div>',  
        replace: true,  
        link: function($scope, element, attrs, controller) {
        	var href = window.location.hash;
        	var fid = href.substr(22)
        	$.ajax({
        		type:'GET',
        		url:PREFIX_HOST + '/index.php?c=form&a=scorelist&fid='+fid,
        		async:false,
        		success:function(data){
        			var data = eval('('+data+')');
        			$('.statistics_per_header').eq(0).find('input').eq(0).val(data.st_res.fine_score);
        			$('.statistics_per_header').eq(0).find('input').eq(1).val(data.st_res.good_score);
        			var option = {
			                tooltip : {
						        trigger: 'item',
						        formatter: "{b} : {c}人 ({d}%)"
						    },
			                // 图例  
			                legend: {  
			                    orient: 'vertical',
						        left: 'right',
						        data: $scope.legend 
			                },
			                color:['#ff766c','#7fd7a2','#83c0e9','#f898bf'],
			                // 数据内容数组  
			                series: [
								        {
								            name: '访问来源',
								            type: 'pie',
								            radius : '50%'  ,
								            center: ['45%', '45%'],
								            data:[
								                {value:data.st_res.pnum.failed_num, name:'不及格'},
								                {value:data.st_res.pnum.pass_num, name:'及格'},
								                {value:data.st_res.pnum.fine_num, name:'良好'},
								                {value:data.st_res.pnum.good_num, name:'优秀'}
								            ],
								            itemStyle: {
								            	normal:{
										             label:{
											             show:true,
											             formatter: '{b} : {c}人 \n ({d}%)'
										             },
										             labelLine:{
										             	show:true
										             }
									             },
								                emphasis: {
								                    shadowBlur: 10,
								                    shadowOffsetX: 0,
								                    shadowColor: 'rgba(0, 0, 0, 0.5)'
								                }
								            }
								        }
								    ]
			            };
			            var option2 = {
			            	tooltip: {
						        formatter: "{b} : {c}人"
			            	},
			            	toolbox: {
						        show : true,
						        feature : {
						            mark : {show: true},
						            dataView : {show: true, readOnly: false},
						            magicType : {show: true, type: ['line', 'bar']},
						            restore : {show: true},
						            saveAsImage : {show: true}
						        }
						    },
						    xAxis: {
						    	// splitLine:{show: false},
						        data: ["不及格","及格","良好","优秀"]
						    },
						    yAxis: {splitArea : {show : true}},
						    series: [{
						        name: '成绩',
						        type: 'bar',
						        // center: ['40%', '100%'],
						        data: [data.st_res.pnum.failed_num,data.st_res.pnum.pass_num,data.st_res.pnum.fine_num,data.st_res.pnum.good_num],
						        itemStyle: {
			                                    normal: {
			                                        color: function(params) {
			                                            // build a color map as your need.
			                                            var colorList = [
			                                              '#ff766c','#7fd7a2','#83c0e9','#f898bf','#27727B',
			                                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
			                                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
			                                            ];
			                                            return colorList[params.dataIndex]
			                                        },
			                　　　　　　　　　　　　　　//以下为是否显示，显示位置和显示格式的设置了
			                                        label: {
			                                            show: true,
			                                            position: 'top',
			                                            //formatter: '{c}'
			                                            formatter: '{c}'
			                                        }
			                                    }
			                                },
			                                barWidth:60
						    }]
			            };
			            var myChart = echarts.init(document.getElementById('piemain'),'macarons');  
			            myChart.setOption(option);  
			            var myChart2 = echarts.init(document.getElementById('linemain'),'macarons');  
			            myChart2.setOption(option2); 
        		},
        		error:function(data){
        			var data = eval('('+data+')');
        			console.log(data);
        		}
        	});
             
        }  
    };  
}); 
angular.module('ccc',['toBottom']).controller('formStatistics',['$scope','$location','$modal','formService','$compile',function($scope,$location,$modal,formService,$compile){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.myForm = function(){
		return formService.myForm();
	}
	$scope.myTest = function(){
		return formService.myTest();
	}
	var href = $location.url();
	var fid = href.substr(21,href.length);
	function getData(data,fid){
		var listsLen = data.list.length;
		var lists = data.list;
		var score = data.score;
		for(i=0;i<data.list.length;i++){
			if(data.list[i].type == 3 || data.list[i].type == 4 || data.list[i].type == 6 || data.list[i].type == 9 || data.list[i].type == 17){
				var question = eval('('+data.list[i].question+')');
				var htmls = "";
				for(x=0;x<question.length;x++){
					var sort = String.fromCharCode(65+x);
					var html = '<div class="count_opt">'+question[x]+'</div><div class="count_pre" style="text-align: left;"><div style="background-color: #eee;width: 200px;height: 20px;display: inline-block;margin-right: 10px;margin-bottom: -5px;    margin-left:30%;"><div style="background-color: #6c0;height: 20px;width:'+data.list[i].answer[sort]+'"></div></div>'+data.list[i].answer[sort]+'</div>';
					var htmls = htmls + html;
				}
				var len = $('.form_statistics').length;
				var sort = i + 1;
				if(len == 0){
					$('#form_all').after('<div class="form_statistics"><div class="count_title">'+'1'+'.'+data.list[i].ipttitle+'</div><div class="form_statistics_top"><div class="col-md-6 col-xs-6">选项</div><div class="col-md-6 col-xs-6">比例</div></div>'+htmls+'<div class="count_opt" style="background-color:#eee">本题有效填写人数</div><div class="count_pre" style="background-color:#eee">'+data.score+'</div></div><div></div>');
					if(data.list[i].type == 3){
						$('.count_title').eq(i).after('<div style="display:inline-block;color:#6c0;font-size:16px;">（单选题）</div>');
					}else if(data.list[i].type == 4){
						$('.count_title').eq(i).after('<div style="display:inline-block;color:#6c0;font-size:16px;">（多选题）</div>')
					}
				}else{
					$('.form_statistics:last').after('<div class="form_statistics"><div class="count_title">'+(len+1)+'.'+data.list[i].ipttitle+'</div><div class="form_statistics_top"><div class="col-md-6 col-xs-6">选项</div><div class="col-md-6 col-xs-6">比例</div></div>'+htmls+'<div class="count_opt" style="background-color:#eee">本题有效填写人数</div><div class="count_pre" style="background-color:#eee">'+data.score+'</div></div><div></div>');
					if(data.list[i].type == 3){
						$('.count_title').eq(i).after('<div style="display:inline-block;color:#6c0;font-size:16px;">（单选题）</div>');
					}else if(data.list[i].type == 4){
						$('.count_title').eq(i).after('<div style="display:inline-block;color:#6c0;font-size:16px;">（多选题）</div>')
					}
				}
				if(data.list[i].type == 9){
					
				}
			}else{
				var answer = data.list[i].answer;
				var htmls = "";
				for(l=0;l<answer.length;l++){
					if(data.list[i].answer[l] == "null"){
						
					}else{
						var html = '<div class="form_answer">'+data.list[i].answer[l]+'</div>';
						var htmls = htmls + html;
					}
				}
				var len = $('.form_statistics').length;
				if(len == 0){
					var demo = '<div class="form_statistics"><div class="count_title" style="width:100%">'+'1'+'.'+data.list[i].ipttitle+'</div><a class="askCount" ng-click="askCount($event)">查看本题答案详细信息</a><div class="ask_answer" style="display:none">'+htmls+'</div></div>'
					$('#form_all').after($compile(demo)($scope))
				}else{
					var demo = '<div class="form_statistics"><div class="count_title" style="width:100%">'+(len+1)+'.'+data.list[i].ipttitle+'</div><a class="askCount" ng-click="askCount($event)">查看本题答案详细信息</a><div class="ask_answer" style="display:none">'+htmls+'</div></div>'
					$('.form_statistics:last').after($compile(demo)($scope))
				}
			}
		}
	}
	$('body').on('click','#form_bg',function(){
		$('#form_win').css('display','none');
		$('#form_bg').css('display','none');
		$('#form_win_answer').remove();
	});
	$('body').on('click','.form_close',function(){
		$('#form_win').css('display','none');
		$('#form_bg').css('display','none');
		$('#form_win_answer').remove();
	})
	$scope.askCount = function($event){
		var answerLen = $($event.target).parent().find('.form_answer').length;
		var title = $($event.target).parent().find('.count_title').text();
		if($('.answer_tan_last').length>0){
			$('.answer_tan_last').remove();
		}
		var htmls = "";
		$('#form_win').children('.form_win_title').eq(0).html(title)
		for(i=0;i<answerLen;i++){
			var a = $($event.target).parent().find('.form_answer').eq(i).text();
			var sort = i+1;
			var html = '<div class="answer_tan"><div class="col-md-6 col-xs-6 form_win_answer">'+sort+'</div><div class="col-md-6 col-xs-6">'+a+'</div></div>'
			var htmls = htmls + html;
		 }
		$('#form_win').children('.form_win_title').eq(0).after('<div id="form_win_answer"><div class="answer_tan"><div class="col-md-6 col-xs-6"  style="color:black">序号</div><div class="col-md-6 col-xs-6" style="color:black">答案文本</div></div>'+htmls+'</div><div class="answer_tan answer_tan_last" style="background-color:#fff"><div class="col-md-6 col-xs-6">本题有效填写人次</div><div class="col-md-6 col-xs-6">'+sort+'</div></div>')
		$('#form_win').css('display','block');
		$('#form_bg').css('display','block');
	}
	// $('body').on('click','.askCount',function(){
		
	// })
	$.ajax({
			type:'POST',
			async : false,
			url:PREFIX_HOST + '/index.php?c=form&a=surveynum&efid='+fid,
			success:function(data){
				var data = eval('('+data+')');
				getData(data,fid);
			}
	});
}]);
angular.module('fff',['toBottom']).controller('grade',['$scope','$location','formService',function($scope,$location,formService){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.myForm = function(){
		$scope.createForm = function(){
		$location.path('/form')
	}
		return formService.myForm();
	}
	$scope.myTest = function(){
		return formService.myTest();
	}
	var href = $location.url();
	var fid = href.substr(12,href.length);
	function getData(data){
		$scope.lists = data.list;
	}
	$.ajax({
		type:'GET',
		url:PREFIX_HOST + '/index.php?c=form&a=makescore&eid='+fid,
		async:false,
		success:function(data){
			var data = eval('('+data+')');
			getData(data)
		}
		});
		var href = PREFIX_HOST + '/index.php?c=form&a=makescore&eid='+fid;
		$('#form_score').attr('action',href);
		$scope.postFen = function(){
			// var timu_len = $('.grade_answer').length;
			// for(i=0;i<timu_len;i++){
			// 	var tianfen = $('.question_score').eq(i).val();
			// 	var benfen = $('.yincang_fen').eq(i).text();
			// 	if(tianfen > benfen){
			// 		var sort = $('.yincang_fen').eq(i).parent().parent().find('.grade_sort').eq(0).text();
			// 		alert(sort+'的分数填写不正确');
			// 		return false;
			// 	}
			// }
			$('#form_score').submit();
		}
	}])
angular.module('eee',['toBottom']).controller('checkQuestion',['$scope','$location','formService',function($scope,$location,formService){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.myForm = function(){
		$scope.createForm = function(){
		$location.path('/form')
	}
		return formService.myForm();
	}
	$scope.myTest = function(){
		return formService.myTest();
	}
	var href = $location.url();
	var fid = href.substr(20,href.length);
	$('body').on('mouseover','.repeat_count',function(){
		$(this).css('background-color','#eee');
	});
	$('body').on('mouseout','.repeat_count',function(){
		$(this).css('background-color','#fff');
	})
	function getData(data){
		$scope.lists = data.list;
		$scope.counts = Math.ceil(data.map.count/data.map.pageSize);
		var arr = [];
		for(i=0;i<$scope.counts;i++){
			var x = i + 1;
			arr.push(x)
		}
		$scope.pages = arr;
		$scope.$apply();
		$("html,body").animate({scrollTop:0}, 500);
		if(data.map.count < 15){
			$('.page_tpl').eq(0).css('display','none');
		}
	}
	$.ajax({
		type:'GET',
		url:PREFIX_HOST + '/index.php?c=form&a=needhand&id='+fid,
		async:false,
		success:function(data){
			var data = eval('('+data+')');
			getData(data)
		}
	});
	$scope.nextPage = function($event){
		if($($event.target).parent().find('.pageNo').text() == $scope.counts){
			alert('已是最后一页')
		}else{
			var nub = parseInt($($event.target).parent().find('.pageNo').text()) + parseInt("1");
			$($event.target).parent().find('.pageNo').html(nub);
			$($event.target).parent().find('input').val(nub);
			$.ajax({
				type:'GET',
				url:PREFIX_HOST + '/index.php?c=form&a=needhand&id='+fid+'&pageNo='+nub,
				success:function(data){
					var data = eval('('+data+')');
					getData(data);
				}
			})
		}
	}
	$scope.prePage = function($event){
		if($($event.target).parent().find('.pageNo').text() == 1){
			alert('当前页为首页')
		}else{
			var nub = $($event.target).parent().find('.pageNo').text() - 1;
			$($event.target).parent().find('.pageNo').html(nub);
			$($event.target).parent().find('input').val(nub);
			$.ajax({
				type:'GET',
				url:PREFIX_HOST + '/index.php?c=form&a=needhand&id='+fid+'&pageNo='+nub,
				success:function(data){
					var data = eval('('+data+')');
					var arr = [];
					for(i=0;i<data.list.length;i++){
						arr.push(data.list[i])
					}
					getData(data)
				}
			})
		}
	}
	$scope.dingPage = function($event){
		var nub = $($event.target).parent().find('input').val();
		if(nub > $scope.counts){
			alert('最大页码为'+$scope.counts)
		}else{
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=needhand&id='+fid+'&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
		}
	}
	$scope.toPage = function($event){
		var text = $($event.target).text();
		$($event.target).parent().find('.pageNo').html(text);
		$($event.target).parent().find('input').val(text);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=needhand&id='+fid+'&pageNo='+text,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
	}
	$scope.weiPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=needhand&id='+fid+'&pageNo='+$scope.counts,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
	};
	$scope.firstPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=needhand&id='+fid+'&pageNo=1',
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(data)
			}
		})
	};
	$scope.score = function($event){
		$scope.fid = $($event.target).parent().parent().find('.formFid').text();
		$location.path('/form/grade/'+$scope.fid);
	}
}]);
angular.module('bbb',['toBottom']).controller('myForm',['$scope','$location','$modal','formService',function($scope,$location,$modal,formService){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.details = function($event){
		var formFid = $($event.target).parent().parent().find('.formFid').eq(0).text();
		window.open('#/form/view/'+formFid)
	}
	$scope.preview = function($event){
		var formFid = $($event.target).parent().parent().find('.formFid').eq(0).text();
		window.open('#/form/viewForm/'+formFid);
	}	
	$scope.myForm = function(){
		return formService.myForm();
	}
	$scope.myTest = function(){
		return formService.myTest();
	}
	//查看统计
	function getData(arr,arr2,data){
		$('.repeat_count').empty();
		var count = Math.ceil(data.map.count/data.map.pageSize);
		$scope.pages = count;
		var counts = [];
		for(i=0;i<count;i++){
			var x = i + 1;
			counts.push(x);
		}
		$scope.formLists = arr;//数据列表
		$scope.formLists.PREFIX_HOST = window.location.host;
		var every = $scope.formLists.length;
		for(x=0;x<every;x++){
			var myForm_page = data.map.pageNo - 1;
			var num = (x + 1)+myForm_page*17;
			$scope.formLists[x].myForm_nums=num;
		}
		$scope.pageCounts = counts;
		$scope.$apply();
		if(data.map.count < 17){
			$('.page_tpl').eq(0).css('display','none');
		}
	}
	$.ajax({
		type:'GET',
		async : false,
		url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=1&pageNo=1',
		success:function(data){
			var data = eval('('+data+')');
			var arr = [];
			var arr2 = [];
			for(i=0;i<data.list.length;i++){
				if(data.list[i].type == 1){
					arr.push(data.list[i]);
				}else if(data.list[i].type == 2){
					arr2.push(data.list[i]);
				}
			}
			getData(arr,arr2,data);
		}
	});
	$scope.nextPage = function($event){
		if($($event.target).parent().find('.pageNo').text() == $scope.pages){
			alert('已是最后一页')
		}else{	
		var nub = parseInt($($event.target).parent().find('.pageNo').text()) + parseInt("1");
		$($event.target).parent().find('.pageNo').html(nub);
		$($event.target).parent().find('input').val(nub);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=1&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(arr,0,data)
			}
		})
		}
	}
	$scope.prePage = function($event){
		if($($event.target).parent().find('.pageNo').text() == 1){
			alert('当前页为首页')
		}else{	
		var nub = $($event.target).parent().find('.pageNo').text() - 1;
		$($event.target).parent().find('.pageNo').html(nub);
		$($event.target).parent().find('input').val(nub);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=1&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(arr,0,data)
			}
		})
		}
	}
	$scope.dingPage = function($event){
		var nub = $($event.target).parent().find('input').val();
		if(nub > $scope.pages){
			alert('码数超过限制')
		}else{	
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=1&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(arr,0,data)
			}
		})
		}
	}
	$scope.toPage = function($event){
		var text = $($event.target).text();
		$($event.target).parent().find('.pageNo').html(text);
		$($event.target).parent().find('input').val(text);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=1&pageNo='+text,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(arr,0,data)
			}
		})
	}
	$scope.weiPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=1&pageNo='+$scope.pages,
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(arr,0,data)
			}
		})
	};
	$scope.firstPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=1&pageNo=1',
			success:function(data){
				var data = eval('('+data+')');
				var arr = [];
				for(i=0;i<data.list.length;i++){
					arr.push(data.list[i])
				}
				getData(arr,0,data)
			}
		})
	};
	$('body').on('mouseover','.repeat_count',function(){
		$(this).css('background-color','#eee');
	});
	$('body').on('mouseout','.repeat_count',function(){
		$(this).css('background-color','#fff');
	})
	
	
	//返回编辑
	$scope.edit = function($event){
		var fid = $($event.target).parent().parent().find('.formFid').text(); 
		$location.path("form/blank/"+fid);
	}
	//统计功能
	$scope.myCount = function($event){
		$scope.fid = $($event.target).parent().parent().find('.formFid').text();
		// $location.path("form/formStatistics/"+$scope.fid);
		window.open("#/form/formStatistics/"+$scope.fid)
	}
	
	//删除问卷
	$scope.delete = function($event){
		$scope.fid = $($event.target).parent().parent().find('.formFid').text();
		$.ajax({
			type:'get',
			url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_fid='+$scope.fid,
			success:function(data){
				var data = eval('('+data+')');
				if(data.code == 200){
					$($event.target).parent().parent().css('display','none');
						alert(data.msg);
				}
			}
		});
	}
	
}]);
angular.module('llll',['toBottom']).controller('myTest',['$scope','$location','$modal','formService','$state',function($scope,$location,$modal,formService,$state){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.details = function($event){
		var formFid = $($event.target).parent().parent().find('.formFid').eq(0).text();
		// $location.path('/form/view/'+formFid);
		window.open('#/form/view/'+formFid);
	}
	//预览
	$scope.preview = function($event){
		$scope.formFid = $($event.target).parent().parent().find('.formFid').eq(0).text();
		window.open('#/form/viewForm/'+$scope.formFid);
	}
	//导出
	$scope.export = function($event){
		var fid = $($event.target).closest('.repeat_count ').find('.formFid').eq(0).text();
		$.ajax({
			type:'GET',
			url:PREFIX_HOST+'/index.php?c=form&a=outscore&efid='+fid,
			success:function(data){
				var data = eval('('+data+')');
				console.log(data.forwardUrl)
				window.open(data.forwardUrl);
			}
		})
	}
	$scope.myForm = function(){
			return formService.myForm();
	}
	$scope.myTest = function(){
		return formService.myTest();
	}
	//查看统计
	function getData(arr,arr2,data){
		var count = Math.ceil(data.map.count/data.map.pageSize);
		$scope.counts = count
		$scope.pages = count;
		var counts = [];
		for(i=0;i<count;i++){
			var x = i + 1;
			counts.push(x);
		}
		$scope.formLists = arr;
		$scope.testLists = arr2;
		$scope.pageCounts = counts;
		var every = $scope.testLists.length;
		for(x=0;x<every;x++){
			var num = (x+1)+(data.map.pageNo-1)*17;
			$scope.testLists[x].myTest_nums = num;
		}
		$scope.$apply();
		if(data.map.count < 17){
			$('.page_tpl').eq(0).css('display','none');
		}
	}
	$.ajax({
		type:'GET',
		async : false,
		url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=2',
		success:function(data){
			var data = eval('('+data+')');
			var arr = [];
			var arr2 = [];
			for(i=0;i<data.list.length;i++){
				if(data.list[i].type == 1){
					arr.push(data.list[i]);
				}else if(data.list[i].type == 2){
					arr2.push(data.list[i]);
				}
			}
			getData(arr,arr2,data);
		}
	});
	$scope.nextPage = function($event){
		var nub = parseInt($($event.target).parent().find('.pageNo').text()) + parseInt("1");
		if($($event.target).parent().find('.pageNo').text()== $scope.counts){
			alert('已是最后一页')
		}else{	
		$($event.target).parent().find('.pageNo').html(nub);
		$($event.target).parent().find('input').val(nub);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=2&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr2 = [];
				for(i=0;i<data.list.length;i++){
					arr2.push(data.list[i])
				}
				getData(0,arr2,data)
			}
		})
		}
	}
	$scope.prePage = function($event){
		var nub = $($event.target).parent().find('.pageNo').text() - 1;
		if($($event.target).parent().find('.pageNo').text() == 1){
			alert('当前页为首页')
		}else{	
		$($event.target).parent().find('.pageNo').html(nub);
		$($event.target).parent().find('input').val(nub);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=2&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr2 = [];
				for(i=0;i<data.list.length;i++){
					arr2.push(data.list[i])
				}
				getData(0,arr2,data)
			}
		})
		}
	}
	$scope.dingPage = function($event){
		var nub = $($event.target).parent().find('input').val();
		if(nub > $scope.counts){
			alert('码数超过限制')
		}else{	
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=2&pageNo='+nub,
			success:function(data){
				var data = eval('('+data+')');
				var arr2 = [];
				for(i=0;i<data.list.length;i++){
					arr2.push(data.list[i])
				}
				getData(0,arr2,data)
			}
		})
		}
	}
	$scope.toPage = function($event){
		var text = $($event.target).text();
		$($event.target).parent().find('.pageNo').html(text);
		$($event.target).parent().find('input').val(text);
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=2&pageNo='+text,
			success:function(data){
				var data = eval('('+data+')');
				var arr2 = [];
				for(i=0;i<data.list.length;i++){
					arr2.push(data.list[i])
				}
				getData(0,arr2,data)
			}
		})
	}
	$scope.weiPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=2&pageNo='+$scope.pages,
			success:function(data){
				var data = eval('('+data+')');
				var arr2 = [];
				for(i=0;i<data.list.length;i++){
					arr2.push(data.list[i])
				}
				getData(0,arr2,data)
			}
		})
	};
	$scope.firstPage = function($event){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=haveexam&type=2&pageNo=1',
			success:function(data){
				var data = eval('('+data+')');
				var arr2 = [];
				for(i=0;i<data.list.length;i++){
					arr2.push(data.list[i])
				}
				getData(0,arr2,data)
			}
		})
	};
	$('body').on('mouseover','.repeat_count',function(){
		$(this).css('background-color','#eee');
	});
	$('body').on('mouseout','.repeat_count',function(){
		$(this).css('background-color','#fff');
	})
	//删除问卷
	$scope.delete = function($event){
		$scope.fid = $($event.target).parent().parent().find('.formFid').text();
		$.ajax({
			type:'get',
			url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_fid='+$scope.fid,
			success:function(data){
				var data = eval('('+data+')');
				if(data.code == 200){
					$($event.target).parent().parent().parent().css('display','none');
					alert(data.msg);
				}
			}
		});
	}
	$scope.checkQuestion = function($event){
		$scope.fid = $($event.target).parent().parent().find('.formFid').text();
		// $location.path('/form/checkQuestion/'+$scope.fid)
		window.open('#/form/checkQuestion/'+$scope.fid);
	}
	//试卷统计
	$scope.countTest = function($event){
		$scope.fid = $($event.target).parent().parent().find('.formFid').text();
		// $location.path("form/testStatistics/"+$scope.fid);
		window.open('#/form/testStatistics/'+$scope.fid)
	}
	//编辑
	$scope.editTest = function($event){
		$scope.fid = $($event.target).parent().parent().find('.formFid').text()
		$location.path('/form/tests/'+$scope.fid)
	}

}])
angular.module('aaaa',['toBottom']).controller('createForm2',['$scope','$http','$location','$state','formService',function($scope,$http,$location,$state,formService){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	var getData = function(data){
		$scope.userType = data.obj.type;
	}
	$.ajax({
			type:'GET',
			url:PREFIX_HOST+"/index.php?c=user&a=check&time=1487571408261",
			async:false,
			success:function(data){
				getData(data);
			}
		});
	$scope.viewTpl = function(){
		$location.path("form/tpl");
	}
	$scope.createTest = function(){
		var config = {
    			headers : {
        			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    			}
		}
		var data = {"ftype":"2"};
		data = $.param(data);
		var url = PREFIX_HOST + '/index.php?c=form&a=design';
		$http.post(url, data, config).success(function(data){
				$location.path("form/tests/"+data.fid);
		});
	}
	$scope.create = function(){
		var config = {
    			headers : {
        			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    			}
		}
		var data = {"ftype":"1"};
		data = $.param(data);
		var url = PREFIX_HOST + '/index.php?c=form&a=design'
		$http.post(url, data, config).success(function(data){
				$location.path("form/blank/"+data.fid);
		});
		
	}
	$scope.myForm = function(){
		$location.path("form/myForm");
	}
	$scope.myTest = function(){
		$location.path("form/myTest");
	}
}]);
angular.module('preview',[]).controller('previewCtrl',['$scope','$location',function($scope,$location){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	$scope.formPreClose = function(){
		$scope.$dismiss();
	}
	var href = $location.url();
	var x = href.substring(6,11);
	if(x == "blank"){
		var fid = href.substr(12);
	}else{
		var formId_len = $('#formId').length;
		if(formId_len != 0){
			var fid = $('#formId').text();
		}else{
			var fid = $('#testId').text();
		}
	}
	$.ajax({
		type:'GET',
		url:PREFIX_HOST + '/index.php?c=form&a=preview&fid='+href.substr(12),
		success:function(data){
			var data = eval('('+data+')');
			for(i=0;i<data.list.length;i++){
				var htmls = "";
				if(data.list[i].type == 1){
					$('#preview_title').html(data.list[i].ipttitle);
				}else if(data.list[i].type == 3 || data.list[i].type == 4 || data.list[i].type == 6){
					for(a=0;a<data.list[i].info.length;a++){
						var html = '<div style="margin-top:2px"><div class="circle_pre"></div><div style="display:inline-block">'+data.list[i].info[a]+'</div></div>';
						htmls = htmls +　html;
					}
					$('.preview_opt:last').after('<div class="preview_opt"><div style="display:inline-block">'+data.list[i].sort+'.</div><div class="preview_title preview_left2" style="display:inline-block">'+data.list[i].ipttitle+'</div><div class="score_pre">（分值：'+data.list[i].score+'分）</div><div class="">'+htmls+'</div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:20px"></div>');
					if(data.list[i].type == 4){
						$('.preview_opt:last').find('.preview_title').after('<div style="color:red;display:inline-block">【多选题】</div>')
					}else if(data.list[i].type == 6){
						$('.preview_opt:last').find('.preview_title').after('<div style="color:red;display:inline-block">【投票】</div>')
					}
				}else{
					$('.preview_opt:last').after('<div class="preview_opt"><div style="display:inline-block">'+data.list[i].sort+'.</div><div class="preview_title preview_left2" style="display:inline-block">'+data.list[i].ipttitle+'</div><input class="input_pre" disabled="true"><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px"></div>');
				}
			}
		}
	})
}])
angular.module("questionnaire",["toBottom"]).controller("createForm", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "$stateParams","$modal","formService","$location","$state","$compile", function($rootScope, $http, $scope, $setTimeout, security, $window, $stateParams,$modal,formService,$location,$state,$compile) {
	if(document.documentElement.clientHeight < 920){
		$('#left').children('a').css({'height':'38px','padding-top':'7px'})
	}
	$('html, body').animate({scrollTop:0})
	var left_color = '';
	var href = window.location.hash;
	var formFid = href.substr(13,href.length);
	var testFid = href.substring(7,12);
	$scope.nocreateAttachment = function(){
		alert('问卷无连线功能，考卷可使用连线题功能');
		return false;
	}
	$scope.left = function($event){
		var left_len = $($event.target).closest('.edit_area').find('.attchment_left').eq(0).children('input').length;
		for(i=0;i<left_len;i++){
			$($event.target).closest('.edit_area').find('.attchment_left').eq(0).children('input').eq(i).css('border','1px solid #ccd5db');
		}
		$($event.target).css('border','1px solid #6c0');
	}
	$scope.right = function($event){
		var ifchose = $($event.target).parent().children('div').text();
		var leftLen = $($event.target).closest('.edit_area').find('.attchment_left').eq(0).children('input').length;
		var rightact = $($event.target).closest('.edit_area').find('.attchment_right').eq(0).children().children('div');
		if(ifchose != ''){
			for(w=0;w<leftLen;w++){
				var aaaaa = $($event.target).closest('.edit_area').find('.attchment_left').eq(0).children('input').eq(w).css('border-color');
				if(aaaaa == 'rgb(102, 204, 0)'){
					alert("已被选择！");
					return false;
				}
			}
		}
		for(ww=0;ww<leftLen;ww++){
			var aaaaa = $($event.target).closest('.edit_area').find('.attchment_left').eq(0).children('input').eq(ww).css('border-color');
			if(aaaaa == 'rgb(102, 204, 0)'){
				var leftClass = 'L'+ww;
				for(l=0;l<leftLen;l++){
					var lc = rightact.eq(l).text();
					if(lc == leftClass){
						alert("已被选择！");
						return false;
					}
				}
			}
		}
		var canvas_id = $($event.target).closest('.div_question').find('canvas').eq(1).attr('id');
		var id = '#'+ canvas_id;
		var c=document.getElementById(canvas_id);
		var cxt=c.getContext("2d");
		cxt.beginPath();
		var right_len = $($event.target).closest('.edit_area').find('.right').length;
		var right_top = $($event.target).offset().top;
		var canvas_top = $(id).offset().top;
		var right_left = $($event.target).offset().left;
		var canvas_left = $(id).offset().left;
		for(i=0;i<leftLen;i++){
			var color = $($event.target).closest('.edit_area').find('.attchment_left').eq(0).children('input').eq(i).css('border-color');
			if(color == 'rgb(102, 204, 0)'){
				var left_top = $($event.target).closest('.edit_area').find('.attchment_left').eq(0).children('input').eq(i).offset().top;
				var a = $($event.target).closest('.edit_area').find('.attchment_left').eq(0).children('input').eq(i).attr('class');
				a = a.substring(0,2);
				$($event.target).parent().find('div').eq(0).text(a)
			}
		};
		cxt.moveTo(153,parseInt(left_top-canvas_top+10));
		cxt.lineTo(parseInt(right_left-canvas_left),parseInt(right_top-canvas_top+10));
		cxt.stroke();
		cxt.closePath();
		for(l=0;l<leftLen;l++){
			$($event.target).closest('.edit_area').find('.attchment_left').eq(0).children('input').eq(l).css('border','1px solid rgb(204, 213, 219)');
		}

	};
	//连线题增加一项
	$scope.addAtm = function($event){
		var leftLen = $($event.target).closest('.edit_area').find('.attchment_left input').length;
		if(leftLen == 5){
			alert('连线题最多为5条');
			return false;
		}
		var rightLen = $($event.target).closest('.edit_area').find('.attchment_right').children('div').length;
		var html = '<input class="L'+leftLen+'" ng-click="left($event)">';
		var rightHtml = '<div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R'+rightLen+'" style="display:none"></div></div>';
		$($event.target).closest('.edit_area').find('.attchment_left input:last-child').after($compile(html)($scope));
		$($event.target).closest('.edit_area').find('.attchment_right').children('div:last').after($compile(rightHtml)($scope));
	}
	//连线题重置
	$scope.atmBack = function($event){
		var canvasId = $($event.target).closest('.edit_area').find('canvas').eq(0).attr('id');
		var c= document.getElementById(canvasId);
		var ctx=c.getContext("2d");
		ctx.clearRect(0,0,400,220);
		var rightLen = $($event.target).closest('.edit_area').find('.right').length;
		for(i=0;i<rightLen;i++){
			$($event.target).closest('.edit_area').find('.right').eq(i).parent().children('div').text('');
		}
	}
	$scope.conAtm = function($event){
		//判断连线题编辑有没有问题
		var timu_title = $($event.target).closest('.div_question').find('.atm_title').eq(0).val();
		var timu_score = $($event.target).closest('.div_question').find('.atm_score').eq(0).val();
		var leftLen = $($event.target).closest('.div_question').find('.attchment_left input').length;
		var rightLen = $($event.target).closest('.div_question').find('.attchment_right').children('div').length;
		for(q=0;q<leftLen;q++){
			var leftVal = $($event.target).closest('.div_question').find('.attchment_left input').eq(q).val();
			if(leftVal == ''){
				alert('编辑框左侧列表内容缺失');
				return false;
			}
		};
		for(j=0;j<rightLen;j++){
			var rightVal = $($event.target).closest('.div_question').find('.attchment_right').children('div').eq(j).children('input').eq(0).val();
			var hiddenRight = $($event.target).closest('.div_question').find('.attchment_right').children('div').eq(j).children('div').eq(0).text();
			if(rightVal == ''){
				alert('编辑框右侧列表内容缺失');
				return false;
			}else if(hiddenRight == ''){
				alert('连线有缺失，请连好每道题');
				return false;
			}
		}
		if(timu_title == ''){
			alert('题目未设置');
			return false;
		}else if(timu_score == ''){
			alert('分数未设置');
			return false;
		};
		var right_len = $($event.target).closest('.div_question').find('.right_div').length;
		if(timu_score%right_len != 0){
			alert('连线题分数除以题数不是整数，请修改连线题分数！');
			return false;
		}
		$($event.target).closest('.div_question').find('.form_score').eq(0).text(timu_score);
		$($event.target).closest('.div_question').find('.div_title_question').eq(0).text(timu_title);
		var atanswer = [];
		//正确答案
		for(i=0;i<right_len;i++){
			var left = $($event.target).closest('.div_question').find('.right_div').eq(i).find('div').eq(0).text();
			var right = $($event.target).closest('.div_question').find('.right_div').eq(i).find('div').eq(0).attr('class');
			var aw = left+right;
			atanswer.push(aw);
		}
		$($event.target).closest('.div_question').find('.form_info').eq(0).text(atanswer);
		$($event.target).closest('.edit_area').css('display','none');
		//完成编辑生成左边列表
		var edit_left_input = $($event.target).closest('.div_question').find('.attchment_left').eq(0).children('input');
		var mo_left = $($event.target).closest('.div_question').find('.left_jia').eq(0).children('input').length;
		var left_html = '';
		for(el=0;el<edit_left_input.length;el++){
			var classs = 'L'+el;
			var a = '<input disabled="disabled" class="'+classs+'" value="'+edit_left_input.eq(el).val()+'">';
			left_html = left_html+a;
		}
		$($event.target).closest('.div_question').find('.left_jia').eq(0).html($compile(left_html)($scope));
		//完成编辑生成右边列表
		var edit_right_input = $($event.target).closest('.div_question').find('.right_div input.right');
		var mo_right = $($event.target).closest('.div_question').find('.right_jia').eq(0).children('input').length;
		var right_html = '';
		for(er=0;er<edit_right_input.length;er++){
			var classs = 'R'+er;
			var a = '<input disabled="disabled" class="'+classs+'" value="'+edit_right_input.eq(er).val()+'">';
			right_html = right_html+a;
		}
		$($event.target).closest('.div_question').find('.right_jia').eq(0).html($compile(right_html)($scope));
		//完成编辑连线
		var canId = $($event.target).closest('.div_question').find('canvas').eq(0).attr('id');
		var canxt = document.getElementById(canId).getContext("2d");
		canxt.clearRect(0,0,400,170);
		// return false;
		var canvas0 = $($event.target).closest('.div_question').find('canvas').eq(0).attr('id');
		for(lx=0;lx<atanswer.length;lx++){
			var left = atanswer[lx].substring(1,2);
			var right = atanswer[lx].substr(-1);
			var inputWidth = $($event.target).closest('.div_question').find('.left_jia').eq(0).children('input').eq(0).css('width');
			var inputWidth = parseInt(inputWidth);
			var leftInputTop = $($event.target).closest('.div_question').find('.left_jia').eq(0).children('input').eq(left).offset().top;
			var rightInputTop = $($event.target).closest('.div_question').find('.right_jia').eq(0).children('input').eq(right).offset().top;
			var rightInputLeft = $($event.target).closest('.div_question').find('.right_jia').eq(0).children('input').eq(right).offset().left;
			var canvasLeft = $($event.target).closest('.div_question').find('canvas').eq(0).offset().left;
			var canvasTop = $($event.target).closest('.div_question').find('canvas').eq(0).offset().top;
			var c = document.getElementById(canvas0);
			var cxt=c.getContext("2d");
			cxt.beginPath();
			cxt.moveTo(parseInt(inputWidth),parseInt(leftInputTop-canvasTop+10));
			cxt.lineTo(parseInt(rightInputLeft-canvasLeft),parseInt(rightInputTop-canvasTop+10));
			cxt.stroke();
			cxt.closePath();
		}
	};
	//创建连线题
	$scope.createAttachment = function(){
		// alert('功能开发中，即将上线！');
		// return false;
		var div_len = $('.div_question').length;
		var this_sort = div_len + 1;//序号
		$.ajax({
			type:'POST',
			async:false,
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+formFid,
			data:{'sort':this_sort,ipttitle:'连线题目','type':'7'},
			success:function(data){
				var data = eval('('+data+')');
				var div_question_len = $('.div_question').length;
				var atm_id = 'myCanvas'+div_question_len;
				var a = 'canvas'+div_question_len;
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+(parseInt(div_question_len)+1)+'</div><div class="form_id">'+data.obj+'</div><div class="form_type">7</div><div class="form_score"></div><div class="form_info"></div><div class="div_title_question">连线题题目</div></div><div class="div_table_radio_question"><canvas id="'+a+'" width="400" height="220" style="position: absolute;">Your browser does not support the HTML5 canvas tag.</canvas><div class="left_jia" style="padding-left:0px;width:30%;display:inline-block;position:relative;"></div><div class="right_jia" style="width:30%;display: inline-block;position:relative;"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;"><div style="height:35px"><button class="dan_delete" ng-click="atm_delete($event)" style="display: none;"><span class=""></span>删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit" style="display: none;"><span class=""></span>编辑</button></div><div class="edit_area"><div class="col-md-8"><canvas id="'+atm_id+'" width="400" height="220" style="position: absolute;">Your browser does not support the HTML5 canvas tag.</canvas><div class="attchment_left col-md-6" style="padding-left:0px"><input class="L0" ng-click="left($event)"><input class="L1" ng-click="left($event)"><input class="L2" ng-click="left($event)"></div><div class="attchment_right col-md-6"><div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R0" style="display:none"></div></div><div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R1" style="display:none"></div></div><div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R2" style="display:none"></div></div></div><div class="col-md-12"><button class="attchmentbtn" ng-click="addAtm($event)" style="margin-left: -15px;">添加一项</button><button class="attchmentbtn" ng-click="atmBack($event)">重置</button></div></div><div class="col-md-4"><div class="col-md-12"><div style="height:26px;background-color:#6c0;color: #fff;padding-left: 8px;padding-top: 5px;">题目：</div><textarea class="atm_title" style="background-color:#fff;width: 100%;height: 88px;margin-bottom:10px"></textarea></div><div class="col-md-12"><div class="" style="width:28%;display:inline-block;height:26px;background-color:#6c0;color: #fff;padding-left: 8px;padding-top: 5px;">分数：</div><textarea class="atm_score" style="width:72%;background-color:#fff;height: 26px;display:inline-block;margin-bottom:3px"></textarea></div></div><div class="col-md-12"><button class="attchment_confirm" ng-click="conAtm($event)">完成编辑</button></div></div></div></div>';
				var div_question_len = $('.div_question').length;
				if(div_question_len == 0){
					$('#question').after($compile(html)($scope));
				}else{
					$('.div_question:last').after($compile(html)($scope));
				}
			}
		});
		var h = $(document).height()-$(window).height()-24;
  		$('html, body').animate({scrollTop:h},200)
	}
	$(document).scroll(function(){
		var leftTop = $('#formContent').css('height');
		$('#left').css({'margin-top':window.scrollY});
	})
	$scope.formType = 1;
	$scope.createTitle = function(a){
			var titleLen = $('#divId').length
			if(titleLen == 0){
				var modalInstance = $modal.open({
					windowClass: "console six-contain",
					templateUrl : BASE_URL + "templates/form/create_name.html",
					controller:"createNameCtrl",
					files:["controllers/formController"]
				});
			}else{
				alert('标题已创建，请点击标题进行修改');
				return;
			}
	}
	$scope.cancel = function(){
		var modalInstance = $modal.open({
			windowClass: "six-contain mobile-contain",
			templateUrl : BASE_URL + "templates/form/tishiForm.html",
			controller:"cancelWarmCtrl",
			files:["controllers/formController"]
		});
	}
	//创建判断题
	$scope.createJudge = function(returndata){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var length = $('#formContent').find('.div_question').length;
		var lengths = length+1;
		var arr = ["对","错",""];
		var answer = ['A','B'];
		var data = {'type':'9','ipttitle':'题目','info':arr,'sort':lengths}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+lengths+'</div><div class="form_id">'+data.obj+'</div><div class="form_type">9</div><div class="form_score"></div><div class="form_info"></div><div class="div_title_question">题目</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all"><div><div class="circle"></div><div style="display:none" class="judge_opt">A</div><p style="display:inline-block">对</p></div><div><div class="circle"></div><div style="display:none" class="judge_opt">B</div><p style="display:inline-block">错</p></div></div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;"><div style="height:35px"><button class="dan_delete" ng-click="dan_delete($event)" style="display: none;"><span class=""></span>删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit" style="display: none;"><span class=""></span>编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text">题目</textarea></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div><div class="cont_opt"><p style="color:#666;display:none" class="judge_opt">A</p><input disabled="disabled" type="text" value="对" class="select_dan"><div class="dan_suan ng-scope">1</div><button class="rightAnswer ng-scope" ng-click="rightAnswer($event)">设置为正确答案</button></div><div class="cont_opt"><p style="color:#666;display:none" class="judge_opt">B</p><input disabled="disabled" type="text" value="错" class="select_dan"><div class="dan_suan ng-scope">2</div><button class="rightAnswer ng-scope" ng-click="rightAnswer($event)">设置为正确答案</button></div><div class="score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><input class="edit_score"></div>	</div><div class="col-md-12 col-xs-12"><button class="confirm">完成编辑</button></div></div></div></div>';

				var html2 = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+lengths+'</div><div class="form_id">'+data.obj+'</div><div class="form_type">9</div><div class="form_score"></div><div class="form_info"></div><div class="div_title_question">题目</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all"><div><div class="circle"></div><div style="display:none" class="judge_opt">A</div><p style="display:inline-block">对</p></div><div><div class="circle"></div><div style="display:none" class="judge_opt">B</div><p style="display:inline-block">错</p></div></div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;"><div style="height:35px"><button class="dan_delete" ng-click="dan_delete($event)" style="display: none;"><span class=""></span>删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit" style="display: none;"><span class=""></span>编辑</button></div><div class="edit_area"><div class="p_title col-md-12"><p class="edit_title">标题</p><textarea class="edit_text">题目</textarea></div><div class="col-md-12 col-xs-12"><button class="confirm">完成编辑</button></div></div></div></div>'
				if(length == 0){
					if(returndata == 1){
						$('#question').after($compile(html2)($scope))
					}else{
						$('#question').after($compile(html)($scope))
					}
					var h = $(document).height()-$(window).height()-24;
					$('html, body').animate({scrollTop:h},200)
				}else{
					if(returndata == 1){
						$('.div_question:last').after($compile(html2)($scope))
					}else{
						$('.div_question:last').after($compile(html)($scope))
					}
					var h = $(document).height()-$(window).height()-24;
					$('html, body').animate({scrollTop:h},200)
				}
			}
		})
		formService.toBottom();
	}
	$scope.createForm = function(){
		$location.path('/form')
	}
	var getType = function(data){
		$scope.userType = data.obj.type;
	}
	$.ajax({
			type:'GET',
			url:PREFIX_HOST+"/index.php?c=user&a=check&time=1487571408261",
			async:false,
			success:function(data){
				getType(data);
			}
	});
	$scope.myForm = function(){
			return formService.myForm();
			// $state.go('/form',{}, {reload: true});
			// location.reload([true]);
	}
	$scope.myTest = function(){
		return formService.myTest();
	}
	//预览
	$scope.preview = function(){
		$.ajax({
			type:'GET',
			url:PREFIX_HOST + '/index.php?c=form&a=preview&fid='+formFid,
			success:function(data){
				var data = eval('('+data+')');
				if(data.code == 1001){
					alert('尚未保存发布，请先保存发布');
				}else if(data.code == 200){
					$modal.open({
						windowClass: "console ppt_console",
		                templateUrl: "/Public/eq/dist/templates/form/preview.html",
		                controller:"previewCtrl"
					})

				}
			}
		})
	}
	//删除选项
	$scope.dan_delete = function($event){
		$($event.target).parent().removeClass();
		var x = $($event.target).parent().parent().find('.cont_opt').length;
		for(i=0;i<x;i++){
			var sort = String.fromCharCode(65+i);
			var dd = i+1;
			var a = $($event.target).parent().parent().children('.cont_opt').eq(i).find('p').html(sort);
			$($event.target).parent().parent().children('.cont_opt').eq(i).find('.dan_suan').html(dd);
		}
		$($event.target).parent().remove();
	}
	//删除填空
	$scope.write_delete = function($event){
		var r = confirm("确定删除此题目？");
		if(r == true){
			var id = $($event.target).parent().parent().children().eq(0).children().eq(2).text();
			$.ajax({
				type:'POST',
				url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
				success:function(data){
					var data = eval('('+data+')');
				}
			});
			$($event.target).parent().parent().remove();
			formService.sort();
		}
	}
	//删除投票
	$scope.vote_delete = function($event){
		var r = confirm("确定删除此题目？");
		if(r == true){
			var id = $($event.target).parent().parent().children().eq(0).children().eq(2).text();
			$.ajax({
				type:'POST',
				url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
				success:function(data){
					var data = eval('('+data+')')
				}
			});
			$($event.target).parent().parent().remove();
			formService.sort();
		}
	}
	//删除问答选择
	$scope.delete = function($event){
		var r = confirm("确定删除此题目？");
		if(r == true){
			var id = $($event.target).parent().parent().find('.form_id').eq(0).text();
			$.ajax({
				type:'POST',
				url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
				success:function(data){
					var data = eval('('+data+')')
					if(data.code == 200){
						$($event.target).parent().parent().parent().remove();
					}
				},
				error:function(data){
					alert('系统出错')
				}
			});
			$($event.target).parent().parent().remove();
			formService.sort();
		}
	}
	//删除单选选项
	$scope.delete_opt = function($event){
		$($event.target).parent().removeClass();
		var x = $($event.target).parent().parent().find('.cont_opt').length;
		for(i=0;i<x;i++){
			var sort = String.fromCharCode(65+i);
			var dd = i+1;
			var a = $($event.target).parent().parent().children('.cont_opt').eq(i).find('p').html(sort);
			$($event.target).parent().parent().children('.cont_opt').eq(i).find('.dan_suan').html(dd);
		}
		$($event.target).parent().remove();
	}
	$('body').on('click','.free_confirm',function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var name = $(this).parent().parent().find('.write_title').eq(0).val();
		var id = $(this).parent().parent().find('.form_id').eq(0).text();
		var data = {'type':'16','ipttitle':name}
		// $.ajax({
		// 	type:'POST',
		// 	url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
		// 	data:data,
		// 	success:function(data){
		// 		var data = eval('('+data+')');
		// 		//console.log(data);
		// 	}
		// });
		$(this).parent().parent().parent().children().children().eq(1).html(name);
		$(this).parent().parent().css('display','none')
	});
	$scope.name_delete = function($event){
		var r = confirm("确定删除此题目？");
		if(r == true){
			var id = $($event.target).parent().parent().find('.edit_area').children().eq(2).text();
			$.ajax({
				type:'POST',
				url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
				success:function(data){
					var data = eval('('+data+')');
				},
				error:function(data){
					alert('系统出错');
				}
			});
			$($event.target).parent().parent().remove();
			formService.sort();
		}else if(r == false){
			return false;
		}
	}
	//新增选项-新
	$scope.asd = function($event){
			var i = $($event.target).parent().find('.cont_opt').length;
			var dd = i+1;
			var sort = String.fromCharCode(65+i)
			var len = $($event.target).parent().find('.rightAnswer').length;
			if(len != 0){
				var html = "<div class=\"cont_opt\"><p>"+sort+"</p>.<input type=\"text\" class=\"select_dan\"><button class='delete_opt' ng-click=\"delete_opt($event)\">删除</button><div class=\"dan_suan\">"+dd+"</div><button class=\"rightAnswer\" ng-click=\"rightAnswer($event)\">设置为正确答案</button></div>"
				$($event.target).parent().find('.cont_opt:last').after($compile(html)($scope));
			}else{
				var href = window.location.hash;
				var x = href.substring(7,12);
				if(x == "blank"){
					var html= "<div class=\"cont_opt\"><p>"+sort+"</p>.<input type=\"text\" class=\"select_dan\"><button class='delete_opt' ng-click=\"delete_opt($event)\">删除</button><div class=\"dan_suan\">"+dd+"</div></div>"
					$($event.target).parent().find('.cont_opt:last').after($compile(html)($scope));
				}else{
					var html = "<div class=\"cont_opt\"><p>"+sort+"</p>.<input type=\"text\" class=\"select_dan\"><button class='delete_opt' ng-click=\"delete_opt($event)\">删除</button><div class=\"dan_suan\">"+dd+"</div><button class=\"duoAnswer\" ng-click=\"duoAnswer($event)\">设置为正确答案</button></div>"
					$($event.target).parent().find('.cont_opt:last').after($compile(html)($scope));
				}
				
			}
		}
	$.ajax({
		type:'GET',
		url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+ formFid,
		success:function(data){
			var data = eval('('+data+')');
			if(data.list != 0){
				for(y=0;y<data.list.length;y++){
						if(data.list[y].type == 1){
							var form_title_id = data.list[y].id;
							var form_title_type = data.list[y].type;
							var form_title_sort = data.list[y].sort;
							var form_title_desc = data.list[y].iptval;
							var form_title_title = data.list[y].ipttitle;
							$('#question').html("<div id=\"divId\"><h1 id=\"pater_title\" style=\"color:#f53d05\">"+form_title_title+"</h1><div id=\"pater_desc\"></div><hr style=\"height:1px;border:none;border-top:1px dashed #c1c1c1;margin-bottom:0px\" /><div class=\"form_id\">"+form_title_id+"</div><div class=\"form_type\">1</div></div>");
								document.getElementById('divId').addEventListener('mouseover',function(){
								$('#question').css('border','1px solid #f53d05');
								$('#question').css('cursor','Pointer');
							})
									document.getElementById('divId').addEventListener('click',function(){
								var modalInstance = $modal.open({
									windowClass: "console six-contain",
									templateUrl : BASE_URL + "templates/form/create_name.html",
									controller:"createNameCtrl2",
									files:["controllers/formController"],

								})
							})
									document.getElementById('divId').addEventListener('mouseout',function(){
								$('#question').css('border','1px solid #fff');
								$('#question').css('cursor','');
							})
						}
						if(data.list[y].type == 2){
							$('#pater_desc').html(data.list[y].ipttitle);
							$('#pater_desc').after('<p style="display:none">'+data.list[y].id+'</p>');
						}
						if(data.list[y].type == 3 || data.list[y].type == 4){
						var form_dan_id = data.list[y].id;
						var form_dan_type = data.list[y].type;
						var form_dan_sort = data.list[y].sort;
						var form_dan_title = data.list[y].ipttitle;
						var form_dan_info = eval('('+data.list[y].info+')');
						var form_opt = []
						for(k=0;k<form_dan_info.length;k++){
							form_opt.push(form_dan_info[k].substr(2));
						}
						// form_dan_info = form_opt;
						var form_title_score = data.list[y].score;
						var htmls = "";
						var htmls2 = "";
						for(a=0;a<form_dan_info.length;a++){
							var html = '<div><div class="circle"></div><p style="display:inline-block">'+form_dan_info[a]+'</p></div>'
							var htmls = htmls+html;
						}
						var length = $('#formContent').find('.div_question').length;
						for(b=0;b<form_dan_info.length;b++){
							var sort = String.fromCharCode(65+b)
							var html2 = '<div class="cont_opt"><p>'+sort+'</p>.<input type="text" value="'+form_opt[b]+'" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div>'
							var htmls2 = htmls2 + html2;
						}
						if(data.list[y].type == 3){
							if(length == 0){
								var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_dan_sort+'</div><div class="form_id">'+form_dan_id+'</div><div class="form_type">3</div><div class="form_score">'+form_title_score+'</div><div class="form_info"></div><div class="div_title_question">'+form_dan_title+'</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all">'+htmls+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="dan_delete" ng-click="dan_delete($event)">删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text col">'+form_dan_title+'</textarea><div class="score"><p style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</p><input class="edit_score" value="'+form_title_score+'"></div></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div>'+htmls2+'<button class="add_opt" ng-click="asd($event)">添加选项</button></div><div class="col-md-12 col-xs-12"><button class="confirm">完成编辑</button></div></div></div></div>'
							$('div #question').after($compile(html)($scope));
							//刷新编辑第一道题
							if(testFid == 'tests'){
								var tihao = data.list[y].sort - 1;
								var str = eval('('+data.list[y].iptanswer+')');
								var a = $('.div_question').eq(tihao).find('.delete_opt').length;
									for(s=0;s<a;s++){
										var html = '<button class="rightAnswer" ng-click="rightAnswer($event)">设置为正确答案</button>'
										$('.div_question').eq(tihao).find('.delete_opt').eq(s).after($compile(html)($scope))
									};
								if(str != ""){
									// if(data.list[0].type == 1){
									// 	y = y - 1;
									// }
									var str2 = str[0].charCodeAt() - 65;//字母转换成数字
									$('.div_question').eq(tihao).find('.circle').eq(str2).html('<div class="selected"></div>');
									
									$('.div_question').eq(tihao).find('.form_info').html(str);
									$('.div_question').eq(tihao).find('.rightAnswer').eq(str2).css('color','#fff');
									$('.div_question').eq(tihao).find('.rightAnswer').eq(str2).css('background-color','#6c0');
									// if(data.list[0].type == 1){
									// 		y = y + 1;
									// }
								}
							}else{
								var tihao = data.list[y].sort - 1;
								$('.div_question').eq(tihao).find('.score').eq(0).remove()
							}
						}else{
							var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_dan_sort+'</div><div class="form_id">'+form_dan_id+'</div><div class="form_type">3</div><div class="form_score">'+form_title_score+'</div><div class="form_info"></div><div class="div_title_question">'+form_dan_title+'</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all">'+htmls+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="dan_delete" ng-click="dan_delete($event)">删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text col">'+form_dan_title+'</textarea><div class="score"><p style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</p><input class="edit_score" value="'+form_title_score+'"></div></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div>'+htmls2+'<button class="add_opt" ng-click="asd($event)">添加选项</button></div><div class="col-md-12 col-xs-12"><button class="confirm">完成编辑</button></div></div></div></div>'
								$('div .div_question:last').after($compile(html)($scope));
								if(testFid == 'tests'){
									var tihao = data.list[y].sort - 1;
									var str = eval('('+data.list[y].iptanswer+')');
									var a = $('.div_question').eq(tihao).find('.delete_opt').length;
										for(s=0;s<a;s++){
											var html = '<button class="rightAnswer" ng-click="rightAnswer($event)">设置为正确答案</button>'
											$('.div_question').eq(tihao).find('.delete_opt').eq(s).after($compile(html)($scope))
										}
									if(str != ""){
										// if(data.list[0].type == 1){
										// y = y - 1;
										// }
										$('.div_question').eq(tihao).children('.form_info').html(str)
										var str2 = str[0].charCodeAt() - 65;
										$('.div_question').eq(tihao).find('.circle').eq(str2).html('<div class="selected"></div>');
										
										$('.div_question').eq(tihao).find('.form_info').html(str);
										$('.div_question').eq(tihao).find('.rightAnswer').eq(str2).css('color','#fff');
										$('.div_question').eq(tihao).find('.rightAnswer').eq(str2).css('background-color','#6c0');
										// if(data.list[0].type == 1){
										// 		y = y + 1;
										// }
									}
									}else{
										var tihao = data.list[y].sort - 1;
										$('.div_question').eq(tihao).find('.score').eq(0).remove()
									}
							}
						}else if(data.list[y].type == 4){
							if(length == 0){
								var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_dan_sort+'</div><div class="form_id"">'+form_dan_id+'</div><div class="form_type">4</div><div class="form_score">'+form_title_score+'</div><div class="form_info"></div><div class="div_title_question">'+form_dan_title+'</div><div class="duo" style="display: inline-block;color: red;">【多选题】</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all">'+htmls+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="dan_delete" ng-click="dan_delete($event)">删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text">'+form_dan_title+'</textarea><div class="score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><input value="'+form_title_score+'" class="edit_score"></div></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div>'+htmls2+'<button class="add_opt" ng-click="asd($event)">添加选项</button></div><div class="col-md-12 col-xs-12"><button class="duo_confirm">完成编辑</button></div></div></div></div>'
							$('div #question').after($compile(html)($scope));
							if(testFid == 'tests'){
								var tihao = data.list[y].sort - 1;
								var duoInfo = eval('('+data.list[y].iptanswer+')');
								var info_len = duoInfo.length;
								var duo_list =  data.list[y]
								var htmls3 = "";
								var finfo = data;
								var a = $('.div_question').eq(tihao).find('.delete_opt').length;
								for(s=0;s<a;s++){
									var html = '<button class="duoAnswer" ng-click="duoAnswer($event)">设置为正确答案</button>'
									$('.div_question').eq(tihao).find('.delete_opt').eq(s).after($compile(html)($scope))
								};
								for(g=0;g<info_len;g++){
									var str_duo1 = eval('('+duo_list.iptanswer+')');
									var str_duo = str_duo1[g];
									var str_duo2 = str_duo.charCodeAt();
									var str_duo3 = str_duo2 -65;
									$('.div_question').eq(tihao).find('.circle').eq(str_duo3).html('<div class="selected"></div>');
									$('.div_question').eq(tihao).find('.duoAnswer').eq(str_duo3).css('color','#fff');
									$('.div_question').eq(tihao).find('.duoAnswer').eq(str_duo3).css('background-color','#6c0');
									var html4 = '<div class="form_info_dan">'+str_duo1[g]+'</div>';
									var htmls3 = htmls3 + html4;
								};
								$('.div_question').eq(tihao).find('.form_info').after(htmls3);
							}else{
								var tihao = data.list[y].sort - 1;
								$('.div_question').eq(tihao).find('.score').eq(0).remove()
								}
							}else{
								var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_dan_sort+'</div><div class="form_id"">'+form_dan_id+'</div><div class="form_type">4</div><div class="form_score">'+form_title_score+'</div><div class="form_info"></div><div class="div_title_question">'+form_dan_title+'</div><div class="duo" style="display: inline-block;color: red;">【多选题】</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all">'+htmls+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="dan_delete" ng-click="dan_delete($event)">删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text">'+form_dan_title+'</textarea><div class="score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><input value="'+form_title_score+'" class="edit_score"></div></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div>'+htmls2+'<button class="add_opt" ng-click="asd($event)">添加选项</button></div><div class="col-md-12 col-xs-12"><button class="duo_confirm">完成编辑</button></div></div></div></div>'
								$('div .div_question:last').after($compile(html)($scope));
								if(testFid == 'tests'){
									var tihao = data.list[y].sort - 1;
									var duoInfo = eval('('+data.list[y].iptanswer+')')
									var info_len = duoInfo.length;
									var duo_list =  data.list[y]
									var htmls3 = "";
									var finfo = data;
									var a = $('.div_question').eq(tihao).find('.delete_opt').length;
									for(s=0;s<a;s++){
										var html = '<button class="duoAnswer" ng-click="duoAnswer($event)">设置为正确答案</button>'
										$('.div_question').eq(tihao).find('.delete_opt').eq(s).after($compile(html)($scope))
									}
								}else{
									var tihao = data.list[y].sort - 1;
									$('.div_question').eq(tihao).find('.score').eq(0).remove()
								}
								for(g=0;g<info_len;g++){
									var str_duo1 = eval('('+duo_list.iptanswer+')');
									var str_duo = str_duo1[g];
									var str_duo2 = str_duo.charCodeAt();
									var str_duo3 = str_duo2 -65;
									$('.div_question').eq(tihao).find('.circle').eq(str_duo3).html('<div class="selected"></div>');
									$('.div_question').eq(tihao).find('.duoAnswer').eq(str_duo3).css('color','#fff');
									$('.div_question').eq(tihao).find('.duoAnswer').eq(str_duo3).css('background-color','#6c0');
									var html3 = '<div class="form_info_dan">'+str_duo1[g]+'</div>';
									var htmls3 = htmls3 + html3;
								};
								$('.div_question').eq(tihao).find('.form_info').after(htmls3);
							}
						}
					}else if(data.list[y].type == 5){
						var form_write_id = data.list[y].id;
						var form_write_sort = data.list[y].sort;
						var form_write_title  = data.list[y].ipttitle;
						var form_write_type = data.list[y].type;
						var form_write_score = data.list[y].score;
						var form_write_answers = eval('('+data.list[y].iptanswer+')')
						var form_write_answer = form_write_answers[0];
						var length = $('#formContent').find('.div_question').length;
						if(length == 0){
							if(testFid == "blank"){
								var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_write_sort+'</div><div class="div_title_question">'+form_write_title+'</div><div class="form_id">'+form_write_id+'</div><div class="form_type">5</div><div class="form_score">'+form_write_score+'</div><div class="form_answer">'+form_write_answer+'</div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="write_delete" ng-click="write_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title edit_text">'+form_write_title+'</textarea></div><div class="col-md-12"><button class="write_confirm">完成编辑</button></div></div></div>'
								$('div #question').after($compile(html)($scope));
							}else{
								var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_write_sort+'</div><div class="div_title_question">'+form_write_title+'</div><div class="form_id">'+form_write_id+'</div><div class="form_type">5</div><div class="form_score">'+form_write_score+'</div><div class="form_answer">'+form_write_answer+'</div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="write_delete" ng-click="write_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-5"><p class="edit_title">题目标题</p><textarea class="write_title edit_text">'+form_write_title+'</textarea><div><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><textarea class="write_score">'+form_write_score+'</textarea></div></div><div class="col-md-7"><div class="edit_opt">题目答案</div><textarea class="write_answer">'+form_write_answer+'</textarea></div><div class="col-md-12"><button class="write_confirm">完成编辑</button></div></div></div>'
								$('div #question').after($compile(html)($scope));
							}
						}else{
							if(testFid == "blank"){
								var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_write_sort+'</div><div class="div_title_question">'+form_write_title+'</div><div class="form_id">'+form_write_id+'</div><div class="form_type">5</div><div class="form_score">'+form_write_score+'</div><div class="form_answer">'+form_write_answer+'</div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="write_delete" ng-click="write_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title edit_text">'+form_write_title+'</textarea></div><div class="col-md-12"><button class="write_confirm">完成编辑</button></div></div></div>'
								$('div .div_question:last').after($compile(html)($scope))
							}else{
								var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_write_sort+'</div><div class="div_title_question">'+form_write_title+'</div><div class="form_id">'+form_write_id+'</div><div class="form_type">5</div><div class="form_score">'+form_write_score+'</div><div class="form_answer">'+form_write_answer+'</div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="write_delete" ng-click="write_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-5"><p class="edit_title">题目标题</p><textarea class="write_title edit_text">'+form_write_title+'</textarea><div><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><textarea class="write_score">'+form_write_score+'</textarea></div></div><div class="col-md-7"><div class="edit_opt">题目答案</div><textarea class="write_answer">'+form_write_answer+'</textarea></div><div class="col-md-12"><button class="write_confirm">完成编辑</button></div></div></div>'
								$('div .div_question:last').after($compile(html)($scope))
							}
						}
						
					}else if(data.list[y].type == 6 || data.list[y].type == 17){
						var form_vote_id = data.list[y].id;
						var form_vote_sort = data.list[y].sort;
						var form_vote_type = data.list[y].type;
						var form_vote_title = data.list[y].ipttitle;
						var form_vote_info = eval('('+data.list[y].info+')');
						var htmls = "";
						var htmls2 = "";
						for(a=0;a<form_vote_info.length;a++){
							// var a = form_vote_info[a];
							// var a = a.substr(2)
							var html = '<div><div class="circle"></div><p style="display:inline-block">'+form_vote_info[a]+'</p></div>'
							var htmls = htmls+html;
						}
						for(aa=0;aa<form_vote_info.length;aa++){
							var vote_sort = String.fromCharCode(65+aa)
							var html2 = '<div class="cont_opt"><P>'+vote_sort+'.</P><input type="text" value="'+ form_vote_info[aa].substr(2) +'" class="vote_select"><button class="vote_delete_opt">删除</button></div>'
							var htmls2 = htmls2+html2;
						}
						var length = $('#formContent').find('.div_question').length;
						if(length == 0){
							var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_vote_sort+'</div><div class="div_title_question">'+form_vote_title+'</div><div class="form_id">'+form_vote_id+'</div><div class="form_type">'+data.list[y].type+'</div></div><div class="div_table_clear_top"></div><div class="opt_all">'+htmls+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="vote_delete" ng-click="vote_delete($event)">删除</button><button class="vote_cancelEdit">取消</button><button class="vote_edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-5"><p class="edit_title">题目标题</p><textarea class="edit_text">投票（投票）</textarea></div><div class="p_cont col-md-7"><div><div class="edit_opt">选项文字</div></div>'+htmls2+'</div><div class="col-md-offset-7"><button class="vote_add_opt">添加选项</button></div><div class="col-md-12"><button class="vote_confirm">完成编辑</button></div></div></div>'
						$('div #question').after($compile(html)($scope))
					}else{
						var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_vote_sort+'</div><div class="div_title_question">'+form_vote_title+'</div><div class="form_id">'+form_vote_id+'</div><div class="form_type">'+data.list[y].type+'</div></div><div class="div_table_clear_top"></div><div class="opt_all">'+htmls+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="vote_delete" ng-click="vote_delete($event)">删除</button><button class="vote_cancelEdit">取消</button><button class="vote_edit">编辑</button></div><div class="edit_area" style="display:none"><div class="p_title col-md-5"><p class="edit_title">题目标题</p><textarea class="edit_text">投票（投票）</textarea></div><div class="p_cont col-md-7"><div><div class="edit_opt">选项文字</div></div>'+htmls2+'</div><div class="col-md-offset-7"><button class="vote_add_opt">添加选项</button></div><div class="col-md-12"><button class="vote_confirm">完成编辑</button></div></div></div>'
						$('div .div_question:last').after($compile(html)($scope))
					}

					}else if(data.list[y].type == 7){
						var a = data.list[y].info;
						var a = eval('('+a+')');
						var leftData = a.left;
						var rightData = a.right;
						if(leftData != null && rightData != null){
							leftData = leftData.replace(/&quot;/g,"\"");
							rightData = rightData.replace(/&quot;/g,"\"");
							leftObj = eval('('+leftData+')');
							rightObj = eval('('+rightData+')');
							var leftDataLen = leftObj.length;
							var rightDataLen = rightObj.length;
							var pro = [];
							var rightPro = [];
							var htmls = '';
							var rightHtmls = '';
							var editHtmls = '';
							//获取左边列表
							for(var key in leftObj){
								var proName = 'L'+key;
								pro.push(proName);
								var html = '<input disabled="disabled" class="'+proName+'" value="'+leftObj[key][proName]+'">';
								var htmls = htmls + html;
							};
							//获取右边列表
							for(var key in rightObj){
								var proName = 'R'+key;
								pro.push(proName);
								var html = '<input disabled="disabled" class="'+proName+'" value="'+rightObj[key][proName]+'">';
								var editHtml = '<div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="'+proName+'" style="display:none"></div></div>'
								var rightHtmls = rightHtmls + html;
								var editHtmls = editHtmls +editHtml;
							};
							var length = $('#formContent').find('.div_question').length;
							var html ='<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[y].sort+'</div><div class="form_id">'+data.list[y].id+'</div><div class="form_type">'+data.list[y].type+'</div><div class="form_score">'+data.list[y].score+'</div><div class="form_info">'+data.list[y].iptanswer+'</div><div class="div_title_question">'+data.list[y].ipttitle+'</div></div><div class="div_table_radio_question"><canvas id="canvas'+length+'" width="400" height="220" style="position: absolute;">Your browser does not support the HTML5 canvas tag.</canvas><div class="left_jia" style="padding-left:0px;width:30%;display:inline-block;position:relative;">'+htmls+'</div><div class="right_jia" style="width:30%;display: inline-block;position:relative;">'+rightHtmls+'</div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;"><div style="height:35px"><button class="dan_delete" ng-click="atm_delete($event)" style="display: none;"><span class=""></span>删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit" style="display: none;"><span class=""></span>编辑</button></div><div class="edit_area" style="display:none"><div class="col-md-8"><canvas id="myCanvas'+(length)+'" width="400" height="170" style="position: absolute;">Your browser does not support the HTML5 canvas tag.</canvas><div class="attchment_left col-md-6" style="padding-left:0px"><input class="L0" ng-click="left($event)"><input class="L1" ng-click="left($event)"><input class="L2" ng-click="left($event)"></div><div class="attchment_right col-md-6"><div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R0" style="display:none"></div></div><div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R1" style="display:none"></div></div><div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R2" style="display:none"></div></div></div><div class="col-md-12"><button class="attchmentbtn" ng-click="addAtm($event)">添加一项</button><button class="attchmentbtn" ng-click="atmBack($event)">重置</button></div></div><div class="col-md-4"><div class="col-md-12"><div style="height:26px;background-color:#6c0;color: #fff;padding-left: 8px;padding-top:5px;">题目：</div><textarea class="atm_title" style="background-color:#fff;width: 100%;height: 88px;margin-bottom:10px">'+data.list[y].ipttitle+'</textarea></div><div class="col-md-12"><div class="" style="width:28%;display:inline-block;height:26px;background-color:#6c0;color: #fff;padding-left: 8px;padding-top: 5px;">分数：</div><textarea class="atm_score" style="width:72%;background-color:#fff;height: 26px;display:inline-block;margin-bottom:3px">'+data.list[y].score+'</textarea></div></div><div class="col-md-12"><button class="attchment_confirm" ng-click="conAtm($event)">完成编辑</button></div></div></div></div>';
							if(length == 0){
								$('div #question').after($compile(html)($scope));
							}else{
								$('div .div_question:last').after($compile(html)($scope));
							};
							var canvasId = $('.div_question:last').find('canvas').eq(0).attr('id');
							var canvasLeft = $('.div_question:last').find('#'+canvasId).offset().left;
							var canvasTop = $('.div_question:last').find('#'+canvasId).offset().top;
							var inputWidth = $('.div_question:last').find('.left_jia').eq(0).children('input').css('width');
							inputWidth = parseInt(inputWidth);
							var iptanswer = eval('('+data.list[y].iptanswer+')');
							var c = document.getElementById(canvasId);
							var cxt = c.getContext('2d');
							cxt.beginPath();
							for(h=0;h<iptanswer.length;h++){
								var leftClass = iptanswer[h];
								var rightClass = leftClass.substr(2);
								leftClass = leftClass.substring(0,2);
								var leftClass = $('.div_question:last').find('.'+leftClass).eq(0);
								var rightClass = $('.div_question:last').find('.'+rightClass).eq(0);
								var leftLeft = leftClass.offset().left;
								var leftTop = leftClass.offset().top;
								var rightLeft = rightClass.offset().left;
								var rightTop = rightClass.offset().top;
								cxt.moveTo(parseInt(inputWidth),parseInt(leftTop-canvasTop+10));
								cxt.lineTo(parseInt(rightLeft-canvasLeft),parseInt(rightTop-canvasTop+10));
								cxt.stroke();
							}
						}else{
							var length = $('#formContent').find('.div_question').length;
							var html ='<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[y].sort+'</div><div class="form_id">'+data.list[y].id+'</div><div class="form_type">'+data.list[y].type+'</div><div class="form_score"></div><div class="form_info"></div><div class="div_title_question">连线题</div></div><div class="div_table_radio_question"><canvas id="canvas'+length+'" width="400" height="170" style="position: absolute;">Your browser does not support the HTML5 canvas tag.</canvas><div class="left_jia" style="padding-left:0px;width:30%;display:inline-block;position:relative;"></div><div class="right_jia" style="width:30%;display: inline-block;position:relative;"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;"><div style="height:35px"><button class="dan_delete" ng-click="atm_delete($event)" style="display: none;"><span class=""></span>删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit" style="display: none;"><span class=""></span>编辑</button></div><div class="edit_area" style="display:none"><div class="col-md-8"><canvas id="myCanvas'+(length)+'" width="400" height="170" style="position: absolute;">Your browser does not support the HTML5 canvas tag.</canvas><div class="attchment_left col-md-6" style="padding-left:0px"><input class="L0" ng-click="left($event)"><input class="L1" ng-click="left($event)"><input class="L2" ng-click="left($event)"></div><div class="attchment_right col-md-6"><div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R0" style="display:none"></div></div><div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R1" style="display:none"></div></div><div style="display: inline-block;" class="right_div"><input class="right" ng-click="right($event)"><div class="R2" style="display:none"></div></div></div><div class="col-md-12"><button ng-click="addAtm($event)">添加一项</button><button ng-click="atmBack($event)">重置</button></div></div><div class="col-md-4"><div class="col-md-12"><div style="height:26px;background-color:#6c0">题目：</div><textarea class="atm_title" style="background-color:#fff;width: 100%;height: 30px;"></textarea></div><div class="col-md-12"><div style="height:26px;background-color:#6c0">分数：</div><textarea class="atm_score" style="background-color:#fff;width: 100%;height: 80px;"></textarea></div></div><div class="col-md-12"><button class="attchment_confirm" ng-click="conAtm($event)">完成编辑</button></div></div></div></div>';
							if(length == 0){
								$('div #question').after($compile(html)($scope));
							}else{
								$('div .div_question:last').after($compile(html)($scope));
							}
						};
						var iptanswer = eval('('+data.list[y].iptanswer+')');
						for(m=0;m<iptanswer.length;m++){
							var leftClass = iptanswer[m].substring(0,2);
							var rightClass = iptanswer[m].substr(2);
							var canvasId = $('.div_question:last').find('canvas').eq(0).attr('id');
							var canvasTop = $('.div_question:last').find('canvas').eq(0).offset().top;
							var canvasLeft =  $('.div_question:last').find('canvas').eq(0).offset().left;

						}
					}else if(data.list[y].type == 8){
						var form_ask_id = data.list[y].id;
						var form_ask_sort = data.list[y].sort;
						var form_ask_title = data.list[y].ipttitle;
						var form_ask_type = data.list[y].type;
						var form_ask_score = data.list[y].score;
						var length = $('#formContent').find('.div_question').length;
						if(length == 0){
							var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_ask_sort+'</div><div class="div_title_question">'+form_ask_title+'</div><div class="form_id">'+form_ask_id+'</div><div class="form_type">8</div><div class="form_score">'+form_ask_score+'</div><div class="form_answer"></div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="delete" ng-click="delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button><div class="ask_delete"></div></div><div class="edit_area" style="display:none"><div class="col-md-12"><div class="edit_title">题目标题</div><textarea class="write_title">'+form_ask_title+'</textarea></div><div class="col-md-12"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><textarea class="write_score">'+form_ask_score+'</textarea></div><div class="col-md-12"><button class="ask_confirm">确认</button></div></div></div>'
							$('div #question').after($compile(html)($scope))
						}else{
							var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_ask_sort+'</div><div class="div_title_question">'+form_ask_title+'</div><div class="form_id">'+form_ask_id+'</div><div class="form_type">8</div><div class="form_score">'+form_ask_score+'</div><div class="form_answer"></div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="delete" ng-click="delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button><div class="ask_delete"></div></div><div class="edit_area" style="display:none"><div class="col-md-12"><div class="edit_title">题目标题</div><textarea class="write_title">'+form_ask_title+'</textarea></div><div class="col-md-12"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><textarea class="write_score">'+form_ask_score+'</textarea></div><div class="col-md-12"><button class="ask_confirm">确认</button></div></div></div>'
							$('div .div_question:last').after($compile(html)($scope))
						}
					}else if(data.list[y].type == 9){
						var form_name_id = data.list[y].id;
						var form_name_type = data.list[y].type;
						var form_name_sort = data.list[y].sort;
						var form_name_title = data.list[y].ipttitle;
						var str = eval('('+data.list[y].iptanswer+')');
						if(testFid == 'tests'){
							if(str != ""){
								var str2 = str[0].charCodeAt(0) - 65;
							}
						}
						var length = $('#formContent').find('.div_question').length;
						var html = '<div class="div_question" style="border: 1px solid rgb(255, 255, 255); cursor: move;"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[y].sort+'</div><div class="form_id">'+data.list[y].id+'</div><div class="form_type">'+data.list[y].type+'</div><div class="form_score"></div><div class="form_info"></div><div class="div_title_question">'+data.list[y].ipttitle+'</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all"><div><div class="circle"></div><div style="display:none" class="judge_opt">A</div><p style="display:inline-block">对</p></div><div><div class="circle"></div><div style="display:none" class="judge_opt">B</div><p style="display:inline-block">错</p></div></div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;"><div style="height:35px"><button class="dan_delete" ng-click="dan_delete($event)" style="display: none;"><span class=""></span>删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit" style="display: none;"><span class=""></span>编辑</button></div><div class="edit_area"><div class="p_title col-md-12"><p class="edit_title">标题</p><textarea class="edit_text">'+data.list[y].ipttitle+'</textarea></div><div class="col-md-12 col-xs-12"><button class="confirm">完成编辑</button></div></div></div></div>'
						var html2 = '<div class="div_question" style="border: 1px solid rgb(255, 255, 255); cursor: move;"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[y].sort+'</div><div class="form_id">'+data.list[y].id+'</div><div class="form_type">'+data.list[y].type+'</div><div class="form_score">'+data.list[y].score+'</div><div class="form_info">'+str[0]+'</div><div class="div_title_question">'+data.list[y].ipttitle+'</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all"><div><div class="circle"></div><div style="display:none" class="judge_opt">A</div><p style="display:inline-block">对</p></div><div><div class="circle"></div><div style="display:none" class="judge_opt">B</div><p style="display:inline-block">错</p></div></div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;"><div style="height:35px"><button class="dan_delete" ng-click="dan_delete($event)" style="display: none;"><span class=""></span>删除</button><button class="cancel" style="display: none;"><span class=""></span>取消</button><button class="edit" style="display: none;"><span class=""></span>编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text">题目</textarea></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div><div class="cont_opt"><p style="color:#666;display:none" class="judge_opt">A</p><input disabled="disabled" type="text" value="对" class="select_dan"><div class="dan_suan ng-scope">1</div><button class="rightAnswer ng-scope" ng-click="rightAnswer($event)">设置为正确答案</button></div><div class="cont_opt"><p style="color:#666;display:none" class="judge_opt">B</p><input disabled="disabled" type="text" value="错" class="select_dan"><div class="dan_suan ng-scope">2</div><button class="rightAnswer ng-scope" ng-click="rightAnswer($event)">设置为正确答案</button></div><div class="score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><input value="'+data.list[y].score+'" class="edit_score"></div>	</div><div class="col-md-12 col-xs-12"><button class="confirm">完成编辑</button></div></div></div></div>'
						if(length==0){
							if(testFid == "blank"){
								$('div #question').after($compile(html)($scope));
							}else{
								$('div #question').after($compile(html2)($scope));
							}
						}else{
							if(testFid == 'blank'){
								$('div .div_question:last').after($compile(html)($scope));
							}else{
								$('div .div_question:last').after($compile(html2)($scope));
							}
						}
						if(testFid == 'tests'){
							$('div .div_question:last').find('.rightAnswer').eq(str2).css({'background-color':'#6c0','color':'#fff'})
						}
						
					}else if(data.list[y].type == 11 || data.list[y].type == 12 || data.list[y].type == 13 || data.list[y].type == 14 ||data.list[y].type == 15){
						var form_name_id = data.list[y].id;
						var form_name_type = data.list[y].type;
						var form_name_sort = data.list[y].sort;
						var form_name_title = data.list[y].ipttitle;
						var length = $('#formContent').find('.div_question').length;
						if(length==0){
							var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_name_sort+'</div><div class="div_title_question">'+form_name_title+'</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title"></textarea></div><div class="col-md-12"><button id="confirm_all" class="free_confirm">完成编辑</button></div><div class="form_id">'+form_name_id+'</div><div class="form_type">'+form_name_type+'</div></div></div>'
							$('div #question').after($compile(html)($scope))
						}else{
							var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_name_sort+'</div><div class="div_title_question">'+form_name_title+'</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title"></textarea></div><div class="col-md-12"><button id="confirm_all" class="free_confirm">完成编辑</button></div><div class="form_id">'+form_name_id+'</div><div class="form_type">'+form_name_type+'</div></div></div>'
							$('div .div_question:last').after($compile(html)($scope))
						}
					}else if(data.list[y].type == 16){
						var form_name_id = data.list[y].id;
						var form_name_type = data.list[y].type;
						var form_name_sort = data.list[y].sort;
						var form_name_title = data.list[y].ipttitle;
						var length = $('#formContent').find('.div_question').length;
						if(length==0){
							var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_name_sort+'</div><div class="div_title_question">'+form_name_title+'</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title"></textarea></div><div class="col-md-12"><button id="confirm_all" class="free_confirm">完成编辑</button></div><div class="form_id">'+form_name_id+'</div><div class="form_type">'+form_name_type+'</div></div></div>'
							$('div #question').after($compile(html)($scope))
						}else{
							var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+form_name_sort+'</div><div class="div_title_question">'+form_name_title+'</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title"></textarea></div><div class="col-md-12"><button id="confirm_all" class="free_confirm">完成编辑</button></div><div class="form_id">'+form_name_id+'</div><div class="form_type">'+form_name_type+'</div></div></div>'
							$('div .div_question:last').after($compile(html)($scope))
						}
					}
				};
				if(testFid == 'tests'){
					$('#pater_desc').after('<span id="total_score" style="display:none">'+data.score.total_score+'</span>')
					$('#pater_desc').after('<span id="pass_score" style="display:none">'+data.score.pass_grade+'</span>')
				}
			}
		}
	});
	$scope.closetitle = function(){
		$('.edit_exam_bg').eq(0).animate({'opacity':'0'},50);
		$('#titleSetWarm').animate({'opacity':'0'},50);
		$('.edit_exam_bg').eq(0).css({'display':'none'});
		$('#titleSetWarm').css({'display':'none'});
		$scope.createTitle();
		return false;
	}
	$scope.get = function(){
		var title = $('#divId').length;
		if(title == 0){
			$('.edit_exam_bg').eq(0).animate({'opacity':'0.6'},50);
			$('#titleSetWarm').animate({'opacity':'1'},50);
			$('.edit_exam_bg').eq(0).css({'display':'block'});
			$('#titleSetWarm').css({'display':'block'});
			return false
		}else{
			$scope.save();
			$scope.href = $location.url();
			$scope.fid = $scope.href.substr(12,$scope.href.length);
			$.ajax({
				type:'GET',
				url:PREFIX_HOST + '/index.php?c=form&a=publish&fid='+$scope.fid,
				success:function(data){
				}
			})
			$location.path("form/view/"+$scope.fid);
		}
	}
	$scope.save = function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var blankfid = href.substring(7,12)
		var arr = [];
		//type=9

		//type:1-2
		var form_title = $('#pater_title').text();
		var form_desc = $('#pater_desc').text();
		var title_id = $('#divId').find('.form_id').text();
		var title_type = $('#divId').find('.form_type').text();
		var desc_id = $('#divId p').text();
		var pass_score = $('#pass_score').text();
		var total_score = $('#total_score').text();
		if(form_title != ""){
			$.ajax({
				type:'POST',
				url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+title_id,
				data:{'type':'1','ipttitle':form_title},
				success:function(data){
				},
				error:function(data){
				}
			})
		}
		if(form_desc != ""){
			$.ajax({
				type:'POST',
				url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+desc_id,
				data:{'type':'2','ipttitle':form_desc},
				success:function(data){
				},
				error:function(data){
				}
			})
		}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:{'total_score':total_score,'pass':pass_score},
			success:function(data){
				var data = eval('('+data+')');
			}
		})
		//type:3-16,除了9
		var type_len = $('.div_question').length;
		for(i=0;i<type_len;i++){
			var type = $('.div_question').eq(i).find('.form_type').eq(0).text();
			if(type == 3){
				var opt_len = $('.div_question').eq(i).find('.del_all').children().length;
				var info = $('.div_question').eq(i).find('.form_info').length;//正确答案
				var arr = [];
				var arr2 = [];
				if(blankfid == "blank"){
					for(k=0;k<opt_len;k++){
						var opt = $('.div_question').eq(i).find('.del_all').children().eq(k).children().eq(1).text();
						arr.push(opt);
						var head = String.fromCharCode(65+k);
						arr2.push(head);
					}
				}else{
					var x = $('.div_question').eq(i).find('.form_info').eq(0).text();
					arr2.push(x);
					for(k=0;k<opt_len;k++){
						var opt = $('.div_question').eq(i).find('.del_all').children().eq(k).children().eq(1).text();
						arr.push(opt);
					}
				}
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var title_score = $('.div_question').eq(i).find('.form_score').text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var data = {'type':'3','ipttitle':title,'info':arr,'sort':sort,'iptanswer':arr2,'score':title_score}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 4){
				var opt_len = $('.div_question').eq(i).find('.del_all').children().length;
				var info = $('.div_question').eq(i).find('.form_info_dan').length;//正确答案
				var arr = [];
				var arr2 = [];
				if(info == 0){
					for(k=0;k<opt_len;k++){
						var opt = $('.div_question').eq(i).find('.del_all').children().eq(k).children().eq(1).text();
						arr.push(opt);
						var head = String.fromCharCode(65+k);
						arr2.push(head)
					}
				}else{
					var x = $('.div_question').eq(i).find('.form_info_dan').length;
					for(c=0;c<x;c++){
						var val = $('.div_question').eq(i).find('.form_info_dan').eq(c).text();
						arr2.push(val);
					}
					for(k=0;k<opt_len;k++){
						var opt = $('.div_question').eq(i).find('.del_all').children().eq(k).children().eq(1).text();
						arr.push(opt);
					}
				}
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var title_score = $('.div_question').eq(i).find('.form_score').text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var data = {'type':'4','ipttitle':title,'info':arr,'sort':sort,'iptanswer':arr2,'score':title_score}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
				
			}else if(type == 5){
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var title_score = $('.div_question').eq(i).find('.form_score').text();
				var title_answer = [];
				var tanswer = $('.div_question').eq(i).find('.form_answer').text();
				title_answer.push(tanswer);
				var data = {'type':'5','ipttitle':title,'sort':sort,'score':title_score,'iptanswer':title_answer};
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 6 || type == 17){
				var arr = [];
				var arr2 = [];
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var opt_len = $('.div_question').eq(i).find('.opt_all').children().length;
				for(k=0;k<opt_len;k++){
					var opt = $('.div_question').eq(i).find('.opt_all').children().eq(k).children().eq(1).text();
					arr.push(opt);
					var head = String.fromCharCode(65+k);
					arr2.push(head);
				}
				var data = {'type':type,'ipttitle':title,'info':arr,'sort':sort,'iptanswer':arr2}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 7){
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var id = $('.div_question').eq(i).find('.form_id').eq(0).text();
				var score = $('.div_question').eq(i).find('.form_score').text();
				var info = $('.div_question').eq(i).find('.form_info').text();
				var firstLetter = info.substring(0,1);
				var atmInfo = [];
				if(firstLetter == '['){
					info = eval('('+info+')');
					atmInfo = info;
				}else{
					var info = info.split(',');
					for(a=0;a<info.length;a++){
						atmInfo.push(info[a]);
					};
				}
				var leftData = [];
				var rightData = [];
				var leftData_len = $('.div_question').eq(i).find('.left_jia').eq(0).children('input').length;
				var rightData_len = $('.div_question').eq(i).find('.right_jia').eq(0).children('input').length;
				for(l=0;l<leftData_len;l++){
					var leftClass = $('.div_question').eq(i).find('.left_jia').eq(0).children('input').eq(l).attr('class');
					var a = $('.div_question').eq(i).find('.left_jia').eq(0).children('input').eq(l).val();
					leftClass = leftClass.substring(0,2);
					var data = "{"+leftClass+":"+a+"}";
					data = eval('('+data+')')
					leftData.push(data);
				};
				for(r=0;r<rightData_len;r++){
					var rightClass = $('.div_question').eq(i).find('.right_jia').eq(0).children('input').eq(r).attr('class');
					var b = $('.div_question').eq(i).find('.right_jia').eq(0).children('input').eq(r).val();
					rightClass = rightClass.substring(0,2);
					var data = "{"+rightClass+":"+b+"}";
					data = eval('('+data+')')
					rightData.push(data);
				};
				leftData = JSON.stringify(leftData);
				rightData = JSON.stringify(rightData);
				var allData = {"left":leftData,"right":rightData};
				var data = {'type':'7','sort':sort,'ipttitle':title,'score':score,'iptanswer':atmInfo,'info':allData};
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						var data = eval('('+data+')');
					}
				})
			}else if(type == 8){
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).html();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var title_score = $('.div_question').eq(i).find('.form_score').text();
				var title_answer = $('.div_question').eq(i).find('.form_answer').text();
				var data = {'type':'8','ipttitle':title,'sort':sort,'score':title_score}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 9){
				var opt_len = $('.div_question').eq(i).find('.del_all').children().length;
				var info = $('.div_question').eq(i).find('.form_info').length;//正确答案
				var arr = [];
				var arr2 = [];
				if(blankfid == "blank"){
					for(k=0;k<opt_len;k++){
						var opt = $('.div_question').eq(i).find('.del_all').children().eq(k).children().eq(1).text();
						arr.push(opt);
						var head = String.fromCharCode(65+k);
						arr2.push(head);
					}
				}else{
					var x = $('.div_question').eq(i).find('.form_info').eq(0).text();
					arr2.push(x);
					for(k=0;k<opt_len;k++){
						var opt = $('.div_question').eq(i).find('.del_all').children().eq(k).children().eq(1).text();
						arr.push(opt);
					}
				}
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var title_score = $('.div_question').eq(i).find('.form_score').text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var data = {'type':'9','ipttitle':title,'info':arr,'sort':sort,'iptanswer':arr2,'score':title_score}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 11){
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var data = {'type':'11','ipttitle':title,'sort':sort}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 12){
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var data = {'type':'12','ipttitle':title,'sort':sort}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 13){
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var data = {'type':'13','ipttitle':title,'sort':sort}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 14){
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var data = {'type':'14','ipttitle':title,'sort':sort}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 15){
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var data = {'type':'15','ipttitle':title,'sort':sort}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}else if(type == 16){
				var sort = $('.div_question').eq(i).find('.div_topic_question').eq(0).text();
				var title = $('.div_question').eq(i).find('.div_title_question').eq(0).text();
				var id= $('.div_question').eq(i).find('.form_id').eq(0).text();
				var data = {'type':'16','ipttitle':title,'sort':sort}
				$.ajax({
					type:'POST',
					url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
					data:data,
					success:function(data){
						//console.log('success')
					},
					error:function(data){
						//console.log('error')
					}
				})
			}
		}
		$('#saveSuccess').css({'display':'1','display':'block'});
		$('#saveSuccess').attr('class','saveSuccesss');
		setTimeout(function(){
			$('#saveSuccess').css({'display':'0','display':'none'});
			$('#saveSuccess').removeClass('saveSuccesss');
		},1000);
	}
	//创建自定义
	$scope.createText = function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var number = $('#formContent').find('.div_question').length+1;
		var data = {'type':'16','ipttitle':'自定义：','sort':number}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');
				a(data.obj);
			}
		});
		var a = function(id){
			var length = $('#formContent').find('.div_question').length;
			if(length==0){
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">自定义：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area"><div><p class="edit_title">题目标题</p><textarea class="write_title">自定义：</textarea></div><div><button class="free_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">16</div></div></div>'
				$('div #question').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}else{
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">自定义：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area"><div><p class="edit_title">题目标题</p><textarea class="write_title">自定义：</textarea></div><div><button class="free_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">16</div></div></div>'
				$('div .div_question:last').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}
		}
		formService.toBottom();
		
	}
	
	//创建员工编号
	$scope.createNumber = function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var number = $('#formContent').find('.div_question').length+1;
		var data = {'type':'15','ipttitle':'员工编号：','sort':number}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');
				a(data.obj);
			}
		});
		var a = function(id){
			var length = $('#formContent').find('.div_question').length;
			if(length==0){
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">员工编号：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">员工编号：</textarea></div><div class="col-md-12"><button class="number_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">15</div></div></div>'
				$('div #question').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}else{
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">员工编号：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">员工编号：</textarea></div><div class="col-md-12"><button class="number_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">15</div></div></div>'
				$('div .div_question:last').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}
		}
		formService.toBottom();
		
	}
	$('body').on('click','.number_confirm',function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var name = $(this).parent().parent().find('.write_title').eq(0).val();
		var id = $(this).parent().parent().find('.form_id').eq(0).text();
		var data = {'type':'15','ipttitle':name}
		// $.ajax({
		// 	type:'POST',
		// 	url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
		// 	data:data,
		// 	success:function(data){
		// 		var data = eval('('+data+')');
		// 		//console.log(data);
		// 	}
		// });
		$(this).parent().parent().parent().children().children().eq(1).html(name);
		$(this).parent().parent().css('display','none')
	});
	// $('body').on('click','.name_delete',function(){
	// 	var r = confirm("确定删除此题目？");
	// 	if(r == true){
	// 	var id = $(this).parent().parent().find('.edit_area').children().eq(2).text();
	// 	$.ajax({
	// 		type:'POST',
	// 		url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
	// 		success:function(data){
	// 			var data = eval('('+data+')');
	// 			//console.log(data);
	// 		},
	// 		error:function(data){
	// 			alert('系统出错');
	// 		}
	// 	});
	// 	$(this).parent().parent().remove();
	// 	formService.sort();
	// 	}else if(r == false){
	// 		return false;
	// 	}
	// })
	//创建邮箱
	$scope.createEmail = function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var number = $('#formContent').find('.div_question').length+1;
		var data = {'type':'14','ipttitle':'邮箱：','sort':number}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');
				a(data.obj);
			}
		});
		var a = function(id){
			var length = $('#formContent').find('.div_question').length;
			if(length==0){
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">邮箱：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">邮箱：</textarea></div><div class="col-md-12"><button class="email_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">14</div></div></div>'
				$('div #question').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}else{
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">邮箱：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">邮箱：</textarea></div><div class="col-md-12"><button class="email_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">14</div></div></div>'
				$('div .div_question:last').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}
		}
		formService.toBottom();
	}
	$('body').on('click','.email_confirm',function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var name = $(this).parent().parent().find('.write_title').eq(0).val();
		var id = $(this).parent().parent().find('.form_id').eq(0).text();
		var data = {'type':'14','ipttitle':name}
		// $.ajax({
		// 	type:'POST',
		// 	url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
		// 	data:data,
		// 	success:function(data){
		// 		var data = eval('('+data+')');
		// 		//console.log(data);
		// 	}
		// });
		$(this).parent().parent().parent().children().children().eq(1).html(name);
		$(this).parent().parent().css('display','none')
	});
	//创建电话号码
	$scope.createMobile = function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var number = $('#formContent').find('.div_question').length+1;
		var data = {'type':'13','ipttitle':'电话号码：','sort':number}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');
				a(data.obj);
			}
		});
		var a = function(id){
			var length = $('#formContent').find('.div_question').length;
			if(length==0){
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">电话号码：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">电话号码：</textarea></div><div class="col-md-12"><button class="mobile_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">13</div></div></div>'
				$('div #question').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}else{
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">电话号码：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">电话号码：</textarea></div><div class="col-md-12"><button class="mobile_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">13</div></div></div>'
				$('div .div_question:last').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}
		}
		formService.toBottom();
	}
	$('body').on('click','.mobile_confirm',function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var name = $(this).parent().parent().find('.write_title').eq(0).val();
		var id = $(this).parent().parent().find('.form_id').eq(0).text();
		var data = {'type':'13','ipttitle':name}
		// $.ajax({
		// 	type:'POST',
		// 	url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
		// 	data:data,
		// 	success:function(data){
		// 		var data = eval('('+data+')');
		// 		//console.log(data);
		// 	}
		// });
		$(this).parent().parent().parent().children().children().eq(1).html(name);
		$(this).parent().parent().css('display','none')
	});
	// $('body').on('click','.name_delete',function(){
	// 	var r = confirm("确定删除此题目？");
	// 	if(r == true){
	// 		var id = $(this).parent().parent().find('.edit_area').children().eq(2).text();
	// 		$.ajax({
	// 			type:'POST',
	// 			url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
	// 			success:function(data){
	// 				var data = eval('('+data+')');
	// 				//console.log(data);
	// 			},
	// 			error:function(data){
	// 				alert('系统出错');
	// 			}
	// 		});
	// 		$(this).parent().parent().remove();
	// 		formService.sort();
	// 	}else if(r == false){
	// 		return false;
	// 	}
	// })
	//创建部门
	$scope.createDepartment = function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var number = $('#formContent').find('.div_question').length+1;
		var data = {'type':'12','ipttitle':'部门：','sort':number}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');

				a(data.obj);
			}
		});
		var a = function(id){
			var length = $('#formContent').find('.div_question').length;
			if(length==0){
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">部门：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">部门：</textarea></div><div class="col-md-12"><button class="depart_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">12</div></div></div>'
				$('div #question').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}else{
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">部门：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">部门：</textarea></div><div class="col-md-12"><button class="depart_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">12</div></div></div>'
				$('div .div_question:last').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}
		}
		formService.toBottom();
	}
	$('body').on('click','.depart_confirm',function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var name = $(this).parent().parent().find('.write_title').eq(0).val();
		var id = $(this).parent().parent().find('.form_id').eq(0).text();
		var data = {'type':'12','ipttitle':name}
		// $.ajax({
		// 	type:'POST',
		// 	url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
		// 	data:data,
		// 	success:function(data){
		// 		var data = eval('('+data+')');
		// 		//console.log(data);
		// 	}
		// });
		$(this).parent().parent().parent().children().children().eq(1).html(name);
		$(this).parent().parent().css('display','none')
	});
	//创建姓名
	$scope.createName = function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var number = $('#formContent').find('.div_question').length+1;
		var data = {'type':'11','ipttitle':'你的姓名：','sort':number}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');
				a(data.obj);
			}
		});
		var a = function(id){
			var length = $('#formContent').find('.div_question').length;
			if(length==0){
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">你的姓名：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">你的姓名：</textarea></div><div class="col-md-12"><button class="name_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">11</div></div></div>'
				$('div #question').after($compile(html)($scope))
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}else{
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">你的姓名：</div></div><div class="div_table_clear_top"></div><input class="form_name" disabled="true"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="name_delete" ng-click="name_delete($event)">删除</button></div><div class="edit_area" style="display:none"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">你的姓名：</textarea></div><div class="col-md-12"><button class="name_confirm">确认</button></div><div class="form_id">'+id+'</div><div class="form_type">11</div></div></div>'
				$('div .div_question:last').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}
		}
		formService.toBottom();
	}
	$('body').on('click','.name_confirm',function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var name = $(this).parent().parent().find('.write_title').eq(0).val();
		var id = $(this).parent().parent().find('.form_id').eq(0).text();
		var data = {'type':'11','ipttitle':name}
		// $.ajax({
		// 	type:'POST',
		// 	url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid+'&id='+id,
		// 	data:data,
		// 	success:function(data){
		// 		var data = eval('('+data+')');
		// 		//console.log(data);
		// 	}
		// });
		$(this).parent().parent().parent().children().children().eq(1).html(name);
		$(this).parent().parent().css('display','none')
	})
	// $('body').on('click','.name_delete',function(){
	// 	var r = confirm("确定删除此题目？");
	// 	if(r == true){
	// 		var id = $(this).parent().parent().find('.edit_area').children().eq(2).text();
	// 		$.ajax({
	// 			type:'POST',
	// 			url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
	// 			success:function(data){
	// 				var data = eval('('+data+')');
	// 				//console.log(data);
	// 			},
	// 			error:function(data){
	// 				alert('系统出错');
	// 			}
	// 		});
	// 		$(this).parent().parent().remove();
	// 		formService.sort();
	// 	}else if(r == false){
	// 		return false;
	// 	}
	// })
	//提交删除
	$('body').on('mouseover','.form_submit',function(){
		$(this).css('border','1px solid #f53d05')
		$(this).css('cursor','Pointer');
		$(this).find('.submit_del').css('display','block');
	});
	$('body').on('mouseout','.form_submit',function(){
		$(this).css('border','1px solid #fff');
		$(this).find('.submit_del').css('display','none');
	});
	$('body').on('click','.submit_del',function(){
		var id = $(this).parent().find('.form_id').eq(0).text();
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
			success:function(data){
				var data = eval('('+data+')');
			}
		});
		$(this).parent().remove();
	})
	//问答编辑
	$('body').on('click','.ask_confirm',function(){
		var title = $(this).parent().parent().children().eq(0).children().eq(1).val().replace(/\n|\r\n/g,"<br>");
		var wSrcoe = $(this).parent().parent().find('.write_score').val();
		$(this).parent().parent().parent().find('.form_score').html(wSrcoe);
		var data = {'type':'8','ipttitle':title,'score':wSrcoe};
		$(this).parent().parent().parent().children().children().eq(1).html(title);
		$(this).parent().parent().css('display','none');
	})
	
	//删除单选
	$scope.dan_delete = function($event){
		var r = confirm("确定删除此题目？");
		if(r == true){
			var id = $($event.target).parent().parent().parent().children().children().eq(1).text();
			$.ajax({
				type:'POST',
				url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
				success:function(data){
					var data = eval('('+data+')')
					if(data.code == 200){
						$($event.target).parent().parent().parent().remove();
					}
				},
				error:function(data){
					alert('系统出错')
				}
			});
			$($event.target).parent().parent().parent().remove();
			formService.sort();
		}
	}
	//删除连线
	$scope.atm_delete = function($event){
		var r = confirm("确定删除此题目？");
		if(r == true){
			var id = $($event.target).closest('.div_question').find('.form_id').eq(0).text();
			$.ajax({
				type:'POST',
				url:PREFIX_HOST + '/index.php?c=form&a=del_form&del_id='+id,
				success:function(data){
					var data = eval('('+data+')')
					if(data.code == 200){
						$($event.target).parent().parent().parent().remove();
					}
				},
				error:function(data){
					alert('系统出错')
				}
			});
			$($event.target).closest('.div_question').remove();
			formService.sort();
		}
	}
	//创建问答题
	$scope.createAsk = function(element){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var number = $('#formContent').find('.div_question').length+1;
		var data = {'type':'8','sort':number,'ipttitle':'问答题：'}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')')
				a(data.obj);
			}
		})
		var a = function(id){
			var length = $('#formContent').find('.div_question').length;
			if(length == 0){
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">问答题</div><div class="form_id">'+id+'</div><div class="form_type">8</div><div class="form_score"></div><div class="form_answer"></div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="delete" ng-click="delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button><div class="ask_delete"></div></div><div class="edit_area"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">问答题</textarea></div><div class="col-md-12 ask_score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><textarea class="write_score"></textarea></div><div class="col-md-12"><button class="ask_confirm">确认</button></div></div></div>'
				$('div #question').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
				if(element == 1){
					$('.div_question').find('.ask_score').css('display','none')
				}
			}else{
				var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">问答题</div><div class="form_id">'+id+'</div><div class="form_type">8</div><div class="form_score"></div><div class="form_answer"></div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="delete" ng-click="delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button><div class="ask_delete"></div></div><div class="edit_area"><div class="col-md-12"><p class="edit_title">题目标题</p><textarea class="write_title">问答题</textarea></div><div class="col-md-12 ask_score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><textarea class="write_score"></textarea></div><div class="col-md-12"><button class="ask_confirm">确认</button></div></div></div>'
				$('div .div_question:last').after($compile(html)($scope));
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
				if(element == 1){
					$('.div_question').find('.ask_score').css('display','none')
				}
			}
		}
		formService.toBottom();
	}
	//创建投票
	$scope.closeVote = function(){
		$('.edit_exam_bg').animate({'opacity':'0'},50);
		$('#edit_exam').animate({'opacity':'0'},50);
		$('.edit_exam_bg').css('display','none');
		$('#edit_exam').css('display','none');
	}
	$scope.voteSelect = function(type){
		$('.edit_exam_bg').animate({'opacity':'0'},50);
		$('#edit_exam').animate({'opacity':'0'},50);
		$('.edit_exam_bg').css('display','none');
		$('#edit_exam').css('display','none');
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var length = $('#formContent').find('.div_question').length;
		var number = length+1;
		var arr =['A','B','C','D','E'];
		var vote_opt = ["A.恒大集团","B.阿里巴巴","C.京东","D.苏宁易购","E.腾讯"];
		var html = "";
		var html2 = "";
		for(i=0;i<vote_opt.length;i++){
			var htmls = '<div><div class="circle"></div><div style="display:inline-block">'+vote_opt[i]+'</div></div>'
			html = html +htmls;
		}
			var data = {'type':type,'ipttitle':'投票','info':vote_opt,'sort':number,'iptanswer':arr};
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')')
				a(data.obj);
			}
		});
		var arr2 = ['A','B','C','D','E'];
		var vote_opt2 = ["恒大集团","阿里巴巴","京东","苏宁易购","腾讯"];
		for(i=0;i<vote_opt2.length;i++){
			var htmls2 = '<div class="cont_opt"><p>'+arr2[i]+'</p>.<input type="text" value="'+vote_opt2[i]+'" class="select_dan"><button class="vote_delete_opt">删除</button></div>'
			html2 = html2 +htmls2;
		}
		var a = function(id){
			if(length == 0){
				var htmll = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">投票（投票）</div><div class="form_id">'+id+'</div><div class="form_type">'+type+'</div></div><div class="div_table_clear_top"></div><div class="opt_all">'+html+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="vote_delete" ng-click="vote_delete($event)">删除</button><button class="vote_cancelEdit">取消</button><button class="vote_edit">编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">题目标题</p><textarea class="edit_text">投票（投票）</textarea></div><div class="p_cont col-md-7"><div><p class="edit_opt">选项文字</p></div>'+html2+'</div><div><button class="vote_add_opt col-md-offset-7">添加选项</button></div><div class="col-md-12"><button class="vote_confirm">完成编辑</button></div></div></div>'
			$('div #question').after($compile(htmll)($scope));
			var h = $(document).height()-$(window).height()-24;
			$('html, body').animate({scrollTop:h},200)
		}else{
			var htmll = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">投票（投票）</div><div class="form_id">'+id+'</div><div class="form_type">'+type+'</div></div><div class="div_table_clear_top"></div><div class="opt_all">'+html+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="vote_delete" ng-click="vote_delete($event)">删除</button><button class="vote_cancelEdit">取消</button><button class="vote_edit">编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">题目标题</p><textarea class="edit_text">投票（投票）</textarea></div><div class="p_cont col-md-7"><div><p class="edit_opt">选项文字</p></div>'+html2+'</div><div><button class="vote_add_opt col-md-offset-7">添加选项</button></div><div class="col-md-12"><button class="vote_confirm">完成编辑</button></div></div></div>'
			$('div .div_question:last').after($compile(htmll)($scope));
			var h = $(document).height()-$(window).height()-24;
			$('html, body').animate({scrollTop:h},200)
		}
		}
		formService.toBottom();
	}
	//创建投票
	$scope.createVote = function(){
		$('.edit_exam_bg').eq(0).css('display','block');
		$('#edit_exam').css('display','block');
		$('.edit_exam_bg').eq(0).animate({'opacity':'0.6'},50);
		$('#edit_exam').animate({'opacity':'1'},50);
		$('html, body').animate({scrollTop:0},200);
		// var href = window.location.hash;
		// var fid = href.substr(13,href.length);
		// var length = $('#formContent').find('.div_question').length;
		// var number = length+1;
		// var arr =['A','B','C','D','E'];
		// var vote_opt = ["A.恒大集团","B.阿里巴巴","C.京东","D.苏宁易购","E.腾讯"];
		// var html = "";
		// var html2 = "";
		// for(i=0;i<vote_opt.length;i++){
		// 	var htmls = '<div><div class="circle"></div><div style="display:inline-block">'+vote_opt[i]+'</div></div>'
		// 	html = html +htmls;
		// }
		// var data = {'type':'6','ipttitle':'投票','info':vote_opt,'sort':number,'iptanswer':arr}
		// $.ajax({
		// 	type:'POST',
		// 	url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
		// 	data:data,
		// 	success:function(data){
		// 		var data = eval('('+data+')')
		// 		a(data.obj);
		// 	}
		// });
		// var arr2 = ['A','B','C','D','E'];
		// var vote_opt2 = ["恒大集团","阿里巴巴","京东","苏宁易购","腾讯"];
		// for(i=0;i<vote_opt2.length;i++){
		// 	var htmls2 = '<div class="cont_opt"><p>'+arr2[i]+'</p>.<input type="text" value="'+vote_opt2[i]+'" class="select_dan"><button class="vote_delete_opt">删除</button></div>'
		// 	html2 = html2 +htmls2;
		// }
		// var a = function(id){
		// 	if(length == 0){
		// 		var htmll = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">投票（投票）</div><div class="form_id">'+id+'</div><div class="form_type">6</div></div><div class="div_table_clear_top"></div><div class="opt_all">'+html+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="vote_delete" ng-click="vote_delete($event)">删除</button><button class="vote_cancelEdit">取消</button><button class="vote_edit">编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">题目标题</p><textarea class="edit_text">投票（投票）</textarea></div><div class="p_cont col-md-7"><div><p class="edit_opt">选项文字</p></div>'+html2+'</div><div><button class="vote_add_opt col-md-offset-7">添加选项</button></div><div class="col-md-12"><button class="vote_confirm">完成编辑</button></div></div></div>'
		// 	$('div #question').after($compile(htmll)($scope))
		// }else{
		// 	var htmll = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">投票（投票）</div><div class="form_id">'+id+'</div><div class="form_type">6</div></div><div class="div_table_clear_top"></div><div class="opt_all">'+html+'</div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style="height:35px"><button class="vote_delete" ng-click="vote_delete($event)">删除</button><button class="vote_cancelEdit">取消</button><button class="vote_edit">编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">题目标题</p><textarea class="edit_text">投票（投票）</textarea></div><div class="p_cont col-md-7"><div><p class="edit_opt">选项文字</p></div>'+html2+'</div><div><button class="vote_add_opt col-md-offset-7">添加选项</button></div><div class="col-md-12"><button class="vote_confirm">完成编辑</button></div></div></div>'
		// 	$('div .div_question:last').after($compile(htmll)($scope))
		// }
		// }
		// formService.toBottom();
	}
	//投票编辑
	$('body').on('click','.vote_edit',function(){
		$(this).parent().parent().find('.edit_area').css('display','block');
	});
	//投票-确认
	$('body').on('click','.vote_confirm',function(){
		var title = $(this).parent().parent().children().eq(0).children().eq(1).val();
		var arr = [];
		var opt = $(this).parent().parent().find('.cont_opt').length;
		for(i=0;i<opt;i++){
			var sort = $(this).parent().parent().find('.cont_opt').eq(i).children().eq(0).text();
			var val = $(this).parent().parent().find('.cont_opt').eq(i).children().eq(1).val();
			var aa = sort + val
			arr.push(aa);
			var html = "<div><div class=\"circle\"></div><p style=\"display:inline-block\">"+arr[i]+"</p></div>";
			if(!htmls){
				var htmls = html;
			}else{
				var htmls = htmls+html;
			}
		};
		$(this).parent().parent().parent().find('.div_title_question').html(title);
		$(this).parent().parent().parent().children().eq(2).remove();
		$(this).parent().parent().parent().children().eq(1).after('<div class="opt_all">'+htmls+'</div>');
		$(this).parent().parent().css('display','none');
	});
	
	//删除投票选项
	$('body').on('click','.vote_delete_opt',function(){
		$(this).parent().removeClass();
		var i = $(this).parent().parent().find('.cont_opt').length;
		for(a=0;a<i;a++){
			var sort = String.fromCharCode(65+a);
			$(this).parent().parent().children('.cont_opt').eq(a).find('p').html(sort);
		}
		$(this).parent().remove();
	});
	//添加选项-投票
	$('body').on('click','.vote_add_opt',function(){
		var i = $(this).parent().parent().find('.cont_opt').length;
		var sort = String.fromCharCode(65+i)
		$(this).parent().parent().find('.cont_opt:last').after('<div class="cont_opt"><p>'+sort+'</p>.<input type="text" class="select_dan"><button class="vote_delete_opt">删除</button></div>');
	});
	//取消-投票
	$('body').on('click','.vote_cancelEdit',function(){
		$(this).parent().parent().find('.edit_area').css('display','none');
	})


	//编辑确认填空题目
	$('body').on('click','.write_confirm',function(){
		var score = $(this).parent().parent().find('.write_score').val();
		var answer = $(this).parent().parent().find('.write_answer').val();
		if(score == ""){
			alert('未填写该题目分数')
			return false;
		}else if(answer == ''){
			alert('未选择正确答案')
			return false;
		}
		$(this).parent().parent().parent().find('.form_score').html(score);
		$(this).parent().parent().parent().find('.form_answer').html(answer);
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var id = $(this).parent().parent().parent().children().children().eq(2).text();
		var title = $(this).parent().parent().children().eq(0).children().eq(1).val();
		$(this).parent().parent().parent().children().children().eq(1).html(title);
		$(this).parent().parent().css('display','none');
	})
	//创建填空题
	$scope.createWrite = function(element){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var number = $('#formContent').find('.div_question').length+1;
		var data = {'type':'5','ipttitle':'填空题','sort':number}
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');
				a(data.obj)
			}
		})
		var a = function(id){
			var length = $('#formContent').find('.div_question').length;
			if(length == 0){
				if(element == 1){
					var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">填空题</div><div class="form_id">'+id+'</div><div class="form_type">5</div><div class="form_score"></div><div class="form_answer"></div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="write_delete" ng-click="write_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area"><div class="col-md-12"><div class="edit_title">题目标题</div><textarea class="write_title edit_text">填空题</textarea></div><div class="col-md-12"><button class="write_confirm">完成编辑</button></div></div></div>'
					$('div #question').after($compile(html)($scope));
					var h = $(document).height()-$(window).height()-24;
					$('html, body').animate({scrollTop:h},200)
				}else{
					var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">填空题</div><div class="form_id">'+id+'</div><div class="form_type">5</div><div class="form_score"></div><div class="form_answer"></div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="write_delete" ng-click="write_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area"><div class="col-md-5"><div class="edit_title">题目标题</div><textarea class="write_title edit_text">填空题</textarea><div class="write_score_none"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><textarea class="write_score"></textarea></div></div><div class="col-md-7" id="edit_survey"><div class="edit_opt">题目答案</div><textarea class="write_answer"></textarea></div><div class="col-md-12"><button class="write_confirm">完成编辑</button></div></div></div>'
					$('div #question').after($compile(html)($scope));
					var h = $(document).height()-$(window).height()-24;
					$('html, body').animate({scrollTop:h},200)
				}
			}else{
				if(element == 1){
					var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">填空题</div><div class="form_id">'+id+'</div><div class="form_type">5</div><div class="form_score"></div><div class="form_answer"></div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="write_delete" ng-click="write_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area"><div class="col-md-12"><div class="edit_title">题目标题</div><textarea class="write_title edit_text">填空题</textarea></div><div class="col-md-12"><button class="write_confirm">完成编辑</button></div></div></div>'
					$('div .div_question:last').after($compile(html)($scope));
					var h = $(document).height()-$(window).height()-24;
					$('html, body').animate({scrollTop:h},200)
				}else{
					var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+number+'</div><div class="div_title_question">填空题</div><div class="form_id">'+id+'</div><div class="form_type">5</div><div class="form_score"></div><div class="form_answer"></div></div><div class="div_table_clear_top"></div><textarea class="write_area" disabled="true"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="write_delete" ng-click="write_delete($event)">删除</button><button class="cancelEdit">取消</button><button class="edit">编辑</button></div><div class="edit_area"><div class="col-md-5"><div class="edit_title">题目标题</div><textarea class="write_title edit_text">填空题</textarea><div class="write_score_none"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><textarea class="write_score"></textarea></div></div><div class="col-md-7"><div class="edit_opt">题目答案</div><textarea class="write_answer"></textarea></div><div class="col-md-12"><button class="write_confirm">完成编辑</button></div></div></div>'
					$('div .div_question:last').after($compile(html)($scope));
					var h = $(document).height()-$(window).height()-24;
					$('html, body').animate({scrollTop:h},200)
				}
			}
		}
		formService.toBottom();
	}
	
	//取消编辑
	$('body').on('click','.cancelEdit',function(){
		$(this).parent().parent().find('.edit_area').css('display','none');
	})
	//编辑完成确认-新
	$('body').on('click','.confirm',function(){
		var href = window.location.hash;
		var fid = href.substring(7,12);
		if(fid == "tests"){
			var radio_score = $(this).parent().parent().find('.edit_score').val();
			if(radio_score == ""){
				alert("未填写该题目分数");
				return false;
			}
			var radio_len = $(this).parent().parent().find('.rightAnswer').length;
			var col_green_len = 0;
			for(y=0;y<radio_len;y++){
				var radio_col = $(this).parent().parent().find('.rightAnswer').eq(y).css('background-color');
				if(radio_col == "rgb(102, 204, 0)"){
					col_green_len = col_green_len + 1;
				}
			}
			if(col_green_len == 0){
				alert("未选择正确答案");
				return false;
			}
		}
		//获取填写数据
		var arr = []
		var title = $(this).parent().parent().find('.p_title').children().eq(1).val();
		var optLen = $(this).parent().parent().find('.cont_opt').length;
		for(i=0;i<optLen;i++){
			var sort = $(this).parent().parent().find('.cont_opt').eq(i).children().eq(0).text();
			var val = $(this).parent().parent().find('.cont_opt').eq(i).children().eq(1).val();
			var opt = sort+'.'+val;
			arr.push(opt);
			var html = "<div><div class=\"circle\"></div><p style=\"display:inline-block\">"+arr[i]+"</p></div>";
			if(!htmls){
				var htmls = html;
			}else{
				var htmls = htmls+html;
			}
		}
		var score = $(this).parent().parent().find('.score').children().eq(1).val();
		$(this).parent().parent().parent().parent().find('.form_score').html(score);
		//修改题目和选项内容
		$(this).parent().parent().parent().parent().find('.div_title_question').eq(0).children().remove();
		$(this).parent().parent().parent().parent().find('.div_title_question').eq(0).html(title);
		var form_type = $(this).closest('.div_question').find('.form_type').text();
		if(form_type == 9){
			var circle_len = $(this).closest('.div_question').find('.circle').length;
			for(g=0;g<circle_len;g++){
				$(this).closest('.div_question').find('.circle').eq(g).children().remove();
			}
		}else{
			$(this).parent().parent().parent().parent().find('.del_all').remove(); 
			$(this).parent().parent().parent().parent().find('.div_table_clear_top').after("<div class=\"del_all\">"+htmls+"</div>");
		}
		$(this).parent().parent().parent().find('.edit_area').css('display','none');
		//选项
		var len = $(this).parent().parent().find('.rightAnswer').length;
		for(x=0;x<len;x++){
			var aa = $(this).parent().parent().find('.rightAnswer').eq(x).css('color');
			if(aa == 'rgb(255, 255, 255)'){
				$(this).parent().parent().parent().parent().find('.circle').eq(x).html('<div class="selected"></div>')
			}
		}
	})
	$('body').on('click','.duo_confirm',function(){
		var href = window.location.hash;
		var midden = href.substring(7,12);
		//console.log(midden);
		if(midden == "tests"){
			var editScore = $(this).parent().parent().find('.edit_score').eq(0).val();
			if(editScore == ""){
				alert("还没设置题目分数");
				return false;
			}
			var radio_len = $(this).parent().parent().find('.duoAnswer').length;
			var radio_gre_len = 0;
			for(y=0;y<radio_len;y++){
				var radio_col = $(this).parent().parent().find('.duoAnswer').eq(y).css('background-color');
				if(radio_col == "rgb(102, 204, 0)"){
					radio_gre_len = radio_gre_len + 1;
				}
			}
			if(radio_gre_len == 0){
				alert("未选择正确答案");
				return false;
			}
		}
		var score = $(this).parent().parent().find('.score').children().eq(1).val();
		$(this).parent().parent().parent().parent().find('.form_score').html(score);
		var arr = [];
		var title = $(this).parent().parent().find('.p_title').children().eq(1).val();
		var optLen = $(this).parent().parent().find('.cont_opt').length;
		for(i=0;i<optLen;i++){
			var sort = $(this).parent().parent().find('.cont_opt').eq(i).children().eq(0).text();
			var val = $(this).parent().parent().find('.cont_opt').eq(i).children().eq(1).val();
			var opt = sort+'.'+val;
			arr.push(opt);
			////console.log(arr,arr2)
			var html = "<div><div class=\"circle\"></div><p style=\"display:inline-block\">"+arr[i]+"</p></div>";
			if(!htmls){
				var htmls = html;
			}else{
				var htmls = htmls+html;
			}
		}
		//修改题目和选项内容
		$(this).parent().parent().parent().parent().find('.div_title_question').eq(0).children().remove();
		$(this).parent().parent().parent().parent().find('.div_title_question').eq(0).html(title);
		$(this).parent().parent().parent().parent().find('.del_all').remove(); 
		$(this).parent().parent().parent().parent().find('.div_table_clear_top').after("<div class=\"del_all\">"+htmls+"</div>");
		$(this).parent().parent().parent().find('.edit_area').css('display','none');
		//选项
		var len = $(this).parent().parent().find('.duoAnswer').length;
		for(x=0;x<len;x++){
			var aa = $(this).parent().parent().find('.duoAnswer').eq(x).css('color');
			if(aa == 'rgb(255, 255, 255)'){
				$(this).parent().parent().parent().parent().find('.circle').eq(x).html('<div class="selected"></div>');
			}
		}
	})
	
	//显示编辑框-新
	$('body').on('click','.edit',function(){
		$(this).parent().parent().find('.edit_area').css('display','block');
	})
	//边框变色-新
	$('body').on('mouseover','.div_question',function(){
		$(this).css('border','1px solid #fc741f');
		$(this).css('cursor','move');
		$(this).find('.addSelect').css('display','block');
		$(this).find('.edit').css('display','inline-block');
		$(this).find('.delete').css('display','inline-block');
		$(this).find('.dan_delete').css('display','inline-block');
		$(this).find('.cancelEdit').css('display','inline-block');
		$(this).find('.vote_cancelEdit').css('display','inline-block');
		$(this).find('.cancel').css('display','inline-block');
		$(this).find('.vote_edit').css('display','inline-block');
		$(this).find('.vote_delete').css('display','inline-block');
		$(this).find('.write_delete').css('display','inline-block');
		$(this).find('.name_delete').css('display','inline-block');
	});
	$('body').on('mouseout','.div_question',function(){
		$(this).css('border','1px solid #fff');
		$(this).find('.addSelect').css('display','none');
		$(this).find('.edit').css('display','none');
		$(this).find('.delete').css('display','none');
		$(this).find('.dan_delete').css('display','none');
		$(this).find('.cancel').css('display','none');
		$(this).find('.vote_edit').css('display','none');
		$(this).find('.vote_delete').css('display','none');
		$(this).find('.write_delete').css('display','none');
		$(this).find('.name_delete').css('display','none');
		$(this).find('.cancelEdit').css('display','none');
		$(this).find('.vote_cancelEdit').css('display','none');
	});
	//拖拽
	$(function() {
    $( "#formContent" ).sortable({
    	cursor: "move",
        opacity: 0.6, 
        //revert: true, 
    	update:function(event,ui){
    		var number = $('#formContent').find('.div_question').length;
    		for(i=0;i<number;i++){
    			var sort = i+1;
    			var form_sort = $('#formContent').find('.div_question').eq(i).find('.div_topic_question').eq(0).html(sort);
    		}
    	}
    	});  
    $( "#formContent" ).disableSelection();  
  });
	$('body').on('click','.cancel',function(){
		$(this).parent().parent().find('.edit_area').css('display','none');
	})
	//添加单选题-新
	$scope.createRadioButtonList = function(type,test){
		//console.log(test)
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var length = $('#formContent').find('.div_question').length;
		var lengths = length+1;
		if(type == '3'){
			var arr = ["A.选项1","B.选项2","C.选项3"];
			var answer = ['A','B','C'];
			if(test == 1){
				var data = {'type':'3','ipttitle':'题目','info':arr,'sort':lengths}
			}else{
				var data = {'type':'3','ipttitle':'题目','info':arr,'sort':lengths,'iptanswer':answer}
			}
			$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');
				var id = data.obj;
				var type = "4";
				a(id,type);
			}
			});
		}else if(type == '4'){
			var arr = ["A.选项1","B.选项2","C.选项3"];
			var answer = ['A','B','C']
			if(test == 1){
				var data = {'type':'4','ipttitle':'题目','info':arr,'sort':lengths}
			}else{
				var data = {'type':'4','ipttitle':'题目','info':arr,'sort':lengths,'iptanswer':answer}
			}
			
			$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')');
				var id = data.obj;
				var type = "4";
				a(id,type);
			}
			});
		}
		
		var a = function(id,b){
			if(type == 3){
				if(length == 0){
					var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+lengths+'</div><div class="form_id">'+id+'</div><div class="form_type">3</div><div class="form_score"></div><div class="div_title_question">题目</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all"><div><div class="circle"></div><p style="display:inline-block">A.选项1</p></div><div><div class="circle"></div><p style="display:inline-block">B.选项2</p></div><div><div class="circle"></div><p style="display:inline-block">C.选项3</p></div></div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="dan_delete" ng-click="dan_delete($event)"><span class=""></span>删除</button><button class="cancel"><span class=""></span>取消</button><button class="edit"><span class=""></span>编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text">题目</textarea><div class="score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><input class="edit_score"></div></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div><div class="cont_opt"><p style="color:#666">A</p>.<input type="text" value="选项1" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><div class="cont_opt"><p style="color:#666">B</p>.<input type="text" value="选项2" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><div class="cont_opt"><p style="color:#666">C</p>.<input type="text" value="选项3" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><button class="add_opt" ng-click="asd($event)">添加选项</button></div><div class="col-md-12 col-xs-12"><button class="confirm">完成编辑</button></div></div></div></div>'
					$('div #question').after($compile(html)($scope));
					if(test == 1){
						$('div .div_question:last').find('.form_score').after('<div class="form_info"></div>');
						var len = $('div .div_question:last').find('.delete_opt').length;
						for(e=0;e<len;e++){
							var dd = e+1;
							var html = '<div class="dan_suan">'+dd+'</div><button class="rightAnswer" ng-click="rightAnswer($event)">设置为正确答案</button>'
							$('div .div_question:last').find('.delete_opt').eq(e).after($compile(html)($scope))
						}
					}else{
						$('div .div_question:last').find('.score').css('display','none');
					}
					var h = $(document).height()-$(window).height()-24;
					$('html, body').animate({scrollTop:h},200)
				}else{
					var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+lengths+'</div><div class="form_id">'+id+'</div><div class="form_type">3</div><div class="form_score"></div><div class="div_title_question">题目</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all"><div><div class="circle"></div><p style="display:inline-block">A.选项1</p></div><div><div class="circle"></div><p style="display:inline-block">B.选项2</p></div><div><div class="circle"></div><p style="display:inline-block">C.选项3</p></div></div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="dan_delete" ng-click="dan_delete($event)"><span class=""></span>删除</button><button class="cancel"><span class=""></span>取消</button><button class="edit"><span class=""></span>编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text">题目</textarea><div class="score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><input class="edit_score"></div></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div><div class="cont_opt"><p style="color:#666">A</p>.<input type="text" value="选项1" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><div class="cont_opt"><p style="color:#666">B</p>.<input type="text" value="选项2" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><div class="cont_opt"><p style="color:#666">C</p>.<input type="text" value="选项3" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><button class="add_opt" ng-click="asd($event)">添加选项</button></div><div class="col-md-12 col-xs-12"><button class="confirm">完成编辑</button></div></div></div></div>'
					$('div .div_question:last').after($compile(html)($scope));
					if(test == 1){
						$('div .div_question:last').find('.form_score').after('<div class="form_info"></div>');
						var len = $('div .div_question:last').find('.delete_opt').length;
						for(e=0;e<len;e++){
							var dd = e+1;
							var html = '<div class="dan_suan">'+dd+'</div><button class="rightAnswer" ng-click="rightAnswer($event)">设置为正确答案</button>'
							$('div .div_question:last').find('.delete_opt').eq(e).after($compile(html)($scope))
						}
					}else{
						$('div .div_question:last').find('.score').css('display','none');
					}
				}
				var h = $(document).height()-$(window).height()-24;
				$('html, body').animate({scrollTop:h},200)
			}else if(type ==4){
				if(length == 0){
					var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+lengths+'</div><div class="form_id">'+id+'</div><div class="form_type">4</div><div class="form_score"></div><div class="div_title_question">题目</div><div class="duo" style="display: inline-block;color: red;">【多选题】</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all"><div><div class="circle"></div><p style="display:inline-block">A.选项1</p></div><div><div class="circle"></div><p style="display:inline-block">B.选项2</p></div><div><div class="circle"></div><p style="display:inline-block">C.选项3</p></div></div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="dan_delete" ng-click="dan_delete($event)"><span class=""></span>删除</button><button class="cancel"><span class=""></span>取消</button><button class="edit"><span class=""></span>编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text">题目</textarea><div class="score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><input class="edit_score"></div></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div><div class="cont_opt"><p style="color:#666">A</p>.<input type="text" value="选项1" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><div class="cont_opt"><p style="color:#666">B</p>.<input type="text" value="选项2" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><div class="cont_opt"><p style="color:#666">C</p>.<input type="text" value="选项3" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><button class="add_opt" ng-click="asd($event)">添加选项</button></div><div class="col-md-12 col-xs-12"><button class="duo_confirm">完成编辑</button></div></div></div></div>';
					$('div #question').after($compile(html)($scope));
					if(test == 1){
						$('div .div_question:last').find('.form_score').after('<div class="form_info"></div>');
						var a = $('div .div_question:last').find('.delete_opt').length;
						var len = $('div .div_question:last').find('.delete_opt').length;
						for(e=0;e<len;e++){
							var dd = e+1;
							var html = '<div class="dan_suan">'+dd+'</div><button class="duoAnswer" ng-click="duoAnswer($event)">设置为正确答案</button>'
							$('div .div_question:last').find('.delete_opt').eq(e).after($compile(html)($scope))
						}
					}else{
						$('div .div_question:last').find('.score').css('display','none');
					}
					var h = $(document).height()-$(window).height()-24;
					$('html, body').animate({scrollTop:h},200)
				}else{
					var html = '<div class="div_question"><div class="div_title_question_all"><div class="div_topic_question">'+lengths+'</div><div class="form_id">'+id+'</div><div class="form_type">4</div><div class="form_score"></div><div class="div_title_question">题目</div><div class="duo" style="display: inline-block;color: red;">【多选题】</div></div><div class="div_table_radio_question"><div class="div_table_clear_top"></div><div class="del_all"><div><div class="circle"></div><p style="display:inline-block">A.选项1</p></div><div><div class="circle"></div><p style="display:inline-block">B.选项2</p></div><div><div class="circle"></div><p style="display:inline-block">C.选项3</p></div></div><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #e6e6e6;margin-bottom:0px;" /><div style=\"height:35px\"><button class="dan_delete" ng-click="dan_delete($event)"><span class=""></span>删除</button><button class="cancel"><span class=""></span>取消</button><button class="edit"><span class=""></span>编辑</button></div><div class="edit_area"><div class="p_title col-md-5"><p class="edit_title">标题</p><textarea class="edit_text">题目</textarea><div class="score"><div style="display:inline-block;color:#666;position: relative;top: 3px;">题目分数：</div><input class="edit_score"></div></div><div class="p_cont col-md-7"><div class="edit_opt">选项文字</div><div class="cont_opt"><p style="color:#666">A</p>.<input type="text" value="选项1" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><div class="cont_opt"><p style="color:#666">B</p>.<input type="text" value="选项2" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><div class="cont_opt"><p style="color:#666">C</p>.<input type="text" value="选项3" class="select_dan"><button class="delete_opt" ng-click="delete_opt($event)">删除</button></div><button class="add_opt" ng-click="asd($event)">添加选项</button></div><div class="col-md-12 col-xs-12"><button class="duo_confirm">完成编辑</button></div></div></div></div>';
					$('div .div_question:last').after($compile(html)($scope));
					if(test == 1){
						$('div .div_question:last').find('.form_score').after('<div class="form_info"></div>');
						var a = $('div .div_question:last').find('.delete_opt').length;
						var len = $('div .div_question:last').find('.delete_opt').length;
						for(e=0;e<len;e++){
							var dd = e+1;
							var html = '<div class="dan_suan">'+dd+'</div><button class="duoAnswer" ng-click="duoAnswer($event)">设置为正确答案</button>'
							$('div .div_question:last').find('.delete_opt').eq(e).after($compile(html)($scope))
						}
					}else{
						$('div .div_question:last').find('.score').css('display','none');
					}
					var h = $(document).height()-$(window).height()-24;
					$('html, body').animate({scrollTop:h},200)
				}
					}
		}
		formService.toBottom();
	}
	//选择正确答案-单选
	$scope.rightAnswer = function($event){
		var a = $($event.target).parent().parent().find('.rightAnswer').length;
		for(i=0;i<a;i++){
			$($event.target).parent().parent().find('.rightAnswer').eq(i).css('color','');
			$($event.target).parent().parent().find('.rightAnswer').eq(i).css('background-color','#fff');
		}
		$($event.target).css('color','#fff');
		$($event.target).css('background-color','#6c0');
		var right = $($event.target).parent().children().eq(0).text();
		var info = $($event.target).parent().parent().parent().parent().parent().find('.form_info').html(right);
	}
	//选择正确答案-多选
	$scope.duoAnswer = function($event){
		$($event.target).parent().parent().parent().parent().parent().find('.form_info').html('');
		var color = $($event.target).css('color');
		if(color == 'rgb(255, 255, 255)'){
			$($event.target).css('color','');
			$($event.target).css('background-color','#fff');
		}else{
			$($event.target).css('color','#fff');
			$($event.target).css('background-color','#6c0');
		}
		var len = $($event.target).parent().parent().find('.cont_opt').length;
		var htmls = "";
		for(i=0;i<len;i++){
			var color = $($event.target).parent().parent().children('.cont_opt').eq(i).find('.duoAnswer').css('color');
			if(color == 'rgb(255, 255, 255)'){
					var x = String.fromCharCode(65+i);
					var html = '<div class="form_info_dan">'+x+'</div>'
					htmls = htmls + html;
			}
		}
		$($event.target).parent().parent().parent().parent().parent().find('.form_info_dan').remove();
		$($event.target).parent().parent().parent().parent().parent().find('.form_info').after(htmls);
	}
		
}]);
angular.module("aaaaa",[]).controller("createNameCtrl",function($scope,$modal){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	document.onkeydown = function(){
		e = event ? event :(window.event ? window.event : null);
		if(e.keyCode == 13){
			var href = window.location.hash;
		var fid = href.substr(13,href.length);
		$scope.title = document.getElementById('nameInput').value;
		$scope.desc = document.getElementById('descInput').value;
		var data = {'type':'1','ipttitle':$scope.title,'iptval':$scope.desc};
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')')
				//console.log(data);
				$('#question').html("<div id=\"divId\"><h1 id=\"pater_title\" style=\"color:#f53d05\">"+$scope.title+"</h1><div id=\"pater_desc\">"+$scope.desc+"</div><hr style=\"height:1px;border:none;border-top:1px dashed #c1c1c1;\" /><div class=\"form_id\">"+data.obj+"</div><div class=\"form_type\">1</div></div>");
				document.getElementById('divId').addEventListener('mouseover',function(){
			$('#question').css('border','1px solid #f53d05');
			$('#question').css('cursor','Pointer');
		})
				document.getElementById('divId').addEventListener('click',function(){
			var modalInstance = $modal.open({
			windowClass: "console six-contain",
			templateUrl : BASE_URL + "templates/form/create_name.html",
			controller:"createNameCtrl2",
			files:["controllers/formController"],

		})
		})
				document.getElementById('divId').addEventListener('mouseout',function(){
			$('#question').css('border','1px solid #fff');
			$('#question').css('cursor','');
		})
				
			}
		})
		$scope.$dismiss()
		}
	}
	$scope.cancel = function(){
		$scope.$dismiss();
	}
	//标题的新建与编辑
	$scope.getPater = function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		$scope.title = document.getElementById('nameInput').value;
		$scope.desc = document.getElementById('descInput').value;
		$scope.zongfen = $('#zongfen_form').val();
		$scope.pass = $('#pass_form').val();
		if($scope.title == ""){
			alert('未填写标题！~')
			return false;
		}
		var data = {'type':'1','ipttitle':$scope.title};
		var data2 = {'type':'2','ipttitle':$scope.desc};
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:{'total_score':$scope.zongfen,'pass':$scope.pass},
			success:function(data){
				var data = eval('('+data+')');
			}
		})
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:data,
			success:function(data){
				var data = eval('('+data+')')
						$.ajax({
							type:'POST',
							url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
							data:data2,
							success:function(data){
								var data2 = eval('('+data+')');
								$('#question').html("<div id=\"divId\"><h1 id=\"pater_title\" style=\"color:#f53d05\">"+$scope.title+"</h1><div id=\"pater_desc\"></div><hr style=\"height:1px;border:none;border-top:1px dashed #c1c1c1;margin-bottom:0px\" /><div class=\"form_id\">"+data.obj+"</div><div class=\"form_type\">1</div></div>");
									document.getElementById('divId').addEventListener('mouseover',function(){
									$('#question').css('border','1px solid #f53d05');
									$('#question').css('cursor','Pointer');
								})
								document.getElementById('divId').addEventListener('click',function(){
									var modalInstance = $modal.open({
										windowClass: "console six-contain",
										templateUrl : BASE_URL + "templates/form/create_name.html",
										controller:"createNameCtrl2",
										files:["controllers/formController"],

									})
								})
								document.getElementById('divId').addEventListener('mouseout',function(){
									$('#question').css('border','1px solid #fff');
									$('#question').css('cursor','');
								})
								$('#pater_desc').html($scope.desc);
								$('#pater_desc').after('<p style="display:none">'+data2.obj+'</p>')
								$('#pater_desc').after('<span id="total_score" style="display:none">'+$scope.zongfen+'</span>')
								$('#pater_desc').after('<span id="pass_score" style="display:none">'+$scope.pass+'</span>')
							}
						})
			}
		})
		$scope.$dismiss()
	}
})
angular.module('createname',[]).controller('createNameCtrl2',['$scope',function($scope){
	$scope.formType = 1;
	$scope.createForm = function(){
		$location.path('/form')
	}
	document.onkeydown = function(){
		e = event ? event : (window.event?window.event:null);
		if(e.keyCode == 13){
			var href = window.location.hash;
			var fid = href.substr(13,href.length);
			var id = $('#question').find('.form_id').eq(0).text();
			$scope.title = $('#nameInput').val();
			$scope.dec = $('#descInput').val();
			$scope.data = {'type':'1','ipttitle':$scope.title,'iptval':$scope.dec}
			$('#pater_title').html($scope.title)
			$('#pater_desc').html($scope.dec)
			$scope.$dismiss();
		}
	}
	setTimeout(function() {
		var a = $('#pater_title').text();
		var b = $('#pater_desc').text();
		$('#nameInput').val(a);
		$('#descInput').val(b);
		var c = $('#total_score').text();
		$scope.pass_score = $('#pass_score').text();
		$('#zongfen_form').val(c);
		$('#pass_form').val($scope.pass_score);
	}, 0);
	$scope.getPater = function(){
		var href = window.location.hash;
		var fid = href.substr(13,href.length);
		var id = $('#question').find('.form_id').eq(0).text();
		$scope.title = $('#nameInput').val();
		$scope.dec = $('#descInput').val();
		$scope.zongfen = $('#zongfen_form').val();
		$scope.pass = $('#pass_form').val();
		$('#total_score').html($scope.zongfen);
		$('#pass_score').html($scope.pass);
		$.ajax({
			type:'POST',
			url:PREFIX_HOST + '/index.php?c=form&a=create&fid='+fid,
			data:{'total_score':$scope.zongfen,'pass':$scope.pass},
			success:function(data){
				var data = eval('('+data+')');
			}
		})
		if($scope.title == ""){
			alert('未填写标题！~')
			return false;
		}
		$('#pater_title').html($scope.title)
		$('#pater_desc').html($scope.dec)
		$scope.$dismiss();
	}
	$scope.cancel = function(){
		$scope.$dismiss();
	}
	$scope.cancel = function(){
		$scope.$dismiss();
	}
}])
angular.module("toBottom",[]).service('formService',["$rootScope","$location",function($rootScope,$location){
	var toBottom = function(){
		// var height = $('#formContent').get(0).scrollHeight;
		// var speed=500;
		// $('#formContent').animate({ scrollTop: height }, speed);
		 // var h = $(document).height()-$(window).height();
  	// 	$(document).scrollTop(h);
		
	}
	var sort = function(){
		//重新编辑序号
		var sort_len = $('#formContent').find('.div_topic_question').length;
		//console.log(sort_len);
		for(i=0;i<sort_len;i++){
			var sort = i+1;
			var a = $('#formContent').find('.div_topic_question').eq(i).html(sort);
		}
	}
	var myForm = function(){
		$location.path("form/myForm");
	}
	var myTest = function(){
		$location.path("form/myTest");
	}
	var list = {
		toBottom: toBottom,
		sort:sort,
		myForm:myForm,
		myTest:myTest
	}
	return list;
}]);