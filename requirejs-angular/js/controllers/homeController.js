define(['controllers/controllers'],  
    function (controllers) {  
        controllers.controller('homeController', ['$scope', 'homeService',  
           function ($scope, homeService) {  
  
               $scope.resultValue = homeService.Post(  
                   [{  
                       "QuoteNo": "11111",  
                       "OrgZ": "洲",  
                       "OrgG": "国",  
                       "Sales": "admin",  
                       "ContractNo": "20140805000",  
                       "FeeNos": "11|22|33|44"  
                   }], function () {  
                       alert($scope.resultValue.Msg);  
                   }  
               );  
           }  
        ]);  
    });  