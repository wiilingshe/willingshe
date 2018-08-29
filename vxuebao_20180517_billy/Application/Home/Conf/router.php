<?php
/**
 * Created by PhpStorm.
 * User: cony
 * Date: 14-2-26
 * Time: 下午2:16
 */
return array(
    'URL_ROUTE_RULES'=>array(
		/*分类*/
        'v/:id' => 'View/index',  //  'v-:id' => 'View/index',
		'M/u/markRead'=>'User/markRead',
        'usercenter/tab/privilege.tpl'=>'Htmltpl/usercenter_tab_privilege'
    ),
);