<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="Keywords" content="" />
        <meta name="Description" content="" />
        <title>用户中心_充值</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="http://www.vxuebao.com/assets/aaaaaa.css" rel="stylesheet" type="text/css" />
        <script src="http://www.vxuebao.com/Public/css/waiwan/jquery.min.js"></script>
        <style type="text/css">
        h5{
            width: 834px;
        }
        .tit{
            font-family: "Microsoft YaHei";
            font-weight: bold;
            font-size: 15px;
        }
        .payment{
            padding-left: 218px;
            padding-top: 24px;
        }
        
        </style>
    </head>
    <body>
        <div class="modal-header">
            <h4 style='font-family: "Microsoft YaHei";'>购买微币</h4>
            <a style="position: absolute;margin-left: 545px;margin-top: -20px;" ng-click="cancel()">x</a>
        </div>
        <div class="">
            <div class="AreaR" style=""> 
                <div class="box">
                    <div class="contain">
                        <div class="userCenterBox boxCenterList clearfix" style="_height:1%;margin-left: 52px;">
                            <!-- <h5><span style="float:right; cursor: pointer;" onclick="$('.modal').click();">X</span><span>购买微币</span></h5> -->
                            <div class="blank"></div>
                            <!--<table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd">
                                    <tr>
                                            <td align="right" bgcolor="#ffffff"><a href="user.php?act=account_deposit" class="f6">充值</a> |   <a href="user.php?act=account_detail" class="f6">查看充值记录</a>   </td>
                                    </tr>
                            </table>
                            -->
                            <?php if(($action) == "return_msg"): ?><div style="text-align:center; font-size:14px;padding-top: 50px;line-height: 30px;">  <?php echo ($msg); ?>  <br>
                                        <a href="/#/usercenter/member">返回会员中心</a>，或 <a href="/#/usercenter/member">查看微币日志</a>
                                </div>
                                <?php else: ?>												
                                <form name="formSurplus" method="post" action="/?c=pay&a=userspay" onSubmit="return submitSurplus()">
                                    <div class="">
                                        
                                        <h4 class="tit">请选择套餐：</h4>
                                        <ul class="chongzhinav" style="padding-top:10px">
                                            <?php if(is_array($goods_list)): foreach($goods_list as $key=>$item): if(($key == count($goods_list)-1)): ?><li  style="margin-right:0;">
                                                        <label for="wangying" style="height:42px;width:92px; color:#6dae5e; font-weight:600;" name="<?php echo ($item["id"]); ?>">
                                                            <input type="radio" name="gid" value="<?php echo ($item["id"]); ?>" price="<?php echo ($item["price"]); ?>" xd_value="<?php echo ($item["xd_value"]); ?>"/>
                                                            <?php echo ($item["goods_name"]); ?><span style="margin-top:-14px; display:block; color:#626262; margin-left:-8px;">￥:<?php echo ($item["price"]); ?>RMB</span>  
                                                        </label>
                                                    </li>
                                                <?php else: ?>
                                                    <li>
                                                        <label for="wangying" style="height:42px;width:92px; color:#6dae5e;" name="<?php echo ($item["id"]); ?>">
                                                            <input type="radio" name="gid" value="<?php echo ($item["id"]); ?>" price="<?php echo ($item["price"]); ?>" xd_value="<?php echo ($item["xd_value"]); ?>"/>
                                                            <?php echo ($item["goods_name"]); ?><span style="margin-top:-14px; display:block; color:#626262; margin-left:-8px;">￥:<?php echo ($item["price"]); ?>RMB</span>  
                                                        </label>
                                                    </li><?php endif; endforeach; endif; ?>           
                                        </ul>
                                        <br clear="all">
                                            <div class="balance" style="margin-top:0px;">
                                                <p class="cz" style="padding:0px 0px"> <span>我的账户: <strong><?php echo ($user_info["email_varchar"]); ?></strong> <br />
                                                        我当前微币: <b><?php echo ($user_info["xd"]); ?>个</b> <br />
                                                        购买的微币: <b id="bugxd">0个</b> <br />
                                                        所需支付金额:
                                                        <font color="red" size="+2" id="order_amount">0.00</font>
                                                        元 <br />
                                                        订单备注: <br />
                                                        <textarea name="user_note" cols="55" rows="3"  placeholder="捎一句话给卖家！"></textarea>
                                                    </span> </p>
                                                <div class="paytype_btn">
                                                    <input type="hidden" name="surplus_type" value="0" />
                                                    <input type="hidden" name="rec_id" value="" />
                                                    <input type="hidden" name="act" value="act_account" />
                                                    <input style="margin-left: -85px;margin-top:-16px;" type="submit" class="pay_submit" name="submit" value="提交申请" />
                                                </div>
                                            </div>
                                    </div>
                                </form><?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="blank"></div>
            <script type="text/javascript">
                function submitSurplus() {
                    var val = $('input:radio[name="gid"]:checked').val();
                    if (val == null) {
                        alert('请选择套餐！');
                        return false;
                    }
                }
                $(function () {
                    $('.chongzhinav > li > label').on('click', function () {
                        $('#order_amount').html($(this).children().attr('price'));
                        $('#bugxd').html($(this).children().attr('xd_value'));
                    })
                });
            </script>
            <script type="text/javascript">
                $(function() {
                    $('.chongzhinav > li > label').click(function(){
                    $('.chongzhinav > li > label').removeAttr('class') && $(this).attr('class', 'checked');
                    //$('input:radio[name="gid"]').removeAttr('checked') && $(this).children(":first").attr('checked', 'checked');
                    var $radio = $(this).find("input[type=radio]"),
                    $flag = $radio.is(":checked");
                        if( !$flag ){
                            $radio.prop("checked",true);   
                        }
                    });
                });
            </script>
        </div>
    </body>
</html>