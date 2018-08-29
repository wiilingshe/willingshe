<?php

namespace Home\Controller;

use Think\Controller;

class HtmltplController extends Controller {

    public function index() {

    }

    public function _empty() {
        $this->display(ACTION_NAME);
    }

}
