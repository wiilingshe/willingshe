!function(e){function a(){var e={};this.addInterval=function(a,n){e[a]=n},this.deleteInterval=function(a){e[a]&&(clearInterval(e[a]),delete e[a])},this.clearInterval=function(){for(var a in e)this.deleteInterval(a)};var a=[{value:1,desc:"轮播",name:"slide"},{value:2,desc:"下落",name:"bars"},{value:3,desc:"百页窗",name:"blinds"},{value:4,desc:"消隐",name:"blocks"},{value:5,desc:"渐变",name:"blocks2"},{value:9,desc:"梳理",name:"zip"},{value:11,desc:"翻转",name:"bars3d"},{value:13,desc:"立方体",name:"cube"},{value:14,desc:"棋盘",name:"tiles3d"},{value:16,desc:"飞出",name:"explode"}];this.getPicStyle=function(e){if(void 0===e)return a;for(var n=0;n<a.length;n++)if(e===a[n].value)return a[n]}}e.utilPictures=new a}(window);