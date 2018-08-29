<template>
	<div class="public">
	    <nav id="nav" :style="{'background-color':skin}">
            <router-link to="/">
                <i class="iconfont icon-xuanke" style="font-size:0.36rem;position:relative;top:0.04rem;"></i>
                <p style="top: 0.02rem;">选课</p>
            </router-link>
            <!-- <router-link to="/course">
                <i class="iconfont icon-zhibo3" style="font-size:0.36rem;position:relative;top:0.03rem;"></i>
                <p style="top: 0.01rem;">课程</p>
            </router-link> -->
            <router-link to="/study">
                <i class="iconfont icon-xuexi2"></i>
                <p>学习</p>
            </router-link>
            <router-link to="/mine">
                <i class="iconfont icon-wode1"></i>
                <p>我的</p>
            </router-link>
            <!-- <router-link :to="item.url" v-for="(item,index) in navItems" :key="item.id" @click.native="active(index)" :class="{active: i==index}">
                <i class="iconfont" :class="item.icon"></i>
                <p>{{ item.name }}</p>
            </router-link> -->
	    </nav>
    </div>
</template>

<script>
    import { Tabbar, TabItem } from 'mint-ui';
    export default {
        data: function () {
            return {
                navItems: [
                    {
                        'id': 0,
                        'name': '选课',
                        'url': '/',
                        'icon': 'iconfont icon-xuanke'
                    },
                    {
                        'id': 1,
                        'name': '课程',
                        'url': '/course',
                        'icon': 'iconfont icon-zhibo3'
                    },
                    {
                        'id': 2,
                        'name': '学习',
                        'url': '/study',
                        'icon': 'iconfont icon-xuexi2'
                    },
                    {
                        'id': 3,
                        'name': '我的',
                        'url': '/mine',
                        'icon': 'iconfont icon-wode1'
                    }
                ],
                i: '1',
                selected:'0',
                skin:'#fff',
                skin1:'#999',
                // skin:'#242633',
                // skin1:'#cccccc',
            }
        },
        created(){
            // if(window.location.href.indexOf('mine-course-playtime') != -1){
            //     this.i = 1;
            // }else if(window.location.href.indexOf('/course') != -1){
            //     this.i = 2;
            // }else if(window.location.href.indexOf('/mine') != -1){
            //     this.i = 3;
            // }else{
            //   this.i = 0;  
            // }
        },
        mounted(){
            // $('.router-link-exact-active').css('color','#5e96d0');
        },
        methods: {
            active: function (index) {
                this.i = index;

            },
            index(){
            	this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    .router-link-exact-active{
        color: #5e96d0;
    }
    #nav{
        position: fixed;
        width:100%;
        bottom: 0px;
        font-size:0.24rem;
        display:flex;
        text-align: center;
        border-top: 1px solid #eee;
        font-weight: normal;
    }
    a{
        flex:1;
        color: #999;
        display: block;
        text-decoration: none;
    }
    p{
        font-size:0.18rem;
        font-family: "arial black";
        position: relative;
        top: -0.06rem;
    }
    #nav i{
        font-size: 0.45rem;
    }
    #nav i:nth-child(3){
        font-size: 0.3rem;
    }
    /*#nav .router-link-exact-active{
        color: #5e96d0;
    }*/
    a{
        padding-top: 0.05rem;
    }
    
    /*头部*/  
    #top{
    	position: fixed;
    	top: 0;
    	width: 100%;
    }
</style>