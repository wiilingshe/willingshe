define(['services/services'],  
    function (services) {  
        services.factory('homeService', ['$resource',  
            function ($resource) {  
                return $resource("../api/BoCtnQutMain/", {}, {  
                    Post: { method: "Post" },  
                    PostArray: { method: "Post",isArray:true }  
                });  
            }  
        ])  
    });  