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

<div class="container-fluid">
				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
							<?php echo ($title); ?> <small> <?php echo ($title); ?>列表 </small>
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="index.html">首页</a> 
								<i class="icon-angle-right"></i>
							</li>
							<li>
								<a href="#"><?php echo ($title); ?>管理</a>
								<i class="icon-angle-right"></i>
							</li>
							<li><a href="#"><?php echo ($title); ?>列表</a></li>
						</ul>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<!-- BEGIN PAGE CONTENT-->
				<div class="row-fluid">
					<div class="tabbable tabbable-custom tabbable-full-width">
						<ul class="nav nav-tabs">
                            <li class="<?php if(($biztype_int) == "0"): ?>active<?php endif; ?>"><a  href="/adminc.php?c=scene&a=index&apply=<?php echo ($apply); ?>&flag=<?php echo ($flag); ?>" >全部</a></li>
							<?php if(is_array($scene_type_list)): foreach($scene_type_list as $key=>$item): ?><li class="<?php if(($item['value']) == $biztype_int): ?>active<?php endif; ?>"><a href="?c=scene&a=index&apply=<?php echo ($apply); ?>&flag=<?php echo ($flag); ?>&biztype_int=<?php echo ($item["value"]); ?>"><?php echo ($item["name"]); ?></a></li><?php endforeach; endif; ?> 
							<?php if(($flag) == "sysmb"): ?><li><a href="<?php echo U('scene/sceneimport');?>" style="color:#FF0000">导入模板</a></li><?php endif; ?>
						</ul>
                        </div>
                        
                        
						<div class="tab-content">
                            <div class="row-fluid search-forms search-default">
									<form class="form-search" action="#" method="post" id="form">
										<div class="chat-form">
											<div class="input-cont">   
                                            <select name="field" style="width:120px">
             <option value="scenename_varchar"  <?php if(($field) == "scenename_varchar"): ?>selected="selected"<?php endif; ?>>名称</option>
              <option value="scenecode_varchar"  <?php if(($field) == "scenecode_varchar"): ?>selected="selected"<?php endif; ?>>编码</option>
            </select>
<input type="text"  name="keyword"  placeholder="请输入关键词..." class="m-wrap" value="<?php echo ($keyword); ?>" style="width:200px; height:30px">
<select id="scenetypeB" name="biztype_int" onChange="changeSceneType()" style="width:120px" >
<option value="">请选择</option>
                        <?php if(is_array($scene_type_list)): foreach($scene_type_list as $key=>$item): ?><option value="<?php echo ($item["value"]); ?>" <?php if(($item[value]) == $biztype_int): ?>selected="selected"<?php endif; ?>><?php echo ($item["name"]); ?></option><?php endforeach; endif; ?>                     
                       
                       </select>- 
                       <select  id="scenetypeS" name="tagid_int" style="width:120px" >
                        <option value="">请选择</option>
                        <?php if(is_array($scene_type_list2)): foreach($scene_type_list2 as $key=>$item): ?><option value="<?php echo ($item["tagid_int"]); ?>" <?php if(($item[tagid_int]) == $tagid_int): ?>selected="selected"<?php endif; ?>><?php echo ($item["name_varchar"]); ?></option><?php endforeach; endif; ?>     
                       </select>
             <select name="apply" style="width:120px" >
              <option value="">选择审核状态</option>
              <option <?php if(($apply) == "0"): ?>selected="selected"<?php endif; ?> value="0">未审核</option>
			  <option <?php if(($apply) == "1"): ?>selected="selected"<?php endif; ?> value="1">待审核</option>
              <option <?php if(($apply) == "2"): ?>selected="selected"<?php endif; ?> value="2">审核通过</option>
              <option <?php if(($apply) == "-1"): ?>selected="selected"<?php endif; ?> value="-1">审核未通过</option> 
             </select>   
             
             <select name="islongpage" style="width:120px" >
              <option value="">页面类型</option>
              <option <?php if(($islongpage) == "0"): ?>selected="selected"<?php endif; ?> value="0">短页面</option>
			  <option <?php if(($islongpage) == "1"): ?>selected="selected"<?php endif; ?> value="1">长图文</option>
             </select>   

<button type="submit" class="page_btn btn green" style=" ">搜 索 &nbsp; <i class="m-icon-swapright m-icon-white"></i></button>
											</div>


										</div>
									</form>
								</div>
                                
                                
                    
                       
                  <form name="myform" action="" method="post" target="_blank">
                        <?php if(is_array($select)): foreach($select as $key=>$item): ?><div class="row-fluid portfolio-block">
									<span class="span1"><?php if(($flag) == "sysmb"): ?><input name="id[]" type="checkbox" value="<?php echo ($item["sceneid_bigint"]); ?>" /><?php endif; echo ($item["sceneid_bigint"]); ?></span>
									<div class="span4 portfolio-text">
										<img src="/Uploads/<?php echo ($item["thumbnail_varchar"]); ?>" class="" style="width:112px; height:112px">
                                        
                <img src="http://qr.liantu.com/api.php?bg=f3f3f3&fg=333333&gc=222222&el=l&w=112&m=5&text=http://<?php echo ($_SERVER['HTTP_HOST']); ?>/v-<?php echo ($item["scenecode_varchar"]); ?>"/>                        

										<div class="portfolio-text-info">
                                            <h4> <a href="/?c=view&id=<?php echo ($item["sceneid_bigint"]); ?>" target="_blank"><?php echo ((isset($item["scenename_varchar"]) && ($item["scenename_varchar"] !== ""))?($item["scenename_varchar"]):'未设置'); ?></a></h4>
											<p>添加时间：<span> <?php echo ($item["createtime_time"]); ?></span></p>
<p>
类别： 
<code>  <?php echo (getSceneType("scene_type",$item["scenetype_int"])); ?>- <?php echo (getSceneTag($item["tagid_int"])); ?></code>&nbsp;，翻页方式: <code><?php echo (getPageMode($item["movietype_int"])); ?></code></p>
								<p>制作者： <?php echo ($item["email_varchar"]); ?> 类型：<?php if($item["islongpage"] == 1): ?>长图文<?php else: ?>
																短页面<?php endif; ?></p>
									  </div>

						  </div>

									<div class="span5">
														<?php if($flag == 'all' ): ?><div class="portfolio-info">审核系统模板
																<p>
																<a title="点击更改审核状态"  href="javascript:;"  onclick="shenheApply(<?php echo ($item["sceneid_bigint"]); ?>,'sysmb',this)" class="btn purple-stripe">
																<?php if($item["applytemplate"] == 2): ?>审核通过
																<?php elseif($item['applytemplate'] == 1): ?>
																等待审核
																<?php elseif($item['applytemplate'] == -1): ?>
																拒绝
																<?php else: ?>
																未审核<?php endif; ?>
																</a>
															   </p>
															  <p>使用<?php echo ($item["usecount_int"]); ?>次</p>
															</div>
															
															<div class="portfolio-info">审核设计师案例
																<p>
																<a title="点击更改审核状态"  href="javascript:;"  onclick="shenheApply(<?php echo ($item["sceneid_bigint"]); ?>,'designer',this)" class="btn purple-stripe">
																<?php if($item['applypromotion'] == 2): ?>审核通过
																<?php elseif($item['applypromotion'] == 1): ?>
																等待审核
																<?php elseif($item['applypromotion'] == -1): ?>
																拒绝
																<?php else: ?>
																未审核<?php endif; ?>
																</a>
															   </p>
															  <p>使用<?php echo ($item["usecount_int"]); ?>次</p>
															</div>
															<div class="portfolio-info">审核首页推荐
																	<p>
																	<a title="点击更改审核状态"  href="javascript:;"  onclick="shenheApply(<?php echo ($item["sceneid_bigint"]); ?>,'indextj',this)" class="btn purple-stripe">
																	<?php if($item['applyindex'] == 2): ?>审核通过
																	<?php elseif($item['applyindex'] == 1): ?>
																	等待审核
																	<?php elseif($item['applyindex'] == -1): ?>
																	拒绝
																	<?php else: ?>
																	未审核<?php endif; ?>
																	</a>
																   </p>
																  <p>使用<?php echo ($item["usecount_int"]); ?>次</p>
																</div>
																<div class="portfolio-info">审核广场推荐
																	<p>
																	<a title="点击更改审核状态"  href="javascript:;"  onclick="shenheApply(<?php echo ($item["sceneid_bigint"]); ?>,'guanchan',this)" class="btn purple-stripe">
																	<?php if($item['applyguanchan'] == 2): ?>审核通过
																	<?php elseif($item['applyguanchan'] == 1): ?>
																	等待审核
																	<?php elseif($item['applyguanchan'] == -1): ?>
																	拒绝
																	<?php else: ?>
																	未审核<?php endif; ?>
																	</a>
																   </p>
																  <p>使用<?php echo ($item["usecount_int"]); ?>次</p>
																</div>
																
																
																
														<?php elseif($flag == 'sysmb' ): ?>
															<div class="portfolio-info">审核系统模板
																<p>
																<a title="点击更改审核状态"  href="javascript:;"  onclick="shenheApply(<?php echo ($item["sceneid_bigint"]); ?>,'sysmb',this)" class="btn purple-stripe">
																<?php if($item['applytemplate'] == 2): ?>审核通过
																<?php elseif($item['applytemplate'] == 1 ): ?>
																等待审核
																<?php elseif($item['applytemplate'] == -1 ): ?>
																拒绝
																<?php else: ?>
																未审核<?php endif; ?>
																</a>
															   </p>
															  <p>使用<?php echo ($item["usecount_int"]); ?>次</p>
															</div>
														<?php elseif($flag == 'designer'): ?>
																<div class="portfolio-info">审核设计师案例
																<p>
																<a title="点击更改审核状态"  href="javascript:;"  onclick="shenheApply(<?php echo ($item["sceneid_bigint"]); ?>,'designer',this)" class="btn purple-stripe">
																<?php if($item['applypromotion'] == 2): ?>审核通过
																<?php elseif($item['applypromotion'] == 1): ?>
																等待审核
																<?php elseif($item['applypromotion'] == -1): ?>
																拒绝
																<?php else: ?>
																未审核<?php endif; ?>
																</a>
															   </p>
															  <p>使用<?php echo ($item["usecount_int"]); ?>次</p>
															</div>
															<?php elseif($flag == 'indextj'): ?>
																<div class="portfolio-info">审核首页推荐
																	<p>
																	<a title="点击更改审核状态"  href="javascript:;"  onclick="shenheApply(<?php echo ($item["sceneid_bigint"]); ?>,'indextj',this)" class="btn purple-stripe">
																	<?php if($item['applyindex'] == 2): ?>审核通过
																	<?php elseif($item['applyindex'] == 1): ?>
																	等待审核
																	<?php elseif($item['applyindex'] == -1): ?>
																	拒绝
																	<?php else: ?>
																	未审核<?php endif; ?>
																	</a>
																   </p>
																  <p>使用<?php echo ($item["usecount_int"]); ?>次</p>
																</div>
															<?php elseif($flag == 'guanchan'): ?>
																<div class="portfolio-info">审核广场推荐
																	<p>
																	<a title="点击更改审核状态"  href="javascript:;"  onclick="shenheApply(<?php echo ($item["sceneid_bigint"]); ?>,'guanchan',this)" class="btn purple-stripe">
																	<?php if($item['applyguanchan'] == 2): ?>审核通过
																	<?php elseif($item['applyguanchan'] == 1): ?>
																	等待审核
																	<?php elseif($item['applyguanchan'] == -1): ?>
																	拒绝
																	<?php else: ?>
																	未审核<?php endif; ?>
																	</a>
																   </p>
																  <p>使用<?php echo ($item["usecount_int"]); ?>次</p>
																</div><?php endif; ?>
															
														</if>
                                        
                                        
										<div class="portfolio-info">
											微课关闭情况
<p>
 <?php if(($item['showstatus_int']) == "1"): ?><a href="/adminc.php?c=scene&a=is_showstatus&id=<?php echo ($item["sceneid_bigint"]); ?>&no=1" title="点击关闭" class="btn purple-stripe"style="color:#0af005;"><i class="icon-play"></i> 开启</a>
 <?php else: ?>
 
 <a href="/adminc.php?c=scene&a=is_showstatus&id=<?php echo ($item["sceneid_bigint"]); ?>" title="点击开启" class="btn purple-stripe" style="color:#000;"><i class="icon-pause"></i>  关闭</a><?php endif; ?> 
 
</p><code>权重：<?php echo ($item["rank"]); ?></code>
										</div>

									
                                    
                             
									</div>
                                    <!--  <?php if(($flag) == "useranli"): ?><div class="portfolio-info">
											有无广告
										<p> <?php if(($item['shenhe']) == "1"): ?><a title="点击取消通过审核"  href="/adminc.php?c=scene&a=shenhe&id=<?php echo ($item["sceneid_bigint"]); ?>&no=1" class="btn purple-stripe">已审核</a><?php else: ?>
                                        <a title="点击通过审核" href="/adminc.php?c=scene&a=shenhe&id=<?php echo ($item["sceneid_bigint"]); ?>" class="btn purple-stripe"> 未审核</a><?php endif; ?>
                          
                                        </p>
                                      <?php if(($flag) != "useranli"): ?><code>使用<?php echo ($item["usecount_int"]); ?>次</code><?php endif; ?>
										</div>
									</div><?php endif; ?>-->
                                    
                                    
                                    
                                    
                                

		<div class="span2 portfolio-btn" style="float: right;">
        
<a href="javascript:;" onclick="ajaxpreview('<?php echo ($item["scenecode_varchar"]); ?>',<?php echo ($item["islongpage"]); ?>);return false;" class="btn blue " style="width:47%"><i class="icon-eye-open"></i> 预览</a> 
<a href="?c=scene&a=e&<?php if(($flag) == "useranli"): ?>&flag=useranli<?php endif; ?>&id=<?php echo ($item["sceneid_bigint"]); ?>" class="btn blue " style="width:47%" ><span><i class="icon-pencil"></i>  修改</span></a>

<a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["scenename_varchar"]); ?>]吗？')) window.location='?c=scene&a=del&id=<?php echo ($item["sceneid_bigint"]); if(($flag) == "useranli"): ?>&flag=useranli<?php endif; ?>'" class="btn blue " style="width:47%"> <span><i class="icon-remove"></i>   删除</span></a>  
<a href="index.php?c=Scene&a=export&id=<?php echo ($item["sceneid_bigint"]); ?>" target="_blank" class="btn blue " style="width:47%"><i class=" icon-bookmark"></i>  导出HTML</a>


									</div>

						  </div><?php endforeach; endif; ?>
</form>
                                   <div class="space5"></div>
                                   <div class="pagination">
									<?php if(($flag) == "sysmb"): ?><div style="float:left"><input type="button" value="导出所选" onclick="document.all.myform.action='<?php echo U('Scene/systplexport');?>';document.all.myform.target='_blank';myform.submit();" class="btn green"/></div><?php endif; ?>
									 <div class="pages pagination-right">

									  <?php echo ($page); ?>

									</div>

								</div>
                                </div>
                                </div>
                                 </div>
                                 </div>
                                <style>
                                .center{ text-align:center}
								.center .p{ line-height:30px}
                                </style>
       

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
                             
 <script type="text/javascript">
<!--
  function shenheApply(id,flag,obj){
	  var modalobj = $('#modal-preview');
		if(modalobj.length == 0) {
			$(document.body).append('<div id="modal-preview" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" style="position:absolute;top:40%;padding-top: 30px;"></div>');
			var modalobj = $('#modal-preview');
		}
		var title='审核系统模板';
		var status=$(obj).attr("applyTemplate");
		if(flag=='designer'){
			var title='审核设计师推荐';
			var stauts=$(obj).attr("applyPromotion");
		}else if(flag=='indextj'){
			var title='审核首页推荐';
			var stauts=$(obj).attr("applyIndex");
		}else if(flag=='guanchan'){
			var title='审核广场推荐';
			var stauts=$(obj).attr("applyGuanchan");
		}
		var isselctOk=status==2? ' selected="selected" ' : '';
		var isselctNo=status<0? ' selected="selected" ' : '';
		
		html = ' <div class="modal-body center">'+
		  ' <p> <h3>'+title+'</h3> </p>'+
		   ' <p>  <select id="applystatus"> <option value="2" '+isselctOk+'>审核通过</option> <option value="-1" '+isselctNo+'>拒绝通过</option></select> </p>'+
		     ' <p><input name="flag" id="flag" type="hidden" value="'+flag+'" />  <a href="javascript:;" onclick="ajax_shenheApply('+id+')" class="btn blue " style="width:47%"> 提交</a>  </p>'+
		 ' </div>  <div class="modal-footer"><a href="#" class="btn" data-dismiss="modal" aria-hidden="true">关闭</a></div>';
		modalobj.html(html);
		modalobj.css({'marginLeft' : 0 - 330 / 2});
		modalobj.css({'height' : 735});
		modalobj.on('hidden', function(){modalobj.remove();});
		return modalobj.modal({'show' : true});
	 }
	 function ajax_shenheApply(id){
		 $.post('/adminc.php?c=scene&a=shenheOk', { id:id,applystatus:$('#applystatus').val(),flag:$('#flag').val()},
		  function(data){
			   
			   if(data.status==1){
				   alert('审核已处理');
			      $('#modal-preview').remove();
				  parent.location.reload();
			   }
		},'json');
  }
	 
	function ajaxpreview(styleid,islong) {
            if(typeof(taghtml) == "undefined") gettaghtml();
		var modalobj = $('#modal-preview');
		if(modalobj.length == 0) {
			$(document.body).append('<div id="modal-preview" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" style="position:absolute;top:55%; left: 36%;"></div>');
			var modalobj = $('#modal-preview');
		}
                window.code = styleid;
                var jsonurl = '/index.php?c=scene&a=view&id='+styleid+'&time='+Math.random();
                $.ajaxSetup({async:false});
                $.get(jsonurl,function(json){
                    window.scenelist = json.list;

                    var num = json.list.length;
                    setsys = '缩略图: <input type="text" style="width:100px" id="thumb_status" placeholder="截屏粘贴缩略图" /> <textarea style="display:none;" id="thumbdata" name="thumbdata"></textarea> 页码: <select id="selectnum" style="width:50px;">';
                    for(i=1;i<=num;i++){
                        setsys+="<option value="+i+">"+i+"</option>";
                    }
                    setsys+='</select><br> 名称: <input type="text" placeholder="模板名称" id="pagename" /><input name="islong" id="islong" type="hidden" value="'+islong+'" /><br> '+taghtml+' <br><button id="addpagesys"> 添加到素材模板 </button>';                    
                });
                html = '<iframe onload="processingComplete()" width="330px" scrolling="no" height="100%" frameborder="0" src="/index.php?c=view&id='+styleid+'" id="preview" name="preview" style="width: 494px;margin-top: -133px;margin-left: 10px;height: 888px;"></iframe><div class="modal-footer" style="text-align: center;position: absolute;top: 0;height: 694px;width: 422px;padding-top: 9%;right: 0;">'+setsys+' <button class="" data-dismiss="modal" aria-hidden="true">关闭</button></div>';
                modalobj.html(html);
                modalobj.css({'paddingTop' : 30});
                modalobj.css({'paddingBottom' : 30});
                modalobj.css({'height' : 735});
                modalobj.css({'minWidth' : 954});
                modalobj.css({'margin-left' : -477});
                modalobj.on('hidden', function(){modalobj.remove();});
                return modalobj.modal({'show' : true});                
	}  
function gettaghtml(){
    var taghtml = "";
    tagstr=new Array();
    tagstr[11001] = "用途";
    tagstr[11002] = "功能";
    tagstr[11003] = "风格";
    $.ajaxSetup({async:false});
    for(i=11001;i<=11003;i++){
        taghtml += " <select style='width:80px' id=tag"+i+"><option value=0>"+tagstr[i]+"</option>";
        var url = '/index.php?c=statics&a=tagList&bizType='+i+'&time='+Math.random();
        $.getJSON(url,function(r){
            list = r.list;
            for(x in list){
                taghtml += "<option value="+list[x].id+">"+list[x].name+"</option>";
            }
        });
        taghtml +="</select> ";        
    }
    window.taghtml = taghtml;
}

function processingComplete(){
    $('#nr', window.frames['preview'].document).height(729);
    //$('#nr', window.frames['preview'].document).height(487); 兼容处理,原因不明
    $('#audio_btn', window.frames['preview'].document).remove(); //去除音乐图标,方便截图
    //$('.bg_white', window.frames['preview'].document).remove();
    //$('#mainBox-left', window.frames['preview'].document).remove();
    //$('#horizon-screen', window.frames['preview'].document).remove();
    $('#support', window.frames['preview'].document).remove();
    $('#con', window.frames['preview'].document).hasClass("phoneBox3") && $('#con', window.frames['preview'].document).removeClass("phoneBox3").addClass("phoneBox5");
}




$(document).ready(function(){
            $("body").on('paste', $("#thumb_status"), function (e) {
                var clipboardData = e.originalEvent.clipboardData,
                        i = 0,
                        items, item, types;

                if (clipboardData) {
                    items = clipboardData.items;

                    if (!items) {
                        return;
                    }

                    item = items[0];
                    types = clipboardData.types || [];

                    for (; i < types.length; i++) {
                        if (types[i] === 'Files') {
                            item = items[i];
                            break;
                        }
                    }

                    if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                        var imgReader = function (item) {
                            var blob = item.getAsFile(),
                                    reader = new FileReader();
                            reader.readAsDataURL(blob)
                            reader.onload = function (e) {
                                var img = new Image();
                                $("#thumbdata").val(e.target.result);
                            };
                        };
                        imgReader(item);
                        $("#thumb_status").val('已获取');

                    }
                }
            });
    $("body").on('click','button#addpagesys',function(){
            jsonstr = scenelist[$("#selectnum").val()-1];
            jsonstr = JSON.stringify(jsonstr.elements);
            jieri = $("#tag11001").val();
            gongneng = $("#tag11002").val();
            fengge = $("#tag11003").val();
			islong = $("#islong").val();
            if(jieri && gongneng && fengge){
                //alert('请选择分类');
                //return false;
            }
            $.post('/adminc.php?c=Scene&a=addpagesys',{code:code,islong:islong,pagename:$("#pagename").val(),element:jsonstr,thumbdata:$("#thumbdata").val(),tagid:jieri+","+gongneng+","+fengge},function(r){
                alert(r.info);
            });
    });

    
});
        
//-->
</script>  

<script type="text/javascript">
    $(document).ready(function(){
  $("#dtagid").change(function(){ 
//  var url = $("#text").val();
  var biztype = $("#dtagid").val();
  $("#tagid").empty();
   $.get("adminc.php?c=Scene&a=Type",{biztype:biztype}, function(data){
if(data != null){
   $("#tagid ").append(data);
    }else{$('#tagid').after();
        }
   });
    }); 
	});
</script>
<!--修改--> 
<script type="text/javascript">
	$(function(){
		$('.pages a').click(function(){
			var tmpHref = $(this).attr('href');
	
			$('#form').attr('action',tmpHref);			
			$('#form').submit();
			return false;
		});
	
        //查询
        $(".page_btn").click(function(){
        	var url = window.location.href;
        	var arr = url.split('/p/');
            $("#form").attr("action", arr[0]);
            $("#form").submit();
        });


	})
</script>