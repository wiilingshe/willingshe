<?php
namespace Home\Controller;
use Think\Controller;
class UsercenterController extends Controller {
	public function unlogin() {
		if (intval(session('userid')) == 0) {
			header('Content-type: text/json');
			header('HTTP/1.1 401 Unauthorized');
			echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录!", "obj" => null, "map" => null, "list" => null));
			exit ;
		}
	}

	public function _initialize() {
		header('Content-type: application/json;charset=UTF-8');
		if (intval(session('userid')) != 100) {
			$wheresessionuser["userid_int"] = intval(session('userid'));

		}
	}

	public function dial() {
		if (IS_POST) {
			$datas = I('post.');
			print_r($datas);
			echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
		} else {
			echo '{"success":true,"code":1001,"msg":"操作失败","obj":null,"map":null,"list":null}';
		}
	}

	public function index() {
		$this -> unlogin();
		$where['userid_int'] = session('userid');
		$advUser = M('users');
		$userinfo = $advUser -> where($where) -> select();
		//  print_r($userinfo);
		echo '{"success":true,"code":200,"msg":"操作成功","obj":{"id":"4a2d8af94965656e0149890b87dd008e","loginName":"' . $userinfo[0][email_varchar] . '","xd":"' . $userinfo[0][xd] . '","sex":"' . $userinfo[0][sex] . '","phone":"' . $userinfo[0][phone] . '","tel":"' . $userinfo[0][tel] . '","qq":"' . $userinfo[0][qq] . '","headImg":"' . $userinfo[0][headimg] . '","idNum":null,"idPhoto":null,"regTime":"' . $userinfo[0][last_time] . '","extType":0,"property":"{\"myTplId\":3510499}","companyId":null,"deptName":null,"deptId":0,"name":"' . $userinfo[0][uname] . '","email":"' . $userinfo[0][email_varchar] . '","type":"' . $userinfo[0][type] . '","status":1,"relType":"","companyTplId":null,"roleIdList":[]},"map":null,"list":null}';

	}

	public function userinfo() {
		$this -> unlogin();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":{"id":"4a2d8af94965656e0149890b87dd008e","name":"资源社区","address":"中国","website":"e.wesambo.com","contacts":"","email":null,"mobile":"13800138000","tel":"1380138000","license":null,"createTime":1429249566000,"industry":11,"scale":3,"department":"开发部","status":1},"map":null,"list":null}';
	}

	public function changePwd() {
		$this -> unlogin();
		if (IS_POST && intval(session('userid')) !== 0) {
			$datas = I('POST.');
			$password_varchar = md5($datas['oldPwd']);
			$userinfo["userid_int"] = session('userid');
			$userinfo['status_int'] = 1;
			$User = M('users');

			$returnInfo = $User -> where($userinfo) -> find();
			if ($returnInfo['password_varchar'] == $password_varchar && !empty($datas['newPwd'])) {
				$passwordnew['password_varchar'] = md5($datas['newPwd']);
				$User -> where(array('userid_int' => $userinfo["userid_int"])) -> save($passwordnew);
				echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
			} elseif ($returnInfo['password_varchar'] !== $password_varchar) {
				echo '{"success":false,"code":1004,"msg":"旧密码不正确","obj":null,"map":null,"list":null}';
			} elseif (empty($datas['newPwd'])) {
				echo '{"success":false,"code":1010,"msg":"新密码不能为空","obj":null,"map":null,"list":null}';
			}
		}
	}

	public function xd() {
		$this -> unlogin();
		$_user = M('users');
		$where['userid_int']=session('userid');
		$xd=$_user->where($where)->find();
		//print_r($xd);
		echo '{"success":true,"code":200,"msg":"操作成功","obj":'.$xd['xd'].',"map":null,"list":null}';
	}
public function giveXd(){
	$this -> unlogin();
	if(IS_POST){
		$data=I('get.');
		$_user = M('users');
		$where['userid_int']=session('userid');
		$where1['email_varchar']=$data['toUser'];
	    $xd=$data['xdCount'];
		$getxd=$_user->where($where)->find();
		$userid=$_user->where($where1)->find();
 		if($getxd['xd']>200 && (!empty($userid['userid_int']))){
			$_user->where('userid_int='.$userid['userid_int'].'')->setInc('xd',$xd); 
			$_user->where($where)->setDec('xd',$xd);
			echo '{"success":true,"code":200,"msg":"转送成功","obj":null,"map":null,"list":null}';exit;
		 }elseif(empty($userid)){
			echo '{"success":false,"code":1003,"msg":"账号不存在","obj":null,"map":null,"list":null}';
		} 
	
	}
}
	public function xdStat() {
		$this -> unlogin();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"give":222,"pay":333,"add":444},"list":null}';
	}

	public function promotion() {
		$this -> unlogin();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":{"id":13531,"code":"001","title":"邀请好友送秀点","startDate":1423843200000,"endDate":1424102399000,"link":null,"status":1,"type":1,"ios":0,"android":0,"image":null},"map":null,"list":null}';
	}

	public function lists() {
		$this -> unlogin();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":0,"pageNo":1,"pageSize":50},"list":[]}';
	}

	public function xdlog() {
		$this -> unlogin();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":0,"pageNo":1,"pageSize":10},"list":[]}';
	}

	public function stat() {
		$this -> unlogin();
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":0,"pageNo":1,"pageSize":10},"list":[]}';
	}

	public function save() {
		$this -> unlogin();
		$User = M('users');
		if (IS_POST) {
			$datas = $datas = I('POST.', '', false);
			$yhxx['headimg'] = $datas['headImg'];
			$yhxx['uname'] = $datas['name'];
			$yhxx['sex'] = $datas['sex'];
			$yhxx['phone'] = $datas['phone'];
			$yhxx['tel'] = $datas['tel'];
			$yhxx['qq'] = $datas['qq'];
			$yhxx = array_filter($yhxx);
			$users["userid_int"] = session('userid');
			$User -> where(array('userid_int' => $users["userid_int"])) -> save($yhxx);
			echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
		}
	}
	
		//发送邮件
	public  function _send_to_active($email = ''){
		$site_url=$_SERVER['SERVER_NAME'];
		$options['title'] = C('site_name')."邮箱验证";
                $options['template'] = <<<EOT
                        <p style="color:#cc0f0f;">亲爱的微学宝用户，您好：</p>

<p class="desc" style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您正在申请验证微学宝（www.vxuebao.com）保密邮箱，请在24小时内完成设置，点击以下的按钮验证激活！<span style="font-size:13px;color:#ccc;">(“本网站素材、模版来自用户分享“)</span></p>

<p class="desc">&nbsp;</p>

<p style="text-align:center;margin:60px 0;"><a href="http://#link#" style="border-radius:6px;padding:12px 60px;color:#fff;background-color:#08a1ef;text-decoration:none;" target="_blank">立即验证邮箱</a></p>

<p class="desc">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;微学宝不打码，纯干货，多素材，就是精彩！比毛玻璃的朋友圈好看多了！
还不用给红包，纯免费喔~
</p>

<p class="desc">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;虽然微学宝很棒，但是如果不是您的电子邮箱，请不要随意回复陌生人的信息喔`小宝建议您用自己的邮箱注册，点击微学宝（www.vxuebao.com），只需两步，就能把小宝我抱走了哦~（好害羞~）</p>

<p class="desc">如果点击无效，请把网址复制到浏览器打开：http://#link#</p>
 

<p style="color:#cc0f0f;">提醒：使用微学宝，建议您使用谷歌浏览器。</p>
EOT;
		//邮件标题
		$title = $options['title'];
		$username= $_SESSION['name'];
		$time = time();
                if($email){
                    $where['email_varchar']=$email;
                }else{
	    $where['email_varchar']=$_SESSION['email'];
                }
		$activekey=md5('jihuo'.$uid.time().uniqid());
		$users_model=M("Users");
		$result=$users_model->where($where)->save(array("user_activation_key"=>$activekey));
		if(!$result){
			$this->error('激活码生成失败！');
		}
		//生成激活链接
		$url = C('site_url').'/index.php?c=user&a=active&hash='.$activekey;
		//邮件内容
		$template = $options['template'];
		$content = str_replace(array('http://#link#','#username#','微学宝','http://e.wesambo.com'), array($url,$username,C('site_name'),C('site_url')),$template);
		$send_result=sp_send_email($where['email_varchar'], $title, $content, $time);
		if($send_result['error']){
			echo  '{"success":false,"code":1003,"msg":"激活邮件发送失败，请尝试登录后，手动发送激活邮件！","map":{"isValidateCodeLogin":"'.$send_result['message'].'"}}';
			exit();
			//$this->error('激活邮件发送失败，请尝试登录后，手动发送激活邮件！');
		}
	}


		//发送邮件
	public  function _send_to_active2($email = ''){
		$site_url=$_SERVER['SERVER_NAME'];
		$options['title'] = C('site_name')."邮箱验证";
                $options['template'] = <<<EOT
                        <p style="color:#cc0f0f;">亲爱的微学宝用户，您好：</p>

<p class="desc" style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您正在申请验证微学宝（www.vxuebao.com）保密邮箱，请在24小时内完成设置，点击以下的按钮验证激活！<span style="font-size:13px;color:#ccc;">(“本网站素材、模版来自用户分享“)</span></p>

<p class="desc">&nbsp;</p>

<p style="text-align:center;margin:60px 0;"><a href="http://#link#" style="border-radius:6px;padding:12px 60px;color:#fff;background-color:#08a1ef;text-decoration:none;" target="_blank">立即验证邮箱</a></p>

<p class="desc">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;微学宝不打码，纯干货，多素材，就是精彩！比毛玻璃的朋友圈好看多了！
还不用给红包，纯免费喔~
</p>

<p class="desc">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;虽然微学宝很棒，但是如果不是您的电子邮箱，请不要随意回复陌生人的信息喔`小宝建议您用自己的邮箱注册，点击微学宝（www.vxuebao.com），只需两步，就能把小宝我抱走了哦~（好害羞~）</p>

<p class="desc">如果点击无效，请把网址复制到浏览器打开：http://#link#</p>
 

<p style="color:#cc0f0f;">提醒：使用微学宝，建议您使用谷歌浏览器。</p>
EOT;
		//邮件标题
		$title = $options['title'];
		$username= $_SESSION['name'];
		$time = time();
                if($email){
                    $where['email_varchar']=$email;
                }else{
	    $where['email_varchar']=$_SESSION['email'];
                }
		$activekey=md5('jihuo'.$uid.time().uniqid());
		$users_model=M("Users");
		$result=$users_model->where($where)->save(array("user_activation_key"=>$activekey));
		if(!$result){
			$this->error('激活码生成失败！');
		}
		//生成激活链接
		$url = C('site_url').'/index.php?c=user&a=active&hash='.$activekey;
		//邮件内容
		$template = $options['template'];
		$content = str_replace(array('http://#link#','#username#','微学宝','http://e.wesambo.com'), array($url,$username,C('site_name'),C('site_url')),$template);
		$send_result=sp_send_email($where['email_varchar'], $title, $content, $time);
		if($send_result['error']){
			return false;
			exit();
			//$this->error('激活邮件发送失败，请尝试登录后，手动发送激活邮件！');
		}
	}

	  public function verify(){
		$this -> unlogin();
	    $this->_send_to_active();
		echo '{"success":true,"code":200,"msg":"激活邮件发送成功，请在24小时内验证你的邮箱","obj":null,"map":null,"list":null}';
	}
}
