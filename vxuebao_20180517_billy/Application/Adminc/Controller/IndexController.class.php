<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class IndexController extends BaseController {
    public function index() {
        $h = 23;
        $i = 241 * 1000;
        $s = 509 * 1000000;
        $v = 201 * 1000000000;
        $this->assign('Adminusername', session('adminUser'));
        $this->assign('Adminuserid', session('adminUserid'));
        $cc = CONF_PATH . 'ver.php';
        $dd = include ($cc);
        $dd = $dd['ver'];
        $ee = include ($cc);
        $ee = $ee['release'];
        
        $nn = mysql_get_server_info();
        $nn = empty($nn) ? "未知" : $nn;
        $oo = array(
            '操作系统：' => PHP_OS,
            '服务器IP：' => $_SERVER['SERVER_ADDR'],
            '运行环境：' => $_SERVER["SERVER_SOFTWARE"],
            'PHP运行方式：' => php_sapi_name() ,
            'PHP版本：' => PHP_VERSION,
            'MYSQL版本：' => $nn,
            '程序系统版本' => "_V $dd $ee",
            '上传附件限制：' => ini_get('upload_max_filesize') ,
            '执行时间限制：' => ini_get('max_execution_time') . "秒",
            '剩余空间：' => round((@disk_free_space(".") / (1024 * 1024)) , 2) . 'M',
            'SOCKET支持：' => function_exists('fsockopen') ? '是' : '否',
            'ZLIB' => function_exists('gzclose') ? '是' : '否',
            'SAFE_MODE' => (boolean)ini_get('safe_mode') ? '是' : '否',
            'SAFE_MODE_GID' => (boolean)ini_get('safe_mode_gid') ? '是' : '否',
            'PHP上传附件限制' => get_cfg_var('post_max_size') ,
            '授权版本' => $jj,
        );
        $pp['index'] = 'active';
        $this->assign('ui', $pp);
        $this->assign('server_info', $oo);
        $this->assign('updateinfo', $ll);
        $this->assign('chanageinfo', $mm);
        $this->assign('domain_time', $jj);
        $this->assign('ver', $dd);
        $this->assign('sys_info', $qq);
        $this->display();
    }
} ?>

