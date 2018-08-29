<?php if (!defined('THINK_PATH')) exit();?><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"> 
     <head> 
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8" /> 
         <style id="Classeur1_16681_Styles"></style> 
     </head> 
     <body> 
         <div id="Classeur1_16681" align=center x:publishsource="Excel"> 
             <table x:str border=0 cellpadding=0 cellspacing=0 width=100% style="border-collapse: collapse"> 
                 <tr>
                   <td colspan="4" nowrap class=xl2216681 align="right">total:<?php echo ($total); ?></td>
                 </tr>
                 <tr>
                 <?php if(is_array($title)): foreach($title as $key=>$v): ?><td class=xl2216681 nowrap><?php echo ($v); ?></td><?php endforeach; endif; ?>
                 </tr> 
                <?php if(is_array($content)): foreach($content as $key=>$vv): ?><tr>
                
                <?php $arr=explode(',',$vv); $num = count($arr); for($i=0;$i<$num;++$i){ ?>
                 <td class=xl2216681 nowrap><?php echo ($arr[$i]); ?></td>
                 <?php } ?>
                </tr><?php endforeach; endif; ?>
             </table> 
         </div> 
     </body> 
 </html>