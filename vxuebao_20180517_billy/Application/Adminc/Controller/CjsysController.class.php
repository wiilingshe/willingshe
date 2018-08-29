<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
header("Content-Type: text/html;charset=utf-8");
class CjsysController extends BaseController
{
    public function index()
    {
		
		$ui['yxcj'] = 'active';
        $this->assign('ui',$ui);  
        $this -> display();
    } 

    public function yxcj()
    {
        $files = M('upfilesys');
        $cookie = tempnam('./cache', 'cookie');
        $img = './Uploads/syspic/yx/';
        $img2 = 'syspic/yx/';
        login_post($cookie);
        $url2 = 'http://service.eqxiu.com/m/base/file/sysList?pageNo=1&pageSize=100&fileType=4&bizType=1&time=1435230963297';
        $list = get_content($url2, $cookie);
        $list = json_decode($list, true);
        @ unlink($cookie);
        $i = 0;
        foreach ($list['list'] as $key => $data)
        {
            $i++;
            $file['filetype_int'] = $data['fileType'];
            $file['biztype_int'] = $data['bizType'];
            $file['create_time'] = date('Y-m-d H:i:s', time());
            $file['userid_int'] = 0; 
            $file['filename_varchar'] = $data['name'];
            $file['ext_varchar'] = $data['extName']; 
            $where['filename_varchar']=$data['name'];
            $temp = $files -> where($where) -> find();
            if(empty($temp)){
				$file['filesrc_varchar'] = $img2 . $this->save_pic('http://res.eqxiu.com/' . $data['path'], $img);
            }

            //$this->ajaxReturn($i);
            //  print_r($file);exit;

            if(empty($temp)){
                $files -> add($file); 
            }
            
        } 
         $this->success('本次增加' . $i . '个系统音效');
       
        
       
    } 
    public function sccj()
    {
        $files = M('upfilesys');
        $img = './Uploads/syspic/picnew/';
        $img2 = 'syspic/picnew/';
        $pageno = I('post.pageno', 1);
        $biztype = I('post.biztype');
        $tagid = I('post.tagid');
        $pagesize = I('post.pagesize', 18);
        $filetype = I('post.filetype', 1);
        $cookie = tempnam('./cache', 'cookie');
        $url2 = 'http://service.eqxiu.com/m/base/file/sysList?pageNo=' . $pageno . '&pageSize=' . $pagesize . '&fileType=' . $filetype . '&bizType=' . $biztype . '&tagId=' . $tagid . '&time=' . time();
        login_post($cookie);
        $list = get_content($url2, $cookie);
        $list = json_decode($list, true);
        $i = 0;
        foreach ($list['list'] as $var)
        {
            $i++;
            $pic = $files -> field('eqsrcthumb_varchar') -> where(array('eqsrcthumb_varchar' => $var['path'])) -> find();
            $data['userid_int'] = 0;
            $data['filename_varchar'] = $var['name'];
            $data['ext_varchar'] = $var['extName'];
            $data['filetype_int'] = $filetype;
            $data['biztype_int'] = $biztype;
            $data['tagid_int'] = $tagid;
            if (empty($pic))
            {
                $data['filesrc_varchar'] = $img2 . $this->save_pic('http://res.eqxiu.com/' . $var['path'], $img);
                $data['filethumbsrc_varchar'] = $img2 . $this->save_pic('http://res.eqxiu.com/' . $var['tmbPath'], $img);
            } 
            $data['eqsrcthumb_varchar'] = $var['path'];
            $data['create_time'] = date('Y-m-d H:i:s', time());
            if (empty($pic))
            {
                $files -> add($data);
            } 
        } 
        echo '本次更新' . $i . '个';
        @ unlink($cookie);
    } 

	public function cjtag(){
		$i = 0;
		$cookie = tempnam('./cache', 'cookie'); 
		login_post($cookie); 
		$url = 'http://service.eqxiu.com//m/scene/tag/sys/list?type=1';
		$list = get_content($url, $cookie);
		//die($list);
		$list = json_decode($list,true);
		foreach($list['list'] as $var){
			$data['tagid_int'] = $var['id'];
			$data['userid_int'] = 0;
			$data['name_varchar'] = $var['name'];
			$data['biztype_int'] = $var['bizType'];
			$data['type_int'] = $var['type'];
			$data['create_time'] = date('Y-m-d H:i:s', time());
			$tag = M('tag');
			$where['tagid_int'] = $var['id'];
			$temp = $tag -> cache(true) ->where($where) -> find();
            if (empty($temp) && $data['biztype_int'] > 11000)
            {
				$i++;
                $tag -> add($data);
            } 
		}
		//echo '系统分类总更新<b>' . $i . '</b>个'; 
	}
	
    public function cjsys(){
		//$this->cjtag();
        $_post = I('post.');
        $scenepagesys = M('scenepagesys');
        $img = './Uploads/syspic/page/';
        $img2 = 'syspic/page/';
        $src2 = 'syspic/page/';
        // 设置cookie保存路径
        $cookie = tempnam('./cache', 'cookie'); 
		login_post($cookie);
        $url2 = 'http://service.eqxiu.com/m/scene/tpl/page/list/';
		$tagid = 1140;
		$i = 0;
		for($n = 0;$n <= 26;$n++){
			$post = array ('tagId' => $tagid + $n,
				'pageNo' => '1',
				'pageSize' => '100'
			);
			$list = $this->PostCurl($url2,$post,$cookie);
			$list = json_decode($list, true);
			S('_list', null);
			S('_list', $list);
			$list = S('_list');
			foreach ($list['list'] as $var)
			{
				//echo '当前循环第：<b>' . $i . $var['id'] . $var['name'] . '</b>次';
				$urls = 'http://service.eqxiu.com/m/scene/pageTpl/' . $var['id'];
				$content = get_content($urls, $cookie);
				preg_match_all("/((group\d\/\w+\/\w+\/\w+\/\w+(-\\w+)*+.(gif|jpg|jpeg|png|bmp|svg)))/isu", $content , $array);
				$src3 = preg_replace("/(group\d\/\w+\/\w+\/\w+\/)/", $src2, $content);
				foreach ($array[0] as $key => $_var)
				{
					$this->save_pic('http://res.eqxiu.com/' . $_var, $img);
				} 
				$content = json_decode($src3, true);
				$data['sceneid_bigint'] = $var['sceneId'];
				$data['pagename_varchar'] = $var['name'];
				$data['thumbsrc_varchar'] = $img2 . $this->save_pic('http://res.eqxiu.com/' . $var['properties']['thumbSrc'], $img);
				$data['tagid_int'] = $tagid + $n;
				$data['eqsrc_varchar'] = $var['properties']['thumbSrc'];
				$data['biztype_int'] = $var['sceneId'];
				$data['pagecurrentnum_int'] = $var['num'];
				$data['eqid_int'] = $var['id'];
				$data['userid_int'] = 0;
				$data['createtime_time'] = date('Y-m-d H:i:s', time());
				$data['content_text'] = json_encode($content['obj']['elements']);
				$where['eqid_int'] = $var['id'];
				$temp = $scenepagesys ->where($where) -> find();
				if (empty($temp)){
					$i++; 
					$scenepagesys -> add($data);
				}else{
					$result = strstr($temp['tagid_int'], $data['tagid_int']);
					if(!$result){
						$savetemp = M("scenepagesys"); 
						$data2['tagid_int'] = $temp['tagid_int'].','.$data['tagid_int'];
						$savetemp->where('pageid_bigint='.$temp['pageid_bigint'])->save($data2);
					}
				}
			} 
		}
		
		
        echo '系统组件总更新<b>' . $i . '</b>个'; 
        @ unlink($cookie); 
    }
	
	public function save_pic($url, $savepath = '') {
			$filename = $this->get_filename($url);
			if(file_exists($savepath.$filename)){
				 
				return $filename;
			}
			$url = trim($url);
			$url = str_replace(" ", "%20", $url);
			$string = $this->read_filetext($url);
			if (empty($string)) {
				\Think\Log::write("-------------------------------\n".'读取不了文件,地址：'.$url."\n"); 
				// echo '读取不了文件';
				return;
			}			
			$this->make_dir($savepath);
			$filepath = $savepath . $filename;
			$this->write_filetext($filepath, $string);
			return $filename;
		}
    public function save_picY($url, $savepath = '') {
        $url = trim($url);
        $url = str_replace(" ", "%20", $url);
        $string = $this->read_filetext($url);
        if (empty($string)) {
				echo '读取不了文件'.$url;
            exit;
        }
        $filename = $this->get_filename($url);
        $this->make_dir($savepath);
        $filepath = $savepath . $filename;
        $this->write_filetext($filepath, $string);
        return $filename;
    }
    public function get_filename($filepath) {
        $fr = explode("/", $filepath);
        $count = count($fr) - 1;
        return $fr[$count];
    }
    public function read_filetext($filepath) {
        $filepath = trim($filepath);
        $htmlfp = @fopen($filepath, "r");
        if (strstr($filepath, "://")) {
            while ($data = @fread($htmlfp, 500000)) {
                $string.= $data;
            }
        } else {
            $string = @fread($htmlfp, @filesize($filepath));
        }
        @fclose($htmlfp);
        return $string;
    }
    public function write_filetext($filepath, $string) {
        $fp = @fopen($filepath, "w");
        @fputs($fp, $string);
        @fclose($fp);
    }
    public function make_dir($path) {
        if (!file_exists($path)) {
            $mk = @mkdir($path, 0777, true);
            @chmod($path, 0777);
        }
        return true;
    }
    public function GetCurl($url) {
        $curl = curl_init();
		curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
        $resp = curl_exec($curl);
        curl_close($curl);
        return $resp;
    }
	function PostCurl($url,$post,$cookie) { 
		$curl = curl_init();//初始化curl模块 
		curl_setopt($curl, CURLOPT_URL, $url);//提交的地址 
		curl_setopt($curl, CURLOPT_HEADER, 0);//是否显示头信息 
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//是否自动显示返回的信息 
		curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie); //读取cookie 
		curl_setopt($curl, CURLOPT_POST, 1);//post方式提交 
		curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($post));//要提交的信息 
		curl_setopt($curl,CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36"); 
		$resp = curl_exec($curl);//执行cURL 
		curl_close($curl);//关闭cURL资源，并且释放系统资源 
		return $resp;
	} 
} 
