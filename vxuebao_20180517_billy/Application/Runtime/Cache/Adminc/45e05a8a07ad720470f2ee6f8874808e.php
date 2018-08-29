<?php if (!defined('THINK_PATH')) exit();?> <!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	<title>微学宝微课制作管理后台</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<!-- BEGIN GLOBAL MANDATORY STYLES -->
	<link href="http://www.vxuebao.com/Public/media/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="http://www.vxuebao.com/Public/media/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
	<link href="/Public/media/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="http://www.vxuebao.com/Public/media/css/style-metro.css" rel="stylesheet" type="text/css"/>
	<link href="http://www.vxuebao.com/Public/media/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="http://www.vxuebao.com/Public/media/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="http://www.vxuebao.com/Public/media/css/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="http://www.vxuebao.com/Public/media/css/uniform.default.css" rel="stylesheet" type="text/css"/>
    
    
     
       <link href="http://www.vxuebao.com/Public/media/css/search.css" rel="stylesheet" type="text/css"/>
     <link href="http://www.vxuebao.com/Public/media/css/error.css" rel="stylesheet" type="text/css"/>
    <link href="http://www.vxuebao.com/Public/media/css/invoice.css" rel="stylesheet" type="text/css"/>
    <link href="http://www.vxuebao.com/Public/media/css/inbox.css" rel="stylesheet" type="text/css"/>
 <link href="http://www.vxuebao.com/Public/media/css/bootstrap-fileupload.css" rel="stylesheet" type="text/css"/>
 
	<!-- END GLOBAL MANDATORY STYLES -->
	<link rel="shortcut icon" href="/favicon.ico" />
      <script type="text/javascript">
	    function unselectall(thisform){
        if(thisform.chkAll.checked){
            thisform.chkAll.checked = thisform.chkAll.checked&0;
        }   
    }
    function CheckAll(thisform){
        for (var i=0;i<thisform.elements.length;i++){
            var e = thisform.elements[i];
			debugger;
            if (e.name != "chkAll"&&e.disabled!=true){
                e.checked = thisform.chkAll.checked; 
			   if(i==0)alert(e.value);
			}
        }
    }
	 function changeSceneType(type_int){
	   var biztypeId=$('#scenetypeB').val();
	   var tagid_int=$('#scenetypeS').val();
	   if(tagid_int==0){
	   $.get('?c=scene&a=getSceneTag',{type_int:type_int,biztypeId:biztypeId},function(data){
		    if(data.status==1){
			  $('#scenetypeS').html('<option value="">请选择</option>'+data.info);	
			}
		 },'json');
		}
	}
	  </script>      
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body onLoad="changeSceneType();" class="page-header-fixed">
	<!-- BEGIN HEADER -->
	<div class="header navbar navbar-inverse navbar-fixed-top">
		<!-- BEGIN TOP NAVIGATION BAR -->
		<div class="navbar-inner">
			<div class="container-fluid">
				<!-- BEGIN LOGO -->
				<a class="brand" href="/adminc.php">
				<img src="/Public/media/image/logoh.png" alt="logo" />

				</a>

			  <div class="navbar hor-menu hidden-phone hidden-tablet">
					<div class="navbar-inner">
						<ul class="nav">
							<li class="<?php echo ($ui["index"]); ?>">
								<a href="<?php echo U('/index');?>">
								管理首页
								<span class="selected"></span>
								</a>
							</li>
							<li class="<?php echo ($ui["sys_set"]); echo ($ui["sys"]); ?>  <?php echo ($ui["sys_setmail"]); echo ($ui["sys_wxapi"]); ?> <?php echo ($ui["Update"]); ?> <?php echo ($ui["Database"]); echo ($ui["sys_pay"]); ?>">
								<a data-toggle="dropdown" class="dropdown-toggle" href="javascript:;">
								站点设置
								<span class="arrow"></span>     
								</a>
								<ul class="dropdown-menu">
									     <li class="<?php echo ($ui["sys_set"]); ?>"><a href="<?php echo U('sys/set');?>">网站信息设置</a></li>
<li class="<?php echo ($ui["sys_homeset"]); ?>"><a href="<?php echo U('sys/homeset');?>">首页配置</a></li>
<?php if(C('sys_link_arr')): ?> <li class="<?php echo ($ui["sys_scenelink"]); ?>"><a href="<?php echo U('sys/scenelink');?>">相关状态微课</a></li> <?php endif; ?> 
<li class="<?php echo ($ui["sys_pay"]); ?>"><a href="<?php echo U('sys/pay');?>">支付配置</a></li>
<li class="<?php echo ($ui["otherlogin"]); ?>"><a href="<?php echo U('sys/otherlogin');?>">第三方登录</a></li>
<li class="<?php echo ($ui["sys_setmail"]); ?>"><a href="<?php echo U('sys/setmail');?>">邮件服务器</a></li>
<li class="<?php echo ($ui["sys_wxapi"]); ?>"><a href="<?php echo U('sys/wxapi');?>">SDK分享</a></li>
<li class="<?php echo ($ui["Database"]); ?>"> <a href="<?php echo U('/Database/index/type/export');?>"> 数据备份</a> </li>
<li class="<?php echo ($ui["Open"]); ?>"> <a href="<?php echo U('Open/index');?>"> 开放接口管理</a> </li>
<li class="<?php echo ($ui["appsystem"]); ?>"> <a href="<?php echo U('Open/appsystem');?>"> APP系统参数设置</a> </li>                  
                   
								</ul>

								<b class="caret-out"></b>                        

							</li>

							<li  class="<?php echo ($ui["useranli"]); ?>">
								<a data-toggle="dropdown" class="dropdown-toggle" href="">案例管理<span class="arrow"></span></a>
                                <ul class="dropdown-menu">
                                    <li class="<?php if(($flag) == "useranli"): echo ($ui["anli_index"]); endif; ?>"> <a  href="<?php echo U('/Scene/index/flag/useranli');?>"> 用户案例管理</a> </li>
                        <li class="<?php if(($flag) == "template"): echo ($ui["anli_index"]); endif; ?>"> <a href="/adminc.php?c=scene&flag=template"> 申请模板案例</a> </li>
                         <li class="<?php if(($flag) == "promotion"): echo ($ui["anli_index"]); endif; ?>"> <a href="/adminc.php?c=scene&flag=promotion"> 申请推荐案例</a> </li>
								</ul>
								<b class="caret-out"></b>         
							</li>

							<li class="<?php echo ($ui["users"]); ?> <?php echo ($ui["users_add"]); ?> <?php echo ($ui["user_group"]); ?> <?php echo ($ui["users_batch"]); ?>">
								<a data-toggle="dropdown" class="dropdown-toggle" href="">用户管理
								<span class="arrow"></span>
								</a>

								<ul class="dropdown-menu">
               <li class="<?php echo ($ui["users"]); ?>"> <a href="<?php echo U('user/index');?>"> 前台用户管理</a> </li>
		       <li class="<?php echo ($ui["users_add"]); ?>"> <a href="<?php echo U('user/add');?>"> 添加新用户</a> </li>
               <li class="<?php echo ($ui["user_group"]); ?>"> <a href=adminc.php?c=group> 用户组管理</a> </li>
               <li class="<?php echo ($ui["users_batch"]); ?>"> <a href="<?php echo U('user/batch');?>"> 企业子账号批量导入</a> </li>
								</ul>
								<b class="caret-out"></b>                        
							</li>
							<li>
								<a href="/adminc.php?c=sys&a=clearcache">清理缓存</a>
							</li>
					<li>
								<a href="/" target="_blank">网站首页</a>
							</li>
						</ul>

					</div>

				</div>

				<!-- END HORIZANTAL MENU -->

				<!-- BEGIN RESPONSIVE MENU TOGGLER -->

				<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">

				<img src="/Public/media/image/menu-toggler.png" alt=""/>

				</a>          

	       

				<!-- BEGIN TOP NAVIGATION MENU -->              

				<ul class="nav pull-right">

					<!-- BEGIN USER LOGIN DROPDOWN -->

					<li class="dropdown user">

						<a href="#" class="dropdown-toggle" data-toggle="dropdown">

						<img alt="" src="assets/images/defaultuser.jpg " style="width:30px;"/>

						<span class="username"><?php echo ($Adminusername); ?></span>

						<i class="icon-angle-down"></i>

						</a>

						<ul class="dropdown-menu">
                        
                         
                    <li> <a href="<?php echo U('sys/admin');?>"> <i class="icon-user"></i>  管理员管理</a> </li>
                 <li> <a href="/adminc.php?c=sys&a=edit&id=<?php echo ($Adminuserid); ?>"><i class="icon-calendar"></i> 修改密码</a> </li>
		        <li > <a href="/adminc.php?c=auth&a=logout"><i class=" icon-share"></i>  退出</a> </li>

						

						</ul>

					</li>

					<!-- END USER LOGIN DROPDOWN -->

			  </ul>

				<!-- END TOP NAVIGATION MENU --> 

			</div>

		</div>

		<!-- END TOP NAVIGATION BAR -->

	</div>

	<!-- END HEADER -->

	<!-- BEGIN CONTAINER -->   

	<div class="page-container row-fluid" >

		<!-- BEGIN HORIZONTAL MENU PAGE SIDEBAR1 -->
		<div class="page-sidebar nav-collapse collapse">
		  <!-- BEGIN SIDEBAR MENU -->
		  <ul class="page-sidebar-menu">
		    <li>
		      <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
		      <div class="sidebar-toggler hidden-phone"></div>
		      <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
	        </li>
		   
		    <li class="<?php echo ($ui["index"]); ?>"> <a href="<?php echo U('/index');?>"> <i class="icon-home"></i> 
            <span class="title">管理首页</span> <span class="selected"></span> </a> </li>
  
		    <li class="<?php echo ($ui["sys_set"]); echo ($ui["sys"]); echo ($ui["sys_setmail"]); echo ($ui["sys_wxapi"]); echo ($ui["Update"]); echo ($ui["sys_pay"]); echo ($ui["Open"]); ?>"> 
            <a href="javascript:;"> <i class="icon-cogs"></i> <span class="title">站点设置</span> 
             <span class="selected "></span> </a>
		      <ul class="sub-menu">
              	   <li class="<?php echo ($ui["sys_set"]); ?>"><a href="<?php echo U('sys/set');?>">网站信息设置</a></li>
<li class="<?php echo ($ui["sys_homeset"]); ?>"><a href="<?php echo U('sys/homeset');?>">首页配置</a></li>
<?php if(C('sys_link_arr')): ?> <li class="<?php echo ($ui["sys_scenelink"]); ?>"><a href="<?php echo U('sys/scenelink');?>">相关状态微课</a></li> <?php endif; ?> 
<li class="<?php echo ($ui["sys_pay"]); ?>"><a href="<?php echo U('sys/pay');?>">支付配置</a></li>
<li class="<?php echo ($ui["otherlogin"]); ?>"><a href="<?php echo U('sys/otherlogin');?>">第三方登录</a></li>
<li class="<?php echo ($ui["sys_setmail"]); ?>"><a href="<?php echo U('sys/setmail');?>">邮件服务器</a></li>
<li class="<?php echo ($ui["sys_wxapi"]); ?>"><a href="<?php echo U('sys/wxapi');?>">SDK分享</a></li>
<li class="<?php echo ($ui["Database"]); ?>"> <a href="<?php echo U('/Database/index/type/export');?>"> 数据备份</a> </li>
<li class="<?php echo ($ui["Open"]); ?>"> <a href="<?php echo U('Open/index');?>"> 开放接口管理</a> </li>
<li class="<?php echo ($ui["appsystem"]); ?>"> <a href="<?php echo U('Open/appsystem');?>"> APP系统参数设置</a> </li>                   
	          </ul>
			  </li>
    
             <li class="<?php echo ($ui["sys_admin"]); echo ($ui["sys_edit"]); echo ($ui["sys_add"]); ?>"> <a href="javascript:;"> 
             <i class="icon-user"></i> <span class="title">管理员管理</span> 
             <span class="selected "></span> </a>
		      <ul class="sub-menu">
                <li class="<?php echo ($ui["sys_admin"]); ?>"> <a href="<?php echo U('sys/admin');?>"> 管理员管理</a> </li>
                 <li class="<?php echo ($ui["sys_edit"]); ?>"> <a href="/adminc.php?c=sys&a=edit&id=<?php echo ($Adminuserid); ?>"> 修改密码</a> </li>
		        <li class="<?php echo ($ui["sys_add"]); ?>"> <a href="<?php echo U('sys/add');?>"> 添加管理员</a> </li>
		        
		    
	          </ul>
	        </li>
            
		    <li class="<?php echo ($ui["users"]); echo ($ui["users_e"]); echo ($ui["users_add"]); echo ($ui["user_group"]); echo ($ui["user_expire"]); echo ($ui["users_batch"]); ?>"> <a href="javascript:;"> 
            <i class="icon-user"></i> <span class="title">用户管理</span> 
            <span class="selected "></span> </a>
		      <ul class="sub-menu">
               <li class="<?php echo ($ui["users"]); ?>"> <a href="<?php echo U('user/index');?>"> 前台用户管理</a> </li>
		       <li class="<?php echo ($ui["users_add"]); ?>"> <a href="<?php echo U('user/add');?>"> 添加新用户</a> </li>
               <li class="<?php echo ($ui["user_group"]); ?>"> <a href=adminc.php?c=group> 用户组管理</a> </li>
			   <li class="<?php echo ($ui["user_expire"]); ?>"> <a href='<?php echo U('user/expire');?>'> 收费到期管理</a> </li>
			   <li class="<?php echo ($ui["users_batch"]); ?>"><a href="<?php echo U('user/batch');?>">企业子账号批量导入</a></li>
	          </ul>
	        </li>
			<li class="<?php echo ($ui["lecturer"]); echo ($ui["add_lecturer"]); ?>"> <a href="javascript:;"> 
             <i class="icon-user"></i>  <span class="title">讲师管理</span> 
             <span class="selected "></span> </a>
		      <ul class="sub-menu">
              
                <li class="<?php echo ($ui["lecturer"]); ?>"> <a href="<?php echo U('Lecturer/index');?>"> 讲师列表</a> </li>
                <li class="<?php echo ($ui["add_lecturer"]); ?>"> <a href="<?php echo U('Lecturer/add');?>"> 添加新讲师</a> </li>
		    
	          </ul>
	        </li>
			
		    <li class="<?php echo ($ui["shenqin_scene"]); ?>"> <a href="javascript:;"> <i class="icon-table"></i> <span class="title">已审结果管理</span> <span class="selected "></span> </a>
		      <ul class="sub-menu">
				<li class="<?php if(($flag) == "designer"): echo ($ui["designer"]); endif; ?>"> <a  href="/adminc.php?c=scene&flag=designer&apply=2"> 微课设计师申请</a> </li>
				<li class="<?php if(($flag) == "indextj"): echo ($ui["indextj"]); endif; ?>"> <a href="/adminc.php?c=scene&flag=indextj&apply=2"> 首页推荐申请</a> </li>
				<li class="<?php if(($flag) == "guanchan"): echo ($ui["guanchan"]); endif; ?>"> <a href="/adminc.php?c=scene&flag=guanchan&apply=2"> 微课广场推荐申请</a> </li>
				<li class="<?php if(($flag) == "sysmb"): echo ($ui["sysmb"]); endif; ?>"> <a href="/adminc.php?c=scene&flag=sysmb&apply=2"> 系统模板申请</a> </li>
	          </ul>
	        </li>


			
		    <li class="<?php echo ($ui["scene_anli"]); ?>"> <a href="javascript:;"> <i class="icon-table"></i> <span class="title">用户案例管理</span> <span class="selected "></span> </a>
		      <ul class="sub-menu">
				<li class="<?php if(($flag) == "all"): echo ($ui["all"]); endif; ?>"> <a  href="/adminc.php?c=scene&flag=all"> 所有用户案例</a> </li>
				<li class="<?php if(($flag) == "designer"): echo ($ui["designer"]); endif; ?>"> <a href="/adminc.php?c=scene&flag=designer"> 设计师案例管理</a> </li>
				<li class="<?php if(($flag) == "indextj"): echo ($ui["indextj"]); endif; ?>"> <a href="/adminc.php?c=scene&flag=indextj"> 首页推荐管理</a> </li>
				<li class="<?php if(($flag) == "guanchan"): echo ($ui["guanchan"]); endif; ?>"> <a href="/adminc.php?c=scene&flag=guanchan"> 微课广场管理</a> </li>
				<li class="<?php if(($flag) == "sysmb"): echo ($ui["sysmb"]); endif; ?>"> <a href="/adminc.php?c=scene&flag=sysmb"> 系统模板管理</a> </li>
	          </ul>
	        </li>

	        <li class="<?php echo ($ui["form"]); echo ($ui["form_tpl"]); ?>"> <a href="javascript:;"> 
             <i class="icon-table"></i>  <span class="title">用户考卷管理</span> 
             <span class="selected "></span> </a>
		      <ul class="sub-menu">
              
                <li class="<?php echo ($ui["form"]); ?>"> <a href="<?php echo U('Form/index');?>"> 所有用户考卷</a> </li>
		    
	          </ul>
	        </li>

		    <li class="<?php if(($flag) == "useranli"): else: ?> <?php echo ($ui["scene_index"]); echo ($ui["Reptile"]); echo ($ui["yxcj"]); endif; ?> "> <a href="javascript:;"> 
            <i class="icon-briefcase"></i> 
            <span class="title">数据采集</span> <span class="selected "></span> </a>
		      <ul class="sub-menu">
                 <li class="<?php if($_GET['from']=='0'): ?>active <?php else: endif; ?>"><a href="/adminc.php?c=reptile&from=0" ><i class="fa "></i>采集官方</a></li>
	          </ul>
	        </li>
            
            
             <li class="<?php echo ($ui["goods"]); ?>"> <a href="javascript:;"> 
            <i class="icon-collapse"></i> <span class="title">商品管理</span> 
            <span class="selected "></span> </a>
		      <ul class="sub-menu">
		        <li  class="<?php echo ($ui["goods_index"]); ?>"> <a href="<?php echo U('/goods');?>"> 商品管理</a> </li>
		        <li class="<?php echo ($ui["goods_add"]); ?>" > <a href="?c=goods&a=add"> 添加商品</a> </li>
		    
		     
	          </ul>
	        </li>
             <li class=" <?php echo ($ui["order_info"]); ?>"> <a href="javascript:;"> 
            <i class="icon-yen"></i> <span class="title">订单管理</span> 
            <span class="selected "></span> </a>
		      <ul class="sub-menu">
		        <li class="<?php echo ($ui["order_info_index"]); ?>"> <a href="<?php echo U('/order');?>"> 订单管理</a> </li>
		    
		     
	          </ul>
	        </li>
            <li class=" <?php echo ($ui["article"]); ?>"> <a href="javascript:;"> 
            <i class="icon-collapse"></i> <span class="title">文章管理</span> 
            <span class="selected "></span> </a>
		      <ul class="sub-menu">
		        <li class="<?php echo ($ui["article_index"]); ?>"> <a href="<?php echo U('/article');?>"> 文章管理</a> </li> 
	          </ul>
	        </li>
		    <li class="<?php echo ($ui["File_index"]); ?>"> <a href="javascript:;"> <i class="icon-gift"></i> 
            <span class="title">系统素材管理</span> <span class="selected "></span> </a>
		      <ul class="sub-menu">
		    <li class="<?php if(($filetype) == "0"): echo ($ui["File_index"]); endif; ?>"><a href="/adminc.php?c=File&a=index&filetype=0" ><i class="fa "></i>背景素材</a></li>
		    <li class="<?php if(($filetype) == "1"): echo ($ui["File_index"]); endif; ?>"><a href="/adminc.php?c=File&a=index&filetype=1" ><i class="fa "></i>图片素材</a></li>
		    <li class="<?php if(($filetype) == "2"): echo ($ui["File_index"]); endif; ?>"><a href="/adminc.php?c=File&a=index&filetype=2" ><i class="fa "></i>音乐素材</a></li>
                    <li class="<?php if((ACTION_NAME) == "pagesys"): echo ($ui["File_index"]); endif; ?>"><a href="/adminc.php?c=Scene&a=pagesys"><i class="fa "></i>单页模板</a></li>
	          </ul>
	        </li>
            
            
            
            <li class="<?php echo ($ui["userancs"]); ?>"> <a href="javascript:;"> <i class="icon-gift"></i> 
            <span class="title">用户素材管理</span> <span class="selected "></span> </a>
		      <ul class="sub-menu">
		    <li class="<?php if(($filetype) == "0"): echo ($ui["File_index"]); endif; ?>"><a href="/adminc.php?c=File&a=userancs&filetype=0" ><i class="fa "></i>背景素材</a></li>
		    <li class="<?php if(($filetype) == "1"): echo ($ui["File_index"]); endif; ?>"><a href="/adminc.php?c=File&a=userancs&filetype=1" ><i class="fa "></i>图标素材</a></li>
		    <li class="<?php if(($filetype) == "2"): echo ($ui["File_index"]); endif; ?>"><a href="/adminc.php?c=File&a=userancs&filetype=2" ><i class="fa "></i>音乐素材</a></li>
	   
	          </ul>
	        </li>
            
            
              <li class="<?php echo ($ui["cate"]); echo ($ui["tag_index"]); ?>"> <a href="javascript:;"> 
            <i class="icon-briefcase"></i> 
            <span class="title">系统分类管理</span> <span class="selected "></span> </a>
		      <ul class="sub-menu">          
              
                 <li  class="<?php if(($type) == "tpType"): echo ($ui["cate_index"]); endif; ?>"><a href="/adminc.php?c=cate&filetype=tpType" >图片分类</a></li>
					 <li class="<?php if(($type) == "bgType"): echo ($ui["cate_index"]); endif; ?>"><a href="/adminc.php?c=cate&filetype=bgType"  >背景分类</a></li>
					 <li class="<?php if(($type) == "musType"): echo ($ui["cate_index"]); endif; ?>"><a href="/adminc.php?c=cate&filetype=musType" >音乐分类</a></li>
				 <li class="<?php if(($type) == "scene_type"): echo ($ui["cate_index"]); endif; ?>"><a href="/adminc.php?c=cate&filetype=scene_type">场景分类</a></li> 
                 <?php if(C('VI_SCENECODE')): ?>
                 <li class="<?php if(($type) == "mytpl_type"): echo ($ui["cate_index"]); endif; ?>"><a href="/adminc.php?c=cate&filetype=mytpl_type">模板分类</a></li>     <?php endif; ?>
	          </ul>
	        </li>
            
            
              <li class="<?php echo ($ui["Database"]); ?>"> 
            <a href="javascript:;"> <i class="icon-cogs"></i> <span class="title">数据库备份</span> 
             <span class="selected "></span> </a>
		      <ul class="sub-menu">
               <li class=""> <a href="<?php echo U('/Database/index/type/export');?>"> 数据库备份</a> </li>
                <li class=""> <a href="<?php echo U('/Database/index/type/import');?>"> 数据库还原</a> </li>

	          </ul>
	        </li>
            
            
                     <li class="<?php echo ($ui["Ad_msgList"]); echo ($ui["Ad_msgadd"]); echo ($ui["ad_friendlinks"]); ?>"> <a href="javascript:;"> 
             <i class="icon-bookmark-empty"></i>  <span class="title">公告&友情链接</span> 
             <span class="selected "></span> </a>
		      <ul class="sub-menu">
               <li class="<?php echo ($ui["Ad_msgList"]); ?>"> <a href="<?php echo U('/Ad/msglist');?>"> 公告管理</a> </li>
                <li class="<?php echo ($ui["Ad_msgadd"]); ?>"> <a href="<?php echo U('/Ad/msgadd');?>"> 新增公告</a> </li>
     		   <li class="<?php echo ($ui["ad_friendlinks"]); ?>"> <a href="<?php echo U('Ad/friendlinks');?>"> 友情链接管理</a> </li>

		    
	          </ul>
	        </li>
            <li class="<?php echo ($ui["Ad_index"]); echo ($ui["Ad_d"]); echo ($ui["Ad_adsense"]); ?>"> <a href="javascript:;"> 
             <i class="icon-bookmark-empty"></i>  <span class="title">首页图片管理</span> 
             <span class="selected "></span> </a>
		      <ul class="sub-menu">
              
                <li class="<?php echo ($ui["Ad_index"]); ?>"> <a href="<?php echo U('/Ad/index');?>"> 广告图片管理</a> </li>
 				<li class="<?php echo ($ui["Ad_d"]); ?>"> <a href="<?php echo U('/Ad/add');?>"> 新增广告</a> </li>
 				<li class="<?php echo ($ui["Ad_adsense"]); ?>"> <a href="<?php echo U('/Ad/adsense');?>"> 广告位管理</a> </li>
		    
	          </ul>
	        </li>
            <li class="<?php echo ($ui["Ad_bg"]); ?>"> <a href="javascript:;"> 
             <i class="icon-bookmark-empty"></i>  <span class="title">课程预览</span> 
             <span class="selected "></span> </a>
		      <ul class="sub-menu">
              
                <li class="<?php echo ($ui["Ad_bg"]); ?>"> <a href="<?php echo U('/Ad/bg');?>"> 背景图管理</a> </li>
		    
	          </ul>
	        </li>
			 
		    
		
		  
	      </ul>
		  <!-- END SIDEBAR MENU -->
</div>
		<!-- END BEGIN HORIZONTAL MENU PAGE SIDEBAR -->

		<!-- BEGIN PAGE -->

		<div class="page-content">

			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM--><!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
  
    
            	<script src="http://www.vxuebao.com/Public/media/js/jquery-1.10.1.min.js" type="text/javascript"></script>
                <style>
                  div.radio input {
opacity: 11;}
.radio input[type="radio"], .checkbox input[type="checkbox"] {
	margin-left: 0 !important;}</style>


<div class="container-fluid">
				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">系统管理 <small>    System management</small></h3>

						<ul class="breadcrumb">
							<li><i class="icon-home"></i><a href="index.html">首页</a> 
								<i class="icon-angle-right"></i></li>

							<li><a href="#">系统管理</a><i class="icon-angle-right"></i></li>
							<li><a href="#">网站信息设置</a></li>
						</ul>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>

				<!-- END PAGE HEADER-->
                <div class="tabbable tabbable-custom tabbable-full-width">
							<ul class="nav nav-tabs">
				<li class="<?php echo ($ui["sys_set"]); ?>"><a href="<?php echo U('sys/set');?>">网站信息设置</a></li>
<li class="<?php echo ($ui["sys_homeset"]); ?>"><a href="<?php echo U('sys/homeset');?>">首页配置</a></li>
<?php if(C('sys_link_arr')): ?> <li class="<?php echo ($ui["sys_scenelink"]); ?>"><a href="<?php echo U('sys/scenelink');?>">相关状态微课</a></li> <?php endif; ?> 
<li class="<?php echo ($ui["sys_pay"]); ?>"><a href="<?php echo U('sys/pay');?>">支付配置</a></li>
<li class="<?php echo ($ui["otherlogin"]); ?>"><a href="<?php echo U('sys/otherlogin');?>">第三方登录</a></li>
<li class="<?php echo ($ui["sys_setmail"]); ?>"><a href="<?php echo U('sys/setmail');?>">邮件服务器</a></li>
<li class="<?php echo ($ui["sys_wxapi"]); ?>"><a href="<?php echo U('sys/wxapi');?>">SDK分享</a></li>
<li class="<?php echo ($ui["Database"]); ?>"> <a href="<?php echo U('/Database/index/type/export');?>"> 数据备份</a> </li>
<li class="<?php echo ($ui["Open"]); ?>"> <a href="<?php echo U('Open/index');?>"> 开放接口管理</a> </li>
<li class="<?php echo ($ui["appsystem"]); ?>"> <a href="<?php echo U('Open/appsystem');?>"> APP系统参数设置</a> </li>
							</ul>
                            <hr>
                </div>
				<!-- BEGIN PAGE CONTENT-->          
				<div class="row-fluid">
					<div class="span12 ">
						<!-- BEGIN EXAMPLE TABLE PORTLET-->
							<div class="portlet-body">

       <form action="" method="post" class="form-horizontal">
     
            <table style="vertical-align: top;">
                <tr>
                    <td height="48" align="right">网站名称 :</td>
                    <td>
                  <input name="site_name" type="text" value="<?php echo (C("site_name")); ?>" /><span>&nbsp;&nbsp;例：微学宝</span>
                    </td>
                </tr>
         <tr> 
      <td   align="right">网站地址：</td>
      <td><input type="text" name="site_url" value="<?php echo (C("site_url")); ?>" <span>&nbsp;&nbsp;例:http://e.wesambo.com</span></td>
    </tr>  
                   <tr>
                    <td  align="right">网站标题:</td>
                    <td><input name="site_title" type="text" value="<?php echo (C("site_title")); ?>" /><span>&nbsp;&nbsp;一般不超过80个字符</span> </td>
                </tr>  
                <tr>
                    <td  align="right" > 关键词   :  </td>
                    <td>  <input name="keyword" type="text" value="<?php echo (C("keyword")); ?>" style="width: 200px;"><span>&nbsp;&nbsp;一般不超过100个字符</span></td>
                </tr>
                <tr>
                    <td  align="right">描述 :</td>
                    <td><textarea name="content" style="width:450px;height:60px;margin:5px 0 5px 0;"><?php echo (C("content")); ?></textarea> <span>&nbsp;&nbsp;一般不超过200个字符</span></td>
                </tr>
				<tr>
				
                    <td height="48" align="right">前台模板选择:</td>
					
                    <td>
					<div class="controls">
                  
														<label class="radio">
														<div class="radio"><span class="checked">
                  <input id="s_0" type="radio" name="web_muban_status" value="1" <?php if(C('web_muban_status')=="1"): ?>   checked='checked'  <?php endif; ?> /><label for="s_0">
                                                        </span></div>官方
														</label>
														<label class="radio">
														<div class="radio"><span class="">
                <input id="s_1" type="radio"   name="web_muban_status" value="2" <?php if(C('web_muban_status')=="2"): ?>   checked='checked'  <?php endif; ?> /><label for="s_1">
                                                        </span></div>微学宝
														</label>  
														<label class="radio">
														<div class="radio"><span class="">
                <input id="s_1" type="radio"   name="web_muban_status" value="3" <?php if(C('web_muban_status')=="3"): ?>   checked='checked'  <?php endif; ?> /><label for="s_1">
                                                        </span></div>70c
														</label> 

				</div>
												
                  </td>
                </tr> 
				
				
     <tr> 
	 
      <td  align="right">JS调用：</td>
      <td>
      
                    <div class="controls">
														<label class="radio">
														<div class="radio"><span class="checked">
                  <input id="p_0" type="radio" name="js_local_or_remote" value="local" <?php if(C('js_local_or_remote')=="local"): ?>   checked='checked'  <?php endif; ?> /><label for="p_0">
                                                        </span></div>
调用本地
														</label>
														<label class="radio">
														<div class="radio"><span class="">
                <input id="p_1" type="radio"   name="js_local_or_remote" value="remote" <?php if(C('js_local_or_remote')=="remote"): ?>   checked='checked'  <?php endif; ?> /><label for="p_1">
                                                        </span></div>
调用cdn
														</label>  


													</div>
      
        
      </td>
    </tr> 
       
       <tr> 
      <td  align="right">是否开启会员注册：</td>
      <td>
      
                    <div class="controls">
														<label class="radio">
														<div class="radio"><span class="checked">
                  <input id="ctl00_ContentPlaceHolder1_rdiIsEnable_help_0" type="radio" name="is_open_reg" value="1" <?php if(C('is_open_reg')==1): ?>   checked='checked'  <?php endif; ?> /><label for="ctl00_ContentPlaceHolder1_rdiIsEnable_help_0">
                                                        </span></div>
开启
														</label>
														<label class="radio">
														<div class="radio"><span class="">
                <input id="ctl00_ContentPlaceHolder1_rdiIsEnable_help_1" type="radio"   name="is_open_reg" value="0" <?php if(C('is_open_reg')==0): ?>   checked='checked'  <?php endif; ?> /><label for="ctl00_ContentPlaceHolder1_rdiIsEnable_help_1">
                                                        </span></div>
关闭
														</label>  


													</div>
      
        
      </td>
    </tr> 
    <tr> 
      <td  align="right">是否开启用户案例审核：</td>
      <td>
      
                    <div class="controls">
														<label class="radio">
														<div class="radio"><span class="checked">
                  <input id="ctl00__0" type="radio" name="is_user_anli_shenghe" value="1" <?php if(C('is_user_anli_shenghe')==1): ?>   checked='checked'  <?php endif; ?> /><label for="ctl00__0">
                                                        </span></div>
开启
														</label>
														<label class="radio">
														<div class="radio"><span class="">
                <input id="ctl00__1" type="radio"   name="is_user_anli_shenghe" value="0" <?php if(C('is_user_anli_shenghe')==0): ?>   checked='checked'  <?php endif; ?> /><label for="ctl00__1">
                                                        </span></div>
关闭
														</label>  


													</div>
      
        
      <span></span></td>
    </tr>          
    <tr> 
      <td  align="right">注册后使用天数：</td>
      <td><input type="text" name="reg_validdays" value="<?php echo (C("reg_validdays")); ?>"/><span>&nbsp;&nbsp;注册后多少天过期(仅注册不需要审核的时候有效)</span></td>
    </tr> 
    
       <tr> 
      <td  align="right">注册默认用户制作微课数：</td>
      <td><input type="text" name="allow_nums" value="<?php echo (C("allow_nums")); ?>"/><span></span></td>
    </tr> 
    
       <tr> 
      <td  align="right">注册送微币：</td>
      <td><input type="text" name="xd" value="<?php echo (C("xd")); ?>"/><span>&nbsp;&nbsp;注册送微币(200点为一个微课)</span></td>
    </tr> 

    
    
     <tr> 
      <td  align="right">尾页版权文字 ：</td>
      <td><input type="text" name="lastpagetext" value="<?php echo (C("lastpagetext")); ?>" style="width:120px"/><span>&nbsp;&nbsp;例：微学宝</span> &nbsp;&nbsp;
      <input type="text" id="lastpagetext_color" name="lastpagetext_color" style="width:120px" value="<?php echo (C("lastpagetext_color")); ?>" data-color-format="rgba"/> 
<span> 默认：#23a3d3 </span></td>
    </tr>
     <tr> 
      <td  align="right">尾页版权链接 ：</td>
      <td><input type="text" name="lastpagelink" value="<?php echo (C("lastpagelink")); ?>"/><span>&nbsp;&nbsp;例：http://e.wesambo.com</span></td>
    </tr> <tr> 
      <td  align="right">尾页举报链接 ：</td>
      <td><input type="text" name="jubao_link" value="<?php echo (C("jubao_link")); ?>"/><span>&nbsp;&nbsp;例：http://wpa.qq.com/msgrd?v=3&uin=1430566311&site=qq&menu=yes 或 http://e.wesambo.com/v-U607W92SM7</span></td>
    </tr>
    
     <tr> 
      <td  align="right">固定底标消耗微币：</td>
      <td><input type="text" name="guding_qi_xd" value="<?php echo (C("guding_qi_xd")); ?>"/><span>&nbsp;&nbsp;例：15</span></td>
    </tr>
    <tr> 
      <td  align="right">自定义底标消耗微币：</td>
      <td><input type="text" name="custome_qi_xd" value="<?php echo (C("custome_qi_xd")); ?>"/><span>&nbsp;&nbsp;例：30</span></td>
    </tr>
      <tr> 
      <td  align="right">完全去除广告消耗微币：</td>
      <td><input type="text" name="qi_ad_xds" value="<?php echo (C("qi_ad_xds")); ?>"/><span>&nbsp;&nbsp;例：100</span></td>
    </tr>
       <tr> 
      <td  align="right">加载logo消耗微币：</td>
      <td><input type="text" name="loadingLogo_qi_xd" value="<?php echo (C("loadingLogo_qi_xd")); ?>"/><span>&nbsp;&nbsp;例：100</span></td>
    </tr>

    	<tr> 
      <td  align="right">网站备案：</td>
      <td><input type="text" name="ipc" value="<?php echo (C("ipc")); ?>"/><span>&nbsp;&nbsp;例：京IPC备888888号</span></td>
    </tr>
    	<tr> 
      <td   align="right"><strong>统计代码：</strong></td>
      <td><textarea	 type="text" name="countCode" class="ipt" style="width:450px;height:60px;margin:5px 0 5px 0;" /><?php echo ($countCode); ?></textarea><span>&nbsp;&nbsp;例:51啦统计,cnzz统计</span></td>
    </tr>
            </table>
            
            
            
            <div class="form-actions">
<input type="hidden" name="files" value="info.php" /> 
													<button type="submit" class="btn blue"><i class="icon-ok"></i> 保存</button>

													<button type="button" class="btn">放弃</button>

												</div>
         
       
        </form>
        
    </div>
 
     </div>
        </div>
        <style type="text/css">
		.form-horizontal .controls{ margin-left:0}
		</style>
 

  <link href="/Public/media/css/colorpicker.css" rel="stylesheet">
 <script type="text/javascript">   
 $(function () {
 $('#eq_main_bg').colorpicker({
				format: 'hex'
			});
			$('#main_info_bg').colorpicker({
				format: 'hex'
			});
			$('#header_tpl_hover_bg').colorpicker({
				format: 'hex'
			}); 
$('#creat_head').colorpicker({
				format: 'hex'
			});
			$('#lastpagetext_color').colorpicker({
				format: 'hex'
			});
$('#create-bg').colorpicker({
				format: 'hex'
			});		 
	 
    });  </script>
   

  

</div></div>
<div class="footer">

		<div class="footer-inner">

			<?php echo date('Y');?> (c) <?php echo C('site_name');?> <?php echo C('site_url');?> 版权所有

		</div>

		<div class="footer-tools">

			<span class="go-top">

			<i class="icon-angle-up"></i>

			</span>

		</div>

	</div>



	<script src="http://www.vxuebao.com/Public/media/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<script src="http://www.vxuebao.com/Public/media/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      
	<script src="http://www.vxuebao.com/Public/media/js/bootstrap.min.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
	<script src="http://www.vxuebao.com/Public/media/js/excanvas.min.js"></script>
	<script src="http://www.vxuebao.com/Public/media/js/respond.min.js"></script>  
	<![endif]-->   
    <script src="http://www.vxuebao.com/Public/media/js/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="http://www.vxuebao.com/Public/media/js/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="http://www.vxuebao.com/Public/media/js/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="http://www.vxuebao.com/Public/media/js/jquery.uniform.min.js" type="text/javascript" ></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/ckeditor.js"></script>  
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/bootstrap-fileupload.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/select2.min.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/wysihtml5-0.3.0.js"></script> 
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/bootstrap-wysihtml5.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/jquery.tagsinput.min.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/jquery.toggle.buttons.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/clockface.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/date.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/daterangepicker.js"></script> 
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/bootstrap-colorpicker.js"></script>  
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/bootstrap-timepicker.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/jquery.inputmask.bundle.min.js"></script>   
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/jquery.input-ip-address-control-1.0.min.js"></script>
	<script type="text/javascript" src="http://www.vxuebao.com/Public/media/js/jquery.multi-select.js"></script>   
	<script src="http://www.vxuebao.com/Public/media/js/bootstrap-modal.js" type="text/javascript" ></script>
	<script src="http://www.vxuebao.com/Public/media/js/bootstrap-modalmanager.js" type="text/javascript" ></script> 
	<!-- END PAGE LEVEL PLUGINS -->
	<script src="http://www.vxuebao.com/Public/media/js/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="http://www.vxuebao.com/Public/media/js/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="http://www.vxuebao.com/Public/media/js/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="http://www.vxuebao.com/Public/media/js/jquery.uniform.min.js" type="text/javascript" ></script>
	<!-- END CORE PLUGINS -->
	<script src="http://www.vxuebao.com/Public/media/js/app.js"></script>      
    

<script>
		jQuery(document).ready(function() {    
		   App.init();
		});
	</script>
	<!-- END JAVASCRIPTS -->
 
</body>

<!-- END BODY -->

</html>