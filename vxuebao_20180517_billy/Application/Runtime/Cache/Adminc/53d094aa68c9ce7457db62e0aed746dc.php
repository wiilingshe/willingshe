<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
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

	<!-- END GLOBAL MANDATORY STYLES -->
	<!-- BEGIN PAGE LEVEL STYLES --> 
	<link href="Public/media/css/jquery.fancybox.css" rel="stylesheet" />
	<link href="Public/media/css/chosen.css" rel="stylesheet" type="text/css"/>
<div class="container-fluid">
				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
                        <?php if($ui["userancs"] == 'active'): ?>用户<?php else: ?> 系统<?php endif; ?>
                        
							 <?php if(($flag) == "useranli"): else: ?> <?php if($filetype ==1): ?>图标<?php elseif($filetype ==2): ?>音乐 
<?php else: ?>背景
<?php endif; ?>素材列表<?php endif; ?> <small>   <?php if($ui["userancs"] == 'active'): ?>用户<?php else: ?> 系统<?php endif; if(($flag) == "useranli"): else: ?> <?php if($filetype ==1): ?>图标<?php elseif($filetype ==2): ?>音乐 
<?php else: ?>背景
<?php endif; ?>素材列表<?php endif; ?></small>
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="index.html">首页</a> 
								<i class="icon-angle-right"></i>
							</li>
							<li>
								<a href="#">素材管理</a>
								<i class="icon-angle-right"></i>
							</li>
							<li><a href="#"> <?php if($ui["userancs"] == 'active'): ?>用户<?php else: ?> 系统<?php endif; if(($flag) == "useranli"): else: ?> <?php if($filetype ==1): ?>图标<?php elseif($filetype ==2): ?>音乐 
<?php else: ?>背景
<?php endif; ?>素材列表<?php endif; ?></a></li>
						</ul>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
       
<?php if($filetype == 1): ?><!-- BEGIN PAGE CONTENT-->
				<div class="row-fluid">
					<div class="tabbable tabbable-custom tabbable-full-width">
                      <?php if($ui["File_index"] == 'active'): ?><ul class="nav nav-tabs">
                        <?php if(($flag) == "useranli"): ?><li class="<?php if(($fnid) == ""): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/index/flag/useranli/0');?>" >全部</a></li>
                            <li class="<?php if(($fnid) == "106"): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/106');?>" >图标</a></li>
							<li class="<?php if(($fnid) == "107"): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/107');?>" >动画</a></li>
							<li class="<?php if(($fnid) == "105"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/105');?>">节日</a></li>
							<li class="<?php if(($fnid) == "103"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/103');?>">风格</a></li>
							<li class="<?php if(($fnid) == "102"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/102');?>">企业</a></li>
							<li class="<?php if(($fnid) == "101"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/101');?>">行业</a></li>
                            <li class="<?php if(($fnid) == "104"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/104');?>">个人</a></li>
                            <li class="<?php if(($fnid) == "32"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/32');?>">讲解员</a></li>
                            <li class="<?php if(($fnid) == "33"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/33');?>">对话气泡</a></li>
                             <li class="<?php if(($fnid) == "34"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/34');?>">按钮</a></li>
                             <li class="<?php if(($fnid) == "35"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/1/fnid/35');?>">微信</a></li>

                            <?php else: ?> 
                            <li class="<?php if(($fnid) == ""): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/index/filetype/1');?>" >全部</a></li>
                            <li class="<?php if(($fnid) == "106"): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/lists/filetype/1/fnid/106');?>" >图标</a></li>
                            <li class="<?php if(($fnid) == "107"): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/lists/filetype/1/fnid/107');?>" >动画</a></li>
							<li class="<?php if(($fnid) == "105"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/1/fnid/105');?>">节日</a></li>
							<li class="<?php if(($fnid) == "103"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/1/fnid/103');?>">风格</a></li>
							<li class="<?php if(($fnid) == "102"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/1/fnid/102');?>">企业</a></li>
							<li class="<?php if(($fnid) == "101"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/1/fnid/101');?>">行业</a></li>
                            <li class="<?php if(($fnid) == "104"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/1/fnid/104');?>">个人</a></li> 
                            <li class="<?php if(($fnid) == "32"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/1/fnid/32');?>">讲解员</a></li>
                            <li class="<?php if(($fnid) == "33"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/1/fnid/33');?>">对话气泡</a></li>
                            <li class="<?php if(($fnid) == "34"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/1/fnid/34');?>">按钮</a></li>
                            <li class="<?php if(($fnid) == "35"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/1/fnid/35');?>">微信</a></li><?php endif; ?>
						</ul>
                       <hr> 
                         <a href="?c=File&a=add&filetype=<?php echo ($filetype); ?>" class="btn green"><i class="icon-plus"></i> 添加背景素材</a>
                          <?php else: endif; ?>
                        </div>
					</div><form action="?c=File&a=delselect&filetype=<?php echo ($filetype); ?>" method="post">
                         <?php if(is_array($select)): foreach($select as $key=>$item): ?><div class="span1" style=" min-width:140px;">
										<div class="item" style="width:110px;">
	<a class="fancybox-button" data-rel="fancybox-button" title="图片ID：<?php echo ($item["fileid_bigint"]); ?>，添加时间：<?php echo ($item["create_time"]); ?>，文件类型：<?php echo ($item["ext_varchar"]); ?>" href="/Uploads/<?php echo ($item["filesrc_varchar"]); ?>">
												<div class="zoom">
													<img src="/Uploads/<?php echo ($item["filethumbsrc_varchar"]); ?>" alt="Photo" style="width:110px; height:110px" style="border-color:#CCC">                    
													<div class="zoom-icon"></div>
												</div>
											</a>
											<div class="details">
	  <?php if($ui["File_index"] == 'active'): ?><a href="/Uploads/<?php echo ($item["filesrc_varchar"]); ?>" class="icon"  target="_blank"><i class="icon-link"></i></a>
		<a href="?c=File&a=e&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>&p=<?php echo $_GET['p']?>" class="icon"><i class="icon-pencil"></i></a>
		<a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["filename_varchar"]); ?>]吗？')) window.location='?c=File&a=del&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>&p=<?php echo $_GET['p']?>'" class="icon"><i class="icon-remove"></i></a> 
 <?php else: ?>
 <a href="/Uploads/<?php echo ($item["filesrc_varchar"]); ?>" class="icon" title="查看链接地址" target="_blank"><i class="icon-link"></i></a>
 <a href="?c=File&a=userancs_e&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>" class="icon"><i class="icon-pencil"></i></a>
		<a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["filename_varchar"]); ?>]吗？')) window.location='?c=File&a=userancs_del&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>&p=<?php echo $_GET['p']?>'" class="icon"><i class="icon-remove"></i></a><?php endif; ?>  
 

											</div>
											<div align="center"><input name="id[]" type="checkbox" value="<?php echo ($item["fileid_bigint"]); ?>" /></div>
										</div>
									</div><?php endforeach; endif; ?>
						  
                          <input name="提交" type="submit" value="删除所选" />
                          </form>




	
         




<?php elseif($filetype == 2): ?>
				<!-- END PAGE HEADER-->
                 <?php if($ui["File_index"] == 'active'): ?><a href="?c=File&a=add&filetype=<?php echo ($filetype); ?>" class="btn green"><i class="icon-plus"></i> 添加背景音乐</a>  <?php else: endif; ?>
             <div class="portlet-body" style=" margin-top:15px;"><form action="?c=File&a=delselect&filetype=<?php echo ($filetype); ?>" method="post">
														<table class="table table-striped table-bordered table-advance table-hover">
															<thead>
																<tr>
																	<th><i class="icon-briefcase"></i> ID</th>
                                                                     <th><i class="icon-bookmark"></i> 歌曲名</th>
                                                                     <th>类别</th>

																	<th class="hidden-phone"><i class="icon-question-sign"></i> 文件类型</th>

																	<th><i class="icon-bookmark"></i> 添加时间</th>
                                                                   
                                                                     <th><i class="icon-bookmark"></i> 操作</th>
																</tr>

															</thead>

															<tbody>
                                                            <?php if(is_array($select)): foreach($select as $key=>$item): ?><tr>
																	<td><input name="id[]" type="checkbox" value="<?php echo ($item["fileid_bigint"]); ?>" /><?php echo ($item["fileid_bigint"]); ?></td>
                                                                    <td><?php echo ($item["filename_varchar"]); ?></td>
                                                                    <td> <?php echo (getBiztypeCateName($item["biztype_int"])); ?></td>
                                                                    <td><span class="label label-success label-mini"><?php echo ($item["ext_varchar"]); ?></span></td>
																	<td class="hidden-phone"><audio src="/Uploads/<?php echo ($item["filesrc_varchar"]); ?>" controls></audio></td>
																	<td style="width:160px">
                   <?php if($ui["File_index"] == 'active'): ?><a href="?c=File&a=e&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>" class="btn blue"><i class=" icon-edit"></i> 编辑 </a>  
                <a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["filename_varchar"]); ?>]吗？')) window.location='?c=File&a=del&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>'" class="btn"> <i class="icon-remove icon-white"></i> 删除</a> <?php else: ?>
                
                <a href="?c=File&a=userancs_e&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>" class="btn blue"><i class=" icon-edit"></i> 编辑 </a>  
                <a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["filename_varchar"]); ?>]吗？')) window.location='?c=File&a=userancs_del&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>'" class="btn"> <i class="icon-remove icon-white"></i> 删除</a><?php endif; ?>  
                
                
                
                </td>
																</tr><?php endforeach; endif; ?>
															</tbody>
														</table><input name="提交" type="submit" value="删除所选" />
														</form>
													</div>   
                
                
                
                
                
                
                
                
			



	
         


<?php else: ?>
                
                
                
                
                
                
                
                
				<!-- BEGIN PAGE CONTENT-->
				<div class="row-fluid">
                
					<div class="tabbable tabbable-custom tabbable-full-width">
                   <?php if($ui["File_index"] == 'active'): ?><ul class="nav nav-tabs">
                        <?php if(($flag) == "useranli"): ?><li class="<?php if(($fnid) == ""): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/index/flag/useranli/0');?>" >全部</a></li>
							<li class="<?php if(($fnid) == "201"): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/lists/flag/useranli/filetype/0/fnid/201');?>" >行 业</a></li>
							<li class="<?php if(($fnid) == "202"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/0/fnid/202');?>">企业</a></li>
							<li class="<?php if(($fnid) == "204"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/0/fnid/204');?>">个人</a></li>
							<li class="<?php if(($fnid) == "205"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/0/fnid/205');?>">节日</a></li>
							<li class="<?php if(($fnid) == "203"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/flag/useranli/filetype/0/fnid/203');?>">风格</a></li>
                            <?php else: ?> 
                            <li class="<?php if(($fnid) == ""): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/index/filetype/0');?>" >全部</a></li>
                            <li class="<?php if(($fnid) == "201"): ?>active<?php endif; ?>"><a  href="<?php echo U('/File/lists/filetype/0/fnid/201');?>" >行 业</a></li>
							<li class="<?php if(($fnid) == "202"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/0/fnid/202');?>">企业</a></li>
							<li class="<?php if(($fnid) == "204"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/0/fnid/204');?>">个人</a></li>
							<li class="<?php if(($fnid) == "205"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/0/fnid/205');?>">节日</a></li>
							<li class="<?php if(($fnid) == "203"): ?>active<?php endif; ?>"><a href="<?php echo U('/File/lists/filetype/0/fnid/203');?>">风格</a></li><?php endif; ?>
						</ul>
                       <hr> 
                       
                       
                        
                       
                       
                       
                         <a href="?c=File&a=add&filetype=<?php echo ($filetype); ?>" class="btn green"><i class="icon-plus"></i> 添加背景素材</a>
                         <?php else: endif; ?>
                        </div>
					</div><form action="?c=File&a=delselect&filetype=<?php echo ($filetype); ?>" method="post">
                         <?php if(is_array($select)): foreach($select as $key=>$item): ?><div class="span1" style=" min-width:140px;">
										<div class="item" style="width:110px;">
											<a class="fancybox-button" data-rel="fancybox-button" title="图片ID：<?php echo ($item["fileid_bigint"]); ?>，添加时间：<?php echo ($item["create_time"]); ?>，文件类型：<?php echo ($item["ext_varchar"]); ?>" href="/Uploads/<?php echo ($item["filesrc_varchar"]); ?>">
												<div class="zoom">
													<img src="/Uploads/<?php echo ($item["filethumbsrc_varchar"]); ?>" alt="Photo" style="width:110px; height:160px">                    
													<div class="zoom-icon"></div>
												</div>
											</a>
										<div class="details">
                                            
         <?php if($ui["File_index"] == 'active'): ?><a href="/Uploads/<?php echo ($item["filesrc_varchar"]); ?>" class="icon"  target="_blank"><i class="icon-link"></i></a>
		<a href="?c=File&a=e&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>&p=<?php echo $_GET['p']?>" class="icon"><i class="icon-pencil"></i></a>
		<a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["filename_varchar"]); ?>]吗？')) window.location='?c=File&a=del&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>&p=<?php echo $_GET['p']?>'" class="icon"><i class="icon-remove"></i></a> 
 <?php else: ?>
 <a href="/Uploads/<?php echo ($item["filesrc_varchar"]); ?>" class="icon" title="查看链接地址" target="_blank"><i class="icon-link"></i></a>
 <a href="?c=File&a=userancs_e&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>" class="icon"><i class="icon-pencil"></i></a>
		<a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["filename_varchar"]); ?>]吗？')) window.location='?c=File&a=userancs_del&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($item["filetype_int"]); ?>&p=<?php echo $_GET['p']?>'" class="icon"><i class="icon-remove"></i></a><?php endif; ?>  
										  </div>
                                          <div align="center"><input name="id[]" type="checkbox" value="<?php echo ($item["fileid_bigint"]); ?>" /></div>
										</div>
						   </div><?php endforeach; endif; ?>
						  <input name="提交" type="submit" value="删除所选" />
                          </form><?php endif; ?>
                     
                
        


<div class="row-fluid">
<div class="span12">
<div class="pagination pull-right">
<div class="pages">
                        <?php echo ($page); ?>
                </div>
</div>
</div>
</div>
         
</div>
</div>

<div class="footer">

		<div class="footer-inner">

			2015 (c) 微学宝 www.vxuebao.com 版权所有

		</div>

		<div class="footer-tools">

			<span class="go-top">

			<i class="icon-angle-up"></i>

			</span>

		</div>

	</div>
<script src="Public/media/js/jquery-1.10.1.min.js" type="text/javascript"></script>

	<script src="Public/media/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>

	<!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->

	<script src="Public/media/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      

	<script src="Public/media/js/bootstrap.min.js" type="text/javascript"></script>

	<!--[if lt IE 9]>

	<script src="Public/media/js/excanvas.min.js"></script>

	<script src="Public/media/js/respond.min.js"></script>  

	<![endif]-->   

	<script src="Public/media/js/jquery.slimscroll.min.js" type="text/javascript"></script>

	<script src="Public/media/js/jquery.blockui.min.js" type="text/javascript"></script>  

	<script src="Public/media/js/jquery.cookie.min.js" type="text/javascript"></script>

	<script src="Public/media/js/jquery.uniform.min.js" type="text/javascript" ></script>

	<!-- END CORE PLUGINS -->

	<!-- BEGIN PAGE LEVEL PLUGINS -->

	<script src="Public/media/js/jquery.fancybox.pack.js"></script>   

	<script type="text/javascript" src="Public/media/js/chosen.jquery.min.js"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="Public/media/js/app.js"></script>   

	<script src="Public/media/js/gallery.js"></script>  

	<!-- END PAGE LEVEL SCRIPTS -->




<script>

		jQuery(document).ready(function() {       

		   // initiate layout and plugins

		   App.init();

		   Gallery.init();

		});

	</script>

	<!-- END JAVASCRIPTS -->

<script type="text/javascript">  var _gaq = _gaq || [];  _gaq.push(['_setAccount', 'UA-37564768-1']);  _gaq.push(['_setDomainName', 'keenthemes.com']);  _gaq.push(['_setAllowLinker', true]);  _gaq.push(['_trackPageview']);  (function() {    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  })();</script></body>

<!-- END BODY -->

</html>