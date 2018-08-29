<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<div id="login_container"></div>
<script type="text/javascript">
    var obj = new WxLogin({
      id:"login_container", 
      appid: "wxd91695a820bd4a1c", 
      scope: "snsapi_base", 
      redirect_uri: "http://www.vxuebao.com/password.html",
      state: "12344"
    });
</script>

<?php

$appid='wxd91695a820bd4a1c';
$appsecret='9339db598b05bf8c8aebfef0edaa52cf';


$baseUrl = urlencode("http://www.vxuebao.com/password.html");
$url ="https://open.weixin.qq.com/connect/oauth2/authorize?appid={$appid}&redirect_uri={$baseUrl}&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
                


//header("Location:".$url);
















function https_request($url, $data = null){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    if (!empty($data)){
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($curl);
    curl_close($curl);
    return $output;
}