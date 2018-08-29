<?php
namespace Home\Controller;
use Think\Controller;
 
class PptController extends Controller {
	public function _initialize() {
        header('Content-type: application/json;charset=UTF-8');
    }
	
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

   
	public function index(){
		session('ppt',null);
		$this->display();		
	}
	
	//PPT上传
	public function upload(){
		$this->unlogin();
		$upload = new \Think\Upload();// 实例化上传类
		$upload->maxSize   =  21*1024*1024 ;// 设置附件上传大小
		$upload->exts      =  array('pptx','ppt');// 设置附件上传类型
		$upload->rootPath = './Uploads/';
		$upload->subName  = array('date','Ym');
		$upload->savePath  =  'ppt/'; // 设置附件上传目录
		$info   =   $upload->upload(); 
		if(!$info) {// 上传错误提示错误信息
			echo json_encode(array("success" => false,
                "code" => 400,
                "msg" => $upload->getError(),
                "obj" => $info['photo']['savepath'].$info['photo']['savename'],
                "map" => null,
                "list" => null
            	)
            );

		}else{// 上传成功
			//$ppt['savepath']=$info['photo']['savepath'];
			//$ppt['savename']=$info['photo']['savename'];
			//session('ppt',$ppt);
			echo json_encode(array("success" => true,
                "code" => 200,
                "msg" => "success",
                "obj" => $info['photo']['savepath'].$info['photo']['savename'],
                "map" => null,
                "list" => null
                    )
            );
			
			//$this->display();
			//$this->redirect('Ppt/change');
		}

	}

	public function change(){
		ini_set('max_execution_time', 600);
		$this->unlogin();
		$userid=(int)session('userid');
		if($userid==0){
			$this->error('用户编号获取失败');
		}
		$data['userid']	=$userid;
		$data['title']	=I('title');
		$data['desc']	=I('desc');
		$data['photo']	=I('photo');
		$data['ppturl']	=I('ppturl');
		$link=explode('/',str_replace(array('.pptx','.ppt'),'',I('ppturl')));
		//   ppt/201701/5877265e1bab2
		$data['pptlink']=$link[0].'/'.$link[1].'/'.$link[2].'/'.$link[2].'.html';
		$data['addtime']=time();
		$data['isdel']=1;
		$db=M('ppt');
		$db->add($data);
				
		echo json_encode(array("success" => true,
			"code" => 200,
			"msg" => "已经在后台开始转换！~",
			"obj" => null,
			"map" => null,
			"list" => null
				)
		);
	}

	public function wxshare(){
		if(IS_POST){
			$where['userid'] = (int)session('userid');
			$where['pptlink'] = I('ppturl');
			$pptlist = M('ppt')->field('title,desc,photo,pptlink')->where($where)->find();
			$data['title'] = htmlspecialchars($pptlist["title"]);       
	        $data['desc'] = htmlspecialchars($pptlist["desc"]);
	        $data['imgsrc'] = $pptlist["photo"];
	        $list = "<script type='text/javascript' src='https://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
	        		<script type='text/javascript' src='//cdn.bootcss.com/jquery/2.2.0/jquery.min.js'></script>
	        		<script type='text/javascript'>
	        			var targetUrl=window.location.href;
					  	$.ajax({
					    	type : 'post',
					    	url : 'http://' + window.location.host + '/index.php?c=Ppt&a=wxshare2',
					    	data : {url:targetUrl},
						    success : function(data){
						        wx.config({
						        	debug: false,
									appId: data.appId,
									timestamp: data.timestamp,
									nonceStr: data.nonceStr,
									signature: data.signature,
									jsApiList: [
										'onMenuShareTimeline',
										'onMenuShareAppMessage'
									]
								});
							},
					               
						});
			  		wx.ready(function (){
			 			var shareData = {
							title:'".$data['title']."',
							desc: '".$data['desc']."',
							link: window.location.href,
							imgUrl: '".$data['imgsrc']."'
					};
						wx.onMenuShareAppMessage(shareData);
						wx.onMenuShareTimeline(shareData);
    				});
    				wx.error(function(res){
    				
    				});
    		</script>";
	        $file = "Uploads".'/'.$pptlist['pptlink'];
	        file_put_contents($file,$list,FILE_APPEND);

	        /*$fb = fopen($file,'a',true);
	        fwrite($fb,$list);
	        fclose($fb);*/
		}else{
			exit;
		}
	}

	public function wxshare2(){
		if(IS_POST){
	    
	        $site_appId = C('site_appId') ? C('site_appId') : C('WX_APPID');
	        $site_appSecret = C('site_appSecret') ? C('site_appSecret') : C('WX_AppSecret');
	
	        if (strpos($_SERVER['SERVER_NAME'], '104') === false) {
	        	//$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== off || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";	      
	        	$url =  str_replace("&amp;","&",I('url'));
        		$confinfo = array();
        		$confinfo['appId'] = $site_appId;
        		$confinfo['url'] = $url;
        		$confinfo['nonceStr'] = createNonceStr();
        		$confinfo['timestamp'] = time();
        		$view = new ViewController();
        		$ACCESS_TOKEN = $view->get_accesstoken($site_appId, $site_appSecret);
        		$confinfo['jsapi_ticket'] = $view->get_jsapi_ticket($ACCESS_TOKEN);
        		$string = "jsapi_ticket=" . $confinfo[jsapi_ticket] . "&noncestr=" . $confinfo[nonceStr] . "&timestamp=" . $confinfo[timestamp] . "&url=" . $confinfo[url];
        		$confinfo['signature'] = sha1(trim($string));
	        }
	        echo json_encode($confinfo);

		}else{
			exit;		
		}
	}
	
	public function change2(){
		ini_set('max_execution_time', 600);
		$this->unlogin();
		$userid=(int)session('userid');
		if($userid==0){
			$this->error('用户编号获取失败');
		}
		$data['userid']	=$userid;
		$data['title']	=I('title');
		$data['desc']	=I('desc');
		$data['photo']	=I('photo');
		$data['ppturl']	=I('ppturl');
		$data['pptlink']=str_replace('.pptx','/index.html',I('ppturl'));
		$data['addtime']=time();
		$db=M('ppt');
		$db->add($data);
		
		$p=explode('/',I('ppturl'));
		$ppt['savepath']=$p[0].'/'.$p[1].'/';
		$ppt['savename']=$p[2];
		
		$input = 'Uploads/'.$ppt['savepath'].$ppt['savename'];
		$input = str_replace('/','\\',$input);
		$output=str_replace('.pptx','.html',$input);

		
		$str='"C:\Program Files (x86)\Common Files\DigitalOfficeProShared\Converter\HTML5Point\SupportFiles\Converter.exe" -input "D:\vxuebao\\'.$input.'" -output "D:\vxuebao\\'.$output.'" -xml "C:\Users\Administrator\Desktop\settings.xml"';

		$s1=str_replace('.pptx','',$input) .'\\'.$ppt['savename'];
		$s2=str_replace('.pptx','.html',$s1);
		$s3=str_replace('.pptx','',$input) .'\index.html';
		$out=popen($str,'r');
		pclose($out);
		@rename($s2,$s3);
		
		echo json_encode(array("success" => true,
			"code" => 200,
			"msg" => "success",
			"obj" => null,
			"map" => null,
			"list" => null
				)
		);
	}
	
	
	public function pptlist(){
		$this->unlogin();
		$userid=(int)session('userid');
		if($userid==0){
			$this->error('用户编号获取失败');
		}
		$db=M('ppt');
		$pageNo=I('pageNo',1,'int');
		$pageSize=I('pageSize',12);
		if($pageNo<=2){
			$pageSize=11;
		}
		$where['userid'] = $userid;
		//$where['is_del'] =0;
		$_ppt_list = $db->where($where)->order('id desc')->page($pageNo, $pageSize)->select();
        $_ppt_count = $db->where($where)->count();
		echo json_encode(array("success" => true,
			"code" => 200,
			"msg" => "success",
			"obj" => null,
			"map" => array('count'=>$_ppt_count,'pageNo'=>$pageNo,'pageSize'=>$pageSize),
			"list" => $_ppt_list
				)
		);
	}
	
	public function pptdel(){
		$this->unlogin();
		$userid=(int)session('userid');
		if($userid==0){
			$this->error('用户编号获取失败');
		}
		$id=I('id',0,'int');
		if($id<=0){
			$this->error('PPT编号获取失败');
		}
		$db=M('ppt');
		$map['userid']=$userid;
		$map['id']=$id;
		$data=$db->where($map)->delete();
		if($data){
			echo json_encode(array("success" => true,
				"code" => 200,
				"msg" => "删除成功",
				"obj" => null,
				"map" => null,
				"list" => null
					)
			);
		}else{
			echo json_encode(array("success" => true,
				"code" => 404,
				"msg" => "删除失败",
				"obj" => null,
				"map" => null,
				"list" => null
					)
			);
		}
	}
	
	public function zip(){
		$this->unlogin();
		$userid=(int)session('userid');
		if($userid==0){
			$this->error('用户编号获取失败');
		}
		$id=I('id',0,'int');
		if($id<=0){
			$this->error('PPT编号获取失败');
		}
		
		$ppt=M('ppt')->where(array('id'=>$id))->find();
		if(!$ppt){
			$this->error('没找到数据');
		}
		$zip= 'Uploads/'.$ppt['pptlink'];
		$zip=str_replace('.html', '.zip', $zip);
		$this->success('<iframe src="' . __ROOT__ . '/' .$zip . '" style="display:none;"></iframe>导出成功,正在下载压缩包...' . $restr, "javascript:window.opener=null;window.open('','_self'); window.close();",3);  
	}

	//原始压缩导出
	public function zip222(){
		$this->unlogin();
		$userid=(int)session('userid');
		if($userid==0){
			$this->error('用户编号获取失败');
		}
		$id=I('id',0,'int');
		if($id<=0){
			$this->error('PPT编号获取失败');
		}
		
		$ppt=M('ppt')->where(array('id'=>$id))->find();
		if(!$ppt){
			$this->error('没找到数据');
		}
		if(!session('adminUser')){
			if($userid!=$ppt['userid']){
				$this->error('您没有导出课件的权限！');
			}
		}
		$p=str_replace('index.html','',$ppt['pptlink']);
		$dest_dir = './Uploads/' .$ppt['id'];
		
		if(file_exists('./Uploads/ppt/' . $ppt['id'] . '.zip')) {
		  $this->success('<iframe src="' . __ROOT__ . '/Uploads/ppt/' . $ppt['id'] . '.zip' . '" style="display:none;"></iframe>导出成功,正在下载压缩包...' . $restr, "javascript:window.opener=null;window.open('','_self'); window.close();",3);  
		  die;
		}

		import('ORG.Util.PclZip');
		$fn='Uploads/ppt/'. $ppt['id'].'.zip';
		
		$f='Uploads/'.$p;
		//echo $f;die;
		$archive = new \PclZip($fn);
		$list = $archive->create($f,PCLZIP_OPT_REMOVE_PATH, $f);
		if ($list==0)
            $this->error('压缩失败');
		$this->success('<iframe src="' . __ROOT__ . '/Uploads/ppt/' . $ppt['id'] . '.zip' . '" style="display:none;"></iframe>导出成功,正在下载压缩包...' . $restr, "javascript:window.opener=null;window.open('','_self'); window.close();",3);
		
		
		
		
	}
	
}
?>
