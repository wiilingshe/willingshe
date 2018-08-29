<?php
namespace Home\Controller;
use Think\Controller;

class Text2audioController extends Controller{
	
	public function tk(){
		$url = "http://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=".C('audioapikey')."&client_secret=".C('audiosecretkey');
		$str=file_get_contents($url);
		$output = json_decode($str,true);
		return $output['access_token'];

	}
	
	public function gettoken(){
		$str=$this->tk();
		echo $str; 
	}


	public function getaudio(){
		header("Content-Type:audio/mp3");
		$text=urlencode(urlencode(I('text')));
		$spd=I('spd',5,'int');
		$pit=I('pit',5,'int');
		$vol=I('vol',9,'int');
		$per=I('per',0,'int');

		$token=$this->tk();
		$url="http://tsn.baidu.com/text2audio?tex=".$text."&lan=zh&cuid=".session_id()."&ctp=1&tok=".$token."&spd=".$spd."&pit=".$pit."&vol=".$vol."&per=".$per;
		$mp3=file_get_contents($url);
		echo $mp3;
	}
	
	public function bacurl(){
		$text=urlencode(urlencode(I('text')));
		$spd=I('spd',5,'int');
		$pit=I('pit',5,'int');
		$vol=I('vol',9,'int');
		$per=I('per',0,'int');
		//dump(get);

		$token=$this->tk();
		$url="http://tsn.baidu.com/text2audio?tex=".$text."&lan=zh&cuid=".session_id()."&ctp=1&tok=".$token."&spd=".$spd."&pit=".$pit."&vol=".$vol."&per=".$per;
		$file='syspic/mp3/'.date("mdHis") .rand(1111, 9999).'.mp3';
		$file2='mp3/'.date("mdHis") .rand(1111, 9999).'.mp3';
		file_put_contents('Uploads/'.$file,file_get_contents($url));
		//sleep(1);
		exec('"C:/Program Files (x86)/FormatFactory/FormatFactory.exe" "-> MP3" "High quality" "D:/vxuebao/Uploads/'.$file.'" "D:/vxuebao/Uploads/'.$file2.'"');
		$arr['url']=$file2;
		$arr['spd']=$spd;
		$arr['pit']=$pit;
		$arr['vol']=$vol;
		$arr['per']=$per;
		echo json_encode($arr);
	}

	public function downaudio(){
		header( "Content-type:  application/octet-stream"); 
		$filename=date('YmdHis') . rand(1111,9999);
		header( "Content-Disposition:  attachment;  filename= {$filename}.mp3");
		$text=urlencode(urlencode(I('text')));
		$spd=I('spd',5,'int');
		$pit=I('pit',5,'int');
		$vol=I('vol',9,'int');
		$per=I('per',0,'int');

		$token=$this->tk();
		$url="http://tsn.baidu.com/text2audio?tex=".$text."&lan=zh&cuid=".session_id()."&ctp=1&tok=".$token."&spd=".$spd."&pit=".$pit."&vol=".$vol."&per=".$per;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);    // 要求结果为字符串且输出到屏幕上
		curl_setopt($ch, CURLOPT_HEADER, 0); // 不要http header 加快效率
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
		curl_setopt($ch, CURLOPT_TIMEOUT, 1000);
		$output = curl_exec($ch);
		curl_close($ch);
	}

}


?>