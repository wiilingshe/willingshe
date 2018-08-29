import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
//公共尾部
//import publicBottom from '@/components/Navigator/publicBottom'
import homePage from '@/components/homePage/homePage'//首页
import homePage3 from '@/components/homePage/homePage3'//首页3
//活动页
import activity from '@/components/activity/activity'
import activity11 from '@/components/activity/activity11'
//分类
import classification from '@/components/classifyPage/classification'
// import classifyPage from '@/components/classifyPage/classifyPage'
// import shipinsearch from '@/components/classifyPage/shipinSearch'
// import kechengsearch from '@/components/classifyPage/kechengSearch'
import classLists from '@/components/classifyPage/classLists'
//常见问题
import commonProblem from '@/components/publicPage/commonProblem';
//课程
import coursePage from '@/components/coursePage/coursePage'//课程
//个人中心
import PersonalCenter from '@/components/publicPage/PersonalCenter'
import Money from '@/components/publicPage/money'
import Courses from '@/components/publicPage/course'
import Fans from '@/components/publicPage/fans'
import Anchors from '@/components/publicPage/anchor'
import Extension from '@/components/publicPage/extension'
import College from '@/components/publicPage/college'  //申请主播
import setup from '@/components/publicPage/Setup'  //设置页面
import setCard from '@/components/publicPage/setCard'  //设置名片
import order from '@/components/publicPage/Order'  //订单页面
import sign from '@/components/publicPage/sign'    //签到页
import promotion from '@/components/publicPage/promotion' //推广码
import inviteSort from '@/components/personalCenter/inviteSort'

//申请导师子页面
import anchorLogin from '@/components/publicPage/anchor/anchorLogin' //导师登录页
import anchorRegister from '@/components/publicPage/anchor/anchorRegister' //导师注册页//申请机构
import anchorNext from '@/components/publicPage/anchor/anchorNext'  //导师注册下一页
import anchorSubmit from '@/components/publicPage/anchor/anchorSubmit' //导师注册提交页面
//我是导师子页面
import tutor from '@/components/publicPage/anchor/mentorSuccess/tutor' //我是导师子页面
import works from '@/components/publicPage/anchor/mentorSuccess/works' //我的作品
import assets from '@/components/publicPage/anchor/mentorSuccess/assets' //导师资产
import assetsWithdrawals from '@/components/publicPage/anchor/mentorSuccess/assetsWithdrawals'  //导师提现
import tixianDetailed from '@/components/publicPage/anchor/mentorSuccess/tixianDetailed' //导师提现明细
import shouruDetailed from '@/components/publicPage/anchor/mentorSuccess/shouruDetailed' //导师收入明细
//申请学院子页面
import collegeLogin from '@/components/publicPage/college/collegeLogin' //学院登录页
import collegeApply from '@/components/publicPage/college/collegeApply'  //申请学院//申请机构
import agreement from '@/components/publicPage/college/agreement'   //相关协议页
//我的学院
import org from '@/components/publicPage/college/collegeSuccess/org' //我的学院
import orgTutor from '@/components/publicPage/college/collegeSuccess/orgTutor' //学院导师
import orgWorks from '@/components/publicPage/college/collegeSuccess/orgWorks' //学院作品
import orgAssets from '@/components/publicPage/college/collegeSuccess/orgAssets' //学院资产
//钱包子页面
import detailed from '@/components/publicPage/money/detailed' //钱包明细页
import withdrawals from '@/components/publicPage/money/withdrawals' //提现明细页
import record from '@/components/publicPage/money/record' //提现记录页面
import alipay from '@/components/publicPage/money/alipay'  //添加支付宝页
import bankcard from '@/components/publicPage/money/bankcard' //添加银联页
//详情页面
import Details from '@/components/common/detailsPage'
import Details2 from '@/components/common/detailsPage2'
import give from  '@/components/common/give'//赠送给好友页面
import receive from '@/components/common/receive' //领取页面
import giveNext from '@/components/common/giveNext' //赠送给好友下一步页面
import  detailquestions from '@/components/common/detailquestions'
import commission from '@/components/common/commission'  //佣金
//我的订单子页面
import orderDetails from '@/components/publicPage/order/details'  //课程订单详情页
import orderVideo from '@/components/publicPage/order/video'      //视频订单详情页
import orderActivity  from '@/components/publicPage/order/activity'    //活动订单详情
import orderPackage  from '@/components/publicPage/order/package'    //套餐订单详情
//粉丝详情页
import fansDetails from '@/components/publicPage/fans/fansDetails'
// 支付页面
import toPay from '@/components/toPay'
import payWay from '@/components/payWay'
import successPay from '@/components/successPay'
import failPay from '@/components/failPay'
//直播
import live from '@/components/live/live'
import applyLive from '@/components/live/applyLive'
import liveHomePage from '@/components/live/liveHomePage'
import newGroup from '@/components/live/newGroup'
import audit from '@/components/live/audit'
import liveHome from '@/components/live/liveHome'
import forum from '@/components/live/forum'
// 付费问答
import tutorList from '@/components/ask/tutorList'
import askQuestions from '@/components/ask/askQuestions'
import tutorHomepage from '@/components/ask/tutorHomepage'
import problemDetails from '@/components/ask/problemDetails'
import serAsk from '@/components/serAsk'
import reply from '@/components/reply'
import reply2 from '@/components/reply2'
import mineAsk from '@/components/ask/mineAsk'

import failTip from '@/components/failTip'
//课间页,精品页测试
import playtime from '@/components/publicPage/course/playtime'
import boutiquetext from '@/components/publicPage/course/boutiquetext'
import articles from '@/components/publicPage/course/articles'
import mesay from '@/components/publicPage/course/mesay'
import vote from '@/components/publicPage/course/vote'
// 抽奖
import lottery from '@/components/lottery'
import giftlist from '@/components/giftlist'
//绑定手机页
import bindPhone from '@/components/common/bindPhone'
//获取toKen
import toKen from '@/components/common/toKen'
//自定义页
import customPage from '@/components/common/customPage'
import customPersonal from '@/components/common/customPersonal'
import customTeam from '@/components/common/customTeam'
//充值页面
import recharge from '@/components/publicPage/recharge'
import rechargeList from '@/components/publicPage/rechargeList'
//学习页面
import study from '@/components/common/study'
//团购页面
import groupBuying from '@/components/groupBuying/groupBuying'
import groupList from '@/components/groupBuying/groupList'
// 新版本介绍
import newBen from '@/components/common/newBen'
// 商城
import mallHome from '@/components/mall/mallHome'
import mallTab from '@/components/mall/mallTab'
import goodDetails from '@/components/mall/goodDetails'
import goodsLists from '@/components/mall/order/goodsLists'
import sortLists from '@/components/mall/sort/sortLists'
import shopAddress from '@/components/mall/shopAddress'
import editAddress from '@/components/mall/editAddress'
import chooseAddress from '@/components/mall/chooseAddress'
import confirmOrder from '@/components/mall/order/confirmOrder'
import shopCart from '@/components/mall/shoppingCart/shopCart'
import orderCenter from '@/components/mall/order/orderCenter'
import logisticsMany from '@/components/mall/logistics/logisticsMany'
import mallOrderDetails from '@/components/mall/order/mallOrderDetails'
import commentComplete from '@/components/mall/comment/commentComplete'
import commentSuccess from '@/components/mall/comment/commentSuccess'
import theDeal from '@/components/mall/comment/theDeal'

//个人名片
import establishCard from '@/components/publicPage/card/establishCard'
import daoshiProcess from '@/components/publicPage/card/daoshiProcess'
import jigouProcess from '@/components/publicPage/card/jigouProcess'

// 面谱
import faceHome from '@/components/expand/facebook/faceHome'
import faceJion from '@/components/expand/facebook/faceJion'
import faceDetail from '@/components/expand/facebook/faceDetail'
import successSubmit from '@/components/expand/facebook/successSubmit'
import faceSearch from '@/components/expand/facebook/faceSearch'
import facePromotion from '@/components/expand/facebook/facePromotion'
import faceList from '@/components/expand/facebook/faceList'

// 面谱PC端
import faceHomePc from '@/components/expand/facebookPC/faceHomePc'
import codePc from '@/components/expand/facebookPC/codePc'

//赠送课程
import giving from '@/components/publicPage/giving/givingList';
//清缓存
import clearCache from '@/components/common/clearCache';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    //首页
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/homePage3',
      name: 'homePage3',
      component: homePage3
    },
    //活动页
    {
      path: '/activity',
      name: 'activity',
      component: activity
    },
    //11.11活动页
    {
      path: '/activity11',
      name: 'activity11',
      component: activity11,
    },
    //分类
    {
      path: '/classification',
      name: 'classification',
      component: classification
    },
    //视频分类
    // {
    //   path: '/classify-shipinsearch',
    //   name: 'shipinsearch',
    //   component: shipinsearch
    // },
    // //课程分类
    // {
    //   path: '/classify-kechengsearch',
    //   name: 'kechengsearch',
    //   component: kechengsearch
    // },
    // {
    //   path: '/classify-search',
    //   name: 'classifyPage',
    //   component: classifyPage
    // },
    //课程
    {
      path: '/course',
      name: 'coursePage',
      component: coursePage
    },
    //我的订单
    {
      path: '/mine-order',
      name: 'order',
      component: order
    },
    //课程订单详情页
    {
      path: '/mine-order-details',
      name: 'orderDetails',
      component: orderDetails
    },
    //视频订单详情页
    {
      path: '/mine-order-video',
      name: 'orderVideo',
      component: orderVideo
    },
    //活动订单详情页
    {
      path: '/mine-order-activity',
      name: 'orderActivity',
      component: orderActivity
    },
    //套餐订单详情页
    {
      path: '/mine-order-package',
      name: 'orderPackage',
      component: orderPackage
    },
    //个人中心
    {
      path: '/mine',
      name: 'PersonalCenter',
      component: PersonalCenter,
    },
    //我的钱包
    {
      path: '/mine-money',
      name: 'Money',
      component: Money,
    },
//钱包明细页
    {
      path: '/mine-money-detailed',
      name: 'detailed',
      component: detailed,
    },
//提现明细
    {
      path: '/mine-money-withdrawals',
      name: 'withdrawals',
      component: withdrawals,
    },
//提现明细记录页
    {
      path: '/mine-money-record',
      name: 'record',
      component: record,
    },
//支付宝
    {
      path: '/mine-money-alipay',
      name: 'alipay',
      component: alipay,
    },
//银联
    {
      path: '/mine-money-bankcard',
      name: 'bankcard',
      component: bankcard,
    },

    //我的课程表
    {
      path: '/mine-course',
      name: 'Course',
      component: Courses,
    },
    //我的粉丝
    {
      path: '/mine-fans',
      name: 'Fans',
      component: Fans,
    },
//  粉丝详情页
    {
      path: '/mine-fans-fansDetails',
      name: 'fansDetails',
      component: fansDetails,
    },

    //申请主播
    {
      path: '/mine-anchor',
      name: 'Anchor',
      component: Anchors,
    },
//  主播登录
    {
      path: '/mine-anchor-login',
      name: 'anchorLogin',
      component: anchorLogin,
    },
//主播注册
    {
      path: '/mine-anchor-register',
      name: 'anchorRegister',
      component: anchorRegister,
    },
//主播注册下一页
    {
      path: '/mine-anchor-next',
      name: 'anchorNext',
      component: anchorNext,
    },
//提交申请页
    {
      path: '/mine-anchor-submit',
      name: 'anchorSubmit',
      component: anchorSubmit,
    },
//我是导师
    {
      path: '/mine-tutor',
      name: 'tutor',
      component: tutor,
    },
//我的作品
    {
      path: '/mine-works',
      name: 'works',
      component: works,
    },
//我的资产
    {
      path: '/mine-assets',
      name: 'assets',
      component: assets,
    },
//导师提现
    {
      path: '/mine-assetsWithdrawals',
      name: 'assetsWithdrawals',
      component: assetsWithdrawals,
    },

//导师提现明细
    {
      path: '/mine-tixianDetailed',
      name: 'tixianDetailed',
      component: tixianDetailed,
    },
//导师收入明细
    {
      path: '/mine-shouruDetailed',
      name: 'shouruDetailed',
      component: shouruDetailed,
    },


    //申请学院
    {
      path: '/mine-college',
      name: 'college',
      component: College,
    },
//学院账号绑定
    {
      path: '/mine-college-login',
      name: 'collegeLogin',
      component: collegeLogin,
    },
//学院申请(子页面)
    {
      path: '/mine-college-apply',
      name: 'collegeApply',
      component: collegeApply,
    },
//相关协议页面
    {
      path: '/mine-college-agreement',
      name: 'agreement',
      component: agreement,
    },
//我的学院
    {
      path: '/mine-org',
      name: 'org',
      component: org,
    },
//学院导师
    {
      path: '/mine-orgTutor',
      name: 'orgTutor',
      component: orgTutor,
    },
//学院作品
    {
      path: '/mine-orgWorks',
      name: 'orgWorks',
      component: orgWorks,
    },
//学院资产
    {
      path: '/mine-orgAssets',
      name: 'orgAssets',
      component: orgAssets,
    },

    //我的推广码
    {
      path: '/mine-extension',
      name: 'Extension',
      component: Extension,
    },
    //详情页面
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/details2',
      name: 'Details2',
      component: Details2
    },
    //赠送好友
    {
      path: '/mine-give',
      name: 'give',
      component: give
    },
    //领取
    {
      path: '/mine-receive',
      name: 'receive',
      component: receive
    },
    //赠送好友下一步
    {
      path: '/mine-giveNext',
      name: 'giveNext',
      component: giveNext
    },

    //设置
    {
      path: '/mine-setup',
      name: 'setup',
      component: setup
    },
    {
      path: '/setCard',
      name: 'setCard',
      component: setCard
    },

    //签到页
    {
      path: '/mine-sign',
      name: 'sign',
      component: sign
    },
    // 支付页面
    {
      path: '/toPay',
      name: 'toPay',
      component: toPay
    },
    {
      path: '/payWay',
      name: 'payWay',
      component: payWay
    },
    {
      path: '/successPay',
      name: 'successPay',
      component: successPay
    },
    {
      path: '/failPay',
      name: 'failPay',
      component: failPay
    },
    {
      path: '/live',
      name: 'live',
      component: live
    },
    {
      path: '/applyLive',
      name: 'applyLive',
      component: applyLive
    },
    {
      path: '/liveHomePage',
      name: 'liveHomePage',
      component: liveHomePage
    },
    {
      path: '/newGroup',
      name: 'newGroup',
      component: newGroup
    },
    {
      path: '/audit',
      name: 'audit',
      component: audit
    },
    {
      path: '/liveHome',
      name: 'liveHome',
      component: liveHome
    },
    {
      path: '/forum',
      name: 'forum',
      component: forum
    },
    {
      path: '/serAsk',
      name: 'serAsk',
      component: serAsk
    },
    {
      path: '/reply',
      name: 'reply',
      component: reply
    },
    {
      path: '/reply2',
      name: 'reply2',
      component: reply2
    },
    {
      path: '/mineAsk',
      name: 'mineAsk',
      component: mineAsk
    },
    //课间页,精品页测试
    {
      path: '/mine-course-playtime',
      name: 'playtime',
      component: playtime,
    },
    {
      path: '/mine-course-boutiquetext',
      name: 'boutiquetext',
      component: boutiquetext,
    },
    {
      path: '/mine-course-articles',
      name: 'articles',
      component: articles,
    },
    {
      path: '/mine-course-mesay',
      name: 'mesay',
      component: mesay,
    },
    {
      path: '/mine-course-vote',
      name: 'vote',
      component: vote,
    },
    {
      path: '/failTip',
      name: 'failTip',
      component: failTip,
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: lottery,
    },
    {
      path: '/giftlist',
      name: 'giftlist',
      component: giftlist,
    },
    {
      path: '/detailquestions',
      name: 'detailquestions',
      component: detailquestions,
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: bindPhone,
    },
    {
      path: '/get-lemi-Test-Root-Token',
      name: 'toKen',
      component: toKen,
    },
    {
      path: '/customPage',
      name: 'customPage',
      component: customPage,
    },
    {
      path: '/customPersonal',
      name: 'customPersonal',
      component: customPersonal,
    },
    {
      path: '/customTeam',
      name: 'customTeam',
      component: customTeam,
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge,
    },
    {
      path: '/study',
      name: 'study',
      component: study,
    },
    {
      path: '/rechargeList',
      name: 'rechargeList',
      component: rechargeList,
    },
    {
      path: '/groupBuying',
      name: 'groupBuying',
      component: groupBuying,
    },
    {
      path: '/groupList',
      name: 'groupList',
      component: groupList,
    },
    {
      path: '/newBen',
      name: 'newBen',
      component: newBen,
    },
    {
      path: '/mallHome',
      name: 'mallHome',
      component: mallHome
    },
    {
      path: '/mallTab',
      name: 'mallTab',
      component: mallTab
    }, {
      path: '/inviteSort',
      name: 'inviteSort',
      component: inviteSort
    }, {
      path: '/goodDetails',
      name: 'goodDetails',
      component: goodDetails
    }, {
      path: '/goodsLists',
      name: 'goodsLists',
      component: goodsLists
    },
    {
      path: '/sortLists',
      name: 'sortLists',
      component: sortLists
    },
    {
      path: '/shopAddress',
      name: 'shopAddress',
      component: shopAddress
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      component: editAddress
    },
    {
      path: '/chooseAddress',
      name: 'chooseAddress',
      component: chooseAddress
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
    }, {
      path: '/shopCart',
      name: 'shopCart',
      component: shopCart
    }, {
      path: '/orderCenter',
      name: 'orderCenter',
      component: orderCenter
    }, {
      path: '/logisticsMany',
      name: 'logisticsMany',
      component: logisticsMany
    }, {
      path: '/mallOrderDetails',
      name: 'mallOrderDetails',
      component: mallOrderDetails
    }, {
      path: '/commentComplete',
      name: 'commentComplete',
      component: commentComplete
    }, {
      path: '/tutorList',
      name: 'tutorList',
      component: tutorList
    },
    {
      path: '/theDeal',
      name: 'theDeal',
      component: theDeal
    },
    {
      path: '/commentSuccess',
      name: 'commentSuccess',
      component: commentSuccess
    },
    {
      path: '/establishCard',
      name: 'establishCard',
      component: establishCard,
    },
    {
      path: '/daoshiProcess',
      name: 'daoshiProcess',
      component: daoshiProcess,
    },
    {
      path: '/jigouProcess',
      name: 'jigouProcess',
      component: jigouProcess,
    },
    {
      path: '/tutorHomepage',
      name: 'tutorHomepage',
      component: tutorHomepage,
    },
    {
      path: '/problemDetails',
      name: 'problemDetails',
      component: problemDetails,
    },
    {
      path: '/askQuestions',
      name: 'askQuestions',
      component: askQuestions,
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: promotion,
    },
    {
      path: '/faceHome',
      name: 'faceHome',
      component: faceHome,
    },
    {
      path: '/faceJion',
      name: 'faceJion',
      component: faceJion,
    },
    {
      path: '/faceDetail',
      name: 'faceDetail',
      component: faceDetail,
    },
    {
      path: '/successSubmit',
      name: 'successSubmit',
      component: successSubmit,
    },
    {
      path: '/faceSearch',
      name: 'faceSearch',
      component: faceSearch,
    },
    {
      path: '/faceHomePc',
      name: 'faceHomePc',
      component: faceHomePc,
    },
    {
      path: '/codePc',
      name: 'codePc',
      component: codePc,
    },
    {
      path: '/facePromotion',
      name: 'facePromotion',
      component: facePromotion,
    },
    {
      path: '/giving',
      name: 'giving',
      component: giving,
    },
    {
      path: '/faceList',
      name: 'faceList',
      component: faceList,
    },
    {
      path: '/commission', //佣金
      name: 'commission',
      component: commission,
    },
    {
      path: '/classLists',
      name: 'classLists',
      component: classLists,
    },
    {
      path: '/commonProblem',
      name: 'commonProblem',
      component: commonProblem,
    },
    {
      path: '/clearCache',
      name: 'clearCache',
      component: clearCache
    },
    
  ]
})
