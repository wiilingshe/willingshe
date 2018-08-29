angular.module("main/main.tpl.html", []).run(["$templateCache", function (a) {
    console.log("main-main.js");
    a.put("main/main.tpl.html", '<div>   <div ng-include="\'header.tpl.html\'"></div>    ' +
        '<div id="main" class="min_contain">        ' + 
        '<div class="same-content" style="min-height:798px;">            ' +
        '<div class="ad mt20" ng-init="showAd= true;" id="ad_001" slides3 width="1180px" height="40px" ng-show="showAd== true" >               ' +
        /*'<a ng-click="showAd = false;">                  ' +
        '<em class="eqf-wrong"></em>                </a>               ' +*/
        '<div class="slides_container add_margin"></div>            </div>            ' +
        '<div class=\"self_info\">'+
        '<div class=\"self_photo\" ng-mouseenter="showMask=true" ng-mouseleave="showMask=false">'+
        '<div class="p-mask2" ng-show="showMask">'+
        '<a ng-click="customerUpload()"><em class="eqf-top-pic background-color-width-change"></em><span>更换</span></a>'+
        '</div>'+
        '<div class=\"self_img\" ng-class="{\'person-freed2\':userinfo.type == 1 || userinfo.type == 22,\'person-pay2\':userinfo.type == 12,\'company-pay2\':userinfo.type == 2}" ng-hide="userinfo.headImg">'+
        // '<span ng-show="!userinfo.headImg"></span>'+
        '</div>'+
        '<img ng-src="{{PREFIX_FILE_HOST + userinfo.headImg}}" ng-show="userinfo.headImg"/>'+
         '</div>'+
        '<div class=\"private\">'+
        '<span class=\"name\">{{userinfo.name}}</span>'+
        '<span class=\"type\">账户类型:'+
        '<span ng-if="userinfo.type == 1">个人免费用户</span>'+
        '<span ng-if="userinfo.type == 12">个人付费用户</span>'+
        '<span ng-if="userinfo.type == 2">企业付费用户</span>'+
        '<span ng-if="userinfo.type == 22">设计师</span>'+
        '</span>'+
        '<span class=\"coin\">我的微币:{{xdCounts}}</span>'+
        '<span class=\"msg\">未读消息:{{newMsgCount}}条</span>'+
        '</div>'+

        '<div class=\"self_total\">'+
          '<ul>'+
            '<li><i></i><span>{{allPageCount || 0 | fixnum}}</span><span>微课统计</span></li>'+
             '<li><i></i><span>{{datasCount.pv || 0 | fixnum}}</span><span>微课展示</span></li>'+
              '<li><i></i><span>{{datasCount.dt || 0 | fixnum}}</span><span>微课收集</span></li>'+
          '</ul>'+
            '</div>'+
            '<div class=\"self_state\">'+
               '<span ng-click="buyXd()">获取微币</span>'+
               '<span><a href="javascript:void(0)" ng-click="transferXd()">转送微币</a></span>'+
               '<span><a href="/img/price.html">账号升级</a></span>'+
               // '<span>变身设计师</span>'+
            '</div>'+
        '</div>'+
        ' <nav class=\"main_navbar\" style=\"margin-bottom:8px\">'+
            ' <ul ng-init="listType=0">'+
             ' <li class="first_list" ng-repeat="list in lists" ng-class=\"{active:listType==$index}\" ng-click="navChange($index)"><a href=\"javascript:void(0)\" ng-bind="list.title"></a></li>'+

             // '<li class="first_list"><a ng-if="userinfo.type == 2" href=\"javascript:void(0)\"class="btn">账号选择<span class="caret"></span></a></li>'+
             '<li class="first_list">'+
              '<div ng-if="user.type == 2" class="select-branch fl">'+                   
              '<eqx-select class="select-contain select-sm" model="branchCurrent"  change="selectBranch(branchCurrent)">'+                      
              '<eqx-select-option value="null">账号选择</eqx-select-option>'+                       
              '<eqx-select-option value="branch" ng-repeat="branch in branches"  >{{branch.loginName}}</eqx-select-option>'+                   
              '</eqx-select>'+            
              '</div>'+
             '</li>'+
             // '<li><a href=\"javascript:void(0)\"class="btn ">分类<span class="caret"></span></a></li>'+
             '<li class="first_list" >'+
                '<div id=\"weikefl\" class="f1">'+                    
                '<eqx-select class="select-sm select-contain" model="scene.type" change="getMyScenes()">'+                       
                '<eqx-select-option value="null">分类</eqx-select-option>'+                       
                '<eqx-select-option value="type" ng-repeat="type in scene.types">{{type.name}}</eqx-select-option>'+
                '</eqx-select>'+              
                '</div>'+
             '</li>'+
             // '<li class="first_list" >'+
             //    '<div class="fl">'+                    
             //    '<eqx-select class="select-sm select-contain" model="scene.type" change="getMyScenes()">'+                       
             //    '<eqx-select-option value="null">分类</eqx-select-option>'+                       
             //    '<eqx-select-option value="type" ng-repeat="type in scene.types">{{type.name}}</eqx-select-option>'+                    
             //    '</eqx-select>'+              
             //    '</div>'+
             // '</li>'+
             '<li class="first_list" >'+
               //搜索功能
               '<div id="searchweike">'+
                '<input type=\"text\" maxlength="40" placeholder="search..." ng-model="name" ng-change="changeName(name)" ng-keypress="EnterPress(event,name)" ng-keydown="EnterPress(name)" >'+
                '<span ng-if="searchButton" class="search-icon eqf-search" ng-click="submit(name)"></span>'+
                '<span ng-if="!searchButton" class="search-icon eqf-wrong" ng-click="clearSearch()"></span>'+
                '</div>'+
                '<div id="searchmuban" style=\"display:none\">'+
                '<input type=\"text\" maxlength="40" placeholder="search..." ng-model="name" ng-change="changeName(name)" ng-keypress="EnterPressTwo(event,name)" ng-keydown="EnterPressTwo(name)" >'+
                '<span ng-if="searchButton" class="search-icon eqf-search" ng-click="submitTwo(name)"></span>'+
                '<span ng-if="!searchButton" class="search-icon eqf-wrong" ng-click="clearSearchTwo()"></span>'+
                '</div>'+
           
             '</li>'+

            '</ul>'+
        ' </nav>'+
     
        '<div class="tab-bottom-line" style=\"margin-bottom:8px;border-bottom: 1px solid #dfe4e8;background-color:#fff;display:none;\" id=\"mubannav\" ng-app=\"scene\" ng-controller=\"SceneCtrl\">'+ //none
        '<ul class="clearfix tab-line" style=\"width:100%;border-top: 2px solid #eee;\">'+
'<li >'+
'<a ng-class="{active : 0 == childcat}" style=\"color:#585858;padding-top:13px;\" ng-click=\"allpage(null,null)\">全部</a>'+
'</li>'+
'<li ng-repeat="pageTplType in pageTplTypesList">'+
'<a ng-click="getPageTplsByType(pageTplType.type)" style=\"color:#585858;padding-top:13px\" ng-class=\"{active : pageTplType.type == childcat}\">{{pageTplType.name}}</a>'+
'</li>'+
'<li ng-show="userProperty.type ==2 || userProperty.type ==21">'+
'<a ng-click="getCompanyTpl()" ng-class=\"{active: 1 == childcat}\">企业样例</a>'+
'</li>'+                                       
'</ul>'+
'<div class="sample-childcat clearfix" ng-if=\"newArrayGroupCat\">'+
'<ul class="cat-list tab-box-shadow" style=\"width:100%;height:auto;padding-bottom: 8px;border-top:1px solid #eee;\" ng-repeat=\"childGroup in newArrayGroupCat\">'+
'<li ng-repeat="cat in childGroup" ng-click=\"getPageTpls(type,cat.bizType,cat.id)\" ng-class=\"{active:cat.id == categoryId}\">'+  
'<a>{{cat.name}}</a><span>|</span>'+               
'</li>'+                                                                  
'</ul>'+ 
'</div>'+
        '</div>'+
        '<div class=\"main_content\" ng-if="listType==0">'+
'        <div class=\"row\">'+
'            <div class=\"col-sm-5 thumb_sm_5\" ng-if="page.currentPage==1">'+
'                <div class=\"lt_img default_tpl\"></div>'+
'                <div class=\"rt_content\">'+
'                    <div class=\"create\">'+
'                        <i ng-click="createScene()"></i><span class=\"create_text\">一起创建微课吧</span>'+
'                        <span class=\"create_tips\">黑夜给了我黑色的眼睛，我却用它来创建微课。</span>'+
'                    </div>'+
'                </div>'+
'            </div>'+
'            <div class=\"col-sm-5 thumb_sm_5\" ng-repeat="scene in myScenes track by $index">'+
'                <div class="ribbon ribbon-badge" ng-if="!scene.show && !scene.publishTime">'+            
                    '<span class="ribbon-inner unpublish">未发布</span>'+
                 '</div>'+ 
'               <div class="ribbon ribbon-badge" ng-show="!scene.show && scene.publishTime && scene.updateTime > scene.publishTime" >'+            
                    '<span class="ribbon-inner new">有修改</span>'+            
                    '<span class="ribbon-inner new hint--bottom hint--rounded" data-hint="内容有修改，新修改未发布" style="transform: rotate(0deg);background:none;"></span>'+
                '</div>'+           
                '<div class="ribbon ribbon-badge" ng-if="!scene.show && scene.status == -1" > '+           
                    '<span class="ribbon-inner check">未通过审核</span></div>'+         
                '<div class="ribbon ribbon-badge" ng-if="!scene.show && scene.status == -2" >'+            
                    '<span class="ribbon-inner check">审核中</span>'+
                '</div> '+         
'                <div class=\"lt_img\" ng-style="getStyle(scene.cover,$index)">'+
                  '<div class="overlay" ng-show="!scene.show">'+
                    '<div class="edit">'+
                        '<a class="edit-same" ng-if="scene.company_ext[0]||!branchid" ng-click="editScene($event,scene.id)"> <em class="icon-edit background-color-width-change"></em><span>编辑</span></a>'+
                        '<a class="edit-same" ng-click="showDetail(scene.id)"><em class="icon-detail background-color-width-change"></em><span>详情</span> </a>'+
                    '</div>'+
                  '</div>'+
                  // 微课二维码图片
                    '<div ng-show="scene.show" class="face front qrcode" qr-code qr-url="{{canvasUrl + \'/v-\' + scene.code}}">'+ 
                    '</div>'+
                '</div>'+
'                <div class=\"rt_content\">'+
'                    <h4>{{scene.name?scene.name:("未添加微课标题")}}</h4>'+
'                    <p>{{scene.description?scene.description:("未添加微课描述")}}</p>'+
'                    <div class=\"scene_info\">'+
'                        <span class=\"user_name\"><em class="icon-user"></em><span>{{userinfo.name}}</span></span>'+
'                        <span class=\"user_preview\"><em class="icon-preview"></em><span class="views">{{scene.showCount | fixnum}}</span></span>'+
'                    </div>'+
'                    <ul class=\"icon_list\" ng-if="scene.company_ext[1]||!branchid">'+
'                        <a ng-click="showPreview($event,scene)"><em class="icon-view"></em><span>预览</span></a>'+
'                        <a ng-if="scene.company_ext[1]||!branchid" ng-click="deleteScene($event,scene.id)"><em class="icon-delete"></em><span>删除</span></a>'+
'                        <a ng-if="scene.status != -1 && scene.status != -2&&!branchid" ng-click="copyScene($event,scene.id)"><em class="icon-copy"></em><span>复制</span></a>'+
'                        <a ng-if="isAllowedToAccessTransfer && scene.status != -1 && scene.status != -2&&!branchid" ng-click="transferScene($event,scene.id)"><em class="icon-gift"></em><span>转送</span></a>'+
'                        <a ng-if="!branchid" ng-click="sceneSettings($event,scene.id)"><em class="icon-set"></em><span>设置</span></a>'+
'                        <a class="edit-scene" ng-href="/index.php?c=Scene&a=export&id={{scene.id}}" target="_blank"><em class="icon-export"></em><span>导出</span></a>'+
'                        <a ng-hover resource="scene"><em class="icon-code"></em><span>扫一扫</span></a>'+
'                    </ul>'+
'                </div>'+
'            </div>'+
'        </div>'+
'    </div>'+
// '<div class="main_content mytpl" ng-if="listType==1">'+
//     '<div class=\"row\">'+
//         '<div class="col-sm-3 col-xs-5 " ng-repeat="tpl in tpls track by $index">'+
//              '<div class="lt_img" ng-style="getStyle(tpl.cover,$index)">'+
//                   '<div class="overlay" ng-show="!tpl.show">'+
//                     '<div class="edit">'+
//                         '<a class="edit-same" ng-click="createScene(tpl)"> <em class="eqf-xiuziti"></em><span>编辑</span></a>'+
//                         '<a class="edit-same" ng-click="showDetail(tpl.id)"><em class="icon-detail background-color-width-change"></em><span>详情</span> </a>'+
//                     '</div>'+
//                   '</div>'+
//                   // 微课二维码图片
//                     '<div ng-show="tpl.show" class="face front qrcode" qr-code qr-url="{{canvasUrl + \'/v-\' + tpl.code}}">'+ 
//                     '</div>'+
//                 '</div>'+
//         '</div>'+
//     '</div>'+
// '</div>'+
'<div ng-app="scene" ng-controller=\"SceneCtrl\" style=\"position:relative\" ng-if=\"listType==1\">'+            
'<ul class="square-scene clearfix">'+                 
// '<li class="tab-box-shadow creat-blank all-change" ng-if=\"blankSample\" ng-click = \"createScene()\" style=\"cursor:pointer;\">'+         
// '<div class="creat-content background-color-width-change">'+                        
// '<i class = "fa eqf-plus2"></i><span>创建空白微课</span>'+                    
// '</div>'+                
// '</li>'+                
'<li ng-repeat="tpl in tpls track by $index" class=\"tab-box-shadow animation-zoom all-change\" ng-show=\"tpls\" ng-style=\"{\'animation-delay\' : $index * 50 + \'ms\'}\">'+                  
'<div class="ribbon ribbon-badge" ng-if=\"!!tpl.price\">'+                       
'<span class="ribbon-inner check">{{tpl.price}}微币</span>'+                   
'</div>'+
'<div class="image">'+                       
'<div ng-show="!tpl.show" class=\"front face\" ng-style=\"getStyle(tpl.cover)\" style=\"background-size:cover\"></div>'+            
'<div ng-show="tpl.show" class=\"ercode\" qr-code qr-url=\"{{canvasUrl + \'/v-\' + tpl.code}}\">'+                        
'</div>'+       
'<div class="overlay" ng-show=\"!tpl.show\">'+                           
'<div class="edit"><!-- ng-href=\"{{PREFIX_CLIENT_HOST + \'/v-\' + tpl.code}}\" -->'+                               
'<a class="edit-same" target=\"_blank\" ng-href=\"{{canvasUrl + \'/v-\' + tpl.code}}\">'+                                    
'<em class="eqf-eye" style=\"font-size:20px;\"></em>'+                                    
'<span>预览</span>'+                              
'</a>'+                            
'<a class="edit-same" ng-click=\"createScene(tpl)\">'+                                    
'<em class="eqf-xiuziti" style=\"font-size:18px;\"></em>'+                                    
'<span>套用制作</span>'+                                
'</a>'+                                               
'</div>'+                         
'</div>'+                    
'</div>'+                    
'<div class="project-info">'+                        
'<p class="ellipsis">{{tpl.name}}</p>'+                       
'<!-- <span class="show-count"><em class=\"eqf-xiuziti\"></em>{{tpl.useCount | fixnum}}</span>  -->'+
'<div class="buttons sample clearfix" ng-if=\"!branchid\">'+                           
'<div class="set sample-scene">'+                                 
'<span class="scene-name">{{tpl.userName}}</span>'+                            
'</div>'+                            
'<a class="erweima button" ng-hover resource=\"tpl\"><em class=\"eqf-QRcode\"></em></a>'+                        
'</div>'+                    
'</div>'+                    
'<div class="head-img">'+                        
'<img ng-if="tpl.avatar" ng-src=\"{{tpl.avatar}}\" >'+                        
'<span ng-if="!tpl.avatar" class=\"scene-headimg\"><em class=\"eqf-top-contact\"></em></span>'+
'</div>'+                  
'</li>'+             
'</ul>'+
'</div>'+
'<div id="weike">'+
'<div class="clearfix page-turn" ng-show="totalItems > 11">'+ //=count
'<div class="current_page right_page"><span class="fl">到</span>'+
'<input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? pageChanged(toPage) : null">'+ //topage = pagenum
'<span class="fl">页</span>\n <a ng-click="pageChanged(toPage)" class="go">确定</a>'+ //pagechanged方法控制的是myscenes
'</div>'+
'<pagination class="right_page" first-text="首页" last-text="尾页" previous-text="&lsaquo;" next-text="&rsaquo;" max-size="10" items-per-page="pageSize" total-items="totalItems" ng-model="page.currentPage" ng-change="pageChanged(page.currentPage)" boundary-links="true" rotate="true" num-pages="numPages"></pagination> '+
'</div>'+
'</div>'+
'<div ng-app="scene" ng-controller=\"SceneCtrl\" id=\"muban\" style=\"display:none\">'+
// '<div class="clearfix page-turn" ng-show="totalItems > 11">'+ //=count
// '<div class="current_page right_page"><span class="fl">到</span>'+
// '<input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? pageChangedd(toPage) : null">'+ //topage = pagenum
// '<span class="fl">页</span>\n <a ng-click="pageChangedd(toPage)" class="go">确定</a>'+ //pagechanged方法控制的是myscenes
// '</div>'+
// '<pagination class="right_page" first-text="首页" last-text="尾页" previous-text="&lsaquo;" next-text="&rsaquo;" max-size="10" items-per-page="pageSize" total-items="totalItems" ng-model="page.currentPage" ng-change="pageChangedd(page.currentPage)" boundary-links="true" rotate="true" num-pages="numPages"></pagination> '+
// '</div>'+
'<div class="clearfix page-turn" style=\"margin-top:10px;\" ng-show=\"totalItems > 11 && tpls.length\">'+
'<pagination style="float: left" first-text=\"首页\" last-text=\"尾页\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" max-size=\"10\" items-per-page=\"12\" total-items=\"totalItems\" ng-model=\"currentPage\" ng-change=\"pageChanged(currentPage)\" boundary-links=\"true\" rotate=\"true\" num-pages=\"numPages\"></pagination>'+
'<div class="current_page">'+
'<span class="fl">到</span>'+                
'<input type="text" ng-model=\"toPage\" ng-keyup=\"$event.keyCode == 13 ? pageChanged(toPage) : null\">'+
'<span class="fl">页</span>'+
'<a ng-click="pageChanged(toPage)" class=\"go\">GO</a>'+               
'<!-- <span><span>当前</span>: {{currentPage}} / {{numPages}} <span>页</span></span> -->'+
'</div>'+        
'</div>'+
'</div>'+
        '<div ng-include="\'main/userGuide.tpl.html\'"></div><div ng-include="\'usercenter/userCenterGuid.tpl.html\'"></div></div><div ng-include="\'footer.tpl.html\'"></div>'
        );
    }])