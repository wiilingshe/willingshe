<?php

namespace Home\Controller;

use Think\Controller;

class ViewController extends Controller {

    public function index() {
		header('User-Agent: aboy');
		//echo '<pre>';
		//print_r($_SERVER);die;
		C('URL_PATHINFO_DEPR','-');
        if (!defined('VIRIFY')) {
            virifylocal();
        }
        $_scene = M('scene');
        //$where['scenecode_varchar']  = I('get.id',0);
        if (is_numeric(I('get.id', 0))) {
            $where['sceneid_bigint'] = I('get.id', 0);
        } else {
            $where['scenecode_varchar'] = I('get.id', 0);
        }
        $where['delete_int'] = 0;
        $diyname=I('diyname','');
        $_scene_list = $_scene->where($where)->find();
        if(!$_scene_list){
            $this->error('没找到记录');
        }
        $user = M('users')->where(array('userid_int'=>$_scene_list['userid_int']))->find();
		$isad=$user['type'];
		if($user['type']==2 || $user['type']==23){
			$isad=M('company')->where(array('userid_int'=>$_scene_list['userid_int']))->getField('isad');
			$isad=(int)$isad;
		}elseif($user['type']==21){
            $isad=M('company')->where(array('id'=>$user['companyid']))->getField('isad');
            $isad=(int)$isad;
        }
		
        $this->assign('type', $isad);
        if (I('get.preview') != 'preview') {
            D('Stat')->tongji();
        }
        if (C('is_user_anli_shenghe') && !isset($_GET['preview'])) {
            if ($_scene_list["shenhe"] != 1) {
                if (C('SYS_LINK')) {
                    //header('Location: ' .$sys_link_arr['noshenhe']); exit;
                } else {
                    $this->error('抱歉，您的场景还没通过管理员审核', '/#/main');
                }
            }
        }
        
        if(($_scene_list["showstatus_int"] - 1 !=0) && ($_scene_list['userid_int'] - session('userid')!=0) && (session('adminRole') != 1)){
            $this->error('抱歉，您的场景被设置为不显示', '/#/main');
        }
		
        
        if (C('CURLPOST_BAOBAN_URL')) { // ka
        }
        $argu2 = array();
        $argu2['workid'] = $_scene_list["sceneid_bigint"];
        $argu2['title'] = htmlspecialchars($_scene_list["scenename_varchar"]);
        //$argu2['url'] = C('IS_OPEN_STATIC') ? 'v-' . $_scene_list["scenecode_varchar"] : 'index.php?c=view&id=' . $_scene_list["scenecode_varchar"];修改为前端js获取
		$argu2['url'] =ltrim($_SERVER['REQUEST_URI'],'/');
        $argu2['desc'] = htmlspecialchars($_scene_list["desc_varchar"]);
        $argu2['imgsrc'] = $_scene_list["thumbnail_varchar"];
		$eqrcode=I('eqrcode');
		
        $this->assign("confinfo2", $argu2);
        $this->assign("sceneinfo", $_scene_list);
        $site_appId = C('site_appId') ? C('site_appId') : C('WX_APPID');
        $site_appSecret = C('site_appSecret') ? C('site_appSecret') : C('WX_AppSecret');
        //if($mydd!=='127.0.0.1'){
        if (strpos($_SERVER['SERVER_NAME'], '104') === false) {
            $confinfo = $this->get_js_sdk($site_appId, $site_appSecret);  //)'wx40e4c82c3d9df03e','47065ff14dbea4f06521f6d45740e285'
        }
        //取出logo URL
        $ad = M('ad');
        $where['type'] = 1;
        $ad_logo = $ad->where($where)->select();
        $logo_url = 'http://' . $_SERVER['HTTP_HOST'] . '/Uploads' . $ad_logo[0][url];
        $this->assign("logo_url", $logo_url);
        //取出logo URL结束
        //var_dump($logo_url);
        //print_r($confinfo); exit;
        $this->assign("confinfo", $confinfo);
        $this->assign("diyname", $diyname);
		$long=(int)$_scene_list['islongpage'];
		if(1==$long){
			$tp='longview';
		}else{
			$tp='index5_4';
		}
        $this->display($tp); //HTML_VESION index3_1_chen  'index3_1_ka'  index3_1_how index3_5_vi  index3_6_vi index3_9_di index4_1
    }

    // index.php?c=view&a=test
    public function test() {
		$site_appId = C('site_appId') ? C('site_appId') : C('WX_APPID');
        $site_appSecret = C('site_appSecret') ? C('site_appSecret') : C('WX_AppSecret');
        
		$confinfo = $this->get_js_sdk($site_appId, $site_appSecret);

        $this->assign("confinfo", $confinfo);
        $this->display();
    }

    public function indext() {
        if (!defined('VIRIFY')) {
            virifylocal();
        }
        $_scene = M('scene');
        $where['scenecode_varchar'] = I('get.id', 0);
        $where['delete_int'] = 0;
        $_scene_list = $_scene->where($where)->select();
        // print_r($_scene_list); exit('dddd');
        $sysinfo = M('sys')->order('id asc')->find();
        define('test_log', true);
        $argu2 = array();
        $argu2['title'] = $_scene_list["scenename_varchar"];
        $argu2['url'] = 'index.php?c=view&id=' . $_scene_list["scenecode_varchar"];
        $argu2['desc'] = $_scene_list["desc_varchar"];
        $argu2['imgsrc'] = $_scene_list["thumbnail_varchar"];
        $this->assign("confinfo2", $argu2);
        $mydd = get_client_ip();
        $jssdk = new \Think\Wxsdk(C('WX_APPID'), C('WX_AppSecret'));
        $confinfo = $jssdk->getSignPackage();
        //$confinfo = $this->get_js_sdk(C('WX_APPID'),C('WX_AppSecret'));
        print_r($confinfo);
        $this->assign("confinfo", $confinfo);
        $this->display('index2_9_vi');
    }
	

    /**
     * php curl 请求链接
     * 当$post_data为空时使用GET方式发送
     * @param unknown $url
     * @param string $post_data
     * @return mixed
     */
    function curlSend($url, $post_data = "") {
        $ch = curl_init();              
        curl_setopt($ch, CURLOPT_URL, $url);
        if ($post_data != "") {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        }
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    /**
     * 调用接口获取 $ACCESS_TOKEN
     * 微信缓存 7200 秒，这里使用thinkphp的缓存方法
     * @param unknown $APP_ID
     * @param unknown $APP_SECRET
     * @return Ambigous mixed, Thinkmixed, object
     */
    function get_accesstoken($APP_ID, $APP_SECRET) {
        $ACCESS_TOKEN = S($APP_ID);
        if($ACCESS_TOKEN == false){
			$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" . $APP_ID . "&secret=" . $APP_SECRET;
			$json = $this->curlSend($url);
			$data = json_decode($json, true);
			S($APP_ID, $data[access_token], 7000);
			$ACCESS_TOKEN = S($APP_ID);
        }
        return $ACCESS_TOKEN;
    }

    /**
     * 微信网页JSSDK  调用接口获取 $jsapi_ticket
     * 微信缓存 7200 秒，这里使用thinkphp的缓存方法
     * @param unknown $ACCESS_TOKEN
     * @return Ambigous <mixed, Thinkmixed, object>
     */
    function get_jsapi_ticket($ACCESS_TOKEN) {
        $jsapi_ticket = S($ACCESS_TOKEN);
        //var_dump(S($ACCESS_TOKEN));exit;
        if($jsapi_ticket == false){
			$url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" . $ACCESS_TOKEN . "&type=jsapi";
			$json = $this->curlSend($url);
			$data = json_decode($json, true);
			S($ACCESS_TOKEN, $data[ticket], 7000);
			$jsapi_ticket = S($ACCESS_TOKEN);
        }
        return $jsapi_ticket;
    }

    /**
     * 微信网页JSSDK 获取签名字符串
     * 所有参数名均为小写字符
     * @param unknown $nonceStr 随机字符串
     * @param unknown $timestamp 时间戳
     * @param unknown $jsapi_ticket
     * @param unknown $url 调用JS接口页面的完整URL，不包含#及其后面部分
     */
    function get_js_sdk($APP_ID, $APP_SECRET) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== off || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $url = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        $argu = array();
        $argu['appId'] = $APP_ID;
        $argu['url'] = $url;
        $argu['nonceStr'] = createNonceStr();
        $argu['timestamp'] = time();
        $ACCESS_TOKEN = $this->get_accesstoken($APP_ID, $APP_SECRET);
        $argu['jsapi_ticket'] = $this->get_jsapi_ticket($ACCESS_TOKEN);
        $string = "jsapi_ticket=" . $argu[jsapi_ticket] . "&noncestr=" . $argu[nonceStr] . "&timestamp=" . $argu[timestamp] . "&url=" . $argu[url];
        $argu['signature'] = sha1(trim($string));
        return $argu;
    }


    function get_js_sdk_hw($APP_ID, $APP_SECRET,$url) {
		$url=str_replace('amp;','',$url);
        //$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== off || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
		$sharefrom=I('from');
		$isappinstalled=I('isappinstalled');
        //$url = "http://www.vxuebao.com/content/".$dir."/".$file.".html?from=".$sharefrom."&isappinstalled=".$isappinstalled;
        $argu = array();
        $argu['appId'] = $APP_ID;
        $argu['url'] = urldecode($url);
        $argu['nonceStr'] = createNonceStr();
        $argu['timestamp'] = time();
        $ACCESS_TOKEN = $this->get_accesstoken($APP_ID, $APP_SECRET);
        $argu['jsapi_ticket'] = $this->get_jsapi_ticket($ACCESS_TOKEN);
        $string = "jsapi_ticket=" . $argu[jsapi_ticket] . "&noncestr=" . $argu[nonceStr] . "&timestamp=" . $argu[timestamp] . "&url=" . urldecode($url);
        $argu['signature'] = sha1(trim($string));
        return $argu;
    }


	public function huawei(){
		$site_appId = C('site_appId') ? C('site_appId') : C('WX_APPID');
        $site_appSecret = C('site_appSecret') ? C('site_appSecret') : C('WX_AppSecret');
		//$dir=I('dir');
		$url=I('url');
		$url=str_replace('amp;','',$url);
        //if($mydd!=='127.0.0.1'){
        if (strpos($_SERVER['SERVER_NAME'], '104') === false) {
            $confinfo = $this->get_js_sdk_hw($site_appId, $site_appSecret,urldecode($url));  //)'wx40e4c82c3d9df03e','47065ff14dbea4f06521f6d45740e285'
        }
		echo json_encode($confinfo);
		
	}
}
