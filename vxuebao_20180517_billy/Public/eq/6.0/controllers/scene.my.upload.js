angular.module("scene.my.upload",["angularFileUpload"]),angular.module("scene.my.upload").controller("UploadCtrl",["$scope","FileUploader","fileService","category","$timeout","$interval",function(e,l,i,r,n,t){e.category=r;var a;a=e.category.scratch||e.category.headerImage||e.category.companyImg?e.uploader=new l({url:PREFIX_URL+"index.php?c=upfile&a=upload&bizType="+r.categoryId+"&fileType="+r.fileType,withCredentials:!0,queueLimit:1,onSuccessItem:function(l,i,r,n){function a(){t.cancel(o),alert("上传完毕"),e.$close(i.obj.path)}e.progressNum=0;var o=t(function(){e.progressNum<100?e.progressNum+=15:a()},100)}}):e.uploader=new l({url:PREFIX_URL+"index.php?c=upfile&a=upload&bizType="+r.categoryId+"&fileType="+r.fileType,withCredentials:!0,queueLimit:5,onCompleteAll:function(){function l(){t.cancel(i),alert("上传完毕"),e.$close()}e.progressNum=0;var i=t(function(){e.progressNum<100?e.progressNum+=15:l()},100)}}),r.limitSize=r.limitSize||5145728;var o,p=r.limitSize;"0"==r.fileType||"1"==r.fileType?o="|jpg|png|jpeg|bmp|gif|svg+xml|":("2"==r.fileType||"4"==r.fileType)&&(o="|mp3|mpeg|"),a.filters.push({name:"imageFilter",fn:function(e,l){var i="|"+e.type.slice(e.type.lastIndexOf("/")+1)+"|";return-1!==o.indexOf(i)}}),a.filters.push({name:"imageSizeFilter",fn:function(e,l){var i=e.size;return console.log(e),i>=p&&alert("上传文件大小限制在"+p/1024/1024+"M以内"),p>i}}),a.filters.push({name:"fileNameFilter",fn:function(e,l){return e.name.length>50&&alert("文件名应限制在50字符以内"),e.name.length<=50}}),e.removeQueue=function(){}}]);