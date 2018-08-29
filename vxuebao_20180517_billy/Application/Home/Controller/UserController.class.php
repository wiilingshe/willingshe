<?php
namespace Home\Controller;
use Think\Controller;
use Alidayu\AlidayuClient as Client;
use Alidayu\Request\SmsNumSend;

class UserController extends Controller {

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

    public function check() {
        if (intval(session('userid')) > 0) {
            header('Content-type: text/json');
            header('HTTP/1.1 200 ok');
            cookie('USERID', session('userid'));
            cookie('MD5STR', session('md5str'));

            $_info = M('users')->where('userid_int=' . session('userid'))->select();
            if($_info[0]['companyid']){
                $p_type = M('company')->where(array('cj_company.id'=>$_info[0]['companyid']))->join('left JOIN cj_users ON cj_users.userid_int = cj_company.userid_int')->getField('cj_users.type');
                $_info[0]['p_type'] = $p_type;           
            }
            session('level_int', $_info["level_int"]);
            session('type', $_info["type"]);
            $userInfoStr = getUsreJsonStr($_info[0]);
			$jsonStr = '{"success":true,"code":200,"msg":"操作成功","obj":{' . $userInfoStr . '},"map":null,"list":null}';
            echo $jsonStr;
        } else {
            header('Content-type: text/json');
            header('HTTP/1.1 200 ok');
            //header('HTTP/1.1 401.3 Unauthorized');   //header('HTTP/1.1 401 Unauthorized');
            // header('status: 401 Unauthorized'); 
            echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录!", "obj" => null, "map" => 'NOLOGION', "list" => null));
        }
    }

    public function promotion() {
        echo '{"success":true,"code":200,"msg":"操作成功","obj":{"id":13531,"code":"001","title":"邀请好友送秀点","startDate":1423843200000,"endDate":1424102399000,"link":null,"status":1,"type":1,"ios":0,"android":0,"image":null},"map":null,"list":null}';
    }

    public function login() {
        if (IS_POST) {
            header('Content-type: text/json');
            $datas = $_POST;
            $field = C('REG_FIELD') ? C('REG_FIELD') : 'email_varchar';

            $password_varchar = md5($datas['password']);
            $userinfo[$field] = $datas['username'];
            $userinfo['status_int'] = 1;

            $User = M('users');

            $returnInfo = $User->where($userinfo)->find();
            //\Think\Log::write('登陆:' . var_export($returnInfo, true));
			session('[regenerate]');
			$sessionid= session_id();
            if ($returnInfo) {
                if ($returnInfo['password_varchar'] == $password_varchar) {
                    if (intval($returnInfo['end_time']) > 0 && $returnInfo['end_time'] < time()) {

                        echo '{"success":false,"code":1004,"msg":"您的账号已过期，请与管理员联系","map":{"isValidateCodeLogin":false}}';
                    } elseif ($returnInfo['checkemail'] == false) {
                        echo '{"success":false,"code":1004,"msg":"您的邮箱未验证,请验证后登陆!","map":{"isValidateCodeLogin":false}}';
                    } else {
                        if ($returnInfo['last_session_id']) {
                            M('session')->where(array('session_id'=>$returnInfo['last_session_id']))->delete();
                        }
                        session('userid', $returnInfo["userid_int"]);
                        session('name', $returnInfo["uname"]);
                        session('username', $returnInfo[$field]);
                        session('phone', $returnInfo['phone']);
                        session('level_int', $returnInfo["level_int"]);
                        session('type_id', $returnInfo["type"]);    //session名为type 无法获取值
                        session('type', $returnInfo["type"]);
                        session('email', $returnInfo["email_varchar"]);
						session('companyid', $returnInfo["companyid"]);
						session('company_ext', $returnInfo["company_ext"]);
                        header('HTTP/1.1 200 ok');

                        $update['last_time'] = date('y-m-d H:i:s', time());
                        $update['last_session_id'] = $sessionid;
                        $User->where(array('userid_int' => $returnInfo["userid_int"]))->save($update);
						$userInfoStr = getUsreJsonStr($returnInfo);
						//非免费账户和子账户
                        $expire_time=M('userexpire')->where(array('userid_int'=>$returnInfo["userid_int"]))->getField('expire_time');
                        $now=time();

                        if($returnInfo["type"] == 2 || $returnInfo["type"] == 12){   //企业收费用户、个人付费用户
                            if($expire_time>0 && $expire_time-$now<0){
                                $User->where(array('userid_int'=>$returnInfo["userid_int"]))->save(array('type'=>23));  //自动降为企业免费用户
                                session('type',23);
                            }
                        }

						// if(($returnInfo["type"] !=1)){
						// 	$expire_time=M('userexpire')->where(array('userid_int'=>$returnInfo["userid_int"]))->getField('expire_time');
						// 	$now=time();
						// 	if($expire_time-$now<0){
						// 		$User->where(array('userid_int'=>$returnInfo["userid_int"]))->save(array('type'=>1));
						// 		session('type',1);
						// 		//企业付费用户与服务商用户
						// 		if($returnInfo["type"]<12 || $returnInfo["pre_type"]<12){
						// 			$company_id=M('company')->where(array('userid_int'=>$returnInfo["userid_int"]))->getField('id');
						// 			if($company_id){
						// 				$User->where(array('companyid'=>$company_id))->save(array('status_int'=>0));
						// 			}
						// 		}
						// 	}
						// }
						
						
                        //判断用户有没有点击记住密码
                        if ($datas['rememberMe'] == true) {
                            setcookie("email_varchar", $returnInfo['email_varchar'], time() + 3600 * 24);
                            setcookie("pwd", $returnInfo['password_varchar'], time() + 3600 * 24);
                            setcookie("userid", $returnInfo["userid_int"], time() + 3600 * 24);
                        }
                        echo '{"success":true,"code":200,"msg":"登陆成功","obj":{' . $userInfoStr . '},"map":null,"list":null,"sessionid":"'.$sessionid.'"}';
                    }
                    exit;
                } else {
                    echo '{"success":false,"code":1004,"msg":"密码错误","map":{"isValidateCodeLogin":false}}';
                }

            } else {
                echo '{"success":false,"code":1003,"msg":"账号不存在或者已经被禁用","map":{"isValidateCodeLogin":false}}';
                exit;
            }
        } else {
            echo '{"success":false,"code":404,"msg":"请求有误","obj":{' . $userInfoStr . '},"map":null,"list":null,"sessionid":"'.$sessionid.'"}';
        }
    }

    public function checkN() {
        $userinfo['email_varchar'] = I('get.username', 0);
        $User = M('users');
        $is_exist_id = $User->where($userinfo)->getField('userid_int');
        if ($is_exist_id) {
            header('Content-type: text/json');
            echo '{"success":false,"code":1006,"msg":"账号已经存在","obj":null,"map":null,"list":null}';
            exit;
        } else {
            echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
        }
    }

    public function register() {
        if(get_client_ip() === '122.228.178.134'){
            header('Content-type: text/json');
            echo '{"success":false,"code":1006,"msg":"注册成功,等待管理员手动审核!!!","obj":null,"map":null,"list":null}';
            exit;
        }
        if (IS_POST) {
            $datas = $_POST;
            $field = C('REG_FIELD') ? C('REG_FIELD') : 'email_varchar';

            $userinfo['password_varchar'] = md5($datas['password']);
            $userinfo[$field] = $datas['loginName'];

            if (!$datas['password']) {
                header('Content-type: text/json');

                echo '{"success":false,"code":1006,"msg":"密码不能为空","obj":null,"map":null,"list":null}';
                exit;
            }
            if ($field != 'email_varchar') {
                $userinfo['email_varchar'] = $datas['email'] . '@qq.com';
            }

            $User = M('users');
            $is_exist_id = $User->where("$field='" . $userinfo[$field] . "'")->getField('userid_int');
            if ($is_exist_id) {
                header('Content-type: text/json');

                echo '{"success":false,"code":1006,"msg":"账号已经存在","obj":null,"map":null,"list":null}';
                exit;
            }


            $userinfo['create_time'] = date('y-m-d H:i:s', time());
            $userinfo['last_time'] = date('y-m-d H:i:s', time());
            $userinfo['end_time'] = C('reg_validdays') > 0 ? time() + intval(C('reg_validdays')) * 24 * 3600 : 0;
            $userinfo['createip_varchar'] = get_client_ip();
            $userinfo['lastip_varchar'] = get_client_ip();
            $emailarr = explode("@", $userinfo['email_varchar']);
            $userinfo['uname'] = $emailarr[0];
            $userinfo['headimg'] = '';
            $userinfo['xd'] = C('xd');
            $userinfo['allow_nums'] = C('allow_nums') ? intval(C('allow_nums')) : 0;
            $userinfo['export_num'] = M('user_group')->where("id=1")->getField('export_num');
            $userinfo['status_int']=0;
            $returnInfo = $User->add($userinfo);

            if ($returnInfo) {
                //$Usercenter = A('Usercenter');
                //$Usercenter->_send_to_active($userinfo['email_varchar']);
                header('Content-type: text/json');
                echo json_encode(array("success" => true, "code" => 200, "msg" => "注册成功,等待管理员手动审核!", "obj" => null, "map" => null, "list" => null));
            } else {
                header('Content-type: text/json');
                //header('HTTP/1.1 401 Unauthorized');
                echo json_encode(array("success" => false, "code" => 1006, "msg" => "帐号重复", "obj" => null, "map" => array("isValidateCodeLogin" => false), "list" => null));
            }
        }
    }

    public function retrieve() {
        $datas = $_POST;
        $user = M('users');
        // $geetest = D('Geetest');
        $where['email_varchar'] = $datas['email'];
        // $geetest->set_privatekey("4cd7b256aa9fb2c493a68c8ab85ffb14");
        $users = $user->where($where)->select();
        if ($users[0]['email_varchar'] = $where['email_varchar']) {
            $name = $users[0]['email_varchar'];
            $Token = md5($where['email_varchar'] . time());
            $time['token_exptime'] = time() + 60 * 60 * 24;
            $time['token'] = $Token;
            $url = C('SITE_INFO.url');
            $mb = <<<hoa
          <p>Hi，$name ：<br  />
你申请的找回密码成功，请点击下面的链接，根据页面提示完成密码重置：<br  />
$url#/home/reset?resetToken=$Token   </p>
<p>如果链接无法点击，请完整拷贝到浏览器地址栏里直接访问。有效期24小时</p>
<p>（这是一封自动发送的邮件，请不要直接回复）</p>
<p><br  />
 </p>
hoa;
            if (SendMail($name, "找回密码", $mb)) {
                $user->where($where)->save($time);
                echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
            } else {
                echo '{"success":false,"code":1005,"msg":"邮件配置错误","obj":null,"map":null,"list":null}';
                exit;
            }
        } else {
            echo '{"success":false,"code":1003,"msg":"邮件不在在","obj":null,"map":null,"list":null}';
        }
    }

    public function reset() {
        $datas = $_POST;
        $user = M('users');
        $Token['token'] = $datas['key'];
        $yz = $user->where($Token)->select();
        $newPwd = md5($datas['newPwd']);
        if ($yz) {
            if (time() > $yz[0]['token_exptime']) {
                header('Content-type: text/json');
                echo '{"success":false,"code":1011,"msg":"该链接已失效!","obj":null,"map":null,"list":null}';
            } else {
                $nwspw['password_varchar'] = $newPwd;
                if (!empty($datas['newPwd'])) {
                    $user->where($Token)->save($nwspw);
                    header('Content-type: text/json');
                    echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
                } else {
                    header('Content-type: text/json');
                    echo '{"success":false,"code":1011,"msg":"密码不能为空哦","obj":null,"map":null,"list":null}';
                }
            }
        } else {
            header('Content-type: text/json');
            echo '{"success":false,"code":1011,"msg":"验证错误","obj":null,"map":null,"list":null}';
        }
    }

    public function save() {
        $this->unlogin();
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
        $_user = M('users');
        $datas = $_POST;
        $where['userid_int'] = (int)$userid;
		if((int)$userid==0){
			echo json_encode(array("success" => false, "code" => 1001, "msg" => "没找到数据，请重新登陆!", "obj" => null, "map" => null, "list" => null));
			die;
		}
        $returnInfo = $_user->where($where)->find();
        //echo $datas['headImg'];
        if (isset($datas['name'])) {
			$datainfo['uname'] = $datas['name'];
			$returnInfo['uname']= $datas['name'];
		}
        if (isset($datas['headImg'])) {
			$datainfo['headimg'] = $datas['headImg'];
			$returnInfo['headimg']= $datas['headImg'];
		}
        if (isset($datas['phone'])) {
			$datainfo['phone'] = $datas['phone'];
			$returnInfo['phone']= $datas['phone'];
		}
        if (isset($datas['tel'])) {
			$datainfo['tel'] = $datas['tel'];
			$returnInfo['tel']= $datas['tel'];
		}
        if (isset($datas['qq'])) {
			$datainfo['qq'] = $datas['qq'];
			$returnInfo['qq']= $datas['qq'];
		}
        if (isset($datas['sex'])) {
			$datainfo['sex'] = $datas['sex'];
			$returnInfo['sex']= $datas['sex'];
		}

        $_user->data($datainfo)->where($where)->save();

        $userInfo_str = getUsreJsonStr($returnInfo);
        $jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":{' . $userInfo_str . '},"map":null,"list":null}';
        echo $jsonstr;
    }

    public function changePwd() {
        $this->unlogin();
        $_user = M('users');
        $datas = $_POST;
        $where['userid_int'] = session('userid');
        $returnInfo = $_user->where($where)->find();
        $password_varchar = md5($datas['oldPwd']);
        $datainfo['password_varchar'] = md5($datas['newPwd']);
        if ($returnInfo['password_varchar'] == $password_varchar) {
            $_user->data($datainfo)->where($where)->save();
            echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
        } else {
            echo '{"success":false,"code":1004,"msg":"旧密码不正确","obj":null,"map":null,"list":null}';
        }
    }

    public function giveXd() {
        $this->unlogin();
        $_user = M('users');
        $tousername = I('get.toUser', 'yy');
        $xdCount = I('get.xdCount', 0);
        //$opttime = I('get.time', 0);
        $opttime = time();
        $where['userid_int'] = session('userid');
        $where2['email_varchar'] = $tousername;
        $returnInfo = $_user->where($where)->find();
        $returnInfo2 = $_user->where($where2)->find();
        $datainfo['xd'] = $returnInfo['xd'] - $xdCount;
        $datainfo2['xd'] = $returnInfo2['xd'] + $xdCount;
        if (!$returnInfo || $datainfo['xd'] < 0) {
            echo '{"success":false,"code":1010,"msg":"秀点不足","obj":null,"map":null,"list":null}';
        } elseif (is_array($returnInfo2)) {
            $_user->data($datainfo)->where($where)->save();
            $_user->data($datainfo2)->where($where2)->save();
            $_xdlog = M(xdlog);
            $loginfo['userid_int'] = session('userid');
            $loginfo['biztitle'] = "转送";
            $loginfo['biztype'] = 2;
            $loginfo['opttime'] = $opttime;
            $loginfo['xd'] = $xdCount;
            $loginfo['remark'] = "为" . $tousername . "成功转送" . $xdCount . "个秀点！";
            $id = $_xdlog->data($loginfo)->add();
            $loginfo2['userid_int'] = $returnInfo2['userid_int'];
            $loginfo2['biztitle'] = "获得";
            $loginfo2['biztype'] = 1;
            $loginfo2['opttime'] = $opttime;
            $loginfo2['xd'] = $xdCount;
            $loginfo2['remark'] = "成功获取" . $returnInfo['uname'] . "转送的" . $xdCount . "个秀点！";
            $_xdlog->data($loginfo2)->add();
            $_xdlogcount = $_xdlog->where($loginfo)->count();

            echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":' . $_xdlogcount . ',"pageNo":1,"pageSize":10},"list":[{"id":"' . $id . '","bizTitle":"转送","bizType":1,"optTime":' . $opttime . ',"sceneId":null,"remark":"' . $loginfo['remark'] . '","xd":' . $xdCount . '}]}';
        } elseif ($returnInfo2['userid_int'] == session('userid')) {
            echo '{"success":false,"code":1010,"msg":"不能给自己转送","obj":null,"map":null,"list":null}';
        } else {
            echo '{"success":false,"code":1010,"msg":"用户不存在","obj":null,"map":null,"list":null}';
        }
    }

    public function xdlog() {
        $this->unlogin();
        $_xdlog = M(xdlog);
        $loginfo['userid_int'] = session('userid');
        $_log_list = $_xdlog->where($loginfo)->page(I('get.pageNo', 1), I('get.pageSize', 10))->order("opttime desc")->select();

        $_xdlogcount = $_xdlog->where($loginfo)->count();
        $jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":' . $_xdlogcount . ',"pageNo":' . I('get.pageNo', 1) . ',"pageSize":' . I('get.pageSize', 10) . '},"list":[';
        $jsonstrtemp = '';
        foreach ($_log_list as $vo) {
            $vo['xd'] = intval($vo['xd']);
            $vo["sceneid"] = $vo["sceneid"] ? intval($vo["sceneid"]) : 0;
            $jsonstrtemp = $jsonstrtemp . '{"id":"' . $vo["id"] . '","bizTitle":"' . $vo["biztitle"] . '","type":' . $vo["biztype"] . ',"optTime":"' . date('Y-m-d H:i', $vo["opttime"]) . '","sceneId":' . $vo["sceneid"] . ',"remark":' . json_encode(str_replace('秀点','微币',$vo['remark'])) . ',"xd":' . $vo['xd'] . '},';
        }
        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . '';
        $jsonstr = $jsonstr . ']}';
        echo $jsonstr;
    }

    public function xdStat() {
        $_xdlog = M('xdlog');
        $where['userid_int'] = intval(session('userid'));
        $where['biztype'] = 1;
        $give = $_xdlog->where($where)->sum('xd');
        $where['biztype'] = 2;
        $add = $_xdlog->where($where)->sum('xd');
        $where['biztype'] = 3;
        $pay = $_xdlog->where($where)->sum('xd');
        $give = $give ? $give : 0;
        $pay = $pay ? $pay : 0;
        $add = $add ? $add : 0;
        echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"give":' . $give . ',"pay":' . $pay . ',"add":' . $add . '},"list":null}';
    }

    public function msgList() {
        echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":5,"pageNo":1,"pageSize":5},"list":[{"id":15381137,"type":2,"bizType":3,"toUser":"4a2d8af94b7cf1db014bc3e4ebd27856","toEmail":"minglangasp@qq.com","fromUser":"4a2d8af948fd5bc40148fdbfc6640018","sendTime":1427335605000,"title":"秀点火热发售","content":"秀点火热发售，一份200元（含200个秀点），移步易企秀微信公众号，回复［0326］即可购买","status":1,"ext":null,"roleIdList":null},{"id":10765343,"type":2,"bizType":3,"toUser":"4a2d8af94b7cf1db014bc3e4ebd27856","toEmail":"minglangasp@qq.com","fromUser":"4a2d8af948fd5bc40148fdbfc6640018","sendTime":1425549612000,"title":null,"content":"易企秀产品更新2015.3.5 祝元宵快乐 http://eqxiu.com/s/fq4ZBB","status":1,"ext":null,"roleIdList":null}]}';
    }

    public function lists() {

        echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":0,"pageNo":1,"pageSize":10},"list":[]}';
    }

    public function saveMyTpl() {
        if (!defined('VIRIFY')) {
            virifylocal();
        }
        $this->unlogin();
        $m_scenepage = M('scenepage');
        $datas = json_decode(file_get_contents("php://input"), true);


        $myTplId = intval($datas['sceneId']);
        if (!$myTplId) {
            $datatpl['userid_int'] = intval(session('userid'));
            $datatpl['type'] = 1;
            $myTplId = M('mytpl')->data($datatpl)->add();
        }
        if ($myTplId) {

            $datainfo['pagecurrentnum_int'] = intval($datas['num']);
            $datainfo['content_text'] = json_encode($datas['elements']);

            $datainfo['properties_text'] = json_encode($datas['properties']);
            $datainfo['scenecode_varchar'] = 'U6040278S2';
            $datainfo['pagename_varchar'] = $datas['name'];
            $datainfo['userid_int'] = intval(session('userid'));
            $datainfo['createtime_time'] = date('y-m-d H:i:s', time());
            $datainfo['sceneid_bigint'] = $myTplId;
            $datainfo['myTypl_id'] = $myTplId;
			$datainfo['islong'] = $datas['islong'];
            $m_scenepage->add($datainfo);
            $jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":' . $myTplId . ',"map":null,"list":null}';
        } else {
            $jsonStr = '{"success":false,"code":100,"msg":"操作失败","obj":' . $myTplId . ',"map":null,"list":null}';
        }
        echo $jsonstr;
    }

    public function getMyTpl() {
        $this->unlogin();
        $jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[';

		$companyid	=(int)session('companyid');
		$userid		=(int)session('userid');
		$ustype		=session('type');
		$where['myTypl_id'] = I('get.id', 0);	//中间表mytpl的id值
		$where['islong'] = I('get.islong', 0,'int');


		//企业用户：企业用户设置企业模板    子账号的我的模板中显示企业用户的企业模板
		if($companyid==0){
			$where['userid_int'] = $userid;	//等于0为企业用户
		}else{
			$tp=M('mytpl')->where(array('id'=>$where['myTypl_id']))->getField('type');
			if($tp==2 || $tp==23){	//企业模板
				$userid=M('company')->where(array('id'=>$companyid))->getField('userid_int');
			}
			$where['userid_int'] = $userid;
		}
		
        $_scene_list = M('scenepage')->where($where)->select();

        $jsonstrtemp = '';
        foreach ($_scene_list as $vo) {

            $replaceArray = json_decode($vo['content_text'], true);
            foreach ($replaceArray as $key => $value) {
                $replaceArray[$key]['sceneId'] = $where['myTypl_id'];
                $replaceArray[$key]['pageId'] = $vo['pageid_bigint'];
            }
            $replaceArray = json_encode($replaceArray);
            $properties_text = $vo['properties_text'] ? $vo['properties_text'] : 'null';
            $jsonstrtemp = $jsonstrtemp . '{
			 "id": ' . $vo["pageid_bigint"] . ',
            "sceneId": ' . $where['myTypl_id'] . ',
            "name": ' . json_encode($vo["scenename_varchar"]) . ', 
            "num": ' . $vo["pagecurrentnum_int"] . ', 
            "properties": null, 
            "elements": ' . $replaceArray . ',
            "properties_text": '.$properties_text.', 
            "scene": null
        },';
        }

        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . ']}';
        echo $jsonstr;
    }

    // 2015-7-
    public function mytplbycate() {
        $jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[';

        $where['myTypl_id'] = I('get.id', 0);
        if (I('get.cateid', 0) > 0) {
            $where['my_type_cate'] = I('get.cateid', 0);
        }
        $where['userid_int'] = intval(session('userid'));
        $_scene_list = M('scenepage')->where($where)->order('pagecurrentnum_int asc')->select();

        $jsonstrtemp = '';
        foreach ($_scene_list as $vo) {

            $replaceArray = json_decode($vo['content_text'], true);
            foreach ($replaceArray as $key => $value) {
                $replaceArray[$key]['sceneId'] = $where['myTypl_id'];
                $replaceArray[$key]['pageId'] = $vo['pageid_bigint'];
            }
            $replaceArray = json_encode($replaceArray);

            $jsonstrtemp = $jsonstrtemp . '{
			 "id": ' . $vo["pageid_bigint"] . ',
            "sceneId": ' . $where['myTypl_id'] . ',
            "name": ' . json_encode($vo["scenename_varchar"]) . ', 
            "num": ' . $vo["pagecurrentnum_int"] . ', 
            "properties": null, 
            "elements": ' . $replaceArray . ', 
            "scene": null
        },';
        }

        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . ']}';
        echo $jsonstr;
    }

    public function getMyTplCate() {
        $jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[';

        $where['type'] = 'mytpl_type';
        $_scene_list = M('cate')->where($where)->order('sort asc,id asc')->select();
        $jsonstrtemp = '{"id":0,"name":"全部","sort":1},';
        foreach ($_scene_list as $vo) {

            $jsonstrtemp = $jsonstrtemp . '{
				 "id": ' . $vo['id'] . ',           
				"name": "' . $vo['title'] . '", 
				"sort": ' . $vo['sort'] . '
				
			},';
        }
        $jsonstr = $jsonstr . rtrim($jsonstrtemp, ',') . ']}';
        echo $jsonstr;
    }

    public function Alipay() {

        $this->display();
    }

    public function xd() {
        $this->unlogin();
        $_info = M('users')->where("userid_int='" . session('userid') . "'")->select();
        $jsonStr = '{"success":true,"code":200,"msg":"操作成功","obj":' . $_info[0][xd] . ',"map":"' . $_info[0]['phone'] . '","list":null}';
        echo $jsonStr;
    }

    public function logout() {
		$app=I('type');
		$userid=I('userid',0,'int');
        session('userid', null);
        session('username', null);
        session('email', null);
        session('md5str', null);
        cookie('USERID', null);
        cookie('MD5STR', null);
        cookie('username', null);
        cookie('pwd', null);
        session('[destroy]');
		session(null);
		session('[regenerate]');
		if($app=='app'){
			session('[regenerate]');
			$update['last_session_id'] = md5(time().mt_rand(111111,999999));
            M('users')->where(array('userid_int' => $userid))->save($update);
			$jsonStr = '{"success":true,"code":200,"msg":"退出登陆成功","obj":null,"map":null,"list":null}';
			echo $jsonStr;
		}else{
			header("Location: http://" . $_SERVER['HTTP_HOST'] . "");
		}
    }

    public function active() {
        $hash = I("get.hash", "");
        if (empty($hash)) {
            $this->error("激活码不存在");
        }
        $users_model = M("Users");
        $find_user = $users_model->where(array("user_activation_key" => $hash))->find();

        if ($find_user) {
            $result = $users_model->where(array("user_activation_key" => $hash))->save(array("user_activation_key" => "", "checkemail" => 1));
            if ($result) {
                $find_user['checkemail'] = 1;
                //$_SESSION['user']=$find_user;
                $this->success("用户激活成功", __ROOT__ . "/");
            } else {
                $this->error("用户激活失败!", U("/"));
            }
        } else {
            $this->error("用户激活失败，激活码无效！", U("/"));
        }
    }

    public function email() {
        $this->unlogin();
        $where['email_varchar'] = $_POST['email'];
        $users_model = M("Users");
        $result = $users_model->where($where)->count();
        if ($result || $email_varchar < 0 || $email_varchar < 0) {
            echo '{"success":false,"code":1003,"msg":"邮箱已存在","map":{"isValidateCodeLogin":false}}';
            exit;
        }
        $where2['email_varchar'] = $_SESSION['email'];
        $user = $users_model->where($where2)->find();
        if (md5($_POST['pass']) != $user['password_varchar']) {
            echo '{"success":false,"code":1004,"msg":"密码错误","obj":null,"map":null,"list":null}';
        } else {
            if (IS_POST) {
                $data['email_varchar'] = $_POST['email'];
                $data["checkemail"] = 0;
                $yhxx = array_filter($yhxx);
                $users["userid_int"] = $_SESSION['userid'];
                $users_model->where(array('userid_int' => $users["userid_int"]))->save($data);
            }
            session('email', $_POST['email']);
            $this->_send_to_active();
            echo '{"success":true,"code":200,"msg":"激活邮件发送成功，请在24小时内验证你的邮箱","obj":null,"map":null,"list":null}';
        }
    }

    public function forget_password() {
        if (IS_POST) {
            $users_model = M("Users");
            $email = I("post.email");
            $find_user = $users_model->where(array("email_varchar" => $email))->find();
            if ($find_user) {
                $datas = $_POST;
                $user = M('users');
                $where['email_varchar'] = $email;
                $users = $user->where($where)->select();
                $name = $users[0]['uname'];
                $Token = md5('findpassword' . $where['email_varchar'] . time());
                $time['token_exptime'] = time() + 60 * 60 * 24;
                $time['token'] = $Token;
                $url = C('site_url');
                $title = '找回密码';
                $mb = <<<hoa
          <p>Hi，$name ：<br  />
你申请的找回密码成功，请点击下面的链接，根据页面提示完成密码重置：<br  />
$url/index.php?key=$Token#resetpwd   </p>
<p>如果链接无法点击，请完整拷贝到浏览器地址栏里直接访问。有效期24小时</p>
<p>（这是一封自动发送的邮件，请不要直接回复）</p>
<p><br  />
 </p>
hoa;
                $send_result = sp_send_email($email, $title, $mb);
                if ($send_result['error']) {
                    echo '{"success":false,"code":1003,"msg":"激活邮件发送失败，请尝试登录后，手动发送激活邮件！","map":{"isValidateCodeLogin":false}}';
                    exit();
                }
                $user->where($where)->save($time);
                echo '{"success":true,"code":200,"msg":"密码重置邮件发送成功","obj":null,"map":null,"list":null}';
            } else {
                echo '{"success":false,"code":1003,"msg":"账号不存在","obj":null,"map":null,"list":null}';
            }
        }
    }

    public function reset_password() {
        $datas = $_POST;
        $user = M('users');
        $Token['token'] = $datas['key'];
        $yz = $user->where($Token)->select();
        $newPwd = md5($datas['newPwd']);
        if ($yz) {
            if (time() > $yz[0]['token_exptime']) {
                echo '{"success":false,"code":1011,"msg":"该链接已失效!","obj":null,"map":null,"list":null}';
            } else {
                $nwspw['password_varchar'] = $newPwd;
                if (!empty($datas['newPwd'])) {
                    $user->where($Token)->save($nwspw);
                    echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
                } else {
                    echo '{"success":false,"code":1011,"msg":"密码不能为空哦","obj":null,"map":null,"list":null}';
                }
            }
        } else {
            echo '{"success":false,"code":1011,"msg":"验证错误","obj":null,"map":null,"list":null}';
        }
    }

    public function markRead() {
        $news_ids = I('get.ids');
        $array_news_id = explode(",", $news_ids);
        foreach ($array_news_id as $news_id) {
            $dataList[] = array('user_id' => session('userid'), 'news_id' => $news_id);
        }
        M('message')->addAll($dataList);
        echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
    }
	
	//免费用户在价格表中手动升级到个人付费用户
	
	public function updatereglx(){
		if (intval(session('userid')) == 0) {
           $this->error('操作失败，请先登录账户才能升级！','/#/home/login',3);
            exit;
        }
		M()->execute("update cj_users set email_varchar=CONCAT(userid_int,'@vxuebao.com') where email_varchar is null");
		$usid=intval(session('userid'));
		$User=M('users');
		$expire=M('userexpire');
		$Userinfo=$User->where('userid_int='.$usid)->find();
		//print_r($Userinfo);die;
		//当前等级 $Userinfo['type'];
		if($Userinfo['xd']-45<0){
			 $this->error('升级失败，您账户余额不足！','/#/usercenter/member',3);
		}else{
			if($Userinfo['type']==1 || ($Userinfo['pre_type']==1 &&  $Userinfo['type']==22)){
                $User->where('userid_int='.$usid)->save(array('type'=> 12,'xd'=>$Userinfo['xd']-45,'pre_type'=>$Userinfo['type'],'export_num'=> M('user_group')->where("id=12")->getField('export_num')));
                $expire->where("userid_int=$usid")->delete();
                $expire->add(array('userid_int'=>$usid,'expire_time'=>time()+60*60*24*365));
                /*添加日志*/
                $loginfo2['userid_int'] = $usid;
                $loginfo2['biztitle'] = "升级";
                $loginfo2['biztype'] = 2;
                $loginfo2['opttime'] = time();
                $loginfo2['xd'] = '45';
                $loginfo2['remark'] = $Userinfo['uname'] . "成功升级个人付费版";
                M('xdlog')->data($loginfo2)->add();
                $this->success('升级成功', '/#/usercenter/member');
            }else{
                
				$this->error('升级失败，仅供免费用户升级！','/#/usercenter/member',3);
            }
		}
	}


      //升级成设计师接口
    public function upgrade(){
        if(intval(session('userid')) == 0){
            $this->error('操作失败，请先登录账户才能升级！','/#/home/login',3);
            exit;
        }
        $userid = intval(session('userid'));
        $user = M('users');
        $userinfo = $user->where('userid_int='.$userid)->find();
        //判断当前用户类型
        if($userinfo['type'] != 1){
            $user->where('userid_int='.$userid)->save(array('pre_type'=>$userinfo['type']));
        }
        $user->where('userid_int='.$userid)->save(array('type'=>22));
    
        if($userinfo['type'] == 1 || $userinfo['type'] == 12){
            M('usermsg')->add(array('userid' => $userid,'user_type' => '个人'));
        }else{
            M('usermsg')->add(array('userid' => $userid,'user_type' => '企业'));
        }
        $this->success('升级成功','/#/usercenter/member');
        
    }
	

}
