<?php
namespace Home\Controller;
use Think\Controller;
 
class QrcodeController extends Controller {
   
	public function index(){
		ob_clean(); 
		header('Content-type: image/png');
		vendor("phpqrcode.phpqrcode");
		$code=I('code','');
		// 纠错级别：L、M、Q、H
        $level = 'H';
        // 点的大小：1到10,用于手机端4就可以了
        $size = 8;
        // 下面注释了把二维码图片保存到本地的代码,如果要保存图片,用$fileName替换第二个参数false
        $path = "Uploads/Qrcode/";
        // 生成的文件名
        $fileName = $path.$code.'.png';
        $QRcode = new \QRcode();
		$QRcode->png('http://www.vxuebao.com/v-'.$code,false,$level,$size);
	}
}
?>
