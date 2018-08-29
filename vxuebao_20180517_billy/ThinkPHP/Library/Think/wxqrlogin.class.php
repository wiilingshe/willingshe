<?php

namespace Think;

Class wxqrlogin {
    public $appid;
    public $appsecret;
    public $code;
    
    public function __construct($appid,$appsecret,$code){
        $this->code = $code;
        $this->appid = $appid;
        $this->appsecret = $appsecret;
    }
    
    public function access_token_act(){
        $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$this->appid&secret=$this->appsecret&code=$this->code&grant_type=authorization_code";        
        $str = $this->visit_url($url);//访问url获得返回值
        $arr = json_decode($str,1);
        return $arr;
    }
    
    public function get_token($arr){
        return $arr['access_token'];
    }
    
    public function get_openid($arr){
        return $arr['openid'];
    }
    
    public function user_info($backarr){        
        $url = "https://api.weixin.qq.com/sns/userinfo?access_token=".$backarr['access_token']."&openid=".$backarr['openid'];
        $str = $this->visit_url($url);//访问url获得返回值
        $arr = json_decode($str,1);
        return $arr;
    }
    
    public function visit_url($url){
        static $cache = 0;
        //判断是否之前已经做过验证
        if($cache === 1){
            $str = $this->curl($url);
        }elseif($cache === 2){
            $str = $this->openssl($url);
        }else{
            //是否可以使用cURL
            if(function_exists('curl_init')){
                $str = $this->curl($url);
                $cache = 1;
                //是否可以使用openssl
            }elseif(function_exists('openssl_open') && ini_get("allow_fopen_url")=="1"){
                $str = $this->openssl($url);
                $cache = 2;
            }else{
                die('请开启php配置中的php_curl或php_openssl');
            }
        }
        return $str;
    }
    
    /**
     * 通过curl取得页面返回值
     * 需要打开配置中的php_curl
     * */
    private function curl($url){
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,TRUE);//允许请求的内容以文件流的形式返回
        curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);//禁用https
        curl_setopt($ch,CURLOPT_URL,$url);//设置请求的url地址
        $str = curl_exec($ch);//执行发送
        curl_close($ch);
        return $str;
    }
    /**
     * 通过file_get_contents取得页面返回值
     * 需要打开配置中的allow_fopen_url和php_openssl
     * */
    private function openssl($url){
        $str = file_get_contents($url);//取得页面内容
        return $str;
    }
}