<?php

namespace Home\Controller;

use Think\Controller;

class EmptyController extends Controller {
    
    // public function _empty(){
    //     if ($_SERVER['HTTP_HOST'] != 'www.vxuebao.com' && substr($_SERVER['REQUEST_URI'], 1, 7) == 'Uploads') {
    //         send_http_status(301);
    //         redirect('http://www.vxuebao.com' . $_SERVER['REQUEST_URI']);
    //     }else{
    //         send_http_status(404);
    //         $this->error('File Not Found');
    //     }
    // }

}
