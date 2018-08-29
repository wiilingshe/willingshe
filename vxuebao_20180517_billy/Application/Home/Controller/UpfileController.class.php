<?php
namespace Home\Controller;
use Think\Controller;
class UpfileController extends Controller {
	
	//测试上传
	public function index(){
		$this->display();
	}
	
	
	public function upload(){
		set_time_limit(0);
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$userid=(int)$userid;
		if($userid==0){
			header('Content-type: text/json');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
		$upload = new \Think\Upload();// 实例化上传类
		if(I('get.fileType',0)==2 || I('get.fileType',0)==4)
		{
			$upload->maxSize = 10*1024*1024 ;// 设置附件上传大小
			$upload->exts = array('mp3');// 设置附件上传类型
			$upload->savePath = 'mp3/'.$userid.'/'; // 设置附件上传（子）目录
		}elseif(I('get.fileType',0)==5){
			$upload->maxSize = 20*1024*1024 ;// 设置附件上传大小
			$upload->exts = array('mp4');// 设置附件上传类型
			$upload->savePath = 'mov/'.$userid.'/'; // 设置附件上传（子）目录
		}
		else
		{
			$upload->maxSize = 5*1024*1024 ;// 设置附件上传大小
			$upload->exts = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
			$upload->savePath = 'pic/'.$userid.'/'; // 设置附件上传（子）目录
		}
		$upload->rootPath = './Uploads/'; // 设置附件上传根目录
		$upload->subName  = array('date','Ym');
		// 采用时间戳命名
		$upload->saveName = 'uniqid';
		// 采用GUID序列命名
		//$upload->saveName = 'guid'; 
		// 上传文件
		$info = $upload->upload();
        //print_r($info);die;
		if(!$info) {// 上传错误提示错误信息
			header('Content-type: text/json');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => $upload->getError(),"obj"=> null,"map"=> null,"list"=> null));
			die;
			//echo $this->error($upload->getError());
			exit;
			//$this->error($upload->getError());
		}else{// 上传成功 获取上传文件信息
			header('Content-type: text/json');
			header('HTTP/1.1 200 ok');
			foreach($info as $file){
				$thubimagenew = $file['savepath'].$file['savename'];
				if(I('get.fileType',0)!=2 &&  I('get.fileType',0)!=4 &&  I('get.fileType',0)!=5)
				{
					$image = new \Think\Image(); 
					$thubimage = $file['savepath'].$file['savename'];
					$image->open($upload->rootPath.$thubimage);
					$thubimagenew = str_replace(".".$file['ext'],"_thumb.".$file['ext'],$file['savename']);
					$thubimagenewftp =$thubimagenew;
					$thubimagenew =  $file['savepath'].$thubimagenew;
					// 按照原图的比例生成一个最大为150*150的缩略图并保存为thumb.jpg
					if(I('get.fileType',0)==0)
					{
						$image->thumb(150, 126)->save($upload->rootPath.$thubimagenew);
					}
					else
					{
						$image->thumb(150, 80)->save($upload->rootPath.$thubimagenew);
					}
				}
				
				if(I('get.fileType',0)==5){
					$thubimagenew=str_replace('mp4','jpg',$file['savepath'].$file['savename']);
					$target_file        = 'Uploads/'.$file['savepath'].$file['savename'];
					$target_img_file    = 'Uploads/'.$thubimagenew;
					//echo "ffmpeg -ss 00:00:08 -i {$target_file} -f image2 -y {$target_img_file}";die;
					exec("ffmpeg -ss 00:00:08 -i {$target_file} -f image2 -y {$target_img_file}");
				}
				if(I('get.fileType',0)==2 || I('get.fileType',0)==4){
					$file1='Uploads/'.$file['savepath'].$file['savename'];
					$file['savepath']='mp3/';
					$file['savename']=date("mdHis").rand(1111, 9999).'.mp3';
					$file2='Uploads/'.$file['savepath'].$file['savename'];
					//echo $file1.'----'.$file2;die;
					exec('"C:/Program Files (x86)/FormatFactory/FormatFactory.exe" "-> MP3" "High quality" "D:/vxuebao/'.$file1.'" "D:/vxuebao/'.$file2.'"');
				}
				
				$sizeint = intval($file['size']/1024);

				$model = M('upfile');
				// 取得成功上传的文件信息
				// 保存当前数据对象

				$data['ext_varchar'] = strtoupper($file['ext']);
				$data['filename_varchar'] = $file['name'];
				$data['filetype_int'] = I('get.fileType',0);
				$data['biztype_int'] = I('get.bizType',0);
                $data['tagid_int'] = I('get.tagId',0);
				$data['userid_int'] = $userid;
				$data['filesrc_varchar'] = $file['savepath'].$file['savename'];
				$data['sizekb_int'] = $sizeint;
				$data['filethumbsrc_varchar'] = $thubimagenew;
				$data['create_time'] = date('y-m-d H:i:s',time());
				$info_=$model->add($data);
                 $jsonstr=array(
                    "success"=>true,
                    "code"=>200,
                    "msg"=>"操作成功",
                    "obj"=>array(
                    "id"=>$info_,
                    "name"=>$file['savename'],
                    "extName"=>strtoupper($file['ext']),
                    "fileType"=>1,
                    "bizType"=>0,
                    "path"=>$file['savepath'].$file['savename'],
                    "tmbPath"=>$thubimagenew,
                    "sort"=>0,
                    "size"=>$sizeint,
                    "status"=>1,
                    "delTime"=>null
                    ),
                    "map"=>null,
                    "list"=>null
                );
				echo json_encode($jsonstr);
			}
		}
    }
	public function savewl(){
				
				$file =array();
				$file['savename'] = basename(I('get.url'));
				$url = I('get.url');
				$sizeint = '1.00';
				$jsonstr = '{"success":true,"code":200,"msg":"success","obj":{"id":9386090,"name":"'.$file['savename'].'","extName":"MP3","fileType":0,"bizType":0,"path":"'.$url.'","tmbPath":"'.$url.'","createTime":1426209412922,"createUser":"'.session("userid").'","sort":0,"size":'.$sizeint.',"status":1},"map":null,"list":null}';
				

				
				$model = M('upfile');
				// 取得成功上传的文件信息
				// 保存当前数据对象

				$data['ext_varchar'] = 'MP3';
				$data['filename_varchar'] = $file['savename'];
				$data['filetype_int'] = I('get.fileType',0);
				$data['biztype_int'] = 0;
				$data['userid_int'] = session("userid");
				$data['filesrc_varchar'] = $url;
				$data['sizekb_int'] = $sizeint;
				$data['filethumbsrc_varchar'] = $url;
				$data['create_time'] = date('y-m-d H:i:s',time());
				$model->add($data);
				echo $jsonstr;
	}

	function curl_post($url, $post) {  
		$options = array(  
			CURLOPT_RETURNTRANSFER => true,  
			CURLOPT_HEADER         => false,  
			CURLOPT_POST           => true,  
			CURLOPT_POSTFIELDS     => $post,  
		);  
	  
		$ch = curl_init($url);  
		curl_setopt_array($ch, $options);  
		$result = curl_exec($ch);  
		curl_close($ch);  
		return $result;  
	}  
	  

	public function userlist(){
		if(intval(session("userid"))==0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 error');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
		
		header('Content-type: text/json');
		$m_upfile = M('upfile');
		$where['userid_int']  = session("userid");
		if(session('type_id')==21){	//子帐号
			$fid=M('company')->where(array('id'=>session('companyid')))->getField('userid_int');

			$where['userid_int']  = array('in',session("userid").','.$fid);
		}else{
			$where['userid_int']  = session("userid");
		}
		$where['biztype_int']  = I('get.bizType',0);
		$where['filetype_int']  = I('get.fileType',0);
		if(I('get.tagId',0)>0)
		{
			$where['tagid_int']  = I('get.tagId',0);
		}
		$where['delete_int']  = 0;
		$pageshowsize = I('get.pageSize',17);
		if($pageshowsize>30){
			$pageshowsize = 30;
		}
		$m_upfilelist=$m_upfile->where($where)->order('fileid_bigint desc')->page(I('get.pageNo',1),$pageshowsize)->select();
		$m_upfile_count = $m_upfile->where($where) ->count();
		//var_dump($_scene_list);exit;     
		//$this->display();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":{"count":'.$m_upfile_count.',"pageNo":'.I('get.pageNo',1).',"pageSize":'.$pageshowsize.'},"list":[';
		$jsonstrtemp = '';
		foreach($m_upfilelist as $vo)
        {
			$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["fileid_bigint"].',"name":'.json_encode($vo["filename_varchar"]).',"extName":"'.$vo["ext_varchar"].'","fileType":'.$vo["filetype_int"].',"bizType":'.$vo["biztype_int"].',"path":"'.$vo["filesrc_varchar"].'","tmbPath":"'.$vo["filethumbsrc_varchar"].'","createTime":1426209633000,"createUser":"'.$vo["userid_int"].'","sort":0,"size":'.$vo["sizekb_int"].',"status":1},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
		$jsonstr = $jsonstr.']}';
		
		echo $jsonstr; 
		
	}


	public function syslist(){
		if(intval(session("userid"))==0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 error');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
		
		//header('Content-type: text/json');
		$m_upfile = M('upfilesys');
		 //音效 3.6版 
//		if(I('get.fileType',0)==4){  
//			$where['filetype_int']  = 2;
//			$where['biztype_int']  = 4;
//		}else{
			$where['filetype_int']  = I('get.fileType',0);
			if(I('get.key')){
			$where['filename_varchar']=array('like','%'.I('get.key').'%');
			}
			if(I('get.bizType',0)>1){
				$where['biztype_int']  = I('get.bizType',0);
			}
		//}
		if(I('get.tagId',0)>0){
			$where['tagid_int']  = I('get.tagId',0);
		}
		
		$pageshowsize = I('get.pageSize',17);
		if($pageshowsize>40){
			$pageshowsize = 40;
		}
		$m_upfilelist=$m_upfile->where($where)->order('fileid_bigint DESC')->page(I('get.pageNo',1),$pageshowsize)->select();
			 
		 
		$m_upfile_count = $m_upfile->where($where) ->count();
		//var_dump($_scene_list);exit;     
		//$this->display();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":{"count":'.$m_upfile_count.',"pageNo":'.I('get.pageNo',1).',"pageSize":'.$pageshowsize.'},"list":[';
		$jsonstrtemp = '';
		foreach($m_upfilelist as $vo)
        {
			$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["fileid_bigint"].',"name":'.json_encode($vo["filename_varchar"]).',"extName":"'.$vo["ext_varchar"].'","fileType":'.$vo["filetype_int"].',"bizType":'.$vo["biztype_int"].',"path":"'.$vo["filesrc_varchar"].'","tmbPath":"'.$vo["filethumbsrc_varchar"].'","createTime":1426209633000,"createUser":"'.$vo["userid_int"].'","sort":0,"size":'.$vo["sizekb_int"].',"status":1},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
		$jsonstr = $jsonstr.']}';
		
		echo $jsonstr; 
		//$this->display();
		
	}

	 
	public function systag(){
		
		//header('Content-type: text/json');
		$m_upfile = M('tag');
		$where['userid_int']  = 0;
		if(I('get.type',0)==1){
			$where['type_int']=1;
		}
		if(I('get.type',0)==2){
			$where['type_int']=2;
		}
		if(I('get.type',0)==88){
			$where['type_int']=88;
		}
        if(I('get.bizType',0)!=''){
			 
		  $where['biztype_int']  = I('get.bizType',0);
        }
		$pageshowsize = 30;
		$m_upfilelist=$m_upfile->where($where)->order('groupid_int asc,sort asc, tagid_int asc')->select();
		
		 
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
		$jsonstrtemp = '';
		foreach($m_upfilelist as $vo)
		{ $vo["biztype_int"]=$vo["biztype_int"]?intval($vo["biztype_int"]):0;
			$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["tagid_int"].',"name":'.json_encode($vo["name_varchar"]).',"createUser":"0","createTime":1423122412000,"bizType":'.$vo["biztype_int"].',"groupId":'.$vo["groupid_int"].'},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
		$jsonstr = $jsonstr.']}';
		
		echo $jsonstr; 
		
	}
	
	public function getfiletype(){
		header('content-type:application/json;charset=utf8'); 
		$db = M('cate');
		$where['type']  = I("filetype");
		if(!$where['type']){
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "参数有误!","obj"=> null,"map"=> null,"list"=> null));
		}
		
		$data=$db->field('id,title as name,value,type')->where($where)->order('sort asc')->select();
		echo json_encode($data);
		
		die;
		//$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
//		$jsonstrtemp = '';
//		foreach($data as $vo)
//		{ $jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["id"].',"title":'.json_encode($vo["title"]).',"value":"'.$vo["value"].'","type":"'.$vo["type"].'"},';
//		}
//		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
//		$jsonstr = $jsonstr.']}';
//		
//		echo $jsonstr; 
	
	}
 
	public function systpltag(){
		if(intval(session("userid"))==0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 error');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
		
		//header('Content-type: text/json');
		$m_upfile = M('tag');
		$where['userid_int']  = 0;
		$where['type_int']  = 88;
		$where['biztype_int']  = I('get.bizType',0);
		$pageshowsize = 30;
		$m_upfilelist=$m_upfile->where($where)->order('tagid_int asc')->select();
		//var_dump($_scene_list);exit;     
		//$this->display();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
		$jsonstrtemp = '';
		foreach($m_upfilelist as $vo)
        {
			$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["tagid_int"].',"name":'.json_encode($vo["name_varchar"]).',"createUser":"0","createTime":1423122412000,"bizType":'.$vo["biztype_int"].'},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
		$jsonstr = $jsonstr.']}';
		
		echo $jsonstr; 
		
	}


    public function delete(){
		$m_file = M("upfile");
		$map['fileid_bigint']= I('post.id',0);
		if(intval(session('userid'))!=1)
		{
			$map['userid_int']  = intval(session('userid'));
		}
		//$fileinfo=$m_file->where($map)->select();
		$fileinfo=$m_file->where("`fileid_bigint` in ( ".I('id').")" )->select();
		if($fileinfo)
		{
			
			try {
				$fullpath="./Uploads/".$fileinfo[0]["filethumbsrc_varchar"];
				//unlink($fullpath);	//不删除文件
			} catch (Exception $e) {}
			try {
				$fullpath="./Uploads/".$fileinfo[0]["filesrc_varchar"];
				unlink($fullpath);
			} catch (Exception $e) {   

				$datainfo['delete_int'] = 1;
				$m_file->data($datainfo)->where($map)->save();

				//$m_file->where($map)->delete();
				echo json_encode(array("success" => false,
						"code"=> 404,
						"msg" => "delerror",
						"obj"=> null,
						"map"=> null,
						"list"=> null
					   )
				);
				exit();   
			}   
			//$m_file->where($map)->delete();
			$m_file->where("`fileid_bigint` in ( ".I('id').")" )->delete();
			echo json_encode(array("success" => true,
									"code"=> 200,
									"msg" => "success",
									"obj"=> null,
									"map"=> null,
									"list"=> null
								   )
							);
		}


    }
	
}