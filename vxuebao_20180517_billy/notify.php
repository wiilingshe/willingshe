<?php
header("Content-type: text/html; charset=utf-8"); 
file_put_contents("get.txt", $_SERVER['QUERY_STRING']);
