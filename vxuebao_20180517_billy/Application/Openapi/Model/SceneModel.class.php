<?php

namespace Openapi\Model;

use Think\Model;

class SceneModel extends Model {

    public function addscene() {
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
	    if($sessionid=='' && intval(session('userid'))==0){
	        echo $_GET['callback'] . "(".json_encode(array("success" => false,"code" => 402,"msg" => "创建失败,用户参数获取失败","obj" => null,"map" => null,"list" => null)).")";
            exit;
	    }
		$userid=(int)$userid;
		if($userid==0){
			echo $_GET['callback'] . "(".json_encode(array("success" => false,"code" => 401,"msg" => "创建失败,用户参数获取失败","obj" => null,"map" => null,"list" => null)).")";
            exit;		
		}
        //checkAllow_nums();
        $m_scene = M('Scene');
        $m_scenepage = M('scenepage');
        $datainfo['scenecode_varchar'] = 'U' . (date('y', time()) - 9) . date('m', time()) . randorderno(6, -1);
        $datainfo['scenename_varchar'] = '请设置课件名称';
        $datainfo['movietype_int'] = 0;
        $datainfo['scenetype_int'] = 101;
        $datainfo['ip_varchar'] = get_client_ip();
        $datainfo['thumbnail_varchar'] = "default_thum.jpg";
        $datainfo['userid_int'] = $userid;
        $datainfo['createtime_time'] = date('y-m-d H:i:s', time());
        $datainfo['is_public'] = 0;
        $result1 = $m_scene->add($datainfo);
        //var_dump($result1);exit;
        if ($result1) {
            $datainfo2['scenecode_varchar'] = $datainfo['scenecode_varchar'];
            $datainfo2['sceneid_bigint'] = $result1;
            $datainfo2['content_text'] = "[]";
            $datainfo2['properties_text'] = 'null';
            $datainfo2['userid_int'] = $userid;
            $result2 = $m_scenepage->add($datainfo2);
            echo $_GET['callback'] . "(".json_encode(array("success" => true,"code" => 200,"msg" => "成功","obj" => $result1,"map" => null,"list" => null)).")";
        } else {
			echo $_GET['callback'] . "(".json_encode(array("success" => false,"code" => 400,"msg" => "创建失败","obj" => null,"map" => null,"list" => null)).")";
            exit;
        }
    }

}

?>
