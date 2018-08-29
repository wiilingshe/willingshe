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
						<h3 class="page-title">商品管理 <small>    goods management</small></h3>

						<ul class="breadcrumb">
							<li><i class="icon-home"></i><a href="index.html">首页</a> 
								<i class="icon-angle-right"></i></li>
                            <li><a href="#"></i><a href="/adminc.php?c=goods">商品列表管理</a><i class="icon-angle-right"></i></li>

						</ul>
							</ul>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->

				<!-- BEGIN PAGE CONTENT-->
 
		
		
            <a class="btn green" href="?c=goods&a=add"  style='margin-bottom: 20px;'> 添加商品 </a>
             
            <p></p>
        </div>
        <div class="portlet-body" style=" margin-top:-50px;">

<script type="text/javascript">
    function sureDelete() {        
        return confirm("您确认要删除吗?");
    }
</script>

<script type="text/javascript">
    function setCommonClick() {        
       document.getElementById('ctl00_ContentPlaceHolder1_gvPager_hidIsCommonClick').value = "1";
    }
</script>

<script type="text/javascript" language="javascript">
    function getChecked() {
    var ids = new Array();
    $.each($('table input:checked'), function(i, n){
        ids.push( $(n).val() );
    });
    return ids;
}

function checkon(o){
    if( o.checked == true ){
        $(o).parents('tr').addClass('bg_on') ;
    }else{
        $(o).parents('tr').removeClass('bg_on') ;
    }
}

function checkAll(o){
    if( o.checked == true ){
        $('input[name="checkbox"]').attr('checked','true');
        $('tr[overstyle="on"]').addClass("bg_on");
    }else{
        $('input[name="checkbox"]').removeAttr('checked');
        $('tr[overstyle="on"]').removeClass("bg_on");
    }
}
 
 
</script>
 
<div class="row-fluid"
        <div style="padding-top: 10px; padding-left: 10px; padding-right: 10px;">
        </div>
        <div style="padding:20px;">
            <div id="ctl00_ContentPlaceHolder1_UpdatePanel1">
	<div class="portlet-body" style=" margin-top:15px;">
														<table class="table table-striped table-bordered table-advance table-hover">
															<thead>
																<tr>
				<th align="left" scope="col" style="width:40px;"><i class="icon-bookmark"></i>ID</th>
                <th align="center" scope="col" abbr="lbtnOperate" style="width:160px;"><i class="icon-bookmark"></i> 操作</th>
         
                <th align="left" scope="col"><i class="icon-bookmark"></i>商品名</th>
                <th align="left" scope="col"><i class="icon-question-sign"></i>价格</th>
                   <th align="left" scope="col"><i class="icon-question-sign"></i>秀点值</th>
                <th align="left" scope="col"><i class="icon-bookmark"></i> 创建时间</th>
			</tr>

															</thead>

															<tbody>
            <?php if(is_array($select)): foreach($select as $key=>$item): ?><tr>
				<td >
                  <?php echo ($item["id"]); ?>
                </td>
                <td align="center" ><a  href="?c=goods&a=e&id=<?php echo ($item["id"]); ?>" ><i class="btn black"><i class="icon-edit icon-white"></i></i></a> <a  href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["goods_name"]); ?>]吗？')) window.location='?c=goods&a=del&id=<?php echo ($item["id"]); ?>&type=<?php echo ($type); ?>'"><i class="btn black"><i class="icon-remove icon-white"></i></i></a>
                
                </td>
                <td>  <?php echo ($item["goods_name"]); ?></td>
                <td><?php echo ($item["price"]); ?>￥</td>
                    <td><?php echo ($item["xd_value"]); ?>个 </td>
                <td> <?php if($item['add_time'] > 0): echo (date("Y-m-d",$item["add_time"])); endif; ?></td>
               
               </td>
			</tr><?php endforeach; endif; ?>
            
		</table>
	</div>


    
            <table cellpadding="1" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                     <div class="row-fluid">
<div class="span12">
<div class="pagination pull-right">
<div class="pages">
                        <?php echo ($page); ?>
                </div>
</div>
</div>
</div>
                  </td>
                </tr>
            </table>
        

<div id="divIsSetHeight" style="display: none;">
 
</div>

<script type="text/javascript">
    // <![CDATA[
    //    function ShowVisibleColumnWindow() {
    //        pcVisibleColumn.Show();
    //    }
    // ]]> 
</script>

 


                    
</div>
            </div>
</div>
    </div>

 
		<!-- END PAGE CONTENT-->

			</div>
            
            

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