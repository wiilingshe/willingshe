<?php

/**
 * TODO  
 * @param $count 要分页的总记录数
 * @param int $pagesize 每页查询条数
 * @return \Think\Page
 */
function getpage($count, $pagesize = 10) {
	$p = new Think\Page($count, $pagesize);
	$p->setConfig('header', '<li>到</li>
          <li><input id="p_num" name="p" type="text" style="width:20px;height:20px;text-align:center;"></input></li>
          <li>页</li>
          <li><input id="page_sub" type="submit" value="确定" style="color:#bdbcbc;border:none;background:none;font-size:16px;margin-top:-3px;"></input></li>');
	$p->setConfig('prev', '<');
	$p->setConfig('next', '>');
	$p->setConfig('last', '尾页');
	$p->setConfig('first', '首页');
	$p->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');
	$p->lastSuffix = false;//最后一页不显示为总页数
	return $p;
}

/*function getajaxpage($count, $pagesize = 10, $fun ='ajaxpage') {
	import('ORG.Util.AjaxPage');
	$p = new \AjaxPage($count, $pagesize,'ajaxpage');
	$p->setConfig('header', '<li>到</li>
          <li><input type="text" style="width:17px;height:17px;"></input></li>
          <li>页</li>
          <li><input id="page_sub" type="submit" value="确定" style="color:#bdbcbc;border:none;background:none;font-size:15px;"></input></li>');
	$p->setConfig('prev', '<');
	$p->setConfig('next', '>');
	$p->setConfig('last', '尾页');
	$p->setConfig('first', '首页');
	//$p->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');
	$p->lastSuffix = false;//最后一页不显示为总页数
	return $p;
}
*/
/**
 * Created by PhpStorm.
 * User: cony
 * Date: 14-3-7
 * Time: 上午10:15
 */
/**
 * 获取默认图片
 * @param $str
 * @return bool|mixed
 */
function get_default_img($str){
    if(!$str)return false;
    $str_arr=explode(',',$str);
    $map['id']=$str_arr[0];
    return M('images')->where($map)->getField('savepath');
}
function utf2gb($strInput) {
	//if(strpos( $_SERVER['SERVER_NAME'],'naurai.net')!==false){
		return $strInput;
	//}else{
		//return iconv('utf-8','gb2312',$strInput); 
	//}
}

  function curl_post($url,$data = null){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);   //设置访问的url地址 
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		/* if($data){
			 curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
			 curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			 curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
			
		 }*/
		$data &&  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$tmpInfo = curl_exec($ch);
		if (curl_errno($ch)) {
			return curl_error($ch);
		}
		curl_close($ch);
		return $tmpInfo;
	}
function get_scene_status($info){  
	if(isset($_GET['preview'])&& I('get.preview')=='preview'){
	  return $info;		
	}
	//print_r($info); echo $id.'id'.'<br>';exit;
	 $sysinfo=M('sys')->order('id asc')->find();	
	 $SYS_LINK=$sysinfo['other_info'];	
	 $arr=json_decode($sysinfo['sys_link_arr']); 
	 $sys_link_arr=object_array($arr);
	 $is_up_info=false;
	 
	 $where['scenecode_varchar']  = $info['scenecode_varchar'];		
	 $where['vi_beyond_time']=array('lt', mktime(0,0,1,intval(date('m',time()))));
	 M('scene')->where($where)->save(array('vi_beyond_time'=>time(),'vi_current_times'=>0));
	 if(empty($info)){
		 $info=M('scene')->where("vi_scenecode='".I('get.id')."'")->find();
		 if($info){
			$id=getscenecode($sys_link_arr['visit_invalid']);
			 
			$is_up_info=true;	 
		 }
	}else{
		if($info['vi_hittimes_set']&& $info['vi_hittimes_set']<=$info['vi_current_times']){
		$id=getscenecode($sys_link_arr['beyond']);
			$is_up_info=true;	
			 
		}
	} 
	
	if(!$is_up_info){
		if( $info['showstatus_int']!=1) {
		 
		//if($info['userid_int']!=intval(session('userid'))){
					$id=getscenecode($sys_link_arr['close']);
					$is_up_info=true;
				//}  
		}elseif($sysinfo['is_user_anli_shenghe'] && !isset($_GET['preview'])&&$info["shenhe"]!=1){
			 
				$id=getscenecode($sys_link_arr['noshenhe']);
				$is_up_info=true;	
						
		}elseif($info['vi_timeout']){
			// $arr=json_decode($info['vi_timeout']);				 
			// $timeout_arr=object_array($arr);
			//$id=getscenecode($sys_link_arr['timeout']);
			$info['timeout_url']=urlencode($sys_link_arr['timeout']) ; 		
		}
	}
	if(	$is_up_info){
		if(in_array($id,array($info['sceneid_bigint'],$info['scenecode_varchar']))){
			return $info;
		}
		
			if(is_numeric($id)){
					$where2['sceneid_bigint']  = $id;
				}
				else
				{
					$where2['scenecode_varchar']  = $id;
				}
				$info=M('scene')->where($where2)->find();
				 
				$info['hideeqad']=1;
				$info['isadvanceduser']=0;
				$info['property']=str_replace('"hideEqAd":false','"hideEqAd":true',$info['property']);
	}
   // 
  // print_r($info); echo $id.'id'.'<br>';exit;
	return $info;
}	
function getscenecode($str){
	$arr=strpos($str,'v-')!==false?explode('v-',$str) : explode('id=',$str); 
	return $arr[1]; 
}	
	
function deal_xd($datainfo,$other_arr=array()){
	$qi_ad_xd=M('sys')->order('id asc')->getField('qi_ad_xds');			
	$qi_ad_xd=$qi_ad_xd?intval($qi_ad_xd):90;
	
	$xd=M('users')->where("userid_int=".session('userid'))->getField('xd');	
	
	if($xd<$qi_ad_xd){
		$datainfo['hideeqad'] = 0;
		//echo '{"success":false,"code":1010,"msg":"秀点不足","obj":null,"map":null,"list":null}';
		//die;	
	}else{
		
		$update['xd'] =$xd-$qi_ad_xd;
		
		
		$re= M('users')->where("userid_int=".session('userid'))->save($update);
		if($re){
			$where['sceneid_bigint'] = $datas['id'];
			M('Scene')->where($where)->save(array('is_payxd'=>1));	
		}
		$adddata=array('userid_int'=>session('userid'),
			   'sceneid'=>$other_arr['id'],
			  'remark'=>$other_arr['name']. '去除尾页版权',
			'opttime'=>time(),
			'xd'=>$qi_ad_xd,
			'biztype'=>3,
			'biztitle'=>'去尾页'
			);
		
		M('xdlog')->add($adddata);
		
		$datainfo['hideeqad'] = 1;
	}
	return $datainfo;	
}

function get_scene_ad($jsonstrtemp,$_scene_list2,$isPreview=false){
	
	if($_scene_list2[0]['hideeqad']!=1 && !$isPreview){
		 
		if($_scene_list2[0]['ad_wzi']){
			$ad_wzi_arr= explode(',',$_scene_list2[0]['ad_wzi']);
			
			foreach($ad_wzi_arr as $ad_wz){
				$or=$ad_wz==1 ? 'asc':'desc';
				$adPageinfo=M('scenepagesys')->where("sceneid_bigint=1100")->order('pagecurrentnum_int '.$or)->find();
				
				if($adPageinfo){ 
					$search=array('\u573a\u666f\u540d\u79f0','shadow.png');
					$replace=array($_scene_list2[0]['scenename_varchar'],$_scene_list2[0]['thumbnail_varchar']);	
					
					//if($_scene_list2[0]['lastpageid']){
					
					//}
					$adPageinfo["properties_text"]=$adPageinfo["properties_text"]?$adPageinfo["properties_text"]:'null';
					
					$adPageinfo["content_text"]=str_replace($search,$replace,$adPageinfo["content_text"]);
					
					$jsonstrtemp_ad='{"id": '.$adPageinfo["pageid_bigint"].',"sceneId": '.$adPageinfo["sceneid_bigint"].',"num": '.$adPageinfo["pagecurrentnum_int"].',
				"name": null,"properties":'.$adPageinfo["properties_text"].',"elements": '.$adPageinfo["content_text"].',"scene": null},';
					
					$jsonstrtemp =$ad_wz==1 ?  $jsonstrtemp_ad.$jsonstrtemp :$jsonstrtemp.$jsonstrtemp_ad;
					
					//$jsonstrtemp = $jsonstrtemp .'{"id": '.$adPageinfo["pageid_bigint"].',"sceneId": '.$adPageinfo["sceneid_bigint"].',"num": '.$adPageinfo["pagecurrentnum_int"].',
					//	"name": null,"properties":'.$adPageinfo["properties_text"].',"elements": '.$adPageinfo["content_text"].',"scene": null},';
					
				}
			}
		}
	}
	return $jsonstrtemp;	
}

function getUsreJsonStr($userinfo){
	$property='null';
		$companyid=(int)session('companyid');
		if($companyid==0){
			$mytplid=M('mytpl')->cache(true)->where('userid_int='.session('userid').' and type=1')->getField('id');
			$companyTplId=M('mytpl')->cache(true)->where('userid_int='.session('userid').' and type=2')->getField('id');
		}else{
			$userid=M('company')->cache(true)->where(array('id'=>$companyid))->getField('userid_int');
			$mytplid=M('mytpl')->cache(true)->where('userid_int='.session('userid').' and type=1')->getField('id');
			$companyTplId=M('mytpl')->cache(true)->where('userid_int='.$userid.' and type=2')->getField('id');
		}
			//$mytplid=M('mytpl')->where('userid_int='.session('userid').' and type=1')->getField('id');
			//$companyTplId=M('mytpl')->where('userid_int='.session('userid').' and type=2')->getField('id');
 			//echo $mytplid;die;
			if($mytplid){
				$property='{\"myTplId\":'.$mytplid.'}';
 			}
	$field=C('REG_FIELD')? C('REG_FIELD'):'email_varchar';	
	$role_str=$userinfo['role'] ? ',"role":'.$userinfo['role'] :',"role":0';
	if($userinfo['headimg']){
				$img = json_encode($userinfo["headimg"]);
				
			}else{
				$img = "null";
			}
	$userinfo["xd"]=$userinfo["xd"] ? intval($userinfo["xd"]):0;
	$userinfo["sex"]=$userinfo["sex"] ? intval($userinfo["sex"]):0;
	$userinfo["type"]=$userinfo["type"]? intval($userinfo["type"]):1;
	$userinfo['p_type'] = $userinfo['p_type']? intval($userinfo['p_type']):0;
	$com_ext = json_encode(array("data_permiss"=>array("0"=>"true","1"=>"true","2"=>"true",),"is_audit"=>"false","is_integral"=>"false","integral_num"=>0));
	$userinfo["company_ext"] = $userinfo["company_ext"]?$userinfo["company_ext"]:$com_ext;
	$userInfoStr='"id":'.session('userid').',"loginName":"'.$userinfo[$field].'","xd":'.$userinfo["xd"].$role_str.',"sex":'
		.$userinfo["sex"].',"phone":'.json_encode($userinfo["phone"]).',"tel":'
		.json_encode($userinfo["tel"]).',"qq":'.json_encode($userinfo["qq"]).',"headImg":'
		.$img.',"idNum":null,"last_time":'.json_encode($userinfo["last_time"]).',"idPhoto":null,"regTime":1425093623000,"extType":0,"property":"'
		.$property.'","companyId":'.(int)$userinfo["companyid"].',"deptName":null,"deptId":0,"checkEmail":"'.$userinfo["checkemail"].'","name":'.json_encode($userinfo["uname"]).',"email":"'.$userinfo["email_varchar"].'","type":'.$userinfo["type"].',"p_type":'.$userinfo["p_type"].',"status":'.$userinfo["status_int"].',"relType":null,"company_ext":'.$userinfo["company_ext"].',"integral_num":'.(int)$userinfo["integral_num"].',"companyTplId":'.(int)$companyTplId.',"roleIdList":['.$userinfo["level_int"].']';
	return $userInfoStr;
}

function copyAnlicc($sceneid_bigint,$userid_int){
	$m_scene=M('Scene');
	$m_scenepage=M('scenepage');
	$m_scenedata=M('scenedata');
	
	$wheresysscene['sceneid_bigint']  = $sceneid_bigint;
		$_scene_sysinfo=$m_scene->where($wheresysscene)->select();


		$datainfo['scenecode_varchar'] = 'U'.(date('y',time())-9).date('m',time()).date('d',time()).randorderno(10,-1);
		$datainfo['scenename_varchar'] = '副本-'.$_scene_sysinfo[0]['scenename_varchar'];
		$datainfo['movietype_int'] = $_scene_sysinfo[0]['movietype_int'];
		$datainfo['scenetype_int'] = $_scene_sysinfo[0]['scenetype_int'];
		$datainfo['ip_varchar'] = get_client_ip();
		$datainfo['thumbnail_varchar'] = $_scene_sysinfo[0]['thumbnail_varchar'];
		$datainfo['musicurl_varchar'] = $_scene_sysinfo[0]['musicurl_varchar'];
		$datainfo['musictype_int'] = $_scene_sysinfo[0]['musictype_int'];
		$datainfo['fromsceneid_bigint'] = $wheresysscene['sceneid_bigint'];
	$datainfo['userid_int'] =$userid_int;
		$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
		
		$result1 = $m_scene->add($datainfo);
	if($result1){
		$wheresyspage['sceneid_bigint']  = $sceneid_bigint;
		$_scene_syspageinfo=$m_scenepage->where($wheresyspage)->select();
		foreach($_scene_syspageinfo as $vo){
			$datainfo2['scenecode_varchar'] = $datainfo['scenecode_varchar'];
			$datainfo2['sceneid_bigint'] = $result1;
			$datainfo2['content_text'] = $vo['content_text'];
			$datainfo2['properties_text'] = 'null';
			$datainfo2['pagecurrentnum_int'] = $vo['pagecurrentnum_int'];
			$datainfo2['userid_int'] = session('userid');
			$datainfo2['createtime_time'] = date('y-m-d H:i:s',time());
			$result2 = $m_scenepage->add($datainfo2);


			$wheredata['userid_int'] = $userid_int;
			$wheredata['sceneid_bigint'] = $vo['sceneid_bigint'];
			$wheredata['pageid_bigint'] = $vo['pageid_bigint'];
			$_scenedatasys_list = $m_scenedata->where($wheredata)->select();

			foreach($_scenedatasys_list as $vo2){
				$dataList[] = array('sceneid_bigint'=>$result1,
					'pageid_bigint'=>$result2,
					'elementid_int'=>$vo2['elementid_int'],
					'elementtitle_varchar'=>$vo2['elementtitle_varchar'],
					'elementtype_int'=>$vo2['elementtype_int'],
					'userid_int'=>session('userid')
					);
			}

		}
		if(count($dataList)>0){
			$m_scenedata->addAll($dataList);
		}
	}
}
/**
 * 获取图片集
 * @param $str
 * @return bool|mixed
 */
function get_img_array($str){
    if(!$str)return false;
    $str_arr=@explode(',',$str);
    $map['id']=array('in',$str_arr);
    return M('images')->where($map)->field('savepath')->select();
}

/**
 * 分类面包屑导航
 * @param $cid
 * @param bool $flag
 * @return string
 */
function conist_nav($cid,$flag=false){
    $cat = new \Org\Util\Category('Category', array('cid', 'pid', 'name', 'fullname'));
    $arr=$cat->getPath($cid);
    $str='<a href='.__APP__.'>'.L('T_HOME').'</a>>';
    if(is_array($arr))
    foreach($arr as $v){
        $str.=$v['name'].'>';
    }
    if($flag)$str=substr($str,0,-1);
    return $str;
}

/**
 * 表单类型存储
 * @param $type
 * @return string
 */
function return_form($type){
	if(!$type){
		return false;
	}elseif($type == 3 || $type == 4 || $type == 6 || $type == 5 || $type == 9 || $type == 7 || $type == 17){
		$arr = I('post.info');
		foreach($arr as $key => $value){
			 $arr[$key] = urlencode($value);  
    	}  
    	$data['info'] = urldecode(json_encode($arr));
    	$arr2 = I('post.iptanswer');
    	foreach($arr2 as $key => $value){
    		$arr2[$key] = urlencode($value);
    	}  
    	$data['iptanswer'] = urldecode(json_encode($arr2));

	}elseif($type == 10){
		$data['iptanswer'] = '<hr></hr>';
	}else{
		$data['info'] = I('post.info');
		$data['iptanswer'] = I('post.iptanswer');
	};
	return $data;
}



/**
 * 创建文件夹
 * @param $path
 * @return 
 */
function mdir($path){
	if(!file_exists($path))
	{
		mdir(dirname($path));
		mkdir($path,0777);
	}
}

/**
 * 检测文件是否可写
 * @param $file
 * @return $writeable
 */
function fileWriteAble($file,$delTestFile = 0){
	if($fp = @fopen($file, 'w'))
	{
		fclose($fp);
		if($delTestFile)@unlink($file);
		$writeable = 1;
	}
	else
	{
		$writeable = 0;
	}
	return $writeable;
}

/**
 * 检测文件夹是否可写
 * @param $dir
 * @return $writeable;
 */
function dirWriteAble($dir){
	if(!is_dir($dir)) {
		mdir($dir);
	}
	if(is_dir($dir)) {
		$writeable = fileWriteAble("$dir/.test.tmp",1);
	}
	return $writeable;
}

/**
 * 导出成绩
 * @param $fname,$list
 * @return $fname/false
 */
function outCsv($fname,$r){
	if(dirWriteAble(dirname($fname))){
		$fp = fopen($fname, 'w');
		foreach ($r as $line) {
		    fputcsv($fp, $line);
		}
		fclose($fp);
		return $fname;
	}
	else
	return false;
}


/**
 * 搜索课件类型
 * @param $search_value
 * @return array
 */
function return_designer($search_value){
	if(!$search_value){
		return false;
	}else{
		$sea4['areaname'] = array('like', '%' . trim($search_value) . '%');
		$sea4['level'] = 1;
		$search_num4 = M('area')->where($sea4)->count();

		$sea['shortname'] = array('like', '%' . trim($search_value) . '%');
		$sea['level'] = 2;
		$search_num = M('area')->where($sea)->count();

		$sea2['name_varchar'] = array('like', '%' . trim($search_value) . '%');
		$sea2['type_int'] = 2;
		$search_num2 = M('tag')->where($sea2)->count();
		
		$sea3['uname'] = array('like', '%' . trim($search_value) . '%');
		$search_num3 = M('users')->where($sea3)->count();

		if($search_num4){
			$search_id = M('area')->field('id')->where($sea4)->find();
			$sql['cj_usermsg.proid'] = $search_id['id'];
		}elseif($search_num){
			$search_id = M('area')->field('id')->where($sea)->find();
			$sql['cj_usermsg.cityid'] = $search_id['id'];
		}elseif($search_num2){
			$search_id = M('tag')->field('tagid_int')->where($sea2)->find();
			$sql['cj_usermsg.tag'] = $search_id['tagid_int'];
		
		}elseif($search_num3){
			$search_id = M('users')->field('uname')->where($sea3)->find();
			$sql['uname'] = $search_id['uname'];
		};
		return $sql;
	}
}

 /**
 * 下面是bbcode转html相关函数
 */
function bbcodeurl($url, $tags) {
	if(!preg_match("/<.+?>/s", $url)) {
		if(!in_array(strtolower(substr($url, 0, 6)), array('http:/', 'https:', 'ftp://', 'rtsp:/', 'mms://')) && !preg_match('/^static\//', $url) && !preg_match('/^data\//', $url)) {
			$url = 'http://'.$url;
		}
		return str_replace(array('submit', 'member.php?mod=logging'), array('', ''), str_replace('{url}', addslashes($url), $tags));
	} else {
		return '&nbsp;'.$url;
	}
}

function random($length, $numeric = 0) {
	$seed = base_convert(md5(microtime().$_SERVER['DOCUMENT_ROOT']), 16, $numeric ? 10 : 35);
	$seed = $numeric ? (str_replace('0', '', $seed).'012340567890') : ($seed.'zZ'.strtoupper($seed));
	if($numeric) {
		$hash = '';
	} else {
		$hash = chr(rand(1, 26) + rand(0, 1) * 32 + 64);
		$length--;
	}
	$max = strlen($seed) - 1;
	for($i = 0; $i < $length; $i++) {
		$hash .= $seed{mt_rand(0, $max)};
	}
	return $hash;
}

function parseimg($width, $height, $src, $lazyload, $pid, $extra = '') {
	global $_G;
	static $styleoutput = null;
	if($_G['setting']['domainwhitelist_affectimg']) {
		$tmp = parse_url($src);
		if(!empty($tmp['host']) && !iswhitelist($tmp['host'])) {
			return $src;
		}
	}
	if(strstr($src, 'file:') || substr($src, 1, 1) == ':') {
		return $src;
	}
	if($width > $_G['setting']['imagemaxwidth']) {
		$height = intval($_G['setting']['imagemaxwidth'] * $height / $width);
		$width = $_G['setting']['imagemaxwidth'];
		if(defined('IN_MOBILE')) {
			$extra = '';
		} else {
			$extra = 'onmouseover="img_onmouseoverfunc(this)" onclick="zoom(this)" style="cursor:pointer"';
		}
	}
	$attrsrc = !IS_ROBOT && $lazyload ? 'file' : 'src';
	$rimg_id = random(5);
	$GLOBALS['aimgs'][$pid][] = $rimg_id;
	$guestviewthumb = !empty($_G['setting']['guestviewthumb']['flag']) && empty($_G['uid']);
	$img = '';
	if($guestviewthumb) {
		if(!isset($styleoutput)) {
			$img .= guestviewthumbstyle();
			$styleoutput = true;
		}
		$img .= '<div class="guestviewthumb"><img id="aimg_'.$rimg_id.'" class="guestviewthumb_cur" onclick="showWindow(\'login\', \'{loginurl}\'+\'&referer=\'+encodeURIComponent(location))" '.$attrsrc.'="{url}" border="0" alt="" />
				<br><a href="{loginurl}" onclick="showWindow(\'login\', this.href+\'&referer=\'+encodeURIComponent(location));">'.lang('forum/template', 'guestviewthumb').'</a></div>';

	} else {
		if(defined('IN_MOBILE')) {
			$img = '<img'.($width > 0 ? ' width="'.$width.'"' : '').($height > 0 ? ' height="'.$height.'"' : '').' src="{url}" border="0" alt="" />';
		} else {
			$img = '<img id="aimg_'.$rimg_id.'" onclick="zoom(this, this.src, 0, 0, '.($_G['setting']['showexif'] ? 1 : 0).')" class="zoom"'.($width > 0 ? ' width="'.$width.'"' : '').($height > 0 ? ' height="'.$height.'"' : '').' '.$attrsrc.'="{url}" '.($extra ? $extra.' ' : '').'border="0" alt="" />';
		}
	}
	$code = bbcodeurl($src, $img);
	if($guestviewthumb) {
		$code = str_replace('{loginurl}', 'member.php?mod=logging&action=login', $code);
	}
	return $code;
}

function parsesmiles(&$message) {
	global $_G;
	static $enablesmiles;
	if($enablesmiles === null) {
		$enablesmiles = false;
		if(!empty($_G['cache']['smilies']) && is_array($_G['cache']['smilies'])) {
			foreach($_G['cache']['smilies']['replacearray'] AS $key => $smiley) {
				$_G['cache']['smilies']['replacearray'][$key] = '<img src="'.STATICURL.'image/smiley/'.$_G['cache']['smileytypes'][$_G['cache']['smilies']['typearray'][$key]]['directory'].'/'.$smiley.'" smilieid="'.$key.'" border="0" alt="" />';
			}
			$enablesmiles = true;
		}
	}
	$enablesmiles && $message = preg_replace($_G['cache']['smilies']['searcharray'], $_G['cache']['smilies']['replacearray'], $message, $_G['setting']['maxsmilies']);
	return $message;
}


function dhtmlspecialchars($string, $flags = null) {
	if(is_array($string)) {
		foreach($string as $key => $val) {
			$string[$key] = dhtmlspecialchars($val, $flags);
		}
	} else {
		if($flags === null) {
			$string = str_replace(array('&', '"', '<', '>'), array('&amp;', '&quot;', '&lt;', '&gt;'), $string);
			if(strpos($string, '&amp;#') !== false) {
				$string = preg_replace('/&amp;((#(\d{3,5}|x[a-fA-F0-9]{4}));)/', '&\\1', $string);
			}
		} else {
			if(PHP_VERSION < '5.4.0') {
				$string = htmlspecialchars($string, $flags);
			} else {
				if(strtolower(CHARSET) == 'utf-8') {
					$charset = 'UTF-8';
				} else {
					$charset = 'ISO-8859-1';
				}
				$string = htmlspecialchars($string, $flags, $charset);
			}
		}
	}
	return $string;
}


function discuzcode($message, $smileyoff, $bbcodeoff, $htmlon = 0, $allowsmilies = 1, $allowbbcode = 1, $allowimgcode = 1, $allowhtml = 0, $jammer = 0, $parsetype = '0', $authorid = '0', $allowmediacode = '0', $pid = 0, $lazyload = 0, $pdateline = 0, $first = 0) {
	global $_G;

	static $authorreplyexist;

	if($pid && strpos($message, '[/password]') !== FALSE) {
		if($authorid != $_G['uid'] && !$_G['forum']['ismoderator']) {
			$message = preg_replace("/\s?\[password\](.+?)\[\/password\]\s?/ie", "parsepassword('\\1', \$pid)", $message);
			if($_G['forum_discuzcode']['passwordlock'][$pid]) {
				return '';
			}
		} else {
			$message = preg_replace("/\s?\[password\](.+?)\[\/password\]\s?/ie", "", $message);
			$_G['forum_discuzcode']['passwordauthor'][$pid] = 1;
		}
	}

	if($parsetype != 1 && !$bbcodeoff && $allowbbcode && (strpos($message, '[/code]') || strpos($message, '[/CODE]')) !== FALSE) {
		$message = preg_replace("/\s?\[code\](.+?)\[\/code\]\s?/ies", "codedisp('\\1')", $message);
	}

	$msglower = strtolower($message);

	$htmlon = $htmlon && $allowhtml ? 1 : 0;

	if(!$htmlon) {
		$message = dhtmlspecialchars($message);
	} else {
		$message = preg_replace("/<script[^\>]*?>(.*?)<\/script>/i", '', $message);
	}

	if($_G['setting']['plugins']['func'][HOOKTYPE]['discuzcode']) {
		$_G['discuzcodemessage'] = & $message;
		$param = func_get_args();
		hookscript('discuzcode', 'global', 'funcs', array('param' => $param, 'caller' => 'discuzcode'), 'discuzcode');
	}

	if(!$smileyoff && $allowsmilies) {
		$message = parsesmiles($message);
	}

	if($_G['setting']['allowattachurl'] && strpos($msglower, 'attach://') !== FALSE) {
		$message = preg_replace("/attach:\/\/(\d+)\.?(\w*)/ie", "parseattachurl('\\1', '\\2', 1)", $message);
	}

	if($allowbbcode) {
		if(strpos($msglower, 'ed2k://') !== FALSE) {
			$message = preg_replace("/ed2k:\/\/(.+?)\//e", "parseed2k('\\1')", $message);
		}
	}

	if(!$bbcodeoff && $allowbbcode) {
		if(strpos($msglower, '[/url]') !== FALSE) {
			$message = preg_replace("/\[url(=((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|thunder|qqdl|synacast){1}:\/\/|www\.|mailto:)?([^\r\n\[\"']+?))?\](.+?)\[\/url\]/ies", "parseurl('\\1', '\\5', '\\2')", $message);
		}
		if(strpos($msglower, '[/email]') !== FALSE) {
			$message = preg_replace("/\[email(=([a-z0-9\-_.+]+)@([a-z0-9\-_]+[.][a-z0-9\-_.]+))?\](.+?)\[\/email\]/ies", "parseemail('\\1', '\\4')", $message);
		}

		$nest = 0;
		while(strpos($msglower, '[table') !== FALSE && strpos($msglower, '[/table]') !== FALSE){
			$message = preg_replace("/\[table(?:=(\d{1,4}%?)(?:,([\(\)%,#\w ]+))?)?\]\s*(.+?)\s*\[\/table\]/ies", "parsetable('\\1', '\\2', '\\3')", $message);
			if(++$nest > 4) break;
		}

		$message = str_replace(array(
			'[/color]', '[/backcolor]', '[/size]', '[/font]', '[/align]', '[b]', '[/b]', '[s]', '[/s]', '[hr]', '[/p]',
			'[i=s]', '[i]', '[/i]', '[u]', '[/u]', '[list]', '[list=1]', '[list=a]',
			'[list=A]', "\r\n[*]", '[*]', '[/list]', '[indent]', '[/indent]', '[/float]'
			), array(
			'</font>', '</font>', '</font>', '</font>', '</div>', '<strong>', '</strong>', '<strike>', '</strike>', '<hr class="l" />', '</p>', '<i class="pstatus">', '<i>',
			'</i>', '<u>', '</u>', '<ul>', '<ul type="1" class="litype_1">', '<ul type="a" class="litype_2">',
			'<ul type="A" class="litype_3">', '<li>', '<li>', '</ul>', '<blockquote>', '</blockquote>', '</span>'
			), preg_replace(array(
			"/\[color=([#\w]+?)\]/i",
			"/\[color=((rgb|rgba)\([\d\s,]+?\))\]/i",
			"/\[backcolor=([#\w]+?)\]/i",
			"/\[backcolor=((rgb|rgba)\([\d\s,]+?\))\]/i",
			"/\[size=(\d{1,2}?)\]/i",
			"/\[size=(\d{1,2}(\.\d{1,2}+)?(px|pt)+?)\]/i",
			"/\[font=([^\[\<]+?)\]/i",
			"/\[align=(left|center|right)\]/i",
			"/\[p=(\d{1,2}|null), (\d{1,2}|null), (left|center|right)\]/i",
			"/\[float=left\]/i",
			"/\[float=right\]/i"

			), array(
			"<font color=\"\\1\">",
			"<font style=\"color:\\1\">",
			"<font style=\"background-color:\\1\">",
			"<font style=\"background-color:\\1\">",
			"<font size=\"\\1\">",
			"<font style=\"font-size:\\1\">",
			"<font face=\"\\1\">",
			"<div align=\"\\1\">",
			"<p style=\"line-height:\\1px;text-indent:\\2em;text-align:\\3\">",
			"<span style=\"float:left;margin-right:5px\">",
			"<span style=\"float:right;margin-left:5px\">"
			), $message));

		if($pid && !defined('IN_MOBILE')) {
			$message = preg_replace("/\s?\[postbg\]\s*([^\[\<\r\n;'\"\?\(\)]+?)\s*\[\/postbg\]\s?/ies", "parsepostbg('\\1', '$pid')", $message);
		} else {
			$message = preg_replace("/\s?\[postbg\]\s*([^\[\<\r\n;'\"\?\(\)]+?)\s*\[\/postbg\]\s?/is", "", $message);
		}

		if($parsetype != 1) {
			if(strpos($msglower, '[/quote]') !== FALSE) {
				$message = preg_replace("/\s?\[quote\][\n\r]*(.+?)[\n\r]*\[\/quote\]\s?/is", tpl_quote(), $message);
			}
			if(strpos($msglower, '[/free]') !== FALSE) {
				$message = preg_replace("/\s*\[free\][\n\r]*(.+?)[\n\r]*\[\/free\]\s*/is", tpl_free(), $message);
			}
		}
		if(!defined('IN_MOBILE')) {
			if(strpos($msglower, '[/media]') !== FALSE) {
				$message = preg_replace("/\[media=([\w,]+)\]\s*([^\[\<\r\n]+?)\s*\[\/media\]/ies", $allowmediacode ? "parsemedia('\\1', '\\2')" : "bbcodeurl('\\2', '<embed src=\"{url}\" \/>')", $message);
			}
			if(strpos($msglower, '[/audio]') !== FALSE) {
				$message = preg_replace("/\[audio(=1)*\]\s*([^\[\<\r\n]+?)\s*\[\/audio\]/ies", $allowmediacode ? "parseaudio('\\2', 400)" : "bbcodeurl('\\2', '<embed src=\"{url}\" \/>')", $message);
			}
			if(strpos($msglower, '[/flash]') !== FALSE) {
				$message = preg_replace("/\[flash(=(\d+),(\d+))?\]\s*([^\[\<\r\n]+?)\s*\[\/flash\]/ies", $allowmediacode ? "parseflash('\\2', '\\3', '\\4');" : "bbcodeurl('\\4', '<embed src=\"{url}\" \/>')", $message);
			}
		} else {
			if(strpos($msglower, '[/media]') !== FALSE) {
				$message = preg_replace("/\[media=([\w,]+)\]\s*([^\[\<\r\n]+?)\s*\[\/media\]/is", "[media]\\2[/media]", $message);
			}
			if(strpos($msglower, '[/audio]') !== FALSE) {
				$message = preg_replace("/\[audio(=1)*\]\s*([^\[\<\r\n]+?)\s*\[\/audio\]/is", "[media]\\2[/media]", $message);
			}
			if(strpos($msglower, '[/flash]') !== FALSE) {
				$message = preg_replace("/\[flash(=(\d+),(\d+))?\]\s*([^\[\<\r\n]+?)\s*\[\/flash\]/is", "[media]\\4[/media]", $message);
			}
		}

		if($parsetype != 1 && $allowbbcode < 0 && isset($_G['cache']['bbcodes'][-$allowbbcode])) {
			$message = preg_replace($_G['cache']['bbcodes'][-$allowbbcode]['searcharray'], $_G['cache']['bbcodes'][-$allowbbcode]['replacearray'], $message);
		}
		if($parsetype != 1 && strpos($msglower, '[/hide]') !== FALSE && $pid) {
			if($_G['setting']['hideexpiration'] && $pdateline && (TIMESTAMP - $pdateline) / 86400 > $_G['setting']['hideexpiration']) {
				$message = preg_replace("/\[hide[=]?(d\d+)?[,]?(\d+)?\]\s*(.*?)\s*\[\/hide\]/is", "\\3", $message);
				$msglower = strtolower($message);
			}
			if(strpos($msglower, '[hide=d') !== FALSE) {
				$message = preg_replace("/\[hide=(d\d+)?[,]?(\d+)?\]\s*(.*?)\s*\[\/hide\]/ies", "expirehide('\\1','\\2','\\3', $pdateline)", $message);
				$msglower = strtolower($message);
			}
			if(strpos($msglower, '[hide]') !== FALSE) {
				if($authorreplyexist === null) {
					if(!$_G['forum']['ismoderator']) {
						if($_G['uid']) {
							$_post = C::t('forum_post')->fetch('tid:'.$_G['tid'], $pid);
							$authorreplyexist = $_post['tid'] == $_G['tid'] ? C::t('forum_post')->fetch_pid_by_tid_authorid($_G['tid'], $_G['uid']) : FALSE;
						}
					} else {
						$authorreplyexist = TRUE;
					}
				}
				if($authorreplyexist) {
					$message = preg_replace("/\[hide\]\s*(.*?)\s*\[\/hide\]/is", tpl_hide_reply(), $message);
				} else {
					$message = preg_replace("/\[hide\](.*?)\[\/hide\]/is", tpl_hide_reply_hidden(), $message);
					$message = '<script type="text/javascript">replyreload += \',\' + '.$pid.';</script>'.$message;
				}
			}
			if(strpos($msglower, '[hide=') !== FALSE) {
				$message = preg_replace("/\[hide=(\d+)\]\s*(.*?)\s*\[\/hide\]/ies", "creditshide(\\1,'\\2', $pid, $authorid)", $message);
			}
		}
	}

	if(!$bbcodeoff) {
		if($parsetype != 1 && strpos($msglower, '[swf]') !== FALSE) {
			$message = preg_replace("/\[swf\]\s*([^\[\<\r\n]+?)\s*\[\/swf\]/ies", "bbcodeurl('\\1', ' <img src=\"'.STATICURL.'image/filetype/flash.gif\" align=\"absmiddle\" alt=\"\" /> <a href=\"{url}\" target=\"_blank\">Flash: {url}</a> ')", $message);
		}

		if(defined('IN_MOBILE') && !defined('TPL_DEFAULT') && !defined('IN_MOBILE_API')) {
			$allowimgcode = false;
		}
		$attrsrc = !IS_ROBOT && $lazyload ? 'file' : 'src';
		if(strpos($msglower, '[/img]') !== FALSE) {
			$message = preg_replace(array(
				"/\[img\]\s*([^\[\<\r\n]+?)\s*\[\/img\]/ies",
				"/\[img=(\d{1,4})[x|\,](\d{1,4})\]\s*([^\[\<\r\n]+?)\s*\[\/img\]/ies"
			), $allowimgcode ? array(
				"parseimg(0, 0, '\\1', ".intval($lazyload).", ".intval($pid).", 'onmouseover=\"img_onmouseoverfunc(this)\" ".($lazyload ? "lazyloadthumb=\"1\"" : "onload=\"thumbImg(this)\"")."')",
				"parseimg('\\1', '\\2', '\\3', ".intval($lazyload).", ".intval($pid).")"
			) : ($allowbbcode ? array(
				(!defined('IN_MOBILE') ? "bbcodeurl('\\1', '<a href=\"{url}\" target=\"_blank\">{url}</a>')" : "bbcodeurl('\\1', '')"),
				(!defined('IN_MOBILE') ? "bbcodeurl('\\3', '<a href=\"{url}\" target=\"_blank\">{url}</a>')" : "bbcodeurl('\\3', '')"),
			) : array("bbcodeurl('\\1', '{url}')", "bbcodeurl('\\3', '{url}')")), $message);
		}
	}

	for($i = 0; $i <= $_G['forum_discuzcode']['pcodecount']; $i++) {
		$message = str_replace("[\tDISCUZ_CODE_$i\t]", $_G['forum_discuzcode']['codehtml'][$i], $message);
	}

	unset($msglower);

	if($jammer) {
		$message = preg_replace("/\r\n|\n|\r/e", "jammer()", $message);
	}
	if($first) {
		if(helper_access::check_module('group')) {
			$message = preg_replace("/\[groupid=(\d+)\](.*)\[\/groupid\]/i", lang('forum/template', 'fromgroup').': <a href="forum.php?mod=forumdisplay&fid=\\1" target="_blank">\\2</a>', $message);
		} else {
			$message = preg_replace("/(\[groupid=\d+\].*\[\/groupid\])/i", '', $message);
		}

	}
	return $htmlon ? $message : nl2br(str_replace(array("\t", '   ', '  '), array('&nbsp; &nbsp; &nbsp; &nbsp; ', '&nbsp; &nbsp;', '&nbsp;&nbsp;'), $message));
}

/**
 *计算时间差
 * @param $time
 *@return string
 */
function delta_T($time){
	if(!$time){
		return false;
	}else{
		$endtime = date('Y-m-d H:i:s', time());
		$startime = date('Y-m-d H:i:s',$time);
		$minut = floor((strtotime($endtime)-strtotime($startime))/60);
		$hour = floor((strtotime($endtime)-strtotime($startime))/60/60);
		$day = floor((strtotime($endtime)-strtotime($startime))/60/60/24);
		if($minut<60 && $minut>0){
			$string = $minut.'分钟前';
		}elseif($hour<24 && $hour>0){
			$string = $hour.'小时前';
		}elseif($day>0){
			$string = $day.'天前';
		}else{
			$string = '刚刚';
		}

		return $string;
	}
}

/**
 *秒转时分秒
 * @param $time
 *@return string
 */
function histime($time){
	if(is_numeric($time)){
		$vt = array('years'=>0,'day'=>0,'hours'=>0,'minu'=>0,'sec'=>0);
		if($time >= 31556926){
			$vt["years"] = floor($time/31556926);
      		$time = ($time%31556926);
      		$t = $vt["years"] ."年";
		}
		if($time >= 86400){
			$vt["day"] = floor($time/86400);
			$time = ($time%86400);
			$t = $t.$vt["day"]."天";
		}
		if($time >= 3600){
			$vt["hours"] = floor($time/3600);
			$time = ($time%3600);
		}
		if($time >= 60){
			$vt["minu"] = floor($time/60);
			$time = ($time%60);
		}
		$vt["sec"] = floor($time);
		$t = $t.$vt["hours"]."时".$vt["minu"]."分".$vt["sec"]."秒";
		return $t;
	}else{
		return false;
	}
}