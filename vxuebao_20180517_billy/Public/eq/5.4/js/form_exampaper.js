	$(function(){
		var PREFIX_HOST = "http://"+window.location.host;
		var pathname = window.location.pathname;
		var fid = pathname.substr(14);
		var juede = function(){
			//判断题目有没有全写
			var length = $('.div_question').length;
			var system = { 
	            win: false, 
	            mac: false, 
	            xll: false, 
	            ipad:false 
	        }; 
	        //检测平台 
	        var p = navigator.platform; 
	        system.win = p.indexOf("Win") == 0; 
	        system.mac = p.indexOf("Mac") == 0;
	        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
	        system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
	        if (system.win || system.mac || system.xll) {
					for(i=0;i<length;i++){
						var type = $('.div_question').eq(i).find('.form_type').text();
						if(type == 3 || type == 4 || type == 6 || type == 9 || type == 17){
							var radio_len = $('.div_question').eq(i).find('input').length;
							var state_true = 0;
							for(x=0;x<radio_len;x++){
								var state = $('.div_question').eq(i).find('input').eq(x).is(':checked');
								// console.log(state);
								if(state == true){
									state_true = state_true + 1;
								}
							}
							if(state_true == 0){
								alert('请确保所有内容正确填写，页面将自动定位到第一个不符合要求的题目，请检查！');
								$('.div_question').eq(i).css('border','2px solid #6c0');
								return false;
							}
						}else if(type == 5 || type == 8){
							var text = $('.div_question').eq(i).find('textarea').val();
							if(text == ""){
								alert('请确保所有内容正确填写，页面将自动定位到第一个不符合要求的题目，请检查！');
								$('.div_question').eq(i).css('border','2px solid #6c0');
								return false;
							}
						}else if(type == 7){
							var len = $('.div_question').eq(i).find('.attachment').eq(0).children('input').length;
							var leftLen = $('.div_question').eq(i).find('.left').length;
							if(len != leftLen){
								alert('请确保所有内容正确填写，页面将自动定位到第一个不符合要求的题目，请检查！');
								$('.div_question').eq(i).css('border','2px solid #6c0');
								return false;
							}
						}else if(type == 11 || type == 12 || type == 15 || type == 16){
							var text = $('.div_question').eq(i).find('input').val();
							if(text == ""){
								alert('请确保所有内容正确填写，页面将自动定位到第一个不符合要求的题目，请检查！');
								$('.div_question').eq(i).css('border','2px solid #6c0');
								return false;
							}
						}else if(type == 13){
							var text = $('.div_question').eq(i).find('input').val();
						    if(!(/^1[34578]\d{9}$/.test(text))){ 
						        alert("手机号码有误，请重填"); 
						        $('.div_question').eq(i).css('border','2px solid #6c0'); 
						        return false; 
						    } 
						}else if(type == 14){
							var text = $('.div_question').eq(i).find('input').val();
							var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
							if(!re.test(text)){
								alert('您的电子邮件格式不正确');
								$('.div_question').eq(i).css('border','2px solid #6c0');
								return false;
							}
						}
					}
	        }else{
	        	for(i=0;i<length;i++){
	        		var type = $('.div_question').eq(i).find('.form_type').text();
	        		if(type == 3 || type == 4 || type == 9){
	        			var radioLen = $('.div_question').eq(i).find('.jqradio').length;
	        			var yougou = 0;
	        			for(x=0;x<radioLen;x++){
	        				var counts = $('.div_question').eq(i).find('.jqradio').eq(x).children('span').eq(0).css('display');
	        				if(counts == 'block'){
	        					yougou = parseInt(yougou+1);
	        				}
	        			}
	        			if(yougou == '0'){
	        				alert('第'+parseInt(i+1)+'道题未填写，请填写！');
	        				return false;
	        			}
	        		}else if(type == 5 || type == 11 || type == 12 || type == 15 || type == 16){
	        			var val = $('.div_question').eq(i).find('input').eq(0).val();
	        			if(val == ''){
	        				alert('第'+parseInt(i+1)+'道题未填写，请填写！');
	        				return false;
	        			}
	        		}else if(type == 7){
	        			var leftLen = $('.div_question').eq(i).find('.left').length;
	        			var len = $('.div_question').eq(i).find('.attachment').eq(0).children('input').length;
	        			if(len != leftLen){
	        				alert('第'+parseInt(i+1)+'道题填写未完成，请填写！');
	        				return false;
	        			}

	        		}else if(type == 8){
	        			var val = $('.div_question').eq(i).find('textarea').eq(0).val();
	        			if(val == ''){
	        				alert('第'+parseInt(i+1)+'道题未填写，请填写！');
	        				return false;
	        			}
	        		}else if(type == 13){
	        			var text = $('.div_question').eq(i).find('input').val();
						if(!(/^1[34578]\d{9}$/.test(text))){ 
						    alert('第'+parseInt(i+1)+'道题手机号码有误，请重填');  
						    return false; 
						} 
	        		}else if(type == 14){
	        			var text = $('.div_question').eq(i).find('input').val();
						var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
						if(!re.test(text)){
							alert('第'+parseInt(i+1)+'道题您的电子邮件格式不正确');
							return false;
						}
	        		}
	        	}
	        }	
	        // return false;	
			$('#form').submit();
			$location.path('/form');
		}
		$('#post').click(function(){
			return juede();
		});
		$('body').on('mouseover','.form_odd_select',function(){
			$(this).css('background-color','#eee');
			$(this).css('cursor','pointer')
		})
		$('body').on('mouseout','.form_odd_select',function(){
			$(this).css('background-color','#fff')
		})
		$('body').on('click','.form_odd_select',function(){
			var list_type = $(this).closest('.div_question').find('.form_type').eq(0).text();
			var a = $(this).closest('.div_question').eq(0).css('border','2px solid #fff');
			var status = $(this).find('.form_redio_mid').eq(0).css('display');
			if(list_type == 17){
				if(status == 'none'){
					$(this).find('.form_redio_mid').eq(0).css('display','block');
					$(this).find('input').eq(0).attr('checked',true);
				}else{
					$(this).find('.form_redio_mid').eq(0).css('display','none');
					$(this).find('input').eq(0).attr('checked',false);
				}
			}else{
				if(status == 'none'){
					var len_radio = $(this).parent().find('input').length;
					for(i=0;i<len_radio;i++){
						$(this).parent().find('.form_redio_mid').eq(i).css('display','none');
					}
					$(this).find('.form_redio_mid').eq(0).css('display','block');
					$(this).find('input').eq(0).attr('checked','true');
				}
			}
		})
		$('body').on('mouseover','.form_double_select',function(){
			$(this).css('background-color','#eee');
			$(this).css('cursor','pointer')
		})
		$('body').on('mouseout','.form_double_select',function(){
			$(this).css('background-color','#fff')
		})
		$('body').on('click','.form_double_select',function(){
			$(this).closest('.div_question').eq(0).css('border','2px solid #fff');
			var status = $(this).find('.form_redio_mid').eq(0).css('display');
			if(status == 'none'){
				$(this).find('.form_redio_mid').eq(0).css('display','block');
				$(this).find('input').eq(0).attr('checked',true);
			}else if(status == 'block'){
				$(this).find('.form_redio_mid').eq(0).css('display','none');
				$(this).find('input').eq(0).attr('checked',false);
			}
		})
		$('body').on('click','.left',function(){
			var color = $(this).closest('.div_question').css('border');
			if(color == '2px solid rgb(102, 204, 0)'){
				$(this).closest('.div_question').css({'border':'2px solid #fff'})
			}
			$(this).css({'background-color':'#6c0'});
		});
		$('body').on('click','.right',function(){
			var leftClass;
			var answer;
			var id = $(this).closest('.opt_all').find('canvas').eq(0).attr('id');
			var c=document.getElementById(id);
			var cxt=c.getContext("2d");
			cxt.beginPath();
			var leftLen = $(this).closest('.opt_all').find('.left').length;
			for(i=0;i<leftLen;i++){
				var color = $(this).closest('.opt_all').find('.left').eq(i).css('background-color');
				if(color == 'rgb(102, 204, 0)'){
					var canvasTop = $(this).closest('.opt_all').find('canvas').eq(0).offset().top;
					var canvasLeft = $(this).closest('.opt_all').find('canvas').eq(0).offset().left;
					var leftTop = $(this).closest('.opt_all').find('.left').eq(i).offset().top;
					var rightLeft = $(this).offset().left;
					var rightTop = $(this).offset().top;
					leftClass = 'L'+i;
					console.log(leftClass);
				};
				$(this).closest('.opt_all').find('.left').eq(i).css({'background-color':'rgb(235, 235, 228)'});
			};
			cxt.moveTo(154,parseInt(leftTop-canvasTop+8));
			cxt.lineTo(parseInt(rightLeft-canvasLeft),parseInt(rightTop-canvasTop+8));
			cxt.stroke();
			cxt.closePath();
			var rightId = $(this).attr('id');
			var rightClass = rightId.substring(0,2);
			answer = leftClass+rightClass;
			$(this).closest('.opt_all').find('.'+rightClass).eq(0).text(answer);
			var a = $(this).closest('.opt_all').find('.'+rightClass).eq(0).text();
			var spanLen = $(this).closest('.div_question').find('span').length;
			var formId = $(this).closest('.div_question').find('.form_id').eq(0).text();
			var atanswer = '';
			for(x=0;x<spanLen;x++){
				var y = $(this).closest('.div_question').find('span').eq(x).text();
				if(y != ''){
					var a = '<input type="checkbox" value="'+y+'" name="question['+formId+'][]" checked="checked">';
					atanswer = atanswer + a;
				}
			}
			$(this).closest('.div_question').find('.attachment').eq(0).html(atanswer);
		})
		document.onkeydown = function(){
			e = event ? event :(window.event ? window.event : null); 
				if(e.keyCode==13){ 
					return juede();
			} 
		};
		$('body').on('mouseup',':input[type="radio"]',function(){
			$(this).parent().parent().parent().parent().css('border','2px solid #fff')
		});
		$('body').on('mouseup',':input[type="checkbox"]',function(){
			$(this).parent().parent().parent().parent().css('border','2px solid #fff')
		});
		$('body').on('mouseup','textarea',function(){
			$(this).parent().css('border','2px solid #fff')
		});
		$('body').on('mouseup','input[type="text"]',function(){
			$(this).parent().css('border','2px solid #fff')
		});
		$('body').on('click','.reset',function(){
			var canvasId = $(this).closest('.div_question').find('canvas').eq(0).attr('id');
			var c=document.getElementById(canvasId);  
		    var cxt=c.getContext("2d");  
		    cxt.clearRect(0,0,500,200);
		    $(this).closest('.div_question').find('.attachment').eq(0).text('');
		    var len = $(this).closest('.div_question').find('span').length;
		    for(i=0;i<len;i++){
		    	$(this).closest('.div_question').find('span').eq(i).text('');
		    }
		})
        var system = { 
            win: false, 
            mac: false, 
            xll: false, 
            ipad:false 
        }; 
        //检测平台 
        var p = navigator.platform; 
        system.win = p.indexOf("Win") == 0; 
        system.mac = p.indexOf("Mac") == 0; 
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
        system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
        if (system.win || system.mac || system.xll) { 
        	$('.view_form_header').css('display','block')
        	$('#post').css({'background-color':'#6c0','color':'#fff','border-radius':'0px','width':'100px'})
        	//pc端
            $.ajax({
				type:'GET',
				async:false,
				url:PREFIX_HOST + '/index.php?c=form&a=exampaper&fid=' + fid,
				success:function(data){
					var data = eval('('+data+')');
					var startime = data.startime;
					var pingfen = PREFIX_HOST + '/index.php?c=form&a=score&fid='+fid+'&time='+data.startime;
					$('#form').attr('action',pingfen);
					if(data.tpl == ''){
						$('.previewPic').eq(0).attr('src','/view/images/preview.png')
					}else{
						$('.previewPic').eq(0).attr('src',data.tpl)
					}
					for(i=0;i<data.list.length;i++){
						if(data.list[i].type==1){
							var form_title = data.list[i].ipttitle;
							var form_desc = data.list[i].iptval;
							var form_title_id = data.list[i].id;
							$('#formTilte p').html(form_title)
						}else if(data.list[i].type==2){
							console.log(data.list[i].ipttitle)
							$('#formTilte p').after('<div style="color: #7d7b7b;position: absolute;margin-top: 10px;">'+data.list[i].ipttitle+'</div><hr style="height:1px;border:none;border-top:1px dashed #ddd;margin: 0px;margin-top: 30px;" />')
						}else if(data.list[i].type == 3){
							var info_len = data.list[i].info.length;
							var arr = "";
							for(z=0;z<info_len;z++){
								var string = String.fromCharCode((65+z))
								var html = '<div class="form_odd_select"><div class="form_radio_bg"><div class="form_redio_mid"></div></div><input style="display:none" type="radio" value="'+string+'" name="question['+data.list[i].id+'][]"><p class="preview_left">'+data.list[i].info[z]+'</p></div>'
								arr = arr + html;
							}
							var div_len = $('.div_question').length;
							if(div_len == 0){
								var a = $('#formTilte').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="form_type">'+data.list[i].type+'</div><div class="form_id">'+data.list[i].id+'</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div></div><div class="div_table_radio_question"><div class="opt_all" style="margin-top:15px">'+arr+'</div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>');
								if(data.ftype == 1){
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}else{
								$('.div_question:last').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="form_type">'+data.list[i].type+'</div><div class="form_id">'+data.list[i].id+'</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div></div><div class="div_table_radio_question"><div class="opt_all" style="margin-top:15px">'+arr+'</div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>');
								if(data.ftype == 1){
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}
							if(data.ftype == 1){
								$('.div_question:last').find('.preview_score').eq(0).css('display','none')
							}
						}else if(data.list[i].type == 4){
							var info_len = data.list[i].info.length;
							var arr = "";
							for(z=0;z<info_len;z++){
								var string = String.fromCharCode((65+z))
								var html = '<div class="form_double_select"><div class="form_radio_bg"><div class="form_redio_mid"></div></div><input style="display:none" type="checkbox" value="'+string+'" name="question['+data.list[i].id+'][]"><p class="preview_left">'+data.list[i].info[z]+'</p></div>';
								arr = arr + html;
							}
							var div_len = $('.div_question').length;
							if(div_len == 0){
								$('#formTilte').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="form_type">'+data.list[i].type+'</div><div class="form_id">'+data.list[i].id+'</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div><div class="duo" style="display: inline-block;color: #ff766c;">【多选题】</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div></div><div class="div_table_radio_question" style="margin-top:8px"><div class="opt_all">'+arr+'</div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>');
								if(data.ftype == 1){
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}else{
								$('.div_question:last').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="form_type">'+data.list[i].type+'</div><div class="form_id">'+data.list[i].id+'</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div><div class="duo" style="display: inline-block;color: #ff766c;">【多选题】</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div></div><div class="div_table_radio_question" style="margin-top:8px"><div class="opt_all">'+arr+'</div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>	')
								if(data.ftype == 1){
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}
							if(data.ftype == 1){
								$('.div_question:last').find('.preview_score').eq(0).css('display','none')
							}
						}else if(data.list[i].type == 5){ //填空题
							var form_write_id = data.list[i].id;
							var form_write_sort = data.list[i].sort;
							var form_write_type = data.list[i].type;
							var form_write_title = data.list[i].ipttitle;
							var div_len = $('.div_question').length;
							if(div_len == 0){
								$('#formTilte').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_write_sort+'.</div><div class="div_title_question preview_left">'+form_write_title+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div><div class="form_id">'+form_write_id+'</div><div class="form_type">'+form_write_type+'</div></div><div class="div_table_clear_top"></div><textarea class="write_area" placeholder="作答区..." type="text" name="question['+form_write_id+'][]"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>')
								if(data.ftype == 1){
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}else{
								$('.div_question:last').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_write_sort+'.</div><div class="div_title_question preview_left">'+form_write_title+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div><div class="form_id">'+form_write_id+'</div><div class="form_type">'+form_write_type+'</div></div><div class="div_table_clear_top"></div><textarea class="write_area" placeholder="作答区..." type="text" name="question['+form_write_id+'][]"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>')
								if(data.ftype == 1){
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}
							if(data.ftype == 1){
								$('.div_question:last').find('.preview_score').eq(0).css('display','none')
							}
						}else if(data.list[i].type == 6 || data.list[i].type == 17){ //投票
							var form_vote_id = data.list[i].id;
							var form_vote_sort = data.list[i].sort;
							var form_vote_type = data.list[i].type;
							var form_vote_title = data.list[i].ipttitle;
							var info_len = data.list[i].info.length;
							var arr = "";
							if(data.list[i].type == 6){
								for(z=0;z<info_len;z++){
									var string = String.fromCharCode((65+z))
									var html = '<div class="form_odd_select"><div class="form_radio_bg"><div class="form_redio_mid"></div></div><input style="display:none" type="radio" value="'+string+'" name="question['+data.list[i].id+'][]"><p class="preview_left">'+data.list[i].info[z]+'</p></div>';
									arr = arr + html;
								}
							}else if(data.list[i].type == 17){
								for(z=0;z<info_len;z++){
									var string = String.fromCharCode((65+z))
									var html = '<div class="form_odd_select"><div class="form_radio_bg"><div class="form_redio_mid"></div></div><input style="display:none" type="checkbox" value="'+string+'" name="question['+data.list[i].id+'][]"><p class="preview_left">'+data.list[i].info[z]+'</p></div>';
									arr = arr + html;
								}
							}
							var div_len = $('.div_question').length;
							if(div_len == 0){
								$('#formTilte').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="form_type">'+data.list[i].type+'</div><div class="form_id">'+data.list[i].id+'</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div></div><div class="div_table_radio_question" style="margin-top:8px"><div class="opt_all">'+arr+'</div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>');
							}else{
								$('.div_question:last').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="form_type">'+data.list[i].type+'</div><div class="form_id">'+data.list[i].id+'</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div></div><div class="div_table_radio_question" style="margin-top:8px"><div class="opt_all">'+arr+'</div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>')
							}
						}else if(data.list[i].type == 7){
							var div_len = $('.div_question').length;
							var leftData = data.list[i].info.left;
							var rightData = data.list[i].info.right;
							leftData = leftData.replace(/&quot;/g,"\"");
							rightData = rightData.replace(/&quot;/g,"\"");
							leftData = eval('('+leftData+')');
							rightData = eval('('+rightData+')');
							var leftHtmls = "";
							var rightHtmls = "";
							for(var key in leftData){
								var a = 'L'+key;
								var leftHtml = '<div class="left" style="margin-bottom:22px;cursor:pointer;border: 1px solid #ccd5db;background-color: rgb(235, 235, 228);margin-top:0px">'+leftData[key][a]+'</div>';
								leftHtmls = leftHtmls +leftHtml;
							};
							for(var key2 in rightData){
								var a = 'R'+key2;
								var rightHtml = '<div id="'+a+data.list[i].id+'" class="right" style="margin-bottom:22px;cursor:pointer;border: 1px solid #ccd5db;background-color: rgb(235, 235, 228);margin-top:0px">'+rightData[key2][a]+'</div><span style="display:none" class="'+a+'"></span>';
								rightHtmls = rightHtmls +rightHtml;
							}
							var html = '<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+data.list[i].sort+'.</div><div class="form_type">'+data.list[i].type+'</div><div class="form_id">'+data.list[i].id+'</div><div class="div_title_question preview_left">'+data.list[i].ipttitle+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div><a class="reset">重置</a></div><div class="opt_all" style="margin-top:15px"><canvas style="position:absolute;" id="myCanvas'+i+'" width="500" height="200"></canvas><div style="width:156px;display: inline-block;position: relative;margin-top:0px">'+leftHtmls+'</div><div style="width:156px;display: inline-block;margin-left: 100px;position: relative;margin-top:0px">'+rightHtmls+'</div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px;margin-top:0px"><div class="attachment" style="display:none"></div></div>';
							if(div_len == 0){
								$('#formTilte').after(html);
							}else{
								console.log(div_len)
								$('.div_question:last').after(html);
							}
							if(data.ftype == 1){
								$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
							}
						}else if(data.list[i].type == 8){ //问答题
							var form_ask_id = data.list[i].id;
							var form_ask_sort = data.list[i].sort;
							var form_ask_type = data.list[i].type;
							var form_ask_title = data.list[i].ipttitle;
							var div_len = $('.div_question').length;
							if(div_len == 0){
								$('#formTilte').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_ask_sort+'.</div><div class="div_title_question preview_left">'+form_ask_title+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div><div class="form_id">'+form_ask_id+'</div><div class="form_type">'+form_ask_type+'</div></div><div class="div_table_clear_top"></div><textarea class="write_area" placeholder="作答区..." type="text" name="question['+form_ask_id+'][]"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>')
								if(data.ftype == 1){
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}else{
								$('.div_question:last').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_ask_sort+'.</div><div class="div_title_question preview_left">'+form_ask_title+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div><div class="form_id">'+form_ask_id+'</div><div class="form_type">'+form_ask_type+'</div></div><div class="div_table_clear_top"></div><textarea class="write_area" placeholder="作答区..." type="text" name="question['+form_ask_id+'][]"></textarea><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>')
								if(data.ftype == 1){
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}
							if(data.ftype == 1){
								$('.div_question:last').find('.preview_score').eq(0).css('display','none')
							}
						}else if(data.list[i].type == 9){
							var form_judge_id = data.list[i].id;
							var form_judge_sort = data.list[i].sort;
							var form_judge_type = data.list[i].type;
							var form_judge_title = data.list[i].ipttitle;
							var div_len = $('.div_question').length;
							if(div_len == 0){
								$('#formTilte').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_judge_sort+'.</div><div class="form_type">'+form_judge_type+'</div><div class="form_id">'+form_judge_id+'</div><div class="div_title_question preview_left">'+form_judge_title+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div></div><div class="div_table_radio_question"><div class="opt_all" style="margin-top:15px"><div class="form_odd_select" style="background-color: rgb(255, 255, 255); cursor: pointer;"><div class="form_radio_bg"><div class="form_redio_mid"></div></div><input style="display:none" type="radio" value="A" name="question['+form_judge_id+'][]"><p class="preview_left">对</p></div><div class="form_odd_select" style="background-color: rgb(255, 255, 255); cursor: pointer;"><div class="form_radio_bg"><div class="form_redio_mid"></div></div><input style="display:none" type="radio" value="B" name="question['+form_judge_id+'][]"><p class="preview_left">错</p></div></div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px"></div>')
								if(data.ftype == 1){
									console.log(i)
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}else{
								$('.div_question:last').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_judge_sort+'.</div><div class="form_type">'+form_judge_type+'</div><div class="form_id">'+form_judge_id+'</div><div class="div_title_question preview_left">'+form_judge_title+'</div><div class="preview_score">（分值：'+data.list[i].score+'分）</div></div><div class="div_table_radio_question"><div class="opt_all" style="margin-top:15px"><div class="form_odd_select" style="background-color: rgb(255, 255, 255); cursor: pointer;"><div class="form_radio_bg"><div class="form_redio_mid"></div></div><input style="display:none" type="radio" value="A" name="question['+form_judge_id+'][]"><p class="preview_left">对</p></div><div class="form_odd_select" style="background-color: rgb(255, 255, 255); cursor: pointer;"><div class="form_radio_bg"><div class="form_redio_mid"></div></div><input style="display:none" type="radio" value="B" name="question['+form_judge_id+'][]"><p class="preview_left">错</p></div></div></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px"></div>')
								if(data.ftype == 1){
									$('.div_question').eq(i-1).find('.preview_score').eq(0).css('display','none');
								}
							}
							if(data.ftype == 1){
								$('.div_question:last').find('.preview_score').eq(0).css('display','none')
							}
						}else if(data.list[i].type == 11){ //姓名
							var form_name_id = data.list[i].id;
							var form_name_sort = data.list[i].sort;
							var form_name_type = data.list[i].type;
							var form_name_title = data.list[i].ipttitle;
							var div_len = $('.div_question').length;
							if(div_len == 0){
								$('#formTilte').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_name_sort+'.</div><div class="div_title_question">'+form_name_title+'</div><div class="form_id">'+form_name_id+'</div><div class="form_type">'+form_name_type+'</div></div><div class="div_table_clear_top"></div><input type="text" class="form_name" name="question['+form_name_id+'][]" style="margin-top:5px"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>')
							}else{
								$('.div_question:last').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_name_sort+'.</div><div class="div_title_question">'+form_name_title+'</div><div class="form_id">'+form_name_id+'</div><div class="form_type">'+form_name_type+'</div></div><div class="div_table_clear_top"></div><input type="text" class="form_name" name="question['+form_name_id+'][]" style="margin-top:5px"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>')
							}
						}else if(data.list[i].type == 12 || data.list[i].type == 13 || data.list[i].type == 14 || data.list[i].type == 15 || data.list[i].type == 16){ //部门
							var form_name_id = data.list[i].id;
							var form_name_sort = data.list[i].sort;
							var form_name_type = data.list[i].type;
							var form_name_title = data.list[i].ipttitle;
							var div_len = $('.div_question').length;
							if(div_len == 0){
								$('#formTilte').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_name_sort+'.</div><div class="div_title_question">'+form_name_title+'</div><div class="form_id">'+form_name_id+'</div><div class="form_type">'+form_name_type+'</div></div><div class="div_table_clear_top"></div><input type="text" class="form_name" name="question['+form_name_id+'][]" style="margin-top:5px"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>')
							}else{
								$('.div_question:last').after('<div class="div_question" style="border:2px solid #fff"><div class="div_title_question_all"><div class="div_topic_question">'+form_name_sort+'.</div><div class="div_title_question">'+form_name_title+'</div><div class="form_id">'+form_name_id+'</div><div class="form_type">'+form_name_type+'</div></div><div class="div_table_clear_top"></div><input type="text" class="form_name" name="question['+form_name_id+'][]" style="margin-top:5px"><div class="div_table_clear_bottom"></div><hr style="height:1px;border:none;border-top:1px solid #ddd;margin-bottom:0px" /></div>')
							}
						}
					}
				},
				error:function(data){
					console.log('error')
				}
			});
        } else {
 			//手机端
 			$('#post').css({'font-size':'40px','width':'50%','height':'80px','margin-left':'25%','color':'#fff'});
 			$('#post').parent().css('padding','0 123px 0 123px');
        	$('body').css('background-color','#f0f0f0');
        	$('.content_timu').eq(0).css('background-color','')
            $('.pre_view').eq(0).css('margin-top','0px');
            $('.content_timu').eq(0).removeClass('container');
            $('.header_pic').eq(0).removeClass('container');
            $('#post').eq(0).css('background-color','#6c0');
            $('.pre_view').eq(0).css('display','none');
            $('#form').css({'padding-left':'51px','padding-right':'51px'});
            $('.previewPic').eq(0).css('display','none');
            $('body').on('touchend','.left',function(){
				$(this).css({'background-color':'#6c0'});
			});
			$('body').on('touchend','.rightm',function(){
				var leftClass;
				var answer;
				var id = $(this).closest('.div_question').find('canvas').eq(0).attr('id');
				var c=document.getElementById(id);
				var cxt=c.getContext("2d");
				cxt.beginPath();
				var leftLen = $(this).closest('.div_question').find('.left').length;
				for(i=0;i<leftLen;i++){
					var color = $(this).closest('.div_question').find('.left').eq(i).css('background-color');
					if(color == 'rgb(102, 204, 0)'){
						var canvasTop = $(this).closest('.div_question').find('canvas').eq(0).offset().top;
						var canvasLeft = $(this).closest('.div_question').find('canvas').eq(0).offset().left;
						var leftTop = $(this).closest('.div_question').find('.left').eq(i).offset().top;
						var rightLeft = $(this).offset().left;
						var rightTop = $(this).offset().top;
						leftClass = 'L'+i;
						console.log(leftClass);
					};
					$(this).closest('.div_question').find('.left').eq(i).css({'background-color':'rgb(235, 235, 228)'});
				};
				cxt.moveTo(285,parseInt(leftTop-canvasTop+20));
				cxt.lineTo(parseInt(rightLeft-canvasLeft+20),parseInt(rightTop-canvasTop+20));
				cxt.stroke();
				cxt.closePath();
				var rightId = $(this).attr('id');
				var rightClass = rightId.substring(0,2);
				answer = leftClass+rightClass;
				console.log(answer);
				$(this).closest('.div_question').find('.'+rightClass).eq(0).text(answer);
				var a = $(this).closest('.div_question').find('.'+rightClass).eq(0).text();
				var spanLen = $(this).closest('.div_question').find('span').length;
				var formId = $(this).closest('.div_question').find('.form_id').eq(0).text();
				var atanswer = '';
				for(x=0;x<spanLen;x++){
					var y = $(this).closest('.div_question').find('span').eq(x).text();
					if(y != ''){
						var a = '<input type="checkbox" value="'+y+'" name="question['+formId+'][]" checked="checked">';
						atanswer = atanswer + a;
					}
				}
				$(this).closest('.div_question').find('.attachment').eq(0).html(atanswer);
			});
			$('body').on('click','.reset',function(){
					var canvasId = $(this).closest('.div_question').find('canvas').eq(0).attr('id');
					var c=document.getElementById(canvasId);  
				    var cxt=c.getContext("2d");  
				    cxt.clearRect(0,0,900,400);
				    $(this).closest('.div_question').find('.attachment').eq(0).text('');
				    var len = $(this).closest('.div_question').find('span').length;
				    for(i=0;i<len;i++){
				    	$(this).closest('.div_question').find('span').eq(i).text('');
				    }
			})
            //填选单选题
			$('body').on('touchend','.form_dan_kuan_mp',function(){
				var list_type = $(this).closest('.div_question').find('.form_type').eq(0).text();
				var span_len = $(this).parent().find('span').length;
				var xu = $(this).find('.radio_shouji').eq(0);
				var status = $(this).find('.radio_shouji').eq(0).css('display')
				if(list_type == 17){
					if(status == 'none'){
						$(this).find('input[type="checkbox"]').attr('checked',true);
						xu.css('display','block');
					}else if(status == 'block'){
						$(this).find('input[type="checkbox"]').attr('checked',false);
						xu.css('display','none');
					}
				}else{
					for(i=0;i<span_len;i++){
						$(this).parent().find('span').eq(i).css('display','none')
					}
					$(this).find('input[type="radio"]').attr('checked','checked');
					$(this).find('span').eq(0).css('display','block')
				}
			})
			//填写双选题
			$('body').on('touchend','.form_dub_kuan_mp',function(){
				var input_status = $(this).find('input[type="checkbox"]').is(':checked');
				if(input_status == true){
					$(this).find('input[type="checkbox"]').attr('checked',false)
					$(this).find('span').eq(0).css('display','none')
				}else{
					$(this).find('input[type="checkbox"]').attr('checked',true)
					$(this).find('span').eq(0).css('display','block')
				}
			})
			 $.ajax({
		            	type:'GET',
						async:false,
						url:PREFIX_HOST + '/index.php?c=form&a=exampaper&fid=' + fid,
						success:function(data){
							var data = eval('('+data+')');
							var formdata = data;
							var startime = data.startime;
							var pingfen = PREFIX_HOST + '/index.php?c=form&a=score&fid='+fid+'&time='+data.startime;
							$('#form').attr('action',pingfen);
							for(i=0;i<data.list.length;i++){
								if(data.list[i].type==1){
									var form_title = data.list[i].ipttitle;//标题
									var form_desc = data.list[i].iptval;//描述
									var form_title_id = data.list[i].id;
									$('.formTilte').eq(0).html('<p>'+form_title+'</p>');
									$('.formTilte').eq(0).css({'background-color':'#6c0','color':'#fff','margin':'0','padding':'25px','width':'100%','font-size':'56px','text-align':'center','margin-bottom':'40px'})
								}else if(data.list[i].type==3){
									var info_len = data.list[i].info.length;
									var arr = "";
									for(z=0;z<info_len;z++){
										var string = String.fromCharCode((65+z))
										var html = '<div class="form_dan_kuan_mp"><div class="jqradio"><input type="radio" value="'+string+'" name="question['+data.list[i].id+'][]"><span style="display:none"></span></div><p class="">'+data.list[i].info[z]+'</p></div>'
										arr = arr + html;
									}
									var div_len = $('.div_question').length;
									if(div_len == 0){
										//题目为0的时候
										var a = $('#formTilte').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（分值：'+data.list[i].score+'分）</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><hr style="height: 1px;background-color: #e0e0e0;"><div class="form_dan_mp">'+arr+'</div></div>');
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}else{
										//题目不为0的时候
										$('.div_question:last').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（分值：'+data.list[i].score+'分）</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><hr style="height: 1px;background-color: #e0e0e0;"><div class="form_dan_mp">'+arr+'</div></div>');
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}
									if(data.ftype == 1){
										console.log(1)
										$('.div_question:last').find('.preview_score_mp').eq(0).css('display','none')
									}
								}else if(data.list[i].type==4){
									var info_len = data.list[i].info.length;
									var arr = "";
									for(z=0;z<info_len;z++){
										var string = String.fromCharCode((65+z))
										var html = '<div class="form_dub_kuan_mp"><div class="jqradio"><input type="checkbox" value="'+string+'" name="question['+data.list[i].id+'][]"><span style="display:none"></span></div><p class="">'+data.list[i].info[z]+'</p></div>'
										arr = arr + html;
									}
									var div_len = $('.div_question').length;
									if(div_len == 0){
										$('#formTilte').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><div class="duo" style="display: inline-block;color: #ff766c;">【多选题】</div><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（分值：'+data.list[i].score+'分）</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><hr style="height: 1px;background-color: #e0e0e0;"><div class="form_dan_mp">'+arr+'</div></div>');
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}else{
										console.log()
										$('.div_question:last').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><div class="duo" style="display: inline-block;color: #ff766c;">【多选题】</div><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（分值：'+data.list[i].score+'分）</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><hr style="height: 1px;background-color: #e0e0e0;"><div class="form_dan_mp">'+arr+'</div></div>');
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}
									if(data.ftype == 1){
										console.log(1)
										$('.div_question:last').find('.preview_score_mp').eq(0).css('display','none')
									}
								}else if(data.list[i].type == 5){
									var form_write_id = data.list[i].id;
									var form_write_sort = data.list[i].sort;
									var form_write_type = data.list[i].type;
									var form_write_title = data.list[i].ipttitle;
									var div_len = $('.div_question').length;
									if(div_len == 0){
										$('#formTilte').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（分值：'+data.list[i].score+'分）</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><div class="form_write_mp"><input class="form_input_mp" type="text" name="question['+form_write_id+'][]" style="font-size: 49px;"></div></div>')
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}else{
										$('.div_question:last').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（分值：'+data.list[i].score+'分）</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><div class="form_write_mp"><input class="form_input_mp" type="text" name="question['+form_write_id+'][]" style="font-size: 49px;"></div></div>')
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}
									if(data.ftype == 1){
										console.log(1)
										$('.div_question:last').find('.preview_score_mp').eq(0).css('display','none')
									}
								}else if(data.list[i].type == 6 || data.list[i].type == 17){
									var form_vote_id = data.list[i].id;
									var form_vote_sort = data.list[i].sort;
									var form_vote_type = data.list[i].type;
									var form_vote_title = data.list[i].ipttitle;
									var info_len = data.list[i].info.length;
									var arr = "";
									if(data.list[i].type == 6){
										for(z=0;z<info_len;z++){
											var string = String.fromCharCode((65+z))
											var html = '<div class="form_dan_kuan_mp"><div class="jqradio"><input type="radio" value="'+string+'" name="question['+data.list[i].id+'][]"><span class="radio_shouji" style="display:none"></span></div><p class="">'+data.list[i].info[z]+'</p></div>';
											arr = arr + html;
										}
									}else if(data.list[i].type == 17){
										for(z=0;z<info_len;z++){
											var string = String.fromCharCode((65+z))
											var html = '<div class="form_dan_kuan_mp"><div class="jqradio"><input type="checkbox" value="'+string+'" name="question['+data.list[i].id+'][]"><span class="radio_shouji" style="display:none"></span></div><p class="">'+data.list[i].info[z]+'</p></div>';
											arr = arr + html;
										}
									}
									var div_len = $('.div_question').length;
									if(div_len == 0){
										var a = $('#formTilte').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（投票题不计入总分）</span><span class="form_type" style="display:none">'+data.list[i].type+'</span></div><hr style="height: 1px;background-color: #e0e0e0;"><div class="form_dan_mp">'+arr+'</div></div>');
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}else{
										var a = $('.div_question:last').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（投票题不计入总分）</span><span class="form_type" style="display:none">'+data.list[i].type+'</span></div><hr style="height: 1px;background-color: #e0e0e0;"><div class="form_dan_mp">'+arr+'</div></div>');
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}
									if(data.ftype == 1){
										console.log(1)
										$('.div_question:last').find('.preview_score_mp').eq(0).css('display','none')
									}
								}else if(data.list[i].type == 7){
									var leftHtmls = '';
									var rightHtmls = '';
									var leftData = data.list[i].info.left;
									leftData = leftData.replace(/&quot;/g,"\"");
									leftData = eval('('+leftData+')');
									var rightData = data.list[i].info.right;
									rightData = rightData.replace(/&quot;/g,"\"");
									rightData = eval('('+rightData+')');
									for(var key2 in leftData){
										var leftHtml = '<div class="left" style="font-size:36px;margin-bottom:40px;width:265px;background-color:rgb(235, 235, 228)">'+leftData[key2]['L'+key2]+'</div>';
										leftHtmls = leftHtmls +leftHtml;
									}
									for(var key in rightData){
										var rightHtml = '<div id="R'+key+data.list[i].id+'" class="rightm" style="font-size:36px;margin-bottom:40px;width:265px;background-color:rgb(235, 235, 228)">'+rightData[key]['R'+key]+'</div><span style="display:none" class="R'+key+'"></span>';
										rightHtmls = rightHtmls +rightHtml;
									};
									var div_len = $('.div_question').length;
									var html = '<div class="div_question" style="border: 1px solid rgb(153, 153, 153); background-color: rgb(255, 255, 255); width: auto; padding: 35px;"><div class="form_title_mp" style="margin-bottom:22px"><div style="display:inline-block">'+data.list[i].sort+'.</div><div style="display:inline-block">'+data.list[i].ipttitle+'</div><div class="preview_score_mp" style="color:#6c0;display:inline-block">（分值：'+data.list[i].score+'分）</div><div class="form_type" style="display:none">'+data.list[i].type+'</div><a class="reset">重置</a><div style="display:none" class="form_id">'+data.list[i].id+'</div></div><canvas id="myCanvas'+data.list[i].id+'" width="900px" height="400px" style="position:absolute;">your browser does not support the canvas tag </canvas><div style="width: 265px;display: inline-block;position:relative;margin-left:20px">'+leftHtmls+'</div><div style="width: 265px;display: inline-block;margin-left: 269px;position:relative;">'+rightHtmls+'</div><div class="attachment" style="display:none"></div></div>';
									if(div_len == 0){
										$('#formTilte').after(html);
									}else{
										$('.div_question:last').after(html);
									}
								}else if(data.list[i].type == 8){
									var form_ask_id = data.list[i].id;
									var form_ask_sort = data.list[i].sort;
									var form_ask_type = data.list[i].type;
									var form_ask_title = data.list[i].ipttitle;
									var div_len = $('.div_question').length;
									if(div_len == 0){
										$('#formTilte').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（分值：'+data.list[i].score+'分）</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><div class="form_write_mp"><textarea class="form_area_mp" type="text" name="question['+form_ask_id+'][]" style="font-size: 49px;"></textarea></div></div>')
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}else{
										$('.div_question:last').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（分值：'+data.list[i].score+'分）</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><div class="form_write_mp"><textarea class="form_area_mp" type="text" name="question['+form_ask_id+'][]" style="font-size: 49px;"></textarea></div></div>')
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}
									if(data.ftype == 1){
										console.log(1)
										$('.div_question:last').find('.preview_score_mp').eq(0).css('display','none')
									}
								}else if(data.list[i].type == 9){
									var div_len = $('.div_question').length;
									var html = '<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><span class="preview_score_mp" style="color:#6c0">（分值：'+data.list[i].score+'分）</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><hr style="height: 1px;background-color: #e0e0e0;"><div class="form_dan_mp"><div class="form_dan_kuan_mp"><div class="jqradio"><input type="radio" value="A" name="question['+data.list[i].id+'][]"><span style="display:none"></span></div><p class="">对</p></div><div class="form_dan_kuan_mp"><div class="jqradio"><input type="radio" value="B" name="question['+data.list[i].id+'][]"><span style="display:none"></span></div><p class="">错</p></div></div></div>'
									if(div_len == 0){
										$('#formTilte').after(html)
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}else{
										$('.div_question:last').after(html)
										if(data.ftype == 1){
											$('.div_question').eq(i-1).find('.preview_score_mp').eq(0).css('display','none');
										}
									}
									if(data.ftype == 1){
										console.log(1)
										$('.div_question:last').find('.preview_score_mp').eq(0).css('display','none')
									}
								}else if(data.list[i].type == 11){
									var form_name_id = data.list[i].id;
									var form_name_sort = data.list[i].sort;
									var form_name_type = data.list[i].type;
									var form_name_title = data.list[i].ipttitle;
									var div_len = $('.div_question').length;
									if(div_len == 0){
										$('#formTilte').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><div class="form_write_mp"><input class="form_input_mp" type="text" name="question['+form_name_id+'][]" style="font-size: 49px;"></div></div>')
									}else{
										$('.div_question:last').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><div class="form_write_mp"><input class="form_input_mp" type="text" name="question['+form_name_id+'][]" style="font-size: 49px;"></div></div>')
									}
								}else if(data.list[i].type == 12 || data.list[i].type == 13 || data.list[i].type == 14 || data.list[i].type == 15 || data.list[i].type == 16){
									var form_name_id = data.list[i].id;
									var form_name_sort = data.list[i].sort;
									var form_name_type = data.list[i].type;
									var form_name_title = data.list[i].ipttitle;
									var div_len = $('.div_question').length;
									if(div_len == 0){
										$('#formTilte').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><div class="form_write_mp"><input class="form_input_mp" type="text" name="question['+form_name_id+'][]" style="font-size: 49px;"></div></div>')
									}else{
										$('.div_question:last').after('<div class="div_question"><div class="form_title_mp"><span>'+data.list[i].sort+'.</span><span>'+data.list[i].ipttitle+'</span><div class="form_type" style="display:none">'+data.list[i].type+'</div></div><div class="form_write_mp"><input class="form_input_mp" type="text" name="question['+form_name_id+'][]" style="font-size: 49px;"></div></div>')
									}
								}
							}
							
						},
						error:function(data){
							alert('系统出错')
						}
		            })
	$('.div_question').css({'border':'1px solid #999','background-color':'#fff','width':'auto','padding':'35px'})
	$('hr').css('margin','20px 25px');
	// $('.form_input_mp').css('border','1px solid #e0e0e0');
	$('.form_write_mp').css('padding','10px 25px')
		        } 
	});
