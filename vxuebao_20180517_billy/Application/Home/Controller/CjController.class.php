<?php
namespace Home\Controller;
use Think\Controller;
header("Content-Type: text/html;charset=utf-8");

class CjController extends Controller {


	//备注：采集模块有可能因为对方增加的josn字段造成str_replace过滤不完整，使得json_decode的值为null
    public function index() {
		if(!isset($_SESSION['adminUser'])){
			exit();
		}
        $cs = $_GET['cs'];
        $user = M("scene");
		//die(var_dump($cs)); 
        $where['eqcode'] = $cs;
        $code = $user->where($where)->select();
	 	
        $img = './Uploads/syspic/scene/';
        $img2 = './Uploads/';
        $mp3 = './Uploads/syspic/mp3/';
		//0922开始
		
		$url22 = 'http://h5.eqxiu.com/s/'.$_GET['cs'];

		$data22  = $this->GetCurl($url22);
		$result22 = array(); 
		//preg_match_all("/(?:\{)(.*)(?:\})/i",$data22, $result22); 
		preg_match('/<script class=\"eqx-script\"\>(.*)<\/script\>/sU',$data22, $result22); 
		$json22=str_replace('var scene = ','',$result22[1]);
		$json22=trim($json22);
		$json22=rtrim($json22,';');
		$json22=preg_replace('@([\w_0-9]+):@', '"\1":', str_replace('\'', '"', $json22));
        $json22=str_replace('var __isServerRendered = true;','',$json22);
        $json22=trim($json22);
		$arr22=json_decode($json22,true);		//课程简介
		$url = 'http://s1.eqxiu.com/eqs/page/' . $arr22['id'].'?ad=1&time=1449479812051'; 
        $da = $this->GetCurl($url);
		$resp = json_decode($da, true);			//课程数据
		if (empty($code) and $arr22['name'] !== '该场景已关闭') {
		
		$imgarr=array();
		foreach($resp['list'] as $k=>$v){
			foreach($v['elements'] as $k2=>$v2){		//循环elements节点
				if($v2['properties']['src']!=''){
					$imgarr[]=$v2['properties']['src'];
					$vvv=explode('/',$v2['properties']['src']);
					if(count($vvv)>1){
						$v2['properties']['src']=end($vvv);
					}
					$zzz=explode('.',$v2['properties']['src']);
					if(count($zzz)==0){
						$v2['properties']['src']=$v2['properties']['src'].'.png';
					}
					$resp['list'][$k]['elements'][$k2]['properties']['src']='syspic/scene/'.$v2['properties']['src'];
					
				}
				if($v2['properties']['originSrc']!=''){
					$imgarr[]=$v2['properties']['originSrc'];
					$vvv=explode('/',$v2['properties']['originSrc']);
					if(count($vvv)>1){
						$v2['properties']['originSrc']=end($vvv);
					}
					
					$zzz=explode('.',$v2['properties']['originSrc']);
					if(count($zzz)==0){
						$v2['properties']['originSrc']=$v2['properties']['originSrc'].'.png';
					}
					$resp['list'][$k]['elements'][$k2]['properties']['originSrc']='syspic/scene/'.$v2['properties']['originSrc'];
				}
			}
		}
		//便利图片
		$imgss=array_unique($imgarr);
		$imgss=array_values($imgss);
		
		
		foreach($imgss as $k3=>$v3){
			$vvv=explode('/',$v3);
			if(count($vvv)>1){
				$out=$img.end($vvv);
			}else{
				$out=$img.$v3;
			}
			$v3=str_replace('>/strip','',$v3);
			$out=$img.$v3;
			$i = file_get_contents('http://res1.eqh5.com/'.$v3); 
			$zzz=explode('.',$out);
			if(count($zzz)==0){
				$out=$out.'.png';
			}
			file_put_contents($out,$i);

			
		}

		
            $data['scenename_varchar'] = $arr22['name'];
            $data['scenecode_varchar'] = 'S' . (date('y', time()) - 9) . date('m', time()) . randorderno(6, -1);
            $data['eqid_int'] = $arr22['id'];
            $data['eqcode'] = $arr22['code'];
            $data['createtime_time'] = date('Y-m-d H:i:s', time());
            $data['showstatus_int'] = 1;
            $data['movietype_int'] = 0;
			$data['userid_int'] =0;

            $pic1 = 'http://res.eqh5.com/' . $arr22['cover'];
            $data['thumbnail_varchar'] = 'syspic/scene/' . $this->save_pic($pic1, $img);
            
			$data['is_tpl'] = 1;
            $data['desc_varchar'] = $arr22['description'];
            $data['biztype_int'] = $arr22['biztype']? intval($arr22['biztype']):0;
            $data['musictype_int'] = 3;
            //$data['musictype_int'] = (empty($resp['obj']['bgAudio']['type'])) ? 'null' : $data['musictype_int'];
			
			//2015-5-25
			$data['scenetype_int']= $_GET['scenetypeB'] ? intval($_GET['scenetypeB']) :'101';
			$data['tagid_int']= $_GET['scenetypeS'] ? intval($_GET['scenetypeS']) :'20';			
			
			//\Think\Log::write('$_GET ：'. D('')->getLastSql()."\n".var_export($_GET,true)."\n\n -----------\n");
			//if(C('ISLOG'))\Think\Log::write('78$data'.var_export($data,true)); 
			
            if ($lastInsId = $user->add($data)) {
			//if(C('ISLOG')) \Think\Log::write('scene 表'. D('')->getLastSql()."\n".var_export($data,true)."\n\n -----------\n");
				//2015-5-25
				if($data['musicurl_varchar']&& $_GET['isMusicToSys']){
					$fileData=array(
						'userid_int'=>0,
						'filetype_int'=>2,
						'filesrc_varchar'=>$data['musicurl_varchar'],
						'create_time'=>date('y-m-d H:i:s',time()),
						'biztype_int'=>1,
						'filename_varchar'=>'模板采集ID为'.$lastInsId.'的音乐',
						'ext_varchar'=>'MP3'
						
						);
					M('upfilesys')->add($fileData);	
						
					//\Think\Log::write('upfilesys 表'. D('')->getLastSql()."\n".var_export($fileData,true));
					
				}
				
                echo json_encode(array(
                    "msg" => "成功采集",
                    "url" => 'http://' . $_SERVER['HTTP_HOST'] . '/v-' . $data['scenecode_varchar']
                ));
            } else {
			die(var_dump("数据写入错误"));
                echo json_encode(array(
                    "msg" => "数据写入错误"
                ));
            }
            $dd = M("scenepage");
            $de['sceneid_bigint'] = $lastInsId;
            $de['scenecode_varchar'] = $arr22['code'];
            $de['createtime_time'] = date('Y-m-d H:i:s', time());
            $de['content_text'] = '';
            $de['pagename_varchar'] = 'admin';
			$de['userid_int'] =0;   
            $de['properties_text'] = 'null';
			//die('000');
            foreach ($resp['list'] as $k => $var) {
                $de['content_text'] = json_encode($var['elements']);
                $de['pagecurrentnum_int'] = $k + 1;
                $dd->add($de);
            }
        } elseif (isset($_GET['cpic'])) {
            $dd = M("scenepage");
            $where['sceneid_bigint'] = $_GET['id'];
            $data = $dd->where($where)->field('content_text')->select();
        } else {
            if (!empty($code[0][scenecode_varchar])) {
                echo json_encode(array(
                    "msg" => "已经存在",
                    "url" => 'http://' . $_SERVER['HTTP_HOST'] . '/v-' . $code[0][scenecode_varchar]
                ));
            } else {
                echo json_encode(array(
                    "msg" => "参数不对"
                ));
            }
        }
    }
    public function searchMultiArray(array $array, $search, $mode = 'key') {
        $res = array();
        foreach (new RecursiveIteratorIterator(new RecursiveArrayIterator($array)) as $key => $value) {
            if ($search === $ {
                $ {
                    "mode"
                }
            }) {
                if ($mode == 'key') {
                    $res[] = $value;
                } else {
                    $res[] = $key;
                }
            }
        }
        return $res;
    }
    public function my_file_exists($file) {
        if (preg_match('/^http:\/\//', $file)) {
            if (ini_get('allow_url_fopen')) {
                if (@fopen($file, 'r')) return true;
            } else {
                $parseurl = parse_url($file);
                $host = $parseurl['host'];
                $path = $parseurl['path'];
                $fp = fsockopen($host, 80, $errno, $errstr, 10);
                if (!$fp) return false;
                fputs($fp, "GET {$path} HTTP/1.1 \r\nhost:{$host}\r\n\r\n");
                if (preg_match('/HTTP\/1.1 200/', fgets($fp, 1024))) return true;
            }
            return false;
        }
        return file_exists($file);
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
				return $filename;
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
} ?>
