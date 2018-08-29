<?php
function getUsreJsonStr($userinfo){
	$property='null';
			//$mytplid=M('mytpl')->where('userid_int='.session('userid').' and type=1')->getField('id');
			//$companyTplId=M('mytpl')->where('userid_int='.session('userid').' and type=2')->getField('id');
 			
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
	$userInfoStr='"id":"'.$userinfo["userid_int"].'","loginName":"'.$userinfo['uname'].'","xd":'.$userinfo["xd"].$role_str.',"sex":'
		.$userinfo["sex"].',"phone":'.json_encode($userinfo["phone"]).',"tel":'
		.json_encode($userinfo["tel"]).',"qq":'.json_encode($userinfo["qq"]).',"headImg":'
		.$img.',"idNum":null,"last_time":'.json_encode($userinfo["last_time"]).',"idPhoto":null,"regTime":1425093623000,"extType":0,"property":"'
		.$property.'","companyId":'.(int)$userinfo["companyid"].',"deptName":null,"deptId":0,"checkEmail":"'.$userinfo["checkemail"].'","name":'.json_encode($userinfo["uname"]).',"email":"'.$userinfo["email_varchar"].'","session_id":"'.$userinfo["last_session_id"].'","type":'.$userinfo["type"].',"status":"'.$userinfo["status_int"].'","relType":null,"companyTplId":'.(int)$companyTplId.',"roleIdList":['.$userinfo["level_int"].']';
	return $userInfoStr;
}
?>