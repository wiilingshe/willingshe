<?php
namespace Home\Controller;
use Think\Controller;
class SceneController extends Controller {
    public function unlogin() {
		$sessionid=I('get.sessionid','');
		if($sessionid==''){
			if (intval(session('userid')) == 0) {
				header('Content-type: text/json');
				header('HTTP/1.1 401 Unauthorized');
				echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录!", "obj" => null, "map" => null, "list" => null));
				exit;
			}
		}else{
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
			if(intval($userid)==0){
				header('Content-type: text/json');
				echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录或超时，请重新登陆!", "obj" => null, "map" => null, "list" => null));
				exit;
			}
		}
    }

    public function _initialize() {
        header('Content-type: application/json;charset=UTF-8');
        if (intval(session('userid')) != 100) {
            //$wheresessionuser["userid_int"] = intval(session('userid'));
        }
        if (!defined('VIRIFY')) {
            virifylocal();
        }
    }

    public function addpv() {

        $posturl = 'http://' . $_SERVER ['HTTP_HOST'] . '/?c=stat&a=statget&type=10&sceneid=' . I('get.id', 0);
        $fh = file_get_contents($posturl);
        $returnInfo = D("Scene")->addpv();
    }

    public function usepage() {
        $returnInfo = D("Scene")->usepage();
    }

    public function index() {
        $this->unlogin();
        if (IS_POST) {
            // 登录验证
            //$returnLoginInfo = D("Shoppingcart")->addcart();
            // 生成认证条件
            // 登录成功
            //echo json_encode($returnLoginInfo);
        } else {
            $_scene = M('scene');
            //$where['uid']  = $datainfo['uid'];
            $where['sceneid_bigint'] = I('get.id', 0);
            if (intval(session('userid')) != 1) {
                $where['userid_int'] = intval(session('userid'));
            }
            $where['delete_int'] = 0;
            $_scene_list = $_scene->where($where)->order('sceneid_bigint desc')->select();
            //$this->assign('webtitle','购物车');
            //$this->display();
            echo json_encode(array("success" => true,
                "code" => 200,
                "msg" => "success",
                "obj" => 1,
                "map" => null,
                "list" => null
                    )
            );
        }
    }

    public function create() {
        $this->unlogin();
        if (IS_POST) {
            // 登录验证
            $returnInfo = D("Scene")->addscene();
            // 生成认证条件
            // 登录成功
            //echo json_encode($returnLoginInfo);
        }
    }

    public function createBySys() {
        $this->unlogin();
        if (IS_POST) {
            // 登录验证
            $returnInfo = D("Scene")->addscenebysys();
            // 生成认证条件
            // 登录成功
            //echo json_encode($returnLoginInfo);
        }
    }

    public function createByCopy() {
        $this->unlogin();
        $returnInfo = D("Scene")->addscenebycopy();
    }

    public function on() {
        $this->unlogin();
        $returnInfo = D("Scene")->openscene(1);
    }

    public function off() {
        $this->unlogin();
        $returnInfo = D("Scene")->openscene(2);
    }

    public function publish() {
        $m_scene = M('Scene');
		
        $where['sceneid_bigint'] = I('get.id', 0);
        $datainfo['publishTime'] = time();
        $datainfo['showstatus_int'] = 1;
        $showint = $m_scene->where($where)->getField('showstatus_int');
        $user_data = M('Users')->field('integral_num,company_ext')->where(array('userid_int'=>session('userid')))->find();
        $result = json_decode($user_data['company_ext'],'true');
        if($result['is_audit'] == 'false' && $result['is_integral'] == 'true' && !$showint){//不需要审核+有积分+首次发布
            $add_integal['integral_num'] = $result['integral_num'] + $user_data['integral_num'];
            M('Users')->where(array('userid_int'=>session('userid')))->save($add_integal);
        }elseif($result['is_audit'] == 'true'){
             $datainfo['showstatus_int'] = 0;
             $datainfo['is_show'] = 0;
        }

		$data=json_decode(file_get_contents("php://input"),true);
		$temp = $data['temp'];
		$base64 = explode(',',$temp);
		$url='Uploads/pic/'.intval(session('userid')).'/'.date("Ym");
		mkdir($url,0777,true);
		$file=$url.'/'.date("His").mt_rand(1111,9999).'.png';
		file_put_contents($file, base64_decode($base64[1]));//返回的是字节数
		
		$property=$m_scene->where($where)->getField('property');
		$parr=json_decode($property,true);
		$parr['temp']=$file;
		$datainfo['property'] = json_encode($parr);
		
        $where['userid_int'] = session('userid');
		$ids=M('scenepage')->field('pageid_bigint')->where($where)->order('pagecurrentnum_int asc')->select();
		foreach($ids as $k=> $v){
			$sort=$k+1;
			M('scenepage')->where("pageid_bigint={$v[pageid_bigint]}")->save(array('pagecurrentnum_int'=>$sort)); 
		}
		
        if ($m_scene->data($datainfo)->where($where)->save()) {
            $jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
        } else {
            $jsonstr = '{"success":false,"code":101,"msg":"操作失败","obj":null,"map":null,"list":null}';
        }

        echo $jsonstr;
    }

    public function savepage() {
        $this->unlogin();
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$userid=(int)$userid;
        if (IS_POST) {
            // 登录验证
            //if((session('level_int')=='4'&& session('type')=='1')){	
            $level_int = M('users')->where('userid_int=' . $userid)->getField('level_int');
            if ($level_int == '4') {
                $returnInfo = D("Scenepagesys")->savepagesys();
            } else {
                $returnInfo = D("Scene")->savepage();
            }
            //echo json_encode($returnLoginInfo);
        }
    }

    public function saveSettings() {
        $this->unlogin();
        if (IS_POST) {
            // 登录验证 
            $returnInfo = D("Scene")->savesetting();
            // 生成认证条件
            // 登录成功
            //echo json_encode($returnLoginInfo);
        }
    }

	//场景每一页list
    public function pagelist() {
        $this->unlogin();
        $sceneid = I('get.id', 0);
		$branchid = I('get.branchid', 0);
		//echo $branchid;die;
        if ($sceneid == '1100' || $sceneid == '1101' || $sceneid == '1102' || $sceneid == '1103') {

            $level_int = M('users')->where('userid_int=' . session('userid'))->getField('level_int');
            if ($level_int == '4') { //&& session('type')=='1'
                $_scenepage = M('scenepagesys');
                //$where['uid']  = $datainfo['uid'];
                $where['biztype_int'] = $sceneid;
                $where['myTypl_id'] = 0;

                $_scene_list = $_scenepage->where($where)->order('pagecurrentnum_int asc')->select();
                // 
                $jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
                $jsonstrtemp = '';
                foreach ($_scene_list as $vo) {
                    $jsonstrtemp = $jsonstrtemp . '{"id":' . $vo["pageid_bigint"] . ',"sceneId":' . $vo["biztype_int"] . ',"num":' . $vo["pagecurrentnum_int"] . ',"name":"' . $vo["pagename_varchar"] . '","properties":null,"elements":null,"scene":null},';
                }
                $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . ']}';
                echo $jsonstr;
            } else {

                header('HTTP/1.1 403 Unauthorized');
                exit('{"success":false,"code":403,"msg":"未授权","obj":null,"map":null,"list":null}');
            }
        } else {
            $_scenepage = M('scenepage');
            //$where['uid']  = $datainfo['uid'];
            $where['sceneid_bigint'] = I('get.id', 0);
            $where['myTypl_id'] = 0;
			
			
            /*if (intval(session('userid')) != 1) {
                $where['userid_int'] = intval(session('userid'));
            }*/
            $_scene_list = $_scenepage->where($where)->order('pagecurrentnum_int asc')->select();

            //var_dump($_scene_list);exit;     
            //$this->display();
            $jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
            $jsonstrtemp = '';
            $num = 1;
            foreach ($_scene_list as $vo) {
                $jsonstrtemp = $jsonstrtemp . '{"id":' . $vo["pageid_bigint"] . ',"sceneId":' . $vo["sceneid_bigint"] . ',"num":' . $num++ . ',"name":"' . $vo["pagename_varchar"] . '","properties":null,"elements":null,"scene":null},';
            }
            $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . ']}';
            echo $jsonstr;
        }
    }

    public function pvcount() {
        $this->unlogin();
        $_scene = M('scene');
        $where['userid_int'] = intval(session('userid'));
        $where['delete_int'] = 0;
        $_scene_list = $_scene->where($where)->sum('hitcount_int');
        echo '{"success":true,"code":200,"msg":"success","obj":' . $_scene_list . ',"map":null,"list":null}';
    }

    public function opencount() {
        $this->unlogin();
        $_scene = M('scene');
        $where['userid_int'] = intval(session('userid'));
        $where['delete_int'] = 0;
        $where['showstatus_int'] = 1;
        $_scene_list = $_scene->where($where)->count();
        echo '{"success":true,"code":200,"msg":"success","obj":' . $_scene_list . ',"map":null,"list":null}';
    }

    public function view() {
        header('Content-type: application/json;charset=UTF-8');
		$callback=I('callback');
        $diyname=I('diyname','');
        $_scene = M('scene');
        $isPreview = I('get.preview', 0);
        //$where['uid']  = $datainfo['uid'];
        if (is_numeric(I('get.id', 0))) {
            $where2['sceneid_bigint'] = I('get.id', 0);
        } else {
            $where2['scenecode_varchar'] = I('get.id', 0);
        }
        $where2['delete_int'] = 0;
        $_scene_list2 = $_scene->where($where2)->select();
		$password = I('get.password', '');
        if ($_scene_list2[0]['accesscode'] && $password) {
            if ($password != $_scene_list2[0]['accesscode']) {
                exit('{"success":false,"code":1004,"msg":"服务器异常","obj":null,"map":null,"list":null}');
            }
        }


        $advuserinfo['userid_int'] = $_scene_list2[0]['userid_int'];
        $advUser = M('users');
        $returnadvInfo = $advUser->where($advuserinfo)->find();
        $isad=$returnadvInfo['type'];
        if($returnadvInfo['type']==2){
            $isad=M('company')->where(array('userid_int'=>$advuserinfo['userid_int']))->getField('isad');
            $isad=(int)$isad;
        }else if($returnadvInfo['type']==21){
            $isad=M('company')->where(array('id'=>$returnadvInfo['companyid']))->getField('isad');
            $isad=(int)$isad;
        }
        $this->assign('type', $isad);
        //不同用户类型显示尾页
        $hideeqad = $_scene_list2[0]['hideeqad']==1?$_scene_list2[0]['hideeqad']:false;
		
        $_scenepage = I('get.fromht', 0) ? M('scenepagesys') : M('scenepage');
        $where['sceneid_bigint'] = $_scene_list2[0]['sceneid_bigint'];
        $where['userid_int'] = $_scene_list2[0]['userid_int'];

        if ($_scene_list2[0]['showstatus_int'] != 1) {  //关闭
            if ($_scene_list2[0]['userid_int'] != intval(session('userid'))) {
                
            }
           /* unset($where);
            $where['pageid_bigint'] = C('sys_link_arr.close');*/
        }
        $_scene_list = $_scenepage->where($where)->order('pagecurrentnum_int asc')->select();

        $_scene_list2[0]['lastpageid'] = $_scene_list2[0]['lastpageid'] > 0 ? intval($_scene_list2[0]['lastpageid']) : 0;
        $accessCode = $_scene_list2[0]['accesscode'] ? '"accessCode": ' . $_scene_list2[0]['accesscode'] . ',' : '"accessCode": null,';

        //var_dump($_scene_list2);exit;     
        //$this->display();
		$music_url=$_scene_list2[0]['music_url'];
		if(strlen($music_url)>0){
			
		}else{
			$music_url='[]';
		}
		if($music_url=='[null]'){
			$music_url='[]';
		}
		//echo $music_url;die;
		$jsonstr = '{"success": true,"code": 200,"msg": "操作成功","obj": {"id": ' . $_scene_list2[0]['sceneid_bigint'] . ',"name": ' . json_encode($_scene_list2[0]['scenename_varchar']) . ',"music_url":' . $music_url. ',"createUser": "' . $_scene_list2[0]['userid_int'] . '","type": ' . $_scene_list2[0]['scenetype_int'] . ',"pageMode": ' . $_scene_list2[0]['movietype_int'] . ',
		"image": {"imgSrc": "' . $_scene_list2[0]['thumbnail_varchar'] . '",
		"lastPageId":' . $_scene_list2[0]['lastpageid'] . ',
		"hideEqAd":' . (int) $hideeqad;
        if ($isPreview) {
            //$this->unlogin();
            $jsonstr = $jsonstr . ',"isAdvancedUser": true';
        } else {
            $jsonstr = $jsonstr . ',"isAdvancedUser": ' . $_scene_list2[0]['isadvanceduser'];
        }
        $bgAudio_str = 'null';
        if ($_scene_list2[0]["musicurl_varchar"] != '') {
            $bgAudio_str = '{\"url\":\"' . $_scene_list2[0]['musicurl_varchar'] . '\",\"type\":\"' . $_scene_list2[0]['musictype_int'] . '\"}';
            $jsonstr = $jsonstr . ',"bgAudio": {"url": "' . $_scene_list2[0]["musicurl_varchar"] . '","type": "' . $_scene_list2[0]["musictype_int"] . '"}';
        } else {
            $jsonstr = $jsonstr . ',"bgAudio":null';
        }
        $property = json_decode($_scene_list2[0]['property'], 1);
        $property['hideEqAd'] = $hideeqad;
        $property = json_encode($property);
        $property = str_replace('"', '\"', $property);
        //管理登陆时强制显示页码        
        if (isset($_SESSION['adminUser'])) {
            if (preg_match('/slideNumber/', $property)) {
                $property = str_replace('\"slideNumber\":false,', '\"slideNumber\":true,', $property);
            } else {
                if ($property) {
                    $property = str_replace('}', ',\"slideNumber\":true}', $property);
                } else {
                    $property = '{\"slideNumber\":true}';
                }
            }
        }
        $jsonstr_property = '"property":"' . $property . '",';

        $timeout = $_scene_list2[0]['vi_timeout'] ? $_scene_list2[0]['vi_timeout'] : '""';
        $jsonStr_timeout = C('SYS_LINK') ? '"timeout": ' . $timeout . ',"timeout_url":"' . $_scene_list2[0]['timeout_url'] . '",' : '';

        $_scene_list2[0]['hitcount_int'] = $_scene_list2[0]['hitcount_int'] ? intval($_scene_list2[0]['hitcount_int']) : 0;
        $jsonstr = $jsonstr . '	
        },';
        $jsonstr = $jsonstr . '         
		' . $jsonstr_property . '
		' . $jsonStr_timeout . '
		' . $accessCode . '
		"cover":"' . $_scene_list2[0]['thumbnail_varchar'] . '",
		"bgAudio" :"' . $bgAudio_str . '",     
        "isTpl": 0,
        "isPromotion": 0,
        "status": '.$_scene_list2[0]['showstatus_int'].',
        "openLimit": 0,
        "startDate": null,
        "endDate": null,
        "updateTime": 1426045746000,
		"createTime": 1426572693000,
		"publishTime":1426572693000,
        "applyTemplate": 0,
        "applyPromotion": 0,
        "sourceId": null,
        "code": "' . $_scene_list2[0]['scenecode_varchar'] . '",
        "description": "' . htmlspecialchars(str_replace(array("\r", "\n"), array("\\r", "\\n"), $_scene_list2[0]['desc_varchar'])) . '",
        "sort": 0,
        "pageCount": 0,
        "dataCount": 0,
        "showCount": ' . $_scene_list2[0]['hitcount_int'] . ',
		"eqcode" :"' . $_scene_list2[0]['eqcode'] . '",
        "userLoginName": '.json_encode($returnadvInfo['email_varchar']).',
        "userName": '.json_encode($returnadvInfo['uname']).',
		"islong":' . $_scene_list2[0]['islongpage'] . '
    },
    "map": null,
    "list": [';
        $jsonstrtemp = '';
        foreach ($_scene_list as $vo) {
            $ccccc=$vo["content_text"];
            if($diyname!=''){
                $contarr=json_decode($ccccc,1);
                foreach ($contarr as $kkk => $vvv) {
                    $contarr[$kkk]=str_replace('__diyname__',$diyname, $contarr[$kkk]);
                }
                $ccccc=json_encode($contarr);
            }
            //echo $ccccc;die;
            //		$datas['elements'][$key]['content']=strpos($val['content'],'eqs/link?id=')!==false ? str_replace('eqs/link?id=','?c=scene&a=link&id='):	$val['content'];	
            if (strpos($vo["content_text"], 'eqs\/link?id') !== false) {
                $vo["content_text"] = str_replace('eqs\/link?id', '?c=scene&a=link&id', $vo["content_text"]);
            }
            $vo["properties_text"] = $vo["properties_text"] ? $vo["properties_text"] : 'null';

            $jsonstrtemp = $jsonstrtemp . '{"id": ' . $vo["pageid_bigint"] . ',"sceneId": ' . $vo["sceneid_bigint"] . ',"num": ' . $vo["pagecurrentnum_int"] . ',
				"name": null,"properties":' . $vo["properties_text"] . ',"elements": ' . $ccccc. ',"scene": null},';
        }
        // 
        if (C('IS_COUM_AD')) {

            $jsonstrtemp = get_scene_ad($jsonstrtemp, $_scene_list2, $isPreview);
        }

        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . '';
        $jsonstr = $jsonstr . ']}';
		if($callback!=''){
			echo $callback. "(".$jsonstr.")";
		}else{
			echo $jsonstr;
		}
    }

    public function design() {
        $this->unlogin();
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$userid=(int)$userid;
        $pageid = I('get.id', 0);

        $level_int = M('users')->where('userid_int=' . $userid)->getField('level_int');
        if ($level_int == '4') {   //&& session('type')=='1'
            $sceneid = M('scenepagesys')->where('pageid_bigint=' . $pageid)->getField('biztype_int');

            // echo $sceneid.'dddd';
        }
		
        if ($sceneid && $sceneid < 1104) {

            $_scenepage = M('scenepagesys');
            //$where['uid']  = $datainfo['uid'];
            $where['pageid_bigint'] = I('get.id', 0);
            if (intval($userid) != 1) {
                //$where['userid_int']  = intval(session('userid'));
            }
            $_scene_list = $_scenepage->where($where)->select();

            $_scene = M('scene');
            //$where['uid']  = $datainfo['uid'];
            if (intval($userid) != 1) {
                //$where2['userid_int']  = intval(session('userid'));
            }
            $where2['delete_int'] = 0;
            $where2['sceneid_bigint'] = $_scene_list[0]['biztype_int'];
            $_scene_list2 = $_scene->where($where2)->select();


            $replaceArray = json_decode($_scene_list[0]['content_text'], true);
            foreach ($replaceArray as $key => $value) {
                $replaceArray[$key]['sceneId'] = $_scene_list[0]['biztype_int'];
                $replaceArray[$key]['pageId'] = $where['pageid_bigint'];
            }
            $replaceArray = json_encode($replaceArray);
            $isTpl = $_scene_list2[0]['is_tpl'] ? intval($_scene_list2[0]['is_tpl']) : 0;

            $properties = '{"thumbSrc":"' . $_scene_list[0]["thumbsrc_varchar"] . '"}';
            // if($_scene_list[0]["properties_text"]){
            // $properties.=','.$_scene_list[0]["properties_text"];
            // }
//$_scene_list[0]["properties_text"]=$_scene_list[0]["properties_text"]?$_scene_list[0]["properties_text"]:'{"thumbSrc":"'.$_scene_list[0]["thumbsrc_varchar"].'"}';

            $jsonstr = '{"success": true,"code": 200,"msg": "success","obj": {"id": ' . $_scene_list[0]['pageid_bigint'] . ',"sceneId": ' . $_scene_list[0]['biztype_int'] . ',"num": ' . $_scene_list[0]['pagecurrentnum_int'] . ',"name": null,"properties": ' . $properties . ',"elements": ' . $replaceArray .
                    ',"scene": {"id": ' . $_scene_list2[0]['sceneid_bigint'] . ',"name": ' . json_encode($_scene_list2[0]['scenename_varchar']) . ',"createUser": "' . $_scene_list2[0]['userid_int'] . '","createTime": 1425998747000,"type": ' . $_scene_list2[0]['scenetype_int'] . ',"pageMode": 0,"image": {"imgSrc": "' . $_scene_list2[0]['movietype_int'] . '","isAdvancedUser": false';


            if ($_scene_list2[0]['musicurl_varchar'] != '') {
                $jsonstr = $jsonstr . ',"bgAudio": {"url": "' . $_scene_list2[0]["musicurl_varchar"] . '","type": "' . $_scene_list2[0]["musictype_int"] . '"}';
            }
			$font=$_scene_list2[0]['font'];
			if(!$font){
				$font='[]';
			}
            $jsonstr = $jsonstr . '},"isTpl": ' . $isTpl . ',"isPromotion": 0,"status": 1,"openLimit": 0,	"submitLimit": 0,	"startDate": null,	"endDate": null,	"accessCode": null,	"thirdCode": null,	"updateTime": 1426038857000,	"publishTime": 1426038857000,	"applyTemplate": 0,	"applyPromotion": 0,	"sourceId": null,	"code": "' . $_scene_list2[0]['scenecode_varchar'] . '",	"description": "' .
                    str_replace(array("\r", "\n"), array("\\r", "\\n"), $_scene_list2[0]['desc_varchar']) . '",	"sort": 0,"pageCount": 0,	"dataCount": 0,	"showCount": 0,	"userLoginName": null,"userName": null,"font":' . $font . '}},	"map": null,"list": null}';
            echo $jsonstr;
        } else {
            $_scenepage = M('scenepage');
            //$where['uid']  = $datainfo['uid'];
            $where['pageid_bigint'] = I('get.id', 0);
            /*if (intval(session('userid')) != 1) {
                $where['userid_int'] = intval(session('userid'));
            }*/
            $_scene_list = $_scenepage->where($where)->select();

            $_scene = M('scene');
            //$where['uid']  = $datainfo['uid'];
            /*if (intval(session('userid')) != 1) {
                $where2['userid_int'] = intval(session('userid'));
            }*/
            $where2['delete_int'] = 0;
            $where2['sceneid_bigint'] = $_scene_list[0]['sceneid_bigint'];
            $_scene_list2 = $_scene->where($where2)->select();

            $isTpl = $_scene_list2[0]['is_tpl'] ? intval($_scene_list2[0]['is_tpl']) : 0;
            $replaceArray = json_decode($_scene_list[0]['content_text'], true);
            foreach ($replaceArray as $key => $value) {
                $replaceArray[$key]['sceneId'] = $_scene_list[0]['sceneid_bigint'];
                $replaceArray[$key]['pageId'] = $where['pageid_bigint'];
            }
            $replaceArray = json_encode($replaceArray);

            $jsonstr = '{"success": true,"code": 200,"msg": "success","obj": {"id": ' . $_scene_list[0]['pageid_bigint'] . ',"sceneId": ' . $_scene_list[0]['sceneid_bigint'] . ',"num": ' . $_scene_list[0]['pagecurrentnum_int'] . ',"name": null,"properties": ' . $_scene_list[0]["properties_text"] . ',"elements": ' . $replaceArray . ',' .
                    '"scene": {"id": ' . $_scene_list2[0]['sceneid_bigint'] . ',"name": ' . json_encode($_scene_list2[0]['scenename_varchar']) . ',"createUser": "' . $_scene_list2[0]['userid_int'] . '","createTime": 1425998747000,"type": ' . $_scene_list2[0]['scenetype_int'] . ',"pageMode": ' . $_scene_list2[0]['movietype_int'] . ',"image": {"imgSrc": "' . $_scene_list2[0]['thumbnail_varchar'] . '","isAdvancedUser": false';
            if ($_scene_list2[0]['musicurl_varchar'] != '') {
                $jsonstr = $jsonstr . ',"bgAudio": {"url": "' . $_scene_list2[0]["musicurl_varchar"] . '","type": "' . $_scene_list2[0]["musictype_int"] . '"}';
            }
            $bgAudiotcc = '';
            if ($_scene_list2[0]['musicurl_varchar'] != '') {
                $bgAudiotcc = '"bgAudio" :"{\"url\":\"' . $_scene_list2[0]['musicurl_varchar'] . '\",\"type\":\"' . $_scene_list2[0]['musictype_int'] . '\"}",';
            }
			$font=$_scene_list2[0]['font'];
			if(!$font){
				$font='[]';
			}
            $jsonstr = $jsonstr . '},"isTpl": ' . $isTpl . ',"isPromotion": 0,"status": 1,"openLimit": 0,	"submitLimit": 0,	"startDate": null,	"endDate": null,	"accessCode": null,	"thirdCode": null,	"updateTime": 1426038857000,	"publishTime": 1426038857000,	"applyTemplate": 0,	"applyPromotion": 0,	"sourceId": null,	"code": "' . $_scene_list2[0]['scenecode_varchar'] . '", 
			"cover": "' . $_scene_list2[0]['thumbnail_varchar'] . '",
			"description": "' .
                    str_replace(array("\r", "\n"), array("\\r", "\\n"), $_scene_list[0]['desc_varchar']) . '",	"sort": 0,"pageCount": 0,	"dataCount": 0,	"showCount": ' . $_scene_list2[0]['hitcount_int'] . ', ' . $bgAudiotcc . '	"userLoginName": null,"userName": null,"promIds":null,"font": ' . $font. '}},	"map": null,"list": null}';
            echo $jsonstr;
        }
    }
	
	
	//场景详细资料
    public function detail() {
        $this->unlogin();
        $_scene = M('scene');
        if (intval(session('userid')) != 1) {
            $where['userid_int'] = intval(session('userid'));
        }
		
		//预览子账号场景
		$user=I("get.user",0,'int');
		if($user>0){
			//查询账户user_id  判断是否合法
			$userid_int=$_scene->where("sceneid_bigint='" . I('get.id', 0) . "'")->getField('userid_int');
			if(!$userid_int){
				header('HTTP/1.1 403 Unauthorized');
                echo json_encode(array("success" => false, "code" => 403, "msg" => "参数不合法", "obj" => null, "map" => null, "list" => null));
                exit;
			}
			 $where['userid_int'] =$userid_int;
		}
		
        $where['sceneid_bigint'] = I('get.id', 0);
        $where['delete_int'] = 0;
        $_scene_list = $_scene->where($where)->select();
		
        $_scene_list[0]['lastpageid'] = $_scene_list[0]['lastpageid'] > 0 ? intval($_scene_list[0]['lastpageid']) : 0;


        $updatetime = $_scene_list[0]['updatetime'] ? date('Y-m-d H:i', $_scene_list[0]['updatetime']) : $_scene_list[0]['createtime_time'];
        $publishTime = $_scene_list[0]['publishtime'] > 0 ? $_scene_list[0]['publishtime'] : 'null';
        $jsonstr_ka = '';
        if (C('CURLPOST_BAOBAN_URL')) {
            $userphone = session('phone');
            if (!$userphone) {
                $userphone = M('users')->where('userid_int=' . session('userid'))->getField('phone');
            }
            $cj_url = 'http://' . $_SERVER['HTTP_HOST'] . '/index.php?c=view&id=' . $_scene_list[0]['scenecode_varchar'];
            $jsonstr_ka = '"userphone": "' . $userphone . '", "cj_url":"' . $cj_url . '",';
        }
        $jsonstr_property = '';
        if ($_scene_list[0]['property']) {
            $property = str_replace('"', '\"', $_scene_list[0]['property']);
            $jsonstr_property = '"property":"' . $property . '",';
        }


        $_scene_list[0]['applytemplate'] = $_scene_list[0]['applytemplate'] ? intval($_scene_list[0]['applytemplate']) : 0;
        $_scene_list[0]['applypromotion'] = $_scene_list[0]['applypromotion'] ? intval($_scene_list[0]['applypromotion']) : 0;
        $accessCode = $_scene_list[0]['accesscode'] ? '"accessCode": "' . $_scene_list[0]['accesscode'] . '",' : '"accessCode": null,';
        $loadinglogo = $_scene_list[0]['loadinglogo'] ? '"loadingLogo": "' . $_scene_list[0]['loadinglogo'] . '",' : '"loadingLogo": null,';
        $createTime = strtotime($_scene_list[0]['createtime_time']) . '000';
        //
        $jsonstr = '{
			"success": true,
			"code": 200,
			"msg": "success",
			"obj": {
				"id": ' . $_scene_list[0]['sceneid_bigint'] . ',
				"name": ' . json_encode($_scene_list[0]['scenename_varchar']) . ',
				"createUser": "' . $_scene_list[0]['userid_int'] . '",
				"createTime": "' . $createTime . '",
				"type": ' . $_scene_list[0]['scenetype_int'] . ',
				"pageMode": ' . $_scene_list[0]['movietype_int'] . ',
				"eqcode": "' . $_scene_list[0]['eqcode'] . '",
				"cover": "' . $_scene_list[0]['thumbnail_varchar'] . '",
				' . $jsonstr_property . '
				' . $jsonstr_ka . '				
				"image": {
					"imgSrc": "' . $_scene_list[0]['thumbnail_varchar'] . '",
					"isAdvancedUser": ' . $_scene_list[0]['isadvanceduser'] . ',
                    "lastPageId":' . $_scene_list[0]['lastpageid'] . ',
                    "hideEqAd": true';

        if ($_scene_list[0]["musicurl_varchar"] != '') {
            $jsonstr = $jsonstr . ',"bgAudio": {"url": "' . $_scene_list[0]["musicurl_varchar"] . '","type": "' . $_scene_list[0]["musictype_int"] . '"}';
        }
        $jsonstr = $jsonstr . '},
				"isTpl": 0,
				"isPromotion": ' . intval($_scene_list[0]['applyPromotion']) . ',
				"isShow": ' . intval($_scene_list[0]['applyGuanchan']) . ',
				"status": ' . $_scene_list[0]['showstatus_int'] . ',
				"tagId"   : ' . $_scene_list[0]['tagid_int'] . ',
				"openLimit": 0,
				"submitLimit": 0,
				"startDate": null,
				"endDate": null,
				' . $accessCode . ' 
				' . $loadinglogo . '
				"thirdCode": null,
				"updateTime": "' . $updatetime . '",
				"publishTime": ' . $publishTime . ',
				"price": ' . $_scene_list[0]['price'] . ',
				"applyTemplate": ' . $_scene_list[0]['applytemplate'] . ',
				"applyPromotion": ' . $_scene_list[0]['applypromotion'] . ',
				"sourceId": null,
				"code": "' . $_scene_list[0]['scenecode_varchar'] . '",
				"description":' .json_encode($_scene_list[0]['desc_varchar']). ',
				"sort": 0,
				"bgAudio": {
					"url": "' . $_scene_list[0]["musicurl_varchar"] . '",
					"type": "' . $_scene_list[0]["musictype_int"] . '"
					},
				"pageCount": 0,
				"dataCount": ' . $_scene_list[0]["datacount_int"] . ',
				"showCount": ' . $_scene_list[0]['hitcount_int'] . ',
				"userLoginName": null,
				"userName": null
			},
			"map": null,
			"list": null,
			"token":"' . session_id() . '"
		}';
        echo $jsonstr;
    }

    public function createPage() {
        $this->unlogin();
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$userid=(int)$userid;
        $level_int = M('users')->where('userid_int=' . $userid)->getField('level_int');
        if ($level_int == '4') {

            D("Scenepagesys")->addpagesys();
        } else {

            $_scenepage = M('scenepage');
            $_scene = M('scene');
            $where['pageid_bigint'] = I('get.id', 0);
            $iscopy = I('get.copy', "false");
            $getid = I('get.id', 0);
            if ((session('level_int') != '4')) {
                $where['userid_int'] = intval($userid);
            }
            $_scene_list = $_scenepage->where($where)->select();

            if (!$_scene_list) {
                header('HTTP/1.1 403 Unauthorized');
                echo json_encode(array("success" => false, "code" => 403, "msg" => "false", "obj" => null, "map" => null, "list" => null));
                exit;
            }
            $pagenumY = $_scene_list[0]['pagecurrentnum_int'];
            $datainfo['scenecode_varchar'] = $_scene_list[0]['scenecode_varchar'];
            $datainfo['sceneid_bigint'] = $_scene_list[0]['sceneid_bigint'];
            $datainfo['pagecurrentnum_int'] = $pagenumY + 1;
            $datainfo['createtime_time'] = date('y-m-d H:i:s', time());
            if ($iscopy == "true") {
                $datainfo['content_text'] = $_scene_list[0]['content_text'];
                $datainfo['properties_text'] = $_scene_list[0]['properties_text'];
                $datainfo['pagename_varchar'] = $_scene_list[0]['pagename_varchar'] ? '副本-' . $_scene_list[0]['pagename_varchar'] : '副本-' . '第' . $pagenumY . '页';
            } else {
                $datainfo['content_text'] = "[]";
                $datainfo['properties_text'] = 'null';
            }

            $datainfo['userid_int'] = $userid;
            $result = $_scenepage->add($datainfo);
            if ($result) {
                $where_plist = "sceneid_bigint='" . $_scene_list[0]['sceneid_bigint'] . "' AND userid_int='" . $userid . "' AND pageid_bigint<>'$result' AND pagecurrentnum_int>" . $pagenumY . " ";

                //$sql="UPDATE cj_scenepage   SET  pagecurrentnum_int=pagecurrentnum_int+1 where $where_plist AND pagecurrentnum_int>".$_scene_list[0]['pagecurrentnum_int']." ORDER BY pagecurrentnum_int asc";
                //M()->query($sql);
                // echo D()->getlastsql();

                $photoList = M('scenepage')->field('pagecurrentnum_int,pageid_bigint')->where($where_plist)->order('pagecurrentnum_int asc')->select();
                foreach ($photoList as $k => $row) {
                    $sort = $row['pagecurrentnum_int'] + 1;
                    M('scenepage')->where("pageid_bigint={$row[pageid_bigint]}")->save(array('pagecurrentnum_int' => $sort));
                }
            }

            $where2['sceneid_bigint'] = $_scene_list[0]['sceneid_bigint'];
            if (intval($userid) != 1) {
                $where2['userid_int'] = intval($userid);
            }
            $_scene_list2 = $_scene->where($where2)->select();

            $jsonstr = '{
					"success": true,
					"code": 200,
					"msg": "success",
					"obj": {
						"id": ' . $result . ',
						"sceneId": ' . $_scene_list[0]['sceneid_bigint'] . ',
						"num": ' . ($_scene_list[0]['pagecurrentnum_int'] + 1) . ',
						"name": null,
						"properties": null,
						"elements": null,
						"scene": {
							"id": ' . $_scene_list2[0]['sceneid_bigint'] . ',
							"name": ' . json_encode($_scene_list2[0]['scenename_varchar']) . ',
							"createUser": "' . $_scene_list2[0]['userid_int'] . '",
							"createTime": 1425998747000,
							"type": ' . $_scene_list2[0]['scenetype_int'] . ',
							"pageMode": ' . $_scene_list2[0]['movietype_int'] . ',
							"image": {
								"imgSrc": "' . $_scene_list2[0]['thumbnail_varchar'] . '",
								"isAdvancedUser": false
							},
							"isTpl": 0,
							"isPromotion": 0,
							"status": ' . $_scene_list2[0]['showstatus_int'] . ',
							"openLimit": 0,
							"submitLimit": 0,
							"startDate": null,
							"endDate": null,
							"accessCode": null,
							"thirdCode": null,
							"updateTime": 1426039827000,
							"publishTime": 1426039827000,
							"applyTemplate": 0,
							"applyPromotion": 0,
							"sourceId": null,
							"code": "' . $_scene_list2[0]['scenecode_varchar'] . '",
							"description": "",
							"sort": 0,
							"pageCount": 0,
							"dataCount": 0,
							"showCount": 0, 
							"userLoginName": null,
							"userName": null
						}
					},
					"map": null,
					"list": null,
					"iscopy":"' . $iscopy . '-----' . $getid . '"
				}';
            echo $jsonstr;
        }
    }

    public function delpage() {
        $this->unlogin();
        $map['pageid_bigint'] = I('get.id', 0);
        $level_int = M('users')->where('userid_int=' . session('userid'))->getField('level_int');
        if (($level_int == 4 ) && !I('get.ismy')) {


            $result = M("scenepagesys")->where($map)->delete();
        } else {

            if (intval(session('userid')) != 1) {
                $map['userid_int'] = intval(session('userid'));
            }
            $workid = M("scenepage")->where($map)->getField('sceneid_bigint');
            $result = M("scenepage")->where($map)->delete();

            //updatapagesort($workid);
        }
        if ($result) {
            M('scenedata')->where($map)->delete();
            if (I('get.id', 0) > 0) {
                M('scenedatadetail')->where("pageid_bigint=" . I('get.id'))->delete();
            }
        }
        echo json_encode(array("success" => true,
            "code" => 200,
            "msg" => "success",
            "obj" => null,
            "map" => null,
            "list" => null
                )
        );
    }

    public function getcount() {
        echo json_encode(array("success" => true,
            "code" => 200,
            "msg" => "success",
            "obj" => null,
            "map" => null,
            "list" => null
                )
        );
    }

    public function delscene() {
        $this->unlogin();
        $map['sceneid_bigint'] = I('get.id', 0);
        if (intval(session('userid')) != 1) {
            //$map['userid_int'] = intval(session('userid'));
        }
        $datainfo['delete_int'] = 1;
        M("scene")->data($datainfo)->where($map)->save();

        echo json_encode(array("success" => true,
            "code" => 200,
            "msg" => "删除成功",
            "obj" => null,
            "map" => null,
            "list" => null
                )
        );
    }

    //我的场景列表 
    public function my() {
        $this->unlogin();
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$userid=(int)$userid;
        $_scene = M('scene');
		$branchid=I('get.branchid',0);

        $scenetype = intval(I('get.type', 0));
        if ($scenetype > 0) {
            $where['scenetype_int'] = $scenetype;
        }
        if ($_POST['name'] != null) {
            $where['scenename_varchar'] = array('like', '%' . $_POST['name'] . '%');
        }
		//判断是否为子账号
		if($branchid>0){
			$where['userid_int'] = $branchid;
		}else{
			$where['userid_int'] = intval($userid);
		}
		
		if($branchid>0){
            $m_company_ext = array(
                "data_permiss" => array(
                    "0" => "false",
                    "1" => "false",
                    "2" => "false",
                    ),
                "is_audit" => "false",
                "is_integral" => "false",
                "integral_num" => 0,
                );
			$company_ext=M("users")->where(array('userid_int'=>$branchid))->getfield('company_ext');
            $company_ext = $company_ext ? $company_ext : json_encode($m_company_ext);
		}else{
            $company_ext = array(
                "data_permiss" => array(
                    "0" => "true",
                    "1" => "true",
                    "2" => "true",
                    ),
                "is_audit" => "false",
                "is_integral" => "false",
                "integral_num" => 0,
                );
			$company_ext=json_encode($company_ext);
		}
		
        //$_scene_list=$_scene->order('sceneid_bigint desc')->page(I('get.pageNo',1),I('get.pageSize',12))->select();
        $where['delete_int'] = 0;
		$where['islongpage']=I('get.islongpage',0,'int');
        $pageshowsize = I('pageSize', 12);
        if ($pageshowsize > 30) {
            $pageshowsize = 30;
        }
		if(I('post.pageNo', 1)==1){
			$firstRow=0;
		}else{
			$firstRow=(I('post.pageNo', 1)-1) * $pageshowsize - 1;
		}
		$_scene_list = $_scene->where($where)->order('sceneid_bigint desc')->limit($firstRow, $pageshowsize)->select();
        //$_scene_list = $_scene->where($where)->order('sceneid_bigint desc')->page(I('pageNo', 1), $pageshowsize)->select();
        //print_r($where);
        //echo $_scene->getlastsql();die;
		$_scene_count = $_scene->where($where)->count();

        //print_r($_scene_list);exit;     
        // $this->display();
        $jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map": {"count": ' . $_scene_count . ',"pageNo": ' . I('post.pageNo', 0) . ',"pageSize": ' . $pageshowsize . '},"list": [';
        $jsonstrtemp = '';
        foreach ($_scene_list as $vo) {
            $publishTime = $vo['publishtime'] > 0 ? $vo['publishtime'] : 'null';
            $updateTime = $vo['updateTime'] > 0 ? $vo['updateTime'] : 'null';
            //$vo['showstatus_int']=0;
			$property=$vo["property"]==null?"null":$vo["property"];
            $jsonstrtemp = $jsonstrtemp . '{
            "id": ' . $vo["sceneid_bigint"] . ',
            "name": ' . json_encode($vo["scenename_varchar"]) . ',
            "createUser": "' . $vo['userid_int'] . '",
            "createTime": "' . date("Y-m-d",strtotime($vo["createtime_time"])) . '",
            "type": ' . $vo["scenetype_int"] . ',
            "pageMode": ' . $vo["movietype_int"] . ',
				"cover": "' . $vo['thumbnail_varchar'] . '",			
            "image": {
                "bgAudio": {
                    "url": "' . $vo["musicurl_varchar"] . '",
                    "type": "' . $vo["musictype_int"] . '"
                },
                "imgSrc": "' . $vo["thumbnail_varchar"] . '",
                "hideEqAd": ' . $vo["hideeqad"] . ',
                "isAdvancedUser": ' . $vo["isadvanceduser"] . '
            },
            "isTpl": ' . $vo['is_tpl'] . ',
            "isPromotion": 0,
            "status": ' . $vo['showstatus_int'] . ',
            "openLimit": 0,
            "submitLimit": 0,
            "startDate": null,
            "endDate": null,
            "accessCode": null,
            "thirdCode": null,
            "updateTime": ' . $updateTime . ',
            "publishTime": ' . $publishTime . ',
            "applyTemplate": 0,
            "applyPromotion": 0,
            "sourceId": 1225273,
            "code": "' . $vo["scenecode_varchar"] . '",
            "description": "' . htmlspecialchars($vo['desc_varchar']) . '",
            "sort": 0,
            "pageCount": 0,
            "dataCount": ' . $vo["datacount_int"] . ',
            "showCount": ' . $vo["hitcount_int"] . ',
            "userLoginName": null,
            "userName": null,
			"company_ext":'.$company_ext.',
			"property":'.$property.',
            "resAudit":'.$vo["is_show"].'
        },';
        }
        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . ']}';
        echo $jsonstr;
    }

    //  系统模板列表 
    public function syslist() {
        $this->unlogin();
        $_scene = M('scene');
        $scenetype = intval(I('post.tagId', 0));
        if ($scenetype > 0) {
            $where['tagid_int'] = $scenetype;
        }
        if ($_POST['name'] != null) {
            $where['scenename_varchar'] = array('like', '%' . $_POST['name'] . '%');
        }
        $where['is_tpl'] = 1;
		$where['applyTemplate'] = 2;

        $where['delete_int'] = 0;

        if (I('post.noFree', 0) == 1) {
            $where['price'] = array('gt', 0);
        }
        if (I('post.free', 0) == 1) {
            $where['price'] = 0;
        }

        $pageshowsize = I('post.pageSize', 12);
        if ($pageshowsize > 30) {
            $pageshowsize = 30;
        }
        $order = 'rank desc, updateTime desc, sceneid_bigint desc';
        $orderby = I('post.orderBy', '');
        if ($orderby) {
            $order = $orderby == 'hot' ? 'usecount_int DESC ' : 'sceneid_bigint desc';
        }

        $_scene_list = $_scene->where($where)->order($order)->page(I('post.pageNo', 1), $pageshowsize)->select();
        //echo $_scene->getlastsql();

        $_scene_count = $_scene->where($where)->count();

        $jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map": {"count": ' . $_scene_count . ',"pageNo": ' . I('post.pageNo', 0) . ',"pageSize": ' . $pageshowsize . '},"list": [';
        $jsonstrtemp = '';
        foreach ($_scene_list as $vo) {
            $scene_role = 2;
            if (C('IS_USER_ROLE_SCENE')) {
                $scene_role = getSceneRole($vo['scenetype_int']);
            }
            $vo['price'] = $vo['price'] ? intval($vo['price']) : 0;

            $jsonstrtemp = $jsonstrtemp . '{
            "id": ' . $vo["sceneid_bigint"] . ',
            "name": ' . json_encode($vo["scenename_varchar"]) . ',
            "createUser": "' . $vo['userid_int'] . '",
            "createTime": 1423645519000,
            "type": ' . $vo["scenetype_int"] . ',
            "pageMode": ' . $vo["movietype_int"] . ',
			"price":' . $vo['price'] . ',
			"cover": "' . $vo['thumbnail_varchar'] . '",		
            "image": {
                "bgAudio": {
                    "url": "' . $vo["musicurl_varchar"] . '",
                    "type": "' . $vo["musictype_int"] . '"
                },
                "imgSrc": "' . $vo["thumbnail_varchar"] . '",
                "hideEqAd": false,
                "isAdvancedUser": false
            },
            "isTpl": ' . $vo["is_tpl"] . ',
            "isPromotion": 0,
            "status": ' . $vo['showstatus_int'] . ',
            "openLimit": 0,
            "submitLimit": 0,
            "startDate": null,
            "endDate": null,
            "accessCode": null,
            "thirdCode": null,
            "updateTime": 1423645519000,
            "publishTime": 1423645519000,
            "applyTemplate": 0,
            "applyPromotion": 0,
            "sourceId": 1225273,
            "code": "' . $vo["scenecode_varchar"] . '",
            "description": "' . str_replace(array("\r", "\n"), array("\\r", "\\n"), $vo['desc_varchar']) . '",
            "sort": 0,
            "pageCount": 0,
            "dataCount": 0,
            "showCount": ' . $vo["hitcount_int"] . ',
			 "scene_role": ' . $scene_role . ',
            "userLoginName": null,
            "userName": null
        },';
        }

        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . ']}';
        echo $jsonstr;
    }

    public function promotion() {
        $jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[';
        $_scene = M('scene');
        $scenetype = intval(I('get.type', 0));
        if ($scenetype > 0) {
            $where['scenetype_int'] = $scenetype < 10 ? '10' . $scenetype : $scenetype;
        }
        //$where['userid_int']  = array('gt',0);
        //$where['is_tpl']  =0;
        //$where['delete_int']  = 0;
        $where['applyPromotion'] = 2;  // applyPromotion=1  2015-7-24
        //$where['is_public']  = 1;
        $pageshowsize = I('get.pageSize', 6);
		$where['islongpage']=0;
        if ($pageshowsize > 30) {
            $pageshowsize = 30;
        }
        if (strpos($_SERVER['SERVER_NAME'], 'gordonfz.net') !== false) {
            $pageshowsize = 12;
        }
        if (C('HOME_PAGESIZE')) {
            $pageshowsize = intval(C('HOME_PAGESIZE'));
        }

        $_scene_list = $_scene->where($where)->order('rank desc,sceneid_bigint desc')->page(I('get.pageNo', 1), $pageshowsize)->select();



        $jsonstrtemp = '';
        foreach ($_scene_list as $vo) {
            $jsonstrtemp = $jsonstrtemp . '{
            "id": ' . $vo["sceneid_bigint"] . ',
            "name": ' . json_encode($vo["scenename_varchar"]) . ',
            "createUser": "' . $vo['userid_int'] . '",
            "createTime": 1423645519000,
            "type": ' . $vo["scenetype_int"] . ',
            "pageMode": ' . $vo["movietype_int"] . ',
			"cover":"' . $vo['thumbnail_varchar'] . '",
            "image": {
                "bgAudio": {
                    "url": "' . $vo["musicurl_varchar"] . '",
                    "type": "' . $vo["musictype_int"] . '"
                },
                "imgSrc": "' . $vo["thumbnail_varchar"] . '",
                "hideEqAd": false,
                "isAdvancedUser": false
            },
            "isTpl": 0,
            "isPromotion": 0,
            "status": ' . $vo['showstatus_int'] . ',
            "createTime": "' . $vo['createtime_time'] . '",                  
            "code": "' . $vo["scenecode_varchar"] . '",           
            "sort": 0,
            "pageCount": 0,
            "dataCount": 0,
            "showCount": ' . $vo["hitcount_int"] . ',
            "userLoginName": null,
            "userName": null
        },';
        }

        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . ']}';
        echo $jsonstr;
    }

    public function syspageinfo() {
        $this->unlogin();
        $_scene = M('scenepagesys');
        $scenetype = intval(I('get.id', 0));
        $where['pageid_bigint'] = $scenetype;
        $_scene_list = $_scene->where($where)->select();
        
        $_scene_list[0]['properties_text'] = ($_scene_list[0]['properties_text']) ? ($_scene_list[0]['properties_text']) : 'null';

        $jsonstr = '{"success":true,"code":200,"msg":"success","obj":{"id":' . $_scene_list[0]['pageid_bigint'] . ',"sceneId":1,"num":1,"name":"sys","properties":{"thumbSrc":"' . $_scene_list[0]['thumbsrc_varchar'] . '"},"elements":' . $_scene_list[0]['content_text'] . ',"scene":null},"properties_text":'.$_scene_list[0]['properties_text'].',"map":null,"list":null}';
        echo $jsonstr;
    }

	//前台短图文单页模板调用
    public function syspagetpl() {
        $this->unlogin();
        $_scene = M('scenepagesys');
        $scenetype = I('post.tagId', 0);
        $name = I('post.name','');
		$islong = I('islong',0,'int');
		$where['islong']=$islong;
		$scenetype = explode(',', $scenetype);
        $c = count($scenetype);
        if ($name != '') {
            $where['pagename_varchar'] = array('like', '%' . $name . '%');
        }
        if ($c == 1) {
            $where['tagid_int'] = array('like', '%' . $scenetype[0] . '%');
        } else if ($c == 2) {
            $where['tagid_int'] = array('like', array('%' . $scenetype[0] . '%', '%' . $scenetype[1] . '%'), 'AND');
        } else if ($c == 3) {
            $where['tagid_int'] = array('like', array('%' . $scenetype[0] . '%', '%' . $scenetype[1] . '%', '%' . $scenetype[2] . '%'), 'AND');
        }
        $count = $_scene->where($where)->order('listorder desc,eqid_int desc')->count();
        $_scene_list = $_scene->where($where)->order('listorder desc,pageid_bigint desc,eqid_int desc')->page(I('post.pageNo', 1), I('post.pageSize', 21))->select();
        $jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":{"count":' . $count . ',"pageNo":' . I('post.pageNo', 1) . ',"pageSize":' . I('post.pageSize', 21) . '},"list": [';
        $jsonstrtemp = '';
        foreach ($_scene_list as $vo) {
            $jsonstrtemp = $jsonstrtemp . '{"id":' . $vo["pageid_bigint"] . ',"sceneId":1,"num":1,"name":"name","properties":{"thumbSrc":"' . $vo["thumbsrc_varchar"] . '"},"elements":null,"scene":null},';
        }
        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . ']}';
        echo $jsonstr;
    }


	//前台长图文模板
	
	public function longtpl(){
		$this->unlogin();
		$_scene = M('scene');
		
		$where['cj_scene.islongpage']=1;
		$where['cj_scene.is_tpl']=1;
		$scenetype = I('post.tagId', 0);
		$name = I('post.name','');
		$scenetype = explode(',', $scenetype);
		$c = count($scenetype);
		if ($name != '') {
            $where['scenename_varchar'] = array('like', '%' . $name . '%');
        }
		if ($c == 1) {
            $where['cj_scene.tagid_int'] = array('like', '%' . $scenetype[0] . '%');
        } else if ($c == 2) {
            $where['cj_scene.tagid_int'] = array('like', array('%' . $scenetype[0] . '%', '%' . $scenetype[1] . '%'), 'AND');
        } else if ($c == 3) {
            $where['cj_scene.tagid_int'] = array('like', array('%' . $scenetype[0] . '%', '%' . $scenetype[1] . '%', '%' . $scenetype[2] . '%'), 'AND');
        }
		$count = $_scene->where($where)->order('sceneid_bigint desc')->count();
		$_scene_list = $_scene->join('LEFT JOIN cj_scenepagesys ON cj_scenepagesys.sceneid_bigint = cj_scene.sceneid_bigint')->field('cj_scene.sceneid_bigint,cj_scene.scenename_varchar as name,cj_scenepagesys.thumbsrc_varchar')->where($where)->order('cj_scene.sceneid_bigint desc')->page(I('post.pageNo', 1), I('post.pageSize', 21))->select();
		
		
		
		$data['success']	=true;
		$data['code']		=200;
		$data['msg']		='success';
		$data['obj']		=null;
		$data['map']['count']=$count;
		$data['map']['pageNo']=I('post.pageNo', 1);
		$data['map']['pageSize']=I('post.pageSize', 21);
		$data['list']=$_scene_list;
		
		echo json_encode($data);
		
		
	}
	
	//长图片模板请求信息内容
	public function longshow(){
		$this->unlogin();
		$_scene = M('scenepagesys');
		$where['sceneid_bigint']=I('post.sceneid_bigint', 0);
		$_scene_list = $_scene->where($where)->order('sceneid_bigint desc')->find();
		$data['success']	=true;
		$data['code']		=200;
		$data['msg']		='success';
		$data['obj']		=$_scene_list;
		$data['map']		=null;
		$data['list']		=null;
		echo json_encode($data);
		
	}










    public function myTplSave() {

        $jsonStr = '{"success":true,"code":200,"msg":"操作成功","obj":3138268,"map":null,"list":null}';
        echo $jsonstr;
    }

    public function link() {
        $url = $_GET['url'];
        if ($url) {
            //echo ''.$url."\n";			
            //echo htmlentities($url);			
            $mulu = C('APP2');
            $app2 = $mulu ? '/' . $mulu : '';
            $posturl = 'http://' . $_SERVER ['HTTP_HOST'] . $app2 . '/?c=stat&a=statget&type=1&sceneid=' . I('get.id', 0);

            //$fh = file_get_contents($posturl);
            header('Location: ' . $url);
        }
    }

    public function dial() {
        $tel = I('post.num', 0);
        $id = I('post.id', 0);

        $mulu = C('APP2');
        $app2 = $mulu ? '/' . $mulu : '';
        $posturl = 'http://' . $_SERVER ['HTTP_HOST'] . $app2 . '/?c=stat&a=statget&type=2&sceneid=' . I('get.id', 0);

        $fh = file_get_contents($posturl);
        $jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
        echo $jsonstr;
    }

    public function transfer() {
        $this->unlogin();
        $_user = M('users');
        $username = I('get.loginName', 'yy');
        $sceneid = I('get.id', 0);
        $where['email_varchar'] = $username;
        $userinfo = $_user->where($where)->select();
        if ($userinfo) {
            $_scene = M('scene');
            $where2['sceneid_bigint'] = $sceneid;
            $sceneinfo = $_scene->where($where2)->select();
            M('scene')->where($where2)->save(array('userid_int' => $userinfo[0]['userid_int']));
            M('scenepage')->where($where2)->save(array('userid_int' => $userinfo[0]['userid_int']));
            M('scenedata')->where($where2)->save(array('userid_int' => $userinfo[0]['userid_int']));

            //copyAnlicc($sceneid, $userinfo[0]['userid_int']);
            //print_r($sceneinfo) ;
            $jsonStr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
        } else {
            $jsonStr = '{"success":false,"code":1003,"msg":"账号不存在","obj":null,"map":null,"list":null}';
        }
        echo $jsonStr;
    }

    public function getPageTpl() {
        $this->unlogin();
        $_PageTpl = M('upfilesys');
        $filetype = I('get.type', 1301);
        if ($filetype == 1301) {
            $where['filetype_int'] = 0; // I('get.Type',1301);  // 1311  
            $where['is_lastpage_tpl'] = 1;
            $_PageTpllsit = $_PageTpl->where($where)->order('fileid_bigint asc')->select();
        } else {
            $where2['sceneid_bigint'] = 1311;
			$where2['is_lastpage_tpl'] = 1;
			G('end');
            $_PageTpllsit = M('scenepage')->where($where2)->order('pagecurrentnum_int asc')->select();
        }
		
        $jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
        $jsonstrtemp = '';
        foreach ($_PageTpllsit as $vo) {
            $thumbSrc = $filetype == 1301 ? $vo["filethumbsrc_varchar"] : $vo["thumbsrc_varchar"];
            $id = $filetype == 1301 ? $vo["fileid_bigint"] : $vo["pageid_bigint"];
            $jsonstrtemp = $jsonstrtemp //.'{"id":'.$vo["tagid_int"].',"name":'.json_encode($vo["name_varchar"]).',"createUser":"0","createTime":1423122412000,"bizType":'.$vo["biztype_int"].'},';
                    . '{"id":' . $id . ',"sceneId":' . $filetype . ',"num":1,"name":null,"properties":{"thumbSrc":"' . $thumbSrc . '"},"elements":null,"scene":null},';
        }
        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . '';
        $jsonstr = $jsonstr . ']}';

        echo $jsonstr;
    }

    public function getlastpagebg() {
        $_PageBg = M('upfilesys');
        $id = I('get.id', 0);

        if ($id < 100) {


            $_scenepage = M('scenepage');
            //$where['uid']  = $datainfo['uid'];
            $where['pageid_bigint'] = I('get.id', 0);
            $_scene_list = $_scenepage->where($where)->find();
            $elements = $_scene_list['content_text'];

            $yourweb = str_replace('http://', '', C('lastpagelink'));
            $elements = str_replace(array('http:\/\/s1.eqxiu.com\/eqs\/link?', 'http%3A%2F%2Fwww.eqxiu.com', 'http%3A%2F%2Feqxiu.com', '\u543e\u7231'), array('?c=scene&a=link&id=', 'http%3A%2F%2F' . $yourweb, 'http%3A%2F%2F' . $yourweb, C('lastpagetext')), $elements);

            $_PageBgList[0]["fileid_bigint"] = $where['pageid_bigint'];
        } else {
            $where['fileid_bigint'] = I('get.id', 0);
            $_PageBgList = $_PageBg->where($where)->select();                              //width: 158px; height: 245px; margin-top: -43.5px; margin-left: 0px;
            //$webname=	C('site_name') ? C('lastpagetext'):'一秀2';
            //$weblink=	C('site_url') ? C('lastpagelink'):'一秀3';
            $webname = C('lastpagetext');
            $weblink = C('lastpagelink');
            $elements = '[{"id":183335727,"pageId":26143278,"sceneId":1301,"type":"3","css":{"zIndex":"1"},"properties":{"imgSrc":"' . $_PageBgList[0]["filesrc_varchar"] . '"}},{"id":183335728,"pageId":26143278,"sceneId":1301,"type":"4","css":{"height":"16","zIndex":"2","width":"280","left":"21px","top":"122px"},"properties":{"height":"100px","imgStyle":{"width":280,"height":73,"marginTop":"-24px","marginLeft":"0px"},"width":"100px","src":"line.png"}},{"id":183335732,"pageId":26143278,"sceneId":1301,"type":"4","css":{"zIndex":"3","height":"257","width":"257","left":"84px","top":"170px"},"properties":{"height":"100px","imgStyle":{"width":158,"height":158,"marginTop":"-43.5px","marginLeft":"0px"},"width":"100px","src":"shadow.jpg"}},{"id":183335731,"pageId":26143278,"sceneId":1301,"type":"4","css":{"borderRadius":"0px","borderStyle":"solid","zIndex":"4","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"158","backgroundColor":"","color":"","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","borderWidth":"0px","width":"158","left":"84px","paddingBottom":"0px","top":"170px"},"properties":{"height":"100px","imgStyle":{"width":158,"height":245,"marginTop":"-43.5px","marginLeft":"0px"},"width":"100px","src":"lastbg.jpg"}},{"content":"<div style=\"text-align: center;\"><br></div>","css":{"top":"425px","left":"72px","zIndex":"5","backgroundColor":"rgba(0,0,0,0.5)","opacity":1,"color":"#676767","borderWidth":0,"borderStyle":"solid","borderColor":"rgba(0,0,0,1)","paddingBottom":0,"paddingTop":0,"lineHeight":1,"borderRadius":"22px","transform":"rotateZ(0deg)","borderRadiusPerc":100,"boxShadow":"0px 0px 0px rgba(0,0,0,0.5)","boxShadowDirection":0,"boxShadowSize":0,"width":177,"height":25,"borderBottomRightRadius":"22px","borderBottomLeftRadius":"22px","borderTopRightRadius":"22px","borderTopLeftRadius":"22px"},"id":26,"num":1,"pageId":26143278,"properties":{"width":177,"height":25,"anim":{"type":0,"direction":0,"duration":1,"delay":0,"countNum":1}},"sceneId":1301,"type":2},{"id":183335729,"pageId":26143278,"sceneId":1301,"type":"2","content":"<div style=\"text-align: center;\"><span style=\"font-size: small; line-height: 1; background-color: initial;\"><a href=\"' . $weblink . '\" target=\"_blank\"><font color=\"#ffffff\">免费创建一个场景→</font><font color=\"#fdea02\">' . $webname . '</font></a></span></div>","css":{"borderRadius":"0px","borderStyle":"solid","height":"42","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"6","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"0px","paddingBottom":"20px","top":"413px"},"properties":{"anim":{"type":0,"direction":3,"duration":1,"delay":0.6,"countNum":1}}}]';
        }




        $jsonStr = '{"success":true,"code":200,"msg":"操作成功","obj":{"id":' . $_PageBgList[0]["fileid_bigint"] . ',"sceneId":1301,"num":4,"name":null,"properties":{"thumbSrc":"' . $_PageBgList[0]["filesrc_varchar"] . '"},"elements":' . $elements . ',"scene":null},"map":null,"list":null}';

        //$jsonStr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
        echo $jsonStr;
    }

    public function tagPageList() {
        echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[{"id":1,"name":"图文","bizType":1101,"type":1},{"id":18,"name":"现代","bizType":1103,"type":1},{"id":120,"name":"黄色","bizType":1103,"type":1}]}';
    }

    public function getPageTag() {
        echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[{"id":1,"name":"图文","bizType":1101,"type":1},{"id":2,"name":"图集","bizType":1101,"type":1},{"id":4,"name":"文字","bizType":1101,"type":1},{"id":5,"name":"图表","bizType":1101,"type":1},{"id":6,"name":"报名表","bizType":1102,"type":1},{"id":8,"name":"留言","bizType":1102,"type":1},{"id":9,"name":"联系","bizType":1102,"type":1},{"id":11,"name":"清新","bizType":1103,"type":1},{"id":12,"name":"蓝色","bizType":1103,"type":1},{"id":13,"name":"中国风","bizType":1103,"type":1},{"id":14,"name":"简洁","bizType":1103,"type":1},{"id":15,"name":"黑白","bizType":1103,"type":1},{"id":16,"name":"红色","bizType":1103,"type":1},{"id":17,"name":"怀旧","bizType":1103,"type":1},{"id":18,"name":"现代","bizType":1103,"type":1},{"id":19,"name":"扁平化","bizType":1103,"type":1},{"id":120,"name":"黄色","bizType":1103,"type":1},{"id":121,"name":"绿色","bizType":1103,"type":1},{"id":122,"name":"紫色","bizType":1103,"type":1},{"id":123,"name":"黑色","bizType":1103,"type":1},{"id":124,"name":"白色","bizType":1103,"type":1},{"id":125,"name":"其他","bizType":1103,"type":1},{"id":260,"name":"English","bizType":1103,"type":1},{"id":262,"name":"Android","bizType":1103,"type":1}]}';
    }

     public function countervalues() {
        $scene_id = I('get.sceneId');
        $fieldIds = I('get.fieldIds');
        $where['scene_id'] = $scene_id;
        $where['field_id'] = array('in',$fieldIds);
        $count = M("counter")->field('count,field_id')->where($where)->select();
        $counterct = json_encode($count,true);
        echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":'.$counterct.',"list":null}';
    }

    public function counterset() {
        $fieldIds = I('post.fieldId');
        $scene_id = I('post.sceneId');
        $where['scene_id'] = $scene_id;
        $where['field_id'] = $fieldIds;
        $info = M("counter")->where($where)->find();
        if ($info) {
            M("counter")->where($where)->setInc("count");
        } else {
            $where["count"] = 1;
            $where["ctime"] = time();
            M("counter")->add($where);
        }
        echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"' . $fieldIds . '":"1"},"list":null}';
    }

    public function pv() {
        $scene_id = I('get.sceneId');
        $where['sceneid_bigint'] = $scene_id;
        $info = M("Scene")->where($where)->getField("hitcount_int");
        echo $info;
    }

    public function export() {
        if (!I('id', 0)) {
            $this->error('微课ID不能为空');
        }
        if (!session('adminUser') && intval(session('userid')) == 0) {
            $this->error('请登陆后操作');
        }
        //检查帐户
        if (!session('adminUser')) {
            //查询剩余次数
            $user = M('users')->where(array('userid_int' => session('userid')))->field('type,export_num,xd')->find();
            //判断用户类型
            if($user['type'] == 2 || $user['type'] == 21 || $user['pre_type'] == 2 || $user['pre_type'] == 21 ||  $user['type'] == 23){
                //企业用户不验证次数
                $restr = '<br />企业用户不限次数导出';
            }else{
                //个人用户验证次数
                if ($user['export_num'] > 0 || $user['xd'] >= C('EXPORT_PRICE')) {
                    //有导出次数
                    if ($user['export_num'] > 0) {
                        $re_export_num = $user['export_num'] - 1;
                        $restr = '<br />剩余' . $re_export_num . '次免费导出机会';
                    }else{
                        $restr = '<br />本次导出扣除'.C('EXPORT_PRICE').'微币';
                    }
                } else {
                    $this->error('免费导出次数和微币数量不足,请充值后导出.');
                }
            }
			
        } else {
            $restr = "<br />管理员免费导出不扣量";
        }
		
		if(!session('adminUser')){
		
			//根据id查询us_id
			$user_id=M("scene")->where(array('sceneid_bigint'=>I('id', 0)))->getField('userid_int');
			//根据us_id查询账户信息
			$user=M('users')->where(array('userid_int'=>$user_id))->find();
						
			//如果不是本人导出，判断是否有权限
			if(intval(session('userid'))-$user_id!=0){
				$reglx=json_decode($user['company_ext']['data_permissions'],true);
				if(!$reglx[2]){
					$this->error('您没有导出课件的权限！');
				}
			}
		}
		
        $dest_dir = './Uploads/' . I('id') . '/';
        //删除已生成的数据
        if (is_dir($dest_dir)) {
            deldir($dest_dir);
            @unlink('./Uploads/' . I('id') . '.zip');
        }
        $mkdirresult = makeDir('./Uploads/' . I('id'));
        if (!$mkdirresult)
            exit($dest_dir . "文件夹生成失败,请检查权限");

        recurse_copy('./export', './Uploads/' . I('id'));
        recurse_copy('./view', './Uploads/' . I('id') . "/view");
		deldir('./Uploads/' . I('id').'/assets/fonts');
		makeDir('./Uploads/' . I('id').'/assets/fonts');
//G('begin');
        //生成JSON数据
        $geturl = "http://" . $_SERVER["HTTP_HOST"] . "/index.php?c=scene&a=view&id=" . I('id') . "&time=" . time();
        $jsondata = file_get_contents($geturl);
// G('end');
// echo $geturl;
// echo G('begin','end').'s';
// die;        $jsondata = str_replace(array("\r\n", "\r", "\n"), "", $jsondata);
		$jsondata = trim($jsondata, "\xEF\xBB\xBF");

        //去掉广告
        //$jsondata = str_replace(',\"hideEqAd\":false', ',\"hideEqAd\":true', $jsondata);
        $this->assign('jsondata', $jsondata);
		
        //处理其中的图片文件
        $arrjsondata = json_decode($jsondata, 1);
		
		$islong=(int)$arrjsondata['obj']['islong'];
		if(1==$islong){
			$tp="longexport";
		}else{
			$tp="export";
		}
		if(1==$islong){
			recurse_copy('./Public/longView', './Uploads/' . I('id').'/longView');
		}
        foreach ($arrjsondata['list'] as $list) {
            foreach ($list['elements'] as $ele) {
                //图片
                if (!empty($ele['properties']['src'])) {
                    makeDir(dirname($dest_dir . $ele['properties']['src']));
                    $r = copy('./Uploads/' . $ele['properties']['src'], $dest_dir . $ele['properties']['src']);
                    //echo $ele['properties']['src'].$r?'true':'false';
                }
                //背景
                if (!empty($ele['properties']['imgSrc'])) {
                    makeDir(dirname($dest_dir . $ele['properties']['imgSrc']));
                    $r = copy('./Uploads/' . $ele['properties']['imgSrc'], $dest_dir . $ele['properties']['imgSrc']);
                    //echo $ele['properties']['imgSrc'].$r?'true':'false';
                }
                //音乐
                if (!empty($ele['sound']['src'])) {
                    makeDir(dirname($dest_dir . $ele['sound']['src']));
                    $r = copy('./Uploads/' . $ele['sound']['src'], $dest_dir . $ele['sound']['src']);
                    //echo $ele['properties']['imgSrc'].$r?'true':'false';
                }
                //图集
                if (!empty($ele['properties']['children'])) { //如果有图集
                    foreach ($ele['properties']['children'] as $children) { //循环图集数组
                        makeDir(dirname($dest_dir . $children['src'])); //生成目标路径
                        $r = copy('./Uploads/' . $children['src'], $dest_dir . $children['src']); //拷贝图集图片到目的路径
                    }
                }
				
            }
        }
        //背景音乐
        if (!empty($arrjsondata['obj']['image']['imgSrc'])) {
            makeDir(dirname($dest_dir . $arrjsondata['obj']['image']['imgSrc'])); //生成目标路径
            copy('./Uploads/' . $arrjsondata['obj']['image']['imgSrc'], $dest_dir . $arrjsondata['obj']['image']['imgSrc']);
        }
        //封面
        if (!empty($arrjsondata['obj']['image']['bgAudio']['url'])) {
            makeDir(dirname($dest_dir . $arrjsondata['obj']['image']['bgAudio']['url'])); //生成目标路径
            copy('./Uploads/' . $arrjsondata['obj']['image']['bgAudio']['url'], $dest_dir . $arrjsondata['obj']['image']['bgAudio']['url']);
        }
		
		
        //生成HTML
        ob_start();
        //场景HTMLstart
        $_scene = M('scene');
        if (is_numeric(I('get.id', 0))) {
            $where['sceneid_bigint'] = I('get.id', 0);
        } else {
            $where['scenecode_varchar'] = I('get.id', 0);
        }
        $where['delete_int'] = 0;
        $_scene_list = $_scene->where($where)->select();
        if ($_scene_list[0]['loadinglogo']) {
            makeDir(dirname($dest_dir . $_scene_list[0]['loadinglogo']));
            $r = copy('./Uploads/' . $_scene_list[0]['loadinglogo'], $dest_dir . $_scene_list[0]['loadinglogo']);
        }

		
		//字体导出开始
		$fst=glob('./Uploads/'.$_scene_list[0]['sceneid_bigint'].'/assets/fonts/*');
		
		$font=json_decode($_scene_list[0]['font'],true);
		foreach($font as $usf){
			copy('./assets/fonts/' . $usf.'.woff', './Uploads/'.$_scene_list[0]['sceneid_bigint'].'/assets/fonts/'. $usf.'.woff');
		}
		
		
		
		$music_url=json_decode($_scene_list[0]['music_url'],true);
		
		
		$ccc=count($music_url);
		//\Think\Log::write("url地址 \n ".var_export($ccc,true));
		foreach ($music_url as $k=>$v){ 
		  if (!empty($v['url'])) {
		  	//\Think\Log::write("url地址 \n ".var_export($music_url[$k]['url'],true));
            makeDir(dirname($dest_dir . $v['url'])); //生成目标路径
            copy('./Uploads/' . $v['url'], $dest_dir . $v['url']);
			}
		} 
        $argu2 = array();
        $argu2['workid'] = $_scene_list[0]["sceneid_bigint"];
        $argu2['title'] = $_scene_list[0]["scenename_varchar"];
        $argu2['url'] = C('IS_OPEN_STATIC') ? 'v-' . $_scene_list[0]["scenecode_varchar"] : 'index.php?c=view&id=' . $_scene_list[0]["scenecode_varchar"];
        $argu2['desc'] = $_scene_list[0]["desc_varchar"];
        $argu2['imgsrc'] = $_scene_list[0]["thumbnail_varchar"];
        $this->assign("confinfo2", $argu2);
        $this->assign("sceneinfo", $_scene_list[0]);
        $type = M('users')->where(array('userid_int' => $_scene_list[0]['userid_int']))->getField('type');
        $this->assign('type', $type);
        //修改
        if($type == 2){
            $isad=M('company')->where(array('userid_int'=>$_scene_list[0]['userid_int']))->getField('isad');
            $isad=(int)$isad;
        }elseif($type == 21){
            $isad=M('company')->where(array('id'=>$_scene_list[0]['companyid']))->getField('isad');
            $isad=(int)$isad;
        }else{
            $isad = (int)$type;
        }
        if(session('userid')==7911){   //7911 luql@fenqi.im 导出不显示二维码
            $this->assign("noqrcode",1);
        }
        $this->assign("isad",$isad);
        $this->assign("confinfo", $confinfo);
        $this->display($tp);

        //场景end
        $string = ob_get_clean();
		$string =str_replace('\/syspic','syspic',$string); 

        file_put_contents('./Uploads/' . I('id') . '/index.html', $string);
        ob_flush();
        flush();
        ob_clean();

        //处理SCORM标准的XML文件
        file_put_contents($dest_dir . "imsmanifest.xml", str_replace("课程", $argu2['title'], file_get_contents($dest_dir . "imsmanifest.xml")));
        //PHP压缩可能会超时,此处使用系统命令压缩
		
		
		$fn='Uploads/'. I('id').'.zip';
		$f='Uploads/'.I('id').'/';
		
		import('ORG.Util.PclZip');
		$archive = new \PclZip($fn);
		$list = $archive->create($f,PCLZIP_OPT_REMOVE_PATH, $f);
		
        if ($list==0)
            $this->error('压缩失败');
        $this->success('<iframe src="' . __ROOT__ . '/Uploads/' . I('id') . '.zip' . '" style="display:none;"></iframe>导出成功,正在下载压缩包...' . $restr, "javascript:window.opener=null;window.open('','_self'); window.close();",3);
        //扣量处理
        //记录导出
        $data = array(
            'user_id' => intval(session('userid')),
            'sceneid' => I('get.id', 0),
        );
        M('export_log')->add($data);

        //如果是管理员导出不扣量
        // if (!session('adminUser')) {
        //     if($user['type'] == 2 || $user['type'] == 21 || $user['pre_type'] == 2 || $user['pre_type'] == 21){
        //         //企业用户和设计师企业用户不扣微币                 
        //     }else{
        //         //个人用户扣次数或微币
        //         if ($user['export_num'] > 0) {
        //             M('users')->where(array('userid_int' => session('userid')))->setDec('export_num');
        //         } else {
        //             //扣除微点
        //             M('users')->where(array('userid_int' => session('userid')))->setDec('xd', C('EXPORT_PRICE'));
        //             //记录微点
        //             $adddata = array('userid_int' => session('userid'), 'sceneid' => I('get.id'), 'remark' => '导出微课【' . $argu2['title'] . '】', 'opttime' => time(), 'xd' => C('EXPORT_PRICE'), 'biztype' => 2, 'biztitle' => '微课导出');
        //             M('xdlog')->add($adddata);
        //         }
        //     }            
        // }
    }
	
	
	//设单页背景音乐
	
	public function bg_music(){
		$this->unlogin();
		$datas = json_decode(file_get_contents("php://input"), true);
		$sceneid=$datas['sceneId'];
		$num	=$datas['num'];
		$music_url=M('scene')->where(array('sceneid_bigint'=>$sceneid))->getField('music_url');
		
		//\Think\Log::write("声画同步背景音乐 \n ".var_export(M('scene')->getLastSql(),true)); 
		$music_url= (array)json_decode($music_url,true);
		$music_url=array_filter($music_url);
		sort($music_url);

		//\Think\Log::write("声画同步背景音乐 \n ".var_export($music_url,true)); 
		if($datas['url']!=''){
			$music['id']		=$datas['id'];
			$music['name']		=$datas['name'];
			$music['url']		=$datas['url'];
			$music['isPlaying']	=$datas['isPlaying'];
			$music['size']		=$datas['size'];
			$music['num']		=$datas['num'];
			$music['sceneId']	=$datas['sceneId'];
		}else{
			$music	=null;
		}
		
		$arr = array(array());
		$count=count($music_url);
		if($count==0){
			$arr[0]=$music;
			M('scene')->where(array('sceneid_bigint'=>$sceneid))->save(array('music_url'=>json_encode($arr)));
			echo 0;
			exit();
		}
		//判断是否存在本页数据
		//存在直接替换本行   不存在加在后面
		for($x=0;$x<$count;$x++){
			if($music_url[$x]['num']-$num==0){
				array_splice($music_url,$x,1);
			}
		}
		
		$music_url[]=$music;

		//\Think\Log::write(var_export($count,true));
		$content=json_encode($music_url);
		//\Think\Log::write("声画同步背景音乐 \n ".var_export($content,true));
		M('scene')->where(array('sceneid_bigint'=>$sceneid))->save(array('music_url'=>$content));
		echo 1;
		//\Think\Log::write("声画同步背景音乐 \n ". M('scene')->getLastSql() );
	
	}
	
	
	
	//PPT图片导入
	public function pptsave(){
		$this->unlogin();
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$userid=(int)$userid;
        $rawpostdata = file_get_contents("php://input");  
        $post = json_decode($rawpostdata, true);  
		$sceneid_bigint=(int)$post['seceneId'];
		$way=(int)$post['way'];
        //echo $way;die;
		
		$scenecode_varchar=M('scene')->where(array('sceneid_bigint'=>$sceneid_bigint))->getField('scenecode_varchar');
		//echo count($data['obj']);
		$pages=M('scenepage')->where(array('sceneid_bigint'=>$sceneid_bigint))->count();
		if(0==count($post['obj'])){
			echo '{"success":false,"code":400,"msg":"导入失败，请先上传图片","obj":null,"map":null,"list":null}';
			die;
		}
		if(1==$pages){
			$content_text=M('scenepage')->where(array('sceneid_bigint'=>$sceneid_bigint))->getField('content_text');
			if('[]'==$content_text){
				$str=M('scenepage')->where(array('sceneid_bigint'=>$sceneid_bigint))->delete();
				$pages=0;
			}
		}

		foreach ($post['obj'] as $k=>$v) { 
			if(1==$way){
				$this->flip('Uploads/'.$v['url']);
			}
			
			$data=array('sceneid_bigint'=>$sceneid_bigint,'scenecode_varchar'=>$scenecode_varchar,'pagecurrentnum_int'=>$pages+$k+1,'createtime_time'=>date('Y-m-d H:i:s', time()),'content_text'=>'ssssssssssssss','pagename_varchar'=>null,'userid_int'=>$userid,'properties_text'=>'null','myTypl_id'=>0);
			$pageid=M('scenepage')->add($data);
			$content_text='[{"content":null,"css":[],"id":'.rand(0000000000,9999999999).',"num":0,"pageId":'.$pageid.',"properties":{"bgColor":null,"imgSrc":"'.str_replace('/','\/',$v['url']).'","id":0},"sceneId":'.$sceneid_bigint.',"title":null,"type":3}]';
			M('scenepage')->where('pageid_bigint='.$pageid)->save(array('content_text'=>$content_text));
		}
		
		echo '{"success":true,"code":200,"msg":"导入成功","obj":null,"map":null,"list":null}';
	}
	
	//图片旋转
	function  flip($filename,$degrees = -90)
	{
		//读取图片
		$data = @getimagesize($filename);
		if($data==false)return false;
		//读取旧图片
		switch ($data[2]) {
			case 1:
				$src_f = imagecreatefromgif($filename);break;
			case 2:
				$src_f = imagecreatefromjpeg($filename);break;
			case 3:
				$src_f = imagecreatefrompng($filename);break;
		} 
		if($src_f=="")return false;
		$rotate = @imagerotate($src_f, $degrees,0);
		if(!imagejpeg($rotate,$filename,100))return false;
		@imagedestroy($rotate);
		return true;
	}
	
	//新版后台转换
	function psd(){
		header("Access-Control-Allow-Origin: *");
        ini_set('max_execution_time', 600);
		$this->unlogin();
		$userid=(int)session('userid');
		if(IS_POST){
			$sceneid=I('sceneid',0,'int');	//所属课件
			$pageid=I('pageid',0,'int');		//层ID

			$savePath='pic/'.$userid.'/'.date('Ym').'/' ;
			mkdir('Uploads/'.$savePath,0777,true);
			$upload = new \Think\Upload();// 实例化上传类
			$upload->maxSize   =     40*1024*1024 ;// 设置附件上传大小
			$upload->exts      =     array('psd');// 设置附件上传类型
			$upload->autoSub   = 	 false;
			$upload->savePath  =  	 $savePath; // 设置附件上传目录    // 上传文件     
			$info   =   $upload->upload(); 
			if(!$info) {// 上传错误提示错误信息 
				echo '{"success":false,"code":1001,"msg":"'.$upload->getError().'","obj":null,"map":null,"list":null}';
				die;
				$this->error($upload->getError());    
			}
			$file=$info['file']['savename'];
			$psd='Uploads/'.$savePath.$file;
			//echo $psd;die;
			$db=M('psd');
			$data['userid']=$userid;
			$data['sceneid']=$sceneid;
			$data['pageid']=$pageid;
			$data['url']=$savePath.$file;
			$data['isok']=0;
			$psdid=$db->add($data);
			echo '{"success":true,"code":200,"msg":"PSD文件上传成功,正在后台转换，请等待转换完成","obj":{"psdid":'.$psdid.'},"map":null,"list":null}';
		
		}else{
			$this->display();
		}
	}
	
	public function psdchange(){
		$id=I('psdid',0,'int');		//页ID
		$isok=M('psd')->where(array('id'=>$id))->getField('isok');
		if($isok==1){
			echo '{"success":true,"code":200,"msg":"PSD文件转换成功","obj":null,"map":null,"list":null}';
		}else{
			echo '{"success":false,"code":1001,"msg":"PSD文件正在转换","obj":null,"map":null,"list":null}';
		}
	}
	
	
	
	
	//旧版直接转换
	function psd666(){
		header("Access-Control-Allow-Origin: *");
        ini_set('max_execution_time', 600);
		$this->unlogin();
		$userid=(int)session('userid');
		if(IS_POST){
			$sceneid=I('sceneid',0,'int');	//所属课件
			$pageid=I('pageid',0,'int');		//层ID

			$savePath='pic/'.$userid.'/'.date('Ym').'/' ;
			$upload = new \Think\Upload();// 实例化上传类
			$upload->maxSize   =     40*1024*1024 ;// 设置附件上传大小
			$upload->exts      =     array('psd');// 设置附件上传类型
			$upload->autoSub   = 	 false;
			$upload->savePath  =  	 $savePath; // 设置附件上传目录    // 上传文件     
			$info   =   $upload->upload(); 
			if(!$info) {// 上传错误提示错误信息 
				echo '{"success":false,"code":1001,"msg":"'.$upload->getError().'","obj":null,"map":null,"list":null}';
				die;
				$this->error($upload->getError());    
			}
			$file=$info['file']['savename'];
			$psd='Uploads/'.$savePath.$file;
			//echo $psd;die;
			$im = new \Imagick($psd);
			$num_layers = $im->getNumberImages();
			session('bl',1);
			for ($i = 0 ; $i < $num_layers; ++$i) {
				$im->setIteratorIndex($i);      //or this is kinda redundant
				$pagedata=$im->getImagePage();
				$f=$savePath.date('dHis').$i.'.png';
				$data=array();
				if($i==0){
					$bl=320/$pagedata["width"];
					session('bl',$bl);
				}else{
					//素材插入用户素材表upfile，获取素材编号
					$data['userid_int']=$userid;
					$data['filetype_int']=1;
					$data['filesrc_varchar']=$f;
					$data['create_time']=date('Y-m-d H:i:s');
					$data['sizekb_int']=10.00;
					$data['filethumbsrc_varchar']=$f;
					$data['biztype_int']=0;
					$data['ext_varchar']='png';
					$data['filename_varchar']=$f;
					$data['eqsrc_varchar']='';
					$data['tagid_int']=0;
					$data['delete_int']=0;
					$fid=M('upfile')->add($data);
					$bl=session('bl');
					$arr[$i-1]['content']	="";
					$arr[$i-1]['css']		=array('top'=>($bl*$pagedata["y"]),'zIndex'=>$i-1,'width'=>($bl*$pagedata["width"]),'height'=>($bl*$pagedata["height"]),'left'=>($bl*$pagedata["x"]));
					$arr[$i-1]['id']		=abs(crc32(time().$f));
					$arr[$i-1]['num']		=1;
					$arr[$i-1]['pageId']	=$pageid;
					$arr[$i-1]['properties']=array('width'=>($bl*$pagedata["width"]),'height'=>($bl*$pagedata["height"]),'src'=>$f,'id'=>$fid,'imgStyle'=>array('width' => ($bl*$pagedata["width"]),'height' => ($bl*$pagedata["height"]),'marginTop' => '0px','marginLeft' => '0px'));
					$arr[$i-1]['sceneId']	=$sceneid;
					$arr[$i-1]['title']	='';
					$arr[$i-1]['type']	=4;
					//拼凑array，更新scenepage层信息
				
				
				
			   		$im->writeImage('Uploads/'.$f); //导出所有图层到单独的png文件
					exec('C:\pngquant\pngquant.exe -f --ext .png --quality 50-80 D:/vxuebao/Uploads/'.$f);
				}
			}
			session('bl',null); 
			$content_text=json_encode($arr);
			M('scenepage')->where('pageid_bigint='.$pageid)->save(array('content_text'=>$content_text)); 
			$im->clear();  
			$im->destroy(); 
			echo '{"success":true,"code":200,"msg":"PSD导入成功","obj":null,"map":null,"list":null}';
		
		}else{
			$this->display();
		}
	}
	
	
	//一次性获取图片音乐列表
	public function getalbum(){
		$this->unlogin();
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$userid=(int)$userid;
		$sceneid=I('sceneid',0,'int');
		//音乐获取
		$data1=M('scene')->where(array('sceneid_bigint'=>$sceneid))->getField('music_url');
		$scenecode=M('scene')->where(array('sceneid_bigint'=>$sceneid))->getField('scenecode_varchar');
		$music=json_decode($data1,true);
		$num = array();
		foreach ($music as $k=>$v){
			$m[$k]['num']=$music[$k]['num'];
			$m[$k]['url']=$music[$k]['url'];
			$num[$k] = $v['num'];
		}
		array_multisort($num, SORT_ASC, $m);
		
		//背景图片获取
		$data2=M('scenepage')->where(array('sceneid_bigint'=>$sceneid))->order('pagecurrentnum_int asc')->field('pagecurrentnum_int,content_text,pageid_bigint')->select();
		if(!$data1 && !$data2){
			echo '{"success":false,"code":400,"msg":"获取失败","obj":null,"map":null,"list":null}';
			die;
		}
		//print_r($data2);
		//$bg=array_column($data2,'content_text');
		foreach ($data2 as $k=>$v) 
		{ 
		  $img=json_decode($data2[$k]['content_text'],true);
		  $p=$img[0]['properties']['imgSrc'] ? $img[0]['properties']['imgSrc'] : null;
		  $imgSrc[$k]['num']=$data2[$k]['pagecurrentnum_int'];
		  $imgSrc[$k]['src']=$p;
		  $imgSrc[$k]['pageid']=$data2[$k]['pageid_bigint'];
		} 
		//print_r($imgSrc);
		$arr['success']=true;
		$arr['code']=200;
		$arr['msg']='获取成功';
		$arr['obj']=null;
		$arr['map']=null;
		$arr['list']=array('scenecode'=>$scenecode,'music'=>$m,'imgSrc'=>$imgSrc);
		echo json_encode($arr);
	}
	
	
	
	//app保存课件
	public function appsavesetting(){
		$this->unlogin();
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$userid=(int)$userid;
		$act			=I('act');
		$sceneid		=I('sceneid',0,'int');
		$data['scenename_varchar']	=I('scenename','');
		$data['thumbnail_varchar']	=I('thumbnail','');
		$data['desc_varchar']		=I('desc','');
		
		if($act=='add'){	//制作微课,同时创建一页空白
			$data['scenecode_varchar']	='U' . (date('y', time()) - 9) . date('m', time()) . date('d', time()) . randorderno(10, -1);
			$data['movietype_int']	=0;
			$data['scenetype_int']	=101;
			$data['ip_varchar']	=get_client_ip();
			$data['userid_int']	=$userid;
			$data['createtime_time']	=date('y-m-d H:i:s', time());
			$data['is_public']	=0;
			$result=M('scene')->add($data);
			if($result){
				$data2['scenecode_varchar'] = $data['scenecode_varchar'];
				$data2['sceneid_bigint'] = $result;
				$data2['content_text'] = "[]";
				$data2['properties_text'] = 'null';
				$data2['userid_int'] = $userid;
				$data2['createtime_time'] = date('y-m-d H:i:s', time());
				$result2 = M('scenepage')->add($data2);
				echo json_encode(
					array("success" => true,
					"code" => 200,
					"msg" => "success",
					"obj" => array('scenecode'=>$data['scenecode_varchar'],'sceneid'=>$result,'pageid'=>$result2),
					"map" => null,
					"list" => null
                    )
				);
			
			}else {
            	exit;
        	}


			
		}else{		//修改更新微课
			$rs=M('scene')->where(array('sceneid_bigint'=>$sceneid))->save($data);
			$scenecode=M('scene')->where(array('sceneid_bigint'=>$sceneid))->getField('scenecode_varchar');
			if($rs){
				echo json_encode(
					array("success" => true,
					"code" => 200,
					"msg" => "设置成功",
					"obj" => array('scenecode'=>$scenecode,'sceneid'=>$sceneid,'pageid'=>''),
					"map" => null,
					"list" => null
                    )
				);

				die;
			}else{
				echo json_encode(
					array("success" => false,
					"code" => 400,
					"msg" => "设置失败",
					"obj" => array('scenecode'=>$scenecode,'sceneid'=>$sceneid,'pageid'=>''),
					"map" => null,
					"list" => null
                    )
				);
				die;
			}
		}
	}
	
	
	
	//app保存页
	public function appsavepage(){
		$this->unlogin();
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$userid=(int)$userid;
		$sceneid=I('sceneid');
		$pageid	=I('pageid');
		$act	=I('act');
		$imgSrc	=I('imgSrc','');
		$mmm	=I('music','');
		$num	=I('num');
		//print_r($_POST);die;
		$scenecode=I('scenecode');
		
		if($imgSrc=='' && $mmm==''){
			echo json_encode(
					array(
						"success" => false,
						"code" => 400,
						"msg" => "音乐和图片不能同时为空",
						"obj" => null,
						"map" => null,
						"list" => null
                    )
				);
			die;
		}
		$tot=0;
		if($imgSrc!=''){
			$data['sceneid_bigint']=$sceneid;
			$data['scenecode_varchar']=$scenecode;
			$data['pagecurrentnum_int']	=$num;
			$data['createtime_time']	=date('y-m-d H:i:s', time());
			$data['userid_int']=$userid;
			$data['properties_text']='null';
			$data['myTypl_id']=0;
			
			$arr['content']	=null;
			$arr['css']		=array();
			$arr['id']		=rand(0000000000,9999999999);
			$arr['num']		=0;
			$arr['pageId']	=$pageid;
			$arr['properties']	=array('bgColor'=>null,'imgSrc'=>$imgSrc,'id'=>610033);
			$arr['sceneId']	=0;
			$arr['title']	=null;
			$arr['type']	=3;
			//页的背景图
			$data['content_text']='['.json_encode($arr).']';
			if($act=='add'){
				$pageid = M('scenepage')->add($data);
			}else{
				$result = M('scenepage')->where(array('pageid_bigint'=>$pageid))->save(array('content_text'=>$data['content_text']));
			}
			$tot=$tot+1;
		}
		//当前页音乐处理
		if($mmm!=''){
			$music_url=M('scene')->where(array('sceneid_bigint'=>$sceneid))->getField('music_url');
			$music_url= (array)json_decode($music_url,true);
			
			$music['id']		=0;
			$music['name']		='app音乐';
			$music['url']		=$mmm;
			$music['isPlaying']	=false;
			$music['size']		=null;
			$music['num']		=$num;
			$music['sceneId']	=$sceneid;
			
			$arr = array(array());
			$count=count($music_url);
			
			if($count==0){
				$arr[0]=$music;
				M('scene')->where(array('sceneid_bigint'=>$sceneid))->save(array('music_url'=>json_encode($arr)));
			}else{
			
				//判断是否存在本页数据
				//存在直接替换本行   不存在加在后面
				for($x=0;$x<$count;$x++){
					if($music_url[$x]['num']-$num==0){
						array_splice($music_url,$x,1);
					}
				}
				$music_url[]=$music;
				$content=json_encode($music_url);
				M('scene')->where(array('sceneid_bigint'=>$sceneid))->save(array('music_url'=>$content));
			}
			$tot=$tot+1;
		}
		
		if($tot>0){
			echo json_encode(
					array(
						"success" => true,
						"code" => 200,
						"msg" => "设置成功",
						"obj" => array('scenecode'=>$scenecode,'pageid'=>$pageid,'num'=>$num),
						"map" => null,
						"list" => null
                    )
				);
		}else{
			echo json_encode(
					array(
						"success" => false,
						"code" => 400,
						"msg" => "设置失败",
						"obj" => array('scenecode'=>$scenecode,'pageid'=>$pageid,'num'=>$num),
						"map" => null,
						"list" => null
                    )
				);
		}
		
		
	}
	
	
	
	//判断是否有手机上传
	public function mobfile(){
		$this->unlogin();
		header('Content-type: application/json;charset=UTF-8');
		$user_id=(int)session('userid');
		$type=I('type',1,'int');	//1图片 2音乐
		if($user_id==0){
			echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录!", "obj" => null, "map" => null, "list" => null));
			exit;
		}
		$data=M('upfile')->where(array('userid_int'=>$user_id,'filetype_int'=>$type,'delete_int'=>2))->select();
		if($data){
			echo json_encode(
				array(
					"success" => true,
					"code" => 200,
					"msg" => "手机上传成功",
					"obj" => null,
					"map" => null,
					"list" => $data
                )
            );
			M('upfile')->where(array('userid_int'=>$user_id,'filetype_int'=>$type,'delete_int'=>2))->save(array('delete_int'=>0));
		}else{
			echo json_encode(
				array(
					"success" => false,
					"code" => 400,
					"msg" => "正在上传",
					"obj" => null,
					"map" => null,
					"list" =>null
                )
            );
		}
	}

    //提交审核
    public function subAudit(){
        $this->unlogin();
        $scene = M('scene');
        $where['sceneid_bigint'] = I('post.sceneid',0,'int'); 
        //提交审核的时候给news表添加一条提醒审核消息
        $fuserint = M('users')->where(array('cj_users.userid_int'=>session('userid')))->join('cj_company ON cj_users.companyid = cj_company.id')->getField('cj_company.userid_int');
        if($fuserint){
            $suser = M('users')->where(array('userid_int'=>session('userid')))->getField('email_varchar');
            $company_news['toUser'] = $fuserint;
            $company_news['content'] = '您的子账号'.$suser.'提交了一个审核请求！';
            $company_news['sendTime'] = time();
            $company_news['status'] = 1;
            $company_news['bizType'] = 2;
            M('news')->add($company_news);          
        }
        if(I('post.isAudit','0','int')){
            $data['is_show'] = 2;
            if($scene->where($where)->save($data)){
                echo json_encode(array("success"=>"true","code"=>200,"msg"=>"你已经成功提交审核！！！","list"=>"null"));
            }else{
                echo json_encode(array("success"=>"false","code"=>1001,"msg"=>"提交未成功！！！","list"=>"null"));
            }
        }else{
            echo exit();
        }
    }

    //审核（通过要加积分）
    public function saveAudit(){
        $this->unlogin();
        $scene = M('scene');
        if(IS_POST){
            $where['sceneid_bigint'] = I('post.sceneid',0,'int'); 
            $savedata['is_show'] = I('post.isAudit',2,'int'); 
            if($savedata['is_show'] == 1){//审核通过
                $where2['userid_int'] = $scene->where($where)->getField('userid_int');
                $user_data = M('users')->field('integral_num,company_ext')->where($where2)->find();
                $company_ext = json_decode($user_data['company_ext'],true);
                if($company_ext['is_integral'] == 'true'){
                    $addintegral['integral_num'] = $company_ext['integral_num'] + $user_data['integral_num'];
                    M('users')->where($where2)->save($addintegral);
                }
                $savedata['showstatus_int'] = 1;                
            }  
            if($scene->where($where)->save($savedata)){
                echo json_encode(array("success"=>"true","code"=>200,"msg"=>"审核成功！！！","list"=>"null"));
            }else{
                echo json_encode(array("success"=>"false","code"=>1001,"msg"=>"审核出错！！！","list"=>"null"));
            }
        }else{
            echo exit();
        }
    }
}
