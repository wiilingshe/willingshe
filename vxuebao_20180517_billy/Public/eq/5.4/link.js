angular.module("scene/console/link.tpl.html", []).run(["$templateCache", function (a) {
    console.log("link.js")
    a.put("scene/console/link.tpl.html", '<div class="modal-header no-line">\n    ' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="cancel()">\n        ' +
        '<span aria-hidden="true">×</span>\n    </button>\n    <h4 class="modal-title">链接组件\n       ' +
        ' <span class="action">可以链接到微课其他页面或者链接网站地址</span>\n    ' +
        '</h4>\n</div>\n<div class="dialog-contain">\n	' +
        '<div class = "link-modal dialog-content">\n		' +
        '<form class="form-contain">\n			' +
        '<div class="form-list clearfix">\n	            ' +
        '<label for="externalRadio" class="form-label" ng-init="url.link=\'external\'">\n                    ' +
        '<div class="radio-square" ng-class="{checked:url.link==\'external\'}">\n                        ' +
        '<em></em>\n                        ' +
        '<input type="radio" name="externalRadio" id="externalRadio" ng-model = "url.link" value="external" ng-change = "changed()" style="margin:0px;">\n                    ' +
        '</div> 	            	\n	            	<!-- <input type="radio" name="externalRadio" id="externalRadio" ng-model = "url.link" value="external" ng-change = "changed()" style="margin:0px;"> --><em>网站地址：</em>\n				</label>\n	           ' +
        ' <div class="form-input">\n	                ' +
        '<input class = "" style="height:35px;width:300px;" type="text" ng-model = "url.externalLink" name="externalLink" id="externalLink" placeholder = "http://" ng-disabled = "url.link == \'internal\'" ng-change = "selectRadio(\'external\')"  limit-link-length/>\n					' +
        // '<a style = "font-size: 16px;display: inline-block; margin-top: 5px;background-image: url(\'assets/images/create/delete.png\'); width: 14px; height: 14px;" ng-show = "url.link == \'external\'" class = "delete-link" ng-click = "removeLink(\'external\')"></a>\n	    '+
        '        </div>\n				' +
        '<a href="http://dwz.cn/" style="text-decoration: underline;color: #08A1EF;position: absolute;top: 10px;right: -30px;" target="_blank">生成短链接</a>\n	        </div>\n	        ' +
        '<div class="form-list clearfix">\n	            ' +
        '<label for="internalRadio" class="form-label">\n                    ' +
        '<div class="radio-square" ng-class="{checked:url.link==\'internal\'}">\n                        ' +
        '<em></em>\n                        ' +
        '<input type="radio" name="internalRadio" id="internalRadio" value="internal" ng-model = "url.link" ng-change = "changed()" style="margin:0px;">\n                    </div> 	            	\n	            	<!-- <input type="radio" name="internalRadio" id="internalRadio" value="internal" ng-model = "url.link" ng-change = "changed()" style="margin:0px;"> --><em>微课页面：</em>\n				</label>\n				' +
        '<div class="form-input">\n					<!-- <select style = "width:300px;" ng-model = "url.internalLink" ng-options = "page.name for page in pageList" ng-disabled = "url.link == \'external\'" ng-change = "selectRadio(\'internal\')"></select> -->\n	                ' +
        '<eqx-select class="select-sm select-contain border-width fl" model="url.internalLink" change="selectRadio(\'internal\')">\n	                    <!-- <eqx-select-option value="null">无</eqx-select-option> -->\n	                   ' +
        ' <eqx-select-option value="page" ng-disabled = "url.link == \'external\'" ng-repeat="page in pageList">{{page.name}}</eqx-select-option>\n	                ' +
        '</eqx-select>					\n					' +
        '<a style = "margin-left:10px;display: inline-block;font-size: 16px; background-image: url(\'assets/images/create/delete.png\'); width: 14px; height: 14px;" ng-show = "url.link == \'internal\'" ng-click = "removeLink(\'internal\')"></a>					\n				</div>\n	        </div>\n		</div>\n	</div>\n</div>\n' +
        '<div class="modal-footer no-line">                                \n    <a class="modal-cancle" ng-click="cancel()">取消</a>\n    <a class="btn btn-primary" ng-click="confirm()">确定</a>\n</div>');
}])