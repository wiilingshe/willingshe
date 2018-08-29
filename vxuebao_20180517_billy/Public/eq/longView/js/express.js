    // 弹幕
var biaoji = 0, //用于标记一轮的评论是否播放完毕
    bofang = 1, // 用于第一次播放的判断变量
    tanmuSceneId,
    packJson,
    _len,
    loginCode,
    loginImg;

    function tanmupanel(){
        var tm = document.getElementById("zimupanel");
        var tms = document.getElementById("sent"); 
        var tmss = document.getElementById("tanmubut");
        var i = 0;
        if(tm.style.display=='none'){
            tm.style.display = "block"; 
            tms.style.display = "block";
            tmss.style.display = "block";
            $.ajax({
                type:"GET",
                url:PREFIX_S1_URL + "index.php?c=Danmu&a=view&sceneid=" + tanmuSceneId,
                success:function(data){
                    packJson = data.list;
                    _len = eval(packJson.length);
                }
            });
            setTimeout(fck3,1000)
            function fck3(){
                daojishi = setInterval(fck4,20000);
                $.ajax({
                    type:"GET",
                    url:PREFIX_S1_URL + "index.php?c=Danmu&a=view&sceneid=" + tanmuSceneId,
                    success:function(data){
                        //console.log(data.list.length);
                        packJson = data.list;
                        _len1 = eval(packJson.length);
                    }
                });
                function fck4(){
                    $.ajax({
                        type:"GET",
                        url:PREFIX_S1_URL + "index.php?c=Danmu&a=view&sceneid=" + tanmuSceneId,
                        success:function(data){
                            //console.log(data.list.length);
                            packJson = data.list;
                            _len1 = eval(packJson.length);
                        }
                    });
                }
            }
            ab = setInterval(_fck(_len), 1500);  //每0.8s 从json数组中拿一个数据出来然后弹幕显示
            function _fck(aa){ //出错位置 aa
                return function(){
                        fck(aa); 
                }
            }
            function fck(aa){
                if (i == aa - 1) {
                    i= 0;    //执行到最后一个后,就将i置为0,为下次重新遍历做准备
                    biaoji =1;   //用于后面数据刷新后的标志
                    clearInterval(ab);
                    ab = setInterval(_fck(_len1),1500)
                }else{
                    var a = packJson[i].content;
                    var b = packJson[i].headimg;
                    //console.log(i) 
                    tanmuinit1(a,b);  //执行弹幕形式播放函数
                    i ++;    //未执行到最后一个就一直给遍历依赖i +1 遍历数组 
                    biaoji = 0;  //未执行到最后一个,给biaoji 置0
                }
            }
            // };
        }else{
            tm.style.display = "none";
            tms.style.display = "none";
            tmss.style.display = "none";
            clearInterval(ab);
            clearInterval(daojishi);
        }
    }

    $("#zimu").bind("mouseup",function(){
        tanmupanel();
    });
    function tanmuinput(){
        var tms= document.getElementById("sent");
        if (tms.style.display == 'block') {
            tms.style.display = "none";
        }else{
            tms.style.display = 'block';
        }
    }
    $("#tanmubut").bind("mouseup",function(){
        tanmuinput();
    });

    function tanmuinit(){
        var text = $("#pltext").val();  //存放评论输入框的数据
        var arr = ["view/images/contentpic/1.png","view/images/contentpic/2.png","view/images/contentpic/3.png","view/images/contentpic/4.png","view/images/contentpic/5.png","view/images/contentpic/6.png","view/images/contentpic/7.png","view/images/contentpic/8.png"];
        var item = Math.floor(Math.random()*8);
        var head = arr[item]
        $.ajax({
                type:"POST",
                url:PREFIX_S1_URL + "index.php?c=Danmu&a=save",
                data:{sceneid:tanmuSceneId,content:text,headimg:head},
                dataType:"json",
                success:function(data){
                    console.log(data.msg);
                },
                error:function(data){
                    console.log(data.msg)
                }
            })
        if(text == ""){
            return;  //当输入为空却按了发送的时候,不执行弹幕播放函数
        };
        tanmuinit1(text,arr[item]);
        $("#pltext").val("");
    }


    $("#sendContent").bind("mouseup",function(){
        tanmuinit();
    })


    function tanmuinit1(text,face){
        if(loginCode == "200"){
            var touxaing = PREFIX_URL + "Uploads/" + loginImg;
        }else{
            var touxaing = PREFIX_URL + "Uploads/" + face;
        }
        var creSpan=$("<span class='spcom' id=\"content\"><img src="+touxaing+"  class=\'fckimg\'>" +"<p class=\'contentText\'>"+text+"</p>"+"</span>   ");  //将每条评论包装长一个span
        pageH = $(".mask").height();   //用于随机弹幕发送高度
        Top=parseInt(pageH*(Math.random())); //TOP用于随机高度的变量存放
        if(Top>pageH-50){
            Top=pageH-parseInt(80*(Math.random()));  //当TOP的取值大于最大高度-50的时候,继续减
            if (Top > pageH -50) {
                Top = Top -parseInt(70*(Math.random()));
            };
        }
        creSpan.css({"top":Top,"right":-300}); // 给评论加入起始位置
        $(".mask").append(creSpan);
        $(".spcom").animate({"right":"550px"},8000,"linear",function(){
            $(this).remove(); //执行动画,当走到1000px的时候,这条评论的span消失
        });    
    }

    //评论
    function express(json){
        tanmuSceneId = json.obj.id;
        $.ajax({
            type:"GET",
            url:PREFIX_URL + "index.php?c=user&a=check&time=" + (new Date).getTime(),
            success:function(data){
                //alert(111);
                loginCode = data.code;
                loginImg = data.obj.headImg;
            }
        })
        $.ajax({
            type:"GET",
            url:PREFIX_S1_URL + "index.php?c=Danmu&a=view&sceneid=" + tanmuSceneId,
            success:function(data){
                //alert(222);
                //console.log(data);
                //判断后台有没有评论
                if(data.list == null){
                    $.ajax({
                        type:"POST",
                        url:PREFIX_S1_URL+"index.php?c=Danmu&a=save",
                        data:{sceneid:tanmuSceneId,content:"H5课件支持评论啦~"},
                        success:function(data){
                            //alert(333);
                            $.ajax({
                                type:"GET",
                                url:PREFIX_S1_URL + "index.php?c=Danmu&a=view&sceneid=" + tanmuSceneId,
                                success:function(data){
                                    //alert(444);
                                    packJson = data.list;
                                    _len = eval(packJson.length);
                                }
                            })
                        }
                    })
                }else{
                    packJson = data.list;
                    _len = eval(packJson.length);
                }
                
            }
        })
    }


        