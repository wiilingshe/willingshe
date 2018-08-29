<?php
namespace Home\Controller;
use Think\Controller;
class CompanyController extends Controller {
	public function unlogin(){
		if(intval(session('userid')) == 0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 Unauthorized');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
	}
	public function info(){
		//company/info
		$where['userid_int'] = session('userid');
		$infolist = M('company')->where($where)->find();
		//dump($where['userid_int']);
		$uname=M('users')->where(array('userid_int'=>session('userid')))->getField('uname');
		if($infolist){			
		echo  '{"success":true,"code":200,"msg":"操作成功","obj":{"id":"'.$infolist['id'].'","name":"'.$infolist['name'].'","uname":"'.$uname.'","address":"'.$infolist['address'].'","website":"'.$infolist['website'].'","contacts":"'.$infolist['contacts'].'","email":"'.$infolist['email'].'","mobile":"'.$infolist['mobile'].'","tel":"'.$infolist['tel'].'","license":"'.$infolist['license'].'","createTime":"'.strtotime($infolist['createtime']).'","industry":'.$infolist['industry'].',"scale":'.$infolist['scale'].',"department":"'.$infolist['department'].'","status":'.$infolist['status'].'},"map":null,"list":null}';
		}else{
			echo '{"success":false,"code":1010,"msg":"数据不合法","obj":null,"map":null,"list":null}';
		}
	}
		
	public function save(){
		//company/save
		$where['userid_int'] = (int)session('userid');
		$datainfo['userid_int'] = session('userid');
		$datas = $_POST;
		$datainfo['name'] = $datas['name'];  //企业名称
		$datainfo['website'] = $datas['website'];  //网站
		$datainfo['address'] = $datas['address'];  //地址
		$datainfo['contacts'] = $datas['contacts'];  //联系人
		$datainfo['tel'] = $datas['tel'];  //手机
		$datainfo['mobile'] = $datas['mobile'];  //电话
		$datainfo['license'] = $datas['license'];  //营业执照
		$datainfo['email'] = $datas['email'];  //邮箱
		$datainfo['department'] = $datas['department'];  //部门
		$datainfo['scale'] = $datas['scale']?$datas['scale']:1;  //规模
		$datainfo['industry'] = $datas['industry']?$datas['industry']:0;  //所属行业
		$datainfo['createtime'] = date('y-m-d H:i:s',time());  
		
		$us['uname'] = $datas['uname'];
		if($us['uname']){
			M('users')->where(array('userid_int'=>(int)session('userid')))->save(array('uname'=>$us['uname']));
		}
		
		$infolist = M('company')->where($where)->select();
		if($infolist){
			M('company')->data($datainfo)->where($where)->save();	
		}else{
			$returnid = M('company')->data($datainfo)->add();
			$where['userid_int'] = session('userid');
			$datainfo['companyid'] = $returnid;
			M('company')->data($datainfo)->where($where)->save();
		}
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
	}
	
	public function taglist(){
		//tag/list
		$where['userid_int'] = session('userid');
		$where['type_int'] = 99;
		$taglist = M('tag')->where($where)->select();
		$suser_id=I('user_id',0,'int');
		if($suser_id>0){
			$company_ext=M('users')->where(array('userid_int'=>$suser_id))->getField('company_ext');
		}
		if(!$company_ext){
			$company_ext = array(
				"data_permiss" => array(
					"0" => "false",
					"1" => "false",
					"2" => "false",
					),
				"is_audit" => 'false',
				"is_integral" => 'false',
				"integral_num" => 0,
				);
			$company_ext=json_encode($company_ext);
		}
		$jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"company_ext":'.$company_ext.',"list":[';
		$jsonstrtemp = '';
		foreach($taglist as $vo){
			$jsonstrtemp = $jsonstrtemp .'{
				"id": '.$vo["tagid_int"].',
				"name": '.json_encode($vo["name_varchar"]).',
				"branchPermi":{
					"delete":true,
					"branchPermi":false
				}
			},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
	}
	
	public function tagcreate(){
		//tag/create
		$datas = $_POST;
		$where['userid_int'] = session('userid');
		$where['type_int'] = 99;
		$where['name_varchar'] = $datas['name'];
		$taglist = M('tag')->where($where)->find();
		if(!$taglist){			
			$datainfo['name_varchar'] = $datas['name'];  //部门名称
			$datainfo['userid_int'] = session('userid');
			$datainfo['type_int'] = 99;
			$returnid = M('tag')->data($datainfo)->add();
			echo '{"success":true,"code":200,"msg":"操作成功","obj":'.$returnid.',"map":null,"list":null}';
		}else{
			echo '{"success":false,"code":1006,"msg":"部门已存在","obj":null,"map":null,"list":null}';
		}
	}
	
	public function companytplset(){
		$where['userid_int'] = session('userid');
		$where['sceneid_bigint'] = I('get.id',0);
		$datainfo['is_tpl'] = 3;
		M('scene')->data($datainfo)->where($where)->save();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
	}
	public function companytplunset(){
		$datas = $_POST;
		$where['userid_int'] = session('userid');
		$where['sceneid_bigint'] = I('get.id',0);
		$datainfo['is_tpl'] = 0;
		M('scene')->data($datainfo)->where($where)->save();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
	}
	
	//我的场景列表 
    public function companytpllist(){
		$this->unlogin();
		$_scene = M('scene');		
		$where1['userid_int']  = intval(session('userid'));
		$companyid = M('users')->where($where1)->getField('companyid');
		$parentuser = M('company')->where('id='.$companyid)->getField('userid_int');
		//$_scene_list=$_scene->order('sceneid_bigint desc')->page(I('get.pageNo',1),I('get.pageSize',12))->select();
		$where['delete_int']  = 0;
		$where['is_tpl'] = 3;
		$where['userid_int'] = $parentuser;
		$pageshowsize = I('get.pageSize',12);
		if($pageshowsize>30){
			$pageshowsize = 30;
		}
		$_scene_list=$_scene->where($where)->order('sceneid_bigint desc')->page(I('get.pageNo',1),$pageshowsize)->select();
		$_scene_count = $_scene->where($where) ->count();
		
		//print_r($_scene_list);exit;     
		// $this->display();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map": {"count": '.$_scene_count.',"pageNo": '.I('get.pageNo',0).',"pageSize": '.$pageshowsize.'},"list": [';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			$publishTime=$vo['publishtime']>0 ? $vo['publishtime']:'null';
			$updateTime=$vo['updateTime']>0 ? $vo['updateTime']:'null';
			
			$jsonstrtemp = $jsonstrtemp .'{
            "id": '.$vo["sceneid_bigint"].',
            "name": '.json_encode($vo["scenename_varchar"]).',
            "createUser": "'.$vo['userid_int'].'",
            "createTime": 1423645519000,
            "type": '.$vo["scenetype_int"].',
            "pageMode": '.$vo["movietype_int"].',
            "image": {
                "bgAudio": {
                    "url": "'.$vo["musicurl_varchar"].'",
                    "type": "'.$vo["musictype_int"].'"
                },
                "imgSrc": "'.$vo["thumbnail_varchar"].'",
                "hideEqAd": false,
                "isAdvancedUser": false
            },
            "isTpl": '.$vo['is_tpl'].',
            "isPromotion": 0,
            "status": '.$vo['showstatus_int'].',
            "openLimit": 0,
            "submitLimit": 0,
            "startDate": null,
            "endDate": null,
            "accessCode": null,
            "thirdCode": null,
            "updateTime": '.$updateTime.',
            "publishTime": '.$publishTime.',
            "applyTemplate": 0,
            "applyPromotion": 0,
            "sourceId": 1225273,
            "code": "'.$vo["scenecode_varchar"].'",
            "description": '.json_encode($vo["desc_varchar"]).',
            "sort": 0,
            "pageCount": 0,
            "dataCount": '.$vo["datacount_int"].',
            "showCount": '.$vo["hitcount_int"].',
            "userLoginName": null,
            "userName": null
        },';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
    }
	
	public function saveMyTpl(){
		$this->unlogin();
		$m_scenepage=M('scenepage');
		$datas = json_decode(file_get_contents("php://input"),true);

	 
		$myTplId = intval($datas['sceneId']);
		if(!$myTplId){
			$datatpl['userid_int'] = intval(session('userid'));
			$datatpl['type'] = 2;
			$myTplId=M('mytpl')->data($datatpl)->add(); 
		}
		if($myTplId){
			
			$datainfo['pagecurrentnum_int'] = intval($datas['num']);
			$datainfo['content_text'] = json_encode($datas['elements']);
			
			$datainfo['properties_text'] =  json_encode($datas['properties']);
			$datainfo['scenecode_varchar'] =  'U6040278S2';
			$datainfo['pagename_varchar'] =  $datas['name'] ;
			$datainfo['userid_int'] = intval(session('userid'));
			$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
			$datainfo['sceneid_bigint'] = $myTplId;
			$datainfo['myTypl_id'] = $myTplId;
			$datainfo['islong'] =  $datas['islong'] ;	
			$m_scenepage->add($datainfo);
			$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":'.$myTplId.',"map":null,"list":null}';
 			
			
		}else{
 			$jsonStr='{"success":false,"code":100,"msg":"操作失败","obj":'.$myTplId.',"map":null,"list":null}';
			 
		}
		echo $jsonstr;
			
	}
	
	//子账号列表
	public function sublist(){
		//sub/list
		$this->unlogin();
		$where['userid_int'] = intval(session('userid'));
		$company = M('company')->where($where)->getField('id');
		if($company){
			$subuser = M('users')->where('companyid='.$company.' and type=21 or pre_type=21')->order('userid_int desc')->select();
		}
		//echo M('users')->getLastsql();
		$jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":1,"pageNo":1,"pageSize":10},"list":[';
		$jsonstrtemp = '';
		foreach($subuser as $vo){
			//print_r($vo);die();
			$deptName = M('tag')->where('tagid_int='.intval($vo["deptid"]))->getField('name_varchar');
			$jsonstrtemp = $jsonstrtemp .'{
				"id": '.$vo["userid_int"].',
				"name": '.json_encode($vo["uname"]).',
				"loginName":"'.$vo["email_varchar"].'",
				"xd":0,
				"sex":1,
				"phone":null,
				"tel":null,
				"qq":null,
				"headImg":null,
				"idNum":null,
				"idPhoto":null,
				"regTime":"'.strtotime($vo['create_time']).'000'.'",
				"extType":0,
				"property":null,
				"companyId":null,
				"deptName":"'.$deptName.'",
				"deptId":'.intval($vo["deptid"]).',
				"email":null,
				"type":21,
				"status":'.$vo["status_int"].',
				"relType":null,
				"companyTplId":null,
				"roleIdList":[]
			},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
	}
	
	//创建企业子账户
	public function subcreate(){
		//sub/create
		$where['userid_int'] = session('userid');
		$datas = $_POST;
		//默认企业没资料   所以子账户获取不到企业资料ID
		$companyid = M('company')->where($where)->find();	
		if(!$companyid){
			echo '{"success":false,"code":1006,"msg":"请先完善企业资料","obj":null,"map":null,"list":null}';die;
		}
		$maxnum=$companyid['maxnum'];
		
		$_user = M('users');

		$num=$_user->where('companyid='.$companyid['id'])->count();
		if($num>=$maxnum){
			echo '{"success":false,"code":1006,"msg":"添加失败,本账号最多只能开'.$maxnum.'个子账号","obj":null,"map":null,"list":null}';die;
		}

		//企业账户到期时间
		$cend_time=$_user->where(array('userid_int'=>session('userid')))->getField('end_time');
		$userinfo = $_user->where('email_varchar = '.'"'.$datas['loginName'].'"')->find();
		
		if(!$userinfo){
			$datainfo['deptid'] = I('deptId',0,'int');  //部门名称
			$datainfo['email_varchar'] = $datas['loginName'];  //登录邮箱
			$datainfo['uname'] = $datas['name'];  //帐号名称
			$datainfo['type'] = 21;  //帐号类型
			$datainfo['companyid'] = $companyid['id'];
			$datainfo['create_time'] = date('y-m-d H:i:s',time());			
			$datainfo['last_time'] = date('y-m-d H:i:s',time());			
			$datainfo['createip_varchar'] = get_client_ip();
			$datainfo['lastip_varchar'] = get_client_ip();
			$datainfo['password_varchar'] = md5('vxuebao');
			$datainfo['end_time'] = $cend_time;
			$datainfo['checkemail']=1;
			$datainfo['status_int']=1;
			if(strpos($datas['data_permissions'],'1') === false){     //使用绝对等于
				$arr['data_permiss'][0]=false;
			}else{
				$arr['data_permiss'][0]=true;
			}
			if(strpos($datas['data_permissions'],'2') === false){     //使用绝对等于
				$arr['data_permiss'][1]=false;
			}else{
				$arr['data_permiss'][1]=true;
			}
			if(strpos($datas['data_permissions'],'3') === false){     //使用绝对等于
				$arr['data_permiss'][2]=false;
			}else{
				$arr['data_permiss'][2]=true;
			}
			$arr['is_audit'] = $datas['is_audit'];
			$arr['is_integral'] = $datas['is_integral'];
			if($arr['is_integral'] == 'true'){
				$arr['integral_num'] = $datas['integral_num'];
				$datainfo['integral_num'] = $datas['integral_num'];
			}else{
				$arr['integral_num'] = 0;
				$datainfo['integral_num'] = 0;
			}
			$datainfo['company_ext'] = json_encode($arr);

			$returnid = $_user->data($datainfo)->add();
			$subuser = $_user->where('userid_int = '.$returnid)->find();
			
			echo  '{"success":true,"code":200,"msg":"操作成功","obj":{"id":"'.$returnid.'","loginName":"'.$subuser['email_varchar'].'","xd":0,"sex":1,"phone":null,"tel":null,"qq":null,"headImg":null,"idNum":null,"idPhoto":null,"regTime":'.strtotime($subuser['create_time']).'000'.',"extType":0,"property":null,"companyId":"'.$subuser['companyid'].'","deptName":null,"deptId":'.$subuser['deptid'].',"name":"'.$subuser['uname'].'","email":null,"type":0,"status":0,"relType":null,"companyTplId":null,"roleIdList":[]},"map":null,"list":null}';
			$Usercenter = A('Usercenter');
			$Usercenter->_send_to_active2($datainfo['email_varchar']);
		}else{
			echo '{"success":false,"code":1006,"msg":"已存在此账号，请更换邮箱！","obj":null,"map":null,"list":null}';
		}
	}
	
	//子账号修改
	public function subsave(){
		$datas = $_POST;
		$where['userid_int'] = $datas['id'];
		$datainfo['deptid'] = intval($datas['deptId']);
		$datainfo['uname'] = $datas['name'];
		
		
		if(strpos($datas['data_permissions'],'1') === false){     //使用绝对等于
			$arr['data_permiss'][0]=false;
		}else{
			$arr['data_permiss'][0]=true;
		}
		if(strpos($datas['data_permissions'],'2') === false){     //使用绝对等于
			$arr['data_permiss'][1]=false;
		}else{
			$arr['data_permiss'][1]=true;
		}
		if(strpos($datas['data_permissions'],'3') === false){     //使用绝对等于
			$arr['data_permiss'][2]=false;
		}else{
			$arr['data_permiss'][2]=true;
		}
		$arr['is_audit'] = $datas['is_audit'];
		$arr['is_integral'] = $datas['is_integral'];
		if($arr['is_integral'] == 'true'){
			$arr['integral_num'] = $datas['integral_num'];
			$datainfo['integral_num'] = $datas['integral_num'];
		}else{
			$arr['integral_num'] = 0;
			$datainfo['integral_num'] = 0;
		}
		$datainfo['company_ext'] = json_encode($arr);
		M('users')->data($datainfo)->where($where)->save();
		//\Think\Log::write("请求数据：".var_export(gettype($datainfo['company_ext']),true));
		//deptId id name
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
	}
	
	public function subturnoff(){
		//sub/turnOff
		//$datas = $_POST;
		$where['userid_int'] = I('get.id',0);
		$datainfo['status_int'] = 2;
		M('users')->data($datainfo)->where($where)->save();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
	}
	
	public function subturnon(){
		//sub/turnOn
		//$datas = $_POST;
		$where['userid_int'] = I('get.id',0);
		$datainfo['status_int'] = 1;
		M('users')->data($datainfo)->where($where)->save();		
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
	}
	
	//企业账户重置子账户密码
	public function resetpwd(){
		$where['userid_int'] = I('id',0);
		$datainfo['password_varchar'] = md5('vxuebao');
		M('users')->data($datainfo)->where($where)->save();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
	}
	
	
	public function pagetpllist1131(){
		echo  '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[{"id":38144107,"sceneId":1311,"num":1,"name":null,"properties":{"thumbSrc":"group1/M00/21/07/yq0KA1UKkY6ATlrLAAATYDNb6fY512.jpg"},"elements":null,"scene":null},{"id":80637511,"sceneId":1311,"num":2,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null},{"id":80656876,"sceneId":1311,"num":3,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null},{"id":80657492,"sceneId":1311,"num":4,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null},{"id":80637956,"sceneId":1311,"num":5,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null},{"id":80639081,"sceneId":1311,"num":6,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null},{"id":80639969,"sceneId":1311,"num":7,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null},{"id":80641710,"sceneId":1311,"num":8,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null},{"id":80642307,"sceneId":1311,"num":9,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null},{"id":80642915,"sceneId":1311,"num":10,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null},{"id":80643459,"sceneId":1311,"num":11,"name":null,"properties":{"thumbSrc":"group1/M00/21/38/yq0KA1UKk1KAdSUJAAAKtvHjVBs919.jpg"},"elements":null,"scene":null}]}';
		
	}
	
	public function base_company_scale(){
		//base/company_scale
		echo  '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[{"id":14129,"name":"5人以下","value":"1","type":"company_scale","sort":1,"status":1,"remark":null},{"id":14130,"name":"5---10人","value":"2","type":"company_scale","sort":2,"status":1,"remark":null},{"id":14131,"name":"11---50人","value":"3","type":"company_scale","sort":3,"status":1,"remark":null},{"id":14132,"name":"51---100人","value":"4","type":"company_scale","sort":4,"status":1,"remark":null},{"id":14133,"name":"101---200人","value":"5","type":"company_scale","sort":5,"status":1,"remark":null},{"id":14134,"name":"201---300人","value":"6","type":"company_scale","sort":6,"status":1,"remark":null},{"id":14135,"name":"301---500人","value":"7","type":"company_scale","sort":7,"status":1,"remark":null},{"id":14136,"name":"501---1000人","value":"8","type":"company_scale","sort":8,"status":1,"remark":null},{"id":14137,"name":"1000人以上","value":"9","type":"company_scale","sort":9,"status":1,"remark":null}]}';
	}
	
	public function base_company_industry(){
		//base/company_industry
		echo  '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[{"id":14104,"name":"餐饮","value":"1","type":"company_industry","sort":1,"status":1,"remark":null},{"id":14105,"name":"金融","value":"2","type":"company_industry","sort":2,"status":1,"remark":null},{"id":14106,"name":"媒体","value":"3","type":"company_industry","sort":3,"status":1,"remark":null},{"id":14107,"name":"房产","value":"4","type":"company_industry","sort":4,"status":1,"remark":null},{"id":14108,"name":"旅游","value":"5","type":"company_industry","sort":5,"status":1,"remark":null},{"id":14109,"name":"婚庆","value":"6","type":"company_industry","sort":6,"status":1,"remark":null},{"id":14110,"name":"家居","value":"7","type":"company_industry","sort":7,"status":1,"remark":null},{"id":14111,"name":"教育","value":"8","type":"company_industry","sort":8,"status":1,"remark":null},{"id":14112,"name":"服饰","value":"9","type":"company_industry","sort":9,"status":1,"remark":null},{"id":14113,"name":"电商","value":"10","type":"company_industry","sort":10,"status":1,"remark":null},{"id":14114,"name":"IT","value":"11","type":"company_industry","sort":11,"status":1,"remark":null},{"id":14115,"name":"电子","value":"12","type":"company_industry","sort":12,"status":1,"remark":null},{"id":14116,"name":"服务","value":"13","type":"company_industry","sort":13,"status":1,"remark":null},{"id":14117,"name":"公益","value":"14","type":"company_industry","sort":14,"status":1,"remark":null},{"id":14118,"name":"娱乐","value":"15","type":"company_industry","sort":15,"status":1,"remark":null},{"id":14119,"name":"玩具","value":"16","type":"company_industry","sort":16,"status":1,"remark":null},{"id":14120,"name":"农业","value":"17","type":"company_industry","sort":17,"status":1,"remark":null},{"id":14121,"name":"工业","value":"18","type":"company_industry","sort":18,"status":1,"remark":null},{"id":14122,"name":"建筑","value":"19","type":"company_industry","sort":19,"status":1,"remark":null},{"id":14123,"name":"物流","value":"20","type":"company_industry","sort":20,"status":1,"remark":null},{"id":14124,"name":"广告","value":"21","type":"company_industry","sort":21,"status":1,"remark":null},{"id":14125,"name":"快消","value":"22","type":"company_industry","sort":22,"status":1,"remark":null},{"id":14126,"name":"政府","value":"23","type":"company_industry","sort":23,"status":1,"remark":null},{"id":14127,"name":"文化","value":"24","type":"company_industry","sort":24,"status":1,"remark":null},{"id":14128,"name":"其它","value":"25","type":"company_industry","sort":25,"status":1,"remark":null}]}';
	}
	
	
}