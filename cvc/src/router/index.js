import Vue from 'vue'
import Router from 'vue-router'
//公共尾部
//import publicBottom from '@/components/Navigator/publicBottom'
import homePage from '@/components/home/homePage'//首页
//活动页
import activity from '@/components/home/activity/activity'
import activity11 from '@/components/home/activity/activity11'
//分类
import classification from '@/components/expand/classifyPage/classification'
import classifyPage from '@/components/expand/classifyPage/classifyPage'
import shipinsearch from '@/components/expand/classifyPage/shipinSearch'
import kechengsearch from '@/components/expand/classifyPage/kechengSearch'
//个人中心
import PersonalCenter from '@/components/mine/PersonalCenter'
import Money from '@/components/mine/money'
import Courses from '@/components/mine/course'
import Anchors from '@/components/mine/anchor/anchor'
import College from '@/components/mine/college/college'  //申请主播
import setup from '@/components/mine/Setup'  //设置页面
import setCard from '@/components/mine/card/setCard'  //设置名片
import order from '@/components/mine/Order'  //订单页面
import sign from '@/components/mine/sign'    //签到页
import promotion from '@/components/mine/promotion' //推广码

//申请导师子页面
import anchorLogin from '@/components/mine/anchor/anchorLogin' //主播登录页
import anchorRegister from '@/components/mine/anchor/anchorRegister' //主播注册页
import anchorNext from '@/components/mine/anchor/anchorNext'  //主播注册下一页
import anchorSubmit from '@/components/mine/anchor/anchorSubmit' //主播注册提交页面
//我是导师子页面
import tutor from '@/components/mine/anchor/mentorSuccess/tutor' //我是导师子页面
import works from '@/components/mine/anchor/mentorSuccess/works' //我的作品
import assets from '@/components/mine/anchor/mentorSuccess/assets' //导师资产
import assetsWithdrawals from '@/components/mine/anchor/mentorSuccess/assetsWithdrawals'  //导师提现
import tixianDetailed from '@/components/mine/anchor/mentorSuccess/tixianDetailed' //导师提现明细
import shouruDetailed from '@/components/mine/anchor/mentorSuccess/shouruDetailed' //导师收入明细
//申请学院子页面
import collegeLogin from '@/components/mine/college/collegeLogin' //学院登录页
import collegeApply from '@/components/mine/college/collegeApply'  //申请学院
import agreement from '@/components/mine/college/agreement'   //相关协议页
//我的学院
import org from '@/components/mine/college/collegeSuccess/org' //我的学院
import orgTutor from '@/components/mine/college/collegeSuccess/orgTutor' //学院导师
import orgWorks from '@/components/mine/college/collegeSuccess/orgWorks' //学院作品
import orgAssets from '@/components/mine/college/collegeSuccess/orgAssets' //学院资产
//钱包子页面
import detailed from '@/components/mine/money/detailed' //钱包明细页
import withdrawals from '@/components/mine/money/withdrawals' //提现明细页
import record from '@/components/mine/money/record' //提现记录页面
import alipay from '@/components/mine/money/alipay'  //添加支付宝页
import bankcard from '@/components/mine/money/bankcard' //添加银联页
//详情页面
import Details from '@/components/study/detailsPage'
import Details2 from '@/components/study/detailsPage2'
import give from  '@/components/study/give'//赠送给好友页面
import receive from '@/components/study/receive' //领取页面
import giveNext from '@/components/study/giveNext' //赠送给好友下一步页面
import  detailquestions from '@/components/study/detailquestions'
import commission from '@/components/study/commission'  //佣金,邀请页
//我的订单子页面
import orderDetails from '@/components/mine/order/details'  //课程订单详情页
import orderVideo from '@/components/mine/order/video'      //视频订单详情页
import orderActivity  from '@/components/mine/order/activity'    //活动订单详情
import orderPackage  from '@/components/mine/order/package'    //套餐订单详情
//粉丝页
import Fans from '@/components/mine/fans/fans'
import fansDetails from '@/components/mine/fans/fansDetails'
// 支付页面
import toPay from '@/components/common/toPay'
import payWay from '@/components/common/payWay'
import successPay from '@/components/common/successPay'
import failPay from '@/components/common/failPay'
// 付费问答
import askQuestions from '@/components/expand/ask/askQuestions'
import mineAsk from '@/components/expand/ask/mineAsk'
import problemDetails from '@/components/expand/ask/problemDetails'
import tutorHomepage from '@/components/expand/ask/tutorHomepage'
import tutorList from '@/components/expand/ask/tutorList'
import serAsk from '@/components/expand/ask/serAsk'
import reply from '@/components/expand/ask/reply'
import reply2 from '@/components/expand/ask/reply2'

import failTip from '@/components/common/failTip'
//课间页,精品页测试/文章
import playtime from '@/components/mine/course/playtime'
import boutiquetext from '@/components/mine/course/boutiquetext'
import articles from '@/components/mine/course/articles'
import mesay from '@/components/mine/course/mesay'
import vote from '@/components/mine/course/vote'
// 抽奖
import lottery from '@/components/expand/lottery'
import giftlist from '@/components/expand/giftlist'
//绑定手机页
import bindPhone from '@/components/mine/bindPhone'
//获取toKen
import token from '@/components/common/toKen'
//自定义页
import customPage from '@/components/home/customPage'
import customPersonal from '@/components/home/customPersonal'
import customTeam from '@/components/home/customTeam'
//充值页面
import recharge from '@/components/mine/recharge'
import rechargeList from '@/components/mine/rechargeList'
//学习页面
import study from '@/components/study/study'
//团购页面
import groupBuying from '@/components/expand/groupBuying/groupBuying'
import groupList from '@/components/expand/groupBuying/groupList'
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
import establishCard from '@/components/mine/card/establishCard'
import daoshiProcess from '@/components/mine/card/daoshiProcess'
import jigouProcess from '@/components/mine/card/jigouProcess'

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
import giving from '@/components/expand/giving/givingList';

// 每日图赏
import dailyRewards from '@/components/home/dailyRewards';

// 摄客学院
import collegeHome from '@/components/college/collegeHome';

//拼团
import puzzleHome from '@/components/college/buyPage/puzzleHome'
//奖学金
import scholarship from '@/components/mine/scholarship';
import recordList from '@/components/mine/recordList';
// 购买记录
import buyRecord from '@/components/mine/buyRecord';
// 我的装备
import myEquipment from '@/components/mine/myEquipment';
import updateEq from '@/components/mine/updateEq';
// 浏览记录
import lookrecord from '@/components/mine/lookrecord';
// 我的收藏
import myCollection from '@/components/mine/myCollection';
// 我的赠礼
import myGift from '@/components/mine/myGift';
// 常见问题
import commonProblem from '@/components/mine/commonProblem';
// 摄客学院-我的报名
import mySignup from '@/components/college/mySignup';
//摄客学院-拼团抢购页面
import buyPage from '@/components/college/buyPage';
//摄客学院-拼团详情页
import teamworkDetails from '@/components/college/teamworkDetails';
//摄客学院-更多拼团
import moreTeam from '@/components/college/moreTeam';
//摄客学院-正常
import normal from '@/components/college/normal';
//摄客学院-成为社员
import becomeMember from '@/components/college/becomeMember';
//摄客学院-线上课程详情
import onCourseDetails from '@/components/college/onCourseDetails';
//摄客学院-线下课程详情
import offCourseDetails from '@/components/college/offCourseDetails';
//摄客学院-再次确认报名
import confirmSignup from '@/components/college/confirmSignup';
//摄客学院-报名成功
import signSuccess from '@/components/college/signSuccess';
//摄客学院-空白页
import blank from '@/components/college/blank';
// 摄客学院-入学通知书
import successEnter from '@/components/college/successEnter';
// 摄客学院-分销卡
import saleCard from '@/components/college/saleCard';
//清缓存
import clearCache from '@/components/common/clearCache';
//优惠卷
import coupon from '@/components/mine/coupon';


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
    {
      path: '/classify-shipinsearch',
      name: 'shipinsearch',
      component: shipinsearch
    },
    //课程分类
    {
      path: '/classify-kechengsearch',
      name: 'kechengsearch',
      component: kechengsearch
    },
    {
      path: '/classify-search',
      name: 'classifyPage',
      component: classifyPage
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
      path: '/fans',
      name: 'Fans',
      component: Fans,
    },
//  粉丝详情页
    {
      path: '/fansDetails',
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
      path: '/token',
      name: 'token',
      component: token,
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
      path: '/mallHome',
      name: 'mallHome',
      component: mallHome
    },
    {
      path: '/mallTab',
      name: 'mallTab',
      component: mallTab
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
      path: '/collegeHome',
      name: 'collegeHome',
      component: collegeHome,
    },
    {
      path: '/dailyRewards',
      name: 'dailyRewards',
      component: dailyRewards,
    },
    {
      path: '/scholarship',
      name: 'scholarship',
      component: scholarship,
    },
    {
      path: '/recordList',
      name: 'recordList',
      component: recordList,
    },
    {
      path: '/buyRecord',
      name: 'buyRecord',
      component: buyRecord,
    },
    {
      path: '/myEquipment',
      name: 'myEquipment',
      component: myEquipment,
    },
    {
      path: '/updateEq',
      name: 'updateEq',
      component: updateEq,
    },
    {
      path: '/lookrecord',
      name: 'lookrecord',
      component: lookrecord,
    },
    {
      path: '/myCollection',
      name: 'myCollection',
      component: myCollection,
    },
    {
      path: '/myGift',
      name: 'myGift',
      component: myGift,
    },
    {
      path: '/commonProblem',
      name: 'commonProblem',
      component: commonProblem,
    },
    //优惠卷
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon,
    },
    //拼团
    {
      path: '/puzzleHome',
      name: 'puzzleHome',
      component: puzzleHome,
    },
    {
      path: '/mySignup',
      name: 'mySignup',
      component: mySignup,
    },
    {
      path: '/buyPage',
      name: 'buyPage',
      component: buyPage,
    },
    {
      path: '/teamworkDetails',
      name: 'teamworkDetails',
      component: teamworkDetails,
    },
    {
      path: '/blank',
      name: 'blank',
      component: blank,
    },
    {
      path: '/moreTeam',
      name: 'moreTeam',
      component: moreTeam,
    },
    {
      path: '/normal',
      name: 'normal',
      component: normal,
    },
    {
      path: '/becomeMember',
      name: 'becomeMember',
      component: becomeMember,
    },
    {
      path: '/onCourseDetails',
      name: 'onCourseDetails',
      component: onCourseDetails,
    },
    {
      path: '/offCourseDetails',
      name: 'offCourseDetails',
      component: offCourseDetails,
    },
    {
      path: '/successEnter',
      name: 'successEnter',
      component: successEnter,
    },
    {
      path: '/confirmSignup',
      name: 'confirmSignup',
      component: confirmSignup,
    },
    {
      path: '/signSuccess',
      name: 'signSuccess',
      component: signSuccess,
    },
    {
      path: '/saleCard',
      name: 'saleCard',
      component: saleCard,
    },
    {
      path: '/clearCache',
      name: 'clearCache',
      component: clearCache,
    }
  ]
})
