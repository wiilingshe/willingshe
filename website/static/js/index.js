 var jin = 1;
 window.addEventListener('scroll',function(event){
    console.log(window.scrollY)
    var navheight = parseInt($('.nav').eq(0).css('height'));
    var scrolltop = window.scrollY;
    if(scrolltop > 400 && scrolltop < 900){
        console.log(22)
        // $('.zhong').eq(0).animate({'opacity':1},600,'swing');
        $('.title1').eq(0).animate({'margin-left':'0'},300,'swing');
        $('.zhong-list1').eq(0).animate({'right':'0'},300,'swing');
        $('.zhong-list2').eq(0).animate({'left':'0'},300,'swing');
        setTimeout(function(){
            $('.zhong-list3').eq(0).animate({'right':'0'},300,'swing');
            $('.zhong-list4').eq(0).animate({'left':'0'},300,'swing');
        },200)
    }
    if(scrolltop>900){
        $('.new-title').eq(0).animate({'top':'0','opacity':'1'},300,'swing');
    }
    if(scrolltop>1000){
        $('.new-lists_1').eq(0).animate({'opacity':1},300,'swing');
        setTimeout(function(){
            $('.new-lists_2').eq(0).animate({'opacity':1},300,'swing');
        },100);
        setTimeout(function(){
            $('.new-lists_3').eq(0).animate({'opacity':1},300,'swing');
        },200);
        setTimeout(function(){
            $('.new-lists_4').eq(0).animate({'opacity':1},300,'swing');
        },300)
    }
    if(scrolltop>1300){
        $('.new-img').eq(0).animate({'left':0},300,'swing');
        $('.new-content-lists').eq(0).animate({'left':0},300,'swing');
    }
    if(scrolltop>1700){
        $('.zixu').eq(0).animate({'bottom':0,'opacity':1},300,'swing');
    }
    if(scrolltop>1900){
        $('.zheng1').eq(0).animate({'opacity':1},300,'swing');
        setTimeout(function(){
             $('.zheng2').eq(0).animate({'opacity':1},300,'swing');
        },100);
        setTimeout(function(){
             $('.zheng3').eq(0).animate({'opacity':1},300,'swing');
        },200);
        setTimeout(function(){
             $('.zheng4').eq(0).animate({'opacity':1},300,'swing');
        },300);
        setTimeout(function(){
             $('.zheng5').eq(0).animate({'opacity':1},300,'swing');
        },400);
        setTimeout(function(){
             $('.zheng6').eq(0).animate({'opacity':1},300,'swing');
        },500);
        setTimeout(function(){
             $('.zheng7').eq(0).animate({'opacity':1},300,'swing');
        },600);
    }
    if(scrolltop>2400){
        console.log(jin)
        if(jin === 1){
            jin = 2;
            var a = setInterval(function(){
                $('.num1').eq(0).text(Number($('.num1').eq(0).text()) +Number(3))
                if($('.num1').eq(0).text() == 999){
                   clearInterval(a)
                }
            },1);
            var b = setInterval(function(){
                $('.num2').eq(0).text(Number($('.num2').eq(0).text()) +Number(4))
                if($('.num2').eq(0).text() == 888){
                   clearInterval(b)
                }
            },1)
            var c = setInterval(function(){
                $('.num3').eq(0).text(Number($('.num3').eq(0).text()) +Number(4))
                if($('.num3').eq(0).text() == 888){
                   clearInterval(c)
                }
            },1);
            var d = setInterval(function(){
                $('.num4').eq(0).text(Number($('.num4').eq(0).text()) +Number(4))
                if($('.num4').eq(0).text() == 864){
                   clearInterval(d)
                }
            },1);
        }
    }
 })