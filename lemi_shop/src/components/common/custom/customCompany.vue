<template>
  <div class="customCompany">
    <!--样式1，2，3-->
    <div class="customCompany_content-wrap company3" v-if="companyArr.css_type < 4">
      <img :src="companyArr.content[1].logo"  onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" class="customCompany_content-topimg" v-if="companyArr.css_type == 2">
      <h2 class="customCompany_content-title" :class="1?'titleLfet':''">{{companyArr.content_title}}</h2>
      <div class="customCompany_content-text" v-html="companyText">
      </div>
      <img :src="companyArr.content[1].logo" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" class="customCompany_content-bottomimg" v-if="companyArr.css_type == 3">
    </div>
    <!--样式4-->
    <div class="customCompany_content-wrap company4" v-if="companyArr.css_type == 4">
      <h2 class="customCompany_content-title">{{companyArr.content_title}}</h2>
      <h3 class="customCompany_content-title">{{companyArr.content_subtitle}}</h3>
      <div class="customCompany_content-item" v-for="(i,index) in contentArr">
        <div class="customCompany_content-imgwrap" v-if="i.content_postiton == 1">
          <img :src="i.pic" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" class="customCompany_content-sideimg">
        </div>
        <div class="customCompany_content-content4">
          <div class="customCompany_content-title4" :class="i.content_postiton == 1?'title4L':'title4R'">
            {{i.title}}
          </div>
          <div class="customCompany_content-text4" v-html="i.subtitle">
            <!--{{i.subtitle}}-->
          </div>
        </div>
        <div class="customCompany_content-imgwrap" v-if="i.content_postiton == 2">
          <img :src="i.pic" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" class="customCompany_content-sideimg">
        </div>
      </div>
    </div>
    <!--样式5-->
    <div class="customCompany_content-wrap company5" v-if="companyArr.css_type == 5">
      <h2 class="customCompany_content-title" >{{companyArr.content_title}}</h2>
      <div class="customCompany_content-graph" v-for="i in contentArr">
        <h3 class="customCompany_content-titlesmall">{{i.title}}</h3>
        <div class="customCompany_content-text" style="" v-html="i.subtitle">
          <!--{{i.subtitle}}-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        companyText:'',
        contentArr:[],
      }
    },
    props:{
      companyArr:Object
    },
    created(){
//            转换空格及换行
      if(this.companyArr.css_type < 4){
        let str1 = this.companyArr.content_detail;
        str1 = str1.replace(/\s/g, "&nbsp");
        this.companyText = str1.replace(/\n\n/g, "<br/>");
      }else{
        let arr = this.companyArr.content_arr;
        arr.forEach((i)=>{
          let str2 = i.subtitle;
          str2 = str2.replace(/\s/g, "&nbsp");
//            样式4，5换行数据无标识符
          str2 = str2.replace(/\n\n/g, "<br/>");
          i.subtitle = str2;
        });
        this.contentArr = arr;
      }
    },
    methods:{
    }
  }
</script>

<style scoped lang="less">
  .customCompany{
    font-size: 0.28rem;
    h2{
      font-size: 0.48rem;
    }
    &_content{
      &-wrap{
        padding: 0.5rem 5% 0.55rem;
        text-align: center;
      }
      &-text{
        text-align: left;
        font-size: 0.28rem;
      }
      /*1-3*/
      &-topimg{
        width: 3.5rem;
        height: 3.5rem;
        margin-bottom: 0.2rem;
      }
      &-bottomimg{
        width: 100%;
        margin-top: 0.2rem;
      }
      &-title{
        margin-bottom: 0.4rem;
        text-align: center;
        font-weight: bold;
      }
      h3&-title{
        font-weight: 400;
        font-size: 0.3rem;
      }
      /*4*/
      &-item{
        display: table;
        width: 100%;
        margin-top: 0.55rem;
        .customCompany_content-imgwrap{
          &:first-of-type{
            padding-right: 0.3rem;
          }
          &:last-of-type{
            padding-left: 0.3rem;
          }
        }
      }
      &-imgwrap{
        display: table-cell;
        img{
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
        }
      }
      &-content4{
        display: table-cell;
        vertical-align: middle;
      }
      &-text4{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
        text-align: left;
      }
      &-title4{
        padding-right: 0.2rem;
        font-size: 0.30rem;
        font-weight: bold;
      }
      .title4L{
        text-align: left;
      }
      .title4R{
        text-align: right;
      }

      /*5*/
      &-graph{
        margin-bottom: 0.4rem;
      }
      &-titlesmall{
        margin-bottom: 0.2rem;
        text-align: left;
      }
    }
    .company4{
      padding-bottom: 0.4rem;
      .customCompany_content-title{
        margin-bottom: 0.2rem;
      }
    }
    /*私有样式*/
    .titleLfet{
      text-align: left;
    }
  }
</style>
