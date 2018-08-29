<template>
  <div id="box1">
    <transition name="fade">
      <div class="box1-bg" v-if="iftip && isCoupon==false"></div>
    </transition>
    <transition name="fade">
      <div class="box1-tipbox" v-if="iftip && isCoupon==false" @click="totipurl(tipdata.home_url)">
        <img style="width: 6rem;height: 8rem;border-radius: 0.06rem;" :src="tipdata.home_img">
      </div>
    </transition>
    <transition name="fade">
      <div class="box1-tipclose" v-if="iftip" @click="closetip()">X</div>
    </transition>
    <!--hqq新加优惠卷开始-->
    <div class="box1-coupon" v-if="isCoupon">
      <div class="box1-coupon-bg2" @click="closeCoupon($event)"></div>
      <div class="box1-coupon-content">
        <div class="box1-coupon-content-title">
          领取优惠券
          <img src="/static/img/home/my_close.png" alt="" @click="closeCoupon">
        </div>
        <div class="box1-coupon-content-container">
          <div class="box1-coupon-content-container-left">
            <p>￥{{couponData.c_money}}</p>
            <p v-if="couponData.is_limit_use==1">满{{couponData.full_money}}可用</p>
            <p v-if="couponData.is_limit_use==2">无门槛使用</p>
          </div>
          <div class="box1-coupon-content-container-right">
            <p>{{couponData.c_name}}</p>
            <p>指定商品可用</p>
            <p v-if="couponData.is_limit_time==1">{{couponData.start_time}}至{{couponData.end_time}}</p>
            <p v-if="couponData.is_limit_time==2">不限时间</p>
          </div>
        </div>
        <div class="box1-coupon-content-btn" @click="receiveCoupon">
          领 取
        </div>
      </div>
    </div>
    <!--hqq新加优惠卷结束-->
    <div class="homeinfo">
      <div style="height:4rem;">
        <mt-swipe :auto="4000" :show-indicators="false">
          <mt-swipe-item>
            <router-link :to="{path:'/collegeHome'}">
              <img class="lunboPic" src="../../../../../../static/img/lunbo/college.jpg">
            </router-link>
          </mt-swipe-item>
          <!-- <mt-swipe-item>
                       <router-link :to="{path:'/details',query:{'ser_id':'A1Y'}}">
                       <img class="lunboPic" src="../../../../../../static/img/lunbo/pic39.jpg">
                       </router-link>
                    </mt-swipe-item> -->
          <!-- <mt-swipe-item>
                       <router-link :to="{path:'/details2',query:{'id':'Bg'}}">
                          <img class="lunboPic" src="../../../../../../static/img/lunbo/pic37.jpg">
                       </router-link>
                    </mt-swipe-item>
                    <mt-swipe-item>
                       <router-link :to="{path:'/details',query:{'ser_id':'Cg'}}">
                          <img class="lunboPic" src="../../../../../../static/img/lunbo/pic29.jpg">
                       </router-link>
                    </mt-swipe-item>
                    <mt-swipe-item>
                       <router-link :to="{path:'/details',query:{'ser_id':'Bw'}}">
                          <img class="lunboPic" src="../../../../../../static/img/lunbo/pic38.jpg">
                       </router-link>
                    </mt-swipe-item>
                    <mt-swipe-item>
                       <router-link :to="{path:'/details2',query:{'id':'AA'}}">
                          <img class="lunboPic" src="../../../../../../static/img/lunbo/pic34.jpg">
                       </router-link>
                    </mt-swipe-item>
                    <mt-swipe-item>
                          <router-link :to="{path:'/details',query:{'ser_id':'Bg'}}">
                              <img class="lunboPic" src="../../../../../../static/img/lunbo/pic2.jpg">
                          </router-link>
                    </mt-swipe-item>
                    <mt-swipe-item>
                          <router-link :to="{path:'/details',query:{'ser_id':'AA'}}">
                              <img class="lunboPic" src="../../../../../../static/img/lunbo/pic3.jpg">
                          </router-link>
                    </mt-swipe-item> -->
        </mt-swipe>
      </div>
      <div class="header">
        <div class="middle" @click="tolei()" v-if="is_open_college" :style="{width:is_open_college==1?'25%':'33%'}">
          <div class="tablecell">
            <div class="ii">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA3CAYAAACxUDzgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNBMjc2MUMwM0Q2MzExRTg5QTYzQzc4RUIyQzlDRTRFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNBMjc2MUMxM0Q2MzExRTg5QTYzQzc4RUIyQzlDRTRFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0EyNzYxQkUzRDYzMTFFODlBNjNDNzhFQjJDOUNFNEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0EyNzYxQkYzRDYzMTFFODlBNjNDNzhFQjJDOUNFNEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6aQrX2AAAFqklEQVR42uxbfUxbVRS/HZRNQdA2HWNlkUAwKiBCYTFk02Vu6hKzhbElikG3BYkfMS4Gs5hoMmOXzY8lJGoUJJs6NTGEaQeiCZqA8Q+CJUjABa2SdnSZiqB1s/uADX+nnBceTXH0te/1Y+8mv9zz2ne/fu/cc885fTXMzs4KKgaDQSgpNpstF9V3wM0iPso0UD8wMPChksYSH8uiMJGn44gUKkbAjgcW0dpSI2mMwVNQPSr76BSRHkNSVgLXAWuAe4HumBCDcj+wmuVhqO8dsVQVPKjnUb3Gl7sjISbSrbRbJh+Jg210DLjM8nYQdaPmxGBQM6qtMoP3caxZgcb+hqqLL5cDD8dCYx4B0ljuxKQm4sT4HpXJe2JBTLxtI6l0AtJDqoBmFyvpxKDEj8Fg+ah+lY5+4B/qArier89reDoZ+CSi2s/jruCtROUQtPmFcP0YpafSFDDD7WlCWSF8iViUzBCfndFMY1hrCtlXGOWPdgGPsfwq8JVGZDwA7GP5A+B9mU9zAdpyQonnq9iPwYAuVC4ZURtkX4/i+x6NfJc82aU7WuMuE3rRidEyJIh0G9yCaidQBaxig+4FvgHasS1+v6aIASFkGA+zkxhs9deSOw+8gfvoHjsIupj0xGCxJey250rBJ+Bgv4h8j9uBHRycvghsQpstIOfvpCWGNeVLwAr8BTyOBbcvcJCmpjKGhoYONjY20tF/ALgLOIG2G3HvjObEYOD9nFtRapDlkeyaRe45LCOlCgsdZTJsqPYCWwBzaWmp6O7u9nd1dQ00NTVVwrdYj8+fAN4K0ecqmbwX69ilcP5XAMr67V/g4FVUVFyO4in1NRa9OYShHWWbsoM0BYSkMFnPLtZRS0uLaGtrIwd0AnO1ot10UL+Uc9kUpXlfcTqdKcHHdTSP7lBe704mZQQ4DlJI/uj/SKFSW1srUlNTySO1mEym+0Lc8q0a7ksoG+PBU8lTaEPI67wHmAzxdRXXn6P/Wd4aD12tz4yMDFFSUiIGBwep/5ewxb4IumWc6yH0e6fCebtFUN5aSwcvWyIe2kKnz8tLbWi1WgN1WlraWrTN02KyWhIzI9PSjRzkLalMT8+ZFaPRaOCjPKmIkVSeEke2cBqOjY0FaovFEjgn4o4Y7MVXgENKTyqut/v9/uylNvJ6vcLlcknji3A0jdsYgbeB51QhBh1nsie6D7JVATGfAf8COfBNipaaG2lubg7I+fn5oqCggMQ/wxz3NuApzhGpojHye8PO0OHE+APV6yT39PRs6O3tvSopra2toq+vL3BdX18vZCGEkjWG5eVrHSsdJGcMi15nt9vF8PCwqKurE1lZCzOjHo8n4Nj19/cHrqurq0VlZaX0dXvSxUrQmkvYhg9CbAM2OxwO0dHRIYqKikROTk7g9CFSJGNLpaamRjQ0NEiXn8DJO5mU0TXI8VG0DG92T3p6+ps+n285aQ5BXgoLCwPbp7y8XProF+CZpM7HgByKy94bGRn51O12d46Pj6+fnJwkB06YzWZRVlYm8vIW+HFOYBu0ZeqayOAVFxfT71F3w5vdhpqO03VBRv4H4B3gCEiZ0XJu4RBzTsy95kE/y0Y15YhFU6LKAYIyOYFFY5yKkoacBnyAWxViKEkE23Ary+fVeEoggjToZJS37QTmTfmhC6ptJbUI0cCmnY3nWCmhik5MlILIlUB2oi2S3iwFblIriKST4ifgZ8jpCUQKBbzkSn+vlvGld1+kXwIsHCknQrFw0Fug2xjd+OrE6MToxCQRMfLo9mICrVGa9yW1gshz8AmehLgC8pkEIuZHMZfE96gZRL6bgAEk/Rx8QLcxuvHViYlJkb84JL37T4lqr4K+6IWb1Uw2pSTParSGGwCTmPsPwWkx/3+lcEouz184nU7DYsaXboj0P44mhqYPWcy/8BjVrXRU30DzHPwnwADVds7+w3XgVAAAAABJRU5ErkJggg==">
            </div>
            <div class="name">摄影学院</div>
          </div>
        </div>
        <div class="middle" @click="toremen()" :style="{width:is_open_college==1?'25%':'33%'}">
          <div class="tablecell">
            <div class="ii">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA3CAYAAACxUDzgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ1MzQ1RURDM0Q2MzExRThBMTA1RTg0Mjk2OTFCQjQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ1MzQ1RUREM0Q2MzExRThBMTA1RTg0Mjk2OTFCQjQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDUzNDVFREEzRDYzMTFFOEExMDVFODQyOTY5MUJCNDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDUzNDVFREIzRDYzMTFFOEExMDVFODQyOTY5MUJCNDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4qCm0hAAAFP0lEQVR42uyaf0wbZRjHX2gLWxGMwGZ1IErowgzECZVp/AObLcyGyqbxxx8Yoy5qYiJoBi4EovMPRISYuD8mBp3RhD9M/AMdZgi4BVTiIhQnMaLhx0iQxBkIUahmXa3fp/dcdqndel1/4N31Tb55rtd7e/d+7n2ee97nmhYIBESq/belyWAcDscJmKd0OMafoLrJyclZtR2IiRKMnqfOHHQf4CzFAsYPLWkcRAZ007XCuRKYRXS+VctUKisrd8NM8cc/oByFW1VjfL9HApNugDhaw3Co7YJOA9y2SJ10Dwaz4yyMG/qLd5VBQ4BzvaHBMJyvQuDsjgTHEGAYzmmYg5CPd1VBg4BjNTQYhjME87ACzt3QQDg4hgLDcD6DeRT6h3c5GU6GocEwnH6YJ0LgfKKEo1cwa4qcpvAKcPoYjtweYDgW+mCOImmiJOk16IYYLpiyzqO4qEsJBrPI5yqAXse1P4lz+sPB4XEdV8DpgQ6ZozjZ/dCLcbhomsYTCXaVAAZ8FJvvQY9De/D5LC93wrVvORALXkhHBeZzuttxmDGeJMWR9wFjO89yO0tVxSG07KCbtVJICKCxHIAKI4SOp6Fs2piYmEgzC5033OTzMG+rAHhQBmPYx7WalgKTApMCE5emyeDL5YI7hFS+pCLUHILsL5sCBhdzG8zH0PY4nv8C9BgGtaDyGhwwr0L7IUvId/QW4Bj0Ln7vYjJnTDl0V5xvfpGQKmoLEYBQ0vUG9LJi9wYnjDR7bFAJg3kWxx8AnPlkgTkJ7VM+6+PQyA3OqDiO8pAXePtrzmbPDA8Pm2Dv9Xg8jr6+Puf09PQ+JKwEegxw9gDOrwkHQ+sPmC83IZ7UKaC8BTUDSCbsK7x2y6moqBCkmZkZ0dLSElhfX99hMpk+5Bupv6cSu1Anf/wUagKUbTxrCEyO8vjS0lLR1tYWXOv4/f699fX1j+j1cU3BthSi2XoYUMwMqOIqMEVVVVVwOy8v7/jq6mqGHsFUX/bkSXqT+ByVECJ2qpa6zc7O5sM8r0cwNrZyjqJqkIWFUtFuZWVF6BWMXOkzwyUI0i5VnS5J3RCAydjR9xa9gVlkeyfXU1Q1uJA03WzyhBM7Epn53gzzDidU19oor3gG8cKr8vghtvb29vadra2tETtQ4W1wcFCK3A6HvPvPRCZ490B1cZgFb0LnVOZOc7ghlDvtHR0dPdLU1PR3Zmbmlqv16e/vF/Pz8yI9PV24XC7adTFSZh0rGPldTF4sroHBnouyz2HoO8yE8sbGxgtdXV1bsrPDJ98DAwOip6cnuF1bWyuKimjFIU7l5uZuRHuhmqj5YtZQPZYq/mkWi0WUlZWJmpoaUVxcLNbW1gRmkxgfHw9uBxd15eWio6NDYHbRC7VKgPlexTnO89pNOzVf3KgTuPBVbH7k8/myp6amBClcI2ANDQ0EhT6+pAaKpgtV/Fr1iBxjwx1jt9tFc3MzQSHXOQQox4xSqJL/3/JDd3e322q1fpGfn78VS4Ube3t7rWazmb6fgVyA8luyyg7/q+Z0OpeQuN0eHIRZGgbiz1bKeWKFoilXSnbTLBj6V8LIyIhYXl5OyO9r1ZXIZU52dnYKxBllhmt4MDtZwuv1irGxsZQrKZoPmbAoKSlJxRghvW6hRkX0/W63W+CxvQB3+oafThtGdaVT0EPQj/yCzZOVleWCO9Fa4EGbzfYzbG88TqTp/8cgj7kOOct6yD4r9nmj/a3QtZKm85hQKLzPa8QYk0rwNruFC74F7G9GawWRwJjkIJRyJal9kHKgyxz+FWAAJLXbE1/oGZMAAAAASUVORK5CYII=">
            </div>
            <div class="name">热门活动</div>
          </div>
        </div>
        <div class="middle" @click="tokejian()" :style="{width:is_open_college==1?'25%':'33%'}">
          <div class="tablecell">
            <div class="ii">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA3CAYAAACxUDzgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRFM0M1Q0E3M0Q2MzExRThCQkY2OUIwQzQwRDIwRkNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRFM0M1Q0E4M0Q2MzExRThCQkY2OUIwQzQwRDIwRkNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REUzQzVDQTUzRDYzMTFFOEJCRjY5QjBDNDBEMjBGQ0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REUzQzVDQTYzRDYzMTFFOEJCRjY5QjBDNDBEMjBGQ0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5RULtvAAAHVUlEQVR42uxa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">
            </div>
            <div class="name">摄影必读</div>
          </div>
        </div>
        <div class="middle" @click="tozhibo()" :style="{width:is_open_college==1?'25%':'33%'}">
          <div class="tablecell">
            <div class="ii">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA3CAYAAACxUDzgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU2QTVDRTJGM0Q2MzExRTg5MkUwOTdFOEI5RDFBQkYxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU2QTVDRTMwM0Q2MzExRTg5MkUwOTdFOEI5RDFBQkYxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTZBNUNFMkQzRDYzMTFFODkyRTA5N0U4QjlEMUFCRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTZBNUNFMkUzRDYzMTFFODkyRTA5N0U4QjlEMUFCRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4mkFe+AAAHgUlEQVR42uxb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">
            </div>
            <div class="name">每日图赏</div>
          </div>
        </div>
      </div>
      <!-- 大师课 -->
      <div class="course">
        <div class="course-title"><i class="icon iconfont icon-sanjiaoxing-right"></i>大师课
          <!-- <span v-if="arr.length == 6" @click="classification()">MORE <img src="../../../../../../static/img/home/my_moreblack.png"></span> -->
        </div>
        <div class="course-list" v-for="i in arr" @click="godetails(i.ser_id)">
          <div class="course-list-img">
            <img :src="i.pic">
          </div>
          <div class="course-list-title">{{i.ser_title}}</div>
          <div class="course-list-desc">
            <div class="course-list-desc-left">{{i.intro}}</div>
            <div class="course-list-desc-watch">
              <img src="../../../../../../static/img/home/home_Browsing.png"><span>{{i.click}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 热门活动 -->
      <div class="hotactivity">
        <div class="hotactivity-title"><i class="icon iconfont icon-sanjiaoxing-right"></i>热门活动 <span
          @click="toremen()">MORE <img src="../../../../../../static/img/home/my_moreblack.png"></span></div>
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="i in arr2" :key="i.id">
            <div class="hotactivity-img" @click="huodong(i.id,i)">
              <img :src="i.active_img">
            </div>
            <div class="hotactivity-list-title">
              {{i.title}}
            </div>
            <div class="hotactivity-list-desc">
              <!-- <i class="icon iconfont icon-time">2018-03-30</i> -->
              <i class="icon iconfont icon-location">{{i.address}}</i>
              <div class="hotactivity-list-desc-btn" v-if="i._status==1" @click="huodong(i.id,i)">立即报名</div>
              <div class="hotactivity-list-desc-btn" style="background-color:#999;" v-if="i._status==2"
                   @click="huodong(i.id,i)">报名结束
              </div>
              <div class="hotactivity-list-desc-btn" style="background-color:#999;" v-if="i._status==0"
                   @click="huodong(i.id,i)">活动未开始
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <!-- 摄影必读 -->
      <div class="photography">
        <div class="photography-title"><i class="icon iconfont icon-sanjiaoxing-right"></i>摄影必读 <span
          @click="tokejian()">MORE <img src="../../../../../../static/img/home/my_moreblack.png"></span></div>
        <div class="photography-list" v-for="(i,index) in lists" @click="toArticles(i.art_id,i.article_type)"
             :style="{'border-bottom':lists.length==index+1?'none':'1px solid #eee'}">
          <div class="photography-list-cover">
            <img :src="i.pic">
          </div>
          <div class="photography-list-info">
            <div class="photography-list-info-title">{{i.title}}</div>
            <div class="photography-list-info-time">
              <div class="photography-list-info-time-time">
                {{i.format_time}}
              </div>
              <div class="photography-list-info-time-watch">
                <img src="../../../../../../static/img/home/home_Browsing.png"><span
                style="color:#888;">{{i.click}}</span></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <footer1></footer1>
      </div>
    </div>
    <Navigator :ifopen="is_open_college" style="position: fixed;width: 100%;bottom: 0;"></Navigator>
  </div>
</template>

<script>
  import {Navbar, TabItem, Toast, Swipe, SwipeItem} from 'mint-ui';
  import footer1 from '@/components/common/footer1';
  import Navigator from '@/components/common/Navigator';
  import wx from 'weixin-js-sdk'
  export default {
    data(){
      return {
        arr: [{
          imgUrl: '../../../../../../static/img/lunbo/pic6.png',
          url: '/details',
          vid: 'Bg',
          title: '婚纱人像摄影创新思维实战28课婚纱',
          desc: '曾宽中国顶尖商业修图师',
          type: 'ser_id'
        }, {
          imgUrl: '../../../../../../static/img/lunbo/pic8.png',
          url: '/details',
          vid: 'AA',
          title: '婚纱人像摄影创新思维实战28课',
          desc: '曾宽 , 中国顶尖商业修图师 ',
          type: 'ser_id'
        }, {
          imgUrl: '../../../../../../static/img/lunbo/pic35.jpg',
          url: '/details2',
          vid: 'Bw',
          title: '婚纱人像摄影创新思维实战28课',
          desc: '曾宽 , 中国顶尖商业修图师 ',
          type: 'ser_id'
        }, {
          imgUrl: '../../../../../../static/img/lunbo/pic28.png',
          url: '/details',
          vid: 'Cg',
          title: '婚纱人像摄影创新思维实战28课',
          desc: '曾宽 , 中国顶尖商业修图师 ',
          type: 'ser_id'
        }],
        arr2: [],
        lists: [],
        selected: '1',
        homeshow: true,
        dibu: false,
        skin: '#5e96d0',
        skin1: '0.1rem solid #5e96d0',
        is_open_college: 0,
        iftip: false,
        tipdata: [],
        isCoupon: false,
        c_code: '',
        couponData: []
      }
    },
    created(){

      var self = this;
      //			this.global.shouquan();
      //      this.navId = this.$route.query.root_id;
      if (this.$route.query.ifopen == undefined) {
        this.postData('post', '/shop-v1-index_basemsg.html').then(res => {
          sessionStorage.setItem('res', JSON.stringify(res.data))
          document.title = res.data.title;
          if (res.data.is_open_college == 1) {
            this.is_open_college = 1;
            localStorage.setItem('ifopen', 1)
          } else {
            this.is_open_college = 0;
            localStorage.setItem('ifopen', 0)
          }
          this.share(res.data.title, res.data.description, res.data.logo)
        });
      } else {
        this.is_open_college = this.$route.query.ifopen
      }
      this.postData('post', '/shop-v1-series_index_lst.html').then(res => {
        this.arr = res.data;
      });
      this.getData('post', '/shop-v1-line_active_get_active_list.html', {page: 1}).then(res => {
        this.arr2 = res.data.data;
      })
      //      隐藏首页
      //      this.postData('post','/shop-v1-index_get_root.html').then(res => {
      //        this.homeshow= res.data.rootId !== "Aw";
      //      })
      setTimeout(function () {
        var arr, reg = new RegExp("(^| )tipshow=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {

        } else {
          self.postData('post', '/shop-v2-college-show_popup.html', {type: 1}).then(res => {
            if (res.data.status == 1) {
              if (res.data.data.is_home_popup == 1) {
                self.iftip = true;
                var exp = new Date();
                exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
                document.cookie = "tipshow=tipshow;expires=" + exp.toGMTString();
                self.tipdata = res.data.data;
              }
            }
          })
        }
      }, 0);

      //优先设置显示优惠卷
      let newObj = self.GetRequest();
      if (typeof(newObj.c_code) != 'undefined') {
        self.getCouponList(newObj.c_code);
        self.isCoupon = true;
        self.c_code = newObj.c_code;
      } else {
        self.isCoupon = false;
      }
    },
    mounted(){
      // console.log(document.documentElement.scrollTop)
      this.getData('GET', '/shop-v1-article_lst.html?is_best=1').then(res => {
        this.lists = res.data.data
      })
      window.addEventListener('scroll', this.menu)
    },
    components: {Navigator, footer1},
    methods: {
      totipurl(url){
        console.log(url)
        this.$router.push({path: url})
      },
      closetip(){
        this.iftip = false;
      },
      tolei(){
        this.$router.push({path: '/collegeHome'})
      },
      toremen(){
        this.$router.push({path: '/activity'})
      },
      tokejian(){
        this.$router.push({path: '/mine-course-boutiquetext'})
        // 以前文章首页
        // this.$router.push({path:'/mine-course-playtime'})
      },
      wenzhang(){
        this.$router.push({path: '/mine-course-playtime'})
      },
      tozhibo(){
        this.$router.push({path: '/dailyRewards'});
        // Toast({
        //   message: '开发中',
        //   iconClass: 'icon iconfont icon-2',
        //   duration: 1500
        // });
        // 付费问答首页
        // this.$router.push({path:'/tutorList'});
      },
      classification(){
        this.$router.push({path: '/classification', query: {ifopen: this.is_open_college}})
      },
      menu(){
        if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + document.body.scrollTop + 50) {
          this.dibu = true;
        }
      },
      godetails(id){
        this.$router.push({path: '/details', query: {ser_id: id}})
      },
      toArticles(id, type){
        switch (type) {
          case 1:
            this.$router.push({path: "/mine-course-articles", query: {artid: id}});
            break;
          case 2:
            this.$router.push({path: "/mine-course-vote", query: {artid: id}});
            break;
          case 3:
            this.$router.push({path: "/mine-course-mesay", query: {artid: id}});
            break;
          case 4:
            this.$router.push({path: "/mine-course-articles", query: {artid: id}});
            break;
        }
      },
      huodong(id, info){
        // console.log(info)
        if (info.ca_id != '' && info.car_id != '' && info.type > 1) {
          this.$router.push({path: 'offCourseDetails', query: {active_id: id, ca_id: info.ca_id, car_id: info.car_id}})
        } else {
          this.$router.push({path: 'details2', query: {id: id}})
        }
        // this.$router.push({path:'/details2',query:{id:id}});
      },
      /**
       * closeCoupon:关闭优惠卷弹窗
       * by hqq 2018/08/27
       */
      closeCoupon: function (e) {
        let that = this;
        that.isCoupon = false;
      },
      /**
       * receiveCoupon:领取优惠卷
       * by heqingqing 2018/08/27
       */
      receiveCoupon: function () {
        let that = this;
        this.postData('post', '/shop-v2-coupon_exchange.html', {'c_code': that.c_code, 'encryption': 1}).then(res => {
          if (res.status == 200) {
            Toast({
              message: res.data.msg
            });
            if (res.data.status == 1) {
              let dataList = res.data.data;
              if ((dataList.college_num > 0 && dataList.series_num > 0 && dataList.line_num > 0) || (dataList.college_num > 0 && dataList.series_num > 0) || (dataList.series_num > 0 && dataList.line_num > 0) || (dataList.college_num > 0 && dataList.line_num > 0)) {
                //停留首页
                that.isCoupon = false;
              } else if (dataList.college_num > '0' && dataList.series_num == '0' && dataList.line_num == '0') {
                this.$router.push({path: '/collegeHome', query: {root_id: 'Aw'}});//跳到学院
              } else if (dataList.college_num == '0' && dataList.series_num == '1' && dataList.line_num == '0') {
                console.log('跳到专栏');
              } else if (dataList.college_num == '0' && dataList.series_num == '0' && dataList.line_num == '1') {
                this.$router.push({path: '/activity', query: {root_id: 'Aw'}});//跳到线下活动
              } else {
                console.log('状态错误');
              }
            } else {
              that.isCoupon = false;
            }
          }
        });
      },
      /**
       * getCouponList:获得优惠卷弹窗
       * by hqq 2018/08/27
       * 参数:c_code
       */
      getCouponList: function (c_code) {
        let that = this;
        let url = '/shop-v2-coupon_info.html?c_code=' + c_code;
        this.getData('get', url).then(res => {
          if (res.data.status == 1) {
            that.couponData = res.data.data;
          }
        })

      },
      /**
       * GetRequest：获取url问号参数
       * @returns {Object}
       * @constructor
       */
      GetRequest: function () {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
        }
        return theRequest;
      }
    },
  }
</script>

<style lang="less">

  #box1 {

    /*hqq新加优惠卷开始*/
    .box1-coupon {
      &-bg2 {
        width: 100vh;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10;
      }
      &-content {
        width: 6rem;
        height: 4.4rem;
        position: fixed;
        top: 50%;
        left: 50%;
        background-color: #F5F5F5;
        border-radius: 0.06rem;
        margin-left: -3rem;
        margin-top: -2.2rem;
        z-index: 11;
        &-title {
          color: #222222;
          font-size: 0.38rem;
          width: 100%;
          text-align: center;
          height: 1.16rem;
          line-height: 1.16rem;
          position: relative;
          font-weight: 900;
          img {
            width: 0.32rem;
            height: 0.32rem;
            position: absolute;
            right: 0.32rem;
            top: 0.42rem;
          }
        }
        &-container {
          background: url('/static/img/home/coupon_bg1@2x.png');
          width: 5.4rem;
          height: 1.6rem;
          background-size: 100% 100%;
          margin: 0 auto;
          overflow: hidden;
          &-left {
            width: 34%;
            height: 100%;
            float: left;
            text-align: center;
            p:nth-child(1) {
              font-size: 0.38rem;
              color: #EF5D38;
              margin-top: 0.48rem;
            }
            p:nth-child(2) {
              font-size: 0.24rem;
              color: #666666
            }

          }
          &-right {
            width: 66%;
            height: 100%;
            float: left;
            text-align: center;
            p:nth-child(1) {
              font-size: 0.3rem;
              color: #222222;
              font-weight: 900;
              margin-top: 0.28rem;
            }
            p:nth-child(2) {
              font-size: 0.24rem;
              color: #666666;
              margin-top: 0.1rem;
            }
            p:nth-child(3) {
              font-size: 0.24rem;
              color: #666666;
            }
          }
        }
        &-btn {
          width: 5.4rem;
          height: 0.9rem;
          line-height: 0.9rem;
          text-align: center;
          background: #222222;
          border-radius: 0.06rem;
          margin: 0.4rem auto;
          color: white;
          font-size: 0.3rem;
        }

      }

    }

    /*hqq新加优惠卷结束*/
    .box1-bg {
      width: 100%;
      height: 100vh;
      position: fixed;
      z-index: 11;
      top: 0;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .box1-tipbox {
      width: 6rem;
      height: 8rem;
      background-color: #fff;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 12;
      border-radius: 0.06rem;
    }
    .box1-tipclose {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      color: #fff;
      border: 1px solid #fff;
      position: fixed;
      bottom: 0.6rem;
      z-index: 12;
      left: calc(~"50% - 0.3rem");
      text-align: center;
      line-height: 0.6rem;
      font-size: 0.3rem;
    }
    height: 100%;
    .homeinfo {
      padding-bottom: 0.9rem;
      // height: calc(~"100vh - 0.94rem");
      // overflow: scroll;
      // -webkit-overflow-scrolling:touch;
    }
    .header {
      height: 1.62rem;
      width: 100%;
      background-color: #fff;
      display: flex;
      display: -webkit-flex;
      font-size: 0.26rem;
      color: #666;
      .middle {
        display: table;
        height: 100%;
        width: 100%/4;
        .tablecell {
          display: table-cell;
          vertical-align: middle;
          .ii {
            width: 0.68rem;
            height: 0.54rem;
            margin: 0 auto;
            border-radius: 50%;
            img {
              width: 0.68rem;
              height: 0.54rem;
            }
            // i{
            // 	font-size: 0.45rem;
            // 	position: relative;
            // 	top: 0.1rem;
            // 	left: 0.125rem;
            // }
          }
          .name {
            text-align: center;
            margin-top: 0.16rem;
            font-size: 0.26rem;
          }
        }
      }
    }
    .photography,
    .course,
    .hotactivity {
      background-color: #fff;
      margin-top: 0.2rem;
      .icon-sanjiaoxing-right {
        font-size: 0.3rem;
        margin-right: 0.1rem;
        margin-left: 0.2rem;
        position: relative;
        top: -0.05rem;
      }
      &-title {
        font-size: 0.44rem;
        color: #222;
        padding-top: 0.42rem;
        margin-bottom: 0.4rem;
        font-weight: bold;
        span {
          display: inline-block;
          font-size: 0.26rem;
          color: #666;
          float: right;
          line-height: 0.6rem;
          margin-right: 0.3rem;
          font-weight: normal;
          img {
            height: 0.18rem;
          }
        }
      }
    }
    .course {
      &-list {
        &-img {
          width: 6.92rem;
          height: 4.16rem;
          overflow: hidden;
          background-color: #eee;
          margin: 0 auto;
          margin-bottom: 0.32rem;
          border-radius: 0.06rem;
          img {
            width: 6.92rem;
          }
        }
        &-title {
          font-size: 0.3rem;
          color: #333;
          width: 6.92rem;
          margin: 0 auto;
          margin-bottom: 0.05rem;
        }
        &-desc {
          font-size: 0.26rem;
          color: #888;
          width: calc(~"100% - 0.6rem");
          // width: 6.92rem;
          margin: 0 auto;
          display: flex;
          -webkit-display: flex;
          justify-content: space-between;
          padding-bottom: 0.58rem;
          &-left {
            width: 5.3rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &-watch {
            display: inline-block;
            float: right;
            vertical-align: top;
            margin-top: -0.08rem;
            i {
              margin-right: 0.1rem;
            }
            img {
              height: 0.24rem;
              margin-top: 0.15rem;
              margin-right: 0.06rem;
            }
            span {
              display: inline-block;
              vertical-align: top;
              margin-top: 0.1rem;
            }
          }
        }
      }
    }
    .hotactivity {
      height: 7.12rem;
      overflow: hidden;
      .mint-swipe-indicators {
        top: 4.9rem;
      }
      &-img {
        width: 6.92rem;
        height: 4.4rem;
        margin: 0 auto;
        background-color: #eee;
        overflow: hidden;
        border-radius: 0.06rem;
        img {
          width: 6.92rem;
        }
      }
      &-list-title {
        font-size: 0.3rem;
        color: #333;
        width: 6.92rem;
        margin: 0 auto;
        margin-bottom: 0.05rem;
        margin-top: 0.25rem;
      }
      &-list-desc {
        font-size: 0.26rem;
        color: #888;
        width: 6.92rem;
        margin: 0 auto;
        padding-bottom: 0.58rem;
        i {
          display: block;
          font-size: 0.26rem;
          margin-right: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 75%;
        }
        i:before {
          margin-right: 0.1rem;
        }
        &-btn {
          width: 1.62rem;
          height: 0.72rem;
          background-color: #222;
          border-radius: 0.06rem;
          display: inline-block;
          float: right;
          text-align: center;
          overflow: hidden;
          line-height: 0.72rem;
          color: #fff;
          margin-top: -0.8rem;
        }
      }
    }
    .photography {
      &-title {
        margin-bottom: 0;
      }
      &-list {
        width: calc(~"100% - 0.6rem");
        margin: 0 auto;
        border-bottom: 1px solid #eee;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        &-cover {
          width: 2.52rem;
          height: 1.52rem;
          background-color: #eee;
          display: inline-block;
          overflow: hidden;
          border-radius: 0.06rem;
          img {
            width: 2.52rem;
          }
        }
        &-info {
          display: inline-block;
          float: right;
          vertical-align: top;
          width: 4.08rem;
          height: 1.52rem;
          &-title {
            font-size: 0.3rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            height: 0.82rem;
          }
          &-time {
            font-size: 0.26rem;
            margin-top: 0.4rem;
            color: #666;
            &-time {
              display: inline-block;
            }
            &-watch {
              display: inline-block;
              float: right;
              img {
                height: 0.22rem;
                margin-top: 0.15rem;
                margin-right: 0.06rem;
              }
              i {
                font-size: 0.35rem;
                span {
                  font-size: 0.26rem;
                  display: inline-block;
                  margin-left: 0.1rem;
                  position: relative;
                  top: -0.03rem;
                }
              }
            }
          }
        }
      }
    }

  }

  // #box1 .mint-swipe{
  // 	height: 3.52rem;
  // }
  // #box1 .mint-navbar{
  // 	background-color: #fff;
  // 	color:#fff;
  // 	overflow: hidden;
  // 	height: 0.8rem;
  // }
  // #box1 .mint-navbar .mint-tab-item.is-selected{
  // 	color:#5e96d0;
  // 	border-bottom: 1px solid #5e96d0;
  //     margin-bottom: 0px;
  // }
  // #box1 .mint-navbar{
  // 	// position: fixed;
  // 	top: 0;
  // 	z-index: 2;
  // 	width: 100%;
  // }
  // #box1 .mint-tab-item-label{
  // 	font-size: 0.22rem;
  // 	position: relative;
  // 	top: -0.05rem;
  // 	color: #999;
  // }
  // #box1 .mint-tab-item-icon img{
  // 	height: 0.48rem;
  // 	width: auto;
  // }
  // #box1 .mint-tabbar{
  // 	background-color: #fff;
  // 	border-top:1px solid #eee;
  // 	background-image: none;
  // }
  // #box1 .mint-tabbar > .mint-tab-item.is-selected{
  // 	color: #222;
  // 	background-color: #fff;
  // }
  // #box1 .mint-tabbar > .mint-tab-item.is-selected .mint-tab-item-label{
  // 	color: #222;
  // }
  // #box1.mint-tab-item{
  // 	padding: 0.094rem 0;
  // }
  .lunboPic {
    // height: 8rem;
    width: 100%;
  }

  .titleone .title {
    font-size: 0.3rem;
    border-left: 0.1rem solid #5e96d0;
    padding-left: 0.1rem;
    font-weight: 500;
  }

  .recommend {
    height: 2.58rem;
    // padding: 0 0.2rem;
    padding-bottom: 0.2rem;
    background-color: #fff;
  }

  .recommend img {
    width: 100%;
    height: 2.58rem;
  }

  #box1 .mint-swipe-indicators {
    // top: 2.7rem;
  }

  .titleone {
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    margin-top: 0.2rem;
  }

  /*导航*/
  .nav {
    font-size: 0.26rem;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
